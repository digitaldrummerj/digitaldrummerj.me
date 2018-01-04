---
layout: _pages/post
title: Theme - Hugo Foundation6
date: '2016-12-14'
link: 'https://themes.gohugo.io/hugo-theme-foundation6/'
code: 'https://github.com/htkoca/theme-hugo-foundation6'
categories:
  - code
tags:
  - hugo
  - node
  - gulp
  - sass
  - foundation
cover: cover.jpg
images:
  - mockup-tablet.jpg
  - screenshot-ipadpro-landscape.jpg
---
# Personal Project
A simple [Hugo](https://gohugo.io) theme based on the [Foundation 6 blog (w/ sidebar) example](http://foundation.zurb.com/templates-previews-sites-f6/blog.html), with scss & js gulp build scripts.

## Features:
* Responsive design.
* Basic [OpenGraph](http://ogp.me) and [Twitter Card](https://dev.twitter.com/cards/types) metadata support.
* `robots.txt` linking to XML sitemap (disabled by default, see [Hugo docs](https://gohugo.io/extras/robots-txt/)).
* Basic support for [multi-lingual content](https://github.com/spf13/hugo/blob/master/docs/content/content/multilingual.md) (added in Hugo 0.17).
* Supports Google, Bing, and Yandex site verification via meta tags.
* Supports Google Analytics (async version), see [Hugo docs](https://gohugo.io/extras/analytics/).
* Supports Disqus comments, see [Hugo docs](https://gohugo.io/extras/comments/).
* Can show a message about cookie usage to the user, see [`exampleSite/config.toml`](https://github.com/htkoca/hugo-theme-foundation6-blog/blob/master/exampleSite/config.toml).
* Allow addition of custom `<head>` code in site's `layouts/partial/head-custom.html` (see [#17](https://github.com/alanorth/hugo-theme-bootstrap4-blog/pull/17)).

## Usage:
Clone the repository to your site's `themes` directory. Refer to [`exampleSite/config.toml`](https://github.com/htkoca/hugo-theme-foundation6-blog/blob/master/exampleSite/config.toml) for optional configuration values. A few suggestions to help you get a good looking site quickly:

* Keep blog posts in the `content/post` directory, for example: `content/post/my-first-post.md`.
* Keep static pages in the `content` directory, for example: `content/about.md`.
* Keep media like images in the `static` directory, for example: `static/2016/10/screenshot.png`.
* If you want an image to be shown when you share a post on social media, specify at least one image in the post's front matter, for example: `images: ["/2016/10/screenshot.png"]`.
* Use the `<!--more-->` tag in posts to control how much of a post is shown on summary pages.

## Building, for developers: (Optional)
This theme uses gulp build scripts modified from [Foundation Zurb Template](https://github.com/zurb/foundation-zurb-template/). OS must have `node` and `bower` installed.

Command | Description
:-- | :--
**Install:** | **Run from `/scripts` directory to download all dependencies.**
`npm install` | Installs node dependencies.
`bower install` | Installs bower dependencies.
**Build Tasks:** | **Choose one to build from scss / js files in `/source` to `/static`.**
`npm run build:debug` | Build human readable `debug` files.
`npm run build:prod` | Build minified, sourcemapped files.
`npm run build:css` | Builds `debug` css only.
`npm run build:js` | Builds `debug` js only.
**Hugo Tasks:** | **Theme must be installed in a working or fresh hugo installation.**
`npm run build:hugo` | Builds `debug` css / js, deletes `/public`, builds `/public`, lint `/public`.
`npm run server` | Builds `debug` css / js, deletes `/public`, runs hugo server, start css / js / lint watch task.

## Contributing:
There are several ways to help with the development of the theme:
* [Open an issue](https://github.com/htkoca/hugo-theme-foundation6-blog/issues/new) on GitHub if you have problems or feature requests.
* Alternatively, tackle one of the [existing issues](https://github.com/htkoca/hugo-theme-foundation6-blog/issues) on the issue tracker.
* Fork [the repository](https://github.com/htkoca/hugo-theme-foundation6-blog) on GitHub, add features on a "feature" branch like `update-bootstrap`, and then send a [pull request](https://github.com/htkoca/hugo-theme-foundation6-blog/compare) with your changes.

## Attribution:

### This repository is maintained by:
* [Tony Ko](https://github.com/htkoca) - [GPL 3](https://tldrlegal.com/license/gnu-general-public-license-v3-(gpl-3)) - [License file](https://github.com/htkoca/hugo-theme-foundation6-blog/blob/master/license.txt)

### This repository was originally cloned from:
* [Alan Orth - hugo-theme-bootstrap4-blog](https://github.com/alanorth/hugo-theme-bootstrap4-blog/) - [GPL 3](https://tldrlegal.com/license/gnu-general-public-license-v3-(gpl-3)) - [License file](https://github.com/alanorth/hugo-theme-bootstrap4-blog/blob/master/LICENSE.txt)

### This repository contains the code of:
* [Foundation Zurb Template](https://github.com/zurb/foundation-zurb-template/) - [MIT license](https://tldrlegal.com/license/mit-license)
