---
layout: default
title: "Blog Archive by Category"
teaser: "Check out all blog posts in my blog archive by category. Click on a headline to read the excerpt."
breadcrumb: true
header:
   image_fullwidth: header_unsplash_8.jpg
permalink: /blog/archive/categoryview/
sitemap: false
---
{% assign tags = site.categories | sort %}
{% assign sorted_posts = site.posts | sort: 'title' %}
{% assign counter = 1 %}

{: #top }
<div id="title" class="row">
	<div class="small-12 columns t30">
		<h1>{{ page.title }}</h1>
		{% if page.teaser %}<p class="teaser">{{ page.teaser }}</p>{% endif %}
    </div>
</div>

<div id="category-index" class="row">
	<div class="small-12 columns t30">
        <table class="table-full-width">
            <tr>
                <td><a href="{{"/blog/archive/monthview" | prepend: site.baseurl | prepend: site.url }}">By Date</a></td>
                <td><a href="{{"/blog/archive/tagcloudview" | prepend: site.baseurl | prepend: site.url }}">By Tag Cloud</a></td>
            </tr>
        </table>
        <div class="tagcloud03">
            <ul>{% for tag in tags %}<li><a href="#{{ tag | first | slugify }}">{{ tag | first | replace: '-', ' ' }}<span>{{ tag | last | size }}</span></a></li>{% endfor %}</ul>
        </div><!-- /.tagcloud03 -->
    </div><!-- /.small-12.columns -->
</div><!-- /.row -->

<div id="blog-index" class="row">
	<div class="small-12 columns t30">


{% for tag in tags %}
<p><a name="{{ tag | first | slugify }}"></a>&nbsp;</p>
<h3 class="archivetitle">{{ tag | first | replace:'-', ' ' }} <i class="badge">{{ tag | last | size }}</i> </h3>

<dl class="accordion" data-accordion>

{% for post in sorted_posts %}
    {%if post.categories contains tag[0]%}
<dd class="accordion-navigation">
    <a href="#panel{{ counter }}"><span class="iconfont"></span> {% if post.subheadline %}{{ post.subheadline }} › {% endif %}<strong>{{ post.title }}</strong> <small>{% if post.date %} - {{ post.date | date: "%B %e, %Y" }}{% endif %}</small></a>
        <div id="panel{{ counter }}" class="content">
            {% if post.meta_description %}{{ post.meta_description | strip_html | escape }}{% elsif post.teaser %}{{ post.teaser | strip_html | escape }}{% elsif post.excerpt %}{{ post.excerpt | markdownify }}{% endif %}
            <a href="{{ site.url }}{{ site.baseurl }}{{ post.url }}" title="Read {{ post.title | escape_once }}"><strong>{{ site.data.language.read_more }}</strong></a><br><br>
        </div>
    {% assign counter=counter | plus:1 %}
</dd>
    {%endif%}

{% endfor %}
</dl>

<small markdown="1">[back to top](#top)</small>

{% endfor %}

</div><!-- /.small-12.columns -->
</div><!-- /.row -->

