---
collection: workshops
title: 'Lab 05: Adding Master View'
published: true
type: ionic
layout: workshoppost2
order: 5
lab: ionic
length: 30 minutes
date: 2016-05-16
todo: |
    * Update screenshots for new json data
    * see
---

{% assign imagedir = "../images/master-view/" %}


{:.fake-h2}
Objective

To set the workflow for how to create new pages in Angular/Ionic.  Get introduced to services and controllers.

Key Concepts:

* Our first view
* Create our first service
* Create our first controller
* Bind data to the UI
* Order data in the UI

{:.fake-h2}
Table of Contents

* TOC
{:toc}

## 5.0: Adding New Page

1. Under the www folder, create a directory called templates
1. In the www/templates directory, create a file called projects.html
1. In the projects.html file, use the `i1_view` snippet to generate the view boilerplate code and set the view-title to "Projects"
    * To use snippets in Visual Studio Code, start typing the prefix of the snippet in the file of the type it supports.  In this case we are using the Ionic html snippets by typing i1_view.  Arrow to the snippet you want and hit enter to select it.
1. Press Esc or Enter to exit the snippet

## 5.1: Add Route to Project Page

In order to get to the project page, we need to add a route so that Angular knows how to find the page when we navigate to it.

1. In the www/js create a directory called config
1. In the www/js/config directory create a file called app.config.js
1. Open the www/js/config/app.config.js file and add the following code:
        
        angular.module('starter')
          .config(config);

        config.$inject = ['$stateProvider', '$urlRouterProvider'];

        function config ($stateProvider, $urlRouterProvider) {
          $stateProvider
            .state('projects', {
              url: '/projects',
              templateUrl: 'templates/projects.html'
            })

          $urlRouterProvider.otherwise('/projects');
        }

    >Note: The $urlRouterProvider.otherwise is the default route to use when angular does not have a route configured for the one the user tried to navigate to.  In this case it will route to the projects route.

1. Open the index.html file and replace the content in the <font color="red">&lt;body&gt;</font> tag with the following

        <ion-pane>
            <ion-nav-bar class="bar-calm">
                <ion-nav-back-button>
                </ion-nav-back-button>
            </ion-nav-bar>

            <ion-nav-view></ion-nav-view>
        </ion-pane>

1. In the index.html file after the script reference to app.js we need to add a script tag for the js/config/app.config.js file.
1. If you don't already have ionic serve running, open a command prompt and run the command

        $ ionic serve

