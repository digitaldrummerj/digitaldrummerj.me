---
categories: ["testing", "dotnet-core", "teamcity", "dotcover"]
date: 2022-02-09T13:00:00Z
published: true
title: dotCover - How in TeamCity to create multiple coverage reports
url: '/teamcity-composite-builds'
series: ['ASP.NET Core Code Coverage']
---

In our [previous post](/dotcover-combine-multiple-results/), we talked about how TeamCity automatically combines multiple dotCover outputs into a single code coverage report but what if we wanted to keep thoose reports seperate?

You might be thinking why would you want to do this?  Don’t you want to see the overall test coverage?

The overall coverage is nice but when you have both unit tests and integration tests, or multiple test projects serving different purposes, there is a high potential that you are reporting lines of code being covered that were only called but not actually tested.

In this post, we are going to look at how in TeamCity you can run multiple test builds to generate both individual reports and still have a combined report.

<!--more-->

## Why do we need seperate code coverage reports?

Before I dive into the reason the reporting may be higher than reality, lets define the difference between a unit test and integration test.

**Unit Test:** testing the business logic and data layers of your application with dependencies mocked out.  You are testing the smallest unit of work possible.

**Integration Test:**  testing the whole flow of the application starting with what the user interfaces with (UI or Api endpoints) and dependencies are typically not mocked out.

If we look at an ASP.NET Web Api, the integration test would call the REST endpoint while the unit test would only call a single method in the business logic.  This is where the problem comes in!

With the integration test since it start at the endpoint, that means it calls all of the business logic along the way.  So in a combined code coverage report, every line of code that the endpoint calls is considered covered.  However, a lot of times the integration tests are looking more at things like security checks on the endpoints or  making sure the returned view model is correct or validating how an exception looks coming back to the caller.  The integration tests may not actually be looking in depth at the businesss logic like a unit test would.  However, if you look at the combined report, it is not clear what lines of business logic code is not actually being tested and can you lead you to believe that you have more test coverage than you actually do.

This is exactly what is happening on one of my projects as the integration tests are only validating the security setup of the endpoints to ensure that only allows users have data returned and all others get a 403 Forbidden error. For the 403 Forbidden error, the code coverage is spot on as the code stops within the endpoint and returns an error message.  However, for authorization success, it call as the way through all the layers of the application and returns data which makes it look like we tested our business logic when is reality we did not run a single tests against that logic in our integration test.  So for us, it was very important to have the individual code coverage reports for unit tests and integration tests so that we could easily see where we have gaps in the unit test that are testing our business logic.

However, we do still like to have the combine report just for reporting purposes to get an overall picture of how we are doing.

## Implementation

For our TeamCity build, we are going to set up 3 builds in total for this work.

1. Unit test build to generate the individual report with the snapshot as a build artifact
1. Integration test build to generate the individual report with the snapshot as a build artifact
1. A build that has a dependency on the unit and integration test builds and takes the artifact for each of those builds to do a combined report.

> **Note:** We could use a composite build in TeamCity to have a build call the individual builds but one of the limitations of a composite build is that it can not have its own build steps, so we could not be able to easily create a combined report.

### Create the Unit Test Build

The unit test build will have 4 builds steps, save the dotCover snapshot file as a build artifact and create the code coverage report.

#### Build Steps

Our unit test build consist of 4 steps to restore our nuget packages, run our tests with code coverage, make a copy of the snapshot file and create our code coverage report.

1. Create a build step that is a command line step with the working directory as the Unit Test project folder and the custom script has the command `dotnet restore`

    ```shell
    dotnet restore
    ```

    ![dotnet restore build step](/images/aspnet-core-dotcover/teamcity-dotnet-restore.png)

1. Create a build step that is a command line type with a script to run our test with code coverage turned on:

    ```shell
    dotnet dotcover test --logger "console;verbosity=normal" --dotCoverFilters="+:Assembly=Aspnet.Coverage.*;-:Assembly=Aspnet.Coverage.UnitTests;-:Assembly=Aspnet.Coverage.MockData;-:Class=Aspnet.Coverage.Api.Controllers.*;-:Class=Aspnet.Coverage.Api.Startup;-:Class=Aspnet.Coverage.Api.Program;-:Class=Aspnet.Coverage.Api.Migrations.*"
    ```

    ![unit test build run dotcover](/images/aspnet-core-dotcover/teamcity-composite-unit-tests-dotcover.png)

1. Create a another build step that is a command line type with a script that will make a copy of our snapshot file created by our previous step

    > When TeamCity process the snapshot in the next step, it removes the snapshot file, so the copy is required to be able to make the snapshot a build artifact to use in our combined build that we will create later in this post.

    ```shell
    copy UnitTestCodeCoverage.Snapshot.dcvr UnitTestCodeCoverage-Show.Snapshot.dcvr
    ```

    ![unit test build make copy of dotcover snapshot](/images/aspnet-core-dotcover/teamcity-composite-unit-tests-copy-snapshot.png)

1. Create the last build step that is a command line type with a script that will process the dotcover results for the unit tests:

    ```shell
    echo ##teamcity[dotNetCoverage dotcover_home='c:\\dotCover.CommandLineTools.2021.3.3']

    echo ##teamcity[importData type='dotNetCoverage' tool='dotCover' path='Aspnet.Coverage.UnitTests\UnitTestCodeCoverage-Show.Snapshot.dcvr']
    ```

    ![unit test build process dotcover results](/images/aspnet-core-dotcover/teamcity-composite-unit-tests-dotcover-results.png)

