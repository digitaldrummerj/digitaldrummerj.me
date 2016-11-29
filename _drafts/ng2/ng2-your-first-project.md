---
layout: post
title: Angular 2 - Your First Project
date: 2020-02-19 06:00
categories: ['angular2']
published: true
series: angular2-getting-started
excerpt: |

---

{% assign imagedir = "/images/angular2-first-project/" | prepend: site.baseurl | prepend: site.url %}

Welcome to the series on Getting Started with Angular 2.  Angular 2 was released back in September and and so far I have been enjoying working with it.   In this series I will share a whole  bunch of items that I have learned while working on my first Angular 2 project: 

* Creating a new project
* Creating header/footer 
* How to configure routing 
* Adding new compoents/views
* Breaking compoents into features using modules
* How to configure routing at the module level
* Locking down routes
* Adding in bootstrap.  

In this post I will cover creating a new Angular 2 project.   Creating a new project  is pretty easy with the Angular CLI.  Once you install the CLI you can generate a new project and use the CLI to  generate various files such as components, modules, and services. 

## Installing The Angular  CLI

The Angular CLI is an npm package which means you need to have node installed first.  I world suggest installing the latest LTS version from [https://nodejs.org](https://nodejs.org) which at the time of this writing is 6.9.1.

After  you have Node installed, open a command prompt and run:

		npm install -g angular-cli 
		
> On Linux and Mac, you may need to run the class with sudo. 

After the Angular CLI is installed you can create a new project with the ng new command.

1. Open a command prompt
1. Navigate to where you want to store your project
1. Generate the new project by rrunning

		ng new ProProjectName --styles=scss --routing 
 
 The ng new command does several things for you:
 
* Create a directory named after the project name.  
* Set the default styles to be sass based.  
	* Without the --styles parameter it will use css as the default style language.  
* The routing parameter will configure a default routing file for the app module.
* Setup webpack build

## Wrapping up 

At this point you have your Angular 2 project created and are ready to start coding.  

In future post I will cover

* Creating header/footer 
* How to configure routing 
* Adding new compoents/views
* Breaking compoents into features using modules
* How to configure routing at the module level
* Locking down routes
* Adding in bootstrap
 