---
categories: ["testing", "dotnet-core", "teamcity", "dotcover"]
date: 2022-02-08T13:00:00Z
published: true
title: "DotCover - Combine Multiple Results into Single Report"
url: '/dotcover-combine-multiple-results'
series: ['ASP.NET Core Code Coverage']
---
In TeamCity, what if you need to combine the code coverage results say from unit test and integration test projectsthst run as seperate build steps?

Luckily, TeamCity does this work for you but it is not obvious that it will do it for.

To get TeamCity to combine the multiple the code coverage results into a single code coverage result, you just need to add the echo command to import the data into the build like we did in our [previous post](/aspnet-core-code-coverage-tuning-dotCover/)

<!--more-->

## Unit Test Example

```bash
echo ##teamcity[dotNetCoverage dotcover_home='c:\\dotCover.CommandLineTools.2021.3.3']
echo ##teamcity[importData type='dotNetCoverage' tool='dotCover' path='Aspnet.Coverage.UnitTests\UnitTestCodeCoverage.Snapshot.dcvr']
```

## Integration Test Example

```bash
echo ##teamcity[dotNetCoverage dotcover_home='c:\\dotCover.CommandLineTools.2021.3.3']
echo ##teamcity[importData type='dotNetCoverage' tool='dotCover' path='Aspnet.Coverage.IntegrationTests\IntegrationTestCodeCoverage.Snapshot.dcvr']
```

When TeamCity run the echo import data commands for both the `UnitTestCodeCoverage.Snapshot.dcvr` and `IntegrationTestCodeCoverage.Snapshot.dvcr` files, it will combine them together into a single code coverage report.

In our next post, we are going to go through how to implement a build run each test projects in parallel and keep the reports from combining together.
