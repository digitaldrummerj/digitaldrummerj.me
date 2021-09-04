---
categories:
- blogging
- jekyll
date: 2015-09-09T02:00:00Z
excerpt: "Welcome the continuing series on using Jekyll. In this tutorial we are going
  to setup your Ubuntu Linux computer to be able to edit your blog on your computer.\n
  \   \n## Overview\n\nUp to this point we have been using the Github web site to
  edit all of our files but the downside to this is that any chances you want to make
  show up live in your blog before you have had a chance to test them.  \n\nInstead,
  it is better if you can test out all of your changes and review your blog post before
  letting the world see them.  It will also let you have draft post where you can
  see them locally but on github they will not be visible.\n"
published: true
series: ["blogging-with-jekyll"]
title: 'Jekyll Part 10: Installing Jekyll On Linux'
---

Welcome the continuing series on using Jekyll. In this tutorial we are going to setup your Ubuntu Linux computer to be able to edit your blog on your computer.

## Overview

Up to this point we have been using the Github web site to edit all of our files but the downside to this is that any chances you want to make show up live in your blog before you have had a chance to test them.

Instead, it is better if you can test out all of your changes and review your blog post before letting the world see them.  It will also let you have draft post where you can see them locally but on github they will not be visible.

## Section 1: installing Software

We need to install nodejs, ruby 2.x, python pip, and git.

### Section 1.1: Installing NodeJs

First we are going to install NodeJS using the command below

	# Note the new setup script name for Node.js v0.12
	curl -sL https://deb.nodesource.com/setup_0.12 | sudo bash -

	# Then install with:
	sudo apt-get install -y nodejs

	node -v

### Section 1.2: Installing Ruby

Ubuntu Trusty 14.04 unfortunately comes with Ruby 1.9.x and we need 2.x.  There is also a bug in the ubuntu packages where the Ruby 2.0 install is actually the 1.9.3 branch.

1. We are going to use [ruby-install](https://github.com/postmodern/ruby-install) to get the latest version of Ruby installed

		wget -O ruby-install-0.5.0.tar.gz https://github.com/postmodern/ruby-install/archive/v0.5.0.tar.gz
		tar -xzvf ruby-install-0.5.0.tar.gz
		cd ruby-install-0.5.0/
		sudo make install
		sudo ruby-install --system ruby

1. We need to install chruby to change the ruby version to the one that we just installed

		wget -O chruby-0.3.9.tar.gz https://github.com/postmodern/chruby/archive/v0.3.9.tar.gz
		tar -xzvf chruby-0.3.9.tar.gz
		cd chruby-0.3.9/
		sudo make install

1. To make chruby auto run we need to add the following lines to our ~/.bashrc or ~/.bash_profile script

		source /usr/local/share/chruby/chruby.sh
		source /usr/local/share/chruby/auto.sh

1. In order to it to take effect run replace .bashrc with .bash_profile if you are using that instead

		source ~/.bashrc

1. Verify your ruby version changed with

		ruby -v

1. Make sure that the Ruby Gems are updated and then install the bundler GEM

		sudo gem update --system
		sudo gem install bundler

### Section 1.3: Python

In order to use the Pygments code syntax highlighter, we need to install python pip

	sudo apt-get install python-pip -y

### Section 1.4: Installing Git

	sudo apt-get install git -y

## Section 2: Getting your Blog onto your computer

In this section, you will clone the blog repo from github and install jekyll.

1. Open a terminal
1. Create the directory ~/projects

		mkdir ~/projects

1. cd into c:\projects

		cd ~/projects

1. Clone your github blog repo to your local machine with the "git clone [Repo Name]" command.  Below is the example if you were to clone the jekyll repo for this blog series.

		git clone https://github.com/digitaldrummerj/jekyllforblogseries.git

1. cd into the repo that you just cloned

		cd jekyllforblogseries

1. Make sure that you have a GemFile with no file extension in the root of your repo with the following contents

		source 'https://rubygems.org'
		gem 'github-pages'
		gem 'jekyll-redirect-from'

1. Run the command to install the github-pages gem which has all of the required modules to make jekyll work and the jekyll redirect from plugin.  It is one of the few plugins that Github pages supports and allows you to move pages around and have them automatically redirect so that people with bookmarks can still find a moved page.

		bundle install

Now we have jekyll installed.  Time to test it out

## Section 3: Testing Your Blog Works on Your Computer

Now that we have everything installed for jekyll it is time to test it out.

1. From a command prompt in your blog repo directory run the following command to tell jekyll to build and run the web site locally

		jekyll serve

1. If it build successfully you will see something like this

	![Jekyll Serve Success](/images/BloggingOnGitHub/jekyllserve.png)

1. Now if you open up your browser and navigate to http://localhost:4000 you will see you blog.

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

In our next lesson, I will show you how to install jekyll on OSx.  Then you will learn how to create draft blog post that will only show on your local machine so that you don't have to either clutter up your post directory with drafts or worry about accidentally publishing an unfinished article.
