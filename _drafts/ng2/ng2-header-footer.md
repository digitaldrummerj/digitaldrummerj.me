---
layout: post
title: Angular 2 - Add Header and Footer
date: 2017-01-18 05:00
categories: ['angular']
published: true
series: angular2-getting-started
excerpt: |

---

{% assign imagedir = "/images/angular2-header-footer/" | prepend: site.baseurl | prepend: site.url %}

[previous post]: {{ "/ng2-add-bootstrap/" | prepend: site.baseurl | prepend: site.url }}



Welcome to the continuing series on Getting Started with Angular 2.  In the [previous post][], we added the [Bootstrap](https://getbootstrap.com/) and [ng2-bootstrap](https://valor-software.com/ng2-bootstrap/) libraries to our project and updated our home page.  In this post, we will be creating a header with menu and footer for the application.  The header and footer will be shown on all of the pages.

> If you need the code from the previous post, you can get it from this [Github](https://github.com/digitaldrummerj/angular2-getting-started) repository in the 2-AddBootstrap branch.  



## Header Component

In this section we are going to create the header component and add it to the app.component.html page.  I think of headers and footers as shared components that will be used across the whole site so I like to store them in a folder called shared that is under the src/app directory.

### Create Header Component Steps

1. Open a command prompt
1. cd into the src/app directory
1. Make a new directory called shared
1. Run the following Angular CLI command to generate a new component.  Note that the g command for the Angular CLI is short for generate.

        ng g component header

    ![Generate Output]({{ "generate-header.png" | prepend: imagedir }})


### Header html

At this point the header component is created but it is not used anywhere on the site.

If you open the src\app\app.module.ts you will see that the Angular CLI automatically added an import statement on line 8 and added the HeaderComponent to the declarations on line 13.

![App Module]({{ "header-app-module.png" | prepend: imagedir }})

To use the HeaderComponent, you need to include the html tag <app-header></app-header> wherever you want the header to appear.  If you ever wonder what the html tag is when you generate a component, you just need to open up the components TypeScript file and look at the selector name.  

![Header Component Selector]({{ "header-component-selector.png" | prepend: imagedir }})

If we go into the src\app\app.component.html file and add the following html to the top of the file, we will see the header show up.

```html
<app-header></app-header>
```

![Initial Header Component]({{ "header-initial.png" | prepend: imagedir }})

As you can see the header isn't very appealing yet but from a functionality standpoint, there isn't anything more that we need to do to get the header component included on the app-component page which is the page that everything will route through.  You can tell that everything will route through the app-component because of the <router-outlet></router-outlet> tag.  We will cover more about this tag when we get into routing in a future post.

Now lets go into the src/app/shared/header/header.component.html file and replace the html snippet below.  This snippet will give us the hamburger menu at smaller resolutions, setup us wirh a navigation bar, give an Application title and make the header a solid gray background.

```html
<header>
  <nav class="navbar navbar-default">
    <div class="container-fluid">
      <div class="navbar-header">
        <button type="button" 
            class="navbar-toggle collapsed" 
            data-toggle="collapse"
            data-target="#navbar"
        >
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
        </button>
        <span>
            <a [routerLink]="['/']" class="navbar-brand">
                Angular 2 Getting Started
            </a>
        </span>
      </div>

      <div class="collapse navbar-collapse" id="navbar">
        <ul class="nav navbar-nav navbar-right">
        </ul>
      </div>
    </div>
  </nav>
</header>
```

Now if you look at the header again, you will see it looks much more like a header.

![Revised Header]({{ "header-formatted.png" | prepend: imagedir }})


