---
categories: ["blogging", "hugo"]
date: 2022-02-26T13:00:00Z
published: true
title: "Hugo - Selectively Add Table of Contents to Post"
url: '/hugo-table-of-contents'
---

When you are doing a longer tutorial style post, it is helpful to include a table of contents that will show all of the headings in the post and link to that portion of the post. In this post, we will look at how you can selectively add a table of contents to a post.

<!--more-->

Hugo can generate a table of contents for you by including `{{ .TableOfContents }}` in your html templates that are in the layouts folder.

> Note: `{{ .TableOfContent }}` does not render when just placed in your markdown file for a post

The main place that you will want a table of contents is when you are viewing a single post. You can either make it the default for all single pages by placing it in the layouts\_defaults\single.html or have it only show up when viewing a post by placing it in layouts\posts\single.html

I only put a table of contents in my posts. To add the table of contents, you need to create the layouts\posts\single.html file and then add the `{{  .TableOfContents }}` where you want it to show.

**layouts\posts\single.html example:**

```html {linenos=false,hl_lines=["9-11"]}
{{ define "main" }}
<main>
    <article>
    <header>
        <h1>{{ .Title }}</h1>
    </header>
        {{ .Content }}
    </article>
    <aside>
        {{ .TableOfContents }}
    </aside>
</main>
{{ end }}
```

The above code snippet will always put a table of contents at the bottom of the post.

Suppose you want only to include a table of contents when you specify a parameter. In that case, you need to add the parameter to your post front matter and add an if statement in your html template to only render the table of contents when the parameter is true.

```html {linenos=false,hl_lines=["9-13"]}
{{ define "main" }}
<main>
    <article>
    <header>
        <h1>{{ .Title }}</h1>
    </header>
        {{ .Content }}
    </article>
    {{ if .Params.toc }}
    <aside>
        {{ .TableOfContents }}
    </aside>
    {{ end }}
</main>
{{ end }}
```

Now that you have the `{{ if .Params.toc }}` added to your html template, you need to add the `toc: true` parameter to the front matter of any post that you want a table of content to be displayed.

```markdown {linenos=false,hl_lines=[2]}
---
toc: true
categories: ["blogging", "hugo"]
date: 2022-02-26T13:00:00Z
published: true
title: "Hugo - Add Table of Contents to Post"
---
```

Just like that, you now have a table of contents that will show only when you want.

For other posts on Hugo, check out my [Hugo posts archive](/categories/hugo/)
