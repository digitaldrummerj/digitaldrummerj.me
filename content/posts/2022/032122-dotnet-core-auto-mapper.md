---
categories: ["aspnet core"]
date: 2022-03-21T13:00:00Z
draft: false
title: "ASP.NET Core - AutoMapper - Easily Convert One Object to Another"
url: '/aspnet-core-automapper'
series: ["AutoMapper - Getting Started"]
---

**Mapping code is boring. Testing mapping code is even more boring.**

AutoMapper is a simple library built to map one object to another and takes out all of the fuss of mapping one object to another.

In this post, we will create a sample ASP.NET Core API project, install and wire up AutoMapper, and update the sample Weather Forecast Controller to return a view model that was converted from our concrete object to a view model object.

<!--more-->

## What is AutoMapper?

AutoMapper is an object to object mapper that works by transforming an input object of one type into an output object of a different type.

What makes AutoMapper interesting is that it provides conventions to take the work out of figuring out how to map type A to type B. As long as type B follows AutoMapper’s established convention, almost zero configuration is needed to map two types.

## Why use AutoMapper?

As I said before, mapping code is boring and testing mapping code is even more boring.

Without AutoMapper, you have to write lots of for loops to transform the input to an output of a different type and then to be able to reverse it back to the original type.  You also have to write tests for all of that code and maintain it as you add new properties to the objects.

Instead of creating all of those mapping loops, AutoMapper provides simple configuration of types, as well as simple testing of mappings.  As you will see in the next section, one you set up AutoMapper, it only takes a single line of code to convert between types.

## How to use AutoMapper?

We are going to create a sample project, install AutoMapper, and then use AutoMapper to convert an object to a view model.

### Create Sample Project and Install AutoMapper

> The code and configuration below is written using ASP.NET 6.0

1. Create sample project

    ```shell
    dotnet new webapi -o AutoMapperExample
    ```

1. Go into the AutoMapperExample directory

    ```shell
    cd AutoMapperExample
    ```

1. You need to install AutoMapper

    ```shell
    dotnet add package AutoMapper
    ```

1. For ASP.NET Core Dependency Injection, you need to install the AutoMapper Dependency Injection package

    ```shell
    dotnet add package AutoMapper.Extensions.Microsoft.DependencyInjection
    ```

### Create View Model

Now that we have our example project and AutoMapper installed, we are going to modify the dotnet webapi WeatherForecast example that came with our example project, to return a WeatherForecastViewModel instead of the concrete WeatherForecast object.

1. Create a file named WeatherForecastViewModel.cs

    ```text
    WeatherForecastViewModel.cs
    ```

1. Add the following code to the WeatherForecastViewModel.cs

    ```csharp
    namespace AutoMapperExample;

    public class WeatherForecastViewModel
    {
        public DateTime Date { get; set; }

        public int TemperatureC { get; set; }

        public int TemperatureF { get; set; }

        public string? Summary { get; set; }
    }
    ```

### Create AutoMapper Mapping Configuration

Next, we need to tell AutoMapper that we want it to mapper one type to another type and to also be able to reverse the mapping.

1. Create a file named MappingProfile.cs

    ```text
    MappingProfile.cs
    ```

1. Add the following code to create a mapping between WeatherForecast to WeatherForecastViewModel and then reverse it.

    ```csharp
    using AutoMapper;

    namespace AutoMapperExample;

    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<WeatherForecast, WeatherForecastViewModel>()
                .ReverseMap();
        }
    }
    ```

### Tell ASP.NET Core About AutoMapper Configuration

Now that we have our mapping profile set up, we need to tell ASP.NET about the mapping and add AutoMapper to the DependencyInjection so that any time we request an IMapper it will give us an AutoMapper instance.

1. In the Project.cs file, you will need to add the call to AddAutoMapper

    ```csharp
    builder.Services.AddAutoMapper(typeof(MappingProfile));
    ```

1. You will also need to add the namespace to the top of the file to reference the MappingProfile class

    ```csharp
    using AutoMapperExample;
    ```

### Return ViewModel from Controller

The last item we need to do is update our WeatherForecastController to return a view model instead of the concrete class.

1. Open up the Controllers\WeatherForecastController.cs
1. We need to add an _mapper class variable and wire it up in the constructor

    ```csharp
    private readonly ILogger<WeatherForecastController> _logger;

    private readonly IMapper _mapper;

    public WeatherForecastController(
        ILogger<WeatherForecastController> logger,
        IMapper mapper)
    {
        _logger = logger;
        _mapper = mapper;
    }
    ```

1. Next, we need to update the Get method to return a view model and use AutoMapper to convert the WeatherForecast to WeatherForecastViewModel

    ```csharp
    [HttpGet(Name = "GetWeatherForecast")]
    public IEnumerable<WeatherForecastViewModel> Get()
    {
        var weatherForecasts = Enumerable.Range(1, 5)
            .Select(index =>
                new WeatherForecast
                {
                    Date = DateTime.Now.AddDays(index),
                    TemperatureC = Random.Shared.Next(-20, 55),
                    Summary = Summaries[Random.Shared.Next(Summaries.Length)]
                })
            .ToList();

        return _mapper.Map<List<WeatherForecastViewModel>>(weatherForecasts);
    }
    ```

1. Now launch the project with F5 and navigate to /swagger
1. Run the WeatherForecast get method and you will see that it returns the WeatherForecastViewModel and that AutoMapper does all of the mapping work for us and even ignores that fact that there is no Summary property in the ViewModel.

## Conclussion

Now that everything is working, next time you need to create a mapping, you just need to create the view model, add the mapping to our MappingProfile and then call the Map function to convert between objects.

AutoMapper as configured above only works as expected if our input and output objects have the same property names and the mapping configuration is correct.

In future post, we will look at how to write a unit test for our mapping configuration to make sure that profile is correct and we will look at how to configure our mapping when property names do not match between the input and output object.
