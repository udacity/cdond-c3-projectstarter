# Frontend Boilerplate with React, Redux & TypeScript

A bare minimum react-redux-webpack-typescript boilerplate with TodoMVC example.

[Live demo](https://rokoroku.github.io/react-redux-typescript-boilerplate)

Note that this project does not include **Server-Side Rendering**, **Static code analysis**, **Testing Frameworks** and other stuffs that makes the package unnecessarily complicated. (e.g. yarn, tslint, jest, ...)  
If needed, please fork this repository and add your own that meets your requirements.

Ideal for creating React apps from the scratch.

See also: [react-mobx-typescript-boilerplate](https://github.com/rokoroku/react-mobx-typescript-boilerplate)

## Contains

- [x] [Typescript](https://www.typescriptlang.org/) 3
- [x] [React](https://facebook.github.io/react/) 16.4
- [x] [Redux](https://github.com/reactjs/redux) 4
- [x] [React Router](https://github.com/ReactTraining/react-router) 4.3
- [x] [React Router Redux](https://github.com/reactjs/react-router-redux) 5
- [x] [Redux DevTools Extension](https://github.com/zalmoxisus/redux-devtools-extension)
- [x] [TodoMVC example](http://todomvc.com)

### Build tools

- [x] [Webpack](https://webpack.github.io) 4
  - [x] [Tree Shaking](https://medium.com/@Rich_Harris/tree-shaking-versus-dead-code-elimination-d3765df85c80)
  - [x] [Webpack Dev Server](https://github.com/webpack/webpack-dev-server)
- [x] [Typescript Loader](https://github.com/TypeStrong/ts-loader)
- [x] [PostCSS Loader](https://github.com/postcss/postcss-loader)
  - [x] [PostCSS Preset Env](https://preset-env.cssdb.org/)
  - [x] [CSS modules](https://github.com/css-modules/css-modules)
- [x] [React Hot Loader](https://github.com/gaearon/react-hot-loader)
- [x] [Mini CSS Extract Plugin](https://github.com/webpack-contrib/mini-css-extract-plugin)
- [x] [HTML Webpack Plugin](https://github.com/ampedandwired/html-webpack-plugin)
- [x] [Prettier](https://github.com/prettier/prettier)

## Setup

```
$ npm install
```

## Running

```
$ npm start
```

## Build

```
$ npm run build
```

## Prettier

```
$ npm run prettier
```

# License

MIT

# Glee-Specific Config

## Connecting to Backend

During build, CRA will import the backend API url from `API_URL` which you can use via `process.env.API_URL`. To change the value of this locally, add that as an environment variable and set it to whatever you need. You can also create a `.env` file, of course.

Example:

```
API_URL=http://localhost:3030
```

## Relative Paths in HTML

When deploying to a folder instead of the root on a web server, you need paths to resources to be relative (ex: `./scripts` instead of `/scripts`). To force webpack to generate relative paths, add a `FRONTEND_URL` to your environment with the url to your application.

## Logging

We are using Loggly to track log messages remotely. If you want to send your logs to Loggly for some reason, you should configure the following variables in your environment (either with `.env` or in your operating system):

```
LOGGLY_SUBDOMAIN=yoursubdomain
LOGGLY_TOKEN=yourlogglytoken
LOGGLY_LEVEL=info
```

## E2E Tests with Ghost Inspector

You will need the following env vars for Ghost Inspector tests to run in CI/CD:

```
GHOST_SUITE_ID=5bdb36e08faf2b12926e7cf4
GHOST_API_KEY=da6f8fa10c129df055519e634530b531d3c068e5
```
