---
categories: ["Testing", "Cypress", "Angular", "RxJS"]
date: 2021-11-18T13:00:00Z
published: true
url: '/cypress-angular-debounce/'
title: "Solved: Angular RxJs Debounce Not Consistently Firing When Testing Using Cypress"
---

In your Angular application if you are using [RxJS Debounce](https://rxjs.dev/api/operators/debounce) and running Cypress test you may have run into times that your application under test is not getting past the debounce wait time.

> Debounce is a way to tell Angular to wait X number of milliseconds for something to happen before continuing.  They are great for something like a user lookup control where you want to wait for the user to stop typing in the input box before making the API call so that you are not making an API call for each character of the user's name that is typed.

In Cypress, you could put a wait statement in to wait the number of milliseconds needed to get past the debounce time but adding time based wait statements in Cypress is an anti-pattern.

Instead in Cypress you should use use the  `cy.clock() and cy.tick()` commands to be able to forward the virtual time and trigger the debounce to fire.  However, for my project this would not consistently fire the debounce as RxJS was acting like we had not waited for the debounce time and sometimes it would never fire.  We even tried adding in the wait statements just to see if it worked and we still had the issue.

Luckily, after much troubleshooting the solution ended up being quite simple.

<!--more-->

## Broken Code

In the code below, after the `cy.tick(501)` we would find that the call to the API never happened so it would fail on the wait statement.  We also noticed that this tended to pass when running locally on our dev machines but would fail on our CI servers.  This made it really difficult to replicate and troubleshoot since it appeared to be some kind of a race condition where our dev machines would run slower than our CI servers were.

```js
cy.clock();
cy.server();
 cy.route({
        url: '/api/v1/collections/namecheck/*',
        method: 'GET',
        status: 200,
        response: 'false'
      }).as('nameCheck');

cy.get('[data-cy="collectionTitle"]')
        .type(txtMax255)
        .tick(501)
        .wait("@nameCheck");
```

## Working Code

The fix was pretty easy once we understood what we happening.  With [cy.clock()](https://docs.cypress.io/api/commands/clock) it overrides the native global functions related to time allowing them to be controlled synchronously via `cy.tick()`.  This includes controlling:

* setTimeout
* clearTimeout
* setInterval
* clearInterval
* Date objects

Overriding the the setTimeout, clearTimeout, setInterval, and clearInterval is where the issue came in since those are key to the way Debounce works.  So we just needed to set the date and override the Date object.

In the working code below, the only change that we made from the broken code above was to change `cy.clock()` to `cy.clock(new Date(), ['Date']);` and then our debounce worked as expected.

```js
cy.clock(new Date(), ['Date']);
cy.server();
 cy.route({
        url: '/api/v1/collections/namecheck/*',
        method: 'GET',
        status: 200,
        response: 'false'
      }).as('nameCheck');

cy.get('[data-cy="collectionTitle"]')
        .type(txtMax255)
        .tick(501)
        .wait("@nameCheck");
```

Now all of our debounce calls are working as expected in our Cypress tests.
