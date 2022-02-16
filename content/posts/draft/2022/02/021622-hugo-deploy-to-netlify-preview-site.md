---
categories: ["blogging", "hugo", "netlify"]
date: 2022-02-16T13:00:00Z
published: false
title: "Deploy Preview Release of Site Using Netlify"
url: '/blog-preview-with-netlify'
---
In our previous post on Deploying Your Hugo  Site Using Netlify, we set up Netlify to automatically deploy our site everytime we pushed a commit to our GitHub repository and set up a custom domain to point to the site.

In this post, we are going to look at the preview deploy feature of Netlify to build and deploy to a preview/staging site when we create or update a pull request.

Creating a preview of your site using Netlify is setup out of the box to build everytime you create our update a pull request.


![site settings button](/images/hugo/deploy-netlify-preview/netlify-preview-step-1.png)

![build & deploy section on sidebar](/images/hugo/deploy-netlify-preview/netlify-preview-step-2.png)

![deploy previews section under build & deploy](/images/hugo/deploy-netlify-preview/netlify-preview-step-3.png)

![deploy previews settings](/images/hugo/deploy-netlify-preview/netlify-preview-step-4.png)

## Configure Netlify Builds

```toml
# This will be your default build command
[build]
publish = "public"
command = "echo 'default context'"

# This will be your production build
[context.production]
command = "hugo --config config.toml,config-prod.toml --gc --minify"

[context.production.environment]
HUGO_VERSION = "0.92.1"
HUGO_ENV = "production"
HUGO_ENABLEGITINFO = "true"

# This will be your preview build
[context.deploy-preview]
command = "hugo --config config.toml,config-prod.toml --buildFuture --buildDrafts --gc --minify -b $DEPLOY_PRIME_URL"

[context.deploy-preview.environment]
HUGO_VERSION = "0.92.1"

[context.next.environment]
HUGO_ENABLEGITINFO = "true"
```