---
categories:
- vagrant
- chocolatey
date: 2015-07-06T06:00:00Z
excerpt: If you are working behind a proxy server you will need to configure both
  the host computer and the Vagrant virtual machines to communicate through the proxy
  server.   It is easy to configure the proxy settings but finding the documentation
  is a different story.  Below we will go through how to configure the proxy for the
  vagrant commands (up, status, box add, etc) and then how to configure the virtual
  machine proxy settings.
published: true
series: ["vagrant getting started"]
title: Vagrant Part 6 - Behind A Proxy Server

---

## Overview

If you are working behind a proxy server you will need to configure both the host computer and the Vagrant virtual machines to communicate through the proxy server.   It is easy to configure the proxy settings but finding the documentation is a different story.  Below we will go through how to configure the proxy for the vagrant commands (up, status, box add, etc) and then how to configure the virtual machine proxy settings. 

## Vagrant Commands

In order for the Vagrant commands that talk out to the internet to work there are several environment variables that need to be set.

The typical proxy environment variables are http_proxy and https_proxy.  You can either permanently set them so they are always available or you can set them only for the current open command prompt/terminal.

## On Windows

### Current Open Command Prompt

	set http_proxy=http://yourproxyserver:port
	set https_proxy=https://yourproxyserver:port
	
### Permantly Set

	setx http_proxy=http://yourproxyserver:port
	setx https_proxy=https://yourproxyserver:port
 
### View Proxy Settings

If the commands below just echo out the text instead of the actual proxy server, it means that the proxy server is not set.

	echo %http_proxy%
	echo %https_proxy%

### Removing Proxy Setting

Unfortunately there is no way to remove the proxy settings from the command line without issuing a reg delete.  For whatever reason, Microsoft only allows you to blank out an environment variable with setx but not remove it.  Luckily, this does make it so that Vagrant will not use a proxy to connect to the internet.


## Vagrant Boxes (Virtual Machines)

<div class="panel">
<span style="color: red">WARNING: </span>As of September 13, 2015, the vagrant-proxyconf appears to no longer work on Windows machines.  It has been throwing powershell errors on vagrant up.   It still works on Linux vagrant machines.
</div>
In order to configure the vagrant virtual machines to use a proxy server, you need to install the vagrant-proxyconf plugin.

	vagrant plugin install vagrant-proxyconf

The vagrant-proxyconf can configure the proxy settings for Generic Proxy environment variables, Chef, Apt, Docker, Git, npm, PEAR, Subversion, Yum, and Windows.

Below we will walk through the basics of using the vagrant-proxyconf plugin.  You can read the full documentation at [https://github.com/tmatilai/vagrant-proxyconf](https://github.com/tmatilai/vagrant-proxyconf).   


### Ensuring the plugin is installed

There is no built-in vagrant command to make sure that a plugin is installed but since the Vagrantfile is a Ruby file, it is very easy to write a little bit of Ruby code to ensure that the plugin is installed.

In the Vagrantfile before the **Vagrant.configure(2) do |config|** line added the following code snippet: 

	if !Vagrant.has_plugin?("vagrant-proxyconf") 
	     	system('vagrant plugin install vagrant-proxyconf')     
	     
	     raise("vagrant-proxyconf installed. Run command again.");
	end


### Generic Proxy Settings

You can either configure the Vagrant proxy settings on a per Vagrant virtual machine basis or globally.

To configure on a per machine basis, add the code snippet below to the the machines VagrantFile.

To configure global add the code snippet below to VagrantFile at .vagrant.d/Vagrantfile.  You may need to create this file.  To learn more about a global VagrantFile and the order that the VagrantFile's are read see [http://docs.vagrantup.com/v2/vagrantfile/](http://docs.vagrantup.com/v2/vagrantfile/).

	Vagrant.configure("2") do |config|
	  if Vagrant.has_plugin?("vagrant-proxyconf")
	    config.proxy.http     = "http://192.168.0.2:3128/"
	    config.proxy.https    = "http://192.168.0.2:3128/"
	    config.proxy.no_proxy = "localhost,127.0.0.1,.example.com"
	  end
	  # ... rest of the configurations
	end

## Next Steps

Now you have everything you need to configure Vagrant to work from behind a proxy server.  In the next lesson we will cover the different networking options for Vagrant.    



