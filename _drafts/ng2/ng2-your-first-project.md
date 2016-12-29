---
layout: post
title: Angular 2 - Your First Project
date: 2020-02-19 06:00
categories: ['angular']
published: true
series: angular2-getting-started
excerpt: |

---

{% assign imagedir = "/images/ng2-getting-started/" | prepend: site.baseurl | prepend: site.url %}

Welcome to the series on Getting Started with Angular 2.  Angular 2 was released back in September and and so far I have been enjoying working with it.  I have been using the TypeScript version of Angular 2.  It is has been pretty easy for me so far to pick it up but there have been a few things that have made me scratch me head.  In this series I will walk you through creating a simple Angular 2 project that has a header/footer, routing to components/modules, show how to add new components/services, create multiple modules, lock down routes, changing UI configurations based on the environment parameter and adding in the Bootstrap library. 

This is the first post in the series and we will get everything setup on your machine to do Angular 2 developer and then you will create your Angular 2 project that the rest of the series will build on. 
 
Angular 2 comes with a really handy command line interface called the Angular CLI that can generate projects and add components/services/modules/pipes/etc.  The Angular CLI is a node based command line utility.  This mean that we need to first install NodeJs and then install the npm package angular-cli.  

## Installing The Angular  CLI

The first thing we need to make sure we have installed in NodeJs.  I would suggest installing the latest LTS version from [https://nodejs.org](https://nodejs.org) which at the time of this writing is 6.9.1.  To verify the version of node that you have installed, launch a command prompt and run `node -v`.  

After you have Node installed, we need to globally install the Angular CLI by running (it will take several minutes):

		npm install -g angular-cli 
		
> On Linux and Mac, you may need to run the command with sudo. 

## Generating Your Angular 2 Project

After the Angular CLI is installed you can create a new project with the ng new command.

1. Open a command prompt
1. Navigate to where you want to store your project (On Windows, I store mine at c:\projects and on Mac I stored it at ~/projects)
1. Generate the new project by running (it will take a few minutes to create)

		ng new ProjectName --style=scss --routing 
 
	![ng new output]({{ "ng-new-output.png" | prepend: imagedir }})

 The ng new command does several things for you:
 
* Create a directory named after the project name.  
* Set the default styles to be sass based.  
	* Without the --styles parameter it will use css as the default style language.  Personally, I prefer scss and the power that it gives me.
* Install the npm packages
* Init the directory as a Git folder
* Configure a default routing file for the app module
* Setup ng build and serve which use Webpack



You can view the full documentation for the Angular CLI at [https://github.com/angular/angular-cli](https://github.com/angular/angular-cli)  

## Running Your Angular 2 Project

Now that we have our project generated, we can view it in a web browser by running `ng serve` to build it and start up a web server with live reload.  Once `ng serve` has completed, open a web browser and navigate to [http://localhost:4200/](http://localhost:4200)

## Project layout

Your project should look like the image below.  I have highlighted some key pieces of the project layout.  

* src
	* app -> Your Application Code
	* asset -> Static Assets (images, non-npm libaries, custom javascript that you created)
	* environments -> Environment specific files.  Will will look at these in a later post.
	* styles.scss -> Application wide css.  Any CSS that is not component specific.
* angular-cli.json -> Configuration for the Angular CLI and Webpack build
* package.json -> Standard npm configuration file for dependencies, scripts, project info

![project layout]({{ "ng-project-layout.png" | prepend: imagedir }})
{:.solidborder}


## Wrapping up 

At this point you have your Angular 2 project created and are ready to start coding.  In the next post, we will bring in the Bootstrap library and create our header/footer.

