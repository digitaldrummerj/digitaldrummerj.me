---
layout: post
title: Angular 2 Unit Test Setup
date: 2020-03-01
categories: ['angular']
published: true
excerpt: |

---

 
{% assign imagedir = "/images/" | prepend: site.baseurl | prepend: site.url %}

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
*  setup code they is used in multiple places is put into a setup function 
 

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
* test site examples 
* Observables.of 
* debugging
* 

 