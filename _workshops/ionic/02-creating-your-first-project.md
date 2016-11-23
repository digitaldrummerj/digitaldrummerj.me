---
collection: workshops
title: 'Lab 02: Your First Project'
published: true
type: ionic
layout: workshoppost2
order: 2
lab: ionic
length: 5-10 minutes (depending on internet connection)
date: 2016-05-16
todo: |
    * Validate Mac security for ionic project directory
    * Mac Chrome Dev Tools Shortcut

---
{% assign imagedir = "../images/first-project/" %}

{:.fake-h2}
Objective

Create your first Ionic project and view the project in a web browser.

{:.fake-h2}
Table of Contents

* TOC
{:toc}

## 2.0: Creating A Project

Ionic comes with 3 templates: blank, side menu, and tabs.  These templates have everything that you need to get started using ionic and deploy it to a device.  For this workshop we are going to use the blank template and build up our application from scratch.

The side menu comes with a pre-configured side menu while the tabs template comes with tabs already setup.  Both of these templates also include a few example pages.

### 2.0.1: Steps

1. Open a command prompt (Windows) or terminal (OSx)
1. Navigate to where you typically store your project files/code.  For myself, here is where I store my project files: 
    * Windows: c:\projects
    * OSx: ~/Documents/projects
1. Run the command:
    
        $ ionic start myFirstIonicApp blank --appname "Ionic WS"

    * --appname : Human readable name for the app

    > The start command may take a few minutes to run

### 2.0.2: Mac Cleanup

For OSx, you may need to change the permissions on your app directory for all of the ionic command to work like adding platforms which we will do later.

        $ sudo chmod -R 777 myFirstIonicApp

## 2.1: Install Dependencies

Before we can run the project, we need to install the required dependencies.

    $ cd myFirstApp
    $ npm install
    $ bower install

> The npm install command will take several minutes to run depending on internet speed
{:.warning}

## 2.2: Testing Project

We are now ready to test our application using Google Chrome.  To do this, the Ionic framework ship with the command, ionic serve.  Ionic serve starts up a node web server on port 8100 and launches your default web browser to [http://localhost:8100](http://localhost:8100).

In your open command prompt (Windows) or terminal (OSx), from your project directory run:

        $ ionic serve

>If your default browser is not Google Chrome, please open Google Chrome and navigate to [http://localhost:8100](http://localhost:8100)
{:.warning}

You should see a view similar to this in your browser.

![view in browser]({{"ionic-serve-png.png" | prepend: imagedir}})

This view however does not give you much of an idea how it might look on an actual device.    There are 2 ways we can attempt to solve this using the browser.  We can use a built-in ionic serve page or we can emulate a mobile device from within Google Chrome.

### 2.2.1: Ionic Lab

The first way is to use the optional ionic-lab web page to see a side-by-side view of iOS and Android within Chrome.  Even if you don't pass the --lab option to the ionic serve command, you can always get to the Ionic lab page at [http://localhost:8100/ionic-lab](http://localhost:8100/ionic-lab).  To quit ionic serve, press q in the command window where ionic serve is running.

    $ ionic serve --lab

![Ionic Lab]({{"ionic-serve-lab.png" | prepend: imagedir}})

### 2.2.2: Chrome Dev Tools

The second way is to turn on the device emulator within the Chrome Developer Tools.  Chrome has several known devices out of the box or you can add your own custom ones.

1. To open the Chrome Developer Tools go under the Chrome Menu
    * Windows: F12
    * Mac:

    ![Chrome Menu]({{ "menu-icon.png" | prepend: imagedir }})

1. Select More Tools -> Developer Tools

    ![Chrome Menu]({{ "menu-dev-tools.png" | prepend: imagedir }})

1. Click on the Toggle Device Mode icon
    * Windows: Ctrl+Shift+M
    * Mac:

    ![Device Mode Icon]({{ "device-mode-button.png" | prepend: imagedir }})

1. You can now pick the device that you want to emulate.  You will need to refresh the page after you change the device type.

    ![Device Mode Options]({{ "device-mode.png" | prepend: imagedir }})

1. If you don't see the device listed or want to remove emulated devices, click the Edit button under the device dropdown.

    ![Device Mode Edit Dropdown Option]({{ "device-mode-edit.png" | prepend: imagedir }})

## Conclusion

You now have your Ionic project created and working.  Though out this book, we will use this project to create a full application with a master/detail view, pull to refresh, loading spinner, change the theme of the application, create a custom directive, plus much more.  In the next lab we will explore the structure of an Ionic project.

