---
layout: post
title: 'Visual Studio 2015 - External Web Tools'
date: 2015-08-20 06:00
categories: ['visual studio', 'ionic', 'npm', 'nodejs', 'bower', 'git']
published: true
excerpt: | 
    I ran into an issue with an npm package mis-behaving in Visual Studio 2015 but working just fine from the command line.  
    
    After scratching my head for awhile trying to figure out what was going on, I discovered that Visual Studio was pointing to its own version of npm and node and not that ones that were available in my path that the command line was using. Visual
    
    All of these tools are installed as part of Visual Studio but they are installed into the Visual Studio install directory and are not used by the command line.  
    
    If you have manually installed any of these tools like I had, then most likely you have a difference in versions between what the command line is using versus Visual Studio.
    
    Luckily you can easily tell Visual Studio which versions to use.
---

{% assign imagedir = "/images/VisualStudio/" | prepend: site.baseurl | prepend: site.url %}

I ran into an issue with an npm package mis-behaving in Visual Studio 2015 but working just fine from the command line.  

After scratching my head for awhile trying to figure out what was going on, I discovered that Visual Studio was pointing to its own version of npm and node and not that ones that were available in my path that the command line was using. Visual Studio 2015 ships with: 

* Node
* npm
* git

All of these tools are installed as part of Visual Studio but they are installed into the Visual Studio install directory and are not used by the command line.    

If you have manually installed any of these tools like I had, then most likely you have a difference in versions between what the command line is using versus Visual Studio.

Luckily you can easily tell Visual Studio which versions to use.

The settings in Visual Studio are under Tools -> Options -> Projects and Solutions -> External Web Tools

By default the system path is set to be looked at after the Visual Studio versions ($(DevEnvDir)\Extensions\Microsoft\Web Tools\External).

![Visual Studio External Web Tools Options]({{"VisualStudio2015-ExternalWebTools.png" | prepend: imagedir}})

To use the system PATH environment variable instead, click on the $(PATH) and use the arrows at the top-right to move it up.

![Visual Studio External Web Tools Path Moved Higher]({{"VisualStudio2015-ExternalWebTools_PathHigher.png" | prepend: imagedir}})

This will ensure that the version of the tools used matches what the command line is using. 