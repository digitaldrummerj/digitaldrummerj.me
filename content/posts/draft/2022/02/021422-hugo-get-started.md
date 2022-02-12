---
categories: ["blogging", "hugo"]
date: 2022-02-14T13:00:00Z
published: false
title: "Creating a Blog Using Hugo"
url: '/create-blog-with-hugo'
series: ['create-blog']
toc: true
---

This website is based on the [Hugo](https://gohugo.io/) static site generator.  It is currently my favorite static site generator.  In this series of post on Hugo, we are going to go through building out a full blog to replicate the functionality of this website (posts, archives by date, archives by category, archives by tag cloud, rss feed, contact page, search page and about page plus some posts on various Hugo features).

> A static site generator renders your content into HTML files that you then upload to your web server for serving to your users instead of your site being rendered dynamically on the fly by the web server when a page is requested.

## Hugo Install

{{< alert class="warning" >}}
If you are not running Linux or macOS, you can find the install instructions at [https://gohugo.io/getting-started/installing](https://gohugo.io/getting-started/installing)
{{</ alert >}}

For Windows I prefer to use [Chocolately](https://chocolatey.org/install) to manage my applications installs and upgrades.  For Hugo, Chocolatey does have a package available for us to use.

By using Chocolately, I can install Hugo and get Hugo available on my environment path with a single command.

> If you do not have Chocolatey installed already, go to [https://chocolatey.org/install](https://chocolatey.org/install) and install it first

1. Open up a command prompt as an administrator
1. Install Hugo

    ```cmd
    choco install -y hugo
    ```

## Create a New Site

1. Open up a command prompt
1. Navigate to the directory where you store your repositories
1. Run the following to create a new Hugo site in a folder name, MyBlog

    ```cmd
    hugo new site MyBlog
    ```

## Add a Theme

For the purpose of this series of post on Hugo, I created a [started theme](https://github.com/digitaldrummerj/hugo-theme-clean-blog-bootstrap) for us to use based on this website.

```cmd
cd MyBlog
git init
git submodule add https://github.com/digitaldrummerj/hugo-theme-clean-blog-bootstrap themes/bootstrap
```

> If you want to use a different theme, you can find a good amount of themes available at [https://themes.gohugo.io/](https://themes.gohugo.io/)

## Add Some Content

```cmd
hugo new posts/my-first-post.md
```

## Configuring Theme

## Start Hugo Server

```cmd
hugo server -D
```
