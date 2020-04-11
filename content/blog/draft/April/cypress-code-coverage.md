---
categories: ["Cypress", "Testing"]
date: 2020-04-12T00:00:00Z
draft: true
title: Add Code Coverage to Your Cypress Tests
series: ["Code Coverage"]
---

## Dependencies

```json
"@cypress/code-coverage": "^1.12.2",
"@istanbuljs/nyc-config-typescript": "^1.0.1",
"cypress": "^4.1.0",
"istanbul-instrumenter-loader": "^3.0.1",
"istanbul-lib-coverage": "^3.0.0",
"ngx-build-plus": "^8.1.3",
"npm-run-all": "^4.1.5",
"nyc": "^15.0.0",
"source-map-support": "^0.5.16",
```

## nyc TeamCity Config

```json
 "nyc": {
    "extends": "@istanbuljs/nyc-config-typescript",
    "all": true
  }
```

## npm scripts

```json
"start": "ng serve",
"cy:open": "cypress open --env coverage=true"
```

