---
categories: ["blogging"]
date: 2018-01-16T00:00:00Z
published: true
title: 'Automatically Tweet New Blog Post'
---

After each blog post is published, we need to let people know that a new post is published.  We can't expect people to only find out about the new post through the RSS feed.  For this blog, I tweet out that I have a new blog post.  However, I don't want to have remember to send out the tweet because I will forget or get busy with something else.  Instead, sending out a tweet should be done for me.

To automate the process we are going to use Zapier to monitor the RSS feed for new post and then add it to [Buffer](https://buffer.com).  I use [Buffer](https://buffer.com) as a way to schedule tweets to go out at specific times throughout the day.

I could have also used [IFTTT](http://ifttt.com) but they do not have the ability to submit to the top of the [Buffer](https://buffer.com) list, so instead I would either have to have my post wait in the buffer list along with everything else I am retweeting or would have to immediately send it to Twitter.   This wasn't the desired functionality that I wanted.

If you haven't heard of either of these systems before they both work pretty much the same way.   They monitor something and then take action when it changes.  They both have hundreds of task that you can automate against  a variety of different systems like Trello, Github, Google Sheet, etc.

You will need an account in order to use these systems.  Both of them are free but Zapier limits the number of automated task to 5 and the number of times it can run to 100 times per month.  IFTTT does not appear to have any limits.

Both systems work extremely well it is just a matter of which system has the ability to interact with the system you trying to automate.

## Setting up Zapier

1. Sign up for a free Zapier account at [https://zapier.com/sign-up](https://zapier.com/sign-up)
1. Click on the ![Make a Zap](/images/tweet-new-post/make-a-zap.png) button. **Note:** Zaps are their name for the automated task

1. Search for RSS as the App Name and select RSS by Zapier from the results.

    ![](/images/tweet-new-post/search-rss.png)

1. Select New Item In Feed

    ![](/images/tweet-new-post/new-item-in-feed.png)

1. Click the ![save and continue](/images/tweet-new-post/save-continue.png) button
1. Input your RSS feed url

    ![](/images/tweet-new-post/feed-url.png)

1. Leave everything else with the defaults and click the ![continue](/images/tweet-new-post/continue.png) button

1. Click the ![fetch and continue](/images/tweet-new-post/fetch-continue.png)

1. If everything with the feed setup is correct you will get a successfully message

    ![](/images/tweet-new-post/fetch-continue-test-successful.png)

1. Click the ![continue](/images/tweet-new-post/continue.png) button

1. Search for buffer as the App Name and select Buffer from the results.

    ![](/images/tweet-new-post/search-buffer.png)

1. Select the Add to Buffer option

    ![](/images/tweet-new-post/add-to-buffer.png)

1. Click the ![save and continue](/images/tweet-new-post/save-continue.png) button

1. Select your Buffer Account or click the ![connect to account](/images/tweet-new-post/connect-buffer-account.png)

1. For the profile drop down select your Twitter profile

    ![](/images/tweet-new-post/twitter-profile.png)

1. For the text field, input what you want your new post tweet to say. The important piece to add into the text field is the link to the new blog post.
1. To add the link, click on the ![plus](/images/tweet-new-post/plus-button.png) and select the link option

    ![](/images/tweet-new-post/blog-link.png)

1. For my text field, it looks like

    ![](/images/tweet-new-post/text-field.png)

1. For top? field select yes to put your new blog post tweet at the top of your Buffer queue.

    ![](/images/tweet-new-post/top-field.png)

1. Click the ![continue](/images/tweet-new-post/continue.png) button

1. Click the ![send test to buffer](/images/tweet-new-post/send-to-buffer.png) button
1. If everything is working, you should see a test successful message

    ![](/images/tweet-new-post/send-to-buffer-successful.png)

1. Also, go to buffer and verify that a new post has been added to the buffer queue.  You will also want to delete the new post from your buffer queue

    ![](/images/tweet-new-post/new-post-test.png)

1. Click the ![finish](/images/tweet-new-post/finish.png) button

Zapier is now setup to put a tweet at the top of your Buffer queue whenever you publish a new blog post into your RSS feed.
