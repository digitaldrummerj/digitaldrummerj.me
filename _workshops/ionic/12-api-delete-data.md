---
collection: workshops
title: 'Lab 12: Deleting Data'
published: true
type: ionic
layout: workshoppost2
order: 12
lab: ionic
length: 10 minutes
date: 2016-05-16
todo: |
    * write wrap up
    * add screeshots
---

{% assign imagedir = "../images/deleting-data"  %}

{:.fake-h2}
Objective

To implement the ability to delete an existing project and task.

Key Concepts:

* Swipe on a row in a list to show action buttons
* Having icons on both sides of an ion-item
* Have a confirm popup before deleting data
* Removing a row from the in-memory array of projects and tasks


{:.fake-h2}
Table of Contents

* TOC
{:toc}

## 12.0: Deleting Tasks

For the deleting of tasks we are going to add another icon into the row for each task.  We are going to put the delete icon on the right side of each row so that the UI will have a balanced look.  Plus I want to show off how cool the built-in Ionic functionality for implementing an icon on boths sides of an ion-item is.

### 12.0.1: TasksService

1. Open the www/js/service/tasks.service.js file
1. We are going to add a new function called `deleteTask`.  This function will take in the task id and call the Back& API to delete the task.

        function deleteTask(taskId) {
          return $http({
            method: 'delete',
            url: Backand.getApiUrl() + '/1/objects/task/' + taskId
          })
            .then(function (result) {
              return result;
            });
        }

1. Don't forget to expose the deleteTask to the service.

          var service = {
              getTasks: getTasks,
              addTask: addTask,
              updateTask: updateTask,
              deleteTask: deleteTask
          };

### 12.0.2: TasksController

1. Open the www/js/controllers/tasks.controller file
1. We are going to add a new function called `deleteTask` that takes a parameter called taskId and then calls the `TasksService.deleteTask` function.  Upon successfully deletion it removes the row from the `vm.tasks`.


         function deleteTask(task) {
           TasksService.deleteTask(task.id).then(function(result) {
               vm.tasks.splice(vm.tasks.indexOf(task), 1);
           })
        }

1. Now we need to expose the `deleteTask` function to the view

         vm.deleteTask = deleteTask;

### 12.0.3: Tasks Page


1. Open the www/templates/tasks.html file
1. After the checkmark icon, add a new icon using the `i1_iconclose` snippet
1. To the close icon we need to add an `ng-click` that calls the `vm.deleteTask` function

        < i class="ion-close icon"
            ng-click="vm.deleteTask(task)">
        </i>

1. If you were to look at the Task page right now you would notice that the close icon is sitting on top of the checkmark icon.  To make it go to the right side of the ion-item, we need to add the `item-icon-right` css class to the ion-item.

    >When you are using both item-icon-left and item-icon-right, the position of the icon is decided by the order that the icon is listed in the ion-item.

1. The icons are now in the right position but from a usability perspective the close icon is drawing your eyes to it.  To remedy this we want to use the `icon-accessory` css class on the icon to make it smaller and gray.

        <i class="ion-close icon icon-accessory"
          ng-click="vm.deleteTask(task)"
         ></i>

We are now ready to test the delete functionality.

1. If you don't already have ionic serve running, open a command prompt and run the command ionic serve
1. Select a project and for any task when you click on the close icon it will delete the task.

>It is problematic though that it deletes the task without warning
{:.warning}

### 12.0.4: Confirming Task Delete

The last remaining functionality to implement for deleting a task is to ask the user to confirm that they really did mean to delete the task.  Anytime that you are performing destructive task, it is a good idea to double check that the user didn't accidentally hit the button.  You could use a javascript confirm for this but Ionic has a built-in component called $ionicPopup that is mobile friendly and can be easily styled.

1. Open the www/js/controllers/tasks.controller.js file
1. To the controller inject `$ionicPopup`

          TasksController.$inject = ['TasksService', '$stateParams', '$scope', '$ionicModal', '$ionicPopup'];

          function TasksController(TasksService, $stateParams, $scope, $ionicModal, $ionicPopup) {
            .......
          }

