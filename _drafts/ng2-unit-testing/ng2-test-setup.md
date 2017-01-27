---
layout: post
title: Angular Unit Testing
date: 2020-03-01
categories: ['angular']
published: true
excerpt: |

--- 
{% assign imagedir = "/images/" | prepend: site.baseurl | prepend: site.url %}

>  **Note**: This article is for Angular 2+

Starting  with Angular 2,  unit testing is a first class citizen especially when you have generated your project using the Angular CLI.  Out of the box the Angular CLI is  setup with the karma test runner and jasmine test framework.  When generating additional files such components, services or pipes using the Angular CLI, a spec test file is created.  Spec files are container files for one of more tests.  Typically there is a single spec file per component, service , pipe, etc.  

To run the unit test you execute, 

'''bash
ng test
'''

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
 
## Jasmine Overview 

* before each 
* before each async
* expect
* it
* describe
* run only 1 test or set of tests
* spys
* 

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

 