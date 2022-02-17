---
categories: ["blogging", "hugo", "netlify"]
date: 2022-02-16T13:00:00Z
published: false
title: "Deploy Preview Release of Site Using Netlify"
url: '/blog-preview-with-netlify'
---
In our previous post on [Deploying Your Hugo Site Using Netlify](/deploy-hugo-netlify), we set up Netlify to automatically deploy our site every time we pushed a commit to our GitHub repository. As well, we set up a custom domain for our site.

In this post, we will look at the preview deploy feature of Netlify to build and deploy to a preview/staging site when we create or update a pull request.

When you create a new Netlify site, a preview site is set up out of the box to build every time you create or update a pull request. The build configuration will match the configuration of your production site. It is fantastic that Netlify set this up for us. However, to take full advantage of having a preview site, it would be helpful to include future and draft posts to make sure they look right before publishing the post to production. It would also be nice to be able to test new versions of Hugo in a preview environment before updating production.

<!--more-->

Before we dive into how to have different configurations for your preview site, let us verify that you indeed have the preview builds turned on.

1. Login to Netlify
1. Under the Sites section, click on your site
1. Under your site, click on the site settings

    ![site settings button](/images/hugo/deploy-netlify-preview/netlify-preview-step-1.png)

1. On the side menu, select Build & Deploy and then Continuous Deployment

    ![build & deploy section on sidebar](/images/hugo/deploy-netlify-preview/netlify-preview-step-2.png)

1. Scroll down to the **Deploy Previews** section and click on **Edit settings**

    ![deploy previews section under build & deploy](/images/hugo/deploy-netlify-preview/netlify-preview-step-3.png)

1. Under the Deploy Previews settings, you should see that it is set for "Any pull request against your production branch / branch deploy branches" and the Netlify Drawer is set to Enabled (more on Netlify Drawer later in this post)

    ![deploy previews settings](/images/hugo/deploy-netlify-preview/netlify-preview-step-4.png)

1. Click Save on the Deploy Previews settings

## Configure Netlify Builds

Now that we have confirmed that our preview builds are enabled, let's look at how to have different build settings for production vs. preview.

To have different settings, we will create a file in the root of our site named netlify.toml. The netlify.toml file will set the build command and hugo version for each environment.

1. First in the netlify.toml file, we need to add the configuration to set the default publish directory, the build command, and the hugo version to use.

    ```toml
    # This will be your default build command
    [build]
    publish = "public"
    command = "hugo --gc --minify"

    [build.environment]
    HUGO_VERSION = "0.92.1"
    HUGO_ENV = "production"
    HUGO_ENABLEGITINFO = "true"
    ```

1. Now, let's set our preview deployment to have a different build command that will build future posts, draft posts, and update the baseUrl to our preview url so that any links that reference the baseURL continue to work.

    ```toml
    # This will be your preview build
    [context.deploy-preview]
    command = "hugo --config config.toml,config-prod.toml --buildFuture --buildDrafts --gc --minify -b $DEPLOY_PRIME_URL"
    ```

1. We can also set different environment variables and override the default ones

    ```toml
    [context.deploy-preview.environment]
    HUGO_VERSION = "0.92.1"
   ```

Now our production deployment will only include published posts, while our preview deployment will include future and draft posts.

The last thing to look at is what is the Netlify Drawer option that we saw earlier.

![Netlify bar in preview](/images/hugo/deploy-netlify-preview/netlify-preview-netlify-bar.png)

![Netlify sidebar integrations in preview](/images/hugo/deploy-netlify-preview/netlify-preview-integrations.png)

![Netlify activity section in sidebar in preview](/images/hugo/deploy-netlify-preview/netlify-preview-activity.png)

![Netlify new issue section in sidebar in preview](/images/hugo/deploy-netlify-preview/netlify-preview-new-issue.png)

In our next post on Hugo, we will look at how you can create a staging site that matches the configuration of our production deployment.
