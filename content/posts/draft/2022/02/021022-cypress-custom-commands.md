---
categories: ["Cypress"]
date: 2022-02-10T13:00:00Z
published: false
title: Cypress - Create My Own Cypress Commands
url: '/cypress-custom-commands'
---

outline:

* done - intro and overview 
* dobe - why custom commands?
* done - syntax overview
* examples (ng material helpers)
* create a custom command
	* where to define commands
	* best practices 
		* what makes a good custom command vs local function

As your number of Cypress tests grows you are bound to end up with some duplicate code that would be better to put into a reusable function.  

Luckily, Cypress allows us to create our own custom ‘cy’ commands that are available to all of our tests.

Here are some examples of custom commands that I have created in one of my projects:

* Test grid sorting is working correctly
* Test grid paging is working correctly
* Mock a list of API calls that every page has so we only need to call a single command to get all of the mocks
* Generate a string of a certain length
* Generate a string of a certain length that also contains certain special characters based on a parameter
* Validate input field strips certain special characters on both typing and pasting of text

These examples are just a few of the ones we have created.  The custom commands greatly increased developer productivity, standardized testing of common functionality, and allowed us to remove hundreds of lines of duplicate code.  

## Syntax 

‘’’javascript
Cypress.Commands.add(name, callbackFn)
Cypress.Commands.add(name, options, callbackFn)
‘’’

## Usage

‘’’javascript
Cypress.Commands.add(‘login’, (email, pw) => {})
‘’’

## Examples

## Create Your Command

A great place to define commands is in your cypress/support/commands.js file, since it is loaded before any test files.

However, I prefer to not put the custom command code directly into the commands.js file but instead put the commands into their own file in the support directory and import that file into the commands.js file.  I find this keeps my command file much more readable and allows me to put like commands into to their own file for findability.



## Best Practices

1. Don’t make everything a custom command
1. Don’t overcomplicate things
1. Don’t do too much in a single command
1. Skip your UI as much as possible