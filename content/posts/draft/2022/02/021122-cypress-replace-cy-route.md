---
categories: ["Cypress"]
date: 2022-02-11T13:00:00Z
published: false
title: Cypress - Migrate from cy.route to cy.intercept
url: '/cypress-migrate-to-cy-intercept'
---

With Cypress 6.0, the cy.route and cy.server commands were deprecated and replaced with cy.intercept.

## Comparison to cy.route()

Unlike cy.route(), cy.intercept():

* can intercept all types of network requests including Fetch API, page loads, XMLHttpRequests, resource loads, etc.
* does not require calling cy.server() before use - in fact, cy.server() does not influence cy.intercept() at all.
* does not have method set to GET by default, but intercepts * methods

## Using cy.route

In my code, we used cy.route with both a fixture file that we referenced and a body response in the test code itself.  

> Fixture files are great for trust as well as making your code more readable.

Here is a quick look at the syntax of cy.route.

**cy.route using a fixture file:**

```javascript
cy.route({
    url: url,
    method: method,
    status: status,
    response: `fixture:filename`
}).as('alias');
```

**cy.route using a response that is not a fixture file:**

```javascript
cy.route({
      url: url,
      method: method,
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
    method: method,
    url: url,
    }, {
    statusCode: status,
    fixture: response
}).as('alias');
```

**cy.intercept using a response that is not a fixture file**

```javascript
cy.intercept({
    method: method,
    path: url,
    }, {
    statusCode: parseInt(status),
    body: response
}).as('alias');
```

The last step once all of your cy.routes have been updated is to remove the call to cy.server add or is no longer needed .