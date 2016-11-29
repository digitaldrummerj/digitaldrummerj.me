---
collection: workshops
title: 'Lab 03: The Project Layout'
published: true
type: ionic
layout: workshoppost2
order: 3
lab: ionic
length: 10 minutes
date: 2016-05-16
todo: |

---

{% assign imagedir = "../images/project-layout/" %}

{:.fake-h2}
Objective


Understand the folder structure for an Ionic project and where to place files.

>**Note**: For this lab, I will be using Visual Studio Code as our editor but you can use any text editor.  The install steps for Visual Studio Code are in [Lab 01: Ionic Setup](../01-install-ionic/)

{:.fake-h2}
Table of Contents

* TOC
{:toc}

## 3.0: Opening Project in Visual Studio Code

1. Open Visual Studio Code
1. Click File -> Open Folder...
    
    ![VSCode File Open Folder Menu]({{ "vscode-file-open-folder.png" | prepend: imagedir }})
    
1. Navigate to where you create the myFirstApp folder and click Select Folder

    ![VSCode Select Folder]({{ "vscode-select-folder.png" | prepend: imagedir }})
    
1. Your project should now be opened in Visual Studio Code, similar to this screenshot.

    ![VSCode Initial Folder Opened View]({{ "vscode-initial-folder-open.png" | prepend: imagedir }})



## 3.1: Exploring Project Layout

1. With the myFirstApp highlighted, click on the arrow next to the project name.

    ![VSCode Initial Folder Opened View]({{ "vscode-initial-folder-open.png" | prepend: imagedir }})

1. Top level project used for structure:

    <pre>
    ├── hooks &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;extra commands to run on cordova build
    ├── platforms &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;iOS/Android specific builds will reside here
    ├── plugins &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;where cordova plugins will be installed
    ├── scss &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; SASS code, which will output to www/css/
    ├── www &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;your application code
    ├── bower.json &nbsp; &nbsp; &nbsp; &nbsp; bower dependencies
    ├── config.xml &nbsp; &nbsp; &nbsp; &nbsp; cordova configuration
    ├── gulpfile.js &nbsp; &nbsp; &nbsp; &nbsp;gulp tasks
    ├── ionic.project &nbsp; &nbsp; &nbsp;ionic configuration file
    └── package.json &nbsp; &nbsp; &nbsp; npm & cordova platforms/plugins dependencies
    </pre>

1. Expand the www folder

    ![VSCode WWW Folder Expanded]({{ "vscode-www-expanded.png" | prepend: imagedir }})
    
1.  www folder structure:

    <pre>
    ├── css &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;your stylesheet files
    ├── img &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;your image files
    ├── js &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; your javascript files
    ├── lib &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;vendor javascript such as Ionic and Angular
    ├── template &nbsp; &nbsp; &nbsp; used to store the view html (not yet created).
    └── index.html &nbsp; &nbsp; main file. js/css/angular/ionic references
    </pre>

## 3.2: Suggested Structure

There are two trains of thought on how to structure your project depending on the size of the project.  The first option is by type and the second option is by page.

### 3.2.1: Structure By Type

In this structure you create directories to hold controllers, services, directives, etc. and all of the files of that type for the project are stored in the directory.

This structure works great when your project is small.  However, as the project grows it can quickly become unwieldy to find the file that you are looking for.  I can typically handle 8-10 files in a single directory before it becomes annoying to me to find a file.

For this workshop, we are going to use this structure.

