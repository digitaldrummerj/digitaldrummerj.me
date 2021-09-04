---
categories:
- blogging
- jekyll
date: 2015-02-11T00:00:00Z
excerpt: "Welcome the continuing series on using Jekyll. In this tutorial we will
  go through how to add an additional page such as the [speaking](/speaking) page on this blog.\n\n## Overview
  \n\nAs your blog grows you are going to want to add additional information besides
  \ just blog post.  If you start speaking at events or want to show off your portfolio
  or blog post by category/date, you are going to want these as separate pages.  These
  pages most likely will have there own look and feel as well.\n"
published: true
series: ["blogging-with-jekyll"]
title: 'Jekyll Part 04: Adding Additional Pages'
---


Welcome the continuing series on using Jekyll. In this tutorial we will go through how to add an additional page such as the [speaking](/speaking) page on this blog.

## Overview

As your blog grows you are going to want to add additional information besides  just blog post.  If you start speaking at events or want to show off your portfolio or blog post by category/date, you are going to want these as separate pages.  These pages most likely will have there own look and feel as well.

## Section 1: Creating the file for the page

If you have been following along with the other part in this series,  the step should be familiar to you.

1. Open a web browser and navigate to your [username].github.io reporepository.

2. Click on the + button to add a new file

    ![Github Plus Button](/images/BloggingOnGitHub/github_add_button.png)

3.  Name the file portfolio.md

    ![Github Name the New File portfolio.md](/images/BloggingOnGitHub/github_name_file_portfolio.png)

4.  Go to the next section to decide on the layout for the page

## Section 2: Choosing a layout

To tell the jekyll engine what the layout of the page should be, you need to add the front matter layout tag.

From  [ Part 2 Creating your first blog post](/blogging-on-github-part-2-your-first-post), you will remember that the front matter is the metadata about blog post but it is used in jekyll  for any page as well.  All of the front matter tags are the same as a blog post.

To change the layout from being a blog post to a page, you will change the layout front matter tag to page instead of post.

By default jekyll  adds files to the sitemap that search engines use to find pages on your site.  Setting  it to false will stop this page from being added.  We will remove the sitemap tag once we  are ready to share the page.

In order for the page to available at [username].github.io/portfolio, you need to set the front matter permalink to /portfolio/ .

### front  matter tags

	---
	title: My Portfolio
	permalink: /portfolio/
	layout: page
	sitemap: false
	---

## Section 3: Adding content

The content is written in markdown just like blog post are.   In  [ Part 2 Creating your first blog post](/blogging-on-github-part-2-your-first-post), we covered the common markdown tags.

For now just add some simple markdown like below:

	This is a placeholder page for my portfolio.


Your page should now look like this in the editor

![Github Editor for Portfolio.md](/images/BloggingOnGitHub/github_part4_portfolio_page_markdown.png)

After you have added the above text, scroll to the bottom of the page, add your commit note, and    click the commit button.

![Github Commit Portfolio.md](/images/BloggingOnGitHub/github_part4_portfolio_page_commit_change.png)

## Section4: Previewing page

To  view the page navigate to http://[username].github.io/portfolio

Your page should look like the following but with your avatar, site name and description in the header of the page.

![first page](/images/BloggingOnGitHub/github_part4_portfolio_view_in_browser.png)

Right now the page is published but not linked to from anywhere.

## Section 5: Adding page to menu

Once  you are ready to share the page with your readers, you will want to add it to your main menu and have it indexed by search engines.

To tell search engines to index the page, we need to remove the front matter tag, sitemap:false.

To add it to the menu:

1. Navigate to the _layout directory in the repository by clicking on the repository title to get back to the main directory of the repository

    ![Github Click on Repository Title](/images/BloggingOnGitHub/github_part4_navigate_to_top.png)

2. Click on _layouts directory

    ![Github Click on Layout](/images/BloggingOnGitHub/github_part4_click_layout.png)

3. Click on the default.html page.

    ![Github Click on Default.html](/images/BloggingOnGitHub/github_part4_click_default.png)

4. Click on the ![github_edit_button.png](/images/BloggingOnGitHub/github_edit_button.png) icon to edit the file.

5. Find the main menu.  You can search for home or about to find the section

    ![Github Main Menu Html](/images/BloggingOnGitHub/github_part4_menu_html.png)

6. Add the following line in the menu at the position you want the portfolio page link to be displayed.

        <a href="/portfolio">Portfolio</a>

    ![Github Menu with Portfolio Html](/images/BloggingOnGitHub/github_part4_menu_with_portfolio.png)

7. We need to commit the file to the repository by scrolling to the bottom of the page, adding the commit comment, and clicking on the commit button.

    ![Github Default.html Commit changes](/images/BloggingOnGitHub/github_part4_default_commit_changes.png)

8. Now navigate to your blog and the page link should show in the main menu.  Click on the portfolio menu item and make sure it takes you to the portfolio page.

    ![Github menu includes portfolio link](/images/BloggingOnGitHub/github_part4_menu_with_portfolio_in_browser.png)

## Conclusion


With just a few steps, you were able to add a new page into your blog's web site.  You can either continue to build out the portfolio page with the markdown needed to show off your portfolio or you can remove it from the menu until you are ready to do build it out.

In the next lesson we will build on this lesson by adding in a page to show the blog post by category.

