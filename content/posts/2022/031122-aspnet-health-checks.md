---
categories: ['aspnet-core']
date: 2022-03-11T13:00:00Z
draft: false
title: "ASPNET Core - Add Health Checks"
url: '/aspnet-core-health-checks'
series: ['ASPNET Core Health Checks']
---

If your ASP.NET Core application communicates with any 3rd party systems, it is beneficial to have health checks to determine if your connection to the 3rd party system is healthy, degraded, or unhealthy.

With ASP.NET Core, Microsoft references Microsoft.AspNetCore.Diagnostics.HealthChecks package implicitly for ASP.NET Core apps.  This means that everything you need architecture wise is available and you just need to create your actual health check code.

<!--more-->

> Note: AspNetCore.Diagnostics.HealthChecks isn't maintained or supported by Microsoft.

## Create Health Check

The first thing we need to do is create our actual health check.

> All of the code in this post is using ASP.NET Core 6.0

```csharp {linenos=true,hl_lines=[12,13,17,18,19]}
namespace AspNetCoreHealthCheckExample;

using Microsoft.Extensions.Diagnostics.HealthChecks;

public class ExampleHealthCheckAsync : IHealthCheck
{
    public Task<HealthCheckResult> CheckHealthAsync(
        HealthCheckContext context, CancellationToken cancellationToken = default)
    {
        try
        {
            return Task.FromResult(
                HealthCheckResult.Healthy("Health Msg Here."));
        }
        catch (Exception)
        {
            return Task.FromResult(
                new HealthCheckResult(
                    context.Registration.FailureStatus, "Unhealth Msg Here."));
        }
    }
}
```

**Line 12-13:** If healthy, return a status of 200 and text response of "Healthy"

**Line 17-19:** If unhealthy, return a status of 503 and text response of "Unhealthy"

## Tell ASP.NET Core About Health Check

If Program.cs, you need to register the health check service:

```csharp
using AspNetCoreHealthCheckExample;

builder.Services.AddHealthChecks()
    .AddCheck<ExampleHealthCheckAsync>("Example");
```

The last item, in the Program.cs, we need to do is to set up the endpoint url for the health check.

```csharp
app.MapHealthChecks("/health");
```

Now, when you run your application (F5) and navigate to /health, you can run your health check, which will return a "Healthy" text response.  If you want to simulate an unhealthy response, just throw an exception into the try block of your health check.

## Conclusion

That was pretty easy and quick to add the ability to run a health check into our application.  The hard part comes next, which is to write the code to check if our application is healthy or not.

However, I find that just having a text response of "Healthy" or "Unhealthy" is not super helpful.  It is incredibly unhelpful when you run multiple health checks at once in which one fails, and you have no idea which one was the "Unhealthy"   one.  In our next post in this series, we will update our healthy response to return JSON to see the status of each of the health checks, how long it took to run, and the description of what it is doing.

```json
{
    "Name":"Example",
    "Status":"Healthy",
    "Duration":"00:00:01.6876124",
    "Info":[
        {
            "Key":"ExampleHealthCheck",
            "Description":"Can connect to Db.",
            "Duration":"00:00:01.2364398",
            "Status":"Healthy"
        }
    ]
}
```

You can also read more about ASP.NET Core Health Checks in the [docs](https://docs.microsoft.com/en-us/aspnet/core/host-and-deploy/health-checks)
