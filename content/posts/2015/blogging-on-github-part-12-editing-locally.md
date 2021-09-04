---
categories:
- blogging
- jekyll
date: 2015-09-11T00:00:00Z
excerpt: "Welcome the continuing series on using Jekyll. In this tutorial we are going
  to set it up so that we can do draft posts that we can check into our repo but not
  have them show up on the production site.\n\nIn the last couple of articles, we
  installed jekyll locally but we didn't talk about editing existing blog post or
  adding in new ones.  There will be times where you will start a blog post but not
  have time to finish it all in one sitting.  You could just create all of the files
  in the post directory and set the publish flag to false but over time it will become
  harder and harder to tell which articles have actually been published.  \n\nThankfully,
  jekyll supports having draft posts that by default don't show even if the publish
  flag is set to true unless you tell jekyll to run with drafts.  On Github, jekyll
  runs without the drafts flag so you don't have to worry about drafts accidentally
  showing up.  \n"
published: true
series: ["blogging-with-jekyll"]
title: 'Jekyll Part 12: Editing Locally'
---

Welcome the continuing series on using Jekyll. In this tutorial we are going to set it up so that we can do draft posts that we can check into our repo but not have them show up on the production site.

## Overview

In the last couple of articles, we installed jekyll locally but we didn't talk about editing existing blog post or adding in new ones.  There will be times where you will start a blog post but not have time to finish it all in one sitting.  You could just create all of the files in the post directory and set the publish flag to false but over time it will become harder and harder to tell which articles have actually been published.  

Thankfully, jekyll supports having draft posts that by default don't show even if the publish flag is set to true unless you tell jekyll to run with drafts.  On Github, jekyll runs without the drafts flag so you don't have to worry about drafts accidentally showing up.

## Section 1: Creating a draft

1. In your blog repo, create a folder called _drafts
1. Create a new blog post in there called DraftsTest.md
1. Add the following to the DraftsTest.md file

		---
		published: true
		layout: post
		title: 'Drafts Test'
		categories: ['How-To']
		date: 2015-09-11 06:00	
		---
		
1. If you run the jekyll serve command, you will not see this post showing up.

		jekyll serve --config _config.yml,_configdev.yml
		
## Section 2: Running with Drafts

To run jekyll with drafts, you just need to pass in the --drafts argument to the serve command

    jekyll serve --config _config.yml,_configdev.yml --drafts

Now if you view your site in your web browser, you will see your draft post.

With the drafts argument, it does respect the publish front matter, so if you don't want a draft to show up even with the --drafts argument, just set the published to false for that article. 

## Conclusion

Now you can do all of your editing locally and check the drafts into your git repo without having to fear they will accidentally get published before they are ready.

In our next lesson, I will show you how to create the series listing like you see below and how to be able to easily create a blog article series
 