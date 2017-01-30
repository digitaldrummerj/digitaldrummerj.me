---
layout: post
title: Angular Unit Testing
date: 2020-03-01 05:00
categories: ['angular']
published: true
excerpt: |

---

{% assign imagedir = "/images/" | prepend: site.baseurl | prepend: site.url %}

>  **Note**: This article is for Angular 2+
{:.warning}

Starting  with Angular 2,  unit testing is a first class citizen especially when you have generated your project using the Angular CLI.  Out of the box the Angular CLI is  setup with the karma test runner and jasmine test framework.  When generating additional files such components, services or pipes using the Angular CLI, a spec test file is created.  Spec files are container files for one of more tests.  Typically there is a single spec file per component, service , pipe, etc.  

To run the unit test you execute, 

		ng test


This will run webpack, launch a Chrome browser window and execute all of the tests  it can find in the different spec files.  It also sets up karma to watch for  changes to any TypeScript, scss, Html, or spec files.

In the terminal window you will see the number of tests that it found, what test number it is currently running and any errors or expect failures that happen.

Before we jump into how to create the different unit tests, we need to go over some guiding principles.

* A unit test should be able to be run multiple times
* Unit test can run in any order
* Service calls from components are mocked out so tjst it returns a static data set.
* Backend data storage calls are mocked out 
* No Internet is required to run your unit test 
* Each unit test is only testing one thing
*  setup code that is used in multiple places is put into a setup function 
 
 
* TOC
{:toc}

## Jasmine Overview 

[Jasmine](https://jasmine.github.io) is the testing framework that we will be using. Jasmine is a behavior-driven development framework for testing JavaScript code. It does not depend on any other JavaScript frameworks. It does not require a DOM. And it has a clean, obvious syntax so that you can easily write tests. 

### Test Group

To get started with Jasmine you need to create a test group or as called in Jasmine, a test suite.  A test suire is nothing more than a way to logically group test together.  Creating a group of test is done by using the 'describe' function which takes 2 parameters: a string and a function.  The string is the  name of the test suite which is usually named after what is being tested. The function is a block of code that implements the suite. 

CODE

### Create Test  

Once you have a test suite created you need to add test to it or as they are called in Jasmine, a spec.  You create a spec by using the 'it' function which like the describe function takes 2 parameters: a string and function.  The sting is the title of the test and the function is the test.  A test will contain 1 or more expectations that test the state of code.  An expectation in Jasmine is either true or false. A spec with all true expectations is a passing test.  A spec with one or more false expectations is a failing test.

> Since describe and it blocks are functions, they can contain any executable code necessary. JavaScript scoping rules apply, so variables declared in a describe are available to any it block inside the suite.

CODE

### Testing Data 

In order to test data you use the function `expect` which takes the actual value .  Then it chains it to a matcher function  which takes the expected value.

Matchers are implemented as true/false comparisons between the actual and expected values.   It a matcher is true it will pass the test and if it is false it will fail the test.  In the example below, the `toBe` is the matcher function.

```javascript
it("and has a positive case", function() {
expect(true).toBe(true);
});
```

You can also evaluate the matcher against a negative assertion by putting a call to not before calling the matcher.  

```javascript
it("test the negative assertion", function() {
expect(false).not.toBe(true);
});
```

Jasmine has a nice set of matchers included.

* toBe - compares with ===
* toEqual - works for literals, variables, and objects
* toMatch - for regular expressions
* toBeDefined - compares against 'undefined' to make sure it is defined
* toBeUndefined - compares against 'undefined' to make it has not been defined.
* toBeNull - compares against null
* toBeTruthy - boolean casting test for true
* toBeFalsey - boolean casting test for false
* toContain - finds an items in an Array
* toBeLessThan - math check for value to be less than a number
* toBeGreaterThan - math check for value to be greater than a number
* toBeCloseTo - precision math comparison
* toThrow - check if function threw an exception
* toThrowError - check if function threw a specific exception
* fail - manually fail the test

#### Manually Failing a Test

The fail function causes a spec to fail. It can take a failure message or an Error object as a parameter.


* expect -> format
* toBe 
* toBeTruthy 
* toBeFalsey 
* toEqual 

CODE

### Setup and Teardown

#### Before Each Test

Called once before each spec in the describe in which it is called.   This means that any values that it sets will be reset before the next test is run.

There are 2 ways to call the beforeEach when testing Angular.  

* before each 
* before each async

CODE

##### After Each Test

Called once after each spec in the describe in which it is called.  This means that any values that it sets will be reset after the test is run and before the next test starts.  

#### Before All Tests

Called only once before all of the specs in the describe are run.  This method is typically used instantiate values that are expensive to create.  

> Becareful using as it is easy to accidentally leak state between tests so that they randomly pass or fail.

#### After All Tests

Called only once after all of the specs in the describe have been run.  This is used to clean up after all of the test have been or when it is expensive to setup a test.  

> Becareful using as it is easy to accidentally leak state between tests so that they randomly pass or fail.

### Running  A Subset Of Test 

* fdescribe 
* fit

CODE

### Mocking Data 

Mocking is an advanced feature but a very powerful one that will allow us to have true unit test that do not rely on external systems.  In Jasmine it is called spying.  Basically watch for calls to specific functions and instead of calling the function it returns a predefined response.  We will use these in our component test to be able to not have to worry about the logic in our service and instead return data that our component needs for its test.  This ensure that we are testing the component and not also having to test the service at the same ttime.

CODE

## TestBed Overview 

* override provider
* setup module
* before each async
* 


## Component Test 

The first test we are going to look at is a component test.  There are several different way to test a component.  The easiest test is one where the component sites not have any dependencies injected into the constructor.   

For all of the component test I am going to assume that the component is using an external template which is my preferred method.  This means that we will need to use the TestBed and call compileComponents in order to make the template available and perform data binding so that we can  test the component.

## Imports, Providers, and Declarations

* import additional 3rd party modules
* import additional providers or services
* import additional Declarations

### Component Without Dependencies 

The easiest component to test is one where there is no dependencies to worry about.   In this case we can not need to setup the TestBed with all of the imports and declaration.


* TestBed setup 
* compileComponents
* detectChanges
* instantiate component test

### Component With Router Dependencies 

*  router stub
* active router link
* router parameters

### Component With Service Dependency 

* jasmine spy 
* getting service reference from injector
* provider override 
* detect changes vs not detecting changes 
* Observables.of 
* Class constructors
	* order of parameters with optional last 
	* default values 

### Component With Form

* FormModule 
* ReactiveFormModule

###  Component With Router Url 

* router behavior

###  Component Test Html

* query single html element
* a list of content 
* test text content
* test html content

## Service Testing 

* mock http
* mock backend 
* mocking data 
* changing data before data binding 

## Pipe Testing 

* Instantiate pipe

## Test Coverage 

* built in 
* parameter to use 
* viewing report 
* have to at least have a spec file and instantiate the component, service or pipe in order for it to show on the coverage report 
* add npm command  

things to think about testing 

* setup
* karma mime type
* test component with mock  service
* testing a service 
* testing a component 
* testing a component with router 
* testing an html element in the page 
* testing a pipe 
* mocking a backend 
* finding test project from ng2 docs
* make test project work with CLI 
* zone.js issue
* fit and fdescribe to run single test or suite of tests 
* compileComponents 
* jasmine create 
* splitting  unit tests into smaller chunks 
* 1 expect per test?
* running test 
* running test in team city 
* detectChanges 
* Test bed
* provider and imports for Test bed
* error no schema 
* jasmine docs
* ng2 test docs
* test coverage 
* test site examples 
* Observables.of 
* debugging
* 

 