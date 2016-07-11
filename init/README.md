# <%= packageName %>

[![travis build](https://img.shields.io/travis/philholden/<%= packageName %>.svg?style=flat-square)](https://travis-ci.org/philholden/<%= packageName %>)
[![codecov coverage](https://img.shields.io/codecov/c/github/philholden/<%= packageName %>.svg?style=flat-square)](https://codecov.io/github/philholden/<%= packageName %>)
[![version](https://img.shields.io/npm/v/@philholden/<%= packageName %>.svg?style=flat-square)](http://npm.im/@philholden/<%= packageName %>)
[![downloads](https://img.shields.io/npm/dm/@philholden/<%= packageName %>.svg?style=flat-square)](http://npm-stat.com/charts.html?package=@philholden/<%= packageName %>&from=2015-08-01)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square)](https://github.com/semantic-release/semantic-release)

* Babel 6
* React Hot Loader 3
* AVA for tests
* Code coverage reports
* Null loaders to allow unit testing where components that use webpack loader 
* WebSockets via Socket.IO set up on server (delete if not needed)
* Semantic release

## Npm Scripts

The projects `package.json` file has a scripts section which defines the tasks that can be run on our project. If we use npm scripts we will probably have no need for `grunt` or `gulp`.

To run the project in dev mode:

```bash
npm start
```

Then open a browser to http://localhost:3000

To build the project for production:

```bash
npm run build:webpack
```

Then open a browser to http://localhost:3000/index-dist.html


## Transpilation - Babel

Babel allows us to use modern JS today. It transpiles ES2015, ES2016 and other experimental syntax to ES5 so it can be used in older browsers.

```javascript
// input
const inc = x => x + 1

// output
var inc = function inc(x) {
  return x + 1;
};
```

It can also transpile React's JSX to plain JS:

```javascript
// input
const Hello = () => <div>Hello</div>

// output
var Hello = function Hello() {
  return React.createElement(
    "div",
    null,
    "Hello"
  );
};
```

### Presets

We use Babel presets to choose which code transformations we would like to apply. If you look in `package.json` you can see the Babel presets we have installed:

```javascript
  "babel-preset-es2015": "^6.9.0",
  "babel-preset-es2015-webpack": "^6.4.1",
  "babel-preset-react": "^6.11.1",
  "babel-preset-react-hmre": "^1.1.1",
  "babel-preset-stage-1": "^6.5.0",
```

These presets are enabled through the `.babelrc` file. `.babelrc` can be set up to use different presets based on an environment variable. You will see that many of the `scripts` in `package.json` set the environment variable `NODE_ENV` or `BABEL_ENV` before running. This allows us to have a different setup for test, dev and production. 

## Module Bundling - Webpack 2

Webpack 2 is a module bundler. It takes the `devDependencies` defined in `package.json` and bundles them into a single file that can be requested in HTML files. If we like we can output more than one bundle allowing browser caches to work more efficiently:

```markup
<script src="/static/bundle-vendor.js"></script>
<script src="/static/bundle-app.js"></script>
```

Webpack is configured in `webpack.config.js`. Webpack 2 supports tree-shaking. This means if we use ES6 modules `imports` and `exports` Webpack can remove code that never gets run from our bundle creating a smaller bundle. To test this run:

```bash
npm run build:webpack
```

Look at `src/components/app.js` note it contains the following strings `'Hello World.'` and `'Not Used.'`. Now open `dist/bundle-app.js` search for these strings. You should find `'Hello World.'` but not `'Not Used.'`. The NotUsed function has been removed because Webpack detected our app will never call this function.

Webpack is also minifying our code using Uglify. It has loaders configured which load non JS files as if they were JS. E.g. `url-loader` which we use to convert `png`s to base64 strings so they can be used in the `src` attribute of `<img>` tags (see `src/components/app.js`).

### Source Maps

One problem with minification and bundling is that it makes code hard to debug. Webpack solves this by creating source maps. These map our minified code back to the original source code. In production the source map file is only downloaded if the browser's devtools are open.

In development source maps evaluated on the fly as we edit and save our code. You can test source maps are working be throwing an error:

```javascript
// src/app.js line 9
throw new Error('error')
```

Now if you run the code in the browser in dev or production and open up the devtools console and click on the error you should jump to the correct line and file of the uncompiled source. 




## Testing - Ava
## Code coverage
## Typechecking - Flow
## Linting - Eslint AirBnB
## Hot Reloading

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
git clone https://github.com/<%= packageGitHubOrg %>/<%= packageName %>.git
cd <%= packageName %>
npm install
npm start
open http://localhost:3000
```

## When setting up a new repo

`semantic-release-cli setup`
