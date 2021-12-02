---
categories: ["Cypress", "Testing", "Angular"]
date: 2021-12-02T13:00:00Z
published: true
title: "Angular - Add Code Coverage to Your Cypress Tests"
url: '/cypress-code-coverage'
series: ["Cypress Code Coverage"]
---

Welcome to part one of our two part series on Angular code coverage for Cypress tests.

As I have implemented more automated tests, one of the must haves for me is code coverage reports.  Code coverage allow me to quickly and easily see which lines of the code are not being tested so I can close any critical testing gaps.

Today, I am going to be talking specifically about how to implement code coverage for an Angular project that was generated from the Angular CLI.

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

1. Once Cypress is installed, we need to initialize Cypress by running

    ```bash
    npx cypress open
    ```

The Cypress open command will:

* create the cypress directory structure
* create a cypress.json configuration file in the root of your project
* create a set of sample tests in the cypress\integration\examples folder

![Cypress Open First Time](/images/code-coverage/cypress-open-examples.png)

You can now close the Cypress UI.

> You can also safely delete the cypress\integration\1-getting-started and 2-advanced-examples folders as they are just examples and we won't be using them.

## Dependencies

We will be using the Cypress code coverage plugin to generate the code coverage reports.  Install it from npm as a development dependency by running:

```bash
npm install --save-dev @cypress/code-coverage
```

## Instrumenting Your Code

In order for you to gather code coverage metrics, the code coverage needs to know which lines of code are being touched by the tests.  This is called instrumenting your code.

Cypress does not instrument your code - you need to do it yourself. We will be using the [Istanbul](https://istanbul.js.org/) library along with the command-line interface for the [Istanbul](https://istanbul.js.org/) library, [nyc](https://github.com/istanbuljs/nyc).

```bash
npm install --save-dev @istanbuljs/nyc-config-typescript babel-plugin-istanbul istanbul-lib-coverage nyc source-map-support
```

Since we are using Angular, we also need to inject the command to instrument our code as part of the Angular build process (`ng build`).  By default with the Angular CLI there is no way to inject anything extra into the webpack configuration when you build or serve your application but luckily we can use [ngx-build-plus](https://www.npmjs.com/package/ngx-build-plus) to inject the extra webpack configurations as part of the normal Angular build and serve commands.

> WARNING: Never run the build with the code coverage instrumentation as your production build (e.g ng build --prod).  It will cause major performance issues since it tracks each line of code that is called.

To install [npx-build-plus](https://www.npmjs.com/package/ngx-build-plus) run:

```bash
ng add ngx-build-plus
```

> This will install ngx-build-plus and configure angular.json for `ng serve`  and `ng build` to use ngx-build-plus

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
              loader: 'babel-loader',
              options: {
                plugins: ['babel-plugin-istanbul']
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

## Configuring the Code Coverage Report

Next up we need to configure the [nyc](https://github.com/istanbuljs/nyc) command line interface for the [Istanbul](https://istanbul.js.org/) library that determines how our code coverage report is generated.

1. Open the package.json file
1. Add a new section at the bottom before the closing `}` bracket.

    ```txt
    "nyc": {
      "extends": "@istanbuljs/nyc-config-babel",
      "all": true,
      "exclude": [
        "**/cypress/**",
        "**/coverage/**",
        "karma.conf.js",
        "src/test.ts",
        "**/*.spec.ts"
      ],
      "reporter": [
        "html"
      ]
    }
    ```

> The exclude above just makes the report cleaner by not including directories and files that are related to testing and not the actual production code!

## Configure Cypress Code Coverage Plugin

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

## Creating Our First Test

Before we can test our code coverage, we need to create a tests for our Angular application.  We are going to create a simple tests that navigates to the home page and makes sure that the H1 tags has the correct text.

1. In the cypress/integration folder, create a new file called `homepage.spec.js`
1. In the `homepage.spec.js` file, add the following text

    ```javascript
    describe('Sample Tests for the Home Page', () => {
      it('Does Home Page Load', () => {
        cy.visit('/');
        cy.get(".highlight-card > span").should(
          "contain",
          "CypressCodeCoverageDemo app is running!"
        );
      })
    });
    ```

## Generating the Code Coverage Report

We are almost ready to ready to run our code coverage.

The last thing we need to do before running our tests is to tell Cypress what the url for our Angular application is (e.g. localhost:4200)

1. open the cypress.json file in the root of your Angular project
1. Add the baseUrl value instead of the {}

    ```txt
    "baseUrl": "http://localhost:4200"
    ```

Now we are ready to run our tests.

First we need to start up the Angular Dev Web Server with ng serve and tell it to include our extra webpack configuration

1. Within Visual Studio Code, open the Integrated Terminal (Ctrl+`)
1. Run the following start the Angular Dev Web Server with the Code Instrumented by running

    ```bash
    ng serve --extra-webpack-config ./cypress/coverage.webpack.js
    ```

Second, we need to start up the Cypress UI with code coverage enabled.

1. Within the Integrated Terminal click the + button to create a 2nd terminal
1. To run, Cypress with code coverage by running the following:

    ```bash
    npx cypress open --env coverage=true
    ```

1. When the UI launches, cl;ick on the "Run 1 integration spec"
1. When the test runs, it will create a coverage report as well as if you look at the log for the 1 tests that we have, will see 3 messages about the code coverage.

![Cypress UI with Coverage Messages](/images/code-coverage/cypress-code-coverage-in-ui.png)

## Viewing Code Coverage Report

Once all of your tests are done running, you can find the coverage report in the root of your project in the coverage\index.html file.

The two numbers that I typically look at are lines and statements.  Lines says has the line been touched while statements says has every statement on the line been touched by a test.  For example `var x = 10;console.log(x)` is 1 line and 2 statements.

![Code Coverage Report](/images/code-coverage/code-coverage-report-ui.png)

You can also click on any folder or file and drill down in to see which lines of code were covered and which lines were not covered.

## Recap

Lets do a quick recap of what we accomplished.

1. Installed the Cypress Code Coverage plugin
1. Added instrumentation dependencies of istanbul and nyc
1. Added an extra webpack config to call babel-plugin to instrument your code
1. Updated the Angular build to use ngx-build-plus
1. Configured the Cypress Code Coverage plugin
1. Generated the code coverage report
1. Reviewed the code coverage report

In our next article, we will add the running of the code coverage report to TeamCity builds, set up failure metrics, and be able to view the report within TeamCity.
