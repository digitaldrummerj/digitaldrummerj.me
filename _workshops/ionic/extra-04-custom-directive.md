---
collection: workshops
title: 'Extra 4: Custom Directive to Change Icon'
published: true
type: ionicextra
layout: workshoppost2
order: 4
length: 20 minutes
date: 2015-05-16
todo: |
    * add link to http://ionicframework.com/docs/components/#colors
    * update objectives and key concepts
    * retake workshop for new app
    * validate image is still valid
---
{% assign imagedir = "../images/custom-directive/" %}

{:.fake-h2}
Objective

* Change an icon based on the OS the application is running.

Key Concepts:

* Using directives to change functionality

{:.fake-h2}
Table of Contents

* TOC
{:toc}

## 1.0: Creating a Directive

There are many items in the Ionic Framework that change based on the OS of the mobile device.  However the icons are not one of those items.  In order to change the icons based on the platform, you need to create an Angular directive.

1. In the www/js directory, create a file called StarterDirectives.js
1. Paste the code below into 

            angular.module('starter.directives', [])
            .directive('phoneicon', [function () {
                return {
                    restrict: 'E',
                    replace: true,
                    scope: false,
                    template: '<i class="icon"></i>',
                    compile: function (element, attrs) {                    
                    }
                };
            }])
        
1. Now that the directive is setup, you will need to modify the compile function to set the correct class on the template.
1. Using the information gathered from [http://ionicframework.com/docs/api/utility/ionic.Platform/](http://ionicframework.com/docs/api/utility/ionic.Platform/), set the icons to the following: 
    * **Default Icon**: ion-ios-telephone
    * **Android Icon**: ion-android-call
    * **iOS Icon**: ion-ios-telephone
    * **Browser Icon**: ion-ios-telephone

1. After you have figured out the correct class name, you can set it in the compile function with the following code:

        angular.element(element[0]).addClass(YOUR_CLASS_NAME);
        
## 1.1: Using the Directive


1. In order to use the directive, you need to add the directive javascript file to the index.html page
1. Then you need to tell the angular module to inject the starter.directives module
1. Finally, replace the phone icon in the contactdetails.html file with &lt;phoneicon&gt;&lt;/phoneicon&gt;
1. View your application in the browser, [http://localhost:8100/ionic-lab](http://localhost:8100/ionic-lab)
    * iOS is on the left and Android is on the right
    
    ![Lab8-IconDirectiveView.png]({{ "Lab9-IconDirectiveView.png" | prepend: imagedir }})
    
1. You can do the same thing for the other icons if there are different icons that you want to use based on the platform.

## Wrap-up

With a simple directive you were able to change the UI to have different icons based on the platform.  This is a very usefulto your end users so that they get the expected look and feel for their devices platform.