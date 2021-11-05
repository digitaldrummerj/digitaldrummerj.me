---
categories: ["Testing", "Cypress"]
date: 2021-11-15T00:00:00Z
published: false
title: Cypress Run Custom Chrome Browser
---

Recently, on my build machines Chrome updated itself to Chrome 95 and for whatever reason all of a sudden my automated builds stopped being able to communicate with Chrome and caused the build instantly fail when it tried to run any Cypress tests.

After, much troubleshooting, we discovered that it was something with Chrome 95 our build servers.  We have had issues like this before where a Chrome update all of a sudden stopped our builds from working.

By default, there is no way to install a previous version of Chrome but luckily there is a way to download a previous version of Chromium and tell Cypress to use that previous version for Chromium.

<!--more-->

The first thing we need to do is download the version of Chromium that we want to use for our tests.  If you navigate to [Download Chromium Version](https://chromium.cypress.io/) you can download the version that you want to use from Google.  Cypress run this website but all of the downloads are coming directly from Google.

On the [Cypress Chromium Site](https://chromium.cypress.io/) I recommend that you filter the "Release Channel" by stable so that you only get the versions that have been released to production.  You can also filter by the version that you are looking for.

Once you find the version that you want, click on the "Get downloads" link and then download the zip file


## Command

```shell
cypress run --browser C:\\Chromium\\94.0.4606.81\\chrome.exe --headless --env coverage=false
```