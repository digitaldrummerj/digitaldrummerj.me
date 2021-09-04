---
categories:
- node
date: 2016-07-20T00:00:00Z
excerpt: "I am sure that many of you are in the same situation that I am in with needing
  a different version of node for different projects and you don't want to have to
  create a new virtual machine for each project just because of node.  Luckily with
  [nvm](https://github.com/coreybutler/nvm-windows/) you can install multiple versions
  of Node on the same machine and switch between them with a simple command line call.
  \ \n\nThe one downside to having multiple versions of Node installed is that you
  have to install the global packages for each version of node that you want them
  available to.  There is no ability to share packages between versions.  This means
  that it will take a bit more disk space but most node packages are fairly small
  so this should be a none issue.    \n"
published: true
title: Running Multiple Version of Node On Windows

---

I am sure that many of you are in the same situation that I am in with needing a different version of node for different projects and you don't want to have to create a new virtual machine for each project just because of node.  Luckily with [nvm](https://github.com/coreybutler/nvm-windows/) you can install multiple versions of Node on the same machine and switch between them with a simple command line call.

The one downside to having multiple versions of Node installed is that you have to install the global packages for each version of node that you want them available to.  There is no ability to share packages between versions.  This means that it will take a bit more disk space but most node packages are fairly small so this should be a none issue.

## Installing NVM

The first thing that we need to do is install NVM.

1. Uninstall existing version of node since we won't be using it anymore
1. Delete any existing nodejs installation directories.  e.g. "C:\Program Files\nodejs") that might remain. NVM's generated symlink will not overwrite an existing (even empty) installation directory.
1. Delete the npm install directory at C:\Users\[Your User]\AppData\Roaming\npm

We are now ready to install nvm.  Download the installer from [https://github.com/coreybutler/nvm/releases](https://github.com/coreybutler/nvm/releases)

**To upgrade**, run the new installer. It will safely overwrite the files it needs to update without touching your node.js installations. Make sure you use the same installation and symlink folder. If you originally installed to the default locations, you just need to click "next" on each window until it finishes.

## Installing and Picking a node version

1. Get a the list so you can see what is available

        $ nvm list available

1. Pick the one you want to install.  Below we are installing 4.4.5 and 5.10.1.  You can pick any version that you want.

        $ nvm install 4.4.5
        $ nvm install 5.10.1

1. Select the node version to use.  Note that only 1 node version can be activate at a time.

        $ nvm use 4.4.5
        $ nvm use 5.10.1


**Reminder!** Any global npm modules you may have installed are not shared between the various versions of node.js you have installed. Additionally, some npm modules may not be supported in the version of node you're using, so be aware of your environment as you work.

## Installing Packages

Installing Node packages is the same as you are used to.  Nvm just switches out which version is referenced in your path variables.

```
npm install [package name] [--save or --save-dev]
npm install -g [package name]
```

## Other Commands

**View Default Node Architecture Being Used**

    $ nvm arch

**Change Default Node Architecture**

    $ nvm arch 32
    $ nvm arch 64

**Install Node Version**

    $ nvm install 4.4.5
    $ nvm install 4.4.5 64
    $ nvm install 4.4.5 32

**Get Installed Versions**

    $ nvm list

**Get Available Versions to Install**

    $ nvm list available

**Turn On nvm**

    $ nvm on

**Turn Off nvm**

    $ nvm off

**Set Proxy**

    $ nvm proxy [url]

**Remove Proxy**

    $ nvm proxy none

**View Proxy Setting**

    $ nvm proxy

**Uninstall Node Version**

    $ nvm uninstall [version number]
    $ nvm uninstall 4.4.5

**Select Node Version to Use**

>Note: The [arch] parameter below is optional

    $ nvm use [version] [arch]
    $ nvm use 4.4.5 64



**Get the Nvm Version**

    $ nvm version


Now you can easily switch between Node versions and don't have to worry about compatibility with your code not working on your installed Node version.
