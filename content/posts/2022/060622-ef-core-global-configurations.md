---
categories: ["aspnet core", "ef core"]
date: 2022-06-06T13:00:00Z
draft: false
title: "EF Core - Configurations That Apply to All Tables"
url: '/ef-core-global-configurations'
---

As a follow to our [previous post](/ef-core-split-model-config) on splitting the EF Core entity configurations by table into their own files, we are going to implement the ability to have entity configurations that apply to all of the EF Core entities that we have created.

This is really useful for our [soft deletes](/ef-core-soft-deletes) that we implement previously where we want to exclude by default all of the rows that have the IsDeleted flag set to true but we do not want to have to remember to add that code to all of the entities.

This will also allow us to have the code in a single place, so if we ever decide to change it, it will be a very easy change to make.

<!--more-->

In our [previous post](/ef-core-split-model-config), we split all of the entity configurations by table into their own configuration mapping file. The next step is to create a base class that all of the configuration mappings inherit from and that we can put the global configurations in.

> **Note** This     post is based off of the code from the previous post.  If you have not gone through the previous post, you can download the code [here](https://github.com/digitaldrummerj/efcore-examples/tree/feature/4-entity-config-by-table)

1. In the EntityFramework\Maps directory, created a directory named base
1. In the EntityFramework\Maps\base directory, create a new interface named IEntityMapBase.cs
1. In the IEntityBaseMapBase.cs file add the following code.

    ```cs
    using Microsoft.EntityFrameworkCore;

    namespace EntityFrameworkExample.Maps;

    public interface IEntityMap<TEntity> : IEntityTypeConfiguration<TEntity> where TEntity : class
    {
    }
    ```

The interface inherits from the EF Core IEntityTypeConfiguration, just like our BlogMap and PostMap did in our previous post.

Now we need to create our implementation of the interface we just created.

1. In the EntityFramework\Maps\Base directory, create a class named EntityMapBase.cs
1. In the EntityMapBase.cs file, we need to override the configuration method

    ```cs
    using EntityFrameworkExample.Entities;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore.Metadata.Builders;

    namespace EntityFrameworkExample.Maps;

    public abstract class EntityMapBase<TEntity> : IEntityMap<TEntity> where TEntity : class, IEntityBase
    {
        public virtual void Configure(EntityTypeBuilder<TEntity> builder)
        {
       }
    }
    ```

Next, we are going to update our BlogMap and PostMap to inherit from the EntityMapBase that we just created.  Then we will implement the global configuration for the isDeleted query filter.

In the BlogMap and PostMap, change the base class to inherit from EntityMapBase and call the base configure method like so:

file: EntityFramework\Maps\BlogMap.cs

```cs
public class PostMap : EntityMapBase<Blog>
{
    public override void Configure(EntityTypeBuilder<Blog> builder)
    {

        base.Configure(builder);

        // existing configuration code
    }
}
```

file: EntityFramework\Maps\PostMap.cs

```cs
public class PostMap : EntityMapBase<Post>
{
    public override void Configure(EntityTypeBuilder<Post> builder)
    {

        base.Configure(builder);

        // existing configuration code
    }
}
```

Now we are ready to implement our global configuration in the EntityMapBase.

1. In the `EntityMapBase.Configure` method, add the following code to specify the global filter for isDeleted = false

    ```cs
    builder.HasQueryFilter(t => t.IsDeleted == false);
    ```

1. Now in the BlogMap and PostMap, we can remove the isDeleted query filter.

Just like that we now have the ability to specify global entity configurations just by inheriting our entity map from EntityMapBase and within our entity calling base.Configure(builder)

In our next post in our EF Core series, we are going to take a look at indexes.  You have seen some indexes in our code but we are going to dive a bit deeper into index and look at non-unique indexes, unique index, and multiple property indexes.