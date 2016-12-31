---
published: true
layout: post
title: 'Jekyll Part 07: Adding a custom Google search'
categories: ['blogging', 'jekyll']
date: 2015-02-24 06:00
series: blogging-with-jekyll
excerpt: | 
    Welcome to part 7 of the series on Blogging on Github.  In this lesson, we are going to add the ability to search your blog using google.
        
    ## Overview
    
    As your blog grows, you want to make it easy for your readers to find the content that they need on your blog.  Out of the box, Jekyll does not have any type of search engine built-in.  Thankfully, with Google you can easily tell Google to index your blog and then add a search box on the blog.
---
{% assign imagedir = "/images/BloggingOnGitHub/" | prepend: site.baseurl | prepend: site.url %}

Welcome the continuing series on using Jekyll. In this tutorial we are going to add the ability to search your blog using google.



## Overview

As your blog grows, you want to make it easy for your readers to find the content that they need on your blog.  Out of the box, Jekyll does not have any type of search engine built-in.  Thankfully, with Google you can easily tell Google to index your blog and then add a search box on the blog.

## Section 1: Adding the Search Page

If you have been following along with the other lessons in the series, this should be familiar to you.

1. Open a web browser and navigate to your [username].github.io repository.

1. Click on the + button to add a new file

    ![Github Plus Button]({{"github_add_button.png" | prepend: imagedir}}   )

1.  Name the file search.html

    ![Github Name New File search.html]({{"github_part_7_add_search_html_file.png" | prepend: imagedir}})

1. Add the following front matter

        ---
        layout: page
        title: Search
        permalink: /search/
        sitemap: false
        ---

1. Add the following html to the page

        <div id="home-search" class="home">
            <script>
                (function() {
                    var cx = '[Your CSE Search ID]';
                    var gcse = document.createElement('script');
                    gcse.type = 'text/javascript';
                    gcse.async = true;
                    gcse.src = (document.location.protocol == 'https:' ? 'https:' : 'http:') +
                    '//www.google.com/cse/cse.js?cx=' + cx;
                    var s = document.getElementsByTagName('script')[0];
                    s.parentNode.insertBefore(gcse, s);
                })();
            </script>
            <gcse:search queryParameterName="searchString"></gcse:search>
        </div>

## Section 2: Adding Search Box

1. We need to get back to the main directory of our repository.  To do this click on one of the [yourname].github.io links.

1. Then click on _layouts directory to go into it.

1. Click on the default.html file to open it.

1. Click on the ![github_edit_button.png]({{"github_edit_button.png" | prepend: imagedir}}) icon to edit the file.

1. Before the &lt;div id="archives"&gt; tag that we added previously, add the following html snippet.

    {% raw %}
                <div id="search">
                    <form role="search" method="get" action="{{ site.baseurl }}//search/">
                        <input id="searchString" name="searchString"
                               placeholder="Be a Better Developer, etc." type="text">
                        <input id="searchButton" name="googleSearchName" type="submit" value="Search">
                    </form>
                </div>
     {% endraw %}

1. Replace the &lt;div class="container"&gt; above the search div with the following
    {% raw %}
        <div class="grid" id="searchBar">
            <div>
     {% endraw %}

1. After the &lt;div id="archives"&gt; section add another &lt;/div&gt; tag.

1. The whole section for the header should look like this
    {% raw %}
        <div class="grid" id="searchBar">
             <div>
                 <div id="search">
                     <form role="search" method="get" action="{{ site.baseurl }}//search/">
                         <input id="searchString" name="searchString"
                                placeholder="Learn Ionic, Be a Better Developer, etc." type="text">
                         <input id="searchButton" name="googleSearchName" type="button" value="Search">
                     </form>
                 </div>

                 <div id="archives">
                     browse by <a title="The complete archive of {{ site.name }}'s Blog by category"
                            href="{{ site.baseurl }}//categoryview">category</a>
                     or <a title="The complete archive of {{ site.name }}'s Blog by month"
                           href="{{ site.baseurl }}//monthview">date</a>
                 </div>
             </div>
         </div>
    {% endraw %}


