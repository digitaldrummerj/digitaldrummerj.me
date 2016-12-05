---
layout: page
title: "Blog Archive"
teaser: "Check out all blog posts in my blog archive."
#breadcrumb: true
permalink: "/blog/archive/"
sidebar: right
---
[By Date]({{"/blog/archive/monthview" | prepend: site.baseurl}}) | [By Category]({{"/blog/archive/categoryview" | prepend: site.baseurl}}) | [By Tag Cloud]({{"/blog/archive/tagcloudview" | prepend: site.baseurl}})


<ul class="side-nav">
	{% for post in site.posts %}
	<li>
	<a title="Read {{ post.title | escape_once }}"  href="{{ site.baseurl }}{{ post.url }}"><strong>{{ post.title }}</strong>{% if post.date %}<small> - {{ post.date | date: "%B %e, %Y" }}</small>{% endif %}</a>
	</li>
	{% endfor %}
</ul>
