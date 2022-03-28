---
categories: ["aspnet core", "ef core"]
date: 2022-03-27T13:00:00Z
draft: true
title: "EF Core - Use Enum as Column Value"
url: '/ef-core-enum-as-column-value'
series: ["EF Core Advanced Features"]
---

When dealing with databases, there are times when you want a column to only allow certain values.  When using EF Core, the easiest way to accomplish this goal is to use an enum as the type for the property.

In this post, we will add a new column to an entity that is of an enum type, set the default value, and create the migration script.

<!--more-->

> This post uses the sample code from our [previous post](/ef-core-audit-columns).  You can download this code [here]()
The first thing we need to do is create an enum.  In this case we are going to create a status enum.

1. Create a file name Status.cs

    ```shell
    Status.cs
    ```

1. To the Status.cs add the following code to create our enum


    ```csharp
    namespace EntityFrameworkExample;

    public enum Status
    {
        Draft,
        Published
    }
    ```

Now that our enum is created, we need to add the new property to our entity that is of the enum Status.

1. Open up your entity

```csharp
[Required]
[MaxLength(25)]
public Status Status { get; set; }
```

```csharp
entity.Property(t => t.Status)
    .HasDefaultValue(SyncStatus.Draft)
    .HasConversion<string>();
```

```csharp
using Microsoft.EntityFrameworkCore;
```

```shell
dotnet ef migrations add AddStatusField -o .\EntityFramework\Migrations\
```

```shell
dotnet ef database update
```

> [See Code for Post](https://github.com/digitaldrummerj/efcore-examples/tree/feature/3-enum-columns)
