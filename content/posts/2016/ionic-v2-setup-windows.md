---
categories:
- ionic
date: 2016-11-01T00:00:00Z
excerpt: "In order to work with the Ionic framework version 2 there is a bit of software
  installs and configuration that needs to happen in order to deploy to devices.  However,
  many of the guides out there leave out a number of steps that tripped me up when
  I first started using Ionic.  \n\nThis guide will go through all of the steps needed
  for deploying to an Android device using a Windows machine.  Note that deploying
  to an iOS device requires a Mac.  \n\nSince I love to automate setup work so that
  I can easily repeat it, we will be using [Chocolatey](http://www.chocolatey.org)
  and [Boxstarter](http://www.boxstarter.org) for all of the installs and configurations.
  \n"
published: true
series: ["ionic2-setup"]
tag: ionic2-setup
title: Ionic v2 - How to setup on Windows

---

In order to work with the Ionic framework version 2 there is a bit of software installs and configuration that needs to happen in order to deploy to devices.  However, many of the guides out there leave out a number of steps that tripped me up when I first started using Ionic.  

This guide will go through all of the steps needed for deploying to an Android device using a Windows machine.  Note that deploying to an iOS device requires a Mac.  
    
Since I love to automate setup work so that I can easily repeat it, we will be using [Chocolatey](http://www.chocolatey.org) and [Boxstarter](http://www.boxstarter.org) for all of the installs and configurations. 
    
## Software to be installed

- [NodeJS](https://chocolatey.org/packages/nodejs)
- [Git](https://chocolatey.org/packages/git)
- [Gradle](http://chocolatey.org/packages/gradle)
- [JDK8](https://chocolatey.org/packages/jdk8)
- [Android SDK](https://chocolatey.org/packages/android-sdk)
- [Android Studio](https://chocolatey.org/packages/AndroidStudio)
- [Google Chrome](https://chocolatey.org/packages/GoogleChrome)
- Npm Modules: 
    * [cordova](https://www.npmjs.com/package/cordova)
    * [ionic](https://www.npmjs.com/package/ionic)
- [Visual Studio Code](https://code.visualstudio.com/)
- [Visual Studio Android Emulator (Hyper-V Based)](https://www.visualstudio.com/en-us/features/msft-android-emulator-vs.aspx) or [Genymotion (Virtualbox Based)](https://www.genymotion.com/fun-zone/)

## Installing Software

Most of the software installs are automated using Chocolatey which is an awesome Software Package Manager for Windows.  Chocolatey packages take care of downloading, installing, and configuring the software for you so that you do not have to worry about to do it.  

Once you install Chocolatey we will be using a Chocolatey package called Boxstarter to take care of orchestrating the multiple installs with a single command.  

1. To install [Chocolatey](http://www.chocolatey.org) you need to open an administrative command prompt.
    * Go under the start menu
    * Type cmd 
    * Find the command prompt result and ctrl + shift + click on it
    * If prompted, accept the User Access Control request.

1. Run the following command in the command prompt you just opened

        @powershell -NoProfile -ExecutionPolicy unrestricted -Command "iex ((new-object net.webclient).DownloadString('https://chocolatey.org/install.ps1'))" && SET PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin

1. After installing Chocolatey, in the same command prompt run the following command to install [BoxStarter](http://boxstarter.org).

        choco install -y BoxStarter

1. You can now close the administrative command prompt

Now that we have the infrastructure components installed we are ready to use Boxstarter to run our installation script.


1. To run the script we need to run the Boxstarter Shell by clicking on the icon on your desktop 
    * If the icon is not on the desktop, then open up a command prompt and type BoxStarterShell.

1. In the Boxstarter Shell run the following command
    
        Install-BoxStarterPackage -PackageName  https://gist.githubusercontent.com/digitaldrummerj/3fe2eb057004b6742b89/raw/021eb3bb7e48745c68507904cecde1625ed0eac1/ionic2  -DisableReboots

    > You can view the actual script in the your browser at [link](https://gist.githubusercontent.com/digitaldrummerj/3fe2eb057004b6742b89/raw/021eb3bb7e48745c68507904cecde1625ed0eac1/ionic2)
        
Before we test if ionic is working or ot, we have one last bit of software to install which is an Android Emulator.  Unless you plan on always deploying to a physical Android device during your development you will need an Android Emulator.  

There are 2 options for the Android emulator: 

1. [Visual Studio Android Emulator (Hyper-V Based)](https://www.visualstudio.com/vs/msft-android-emulator/)
1. [Genymotion (Virtualbox Based)](https://www.genymotion.com/fun-zone/)

> If you are using virtualization software on your machine other than Hyper-V be aware that VMWare and Virtualbox does not work when Hyper-V is turned on.  It requires a reboot of Windows to turn Hyper-V off.
{:.warning}

Both of the emulator works well but my preference is the [Visual Studio Android Emulator](https://www.visualstudio.com/vs/msft-android-emulator/).  

Once you install one of the emulators, you will want to download at least 1 device.  Both emulator platforms have Android machines from 4.4.0 to the current release.


## Verify that everything works

1. Open a command prompt
1. Navigate the directory where you store you development projects (I use c:\projects)
1. From c:\projects create a new project based on the Tabs template by running: 

        ionic start todo tabs --v2

1. cd into c:\projects\todo  (directory was created by the ionic start command)

1. The first test that we are going to run is to make sure that we can test the todo app that we generated in the web browser by running:

        ionic serve --lab

    * This will start up a node based web server and the --lab will tell it to launch a page that shows what the app would look like on an iOS, Android and Windows phone.  Granted the node based serve is about 80% accurate but good enough to do a majority of our testing.  Ultimately you should test on a device before releasing into the app stores.         

1. Next we are going to test our Android device setup but first we need to tell ionic that we want to add the Android platform to our todo app by running:

        ionic platform add android

1. Now that the Android platform has been added we can build our application for the platform by running:

        ionic build android

1. The last thing we need to verify is that we can deploy the todo app to the Visual Studio Android Emulator or a Physical device.  
    * For the emulator you need to the emulated device before proceeding
    * For a physical device, you need to make sure that Windows sees that device and the USB debugging is turned on.  

1. To run on either the emulator or physical device run: 

        ionic run android
  
## Congratulations

Congratulations, you made it through the guide and have everything setup to create your ionic applications for Android devices.  Unfortunately, if you want to develop for iOS devices you have to do it on a Mac since XCode only runs on a Mac.      
    