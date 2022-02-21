---
categories: ["blogging", "hugo"]
date: 2022-02-20T13:00:00Z
published: false
title: "Hugo - Create Page to View Posts Grouped by Category"
url: '/hugo-view-post-grouped-by-category'
---

In our [previous post](/hugo-view-post-grouped-by-month), we create a page to view our posts grouped by month.  In this post, we are going to create a page to show post grouped by category.

<!--more-->

# outline

* create taxonomy pages
	* _default\terms.html for list of categories
		* alphabetical list
		* count of post for each term
		* link to summaryist page dor each category
	* _default\taxonomy.html to display list of post for category.
		* show all post for a given category
		* uses the same post summary html as post list
		* dont page this since you them all to show and mostikely wont have tons per category
* create custom page
	* cloud view 
	* link to later in page
	* link post list to actual post
	* linking post category to category page
	* getting count of posts for category
* set up taxonomy in config.toml

	```text
	[taxonomies]
  	category = “categories”
  	```
  	
* todo: take screenshot of both built in and custom pages 
* todo: grab code snippets 
* modify post list to add link to by category page 

**layouts\_default\terms.html:**

```html
{{ define “main” }}
<!— Main Content —>
<div class=“container”>
  <div class=“row”>
    <div class=“col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1”>
      <ul class=“patterns-list”>
        {{ range .Data.Terms.Alphabetical }}
          <li>
              <a href=“{{ .Page.RelPermalink }}”>
                  <span class=“fa fa-tags”></span>

                  {{ .Page.Title }}
                  <span>({{ .Count }})</span>
              </a>
          </li>
        {{ end }}
      </ul>
    </div>
  </div>
</div>
{{ end }}
```

**layouts\_defaults\taxonomy.html:**

```html 
{{ define “main” }}
<!— Main Content —>
<div class=“container”>
  <div class=“row”>
    <div class=“col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1”>
      {{ range .Paginator.Pages }}
          {{ .Render “archive” }}
      {{ end }}
      {{ template “_internal/pagination.html” . }}
    </div>
  </div>
</div>
{{ end }}
```

**layouts\page\archivebycategory.html:**

```html
{{ define “main”}}
 <!— Main Content —>
<div class=“container”>
    <div class=“row”>
        <div class=“col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1”>
            <a name=“top”></a>
            {{ .Content }}

            {{ if not (eq (len $.Site.Taxonomies.categories) 0) }}
                {{ $pageUrl := .RelPermalink | urlize }}
                <div>
                    <div class=“tagcloud03”>
                        <ul>
                            {{ range $name, $taxonomy := $.Site.Taxonomies.categories }}
                                {{ $currentTagCount := len $taxonomy.Pages }}
                                <li>
                                    <a href=“{{ $pageUrl }}#{{ $name | urlize}}”>{{ $name }}
                                        <span>{{ $currentTagCount }}</span>
                                    </a>
                                </li>
                            {{ end }}
                        </ul>
                    </div>
                    <div>
                        {{ range $name, $taxonomy := $.Site.Taxonomies.categories }}
                            <h3>
                                <a name=“{{ $name }}”></a>{{ $name}}
                                <i class=“badge”>{{ $currentTagCount }}</i>
                            </h3>
                            <ul class=“list-group striped-list”>
                                {{ range $taxonomy.Pages }}
                                    <li class=“list-group-item striped-list”>
                                        <a href=“{{ .RelPermalink }}”>
                                            {{ .Title }} {{ if .Params.subheadline }} ({{ .Params.subheadline }}){{ end }} -
                                            <small>{{ .PublishDate.Format “Jan 02, 2006” }} </small>{{ partial “draft” . }}</a>
                                    </li>
                                {{ end }}
                            </ul>
                            <a href=“{{ $pageUrl }}#top”>
                                <small>back to top</small>
                            </a>
                        {{ end }}
                    </div>
                </div>
            {{ end }}
        </div>
    </div>
</div>
{{ end }}
```

**content\archivebycategory.md:**

```markdown
—
permalink: “/posts/categoryview/“
title: “Posts”
description: “By Category”
url: “/posts/categoryview/“
published: true
sidebar: true
layout: “archivebycategory”
—
**Other Views:**  [List](/posts/) | [By Month](/posts/monthview)

—
```

**css:**

```css
.tagcloud03 {
	 margin-bottom: 50px;
   text-align: center
}
 .tagcloud03 ul.cloud li {
	 margin: 0;
}
 .tagcloud03 ul.cloud li a {
	 padding: 0 1em 0 1em;
	 /* border: none !important; */
   border: none;
	 height: 45px;
	 padding-top: 5px;
	 padding-bottom: 5px;
}
 .tagcloud03 ul {
	 margin: 0;
	 padding: 0;
	 list-style: none;
}
 .tagcloud03 ul li {
	 display: inline-block;
	 margin: 0 0.3em 0.3em 0;
	 padding: 0;
}
 .tagcloud03 ul li a {
	 position: relative;
	 display: inline-block;
	 max-width: 250px;
	 height: 35px;
	 line-height: 35px;
	 padding: 0 2.5em 0 1em;
	 background-color: #fff;
	 border: 1px solid #aaa;
	 border-radius: 3px;
	 white-space: nowrap;
	 text-overflow: ellipsis;
	 overflow: hidden;
	 color: #333;
	 font-size: 18px;
	 text-decoration: none;
	 -webkit-transition: 0.2s;
	 transition: 0.2s;
}
 .tagcloud03 ul li a:hover {
	 background-color: #4b56a8;
	 border: 1px solid #0085A1;
	 color: #fff;
}
```