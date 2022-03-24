---
categories: ["testing", "aspnet core", "dotcover"]
date: 2022-02-06T13:00:00Z
published: true
title: "dotCover - Optimizing Coverage Report to Only Include Our Applications Logic"
url: '/aspnet-core-code-coverage-tuning-dotCover/'
series: ['ASP.NET Core Code Coverage']
---
In [part 1](/aspnet-core-code-coverage) of the ASPNET Code Coverage Using dotCover, we hooked up dotCover to our project to generate our code coverage report.  It was pretty easy to hook it up but the number is not the most accurate as it includes every file that is part of the solution including our test project and all of the ASP.NET WebApi code.

When looking at code coverage, we only want to include files that make sense to test against so that our code coverage number is the most accurate.  So that means we should exclude our unit tests project from the report since we are not going to run tests against our test projects.  Same thing with the ASP.NET WebApi startup.cs, program.cs and Controllers as we would want to test those using integration tests and not unit tests.

<!--more-->

In the previous article, we used the following command to run generate our coverage report.

```bash
dotnet dotCover test --dcReportType=HTML --logger "console;verbosity=normal"
```

To add and exclude files we need to add the `dotCoverFilters` parameter.  The `dotCoverFilters` allows us to both add and remove assemblies, classes, modules, and functions.  Asterisk (*) wildcard is also supported.

* to add we use start the filter with `+:` followed by the type (e.g. Assembly, Class, Module, Function)
* to remove we start the filter with `-:` followed by the type (e.g. Assembly, Class, Module, Function

In the example command below we:

1. Add all assemblies in the solution with `+:Assembly=<Name>.*` where `<Name>` is the full name of the assembly.
1. Remove the Unit Test and Mock Data projects with `-:Assembly=<Name>.UnitTest;-:Assembly=<Name>.MockData` where `<Name>` is the full name of the assembly
1. Remove Api Controllers, Startup and Program files, and Entity Framework migrations with `-:Class=<Name>.Controllers.*;-:Class=<Name>.Startup;-:Class=<Name>.Program;-:Class=<Name>.*`  where `<Name>` is the full name of the namespace that hold all of the migration classes.

```bash
dotnet dotcover test --dcReportType=HTML --logger "console;verbosity=normal" --dotCoverFilters="+:Assembly=Aspnet.Coverage.*;-:Assembly=Aspnet.Coverage.UnitTests;-:Assembly=Aspnet.Coverage.MockData;-:Class=Aspnet.Coverage.Api.Controllers.*;-:Class=Aspnet.Coverage.Api.Startup;-:Class=Aspnet.Coverage.Api.Program;-:Class=Aspnet.Coverage.Api.Migrations.*"
```

> The most important thing when adding the `dotCoverFilters` is to not abuse it by excluding files that should actually be tested.

![dotnet dotcover optimized report](/images/aspnet-core-dotcover/dotcover-run-optimized.gif)

> This command also ran 33% faster as it had less files to examine.

The report also now includes just the files that are truly should be under tests (e.g. our business logic) and the amount of code covered went from 11% to 71%.

![dotcover optimized report](/images/aspnet-core-dotcover/dotcover-report-optimized.png)

In the next post in the series, we will add our code coverage report as part of our TeamCity build.

> If you want to download the project that I used for this post, you can do so at [https://github.com/digitaldrummerj/aspnet-core-code-coverage-example](https://github.com/digitaldrummerj/aspnet-core-code-coverage-example).  It is based on .NET 3.1.
