---
categories: ["blogging", "hugo"]
published: 2022-03-04T13:00:00Z

title: "Hugo - Create a 404 Page"
url: '/hugo-create-404-page'
series: ['Blogging With Hugo']
---

Every website should have a 404 page for when a user tries to go to a page that does not exist.

Hugo out of the box does not provide you with a nice 404 page but we can create a 404 page just like any other page.  Creating the page though is the easy part.  The hard part is getting the 404 page to display when a user goes to an invalid url as it depends on your website host to set up the 404 page redirect0000.

> For this site, I am hosting it using Netlify and they automatically pick up my 404 page.

Let's take a look at how to create our 404 page.

<!--more-->

1. In your layouts directory, create a file called 404.html
1. Next you need to design your 404 page, below is a simple template.

    ```go-html-template
    {{ define "main" }}
    <div class="container">
            <p>Page not found</p>
            <p><a href="/">Go to Home Page</a></p>
    </div>
    {{ end }}
    ```

1. Now we are ready to test our 404 page.  Unfortunately, Hugo server does not wire up a 404 page.  This means that locally you have to view your page as a normal page and then when you deploy to Netlify it you can try to view a bogus page and it will show the 404 page.  To view locally navigate to /404.html
