---
collection: workshops
title: 'Lab 01: Ionic Setup'
published: true
type: ionic
layout: workshoppost2
order: 1
lab: ionic
length: 30 minutes
date: 2016-05-10
---
{:.fake-h2}
Objective

Setup your computer with the required software to create an Ionic Framework based project and be able to run/test it in the browser.

{:.fake-h2}
Table of Contents


* TOC
{:toc}

## Section 1.0: Windows

Below are the instructions for installation if you are on a Windows machine.

> **Note:** Already have node v.4+, the git command line, Google Chrome and Visual Studio Code installed, skip to [3.0](#section-30-ionic)

### Section 1.0.1: Chocolatey

[Chocolatey](http://chocolatey.org) is a Windows package manager that takes care of downloading and installing software packages.  For Windows, it makes installing software a breeze if there is an existing Chocolatey package which for the software we are using there are packages available.

1. Open an administrative command prompt by:
    * Going to the start menu and typing cmd
    * Find the command prompt in the results, right-clicking on it and select "Run As Administrator"

1. Run command:

       @powershell -NoProfile -ExecutionPolicy unrestricted -Command "iex ((new-object net.webclient).DownloadString('https://chocolatey.org/install.ps1'))" && SET PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin

1. Close and re-open the administrative command prompt to get it to pick up the new environment variables that were added by  chocolatey.

### Section 1.0.1: NodeJs

> **Note:** Already have node v.4+ installed, skip to [1.0.2](#section-102-git-command-line)

1. From the administrative command prompt you opened in [1.0.1](#section-101-chocolatey), install the latest NodeJs version by running:

        $ choco install -y nodejs -version 4.4.4

1. To ensure that node installed successfully run

        $ node -v

1. If the node -v command returns a version number, then node is installed and working correctly.  The version should be 4.4.4 which is the latest Node LTS version .

### Section 1.0.2: Git Command line

> **Note:** Already have the git command line installed, skip to [1.0.3](#section-103-google-chrome)

1. From the administrative command prompt you opened in [1.0.1](#section-101-chocolatey) run:

        $ choco install -y git

1. Open a new non-administrative command prompt and run the command:

        $ git --version

1. If the git --version command returns a version number, then git is installed

### Section 1.0.3: Google Chrome

> **Note:** Already have Google Chrome installed, skip to [1.0.4](#section-104-visual-studio-code)

For testing in the browser as well on Android devices Google Chrome gives you the best debugging experience.

When deploying to an Android device you will be able to use the Chrome Developer Tools for debugging just as you do normally for a web site.

1. From the administrative command prompt you opened in [1.0.1](#section-101-chocolatey) run:

        $ choco install -y googlechrome


### Section 1.0.4: Visual Studio Code

> **Note:** Already have Visual Studio Code installed, skip to [3.0](#section-30-ionic)

Visual Studio Code is a great free lightweight cross-platform code editor.

By having everyone use the same editor it helps to eliminate editor specific issues during the workshop and it allows me to use the snippets that are part of the editor to help speed up your coding.

1. From the administrative command prompt you opened in [1.0.1](#section-101-chocolatey) run:

        $ choco install -y visualstudiocode


You are now ready to proceed to the [3.0 Ionic Framework install](#section-30-ionic).

## Section 2.0: Mac

Below are the instructions for installation if you are on a Mac.

> **Note:** Already have node v.4+, the git command line, Google Chrome and Visual Studio Code installed, skip to [3.0](#section-30-ionic)

### Section 2.0.1: NodeJs

> **Note:** If you already have node v.4+ installed, you can skip this section and go to [2.0.2](#section-202-git-command-line)


1. Open a Web Browser and go to [http://nodejs.org](http://nodejs.org)
1. Click on the link for the LTS version to download the NodeJs installer
1. Run the installer and click next or continue through the installer taking all of the defaults
1. Open up a terminal and run

        $ node -v

1. If the node -v command returns a version number, then node is installed

### Section 2.0.2: Git Command Line

On a recent Mac git comes pre-installed.  To verify it is installed open up terminal and run:

     $ git --version

If you do not have the git command line tools installed, you will need to install it.  As well, it also indicates that you are running an old version of OSx and you may have issue completing this workshop.

1. Open a web browser and go to [https://msysgit.github.io/](https://msysgit.github.io/)
1. Click the download button.
1. Run the downloaded exe and follow the installer instructions.

### Section 2.0.3: Google Chrome

> **Note:** If you already have Google Chrome installed, you can skip this section and go to [2.0.4](#section-204-visual-studio-code)

For testing in the browser as well on Android devices Google Chrome gives you the best debugging experience.

When deploying to an Android device you will be able to use the Chrome Developer Tools for debugging just as you do normally for a web site.

1. Open a web browser and navigate to [https://www.google.com/chrome/browser/desktop/index.html](https://www.google.com/chrome/browser/desktop/index.html)
1. Click the "Download Chrome" button to download chrome
1. Launch the installer exe after it downloads and follow the on screen instructions

### Section 2.0.4: Visual Studio Code

> **Note:** If you already have Visual Studio Code installed, you can skip this section and go to [3.0](#section-30-ionic)

Visual Studio Code is a great free lightweight cross-platform code editor.

By having everyone use the same editor it helps to eliminate editor specific issues during the workshop and it allows me to use the snippets that are part of the editor to help speed up your coding.

1. Open a web browser and navigate to [http://code.visualstudio.com](http://code.visualstudio.com)
1. Click the "Download for Mac" button to download Visual Studio Code
1. Double-click on the downloaded archive to expand the contents.
1. Drag Visual Studio Code.app to the Applications folder, making it available in the Launchpad.
1. Add VS Code to your Dock by right-clicking on the icon and choosing Options, Keep in Dock.

You are now ready to proceed to the [Ionic Framework install](#section-30-ionic).

## Section 3.0: Ionic

1. Open up a regular non-administrative command prompt or terminal
1. Run the command:

        npm install -g ionic cordova bower gulp

   >On Mac, you may need to run this with sudo (.e.g sudo npm install -g ionic cordova bower gulp)
   {:.warning}
   
### Section 3.0.1: Verify Installation

1. Check that ionic installed correctly, run: 
    
        ionic -v 
        
    * Section 1.7.14 as of this writing.
    
1. Check that Cordova installed correctly, run:

        cordova -v 
        
    * 6.0.0 as of this writing.

1. Check that bower installed correctly, run: 

        bower -v
        
    * Section 1.7.9 as of this writing
    
1. Check that gulp installs correctly, run:

        gulp -v
        
    * 3.9.0 as of this writing 

## 3.2 Git Configuration

```bash
git config --global --add url.https://github.com.insteadof git://github.com
```

## Wrap up

You now have all of the software components needed to create an Ionic project and run/test it out in a web browser.  In the next lab you will create your first Ionic application and test it in the browser.

