---
categories: ["Cypress", "Testing"]
date: 2020-12-27T00:00:00Z
draft: true
title: Add Cypress Code Coverage to Continuous Integration
series: ["Code Coverage"]
---

Here is how I added Cypress to my TeamCity CI builds but the steps will work in any CI system.

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

