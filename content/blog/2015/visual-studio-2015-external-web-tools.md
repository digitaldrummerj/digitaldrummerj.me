---
categories:
- dotnet
- npm
- node
- git
date: 2015-08-20T00:00:00Z
excerpt: "I ran into an issue with an npm package mis-behaving in Visual Studio 2015
  but working just fine from the command line.  \n\nAfter scratching my head for awhile
  trying to figure out what was going on, I discovered that Visual Studio was pointing
  to its own version of npm and node and not that ones that were available in my path
  that the command line was using. Visual\n\nAll of these tools are installed as part
  of Visual Studio but they are installed into the Visual Studio install directory
  and are not used by the command line.  \n\nIf you have manually installed any of
  these tools like I had, then most likely you have a difference in versions between
  what the command line is using versus Visual Studio.\n\nLuckily you can easily tell
  Visual Studio which versions to use.\n"
published: true
title: Visual Studio 2015 - External Web Tools

---

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

![Visual Studio External Web Tools Options](/images/VisualStudio/VisualStudio2015-ExternalWebTools.png)

To use the system PATH environment variable instead, click on the $(PATH) and use the arrows at the top-right to move it up.

![Visual Studio External Web Tools Path Moved Higher](/images/VisualStudio/VisualStudio2015-ExternalWebTools_PathHigher.png)

This will ensure that the version of the tools used matches what the command line is using.
