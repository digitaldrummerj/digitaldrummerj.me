---
layout: page
title: "Blog Archive by Date"
teaser: "Check out all blog posts in my blog archive by date. Click on a headline to read the excerpt."
#breadcrumb: true
permalink: /blog/archive/monthview/
sitemap: false
sidebar: right
---
{: #top }

[By Category]({{"/blog/archive/categoryview" | prepend: site.baseurl}}) | [By Tag Cloud]({{"/blog/archive/tagcloudview" | prepend: site.baseurl}}) | [All]({{ "/blog/archive/" | prepend: site.baseurl}})

<div id="index">
{% assign openList = '<ul>' %}
{% assign closeList = '</ul>' %}
{% assign counter = 1 %}
{% for post in site.posts %}
    {% capture year %}{{ post.date | date: '%Y' }}{% endcapture %}
    {% capture nyear %}{{ post.next.date | date: '%Y' }}{% endcapture %}
    {% capture month %}{{ post.date | date: '%m%Y' }}{% endcapture %}
    {% capture nmonth %}{{ post.next.date | date: '%m%Y' }}{% endcapture %}
 
    {% capture yearHead %}
        {% if year != nyear and forloop.index != 1 %}{{closeList}}{% endif %}

        <h2 class="archivetitletopbottom"><a name="{{ post.date | date: '%Y' }}"></a>{{ post.date | date: '%Y' }}</h2>
    {% endcapture %}

    {% capture monthHead %}
        {% if month != nmonth and forloop.index != 1  and year == nyear %}{{ closeList }}<small markdown="1">[back to top](#top)</small>{%endif %}
        <h2 class="archivetitle"><a name="{{ post.date | date:  '%Y-%m'  }}"></a>{{ post.date | date: '%B %Y' }}</h2>
        {{ openList }}
    {% endcapture %}

    {% capture link %}
        <li>
            <a title="Read {{ post.title | escape_once }}" href="{{ site.baseurl }}{{ post.url }}"><strong>{{ post.title }}</strong> <small>{% if post.date %} - {{ post.date | date: "%B %e, %Y" }}{% endif %}</small></a></li>

    {% endcapture %}


    {% unless post.next %}{{ yearHead }}{% else %}{% if year != nyear %}{{yearHead }}{% endif %}{% endunless %}{% if month != nmonth %}{{ monthHead }}{% endif %}{{ link }}

{% assign counter=counter | plus:1 %}
{% endfor %}
{{closeList}}
</div>