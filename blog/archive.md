---
layout: page
title: "Blog Archive"
teaser: "Check out all blog posts in my blog archive. Click on a headline to read the excerpt."
#breadcrumb: true
permalink: "/blog/archive/"
sidebar: right
---
[By Date]({{"/blog/archive/monthview" | prepend: site.baseurl}}) | [By Category]({{"/blog/archive/categoryview" | prepend: site.baseurl}}) | [By Tag Cloud]({{"/blog/archive/tagcloudview" | prepend: site.baseurl}})


<ul>
	{% assign counter = 1 %}
	{% for post in site.posts %}
	<li>
	<a title="Read {{ post.title | escape_once }}"  href="{{ site.baseurl }}{{ post.url }}"> {% if post.subheadline %}{{ post.subheadline }} › {% endif %}<strong>{{ post.title }}</strong></a>
	</li>
	{% assign counter=counter | plus:1 %}
	{% endfor %}
</ul>
