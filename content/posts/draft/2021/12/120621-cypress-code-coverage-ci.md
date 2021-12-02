---
categories: ["Cypress", "Testing", "Angular"]
date: 2021-12-06T13:00:00Z
draft: true
title: Angular - Add Code Coverage to Automated Builds in TeamCity
url: "/cypress-code-coverage-teamcity"
series: ["Cypress Code Coverage"]
---

Welcome to part two of our two part series on Angular code coverage.

In the previous article, we hooked up Cypress code coverage for our Angular project.  In this article, I will walk you through how to setup the code coverage to run as part of the builds in TeamCity.

<!--more-->

## Dependencies

```json
"angular-http-server": "^1.9.0",
"npm-run-all": "^4.1.5",
```

## nyc TeamCity Config

To our nyc configuration in the package.json file, we need to add the teamcity reporter.

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
    "html",
    "teamcity"
  ]
}
```

## npm scripts

```json
 "scripts": {
    "start": "ng serve",
    "build": "ng build",
    "build:prod": "ng build --prod --progress=false",
    "build:prod:coverage": "ng build --extra-webpack-config ./cypress/coverage.webpack.js --progress=false",
    "ci": "run-s build:prod ci:cypress",
    "ci:cypress": "start-server-and-test ci:start-server http://localhost:4200 cy:run",
    "ci:start-server": "angular-http-server --path ./dist -p 4200 --silent",
    "cy:run": "cypress run --browser chrome --headless --reporter mocha-teamcity-reporter --env coverage=false",
    "ci:coverage": "run-s build:prod:coverage ci:cypress:coverage",
    "ci:cypress:coverage": "start-server-and-test ci:start-server http://localhost:4200 cy:run:coverage",
    "cy:run:coverage": "cypress run --browser chrome --headless --reporter mocha-teamcity-reporter --env coverage=true --config video=false",
    "cy:open": "cypress open --env coverage=false"
  },
```