If later on you decide to change the structure to [Structure By Page](#section-321-structure-by-page), luckily it is just directory reorganizations and updating the index.html with the javascript reference.  This becomes even easier if you go through the extra lab, [Auto Add JS/CSS to index.html](../extra-gulp-inject) where I walk you through adding a gulp task to automate the updating of the javascript and css references in the index.html.

**example layout**

<pre>
├── js &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; javascript files files

&nbsp; &nbsp; ├── controllers &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp;  &nbsp; &nbsp; all of the controllers

&nbsp; &nbsp; &nbsp; &nbsp; ├── projects.controller.js &nbsp; &nbsp; &nbsp;controller for projects page
&nbsp; &nbsp; &nbsp; &nbsp; ├── tasks.controller.js &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;controller for projects page

&nbsp; &nbsp; ├── services &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp;  &nbsp;  &nbsp; all of the services/factories

&nbsp; &nbsp; &nbsp; &nbsp; ├── projects.services.js &nbsp; &nbsp; &nbsp; &nbsp;services for projects page
&nbsp; &nbsp; &nbsp; &nbsp; ├── tasks.services.js  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;services for projects page

&nbsp; &nbsp; ├── directives  &nbsp;  &nbsp;  &nbsp;  &nbsp;&nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;custom directives

&nbsp; &nbsp; &nbsp; &nbsp; ├── projects.directives.js &nbsp;&nbsp; &nbsp; directories for project page
&nbsp; &nbsp; &nbsp; &nbsp; ├── tasks.directives.js &nbsp; &nbsp;&nbsp;&nbsp; &nbsp; directories for project page

&nbsp; &nbsp; ├── config &nbsp;  &nbsp;  &nbsp;  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; configurations, constants, etc

├── templates&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; html for pages

&nbsp; &nbsp; ├── projects.html&nbsp;  &nbsp;  &nbsp;  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; html for project page
&nbsp; &nbsp; ├── tasks.html&nbsp;  &nbsp;  &nbsp;  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;html for tasks page

</pre>

### 3.2.2: Structure By Page

In this structure you create a directory for each page and that directory contains all of the page specific files for controller, services, directives, etc.

This structure works great for large parts that have lots of files.  You can use it even on smaller projects but it is a bit of overkill.  With this structure though you don't have to worry about the number of files in a single directory becoming too much as each page typically have less than 5 files.

**example layout**

<pre>
├── projects&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp;all of the controllers

&nbsp; &nbsp; ├── projects.controller.js &nbsp; &nbsp; &nbsp;all files for projects page
&nbsp; &nbsp; ├── projects.html&nbsp;  &nbsp;  &nbsp;  &nbsp; &nbsp; &nbsp; html for project page
&nbsp; &nbsp; ├── projects.services.js &nbsp; &nbsp; &nbsp; &nbsp;services for projects page
&nbsp; &nbsp; ├── projects.directives.js &nbsp;&nbsp; &nbsp; directories for project page

├── tasks&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; all files for task page

&nbsp; &nbsp; ├── tasks.controller.js &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;controller for projects page
&nbsp; &nbsp; ├── tasks.html&nbsp;  &nbsp;  &nbsp;  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;html for tasks page
&nbsp; &nbsp; ├── tasks.services.js  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;services for projects page
&nbsp; &nbsp; ├── tasks.directives.js &nbsp; &nbsp;&nbsp;&nbsp; &nbsp; directories for project page

├── services &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;global services/factories

&nbsp; &nbsp; ├── user.service.js &nbsp; &nbsp;&nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp;reusable service for users

|── directives &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;global directives

├── config &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;global configurations
</pre>

## 3.3 Angular Coding Style

The Angular Style Guide by John Papa is a good starting point for Angular development teams to provide consistency through good practices.  This workshop will use the suggested practices in John Papa's style guide.  You are free to use any style that you would like or that your team has defined as long as it is consistent among the team/projects.

In the words of John Papa:

>*"If you are looking for an opinionated style guide for syntax, conventions, and structuring Angular applications, then step right in. These styles are based on my development experience with Angular, presentations, Pluralsight training courses and working in teams. The purpose of this style guide is to provide guidance on building Angular applications by showing the conventions I use and, more importantly, why I choose them."*

[View the Angular Style Guide](https://github.com/johnpapa/angular-styleguide)


## Wrap-up

Before we start coding up our application need to do some configuration for Visual Studio Code.  In the next lab we will setup Visual Studio Code for ionic and angular snippets and Intellisense so that we can debug our application right instead Visual Studio Code.