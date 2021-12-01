---
categories: ["Cypress", "Testing", "Angular"]
date: 2021-12-02T13:00:00Z
published: true
title: "Angular - Add Code Coverage to Your Cypress Tests"
url: '/cypress-code-coverage'
---

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
npm install --save-dev @istanbuljs/nyc-config-typescript babel-plugin-istanbul istanbul-lib-coverage nyc source-map-support
```

Since we are using Angular, we also need to inject the command to instrument our code as part of the Angular build process (`ng build`).  By default with the Angular CLI there is no way to inject anything extra into the webpack configuration when you build or serve your application but luckily we can use [ngx-build-plus](https://www.npmjs.com/package/ngx-build-plus) to inject the extra webpack configurations as part of the normal Angular build and serve commands.

> WARNING: Never run the build with the code coverage instrumentation as your production build (e.g ng build --prod).  It will cause major performance issues since it tracks each line of code that is called.

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

### Updating Angular.json to use ngx-build-plus

Now that we have  [npx-build-plus](https://www.npmjs.com/package/ngx-build-plus) installed we need to configure our project to use it when the Angular CLI builds and serves our code.

> The reason we are doing it at build time instead of when serving is because eventually we will be running this from our automated builds where we aren't using `ng serve`.

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

Now the Angular CLI will use the ngx-build-plus library to build and serve our Angular App.  You shouldn't notice any difference when using the ngx-build-plus library.

## nyc Configuration

Next up we need to configure the [nyc](https://github.com/istanbuljs/nyc) command line interface for the [Istanbul](https://istanbul.js.org/) library.

1. Open the package.json file
1. Add a new section at the bottom before the closing `}` bracket.

```json
, "nyc": {
  "extends": "@istanbuljs/nyc-config-typescript",
  "all": true,
  "reporter": [
      "html"
    ]
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
1. Added an extra webpack config to call bag el-plugin to instrument your code
1. Change the Angular build to use ngx-build-plus
1. Confgure the Cypress Code Coverage plugin
1. Run the tests and generate the code coverage reports
1. Review the code coverage report

In our next article in our code coverage series, we will add the running of the code coverage report to TeamCity builds.
