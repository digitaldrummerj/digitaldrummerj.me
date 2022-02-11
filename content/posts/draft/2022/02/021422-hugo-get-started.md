---
categories: ["blogging", "hugo"]
date: 2022-02-14T13:00:00Z
published: false
title: "Creating a Blog Using Hugo"
url: '/create-blog-with-hugo'
series: ['create-blog']
---


## Hugo Install

I am on Windows and I use [Chocolately](https://chocolatey.org/install) as my package manager to install applications.  Chocolatey has a package for Hugo.


{{< alert class="warning" >}}
If you are not running Linux or macOS, you can find the install instructions at [https://gohugo.io/getting-started/installing](https://gohugo.io/getting-started/installing)
{{</ alert >}}

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

[https://themes.gohugo.io/](https://themes.gohugo.io/)

[https://github.com/digitaldrummerj/hugo-theme-clean-blog-bootstrap](https://github.com/digitaldrummerj/hugo-theme-clean-blog-bootstrap)

```cmd
cd MyBlog
git init
git submodule add https://github.com/digitaldrummerj/hugo-theme-clean-blog-bootstrap themes/bootstrap
```

## Add Some Content

```cmd
hugo new posts/my-first-post.md
```

## Configuring Theme

## Start Hugo Server

```cmd
hugo server -D
```
