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

## Create Sample Project

1. Open a terminal and navigate to where you want to store the example project we are going to create
1. Run dotnet new to create our WebApi project

    ```shell
    dotnet new webapi -o EntityFrameworkExample
    ```

1. cd into the EntityFrameworkExample directory

    ```shell
    cd EntityFrameworkExample
    ```

1. Add a .gitignore file using the dotnet-ignore global tool

    ```shell
    dotnet-ignore get -n visualstudio.gitignore
    ```

    > If you do not have the dotnet-ignore global dotnet tool install, check out my post on how to install the tool, [here](/dotnet-global-ignore/)

1. Install the EntityFramework Core Sql Server package

    ```shell
    dotnet add package Microsoft.EntityFrameworkCore.SqlServer
    ```

## Create Tables

Now that we have our example project created, we need to create our data model. We are going to create two tables, Blog and Post.

1. Create a directory called EntityFramework
1. In the EntityFramework directory, create a directory called Entities
1. In the Entities directory, create a file called Blog.cs and add the following code to it to create a Blogs table with 2 columns and a relationship with the Post table.

    ```csharp
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    namespace EntityFrameworkExample.Entities;

    [Table("Blogs")]
    public class Blog
    {
        [Required]
        [MaxLength(255)]
        public string Name { get; set; }

        [Required]
        [MaxLength(2048)]
        public string Url { get; set; }

        [InverseProperty(nameof(Blog))]
        public List<Post> Posts { get; set; } = new List<Post>();
    }
    ```

1. In the Entities directory, create a file called Post.cs and add the following code to it to create the Post table with several columns and the relationship to the Blog table.

    ```csharp
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    namespace EntityFrameworkExample.Entities;

    [Table("Posts")]
    public class Post : EntityBase
    {
        [Required]
        [MaxLength(255)]
        public string Title { get; set; }

        [Required]
        [MaxLength(100)]
        public string Url { get; set; }

        public bool IsDraft { get; set; }

        public string Content { get; set; }

        public int BlogId { get; set; }

        [ForeignKey(nameof(BlogId))]
        public Blog Blog { get; set; }
    }
    ```

## Create Context

Now that we have our entities created, we are ready to create our database context for Entity Framework.

1. In the EntityFramework directory, create a file called EntityFrameworkExampleContext.cs
1. In the EntityFrameworkExampleContext.cs file add the following code to tell EntityFramework about the Blog and Post table.

    ```csharp
    using EntityFrameworkExample.Entities;
    using Microsoft.EntityFrameworkCore;
    namespace EntityFrameworkExample;

    public class EntityFrameworkExampleContext : DbContext
    {
        public EntityFrameworkExampleContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Blog> Blog { get; set; }

        public DbSet<Post> Post { get; set; }
    }
    ```

## Add Context to ASP.NET Core Startup

Now that we have our tables and EF Core context file, we are ready to add the context to the ASP.NET Core start up.

In Program.cs, we need to add the database context to the services.

```csharp
string connectionString = "(localdb)\mssqllocaldb;Database=EntityFrameworkExample;ConnectRetryCount=0;Trusted_Connection=True;";

builder.Services
    .AddDbContext<EntityFrameworkExampleContext>(opt =>
        opt.UseSqlServer(connectionString));
```

If you have Visual Studio installed, it comes with the localdb.

### Using Docker for Sql Server

If you do not have Visual Studio installed, you can use Docker to run an instance of Visual Studio and then update the connection string to connect to the docker instance.

```shell
docker pull mcr.microsoft.com/mssql/server:2019-latest
```

```shell
docker run --name sql_2019_1436 -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=1Secure*Password1" -e "MSSQL_PID=Enterprise" -p 1436:1433 -d mcr.microsoft.com/mssql/server:2019-latest
```

If you are using docker, you will need to update your connection string in Program.cs to localhost,1436 with a

```csharp
string connectionString = "Server=localhost,1436;Database=EntityFrameworkExample;ConnectRetryCount=0;User ID=sa;Password=1Secure*Password1";
```

> in production, do not use sa for your database connection and do not hard code the connection in your Program.cs.

## Create Controllers for Blog and Post

Next, we need to create a controller for Blog and Post to be able to perform CRUD operations.  We are going to use the dotnet cli to scaffold the controller.

We have a few package to add:

```shell
dotnet add package Microsoft.VisualStudio.Web.CodeGeneration.Design
```

```shell
dotnet add package Microsoft.EntityFramework.Design
```

```shell
dotnet add package Microsoft.EntityFrameworkCore.Design
```

Next we need to install the ASP.NET Code Generator global tool

```shell
dotnet tool install -g dotnet-aspnet-codegenerator
```

Now, we are ready to scaffold the Blog controller

```shell
dotnet aspnet-codegenerator controller -name BlogController -async -api -m Blog -dc EntityFrameworkExampleContext -outdir Controllers
```

and the Post controller

```shell
dotnet aspnet-codegenerator controller -name PostController -async -api -m Post -dc EntityFrameworkExampleContext -outDir Controllers
```

## Create Database

Before we can run our WebApi, we need to create our database and database tables.  I am going to use EntityFramework's migration tool to create scripts that are then applied to our database.

1. We need to install the EF Core tools

    ```shell
    dotnet tool install --global dotnet-ef
    ```

1. To create our database migration script and save it to the  EntityFramework\Migrations\ directory, run:

    ```shell
    dotnet ef migrations add InitialCreate -o .\EntityFramework\Migrations
    ```

1. To run the script against our database, we need to call the database update command for dotnet ef.

    ```shell
    dotnet ef database update
    ```

You are now ready to start up the project and navigate to the /swagger url and test out the controller.  Right now, it does not have soft deletes enabled but before implementing soft deletes, we want to make sure that the basic API is working.

## Add IsDeleted Column to Tables



## Easier Way to Add IsDeleted column to Table Using Inheritance



## Update Database Context to Override Delete Operation


## Filter Out Deleted Rows



## does it work with cascading deletes?


