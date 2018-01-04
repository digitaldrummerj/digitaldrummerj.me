---
categories:
- ionic
- strongloop
date: 2015-10-30T00:00:00Z
excerpt: "After following Raymond Camden's [Strongloop Introduction](http://www.raymondcamden.com/tags/strongloop/),
  I was ready to update the [todo demo application](https://github.com/Ionic-AZ/Todo-Lab1-LocalStorage)
  that I have been using for the [Ionic Arizona Meetup](http://meetup.com/ionic-az).
  \ However, I quickly ran into an issue with getting 401 Unauthorized errors when
  I tried to query any of the rest endpoints to get the projects associated to the
  user.  The user model I was using extended the built-in user model so that I could
  add additional functionality of associating a project to a user.   \n\nAfter much
  research, it turns out that the built-in user model has security (ACL) on it to
  restrict everyone from being able to query the user endpoints that do not have an
  explictly defined security setup.  This is great except for the fact that even if
  you add additional ACLs in your extended user model the default security has already
  denied the user before it gets to the security you setup.  \n"
published: true
series: ["Strongloop Todo"]
title: Strongloop - Fixing Security When Extending User Model

---

After following Raymond Camden's [Strongloop Introduction](http://www.raymondcamden.com/tags/strongloop/), I was ready to update the [todo demo application](https://github.com/Ionic-AZ/Todo-Lab1-LocalStorage) that I have been using for the [Ionic Arizona Meetup](http://meetup.com/ionic-az).  So I created a models for projects and app users. The app users model base class was User.  Then within the project model I associated a project to an app users with a belongsTo and in the app users model I associated multiple projects to a single user with a hasMany.  At this point, when I examined the API explorer I could see that it can me a rest endpoint to get the projects associated to a user.  However, I ran into an issue with getting 401 Unauthorized errors when I tried to query any of the rest endpoints to get the projects associated to the user. 

I could not find anything in the Strongloop docs that told me how to get around the 401 errors or what was causing them except that the ACL security was causing the issue and that I should be able to set the ACL security for appuser.   However, after much research, it turns out that the built-in user model has security (ACL) on it to restrict everyone from being able to query the user endpoints that do not have an explictly defined security setup.  This is great except for the fact that even if you add additional ACLs in your extended user model the default security has already denied the user before it gets to the security you setup.  

You can view the default security by navigating to your strongloop project directory and looking in the node_modules\loopback\common\models\user.json file.  You can see looking at the ACL list that the first item in the list is to  DENY $everyone 
    
        {
            "principalType": "ROLE",
            "principalId": "$everyone",
            "permission": "DENY"
        }

The way Strongloop orders the ACLs is that it starts at the bottom of the ACL list and reads it to the top.  Since we are extending the user class, the DENY $everyone will come before our defined ACL.  Strongloop strongly suggest that you do not modify the built-in user class, so then how do we allow users to query our additional endpoints?

When you generate a model there is an accompanying file for each model in the common\models directory, that has a .js extension to write custom code to add additional functionality to the model.  For example if your model is called appuser, you will see two files: appuser.json and appuser.js.

Go ahead and open up the .js extension for your model.  You will the following code where Appuser is your model's name.   

    module.exports = function(Appuser) {
    };
   

The first thing to do is clear out the existing security for the model 

   Appuser.settings.acls.length = 0;
   
Next we need to create a file in the models directory to hold the ACL for the model.  My file naming convention is to add "acl" after the model name like so [Your Model]acl.json, ex: appuseracl.json  

To ensure that you do not lose any of the default security, copy the ACLs json from the node_modules\loopback\common\model\user.json file     

    "acls": [
      {
        "principalType": "ROLE",
        "principal": "$everyone",
        "permission": "DENY"
      },
      {
        "principalType": "ROLE",
        "principalId": "$everyone",
        "permission": "ALLOW",
        "property": "create"
      },
      {
        "principalType": "ROLE",
        "principalId": "$owner",
        "permission": "ALLOW",
        "property": "deleteById"
      },
      {
        "principalType": "ROLE",
        "principalId": "$everyone",
        "permission": "ALLOW",
        "property": "login"
      },
      {
        "principalType": "ROLE",
        "principalId": "$everyone",
        "permission": "ALLOW",
        "property": "logout"
      },
      {
        "principalType": "ROLE",
        "principalId": "$owner",
        "permission": "ALLOW",
        "property": "findById"
      },
      {
        "principalType": "ROLE",
        "principalId": "$owner",
        "permission": "ALLOW",
        "property": "updateAttributes"
      },
      {
        "principalType": "ROLE",
        "principalId": "$everyone",
        "permission": "ALLOW",
        "property": "confirm"
      },
      {
        "principalType": "ROLE",
        "principalId": "$everyone",
        "permission": "ALLOW",
        "property": "resetPassword",
        "accessType": "EXECUTE"
      }
    ]


Now that the ACL configuration is setup, you need to tell Strongloop to load it by add the following line to the [Your Model].js file
 
    Appuser.settings.acls = require('./appuseracl.json');
    
If you test your rest endpoints, at this point you will have the security as your started with.

To add the security for your added endpoints, add them before the DENY everyone configuration that is at the top of the ACL list.

        {
            "principalType": "ROLE",
            "principalId": "$everyone",
            "permission": "DENY"
        }

For example here is the ACL for my app users model to get the list of projects associated to that user. 

        {
            "principalType": "ROLE",
            "principalId": "$owner",
            "permission": "ALLOW",
            "property": "__get__projects"
        }
        
If you test your rest endpoints again, you will be able to successfully call the endpoints that were added when you associated projects to a user in your user model.
