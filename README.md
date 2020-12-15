# Angular starter

<!-- toc -->

- [IMPORTANT](#important)
  - [Forks of this branch + Package.json](#forks-of-this-branch--packagejson)
- [Quickstart](#quickstart)
- [Useful commands](#useful-commands)
- [Folders](#folders)
- [Fonts](#fonts)
- [Assets](#assets)

<!-- tocstop -->

## IMPORTANT

### Forks of this branch + Package.json

- make sure the "name" attribute in the package.json is the same as the bitbucket repo-slug
- Please keep the version info in the package-json up-to-date as this will be
  used to build docker images.

### appsettings

- Put your settings in `assets/appsettings.json`
- override some of them for the specific environments in `deployment/${environmentName}/appsettings.json`
- a 404 is EXPECTED when you run this in development. The file
  `appsettings.production.json` will be added in production environments only.
  Ignore it.

## Quickstart

1. `npm install`
2. `npm start` or `npm run server:dev:hmr`

## Useful commands

| Command                                          | function                                                        |
| ------------------------------------------------ | --------------------------------------------------------------- |
| `build:prod`                                     | build production                                                |
| `tests`                                          | tests                                                           |
| `protractor`                                     | e2e tests                                                       |
| `docs:serve`                                     | run and serve typedocs                                          |
| `docs:compodoc:serve:watch`                      | run,serve and watch compodoc                                    |
| `ng generate component {dirname}/{feature-name}` | Create a new component in the src/app/dirname directory         |
| `server:prod:docker`                             | Run the app in an nginx docker container (run after build:prod) |

## Folders

```js
src/
├── app
│   ├── app.component.html // main app html
│   ├── app.component.ts // main app starting point
│   ├── app.module.ts // main module
│   ├── app.routes.ts // application routes
│   ├── features // feature based components
│   ├── infrastructure // Transformation pipes, etc
│   └── shared // shared services & directives
├── assets // assets, images, css etc
└── styles // sass styling
```

## default packages for cloning / merging included

- clone-deep
- deepmerge

## Fonts

This base repo uses [Roboto from Google](https://fonts.google.com/specimen/Roboto) for its font.
The configuration is a tad different however. Instead of a CDN we load all fonts directly from the app.
The folder structure below will explain how and where we organized things.

```js
src/
├── assets // assets, images, css etc
│   ├── fonts // font dir
│   │   └── roboto // all roboto font files we wish to include
│   └── material-icons.woff2 // Material icons
├── styles // sass styling
│   ├── robot // font-specific sass files
└───└── roboto.scss // Main sass file, set fonts to include here
```

## Assets

Assets which are included in the actual application will be hashed upon production build. The original file will be included for easy access as well.

## Good to know

### Static application settings

Use the static application settings to register settings that _have_ to loaded before the app starts.
Try to avoid this as much as possible and rely on the state instead.
Some stuff (like back-end urls) can't be loaded through state because calls depend on them.

## Deployment

When using this web client in a microservice architecture this client can be deployed on workspace level.
The `deployment/dev-inforit.cloud` directory holds Helm templates, which describes this client deployment.
