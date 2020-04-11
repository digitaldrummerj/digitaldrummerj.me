---
categories:
- proxy
- node
- npm
- bash
date: 2015-01-16T20:00:00Z
excerpt: "When you are using npm, bower, and git behind a proxy server you have to do a little bit of configuration.  Luckily it is super easy to do these configurations.
  \ Almost all of the programs have command line commands to set and unset the proxy
  server.  \n"
published: true
title: Npm, Bower, Git, and Bash Proxy Configurations

---

When you are using npm, bower, and git behind a proxy server you have to do a little bit of configuration.  Luckily it is super easy to do these configurations.  Almost all of the programs have command line commands to set and unset the proxy server.

## Updates:

* **Updated 2015-Feb-01**: Added running source command for Bash and Ruby Gems section
* **Updated 2015-May-07**: Added the Ionic Start command
* **Updated 2015-May-08**: Added the Android SDK
* **Updated 2015-Aug-03**: Added command lines to set proxy
* **Updated 2015-Oct-20**: Added Gradle

## Windows Command Prompt

### Current Command Prompt Only

	set http_proxy=[Your Proxy]:[Proxy Port]
	set https_proxy=[Your Proxy]:[Proxy Port]

### Unset Current Session

	set http_proxy=
	set https_proxy=

### Globally as a System Environment Variable

Run from an administrative command prompt

	setx http_proxy=[Your Proxy]:[Proxy Port] /M
	setx https_proxy=[Your Proxy]:[Proxy Port] /M

You will need to close and re-open command prompt for settings to take effect

### Globally as a User Environment Variable

Run from a non-administrative command prompt

	setx http_proxy=[Your Proxy]:[Proxy Port]
	setx https_proxy=[Your Proxy]:[Proxy Port]

You will need to close and re-open command prompt for settings to take effect

### Unset Globally System Environment Variable

Run from an administrative command prompt

	setx http_proxy="" /M
	setx https_proxy="" /M

Need to close and re-open command prompt for settings to take effect

### Unset Globally User Environment Variable

Run from a non-administrative command prompt

	setx http_proxy=""
	setx https_proxy=""

Need to close and re-open command prompt for settings to take effect


### View Proxy Settings

If the commands below just echo out the text instead of the actual proxy server, it means that the proxy server is not set.

	echo %http_proxy%
	echo %https_proxy%

----

## Bash Shell

File Name: .bash_profile or .bashrc

	export http_proxy=[Your Proxy]:[Proxy Port]
	export https_proxy=[Your Proxy]:[Proxy Port]
	export npm_config_proxy=[Your Proxy]:[Proxy Port]
	export npm_config_https_proxy=[Your Proxy]:[Proxy Port]

Note:   After updated the .bash_profile or .bashrc, you should run one of the following commands to make the configuration active for the current session.

	source ~/.bashrc
	or
	source ~/.bash_profile

----

## Bower

There is no command line that I found for configuring bower.  Instead you need to create a .bowerrc file in the users home directory.

On Windows:  %userprofile% directory.

On Linux: ~/

### Creating .bowerrc file on Windows

Windows Explorer unfortunately does not  allow you to create files without extensions but using notepad you can create a file without an extension.

1. Open Notepad
1. Ctrl + S to save the file
1. Navigate to the %UserProfile% directory
1. Change the "Save as Type" to "All Files (*.*)
1. Name the file .bowerrc
1. Click the Save button
1. Now you can edit the file in your text editor of choice


### Proxy Setting in .bowerrc.

	{
		"proxy":"http://[Your Proxy]:[Proxy Port]",
		"https-proxy":"http://[Your Proxy]:[Proxy Port]"
	}

----

## Git

You can also set the proxy settings below to be system wide with the --system switch.

### Set Proxy:

	git config --add http.proxy http://[Your Proxy]:[Proxy Port]
	git config --add https.proxy http://[Your Proxy]:[Proxy Port]

### Unset Proxy:

	git config --unset http.proxy
	git config --unset https.proxy

### View Configuration

**Just Proxy Configs**

	git config --get http.proxy
	git config --get https.proxy

**All Configs**

	git config --list

### Manually Update .gitconfig (not recommended)

	[http]
		proxy = http://[Your Proxy]:[Proxy Port]
	[https]
		proxy = http://[Your Proxy]:[Proxy Port]

----

## NPM

### Set Proxy:
	npm config set https-proxy http://[Your Proxy]:[Proxy Port]
	npm config set proxy http://[Your Proxy]:[Proxy Port]

### Unset Proxy:

	npm config delete https-proxy
	npm config delete proxy

### View Proxy Configurations:

	npm config get https-proxy
	npm config get proxy


### Manually Update .npmrc (not recommended)


	proxy=http://[Your Proxy]:[Proxy Port]
	https-proxy=http://[Your Proxy]:[Proxy Port]

----

## Ruby Gem Install


If you have set the proxy in the .bash_profile or .bashrc, then Ruby should pick it up.

If you need to manually set it

### Linux

  export http_proxy=[Your Proxy]:[Proxy Port]
	sudo gem install [your gem name]

### Windows

	setx http_proxy "[Your Proxy Server]:[Proxy Port]" /M
	gem install [your gem name]

----

## Ionic Start Command

In order to run the ionic start command behind a proxy, you need start the command out with the Proxy information.

### Linux

	PROXY=http://[Your Proxy]:[Proxy Port] ionic start [App Name] [Template Name]

### Windows

	setx http_proxy "[Your Proxy Server]:[Proxy Port]" /M
	ionic start [App Name] [Template Name]

----

## Android SDK


The android SDK uses ~/.android/androidtool.cfg file to define the proxy information.  If the file does not exist, go ahead and create it.


	http.proxyHost=[Your Proxy]
	http.proxyPort=[Proxy Port]

----

## Gradle

When trying to build an Android project that uses Gradle, you may need to configure the proxy for it.

On Windows:  %userprofile%/.gradle.properties


    systemProp.http.proxyHost=[Your Proxy]
    systemProp.http.proxyPort=[Proxy Port]
    systemProp.http.nonProxyHosts=*.nonproxyrepos.com|localhost

    systemProp.https.proxyHost=[Your Https Proxy]
    systemProp.https.proxyPort=[Https Proxy Port]
    systemProp.https.nonProxyHosts=*.nonproxyrepos.com|localhost