#### Unit Test Build Artifact Setup

The last thing we need to do for your unit test build is to tell TeamCity to make the snapshot that we copied in the build step above as a build artifact.

1. On the left menu in TeamCity , click on the General Settings option and then in the Artifact paths section add the snapshot file to the list

    ```cmd
    +:Aspnet.Coverage.UnitTests\UnitTestCodeCoverage.Snapshot.dcvr
    ```

    ![unit test build artifact setup](/images/aspnet-core-dotcover/teamcity-composite-unit-tests-artifacts.png)

### Create the Integration Test Build

The integration test build will have 4 builds steps, save the dotCover snapshot file as a build artifact and create the code coverage report.

#### Integration Test Build Steps

Our integration test build consist of 4 steps to restore our nuget packages, run our tests with code coverage, make a copy of the snapshot file and create our code coverage report.

1. Create a build step that is a command line step with the working directory as the Unit Test project folder and the custom script has the command `dotnet restore`

    ```shell
    dotnet restore
    ```

1. Create a build step that is a command line type with a script to run our test with code coverage turned on:

    ```shell
    dotnet dotcover test --dotCoverOutput="IntegrationTestCodeCoverage.Snapshot.dcvr" --logger "console;verbosity=normal" --dotCoverFilters="+:Assembly=Aspnet.Coverage.*;-:Assembly=Aspnet.Coverage.*Tests;-:Assembly=Aspnet.Coverage.MockData;-:Class=Aspnet.Coverage.Api.Migrations.*"
    ```

    ![integration test build run dotcover](/images/aspnet-core-dotcover/teamcity-composite-integration-tests-dotcover.png)

1. Create a another build step that is a command line type with a script that will make a copy of our snapshot file created by our previous step

    > When TeamCity process the snapshot in the next step, it removes the snapshot file, so the copy is required to be able to make the snapshot a build artifact to use in our combined build that we will create later in this post.

    ```shell
    copy IntegrationTestCodeCoverage.Snapshot.dcvr IntegrationTestCodeCoverage-Show.Snapshot.dcvr
    ```

    ![integration test build make copy of dotcover snapshot](/images/aspnet-core-dotcover/teamcity-composite-integration-tests-snapshot-copy.png)

1. Create the last build step that is a command line type with a script that will process the dotcover results for the unit tests:

    ```shell
    echo ##teamcity[dotNetCoverage dotcover_home='c:\\dotCover.CommandLineTools.2021.3.3']

    echo ##teamcity[importData type='dotNetCoverage' tool='dotCover' path='Aspnet.Coverage.IntegrationTests\IntegrationTestCodeCoverage-Show.Snapshot.dcvr']
    ```

    ![integration test build process dotcover results](/images/aspnet-core-dotcover/teamcity-composite-integration-tests-dotcover-results.png)

#### Integration Test Build Artifact Setup

The last thing we need to do for your integration test build is to tell TeamCity to make the snapshot that we copied in the build step above as a build artifact.

1. On the left menu in TeamCity , click on the General Settings option and then in the Artifact paths section add the snapshot file to the list

    ```txt
    +:Aspnet.Coverage.IntegrationTests\IntegrationTestCodeCoverage.Snapshot.dcvr
    ```

    ![integration test build artifact setup](/images/aspnet-core-dotcover/teamcity-composite-integration-tests-artifacts.png)

### Create the Combine Report Build

For our combined report build we will be creating a dependency on the unit and integration test builds that we created above and then telling TeamCity about the snapshots so that it creates the report for us.

#### Combined Build TeamCity Dependencies Setup

1. Create a build that is a regular build and hook it up to the repository so that we can get the source code in our dotCover report.

1. After the build is created, click on Dependencies on the left menu and add the unit test and integration builds as snapshot dependencies

    ![combined build snapshot dependencies](/images/aspnet-core-dotcover/teamcity-composite-snapshot.png)

1. Under the dependencies, you also need to setup an artifact dependency for the dotcover snapshots that we made as a build artifact in our unit and integration test builds

    ![combined build artifact dependencies](/images/aspnet-core-dotcover/teamcity-composite-artifacts.png)

#### Combined Build Steps

1. Add a command line build step with the script below to process the unit test build dotCover snapshot

    ```bash
    echo ##teamcity[dotNetCoverage dotcover_home='c:\\dotCover.CommandLineTools.2021.3.3']

    echo ##teamcity[importData type='dotNetCoverage' tool='dotcover' path='UnitTestCodeCoverage.Snapshot.dcvr']
    ```

    ![combined build process unit test coverage](/images/aspnet-core-dotcover/teamcity-composite-combined-unit-test.png)

1. Add a command line build step with the script below to process the integration test build dotCover snapshot

    ```bash
    echo ##teamcity[dotNetCoverage dotcover_home='c:\\dotCover.CommandLineTools.2021.3.3']
    echo ##teamcity[importData type='dotNetCoverage' tool='dotcover' path='IntegrationTestCodeCoverage.Snapshot.dcvr']
    ```

    ![combined build process integration test coverage](/images/aspnet-core-dotcover/teamcity-composite-combined-integration-test.png)

Now when you run the combined build, it will run the unit test and integration test builds and then it will take the artifacts from those two builds to create the combined dotCover code coverage report.
The last thing we need to do for your integration test build is to tell TeamCity to make the snapshot that we copied in the build step above as a build artifact.
