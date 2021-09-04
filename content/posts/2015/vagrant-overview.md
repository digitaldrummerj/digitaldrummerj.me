---
categories:
- vagrant
- virtualbox
date: 2015-06-16T00:00:00Z
excerpt: "Welcome to an overview of Vagrant and creating of your first Vagrant machine.
  \ \n\nVagrant allows you to create and manage lightweight reproducible virtual machines.
  \      \nEssentially, all of the configurations to create and configure a virtual
  machine are kept separate from the virtual machine.  This allows you to delete the
  virtual machine and then re-create it with all of the same configurations at any
  point.   \n\nNo longer do you have to be afraid to delete a virtual machine for
  a project that isn't active.  You can also give the Vagrant configuration to a co-worker
  or move it to another machine and be assured that everything will get setup correctly
  when you create the virtual machine on the new machine.\n\nBefore, we can see Vagrant
  in action, we first need to install a little bit of software onto your machine.\n"
published: true
series: ["vagrant getting started"]
title: Vagrant Part 1 - Easy Virtual Machine Management

---

Welcome to an overview of Vagrant and creating of your first Vagrant machine.  




## What is Vagrant?

Vagrant allows you to create and manage lightweight reproducible virtual machines.   

Essentially, all of the configurations to create and configure a virtual machine are kept separate from the virtual machine.  This allows you to delete the virtual machine and then re-create it with all of the same configurations at any point.   

No longer do you have to be afraid to delete a virtual machine for a project that isn't active.  You can also give the Vagrant configuration to a co-worker or move it to another machine and be assured that everything will get setup correctly when you create the virtual machine on the new machine.
  
Before, we can see Vagrant in action, we first need to install a little bit of software onto your machine.

## Getting Started

In this section, we will install all of the software needed to be able to Vagrant.  

There are 3 pieces of software that we need:

1. Chocolatey
1. Virtualbox
1. Vagrant

## Chocolatey

Chocolatey is a Windows software install manager.  It solves several common issues with software installed:

* Where do I find the installer for software?
* How do I find the 64 bit vs 32 bit version?
* What default options should I select?
* Where should  I install the software to?
* etc
* etc

