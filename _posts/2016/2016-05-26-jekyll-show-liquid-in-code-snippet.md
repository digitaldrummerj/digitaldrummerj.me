---
layout: post
title: 'Jekyll Tip: Showing Liquid Code in Code Snippets'
date: 2016-05-26 06:00
categories: ['jekyll','blogging']
published: true
excerpt: |
    There are times when you need to be able to output code snippets that contain what jekyll thinks is liquid code or the jekyll templating language.  This especially happens when you are doing Angular tutorial since &#123;&#123; &#125;&#125; is how you output properties to the UI.
    
    Instead, to include liquid markup in the code snippet you need to surround the code snippet with the raw and endraw tags like so
---


{% assign imagedir = "/images/" | prepend: site.baseurl | prepend: site.url %}

When blogging with Jekyll there are times when you want to be able to output a code snippet that contains what Jekyll thinks is liquid code.  This especially happens when you are doing Angular tutorials since using the double brackets (&#123;&#123;  &#125;&#125;) for data binding.  Since the code snippets are enclosed in a pre tag, you are not able to html encode the brackets.

Instead, to include liquid markup in the code snippet you need to surround the code snippet with the raw and endraw tags like so

<figure class="highlight"><pre><code class="language-liquid" data-lang="liquid"><span class="p">&#123;%</span><span class="w"> </span><span class="nt">raw</span><span class="w"> </span><span class="w"> </span><span class="p">%&#125;</span>

    &#123;&#123; Notice the double brackets will be in the output &#125;&#125;

<span class="p">&#123;%</span><span class="w"> </span><span class="nt">endraw</span><span class="w"> </span><span class="p">%&#125;</span></code></pre></figure>

This will output:

{% highlight liquid %}
{% raw %}
{{ Notice the double brackets are output }}
{% endraw %}
{% endhighlight %}

