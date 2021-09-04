---
categories:
- ionic
- visual studio
date: 2015-09-17T00:00:00Z
excerpt: "I am doing an [Ionic Framework](http://www.ionicframework.com) presentation
  and I wanted to use the Visual Studio 2015 Cordova Tooling.  \n\nI have done this
  presentation twice in the past couple of months using my Intel Nuc machine with
  the Visual Studio 2015 RTM Cordova tooling but it is kind of pain to do this since
  the Nuc is a desktop machine and doesn't have a monitor so I have to look at the
  projector screen or being a laptop to use as well. Setting up 2 machines in 15 minutes
  as well is a pain and hoping that the remoting from the laptop to the Nuc is stable
  just asking for trouble even with a travel router that I have.  \n\nSo I decided
  I would just get my laptop working with my demos since I already had Visual Studio
  2015 installed and had everything I needed for Ionic already working.     \n\nI
  thought this shouldn't take that long but unfortunately I ran into a bunch of issues.
  \ Luckily I have managed to fix all of the issue and can move on with the prep work
  for my presentation.\n"
published: true
title: Getting Visual Studio Cordova Tooling Working with the Ionic Framework

---

I am doing an [Ionic Framework](http://www.ionicframework.com) presentation and I wanted to use the Visual Studio 2015 Cordova Tooling.  

I have done this presentation twice in the past couple of months using my Intel Nuc machine with the Visual Studio 2015 RTM Cordova tooling but it is kind of pain to do this since the Nuc is a desktop machine and doesn't have a monitor so I have to look at the projector screen or being a laptop to use as well. Setting up 2 machines in 15 minutes as well is a pain and hoping that the remoting from the laptop to the Nuc is stable just asking for trouble even with a travel router that I have.  

So I decided I would just get my laptop working with my demos since I already had Visual Studio 2015 installed and had everything I needed for Ionic already working.     

I thought this shouldn't take that long but unfortunately I ran into a bunch of issues.  Luckily I have managed to fix all of the issue and can move on with the prep work for my presentation.

### Software Installed on Laptop

* Windows 8.1 Enterprise
* Visual Studio 2015 with Cordova Tooling Update 2 
* Node 4.1.0 tried both 32bit and 64bit versions.  Note that the Intel NUC machine had 0.12.4 when I last presented.
* Npm 2.14.3 (version that comes with Node 4.1.0)
* Npm Global Modules: gulp, bower, Ionic, Cordova, and pjup



### Steps to Create Visual Studio Ionic Project that caused issue

To create the project I first created the Ionic project using the Ionic CLI and then created a Cordova project in Visual Studio based on the Ionic CLI project that was created.

1. Open Command Line
1. Navigate to c:\projects
1. Run ionic start Demo blank
1. cd into c:\projects\Demo
1. open up the package.json file and removed the gulp-sass line.  This version doesn't work with Node 4.1.0.
1. Run npm install gulp-sass --save
1. Run npm install 
1. Open Visual Studio
1. Go File -> New -> Project From Existing Code
1. Select Cordova as the project type and click Next
1. Click the browse button, navigate to the c:\projects\Demo folder, and click the Select Folder button
1. Name the project Demo
1. Click the Finish button


Now the fun begins.  Below I have documented the different issues that I ran into.

 
### Issue 1: Opening Cordova project took 100% CPU 

**Error**

When I would open up a Cordova project it would try to parse the Npm global packages and it would fail everytime on the cordova dependency, graceful-fs.  When I opened up Task Manager, I would see Visual Studio and Node taking all of the CPU.  I would also see anywhere between 2-15 node processes that Visual Studio had started.  

I wondered what node processes were doing so I used Process Explorer and I found that they were all running npm config ls -g.

My only guess is that Visual Studio didn't like something about my npm global packages.

**Fix**

Since Visual Studio and Node were taking all of the CPU, I had to open up the Task Manager and kill all of the node processes in order to get Visual Studio to close so that the CPU went back to a normal level.

1. Open Visual Studio without a project open
1. Under the Tools Menu -> Options -> Projects and Solutions -> External Web Tools, I reset it to the defaults which has the Visual Studio path higher than the System Path.
1. Open the Demo project from c:\projects\Demo

The CPU this time should stay at a normal level    

### Issue 2: node-sass would fail due to not having the 32 bit version installed

**Error**

This was caused by running npm install from the command line outside of Visual Studio and also not having a version of gulp-sass in the package.json that worked with Node 4.1.0.  

**Fix**

2 steps to get around this issue:

1. From the command line in c:\projects\Demo, run the pjup command to update the npm package vesion in package.json to the latest versions.  
	* Warning: Make sure that you have the loglevel for npm set to the default of warn.  You can reset your custom loglevel with npm config delete loglevel.
1. Delete the node_modules directory from your project directory and do the package restore from within Visual Studio. You may need to do a rm -rf node_modules from the command line.
1. Open the Demo project from c:\projects\Demo in Visual Studio
1. In the Solution Explorer, right-click on the Dependencies folder and select Restore Packages
1. After a few minutes the package restore should be completed.
	* Now the Task Runner Explorer should also be working

### Issue 3: Typescript error on Visual Studio build

**Error**
This issue actually had nothing to do with Visual Studio itself but with the angular bower packages.

It turns out that the angular-ui-router bower package that is installed as part of the ionic install when you do a bower install, has the typescript api file included in the package but the other angular packages do not have their typescript files included, so typescript doesn't know what some of the types are that are referenced in the angular-ui-router typescript api file.

**Fix**

I just deleted the angular-ui-router\api folder.
 

### Issue 4: Cordova error on Visual Studio build

**Error**

Cordova CLI is set to 5.1.1 when you create the project.

When you build the project in Visual Studio, it generates the following error due to being set to Cordova 5.1.1.  I had also seen this issue on my Intel NUC machine and had to drop the npm global Cordova version back to 5.0.0 but they have since fixed this issue with Cordova. 

		1>  ------ Adding platform: android
		1>  No version supplied. Retrieving version from config.xml...
		1>  _http_client.js:51
		1>      throw new TypeError('Request path contains unescaped characters.');
		1>      ^
		1>
		1>  TypeError: Request path contains unescaped characters.
		1>      at new ClientRequest (_http_client.js:51:11)
		1>      at TunnelingAgent.exports.request (http.js:31:10)
		1>      at TunnelingAgent.createSocket (C:\Users\jpjames\AppData\Roaming\npm\node_modules\vs-tac\node_modules\cordova\5.1.1\node_modules\cordova\node_modules\cordova-lib\node_modules\npm\node_modules\request\node_modules\tunnel-agent\index.js:117:25)
		1>      at TunnelingAgent.createSecureSocket [as createSocket] (C:\Users\jpjames\AppData\Roaming\npm\node_modules\vs-tac\node_modules\cordova\5.1.1\node_modules\cordova\node_modules\cordova-lib\node_modules\npm\node_modules\request\node_modules\tunnel-agent\index.js:184:41)
		1>      at TunnelingAgent.addRequest (C:\Users\jpjames\AppData\Roaming\npm\node_modules\vs-tac\node_modules\cordova\5.1.1\node_modules\cordova\node_modules\cordova-lib\node_modules\npm\node_modules\request\node_modules\tunnel-agent\index.js:80:8)
		1>      at new ClientRequest (_http_client.js:133:16)
		1>      at Object.exports.request (http.js:31:10)
		1>      at Object.exports.request (https.js:163:15)
		1>      at Request.start (C:\Users\[UserName]\AppData\Roaming\npm\node_modules\vs-tac\node_modules\cordova\5.1.1\node_modules\cordova\node_modules\cordova-lib\node_modules\npm\node_modules\request\index.js:594:30)
		1>MSBUILD : cordova-build error BLD104: Error : BLD00104 : There was an error installing a component from NPM, most likely because this device is behind a proxy or firewall. Please see the following link for possible solutions: http://go.microsoft.com/fwlink/?LinkID=623434

I believe that this error has nothing to do with the firewall since I can restore npm and bower packages without an issue and I have the http_proxy and https_proxy set as system environment variables.

**Fix**

1. Open the taco.json file 
1. Change the Cordova version to 5.3.1
1. Rebuild the solution and the build should be complete successfully


### Issue 5: Visual Studio seems to randomly decide to use my node 4.1.0 install

It appear that Visual Studio sometimes wants to use its version of node and other times uses my 4.1.0 install.

**Visual Studio Version**

* npm package restore
	* I see lines like this in the output window: npm WARN engine get-stdin@5.0.0: wanted: {"node":">=0.12.0"} (current: {"node":"v0.10.31","npm":"1.4.9"})
* task runner explorer
	* I assume on this one since it complained about the gulp-sass package in Visual Studio but worked fine from the command line with node 4.1.0. 

**4.1.0 Install**

* Cordova build
	* I see that at the start of the output windows for the build:  Your environment has been set up for using Node.js 4.1.0 (ia32) and npm.
	
### Issue 6: Visual Studio seem to have a bunch of updates that were needed as well

Here is a list of different installed/re-installs/uninstalls that I did:

* Cordova tooling from RTM to update 1 (update 2 wasn't out yet)
* Due to the CPU issues with #1, I uninstall Visual Studio Cordova tooling and re-installed it, selecting update 1 
* Updated Cordova tooling from update 1 to update 2.  It came out during all of this troubleshooting
* Tried out npm 3.x.  Didn't see any changes.
* Tried install the npm taco package to see if it would help and it didn't.  Uninstall it from the node 4.1.0 npm global.
* At once point I even managed to break the Cordova tools and I uninstalled and re-installed them with update 2. 
* Uninstalled Node 4.1.0 64 bit and installed the 32 bit version
* Tried out the NodeJSTools for Visual Studio latest RC release.  Didn't see any changes so uninstalled it
* Uninstall all of the NodeJsTools for Visual Studio
* Upgraded TypeScript for Visual Studio since the Visual Studio installer said there was a new version out


### Working Steps

To create the project I first created the Ionic project using the Ionic CLI and then created a Cordova project in Visual Studio based on the Ionic CLI project that was created.

1. Open Command Line
1. Navigate to c:\projects
1. Run ionic start Demo blank
1. cd into c:\projects\Demo
1. run npm config delete loglevel
1. run pjup to update all of the npm package.  Say Y to everything except the run npm install
1. run ionic setup sass
1. run rm -rf node_modules 
1. Open Visual Studio
1. Go File -> New -> Project From Existing Code
1. Select Cordova as the project type and click Next
1. Click the browse button, navigate to the c:\projects\Demo folder, and click the Select Folder button
1. Name the project Demo
1. Click the Finish button
1. Let Visual Studio do an npm package restore
1. Ignore the gulp-sass error popup as this appears to be task runner explorer related and will go away after the npm package restore
1. Run the gulp default task to generate the sass file using the Task Runner Explorer
1. Open the taco.json file and update the version to 5.3.1
1. Delete the www\lib\angular-ui-router\api directory
1. Build the Visual Studio project
1. Deploy it to a Device/Emulator



### Conclusion

After all of this Visual Studio is now performing like I expected it to and like it does on my Intel NUC machine.  The CPU is operating at normal levels.  I am able to build everything in Visual Studio and deploy to either the Visual Studio Android Emulator or an actual Android device.  

With all of the fixes in place, I have been able to run through creating my Ionic project, then creating a Visual Studio project from it, and finally deploying it to the Emulator/Device.  

I am very happy I got this all working since I am a huge fan of Visual Studio and wanted to show people all of the goodness in Visual Studio like the package restore, task runner explorer, and debugging.  

