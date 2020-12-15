# Changelog

All notable changes to this project will be documented in this file.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [3.0.6]

- "changed" (/fixed, but is it really a fix if it was intentional?) the merging of the appsettings to be done by "deepmerge" instead of "shallow merge with spread operator"
- Added npm package: clone-deep

## [3.0.5]

- When the user isn't **authenticated** and is sent to the unauthorized page the system will now send the user to the STS to go get authenticated. This removes the manual step of logging in.

## [3.0.4]

- updated unauthorized component to close all dialogs when loaded. Prevent dialogs to remain open when user has been automatically logged out for instance.

## [3.0.3]

### changes

- updated deployment script so that the urls contain https (otherwise STS will complain) + fixed prefix

## [3.0.2]

### fixed

When deploying automatically the production settings are reset and only the BackendBaseUrl is being updated.
This update fixes that by placing an optional deployment.js file into the deployment directory which will be invoked by the workspace to dynamically change the appsettings.json file

## [3.0.1]

### fixed

Prevented the "silent-renew.html" url to be set as a redirect. The user would either get to see the silent-renew url (which is blank) or home.
Now the user will be redirected to the place they just were.

## [3.0.0] upgrade to Angular 9

### notes

- ngxs updated to @dev to support Angular 9
- @angular/flex-layout updated to dev version 9
- updated @angular-material
- migrated Perfectscrollbar to Angular 9
- Apps now support tsconfig through angular.json
- removed moment
- integrated angular-cli and updated the workspace to angular-cli v9

## [2.0.1]

- minor/patch package updates and related bugfixes :)
  **note** state selectors can no longer be private

## [2.0.0]

- Removed TSlint
- Added Eslint
- Added running Eslint in the pipelines
- Fixed all existing eslint errors

## [1.3.0]

## added

- explanation of appsettings

## deleted

- removed confusing appsettings files
- removed legacy deploy step

## [1.2.0]

## Add

- Added cpu/ memory limits for the pod which is hosting the app.

## [1.1.3]

### fixed

- Fixed the bug that prevented error messages from bubbling up :)

## [1.1.2]

### fixed

- Fixed the bug which prevented silent-renew

## [1.1.1]

### changed

- changed login storage to localstorage to enable multiple tab support

## [1.1.0]

### added

Added basic authentication

## [1.0.1]

### Changed

- Updated (deployment) ingess.yaml configuration file. Due to be compatible with [cert-manager](https://cert-manager.io/) 0.12.0
