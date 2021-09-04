---
categories:
- angularjs
date: 2016-01-25T00:00:00Z
published: true
title: AngularJS - Communicating Between Parent And Child Scopes
---

> Note: This post applies to AngularJS.  The 1.x version of Angular.

Here is a quick tip in Angular on how to communicate between parent and child scopes.  

If you have a need to send notification of an event from a parent scope to a child scope, you use $scope.$broadcast to send the event.  

	$scope.$broadcast("parent event name", dataTo Send);

If you then need to send notification of an event from the child scope back to the parent scope you use $scope.$emit

	$scope.$emit("child event name", dataTo Send);
	
To listen to the events regardless of if it sent from the parent or child scope, you use $scope.$on.

	$scope.$on("parent event name", function(){
	});
	
	$scope.$on("child event name", function(){
	});