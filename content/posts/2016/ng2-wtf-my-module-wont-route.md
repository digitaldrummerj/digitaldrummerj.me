---
categories:
- angular
date: 2016-12-29T00:00:00Z
excerpt: "I have been really enjoying working with Angular 2 over the last few months
  but the other day I spent well over an hour cursing Angular wondering why my new
  module would not route.  I didn't have this much trouble when I created my other
  modules a few weeks before.  However, this time when I navigated to my new module
  route it kept going to my catch all route.\n\nI verified that I had spelled everything
  correctly in the routing configuration and in the browser url.  I verified that
  I had imported the new module in the app module.  I swore everything was setup correctly.
  \ WTF. What was going on?  What did I miss.  \n\nFind out how simple the solution
  is.  \n"
published: true
title: Angular - WTF Module Won't Route
---

> Note: This post applies to Angular.  The 2+ version of Angular.

I have been really enjoying working with Angular 2 over the last few months but the other day I spent well over an hour cursing Angular wondering why my new module would not route.  I didn't have this much trouble when I created my other modules a few weeks before.  However, this time when I navigated to my new module route it kept going to my catch all route.

I verified that I had spelled everything correctly in the routing configuration and in the browser url.  I verified that I had imported the new module in the app module.  I swore everything was setup correctly.  WTF. What was going on?  What did I miss.  

Turns out that order is important when importing modules in the app.module.ts file especially when you have configured a route to catch any unknown routes and redirect them to a 404 page.  In this scenario, you have to import the AppRoutingModule last.  This was so obvious once I figured it out but never thought about it before then.  I assumed that it would automatically added the child routes into the routing configuations before the catch all route.  Nope it doesn't work that way.  It adds the routes as they are imported. Below shows the broken code and then the fixed code.

{{< alert class="alert" >}}
Original Broken Code: app.module.ts
{{</alert>}}

Notice that the MyNewModule is listed in the @NgModule imports section after the AppRoutingModule.  Note that the order of import statements at the top of the code does not matter.

```
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MyNewModule } from './my-new-module/my-new-module.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
  	MyNewModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

{{< alert class="success" >}}
Fixed Code: app.module.ts
{{</alert>}}

Notice that now the MyNewModule is listed in the @NgModule imports section before the AppRoutingModule.  Note that the order of import statements at the top of the code does not matter.

```
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MyNewModule } from './my-new-module/my-new-module.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
	MyNewModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Such a simple solution to a problem that will have you cursing at Angular.  Hopefully in the future they can change this within Angular so that import order doesn't affect routing like this. 

Leave a comment below, if you have run into other issues with Angular 2 that have been making you scratch your head and curse at the framework.  
 