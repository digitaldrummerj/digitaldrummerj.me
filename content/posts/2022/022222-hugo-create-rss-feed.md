---
categories: ["blogging", "hugo"]
date: 2022-02-22T13:00:00Z
published: false
title: "Hugo - Create RSS Feed for Site"
url: '/hugo-create-rss-feed'
---

 If you have a Hugo site, you probably already have a working RSS feed. You just might not know about it!

Hugo comes with a built-in RSS Template that generates the necessary RSS XML for you. Often, this internal template is good enough, and you just need to include the feed links in the correct places.

<!--more-->

## How RSS works

Before, we go into some Hugo RSS specifics, I think it’s important that you know how RSS actually works.

RSS stands for Really Simple Syndication, and it’s a way to give a programmatic access to the updates on a website. It uses a standardized format that news aggregators can easily read. The feed is simply an XML file that lists the recent content and the feed consumers periodically poll this file to stay up to date with the changes.

When someone subscribes to your blog feed with an RSS reader they save the feed URL in their reader application.

## Add RSS to your Hugo site

To include your RSS feed link on your Hugo site, add the following code to the header of the site.

```html
<link rel="alternate"
      type="application/rss+xml"
      href="{{.Site.BaseURL }}/index.xml"
      title="{{ .Site.Title }}">
```

Now a browser can detect it and let the user add it to their list of feeds. This is really handy for the user since they don’t need to copy and paste the URL around.

## Configure RSS Feed

You also can configure Hugo (config.toml) to show a copyright notice and set the Author information.

```toml
copyright = "2022 Justin James All rights reserved"
languageCode = "en-us"

[Author]
    name = "Justin James"
    email = "me@example.com"
```

Next, you need to add the following snippet inside the `<head>` tags of theme’s head partial:

```html
<link rel="alternate" type="application/rss+xml" href="{{.Site.BaseURL }}/feed.xml" title="{{ .Site.Title }}">
```

## Showing all your content

The default template includes only the summary of each blog post. I really like reading entire post in my RSS reader if I can. It removes all the bloat of the original website, and just gives me the text I care about.

We can override the default rss template by copying it our theme's layouts\_default\rss.xml and editing it.

You can find the default rss template that ships with Hugo at [https://github.com/gohugoio/hugo/blob/master/tpl/tplimpl/embedded/templates/_default/rss.xml](https://github.com/gohugoio/hugo/blob/master/tpl/tplimpl/embedded/templates/_default/rss.xml)

If you’d like to create a full-text feed then you’d have to change this line

```html
<description>{{ .Summary | html }}</description>
```

to this

```html
<description>{{ .Content | html }}</description>
```

The edited file needs to be saved under our theme in the layouts/_default/rss.xml so that it will override the default feed.

```html
{{- $pctx := . -}}
{{- if .IsHome -}}{{ $pctx = .Site }}{{- end -}}
{{- $pages := slice -}}
{{- if or $.IsHome $.IsSection -}}
{{- $pages = $pctx.RegularPages -}}
{{- else -}}
{{- $pages = $pctx.Pages -}}
{{- end -}}
{{- $limit := .Site.Config.Services.RSS.Limit -}}
{{- if ge $limit 1 -}}
{{- $pages = $pages | first $limit -}}
{{- end -}}
{{- printf "<?xml version=\"1.0\" encoding=\"utf-8\" standalone=\"yes\"?>" | safeHTML }}
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>{{ if eq  .Title  .Site.Title }}{{ .Site.Title }}{{ else }}{{ with .Title }}{{.}} on {{ end }}{{ .Site.Title }}{{ end }}</title>
    <link>{{ .Permalink }}</link>
    <description>Recent content {{ if ne  .Title  .Site.Title }}{{ with .Title }}in {{.}} {{ end }}{{ end }}on {{ .Site.Title }}</description>
    <generator>Hugo -- gohugo.io</generator>{{ with .Site.LanguageCode }}
    <language>{{.}}</language>{{end}}{{ with .Site.Author.email }}
    <managingEditor>{{.}}{{ with $.Site.Author.name }} ({{.}}){{end}}</managingEditor>{{end}}{{ with .Site.Author.email }}
    <webMaster>{{.}}{{ with $.Site.Author.name }} ({{.}}){{end}}</webMaster>{{end}}{{ with .Site.Copyright }}
    <copyright>{{.}}</copyright>{{end}}{{ if not .Date.IsZero }}
    <lastBuildDate>{{ .Date.Format "Mon, 02 Jan 2006 15:04:05 -0700" | safeHTML }}</lastBuildDate>{{ end }}
    {{- with .OutputFormats.Get "RSS" -}}
    {{ printf "<atom:link href=%q rel=\"self\" type=%q />" .Permalink .MediaType | safeHTML }}
    {{- end -}}
    {{ range $pages }}
    <item>
      <title>{{ .Title }}</title>
      <link>{{ .Permalink }}</link>
      <pubDate>{{ .Date.Format "Mon, 02 Jan 2006 15:04:05 -0700" | safeHTML }}</pubDate>
      {{ with .Site.Author.email }}<author>{{.}}{{ with $.Site.Author.name }} ({{.}}){{end}}</author>{{end}}
      <guid>{{ .Permalink }}</guid>
      <description>{{ .Content | html }}</description>
    </item>
    {{ end }}
  </channel>
</rss>
```

You now have your RSS configured and ready for people to start using.  You can view your RSS feed by going to `/index.xml` on your web site.
