---
categories: ["Testing"]
date: 2020-04-12T00:00:00Z
published: true
title: You Need Code Coverage
subheadline: don't test in the dark
featured_image: "/images/code-coverage/why-code-coverage-featured-image.png"
series: ["Code Coverage"]
---

Welcome to the start of my series on code coverage.  In this article we are going to talk about why you need code coverage reports and then in future articles implement the reports in our Angular based UI and ASP.NET Core based API.

For years, I pushed back against implementing code coverage on my projects and I am here to say that I was wrong.  In the past everytime someone tried to implement code coverage on my projects or suggested it, all they cared about was the percent of code coverage.  Code coverage for just the sake of code coverage doesn't create high quality tests or products, it just creates tests to increase code coverage.  When code coverage is used to drive the priority of what to test, used to validate that the tests actually covered the lines of code you thought it covered and catching times when you add more code than test code.

So what drove me to make this change and believe that code coverage is valuable?  Recently, I took on the role of leading our Test Automation Team (TAT) as we transition from heavy manual testing to mostly automated testing.  Until mid-2019 when we had a management change at the executive level of my organization, automated testing wasn't fully valued and when push came to shove the first thing to drop from the priority list was the automated testing.  As a development team we always believed that automated testing was valuable and oushed to make it a priority it but it wasn't a true priority until this year when we decided to kick off a dedicated team.

Even though automated testing wasn't a priority from a management standpoint in the past, from a development team standpoint we had always valued it and been creating automated tests as much as we could.  At the time of the management change in mid-2019 we had 750 API tests and 0 UI tests.  Over the last half of 2019, I had many discussions with management about automated testing and the plan moving forward since it was supposedly valued now but we weren't really allocating time to it.  If we truly valued testing that we needed to allocate time to it.  Time not just to create the tests but time to create an actual strategy that the team could get behind, time to create an end to end testing environment, and time for someone to drive the automated testing strategy.

So at the start of 2020, it was finally decided to make testing truely a priority and kick off a scrum team dedicated to automated testing consisting of 3 Developers, 1 Quality Assurance Engineer, a Product Owner and a Scrum Master.  One of the first questions was how do we measure that we are making progress in our automated testing journey.  At the start of 2020, we now had 850 API tests and 250 UI Tests but we were blind to how much of our code was actually being covered.  This is where code coverage was very helpful.

Once you have code coverage implemented, you can get reports generated for you such as:

![detailed coveage report](/images/code-coverage/cypress-coverage-report-example.png)

The report shows me a quick summary at the top of the amount of code coverage (33.66% covered) and then I can drill into each file to see what lines are covered and not covered.  For the summary section, the important number is the lines (the last one in the list) as this is the totally number of lines of code that is touched by a tests.

Now that I know where we are at in our test coverage, it allows me as the product owner to make data-driven decisions on which set of tests need to be created.  I can drill in and see what portions of our critical features are being tested and seeing where the gaps might be.  The development team can also use the coverage report when they add new code to ensure they have good code coverage.

Again, the ultimate key to making code coverage reports useful like I am using them is to not use them in a draconian way by forcing a random code coverage percent to be hit.  The goal is to make the code better, not to hit some random code coverage metric.

I would encourage you to give code coverage reports a try on your project and use them to make data-driven decision on if you have enough automated tests or not for a given feature.

In the next article in the series, we will implement the code coverage report for our Angular based UI that is using Cypress to test the UI.
