# React Project Archetype

This is a kitchen sink boilerplate for React components and apps:

* WebPack 2
* Babel 6
* Flow
* React Hot Loader 3
* AVA
* Code coverage reports
* Null loaders to allow unit testing with components that use webpack loader 
* WebSockets via Socket.IO set up on server (delete if not needed)
* Semantic release

You can generate a new project by first installing `builder-init`:

```bash
npm install -g builder-init
```

We are using `builder-init` for template string replacement mainly in `package.json`. This archetype is designed to be used with `npm install` rather than `builder install`. To create a new project using this template first clone this repo and then run:

```
builder-init git+ssh://git@github.com:philholden/react-project-archetype.git
``` 

Note: Run `git init` before `npm install` so that `ghooks` can find the git repo in the `npm install` process. If you forget to do this reinstall ghooks after `git init`:

```bash
npm uninstall -D ghooks
npm install -D ghooks
```

## Semantic Release

If you are creating an open source project and you would like Continuous Integration and Continuous Delivery to npm via Travis:

```bash
npm install -g semantic-release-cli  
semantic-release-cli setup
```

Then copy the contents of `.travis-sample.yml` into the generate `.travis.yml` 
