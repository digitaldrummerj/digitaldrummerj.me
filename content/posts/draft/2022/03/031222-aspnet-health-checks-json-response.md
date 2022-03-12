---
categories: ["aspnet-core"]
date: 2022-03-12T13:00:00Z
draft: true
title: "Aspnet - Health Checks - Generate Better Response Than Just Text"
url: '/aspnet-core-health-checks-json'
---

<!--more-->

[https://docs.microsoft.com/en-us/aspnet/core/host-and-deploy/health-checks](https://docs.microsoft.com/en-us/aspnet/core/host-and-deploy/health-checks)

The Microsoft.AspNetCore.Diagnostics.HealthChecks package is referenced implicitly for ASP.NET Core apps.

> Note: AspNetCore.Diagnostics.HealthChecks isn't maintained or supported by Microsoft.

Outline

* Setup
* Basic Healthy or Unhealthy Check
* Changing check response to Json
* Json Response Options
* Filtering Health Checks to RUn
* Future Post: Healthy UI

```csharp
using System;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Diagnostics.HealthChecks;

namespace AspNetCore.Example.Healthchecks
{
    public class ExampleHealthCheck : IHealthCheck
    {
        public ExampleHealthCheck()
        {
        }
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
}
```

In `ConfigureServices(IServiceCollection services)`

```csharp
services.Configure<MvcOptions>(options =>
{
    options.EnableEndpointRouting = false;
});

services
    .AddHealthChecks()
    .AddCheck<AcmsHealthCheck>(
        nameof(AcmsHealthCheck),
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

```csharp
using System;

namespace AspNetCore.Example.Healthchecks
{
    public class HealthInfo
    {
        public string Key { get; set; }
        public string Description { get; set; }
        public TimeSpan Duration { get; set; }
        public string Status { get; set; }
        public string Error { get; set; }
    }
}
```

```csharp
using System;
using System.Collections.Generic;

namespace AspNetCore.Example.Healthchecks
{
    public class HealthResult
    {
        public string Name { get; set; }
        public string Status { get; set; }
        public TimeSpan Duration { get; set; }
        public ICollection<HealthInfo> Info { get; set; }
    }
}
```

```csharp
using System;
using System.Linq;
using System.Net.Mime;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics.HealthChecks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.Diagnostics.HealthChecks;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace AspNetCore.Example.Healthchecks
{
    public static class HealthCheckExtensions
    {
        /// <summary>
        ///     Maps the custom health checks.
        /// </summary>
        /// <param name="endpoints">The endpoints.</param>
        /// <param name="endpointUrl">The endpoint URL</param>
        /// <param name="serviceName">Name of the service</param>
        /// <param name="filterTag">The string for the filter</param>
        /// <remarks>see Microsoft docs at <a href="https://docs.microsoft.com/en-us/aspnet/core/host-and-deploy/health-checks?view=aspnetcore-3.1#health-check-options-2" /></remarks>
        /// <example>
        ///     <code>
        ///     {
        ///         "Name":"Example",
        ///         "Status":"Healthy",
        ///         "Duration":"00:00:01.6876124",
        ///         "Info":[
        ///             {
        ///                 "Key":"ExampleHealthCheck",
        ///                 "Description":"Can connect to Db.",
        ///                 "Duration":"00:00:01.2364398",
        ///                 "Status":"Healthy"
        ///             }
        ///         ]
        ///     }
        ///     </code>
        /// </example>
        /// <returns>The health check status.  Status is 503 for unhealth and 200 for Healthy or Degraded.</returns>
        public static IEndpointConventionBuilder MapCustomHealthChecks(
            this IEndpointRouteBuilder endpoints, string endpointUrl, string serviceName, string filterTag = "")
        {
            Func<HealthCheckRegistration, bool> filterPredicate =
                filterPredicate = check => check.Tags.Any(t => t == filterTag);
            if (string.IsNullOrWhiteSpace(filterTag)) filterPredicate = x => true;

            var endpointConventionBuilder = endpoints.MapHealthChecks(endpointUrl, new HealthCheckOptions
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
                                        Status = Enum.GetName(typeof(HealthStatus), e.Value.Status),
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
            });

            return endpointConventionBuilder;
        }
    }
}
```

