---
categories:
- jekyll
- blogging
date: 2016-05-24T00:00:00Z
excerpt: "As I was writing some tutorials recently I wanted to be able to style the
  html elements that Jekyll outputs with different css classes without having to write
  the actually html in the markdown.    \n\nFor example I wanted to use a blockquote
  for items to be aware of that has a blue highlight as well as warnings to watch
  out for that has a red highlight.  Here is the output of the blockquote with the
  different styles.  \n\n>This is a normal blockquote.  Without doing anything extra
  in markdown this is my default blockquote.\n\n>This is a warning blockquote.\n{:.warning}\n\nWith
  the kramdown markdown parser that Jekyll uses you can easily add these css classes
  without having to write out the html code.  \n"
published: true
title: 'Jekyll Tip: Adding Styling To Html Output'

---

As I was writing some tutorials recently I wanted to be able to style the html elements that Jekyll outputs with different css classes without having to write the actually html in the markdown.    

For example I wanted to use a blockquote for items to be aware of that has a blue highlight as well as warnings to watch out for that has a red highlight.  Here is the output of the blockquote with the different styles.  

>This is a normal blockquote.  Without doing anything extra in markdown this is my default blockquote.

>This is a warning blockquote.
{:.warning}

With the kramdown markdown parser that Jekyll uses you can easily add these css classes without having to write out the html code.  

## Basics

In order to specify additional attributes to output in the html on the element, you start it with:  

{{< highlight html >}}
{: }
{{< / highlight >}}
    
To specify a class it is 

{{< highlight html >}}
{:.MyClass}
{{< / highlight >}}
     
To specify a title attribute it is 

{{< highlight html >}}
{:title="My Title"}
{{< / highlight >}}
    
Below are some specific examples.
            
## Paragraph

**markdown**

{{< highlight html >}}
{:.fake-h2}
This will be styled as a p tag with the css class fake-2
{{< / highlight >}}

**html output** 

{{< highlight html >}}
<p class="fake-h2">This will be styled as a p tag with the css class fake-2</p>
{{< / highlight >}}

## List

**markdown**

{{< highlight html >}}
* {:.done} done - Completed this
* Not done yet
{{< / highlight >}}

**html output**

{{< highlight html >}}
<ul>
    <li class="done">done - Completed this</li>
    <li>Not done yet</li>
</ul>
{{< / highlight >}}

## blockquotes

With the blockquote you can also optional elements such as a title and id tag. 

**markdown**

{{< highlight html >}}
> The npm install command will take several minutes to run depending on internet speed
{:.warning}
{:title="my title"}
{: #myid }
{{< / highlight >}}

**html output**

{{< highlight html >}}
<blockquote class="warning" id="myid" title="my title">
    The npm install command will take several minutes to run depending on internet speed
</blockquote>
{{< / highlight >}}

## inline

In the previous examples, we were adding classes to the whole element.  However, there are times where you just want to highlight something within an element or sentence.  For these times, you write the styling the same way as above but have to put it inline with the text.    

**markdown**

{{< highlight html >}}
This *is*{:.underline} some `code`{:#id}{:.class}.
A [link](google.com){:rel='something'} and some **tools**{:.tools}.

this *is italic*{::}*marked*{:.special} text
{{< / highlight >}}

**html output**

{{< highlight html >}}
<p>This <em class="underline">is</em> some <code id="id" class="class highlighter-rouge"> code</code>.
A <a href="google.com" rel="something">link</a> and some <strong class="tools">tools</strong>.</p>

<p>this <em>is italic</em><em class="special">marked</em> text</p>
{{< / highlight >}}

With these new tricks you can make you markdown output look even better without having to resort to writing a lot of html within your markdown.  
