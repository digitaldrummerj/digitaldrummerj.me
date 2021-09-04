---
categories:
- ionic
- vagrant
- virtualbox
date: 2015-01-17T20:45:35Z
excerpt: "If you have looked at setting up the [Ionic Framework](http://www.ionicframework.com)
  or have it done it before, you know on much of a pain it can be, especially when
  something doesn't work.  Luckily, Ionic offers a free virtual machine called [Ionicbox](https://github.com/driftyco/ionic-box)
  that is already configured with all of the software that you need.  \n"
published: true
title: Ionic - The Ionicbox and How To Use It

---

If you have looked at setting up the [Ionic Framework](http://www.ionicframework.com) or have it done it before, you know on much of a pain it can be, especially when something doesn't work.  Luckily, Ionic offers a free virtual machine called [Ionicbox](https://github.com/driftyco/ionic-box) that is already configured with all of the software that you need.  

## Prerequisites:

Before you can use [Ionicbox](https://github.com/driftyco/ionic-box) you need to install [VirtualBox](http://www.virtualbox.org) and [Vagrant](http://www.vagrantup.com).  If you are on Windows and using [Chocolatey](http://www.chocolatey.org), you can install both using  cinst virtualbox and cinst vagrant.

[VirtalBox](http://www.virtualbox.org) is a free virtual machine program.  A virtual machine is a complete computer and operating system run from within your current operating system.  It makes it possible to run Linux on a Windows Machine, Windows on a Mac, etc.  

[Vagrant](http://www.vagrantup.com) is an easy way to manage virtual machines.  A full explaination is out of scope for this article.  

## Ionic Box

Make sure that you installed VirtualBox and Vagrant before proceeding.  

## Installing

1. Open Windows Explorer and create a directory where you want to hold all of your Vagrant configuration files

2. Instead the directory created in step 1, create a directory called IonicBox

3. In Windows Explorer, create the directory under the c drive called projects (i.e. c:\projects)

4. In Windows Explorer, do a shift+right click on the IonicBox directory and select Open Command Prompt 

5. Run: vagrant init drifty/ionic-android

6. Open notepad

7. In notepad, open the VagrantFile created in the IonicBox directory. 

8. select all of the text in the VagrantFile and remove it

9. Copy the following text into the VagrantFile

{{< highlight ruby >}}
# -*- mode: ruby -*-
# vi: set ft=ruby :
Vagrant.configure(2) do |config|
 config.vm.box = "drifty/ionic-android"
 config.vm.hostname = "[Replace with what you want your Host Name to be]" # No Spaced Allowed
 config.vm.boot_timeout = 600
 config.vm.network :forwarded_port, host: 8100, guest: 8100
 config.vm.network :forwarded_port, host: 35729, guest: 35729
 config.vm.synced_folder "c:\\projects", "/home/vagrant/vagrant_projects"
 config.vm.provider "virtualbox" do |vb|
       vb.gui = true
       vb.customize ["modifyvm", :id, "--vram", "128"]
       vb.customize ["modifyvm", :id, "--usb", "on"]
       vb.customize ["usbfilter", "add", "0", "--target", :id, "--name", "android", "--vendorid", "0x18d1"]
       vb.memory = 2048
       vb.cpus = 2
       vb.name = "IonicBox"
       
       # Need This If On Windows
       vb.customize ["setextradata", :id, "VBoxInternal2/SharedFoldersEnableSymlinksCreate/v-root", "1"]
 end
end
{{< / highlight >}}

## So what do  all of those options in the VagrantFile mean?

In the configuration we configure the video and physical memory of the virtual machine.  Since IonicBox is just a shell without a GUI, it doesn't need a lot of resources, so we only give it 2 gigs of memory.  Now if your host system doesn't have a lot of memory, you will need to dial this down.  

Ionic uses port 8100 for the web site and the live reload function use port 35729.  We forwarded these ports from IonicBox to the host machine so we can access the web server.  The following two lines do the port forwarding

{{< highlight io >}}
config.vm.network :forwarded_port, host: 8100, guest: 8100
config.vm.network :forwarded_port, host: 35729, guest: 35729
{{< / highlight >}}

The IonicBox is just a Linux shell with no GUI so you will want to use a feature in VirtualBox called Shared Folders to be able to edit the files from your host machine.  In our case we are using c:\projects on the host machine which is linked to ~/vagrant_projects on the IonicBox

{{< highlight io >}}
config.vm.synced_folder "c:\\projects", "/home/vagrant/projects"
{{< / highlight >}}

Next we set up the VirtualBox options

- We don't need the VirtualBox GUI since we are going to SSH into the machine so we can turn it off with.  Set this to true the first time, just so you can see it

{{< highlight io >}}
vb.gui = false
{{< / highlight >}}

- We set the Video Ram to 128 megs

{{< highlight io >}}
vb.customize ["modifyvm", :id, "--vram", "128"]
{{< / highlight >}}

- Turn on the USB drivers so that we can connect an Android device

{{< highlight io >}}
vb.customize ["modifyvm", :id, "--usb", "on"]
{{< / highlight >}}

- Add a usb device filter for a Android Device

{{< highlight io >}}
vb.customize ["usbfilter", "add", "0", "--target", :id, "--name", "android", "--vendorid", "0x18d1"]
{{< / highlight >}}

- On Windows, You need to turn on Symlinks to the synced_folders.  This is needed if your Host Operating System is Windows in order node/npm to work correctly.  Remember you have to run your command prompt as an administrator for this command to work.    

{{< highlight io >}}
vb.customize ["setextradata", :id, "VBoxInternal2/SharedFoldersEnableSymlinksCreate/v-root", "1"]
{{< / highlight >}}


- Set the system memory for the virtual machine.  If you host machine is low on memory you can reduce this down.  You must have this much memory free when the virtual machine starts up

{{< highlight io >}}
vb.memory = 2048
{{< / highlight >}}

      
      
- Number of Physical CPUs to allocate.  My machine only has 2 physical CPUs.  You can allocate more or take it down to 1

{{< highlight io >}}
vb.cpus = 2
{{< / highlight >}}



- The name to use for the virtual machine in the VirtualBox Manager UI

{{< highlight io >}}
vb.name = "IonicBox"
{{< / highlight >}}



## Starting up the IonicBox and Getting logged in

1. Open a command prompt and navigate to the IonicBox folder that contains the VagrantFile.
      * <font color="red">If on Windows, open the command prompt as an Administrator.</font> 
      * To open the command prompt as an administrator in Windows 8 go to the Start Menu Screen, type cmd, then ctrl+shift+click or ctrl+shift+enter   
  
1. Run command below. This command will take a while the first time you run it since it has to download the vagrant box container which is about 1 gig in size.

{{< highlight io >}}
vagrant up
{{< / highlight >}}


If you have the vb.gui = true in your VagrantFile, the first thing you will notice when you boot up the IonicBox is that it just comes to a command prompt and it leaves you wondering now what.  Luckily, this is exactly what we want and it is very easy to manage it.  The IonicBox basically just replaces the command prompt that we would normally use for all of the Ionic commands with a linux machine.  

- To login to the machine, use the same command prompt as previous step and run

{{< highlight io >}}
vagrant ssh
{{< / highlight >}}



- if everything went successful you should be logged in


## Testing the IonicBox

Now lets create our first Ionic project.  

On the IonicBox ssh connection:


{{< highlight io >}}
cd projects
ionic start firstApp tabs && cd firstApp
ionic serve
{{< / highlight >}}

You now have a Ionic project in a directory called firstApp and the web server is running.

Open up your web browser and navigate to http://localhost:8100

You can view all of the files that make up this project on your host machine under c:\projects\firstApp

If you are NOT using Windows as your host operating system that we are done with configurations.  Unfortunately, if you are using Windows as your host operating system, we have one more step to get npm working correctly, so that you can download all of the dependencies for Ionic.

<font color="red">WARNING: Unless you have npm 3.0+.  This may not fix the issue with node and long file names on Windows with npm.</font>

We need to setup a symbolic link for the node modules folder since windows has a length limitation when using shared folders.  A symbolic link is basically a point from one directory to another.  Windows has a directory name length limitation that we encounter when host our files through a shared folder.  Since our npm dependencies (node modules) folder doesn't need to be checked into source control, we can move it to a directory on the IonicBox and just point to that from within our Ionic projects.

On the IonicBox from the firstApp folder run the following commands:

{{< highlight io >}}
mkdir ~/node_modules_[Your Project]
ln -s ~/node_modules_[Your Project] node_modules
npm install
{{< / highlight >}}

**<font color="red">Remember:</font>** If on Windows, you need to run the vagrant up command from an administrative command prompt. 

You may also need to manually install bower 

{{< highlight io >}}
sudo npm install bower -g
{{< / highlight >}}

## I am done with IonicBox, now what?

- To exit vagrant ssh session, just type exit from the command prompt that is logged into the IonicBox.  This will put you back into the original command prompt.

- Hibernate: from the IonicBox directory with the VagrantFile run


{{< highlight io >}}
vagrant suspend
{{< / highlight >}}




- Shutdown and Turn Off: from the IonicBox directory with the VagrantFile run

{{< highlight io >}}
vagrant halt
{{< / highlight >}}


- Delete the whole IonicBox Virtual Machine: from the IonicBox directory with the VagrantFile run

{{< highlight io >}}      
vagrant destroy
{{< / highlight >}}



 - Note that sometimes this leaves behind the directory that contained the Virtual Machine.  Before you can run vagrant up again, you will need to manually delete this directory.

## Conclusion

This is a nice easy way to get started with ionic without having to install much onto your current machine.  

However, if you are going to spend a lot of time developing ionic applications, it won't be long before you go down the route of installing everything onto your machine to do the development work.  

Check out my installation guides to help you out:

[Mac Installation]({{ "ionic-setup-osx" | prepend: site.baseurl | prepend: site.url }})

[Windows Installation]({{ "Ionic-Setup-Windows" | prepend: site.baseurl | prepend: site.url }})