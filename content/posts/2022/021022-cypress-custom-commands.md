---
categories: ["Cypress"]
date: 2022-02-10T13:00:00Z
published: true
title: Cypress - Create My Own Cypress Commands
url: '/cypress-custom-commands'
---

As your number of Cypress tests grows you are bound to end up with some duplicate code that would be better to put into a reusable function.

Luckily, Cypress allows us to create our own custom `cy` commands that are available to all of our tests.

<!--more-->

Here are some examples of custom commands that I have created in one of my projects:

* Test grid sorting is working correctly
* Test grid paging is working correctly
* Mock a list of API calls that every page has so we only need to call a single command to get all of the mocks
* Generate a string of a certain length
* Generate a string of a certain length that also contains certain special characters based on a parameter
* Validate input field strips certain special characters on both typing and pasting of text

These examples are just a few of the ones we have created.  The custom commands greatly increased developer productivity, standardized testing of common functionality, and allowed us to remove hundreds of lines of duplicate code.

## Syntax

```javascript
Cypress.Commands.add(name, callbackFn)
Cypress.Commands.add(name, options, callbackFn)
```

## Usage

```javascript
Cypress.Commands.add(`login`, (email, pw) => {})
```

## Examples

Here are a couple of actual custom commands that I have written in my applications.

### Angular Material Grid Is Sorted By Column & Direction

**Custom Command Code:**

```javascript
export function gridSortValidateSortOrder(columnName, order) {
  var selector = `mat-header-cell.cdk-column-${columnName}`;

  cy.get(selector)
    .should("have.attr", "aria-sort")
    .and("eq", `${order}`);
}
```

**Custom Command Usage:**

```javascript
cy.gridSortValidateSortOrder('status', 'descending');
```

### Generate Random String of a Certain Length

**Custom Command Code:**

```javascript
export function generateString(length) {
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  return [...Array(length)]
    .map(i => characters[Math.random() * charactersLength | 0])
    .join('');
}
```

**Custom Command Usage:**

```javascript
cy.generateString(25).then(txt25 => {
      cy.get('[data-cy="accountName"]')
        .click()
        .type(txt25);
    });
```

## Create Your Command

Let's take a look at how and where do you create your custom commands.

A great place to define commands is in your cypress/support/commands.js file, since it is loaded before any test files.

However, I prefer to not put my custom command code directly into the commands.js file but instead into their own file in the support directory and import the files into the commands.js file.  This way I am able to keep my command.js file manageable and easily find my custom commands based on purpose.

For the examples above, I created an angular-material.js file and a strings.js file in the cypress/support directory and then in the command.js file imported both files.

**cypress/support/angular-material.js**

```javascript
Cypress.Commands.add('gridSortValidateSortOrder', gridSortValidateSortOrder);
```

**cypress/support/strings.js**

```javascript
Cypress.Commands.add('generateString', generateString);
```

**cypress/support/command.js**

```javascript
import "./angular-material";
import "./strings";
```

## Best Practices

The Cypress Team has done a nice job in their docs of documenting the best practices for creating a Cypress Custom Command.  If

[Custom Command Best Practices from Cypress Docs](https://docs.cypress.io/api/cypress-api/custom-commands#Best-Practices)
