---
categories: ["testing", "Cypress"]
published: 2021-11-03T00:00:00Z

title: Cypress Run Tests That Do Not Have Any Tags
url: '/cypress-grep-no-tags/'
series: ["Cypress Grep"]
---

In the previous post on the [Cypress Grep Plugin](/cypress-grep) we installed and went through the basics of how to run just tests that have certain tags but what if you want to run all tests that do not have any tags?

<!--more-->

Luckily, it is really easy to run all tests that are not tagged by using the `grepUntagged=true` parameter when running Cypress.

```shell
 npx cypress run --env grepUntagged=true
```
