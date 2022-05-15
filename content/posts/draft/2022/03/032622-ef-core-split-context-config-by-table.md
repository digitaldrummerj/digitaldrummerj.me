---
categories: ["aspnet core", "ef core"]
date: 2022-04-18T13:00:00Z
draft: true
title: "EF Core - Split Model Configuration Into Files By Table"
url: '/ef-core-split-model-config'
---

With EF Core, you configure your entities (e.g. tables) using the OnModelCreating in your database context.  It is easy to just put all of the configurations into that OnModelCreating method.  For just a few entities this works great.  However, as the number of entities grows, OnModelCreating easily becomes unwieldy with thousands of lines of code.

In this post, I am going to show you how you can move the configuration for each entity to it's own file.  Plus an added benefit is that you can apply common configurations to all of the entities.

<!--more-->

## Problem We Are Solving

Lets take a look at an example of the OnModelCreation method.  As you can see below with just 2 entities, we are looking at 26 lines of configuration code with just a couple of indexes, a query filter, and an enum based column.  One of the projects I am currently working on, we have over 2,000 lines of code in this method and it is very easy to forgot to configure something like the global query filter for the soft deletes.  One of our technical debt items to resolve, is to move to the solution we are going through in this article.

```csharp {linenos=true}
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Blog>(entity =>
        {
            entity.HasQueryFilter(t => t.IsDeleted == false);

            entity.HasIndex(b => b.Url)
                .IsUnique();

            entity.Property(s => s.Status)
                .HasDefaultValue(Status.Draft)
                .HasConversion<string>();
        });

    modelBuilder.Entity<Post>(entity =>
        {
            entity.HasQueryFilter(t => t.IsDeleted == false);

            entity.HasIndex(b => b.Title);

            entity.HasIndex(t => t.Url)
                .IsUnique();

            entity.HasIndex(b => new { b.Title, b.Url });
        });
}
```

After we are done with moving the configurations for each entities into their own file, the OnModelCreating method will only contain a single line for each entity that we need to configure.  This is way easier to manage.  Also, with the implementation you will be able to have common configurations like the global query filter above that every entity needs.

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.ApplyConfiguration(new BlogMap());
    modelBuilder.ApplyConfiguration(new PostMap());
}
```

## Solution

In order to move the configuration, we need to create a class that implements Microsoft.EntityFrameworkCore.IEntityTypeConfiguration.

