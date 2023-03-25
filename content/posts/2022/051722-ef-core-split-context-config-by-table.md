---
categories: ["aspnet core", "ef core"]
date: 2022-05-18T13:00:00Z
draft: false
title: "EF Core - Split Model Configuration Into Files By Table"
url: '/ef-core-split-model-config'
series: ["EF Core Advanced Features"]
---

With EF Core, you configure your entities (e.g. tables) using the OnModelCreating in your database context. It is easy to just put all of the configurations into that OnModelCreating method which for just a few entities works great.  However, as the number of entities grows, OnModelCreating easily becomes unwieldy with thousands of lines of configuration code.

In this post, I am going to show you how you can move the configuration for each of your entities to it's own file and just have to put a single line of code in the OnModelCreating for each entity.  This will greatly simplify the management and maintenance of the entity configuration code.

<!--more-->

## Problem We Are Solving

Lets take a look at an example of the OnModelCreation method.  As you can see below with just 2 entities, we are already looking at 26 lines of configuration code for just a couple of indexes, a query filter, and an enum based column.

If we stopped at just 26 lines of code, no big deal but as the number of entities grows so does the amount of configuration code.  In fact, one of the projects I am currently working on has over 2,000 lines of configuration code.

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

After we are done with moving the configurations for each entities into their own file, the OnModelCreating method will only contain a single line for each entity that we need to configure.  This is way easier to manage.

Here is what the OnModelCreating will look like after our implementation

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.ApplyConfiguration(new BlogMap());
    modelBuilder.ApplyConfiguration(new PostMap());
}
```

## Solution

> This post builds on the sample code from our [previous post](/ef-core-audit-columns).  You can download this code [here](https://github.com/digitaldrummerj/efcore-examples/tree/feature/2-audit-fields)

In order to move the configuration for each entity to its own file, we need to create a class for each entity that implements Microsoft.EntityFrameworkCore.IEntityTypeConfiguration.

### Blog Configuration

1. Create directory Maps
1. In the Maps directory, create the file BlogMap.cs
1. Add the following code to the BlogMap.cs file

    ```csharp
    using EntityFrameworkExample.Entities;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore.Metadata.Builders;

    namespace EntityFrameworkExample.Maps;

    public class BlogMap : IEntityTypeConfiguration<Blog>
    {
        public void Configure(EntityTypeBuilder<Blog> builder)
        {
            builder.HasQueryFilter(t => t.IsDeleted == false);

            builder.HasIndex(t => t.Url)
                .IsUnique();

            builder.Property(s => s.Status)
                .HasDefaultValue(Status.Draft)
                .HasConversion<string>();
        }
    }
    ```

### Post Configuration

1. In the Maps directory, create the file PostMap.cs
1. Add the following code to the PostMap.cs file

    ```csharp
    using EntityFrameworkExample.Entities;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore.Metadata.Builders;

    namespace EntityFrameworkExample.Maps;

    public class PostMap : IEntityTypeConfiguration<Post>
    {
        public void Configure(EntityTypeBuilder<Post> builder)
        {
            builder.HasQueryFilter(t => t.IsDeleted == false);

            builder.HasIndex(t => t.Title);

            builder.HasIndex(t => t.Url)
                .IsUnique();

            builder.HasIndex(t => new { t.Title, t.Url });
        }
    }
    ```

### Database Context Update

Now we need to update our database context to use the new BlogMap and PostMap classes.

Open our model context and replace the code within the OnModelCreating method with the following code.

```csharp
modelBuilder.ApplyConfiguration(new BlogMap());
modelBuilder.ApplyConfiguration(new PostMap());
```

## Conclusion

We have gone from having lots of entity configuration code in the database context OnModelCreating to have just a few lines.  Also, having a config file for each entity, makes it possible to quickly see the entity's configuration.

We can also enhance our implementation which we are going to do in our [next post](/ef-core-global-configurations), to have a base class that all entities inherit from where we can put global configurations and not have to worry about adding them to each entity.
