---
categories:
    - dotnet-core
    - Testing
date: 2020-05-02T00:00:00Z
draft: true
title: ASP.NET Code Coverage Using DotCover
series: ["Code Coverage"]
---


## Step 1: Add DotCover Nuget Package to Project File

Add the dotCover Dotnet CLI Tool to the Unit Test Project File.

```xml
<ItemGroup>
    <DotNetCliToolReference Include="JetBrains.dotCover.DotNetCliTool" Version="2019.3.4" />
  </ItemGroup>
```

## Step 2: Restore Number Packages

## Step 3: Run Test and Create Test Snapshot

Create Build Step

* Type: Command Line
* Working Directory: Unit Test Project Folder
* Script:

    ```bash
    dotnet dotcover --dotCoverOutput="../UnitTestCodeCoverage.Snapshot.dcvr" test --logger "console;verbosity=normal"
    ```

## Step 4: Report Coverage to TeamCity

You need to create another build step to report the coverage to TeamCity

* Type: Command Line
* Script:

     * (Optional) If you are using a different version of dotCover than what is built into your istance of TeamCity, you need to tell TeamCity where on your build server to find this new version.

        ```bash
        echo ##teamcity[dotNetCoverage dotcover_home='c:\\dotCover.CommandLineTools.2019.3.4']
        ```

     * Let TeamCity Know About the Coverage Report

        ```bash
        echo ##teamcity[importData type='dotNetCoverage' tool='dotcover' path='UnitTestCodeCoverage.Snapshot.dcvr']
        ```
