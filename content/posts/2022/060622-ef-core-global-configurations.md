---
categories: ["aspnet core", "ef core"]
date: 2022-06-06T13:00:00Z
draft: false
title: "EF Core - Configurations That Apply to All Tables"
url: '/ef-core-global-configurations'
series: ["EF Core Advanced Features"]
---

In our [previous post](/ef-core-split-model-config), we split all of the entity configurations by table into their own configuration mapping file. The next step is to create a base class that all of the configuration mappings inherit from where we can put configurations that all entities should get.

An example of where we will use the global configuration is the [soft deletes](/ef-core-soft-deletes) that we implement previously where we want to exclude all of the rows that have the IsDeleted flag set to true but we do not want to have to remember to add that code to all of the entities and we don't want to have to remember to add it to every query.

<!--more-->

> **Note** This code in this post is based off of the code from the previous post.  If you have not gone through the previous post, you can download the code [here](https://github.com/digitaldrummerj/efcore-examples/tree/feature/4-entity-config-by-table)

The first thing that we need to do is create our base interface and abstract class that all of our entity maps will inherit from.

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

Now we need to create our implementation of the interface we just created.  We will be making it an abstract class since we do not want to be able to directly instantiate the class and only want to use it as a base class.

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

Now we are ready to move the isDeleted query filter into our EntityMapBase .

1. In the `EntityMapBase.Configure` method, add the following code to specify the global filter for isDeleted = false

    ```cs
    builder.HasQueryFilter(t => t.IsDeleted == false);
    ```

1. In the BlogMap and PostMap, we can remove the isDeleted query filter as it is in the base class now.

Just like that we now have the ability to specify global entity configurations just by inheriting our entity map from EntityMapBase and within our entity calling base.Configure(builder)

In our next post in our EF Core series, we are going to take a look at indexes.  You have seen some indexes in our code but we are going to dive a bit deeper into index and look at non-unique indexes, unique index, and multiple property indexes.
