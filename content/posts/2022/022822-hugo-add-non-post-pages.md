---
categories: ["blogging", "hugo"]
published: 2022-02-28T13:00:00Z

title: "Hugo - Add Additional Non-Blog Pages"
url: '/hugo-add-additional-pages'
series: ['Blogging With Hugo']
---

So far in our [Hugo series](/categories/hugo) we have only looked only blog related page such as posts and archives but typically you have other pages such as an about, search, or contact us.

In this post, we are going to take a look at how you can add an about page.

> In future post, we will look at the search and contact pages.  They follow the same instructions but the layout/content is much different than just a headshot and bio.

<!--more-->

All of our additional pages go in the content folder.  The additional pages are written in markdown and have a layout file to control the look and feel of the page.

## Create About Page

Let's take a look at how to create our about page ([see my about page](/about))

1. Create the file `content\about.md`
1. Add the following front matter to set the page title, description and layout to use for the page

    ```text {linenos=false,hl_lines=[4]}
    ---
    title: "About"
    Description: "Making the Complex Simple and Easy to Understand!"
    layout: "about"
    ---

    **Put Content Some Content About YourSelf On This Page**
    ```

1. Lastly, we need to create the layout page `layouts\page\about.html`
1. For the content of the about.html, this is where you design how you want the page to look.  For my page, here is my design where I have a headshot on the left of the content from the about.md file.

    ```html {linenos=false,hl_lines=[6, 8]}
    {{ define "main" }}
    <!-- Main Content -->
    <div class="container">
        <div class="row">
            <div class="col-lg-4">
                <img class="headshot img-thumbnail"  src="{{.Site.Params.Headshot }}">
            </div>
            <div class="col-lg-8">{{ .Content }}
            </div>
        </div>
    </div>
    {{ end }}
    ```

1. You can now view your about page by going to /about

Just like that you now have an about page on your site and it is up to you to add it to your site.

## Add About to Main Menu

For my site, the menu is defined in the config.toml file so that the menu is a bit more dynamic and I do not have to update the html every time I want to add/remove a menu item.  I am also using Bootstrap v3 for the layout.

```toml
[[menu.main]]
  name ="Home"
  url = "/"
  weight = 1
[[menu.main]]
  name = "About"
  url = "/about/"
  weight = 2
[[menu.main]]
  name = "Posts"
  url = "/posts/"
  weight = 3
```

and then in my header file, I use the Bootstrap navbar and loop through the main menu options from the config.toml

```html {linenos=false,hl_lines=["15-19"]}
<nav class="navbar navbar-default navbar-custom navbar-fixed-top">
    <div class="container-fluid">
        <div class="navbar-header page-scroll">
            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="/">{{ .Site.Title }}</a>
        </div>

        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul class="nav navbar-nav navbar-right">
                {{ range .Site.Menus.main }}
                <li>
                    <a href="{{ .URL }}">{{ .Name }}</a>
                </li>
                {{end}}
            </ul>
        </div>
    </div>
</nav>
```
