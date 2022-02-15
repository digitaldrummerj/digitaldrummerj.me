---
categories: ["blogging", "hugo", "netlify"]
date: 2022-02-15T13:00:00Z
published: false
title: "Deploy Our Hugo Blog to Netlify"
url: '/deploy-hugo-netlify'
---

In our previous post on [Creating a Blog Using Hugo](https://digitaldrummerj.me/create-blog-with-hugo/) we created our blog website.  In this post, we will be deploying the website that we created using a free account at [Netlify](https://www.netlify.com/).

We could deploy our website using Github Pages as well but one of the features that [Netlify](https://www.netlify.com/) has that I use a ton is creating a preview site for each pull request.  This allows me to test site changes in a staging/preview environment before I merge the pull request and make them live in production.

<!--more-->

## Create Netlify Account

[Netlify sign up](https://app.netlify.com/signup)

![netlify sign up](/images/hugo/deploy-netlify/netlify-signup.png)

## Import project

![create netlify account](/images/hugo/deploy-netlify/netlify-new-site-step-1-add-new-site.png)

![import a project into Netlify](/images/hugo/deploy-netlify/netlify-new-site-step-2-import-project.png)

![netlify pick repository to deploy from Github](/images/hugo/deploy-netlify/netlify-new-site-step-3-pick-repo.png)

![hugo build command for deploy](/images/hugo/deploy-netlify/netlify-new-site-step-4-build-command.png)

```cmd
hugo --gc --minify
```

> --gc cleans up the generated resource to remove anything old
> -- minify will minify things it can like HTML

![url netlify assigned](/images/hugo/deploy-netlify/netlify-new-site-step-5-url.png)

![production deployments list](/images/hugo/deploy-netlify/netlify-new-site-step-6-production-deploys.png)

![edit netlify app](/images/hugo/deploy-netlify/netlify-new-site-step-7-edit-netlify-app.png)

![hugo baseurl](/images/hugo/deploy-netlify/netlify-new-site-step-11-hugo-baseurl.png)

## Add Custom Domain (optional)

> [Custom Domain Setup Docs](https://docs.netlify.com/domains-https/custom-domains/)

![setup custom domain](/images/hugo/deploy-netlify/netlify-new-site-step-8-custom-domain.png)

![domain already registered](/images/hugo/deploy-netlify/netlify-new-site-step-8-custom-domain-already-registered.png)

![SSL setup](/images/hugo/deploy-netlify/netlify-new-site-step-9-ssl.png)

![ssl verified](/images/hugo/deploy-netlify/netlify-new-site-step-10-ssl-verified.png)

