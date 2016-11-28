---
layout: page
title: "Blog Archive"
teaser: "Check out all blog posts in my blog archive. Click on a headline to read the excerpt."
#breadcrumb: true
permalink: "/blog/archive/"
sidebar: right
---
[By Date]({{"/blog/archive/monthview" | prepend: site.baseurl}}) | [By Category]({{"/blog/archive/categoryview" | prepend: site.baseurl}}) | [By Tag Cloud]({{"/blog/archive/tagcloudview" | prepend: site.baseurl}})


<dl class="accordion" data-accordion>
	{% assign counter = 1 %}
	{% for post in site.posts %}
	<dd class="accordion-navigation">
	<a href="#panel{{ counter }}"><span class="iconfont"></span> {% if post.subheadline %}{{ post.subheadline }} › {% endif %}<strong>{{ post.title }}</strong></a>
		<div id="panel{{ counter }}" class="content">
			{% if post.meta_description %}{{ post.meta_description | strip_html | escape }}{% elsif post.teaser %}{{ post.teaser | strip_html | escape }}{% elsif post.excerpt %}{{ post.excerpt | markdownify }}{% endif %}
			<a href="{{ site.url }}{{ site.baseurl }}{{ post.url }}" title="Read {{ post.title | escape_once }}"><strong>{{ site.data.language.read_more }}</strong></a><br><br>
		</div>
	</dd>
	{% assign counter=counter | plus:1 %}
	{% endfor %}
</dl>
