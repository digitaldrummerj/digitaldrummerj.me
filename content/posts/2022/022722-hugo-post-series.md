---
categories: ["blogging", "hugo"]
date: 2022-02-27T13:00:00Z
published: true
title: "Hugo - Create a Post Series"
url: '/hugo-post-series'
---

When writing a blog, sometimes you want to write a multiple part posts that are meant to be read in order and you want to display to the reader that the post is part of a series, where the post is in the series and a link to get to the other posts in the series.

Out of the box, Hugo does not offer the ability to display the list of posts that are part of the series. Luckily, Hugo has all of the pieces to create one yourself, which we are going to do in this post.

Here is an example of what we are going to build.

![example series](/images/hugo/series/example-series.png)

<!--more-->

## Create Series (Just the Code)

First, we need to create the partial that will generate the series html.

1. Create the file layouts\partial\series.html
1. Add the following html to the file (We will dig into the html a bit in a moment, but I wanted to give you all of the html that creates the series html you upfront).

    ```html
   {{ if .Params.series }}
    <div>
        <h4>This article is part of a series.</h4>
        <ul class="list-group">
            {{ range $num,$post := (index .Site.Taxonomies.series (index .Params.series 0 | urlize)).Pages.ByDate }}
                {{ if eq $post.Permalink $.Page.Permalink }}
                    <li class="list-group-item active">
                        Part {{ add $num 1 }}: This Article
                    </li>
                {{ else }}
                    <li class="list-group-item">
                        <a href="{{$post.Permalink}}">
                            Part {{ add $num 1 }}: {{ $post.Params.title}}
                        </a>
                    </li>
                {{end}}
            {{end}}
        </ul>
    </div>
    {{end}}
    ```

1. Now, to use the layouts\partial\series.html file, we need to add it to our layouts\posts\single.html file. In this case, I am adding it before and after the content of the post.

    ```html {linenos=false,hl_lines=[7, 9]}
    {{ define "main" }}
    <main>
        <article>
        <header>
            <h1>{{ .Title }}</h1>
        </header>
            {{ partial "series.html" . }}
            {{ .Content }}
            {{ partial "series.html" . }}
        </article>
    </main>
    {{ end }}
    ```

1. The last thing we need to do is add the `series:` parameter to any posts that are part of a series with the name of the series like we did below with the `series: ['aspnet-core-code-coverage']`

    ```markdown {linenos=false,hl_lines=[6]}
    ---
    categories: ["testing", "dotnet-core", "teamcity", "dotcover"]
    date: 2022-02-09T13:00:00Z
    published: true
    title: dotCover - How in TeamCity to create multiple coverage reports
    series: ['aspnet-core-code-coverage']
    ---
    ```

## Create Series (In-Depth)

Let's walk through the code snippet above for the layouts\partial\series.html file.

### Step 1: Only Display If Series

We first check if the `series:` parameter is present on the post.

```html
{{ if .Params.series }}
{{end}}
```

### Step 2: Get the List of Posts in Series

Next, we need to grab all of the posts in the series.

```html
{{ range $num,$post := (index .Site.Taxonomies.series (index .Params.series 0 | urlize)).Pages.ByDate }}
{{end}}
```

Let's break down the range statement for you.

1. Since the series could be an array, we want to get the first name of the series and make it url friendly so that we can ultimately get all of the posts in the series.

    ```text
    (index .Params.series 0 | urlize)

    ```

1. Next, we want to get all of the posts in the series

    ```text
    (index .Site.Taxonomies.series (index .Params.series 0 | urlize))
    ```

1. Then, we want to sort the posts by date (I assume that the series are published in order)

    ```text
    (index .Site.Taxonomies.series (index .Params.series 0 | urlize)).Pages.ByDate
    ```

1. Lastly, we want to create a range that we can loop through and store the index and post information as variables that we can reference.

    ```text
    {{ range $num,$post := (index .Site.Taxonomies.series ((index .Params.series 0 | urlize))).Pages.ByDate }}

    ```

### Step 3: Display Series Info and Link

The last we need to do is display the series information.

To make it clear to the user where the post they are reading is in the series, we check if the post url matches the current page that is being read. If it does match the url, then display "Part X: This Article" instead of the title. This makes it super clear where the post they are reading is in the series.

> Note: the index is zero-based, so we add a 1 to it when displaying it so that we start at Part 1 and not Part 0

```html
{{ if eq $post.Permalink $.Page.Permalink }}
    <li class="list-group-item active">Part {{ add $num 1 }}: This Article</li>
{{ else }}
```

Then if the post is not the current post being read, we create a link to the post and display the part number and title of the post.

```html
    <li class="list-group-item"><a href="{{$post.Permalink}}">Part {{ add $num 1 }}: {{ $post.Params.title}}</a></li>
{{end}}
```

Now you can display a list of posts in a series for the reader.
