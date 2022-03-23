---
categories: ["aspnet core"]
date: 2022-03-22T13:00:00Z
draft: false
title: "ASP.NET Core - AutoMapper - Test Mapping Configuration"
url: '/aspnet-core-automapper-testing'
series: ["AutoMapper - Getting Started"]
---

In our [previous post](/aspnet-core-automapper), we used AutoMapper to convert from a entity to a view model.  In our example code, it only works as expected in happy path mode where the configuration is valid and there is no way to know the configuration is not valid until we run the application.

In this post, we are going to look at how with just a few lines of code, we can write a unit test to validate our AutoMapper mapping profile.

<!--more-->

In our working AutoMapper example in the previous post, if we change the WeatherForecastViewModel Summary property name to SummaryText and then run the xunit tests that are going to create in a moment, we will get the following error that lets us know that we have properties that are not mapped between the two objects.

![AutoMapper profile config test failure](/images/automapper/automapper-config-test-failed.png)

> If you changed the WeatherForecastViewModel Summary property name, go ahead and change it back to Summary.

Now we are going to create our XUnit project and mapping profile test.

1. In our project directory, create a new folder called AutoMapperExample.UnitTests
1. cd into AutoMapperExample.UnitTests
1. Create our XUnit project using the dotnet cli

    ```shell
    dotnet new xunit
    ```

1. Add a reference to the AutoMapperExample.API project

    ```shell
    dotnet add reference ..\AutoMapperExample.API\AutoMapperExample.csproj
    ```

1. Open the project in your code editor
1. Delete the file UnitTest1.cs
1. Create a new file named  MappingProfileTests.cs
1. Add the following code to the MappingProfileTests.cs to load our mapping profile and assets that the configuration is valid

    ```csharp
    using AutoMapper;
    using Xunit;

    namespace AutoMapperExample.UnitTests;

    public class MappingProfileTests
    {
        [Fact]
        public void ValidateMappingConfigurationTest()
        {
            MapperConfiguration mapperConfig = new MapperConfiguration(
            cfg =>
            {
                cfg.AddProfile(new MappingProfile());
            });

            IMapper mapper = new Mapper(mapperConfig);

            mapper.ConfigurationProvider.AssertConfigurationIsValid();
        }
    }
    ```

Now you are able to validate that the AutoMapper mapping profile is valid as part of your testing and automated builds.

In our next post on AutoMapper, we will take a look at what to do when property names are not the same between the input and output.