---
categories: ["Angular"]
date: 2021-11-22T00:00:00Z
published: false
title: Angular CLI Upgrade to eslint
---

## Migrating an Angular CLI project from Codelyzer and TSLint


## Add relevant dependencies

The first step is to run the schematic to add @angular-eslint to your project:

```shell
ng add @angular-eslint/schematics
```

This will handle installing the latest version of all the relevant packages for you and adding them to the devDependencies of your package.json.

## Run the convert-tslint-to-eslint schematic on a project

If you just have a single project in your workspace you can just run:

```shell
ng g @angular-eslint/schematics:convert-tslint-to-eslint
```

If you have a projects/ directory or similar in your workspace, you will have multiple entries in your projects configuration and you will need to chose which one you want to migrate using the convert-tslint-to-eslint schematic:

```shell
ng g @angular-eslint/schematics:convert-tslint-to-eslint {{YOUR_PROJECT_NAME_GOES_HERE}}
```

The schematic will do the following for you:

* Read your chosen project's tslint.json and use it to CREATE a .eslintrc.json at the root of the specific project which extends from the root config (if you do not already have a root config, it will also add one automatically for you).
  * The contents of this .eslintrc.json will be the closest possible equivalent to your tslint.json that the tooling can figure out.
  * You will want to pay close attention to the terminal output of the schematic as it runs, because it will let you know if it couldn't find an appropriate converter for a TSLint rule, or if it has installed any additional ESLint plugins to help you match up your new setup with your old one.
* UPDATE the project's architect configuration in the angular.json to such that the lint "target" will invoke ESLint instead of TSLint.
* UPDATE any instances of tslint:disable comments that are located within your TypeScript source files to their ESLint equivalent.
* If you choose YES (the default) for the --remove-tslint-if-no-more-tslint-targets option, it will also automatically remove TSLint and Codelyzer from your workspace if you have no more usage of them left.

## Linting

To run linting on your project you still use the ng lint command like you did before and now it will use eslint.

If you have a single project you can just run:

```shell
npx ng lint
```

If you have multiple projects, you need to tell ng lint which project to lint:

```shell
npx ng lint {{YOUR_PROJECT_NAME_GOES_HERE}}
```
