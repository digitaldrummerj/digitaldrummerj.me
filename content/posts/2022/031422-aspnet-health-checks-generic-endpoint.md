---
categories: ["aspnet-core"]
date: 2022-03-14T13:00:00Z
draft: false
title: "ASP.NET - Health Checks - Generic Endpoint"
url: '/aspnet-core-health-checks-generic-endpoint'
series: ['ASP.NET Core Health Checks']
---

In the previous post in the series, we have implemented our health checks that return a json response and allow us to selectively run the health checks based on tags.

In this post, we are going to build on the previous post and update our endpoint mappings to use a generic endpoint builder so that we only have our filters and json response code in a single place.

<!--more-->

> If you have not implemented the example health check from the previous post, you can [download code from previous post](https://github.com/digitaldrummerj/aspnet-core-health-checks/tree/feature/3-filters)


```csharp
public static IEndpointConventionBuilder MapCustomHealthChecks(
    this IEndpointRouteBuilder endpoints,
    string endpointUrl,
    string serviceName,
    string filterTag = "")
{
    Func<HealthCheckRegistration, bool> filterPredicate =
        filterPredicate = check => check.Tags.Any(t => t == filterTag);
    if (string.IsNullOrWhiteSpace(filterTag)) filterPredicate = x => true;

    var endpointConventionBuilder =
        endpoints.MapHealthChecks(
            endpointUrl,
            new HealthCheckOptions
            {
                AllowCachingResponses = false,
                Predicate = filterPredicate,
                ResponseWriter = async (context, report) =>
                {
                    var result = JsonConvert.SerializeObject(
                        new HealthResult
                        {
                            Name = serviceName,
                            Status = report.Status.ToString(),
                            Duration = report.TotalDuration,
                            Info = report.Entries
                                .Select(e =>
                                    new HealthInfo
                                    {
                                        Key = e.Key,
                                        Description = e.Value.Description,
                                        Duration = e.Value.Duration,
                                        Status = Enum.GetName(
                                            typeof(HealthStatus),
                                            e.Value.Status),
                                        Error = e.Value.Exception?.Message
                                    })
                                .ToList()
                        }, Formatting.None,
                        new JsonSerializerSettings
                        {
                            NullValueHandling = NullValueHandling.Ignore,
                            ContractResolver = new CamelCasePropertyNamesContractResolver()
                        });
                    context.Response.ContentType = MediaTypeNames.Application.Json;
                    await context.Response.WriteAsync(result);
                }
            }
        );

    return endpointConventionBuilder;
}
```

```csharp
app.UseRouting();

app.UseAuthorization();

app.UseEndpoints(endpoints =>
{
    endpoints.MapCustomHealthChecks("/health", "Example");
});
```
