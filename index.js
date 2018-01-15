const processor = require("./processor");

module.exports = {
  processors: {
    ".sql": processor,
    ".psql": processor,
    ".pgsql": processor,
    ".postgresql": processor,
  },
};
