---
categories: ["blogging", "hugo"]
date: 2022-02-25T13:00:00Z
published: true
title: "Hugo - Open External Links in a New Tab"
url: '/hugo-links-to-other-pages'
series: ['Blogging With Hugo']
---

For Hugo based websites, when a link goes to an external website, I prefer to have them open in a new browser tab.

<!--more-->

To accomplish the goal of opening all external links in a new tab, you need to override the Hugo default behavior for rendering links by creating the file layouts\_defaults\_markup\render-link.html.

In the render-link.html, we need to look at the prefix of the `.Destination` to see if it starts with http or https and if it does then add the `target="_blank"

Copy this code snippet into the render-link.html.

```text
<a href=“{{ .Destination | safeURL }}”{{ with .Title}} title=“{{ . }}”{{ end }}{{ if or (strings.HasPrefix .Destination “http”) (strings.HasPrefix .Destination “https”) }} target=“_blank”{{ end }} >{{ .Text | safeHTML }}</a>
```

Now when any link starts with http or https, it will open in a new tab while links within the website will open in the same tab
