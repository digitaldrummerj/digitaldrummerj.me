---
layout: post
title: Create Your Own Angular Promises
date: 2016-02-19 06:00
categories: ['angular']
published: false
series: 
---  
{% assign imagedir = "/images/angularpromises/" | prepend: site.baseurl | prepend: site.url %}

what 
Why 
When  

When you create your service/factory and make a $http call it is returning a promise back for you to use.  
 
    //service method: UserFactory
    function getUser() {
            $http.get('url');
        }


    //controller method
    UserFactory().then(
        function(response) {
                $scope.data = response.data;
        }
 
 Say that in your controller method that you did not want to have to known that all of the sea was under the.data property in the Json document and instead wanted the UserFactory method to do that work and then return the data.  
 
 Your first thought most likely is to to just modify the function to add a then onto the return statement like so:
 
    //service method: UserFactory
    function getUser() {
        $http.get('url').then(function(response){
            //do something with response.
        };
    }
 	
However this wouldn't work since you would not longer be returning a promise from the service and instead would be returning the data.  

Instead you need to use the $q to create your own promise that can then be returned from the function.    
  
Creating your own promise is very easy to do with the $q service.    

    function getUser() {
        var defer = $q.defer()
        $http.get('url').then(function(response){
            //do something with response.
            return defer.resolve(response.data);
        };
        
        return defer.promise:
    } 