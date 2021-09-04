---
categories:
- blogging
- jekyll
date: 2015-09-09T01:00:00Z
excerpt: "Welcome the continuing series on using Jekyll. In this tutorial we are going
  to setup your Windows computer to be able to edit your blog on your computer.\n\n##
  Overview\n\nUp to this point we have been using the Github web site to edit all
  of our files but the downside to this is that any chances you want to make show
  up live in your blog before you have had a chance to test them.  \n\nInstead, it
  is better if you can test out all of your changes and review your blog post before
  letting the world see them.  It will also let you have draft post where you can
  see them locally but on github they will not be visible.\n\nNote that Jekyll is
  not officially supported on Windows but it does work and I have not had any issues
  with it.\n"
published: true
series: ["blogging-with-jekyll"]
title: 'Jekyll Part 09: Installing Jekyll On Windows'
---

Welcome the continuing series on using Jekyll. In this tutorial we are going to setup your Windows computer to be able to edit your blog on your computer.

## Overview

Up to this point we have been using the Github web site to edit all of our files but the downside to this is that any chances you want to make show up live in your blog before you have had a chance to test them.

Instead, it is better if you can test out all of your changes and review your blog post before letting the world see them.  It will also let you have draft post where you can see them locally but on github they will not be visible.

Note that Jekyll is not officially supported on Windows but it does work and I have not had any issues with it.

## Section 1: installing Software

I am a big fan of Chocolatey and luckily a good majority of the software that we need had a chocolatey package so I wrote a gist file that we will install using Boxstarter.

### Section 1.1: Installing Chocolatey

If you are not familiar with Chocolatey, check it out at [http://chocolatey.org](http://chocolatey.org).

1. Open a command prompt
1. Run the following command to install Chocolatey

		@powershell -NoProfile -ExecutionPolicy Bypass -Command "iex ((new-object net.webclient).DownloadString('https://chocolatey.org/install.ps1'))" && SET PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin

1. Close the command prompt and re-open it so that we can get the Chocolatey environment variables

Next we are going to install Boxstarter.

### Section 1.2: Installing Boxstarer

Boxstarter gives you the ability to bulk install Chocolatey packages plus several helper functions for Windows configuration options.

When you bulk install using Boxstarter, it will detect any reboots that are triggered by MSI installers, reboot the machine and then run the Boxstarter script again.

The Windows configuration helper functions that Boxstarter provides to enable or disable Windows features include items such as:

* Remote desktop.
* Microsoft update.
* User access control (UAC).
* Set taskbar options like size, postion, and lock the size.
* Set Windows explorer options like showing hidden files, protected OS files, and file extensions.


Run the following commands to install Boxstarter

	chocolatey feature enable -n=allowGlobalConfirmation
	choco install BoxStarter
	chocolatey feature disable -n=allowGlobalConfirmation

### Section 1.3: Installing the rest of the software

We are going to be installing Ruby, Ruby DevKit, and Python using Chocolatey and Boxstarter.

Now that you have Boxstarter installed, you will notice on your desktop a new icon called Boxstarter Shell.

![Boxstarter Shell Icon](/images/BloggingOnGitHub/BoxStarterShellIcon.png)


1. Run the Boxstarter Shell
1. Run the following command to install the gist file commands. You can view the contents of the gist file [here](https://gist.githubusercontent.com/digitaldrummerj/f290a11d16e98beabd8b/raw/de3d6d551a0f881e0e66cf6c8ec2cc49c35525e0/jekyll)

		Install-BoxStarterPackage -PackageName https://gist.githubusercontent.com/digitaldrummerj/f290a11d16e98beabd8b/raw/de3d6d551a0f881e0e66cf6c8ec2cc49c35525e0/jekyll

1. If there were no errors, you are now ready to install jekyll.

## Section 2: Getting your Blog onto your computer

In this section, you will clone the blog repo from github and install jekyll.

1. Open a command prompt
1. Create the directory c:\projects

		c:
		mkdir \projects

1. cd into c:\projects

		c:
		cd \projects

1. Clone your github blog repo to your local machine with the "git clone [Repo Name]" command.  Below is the example if you were to clone the jekyll repo for this blog series.

		git clone https://github.com/digitaldrummerj/jekyllforblogseries.git

1. cd into the repo that you just cloned

		cd jekyllforblogseries

1. Make sure that you have a GemFile with no file extension in the root of your repo with the following contents

		source 'https://rubygems.org'
		gem 'github-pages'
		gem 'jekyll-redirect-from'
		gem 'wdm', '~> 0.1.0' if Gem.win_platform?

1. Run the command to install the github-pages gem which has all of the required modules to make jekyll work and the jekyll redirect from plugin.  It is one of the few plugins that Github pages supports and allows you to move pages around and have them automatically redirect so that people with bookmarks can still find a moved page.

		bundle install

1. The last thing we need to do is update the github-pages dependencies to be able to use the latest pygments.rb gem as the version included with the github-pages gem is not compatible with Windows

		bundle update github-pages

Now we have jekyll installed.  Time to test it out

## Section 3: Testing Your Blog Works on Your Computer

Now that we have everything installed for jekyll it is time to test it out.

1. From a command prompt in your blog repo directory run the following command to tell jekyll to build and run the web site locally

		jekyll serve

1. If it build successfully you will see something like this


	![Jekyll Serve Success](/images/BloggingOnGitHub/jekyllserve.png)

1. Now if you open up your browser and navigate to http://localhost:4000 you will see you blog.

## Section 3.1: Setting Up Dev _config.yml

However, by default your _config.yml file will be set for production which will cause any place that you have referenced the site.url to not working on your local machine.  You don't want to change your _config.yml file though for development since you will accidentally check it in at some point and break your blog.  Instead we can tell jekyll to use multiple configuration files.  When you load multiple files it will load them in order and then override any settings from a previously loaded config.

1. Create a new file in the root of your repo called _configdev.yml
1. In the _configdev.yml add the following lines to set the url, turn off disqus/google analytics and google search.

		# then add this to the url as well "/repository-name"
		url: http://localhost:4000
		disqus:
		disquscommentcount:
		google_analytics:
		google_search:

1. If your jekyll serve is still running do a ctrl+c to stop it.
1. Now run the following command to tell jekyll the config yml files to load

 		jekyll serve --config _config.yml,_configdev.yml

1. 	If it build successfully you will see something like this


	![Jekyll Serve Success](/images/BloggingOnGitHub/jekyllserve_multipleconfigs.png)

1. Now if you open up your browser and navigate to http://localhost:4000 you will see you blog and any place that reference site.url will be working.

## Conclusion

Now you are ready to do all of your editing locally and  test it out before the world gets to see it.

In our next lesson, I will show you how to install jekyll on OSx and Linux.  Then you will learn how to create draft blog post that will only show on your local machine so that you don't have to either clutter up your post directory with drafts or worry about accidentally publishing an unfinished article.
