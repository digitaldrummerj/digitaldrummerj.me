---
categories: ["aspnet core", "ef core"]
date: 2022-03-25T13:00:00Z
draft: true
title: "EF Core - Audit Fields - Track Created By and Last Updated By Values Automatically"
url: '/ef-core-audit-columns'
series: ["EF Core Advanced Features"]
---

In several applications I work on, we have a requirement that we need to track who created a record, when they created it, who was he last person to update a record, and when was the last updated of a record. We called this audit tracking.

In this post, we will implement audit tracking so that the audit fields are automatically added onto our entities and EF Core automatically sets the values when save our entity.

<!--more-->

> This post is designed as a step-by-step walkthrough of the implementation. If you just want to look at the finished code, get it [here](https://github.com/digitaldrummerj/efcore-examples/tree/feature/2-audit-fields)

## Example Project

In our [previous post](/ef-core-soft-deletes) on soft deletes, we create a sample project and implemented soft deletes for our entities.  In this post, we are going to build on that code from the [previous post](/ef-core-soft-deletes).  You can either go through the previous post or you can download the finished code from the previous post [here](https://github.com/digitaldrummerj/efcore-examples/tree/feature/1-soft-deletes) and then check out the branch feature/1-soft-deletes.

## Add Audit Fields to Tables

1. EntityFramework\Entities\Base\IEntityBase.cs

    ```csharp
    DateTimeOffset CreatedOn { get; set; }

    string CreatedBy { get; set; }

    DateTimeOffset UpdatedOn { get; set; }

    string UpdatedBy { get; set; }
    ```

1. EntityFramework\Entities\Base\EntityBase.cs

    ```csharp
    public DateTimeOffset CreatedOn { get; set; }

    public string CreatedBy { get; set; }

    public DateTimeOffset UpdatedOn { get; set; }

    public string UpdatedBy { get; set; }
    ```

## Update Database Context to Fill In Audit Fields

1. EntityFramework\Extensions\ChangeTrackerExtension.cs

    ```csharp
    using EntityFrameworkExample.Authentication;
    using EntityFrameworkExample.Entities.Base;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore.ChangeTracking;
    using System;
    using System.Collections.Generic;
    using System.Linq;

    namespace EntityFrameworkExample.Extensions
    {
        public static class ChangeTrackerExtensions
        {
            public static void SetAuditProperties(this ChangeTracker changeTracker, ICurrentUserService currentUserService)
            {
                changeTracker.DetectChanges();

                IEnumerable<EntityEntry> entities = changeTracker.Entries().Where(t => t.Entity is IEntityBase && (t.State == EntityState.Added || t.State == EntityState.Modified));

                if (entities.Any())
                {
                    DateTimeOffset timestamp = DateTimeOffset.Now;

                    string user = currentUserService.GetCurrentUser().LoginName;

                    foreach (EntityEntry entry in entities)
                    {
                        IEntityBase entity = (IEntityBase)entry.Entity;

                        switch (entry.State)
                        {
                            case EntityState.Added:
                                entity.CreatedOn = timestamp;
                                entity.CreatedBy = user;
                                entity.UpdatedOn = timestamp;
                                entity.UpdatedBy = user;
                                break;
                            case EntityState.Modified:
                                entity.UpdatedOn = timestamp;
                                entity.UpdatedBy = user;
                                break;
                        }
                    }
                }
            }
        }
    }

    ```

You are now ready to test that the IsDelete works:

1. Run the application and go to the Swagger UI (/swagger)
1. On the Blog,  run the post operation to insert a new Blog
1. Grab the Id value from the Blog
1. Run the delete operation for the Blog Id
1. Run the get call for the Blogs and notice that the record is still there, but the IsDelete is set to true.


If you start up the application and run the get call for Blog, you will see that it no longer returns the record with the IsDelete set to true as it did before. If you need to write a query to return the IsDeleted is true records, on the individual queries, you would add a call to IgnoreQueryFilters() as part of the query.

Whew, you made it. I know it was a lot of steps and code to walk through, but you did it and completed the implementation of EF Core soft deletes. If you found this post helpful, please share this post on Twitter and Facebook using the share buttons below.
