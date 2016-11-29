---
collection: workshops
title: 'Lab 06: Adding Details Page'
published: true
type: ionic
layout: workshoppost2
length: 30 minutes
order: 6
lab: ionic
date: 2016-05-16
todo: |
    * Update objectives
    * remove - updating styling section
    * update screenshots
    * done - update section numbers
    * add warning about disappearing back to project nav when testing in browser
---
{% assign imagedir = "../images/detail-view/" %}

{:.fake-h2}
Objective

To create a the detail page of the master detail view setup.  This page will show the task associated to a project.

Key Concepts:

* Master/Detail views
* Order data in Angular by more than 1 field
* Passing URL parameters into routes

{:.fake-h2}
Table of Contents

* TOC
{:toc}

## 6.0: Adding the Task List Page

1. In the www/templates directory, create a file called tasks.html
1. In the tasks.html file, use the `i1_view` snippet to generate the view boilerplate code and set the view-title to "Tasks"

## 6.1: Add Route to Tasks Page

In order for angular to properly route us to the tasks page, we need to tell Angular how to find the tasks page.

1. Open the www/js/config/app.config.js file and in the config function, add the following route after the projects state that we added in the previous lab.

        .state('tasks', {
            url: '/tasks/:projectId',
            templateUrl: 'templates/tasks.html'
          });

## 6.2: Navigating to Tasks Page

To navigate to the task page when clicking on a project in the projects page, we need to add an ng-href to each ion-item in the projects list in the projects.html code.

1. In the www/templates/projects.html file, on the ion-item element add an ng-href attribute to make each row link to the tasks page and include the project id value in the url.
    * Hint: To get Angular to trigger the router path, start the ng-href url with a #/.

            {% raw %}
            ng-href="#/tasks/{{project.id}}"
            {% endraw %}

