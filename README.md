# component-archetype

[![travis build](https://img.shields.io/travis/philholden/component-archetype.svg?style=flat-square)](https://travis-ci.org/philholden/component-archetype)
[![codecov coverage](https://img.shields.io/codecov/c/github/philholden/component-archetype.svg?style=flat-square)](https://codecov.io/github/philholden/component-archetype)
[![version](https://img.shields.io/npm/v/@philholden/component-archetype.svg?style=flat-square)](http://npm.im/@philholden/component-archetype)
[![downloads](https://img.shields.io/npm/dm/@philholden/component-archetype.svg?style=flat-square)](http://npm-stat.com/charts.html?package=@philholden/component-archetype&from=2015-08-01)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square)](https://github.com/semantic-release/semantic-release)

This is a kitchen sink boilerplate for React components and apps. You can generate a new project by first installing `builder-init`:

```bash
npm install -g builder-init
```

In this case we are using `builder-init` only for template string replacement mainly in `package.json`. This archetype is not really designed to be used with the main builder tool. To create a new project using this template first clone this repo and then run:

```
builder-init
``` 

* Babel 6
* React Hot Loader 3
* AVA for tests
* Code coverage reports
* Null loaders to allow unit testing with components that use webpack loader 
* WebSockets via Socket.IO set up on server (delete if not needed)
* Semantic release

```javascript
"flowtype/require-parameter-type": 1,
"flowtype/require-return-type": [
  1,
  "always",
  {"annotateUndefined": "never"}
],
"flowtype/space-after-type-colon": [1, "always"],
"flowtype/space-before-type-colon": [1, "never"],
"flowtype/type-id-match": [1, "^([A-Z][a-z0-9]+)+Type$"]
```

## Installation

```bash
git clone https://github.com/<%= packageGitHubOrg %>/component-archetype.git
cd component-archetype
npm install
npm start
open http://localhost:3000
```

## When setting up a new repo

`semantic-release-cli setup`
