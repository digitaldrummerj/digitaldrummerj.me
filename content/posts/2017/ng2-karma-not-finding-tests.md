---
categories:
- angular
date: 2017-01-06T00:00:00Z
excerpt: |
  As I get more into Angular 2 I wanted to figure out how to unit test my Angular components.  Angular 2 has unit testing built-in to the project that the Angular CLI generates.  It uses  [Karma](https://karma-runner.github.io/1.0/index.html) for the test runner and [Jasmine](https://jasmine.github.io/) for the testing.  The Angular docs also have a really good [Testing Guide](https://angular.io/docs/ts/latest/guide/testing.html).

  When I tried to run the built-in test instead of finding the 3 tests, it found **0** tests.  Never having used Karma before, I was unsure what the issue was or where to start troubleshooting.  Luckily it turned out to be a really simple fix once I figured it out and it had to do with Chrome v55 not running the test.ts file.
published: true
title: Angular - No  Test Found
---

> Note: This post applies to Angular.  The 2+ version of Angular.

Are you trying to run your Angular 2 unit test and the Karma test runner is not finding any tests to execute?  This is exactly what happened to me when I tried to run the unit tests that are included as part of the project that the Angular CLI generates.

![Karma 0 test found](/images/ng2-karma-not-finding-test/no-test-found.png)


The test runner should have found 3 tests to execute but as your could see above it didn't find any test to execute.  Never having used Karma before, I was unsure what the issue was or where to start troubleshooting.  However, when the Karma test runner executes it started up Chrome and the UI had a Debug button on it so I figured that would be a good first step.

![Karma Browser](/images/ng2-karma-not-finding-test/karma-browser.png)

I was slightly disappointed when I clicked on the Debug button as it just opened up a new tab blank tab.  After a bit of reading, it turns out that you are supposed to open the Chrome Developer Tools on that new blank tab that the Debug button opened.  Once I opened the Chrome Developer Tools, I noticed that the console had the following error.

![Karma Error](/images/ng2-karma-not-finding-test/karma-debug.png)

Chrome should have run the test.ts file with no problems and it is obviously not a video file.  After a bit of searching, I ran across [Angular CLI Issue 2125](https://github.com/angular/angular-cli/issues/2125) that had a potential workaround of adding a mime type to the Karma configuration.  Below is the configuration that you need to add to the karma.conf.js file.

```json
mime: {
    'text/x-typescript': ['ts', 'tsx']
}

```

Once you update the configuration you need to stop Karma and re-run it with the `npm run test` command.  It should now find and execute 3 tests.

![Karma Running](/images/ng2-karma-not-finding-test/test-found.png)

Now you are ready to go test your Angular application.  If you are looking for a good testing reference, check out the [Angular Testing Guide](https://angular.io/docs/ts/latest/guide/testing.html).
