# eslint-plugin-pg-sql

[![Package on npm](https://img.shields.io/npm/v/eslint-plugin-pg-sql.svg?style=flat)](https://www.npmjs.com/package/eslint-plugin-pg-sql)
![MIT license](https://img.shields.io/npm/l/eslint-plugin-pg-sql.svg)
<span class="badge-patreon"><a href="https://patreon.com/benjie" title="Donate to support development on this project using Patreon"><img src="https://img.shields.io/badge/patreon-donate-yellow.svg" alt="Patreon donate button" /></a></span>
[![Donate](https://img.shields.io/badge/paypal-donate-yellow.svg)](https://www.paypal.me/benjie)
[![Follow](https://img.shields.io/badge/twitter-@benjie-blue.svg)](https://twitter.com/benjie)

This is a **file type** plugin that adds support for linting PLV8 function
bodies within a .sql file.

```
npm install eslint-plugin-pg-sql
```

To use it you need to add it to the `"plugins"` section of your ESLint config,
and you need to run ESLint with the `--ext sql` option so it recognizes .sql
files.

```
eslint --ext js --ext sql path/to/files
```

## Status

Detecting functions of type `plv8` and passing their bodies through to ESLint
is working.

Having the errors point to the correct line numbers is not working. At all. Not
even close.

## Self-promotion

While I've got your attention:

- my open source work is self-funded through freelance consulting work and
  generous donations from the community, you can support my open source work via
  [Patreon](https://patreon.com/benjie), or [PayPal](https://paypal.me/benjie)
- you can follow me on Twitter: [@benjie](https://twitter.com/Benjie)
- if you're looking for an instant GraphQL server for your PostgreSQL database
  that leverages the power of PostgreSQL and doesn't fall foul of N+1 issues,
  check out [PostGraphile](https://graphile.org/postgraphile) (formerly
  PostGraphQL)
