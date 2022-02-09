---
categories: ["testing", "dotnet-core", "teamcity", "dotcover"]
date: 2022-02-09T13:00:00Z
published: false
title: dotCover - How to not combine multiple coverage reports in TeamCity
url: '/teamcity-composite-builds'
---

In our previous post, we talked about how TeamCity automatically combines multiple dotCover outputs into a single code coverage report but what if we wanted to keep thoose reports seperate?

You might be thinking why would you want to do this?  Don’t you want to see the overall test coverage?

The overall coverage is nice but when you have both unit tests and integration tests, there is a high potential that you are reporting lines of code being covered that were only called by the integration tests but not actually tested.

In this post, we are going to look at how in TeamCity you can run both test suites as part of a build, generate individual reports, and still have a combined report.

<!--more-->

Another nice benefit of the way we are going to implement our build in this post is that your unit and integration test build will run in parallel.  Thus you overall build time will decrease.

## Why do we need seperate code coverage reports?

Before I dive into the reason the reporting may be hugher than reality, lets define the difference between a unit test and integration test.

**Unit Test:** testing the business logic and data layers of your application with dependencies mocked out.  You are testing the smallest unit of work possible.

**Integration Test:**  testing the whole flow of the application starting what the user interfaces with and dependencies are not mocked out.

If we look at an ASP.NET WebApi, the integration test would call the REST endpoint while the unit test would only call a single method in the bhsiness logic.  This is where the problem comes in!

With the integration test since it start at tge endpoint, that means it calls all of the business logic along the way.  So in a combined code coverage report, every line of code that the endpoint calls is considered tested.  However, a lot of times the integration tests are looking more  at things like security checks on the endpoints or   mkaing sure the returned view model is correct or validating how an exception looks coming back to the caller.  The integration tests may not actually be looking in depth at the businesss logic like a unit test would.  So this causes you to believe that you are testing lines of code that you may only be calling but not actually testing .

This is exactly what is happening on one of my projects as the integration tests are only validating the security setup of the endpoints.  Our main concern with the integrating tests is to make sure we are only allowing callers to see data that their security role allows them to see.  We test both the authorization denied and authorization success.  For authorization denied, it works as you want for code coverage as the code stops within the endpoint and returns an error message.  However, for authorization success, it proceeds to call through all the layers of the application, making it look like we tested our business logic even if there was no unit tests actually covering those lines.  So for us, it was very important to have individual code coverage reports for unit tests vs integration tests so that we could easily see where we had gaps in unit test coverage.

## Implementation

* create unit test build
  * build steps
    * restore
    * test
    * copy snapshot
    * echo snapshot
  * artifacts
* create integration test build
  * build steps
    * restore
    * test
    * copy snapshot
    * echo snapshot
* create composite build
  * as regular build so we can combine the results from the tests snapshots
  * snapshot dependencies to call the test builds
  * artifact dependencies to generate the coverage report
  * build steps
    * echo snapshots
  * also need to attach a version control repository so that the combined coverage report has the source code included.
