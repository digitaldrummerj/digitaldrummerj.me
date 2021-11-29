---
categories: ["hugo"]
date: 2021-11-29T13:00:00Z
published: false
title: Schedule Post with Hugo and Netlify
---

Being able to schedule a post is one of the features that I miss when using a Hugo for a site (including this one).

Out of the box, Hugo has no way to schedule a post as it is a static site where the content is only updated when the site it built and deployed.  You can make a post with a future date but that post will not show up until you re-build and deploy the site again.

This means that I have to remember on the day that I want to publish a post to build and deploy my site whereas I would prefer to have an automated process that does this for me.

Luckily, with a combination of Netlify builds and Github scheduled actions you can have scheduled post.

<!--more-->

Since I am hosting this site using Netlify with the code residing on GitHub, I already have a build and deploy process in Netlify every time I push to the main branch in Github.  Unfortunately, Netlify does not have the ability to schedule a build but Netlify does allow you to trigger a build with a curl POST call.  This means thst we coild create a Github action that can make this POST call on a schedule to allow us to have post show up on a schedule.

## Setup Netlify Build

> I am assuming that you already have your Netlify build working to build and deploy your Hugo site.

To enable a Netlify build to be triggered using a curl POST command, we need to add a build hook under the Site Settings -> Build & Deploy -> Continuous Deployment in the Build Hooks section.

1. Click the “Add Build Hook” button
1. Give the build a name such as “Github Scheduled Build”
1. Pick the Branch to Build (typically main)
1. Click the Save button

After you save the build hook, Netlify will give you a url for the build such as `https://api.netlify.com/build_hooks/TOKEN` where the TOKEN is the actual value to use so that netlify knows what build to trigger.

It will also allow you to trigger the build from the command line using `curl -X POST -d {} https://api.netlify.com/build_hooks/TOKEN`

> The token should be kept in your build secrets and not stored with your code or Github action.

## Stores Netlify Token in GitHub

For the Github action, the Netlify token should be  store as a secret for the build.

To create a Github repository secret:

1. Go to the repository on Github
1. Click on Settings
1. Click on secrets
1. Click New repository secret button
1. Give it a name. In the example Github action below, I called the secret for the token, NETLIFY_CRON_BUILD_HOOK.
1. Copy the build token to the value field
1. Click the Add Secret button

Now you are ready to create the Github action to call the Netlify build hook to trigger the build.


##  Create GitHub Action

The Github action is pretty simple.  It runs every day at 6 am PST (1 pm UTC) and calls the Netlify build hook.  The only slightly complicated piece is to setup an environment variable that contains the secret that we created in the last section.
 
> Note that Github actions run in UTC time

To create the Github action follow these steps:

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

1.  Commit and push the .github directory 

Now your Hugo site will be updated every day at 1 pm UTC (6 am PST) when the Github action runs.

## Create Post To Be Scheduled

Now that we have the Github action it is really easy to schedule a post.  All you need to do is set the meta data on the post for published to true and the date of the post to be on the day you want itnto go live and the time to be before 6 am PST.

Here is an example of the data for this post that will be published on November 24, 2021 at 12 pm UTC
  
```yml
—
categories: [“hugo”]
date: 2021-11-24T12:00:00Z
published: true
title: Schedule Post with Hugo and Netlify
—
```

Now you can schedule your post om your Hugo based site. 

