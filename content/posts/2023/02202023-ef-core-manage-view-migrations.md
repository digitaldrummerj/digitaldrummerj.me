---
categories: ["ef core", "dotnet"]
date: 2023-02-23T13:00:00Z
draft: true
title: "Better Way to Manage Database Views in EF Core Migrations"
url: '/efcore-view-migrations'
---

When using database views that are not directly managed by Entity Framework Core (EF Core), it is a good practice to still version control and I like to do this by including the scripts to add/drop the views in an EF Core migration script.  It is easy enough to use the migration builder sql method to call the sql needed to add and drop your view but as the project grows this becomes way harder to manage.  One of my projects has 638 migration scripts (it has been going on for like 5 years now), so you can imagine how difficult it can be to find the previous version of the view when you need to drop a migration script and revert back to the previous version of the view.

Recently, we started managing our view in a different way that has made it easier to find the different versions of the view and simplified our migration scripts.  In this post, we are going to look at the implementation we did to manage our views.

<!--more-->

For the view management we do need a blank EF Core migration script which we can create by running

```shell
dotnet ef migrations add YourMigrationScriptName
```

This will create you a blank migration script with the Up and Down Methods

```c#
using Microsoft.EntityFrameworkCore.Migrations;
using System;

namespace MyApp.Migrations
{
    public partial class YourMigrationScriptName : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
        }
    }
}
```

Before in our migration script we would create public static methods to get the view create and drop statements and then call then in the Up method.  Then in the Down method we would make a call to the previous migration scripts static methods for the view drop and create statements.

Instead we now create a class per view that will contain all of the versions of the view with methods to get the create statements for the version and the create statement for the previous version.  Then in our migration script we can just make a call to the view's class to get the right sql.

To make this easy to work with, in each view's class we have created:

* A `VersionNumber` enum to hold each version number.  We made the version number that same as the date in each migration scripts file name
* A method called `GetDropSql` that returns the view drop statement
* A property for each version number that contains the view create sql for that version
* A method called `GetCreateSqlPrevious` that takes in a version number and calls the correct property for the previous version of the view.
* A method called `GetCreateSql` that  takes in a version number and calls the correct property for that version of the view

Below is an example of what our view files look like.  I create two versions of the view called v20230222 and v20221230.

```c#
using System;

namespace MyApp.Views
{
    public static class MyView
    {
        // View version numbers
        public enum VersionNumber
        {
            v20230222,
            v20221230
        }
        private const string ViewName = "vw_MyView";

        // Get the previous view create statement for a version number
        public static string GetCreateSqlPrevious(VersionNumber versionNumber)
        {
            return versionNumber switch
            {
                VersionNumber.v20230222 => v20230222,
                VersionNumber.v20221230 => "",
                _ => throw new ApplicationException("Unknown Version Number")
            };
        }

        // Get the view create statement for the version number
        public static string GetCreateSql(VersionNumber versionNumber) =>
            versionNumber switch
            {
                VersionNumber.v20230222 => v20230222,
                VersionNumber.v20221230 => v20221230,
                _ => throw new ApplicationException("Unknown Version Number")
            };

        public static string GetDropSql() => $@"DROP VIEW IF EXISTS {ViewName}";

        private static string v20221230 => $@"CREATE VIEW [dbo].{ViewName} WITH SCHEMABINDING AS ......";

        private static string v20221230 => $@"CREATE VIEW [dbo].{ViewName} WITH SCHEMABINDING AS ......";
    }
}
```

Now that we have our view class, in our migration script in the Up and Down method we could use to the `migrationBuilder.Sql` method to make the calls into the `MyView` class that we created above.

> Note: The reason that we drop our views and then create them instead of just altering the views is due to using schema binding on our views to ensure we don't drop a column that they are using and Sql Server not allowing alter with schema binding.

```c#
using MyApp.Views;

namespace MyApp.Migrations
{
    public partial class YourMigrationScriptName : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql($"exec('{MyView.GetDropSql().Replace("'", "''")}')");

            migrationBuilder.Sql($"exec('{MyView.GetCreateSql(MyView.VersionNumber.v20230222).Replace("'", "''")}')");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql($"exec('{MyView.GetDropSql().Replace("'", "''")}')");

            migrationBuilder.Sql($"exec('{MyView.GetCreateSqlPrevious(MyView.VersionNumber.v20230222).Replace("'", "''")}')");
        }
    }
}
```

Having this process allows us to manage our views in the same manner that we do for all of our schema changes to either push changes to our database with the `ef database update` command or by creating a sql script from the migrations and then running the script against our database.