1. In your web browser, open [http://localhost:8100](http://localhost:8100)
1. You should see the following in your web browser

    ![Projects Blank Page]({{ "projects-initial-view.png" | prepend: imagedir }})

## 5.2: Creating Your First Service

In this section, you will be creating your first service to pull data from a remote url.  Initially we will be hard coding our data in a local json and pulling it through $http but in future labs we will be using a REST api provided by [Back&](http://backand.com).

1. Download the [mock data file](../files/mock-data.json) and store it in the www directory
1. In the www/js directory, create a new directory called services
1. In the www/js/services directory, create a new javascript file called projects.service.js
1. Using the angular snippet `ng1factory` to generate a new service.
    * This will have a few fields to fill out as part of the template.  When you are done filling out each field press tab to go to the next one
    * Values to fill out:
        * Module: starter
        * Service: ProjectsService
        * dependency1: $http
        * exposedFn: getProjects
1. Press Esc or Enter to exit the snippet
1. Change the getProjects function to look like the following.  This will get the data from the mock-data.json file.

        function getProjects() {
            return $http.get('/mock-data.json')
                .then(function (result) {
                    return result.data;
                });
        }

## 5.3: Creating Your First Controller

In this section, you will be creating your first controller that the html view will use to communicate with the ProjectsService.

1. In the www/js directory, create a new directory called controllers
1. In the www/js/controllers directory, create a new javascript file called projects.controller.js
1. Use the `ng1controller` snippet to generate the controller code
    * This will have a few fields to fill out as part of the template.  When you are done filling out each field press tab to go to the next one
    * Values to fill out:
        * Module: starter
        * Controller: ProjectsController
        * dependency1: ProjectsService
1. Press Esc or Enter to exit the snippet
1. Add the call to the ProjectsServices in the activate function

        function activate() {
              ProjectsService.getProjects().then(function (response) {
                vm.projects = response.data;
              });
         }

    * This says when the ProjectsService returns the data from getProjects() then store it in vm.projects


**Updating Projects Route to Add Controller**

Now we need to tell angular that the Projects view uses the ProjectsController.  We do this by modifying the projects route.

We need to add in a controller property for the projects route and set it to ProjectsController as vm.

1. Open the www/js/config/app.config.js file
1. Find the projects route and the `controller` property

        .state('projects', {
          url: '/projects',
          templateUrl: 'templates/projects.html',
          controller: 'ProjectsController as vm'
        })

**Add javascript files to index.html**

In order to use the project controller and service that we created we need to add the script reference tags into the index.html page after the app.js file.

1. Open the www/index.html page
1. After the app.config.js add in the `projects.service.js` and `projects.controller.js` files

        <script src="js/services/projects.service.js"></script>
        <script src="js/controllers/projects.controller.js"></script>

>Warning: The javascript and css references need to be relative in order to work properly on a device.  Meaning without the leading slash
{:.warning}


**Updating UI to Show Projects**

Now we are ready to show the project data on our project view.  We will first output the raw json view of the data and then we will create the real UI.

1. Open the projects.html template and inside the &lt;ion-content&gt;  add the following to write out the json results:
        {% raw %}
        <pre>{{ vm.projects | json }}</pre>
        {% endraw %}

    * In AngularJS, &#123;&#123; &#125;&#125; brackets tells Angular to bind what is between the brackets to the UI.  In this case we are taking the vm.projects and showing the raw json of the object.
    * The &lt;pre&gt;&lt;/pre&gt; tags make the json look a little more readable by keeping the break returns

1. Run ionic serve and view the application in the web browser
1. You should see a view similar to this with the json showing.

    ![Projects Raw Json]({{ "projects-raw-json.png" | prepend: imagedir }})

## 5.4: Binding Service Data To UI

So far you have just bound the json output to the UI.  Useful for debugging but not what you want a user to see.  In this section, we will create a nice looking project  list that shows the project name and created on date.   The UI should look like the following when done:

![project list with json included]({{"projects-ion-list-without-json.png" | prepend: imagedir }})

1. Open the www/templates/projects.html
1. Inside of the &lt;ion-content&gt; use the snippet `i1_list` to generate a ion-list and ion-item component
    * Values to fill in for the snippet:
        * item: project
        * items: vm.projects
1. For the projects list, you want to loop through each project and bind the following properties:
    * project.name
    * project.created_on

    > If you are unfamiliar with AngularJS, the ng-repeat on the ion-item is the command to loop through a collection

1. Just like when you showed the raw json for the vm.projects you need to surround the properties with the double curly braces &#123;&#123; &#125;&#125; 
    * Put the name inside an &lt;h2&gt; and the created_on inside a &lt;p&gt;
    * For extra spacing, I also put a &lt;br /&gt; between the name and created_on
1. Your view should now look like the screenshot at the start of this section.
1. Once you get your view looking right, you can remove or comment out the &lt;pre&gt; tag

    ![project list without json included]({{"projects-ion-list-without-json.png" | prepend: imagedir }})

To see the full docs on the &lt;ion-list&gt; documentation, at the command prompt, type ionic docs ion-list or go to [http://ionicframework.com/docs/api/directive/ionList/](http://ionicframework.com/docs/api/directive/ionList/)

## 5.5: Ordering Data

If you look at the ion-list right now it is difficult to find a specific project since the list is ordered by the way it is stored in the mock-data.json json array.  Instead we want to order the ion-list by the project name.

1. Open the projects.html file
1. On the ng-repeat for the ion-item, we need to add the orderBy statement to have Angular sort the ion-list by the project name

    <ion-item ng-repeat="project in vm.projects | orderBy: 'name'">

Now the list should be in alphabetical order

![Projects Order By Name]({{ "projects-ion-list-ordered.png" | prepend: imagedir }})

## 5.6: Creating Minification Safe Code

Since this lab is the first bit of code that we are writing I want to briefly discuss minification of the code.  For a web site that you are going to be deploying to a web server vs running locally, it is best practice to minify the code.  However, when  creating an application that is intended to run locally on a device like we are doing, there is mixed opinions on if you need to or should minify your code.

To save yourself work later on it is important to decide early on if you are going to minify the code when you release your ionic application.  All of the code that we will be creating as part of this workshop will be minification safe, however, some of the code that is part of the ionic templates is not minification safe out of the box.  For the blank template the main issue is the app.js run block.  You could easily follow the same pattern as the app.config.js file and rewrite the run function.

The reason that we need to care about minification safe code is that Angular uses dependency injection and when the code is minified, values such as $http get changed to variable names like "a".  When the variable becomes "a" then Angular have no clue what the heck "a" is so it throws an injector error.  By making the code minification safe, $http is left as $http so that Angular knows what it is.

Out of the box Ionic does not provide any gulp tasks to minify css, javascript or html code.  It is not difficult to write these task or find one that suits you needs if you deem this a critical requirement.  Writing these task is outside the scope of this workshop.

**example of NOT minification safe code**

    angular.module('starter', ['ionic'])
    .run(function($ionicPlatform) {
    })

In this code $ionicPlatform will be changed to a value that Angular does not understand.

**example of minification safe code**

    angular
      .module('starter')
      .run(runBlock);

    runBlock.$inject = ['$ionicPlatform'];

    function runBlock($ionicPlatform) {
    }

In this code the runBlock is written to use the $inject option to tell Angular that the parameter passed to the runBlock function is $ionicPlatform.  This in turn means that you can change the parameter name of the runBlock to anything that you want and Angular will still see  the underlying value as $ionicPlatform.


## Wrap-up

We did a lot in this lab.  You created your first service, first controller, and bound some data to the UI.  This lab sets the foundation for the workflow of creating views in Ionic.  In the next lab, we will enable viewing the tasks associated to a project when you click on the project row.