---
categories: ["blogging", "hugo"]
date: 2022-02-14T13:00:00Z
published: false
title: "Creating a Blog Using Hugo"
url: '/create-blog-with-hugo'
series: ['create-blog']
toc: true
---

Are you ready to start blogging? 

Do you want to create your blog using [Hugo](https://gohugo.io/) ?

If yes, then this series of post on Hugo is what you are looking for.  Even if you have never used or heard of Hugo you will be able to create your blog and deploy it.

In this series of post on Hugo, we are going to build a full blog based on this website.   By the end of the series, you will be able to add posts, have a page to view past post by date/category/tag, have an rss feed so people can subscribe tonyour blog, be able to add pages such as contact, search and about plus we will dig into  several useful Hugo features to take some of the work out of creating your blog and post.

If you have not heard of Hugo before, Hugo is a static site generator.  A static site generator renders your content into HTML files and you only have to deploy the HTML to your web server.  No database is needed.  No fancy hosting service.  No Wordpress site.  In fact, you can run your site using GitHub pages for free.

## Hugo Install

The first thing we need to do is install Hugo.

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

> When a new version of Hugo comes out you can update your Chocolatey package but running choco upgrade -y hugo
 
## Create a New Site

Now that we have Hugo install, we need to create a new website.  

1. Open up a command prompt
1. Navigate to the directory where you store your repositories or code.
1. Run the following to create a new Hugo site in a folder name, MyBlog

    ```cmd
    hugo new site MyBlog
    ```

## Add a Theme

At this point we only have a shell of a website.  For the design is the website, Hugo allows us to add themes to control the look and feel. 

For the purpose of this Hugo series, I created a [starter theme](https://github.com/digitaldrummerj/hugo-theme-clean-blog-bootstrap) for us to use based on this website.

There are two ways to install a theme.  You can make the theme a gitsubmodule or you can download the theme and unzip it into the themes directory under your website.

There are pros and cons to both options.

**git submodule pros:**

* it is easy to update the theme with any changes the theme author makes.

**git submodule cons**

* changes you make to the theme will not be seen by git
* you have to remember to init the submodule after clone
* you have to remember to update the submodule, git pull for your site does not update the submodule.
* if the theme author decides to delete the theme repository and you don't have a local copy, your theme is lost.

**download theme pros**

* the theme is stored along with your site and any changes you make to it are stored with your site
 * you do not have to worry about the theme repository going away 

**download themes cons**

* you will have to manually merge any changes the theme author makes into your version of the theme.  

    > in my experience, themes rarely get updated after their release

As you can see there is a lot of cons to having your theme as a submodule.  As well for this series on Hugo, we will be s starting with a basic starter theme and then adding and modifying the theme so you will want to have the theme installed locally.

To install the theme:

1. Go to [https://github.com/digitaldrummerj/hugo-theme-clean-blog-bootstrap](https://github.com/digitaldrummerj/hugo-theme-clean-blog-bootstrap)
1. ?????

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
