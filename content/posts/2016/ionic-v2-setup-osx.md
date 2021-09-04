---
categories:
- ionic
date: 2016-11-01T00:00:00Z
excerpt: "In order to work with the Ionic framework there is a bit of software installs
  and configuration that needs to happen in order to deploy to devices.  However,
  many of the guides out there leave out a number of steps that tripped me up when
  I first started using Ionic.  \n\nThis guide will go through all of the steps needed
  for deploying to an Android and iOS device using a Mac.  \n"
published: true
series: ["ionic2-setup"]
tag: ionic2-setup
toc: true
title: Ionic v2 - Setup on OSx

---

In order to work with the Ionic framework there is a bit of software installs and configuration that needs to happen in order to deploy to devices.  However, many of the guides out there leave out a number of steps that tripped me up when I first started using Ionic.

This guide will go through all of the steps needed for deploying to an Android and iOS device using a Mac.

## General Install Steps

For the first part of this tutorial, we will be installing everything to do Ionic development and test your application in Google Chrome.  This will be how you will do about 80% of your development since deploying to a device or emulator can be time consuming.

### Node

{{< blockquote class="warning" >}}
If you already have Node installed, you can skip this section.
{{</blockquote>}}

1. Download the LTS version of node from [https://www.nodejs.org](https://www.nodejs.org)
    * If you are using Chrome to download, it may tell you that a file with a pkg extension could be harmful to your computer and ask if you want to keep the file.  Make sure to click on the keep button.

    ![NodeJs LTS download link](/images/ionic2-osx/node-0.png)

1. After the download completes, double-click on the pkg file to run it
1. Click Continue

    ![NodeJs Install Screen 1](/images/ionic2-osx/node-1.png)

1. Click Continue

    ![NodeJs Install Screen 2](/images/ionic2-osx/node-2.png)

1. Click Agree

    ![NodeJs Install Screen 3](/images/ionic2-osx/node-3.png)

1. Click Install

    ![NodeJs Install Screen 4](/images/ionic2-osx/node-4.png)

1. Fill in your login user name and password and click "Install Software"

    ![NodeJs Install Screen 5](/images/ionic2-osx/node-5.png)

1. It will take a few minutes for NodeJs to install.  Once it does, click the Close button

    ![NodeJs Install Screen 6](/images/ionic2-osx/node-6.png)

1. Open a terminal and run the following to verify that node and npm was installed and is available from the command line

        node -v
        npm -v

> As of the writing of this post, you should have gotten node v6.9.1 and npm 3.10.8

### Npm Packages

Next we need to install 3 npm packages for cordova, gulp and ionic.  At the time of this publication, ionic is on release candidate 0.

1. Open a terminal and run the following commands to install the Global NPM packages that we need:

        sudo npm install -g cordova ionic

1. In the terminal run the following to verify that Cordova install correctly. As of the writing of this post, you should get Cordova version 6.4.0

        cordova -v

    > When prompted with "May Cordova anonymously report usage statistics to improve the tool over time?", answer Yes or No depending on your preference.

1. In the terminal run the following to verify that Ionic install correctly. As of the writing of this post, you should get Ionic version 2.1.4

        ionic -v

### Google Chrome

{{< blockquote class="warning" >}}
If you already have Google Chrome installed, you can skip this section.
{{</blockquote>}}

1. Download from  [https://www.google.com/chrome/browser/desktop/](https://www.google.com/chrome/browser/desktop/)
1. Double click the dmg file to run it
1. Drag the Google Chrome icon to the Application folder

    ![Google Chrome drag to Application folder](/images/ionic2-osx/chrome-1.png)

### Visual Studio Code

{{< blockquote class="warning" >}}
If you already have Visual Studio Code installed, you can skip to step 5.
{{</blockquote>}}

1. Download from [https://code.visualstudio.com/](https://code.visualstudio.com)

    ![VS Code Download](/images/ionic2-osx/vscode-download.png)

1. Double-click on the downloaded archive to expand the contents.
1. Drag Visual Studio Code.app to the Applications folder, making it available in the Launchpad.
1. Add VS Code to your Dock by right-clicking on the icon and choosing Options, Keep in Dock.
1. Open Visual Studio Code
1. Open the Command Palette (⇧⌘P) and type shell command to find the Shell Command: Install 'code' command in PATH command and double-click on it.

    ![VSCode install code shell command](/images/ionic2-osx/vscode-cli.png)

1. Open the Command Palette (⇧⌘P) and type ext command to find the  Extensions: Install Extensions and double-click on it.

    ![VSCode Open Extensions: Install Extensions](/images/ionic2-osx/vscode-ext.png)

1. Enter Cordova into the search box, find the Cordova Tools from Microsoft, and click the Install button

    ![VSCode Install Cordova Extensions](/images/ionic2-osx/vscode-ext-cordova.png)

1. When the install is completed, the Enable button will be available and will restart Visual Studio Code to make the extension after.

    ![VSCode Install Cordova Tools Enable](/images/ionic2-osx/vscode-ext-enable.png)

1. Click Ok on the confirmation prompt

    ![VSCode Extension Enable Confirmation](/images/ionic2-osx/vscode-ext-enable-confirm.png)

1. Visual Studio Code will restart and the extensions will be enabled

### Validating General Install Steps

1. Open terminal
1. Navigate the directory where you store you development projects (I use ~/projects)
1. Run the following command to generate an ionic v2 project based on the tabs template

        ionic start todo tabs --v2

1. cd into todo  (directory was created by the ionic start command)

1. We are going to run is to make sure that we can run the todo app in the web browser by running:

        ionic serve --lab

1. This will start up a node based web server and the --lab will tell it to launch a page that shows what the app would look like on an iOS, Android and Windows phone.  Granted the node based serve is about 80% accurate but good enough to do a majority of our testing.  Ultimately you should test on a device before releasing into the app stores.

At this point, we can create ionic projects and test them in a web browser.  However, you have some more steps to complete in order to deploy to Android and iOS devices.

## Android Setup Steps

In this section, we will be installing everything that is needed in order to deploy your application to an Android device or emulator.  We will be installing JDK8, Android Studio, Android SDK, Gradle, and Genymotion.

### JDK 8

1. Open a web brower and navigate to [http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)
1. Download the Java SE Development Kit 8u101 for Mac OSx
1. Open the dmg file after it downloads
1. Double Click on the icon

    ![JDK8 Install Screen 1](/images/ionic2-osx/jdk8-1.png)

1. Click continue

    ![JDK8 Install Screen 2](/images/ionic2-osx/jdk8-2.png)

1. Click Install

    ![JDK8 Install Screen 3](/images/ionic2-osx/jdk8-3.png)

1. Fill in your login user name and password and click "Install Software"

    ![JDK8 Install Screen 4](/images/ionic2-osx/jdk8-4.png)

1. Once the install completes, click the Close button

    ![JDK8 Install Screen 6](/images/ionic2-osx/jdk8-6.png)

1. Open a terminal and run the following to verify that you can run java from the command line.  As of this writing it should return javac 1.8.0_101

        javac -version

1. Open up the vi editor and edit your bash profile.  We need to add in the JAVA_HOME environment variable

        vi ~/.bash_profile

1. To edit in vi hit `i` to enter edit mode and add the text below to the .bash_profile

        export JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk1.8.0_101.jdk/Contents/Home

1. Press the `esc` key to exit edit mode
1. Press `:` (colon key) to enter command mode.
1. type `wq` and press enter to save and exit vi
1. Run the following to make the change active in your existing session

        source ~/.bash_profile

1. Test that the $JAVA_HOME variable was set.  If should return /Library/Java/JavaVirtualMachines/jdk1.8.0_101.jdk/Contents/Home

        echo $JAVA_HOME


### Android SDK

1. If you are using Safari to download files you need to change the preference to "open safe files after downloading" else Safari will automatically unzip the downloaded file into the Download folder and delete the zip file.  You can change this option by going into the preferences and unchecking the "Open safe files after downloading" box

    ![uncheck open safe files after downloading](/images/ionic2-osx/safari-2-uncheck.png)

1. Download from [https://developer.android.com/studio/index.html#downloads](https://developer.android.com/studio/index.html#downloads)
    * Version 24.4.1 as of this writing

    ![android sdk download](/images/ionic2-osx/android-sdk-1.png)

1. When prompt for the license agreement, check the "I have read and agree withthe above terms and conditions" box and then click on the "Download Android-SDK_R24.4.1-MACOSX.zip" button

    ![android sdk license agreement](/images/ionic2-osx/android-sdk-2.png)

1. You can close the next dialog as it just tells you there is nothing else to do.  Close it by clicking on the X in the upper right of the dialog

    ![nothing else to do dialog](/images/ionic2-osx/android-sdk-3.png)

1. Open a terminal
1. Run the following to unzip the android sdk to the Development directory that is under your user home directory

        mkdir ~/Library/Android && unzip ~/Downloads/android-sdk_r24.4.1-macosx.zip -d ~/Library/Android/sdk && mv ~/Library/Android/sdk/android-sdk-macosx/* ~/Library/Android/sdk && rmdir ~/Library/Android/sdk/android-sdk-macosx

1. Open up the vi editor and edit your bash profile.  We need to add in the JAVA_HOME environment variable

        vi ~/.bash_profile

1. To edit in vi hit `i` to enter edit mode and add the text below to the .bash_profile

        export PATH=${PATH}:~/Library/Android/sdk/tools:~/Library/Android/sdk/platform-tools

1. Press the `esc` key to exit edit mode
1. Press `:` (colon key) to enter command mode.
1. type `wq` and press enter to save and exit vi
1. Run the following to make the change active in your existing session

        source ~/.bash_profile

1. Test that the $PATH variable was updated.  The command below will return the $PATH variable and the end of the output should include the android-sdk-macosx/tools and android-sdk-macosx/platforms-tools directories.

        echo $PATH

1. Now that the Android SDK manager is installed we need to install the Android SDKs that we will be using

        echo 'y' | android update sdk --filter tools,platform-tools,build-tools-24.0.3,android-19,android-20,android-21,android-22,android-23,android-24,source-24 --all --no-ui

    {{< blockquote class="warning" >}}
    Keep an eye on the output from this command.  I had it error downloading one of the packages a time or two and had to run the command a 2nd time.
    {{</blockquote>}}

### Android Studio

1. Download from [https://developer.android.com/studio/index.html#downloads](https://developer.android.com/studio/index.html#downloads)
    * Version 2.2.2.0 as of this writing.

    ![Android Studio Download](/images/ionic2-osx/android-studio-download.png)

1. Double-click on the dmg file after it downloads
1. Drag the Android Studio Icon to the Applications folder

    ![Android Studio icon drag to Applications](/images/ionic2-osx/android-studio-1.png)

1. In the Applications folder, launch the Android Studio Application

    ![Android Studio icon in Applications folder](/images/ionic2-osx/android-studio-2.png)

1. In the Complete installation dialog, select "I do not have a previous version of Studio or I do not want to import my settings"

    ![Complete Installation selection](/images/ionic2-osx/android-studio-3.png)

1. Click Next

    ![Android Studio Setup Wizard Step 1](/images/ionic2-osx/android-studio-4.png)

1. Select Standard for the setup type

   ![Android Setup type.  select Standard](/images/ionic2-osx/android-studio-5.png)

1. Most of the Android SDK items were installed as part of the Android SDK isntall but Android Studio has a couple of additional ones that it wants to install.  Click the Finish button to install them.

    ![Android Studio Verify Settings](/images/ionic2-osx/android-studio-6.png)

1. It will take a few minutes to download the components

    ![Android Studio download components](/images/ionic2-osx/android-studio-7.png)

1. When prompted for the HAXM installation, enter your user name and password then click Ok

    ![HAXM installation user credential prompt](/images/ionic2-osx/android-studio-8.png)

1. When the install is completed, click the Finish button

### Virtualbox

In order to run the Genymotion emulator, we need to install Virtualbox.

1. Navigate to [https://www.virtualbox.org/wiki/Downloads](https://www.virtualbox.org/wiki/Downloads) and click on the install link for OSx and the extension package.  Version 5.1.4 as of this writing.

    ![Virtualbox Download Page](/images/ionic2-osx/virtualbox-download.png)

1. Click on the Virtualbox dmg file after it downloads
1. Double-click on the Virtualbox Icon

    ![Virtualbox Icon](/images/ionic2-osx/virtualbox-1.png)

1. Click the Continue button to determine if it can install Virtualbox

    ![Virtualbox Install dialog to see if you can proceed with install](/images/ionic2-osx/virtualbox-3.png)

1. Click Continue

    ![Virtualbox Install Intro](/images/ionic2-osx/virtualbox-4.png)

1. Click Install

    ![Virtualbox Install Space Needed](/images/ionic2-osx/virtualbox-5.png)

1. Fill in your login user name and password and click "Install Software"

    ![Virtualbox Install Username and Password Dialog](/images/ionic2-osx/virtualbox-6.png)

1. Click Close

    ![Virtualbox Install Completed](/images/ionic2-osx/virtualbox-8.png)

Now that Virtualbox is installed, we need to install the extension pack.

1. Double click on the extension pack file that you downloaded earlier.
1. Once Virtualbox is launched, it will ask you if you want to install the extension pack.  Click Install

    ![vritualbox extension pack](/images/ionic2-osx/virtualbox-ext-1.png)

1. When the license agreement comes up, once you get to the bottom of it the "I Agree" button is enable for you to click it.

    ![virtualbox license agreement](/images/ionic2-osx/virtualbox-ext-2.png)

1. When prompted input your username and password then click Ok

    ![username and password prompt](/images/ionic2-osx/virtualbox-ext-3.png)

1. Once the install is completed, click the Ok button

    ![virtualbox extension installed](/images/ionic2-osx/virtualbox-ext-4.png)

### Genymotion

1. Download Genymotion from [https://www.genymotion.com/fun-zone/](https://www.genymotion.com/fun-zone/)
    * Version 2.7.2 as of this writing.
1. Click the "Download Genymotion Personal Edition" button

    ![Genymotion Download Genymotion package button](/images/ionic2-osx/genymotion-download.png)

1. Sign in to your Genymotion Account if you have one.  If not, then click on the Create Account button

    ![Genymotion Account signin](/images/ionic2-osx/genymotion-download-signin.png)

1. After creating the account and logging in, click on the "Download the Mac OSX" button

    ![Genymotion download osx](/images/ionic2-osx/genymotion-download-osx.png)

1. Once Genymotion is downloaded, double click the genymotion-2.8.0.dmg file to launch the installer
1. Drag Genymotion and Genymotion Shell to the Applications folder

    ![Genymotion copy to Applications folder](/images/ionic2-osx/genymotion-install-1.png)

1. After Genymotion is installed, open up the Applicaton folder and launch the Genymotion UI

    ![Genymotion Application Icon](/images/ionic2-osx/genymotion-app-icon.png)

1. On the Usage notice dialog click Accept

    ![Genymotion Usage Agreement Dialog](/images/ionic2-osx/genymotion-app-license-agree.png)

1. Click on the Yes button on the "You don't have any devices dialog"

    ![Genymotion Yes to add a new device](/images/ionic2-osx/genymotion-app-add-new.png)

1. Click the Sign in button

    ![Genymotion Signin button](/images/ionic2-osx/genymotion-app-sign-in.png)

1. Input your account information that you create as part of the Genymotion download.

    ![Genymotion add new device accoun sign in](/images/ionic2-osx/genymotion-app-add-new-signin.png)

1. After you are logged in, from the Android Version drop down select 6.0.0

    ![Android Version Dropdown](/images/ionic2-osx/genymotion-app-android-version.png)

1. Then select a device from the available list and click next.  In this case I selected the "Custom Phone - 6.0.0 - 768x1280"

    ![Genymotion Available Virtual devices](/images/ionic2-osx/genymotion-app-download-device.png)

1. It will take several minutes to download the virtual device.  When the download is done, click the Finish button

    ![Genymotion Virtual device install finished](/images/ionic2-osx/genymotion-app-add-new-finished.png)

### Gradle

1. If you are using Safari to download files and you didn't change the preference to "open safe files after downloading" when you downloaded the Android SDK, you need to change it before downloading Gradle.  Go into the Safari preferences and uncheck the "Open safe files after downloading" box.  Without doing this, Safari will automatically unzip the downloaded file into the Download folder and delete the zip file.

    ![uncheck open safe files after downloading](/images/ionic2-osx/safari-2-uncheck.png)

1. Download the Gradle Binary Only Distribution from [https://gradle.org/gradle-download/](https://gradle.org/gradle-download/)

    ![gradle download](/images/ionic2-osx/gradle-1-download.png)

1. Open a terminal
1. Run the following to unzip the android sdk to the Development directory that is under your user home directory

        unzip ~/Downloads/gradle-3.1-bin.zip -d ~/Development

1. Open up the vi editor and edit your bash profile.  We need to add in the GRADLE_HOME environment variable

        vi ~/.bash_profile

1. To edit in vi hit `i` to enter edit mode and add the text below to the .bash_profile

        export GRADLE_HOME=~/Development/gradle-3.1/bin

1. Press the `esc` key to exit edit mode
1. Press `:` (colon key) to enter command mode.
1. type `wq` and press enter to save and exit vi
1. Run the following to make the change active in your existing session

        source ~/.bash_profile

1. Test it by running

        echo $GRADLE_HOME

### Verify Android Setup

Next we are going to test our Android device setup.  The first thing we need to do is tell ionic that we want to add the Android platform to our todo application that we created earlier.

1. Open a terminal and navigate to ~/projects/todo
1. Add the android platform

        ionic platform add android

Now we need to validate that we can build for Android, run the following:

        ionic build android

The last thing we need to verify is that we can deploy the todo app to the Genymotion Emulator.  Before we can deploy the application, we need to start up Genymotion Device that we want to deploy to.

1. Once the Genymotion device is started, you can deploy to it by running:

        ionic run android

You are now ready to go create your ionic applications for the Android platform.  Continue with the guide to setup for developing for the iOS platform.

## iOS Setup Steps

### XCode

1. Install Xcode from app store.  This will take awhile since it is ~2 gigs in size.
1. Once install is completed, open xcode and accept the license
    * If prompted to install additional required components, click Install

        ![xcode additional components prompt](/images/ionic2-osx/xcode-1.png)

    * When prompted for credentials, enter username and password then click Ok

        ![credentials for xcode install](/images/ionic2-osx/xcode-2.png)

    * It will take a few minutes to complete the install

        ![installing xcode additional components](/images/ionic2-osx/xcode-3.png)

### iOS Simulator

1. Install the iOS Simulator that Ionic will use.

    npm install -g ios-sim

    > You may need to start the npm install command with sudo depending on your node setup.

### iOS Deploy Package

1. Install the iOS Deploy npm package

    npm install -g ios-deploy

    > You may need to start the npm install command with sudo depending on your node setup.

### Verifying iOS Setup

1. Open terminal
1. Navigate the directory where you store you development projects (I use ~/projects)
1. Run the following command to generate an ionic v2 project based on the tabs template

     ionic start todo tabs --v2

1. cd into todo  (directory was created by the ionic start command)

The first test that we are going to run is to make sure that we can test the todo app that we generated in the web browser by running:

        ionic serve --lab

This will start up a node based web server and the --lab will tell it to launch a page that shows what the app would look like on an iOS, Android and Windows phone.  Granted the node based serve is about 80% accurate but good enough to do a majority of our testing.  Ultimately you should test on a device before releasing into the app stores.

Next we are going to test our iOS device setup.  The first thing we need to do is tell ionic that we want to add the iOS platform to our todo app by running:

        ionic platform add ios

This sets up the todo app to be able to be build and deployed to an iOS device.  To validate that we can build for iOS, run the following:

        ionic build ios

The last thing we need to verify is that we can deploy the todo app to the iOS Simulator.

1. For the iOS Simulator, run the following:

    ionic run ios

## Congratulations

Congratulations, you made it through the guide and have everything setup to create your ionic applications for both Android and Ionic.
