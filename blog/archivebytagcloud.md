---
layout: page
title: Post by Tag Cloud
permalink: /blog/archive/tagcloudview/
active: archivebytagcloud
sitemap: false
---

[By Date]({{"/monthview" | prepend: site.baseurl }}) | [By Category]({{"/categoryview" | prepend: site.baseurl}})


<div>
{% assign tags = site.categories | sort %}
{% for tag in tags %}
<a href="#{{ tag | first | slugify }}" style="font-size: {{ tag | last | size  |  times: 4 | plus: 80  }}%">{{ tag | first | replace:'-', ' ' }}({{ tag | last | size }})</a>
{% endfor %}
</div>

<p>&nbsp;</p>

{% assign sorted_posts = site.posts | sort: 'title' %}

{% for tag in tags %}
<p><a name="{{ tag | first | slugify }}"></a>&nbsp;</p><h3 class="archivetitle">{{ tag | first | replace:'-', ' ' }} <i class="badge">{{ tag | last | size }}</i> </h3>

<ul>{% for post in sorted_posts %}{%if post.categories contains tag[0]%}<li><a href="{{ post.url | prepend: site.baseurl }}">{{ post.title }}</a> {% if post.author %} • {{ post.author }}{% endif %}{% if post.date %} • {{ post.date | date: "%B %e, %Y" }}{% endif %}</li>{%endif%}{% endfor %}</ul>
{% endfor %}