---
categories: ["blogging", "hugo"]
date: 2022-02-22T13:00:00Z
published: true
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

We can override the default rss template by copying it our theme's `layouts\_default\rss.xml` and editing it.

You can find the default rss template that ships with Hugo at [https://github.com/gohugoio/hugo/blob/master/tpl/tplimpl/embedded/templates/_default/rss.xml](https://github.com/gohugoio/hugo/blob/master/tpl/tplimpl/embedded/templates/_default/rss.xml)

To then change from the summary view to the full content view, you’d change this line in the default template

```html
<description>{{ .Summary | html }}</description>
```

to this

```html
<description>{{ .Content | html }}</description>
```

The default Hugo RSS template, also includes all of the pages in your site and not just your blog post.  For my RSS feed, I do not want my about, search, speaking or any other page that is not a blog post included in my RSS feed.

At the top of the Hugo RSS template, is a `$pages` variable. To pull just content located in the `content\posts` section, you'd update these lines in the default template

```html
{{- if or $.IsHome $.IsSection -}}
{{- $pages = $pctx.RegularPages  -}}
{{- else -}}
{{- $pages = $pctx.Pages  -}}
{{- end -}}
```

to this

```html
{{- if or $.IsHome $.IsSection -}}
{{- $pages = (where (where $pctx.RegularPages ".Section" "posts") "Kind" "page")  -}}
{{- else -}}
{{- $pages = (where (where $pctx.Pages ".Section" "posts") "Kind" "page")  -}}
{{- end -}}
```

You now have your RSS configured to only show posts and include the entire post.  Your RSS feed is now ready for people to start subscribing to the feed.  Your RSS feed can be viewed by going to the `index.xml` page on your web site.

> You also have RSS feeds for each category by going to `/categories/[name]/index.xml` where `[name]` is the name of the category.
