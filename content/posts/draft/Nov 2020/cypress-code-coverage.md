---
categories: ["Cypress", "Testing", "Angular"]
date: 2020-12-20T00:00:00Z
draft: true
title: "Angular - Add Code Coverage to Your Cypress Tests"
series: ["Code Coverage"]
---

In part 1 of the series we talked about why you need code coverage so you aren't testing in the dark and can make data-driven decisions on if you have actually tested your code the way you think you have.

In this article in the series on code coverage, we are going to add code coverage reports to our [Cypress](https://cypress.io) tests.  For our sample project we are using Angular but the step can apply to any project that is using Cypress.  The sample project is a new Angular project (e.g. ng new) that I have added Cypress tests to.

## Get The Code

You can find the sample project at [https://github.com/digitaldrummerj/cypress-code-coverage-demo](https://github.com/digitaldrummerj/cypress-code-coverage-demo).

## Generate Our Sample Project

Before getting started, we need to generate our sample project using the [Angular CLI](https://angular.io/cli).

```bash
ng new CypressCodeCoverageDemo --style scss --routing
```

## Adding Cypress

Now we need to add Cypress to our project

1. Navigate to the CypressCodeCoverageDemo folder that the `ng new` command created for us.

    ```bash
    cd CypressCodeCoverageDemo
    ```

1. Now we need to install Cypress as a development dependency

    ```bash
    npm install --save-dev cypress
    ```

1. Once Cypress is installed, we need to initalize Cypress by running

    ```bash
    npx cypress open
    ```

The Cypress open command will:

* create the cypress directory structure
* create a cypress.json configuration file in the root of your project
* create a set of sample tests in the cypress\integration\examples folder

![Cypress Open First Time](/images/code-coverage/cypress-open-examples.png)

> You can safely delete the cypress\integration\examples folder as we won't be using them.

You can now close the Cypress UI.

## Dependencies

We will be using the Cypress code coverage plugin to generate the code coverage reports.  Install it from npm as a development dependency by running:

```bash
npm install --save-dev @cypress/code-coverage
```

## Instrumenting Your Code

In order for you to gather code coverage metrics, the code coverage needs to know which lines of code are being touched by the tests.  This is called instrumenting your code.

Cypress does not instrument your code - you need to do it yourself. We will be using the [Istanbul](https://istanbul.js.org/) library along with the command-line interface for the [Istanbul](https://istanbul.js.org/) library, [nyc](https://github.com/istanbuljs/nyc).

```bash
npm install --save-dev @istanbuljs/nyc-config-typescript istanbul-instrumenter-loader istanbul-lib-coverage nyc source-map-support
```

Since we are using Angular, we also need to inject the command to instrument our code as part of the Angular build process (`ng build`).  By default with the Angular CLI there is no way to inject anything extra into the webpack configuration when you build or serve your application.  If you wanted to inject custom configuration like instrumenting the code, you would have to eject your project from the Angular build system and manage the webpack configuration yourself.  Instead with [ngx-build-plus](https://www.npmjs.com/package/ngx-build-plus) you can inject the extra webpack configurations as part of the normal Angular build and serve commands that the Angular CLI provides.

> WARNING: Never run the build with the code coverage instrumentation as your production build.  It will cause major performance issues since it tracks each line of code that is called.

To install [npx-build-plus](https://www.npmjs.com/package/ngx-build-plus) as development dependency run:

```bash
npm install --save-dev ngx-build-plus
```

### Adding Webpack Config

Once [npx-build-plus](https://www.npmjs.com/package/ngx-build-plus) is installed, we need to add the configuration that we want webpack to use.

1. Open the CypressCodeCoverageDemo folder in your favorite code editor.  Personally, I am using [Visual Studio Code](https://code.visualstudio.com/)
1. Create a new file in the Cypress folder called `coverage.webpack.js`
1. Add the following code to the `coverage.webpack.js` file.

    ```javascript
    module.exports = {
      module: {
        rules: [
          {
            test: /\.(ts)$/,
            use: {
              loader: 'istanbul-instrumenter-loader',
              options: {
                debug: true,
                esModules: true
              }
            },
            enforce: 'post',
            include: require('path').join(__dirname, '..', 'src'),
            exclude: [
              /node_modules/,
              /cypress/,
              /(ngfactory|ngstyle)\.js/]
          },
        ],
      },
    };
    ```

### Updating Angular.json to use ngx-build-plus

Now that we have  [npx-build-plus](https://www.npmjs.com/package/ngx-build-plus) installed we need to configure our project to use it when the Angular CLI builds and serves our code.   The reason we are doing it at build time instead of when serving is because eventually we will be running this from our automated builds where we aren't using `ng serve`.

1. Open the `angular.json` file
1. Find the the architect -> build section
1. Change the builder to ngx-build-plus:browser like below

  ```json
  "build": {
          "builder": "ngx-build-plus:browser",
  }
  ```

1. Find the architect -> serve section
1. Change the builder to ngx-build-plus:dev-server like below

  ```json
  "serve": {
    "builder": "ngx-build-plus:dev-server",
    "options": {
      "browserTarget": "CypressCodeCoverageDemo:build"
    },
  },
  ```

Now the Angular CLI will use the ngx-build-plus library to build and serve our Angular App.  You shouldn't notice any difference when using the ngx-build-plus library.  Later, we will add a script into our package.json to tell ngx-build-plus where our additional webpack configuration is located since as I mentioned before we don't always want to instrument our code since it will impact performance.

## nyc Configuration

Next up we need to configure the [nyc](https://github.com/istanbuljs/nyc) command line interface for the [Istanbul](https://istanbul.js.org/) library.

1. Open the package.json file
1. Add a new section at the bottom before the closing `}` bracket.

```json
, "nyc": {
  "extends": "@istanbuljs/nyc-config-typescript",
  "all": true
}
```

## Telling Cypress to Include Our Code Coverage Plugin

Earlier, we installed the cypress code coverage plugin but we haven't told Cypress about the plugin yet.  To use the code coverage plugin, we need to wire it up in the `cypress/plugin/index.js` and `cypress/support/index.js` files.

1. Open the cypress/plugin/index.js file and add the following code inside of the module.exports:

  ```javascript
    require("@cypress/code-coverage/task")(on, config);
    return config;
  ```

1. Open the cypress/support/index.js file and add the following code:

  ```javascript
  import '@cypress/code-coverage/support';
  ```

## Adding Our First Test

Before we can test our code coverage, we need to create a tests for our Angular application.  We are going to create a simple tests that navigates to the home page and makes sure that the H1 tags has the correct text.

1. In the cypress/integration folder, create a new file called `homepage.spec.js`
1. In the `homepage.spec.js` file, add the following text

  ```javascript
  describe('Sample Tests for the Home Page', () => {
    it('Does Home Page Load', () => {
      cy.visit('/');
      cy.get('h1').should('contain', 'Welcome to CypressCodeCoverageDemo!');
    })
  }
  ```

## Running Our Code Coverage

Now we are ready to run our code coverage.  In order to run our tests, we need to start up the Angular Dev Web Server with ng serve and then start the Cypress tests from the command line.

1. Within Visual Studio Code, open the Integrated Terminal (Ctrl+`)
1. Run the following start the Angular Dev Web Server with the Code Instrumented by running

    ```bash
    ng serve --extra-webpack-config ./cypress/coverage.webpack.js
    ```

1. Within the Integrated Terminal click the + button to create a 2nd terminal
1. To run, Cypress with code coverage by running the following:

    ```bash
    npx cypress open --env coverage=true
    ```

1. Now when you run your tests, it will output a coverage report.  Within the Cypress UI, will see 3 messages about the code coverage.

      ![Cypress UI with Coverage Messages](/images/code-coverage/cypress-code-coverage-in-ui.png)

## Viewing Code Coverage Report

Once all of your tests are done running, you can find the coverage report in the root of your project in the coverage\lcov-report\src\index.html file.  The important number to look at is the lines that are covered.  In our case 8 out of 10 lines are covered.

![Code Coverage Report](/images/code-coverage/code-coverage-report-ui.png)

You can also click on any folder or file and drill down in to see which lines of code were coverage and which lines weren't covered.

## Recap

Lets do a quick  recap of what we accomplished.

1. Installed the Cypress Code Coverage plugin
1. Added instrumentation dependencies of istanbul and nyc
1. Added an extra webpack config to call istanbul to instrument your code
1. Change the Angular build to use ngx-build-plus
1. Confgure the Cypress Code Coverage plugin
1. Run the tests and generate the code coverage reports
1. Review the code coverage report

Again you can find the sample project at [https://github.com/digitaldrummerj/cypress-code-coverage-demo](https://github.com/digitaldrummerj/cypress-code-coverage-demo).

In our next article in our code coverage series, we will add the running of the code coverage report to your automated builds.


## Example Files

```json
"start": "ng serve",
"cy:open": "cypress open --env coverage=true",
"build:prod:coverage": "ng build --extra-webpack-config ./cypress/coverage.webpack.js --progress=false",

```

--- WEBPACK ---

```javascript

module.exports = {
  module: {
    rules: [
      {
        test: /\.(ts)$/,
        use: {
          loader: 'istanbul-instrumenter-loader',
          options: {
            debug: true,
            esModules: true
          }
        },
        enforce: 'post',
        include: require('path').join(__dirname, '..', 'src'),
        exclude: [
          /node_modules/,
          /cypress/,
          /(ngfactory|ngstyle)\.js/]
      },
    ],
  },
};
```

--- angular.json

```json
{
  "$schema": "./node_modules/@angular/cli/lib/config/schema.json",
  "version": 1,
  "newProjectRoot": "projects",
  "projects": {
    "CypressCodeCoverageDemo": {
      "root": "",
      "sourceRoot": "src",
      "projectType": "application",
      "architect": {
        "build": {
          "builder": "ngx-build-plus:browser",
          "options": {
            "outputPath": "dist/CypressCodeCoverageDemo",
            "index": "src/index.html",
            "main": "src/main.ts",
            "tsConfig": "tsconfig.app.json",
            "polyfills": "src/polyfills.ts",
            "aot": false,
            "assets": [
              "src/assets",
              "src/favicon.ico",
            ],
            "styles": [
              "src/styles.scss"
            ]
          },
          "configurations": {
            "production": {
                "fileReplacements": [
                {
                  "replace": "src/environments/environment.ts",
                  "with": "src/environments/environment.prod.ts"
                }
              ],
              "optimization": true,
              "outputHashing": "all",
              "sourceMap": false,
              "extractCss": true,
              "namedChunks": false,
              "aot": true,
              "extractLicenses": true,
              "vendorChunk": false,
              "buildOptimizer": true,
               "budgets": [
                {
                  "type": "initial",
                  "maximumWarning": "2mb",
                  "maximumError": "5mb"
                },
                {
                  "type": "anyComponentStyle",
                  "maximumWarning": "6kb",
                  "maximumError": "10kb"
                }
              ]
            }
          }
        },
        "serve": {
          "builder": "ngx-build-plus:dev-server",
          "options": {
            "browserTarget": "CypressCodeCoverageDemo:build"
          },
          "configurations": {
            "production": {
              "browserTarget": "CypressCodeCoverageDemo:build:production"
            }
          }
        },
        "extract-i18n": {
          "builder": "@angular-devkit/build-angular:extract-i18n",
          "options": {
            "browserTarget": "CypressCodeCoverageDemo:build"
          }
        }
      }
    }
  },
  "defaultProject": "CypressCodeCoverageDemo",
  "schematics": {
    "@schematics/angular:component": {
      "style": "scss",
      "skipTests": true
    },
    "@schematics/angular:class": {
      "skipTests": true
    },
    "@schematics/angular:directive": {
      "skipTests": true
    },
    "@schematics/angular:guard": {
      "skipTests": true
    },
    "@schematics/angular:module": {
      "skipTests": true
    },
    "@schematics/angular:pipe": {
      "skipTests": true
    },
    "@schematics/angular:service": {
      "skipTests": true
    }
  }
}
```

--- cypress\tsconfig.json ---

```json
{
  "compilerOptions": {
    "allowJs": true,
    "baseUrl": "../node_modules",
    "types": [
      "cypress"
    ]
  },
  "include": [
    "**/*.*"
  ]
}
```

--- cypress/config.json ---

```json
{
  "reporterEnabled": "spec,mocha-teamcity-reporter",
  "reporterOptions": {
    "mochaFile": "cypress/results/results-[hash].xml"
  }
}
```