1.  Replace the contents of the `deleteTask` function with

        $ionicPopup.confirm({
            title: 'Are You Sure?',
            template: 'Are you sure you want to delete this task?',
            okText: 'Yes',
            cancelText: 'No'
        }).then(function (res) {
            if (res) {
              TasksService.deleteTask(task.id).then(function (result) {
                vm.tasks.splice(vm.tasks.indexOf(task), 1);
              })
            }
        });

1. If you don't already have ionic serve running, open a command prompt and run the command ionic serve
1. Select a project and for any task when you click on the close icon it will ask you if you are sure you want to delete the task.  If you click in delete the task.

## 12.1: Project Delete

For deleting a project we are going to implement a standard feature that many mobile applications have on their list display where you can left swipe to show buttons for additional actions.

### 12.1.1: ProjectsService

1. Open the www/js/service/projects.service.js file
1. We are going to add a new function called `deleteProject`.  This function will take in the project id and call the Back& API to delete the project and all of the associated tasks.

        function deleteProject(projectId) {
          return $http({
            method: 'delete',
            url: Backand.getApiUrl() + '/1/objects/project/' + projectId
          })
            .then(function (result) {
              return result;
            });
        }

1. Don't forget to expose the deleteProject to the service.

             var service = {
               getProjects: getProjects,
               addProject: addProject,
               deleteProject: deleteProject
             };

### 12.1.2: ProjectsController

1. Open the www/js/controllers/projects.controller file
1. We are going to add a new function called `deleteProject` that takes a parameter called projectId and then calls the `ProjectsService.deleteProject` function.  Upon successfully deletion it removes the row from the `vm.projects`.


         function deleteProject(project) {
           ProjectsService.deleteProject(project.id).then(function(result) {
               vm.projects.splice(vm.projects.indexOf(project), 1);
           })
        }

1. Now we need to expose the `deleteProject` function to the view

         vm.deleteProject = deleteProject;

### 12.1.3: Project Page

1. Open the www/templates/projects.html
1. After the `ion-chevron-right` arrow icon we need to add an ion-option-button.

          <ion-option-button class="button-assertive "
              ng-click="vm.deleteProject(project) ">
              Delete
          </ion-option-button>

1. If you don't already have ionic serve running, open a command prompt and run the command ionic serve
1. On the project page, if you swipe to the left it will show the option menu and the delete button.  When you click on the delete button it will call the Back& delete API and then removed it from vm.projects on successfully completed.

>At this point we have 2 major issues.  First, the option buttons may stay open when there is an error and this can cause unintended UI features.  To remedy this issue we need to use the `$ionicListDelete.closeoptionButtons` to close the option buttons.  The second issue is that it does not ask to confirm the delete.
{:.warning}

To ensure that the option buttons always close we need to add a finally block on the `deleteProject` function in the controller and call the `$ionicListDelete.closeOptionButton`.  To add the confirm to delete option we are going to use the `$ionicPopup` like we did for the task.

1. Open the www/js/controllers/projects.controller.js file
1. Inject `$ionicPopup` and `$ionicListDelegate` into the controller

      ProjectsController.$inject = ['ProjectsService', '$ionicModal', '$scope', '$state', '$ionicPopup', '$ionicListDelegate'];


      function ProjectsController(ProjectsService, $ionicModal, $scope, $state, $ionicPopup, $ionicListDelegate) {
        .....
      }

1. Replace the contents of the deleteProject function with:

        $ionicPopup.confirm({
           title: 'Are You Sure?',
           template: 'Are you sure you want to delete this project?',
           okText: 'Yes',
           cancelText: 'No'
         }).then(function (res) {
           if (res) {
             ProjectsService.deleteProject(project.id).then(function (result) {
               vm.projects.splice(vm.projects.indexOf(project), 1);
             })
               .finally(function () {
                 $ionicListDelegate.closeOptionButtons();
               });
           }
         });

1. If you don't already have ionic serve running, open a command prompt and run the command ionic serve
1. Now when you try to delete a project is will ask you to confirm the action and even if there is an error trying to delete the project the option buttons will still close.

## Wrap-up
