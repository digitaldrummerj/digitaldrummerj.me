---
layout: post
series: blogging-with-jekyll
title: 'Jekyll Part 15: Automatically Tweet New Post'
date: 2016-02-08 06:00
categories: ['blogging', 'jekyll']
published: false
excerpt: |
     Welcome to the continuing series on using Jekyll.  In this tutorial you will learn how to automatically send out a tweet when a new blog post is published.

     One way to help gain readership and get free advertising is to tweet out when new blog post is published.  
---

Welcome to the continuing series on using Jekyll.  In this tutorial you will learn how to automatically send out a tweet when a new blog post is published.

One way to help gain readership and get free advertising is to tweet out when new blog post is published.   For my RSS feed I use Feedburner so it takes a bit before a new blog post shows up in the feed.  This means I have to wait to send out the tweet and not forget to send it.  To get around this issue I use [Zapier](http://zapier.com) to monitor the RSS  feed and submit a tweet to the top of my [Buffer](http://buffer.com)  list.  

I could have also used [IFTTT ](http://ifttt.com)  but they do not have the ability to submit to the top of the Buffer list, so instead I would either have to have my post wait in the buffer list along with everything else I am retweeting or would have to immediately send it to Twitter.   This wasn't the desired functionality that I wanted.

If you haven't heard of either of these systems before they both work pretty much the same way.   They monitor something and then take action when it changes.  They both have hundreds of task that you can automate against  a variety of different systems like Trello, Github, Google Sheet, etc.

You will need an account in order to use these systems.  Both of them are free but Zapier limits the number of automated task (5 tasks) and the number of times it can run reach   (100 times).  IFTTT does not appear to have any limits. 

Both systems work extremely well it is just a matter of which system has the ability to interact with the system you trying to automate. 
 
## Setting up Zapier 

1. Sign up for a free account 
2. Click on "Make  a New Zap" button.  Zaps are their name for the automated task)
3. For the trigger drop down click on it and search for RSS.  Select RSS by Zapier result.  
4. Click on the trigger drop down  that is under the source.  
5. Select New Item In Feed 
6. Click on Choose An Action App drop down and search for Buffer.  
7. Select Buffer from the results.  
8. In the Choose An Action drop down under the Action App drop down, select "Add To Buffer" option. 
9. Click on the continue button
10. Click continue again 
11. Select your Buffer Account  and follow the instructions to connect your Buffer Account 
12. Click the continue button 
13. Fill in your feed url 
14. Click the continue button 
15. For the profile drop down select  your Twitter profile  
16. For the text field, it on what you want your new post tweet to say. I put in "New Blog Post:" and then add the field Link. 
18. For top? field select yes to your new blog post tweet at the top of your Buffer queue.
19. Click the continue button 
20. Click the Test Your Zap  Button  
21. You can verify that everything is setup correctly by looking at the "trust sample" and "see action sample"
22. Of everything looks correct, click on the continue button.  If something does not look right in the sample data, go back to the other sections, make the needed adjustments and then get it again. 

Zapier is now setup to put a tweet at the top of your Buffer queue whenever you publish a new blog post into your RSS feed.

{% include series.html %}
