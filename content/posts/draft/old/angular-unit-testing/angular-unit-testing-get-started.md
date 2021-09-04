---
categories:
- angular
date: 2019-05-10T00:00:00Z
published: false
series: ["angular-unit-testing-get-started"]
title: Angular - Getting Started Unit Testing
---

Welcome to the series on Angular Unit Testing.  In this initial article, we will discuss why you should be unit testing and how to get started writing them.  In future articles we will dive into testing specific areas of Angular such as components, pipes, interceptors, services, and guards.

Unit testing allows me to **prove** that my **code is doing what I think it is doing**.

They allow me to **release faster**, **have higher confidence**, and be able to **refactor with ease**.

Your unit tests need be **automated** and only test a **single unit of work**.

We have all heard about these magically benefits for several years now but the cost to get them was too great for most projects.  Thankfully, as technology has advanced unit testing has gotten much easier.  With the [Angular CLI](https://cli.angular.io/), the generate project has [Karma](https://karma-runner.github.io/) (test runner) and [Jasmine](https://jasmine.github.io/) (assertion framework) wired up in the generated project as well as a spec files (tests) for the componenets, servies, pipes, guards, etc.  Angular also includes several testing utilities to make it super simple to test router and http interactions.

Before we jump into looking at some code, we need to understand some very importants tenents for creating good unit tests.  Following these tenents is cricual for you to get the benefits that unit testing provides.

## Tenents

The unit test should follow 3 tenents:

1. Be maintainable
1. Be dependable
1. Be runnable

### Be Maintainable

If you want your team to continue to create and use unit tests, they have to be easy to maintain.

Requirement    | Details
--------|------
**Not Brittle** | a simple unrelated change should not completely make my test fail with false positives.
**Easy to read** | the easier the test is to read, the more likely that you and your team will maintain the unit tests
**Easy to write** | the easier the test are to write, the more likely that you and your team will actually create tests
**Well named** | having good test names creates self documenting code and allows you to quickly understand what the unit test is doing without even having to drill the code

### Be Dependable

Your team needs to have confidence in the unit test or they won't run them at all and will doubt if they are useful.

Tenent    | Details
--------|------
**Consistent results**|  given the same inputs, I will get the same outputs every time
**Isolated** | should only test the single unit of work.  In your tests, components shouldn't depend on services, services shouldn't make a call to the actual API backend, etc
**Continued Relevance** | as you refactor code, you may need to refactor your tests as well.  don't just comment out test,  fix the tests if they are still valid.  If the tests are no longer valid, delete the test
**Test the right things** | the goal is to test our business logic.  The goal is not to test the Angular.

### Be Runnable

Your unit tests just like your code should always be in a runnable state.

Tenent    | Details
--------|------
**Fast**  | the faster our tests are the more often you will run them
**Single Click** | should be able run the test will a single command or click
**Repeatable** | same inputs, give the same outputs
**Failures to problems** | need the stack trace to understand the code path the failed assertion went through to be able to troubleshoot.

## Testing Pyramid

For the type of tests that you can run, I really like this testing pyramid.  Your cheapest tests are at the bottom and they get more expensive at you go up the pyramid.  This means that 70% of your tests should be unit tests, 20% for integration test, and 10% for e2e tests.

![testing pyramid: 70% of test should be unit test](/images/ng-unit-testing/testing-pyramid.png)

## Creating a Project

Lets create a project and take a look at what is included.  We will be using the [Angular CLI](https://cli.angular.io/) to create our project called unitTestingSample using scss stylesheets and creating a routing file.

```bash
ng new unitTestingSample --style scss --routing
```

One the project is generated, open the project in your editor.  For my editor, I am using [Visual Studio Code](https://code.visualstudio.com/) along with the Angular Essentials extension.

In the generated project, the src\karma.conf.js file is the configuration file for karma.  Normally, I don't have to change anything in this file at all for development on my laptop.  When running in a CI environment, I do change the browser to use ChromeHeadless.

```javascript
// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    coverageIstanbulReporter: {
      dir: require('path').join(__dirname, '../coverage'),
      reports: ['html', 'lcovonly'],
      fixWebpackSourcePaths: true
    },
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false
  });
};
```

The other important files are the src\tsconfig.app.json and the src\tsconfig.spec.json.  The src\tsconfig.app file tells TypeScript how to compile the code and excludes all of the test files while the src\tsconfig.spec.json includes all of the test.  In order for the Angular CLI to determine which file to use when, it uses the angular.json configuration file that is in the root of the project.

## Running Tests

Out of the box, the generated project has unit tests for the app component in the src\app\app.component.spec.ts file.  In order to run the test, you want to run

```bash
ng test
```

{{< alert class="alert" >}}
Warning: as of this writing, there is a bug in the Angular CLI where the ng test command does a single run instead of leaving it running and watching code.  So you need to run `ng test --watch`
{{</alert>}}

## App Component Test Setup Review

When you generate a project using the Angular CLI, it includes a basic test for the App Component (src/app/app.component.[ts,html]).

When testing, the 1st thing we need to do is setup our module that we want to test.  Angular provides a testing utilities called TestBed that provide a dynamically created module.  The `TestBed.configureTestingModule` provides all of the same setup options as a normal (imports, declarations, and providers).

To use the TestBed you need to import it from `@angular/core/testing`.

The TestBed is normally configured in the Jasmine beforeEach which runs before each test is run.  Jasmine also includes afterEach, beforeAll, and afterAll.  The afterEach also runs after each test, beforeAll runs before any of the tests, and afterAll runs after all of the tests.

Since we are testing a component with an external template we also need to import asyc from the `@angular/core/testing` in order to compile the template since this is an async operation.  We will use the async on the function that the beforeEach is using.  Technically, everything will work without async if you are running the test from the `ng test` since it compiles everything before running the test but if you run Karma directly you need async.

For the app component test, we also need to use the Angular testing utility RouterTestingModule (`@angular/router/testing`) to abstract away the complexities of the Router.

The last thing we need to do in our beforeEach async function is to call compileComponent so that it builds the component.

**file:** src/app/app.component.spec.ts

```TypeScript
import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));
});
```

## App Component Testing

Now that are component is setup, we are ready to actually test the component.  Out of the box 3 tests are included

1. should create the app
1. should have as title 'app'
1. should render title in a h1 tag

All of the tests are async test.

The 1st thing each test does it to create the component, get a reference to the instance of the component, and then run a test assertion.

### Can Create Component

This is the most basic test you can do for a component as it just ensure that you can create the component.

```TypeScript
it('should create the app', async(() => {
  const fixture = TestBed.createComponent(AppComponent);
  const app = fixture.debugElement.componentInstance;
  expect(app).toBeTruthy();
}));
```

### Component Title

This test makes sure that the value set in the app.component.ts file has the right value for the title variable.

```TypeScript
it(`should have as title 'app'`, async(() => {
  const fixture = TestBed.createComponent(AppComponent);
  const app = fixture.debugElement.componentInstance;
  expect(app.title).toEqual('app');
}));
```

### Html Title Test

This test is a bit more complicated since all of the data binding does not happen until a change detection cycle has been run.  In order to trigger change detection, you need to to call detectChanges() on your createComponent reference.  In the example below it is `fixture.detectChanges`

```TypeScript
it('should render title in a h1 tag', async(() => {
  const fixture = TestBed.createComponent(AppComponent);
  fixture.detectChanges();
  const compiled = fixture.debugElement.nativeElement;
  expect(compiled.querySelector('h1').textContent).toContain('Welcome to app!');
}));
```
