---
categories: ["blogging", "hugo", "netlify"]
date: 2022-02-15T13:00:00Z
published: false
title: "Deploy Hugo Site to Netlify"
url: '/deploy-hugo-netlify'
---

In our previous post on [Creating a Blog Using Hugo](/create-blog-with-hugo/) we installed Hugo, create a new site, added a theme to the site and created our first post.  

In this post, we will be deploying the site that we created using a free account at [Netlify](https://www.netlify.com/).  The site will be re-built and re-deployed whenever we push a new commit to our sites Git repository.  We will also look at how to setup our site using our own domain and creating an SSL certificate for the site.

<!—more—>

A question that comes up a lot when I talk about deploying static sites like Hugo is, why not just use GitHub Pages?

This is a great question.  While GitHub Pages does allows us to deploy our site with a custom domain and SSL, what it does not allow us to do is deploy a staging or preview version of the site to test out changes before making them live.  Netlify gives us the ability to create a preview site for each pull request which I use as a way to see what my future and draft post will look like on a machine other than my laptop.  As well Netlify allows us to deploy a branch to a subdomain, allows multiple domains pointing to a single site, unlimited websites, and rollback to a previous buuld.  All of this can be done with the free tier of Netlify. 

## Create Netlify Account

The first thing we need to do is create a Netlify account if you do not have one already.  

Head over to [Netlify sign up](https://app.netlify.com/signup) page.  

> I personally signed up with my GitHub account.

![netlify sign up](/images/hugo/deploy-netlify/netlify-signup.png)

## Import project

Now that we have our Netlify account created we are ready to add our site to Netlify.

1. Once logged into your Netlify account, click on the "Add New Site" and select "Import Project"

    ![add new site](/images/hugo/deploy-netlify/netlify-new-site-step-1-add-new-site.png)

1. Click on your Git provider

    ![import a project into Netlify](/images/hugo/deploy-netlify/netlify-new-site-step-2-import-project.png)

1.  Pick your sites repository 

    ![netlify pick repository to deploy from Github](/images/hugo/deploy-netlify/netlify-new-site-step-3-pick-repo.png)

1.  For the  uild command, use the following to build, clean up resources and minify output

    ![hugo build command for deploy](/images/hugo/deploy-netlify/netlify-new-site-step-4-build-command.png)

    ```cmd
    hugo --gc --minify
    ```

    > --gc cleans up the generated resource to remove anything old
    >
    > --minify will minify things it can like HTML

Our site is now setup in Netlify and Netlify ran our first deployment for us. 

## Url for Site

Netlify will auto assign a url to our sir for us.  We can change the url to something we can remember or we can hooked up our own domain to the site.

After importing the repository, Netlify will take you to the site details where you can see the url of the site and the deployments that have been done. 

![url netlify assigned](/images/hugo/deploy-netlify/netlify-new-site-step-5-url.png)

![production deployments list](/images/hugo/deploy-netlify/netlify-new-site-step-6-production-deploys.png)

Your can change the name of you want by 

1. Clicking on the domain settings
1. Clicking the options next to the domain name
1. Clicking the Edit Name 

![edit netlify app](/images/hugo/deploy-netlify/netlify-new-site-step-7-edit-netlify-app.png)

The last thing we need to do is fix the asset references on our site.  Right now our config.toml file says base url is example.org.  We need to update this to our Netlify url.

1. Open the config.toml file rhat is in rhe root of our site 
1. Find the baseurl parameter and update it to your Netlify url
1. Commit and push the change to your Git repository 

One your push the change to your repository, Netlify will automatically build and deploy your site.

![hugo baseurl](/images/hugo/deploy-netlify/netlify-new-site-step-11-hugo-baseurl.png)

## Add Custom Domain (optional)

You can also setup your own domain in Netlify.  Netlify will either setup a brand new domain for you or allow you to point an existing domains DNS at Netlify.

For the steps to setup the DNS for your site, please see the [Netlify Custom Domain Setup Docs](https://docs.netlify.com/domains-https/custom-domains/)

{{< alert class="warning" >}}
Even though Netlify, can purchase the domain for you, I would highly suggest that you purchase   and manage your domains through something like [dnsimple](https://dnsimple.com/r/7695fdc3a9dc82).  With Dnsimple, you have full control and ownership over your domain.  Dnsimple also has a number of one click setups that do the DNS setup work for you including one for Netlify.
{{< /alert >}}

Once you have pointed your DNS at Netlify, yoi are ready to add your custom domain to Netlify.

1. Under the domain settings, click "Add custom domain"
1. Enter your domain in and click verify

    ![setup custom domain](/images/hugo/deploy-netlify/netlify-new-site-step-8-custom-domain.png)
    
1. If your domain is already registered with an external DNS provider like mentioned above, you will see the "domain already registered" warning.

    ![domain already registered](/images/hugo/deploy-netlify/netlify-new-site-step-8-custom-domain-already-registered.png)
    
1. Click "Add domain"

The last thing to do is setup your SSL certificate .  Netlify users Let's Encrypt and will create your am SSL certificate.

At the bottom of the domain settings you will see the HTTPS section.  

1. Expand the HTTPS section

    ![SSL setup](/images/hugo/deploy-netlify/netlify-new-site-step-9-ssl.png)
    
1. Click on the "Verify DNS Configuration"

    ![ssl verified](/images/hugo/deploy-netlify/netlify-new-site-step-10-ssl-verified.png)

Your site is now deploy with a custom domain and will be re-built and rede ploy ed 2 reach push to your Git repository.  

In our next post on Hugo, we will setup a preview site that will be built every time a pull request is created or updated. This will allow you to test out changes before they go live in production.