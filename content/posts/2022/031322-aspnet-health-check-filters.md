---
categories: ["aspnet core"]
draft: false
date: 2022-03-13T13:00:00Z
title: "ASP.NET - Selectively Run Health Checks"
url: '/aspnet-core-health-checks-filter'
series: ['ASP.NET Core Health Checks']
---
In [part 1](/aspnet-core-health-checks) we create our basic ASP.NET Core health check and then in [part 2](/aspnet-core-health-checks-json) we changed from plain text "Healthy" or "Unhealthy" to a json response that let us know the stauts of each health check.

In our previous post, we have only have a single health check so it has been ok to have all health checks run when we hit our health check endpoint.  However, if we had multiple health checks we are going to want to be able to run them by themselves as well as run the whole suite.

In this post, we will are going to add the ability to selectively run our health checks and create endpoints that will run either a set of health checks or all of the health checks.

<!--more-->

> If you have not implemented the example health check from [part 1](/aspnet-core-health-checks) and [part 2](/aspnet-core-health-checks-json), please do so first or [download code from previous post](https://github.com/digitaldrummerj/aspnet-core-health-checks/tree/feature/2-json-response)

To demonstrate selectively running of health checks, we need to add a second health check.

Create second health check called ExampleHealthCheck2.cs

```text
ExampleHealthCheck2.cs
```

Add the following code to the ExampleHealthCheck2.cs file.   This is a copy of the ExampleHealthCheck.cs with the messages changed.

```csharp
namespace AspNetCoreHealthCheckExample;

using Microsoft.Extensions.Diagnostics.HealthChecks;

public class ExampleHealthCheck2Async : IHealthCheck
{
    public Task<HealthCheckResult> CheckHealthAsync(
        HealthCheckContext context, CancellationToken cancellationToken = default)
    {
        try
        {
            return Task.FromResult(

                HealthCheckResult.Healthy("Health Check 2 Msg Here."));
        }
        catch (Exception)
        {
            return Task.FromResult(
                new HealthCheckResult(
                    context.Registration.FailureStatus, "Unhealthy Check 2 Msg Here."));
        }
    }
}
```

The next task we need to do is add tags when we tell ASP.NET Core about our health checks by adding the tags parameter and giving 1 or more tags names.

```csharp {linenos=true,hl_lines=[4,9]}
builder.Services.AddHealthChecks()
    .AddCheck<ExampleHealthCheckAsync>(
        "Example",
        tags: new [] { "Example" });

builder.Services.AddHealthChecks()
    .AddCheck<ExampleHealthCheck2Async>(
        "Example2",
        tags: new[] { "Example2" });
```

The last item we need to do is to create new health check endpoints that only run health checks that match a given tag by using the Predicate parameter.

```csharp {linenos=true,hl_lines=[8,14]}
endpoints.MapHealthChecks("/health", new HealthCheckOptions()
{
    ResponseWriter = HealthCheckExtensions.WriteResponse
});

endpoints.MapHealthChecks("/health/example", new HealthCheckOptions()
{
    Predicate = p => p.Tags.Any(t => t == "Example"),
    ResponseWriter = HealthCheckExtensions.WriteResponse
});

endpoints.MapHealthChecks("/health/example2", new HealthCheckOptions()
{
    Predicate = p => p.Tags.Any(t => t == "Example2"),
    ResponseWriter = HealthCheckExtensions.WriteResponse
});
```

Now when you navigate to the `/health` endpoint it will run all health checks and when you navigate to `/health/example` and `/health/example2` it will only run the health checks that match the tag.

In our next post in this series, we will update our endpoint mapping to use a generic endpoint that provides filtering and returns json with a single line of code.

[Download Code Example](https://github.com/digitaldrummerj/aspnet-core-health-checks/tree/feature/3-filter)

> You can also read more about ASP.NET Core Health Checks in the [docs](https://docs.microsoft.com/en-us/aspnet/core/host-and-deploy/health-checks)
