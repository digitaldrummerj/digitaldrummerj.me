---
categories: ["Cypress"]
published: 2022-02-11T13:00:00Z

title: Cypress - Migrate from cy.route to cy.intercept
url: '/cypress-migrate-to-cy-intercept'
---

Starting with Cypress 6.0, the cy.route and cy.server commands were deprecated and replaced with cy.intercept.

> Cypress is currently at version 9.4

## Comparison to cy.route()

Unlike cy.route(), cy.intercept():

* can intercept all types of network requests including Fetch API, page loads, XMLHttpRequests, resource loads, etc.
* does not require calling cy.server()
* does not have method set to GET by default, but intercepts all methods

<!--more-->

## Using cy.route

In my code, we use cy.route that return either response using a file (e.g. fixture) or an object defined in the test code itself.

> My preference is to use a fixture file for any response that is more than just a simple string as it makes your code more readable and allows you to reuse the fixture in other routes/intercepts.

Here is a quick look at the syntax of cy.route.

**cy.route using a fixture file:**

```javascript
cy.route({
    url: 'url',
    method: 'method',
    status: status,
    response: 'fixture:filename'
}).as('alias');
```

**cy.route using a response that is not a fixture file:**

```javascript
cy.route({
      url: 'url',
      method: 'method',
      status: status,
      response: ''
    }).as('alias');
```

## Updated to Intercept

Updating to use cy.intercept is pretty straight forward.

> **Warning:** make sure for each alias of the same name that you update it to cy.intercept else it will not override itself as you expect it to since cy.route and cy.intercept do not interface with each other.

**cy.intercept using a fixture file:**

```javascript
cy.intercept({
    method: 'method',
    url: 'url',
    }, {
    statusCode: status,
    fixture: 'filename'
}).as('alias');
```

**cy.intercept using a response that is not a fixture file:**

```javascript
cy.intercept({
    method: 'method',
    path: 'url',
    }, {
    statusCode: status,
    body: 'response'
}).as('alias');
```

The last step once all of your cy.routes have been updated to cy.intercept is to remove the call to cy.server as it is no longer needed.
