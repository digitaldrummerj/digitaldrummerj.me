---
categories: ["blogging", "hugo"]
date: 2022-03-01T13:00:00Z
published: true
title: "Hugo - Integrate Google Search"
url: '/hugo-Integrate-google-search'
series: ['Blogging With Hugo']
---

As your site content grows, finding content will become harder and you will need to add the ability to search your content.

You could create your own client search using something like [lunr.js](https://lunrjs.com) but then you have to maintain the search code and deal with any issues that come up.  To me this is a distraction from the real goal of publishing content on your site.

So instead, I prefer to harness the power of Google to search my site using the handy search argument `site:` to tell Google to just search my site for the search term.

In this post, we are going to create a search page that will take the reader to Google for the search results.

<!--more-->

## Create Search Layout

1. Create the layouts\search\single.html page
1. Define our main in the single.html page

    ```text
    {{define "main" }}
    {{ end }}
    ```

1. In the single.html page, we need to get a form for our search that has a single input box for our keyword and then have it call a JavaScript function called google_search (we will write that next)

    ```html
    <form id="search" onsubmit="google_search(); return false;">
        <div class="form-group form-group-lg">
            <input
                type="text"
                class="form-control"
                id="google-search"
                placeholder="Enter search term and hit enter"
            />
        </div>
    </form>
    ```

1. At the top of the single.html file we need to create the google_search function that will open a new Window that go to Google without keyword search and the site: as part of the search so that it only searches your site.  We are getting the baseurl from the config.toml file through the .Site.BaseURL.

    ```html
    <script language="Javascript" type="text/javascript">
    function google_search() {
        var query = document.getElementById('google-search').value;
        window.open(
        'https://www.google.com/search?q=' + query + '+site:' + '{{ .Site.BaseURL | absLangURL }}'
        );
    }
    </script>
    ```

### Create Search Page

The last thing that we need to do is create our search page to use the html that we created above.

1. Create the file content\search.md
1. Add the following front matter to the search.md file to tell Hugo that this page uses the layout\search\single.html for its layout

    ```text
    ---
    title: "Search"
    type: "search"
    ---
    ```

Now when you navigate to /search, type in your search term and press enter it will open a new tab that goes to Google and searches your site.

> Note: To test locally, you will need to use your site's domain url and not localhost as Google ignores the `site:` parameter for localhost
