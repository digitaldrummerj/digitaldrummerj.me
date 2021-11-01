---
categories: ["Testing", "Cypress"]
date: 2021-11-01T09:00:00Z
published: true
title: Cypress Run Tests That Have Certain Tags
---

One of the features that I wish Cypress had is a way to group feature tests together so that I can run all tests for the feature I am currently coding or testing without having to put them all into the same spec file.  Now you can with the [Cypress grep plugin](https://github.com/cypress-io/cypress-grep).

<!--more-->

## Usage

With the [Cypress grep plugin](https://github.com/cypress-io/cypress-grep), you can add a tags config to each tests or describe like below that then you can use to only run tests with those tags.


```js
it('works as an array', { tags: ['config', 'some-other-tag'] }, () => {
  expect(true).to.be.true
})

it('works as a string', { tags: 'config' }, () => {
  expect(true).to.be.true
})

describe('block with config tag', { tags: '@smoke' }, () => {
})
```

Then when you call Cypress run you can use the --env parameter to filter the tests like so

```js
// enable the tests with tag "one" or "two"
npx cypress run --env grepTags="one two"

// enable the tests with both tags "one" and "two"
npx cypress run --env grepTags="one+two"

// enable the tests with "hello" in the title and tag "smoke"
npx cypress run --env grep=hello,grepTags=smoke

// run all tests with "hello world" or "auth user" in their title
$ npx cypress run --env grep="hello world; auth user"
```

## Install

Assuming that you have Cypress already installed, you add the [Cypress grep plugin](https://github.com/cypress-io/cypress-grep) as a dev dependency.

```shell
npm install --save-dev cypress-grep
```

### Support File

Once the npm install is completed, you need to add it to the support file.

Open the support/index.js file and add the following line

```js
// cypress/support/index.js
require('cypress-grep')()```

### Plugin File

Load and register the Cypress grep module in the plugin/index.js file.

```js
// cypress/plugins/index.js
module.exports = (on, config) => {
  require('cypress-grep/src/plugin')(config)
  // make sure to return the config object
  // as it might have been modified by the plugin
  return config
}
```

By adding the module to the plugin file, when you run tests with Cypress grep it will print out a message on load such as

```shell
$ npx cypress run --env grep=hello
cypress-grep: tests with "hello" in their names
```

You are now ready to start using the [Cypress grep plugin](https://github.com/cypress-io/cypress-grep).

In a future post we will look at some of the other features of the [Cypress grep plugin](https://github.com/cypress-io/cypress-grep) such as how to increase the performance by pre-filtering or run tests multiple times.

