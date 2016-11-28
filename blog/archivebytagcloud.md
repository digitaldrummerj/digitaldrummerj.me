---
layout: page
title: "Blog Archive by Tag Cloud"
teaser: "Check out all blog posts in my blog archive by tag cloud. Click on a headline to read the excerpt."
#breadcrumb: true
permalink: /blog/archive/tagcloudview/
sitemap: false
sidebar: right
---

[By Date]({{"/blog/archive/monthview" | prepend: site.baseurl }}) | [By Category]({{"/blog/archive/categoryview" | prepend: site.baseurl}}) | [All]({{ "/blog/archive/" | prepend: site.baseurl}})

{% assign tags = site.categories | sort %}
{% assign sorted_posts = site.posts | sort: 'title' %}
{% assign counter = 1 %}
{: #top }

{% assign tags_url = '' %}
{% include _tag_cloud.html baseurl=tags_url tagCloud=true%}

<div id="blog-index" class="row columns">
{% for tag in tags %}

<h3 class="archivetitle"><a name="{{ tag | first | slugify }}"></a>{{ tag | first | replace:'-', ' ' }} <i class="badge">{{ tag | last | size }}</i> </h3>

<dl class="accordion" data-accordion>

{% for post in sorted_posts %}
    {%if post.categories contains tag[0]%}
<dd class="accordion-navigation">
    <a href="#panel{{ counter }}"><span class="iconfont"></span> {% if post.subheadline %}{{ post.subheadline }} › {% endif %}<strong>{{ post.title }}</strong> <small>{% if post.date %} - {{ post.date | date: "%B %e, %Y" }}{% endif %}</small></a>
        <div id="panel{{ counter }}" class="content">
            {% if post.meta_description %}{{ post.meta_description | strip_html | escape }}{% elsif post.teaser %}{{ post.teaser | strip_html | escape }}{% elsif post.excerpt %}{{ post.excerpt | markdownify }}{% endif %}
            <a href="{{ site.baseurl }}/{{ post.url }}" title="Read {{ post.title | escape_once }}"><strong>{{ site.data.language.read_more }}</strong></a><br><br>
        </div>
</dd>
    {% assign counter=counter | plus:1 %}

    {%endif%}

{% endfor %}
</dl>

<small markdown="1">[back to top](#top)</small>

{% endfor %}
</div>