---
categories:
- ionic
date: 2015-12-01T00:00:00Z
excerpt: |
  When you are creating a mobile applications there are times where you need to notify users about something such as an upcoming appointment.  If the application is running and the user is using it in the foreground, this is easy to accomplish.  However, if the application is running in the background this can be a challenging task.   You could do push notifications but that takes a decent amount of work to setup with both iOS and Android app stores.  If all you need to do is alert them on their local device you can just use the cordova local notification plugin and skip the headache of setting up push notifications.

  In this post we will walk you through creating an ionic application that uses the [ngCordova local notification plugin](http://ngcordova.com/docs/plugins/localNotification/).
published: true
title: Ionic - Using Local Notifications

---

When you are creating a mobile applications there are times where you need to notify users about something such as an upcoming appointment.  If the application is running and the user is using it in the foreground, this is easy to accomplish.  However, if the application is running in the background this can be a challenging task.   You could do push notifications but that takes a decent amount of work to setup with both iOS and Android app stores.  If all you need to do is alert them on their local device you can just use the cordova local notification plugin and skip the headache of setting up push notifications.

In this post we will walk you through creating an ionic application that uses the [ngCordova local notification plugin](http://ngcordova.com/docs/plugins/localNotification/).

## Environment Setup

Before we get started, we need to make sure that you have your development environment configured with either an emulator or physical device as the local notification only works on a device and not a web browser.  If you have already configured the Ionic Framework and an emulator/physical device, you can skip this section.

Make sure that you meet these requirements:

* Android environment configured -
    * Java 7+
    * Android SDK
    * Android Studio
    * Either emulator, genymotion, or physical device
* iOS environment configured (if on a MAC)
    * XCode
    * Either iOS Simulator or Device
    * XCode Command Line Tools
* nodejs
* ionic
* cordova
* gulp
* bower

You can refer to the following articles to configure your environment:

1. [Setup Ionic on Windows](/images/IonicLocalNotifications/Ionic-Setup-Windows)
1. [Setup Ionic on Mac](/images/IonicLocalNotifications/ionic-setup-osx/)

## Creating Project

The first thing we need to do is create a new ionic project that we will use to test the local notifications.

    ionic start ionic-local-notifications blank
    cd ionic-local-notifications

Now we need to add the platforms to the ionic application since we need to deploy to a device in order for the local notifications to work.  It will not work correctly in the browser.


To add the android platform:

    ionic platform add android

To add the iOS platform (for Mac users):

    ionic platform add ios

Remember, if you’re not using a Mac, you cannot build for the iOS platform.

## Install ngCordova

ngCordova is a collection of 70+ AngularJS extensions on top of the Cordova API that make it easy to build, test, and deploy Cordova mobile apps with AngularJS.  These extensions allow us to interact with device features such as the camera, battery status, and geolocation.

To install ngCordova run:

    bower install ngCordova --save

Include ng-cordova.js or ng-cordova.min.js in your www\index.html file before cordova.js and after your AngularJS / Ionic file.

    <script src="lib/ionic/js/ionic.bundle.js"></script>
    <script src="lib/ngCordova/dist/ng-cordova.min.js"></script>
    <script src="cordova.js"></script>


## Install the local notification plugin

To install the plugin run:

    ionic plugin add https://github.com/katzer/cordova-plugin-local-notifications.git

If you open up the package.json file, you will see the local notification plugin add along with the other cordova plugins.

    "cordovaPlugins": [
        {
            "locator": "https://github.com/katzer/cordova-plugin-local-notifications.git",
            "id": "de.appplant.cordova.plugin.local-notification"
        }
    ]

## Add ngCordova as a dependency

Open up the www/js/app.js file and inject ngCordova into the module

angular.module('starter', ['ionic', 'ngCordova'])

## Creating a New Controller

We need to create an Angular controller that the UI will interact with.  At the bottom of the www/js/app.js file add the following


    .controller('SampleController', function($scope, $cordovaLocalNotification) {

    });

Now we need to tell the UI what the controller is.  Open up the www/index.html page and add the controller to the ion-content.

    <ion-pane>
      <ion-header-bar class="bar-stable">
        <h1 class="title">Local Notification Sample</h1>
      </ion-header-bar>
      <ion-content ng-controller="SampleController">
      </ion-content>
    </ion-pane>

## Adding Functions to Create Notifications

Within the SampleController, we need to add all of the functions to do the scheduling of the notifications.

All of the local notification functions should be contained within an ionic platform ready function and inside of a check that makes sure we are running in a WebView on a device.  This will at least allow us to see the UI in the browser without error, it just won't run any of the local notification function unless on a WebView.

    $ionicPlatform.ready(function () {
              if (ionic.Platform.isWebView()) {
              }
    })

Make sure to inject $ionicPlatform into the SampleController

    .controller('SampleController', function($scope, $cordovaLocalNotification, $ionicPlatform) {

    });

### Instant Notification

To schedule an immediate notification, add the following function within the ionicPlatform.ready function

    $scope.scheduleInstantNotification = function () {
          $cordovaLocalNotification.schedule({
          id: 1,
          text: 'Instant Notification',
          title: 'Instant'
        }).then(function () {
          alert("Instant Notification set");
        });
      };

In the www/index.html page within the ion-content, add a button and set the ng-click to call the scheduleInstantNotification function.

    <button
        class="button"
        ng-click="scheduleInstantNotification()">
        Instant
    </button>

### Notification X Seconds from Now

To schedule a notification 5 seconds from now, add the following function within the ionicPlatform.ready function.

The difference between this function and the immediate notification is the date property is being set.

    $scope.scheduleNotificationFiveSecondsFromNow = function () {
        var now = new Date().getTime();
        var _5SecondsFromNow = new Date(now + 5000);


        $cordovaLocalNotification.schedule({
            id: 2,
            date: _5SecondsFromNow,
            text: 'Notification After 5 Seconds Has Been Triggered',
            title: 'After 5 Seconds'
        }).then(function () {
            alert("Notification After 5 seconds set");
        });
    };

In the www/index.html page within the ion-content, add a button and set the ng-click to call the scheduleNotificationFiveSecondsFromNow function.

    <button
        class="button"
        ng-click="scheduleNotificationFiveSecondsFromNow()">
            In 5 Sec
    </button>

### Notification Every Minute

To schedule a notification every minute, add the following function within the ionicPlatform.ready function

    $scope.scheduleEveryMinuteNotification = function () {
        $cordovaLocalNotification.schedule({
        id: 3,
        title: 'Every Minute',
        text: 'Give a real message',
        every: 'minute'
        }).then(function (result) {
        console.log('Every Minute Notification Set');
        });
    };

Note: The every options possible values are second, minute, hour, day, week, month, or year.

In the www/index.html page within the ion-content, add a button and set the ng-click to call the scheduleEveryMinuteNotification function.

    <button
        class="button"
        ng-click="scheduleEveryMinuteNotification()">
            Every Minute
    </button>

### Update Notification Text

To update a the every minute notification, add the following function within the ionicPlatform.ready function.  You also need to check that the notification is scheduled before trying to update it.   This functions requires that you clicked on the Every Minute button to schedule the every minute notification.

    $scope.updateNotificationText = function () {
        $cordovaLocalNotification.isPresent(3).then(function (present) {
            if (present) {

                $cordovaLocalNotification.update({
                    id: 3,
                    title: 'Notificaton  Update',
                    text: 'Notification Update Details'
                }).then(function (result) {
                    console.log('Updated Notification Text');
                });
            } else {
                alert("Must Schedule Every Minute First");
            }
        });
    };

In the www/index.html page within the ion-content, add a button and set the ng-click to call the updateNotification function.

    <button
        class="button"
        ng-click="updateNotificationText()">
            Update Text for Every Minute
    </button>

### Update Notification Interval

To update a the every minute notification to be scheduled every second, add the following function within the ionicPlatform.ready function.  You also need to check that the notification is scheduled before trying to update it.  This functions requires that you clicked on the Every Minute button to schedule the every minute notification.

    $scope.updateNotificationEvery = function () {
        $cordovaLocalNotification.isPresent(3).then(function (present) {
            if (present) {
                $cordovaLocalNotification.update({
                    id: 3,
                    title: 'Notification  Update',
                    text: 'Every Minute change to second',
                    every: 'second'

                }).then(function (result) {
                    console.log('Updated Notification Every');
                });
            } else {
                alert("Must Schedule Every Minute First");
            }
        });
    };


In the www/index.html page within the ion-content, add a button and set the ng-click to call the updateNotification function.

    <button
        class="button  button-block button-positive"
        ng-click="updateNotificationEvery()">
        Update Every Min to Second
    </button>

### Cancel Notification

To cancel a notification, add the following function within the ionicPlatform.ready function.  You also need to check that the notification is scheduled before trying to cancel it.  This functions requires that you clicked on the Every Minute button to schedule the every minute notification.

    $scope.cancelNotification = function () {
        $cordovaLocalNotification.isPresent(3).then(function (present) {
            if (present) {
                $cordovaLocalNotification.cancel(3).then(function (result) {
                    console.log('Notification EveryMinute Cancelled');
                    alert('Cancelled Every Minute');
                });
            } else {
                alert("Must Schedule Every Minute First");
            }
        });
    };


In the www/index.html page within the ion-content, add a button and set the ng-click to call the cancelNotification function.

    <button
        class="button"
        ng-click="cancelNotification()">
            Cancel Every Minute
    </button>

## Deploy to Device

In order for the local notifications to work, you need to deploy the application to a device or an emulator.  It will not work correctly in the browser.

Note: You can only compile and deploy ios application on a Mac.

Android:

    $ ionic run android


iOS:

    $ionic run ios

Note: You may need to pass in --device to the command to get it to run on a device vs an emulator.

## Wrap-up

Local notifications are a great option for being able to alert a user to something in your application.  As you saw it only took a few lines of code to enable them.  This article touched on the basic but there is more that you can do with local notifications.  You can interact with multiple notifications at once for scheduling, updating, and cancelling.  You can pass additional data into each notification that you can then use when the notification is trigger.  On the rootscope you can listen for notifications to be scheduled, tiggered, updated or cancelled.


Source code for this article is available at [https://github.com/digitaldrummerj-ionic/ionic-local-notifications-sample](https://github.com/digitaldrummerj-ionic/ionic-local-notifications-sample).
