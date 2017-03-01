---
layout: post
title: SailsJS - Getting Started
date: 2020-02-19 06:00
categories: ['sailsjs']
published: false
excerpt: |

---

{% assign imagedir = "/images/sailsjs-getting-started/" | prepend: site.baseurl | prepend: site.url %}

Develop a node based RESTful API in just few minutes. Get all the standard REST verbs: get, put, post, delete without having to write a single line of code.  Connect to over 30 different data storage providers with nothing more than a little bit of configuration.  Add security to your API with a bit of configuration and a simple javascript function.  Easily and quickly extend your API to add in your own business logic.  Your API development time will easily be cut in half.

This is all accomplished using SailsJS, an open source node library.  Sails is all about convention over configuration.  It has  sensible default configurations.  It includes the powerful Waterline ORM to make it easy to query any data source with a standard set of code.  

For security it uses what are called policies to lock down either a while endpoint or individuals methods of the endpoint.  A policy is nothing more than a function that returns a boolean value to indicate if the user can access the endpoint methods or not.  Security can also use passport so that you can use social logins or a username/password that is then used in the policy to determine access levels.

To get started with SailsJS you need to install their command line using npm 

'''
npm install -g sails
'''

Once you have Sails installed you can create a new project using the Sails new command.

'''
sails new my Api
'''

To generate a new endpoint you will use the Sails generate command:

'''
sails generate api todo 
'''

This will generate both a controller and a model for you.  The controller is the actual endpoint. that the user will directly interface wwith.  The model allows you to describe the individual fields of the model and write functions that can be reused.  By default Sails is setup to use a schemaless file based data store.   Out of the box each API is weird up to automatically create functions for the  standard REST verbs without you having to add any code to the controller or model.  

To start up our API we need to use the sails lift command

'''
sails lift
'''

This will start up an http server on port 1337.   By default Sails will pluralize each endpoint so todo will be todos. To interface with the todo api launch tie web browser and  navigate to http://localhost:1337/todos.

A great to to test our API is Postman.  This is a free tool that allow you to make any REST call.

Right now there is no data in the data store.  To add data we can issue a post command.Since we are using a schemaless data store whatever we put into the json string will automatically be stored.