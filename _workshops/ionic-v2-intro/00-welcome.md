---
title: 'Ionic v2 Introduction Workshop'
published: true
layout: workshoppost2
permalink: '/workshops/ionic-v2-intro/index'
type: ionic-v2-intro
ishome: true
date: 2016-12-03
ready: false
excerpt: |
    This workshop will introduce you using the Ionic Framework to build a hybrid mobile application that you can release through the Apple, Google and Microsoft stores.  The workshop will be a mix of lecture to introduce concepts and then a lab to reinforce those concepts.   By the end of this workshop you will have a completed application that stores its data in the Cloud and is ready to be deployed to devices.
todo: |

---

Welcome to my [Ionic v2](http://ionicframework.com) workshop.  This workshop is designed to be a hands-on all day workshop.  There will be a mix of lecture to introduce concepts and then a lab to reinforce those concepts.

  By the end of this workshop you will have a completed application that stores its data in the Cloud and is ready to be deployed to devices.

> Note that the workshop can be modified to run as a half day workshop as well.

For these labs to work you need to setup your machine for [Ionic](http://ionicframework.com) development.  The instructions do vary depending on if you are on Windows or Mac.  Linux is supported for development but we are not going to be using it in this workshop.

<div class="more-link">
<p>

{% assign filtered = (site.workshops | where: "type", page.type | order: 'title') %} 
{% for lab in filtered %}
{% if lab.type == page.type and lab.order == 1 %}
<a href="{{site.baseurl}}{{lab.url}}">Start {{lab.title}} &raquo;</a>
{% endif %}
{% endfor %}
</p>
</div>
