---
layout: post
title: SailsJS - Getting Started
date: 2020-02-19 06:00
categories: ['sailsjs']
published: false
excerpt: |

---

{% assign imagedir = "/images/sailsjs-getting-started/" | prepend: site.baseurl | prepend: site.url %}

Quickly develop Restful APIs with Sails JS.   Get all the standard REST verbs: get, put, post, delete without having to write a single line of code.  Connect to over 30 different data storage providers with nothing more than a little bit of configuration.  Add security to your API with a bit of configuration and a simple javascript function.  Easily and quickly extend your API to add in your own business logic.  Your development time will easily be cut in half  

SailsJS is an open source node library that allows you to create REST APIs.  It includes the powerful ORM, Waterline, which is what allow you to connect up to the data storage provider.  

To get started with SailsJS you need to install their command line using npm 

'''
npm install -g sails
'''

Once you have Sails installed you can create a new project using the Sails new command.

'''
sails new my Api
'''
