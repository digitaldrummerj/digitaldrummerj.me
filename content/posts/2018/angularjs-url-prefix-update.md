---
categories:
- angularjs
date: 2018-01-25T00:00:00Z
published: true
title: AngularJS - Why is there an ! in my url now? 
---

> Note: This post applies to AngularJS.  The 1.x version of Angular.

Recently, I upgraded one of my apps to AngularJS 1.6 along with a bunch of other changes and a bunch of my routes broke.  Unfortunately, I didn't catch the routing issue before making a bunch of other changes.  The one thing I noticed for all of the broken routes is the urls now had an #! (`https://myapp.com/#!/`) in them instead of just the # (`https://myapp.com/#/`).  I thought maybe I had done something in one of my changes.  Low and behold though, it was not something I did but was a breaking change in AngularJS 1.6 per the [AngularJS version migration guide](https://docs.angularjs.org/guide/migration#commit-aa077e8).  Thankfully the fix to revert the functionality to the previous version of AngularJS was really easy.  

In my AngularJS module config I needed to inject the `$locationProvider` and set to the hashPrefix to an empty string like so:

```javascript
appModule.config(['$locationProvider', function($locationProvider) {
  $locationProvider.hashPrefix('');
}]);
```

Now my routes work again they did before.
