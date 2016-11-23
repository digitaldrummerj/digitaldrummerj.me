---
collection: workshops
title: 'Lab 17: Adding Tabs'
published: true
type: ionic
layout: workshoppost2
order: 17
lab: ionic
length: 10 minutes
date: 2016-05-18
todo: |

---

{% assign imagedir = "../images/adding-tabs/" %}

{:.fake-h2}
Objective

Right now in our UI there is no way to get to the profile page except manually updating the url which is not something the user would be able to do on their device.  We could put a button  on the projects page to navigate to the profile page but that would just feel awkward.  Instead we are going to add in a tabbed interface to be able to switch between the projects and profile page.  

If we had more than 3 pages that we wanted in the tabs then it would make more sense to go with a side menu interface. 

Key Concepts:

* Add Tabs to existing UI

{:.fake-h2}
Table of Contents

* TOC
{:toc}

## 17.0:  Adding Tabs 

We are going to create 2 tabs: projects  and profile.  In the future you may want to add an about page tab in so that you can advertise who created the app and give them links to your other apps and website. 

1. In the www/templates directory create a new file called tabs.html
1. Use the i1_tabs snippet 
1. We want the projects tab to be the first tab.     Update the 1st ion-tab with the following values 
	*  title: Project
	* icon: ion-document
	* href: "#/tabs/projects"
	* ion-nav-view name: tab-projects

				<ion-tab title="Projects" icon="ion-document" href="#/tab/projects">
        		<ion-nav-view name="tab-projects"></ion-nav-view>
      		</ion-tab>
      		
1.  The 2nd tab want to be the profile page.   Update the 2nd ion-tab with the following values  
    *  title: Profile
	* icon: ion-ios-person
	* href: "#/tabs/profile"
	* ion-nav-view name: tab-profile
      	
      		<ion-tab title="Profile" icon="ion-ios-person" href="#/tab/profile">
            		<ion-nav-view name="tab-profile"></ion-nav-view>
        	</ion-tab>
      		
      		
	<ion-tabs class="tabs-icon-top tabs-color-active-positive" enable-menu-with-back-views="true">
	
## 17.1 Updating Routes  To Use Tabs 

In order to use the tabs we need to update the routes so that the tabs control knows how to load the page. 

1. Open the www/js/config/app.config.js
1.  We first need to add a new state called tab that is an abstract state.   With abstract routes you are not able to directly navigate to them and they are used as a way to group states. 

        .state('tab', {
          url: '/tab',
          abstract: true,
          templateUrl: 'templates/tabs.html'
        })
        
For the project, task, and profile states we need to change the to start with tab.  Then we need to add a views node that is a json object.  Then we ended to move the url, templates, controller and resolve properties to the views node.  

        .state('tab.projects', {
          url: '/projects',
          views: {
            'tab-projects': {
              templateUrl: 'templates/tab-projects.html',
              controller: 'ProjectsController as vm',
              resolve: {
                /* @ngInject */
                projects: function (ProjectService) {
                  // pageNumber: 1, pageSize: 10
                  return ProjectService.getProjects(1, 10);
                }
              }
            }
          }
        })
        .state('tab.tasks', {
          url: '/tasks/:projectId',
          params: {
            projectName: ""
          },
          views: {
            'tab-projects': {
              templateUrl: 'templates/tab-project-tasks.html',
              controller: 'TasksController as vm',
              resolve: {
                /* @ngInject */
                tasks: function ($stateParams, TaskService) {
                  return TaskService.getTasks({ id: $stateParams.projectId });
                }
              }
            }
          }
        })
        
1. If you don't already have ionic serve running, open a command prompt and run the command ionic serve.  The UI should now be tab based and you can navigate between the tabs.

## Wrap-up

The tabs on Ionic work fantastic and change the look based on platform so that the users get the look and feel they expect in their platform.  With minimal work we were able to change our UI to be tabs based.  