1. If you don't already have ionic serve running, open a command prompt and run the command ionic serve
1. In your web browser, open [http://localhost:8100](http://localhost:8100)
1. Now when you click on a row in the project list, it should go to the task list page and give you navigation to go back to the project list

    ![Blank Tasks View]({{"tasks-initial-view.png" | prepend: imagedir }})

## 6.3: Creating the Tasks Service

In this section, you will be creating the tasks service to pull tasks data for the selected project from our mock-data.json file that we setup in the previous lab.

1. In the www/js/services directory, create a new javascript file called tasks.service.js
1. Using the angular snippet `ng1factory` to generate a new service.
    * This will have a few fields to fill out as part of the template.  When you are done filling out each field press tab to go to the next one
    * Values to fill out:
        * Module: starter
        * Service: TasksService
        * dependency1: $http
        * exposedFn: getTasks
1. Press Esc or Enter to exit the snippet
1. Change the getTasks function to look like the following.  This will get the data from the mock-data.json file and return the tasks for the project.

        function getTasks(projectId) {
          return $http.get("/mock-data.json")
            .then(function (result) {
              return result.data.data[projectId].tasks;
            });
        }

## 6.4: Creating the Tasks Controller

In this section, you will be creating the tasks page controller that will contain all of the logic for the tasks page and talk with the TasksService to get data.

1. In the www/js/controllers directory, create a new javascript file called tasks.controller.js
1. Use the `ng1controller` snippet to generate the controller code
    * This will have a few fields to fill out as part of the template.  When you are done filling out each field press tab to go to the next one
    * Values to fill out:
        * Module: starter
        * Controller: TasksController
        * dependency1: TasksService
1. Press Esc or Enter to exit the snippet
1. Add a 2nd dependency for $stateParams.  This will allow you to get the id of the project.  The $stateParams property for the project id will be the same as the one we put into the router.
1. Before the activate function call add a variable named projectId set to the value of $stateParams.projectId

        var projectId = $stateParams.projectId;

1. Add the call to the ProjectsServices in the activate function

        function activate() {
              TasksService.getTasks(projectId)
                .then(function (result) {
                  vm.tasks = result;
                });
        }

    * This says when the TasksService returns the data from getTasks() then store it in vm.tasks;

**Updating Tasks Route to Add Controller**

Now we need to tell angular that the Tasks view uses the TasksController.  We do this by modifying the tasks route.

We need to add in a controller property for the tasks route and set it to TasksController as vm like we did with the `Projects` route.

       controller: 'TasksController as vm'

**Add javascript files to index.html**

In order to use the tasks controller and service that we created we need to add the script reference tags into the index.html page after the app.js file.  I like to put all of my services before my controllers since the controllers depend on the services.

      <!-- your app's js -->
      <script src="js/app.js"></script>
      <script src="js/services/projects.service.js"></script>
      <script src="js/services/tasks.service.js"></script>
      <script src="js/controllers/projects.controller.js"></script>
      <script src="js/controllers/tasks.controller.js"></script>

**Updating UI to Show Tasks**

Now we are ready to show the tasks data on our tasks view.  We will first just output the json view of the data and then we will create the real UI.

1. Open the tasks.html template and inside the &lt;ion-content&gt; add the following to write out the json results:

        {% raw %}
        <pre>{{ vm.tasks | json }}</pre>
        {% endraw %}

    * In AngularJS, &#123;&#123; &#125;&#125; brackets tells Angular to bind what is between the brackets to the UI.  In this case we are taking the vm.tasks and showing the raw json of the object.
    * The &lt;pre&gt;&lt;/pre&gt; tags make the json look a little more readable by keeping the break returns

1. Run ionic serve and view the application in the web browser
1. When you click on a project it will you to the task and you should see a view similar to this with the json showing.

    ![Tasks Raw Json]({{ "tasks-raw-json.png" | prepend: imagedir }})

## 6.5: Binding Service Data To UI

So far you have just bound the json output to the UI.  Useful for debugging but not what you want a user to see.  In this section, we will create a nice looking task list that shows the task name and if it is completed or not.   The UI should look like the following when done:

![tasks  list with json included]({{"tasks-ion-list-without-json.png" | prepend: imagedir }})

1. Open the www/templates/tasks.html
1. Insivmde of the &lt;ion-content&gt; use the snippet `i1_list` to generate a ion-list and item-item component
    * Values to fill in for the snippet:
        * item: task
        * items: vm.tasks
1. For the tasks list, you want to loop through each task and bind the following:
    * task.name
    * task.completed

    > If you are unfamiliar with AngularJS, the ng-repeat on the ion-item is the command to loop through a collection
1. Just like when you showed the raw json for the vm.projects you need to surround the properties with the double curly braces &#123;&#123; &#125;&#125;
    * Put the name inside an &lt;h2&gt; and completed inside a &lt;p&gt;
1. Your view should now look like the screenshot at the start of this section.
1. Once you get your view looking right, you can remove or comment out the &lt;pre&gt; tag for the raw json.

    ![tasks list without json included]({{"tasks-ion-list-without-json.png" | prepend: imagedir }})

To see the full docs on the &lt;ion-list&gt; documentation, at the command prompt, type ionic docs ion-list or go to [http://ionicframework.com/docs/api/directive/ionList/](http://ionicframework.com/docs/api/directive/ionList/)

## 6.6: Ordering Data

If you look at the ion-list right now it is difficult to find a specific task since the list is ordered by the way it is stored in the mock-data.json json array. Unlike the projects list where we sorted by a single field, for the task we want to sort by the completion status and then name so that completed tasks are at the bottom of the list and then the task are sorted by name.

To order the ion-list by the completed and then name add the orderBy statement to the ng-repeat

    <ion-item ng-repeat="task in vm.tasks | orderBy: ['completed','name']">

Now the list should will show un-completed tasks at the top and then completed tasks and they should be order by name.

![Tasks Order By Name]({{ "tasks-ion-list-ordered.png" | prepend: imagedir }})


## Wrap-up

We now have a fully functional Master/Detail style page.  You could easily reuse the setup that we did for the Master/Detail in your application if you need similar functionality.  In a later lab we will add the ability to change the completion status and add/update/delete tasks.
