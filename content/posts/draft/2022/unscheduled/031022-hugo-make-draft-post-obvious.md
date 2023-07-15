---
categories: ["blogging", "hugo"]
date: 2024-03-10T13:00:00Z
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
