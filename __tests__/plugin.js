const CLIEngine = require("eslint").CLIEngine;
const plugin = require("..");

function sanitise(results) {
  return results.map(result => ({
    ...result,
    filePath: "[snip]",
  }));
}

let simpleFunction = `\
create function my_test_function(foo text, bar text) returns text as $$
var a = "42";
return A; // Undefined!
$$ language plv8 stable;
`;

let cli;
beforeAll(() => {
  cli = new CLIEngine({
    envs: [],
    extensions: ["sql"],
    ignore: false,
    rules: {
      "eol-last": 2,
      "no-console": 2,
      "no-undef": 2,
      quotes: 2,
      "spaced-comment": 2,
    },
    useEslintrc: false,
  });
  cli.addPlugin("markdown", plugin);
});

test("should run on .sql files", () => {
  const report = cli.executeOnText(simpleFunction, "test.sql");

  expect(report.results).toHaveLength(1);
  expect(report.results[0].messages[0].message).toEqual(`'A' is not defined.`);
  expect(sanitise(report.results)).toMatchSnapshot();
});
