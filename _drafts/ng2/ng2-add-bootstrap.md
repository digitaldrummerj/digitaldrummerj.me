---
layout: post
title: Angular - Adding Bootstrap Library
date: 2017-01-06 06:00
categories: ['angular']
published: true
series: angular2-getting-started
excerpt: |

---

{% assign imagedir = "/images/angular2-add-bootstrap/" | prepend: site.baseurl | prepend: site.url %}


Welcome to the continuing series on Getting Started with Angular 2.  In the previous post, we created our project using the Angular CLI.  In this post, we will be continuing to use the project we generated and add the [Bootstrap](http://getbootstrap.com) library to make it easier to style our application.  We are going to use the [ng2-bootstrap](https://valor-software.com/ng2-bootstrap/) library which includes all of the components from the [Bootstrap](http://getbootstrap.com) library as well as several useful components like: date picker, time picker, rating, and typeahead.  The [ng2-bootstrap](https://valor-software.com/ng2-bootstrap/) library works with both [Bootstrap](http://getbootstrap.com) v3 and v3.

1. Open a command prompt and navigate to your project directory
1. Run the npm install command below to install ng2-bootstrap and bootstrap-sass

    npm install bootstrap-sass ng2-bootstrap --save


**File: angular-cli.json**

```json
  "styles": [
        "styles.scss",
        "../node_modules/bootstrap-sass/assets/stylesheets/_bootstrap.scss"
      ],
```

**File: src\app\app.component.html**

```html
<div class="container">
  <div class="page-header">
    <h1>
      {{title}}
    </h1>
  </div>
</div>
```