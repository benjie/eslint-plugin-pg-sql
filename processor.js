const { parse: parseSQL } = require("pg-query-native");

// from eslint-plugin-markdown
const UNSATISFIABLE_RULES = [
  "eol-last", // We can't guarantee newlines within codeblocks in SQL
  "unicode-bom", // Code blocks will begin in the middle of SQL files
];

function excludeUnsatisfiableRules(message) {
  return message && UNSATISFIABLE_RULES.indexOf(message.ruleId) < 0;
}

function findOption(statement, optionName) {
  return statement.options.find(
    (option) => option.DefElem && option.DefElem.defname === optionName
  );
}

function preprocess(text) {
  const { query, error, stderr } = parseSQL(text);
  if (error) {
    throw error;
  }
  if (stderr.length) {
    throw new Error("Error occurred: " + stderr);
  }
  if (!query || !Array.isArray(query)) {
    return null;
  }
  const blocks = [];
  for (
    let statementNumber = 0;
    statementNumber < query.length;
    statementNumber++
  ) {
    const line = query[statementNumber];
    if (line.CreateFunctionStmt) {
      const statement = line.CreateFunctionStmt;
      const asOption = findOption(statement, "as");
      const languageOption = findOption(statement, "language");
      const language = languageOption && languageOption.DefElem.arg.String.str;
      const argumentNames = Array.isArray(statement.parameters)
        ? statement.parameters
            .filter((param) => param.FunctionParameter.mode === 105)
            .map((param, i) => param.FunctionParameter.name || `$${i + 1}`)
        : [];

      if (asOption && language === "plv8") {
        const code = asOption.DefElem.arg[0].String.str;
        const fnName = statement.funcname.map((n) => n.String.str).join("__");
        blocks.push(`\
(function ${fnName}(${argumentNames.join(", ")}) {
${code}
})();
`);
      }
    }
  }
  return blocks;
}

function postprocess(messages) {
  return messages.reduce((memo, group) => {
    return memo.concat(group.filter(excludeUnsatisfiableRules));
  }, []);
}

module.exports = {
  preprocess: preprocess,
  postprocess: postprocess,
};
