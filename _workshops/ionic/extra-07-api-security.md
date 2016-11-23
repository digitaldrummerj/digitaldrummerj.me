---
collection: workshops
title: 'Extra 7: Api Security'
published: ionicextra
type: ionicextra
layout: workshoppost2
order: 7
lab: ionic
length: 30 minutes
date: 2016-05-16
todo: |
    * Finish lab
    * update length
---

{% assign imagedir = "../images/create-api/" %}


{:.fake-h2}
Objective

{:.fake-h2}
Table of Contents

* TOC
{:toc}


## 1.0: ??


## Signup Issue

There is currently a bug in the signup sdk functon where it passes the anonymous token instead of the signup token.  When a user signs up, it cause their account to be created in the Security -> Registered Users section but it does not create the user in the Objects -> user table. This in turn does not allow the user to login with their credentials and if they try to sign up again it says that the account is already created.

The workaround the [Back&](http://backand.com) gave me is to override the security template for the user object to allow public to post (create) to the user table.  This will allow anyone to sign up and have their account created.

**Public Security Template**

Currently our api is open to any to be able to see data.  In order to accomplish this we modified the default security template to add Read into the public role.

- Add read to the public row

![Public Security Template]({{"public-security-template.png" | prepend: imagedir }})

**User Security Template**

We want to allow anyone to create a user but only allow logged in users to query anything from the users table.

- add create to public and readonly
- remove read from public and readonly


![User Security Template]({{"user-security-template.png" | prepend: imagedir }})

**User Object Security Template**

Once the templates are set correctly, we need to update the user object to use the new user security template.

![User Object Security Template Override]({{"user-security-override.png" | prepend: imagedir }})