1. Scroll down to the bottom, add the commit comment, and click on the commit change button.

    ![Commit default.html changes]({{"github_part_7_commit_search_html.png" | prepend: imagedir}})

1. Next we need to update the theme so that the search box shows up in the correct spot on the page.

## Section 3: Updating the Stylesheet

1. We need to get back to the main directory of our repository.  To do this click on one of the [yourname].github.io links.

1. Click on the style.scss file to open it.

1. Click on the ![github_edit_button.png]({{"github_edit_button.png" | prepend: imagedir}}) icon to edit the file.

1. Add the following to the bottom of the file before the two @import statements.

            {% raw %}
            #searchBar {
              font-size: 80%;
              padding: 0.43em 0 0.57em;

              #search {
                float: right;

                #searchString {
                  width: 283px;
                  border: none;
                  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2) inset;
                  padding: 0.3em 0.6em;
                  background-color: #f6f5ea;
                  margin-right: 0;
                }

                #searchButton {
                  paddign: 0.3em 0.6em;
                  background-color: #0B5485;
                  border: 1px solid #f6f5ea;
                  margin-left: 0;
                  color: $white;
                  -webkit-appearance: none;
                  border-radius: 0;
                }

                #archives {
                  line-height: 2;
                  float: left;
                  color: $black;
                  text-wrap: avoid;
                }
              }
            }
            {% endraw %}


1. Scroll down to the bottom, add the commit comment, and click on the commit change button.

    ![Commit default.html changes]({{"github_part_7_commit_style.png" | prepend: imagedir}})

1. Now go view your blog's home page at http://[username].github.io/.  You should now see the search box in the header along with the "browse by category or date" links.

    ![Blog's Home Page with Search and Browse By Category or Date Link in Header]({{"github_part_7_browse_search_in_header.png" | prepend: imagedir}})

1.  Now that the search box and search pages are done, we need to setup Google to actually search our blog.

## Section 4: Configuring Google

1. Navigate to [https://www.google.com/cse/](https://www.google.com/cse/all)
1. If you do not have a Google account, you will need to create one.
1. If you already have a Google account, please login to it now.

    ![Signin to Google Custom Search]({{"github_part_7_signin_to_cse.png" | prepend: imagedir}})

1. Once signed in, click the Add button

    ![Add Button]({{"github_part_7_add_cse_button.png" | prepend: imagedir}})

1. Fill in your web site url.  Should be http://[username].github.io/*

    ![Url to Search Textbox]({{"github_part_7_add_cse_url.png" | prepend: imagedir}})

1. Give the search a name that you will remember.

    ![Name of the Search]({{"github_part_7_add_cse_name.png" | prepend: imagedir}})

1. Click the create button

    ![Create Button]({{"github_part_7_add_cse_create.png" | prepend: imagedir}})

1.  You search should now be created

    ![Search Created]({{"github_part_7_add_cse_done.png" | prepend: imagedir}})

1. Click the Get Code button

    ![Click Get Code Button]({{"github_part_7_get_cse_code.png" | prepend: imagedir}})

1. Copy the var cx = line

    ![Copy the code]({{"github_part_7_cse_code.png" | prepend: imagedir}})

1. Go back to github and edit the search.html page.  Replace the var cx = line with the line that you just copied.

1.  Commit the changes to Github for the search.html page.

1.  Now we are ready to test the search

## Section 5: Testing the Search

1.  Open a web browser and navigate to http://[username].github.io

1.  Type some text into the search box and click Search

    ![Type in Search text and click search button]({{"github_part_7_search_term.png" | prepend: imagedir}})

1.  It should take you to your search page and then do a Google search

    ![Search View]({{"github_part_7_search_in_browser.png" | prepend: imagedir}})


## Conclusion

You now have the ability for Google to index and search your blog.  This will make it much easier for your reader to find older posts that they may be interested in and hopefully keep them on your blog longer.

In our next lesson, I will show you how to host your http://[username].github.io blog with a custom domain name like I am doing with http://digitaldrummerj.me

