---
categories: ["blogging", "hugo"]
published: 2022-02-21T13:00:00Z

title: "Hugo - View Posts by Tag Cloud"
url: '/hugo-view-post-tag-cloud'
series: ['Blogging With Hugo']
---

In our [previous post](/hugo-view-post-grouped-by-category) on Hugo, we created a page to view the post grouped by category and a page to view all posts for a category.

In this post, we are going to build a similar post list page but this time we are going to look at the list using a tag cloud.  A tag cloud is a visual representation of our categories using font size and weight to highlight which categories have more posts.

**example tag cloud:**

![example tag cloud](/images/hugo/tag-cloud/example-tag-cloud.png)

<!--more-->

**layouts\pages\archivebycloud.html:**

This page is a bit more complicated then the previous archive pages that we have built.  As the font size for the categories will increase or decrease based on the number of post in the category, we have a bit of math to do.

1. Under our theme, create the page layouts\pages\archivebycloud.html
1. Add the main definition to the page

    ```html
    {{ define "main" }}
    {{ end }}
    ```

1. Within the define block, add the following code to add the container div, create a row, column, include a back to top link, and the content of the markdown page that will use this page template

   ```html
    <div class="container">
        <div class="row">
            <div class="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
                <a name="top"></a>
                {{ .Content }}
            </div>
        </div>
    </div>
   ```

1. Now after the `{{ .Content }}` but still within the div we want to make sure that there is at least 1 category definition before we try to build the tag cloud.  We can make this check by making sure that the site taxonomies categories array has more than 0 categories.

    ```html
    {{ if not (eq (len $.Site.Taxonomies.categories) 0) }}
    {{ end }}
    ```

1. Within the if statement we need to define several variables to examine the number of categories, number of posts within a category, and min/max font sizes.

    ```html
    {{ $fontUnit := "rem" }}
    {{ $largestFontSize := 3.0 }}
    {{ $smallestFontSize := 1.5 }}
    {{ $fontSpread := sub $largestFontSize $smallestFontSize }}
    {{ $max := add (len (index $.Site.Taxonomies.categories.ByCount 0).Pages) 1 }}
    {{ $min := len (index $.Site.Taxonomies.categories.ByCount.Reverse 0).Pages }}
    {{ $spread := sub $max $min }}
    {{ $fontStep := div $fontSpread $spread }}
    ```

1. Now we are ready to loop through the categories and increase/decrease the font based on number of page.

      * In the variables below, we are doing some math:
        * mul = multiple two numbers
        * sub = subtract to numbers
        * div = divide two numbers
        * math.log = returns the natural logarithm of the given number

    ```html
    <div class="tagcloud03">
        <ul class="cloud">
            {{ range $.Site.Taxonomies.categories.Alphabetical }}
                {{ $currentFontSize := (add $smallestFontSize (mul (sub .Count $min) $fontStep) ) }}
                {{ $weight := div (sub (math.Log .Count) (math.Log $min)) (sub (math.Log $max) (math.Log $min)) }}
                {{ $currentFontSize := (add $smallestFontSize (mul (sub $largestFontSize $smallestFontSize) $weight) ) }}
                <li>
                    <a href="#{{ .Page.Title | urlize}}" style="font-size:{{$currentFontSize}}{{$fontUnit}}">{{ .Page.Title }}</a>
                </li>
            {{ end }}
        </ul>
    </div>
    ```

1. The last thing to decide is how we want to get the posts when you click on the category in the tag cloud.
   1. Option #1: change the category link in the above code snippet to link to `/categories/{{ .Page.Title | urlize }}` which is the page that we created in our [previous post](/hugo-view-post-grouped-by-category) to display a summary list of all posts in a category.
   1. Option #2: add to the page a section for each category that shows the posts for it and have the tag cloud go to that section.  If you go with option #2 use the code snippet below to display the list.

        ```html
        <div>
            {{ range $.Site.Taxonomies.categories.Alphabetical }}
                <h3>
                    <a name="{{ .Page.Title | urlize }}"></a>{{ .Page.Title}}
                    <i class="badge">{{ .Count }}</i>
                </h3>
                <ul class="list-group striped-list">
                    {{ range .Pages }}
                        <li class="list-group-item">
                            <a href="{{ .RelPermalink }}">
                                {{ .Title }} {{ if .Params.subheadline }} ({{ .Params.subheadline }}){{ end }} -
                                <small>{{ .PublishDate.Format "Jan 02, 2006" }}{{ partial "draft" . }}</small></a>
                        </li>
                    {{ end }}
                </ul>
                <a href="#top">
                    <small>back to top</small>
                </a>
            {{ end }}
        </div>
        ```

**content\archivebycloud.md:**

Now we need to create a page that uses the tag cloud layout that we just created.

1. Create the file content\archivebytagcloud.md
1. Add the following code to the file to set the url to `/post/tagcloudview/`, set the page title, set the layout to be the one we just created and add the links to the other archive pages.

    ```html
    —
    permalink: “/posts/tagcloudview/“
    title: “Posts by Tag Cloud”
    url: “/posts/tagcloudview/“
    
    sidebar: true
    layout: “archivebytagcloud”
    —
    **Other Views:**  [List](/posts/) | [By Month](/posts/monthview) | [By Category](/categories)

    —
    ```

**static\css\clean-blog.min.css:**

The last thing we need to do is add the CSS for our tag cloud.

Under our theme in the static\css\clean-blog.min.css file add the following CSS to the bottom of the file

```css
.tagcloud03 {
  margin-bottom: 50px;
   text-align: center
}
 .tagcloud03 ul.cloud li {
  margin: 0;
}
 .tagcloud03 ul.cloud li a {
  padding: 0 1em 0 1em;
   border: none;
  height: 45px;
  padding-top: 5px;
  padding-bottom: 5px;
}
 .tagcloud03 ul {
  margin: 0;
  padding: 0;
  list-style: none;
}
 .tagcloud03 ul li {
  display: inline-block;
  margin: 0 0.3em 0.3em 0;
  padding: 0;
}
 .tagcloud03 ul li a {
  position: relative;
  display: inline-block;
  max-width: 250px;
  height: 35px;
  line-height: 35px;
  padding: 0 2.5em 0 1em;
  background-color: #fff;
  border: 1px solid #aaa;
  border-radius: 3px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  color: #333;
  font-size: 18px;
  text-decoration: none;
  -webkit-transition: 0.2s;
  transition: 0.2s;
}
 .tagcloud03 ul li a:hover {
  background-color: #4b56a8;
  border: 1px solid #0085A1;
  color: #fff;
}
```

Our tag cloud page is finished and ready for you to view at `/posts/tagcloudview` on your site.

> Don't forget to update the other archive pages to also have the link to the tag cloud page

In our next post on Hugo, we are going to set up our RSS feed for your blog like this blog has at [/feed.xml](/feed.xml).
