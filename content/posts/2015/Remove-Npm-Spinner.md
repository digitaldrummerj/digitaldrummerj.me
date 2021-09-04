---
categories:
- npm
date: 2015-05-07T00:00:00Z
excerpt: One of the most annoying features of npm for me is the spinner.  Many times
  it runs long enough that I am wondering if it is still working or hung.  Thankfully
  you can easily change this with the .npmrc file.
published: true
title: Removing the NPM spinner

---

One of the most annoying features of npm for me is the spinner.  Many times it runs long enough that I am wondering if it is still working or hung.  Thankfully you can easily change this with the .npmrc file.

1. On Linux/OSx, create the file ~/.npmrc
1. On Windows, create the file %USERPROFILE%/.npmrc
1. Add the 2 lines below to the file

		spin=false	
		loglevel=http
	
1. Save the file
1. Close your command prompt/terminal and reopen it.  
1. Run an npm install command and you will see log messages instead of the spinner.

