---
categories: ["Cypress", "Testing", "Angular"]
date: 2021-12-06T13:00:00Z
draft: true
title: Add Cypress Code Coverage to Continuous Integration
url: '/cypress-code-coverage-ci'
series: ["Cypress Code Coverage"]
---

In the previous article, we hooked up Cypress code coverage for our Angular project.  In this article, I will walk you through how to setup the code coverage to run as part of your automated builds.

I am using TeamCity for my automated builds, but you can use any provider that you would like.

<!--more-->

## Dependencies

```json
    "angular-http-server": "^1.9.0",
    "mocha": "^7.1.0",
    "mocha-teamcity-reporter": "^3.0.0",
    "npm-run-all": "^4.1.5",

```

## nyc TeamCity Config

```json
"nyc": {
    "extends": "@istanbuljs/nyc-config-typescript",
    "all": true,
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
    "build:prod": "node --max_old_space_size=8192 ./node_modules/@angular/cli/bin/ng build --prod --progress=false",
    "build:prod:coverage": "node --max_old_space_size=8192 ./node_modules/@angular/cli/bin/ng build --extra-webpack-config ./cypress/coverage.webpack.js --progress=false",
    "lint": "ng lint --format stylish",
    "lint:ci": "ng lint --format tslint-teamcity-reporter",
    "ci": "run-s lint:ci build:prod ci:cypress",
    "ci:cypress": "start-server-and-test ci:start-server http://localhost:4200 cy:run",
    "ci:start-server": "angular-http-server --path ./dist -p 4200 --silent",
    "cy:run": "cypress run --browser chrome --headless --reporter mocha-teamcity-reporter --env coverage=false",
    "ci:coverage": "run-s build:prod:coverage ci:cypress:coverage",
    "ci:cypress:coverage": "start-server-and-test ci:start-server http://localhost:4200 cy:run:coverage",
    "cy:run:coverage": "cypress run --browser chrome --headless --reporter mocha-teamcity-reporter --env coverage=true --config video=false",
    "cy:open": "cypress open --env coverage=false"
  },
```

