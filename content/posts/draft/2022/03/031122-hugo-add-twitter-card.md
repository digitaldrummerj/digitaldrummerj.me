---
categories: ["hugo", "blogging"]
date: 2022-03-11T13:00:00Z
published: false
title: "Hugo - Add Preview When Sharing to Twitter"
url: '/hugo-preview-when-sharing-twitter'
series: ['Blogging With Hugo']
---

When you share your blog post on Twitter, you can attach photos, videos and media experiences to Tweets, which helps to drive traffic to your site.

This is called a Twitter card and looks like:

![twitter card example](/images/hugo/twitter-card/example.png)

There are two types of Twitter Cards that we are concerned with for our site

1. [Summary Card](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/summary):  Title, Description, and Thumbnail (optional)
1. [Summary Card with Large Image](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/summary-card-with-large-image): Similar to the Summary Card but with a prominently featured image

<!--more-->

To create the Twitter card, you need a bit of HTML in the `<head>` of your site.

```html
<meta name="twitter:card" content="summary"/>
<meta name="twitter:title" content="Hugo - Add Contact Form Using Formspree"/>
<meta name="twitter:description" content="When creating your blog, it is a good idea to have a contact me form.  With static sites though you do not have server side processing available to send you an email with from the contact me form submission. To overcome not having server side processing available, we are going to use Formspress. Formspree is free for up to 50 submissions per month."/>
<meta name="twitter:site" content="@digitaldrummerj"/>
```

## Summary Card

Luckily, for us, Hugo has an internal template to generate the Twitter card and you just need to include it in the `<head>` of your site.  By default, the Hugo template will create a summary card without any images but in the next section we will go through how you can include images.

```go-html-template
{{ template "_internal/twitter_cards.html" . }}
```

Once you have deployed, your site, you can test the Twitter card using [https://cards-dev.twitter.com/validator](https://cards-dev.twitter.com/validator)

## Summary Card with Large Image

When you include an image in your Twitter card, Hugo will make your Twitter card a large image Twitter card.

> The Hugo internal template does not support a small summary card with a thumbnail. If you want a summary card with a thumbnail, you can create your own Twitter card template based on the [Hugo Twitter card template source code](https://github.com/gohugoio/hugo/blob/master/tpl/tplimpl/embedded/templates/twitter_cards.html)

The summary card with large image look like:

![example with image](/images/hugo/twitter-card/example-with-image.png)

In order to include an image, Hugo looks in a number of places to find the image

1. First Hugo looks in your post front matter for an images value (`images: [""]`)
1. Then Hugo searchs for image page resources with feature, cover or thumbnail in their name.  These are images files under a directory that matches the post (e.g. content\posts\first-post\)
1. If not images are found, Hugo looks for images (`images: [""]`) in your site config
1. If no image if found, then an image-less  Twitter `summary` card is used instead of summary_large_image

To learn more about Twitter cards, check out their [docs](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards).

Now when you share a post from your site on Twitter, it will give the Twitter Card preview instead of just the link.
