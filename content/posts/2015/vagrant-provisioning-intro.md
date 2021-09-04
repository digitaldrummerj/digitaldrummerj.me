---
categories:
- virtualbox
- vagrant
- chocolatey
date: 2015-06-18T01:00:00Z
excerpt: "Welcome to the Vagrant lesson on what Vagrant provisioning is.\n\nProvisioners
  allow you to automatically install software and alter configurations during the
  Vagrant up process.\n\nThis is useful since boxes typically aren't built perfectly
  for your use case. Granted you could just login to the box and install all of the
  software by hand.  However, by using the provisioning it automates the process,
  make it repeatable, and requires no human interaction.\n\nThis means that you can
  run vagrant destory, then vagrant up and have a fully configured environment. This
  makes provisioning super powerful.    \n\nVagrant gives you multiple options for
  provisioning the machine, from simple command line scripts to more complex configuration
  management systems such as chef and puppet. \n"
published: true
series: ["vagrant getting started"]
title: Vagrant Part 2 - Provisioning Introduction

---

Welcome to the Vagrant lesson on what Vagrant provisioning is.  



## What is Vagrant Provisioning?

Provisioners allow you to automatically install software and alter configurations during the Vagrant up process.

This is useful since boxes typically aren't built perfectly for your use case. Granted you could just login to the box and install all of the software by hand.  However, by using the provisioning it automates the process, make it repeatable, and requires no human interaction.

This means that you can run vagrant destory, then vagrant up and have a fully configured environment. This makes provisioning super powerful.


Vagrant gives you multiple options for provisioning the machine, from simple command line scripts to more complex configuration management systems such as chef and puppet. 

## When Does Vagrant Provisioning Happens?

Provisioning happens at certain points during the lifetime of your Vagrant environment:

* On the first vagrant up that creates the environment, provisioning is run. 
* When vagrant provision is used on a running environment.
* When vagrant reload --provision is called. The --provision flag must be present to force provisioning.

You can also bring up your environment and explicitly not run provisioners by specifying --no-provision.  You would typically only do this if you need to test out something in your vagrant configuration.

## Vagrant Provisioning Providers

For this tutorial, we are going to use the shell and file providers as they are the simpliest to get started with.  
  
**Shell Provider**

The shell provider will run either batch files or powershell scripts depending on the file extension.  The script needs to be able to run without user interaction.

**File Provider**

The file provider, copies a file from your machine to the virtual machine but does not run the script.  This is useful for scripts that need user interaction or configuration files that need to be put into place on the virtual machine.

## Next Steps

Now that we understand what provisioning is, in the next couple of lessons we are going to expand on the provisioning to have it install Chocolatey, Boxstarter, and then all of our software using Chocolatey/BoxStarter.

