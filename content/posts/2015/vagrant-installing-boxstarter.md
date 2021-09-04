---
categories:
- virtualbox
- vagrant
- chocolatey
date: 2015-06-18T03:00:00Z
excerpt: "Welcome to the Vagrant lesson on installing Boxstarter as part of the Vagrant
  provisioning process.\nBoxstarter gives you the ability to bulk install Chocolatey
  packages plus several helper functions for Windows configuration options.  \n\nWhen
  you bulk install using Boxstarter, it will detect any reboots that are triggered
  by MSI installers, reboot the machine and then run the Boxstarter script again.\n\nThe
  Windows configuration helper functions that Boxstarter provides  to enable or disable
  Windows features include items such as: \n* Remote desktop.\n* Microsoft update.\n*
  User access control (UAC).\n* Set taskbar options like size, postion, and lock the
  size.\n* Set Windows explorer options like showing hidden files, protected OS files,
  and file extensions.\n"
published: true
series: ["vagrant getting started"]
title: Vagrant Part 4 - Install Boxstarter

---

Welcome to the Vagrant lesson on installing Boxstarter as part of the Vagrant provisioning process.



## What does Boxstarter give you?

Boxstarter gives you the ability to bulk install Chocolatey packages plus several helper functions for Windows configuration options.  

When you bulk install using Boxstarter, it will detect any reboots that are triggered by MSI installers, reboot the machine and then run the Boxstarter script again.

The Windows configuration helper functions that Boxstarter provides  to enable or disable Windows features include items such as: 

* Remote desktop.
* Microsoft update.
* User access control (UAC).
* Set taskbar options like size, postion, and lock the size.
* Set Windows explorer options like showing hidden files, protected OS files, and file extensions.

## How to install Boxstarter part of Vagrant provision?

Since we already have Chocolatey installed as part of the previous lesson, installing Boxstarter just requires use to call the choco install Boxstarter command.  

However, there are a few things we need to do in order for this to work without user interaction.  

* You have to run the install command as separate shell provision command in Vagrant instead of the main.cmd that we used to install Chocolatey. The reason for this is due to the environment path updates that are part of the Chocolatey install are not picked up until you open a new command prompt.
* You have to turn off the Chocolatey confirmation prompts that ask you if you want to install this package or not.  

## Creating the Provisioning Scripts

1. Navigate to the shell directory in the MyFirstMachine directory that we created in previous lessons.
1. Create a new file called InstallBoxStarter.bat
1. Add the following contents to the InstallBoxStarter.bat file:
	
		chocolatey feature enable -n=allowGlobalConfirmation
		choco install BoxStarter
		chocolatey feature disable -n=allowGlobalConfirmation
	
1. In the MyFirstMachine folder, open the VagrantFile in a text editor and add the following provision command after the provision command that is running the main.cmd file in the previous lesson.  

		config.vm.provision :shell, path: "shell/InstallBoxStarter.bat"    

## Next Steps

So far in the provisioning process, we have had Vagrant install both Chocolatey and Boxstarter.  In the next lesson, we will use Boxstarter to bulk install our software and configure Windows.

