---
published: true
layout: post
title: 'Chrome DevTools - Hiding Vendor Scripts'
categories: ['chrome', 'debugging', 'ionic']
date: 2015-05-15
excerpt: | 
    The Chrome Developer tools are an amazing set of tools for debugging and trobuleshooting web sites.  If you are a web developer and have not tried out these tools, you have been missing out.  As amazing as the developer tools are, one of the most annoying features to me was not being able to skip over vendor javascript like jquery or angular.  Getting stuck in a minified version of a angular or jquery takes you down a deep rabbit hole that you never wanted to go down and is a annoying to climb out of.  
    
    Luckily, there is a super simple solution that I learned from [Jared Farris](http://twitter.com/jaredthenerd) during his Chrome Developer Tools talk at the [Codepalousa Conference](http://www.codepalousa.com) called Black Boxing.  Black boxing allows you to tell the javascript debugger to skip over the file when stepping through the code.  

---
{% assign imagedir = "/images/ChromeDevTools/" | prepend: site.baseurl | prepend: site.url %}

The Chrome Developer tools are an amazing set of tools for debugging and trobuleshooting web sites.  If you are a web developer and have not tried out these tools, you have been missing out.  As amazing as the developer tools are, one of the most annoying features to me was not being able to skip over vendor javascript like jquery or angular.  Getting stuck in a minified version of a angular or jquery takes you down a deep rabbit hole that you never wanted to go down and is a annoying to climb out of.  

Luckily, there is a super simple solution that I learned from [Jared Farris](http://twitter.com/jaredthenerd) during his Chrome Developer Tools talk at the [Codepalousa Conference](http://www.codepalousa.com) called Black Boxing.  Black boxing allows you to tell the javascript debugger to skip over the file when stepping through the code.  

So how do you turn on black boxing for a file?  

1. Open Chrome
1. Navigate to the web site that you want to troubleshoot
1. Open the Chrome Developer Tools

	![Open Chrome Dev Tools Screenshot]({{"ChromeDevTools-Open.png" | prepend: imagedir}})
	
1. Navigate to the Source tab
1. Right-click on your javascript file you want to black box 
1. Select Blackbox script from the menu

	![Black Box Script Screenshot]({{"ChromeDevTools-BlackBoxing.png" | prepend: imagedir}}) 

Now you are ready to set a breakpoint in your code, refresh your page and debug your javascript code.  

Check out the Javascript Debugging documentation for all of the features of the debugger, [https://developer.chrome.com/devtools/docs/javascript-debugging](https://developer.chrome.com/devtools/docs/javascript-debugging).
