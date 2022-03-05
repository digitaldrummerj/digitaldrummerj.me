---
categories: ["blogging", "hugo", "netlify"]
date: 2022-02-15T13:00:00Z
published: true
title: "Hugo - Deploy Site to Netlify"
url: '/deploy-hugo-netlify'
series: ['Blogging With Hugo']
---

In our previous post on [Creating a Blog Using Hugo](/create-blog-with-hugo/), we installed Hugo, created a new site, added a theme, and created our first post.

In this post, we will be deploying the site that we created using a free account at [Netlify](https://www.netlify.com/). The site will be re-built and re-deployed whenever we push a new commit to our site's Git repository. We will also look at how to set up our site using our own domain and create an SSL certificate.

<!--more-->

A question that comes up a lot when I talk about deploying static sites like Hugo with Netlify is why not just use GitHub Pages?

This is a great question. While GitHub Pages allows us to deploy our site with a custom domain and SSL, it does not let us deploy a staging or preview version of the site to test out changes before making them live. Netlify gives us the ability to create a preview site for each pull request which I use to see what my future and draft post will look like on a machine other than my laptop. Netlify also allows us to deploy a branch to a subdomain, allows multiple domains pointing to a single site, unlimited websites, and rollback to a previous build. All of this can be done with the free tier of Netlify.

## Create Netlify Account

The first thing we need to do is create a Netlify account if you do not have one already.

Head over to [Netlify sign up](https://app.netlify.com/signup) page.

![netlify sign up](/images/hugo/deploy-netlify/netlify-signup.png)

## Import project

Now that our Netlify account is created, we are ready to add our site to Netlify.

1. Once logged into your Netlify account, click on the "Add New Site" and select "Import Project"

    ![add new site](/images/hugo/deploy-netlify/netlify-new-site-step-1-add-new-site.png)

1. Click on your Git provider

    ![import a project into Netlify](/images/hugo/deploy-netlify/netlify-new-site-step-2-import-project.png)

1. Pick your site's repository

    ![netlify pick repository to deploy from Github](/images/hugo/deploy-netlify/netlify-new-site-step-3-pick-repo.png)

1. For the  build command, use the following to build, clean up resources and minify output

    ![hugo build command for deploy](/images/hugo/deploy-netlify/netlify-new-site-step-4-build-command.png)

    ```cmd
    hugo --gc --minify
    ```

    > --gc cleans up the generated resource to remove anything old
    >
    > --minify will minify things it can like HTML

Our site is now set up in Netlify and Netlify ran our first deployment for us.

## Url for Site

Netlify will auto-assign a URL to our site for us. We can change the URL to something we can remember or hook up our own domain to the site. We will first look at renaming the Netlify domain and later in this post, we will look at hooking up a custom domain.

After you finish importing the repository, Netlify will take you to the site details, where you can see the URL that Netlify assigned (it is the netlify.app domain) to the site.

![url netlify assigned](/images/hugo/deploy-netlify/netlify-new-site-step-5-url.png)

You can also see the Production deploys that have been done for the site. At this point, it will just be the initial deployment.

![production deployments list](/images/hugo/deploy-netlify/netlify-new-site-step-6-production-deploys.png)

If you want to change the URL that Netlify assigned (will still be netlify.app but can change the subdomain in front of it), you can do so by:

1. Clicking on the domain settings
1. Clicking the options next to the domain name
1. Clicking the Edit Name

![edit netlify app](/images/hugo/deploy-netlify/netlify-new-site-step-7-edit-netlify-app.png)

The last thing we need to do is fix the asset references on our site. Right now, our config.toml file says baseurl is example.org. We need to update this to our Netlify URL.

1. Open the config.toml file that is in the root of our site
1. Find the baseurl parameter and update it to your Netlify URL
1. Commit and push the change to your Git repository

![config.toml update](/images/hugo/deploy-netlify/netlify-new-site-step-7.1-update-config.png)

Once you push the change to your repository, Netlify will automatically build and deploy your site.

![hugo baseurl](/images/hugo/deploy-netlify/netlify-new-site-step-11-hugo-baseurl.png)

## Add Custom Domain (optional)

You can also set up your own domain in Netlify.  Netlify will either set up a brand new domain for you or allow you to point to an existing domain.

For the steps to set up the DNS for your site, please see the [Netlify Custom Domain Setup Docs](https://docs.netlify.com/domains-https/custom-domains/)

{{< alert class="warning" >}}
Even though Netlify can purchase the domain for you, I would highly suggest that you purchase and manage your domains through something like [dnsimple](https://dnsimple.com/r/7695fdc3a9dc82). With Dnsimple, you have complete control and ownership over your domain. Dnsimple also has several one-click setups that do the DNS setup work for you, including one for Netlify.
{{< /alert >}}

Once you have pointed your DNS at Netlify, you are ready to add your custom domain to Netlify.

1. Under the domain settings, click "Add custom domain"
1. Enter your domain in and click verify

    ![setup custom domain](/images/hugo/deploy-netlify/netlify-new-site-step-8-custom-domain.png)

1. If your domain is already registered with an external DNS provider like mentioned above, you will see the "domain already registered" warning.

    ![domain already registered](/images/hugo/deploy-netlify/netlify-new-site-step-8-custom-domain-already-registered.png)

1. Click "Add domain"

The last thing is to set up your SSL certificate. Netlify users Let's Encrypt and will create your SSL certificate.

You will see the HTTPS section at the bottom of the domain settings.

1. Expand the HTTPS section

    ![SSL setup](/images/hugo/deploy-netlify/netlify-new-site-step-9-ssl.png)

1. Click on the "Verify DNS Configuration"

    ![ssl verified](/images/hugo/deploy-netlify/netlify-new-site-step-10-ssl-verified.png)

1. Go back to your config.toml file and update the baseURL to your custom domain and push the change to git.

Your site is now deployed with a custom domain that will be re-built and re-deployed with each push to your Git repository.

In our [next post on Hugo](/blog-preview-with-netlify), we will set up a preview site that will be deployed every time a pull request is created or updated. This will allow you to test out changes before they go live in production.
