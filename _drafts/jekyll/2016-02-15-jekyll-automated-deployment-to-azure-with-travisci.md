---
layout: post
title: 'Jekyll Part 16: Automated Deployment to Azure'
series: blogging-with-jekyll 
date: 2016-02-15 06:00
categories: ['blogging', 'jekyll']
published: false 
excerpt: |

---

Welcome to the continuing series on using Jekyll.  In this tutorial we are going to setup Travis CI to automatically build your Jekyll site and then deploy it to an Azure Web App.  

{% include series.html %}

Even though I host my blog on Github Pages there have been several times where I wanted to see what theme changes or a new post would look like without having to publish the change to my domain.

As well I have written many of my blog post on my phone but have had to wait until I was at a computer to make sure the post liked good before publishing it.  

With Travis CI, it will monitor Github for commits and then kick off a build and deploy of the site.  For my jekyll repository I do all of my changes on a Github branch called Scheduled so as to not accidentally deploy a work in progress to the master branch.

Setting up Travis CI is really simple. 

* setup travis ci
* setup azure Web app
* build scripts 
* deploy scripts 
* add html proffer
* reading log  files 
* setting ruby version 
* setting robots file  
* add sudo
*  .travis.yml file
 

 {% include series.html %}
