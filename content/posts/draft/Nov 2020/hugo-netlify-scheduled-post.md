---
categories: ["hugo", "github"]
date: 2021-11-24T00:00:00Z
publish: false
title: Schedule Post with Hugo and Netlify
---

Being able to schedule a post is one of the features that I miss when using a Hugo for a site (including this one).

Out of the box, Hugo has no way to schedule a post as it is a static site where the content is only updated when the site it built and deployed.  You can make a post with a future date but that post will not show up until you build and deploy the site again.  

This means that I have to remember on the day that I want to publish a post to build and deploy my site whereas I would prefer to have an automated process that does this for me.  

Since I am hosting this site using Netlify with the code residing on GitHub, we can use Netlify builds and Github actions to essentially allow us to schedule a post.

<!--more-->

I already have a Netlify build that runs whenever a commit is pushed to the main branch in GitHub.  Unfortunately, Netlify does not have the ability to schedule a build.  However,since we are using Github, we can create a simple Github action that runs daily and calls to Netlify to re-build and deploy the site even if nothing has been pushed to Github.

##  Setup Netlify Build

## Stores Netlify Token in GitHub

##  Create GitHub Action

The first thing we are going to do in create a scheduled Github action that runs daily at 1 pm UTC.

> Github actions run in UTC time.

1. Create a directory named .github/workflows
1. Create a file named schedule.yml
1.  Copy the following code to the schedule.yml file

```yml
name: Daily Schedule

on:
  schedule:
    - cron: "* 13 * * *"

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Trigger our build webhook on Netlify
        run: curl -s -X POST "https://api.netlify.com/build_hooks/${TOKEN}"
        env:
          TOKEN: ${{ secrets.NETLIFY_CRON_BUILD_HOOK }}
```

Now your Hugo site will be updated every day at 1 pm UTC (5 am PST).

