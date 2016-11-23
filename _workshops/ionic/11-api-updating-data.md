---
collection: workshops
title: 'Lab 11: Updating Data'
published: true
type: ionic
layout: workshoppost2
order: 11
lab: ionic
length: 20 minutes
date: 2016-05-16
todo: |
    * write wrap up
    * update objectives
---

{:.fake-h2}
Objective

To implement the ability to toggle the completed state of a task.


Key Concepts:

* Calling REST update API
* Toggling an icon based on the state of data


{:.fake-h2}
Table of Contents

* TOC
{:toc}

## 11.0: Adding Update to TasksService


1. Open the www/js/service/tasks.service.js file
1. We are going to add a new function called `updateTask`.  This function will take in the task object.  It will then call the Back& API and update the data.

        function updateTask(task) {
          return $http({
            method: 'put',
            url: Backand.getApiUrl() + '/1/objects/task/' + task.id,
            data: task
          })
            .then(function (result) {
              return result;
            });
        }

1. Don't forget to expose the updateTask to the service.

          var service = {
              getTasks: getTasks,
              addTask: addTask,
              updateTask: updateTask
          };

## 11.1: Adding Update to the TasksController

1. Open the www/js/controllers/tasks.controller file
1. We are going to add a new function called `updateTask` that takes a parameter called task that will hold the task json object.


         function updateTask(task) {
         }

1. Within the `updateTask` function we are going to set the completed value.  Since it is a toogle for the completed state, we want to set it to the opposite of what it is currently set too.  We are then going to call the `TasksService.updateTask` function.

        function updateTask(task) {
          task.completed = !task.completed;
          TasksService.updateTask(task);
        }

1. Now we need to expose the `updateTask` function to the view

         vm.updateTask = updateTask;


## 11.2 Completing Tasks


1. Open the www/templates/tasks.html file
1. On the checkmark icon we need to add another attribute called ng-click that calls vm.updateTask and passes in the task

        <i class="icon"
            ng-class="task.completed ? 'ion-checkmark-circled': 'ion-ios-circle-outline'"
            ng-click="vm.updateTask(task)">
        </i>

We are now ready to test the update functionality.

1. If you don't already have ionic serve running, open a command prompt and run the command ionic serve
1. Select a project and when you click on the checkmark icon for a task it will toggle the completed state.


## Wrap-up


