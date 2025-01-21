---
categories: ["Angular"]
published: 2021-11-23T13:00:00Z

url: "/angular-migrate-to-eslint/"
title: Migrating Angular from tslint to to eslint
---
Since the Angular CLI was released it has included linting using the `ng lint` command.  With the release of Angular v11 it was announced that tslint which `ng lint` used behind the scenes for the linting was being replaced with eslint.

To make the migration to eslint easier for your existing project they created a couple of tools that automate almost the whole migration process for us.

I was able to finish the migration start to finish in about 30 minutes.

<!--more-->

## Installing Dependencies

The first step is to add the [@angular-eslint schematic](https://github.com/angular-eslint/angular-eslint) to your project. This schematic will handle installing the latest version of all the relevant devDependencies to your package.json so that you can run eslint.

```shell
ng add @angular-eslint/schematics
```

> This will install the latest package which is compatible with Angular v13 (as of this writing).  If you need a version that is compatible with a previous Angular version you can add a @ at the end followed by the major Angular version number.  For example for Angular v11 use `ng add @angular-eslint/schematics@11` and for Angular v12 use `ng add @angular-eslint/schematics@12`

You are now ready to do the actual migration.

## Running the Migration

To make the migration easier they created another schematic that automates pretty much the whole migration for us.

If you just have a single project in your workspace you can just run:

```shell
ng g @angular-eslint/schematics:convert-tslint-to-eslint
```

> Make sure to install the same major version of this schematic using the same @ trick as above.

If you have a projects/directory or similar in your workspace, you will have multiple entries in your projects configuration and you will need to chose which one you want to migrate using the convert-tslint-to-eslint schematic:

```shell
ng g @angular-eslint/schematics:convert-tslint-to-eslint {PROJECT_NAME}
```

> Make sure to install the same major version of this schematic using the same @ trick as above.

The schematic will do the following for you:

* Read your project's tslint.json and use it to create a .eslintrc.json at the root of the specific project which extends from the root config (if you do not already have a root config, it will also add one automatically for you).
  * .eslintrc.json will be the closest possible equivalent to your tslint.
  * Keep an eye on the terminal output because it will let you know if it couldn't find an appropriate converter for a tslint rule, or if it has installed any additional eslint plugins.
* Update the project's angular.json so that lint will use eslint.
* Update any tslint:disable comments that are located within your TypeScript source files to eslint equivalent if possible.
* If you choose YES for the --remove-tslint-if-no-more-tslint-targets option, it will also automatically remove tslint and codelyzer for you.

You are now ready to test that linting still works.

## Test Linting is Still Working

Now that we have updated to eslint we need to make sure that the linting configuration is working.

To run linting on your project you still use the ng lint command like you did before.

If you have a single project you can just run:

```shell
npx ng lint
```

If you have multiple projects, you need to tell ng lint which project to lint:

```shell
npx ng lint {PROJECT_NAME}
```

You may still need to manually fix some configurations.  The linting output will throw errors for anything that it cannot figure out what to do with that needs manual intervention.

For my projects, it migrated 99% of the linting configuration.  I only had a couple of places in my code where I had an inline tslint:disable rule that the migration was not able to figure what to do with.

## Disabling Rules That You Do Not Want

You might also decide that you want to alter a built-in rule after you run `ng lint`.

The first time I ran `ng lint` after the migration, I had a like 100 warnings about empty Angular lifecycle events which meant that I had ngOnInit or other Angular lifecycle methods that had no code within the method.

For me this rule did not provide any value to use so my project decided to disable the rule by adding it to the .eslintrc.json overrides rules configuration.

To disable the the Angular empty lifecycle event rule, you need to add it to the overrides rules section in your .eslintrc.json configuration file.

```json
{
  "overrides": [
    {
      "rules": {
        "@angular-eslint/no-empty-lifecycle-method": "off"
      }
    }
  ]
}
```

If you have any other rules that are flagging that you want to adjust, you can add them to the overrides rules.  You might

Now your project is migrated to eslint and your linting command will continue to run as it always has.
