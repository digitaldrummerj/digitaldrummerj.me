---
categories: ["aspnet core"]
date: 2022-03-14T13:00:00Z
draft: false
title: "ASP.NET - Health Checks - Generic Endpoint"
url: '/aspnet-core-health-checks-generic-endpoint'
series: ['ASP.NET Core Health Checks']
---

In the previous post in the series, we have implemented our health checks that return a json response and allow us to selectively run the health checks based on tags.

In this post, we are going to build on the previous post and update our endpoint mappings to use a generic endpoint builder so that we only have our filters and json response code in a single place.

<!--more-->

> If you have not implemented the example health check from the previous post, you can [download code from previous post](https://github.com/digitaldrummerj/aspnet-core-health-checks-example/tree/feature/3-filters)

1. Create a file called HealthCheckExtension.cs
1. Add the following code to the HealthCheckExtension.cs to create a custom health check endpoint that will map a health check to the url and tag filter provided.

    ```csharp
    using System.Net.Mime;
    using Microsoft.Extensions.Diagnostics.HealthChecks;
    using System.Text.Json;
    using System.Text.Json.Serialization;
    using Microsoft.AspNetCore.Diagnostics.HealthChecks;

    public static class HealthCheckExtensions
    {
        public static IEndpointConventionBuilder MapCustomHealthChecks (
            this IEndpointRouteBuilder endpoint,
            string endpointUrl,
            string checkName,
            string tagToFilter = ""
        )
        {
            var endpointConventionBuilder = endpoint.MapHealthChecks(
                endpointUrl,
                new HealthCheckOptions
                {
                    Predicate = GetFilter(tagToFilter),
                    ResponseWriter = async (context, report) => {
                        string json = CreateJsonResponse(report, checkName);
                        context.Response.ContentType = MediaTypeNames.Application.Json;
                        await context.Response.WriteAsync(json);
                    }
                }
            );

            return endpointConventionBuilder;
        }

        private static Func<HealthCheckRegistration, bool> GetFilter (string tag)
        {
            Func<HealthCheckRegistration, bool> filterPredicate =
                filterPredicate = check => check.Tags.Any(t => t == tag);
            if (string.IsNullOrWhiteSpace(tag)) filterPredicate = x => true;

            return filterPredicate;
        }

        private static JsonSerializerOptions GetJsonSerializerOptions()
        {
            var jsonSerializerOptions = new JsonSerializerOptions
            {
                WriteIndented = false,
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
                DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull
            };

            return jsonSerializerOptions;
        }
        private static string CreateJsonResponse(HealthReport report, string checkName)
        {
            string json = JsonSerializer.Serialize(
                new
                {
                    Name = checkName,
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
                GetJsonSerializerOptions());

            return json;
        }
    }
    ```

1. In the Program.cs file replace the app.UseEndpoints with the following code that wires up the health checks using the MapCustomHealthChecks extensions that we created above

    ```csharp
    app.UseEndpoints(endpoints =>
    {
        // runs all health checks
        endpoints.MapCustomHealthChecks("/health", "All Checks");

        // runs health checks with tag Example
        endpoints.MapCustomHealthChecks("/health/example", "Example Checks", "Example");

        // runs health checks with tag Example2
        endpoints.MapCustomHealthChecks("/health/example2", "Example Checks 2", "Example2");
    });
    ```

Now our health check endpoints will all follow the same standard and are easier to wire up.