To install Chocolatey, open an administrative command prompt and  run the command below or get the command right on the home for Chocolatey at  [http://chocolatey.org](http://chocolatey.org)  .

	@powershell -NoProfile -ExecutionPolicy Bypass -Command "iex ((new-object net.webclient).DownloadString('https://chocolatey.org/install.ps1'))" && SET PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin

Go ahead and close the command prompt that you used to install Chocolatey.  This is needed so that all of the environment variables get refresh that are part of the Chocolatey installer.

Now that we have Chocolatey installed, we can start installing software or as Chocolatey calls them, packages.

To install a package, you would run the command:

	choco install [package name]
	
You can find the package names on the Chocolatey Gallery at [http://chocolatey.org](http://chocolatey.org).  

Next we are going to install Virtualbox using Chocolatey.

## Virtualbox

For this tutorial, I am using Virtualbox as the virtual machine provider.  You could also use Hyper-V (free)  or VMWare (paid).  If you are using Hyper-V already, you can not use Virtualbox at the same as they conflict with each other.

If you already have Virtualbox installed, you can skip this step.  

Open an administrative command prompt and run the following Chocolatey command.  

	choco install virtualbox.extensionpack
	
The command above will also instal Virtualbox as it is listed as a dependency for the virtualbox.extensionpack package.

## Vagrant

To install Vagrant, from the administrative command prompt, run the following Chocolatey command.

	choco install vagrant

We are now ready to create our first virtual machine using Vagrant.
	
## Your First Machine

Vagrant create a file called VagrantFile for each virtual machine,  The VagrantFile contains the information about the box the virtual machine is based off of, how to setup the network, the virtualization provider (virtualbox, vmare, hyper-v, azure, etc), and any provisioning scripts to run (shell , puppet, chef, etc) .  

Vagrant starts with a base box which nothing more than the a portable skelton for building virtual machine.  There are 2 types of boxes for Vagrant.

1. **Pre-Build:**  meaning that everything that you need is installed on the box.  You just create the vagrant machine and are ready to start developing.
1. **Base OS:** just the OS is installed and as part of the  creation of the vagrant machine, you install all of the needed software.

For this tutorial, we are going to use the Base OS box and build out the box with all of the software we need.

## Creating VagrantFile 
 
The first step is to create a directory to hold the VagrantFile.  I use c:\VagrantBoxes to hold all of the my Vagrant machines configurations.

1. Within c:\VagrantBoxes, create a directory called MyFirstMachine.

1. Open up a command prompt and navigate to the MyFirstMachine directory that you just created.
 
1. To initalize the Vagrant box, you need to run the vagrant init command.   This command will initialize the directory to hold Vagrant information and creates the VagrantFile.

1. For this tutorial, we are going to use the box "opentable/win-8.1-enterprise-amd64-nocm".  The command below will initalize the MyFirstMachine directory.

	vagrant init "opentable/win-8.1-enterprise-amd64-nocm"
	
Additional boxes can be from the cloud at [https://atlas.hashicorp.com/boxes/search]( https://atlas.hashicorp.com/boxes/search)

## Configuring the VagrantFile

In the MyFirstMachine directory there is now a file called VagrantFile.  Open this file up in your favorite text editor.  

Within the VagrantFile, there is a basic configuration already setup and a lot of very useful comments that explain the different possible configurations.

### Vagrant general configurations

1. config.vm.box is the name of the Vagrant base box to use to start up the machine with.  If this base box does not already exist on your machine it will attempt to download it from the Vagrant cloud.  

		config.vm.box = "opentable/win-8.1-enterprise-amd64-nocm"

1. Configure the actual machine name of the virtual machine
	
		config.vm.hostname = "MyFirstMachine"	

1. How long Vagrant will keep trying to connect to the virtual machine before it assume something went wrong and times out.
	
		config.vm.boot_timeout = 600
	
1. How to commumicate with the machine.  The two options are SSH and WinRM.  Typically SSH is used for Linux and WinRM for Windows machines.
	
		config.vm.communicator = "winrm"

### Virtualbox Configurations

In the configuration below, it will configure the virtual machine with: 

* 4 gigs of RAM
* Set it to use 2 CPUs
* Make the video ram 128 megs
* Set the clipboard as bidirectional so you can copy and paste from the host machine to virtual machine as well as from the virtual machine to host machine.
* Name the machine in the Virtualbox Manager UI.

		config.vm.provider "virtualbox" do |vb|
				vb.memory = "4096"
				vb.cpus = 2
				vb.customize ["modifyvm", :id, "--vram", "128"]
				vb.customize ["modifyvm", :id, "--clipboard", "bidirectional"]
				vb.name = "My First Machine"   
			end     

Now we are ready to start up the machine and start using it. 

1. Open a command prompt.
1. Navigate to the MyFirstMachine folder.
1. Run vagrant up to start up the machine.
	* The first time you run this command using a new base box, it will take a bit as it has to download the box from the cloud.  

Now that the machine is started up, there are some additional Vagrant commands that you will need to know to be able to hibernate, reboot, shutdown, and delete the virtual machine

## Vagrant Commands

The commands below all need to run from the command line from within the MyFirstMachine folder.

**See Status of Machine**

	vagrant status
	
**Hibernate Machine**

	vagrant suspend
	
**Reboot Machine**

	vagrant reload
	
**Shutdown Machine**

	vagrant shutdown
	
**Remove Virtual Machine**

	vagrant destroy
	
**Re-Create Machine after Destroying it**

	vagrant up
	
## Next Steps

You have just create and started up your first Vagrant managed Virtual machine.  This is only the beginning of what you can do with Vagrant.  In future lessons in this series we will install software and configure the OS as part of the vagrant up command, we will create multiple machine with a single vagrant command, create azure virtual machines, and create own own base boxes.

The next lesson, will cover the start of provisioning.  We will install Chocolatey as part of the vagrant up command.

