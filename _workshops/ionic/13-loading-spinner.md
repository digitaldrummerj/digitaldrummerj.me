---
collection: workshops
title: 'Lab 13: Adding a Loading Spinner'
published: true
type: ionic
layout: workshoppost2
order: 13
lab: ionic
length: 10 minutes
date: 2016-05-16
todo: |
    * write wrap up
---

{% assign imagedir = "../images/loading-spinner"  %}

{:.fake-h2}
Objective

Add a loading spinner to all http calls.

Key Concepts:

* Wiring up a generic loading spinner


{:.fake-h2}
Table of Contents

* TOC
{:toc}

## 13.0: Showing the Spinner on Http request

We are already inspecting all of the http response errors in our `HttpInterceptor`.  Now we are going to add in a function to show a spinner on request and hide it on response.

1. Open the www/js/http.interceptor.js
1. We need to add the function `request` to intercept all request.  The request function takes a single argument and we are going to call it config

     function request(config) {
          return config;
        }

1. Within the `request` function we are going to broadcast the event `loading:show` and return the config parameter

        function request(config) {
          $rootScope.$broadcast('loading:show');
          return config;
        }

We now need to respond to the `loading:show` event and show the actual spinner

1. Open the www/js/app.js file
1. We need to inject `$ionicLoading` into the run function

      .run(function ($ionicPlatform, Backand, $rootScope, $state, LoginService, $ionicLoading) {
        ......
      }

1. Within the run function we need to respond to the `loading:show` event

        $rootScope.$on('loading:show', function () {
            $ionicLoading.show();
          });

1. If you don't already have ionic serve running, open a command prompt and run the command ionic serve.  When the page loads it will show the loading spinner and it will never go away since we haven't told it to hide yet.

## 13.2: Hiding the spinner on response

1. Open the www/js/http.interceptor.js file
1. We need to add a `response` function that takes 1 parameter called response and returns response from the function.

        function response(response) {
          return response;
        }

1. In order to hide the spinner we are going to broadcast the event `loading:hide`.  However, since we also need to send this event in the `responseError` function that we setup during the user management lab, we are going to create a function to broadcast the event.

         function LoadingHide() {
              $rootScope.$broadcast('loading:hide');
         }

1. Add the call to the `LoadingHide` function as the first line in the `response` and `responseError` functions.

        function response(response) {
              LoadingHide();
              return response;
        }

        function responseError(response) {
            LoadingHide();
            .....
        }

Now we need to respond to the `loading:hide` event that we just broadcast.

1. Open the www/js/app.js file
1. In the run function add the following code

        $rootScope.$on('loading:hide', function () {
            $ionicLoading.hide();
        });

1. If you don't already have ionic serve running, open a command prompt and run the command ionic serve.  Now when the page loads it will show the loading spinner and hide when the call has completed.


## 13.3: Customizing the spinner

So far we have been using the default configuration for the $ionicLoading component which is to show the default spinner configuration with a gray background overlay but you can easily change how the  template looks.

For example on the spinner you can change the spinner used and the color of it.  There are 10 different spinner icons included and you can change them by adding an icon attribute like `<ion-spinner icon="spiral"></ion-spinner>`.  By default it defaults to the platform specific icon if on a device or iOS if not on a device.

You also change the color of the spinner to any of the built-in Ionic colors by prefixing the color name with `spinner-` like `<ion-spinner class="spinner-energized"></ion-spinner>`

There are 2 ways to set the `$ionicLoading` template.  You can either do it globally or individually by passing it into the `$ionicLoading.show` function.

**Updating in show function**

Anytime that you call the show function for `$ionicLoading` you pass in the template.  This will also override the default value.

        $ionicLoading.show({
            template: 'Loading...'
        });

**Update the Default**

 This will update the default template that you app uses for `$ionicLoading`.  In the www/js/app.config you would add a constant for `$ionicLoadingConfig`

        angular.module('starter', ['ionic', 'backand'])
          .constant('$ionicLoadingConfig', {
            template: '<ion-spinner icon="spiral" class="spinner-energized"></ion-spinner>'
          })


I encouraged you to try out both ways so that you understand how they work.

## Wrap-up

