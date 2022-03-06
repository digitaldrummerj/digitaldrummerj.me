---
categories: ["blogging", "hugo"]
date: 2022-03-05T13:00:00Z
published: true
title: "Hugo - Add Contact Form Using Formspree"
url: '/hugo-contact-form-formspree'
series: ['Blogging With Hugo']
---

When creating your blog, it is a good idea to have a contact me form.  With static sites though you do not have server side processing available to send you an email with from the contact me form submission.

To overcome not having server side processing available, we are going to use [Formspress](https://formspree.io/).

> Formspree is free for up to 50 submissions per month.

<!--more-->

First thing you need to do is sign up for a Formspree account at [https://formspree.io/register](https://formspree.io/register).

Once you have your account created, you need to create a form at [https://formspree.io/forms](https://formspree.io/forms)

![create new form](/images/hugo/contact-form/create-new-form.png)

Once you create the form, Formspree will give you this page that gives you several code options for the form.  For my site, I am using the HTML option.

![form code options](/images/hugo/contact-form/form-info.png)

Now that we have our Formspree form created, we need to create our contact us page.

1. Create content\search.md
1. Add the front matter to define the title and layout

    ```markdown
    ---
    title: "Contact"
    layout: "contact"
    ---

    Have a question you want answered? Is there something you would like me to write about on the blog? Just use the form below to reach out to me.   If you are asking about a particular blog entry, please share the URL of the entry you are asking about.
    ```

1. To create the layout, create the file layouts\page\contact.html
1. On the contact.html page, add the following code to add the contact page content and then replace the comment with the HTML for Formspree.

    ```go-html-template
    {{ define "main" }}
    <div class="container">
        <div class="row">
            <div class="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
                {{ .Content }}
                <!-- Formspree Html Here -->
            </div>
        </div>
    </div>
    {{ end }}
    ```

## reCAPTCHA Spam Filtering

reCAPTCHA utilizes machine learning to distinguish between humans and automated "bots" with just a single click.

By default, reCAPTCHA is turned off. To turn it on go under the from settings and turn on  reCAPTCHA.

![reCAPTCHA example](/images/hugo/contact-form/reCAPTCHA.png)

## Honeypot Spam filtering

Sometimes you can fool automated form scrapers by adding a hidden "honeypot" input with the name _gotcha. This is an input field that normal visitors won't fill out because it's hidden with CSS. However an algorithm scraping forms might not know to ignore the field, and might fill it with spammy content.

When Formspree receives a submission with the _gotcha field filled in then Formspree assume a bot submitted the form and they silently ignore the submission.

Add this input field to your form to turn on Honeypot Spam Filtering

```html
<input type="text" name="_gotcha" style="display:none" />
```

Now when you go to /contact and submit the form it will email you the form submission.
