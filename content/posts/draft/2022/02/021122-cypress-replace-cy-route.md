---
categories: ["Cypress"]
date: 2022-02-11T13:00:00Z
published: false
title: Cypress - Migrate from cy.route to cy.intercept
url: '/cypress-migrate-to-cy-intercept'
---


## Using cy.route

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

**cy.intercept using a response that is not a fixture file

```javascript
cy.intercept({
    method: method,
    path: url,
    }, {
    statusCode: parseInt(status),
    body: response
}).as('alias');
```
