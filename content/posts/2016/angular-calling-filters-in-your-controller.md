---
categories:
- angularjs
date: 2016-01-28T00:00:00Z
published: true
title: AngularJS - Calling Filters in Your Angular Controller
---

> Note: This post applies to AngularJS.  The 1.x version of Angular.

Here is a quick tip for how to call a filter from within your Angular controller.  This example assumes that you already know what a filter is and have one created.

1. Inject $filter into your controller

    ```javascript
    angular.module('sample').controller('SampleController', SampleController);

    /* @ngInject */
    function SampleController($filter) { 
    }
    ```

1. Call your filter by calling: 

    * **View** call your filter called "myFilter" on myDateVariable with arguments arg1 and arg2, you would use:

    ```html
    <p>{{myDateVariable | myfilter : arg1 : 'arg2' }}</p>
    ```

    * **Controller** call the same filter from within your controller:

    ```javascript
    function SampleController($filter) {
        var value = $filter("myFilter")(myDateVariable, arg1, arg2);
    }
    ```
