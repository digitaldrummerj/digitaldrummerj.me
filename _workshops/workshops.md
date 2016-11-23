---
title: ''
published: true
type: home
layout: workshoppage2
permalink: '/workshops/index'
---

Here you will find a list of available workshop tutorials that I have created.  

{% assign sorted = (site.workshops | sort: 'title') %} 
{% for lab in  sorted %}
{% if lab.ishome == true and lab.url != "/workshops/index" %}
<article>
<header>
<h2 class="post-title"><img src="{{ "/images/logo.png" | prepend: lab.type }}" alt="{{page.type}} Logo"><a href="{{ lab.url }}.html">{{ lab.title }}<br /></a></h2>
</header>
 <div>
{{ lab.excerpt | markdownify }}
  </div>
<div class="more-link">
  <p><a href="{{ lab.url }}.html">start workshop &raquo;</a></p>
</div>

</article>
{% endif %}
{% endfor %}

