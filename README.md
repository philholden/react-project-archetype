# React Project Archetype

This is a boilerplate for React apps:

* WebPack 2
* Babel 6
* Flow
* React Hot Loader 3
* AVA
* Code coverage reports
* Null loaders to allow unit testing with components that use webpack loader
* WebSockets via Socket.IO set up on server (delete if not needed)
* Semantic release

## Create New React Project (Click Video Below)

[![Click to play Youtube video](https://img.youtube.com/vi/KDw9MbsES1E/maxresdefault.jpg)](https://www.youtube.com/watch?v=KDw9MbsES1E)

You can generate a new project by first installing `builder-init`:

```bash
npm install -g builder-init
```

We are using `builder-init` for template string replacement mainly in `package.json`. This archetype is designed to be used with `npm install` rather than `builder install`. To create a new project using this template first clone this repo and then run:

```
builder-init git+ssh://git@github.com:philholden/react-project-archetype.git
```

Note: Run `git init` before `npm install` so that `ghooks` can find the git repo (during the `npm install` process). If you forget to do this reinstall ghooks after `git init`:

```bash
npm uninstall -D ghooks
npm install -D ghooks
```

---

## Install (Click Video Below)

<a href="https://www.youtube.com/watch?v=KDw9MbsES1E&t=0m30s" target="\_blank"><img src="https://img.youtube.com/vi/KDw9MbsES1E/maxresdefault.jpg"></a>

## Npm & Scripts

Node Package Manager (npm) provides all the ingredients (modules) for our application while the `package.json` provides the recipe what we need (dependencies) and how to cook it (scripts).  

### Nvm

Node Version Manager enables us to have several versions of Node running on the same computer. To install nvm first uninstall Node if already installed and then follow these [instructions](https://github.com/creationix/nvm#install-script).

For this boiler plate we assume you are using Node 6 and npm 3.

```bash
nvm install 6

# or if 6.x is installed already
nvm use 6
```

You can also have a `.nvmrc` file in each project which tells nvm which version to use. It is not automatic but has to be invoked with `nvm use`. Be warned it is a bad idea to change npm version part way through a project. If you upgrade npm 2.x to version 3.x you should also delete the `node_modules` folder and run `npm install` again.

### npm install

To install a newly created project `cd` into the project folder:

```bash
git init
npm install
```

The projects `package.json` file has a scripts section which defines the tasks that can be run on our project. Using npm's scripts means `grunt` and `gulp` are seldom needed.

### Running and Building (Click Video Below)

<a href="https://www.youtube.com/watch?v=7-dth6Z7eA4" target="\_blank">![Click to play Youtube video](https://img.youtube.com/vi/7-dth6Z7eA4/maxresdefault.jpg)</a>

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

[Babel](https://babeljs.io/) allows modern JS to be used today. It transpiles ES2015, ES2016 and other experimental syntax to ES5 so it can be used in older browsers.

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

You can experiment with Babel [here](https://babeljs.io/repl/#?evaluate=true&lineWrap=false&presets=es2015%2Creact%2Cstage-2&experimental=true&loose=false&spec=false&code=const%20%7Ba%2C%20b%7D%20%3D%20%7Ba%3A%201%2C%20b%3A%202%2C%20c%3A%203%7D%0Aconst%20inc%20%3D%20x%20%3D%3E%20x%20%2B%201%0Aconst%20Hello%20%3D%20()%20%3D%3E%20%3Cdiv%3EHello%3C%2Fdiv%3E)

### Presets

Babel presets are used to choose which transformations to apply to code. See `package.json` for the Babel presets installed:

```javascript
  "babel-preset-es2015": "^6.9.0",
  "babel-preset-es2015-webpack": "^6.4.1",
  "babel-preset-react": "^6.11.1",
  "babel-preset-react-hmre": "^1.1.1",
  "babel-preset-stage-1": "^6.5.0",
```

These presets are enabled through the `.babelrc` file. `.babelrc` can be set up to use different presets based on an environment variable. Many of the `scripts` in `package.json` set the environment variable `NODE_ENV` or `BABEL_ENV` before running. This Allows a different setup for test, dev and production.

## Module Bundling - Webpack 2

Webpack 2 is a module bundler. It takes the `devDependencies` defined in `package.json` and bundles them into a single file that can be requested from HTML files. It can output more than one bundle allowing browser caches to work more efficiently:

```markup
<script src="/static/bundle-vendor.js"></script>
<script src="/static/bundle-app.js"></script>
```

Webpack is configured in `webpack.config.js`. Webpack 2 supports [tree-shaking](http://www.2ality.com/2015/12/webpack-tree-shaking.html). By using ES6 modules `imports` and `exports` Webpack can remove code that never gets run from our bundle creating a smaller bundle. To test this run:

```bash
npm run build:webpack
```

Look at `src/components/app.js` note it contains the following strings `'Hello World.'` and `'Not Used.'`. Now open `dist/bundle-app.js` search for these two strings. You should find `'Hello World.'` but not `'Not Used.'`. The `NotUsed` function has been removed because Webpack detected our app will never call this function.

Webpack is also minifying our code using Uglify. It has loaders configured which load non JS files as if they were JS. E.g. `url-loader` which we use to convert `png`s to base64 strings so they can be used in the `src` attribute of `<img>` tags (see `src/components/app.js`). We can package all our scripts, image icons and CSS in a single JS file.

### Source Maps

One problem with minification and bundling is that it makes code hard to debug. Webpack solves this by creating source maps. These map our minified code back to the original. In production the source map file is only downloaded if the browser's devtool is open.

In development source maps are evaluated on the fly as the developer edits and saves code. You can test source maps are working by throwing an error:

```javascript
// src/app.js line 9
throw new Error('error')
```

Now if you run the code in the browser in dev or production and open up the devtools console and click on the error you should jump to the correct line and file in the source.

## Hot Reloading

Getting fast feedback enables developers to work more effectively. Hot reloading allows us to edit our code and reload it in the browser while keeping the state data intact. To try this out run the dev server:

```bash
npm start
```
And open `http://localhost:3000` now change 'src/components/app.js' change line 7 to:

```javascript
export const HelloWorld = () => <div>Hello People.</div>
```

Now save the file. The browser automatically updates the text. If you would like state to persist between reloads consider using a library like Redux to store your state.

## Testing - Ava (Click Video Below)

<a href="https://www.youtube.com/watch?v=naJIvTWuKs4" target="\_blank"><img src="https://img.youtube.com/vi/naJIvTWuKs4/maxresdefault.jpg"></a>

Ava is a modern testing framework designed to work well with ES2015. It runs tests concurrently which should make testing faster.

See: https://github.com/avajs/ava

```bash
# run tests once
npm test

# run tests in watch mode
npm run test:watch

# generate test coverage report
npm run test:coverage

# view code coverage
npm run open-coverage
```

You can use the `npm run check-coverage` script to error if coverage falls below a specified threshold. This can be used in other scripts to make builds or commits fail if it causes the percentage of unit tested code to fall below a certain threshold.

We use expectJSX and shallow rendering in the example tests for components. This is fine for stateless components. But for more complex components you may want to consider using [enzyme](https://medium.com/airbnb-engineering/enzyme-javascript-testing-utilities-for-react-a417e5e5090f#.ufjjpydyb) with [jsdom](https://github.com/avajs/ava/blob/master/docs/recipes/react.md) or [karma](https://karma-runner.github.io/1.0/index.html).

## Linting - Eslint AirBnB

AirBnB's linter config for Eslint is fast becoming the defacto standard for ES2015 React code. Perhaps because they have such a [comprehensive style guide](https://github.com/airbnb/javascript) that few would envy the task of rewriting it.

However probably most users will want to override some of the rules in the `.eslintrc` file.

Eslint should be used in conjunction with an editor plugin to provide errors and warnings as the user types.  

## Typechecking - Flow (Click Video Below)

<a href="https://egghead.io/lessons/react-setup-nuclide-to-use-flow-and-eslint-mac" target="\_blank">![Click to play Youtube video](https://embedwistia-a.akamaihd.net/deliveries/a118a762c7f2f28ae8835486eda2e440df54c106.jpg)</a>

Flow is a JS type checker made by FaceBook and used by their React team. Types can help developers to ensure the correctness of code before running it. Warnings can be shown in an editor when saving a file.

Flow is often able to infer types from the way functions are used. It warns the developer when they use function arguments inconsistently. Some developers have commented they find type checking their code catches more errors than unit testing.

Types enable tooling in IDEs like jumping to function definitions. They can also be used to detect dead code.

With React `flowTypes` can be used in the place of reacts `propTypes` giving a single type system in the code base.

Facebook has created and extension to the Atom editor called Nuclide which adds Flow support to the editor.

Additional linting rules have been added to `.eslintrc` to support Flow. Add in the following rules if you want to force types everywhere.

```javascript
"flowtype/require-parameter-type": 1,
"flowtype/require-return-type": [
  1,
  "always",
  {"annotateUndefined": "never"}
]
```

This may be overkill if you only want Flow for public exports.

## Conventional Change Log

This forced you to enter git commit messages in such a way that they can be parsed to automatically generate a [semver](http://semver.org) compliant version number. To use it run:

```bash
npm run commit
```

## Ghooks

Git hooks can be used to run tasks such as unit tests, coverage test and linters before each commit. If any of these tests error then no commit is performed. On the plus side it ensures code quality on the minus side it can lead to less frequent commits and so a greater chance of losing work. See the `ghooks` property of `package.json`. Note for ghooks to initialise correctly there must be a git repo present before you run `npm install` on the project.

## Semantic release

This is really only useful for open source projects. It works with Conventional Change Log to release a new version of your module to `npm` when you push to `master` on Github. The build is run on Travis CI. Release notes and a new semantic version tag are created in the git repo on Github. See [these videos](https://egghead.io/lessons/javascript-how-to-write-a-javascript-library-automating-releases-with-semantic-release) for more info.

```bash
npm install -g semantic-release-cli
semantic-release-cli setup
```

While not suitable for internal projects it gives an idea of what to should aim for with an internal build system.
