---
categories:
- ionic
date: 2015-01-11T20:45:35Z
excerpt: "If you are like me and just starting to work with the Ionic Framework and
  don’t already have a machine setup to do Android, iOS, Node, etc development then
  many of the guides out there leave out a number of steps that you need to do in
  order to get everything working.\n\n    Even being a Windows user I was able to
  pretty easily get Ionic working on a Mac.  The only difference between the Windows
  setup and the OSx setup is that you can build for an iOS device on a Mac.    \n"
published: true
title: Ionic - Setup on OSx

---

Updates:

* 2016-08-13:  Added Gradle and VS Code.  Changed from JDK7 to JDK8.  Removed Ant.  

If you are like me and just starting to work with the Ionic Framework and don’t already have a machine setup to do Android, iOS, Node, etc development then many of the guides out there leave out a number of steps that you need to do in order to get everything working.

Even being a Windows user I was able to pretty easily get Ionic working on a Mac.  The only difference between the Windows setup and the OSx setup is that you can build for an iOS device on a Mac.  

## Software to be installed

- [NodeJS](https://nodejs.org)
- [Gradle](https://docs.gradle.org/current/userguide/installation.html)
- [JDK8](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)
- [Android SDK](http://developer.android.com/sdk/index.html#Other)
- [Android Studio](http://developer.android.com/sdk/index.html#Other)
- [Google Chrome](https://www.google.com/chrome/browser/desktop/)
- Global Npm Modules:
    * [cordova](https://www.npmjs.com/package/cordova)
    * [gulp cli](https://www.npmjs.com/package/gulp-cli)
    * [bower](https://www.npmjs.com/package/bower)
    * [ionic](https://www.npmjs.com/package/ionic)
    * [ios-sim](https://www.npmjs.com/package/ios-sim)    
- [Genymotion](https://www.genymotion.com/) (Android emulator replacement)
`- XCode
- XCode Command Line Tools

## General Install Steps

### Google Chrome

We need Google Chrome in order to debug our application when it is running on a device.  The device emulation and developer tools are also extremely useful to have.

Download from [https://www.google.com/chrome/browser/desktop/](https://www.google.com/chrome/browser/desktop/)

### Node 

1. Install the LTS version of node from [https://www.nodejs.org](https://www.nodejs.org)

### Npm Packages

1. Open a terminal and run the following commands to install the Global NPM packages that we need:

        sudo npm install -g cordova
        sudo npm install -g ionic
        sudo npm install -g gulp
        sudo npm install -g Bower

At this point, we can create ionic projects and test them in a web browser.  To make sure that functionality is working:

### Verifying General Install

1. In your open terminal, navigate to the directory where you store your development projects (I use ~/projects)
1. From ~/projects run:

    ionic start todo blank

1. cd into todo  (directory was created by the ionic start command)
1. Run the following command to run the todo app we generated in a web browser

    ionic serve --lab

In the next section, we will install everything needed to deploy to an Android device.

## Android Setup Steps

In order to deploy to an Android device you need to install the Java JDK, Android Studio, and Android SDK.  We will walk through installing all of the required software setup.
### JDK 8

Download from [http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)

After the install, launch a terminal and create a ~/.bash_profile if it doesn't already exist.  You can use touch ~/.bash_profile to create the file.
- Open up either vi or nano and add the following line:    

export JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk1.7.0_72.jdk/Contents/Home

### Android Studio
	
Download from [http://developer.android.com/sdk/index.html#Other](http://developer.android.com/sdk/index.html#Other)

### Android SDK

Download the Android SDK from [http://developer.android.com/sdk/index.html#Other](http://developer.android.com/sdk/index.html#Other_

Unzip the downloaded SDK to to ~/Development

Open ~/.bash_profile and add the following line:

    export PATH=${PATH}:/users/[Your UserName]/Development/android-sdk-macosx/tools:/users/[Your Username]/Development/android-sdk-macosx/platform-tools

In the terminal type source ~/.bash_profile to load the ~/.bash_profile changes.

Now we need to download the Android APIs versions that we care about.  In this case, we are only going to install the API 23 Android SDK Tools and Android SDK Build-Tools 

In the terminal window, type android to launch the Android SDK Manager.  

Install the the following

* Tools -> Android SDK Tools
* Tools -> Android SDK Build-Tools
* Tools -> Android Platform-Tools
* API 23 -> SDK Platform 

### Genymotion Setup

Download Genymotion from [https://www.genymotion.com/](https://www.genymotion.com/). 

>The Genymotion installer will also install VirtualBox if it is not already installed.

Once Genymotion is installed, we need to download a device.

* Open up the Genymotion UI and click on the Add Button.
* Then click the Sign in button and follow the login instructions to login with the account that you create as part of the Genymotion download.
* After you are logged in, select from the Android Version drop down 4.4.4
* From the Device model drop down select a device type
* Then select a device from the available list
* Click the Next button.
* Click the Next button and wait for the device to download
* Click the Finish button.

### Verify the Android Setup

1. Open terminal
1. Navigate to the todo app that we create as part of the general install verification.  (I used ~/projects/todo)
1. If you need to ceate the todo app run the following from ~/projects:

    ionic start todo blank

1. cd into todo  (directory was created by the ionic start command)

1. The todo app is now setup to be able to deploy to an Android device.  To validate that we can build for Android, run the following:

        ionic platform add android

1. The todo app is now setup to be able to deploy to an Android device.  To validate that we can build for Android, run the following:

        ionic build android

1. The last thing we need to verify is that we can deploy the todo app to the Genymotion Emulator.  Before we can deploy the application, we need to start up the emulator.  

1. Start the Genymotion device you downloaded and run:

    ionic run android

You are now ready to go create ionic applications that you deploy to an Android device.

## iOS Setup Steps

### XCode Setup

1. Install Xcode from app store.  This will take awhile since it is ~2 gigs in size.
	- Once install is completed, open xcode and accept the license
1. Install the iOS Simulator that Ionic will use.

    npm install -g iOS-sim

    > Note that if you just install NodeJs without using HomeBrew, you may have to add sudo in front of the npm install commands.

### Verify the iOS Setup

1. Open terminal
1. Navigate the directory where you store you development projects (I use ~/projects) 
1. If you need to generate the todo app, run the following command from the ~/projects directory

     ionic start todo tabs

1. cd into todo  (directory was created by the ionic start command)
1. We need to do is tell ionic that we want to add the iOS platform to our todo app by running:

        ionic platform add iOS

1. The todo app is now setup to be able to deploy to an iOS device.  To validate that we can build for iOS, run the following:

        ionic build iOS

1. The last thing we need to verify is that we can deploy the todo app to the iOS Simulator by running:

    ionic run iOS

You are now ready to go create your ionic applications.
