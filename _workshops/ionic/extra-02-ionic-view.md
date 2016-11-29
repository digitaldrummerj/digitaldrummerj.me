---
collection: workshops
title: 'Extra 2: Using the Ionic View Application'
published: true
type: ionicextra
layout: workshoppost2
lab: ionic
order: 2
length: 10 minutes
date: 2016-05-16
todo: |
    * update objectives
    * update key concepts
    * validate lab steps
---


{% assign imagedir = "../images/iconic-view/" %}

{:.fake-h2}
Objective

* Upload an application to IonicView
* Share an upload application with other people
* Download the application in IonicView and interact with it

{:.fake-h2}
Table of Contents

* TOC
{:toc}

## Background

The IonicView application is a great way to test our your application on a device without having to go through all of the software setup to deploy it to a real device.  You can also share your IonicView upload with other people so that they can check out the application.  

For a real beta, you would want to do an actual application install since the IonicView runs your application inside of a container but for quick testing, you can't beat the IonicView application.

## 1.0: Creating ionic.io account

Ionic has several tools out there such as a drag and drop UI creator, push notifications, and the Ionic view which all require an ionic.io free account.  

1.  If you do not already have an ionic.io account, you can sign up for one at [https://apps.ionic.io/signup](https://apps.ionic.io/signup)

## 1.1: Installing IonicView application

On your device, look up Ionic View in the app store.  Below are the direct links for each OS.

1. iOS: [https://itunes.apple.com/us/app/ionic-view/id849930087?mt=8](https://itunes.apple.com/us/app/ionic-view/id849930087?mt=8)
1. Android: [https://play.google.com/store/apps/details?id=com.ionic.viewapp](https://play.google.com/store/apps/details?id=com.ionic.viewapp)

After you finish install IonicView, open up the application and login with your email and password that you signed up with.

## 1.2: Uploading Your Application to IonicView

1. Open a command prompt, navigate to your Lab5 folder and run the command

        $ ionic upload
        
1. Login with the email and password that you signed up with in the previous section.
1. Open up the IonicView application on your device and you should now see your "[Your Name] Codepalousa Workshop"  application under the My Apps.
    * You may need to pull down to refresh the application list.
1. Click on "[Your Name] Codepalousa Workshop" and click Download App.
1. After it downloads, click on View App
1. You can now play around in the application on your device.

## 1.3: Sharing Your IonicView Application

1. Open a command prompt, navigate to your Lab5 folder share the Ionic view application with me by running the command 

        $ ionic share digitaldrummerj@gmail.com


## Wrap-up

Even though the Ionic View does not replace doing a full install of your application on a device, it is still a great way to test out your application during your development cycle.  The ability to easily share it with other people is hands down a big win and time saver.  In the next lab, we are going to get back to some coding and I will walk you through how to style an Ionic application.
