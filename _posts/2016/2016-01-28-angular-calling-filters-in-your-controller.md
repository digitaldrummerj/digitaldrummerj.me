---
layout: post
title: Calling Filters in Your Angular Controller 
date: 2016-01-28 06:00
categories: ['angular']
published: true
---

Here is a quick tip for how to call a filter from within your Angular controller.  This example assumes that you already know what a filter is and have one created.  

1. Inject $filter into your controller

        angular.module('sample').controller('SampleController', SampleController);

        /* @ngInject */
        function SampleController($filter) { 
        }  
 
2. Call your filter by calling $filter("filter name")(arg1, arg2, arg3).   

    * So in the view you would call your filter called myFilter on myDateVariable with arguments arg1 and arg2, you would use:

        {% raw %}
            <p>{{myDateVariable | myfilter : arg1 : 'arg2' }}</p>
        {% endraw %}
        
    * To call the same filter from within your controller:
    
            function SampleController($filter) { 
                var value = $filter("myFilter")(myDateVariable, arg1, arg2);
            }    
          