---
collection: workshops
title: 'Lab 08: Wiring Up Our Api'
published: true
type: ionic
layout: workshoppost2
order: 8
lab: ionic
length: 30 minutes
date: 2016-05-16
todo: |

---
[Back&]:http://backand.com

{% assign imagedir = "../images/wiring-up-the-real-api/" %}

{:.fake-h2}
Objective

Go from hard coded mocked up data to an actual RESTful API that we can then start adding full create, read, update and delete (CRUD) functionality to.  This lab is the 1st of 5 labs that will walk us through implementing the full CRUD functionality.

Key Concepts:

* Pulling data from local JSON file vs $http works the same way code wise.
* Learn what REST actually means

{:.fake-h2}
Table of Contents

* TOC
{:toc}

## 8.0: API Overview

Our API will ultimately give us a REST API for all of our CRUD (create, read, update and delete) operations, server side validation that the user calling the API owns the data they are trying to interact with and allow us to implement security with either username/password or social logins.

The provider that we will be using is [Back&].

Back& is one of my favorite database as a service providers.   Back& are basically is an instant backend in the cloud.  All of the data that we will be dealing with from Back& will be in the JSON format.

## 8.1: Back& Overview

The primary reasons that I went with Back& is because of the extremely low barrier to entry.  With Back& you don't need to learn some new javascript library just to interact with the data, you just make standard http rest calls.  Back& really does allow you to "Focus on What Really Matters.  Creating Beautifully Crafted Front Ends".  You can be up and running with a Back& API in under 10 minutes.

There are no servers for you to manage or software to install onto your machine.  Once you create your schema in Back& it will auto-generate a REST api for all of your standard CRUD operations.  If you need to implement custom server side logic it has that feature.  If you want to expose a custom query that you can call like the other REST endpoints, you can do that as well.  Need to implement user management then you can either do username/password or use social logins.  Already got your own database but want the auto-generated REST api, you can do that as well.  Need to integrate with 3rd party services such as Twilio, Paypal, Stripe, plus many more, you can do that as well.

To help developers get started with Back& they provide starter apps for ng1, ng2, react, ionic v1, and ionic v2 at [https://www.backand.com/app-examples](https://www.backand.com/app-examples).


**REST Overview**

If you are not familiar with what having a REST API means don't worry I wasn't familiar with it either when I started using one.  Luckily, with the knowledge of a few basic concepts and vocabulary you will be well on your way to effectively using a REST API.

Simply put:

>A REST API is a set of methods that a developer can call via HTTP.

The main items that are important to be considered a RESTful API

* Client–server – client handles the front end, server handles the backend.  Both work independently of each other.
* Stateless – No client data is stored on the server between requests and session state is stored on the client.
* Cacheable – Clients can cache response (just like browsers caching static elements of a web page) to improve performance.

<sup>--via [http://www.sitepoint.com/developers-rest-api/](http://www.sitepoint.com/developers-rest-api/)</sup>

**Key Definitions to Understand**

When making a REST call you have to decide what kind of HTTP call it is going to be by selecting the HTTP verb.

The common types of http verbs that REST uses are:

* Get: Read Data
* Post: Create Data
* Put: Update/Replace Data
* Patch: Update/Modify Data
* Delete: Delete Data

<sup>--via [http://www.restapitutorial.com/lessons/httpmethods.html](http://www.restapitutorial.com/lessons/httpmethods.html)

## 8.2: API Security

Right now the security for the API is open to anyone to be able to read the data but it is locked down for reading.  In a later lab, we will implement username/password and social login security on the API.

All of the data is mock data that was generated using [https://www.mockaroo.com] so no worries about any personal data being leaked allowing every to read.

## 8.3: Back& Setup

Now that we are on the same page for what a REST API is and the benefits of Back&, it is time to wire up the api.

The first thing we need to do is install the SDK javascript library.

    $ bower install angularbknd-sdk --save

Then we need to add a reference to the Back& javascript library.

1. Open the www/index.html file and before the app.js reference, add the reference to the Back& javascript library.

        <script src="lib/angularbknd-sdk/dist/backand.debug.js"></script>

1. In the www/js/app.js file we need to inject the 'Backand' dependency

        angular.module('starter', ['ionic', 'backand'])

In the www/js/config/app.config.js file we need to configure Backand with the anonymous token

1. Open the www/js/config/app.config.js file
1. Inject `BackandProvider` as a dependency

        config.$inject = ['$stateProvider', '$urlRouterProvider', 'BackandProvider'];

        function config($stateProvider, $urlRouterProvider, BackandProvider) {

1. Within the config function add the following two lines to configure the app name and anonymous token

          BackandProvider.setAnonymousToken("c169b412-4a0d-47fb-ad10-06aff1235737");
          BackandProvider.setAppName("ncws");

We are now ready to update the ProjectsService and TasksService to use our Back& API.

## 8.4: Updating ProjectsServices to Use API

1. Open the www/js/services/projects.service.js file
1. Add `Backand` as a dependency to the service

          ProjectsService.$inject = ['$http', 'Backand'];

          function ProjectsService($http, Backand) {
            .....
          }

1. Replace the contents of the `getProjects()` function with the following code.  This code is getting the list of projects and it is sorted by name.  By default Back& pages the data and returns 20 records at a time.  In order to get the first 20 records in the right order, we are sorting the data on the Back& side by name

         return $http({
            method: 'GET',
            url: Backand.getApiUrl() + '/1/objects/project/',
            params: {
              sort: '[{ "fieldName": "name", "order": "asc" }]'
            }
          }).then(function (result) {
            return result.data;
         });

## 8.5: Updating TasksService to Use API

1. Open the www/js/services/projects.service.js file
1. Add `Backand` as a dependency to the service

          TasksService.$inject = ['$http', 'Backand'];

          function TasksService($http, Backand) {


1. Replace the contents of the `getTasks()` function the following code.  This code calls the task API and only returns the task for the project_id that the task is associated to.  The results will be sorted by the completed status and then the field name.  This way we get the uncompleted task first.

         return $http({
            method: 'GET',
            url: Backand.getApiUrl() + '/1/objects/task/',
            params: {
              filter: [{ "fieldName": "project_id", "operator": "in", "value": projectId }],
              sort: [{ "fieldName": "completed", "order": "asc" }, { "fieldName": "name", "order": "asc" }]
            }
          }).then(function (result) {
            return result.data;
         });

## Wrap-up

With very little code changes we have gone from having hard coded mock data in a json file to calling a true REST api.  In the next lab we are going to work on being able to add data through the Back& REST API.
