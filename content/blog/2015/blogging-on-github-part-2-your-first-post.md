---
categories:
- blogging
- jekyll
date: 2015-02-05T00:00:00Z
published: true
series: ["blogging-with-jekyll"]
title: 'Jekyll Part 02: Your First Post'
---

Welcome the continuing series on using Jekyll.  In this tutorial we will go through making your first blog post.

## Overview

We will go through all of the steps to create a new post, add metadata such as title/categories/tags/date, and then make it live on the site.

## Section 1: Creating the file

Thr first step is to create a new file to hold the content of the blog post.  In Jekyll all of the blog post are markdown files and are stored in the _post directory.    When you commit this file to Github, it will be compiled into a static html page.

The filename is in the format of year-month-day-title-separated-by-dashes.md.

    2015-02-17-my-first-post.md

Go ahead and create your file now.

1. To create a file open a web browser and navigate to your [username.github.io repository.
1. Go into the _post directory and click the + icon to add a new file.
1. Name the file yyyy-mm-dd-my-first-post.md where yyyy = 4digit year,  mm = 2 digit month, and dd = 2 digit day of montmonth.
1. Head to the next section and fill out the metadata about the post (ie: title, date, is published, categories, etc)

## Section 2: Creating metadata

Now we need to define some information about our blog post.  All of the information such as title, is published,  categories, publish date, etc are stored at the top of the file in what is called Front Matter.

To define the front matter section you have a line with 3 dashes in it and then repeat this same line to signal the end of the front matter section.

Below are common metadata you will want to fill out.

- layout:  is the name of the layout  from the _layouts directory.  If followed part 1 and cloned the jekyll-now repository, then the name is post.
- title:  the title of the blog post that will showbon the site.  Should be in quotes to avoid conflict with front matter parameter.
- published: true or false.  Determines  if the post shows  on the website or not.
- date: date of the post.  this is optional and if not defined will use date in filename.
- categories: list of categories.  comma delimited.  put in quotes for multi word categories.  optional but recommended.
- tags: list of tags that would be used to build a tag cloud.  optional but recommended.

### Sample Front Matter

    ---
    layout: post
    title: Your First Post
    published: false
    date: 2015-02-01
    categories: [blogging]
    tags: [blogging]
    ---

Now on to creating actual content in your post.

## Section 3:  Creating content 

The content of the post will be written in markdown and will be directly below the front matter section .

Below are common markdown tags that you will want to use.  headers, lists, bold, bullets, links and code highlighting.

### Common Markdown Tags

#### Headers

A '#' starting  a line indicates to makebitba header and the number '#' indicates  the size of the header tag.

    #  = 	h1
    ## = h2
    and so on up the an h6

Examples:

#  h1

## h2

## h3

### h4

#### h5

#### h6

#### Numbered list  or Bullets

For bullets: start a line with a * or -.

    * sample list
    * next bullet

* sample list 
* next bullet 

For numbered list start with a 1 or the number you want to start with.

    1. sample ordered list
    2. number 2

1. sample ordered list
2. number 2

#### Bold

surround  the text you to build with 2 ** and then put 2 more after the text  to end the bold.

	**sample bold**

**sample bold**

#### Links

link to other pages:

	[link name display](http://myurl.com)
	
[link name display](http://myurl.com)

### Code Highlighting 

There are 2 ways: tab the line in and it will group the text like the examples above.
or use the highlighter markup

{{< highlight text >}}
{% highlight csharp %}
// some c# code	
var a = "bad variable name"
{% endhighlight %}
{{< / highlight >}}


## Highlighting text without the code highlighting 

Start the line with a tab and it will automatically do it for you.  

	you will get text like this if you start the line with a tab.
	
## Further Reading on Markdown

Github documentation on their markdown:  [https://help.github.com/articles/github-flavored-markdown/](https://help.github.com/articles/github-flavored-markdown/).

## Section 4:  Saving as draft

Most of the time you are not going to write and publish the blog post in one sitting but you need to save your work without it showing up in the website.  This is called saving a draft and it is super simple to do.  By setting the front matter published tag to false it will tell jekyll to not publish it. 

	---
	other front matter tags 
	published: false
	---
	
You can also create a drafts folder and save the file in the but if you do that then you will need to move the file to the _post folder when you are ready to publish.

## Section  5: Publishing post 

Publishing a post is as simple as changing the front matter published to true and committing the change to the github repository.  

	---
	other front matter tags 
	published: true
	---

Github will take care of the conversion from markdown to an html page.  This should happen automatically within a minute and show up on the blog home page at the top.  

If it doesn't show up then check your email that you registered on github with to see if there was a jekyll compile error email.


## Conclusion

This lesson is one of the key lessons as you need to kow how to create new blog post.  Creating new blog post is really easy with Jekyll and a little bit of markdown.  Once you learn the different markdown tags, you will be writing blog post in no time at all.

See you in the next lesson, where we will discuss how to add the ability to comment on blog post.  
 