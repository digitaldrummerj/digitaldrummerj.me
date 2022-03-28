---
categories: ["aspnet core", "ef core"]
date: 2022-03-27T13:00:00Z
draft: false
title: "EF Core - Use Enum as Column Value"
url: '/ef-core-enum-as-column-value'
series: ["EF Core Advanced Features"]
---

When dealing with databases, there are times when you want a column to only allow certain values.  When using EF Core, the easiest way to accomplish this goal is to use an enum as the type for the property.

In this post, we will add a new column to an entity that is of an enum type, set the default value, and create the migration script.

<!--more-->

> This post uses the sample code from our [previous post](/ef-core-audit-columns).  You can download this code [here](https://github.com/digitaldrummerj/efcore-examples/tree/feature/2-audit-fields)

The first thing we need to do is create an enum.

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

1. Open up our Blog entity and add a new property 

	```csharp
	[Required]
	[MaxLength(25)]
	public Status Status { get; set; }
	```

Now we need to tell EF Core how to handle the enum.

1. Open up our BlogMap.cs and add the following to the Configure to set the default value and convert it to a string

	```csharp
	entity.Property(t => t.Status)
    	.HasDefaultValue(SyncStatus.Draft)
    	.HasConversion<string>();
	```

1. Also, need to add the using for EF Core to the BlogMap.cs

	```csharp
	using Microsoft.EntityFrameworkCore;
	```

The last thing we need to do is create our migration script to add the new column.

	1. Run the following command to generate the migration script 

	```shell
	dotnet ef migrations add AddStatusField -o .\EntityFramework\Migrations\
	```

1. Then we need to run the script against our database.

	```shell
	dotnet ef database update
	```
	
Now our application will only allow the enum values to be entered through EF Core for our Status column.   

> [See Code for Post](https://github.com/digitaldrummerj/efcore-examples/tree/feature/3-enum-columns)
