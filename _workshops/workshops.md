---
published: true
type: home
layout: workshoppage2
permalink: '/workshops/index'
title: "Workshops"
date: 05-10-2016
---

Here you will find a list of available workshop tutorials that I have created. If you would like me to give a workshop at your event, please [drop me a line]({{ "/contact/" | prepend: site.baseurl }}).  I can give on the existing workshops below or create a new one on pretty much any topic you see me blog about but feel free to also request just about anything.  
{: .teaser }

{% assign sorted = (site.workshops | sort: 'title') %} 
{% for lab in  sorted %}
{% if lab.ishome == true and lab.ready == true and lab.url != "/workshops/index" %}
<article>
<header>
<!-- <img src="{{ "/images/logo.png" | prepend: lab.type }}" alt="{{page.type}} Logo"> -->
<h2 class="post-title"><a href="{{ site.baseurl }}{{ lab.url }}.html">{{ lab.title }}<br /></a></h2>
</header>
 <div>
{{ lab.excerpt | markdownify }}
  </div>
<div class="more-link">
  <p><a href="{{ site.baseurl }}{{ lab.url }}.html">start {{ lab.title}} &raquo;</a></p>
</div>

</article>
{% endif %}
{% endfor %}

