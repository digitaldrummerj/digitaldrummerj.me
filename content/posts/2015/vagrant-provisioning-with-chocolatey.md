---
categories:
- virtualbox
- vagrant
- chocolatey
date: 2015-06-18T02:00:00Z
excerpt: "Welcome to the Vagrant lesson on installing Chocolatey as part of the Vagrant
  provisioning process.\n\nThe first thing we are going to do as part our provisioning
  is to install Chocolatey onto the virtual machine. \n"
published: true
series: ["vagrant getting started"]
title: Vagrant Part 3 - Provisioning With Chocolatey

---

Welcome to the Vagrant lesson on installing Chocolatey as part of the Vagrant provisioning process.




## Overview

The first thing we are going to do as part our provisioning is to install Chocolatey onto the virtual machine. 

As we saw in the [Easy Virtual Machine Management]({{"/vagrant-overview" | prepend: site.baseurl | prepend: site.url }}) post, having Chocolatey on a machine allows you to easily install all of our software in an automated and repeatable fashion.

## How to install as part of Vagrant provision?

1. Open Windows Explorer and navigate to the MyFirstMachine directory that we created in the [Easy Virtual Machine Management]({{ "/vagrant-overview" | prepend: site.baseurl | prepend: site.url }}) post.
1. Create a directory called shell
1. In the shell directory, create a file called main.cmd
1. Open the main.cmd in your text editor and add the following line:
	* This will tell powershell to run the file c:\vagrant\shell\InstallChocolatey.ps1 and set the execution policy to bypass so that the powershell script can be run.  

			@powershell -NoProfile -ExecutionPolicy Bypass -File "%systemdrive%\vagrant\shell\InstallChocolatey.ps1"
	 
1. In the shell directory, create a file called InstallChocolatey.ps1
	* The file will check to see if Chocolatey is installed and if not, it will install it.
	 
			$ChocoInstallPath = "$env:SystemDrive\ProgramData\Chocolatey\bin"
						
			if (!(Test-Path $ChocoInstallPath)) {
			    iex ((new-object net.webclient).DownloadString('https://chocolatey.org/install.ps1'))
			}

1. The last step is to tell VagrantFile to run the main.cmd file as part of the provisioning.
  	
	  	config.vm.provision :shell, path: "shell/main.cmd"

## Next Steps

We now have Chocolatey installed on the virtual machine and are ready to start installing software.  The next lesson will install Boxstarter and then you will bulk install all of our software.   

