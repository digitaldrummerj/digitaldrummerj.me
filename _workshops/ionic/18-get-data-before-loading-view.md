---
collection: workshops
title: 'Lab 18: Get Data Before Loading View'
published: true
type: ionic
layout: workshoppost2
order: 18
lab: ionic
length: 5 minutes
date: 2016-05-18
todo: |
---

{% assign imagedir = "../images/router-resolve/" %}

{:.fake-h2}
Objective

When you are loading a view sometimes you want to have the data loaded immediately when the view is shown instead of switching to the view and then pulling data.

In a mobile application, this can make you application feel sluggish if you are not using a spinner or something to alert the user that something is happen.

With our application, we are showing a spinner for all of the http calls so we have eliminated that concern.

The functionality to pull data before showing a page is called resolve in the Angular UI-Router.

Key Concepts:

* Using UI-Router Resolve

{:.fake-h2}
Table of Contents

* TOC
{:toc}


## 18.0: Updating Projects Route

1. Open the www/js/config/app.config.js file
1. On the `projects` route we need to add the resolve parameter that will call the `ProjectsService.getProjects`

        .state('projects', {
          url: '/projects',
          views: {
            'tab-projects': {
              templateUrl: 'templates/projects.html',
              controller: 'ProjectsController as vm',
              resolve: {
                /* @ngInject */
                projects: function (ProjectsService) {
                   // will default to page 1 and size of 10
                  return ProjectsService.getProjects();
                }
              }
            }
          }
        })

1. If you don't already have ionic serve running, open a command prompt and run the command ionic serve
1. Now when the projects page loads, it will immediately have data instead of showing a blank page for a second as it gets data.

## 18.1: Updating Task Route

1. Open the www/js/config/app.config.js file
1. On the `tasks` route we need to add the resolve parameter that will call the `TasksService.getTasks`

        .state('tasks', {
          url: '/tasks/:projectId',
          params: {
            projectName: ""
          },
          views: {
            'tab-projects': {
              templateUrl: 'templates/tasks.html',
              controller: 'TasksController as vm',
              resolve: {
                /* @ngInject */
                tasks: function ($stateParams, TasksService) {
                  return TasksService.getTasks({ id: $stateParams.projectId });
                }
              }
            }
          }
        })

1. If you don't already have ionic serve running, open a command prompt and run the command ionic serve
1. Now when the tasks page loads, it will immediately have data instead of showing a blank page for a second as it gets data.

## Wrap-up

The resolve functionality can be very handy and give a better user experience when used correctly.  Just becareful not to abuse it.  You don't want to pull long data pulls before the view loads and the user is just waiting for your application to do something.
