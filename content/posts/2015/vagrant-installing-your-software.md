---
categories:
- virtualbox
- vagrant
- chocolatey
date: 2015-06-18T05:00:00Z
excerpt: "Welcome to the Vagrant lesson on how to use Boxstarter to configure Windows
  and install software as part of the Vagrant provisioning process.\n\nWe have all
  of the needed software in place to start configuring and installing software onto
  our virtual machine.\n\nIn this lesson, we will create an file with all of the install
  and configuration commands that will be executed with Boxstarter. \n"
published: true
series: ["vagrant getting started"]
title: Vagrant Part 5 - Installing Your Software

---

Welcome to the Vagrant lesson on how to use Boxstarter to configure Windows and install software as part of the Vagrant provisioning process.



## Overview

We have all of the needed software in place to start configuring and installing software onto our virtual machine.

In this lesson, we will create an file with all of the install and configuration commands that will be executed with Boxstarter. 

## Can I only install Chocolatey Packages?

Even though Boxstarter is a Chocolatey package, you can install and configure more than just Chocolatey packages.  At the end of the day it is running a Powershell script, so anything that you can do with Powershell you can put into your file to execute through Boxstarter.

## Example File

1. In the shell directory for MyFirstMachine, create a file called BoxStarterGist.txt.
1. In the shell directory for MyFirstMachine, create a 2nd file called 	RunBoxStarterGist.bat.
1. Open the RunBoxStarterGist.bat file and add the following command to copy the file to the temp directory and execute it with Boxstarter.
	* The reason to copy the BoxStarterGist.txt file to a temp directory is that sometimes when Boxstarter reboots, the vagrant synced folder for Virtualbox is not mounted until after Boxstarter tries to continue executing the bat file, so it then fails.    
	 
			copy "%systemdrive%\vagrant\shell\BoxStarterGist.txt" "%temp%\BoxStarterGist.txt"
	
			@powershell -NoProfile -ExecutionPolicy Bypass -Command "Install-BoxStarterPackage -PackageName %temp%\\BoxstarterGist.txt"  

## Populating the BoxstarterGist.txt file

We are going to do several things in the BoxstarterGist.txt file:  

* Set some Windows configurations such as taskbar size, Windows explorer show extensions/protected OS file/hidden files, and enable rdp.
* Install some Chocolatey packages such as Visual Studio Code, nodejs, git, and Google Chrome.
* Install some npm packages such as Ionic and Cordova
* Run a git clone to pull down source code for a project

These are all examples of things that you can do.  At the end of the day it is just a Powershell script so that options are nearly limitless.  I encourage you to read up on Boxstarter at [http://boxstarter.org](http://boxstarter.org) to see all of options that you have.

Open up the BoxstarterGist.txt file in your favorite text editor and proceed to the configuration sections.  I have the sections in the order that I like to install/configure but you can have them in any order in the BoxstarterGist.txt file.
  
### Windows Configurations

This section is the Windows configuration options that we want to set.  The full Windows configuration documentation for Boxstarter is available at [http://boxstarter.org/WinConfig](http://boxstarter.org/WinConfig).

1. Enable Remote Desktop 

		Enable-RemoteDesktop
	
1. Tell Windows that you want to use Powershell instead of a command prompt when you use the corner navigation. 

		Set-CornerNavigationOptions -EnableUsePowerShellOnWinX

1. In Windows exploer turn on hidden files, protected operating system files, show file extensions, and show the full path in the title bar.

		Set-ExplorerOptions -EnableShowHiddenFilesFoldersDrives -EnableShowProtectedOSFiles -EnableShowFileExtensions 	-EnableShowFullPathInTitlebar

1. Set the taskbar size to small and lock it in place.

		Set-TaskbarOptions -Size Small -Lock

### Chocolatey Installs

Now it is time to install all of our Chocolatey Packages.


The first step is to turn off the prompting from Chocolatey asking if you are sure you want to install this package.  Don't worry will turn it back on in a few lines after the Chocolatey package installs are completed.
	
	chocolatey feature enable -n=allowGlobalConfirmation

Next we are going to install the Chocolatey packages that you want.  I picked a few but go to the Chocolatey gallery at [http://chocolatey.org](http://chocolatey.org) and find the packages that meet your needs.
 
	choco install git 
	choco install nodejs 
	choco install visualstudiocode 
	choco install GoogleChrome 

Now that we are done installing Chocolatey packages we are going to turn back on the prompting for confirmation that you wanted to install the packages.

	chocolatey feature disable -n=allowGlobalConfirmation

Last thing we are going to do is pin a couple of items that we installs to the taskbar using a built-in helper from Chocolatey called Install-ChocolateyPinnedTaskBarItem.
 

	Install-ChocolateyPinnedTaskBarItem "${env:UserProfile}\Desktop\code.lnk"

	Install-ChocolateyPinnedTaskBarItem "${env:ProgramFiles(x86)}\Google\Chrome\Application\chrome.exe"
	
### npm installs

I play around with npm a lot and don't like the spinner when running an npm command, so I turn that off and set the log level that I like.  I then install the Ionic framework and Cordova npm packages.   

	npm config set loglevel http
	npm config set spin false

	npm install -g ionic
	npm install -g cordova

### git clone repositories

The last thing that I do as part of the BoxStarterGist.txt file is to create c:\projects which is where I store my project source code at and pull it down from Github.

	$projectDir = "${env:systemdrive}\projects"
	
	If (!(Test-Path $projectDir)) {
		New-Item -Path $projectDir -ItemType Directory
	}
	
	cd $projectDir
	
	git clone https://github.com/digitaldrummerj/VagrantTalk

## How to install your software part of Vagrant provision?

Now that we have the BoxStarterGist.txt file configured the way that we want it, we need to tell Vagrant what to do with it.  

For this one we are using the file provision which copies the files to the virutal machine but does not execute it.  The reason for this is that when Boxstarter reboots the machine, Vagrant thinks the script is done and proceeds to the next provision call which sometimes interfers with the Boxstarter run.  So instead I put it on the desktop and manually login to the machine and execute the RunBoxStarterGist.bat file.

	  config.vm.provision "file",
	           source: "shell/RunBoxStarterGist.bat",
	           destination: "desktop\\RunBoxStarterGist.bat" 

## Running the RunBoxStarterGist.bat file

After you do vagrant up and all of the provisioners runs, you will see the RunBoxstarterGist.bat on the desktop for the vagrant user.  You will just need to manually execute this file.  Once you kick it off you can walk away and let it do all of the installs.
 
## Next Steps

The next lesson will cover the different networking options that vagrant supports.  By default Vagrant sets up the virtual machine with a NAT network so that you can only get to the machine from the host.  You an however setup both a public and private network.  We will dive into how to do this.

