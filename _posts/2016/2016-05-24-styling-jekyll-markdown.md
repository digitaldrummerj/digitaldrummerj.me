---
layout: post
title: 'Jekyll Tip: Adding Styling To Html Output'
date: 2016-05-24 06:00
categories: ['jekyll','blogging']
published: true
excerpt: |
    As I was writing some tutorials recently I wanted to be able to style the html elements that Jekyll outputs with different css classes without having to write the actually html in the markdown.    
    
    For example I wanted to use a blockquote for items to be aware of that has a blue highlight as well as warnings to watch out for that has a red highlight.  Here is the output of the blockquote with the different styles.  

    >This is a normal blockquote.  Without doing anything extra in markdown this is my default blockquote.

    >This is a warning blockquote.
    {:.warning}

    With the kramdown markdown parser that Jekyll uses you can easily add these css classes without having to write out the html code.  
    
---

{% assign imagedir = "/images/" | prepend: site.baseurl | prepend: site.url %}

As I was writing some tutorials recently I wanted to be able to style the html elements that Jekyll outputs with different css classes without having to write the actually html in the markdown.    

For example I wanted to use a blockquote for items to be aware of that has a blue highlight as well as warnings to watch out for that has a red highlight.  Here is the output of the blockquote with the different styles.  

>This is a normal blockquote.  Without doing anything extra in markdown this is my default blockquote.

>This is a warning blockquote.
{:.warning}

With the kramdown markdown parser that Jekyll uses you can easily add these css classes without having to write out the html code.  

## Basics

In order to specify additional attributes to output in the html on the element, you start it with:  

{% highlight markdown %}
{: }
{% endhighlight %}
    
To specify a class it is 

{% highlight markdown %}
{:.MyClass}
{% endhighlight %}
     
To specify a title attribute it is 

{% highlight markdown %}
{:title="My Title"}
{% endhighlight %}
    
Below are some specific examples.
            
## Paragraph

**markdown**

{% highlight markdown %}
{:.fake-h2}
This will be styled as a p tag with the css class fake-2
{% endhighlight %}

**html output**

{% highlight html %}
<p class="fake-h2">This will be styled as a p tag with the css class fake-2</p>
{% endhighlight %}

## List

**markdown**

{% highlight markdown %}
* {:.done} done - Completed this
* Not done yet
{% endhighlight %}

**html output**

{% highlight html %}
<ul>
    <li class="done">done - Completed this</li>
    <li>Not done yet</li>
</ul>
{% endhighlight %}

## blockquotes

With the blockquote you can also optional elements such as a title and id tag. 

**markdown**

{% highlight markdown %}
> The npm install command will take several minutes to run depending on internet speed
{:.warning}
{:title="my title"}
{: #myid }
{% endhighlight %}

**html output**

{% highlight html %}
<blockquote class="warning" id="myid" title="my title">
    The npm install command will take several minutes to run depending on internet speed
</blockquote>
{% endhighlight %}

## inline

In the previous examples, we were adding classes to the whole element.  However, there are times where you just want to highlight something within an element or sentence.  For these times, you write the styling the same way as above but have to put it inline with the text.    

**markdown**

{% highlight markdown %}
This *is*{:.underline} some `code`{:#id}{:.class}.
A [link](google.com){:rel='something'} and some **tools**{:.tools}.

this *is italic*{::}*marked*{:.special} text
{% endhighlight %}

**html output**

{% highlight html %}
<p>This <em class="underline">is</em> some <code id="id" class="class highlighter-rouge"> code</code>.
A <a href="google.com" rel="something">link</a> and some <strong class="tools">tools</strong>.</p>

<p>this <em>is italic</em><em class="special">marked</em> text</p>
{% endhighlight %}

With these new tricks you can make you markdown output look even better without having to resort to writing a lot of html within your markdown.  
