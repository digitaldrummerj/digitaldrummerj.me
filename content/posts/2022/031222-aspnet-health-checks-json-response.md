---
categories: ["aspnet-core"]
date: 2022-03-12T13:00:00Z
draft: false
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

To create our custom json response, we are going to create a method that takes in a HealthReport, loops through the report and create a json resppnse.

1. Create file HealthCheckExtensions

    ```text
    HealthCheckExtensions.cs
    ```

1. Add the following code to HealthCheckExtensions.cs to generate our response in JSON

    ```csharp {linenos=true, hl_lines=["20-38"]}
    using System.Net.Mime;
    using Microsoft.Extensions.Diagnostics.HealthChecks;
    using System.Text.Json;
    using System.Text.Json.Serialization;

    public static class HealthCheckExtensions
    {
        public static Task WriteResponse(
            HttpContext context,
            HealthReport report)
        {
            var jsonSerializerOptions = new JsonSerializerOptions
            {
                WriteIndented = false,
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
                DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull
            };

            string json = JsonSerializer.Serialize(
                new
                {
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
                },
                jsonSerializerOptions);

                context.Response.ContentType = MediaTypeNames.Application.Json;
                return context.Response.WriteAsync(json);
            }
    }
    ```

## Enable Custom Response

To enable the custom response, we need to update Program.cs to enable routing and then use endpoints.

In Program.cs, remove the following line from our previous setup

```csharp
app.MapHealthChecks("/health");
```

In Program.cs, add the following lines to use the new HealthCheckExtensions.WriteResponse.  If you are using app.UseAuthorization, you need to put the app.UseRouting() above it and the app.UseEndpoints below it.

```csharp
app.UseRouting();

// app.UseAuthorization();

app.UseEndpoints(endpoints =>
{
    endpoints.MapHealthChecks(“/health”, new HealthCheckOptions()
    {
        ResponseWriter = HealthCheckExtensions.WriteResponse
    });
});
```

Now when run your application and go to /health the response we look similar to:

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

## Conclusion

The returned json is way more informative and helpful than the plain text response.  It will become even more helpful when you have multiple health checks running at the same time and need to see the status of each one to figure out the failure.

Also, right now, when you run the health checks, it will run all of the health checks.  We only have a single health check, but as this grows into multiple health checks, it would be nice to be able to run specific health checks.  In our next post, this is exactly what we will be doing as we create filters to run only specific health checks.

You can also read more about ASP.NET Core Health Checks in the [docs](https://docs.microsoft.com/en-us/aspnet/core/host-and-deploy/health-checks)
