---
collection: workshops
title: 'Extra 1: Icon and Splash Screens'
published: true
type: ionicextra
layout: workshoppost2
lab: ionic
length: 15 minutes
order: 1
date: 2016-05-16
todo: |
    * update lab with current setup
    * added download of icon and splash screen
    * link to setup for all of the platform adding
    * update key concepts
---

{% assign imagedir = "../images/icon-splashscreen/" %}

{:.fake-h2}
Objective

* Create all of the image sizes needed for the icon and splash screen that Google and Apple require when submitting to the App Stores.

Key Concepts:

{:.fake-h2}
Table of Contents

* TOC
{:toc}

## Background

When you release your application to the App stores you are going to want an icon and splash screen that is your own and not a default one.  However, the process of creating all of the different sizes that are required is time consuming.  If you are supporting both iOS and Android, you have to create at least 44 different image files.  Then if you have to update those images, you have to re-generate all of them.

To drastically speed this process up and make it easy, the folks developing the Ionic Framework, gave us a resource command that generates all of the correct sizes from a splash and icon file.

The icon image’s minimum dimensions should be 192×192 px and should have no rounded corners.  Template available at  [http://code.ionicframework.com/resources/icon.psd](http://code.ionicframework.com/resources/icon.psd)

Splash screen dimensions vary for each platform, device, and orientation, so a square source image is required to generate each of the various screen sizes. The source image’s minimum dimensions should be 2208×2208 px, and the artwork should be centered within the square, because each generated image will be center cropped into landscape and portrait images.  Template available at [http://code.ionicframework.com/resources/splash.psd](http://code.ionicframework.com/resources/splash.psd)


## 1.0: Download Icon and Splash Screen


I have already created a splash screen and icon for our application to use.

 1. Create a `resources` directory under our project directory
 1. Download the [icon]("../files/icon.png") file to the resources directory
 1. Download the [splash screen]("../splash.psd") file to the resources directory

## 1.1: Adding Icon

1. Open the config.xml file.  You will notice that it does not currently have any icons or splash screens configured.
1. Open a terminal (OSx) or command prompt (Windows)
1. Navigate to the project directory
1. To add android icons use:
        ionic resources android --icon
    * 6 icon sizes will be generated
1. You can see the changes in the config.xml file

    ![Config Xml for Icons for Android]({{ "config-xml-icons-android.png" | prepend: imagedir }})

1. If you look in the Resources folder, you will notice that an android\icon folder has been added with all of the generated images.
1. To add ios icons, run the command:
        ionic resources ios --icon
    * 16 icon sizes will be generated
1. You can see these in the config.xml file

    ![Config Xml for Icons for iOS]({{ "config-xml-icons-ios.png" | prepend: imagedir }})

1. If you look in the Resources folder, you will notice that an ios\icon folder has been added with all of the generated images.
1. A default icon was also added to the config.xml file in the root of the &lt;widget&gt; node.  The value will be the last icon that was generated.  (e.g. if iOS was last resource add then it will be the iOS icon)
        <icon src="resources/ios/icon/icon-small@3x.png"/>

## 1.2: Adding Splash Screen Image

1. Open the config.xml file and you will see that there are no splash screen images setup
1. To add android splash screen images use:
        ionic resources android --splash
    * 12 splash screen sizes will be generated
1. You can see these in the config.xml file

    ![Config Xml Splashscreens for Android Splashscreen]({{"config-xml-splash-android.png" | prepend: imagedir }})

1. If you look in the Resources folder, you will notice that an android\splash folder has been added with all of the generated images.
1. To add ios splash screen images use:
        ionic resources ios --splash
    * 10 icon sizes will be generated
1. You can see these in the config.xml file

    ![Config Xml Splashscreens for iOS]({{ "config-xml-splash-ios.png" | prepend: imagedir }})

1. If you look in the Resources folder, you will notice that an ios\splash folder has been added with all of the generated images.


## 1.3: Updating the Icon and Splash Images

If you need to update either the icon or splash image, re-run the resource command.

## 1.4: Generating Icon and Splash Images For All Platforms At Once

1. If you have all of the required software to deploy to an emulator or device then you can generate all of the resource images add once. (See Section 1.5 below)

1. You need to add the platforms to your project

        ionic platform add android
        ionic platform add ios

1. Once the platforms have been successfully added, then the resource command becomes

        ionic resources

## 1.5: Testing Your Icon and Splash Screen on a Device

In order to test our the icons and splash screen images, you will need to deploy to either an emulator or a device.  To deploy to each platform, you have to install various pieces of software.

To test our the icon and splash screen, you need to run your application on a device or in an emulator.  Setting up all of the software can take several hours which is far more time than this workshop has.

Windows Setup: [http://digitaldrummerj.me/Ionic-Setup-Windows/](http://digitaldrummerj.me/Ionic-Setup-Windows/)


OSx Setup: [http://digitaldrummerj.me/ionic-setup-osx/](http://digitaldrummerj.me/ionic-setup-osx/)

Once you computer is setup for iOS and Android you can add platforms to your project and then run them in an emulator or on a device.

**Add Platforms to the Application**

    ionic platform add android
    ionic platform add ios

**Run on Device**

    ionic run android
    ionic run ios

>Note For the ionic run ios command, you will have to setup all of the provision for your device through Apple before you can run it directly on your device.
{:.warning}

**Run in Emulator**

    ionic emulate android
    ionic emulate ios

## Wrap-up

The resource command is a huge time saver.  The icon and splash screen setup now takes only a few minutes compared to hours resizing everything by hand.