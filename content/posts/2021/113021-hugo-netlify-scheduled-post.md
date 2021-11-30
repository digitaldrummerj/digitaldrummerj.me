---
categories: ["hugo"]
date: 2021-11-30T12:00:00Z
published: true
url: "/hugo-scheduled-post"
title: Schedule Post with Hugo and Netlify
---

Being able to schedule a post is one of the features that I miss when using Hugo for a site.

Out of the box, Hugo has no way to schedule a post as it is a static site generator which means that when you build the site the html is generated and only updated when you build the site again.

The manual workaround for the scheduling of post is to create a published post with a future date on it and then on that day, rebuild and redeploy your site.  Even though this works, it depends on me to remember to do it vs it being automatic which is what I personally want.  I do not want to have to remember to build and deploy the site on the day that I want a post to be published.  If it depends on me, then changes are that I am going to forget or get busy and the post won't get published when it is supposed to be.

Luckily, since I am already using Netlify to build my Hugo site and with the code for the site residing on Github, I can easily create a scheduled Github action that triggers the Netlify build for me.

<!--more-->

The Github action will run on a set schedule.  For this site, I decide to have it run every day at 6 am PST.  This allows me to publish a post 7 days a week if I needed to.  I am using the free tier of both Github and Netlify but since the builds run so quickly (< 60 seconds), I am not worried about running out of build hours.

Also, the reason that we need to use a Github action instead of just directly scheduling the build in Netlify is that at this time, Netlify does not have the ability to schedule a build.  However, Netlify does allow you to trigger a build with a REST POST call.  This means thst we can create a Github action that use curl to make this POST call.

To make all of this work, in Netlify we need to add the build hook that allow us to make the post call, then we need to setup a Github secret with the Netlify token for the build hook, and finally we need to create the Github action that calls the Netlify build hook and gets the token from the Github secrets.

## Setup Netlify Build

> I am assuming that you already have your Netlify build working to build and deploy your Hugo site.

To enable a Netlify build to be triggered using a REST POST command, we need to add a build hook.

1. In Netlify under your site that you want to trigger the build for go toSite Settings -> Build & Deploy -> Continuous Deployment
1. Find the Build Hooks section.
1. Click the “Add Build Hook” button
1. Give the build a name such as “Github Scheduled Build”
1. Pick the Branch to Build (typically main)
1. Click the Save button

After you save the build hook, Netlify will give you a url for the build such as `https://api.netlify.com/build_hooks/123456789` where the 123456789 is the Netlify token for the build that we will add into our Github secrets.

It will also allow you to trigger the build from the command line using `curl -X POST -d {} https://api.netlify.com/build_hooks/123456789`

> The token should be kept in your build secrets and not stored with your code or Github action.

We are now ready to head over to Github to setup our secret for the Netlify token.

## Stores Netlify Token in GitHub

In Github, go to the repository for your Hugo site and then:

1. Click on Settings
1. Click on secrets
1. Click the "New repository secret" button
1. Give it a name. In the example Github action below, I called the secret for the token, NETLIFY_CRON_BUILD_HOOK
1. Copy the Netlify token to the value field
1. Click the Add Secret button

Now you are ready to create the Github action to call the Netlify build hook to trigger the build.

## Create GitHub Action

The Github action is pretty simple.  It runs every day at 6 am PST (1 pm UTC) and calls the Netlify build hook.

> **Note:** Github scheduled actions run in UTC time

To create the Github action follow these steps:

1. Under your Hugo site, create a directory named .github/workflows
1. In the workflows directory, create a file named schedule.yml
1. Copy the following code to the schedule.yml file

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

1. Commit and push the .github directory

Now your Hugo site will be updated every day at 1 pm UTC (6 am PST) when the Github action runs.

## Create Post To Be Scheduled

Now that we have the Github action, to create a scheduled post, all you need to do is set the meta data on the post for published to true and the date of the post to be on the day in the future that you want the post to go live (make sure the time is before 6 am PST).

Here is an example of the data for this post that will be published on November 24, 2021 at 12 pm

```yml
—
categories: [“hugo”]
date: 2021-11-24T12:00:00Z
published: true
title: Schedule Post with Hugo and Netlify
—
```

Now you can schedule your post on your Hugo based site.
