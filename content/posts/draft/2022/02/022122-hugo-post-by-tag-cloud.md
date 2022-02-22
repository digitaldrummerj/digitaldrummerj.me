---
categories: ["blogging", "hugo"]
date: 2022-02-21T13:00:00Z
published: false
title: "Hugo - View Posts by Tag Cloud"
url: '/hugo-view-post--tag-cloud'
---

In our [previous post](/hugo-view-post-grouped-by-category) on Hugo, we created a page to view the post grouped by category and a page to view all posts for a category.

In this post, we are going to build a similar page to the last post   create a tag cloud and  

<--more-->

**layouts\pages\archivebycloud.html:**

```html
{{ define “main” }}
 <!— Main Content —>
<div class=“container”>
    <div class=“row”>
        <div class=“col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1”>
            <a name=“top”></a>
            {{ $pageUrl := .RelPermalink | urlize }}
            {{ .Content }}
            {{ if not (eq (len $.Site.Taxonomies.categories) 0) }}
                {{ $fontUnit := “rem” }}
                {{ $largestFontSize := 3.0 }}
                {{ $smallestFontSize := 1.5 }}
                {{ $fontSpread := sub $largestFontSize $smallestFontSize }}
                {{ $max := add (len (index $.Site.Taxonomies.categories.ByCount 0).Pages) 1 }}
                {{ $min := len (index $.Site.Taxonomies.categories.ByCount.Reverse 0).Pages }}
                {{ $spread := sub $max $min }}
                {{ $fontStep := div $fontSpread $spread }}

                <div>
                    <div class=“tagcloud03”>
                        <ul class=“cloud”>
                            {{ range $name, $taxonomy := $.Site.Taxonomies.categories }}
                                {{ $currentTagCount := len $taxonomy.Pages }}
                                {{ $currentFontSize := (add $smallestFontSize (mul (sub $currentTagCount $min) $fontStep) ) }}
                                {{ $count := len $taxonomy.Pages }}
                                {{ $weight := div (sub (math.Log $count) (math.Log $min)) (sub (math.Log $max) (math.Log $min)) }}
                                {{ $currentFontSize := (add $smallestFontSize (mul (sub $largestFontSize $smallestFontSize) $weight) ) }}
                                    <li>
                                        <a href=“{{ $pageUrl }}#{{ $name | urlize}}” style=“font-size:{{$currentFontSize}}{{$fontUnit}}”>{{ $name }}</a>
                                    </li>
                            {{ end }}
                        </ul>
                    </div>
                    <div>
                        {{ range $name, $taxonomy := $.Site.Taxonomies.categories }}
                            {{ $currentTagCount := len $taxonomy.Pages }}
                            {{ $currentFontSize := (add $smallestFontSize (mul (sub $currentTagCount $min) $fontStep) ) }}
                            {{ $count := len $taxonomy.Pages }}
                            {{ $weight := div (sub (math.Log $count) (math.Log $min)) (sub (math.Log $max) (math.Log $min)) }}
                            {{ $currentFontSize := (add $smallestFontSize (mul (sub $largestFontSize $smallestFontSize) $weight) ) }}

                            <h3>
                                <a name=“{{ $name }}”></a>{{ $name}} <i class=“badge”>{{ $currentTagCount }}</i>
                            </h3>
                            <ul class=“list-group striped-list”>
                                {{ range $taxonomy.Pages }}
                                    <li class=“list-group-item”>
                                        <a href=“{{ .RelPermalink }}”>{{ .Title }} {{ if .Params.subheadline }} ({{ .Params.subheadline }}){{ end }} - <small>{{ .PublishDate.Format “Jan 02, 2006” }} </small>{{ partial “draft” . }}</a>
                                    </li>
                                {{ end }}
                            </ul>
                            <a href=“{{ $pageUrl }}#top”><small>back to top</small></a>
                        {{ end }}
                    </div>
                </div>
            {{ end }}
        </div>
    </div>
</div>
{{ end }}
```

**contents\archivebycloud.md:**

```html 
—
permalink: “/posts/tagcloudview/“
title: “Posts by Tag Cloud”
url: “/posts/tagcloudview/“
published: true
sidebar: true
layout: “archivebytagcloud”
—
**Other Views:**  [List](/posts/) | [By Month](/posts/monthview) | [By Category](/categories)

—
```