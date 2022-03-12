---
categories: ["aspnet-core"]
draft: true
date: 2022-03-13T13:00:00Z
title: "ASP.NET - Selectively Run Health Check"
url: '/aspnet-core-health-checks-filter'
series: ['ASP.NET Core Health Checks']
---

<!--more-->

In `ConfigureServices(IServiceCollection services)`

```csharp
services
    .AddHealthChecks()
    .AddCheck<ExampleHealthCheckAsync>(
        nameof(ExampleHealthCheckAsync),
        tags: new [] { "Example" }
    );
```

In `Configure(IApplicationBuilder app, IWebHostEnvironment env, IServiceProvider serviceProvider)`

```csharp
app.UseEndpoints(endpoints =>
{
    endpoints.MapCustomHealthChecks("/health/example", "Example", "Example");
    endpoints.MapCustomHealthChecks("/health", "All");
});
```

```csharp {linenos=true,hl_lines=["7-9",17]}
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

You can also read more about ASP.NET Core Health Checks in the [docs](https://docs.microsoft.com/en-us/aspnet/core/host-and-deploy/health-checks)
