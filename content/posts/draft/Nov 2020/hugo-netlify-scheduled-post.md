---
categories: ["hugo", "github"]
date: 2021-11-24T00:00:00Z
publish: false
title: Schedule Post with Hugo and Netlify
---

Out of the box, there is no way to schedule a post with Hugo as it is a static site generator creates the content at the time of build.  Yes, you can tell Hugo to make a post in the future but that post will not show up until you build and deploy the site again.  This means that I have to remember on the day that I want to publish a post to build and deploy my site whereas I would prefer to have an automated process that does this for me.  I am hosting my site using Netlify and when I push to my Github repo it will build and deploy the site but Netlify does not have the ability to schedule a build either.  Luckily, with Github, I can create a simple Github action that runs daily and calls to Netlify to re-build and deploy my site.

<!--more-->

Scheduling post is one of the features that I miss when not using something like Wordpress.

```yml
name: Daily Schedule

on:
  schedule:
    - cron: "0 6 * * *"

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Trigger our build webhook on Netlify
        run: curl -s -X POST "https://api.netlify.com/build_hooks/${TOKEN}"
        env:
          TOKEN: ${{ secrets.NETLIFY_CRON_BUILD_HOOK }}
```