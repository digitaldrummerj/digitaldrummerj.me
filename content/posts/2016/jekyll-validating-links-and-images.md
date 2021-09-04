---
categories:
- blogging
- jekyll
date: 2016-02-01T00:00:00Z
published: true
series: ["blogging-with-jekyll"]
title: 'Jekyll Part 14: How To Validate Links and Images'

---

Welcome the continuing series on using Jekyll. In this tutorial we are going to go through how you can validate your link and image references. 

As your blog grows and you get more posts, it becomes harder to validate images and links are still valid on older post.  On new post it is pretty easy since you only have one last to look for.  However, this  is a process that can be fully automated so  got don't even have to worry about it anymore. 

Since Jekyll is Ruby based we  are going to use a ruby gem called [html-proofer](https://github.com/gjtorikian/html-proofer/).   Html-proofer is a command line utility that will  run a set of tests to validate your HTML output. These tests check if your image references are legitimate, if they have alt tags, if your internal links are working, and so on. It's intended to be an all-in-one checker for your output.

## Installation 

You can either install the gem as part of your Gemfile or as another ruby gem.  

Add this line to your Gemfile 

	gem 'html-proofer'

and then execute 

	bundle 
	
or install it yourself, just like any other ruby gems

     gem install html-proofer 

## Generating Report 

To generate a report open up the command line and run the command the corresponds to how you install html-proofer.

### Gemfile   

	bundle exec htmlproofer ./_site/ --only-4xx
	
### Ruby Gem 

	htmlproofer ./_site/ --only-4xx

The  --only4xx parameter above tell it to only  reports errors for links that fall within the 4xx status code range.  This would capture not found (404) and not authorized (401) errors but would ignore 500 internal server errors.  The reason to ignore 500 errors is that we don't want validation to fail if their web server is throwing an error  since we are only testing that the link went some place valid.  

You will now get a report of any broken links or image tags.  Since html-proofer is evaluating the Jekyll output,  you may need to look at some of the include or  layout file to fix links.  

Once you get the initial set of issues fixed, you will mainly have to worry about the new updates to your blog.  
 
Overall, this will help improve the quality of your blog by  ensuring that you fix broken links and images before your users spot them.

