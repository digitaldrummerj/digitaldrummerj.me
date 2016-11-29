---
layout: post
title: 'Jekyll - Part 12 - Scheduling Post'
series: blogging-with-jekyll
date: 2015-09-22 06:00
categories: ['blogging', 'jekyll']
published: false
---

Welcome to part 12 of the series on blogging on  github.  In his lesson we will go through how to use Zapier to schedule blog post.  
 
**Lesson Length**:  20 minutes
 
{% include series.html %}

### Overview 

Since Jekyll just generates a static web site there is no out of the box option to schedule blog post.  Out of the box to get a post to show up you have to manually commit the change to github.    This makes it less likely that you will be regularly publishing new blog post on your planned schedule.  

So if Jekyll doesn't provide this functionality and we want everything to be done directly on Github then how are we going to accomplish this?  This is where is [Zapier](http::/zapier.com) comes into play.

 [Zapier](http::/zapier.com) allows you to say when X happens then do Y.   So for our needs we are going to tell [Zapier](http::/zapier.com) to monitor our github repository for commits with certain messages, create a Google calendar request, then when calendar request comes due create an instant merge Github pull request to publish the blog post.   

Sign up for  [Zapier](http::/zapier.com) is free.   

Now that you have your Zapier account you are ready to get to the real work of setting up that Zaps. 

The first step is to create a branch for your blog repository in Github called scheduled. 

!!!!give screenshot and instructions 
	
Next we need  to commit a message to Github for you blog repository like this one so that we can pick up the schedule date from the commit message.

	Setting up Zapier 
	schedule(2015-08-17 06:00)

Now that we have github all setup we are ready to configure Zapier.  

Remember that we are going to create 2 zaps.  The first zap will create a Google calendar request based on a commit message to the schedule branch and the  second zap will create a pull request that is instantly merged into the master branch.  

##Create calendar request from commit

As a starting point you for creating the Google Calendar request, I have shared my Zap.  Click here to use it.

[http://zpr.io/qdZv](http://zpr.io/qdZv)
 

walk through how to set it up

* accounts
* calendar title
* location sha 
* description
* date from scheduled  named variable
* select repo
* 

##Merging to Master Branch 

We are going to create another Zap to create an instant merge pull request when the Google calendar request comes due.   


walk through updating the template

* instant merge
* from scheduled to master branch
* commit from location
* select repo


Test it out 

 
## navigating zapier 

dashboard 
history

###Additional Resources

[http://blog.east5th.co/2014/12/29/scheduling-posts-with-jekyll-github-pages-and-zapier/](http://blog.east5th.co/2014/12/29/scheduling-posts-with-jekyll-github-pages-and-zapier/)


In the next lesson we will learn how to also use [Zapier](http://Zapier.com) to send a tweet  that you have a new blog post.   

{% include series.html %}

	