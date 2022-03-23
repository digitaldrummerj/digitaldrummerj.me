---
categories: ["aspnet core"]
date: 2022-03-23T13:00:00Z
draft: false
title: "ASP.NET Core - AutoMapper - Handle When Property Names Are Not Same Between Objects"
url: '/aspnet-core-automapper-property-names-not-same'
series: ["AutoMapper - Getting Started"]
---

So far in our AutoMapper series all of the property names between the input and output objects have been the same.  There are times though that the property names will not match and you will need to tell AutoMapper how to map the properties else the configuration will not be valid.

In this post, we will take a look at the AutoMapper configuration need to map between property names that do not match.

<!--more-->

> [get code from previous post](https://github.com/digitaldrummerj/aspnet-core-automapper-example/tree/feature/2-automapper-testing).  Once you have code downloaded, checkout the branch feature/2-automapper-testing

Before we can look at the AutoMapper configuration, we need to make the property names different between the input (WeatherForecast) and output (WeatherForecastViewModel).  In the code below, we are going to update the WeatherForecastViewModel to change the Summary property name to SummaryText.

```csharp
namespace AutoMapperExample;

public class WeatherForecastViewModel
{
    public DateTime Date { get; set; }

    public int TemperatureC { get; set; }

    public int TemperatureF { get; set; }

    public string? SummaryText { get; set; }
}
```

Now that our property names do not match, we need to update our MappingProfile to tell AutoMapper how to map between the differently named properties.  Luckily, AutoMapper will still handle all of the property names that are the same, so we only need to tell AutoMapper about the properties that are different.

To our mapping between WeatherForecast and WeatherForecastViewModel we need to add a call to ForMember and tell it how to map the output to the input property for Summary and SummaryText.

```csharp
CreateMap<WeatherForecast, WeatherForecastViewModel>()
    .ForMember(dest => dest.SummaryText, input => input.MapFrom(i => i.Summary))
    .ReverseMap();
```

Just like that AutoMapper is able to map Summary to SummaryText.  For each property name that do not match, you will need to add a call to ForMember.

> [See Code for Post](https://github.com/digitaldrummerj/aspnet-core-automapper-example/tree/feature/2-automapper-names-not-same)
