---
categories: ["blogging", "hugo"]
published: 2022-02-19T13:00:00Z

title: "Hugo - View Posts Grouped By Month"
url: '/hugo-view-post-grouped-by-month'
series: ['Blogging With Hugo']
---
In our [previous post](/hugo-view-all-post), we looked at how to build an archive page to view all of the posts we have written. In this post, we will build an archive page that shows our posts by month.

**Example of What We Are Building:**

![example of page](/images/hugo/archive-by-date/page.png)

<!--more-->

To create the archive by month page, we need to create a page in the content folder and the accompanying layout in the theme folder.

## Create the Page to Display The Posts By Month

1. In the content directory, create a new file called archivebydate.md
1. Make the contents of the archivebydate.md, as follows, to set the URL to the page, that the page is published, the layout is archivebydate (we will create this next), the title of the page, and the description of the page

```markdown
---
permalink: "/posts/monthview/"
url: "/posts/monthview/"

layout: "archivebydate"
title: "Posts"
description: "By Date"
---

**Other Views:**  [List](/posts/)

---
```

## Create the Layout of the Monthly View

Now we need to create the layout of the post by monthly page.

1. Create a file in our theme folder in the layouts\page and name it archivebydate.html
1. We are going to first define the main section since our baseof.html file uses this section to put the content between the header and footer of the site

    ```html
    {{ define "main" }}

    {{ end }}
    ```

1. Next, we need to create the header of the page. The header will consist of the background image, title, and description of the page.

    > For the header image, we check if the page defined an image in the front matter or if we should use the site's default header image

    ```html {linenos=false,hl_lines=[1,4,6,9,11,16,18]}
    {{ if isset .Params "image" }}
      <header
        class="intro-header"
        style="background-image: url('{{ .Site.BaseURL }}/{{ .Params.image }}')"
      >
    {{ else }}
      <header
        class="intro-header"
        style="background-image: url('{{ .Site.BaseURL }}{{ .Site.Params.defaultHeaderImage }}')"
      >
    {{ end }}
        <div class="container">
            <div class="row">
                <div class="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
                    <div class="page-heading">
                        <h1>{{ .Title }}</h1>
                        <hr class="small">
                        <span class="subheading">{{ .Description }}</span>
                    </div>
                </div>
            </div>
        </div>
    </header>
    ```

1. Now, we are ready to display the actual post grouped by month.

    > Hugo has built-in functions to get all of the pages grouped by the date that we can then make sure only display actual post and not the post list page, and then loops through all of the posts for that month.
    >
    > We also allow the page to have content on it that is displayed at the top using the `{{ .Content }}`

    ```html {linenos=false,hl_lines=["4-7",9,"11-12",15,"17-18"]}
    <div class="container">
        <div class="row">
            <div class="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
                {{ .Content }}
                {{ range (.Site.RegularPages.GroupByDate "January 2006")  }}
                    {{ if (where .Pages "Section" "posts") }}
                        <h2>{{ .Key }}</h2>
                        <ul class="list-group striped-list">
                            {{ range ((where .Pages "Section" "posts")) }}
                                <li class="list-group-item">
                                    <a href="{{ .RelPermalink }}">
                                    {{ .PublishDate.Format "Jan 02" }} : {{ .Title }}
                                    </a>
                                </li>
                              {{ end }}
                         </ul>
                    {{ end }}
                 {{ end }}
             </div>
        </div>
    </div>
    ```

1. Our basic page is now built. If you navigate to [/posts/monthview/](/posts/monthview/) you can see our page of posts grouped by month.

Optionally, you can add strips (color even list items) to the list of blog posts with a bit of CSS

> The above code has a class on the ul element called striped-list. We need to implement the stripping with the CSS below.

In our theme folder, open static\css\clean-blog.min.css and add the following code anywhere in the file.

```css
ul.striped-list > li:nth-of-type(odd) {
    background-color: #f3f3f3 ;
}
```

## Post List Update

The last thing we need to do is add links to go between the views that we have for the post list and the post by month list.

We could directly update the default list.html page, but if we ever have a list that is not a post list, we do not want to have the links to navigate between the post archive pages. Instead, we are going to create a list.html file in the theme\layouts\posts folder that will be used automatically when viewing a list of posts instead of the _default list.html

1. In our theme folder, create the file layouts\posts\list.html
1. In the list.html file, add the following code, which mirrors out _default\list.html file, except this code, has the addition of the "Other Views:" html

    ```html {linenos=false,hl_lines=[21]}
    {{ define "main" }}
        <!-- Page Header -->
        <header class="intro-header" style="background-image: url('{{ .Site.BaseURL }}{{ .Site.Params.defaultHeaderImage }}')">
         <div class="container">
           <div class="row">
             <div class="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
               <div class="site-heading">
                 <h1>{{ .Title }}</h1>
                 <hr class="small">
                 <span class="subheading">{{ .Description }}</span>
               </div>
             </div>
           </div>
         </div>
        </header>

        <!-- Main Content -->
        <div class="container">
          <div class="row">
            <div class="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
              <p><strong>Other Views: </strong><a href="/posts/monthview">By Month</a></p>
              <hr />

               {{ range .Paginator.Pages }}
                  {{ .Render "archive" }}
              {{ end }}
              {{ template "_internal/pagination.html" . }}
            </div>
          </div>
        </div>
    {{ end }}
    ```

Our archive by month page is now completed and ready to deploy. As you can see, there is a lot of power in the functions that Hugo provides us to loop through the post, group posts, run conditional logic, and more.

In our [next post](/hugo-view-post-grouped-by-category), we will build the archive by category page.
