---
categories: ["aspnet core", "ef core"]
date: 2022-03-23T13:00:00Z
draft: true
title: "EF Core - Implement Soft Delete"
url: '/ef-core-soft-deletes'
toc: true
---

In several applications I work on, we have a requirement that we are not allowed to physically delete any data out of the database.  Instead, when we need to delete a record, we set an IsDeleted column to true and then exclude the row from our queries.  

In this post, we will look at how to implement soft deletes when using Entity Framework Core (EF Core) so that any time we call delete, it will set the IsDeleted column to true, leave the record in the database, and exclude the record from the query results.

<!--more-->

##  Create Sample Project 


## Create Tables

Before we can implement soft deletes, we first need to create our data model.  We are going to create a Blog and Post table.  



## Create Context



## Add IsDeleted Column to Tables



## Easier Way to Add IsDeleted column to Table Using Inheritance



## update db context to override delete
## add global filter



## does it work with cascading deletes?




