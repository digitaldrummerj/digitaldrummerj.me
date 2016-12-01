---
layout: page
title: "Blog Archive by Date"
teaser: "Check out all blog posts in my blog archive by date. Click on a headline to read the excerpt."
#breadcrumb: true
permalink: /blog/archive/monthview/
sitemap: false
sidebar: right
---

[By Category]({{"/blog/archive/categoryview" | prepend: site.baseurl}}) | [By Tag Cloud]({{"/blog/archive/tagcloudview" | prepend: site.baseurl}}) | [All]({{ "/blog/archive/" | prepend: site.baseurl}})

<div id="index">
{% assign openList = '<dl class="accordion" data-accordion>' %}
{% assign closeList = '</dl>' %}
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
        {% if month != nmonth and forloop.index != 1  and year == nyear %}{{ closeList }}{% endif %}
        <h2 class="archivetitle"><a name="{{ post.date | date:  '%Y-%m'  }}"></a>{{ post.date | date: '%B %Y' }}</h2>
        {{ openList }}
    {% endcapture %}

    {% capture link %}
        <dd class="accordion-navigation">
            <a href="#panel{{ counter }}"><span class="iconfont"></span> {% if post.subheadline %}{{ post.subheadline }} › {% endif %}<strong>{{ post.title }}</strong> <small>{% if post.date %} - {{ post.date | date: "%B %e, %Y" }}{% endif %}</small></a>
            <div id="panel{{ counter }}" class="content">
                {% if post.meta_description %}{{ post.meta_description | strip_html | escape }}{% elsif post.teaser %}{{ post.teaser | strip_html | escape }}{% elsif post.excerpt %}{{ post.excerpt | markdownify }}{% endif %}
                <a href="{{ site.baseurl }}{{ post.url }}" title="Read {{ post.title | escape_once }}"><strong>{{ site.data.language.read_more }}</strong></a><br><br>
            </div>
        </dd>

    {% endcapture %}


    {% unless post.next %}{{ yearHead }}{% else %}{% if year != nyear %}{{yearHead }}{% endif %}{% endunless %}{% if month != nmonth %}{{ monthHead }}{% endif %}{{ link }}

{% assign counter=counter | plus:1 %}
{% endfor %}
{{closeList}}
</div>