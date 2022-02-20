---
categories: ["blogging", "hugo"]
date: 2022-02-19T13:00:00Z
published: false
title: "Hugo - Create Archive Page to View Posts Month"
url: '/hugo-view-post-grouped-by-month'
---

test

<!--more-->

## Archive By Date Page

**content\archivebydate.md:**

```markdown
---
permalink: "/posts/monthview/"
url: "/posts/monthview/"
published: true
sidebar: true
layout: "archivebydate"
title: "Posts"
description: "By Date"
---

**Other Views:**  [List](/posts/)

---
```

## Archive By Date Layout

**layouts\page\archivebydate.html:**

### Define Main

```html
{{ define "main" }}

{{ end }}
```

### Page Header

```html
{{ if isset .Params "image" }}
  <header
    class="intro-header"
    style="background-image: url('{{ .Site.BaseURL }}/{{ .Params.image }}')"
  >
{{ else }}
  <header
    class="intro-header"
    style="background-image: url('{{ .Site.BaseURL }}{{ .Site.Params.defaultHeaderImage }}')"
  >
{{ end }}
    <div class="container">
        <div class="row">
            <div class="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
                <div class="page-heading">
                    <h1>{{ .Title }}</h1>
                    <hr class="small">
                    <span class="subheading">{{ .Description }}</span>
                    <span class="meta">{{ partial "meta" . }}</span>
                </div>
            </div>
        </div>
    </div>
</header>
```

### Display Post by Month

```html
<div class="container">
    <div class="row">
        <div class="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
            {{ .Content }}
            {{ range (.Site.RegularPages.GroupByDate "January 2006")  }}
                {{ if (where .Pages "Section" "posts") }}
                    <h2>{{ .Key }}</h2>
                    <ul class="list-group striped-list">
                        {{ range ((where .Pages "Section" "posts")) }}
                            <li class="list-group-item">
                                <a href="{{ .RelPermalink }}">
                                {{ .PublishDate.Format "Jan 02" }} : {{ .Title }}
                                </a>
                            </li>
                    {{ end }}
                    </ul>
                {{ end }}
            {{ end }}
        </div>
    </div>
</div>
```

### Add Striping To the List of Post

**static\css\clean-blog.min.css:**

```css
ul.striped-list > li:nth-of-type(odd) {
    background-color: #f3f3f3 ;
}
```

## Post List Update

**layouts\posts\list.html:**

```html
{{ define "main" }}
    <!-- Page Header -->
    <header class="intro-header" style="background-image: url('{{ .Site.BaseURL }}{{ .Site.Params.defaultHeaderImage }}')">
     <div class="container">
       <div class="row">
         <div class="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
           <div class="site-heading">
             <h1>{{ .Title }}</h1>
             <hr class="small">
             <span class="subheading">{{ .Description }}</span>
           </div>
         </div>
       </div>
     </div>
    </header>

    <!-- Main Content -->
    <div class="container">
      <div class="row">
        <div class="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
          <p><strong>Other Views: </strong><a href="/posts/monthview">By Month</a></p>
          <hr />

          {{ range .Paginator.Pages }}
              {{ .Render "archive" }}
          {{ end }}
          {{ template "_internal/pagination.html" . }}
        </div>
      </div>
    </div>

{{ end }}
```
