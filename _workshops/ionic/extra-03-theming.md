---
collection: workshops
title: 'Extra 3: Styling the Application'
published: true
type: ionicextra
layout: workshoppost2
order: 3
lab: ionic
length: 10 minutes
date: 2016-05-16
todo: |
    * add link to http://ionicframework.com/docs/components/#colors
    * update objectives and key concepts
    * retake workshop for new app
---
{% assign imagedir = "../images/theming/" %}

{:.fake-h2}
Objective

* Learn how to setup your Ionic project to use a SASS file
* Learn how to style and theme the application using a SASS file.

Key Concepts:

{:.fake-h2}
Table of Contents

* TOC
{:toc}

## 1.0: What is SASS?

Sass is an extension of CSS that adds power and elegance to the basic language. It allows you to use variables, nested rules, mixins, inline imports, and more, all with a fully CSS-compatible syntax. Sass helps keep large stylesheets well-organized, and get small stylesheets up and running quickly, particularly with the help of the Compass style library.

The Ionic framework uses variables for all of the style information which enable you to easily override any of the colors of the application with your own.  

## 1.1: Setting up SASS


**Steps**

1. First step it to tell ionic that you want to use SASS

        $ ionic setup sass

1. The ionic setup sass command will:
    * Download the required npm and gulp packages 
    * Update index.html to reference the output css from the gulp sass task
    * setup the gulp watch task for the sass file so that it will recompile on changes
    * setup the ionic serve command to start the gulp watch task
    
        
## 1.2: Modifying the Look of the Contacts List

1. If you don't already have ionic serve running, open a command prompt and run the command ionic serve
1. You should also see a gulp task message about the starting the 'sass' task

    ![Lab7-GulpSassCompile.png]({{ "Lab7-GulpSassCompile.png" | prepend: imagedir }})
    
1. In your web browser, open [http://localhost:8100](http://localhost:8100)

1. In the root of your project in the scss folder, open the ionic.app.scss
1. You will notice at the top of the file is a commented out section with a sample list of variables. To see all of the possible variables open up the www/lib/ionic/scss/_variables.scss file.
1. To demonstate the SASS capabilities we are going to change the $stable variable to a different color such as pink.  This variable is used for the background color of the list header.  
1. Once you save the file, you will notice in your command prompt that the sass task detected a change and ran
1. Go back to your web browser and now your contact list header should be pink

    ![Lab7-ContactPinkHeader.png]( {{ "Lab7-ContactPinkHeader.png" | prepend: imagedir }})
    

## Wrap-up

With the few simple steps above you were able to easily to style your application.  Even though we only just touched on using SASS to style your application, it is obvious how easy it makes styling your application. 