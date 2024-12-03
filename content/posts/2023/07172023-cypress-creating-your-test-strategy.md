---
categories: ["cypress", "testing"]
published: 2023-07-17T13:00:00Z

title: "Cypress - Creating Your Test Strategy"
url: '/cypress-creating-your-test-strategy'
toc: true
---


One of the most essential things before jumping into writing tests is to develop your test strategy. I know it sounds like a daunting task. If you are reading this post, you are most likely a developer. We developers....we just want to write code, not spend time coming up and documenting something like a test strategy. However, not having a test strategy is like driving a car in a new city without a GPS and hoping you will reach your destination as quickly as possible. You may get there eventually without the GPS, but it is most likely going to be a lot of wrong turns, having to stop for directions (which most likely you won't do until you are really, really lost if you ever stop to ask) and a lot of backtracking and starting over. I don't know about you, but I prefer the most direct route and a GPS to guide me.

In this post, you will discover the questions you need to answer to develop your test strategy, and once you answer those questions, you will have your GPS guide. These questions are how we decided on our testing strategy when we started and has taken us from zero UI tests in 2019 to around 1,100 tests as of the writing of this post.

So let's jump right into it.

<!--more-->

## Overview

First, give yourself a big pat on the back for deciding that automating your tests is essential. It is a big step to go from manual tests (or no tests) to automated tests, and once you go automated, you never want to go back to manual...ever again.

With Cypress, you have multiple types of tests (Component, End to End, and UI with network calls mocked) that you can write. There is not one correct answer for which type to start with or which one is more important. It all depends on your situation, goals, and application. And yes, I know I gave the depends answer that we all dislike. I wish I could give a straight answer for the type or types to start with, but if I did that, it would not be the best for you as the reader since we all have different testing goals, and depending on those goals that are certain test types that are better than others. Eventually, all of the types of tests may be important to your application tests or some types may never become important based on your testing goals.

For an existing application that you want to write automated tests for, regardless of the types of tests that you write, I would suggest that you consider all of your existing code to be working as expected and write tests as you make changes to those existing features or add in new features. This will allow you to build up your testing library while continuing to deliver new features.

## Two big questions need to be answered to figure out the type of tests you should be writing initially.

1. Where do most of your bugs come from in your UI?
1. What is your intent with moving from manual testing (or no testing) to automated testing?

## 1. Where do most of your bugs come from in your UI?

Typically, when a team starts looking into automated testing, it is due to having too many customer bugs being reported in production because you do not have enough time to manually test all of the essential things before deploying to production, and you are spending more time releasing hotfixes than working on new features. So our initial goals usually are to increase our customer's confidence that the product we are delivering to them can be counted on; we are catching bugs before they make their way into production, so we spend way less time and energy creating hotfixes; having the confidence that when we deploy to production, our application does what we say it does.

That is why our first question is about where the majority of your bugs in the UI are coming from so that you can maximize the return on your automated test investment as quickly as possible. The quicker we can get wins with our automated tests, the easier it is for the team, management, and customers to see the value in writing automated tests, and the more likely you will be given the continued time to write automated tests.

Here are the typical answers I hear for where the bugs are coming from (at a high level) and what type of tests you might want to start with.

### 1.1: Communication with your API (an API that you own and created for your UI)

If most of your bugs are with the interactions between your UI and your API, then end-to-end testing, or E2E, as often referred to, would be the place I would consider looking into first. E2E tests are meant to test the whole flow of your application from your UI to API to your data store (e.g. database). Most of the time, nothing is mocked out in E2E tests. However, if you have a tough to test 3rd party API (something you don't own and didn't create) or have rate limits, or it is an expensive 3rd party API then I have seen those mocked out in the E2E tests.

E2E tests also typically require inserting data into the data store by either calling the API to load the test data or going through the UI screen to create the data. For the performance of your tests, it is recommended to call the API to insert the test data needed for your tests instead of going through all of the UI screens to insert the data.

### 1.2: UI behaviors and interactions

If the majority of your bugs are coming from the behaviors that happen as part of the user interactions in your UI, then I would look at mocking the API calls that you are making by using [cy.intercept](https://docs.cypress.io/api/commands/intercept) so that you can focus on what your UI is doing as the user is clicking around in your UI.

Here are some examples of what I mean by behaviors and interactions and tests you might run:

* User clicks on a button that should launch a dialog. Is the correct dialog opened and did the dialog have the right action buttons (if they are configurable in code to what shows)?
* As a user types or paste into an input field, non-allowed characters are removed from the input field. Did it actually strip out the non-allowed characters?
* An input field should have a min and max limit. Are the correct attribute on the input field to enforce this?
* Depending on permissions, an element on the page will be shown or hidden. This is where mocking the API calls comes in handy. You can change the permissions as part of what the mock returns, so simulate the different permissions a user might have and then test if an element is shown or hidden as you expect. Your API should validate the permissions again to ensure someone didn't open the developer tools and turn on something, but this at least ensures your UI is right.
* A grid with sortable columns and ensuring that the sorting A-Z and Z-A are working. If it is server-side sorting, then make sure that the correct API call is made, which you can test with a mock. This particular test has saved us several times, as we have broken this feature more than once on some of our grids.

These are just a few of the many behaviors and interactions in our UI that we are testing for. This is where my team focused most of our automated tests since the UI behaviors were where about 95% of our bugs came from. In 2019, we started out with zero automated UI tests and as of the writing of this post, we have about 1100 Cypress tests now. Yes, 1100 UI tests. Writing automated tests is considered part of our definition of done and our management is 100% backing us that automated tests are non-negotiable but have left it up to us as a development team to figure out what tests and how many of them we need (i.e. there is no random code coverage % that we need to hit just to hit.....).

When we started writing Cypress tests, our product was a little over a year old, so we had a lot of code already written and a lot of features that we had already committed to delivering. So we couldn't just stop what we were doing to focus on writing Cypress tests, but management was willing to split off a dev or two to work on the testing strategy, write some initial tests to validate the automated testing strategy, and train the team on writing Cypress tests. This allowed the team to keep moving forward while we figured out the testing strategy and validated it.

### 1.3: A 3rd party API that you are interfacing with?

For interacting with a 3rd party, if your UI is directly contacting the 3rd party API, then I would for sure use Cypress for testing, but in most cases, the interaction with a 3rd party API requires some kind of authentication or a secret key so your interactions to the 3rd party API are done from within your API so that you do not leak your secret keys. If your interaction to the 3rd party API is done from within your API, then I would write API tests using the testing framework for your API technology (e.g. XUnit if I am using .NET for the API).

If your communication and interaction with a 3rd party API is done directly from your UI, then you can either write end-to-end tests with nothing mocked or tests with your API calls mocked. Personally, I would mock my API calls as much as I can so that I can focus on just the 3rd party API interactions.

### 1.4: Individual components within your application?

If the individual reusable components are where the majority of your bugs are coming from and you are using one of the [supported UI frameworks](https://docs.cypress.io/guides/component-testing/overview#Supported-Frameworks) then I would write [component tests](https://docs.cypress.io/guides/component-testing/overview) so that you can test the components in isolation.

The only reason that we are not using Component tests is that they did not exist in 2019 when we started using Cypress and since we already have UI tests that include testing our components, it has not made sense ROI wise for us to start with component testing. However, if we were starting today, we would have used component testing in addition to our UI interaction and behavior tests.

## 2. What is your goal with moving from manual testing (or no testing) to automated testing?

Typically, when starting our journey with automated testing, we have some pain points with our existing test strategy that we are trying to solve. I find that they tend to fall into the following categories:

1. Want to reduce bugs that you are currently having
1. Want to reduce the time it takes to run through QA?
1. Want to automate the testing of edge cases that are hard to manually test?
1. Want to test happy path to make sure everything is working as expected when no errors are being generated
1. Want to test out potential errors that may be returned from your API and make sure the UI handles them properly
1. Want to perform full end-to-end testing to make sure everything is communicating as expected between the different layers of your application without having anything mocked out

### 2.1 Want to reduce bugs that you are currently having

If this is your primary goal, then follow the answers to question number one above for the type of tests to start with in your testing strategy. I suggest starting by writing tests as you fix bugs instead of trying to retrofit and add tests for all the bugs you have already fixed.

### 2.2 Want to reduce the time it takes to run through QA?

To reduce testing time, I would look at your current tests and see which ones take the longest to set up and execute and are in critical features. Then see if you can effectively automate the setup and test or not to make sure that you actually shorten the testing time without spending so much time writing the tests that it would take years before you see a return on the testing time (i.e. more testing saving than testing writing time). Unfortunately, sometimes it is more expensive to automate certain tests than it is to manually perform the tests.

As well, the reason that I also look at the tests for critical features is to make sure we are testing the most important features first and not just testing the features that take the longest to test.

Also, if you are currently manually testing, if your test steps are not documented, one of the first steps would be to document those steps so that your initial automated tests match the tests you are manually doing today. The documentation could be as simple as a Google Document or Word document. It is more important that they are documented than how they are documented. Bravo to you and your team if you already have your manual test steps documented.

### 2.3  Want to automate the testing of edge cases that are hard to manually test?

Before diving into testing edge cases, I would first look at the impact if the edge case was hit. I have seen several times that a team wants to test edge cases just to make sure they are covered and when we looked at the impact if the edge case was hit, it was either no impact or so small that it really did not make sense to actually test it compared to other tests that needed to be written.

Suppose the edge case is hit and it would cause impact. In that case, the first step is to understand the steps that it would take to make the edge case happen and then see which test type would allow you to test the edge case (Component test, end-to-end test, or UI behavior/interaction test).

**Note:** Most of the time, though, this is different from where most teams start with their automated testing since it is typically challenging to get everything set up to make the edge case happen and most of the time they are low impact.

### 2.4  Want to test happy path to make sure everything is working as expected when no errors are being generated

This is where most teams start, followed right behind it with testing potential errors that can be returned for their API calls. When you deploy your application to production, you want to know that your UI is doing what it is supposed to be doing when everything is playing nicely together. Having happy path tests gives you the confidence that everything is working.

The one caution I will give about happy path tests is that it is very very easy to go overboard and test everything possible. Just because you can doesn't mean that you should. Test the critical features and ones that are impactful if they are not working correctly.

### 2.5 Want to test out potential errors that may be returned from your API and make sure the UI handles them properly

These kinds of tests are perfect for using [cy.intercept](https://docs.cypress.io/api/commands/intercept) to mock out your API calls so that you can quickly generate the error and then make sure that your UI handles the error gracefully.

### 2.6 Want to perform full end-to-end testing to make sure everything is communicating as expected between the different layers of your application without having anything mocked out

This answer here is obvious that end-to-end testing will be the answer. In my experience, most teams do not start with end-to-end testing as it is the most complicated and time-consuming to get set up. You have to run your API, data store, and UI before kicking off your Cypress tests. You will also need to seed any data needed for tests to pass to your data store before running each test and then do the cleanup work to ensure that tests are not interacting with each other.

End-to-end testing is also typically the slowest test to run since you are communicating across the network with your API and data store. End-to-end tests are typically reserved for critical features where it is important to ensure everything is communicating.

## Wrap Up

As much as I know you want to jump into writing code, having a test strategy is key to be able to quickly hit your testing goals.  Your test strategy is your GPS guide to your goals and will get you there as fast as possible.  No matter how much we think we know better than the GPS, it is amazing how accurate the GPS is.