---
layout: post
title: 'Angular 2 - WTF My Module Wont Route'
date: 2020-02-19 06:00
categories: ['angular']
published: true
excerpt: |
     I have been really enjoying working with Angular 2 over the last few months but the other day 
I spent well over an hour cursing Angular wondering why my new module would not route.  It can't be this hard to configure routes.  When I created my other modules a few weeks ago the routing worked first time  but when trying to navigate to my new module it kept going  to my catch all route.
--- 
{% assign imagedir = "/images/ng2-module-wont-route" | prepend: site.baseurl | prepend: site.url %}

I have been really enjoying working with Angular 2 over the last few months but the other day 
I spent well over an hour cursing Angular wondering why my new module would not route.  It can't be this hard to configure routes.  When I created my other modules a few weeks ago the routing worked first time  but when trying to navigate to my new module it kept going  to my catch all route.

I verified that I had spelled everything correctly in the routing configuration and in the browser url.  I verified that I had imported the new module in the app module.  I swore everything was setup correctly.  WTF was going on.  This should have worked.  What did I miss.  

Turns out that order is important when importing modules in the app.module.ts file.  Since I had a  catch all route to direct users to a 404 type page when they tried to go to a route that I had not setup I needed to import the AppModule last.  Was obvious  once I figured it out but never thought about it before then.  I assumed that it would automatically added the child routes into the routing and put the catch all last.  Nope it doesn't work that way.  It adds the routes as they are imported. 

	???add code showing imports  in app module???

Now that you have seen the solution,  let's take a look at the code to walk through the issue and the solution. 

I am going to be using the Angular CLI to generate the project and modules. 

If you don't have the Angular CLI installed you can installing by running:

	npm install -g angular-cli 
	
> This assumes you have [Node](https://nodejs.org) already installed

To generate the project run 

	ng generate new testProject --routing --style=scss

After the project has generated we need to generate a couple of components so that we have something to route to.  

1. cd into the new-project directory that the generate new command created
1. To create the  not found component run:

		ng generate component notFound 

1. To create the  home page  component run:

		ng generate component home 
		
Now we need to setup routes to each of these components in the appmodule-routing.ts file.

??? add routing code???

Before we move onto creating a module to route to, let's view our test app in the browser and make sure both of our routes are working.

To build and run the app we need to use the ng serve command or npm run serve????verify????

	ng serve 

If everything built successfully with no red text showing in the command line.

???? added screenshot of successful build???

Open your browser and navigate to localhost:4200.  Your home page component should have come up.  Now add to the end of the url /bogus and the not  found  page should be shown.

Now we are ready to create or module using the Angular CLI.  From inside our project  directory run:

	ng generate  module testPage 
	
This will generate 4 files:

* test-page.component.html
* test-page.component.scss
* test-page.component.ts
* test-page.module.ts

When creating a module it does not create a module routing file for us.  

1. In the test-page directory created a file called test-page-routing.module.ts
1. Add the following code to setup the route for the module. 

To use the module, we need to import it into the AppModule by adding it to the import within the app.module.ts file.

1. Open the app.module.ts file
1. Add an import statement for the test page module if not already impoimported
	
		import { TestPageModule} from './test-page/test-page.module';
		
1. In the app module setup there is a list of components and modules to  import, we need to add the TestPageModule to that list at the end.  
 
 		???add code???
 		
 Since we still have ng serve running, if try to navigate to localhost:4200/testpage it will go to the not found route.
 
 To make it pick up the test page route, we need to change the order of the app module imports so that app module is the last module imported.
 
 		??? add code???
 		
 Now if we navigate to local:4200/testpage we will see our test page and if we navigate to /bogus the not found page will come up.
 
Such a simple solution to a problem that will have you cursing at Angular.  Hopefully in the future they can change this within Angular so that import order doesn't affect routing like this. 

Leave a comment below, if you have run into other issues with Angular 2 that have been making your scratch your head and curse at the framework.  
  