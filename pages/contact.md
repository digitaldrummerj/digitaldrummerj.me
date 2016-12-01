---
layout: page
title: "Contact"
teaser: "Have a question you want answered? Is there something you would like me to write about on the blog? Just use the form below to reach out to me.   If you are asking about a particular blog entry, please share the URL of the entry you are asking about."
permalink: "/contact/"
published: true
---


<form class="form" id="contactform" action="https://formspree.io/digitaldrummerj@gmail.com" method="POST">
    <input class="hidden" type="text" name="_gotcha" style="display:none">
    <input class="hidden" type="hidden" name="_subject" value="Message via {{site.url}}{{site.baseurl}}">
    <input type="hidden" name="_next" value="{{site.url}}{{site.baseurl}}/thankyou/" />
    <input type="hidden" name="_subject" value="{{site.url}}{{site.baseurl}} contact" />
    <div class="row">
        <div class="columns small-12">
                <label class="label" for="name"><span class="label-content">Your name</span></label>
                <input class="input" type="text" name="name" placeholder="Name" required>
        </div>
    </div>
    <div class="row">
        <div class="columns small-12">
                <label class="label" for="_replyto"><span class="label-content">Your email</span></label>
                <input class="input" type="email" name="_replyto" placeholder="example@domain.com" required>
        </div>
    </div>
    <div class="row">
        <div class="columns small-12">
            <label class="label" for="message"><span class="label-content">Comments:</span></label>
            <textarea class="input" name="message" placeholder="Message" required></textarea>
        </div>
    </div>
    <div class="row">
    <div class="columns small-12">
            <input class="button submit" type="submit" value="Send">
        </div>
    </div>
</form>