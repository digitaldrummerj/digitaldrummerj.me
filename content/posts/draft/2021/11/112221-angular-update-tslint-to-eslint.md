---
categories: ["Angular"]
date: 2021-11-22T13:00:00Z
published: false
title: Migrating Angular from tslint to to eslint
---
Since the Angular CLI was released it has included linting using the ‘ng lint’ command.  With the release of Angular v11 it was announced that tslint which ‘ng lint’ used behind the scenes for the linting was being replaced with eslint. 

To make the migration to eslint easier for your existing project they have created several tool s to assist us.

<!--more-->

## Add relevant dependencies

The first step is to run the schematic to add @angular-eslint to your project.  

This will handle installing the latest version of all the relevant packages for you and adding them to the devDependencies of your package.json.

```shell
ng add @angular-eslint/schematics
```

> This will install the latest package which is compatible with Angular v13 (as of this writing).  If you need a version that is compatible with a previous Angular version you can add a @ at the end followed by the major Angular version number.  For example for Angular v11 use ‘ng add @angular-eslint/schematics@11’ 

## Run the convert-tslint-to-eslint schematic on a project

Next, we need to migrate our tslint to eslint.  To make the migration easier they created a schematic that automate most of the migration for us.

If you just have a single project in your workspace you can just run:

```shell
ng g @angular-eslint/schematics:convert-tslint-to-eslint
```

> Make sure to indtall the same major version of this schematic as you did above.

If you have a projects/ directory or similar in your workspace, you will have multiple entries in your projects configuration and you will need to chose which one you want to migrate using the convert-tslint-to-eslint schematic:

```shell
ng g @angular-eslint/schematics:convert-tslint-to-eslint {{YOUR_PROJECT_NAME_GOES_HERE}}
```

> Make sure to indtall the same major version of this schematic as you did above.

The schematic will do the following for you:

* Read your chosen project's tslint.json and use it to CREATE a .eslintrc.json at the root of the specific project which extends from the root config (if you do not already have a root config, it will also add one automatically for you).
  * The contents of this .eslintrc.json will be the closest possible equivalent to your tslint.json that the tooling can figure out.
  * You will want to pay close attention to the terminal output of the schematic as it runs, because it will let you know if it couldn't find an appropriate converter for a TSLint rule, or if it has installed any additional ESLint plugins to help you match up your new setup with your old one.
* UPDATE the project's architect configuration in the angular.json to such that the lint "target" will invoke ESLint instead of TSLint.
* UPDATE any instances of tslint:disable comments that are located within your TypeScript source files to their ESLint equivalent.
* If you choose YES (the default) for the --remove-tslint-if-no-more-tslint-targets option, it will also automatically remove TSLint and Codelyzer from your workspace if you have no more usage of them left.

## Linting

Now that we have updated to eslint we need to male sure that the nee linting configuration is working.

To run linting on your project you still use the ng lint command like you did before and now it will use eslint.

If you have a single project you can just run:

```shell
npx ng lint
```

If you have multiple projects, you need to tell ng lint which project to lint:

```shell
npx ng lint {{YOUR_PROJECT_NAME_GOES_HERE}}
```

You may have to still manually fix some configurations.  The linting output will throw errors for anything that it cannot figure out what to do with and needs intervention.

For my projects, it migrated 99% of the linting configuration.  I only had a couple of places in my code where I had tslint rules to disable a rule for a block of code and the migration schematic was not able to figure what to do with the rule.  In my case, the rule no longer existed and jist needed to be removed.

Also,  one of the new rules that I disabled was to not allow empty Angular lifecycle events.  As the Angular CLI by default creates am empty ngInit lifecycle method, we had over 100 places in our code with this warning amd it didnt feel value added to go amdnfix all of them so I disabled the rule instead.

To disable the config, you need to add it to the overrides section in the .eslintrc.json configuration file.

```json
???
```

Now your project is migrated to eslint and your linting command will continue to run as it always has.