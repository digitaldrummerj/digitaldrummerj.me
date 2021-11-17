---
categories: ["Testing", "Cypress"]
date: 2021-11-15T13:00:00Z
published: true
url: '/cypress-custom-browser/'
title: "Solved: Use Previous Version of Chrome to Prevent Instant Cypress Crash on Our Build Servers When Using Chrome 95"
---

Recently, on my build servers, the Chrome version update to Chrome 95 and all of a sudden my automated builds stopped being able to communicate between Cypress and  Chrome and would instantly cause Cypress to crash on the 1st test when using `cypress run`.  We could login to the machine and run all of the tests using Chrome as a headed browser but anytime we tried to use Chrome as a headless browser it would instantly fail the build on the 1st tests.

We have seen other random issues like this show up with Chrome updates in the past and previously the fix was to disable the Chrome auto-update feature and then install a previous version of Chrome.  This was a hack though as there is no supported way to downgrade Chrome.

Thankfully, there is an easier way by using a custom browser when running Cypress.  Cypress even maintains a Chromium repository so that you can easily download previous versions of Chrome.

<!--more-->

The first step to running a custom browser with Cypress is to download the previous version of Chromium that we wanted to use for our tests.  To download a previous version of Chromium,  you need to navigate to [Cypress Chromium Site](https://chromium.cypress.io/).

> **Note:** All of the download links on the Cypress Chromium site point directly to Google so you are downloading real versions.

On the [Cypress Chromium Site](https://chromium.cypress.io/) I recommend that you filter the "Release Channel" by stable so that you only get the versions that have been released to production.  You can also filter by the version that you are looking for to make it easier to find the version you want.

Once you find the version that you want, click on the "Get downloads" link and then download the zip file.

Once the download is complete, unzip it to a directory.  I like to unzip it into c:\Chromium (I am on Windows) since I can be sure that all of my co-workers and build server will have directory available.

Now to use the custom browser with `cypress run` you to give the location of the custom browser as the browser name in the `--browser` argument.

```cmd
npx cypress run --browser C:\Chromium\94.0.4606.81\chrome.exe --headless
```

Now Cypress will use the browser located at "C:\Chromium\94.0.4606.81\chrome.exe" when it executed the tests.

You can also use the custom broswer with `cypress open` by using the same `--browser` argument that we used with the run command above but without the `—headless` argument.

```cmd
npx cypress open --browser C:\Chromium\94.0.4606.81\chrome.exe
```
