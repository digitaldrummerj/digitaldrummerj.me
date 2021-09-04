---
categories:
- vagrant
date: 2015-10-04T00:00:00Z
excerpt: "As part of my [demo](https://github.com/digitaldrummerj/VagrantTalk/tree/master/ExampleVagrantFiles/WindowsWithChocolatey)
  during my Vagrant talk, I use the [opentable/win-8.1-enterprise-amd64-nocm](https://atlas.hashicorp.com/opentable/boxes/win-8.1-enterprise-amd64-nocm)
  vagrant base box with the virtualbox provider.  This vagrant base box unfortunately
  has an issue with the vagrantfile that is included with it looking for the old/unneeded
  vagrant windows plugin to be installed and trying to port forward the WinRM and
  RDP ports without detecting if the port is already in use.\n\nLuckily, it is really
  easy to fix the included vagrantfile so that you can create vagrant machines but
  you have to do some prework before running a vagrant up using this base box.       \n"
published: true
title: Vagrant - Fixing Opentable Basebox looking for Windows Plugin

---

## Overview

As part of my [demo](https://github.com/digitaldrummerj/VagrantTalk/tree/master/ExampleVagrantFiles/WindowsWithChocolatey) during my Vagrant talk, I use the [opentable/win-8.1-enterprise-amd64-nocm](https://atlas.hashicorp.com/opentable/boxes/win-8.1-enterprise-amd64-nocm) vagrant base box with the virtualbox provider.  This vagrant base box unfortunately has an issue with the vagrantfile that is included with it looking for the old/unneeded vagrant windows plugin to be installed and trying to port forward the WinRM and RDP ports without detecting if the port is already in use.

Luckily, it is really easy to fix the included vagrantfile so that you can create vagrant machines but you have to do some prework before running a vagrant up using this base box.

## Downloading the Box

Normally with vagrant you do not need to download the vagrant box before running vagrant up but in this case you do need to download the [opentable/win-8.1-enterprise-amd64-nocm](https://atlas.hashicorp.com/opentable/boxes/win-8.1-enterprise-amd64-nocm) box first.  We can download the box by running the following command from the command line.  
    
    $ vagrant box add opentable/win-8.1-enterprise-amd64-nocm
    
It will take a bit to download the vagrant box as it is several gigs in size.

## Fix for Unneeded Check for Vagrant Windows Plugin

Once the box is downloaded, you need to go to the .vagrant.d directory that contains the box you just downloaded.  On Windows this directory is located at %userprofile%\.vagrant.d\boxes\opentable-VAGRANTSLASH-win-8.1-enterprise-amd64-nocm\1.0.0\virtualbox

This directory contained the Vagrantfile that we need to update.  You can open this file in any text editor.

When you open up the file you will see this section of code.  

    if !Vagrant.has_plugin?('vagrant-windows')
      puts "vagrant-windows missing, please install the vagrant-windows plugin!"
      puts "Run this command in your terminal:"
      puts "vagrant plugin install vagrant-windows"
      exit 1
    end

This section is no longer need and can be deleted.  The vagrant-windows plugins is how Vagrant used to supported the Windows OS before it was supported out of the box.  


## Fix for Port Forwarding Auto Correct

We are going to edit the same Vagrantfile as the previous section.  Again this file is located at %userprofile%\.vagrant.d\boxes\opentable-VAGRANTSLASH-win-8.1-enterprise-amd64-nocm\1.0.0\virtualbox

Open up the Vagrantfile in any text editor.

When you open up the file you will see this section of code.  

    config.vm.network :forwarded_port, guest: 3389, host: 3389
    config.vm.network :forwarded_port, guest: 5985, host: 5985

The problem with this section is that if ports 3389 or 5985 are already in use on your host machine, then the command will fail.  

To correct this we need to add the auto_correct parameter to each of the port forwarding commands so that Vagrant will automatically pick an unused port if it detects either 3389 or 5985 are in use on your host machine.

    config.vm.network :forwarded_port, guest: 3389, host: 3389, auto_correct: true
    config.vm.network :forwarded_port, guest: 5985, host: 5985, auto_correct: true

## Wrap-up

Now you can use the [opentable/win-8.1-enterprise-amd64-nocm](https://atlas.hashicorp.com/opentable/boxes/win-8.1-enterprise-amd64-nocm) vagrant base box with the vagrant up command to create a new virtual machine.  

Not all vagrant base boxes have this issue but if you do run across one you know how to fix it.
