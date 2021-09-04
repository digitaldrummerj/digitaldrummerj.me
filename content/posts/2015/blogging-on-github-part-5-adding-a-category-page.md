---
categories:
- blogging
- jekyll
date: 2015-02-15T00:00:00Z
excerpt: "Welcome the continuing series on using Jekyll. In this tutorial we will
  go through creating a page to show blog post by category.\n    \n## Overview\n\nA
  typical blog has a way for your readers to view posts by either category or date,
  so that they can look at your archives without having to go through the blog post
  one by one.  Unfortunately, the Jekyll-Now repository that we cloned your blog from,
  does not have these pages.  Luckily, these pages are really easy to create.\n"
published: true
series: ["blogging-with-jekyll"]
title: 'Jekyll Part 05: Adding Category Page'
---

Welcome the continuing series on using Jekyll. In this tutorial we will go through creating a page to show blog post by category.

## Overview

A typical blog has a way for your readers to view posts by either category or date, so that they can look at your archives without having to go through the blog post one by one.  Unfortunately, the Jekyll-Now repository that we cloned your blog from, does not have these pages.  Luckily, these pages are really easy to create.

## Section 1: Creating the Category Page

If you have been following along with the other lessons in the series, this should be familiar to you.

1. Open a web browser and navigate to your [username].github.io repository.

1. Click on the + button to add a new file

    ![Github Plus Button](/images/BloggingOnGitHub/github_add_button.png)

1. Name the file archivebycategory.md

    ![Github Name the New File archivebycategory.md](/images/BloggingOnGitHub/github_part_5_archivebycategory_file_name.png)

## Section 2: Adding the Metadata

Add the following front matter to the top of the archivebycategory.md file.

        ---
        layout: page
        title: Post by Category
        permalink: /categoryview/
        sitemap: false
        ---

## Section 3: Category List

After the front matter, add the following code to display the categories and the number of post per category.  Each category will link to further down in the page where is will show the post for that category.

    <div>
        {% assign categories = site.categories | sort %}
        {% for category in categories %}
            <span class="site-tag">
                <a href="#{{ category | first | slugify }}">
                        {{ category[0] | replace:'-', ' ' }} ({{ category | last | size }})
                </a>
            </span>
        {% endfor %}
    </div>

## Section 4: Blog Post by Category

Next you need to add the code to display the list of blog post by category and sorted by title

    <div id="index">
        {% for category in categories %}
            <a name="{{ category[0] }}"></a>
            <h2>{{ category[0] | replace:'-', ' ' }} ({{ category | last | size }})</h2>
            {% assign sorted_posts = site.posts | sort: 'title' %}
            {% for post in sorted_posts %}
                {%if post.categories contains category[0]%}
                    <h3><a href="{{ site.url }}{{ site.baseurl }}{{ post.url }}" title="{{ post.title }}">{{ post.title }} <p class="date">{{ post.date |  date: "%B %e, %Y" }}</p></a></h3>
                    <p>{{ post.excerpt | strip_html | truncate: 160 }}</p>
                {%endif%}
            {% endfor %}
        {% endfor %}
    </div>

## Section 5: Viewing the Category Page

1. After you have added the above text, scroll to the bottom of the page, add your commit note, and    click the commit button.

    ![Github Commit archivebycategory.md](/images/BloggingOnGitHub/github_part_5_commit_archivebycategory.png)

1. To  view the category page, navigate to http://[username].github.io/categoryview

1. Your page should look like the following but with your avatar, site name and description in the header of the page.

    ![category view screenshot](/images/BloggingOnGitHub/github_part_5_archivebycategory_in_browser.png)

1. You will notice that the "You're up and running" post does not show up on the categories page.  This is because there is no categories front matter tag for that blog post.  Go ahead and open 2014-3-3-Hello-World.md and add the categories front matter tag.

        categories: ['welcome']

1. Right now the page is published but not linked to from anywhere.  In the next section we will add it to the header section of the page.

## Section 6: Adding Category View into Header

Unlike the portfolio page that we created in the last lesson, this time we are not going to add the category page into the menu.  Instead we are going to create a row below the header with a link to the page.

1. Go into the _layouts directory by clicking on _layouts

1. Click on the default.html file to open it.

1. Click on the ![github_edit_button.png](/images/BloggingOnGitHub/github_edit_button.png) icon to edit the file.

1. Right after the &lt;/header&gt; tag, add the following html snippet

        <div class="container" >
            <div id="archives">
                browse by <a title="The complete archive of {{ site.name }}'s Blog by category"
                                href="{{ site.url}}{{ site.baseurl }}/categoryview">category</a>
            </div>
        </div>

1. Scroll down to the bottom, add the commit comment, and click on the commit change button.

    ![Commit default.html changes](/images/BloggingOnGitHub/github_part_5_commit_default.png)

1. Now go view your blog's home page at http://[username].github.io/.  You should now see the "browse by category" link in the header.

    ![Blog's Home Page with Browse By Category Link in Header](/images/BloggingOnGitHub/github_part_5_browse_by_category_in_header.png)

## Conclusion

With just a few simple steps, you were added the post by category page and put it in the header.  In the next lesson we will add in a new page for browsing blog post by year and month.

