---
categories: ["Testing", "Cypress"]
date: 2021-11-05T09:00:00Z
published: false
title: Cypress Grep - Increase Performance
---

By default, for the [Cypress grep plugin](https://github.com/cypress-io/cypress-grep) when using the grep and grepTags all of the specs are executed and then each the filters are applied. This can be very wasteful, if only a few specs contain the grep in the test titles. Thus when doing the positive grep, you can pre-filter specs using the grepFilterSpecs=true parameter.

<!--more-->

## Examples

**Example 1:**  To filter all specs first and then only run the suite or tests that match the title "it loads"

```shell
$ npx cypress run --env grep="it loads",grepFilterSpecs=true
```

**Example 2:** To filter all spec files and only run the specs with the tag "@smoke"

```shell
$ npx cypress run --env grepTags=@smoke,grepFilterSpecs=true
```

## Notes

**Note 1:** this requires installing this plugin in your project's plugin file like we did in our first [Cypress Grep Plugin](/cypress-grep) post.

**Note 2:** the grepFilterSpecs option is only compatible with the positive grep and grepTags options, not with the negative "!..." filter.

**Note 3** if there are no files remaining after filtering, the plugin prints a warning and leaves all files unchanged to avoid the test runner erroring with "No specs found".

## Tip

You can set this environment variable in the cypress.json file to enable it by default and skip using the environment variable:

```json
{
  "env": {
    "grepFilterSpecs": true
  }
}
```

By implement the grepFilterSpecs, you will get much better performance from Cypress grep as your tests suite grows in size.
