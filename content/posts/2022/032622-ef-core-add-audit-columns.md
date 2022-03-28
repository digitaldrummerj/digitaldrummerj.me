---
categories: ["aspnet core", "ef core"]
date: 2022-03-26T13:00:00Z
draft: false
title: "EF Core - Audit Fields - Track Created By and Last Updated By Values Automatically"
url: '/ef-core-audit-columns'
series: ["EF Core Advanced Features"]
---

In several applications I work on, in addition to the soft deletes that we implemented in the [previous post](/ef-core-soft-deletes), we also have a requirement to implement audit tracking.  Audit tracking is the tracking of who created the record, the date the record was created, who was the last person to update the record, and the last updated date of the record.

In this post, we will implement audit tracking so that the audit fields are automatically added onto our entities and EF Core automatically sets the values when save our entity.

<!--more-->

> This post is designed as a step-by-step walkthrough of the implementation. If you just want to look at the finished code, get it [here](https://github.com/digitaldrummerj/efcore-examples/tree/feature/2-audit-fields)

## Example Project

In our [previous post](/ef-core-soft-deletes) on soft deletes, we create a sample project and implemented soft deletes for our entities.  In this post, we are going to build on that code from the [previous post](/ef-core-soft-deletes).  You can either go through the previous post or you can download the finished code from the previous post [here](https://github.com/digitaldrummerj/efcore-examples/tree/feature/1-soft-deletes) and then check out the branch feature/1-soft-deletes.

## Add Audit Fields to Entities

Since all of our entities that need to have audit tracking enable are inheriting from EntityBase.cs, we just need to add the audit tracking fields to the IEntityBase.cs and EntityBase.cs.

1. Open IEntityBase.cs and add the following properties

    ```csharp
    DateTimeOffset CreatedOn { get; set; }

    string CreatedBy { get; set; }

    DateTimeOffset UpdatedOn { get; set; }

    string UpdatedBy { get; set; }
    ```

1. Open EntityBase.cs and implement the following properties

    ```csharp
    public DateTimeOffset CreatedOn { get; set; }

    public string CreatedBy { get; set; }

    public DateTimeOffset UpdatedOn { get; set; }

    public string UpdatedBy { get; set; }
    ```

Now we need to create a new EF Core migration script for the audit field and update our database to run the migration script to add the audit fields.

1. Open up a terminal and navigate to the EntityFrameworkExample project folder
1. Run the following command to generate the migration script

    ```shell
    dotnet ef migrations add AddAuditFields -o .\EntityFramework\Migrations
    ```

1. Now that we have the migration script, we can run it against the database to update our tables to add the new audit fields

    ```csharp
    dotnet ef database update
    ```

## Add Current User Services

We need to create a current user session that will get the currently logged in user.  For this example, we will be using Windows Authentication but any authentication scheme that is supported by ASP.NET Core should work.

1. Create a directory named Authentication
1. Create an interface named IUserSession.cs in the Authentication directory

    ```shell
    IUserSession.cs
    ```

1. In IUserSession.cs add the following code

    ```csharp
    namespace EntityFrameworkExample.Authentication;

    public interface IUserSession
    {
        string LoginName { get; set; }

        bool IsAuthenticated { get; set; }
    }
    ```

Now we need to implement the IUserSession

1. Create a class named UserSession.cs in the Authentication directory

    ```shell
    UserSession.cs
    ```

1. To the UserSession.cs add the following code to implement the IUserSession.cs

    ```csharp
    namespace EntityFrameworkExample.Authentication;

    public class UserSession : IUserSession
    {
        public string LoginName { get; set; }

        public bool IsAuthenticated { get; set; }
    }
    ```

Next, we are going to create an interface for the current user and implement it so that we can get the currently logged in user from the ASP.NET HttpContext

1. Create a file named ICurrentUserService.cs in the Authentication directory

    ```shell
    ICurrentUserService.cs
    ```

1. To the ICurrentUserservice.cs add the following code

    ```csharp
    namespace EntityFrameworkExample.Authentication;

    public interface ICurrentUserService
    {
        IUserSession GetCurrentUser();
    }
    ```

Now we need to implement the ICurrentUserService.cs

1. Create a file named CurrentUserService.cs in the Authentication directory

    ```shell
    CurrentUserService.cs
    ```

1. To the CurrentUserService.cs add the following code to get the logged in user information

    ```csharp
    using Microsoft.AspNetCore.Http;

    namespace EntityFrameworkExample.Authentication;

    public class CurrentUserService : ICurrentUserService
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public CurrentUserService(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public IUserSession GetCurrentUser()
        {
            if (_httpContextAccessor?.HttpContext == null)
            {
                return new UserSession();
            }

            IUserSession currentUser = new UserSession
            {
                IsAuthenticated = _httpContextAccessor.HttpContext.User.Identity.IsAuthenticated,
                LoginName = _httpContextAccessor.HttpContext.User.Identity.Name
            };

            return currentUser;
        }
    }
    ```

## Add Current User To Database Context

Now that we have our current user service implemented, we need to pass it into the database context so that when we run add, update and delete operations we can get the current user and set the values of the audit fields.

1. In the EntityFrameworkExampleContext.cs, we need to add the ICurrentUserService to the constructor

    ```csharp
    private readonly ICurrentUserService _currentUserService;

    public EntityFrameworkExampleContext(DbContextOptions options, ICurrentUserService currentUserService) : base(options)
    {
        _currentUserService = currentUserService;
    }
    ```

1. Also, need to add the namespace for the ICurrentUserService

    ```csharp
    using EntityFrameworkExample.Authentication;
    ```

1. Then we need to update all of the calls to `ChangeTracker.SetAuditProperties` to pass in the `_currentUserService`

    ```csharp
    ChangeTracker.SetAuditProperties(_currentUserService);
    ```

## Update Database Context to Fill In Audit Fields

For our database context, when a SaveChanges method is called, it uses  the SetAuditProperties extension method to look at the records being changed and decides which audit fields to set.

* For adding a new record, it sets both the created and last updated fields.
* For update and delete, it only sets the last updated fields.

1. Replace the code in ChangeTrackerExtension.cs with the following code

    ```csharp
    using EntityFrameworkExample.Authentication;
    using EntityFrameworkExample.Entities;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore.ChangeTracking;

    namespace EntityFrameworkExample.Extensions;

    public static class ChangeTrackerExtensions
    {
        public static void SetAuditProperties(this ChangeTracker changeTracker, ICurrentUserService currentUserService)
        {
            changeTracker.DetectChanges();
            IEnumerable<EntityEntry> entities =
                changeTracker
                    .Entries()
                    .Where(t => t.Entity is IEntityBase &&
                    (
                        t.State == EntityState.Deleted
                        || t.State == EntityState.Added
                        || t.State == EntityState.Modified
                    ));

            if (entities.Any())
            {
                DateTimeOffset timestamp = DateTimeOffset.UtcNow;

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
                        case EntityState.Deleted:
                            entity.UpdatedOn = timestamp;
                            entity.UpdatedBy = user;
                            entity.IsDeleted = true;
                            entry.State = EntityState.Modified;
                            break;
                    }
                }
            }
        }
    }
    ```

## Authentication Configuration

In order to get the current user information, we need to set up ASP.NET Core authentication.  Since this is a sample application, we are going to use Windows authentication but you can use any authentication that ties into ASP.NET Core Authentication scheme.

1. Add the Microsoft.AspNetCore.Authentication.Negotiate package

    ```shell
    dotnet add package Microsoft.AspNetCore.Authentication.Negotiate
    ```

1. Open the Program.cs file
1. Add the using statement for the Microsoft.AspNetCore.Authentication.Negotiate package

    ```csharp
    using Microsoft.AspNetCore.Authentication.Negotiate;
    ```

1. Right after the `builder.Services` call, add the call to AddAuthentication and AddAuthorization

    ```csharp
    builder.Services.AddAuthentication(NegotiateDefaults.AuthenticationScheme)
        .AddNegotiate();

    builder.Services.AddAuthorization(options =>
    {
        options.FallbackPolicy = options.DefaultPolicy;
    });
    ```

1. To our dependency injection, we need to add the IUserSession, ICurrentUserService, and IHttpContextAccessor

    ```csharp
    builder.Services.AddScoped<IUserSession, UserSession>();
    builder.Services.AddScoped<ICurrentUserService, CurrentUserService>();
    builder.Services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
    ```

1. To the add add UseAuthentication and UseAuthorization

    ```csharp
    app.UseAuthentication();
    app.UseAuthorization();
    ```

1. Open the Blog and Post controllers and add the `[Authorize]` attribute to the class to tell ASP.NET Core that it needs to run the authentication for those two controllers.

## Add User Controller

The last thing we are going to implement is a controller to get our current user information, so that you can make sure that the authentication is working properly.

1. In the controllers directory, create a file named UserController.cs
1. Add the following code to the UserController.cs

    ```csharp
    using EntityFrameworkExample.Authentication;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;

    namespace EntityFrameworkExample.Controllers
    {
        [Route("api/[controller]")]
        [Produces("application/json")]
        [ApiController]
        [Authorize]
        public class UserController : ControllerBase
        {
            private readonly ICurrentUserService _currentUserService;

            public UserController(ICurrentUserService currentUserService)
            {
                _currentUserService = currentUserService;
            }

            [HttpGet]
            public IActionResult Get() => Ok(_currentUserService.GetCurrentUser());
        }
    }
    ```

You are now ready to test that the audit tracking works:

1. Run the application and go to the Swagger UI (/swagger)
1. Run the GET operation for the UserController (/api/user/) and make sure that it returns back your currently logged in user
1. On the Blog,  run the post operation to insert a new Blog.  You only need to fill out the Name and Url fields for the post.

    ```json
    {
        "name": "EF Core Advanced Features",
        "url": "/advancedefcore.com",
    }

1. In the create Blog, post results, you will see that the created and update fields are automatically populated by our database context

    ```json
    {
        "name": "EF Core Advanced Features",
        "url": "/advancedefcore.com",
        "posts": [],
        "id": 5,
        "isDeleted": false,
        "createdOn": "2022-03-26T19:47:59.2757602-07:00",
        "createdBy": "DESKTOP-RPV8VMV\\digit",
        "updatedOn": "2022-03-26T19:47:59.2757602-07:00",
        "updatedBy": "DESKTOP-RPV8VMV\\digit"
    }
    ```

1. If you run an update call, you will see that the timestamp has been updated and if you run the API with a different user that the updated by is also updated.

    ```json
    {
        "name": "EF Core Advanced Features",
        "url": "/advancedefcore.com",
        "posts": [],
        "id": 5,
        "isDeleted": false,
        "createdOn": "2022-03-26T19:47:59.2757602-07:00",
        "createdBy": "DESKTOP-RPV8VMV\\digit",
        "updatedOn": "2022-03-26T20:47:59.2757602-07:00",
        "updatedBy": "DESKTOP-RPV8VMV\\digit"
    }
    ```

## Conclusion

Whew, you made it. I know it was a lot of steps and code to walk through, but you did it and completed the implementation of EF Core audit tracking. Audit tracking once you know how to implement it is not overly difficult to implement but figuring out all of the moving pieces takes a bit of time. Hopefully, this post has made it easier for you to quickly implement audit tracking.

If you found this post helpful, please share this post on Twitter and Facebook using the share buttons below.

> [See Code for Post](https://github.com/digitaldrummerj/efcore-examples/tree/feature/2-audit-fields)
