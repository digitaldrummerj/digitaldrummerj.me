---
collection: workshops
title: 'Lab 14: Refreshing Data'
published: true
type: ionic
layout: workshoppost2
order: 14
lab: ionic
length: 10 minutes
date: 2016-05-16
todo: |
---

{% assign imagedir = "../images/refresher"  %}

{:.fake-h2}
Objective

Implement the ability to pull in the latest data from the server.

In a typically multi-user or multi-device application you want to be able to get the latest data onto your device without having to restart the application.  With the Ionic Framework implementing functionality the get the latest data into your application is very easy to do.

Key Concepts:

* Introduce the ion-refresh component
* Introduce the ionic-lab web page

{:.fake-h2}
Table of Contents

* TOC
{:toc}

## 14.0: Add ion-refresher and wiring it up


1. Open the www/templates/projects.html
1. Above the ion-list, we need to add the `ion-refresher` that will call a function that we will create in a few minutes called `vm.refreshData`.  Use the `i1_refresher` snippet to create the refresher

    * pulling-text: anything you want
    * on-refresh: vm.getProjects()

            <ion-refresher pulling-text="Pull to refresh..." on-refresh="vm.getProjects()"></ion-refresher>

1. Open the www/js/controllers/project.controller.js
1. We are going to refactor the `activate` function and move the call to `ProjectsService.getProjects` to its own function called `getProjects`

        function getProjects() {
              ProjectsService.getProjects().then(function (response) {
                    vm.projects = response;
                  });
        }

        function activate() {
          getProjects();
          .......
        }

1. Within the `getProjects` function we need to add a finally block to ensure that the `scroll.refreshComplete` event is send so that the refresh spinner is hidden.

        function getProjects() {
              ProjectsService.getProjects().then(function (response) {
                    vm.projects = response;
              });
        }
        .finally(function () {
            $scope.$broadcast('scroll.refreshComplete');
        });

1. Don't forget to expose the `getProjects` function to the view


1. If you don't already have ionic serve running, open a command prompt and run the command ionic serve
1. In your web browser, open [http://localhost:8100](http://localhost:8100)
1. To test the pull to refresh in the browser you will need to turn on device emulation like we did when you initially created your project in [Lab 2]("02-creating-your-first/).
1. Open the Chrome Developer Tools
1. Click on the phone looking icon in the upper left of the Developer tools.
1. Click on the &lt;Select Model&gt; drop down and select a model.  You will need to refresh if you change the device model
1. Now you can pull the page down with the mouse to start the pull to refresh.
    * The easiest way to see it pull in additional data is to open a new tab, navigate to the project page, and add in new projects.  Then go back to the other tab and do the pull to refresh.
1. To see how it looks for Android vs iOS, change your browser url to [http://localhost:8100/ionic-lab](http://localhost:8100/ionic-lab).  This web page will give you a view of android and ios side by side.  To navigate to this by default you can pass the `--lab` on the command line for `ionic serve`.

## Wrap-up

Pull to refresh is a standard feature that users have come to expect.  The Ionic team made it very easy to add this functionality to your application.  In less than 5 minutes you can add pull to refresh to your application.  We used the built-in look and feel for the refresh component.  You can custom the the icon, spinner, and text.
