---
categories: ["testing", "dotnet-core"]
date: 2022-02-07T13:00:00Z
published: false
title: "ASP.NET Core - Code Coverage in TeamCity"
url: '/aspnet-core-code-coverage-teamcity/'
series: ['aspnet-core-code-coverage']
---
In the previous two post in the series, we setup and optimized our code coverage using the command line version of dotCover.  In this post, we are going to add our code coverage to our TeamCity automated builds.

<!--more-->


Create Build Step

* Type: Command Line
* Working Directory: Unit Test Project Folder
* Script:

    ```bash
    dotnet dotCover --dotCoverOutput="../UnitTestCodeCoverage.Snapshot.dcvr" test --logger "console;verbosity=normal"
    ```

## Step 4: Report Coverage to TeamCity

You need to create another build step to report the coverage to TeamCity

* Type: Command Line
* Script:
  * (Optional) If you are using a different version of dotCover than what is built into your istance of TeamCity, you need to tell TeamCity where on your build server to find this new version.

  ```bash
  echo ##teamcity[dotNetCoverage dotCover_home='c:\\dotCover.CommandLineTools.2019.3.4']
  ```

  * Let TeamCity Know About the Coverage Report

  ```bash
  echo ##teamcity[importData type='dotNetCoverage' tool='dotCover' path='UnitTestCodeCoverage.Snapshot.dcvr']
  ```
