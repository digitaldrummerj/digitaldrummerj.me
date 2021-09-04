---
categories:
- blogging
- jekyll
date: 2015-02-17T00:00:00Z
excerpt: |
  Welcome the continuing series on using Jekyll. In this tutorial we will go through creating a page to show blog post by date.

  ## Overview

  A typical blog has a way for your readers to view posts by either category or date, so that they can look at your archives without having to go through the blog post one by one and page by page.  In the last lesson, we added the post by category page.  In this lesson we will add the post by date page.
published: true
series: ["blogging-with-jekyll"]
title: 'Jekyll Part 06: Adding Post by Date Page'
---

Welcome the continuing series on using Jekyll. In this tutorial we will go through creating a page to show blog post by date.

## Overview

A typical blog has a way for your readers to view posts by either category or date, so that they can look at your archives without having to go through the blog post one by one and page by page.  In the last lesson, we added the post by category page.  In this lesson we will add the post by date page.

## Section 1: Creating the Post by Date Page

If you have been following along with the other lessons in the series, this should be familiar to you.

1. Open a web browser and navigate to your [username].github.io repository.

1. Click on the + button to add a new file

    ![Github Plus Button](/images/BloggingOnGitHub/github_add_button.png)

1. Name the file archivebydate.md

    ![Github Name the New File archivebydate.md](/images/BloggingOnGitHub/github_part_6_archivebydate_file_name.png)

## Section 2: Adding the Metadata

Add the following front matter to the top of the archivebycategory.md file.

    ---
    layout: page
    title: Post by Date
    permalink: /monthview/
    sitemap: false
    ---

## Section 3:  Html to Display Post

After the front matter, add the following code to display the post by Year and Month.

    <div id="index">
        {% for post in site.posts %}
            {% unless post.next %}
                <h2>{{ post.date | date: '%Y' }}</h2>
            {% else %}
                {% capture year %}{{ post.date | date: '%Y' }}{% endcapture %}
                {% capture nyear %}{{ post.next.date | date: '%Y' }}{% endcapture %}
                {% if year != nyear %}
                {% if forloop.index != 1 %}</ul>{% endif %}
                    <h2>{{ post.date | date: '%Y' }}</h2>
                {% endif %}
            {% endunless %}

        {% capture month %}{{ post.date | date: '%m%Y' }}{% endcapture %}
        {% capture nmonth %}{{ post.next.date | date: '%m%Y' }}{% endcapture %}
        {% if month != nmonth %}
        {% if forloop.index != 1 %}</ul>{% endif %}
            <h2>{{ post.date | date: '%B %Y' }}</h2><ul>
        {% endif %}


        {% if post.link %}
            <h3 class="link-post">
                <a href="{{ site.baseurl }}{{ post.url }}" title="{{ post.title }}">{{ post.title }}</a>
                <a href="{{ post.link }}" target="_blank" title="{{ post.title }}"><i class="fa fa-link"></i></a></h3>
        {% else %}
            <h3><a href="{{ site.baseurl }}{{ post.url }}" title="{{ post.title }}">{{ post.title }}<p class="date">{{ post.date |  date: "%B %e, %Y" }}</p></a></h3>
            <p>{{ post.excerpt | strip_html | truncate: 160 }}</p>
        {% endif %}
        {% endfor %}
    </div>

## Section 4: Viewing the Post by Date Page

1. After you have added the above text, scroll to the bottom of the page, add your commit note, and    click the commit button.

    ![Github Commit archivebydate.md](/images/BloggingOnGitHub/github_part_6_commit_archivebydate.png)

1. To  view the category page, navigate to http://[username].github.io/monthview

1. Your page should look like the following but with your avatar, site name and description in the header of the page.

    ![month view screenshot](/images/BloggingOnGitHub/github_part_6_archivebydate_in_browser.png)

1. Right now the page is published but not linked to from anywhere.  In the next section we will add it to the header section of the page.

## Section 5: Adding browse by date into Header

We are going to add the "show by date" link into the header section next to the link to view by category that we added in the [previous lesson]({{ "blogging-on-github-part-5-adding-a-category-page" | prepend: site.baseurl | prepend: site.url}}).

1. Go into the _layouts directory by clicking on _layouts

1. Click on the default.html file to open it.

1. Click on the ![github_edit_button.png](/images/BloggingOnGitHub/github_edit_button.png) icon to edit the file.

1. In the &lt;div id="archives"&gt; tag that we added previously, add the following html snippet after the category view link.

        or <a title="The complete archive of
            {{ site.name }}'s Blog by month"
            href="{{ site.url}}{{ site.baseurl }}//monthview">date</a>

    ![GitHub Header Add Html](/images/BloggingOnGitHub/github_part_6_browse_by_category_in_header_html.png)

1. Scroll down to the bottom, add the commit comment, and click on the commit change button.

    ![Commit default.html changes](/images/BloggingOnGitHub/github_part_6_commit_default.png)

1. Now go view your blog's home page at http://[username].github.io/.  You should now see the "browse by category or date" link in the header.

    ![Blog's Home Page with Browse By Category or Date Link in Header](/images/BloggingOnGitHub/github_part_6_browse_by_category_and_date_in_header.png)

## Conclusion

With just a few simple steps, you were able to add the post by month page and put it in the header.  In the next lesson we will discuss how the blog theme works and how to modify it.


