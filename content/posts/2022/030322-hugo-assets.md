---
categories: ["blogging", "hugo"]
date: 2022-03-03T13:00:00Z
draft: false
title: "Hugo - Minify JS and CSS"
url: '/hugo-asset-pipeline'
---

When you think about a website's performance, you should minify your CSS and JavaScript file so that they download as quickly as possible. This still holds true even with static sites like Hugo. Luckily, Hugo can minify files out of the box using what Hugo calls [Asset Pipeline](https://gohugo.io/hugo-pipes/introduction/).

In this post, I will show you how to take advantage of the Hugo Asset Pipeline to minify your CSS and JavaScript.

<!--more-->

To have Hugo minify your files, you need to put your CSS and JavaScript files that you want to minify in the assets at either the root of your site or the root of your theme.

> Hugo processes only CSS and JavaScript files in the assets folder while the static folder is just served as is.

This means the first thing you need to do is move your CSS and JavaScript files to be minified to the assets\css and assets\js folder, respectively.

Once you move the files into the assets folder, you can get a reference to them using `resources.Get` and passing the location within the assets folder.

To get a reference to the assets\css\clean-blog.css file.

```go-html-template
{{ $css := resources.Get "css/clean-blog.css" }}
<link href="{{ $css.RelPermalink }}" rel="stylesheet">
```

The reference above for clean-blog.css is not minified though. To minify clean-blog.css, we need to pipe it to `minify`. Hugo will automatically reference the clean-blog.min.css when you use the RelPermalink

```go-html-template
{{ $css := resources.Get "css/clean-blog.css" | minify }}
<link href="{{ $css.RelPermalink }}" rel="stylesheet">
```

For JavaScript files, it works the same way as a CSS file does. To minify js/clean-blog.js and get a reference to js/clean-blog.min.js, use the following:

```go-html-template
{{ $js := resources.Get "js/clean-blog.js" | minify }}
<script src="{{ $js.RelPermalink }}"></script>
```

Now you can minify your CSS and JavaScript files any time you want.
