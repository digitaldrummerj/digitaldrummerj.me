---
categories: ["hugo", "blogging"]
date: 2022-03-10T13:00:00Z
published: true
title: "Hugo - Add Google Analytics"
url: '/hugo-google.analytics'
series: ['Blogging With Hugo']
---

It is really helpful to understand how your site is performing with respect to which posts are getting the most views, how long are people  staying on your site, where in the world they are viewing your site from and where did your traffic come from.

To get analytics for this site, I am using Google Analytics which is free.

In this post, we will enable Google Analytics on our Hugo site.

<!--more-->

## Create Your Google Analytics Account

The first thing you need to do is setup your Google Analytics account.

1. Create an Analytics account at [https://www.google.com/analytics/](https://www.google.com/analytics/)
   1. To create an account, click Get started today
   1. If you already have a Google Analytics account, click Sign in to Analytics
1. Set up your "Property", give it a name, and point it to the URL of your site you plan on tracking
1. You should see a measurement id on the property settings.  If you do not, check out the [Google help doc](https://support.google.com/analytics/answer/9539598?hl=en&ref_topic=9303319)

## Configure Hugo

Thankfully, Hugo has a built-in template for Google Analytics.  To use the template, we need to include it in our page and add our measurement id to our config file.

### Header

In our header file (e.g. where the `<head>` tag is), we need to add the following code to render the Google Analytics code

```go_html_template
{{ template "_internal/google_analytics.html" . }}
```

### Hugo Config

In your config.toml file we need to add our Google Analytics measurement id.

At the top level of your config.toml file, you need to add the following line.

```toml
googleAnalytics = "G-1234567890"
```

> Replace `G-1234567890` with your Google Analytics measurement id.

Once you rebuild your site, everything should work.

**Note:** You will be tracking on all urls since the googleAnalytics value in your config.toml is not empty.  To only track on your production url, you can run Hugo with [multiple configuration files](https://gohugo.io/getting-started/configuration/) and only populate the googleAnalytic value in your production configuration.
