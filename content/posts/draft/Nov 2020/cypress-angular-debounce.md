---
categories: ["Testing", "Cypress", "Angular", "RxJS"]
date: 2021-11-18T00:00:00Z
published: false
title: Cypress Testing with Angular RxJs Debounce
---

In your Angular application if you are using [RxJS Debounce](https://rxjs.dev/api/operators/debounce) and running Cypress test you may have run into times that your application under test is not getting past the debounce wait time.

> Debounce is a way to tell Angular to wait X number of milliseconds for something to happen before continuing.  They are great for something like a user lookup control where you want to wait for the user to stop typing in the input box before making the API call so that you are not making an API call for each character of the user's name that is typed.

<!--more-->

## Outline

* Why use debounce?
* Issue we encountered with testing debounce
* How we solved it
* Gotchas to look out for
