---
categories: ["Testing", "Cypress"]
date: 2021-11-11T00:00:00Z
published: true
title: Cypress - How to run the same test again and again to confirm it is flake-free
url: '/cypress-grep-burn-in/'
series: ["Cypress Grep"]
---

So far with the [Cypress grep plugin](https://github.com/cypress-io/cypress-grep) we have looked at how to run tests with certain tags, how to run tests that have no tags, and how to increase the performance of the plugin when running filtered tests.

In this post, we are going to look at how to run tests multiple times to ensure that they are flake free.  I have several times run into issues where we think a tests is working great only to find out if you run it a 2nd time that it fails or causes other tests to fail since Cypress without the [Cypress grep plugin](https://github.com/cypress-io/cypress-grep) will only run each passing tests once.

<!--more-->

In the initial [Cypress Grep](/cypress-grep) post in this series we installed and setup the [Cypress grep plugin](https://github.com/cypress-io/cypress-grep).  If you do not have the [Cypress grep plugin](https://github.com/cypress-io/cypress-grep) installed and setup, you will need to go through that post before continuing.

As we saw in the previous post, we can filter our Cypress tests with the Cypress grep plugin like so:

```shell
// enable the tests with tag "one" or "two"
npx cypress run --env grepTags="one two"

// enable the tests with "hello" in the title
npx cypress run --env grep=hello
```

Now in order to tell the Cypress grep plugin to run the tests a certain number of times we need to add the `burn` argument and tell it the number of times to run.

For example, to run each tests 5 times, we would use the argument `burn=5` like so:

```shell
// enable the tests with tag "one" or "two"
npx cypress run --env grepTags="one two",burn=5

// enable the tests with "hello" in the title and tag "smoke"
npx cypress run --env grep=hello,burn=5
```

You might also be asking yourself why not just use the [test retries](https://docs.cypress.io/guides/guides/test-retries).  Test retries is used when a tests fails and you want to see if a rerun of  the tests makes the tests pass but if the tests passes the first time it will not run the tests a second time.  With the burn option of Cypress grep, it will run the tests the number of times you tell it to regardless if it passes or not.
