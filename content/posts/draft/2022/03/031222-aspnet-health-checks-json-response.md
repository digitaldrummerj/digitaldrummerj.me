---
categories: ["aspnet-core"]
date: 2022-03-12T13:00:00Z
draft: true
title: "ASP.NET - Health Checks - Generate Better Response Than Just Text"
url: '/aspnet-core-health-checks-json'
series: ['ASP.NET Core Health Checks']
---

In our [previous post](/aspnet-core-health-checks), we added a simple health check to our ASP.NET Core application. Although we only added a single health check, you can add multiple health checks and have multiple run as once.  Regardless if you run a single or multiple health checks, the implementation out of the box, just returns a "Healthy" or "Unhealthy" string, which is not overall helpful to know which component actually failed.

In this post, we are going to update our health check response to return a json record that will let us know the status of each health check that is run as well as the overall health status of the application.

```
{
    "status": "Healthy",
    "duration": "00:00:00.0066738",
    "info":
    [
        {
        "key": "ExampleHealthCheckAsync",
        "description": "Health Msg Here.",
        "duration": "00:00:00.0010113",
        "status": "Healthy",
        "data": {}
        }
    ]
}
```

<!--more-->

To update the health check to return json instead of plain text, we do not actually need to update the health check itself. The update will all be in how we configure the health check in Program.cs.

> If you have not implemented the example health check from the [previous post](/aspnet-core-health-checks), please do so first.

## Create Custom Health Check Response

1. Create file HealthCheckExtensions

    ```text
    HealthCheckExtensions.cs
    ```

1. Add the following code to HealthCheckExtensions.cs to generate our response in JSON

    ```csharp {linenos=true, hl_lines=[]}
   using System.Net.Mime;
    using Microsoft.AspNetCore.Diagnostics.HealthChecks;
    using Microsoft.Extensions.Diagnostics.HealthChecks;
    using System.Text.Json;
    using System.Text.Json.Serialization;

    public static class HealthCheckExtensions
    {
        public static IEndpointConventionBuilder MapCustomHealthChecks(
            this IEndpointRouteBuilder endpoints,
            string endpointUrl,
            string serviceName)
        {
            var jsonSerializerOptions = new JsonSerializerOptions
            {
                WriteIndented = false,
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
                DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull
            };

            var endpointConventionBuilder =
                endpoints.MapHealthChecks(endpointUrl, new HealthCheckOptions
                {
                    ResponseWriter = async (context, report) =>
                    {
                        string json = JsonSerializer.Serialize(
                            new
                            {
                                Name = serviceName,
                                Status = report.Status.ToString(),
                                Duration = report.TotalDuration,
                                Info = report.Entries
                                    .Select(e =>
                                        new
                                        {
                                            Key = e.Key,
                                            Description = e.Value.Description,
                                            Duration = e.Value.Duration,
                                            Status = Enum.GetName(
                                                typeof(HealthStatus),
                                                e.Value.Status),
                                            Error = e.Value.Exception?.Message,
                                            Data = e.Value.Data
                                        })
                                    .ToList()
                            }
                        , jsonSerializerOptions);

                        context.Response.ContentType = MediaTypeNames.Application.Json;
                        await context.Response.WriteAsync(json);
                    }
                });

            return endpointConventionBuilder;
        }
    }
    ```

## Enable Custom Response

In Program.cs

```csharp
app.UseRouting();

app.UseEndpoints(endpoints =>
{
    endpoints.MapCustomHealthChecks("/health", "Example");
});
```


```json
{
    "status": "Healthy",
    "duration": "00:00:00.0066738",
    "info":
    [
        {
        "key": "ExampleHealthCheckAsync",
        "description": "Health Msg Here.",
        "duration": "00:00:00.0010113",
        "status": "Healthy",
        "data": {}
        }
    ]
}
```

## Conclusion

You can also read more about ASP.NET Core Health Checks in the [docs](https://docs.microsoft.com/en-us/aspnet/core/host-and-deploy/health-checks)
