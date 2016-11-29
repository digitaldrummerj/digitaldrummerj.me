---
layout: post
title: Installing Visual Studio Tools for Apache Cordova 
published: true
categories: [ionic]
date: 2016-07-21 06:00
series: taco-intro
---
{% assign imagedir = "/images/taco-intro/installing/" | prepend: site.baseurl | prepend: site.url %}
{% include series.html %}

## Why Use Visual Studio Tools for Apache Cordova

* Build and Debug for iOS to a remote Mac from within Windows
* Deploy to an iOS device connected to your Windows machine
* Build and Deploy to Android Emulator or Device from within Visual Studio
* Easily add Cordova plugins
* Installs the required SDKs, tools, and libraries to build Cordova apps
* Attach debugger to ios, Android, and Windows apps, hit breakpoints, and inspect code using the console and DOM explorer.

* Easy Installation
* Plugin Management
* Unified Debug Experience
* Write Once, deploy everywhere
* Command line interoperability
* Multi-version Cordova Support

## Requirements

* Windows 8.1 or Windows 10
* Hyper-V Enabled (required for Visual Studio Android Emulator)

## Installing NodeJs 4.x or Greater

* [https://nodejs.org/en/download/](https://nodejs.org/en/download/)
* x86 version to play nicely with VS
* VS comes with node 0.12
* Angular 2 and ionic 2 require at least 4.x

![Node Install Screen 1]({{ "node-install-screen1.png" | prepend: imagedir }})

![Node Install Screen 2]({{ "node-install-screen2.png" | prepend: imagedir }})

![Node Install Screen 3]({{ "node-install-screen3.png" | prepend: imagedir }})

![Node Install Screen 4]({{ "node-install-screen4.png" | prepend: imagedir }})

![Node Install Screen 5]({{ "node-install-screen5.png" | prepend: imagedir }})

![Node Install UAC Prompt]({{ "node-install-uac.png" | prepend: imagedir }})

## Install Visual Studio 2015

* Download from [http://aka.ms/cordova](http://aka.ms/cordova)
* Options To Pick

## Visual Studio 2015 Post Install Steps

* Set External Web tools to have Path highest
* Add Android to Path
