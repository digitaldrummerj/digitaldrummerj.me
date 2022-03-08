---
categories: ["blogging", "hugo"]
date: 2022-03-08T13:00:00Z
published: false
title: "Hugo - Add a Note to Post If Draft"
url: '/hugo-make-draft-post-obvious'
series: ['Blogging With Hugo']
---

* categories\terms
* pages\archivebydate.md
* pages\archivebytagcloud.md
* partial\pageheader.html
* partial\series.html
* posts\summary.html

```go-html-template
{{ partial "draft" . }}
```

```go-html-template
{{ if (.Draft ) }}  - DRAFT {{ end }}
```
