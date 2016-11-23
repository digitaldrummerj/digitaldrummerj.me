---
layout: post
title: 'Angular - Calling Service Methods from Console'
date: 2016-01-11 06:00
categories: ['angular']
published: true
excerpt: | 
    Here is a quick tip for how you can run your Angular service and factory methods within the Chrome Dev Tools console.
        
    No longer will you have to go through the process of navigating through the UI to trigger a Service/Factory method to run.  Now you can just load up the web site and do all of your debugging through the Chrome console.   
---

Here is a quick tip for how you can run your Angular service and factory methods within the Chrome Dev Tools console.  No longer will you have to go through the process of navigating through the UI to trigger a Service/Factory method to run.  Now you can just load up the web site and do all of your debugging through the Chrome console.


If your service/factory was called "YourFactory" and the ng-app attribute is on the body tag, you can get a reference to the "YourFactory" with the following line in the console.


    var t = angular.element(document.querySelector('body')).injector().get('YourFactory');


After you have the reference, then you can call any method that is exposed by the "YourFactory" service such calling the method "myServiceMethod" and using the returned promise from the method.


    t.myServiceMethod().then(function(response) { console.log(response); });

Now you can quickly debug your service/factory.

