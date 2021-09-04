---
categories:
- angular
date: 2017-01-05T00:00:00Z
excerpt: "Welcome to the continuing series on Getting Started with Angular 2.  In
  the [previous post](/ng2-your-first-project), we created our project using the Angular
  CLI.  In this post, we will be adding the [Bootstrap](https://getbootstrap.com/)
  library to the project to make it easier to style our application.  \n"
published: true
series: ["angular2-getting-started"]
title: Angular - Adding Bootstrap Library
---

> Note: This post applies to Angular.  The 2+ version of Angular.

Welcome to the continuing series on Getting Started with Angular 2.  In the [previous post][], we created our project using the Angular CLI.  In this post, we will be adding the [Bootstrap](https://getbootstrap.com/) library to the project to make it easier to style our application.

To make [Bootstrap](https://getbootstrap.com/) play nice with Angular we are going to use the [ng2-bootstrap](https://valor-software.com/ng2-bootstrap/) library which rewrites the [Bootstrap](https://getbootstrap.com/) components to be powered by Angular instead of JQuery.  The [ng2-bootstrap](https://valor-software.com/ng2-bootstrap/) library also works with both Bootstrap [v3](https://getbootstrap.com) and [v4](http://v4-alpha.getbootstrap.com/) which means when [v4](http://v4-alpha.getbootstrap.com/) is finally released to production you will only have to change the Bootstrap css reference and fix any breaking changes listed in the [v4 migration guide](http://v4-alpha.getbootstrap.com/migration/).  [Bootstrap v4](http://v4-alpha.getbootstrap.com/) is not yet recommend for production.  The rest of this article is going to focus on using [Bootstrap v3](https://getbootstrap.com/).

### Install Libraries

> If you need the code from the previous post, you can get it from this [Github](https://github.com/digitaldrummerj/angular2-getting-started) repository in the 1-CreateProject branch.

The first thing that we need to do is install the ng2-bootstrap and bootstrap-sass libraries as dependencies for the project.  Since we generated our project with the --style=scss flag, we need to use the bootstrap-sass module to get the sass versions of bootstrap instead of the css versions that are contained in the bootstrap module.

1. Open a command prompt and navigate to your project directory
1. Run the npm install command below to install ng2-bootstrap and bootstrap-sass

        npm install bootstrap-sass ng2-bootstrap --save

### Updating the Angular CLI Configurations

Now we need to tell the Angular CLI about the [Bootstrap](https://getbootstrap.com/) scss file.

1. In your code editor, open up the angular-cli.json file.
1. Search for the styles node and add the bootstrap file

        "styles": [
            "styles.scss",
            "../node_modules/bootstrap-sass/assets/stylesheets/_bootstrap.scss"
        ],


### Using Bootstrap

Now that we have told the Angular CLI to include the bootstrap library, we are ready to use it.

1. In your code editor, open up the src\app\app.component.html file
1. Replace the contents of the file with:

        <div class="container">
          <div class="page-header">
            <h1>
              {{ title }}
            </h1>
          </div>
        </div>

1. We are now ready run `ng serve` and view our home page at [http://localhost:4200](http://localhost:4200)

  > Note: If you already have ng serve running, you will need to stop it using ctrl+c and run ng serve again. Anytime you make changes to the angular-cli.json file, they will not take effect until ng serve is restarted.

1. The page should now look like

    ![Page with Bootstrap](/images/angular2-add-bootstrap/view-page.png)


## Wrapping up

At this point you have your Angular 2 project with the [Bootstrap](https://getbootstrap.com/) library added for styling.  The code for this post is available on [Github](https://github.com/digitaldrummerj/angular2-getting-started/tree/2-AddBootstrap).

In the next post, we will create a header and footer component that will be used on each page.
