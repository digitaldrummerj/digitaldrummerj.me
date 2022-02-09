---
categories: ["testing", "dotnet-core", "teamcity", "dotcover"]
date: 2022-02-09T13:00:00Z
published: false
title: dotCover - How to not combine multiple coverage reports in TeamCity
url: '/teamcity-composite-builds'
---

In our previous post, we talked about how TeamCity automatically combines multiple dotCover outputs into a single code coverage report but what if we wanted to keep thoose reports seperate?

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

![unit test build artifact setup](/images/aspnet-core-dotcover/teamcity-composite-unit-tests-artifacts.png)

![unit test build run dotcover](/images/aspnet-core-dotcover/teamcity-composite-unit-tests-dotcover.png)

![unit test build make copy of dotcover snapshot](/images/aspnet-core-dotcover/teamcity-composite-unit-tests-copy-snapshot.png)

![unit test build process dotcover results](/images/aspnet-core-dotcover/teamcity-composite-unit-tests-dotcover-results.png)

### Create the Integration Test Build

![integration test build artifact setup](/images/aspnet-core-dotcover/teamcity-composite-integration-tests-artifacts.png)

![integration test build run dotcover](/images/aspnet-core-dotcover/teamcity-composite-integration-tests-dotcover.png)

![integration test build make copy of dotcover snapshot](/images/aspnet-core-dotcover/teamcity-composite-integration-tests-snapshot-copy.png)

![integration test build process dotcover results](/images/aspnet-core-dotcover/teamcity-composite-integration-tests-dotcover-results.png)

### Create the Combine Report Build

![combined build create](/images/aspnet-core-dotcover/teamcity-create-composite-build.png)

![combined build version control](/images/aspnet-core-dotcover/teamcity-composite-config-from-url.png)

![combined build auto-detected build steps](/images/aspnet-core-dotcover/teamcity-composite-detect-build-steps.png)

![combined build snapshot dependencies](/images/aspnet-core-dotcover/teamcity-composite-snapshot.png)

![combined build artifact dependencies](/images/aspnet-core-dotcover/teamcity-composite-artifacts.png)

![combined build process unit test coverage](/images/aspnet-core-dotcover/teamcity-composite-combined-unit-test.png)

![combined build process integration test coverage](/images/aspnet-core-dotcover/teamcity-composite-combined-integration-test.png)

