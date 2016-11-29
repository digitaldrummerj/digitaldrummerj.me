---
collection: workshops
title: 'Extra 8: Avoiding CORS Issues'
published: true
type: ionicextra
layout: workshoppost2
order: 8
lab: ionic
length: 10 minutes
date: 2015-05-01
todo: |

---

{:.fake-h2}
Objective

* Add configuration to the Ionic project to work around the CORS issue.

## Background

You will often need to load data from a remote API. When you are running your Ionic application in the browser with ionic serve, it normally runs on localhost:8100. When you load data from another domain or port you might get this type of error.

    XMLHttpRequest cannot load https://ioniccorsdemoapi.herokuapp.com/api/endpoint. No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'http://localhost:8100' is therefore not allowed access.
    
This happens due to the browser's security policies, which blocks access to data from other domains unless the remote server explicitly allows it. To get around this issue, we will use an Ionic CLI feature called proxies.  

{:.fake-h2}
Table of Contents

* TOC
{:toc}

## 1.0: Download Project

The first step is to download the starter project that I have created so you can concentrate on the CORS issues and not writing code to call the remote Api.

During this lab, you will be able to follow along using git tags to checkout specific versions of the code or you can also follow along by writing the code yourself. Even if you aren't familiar with git, you can run the commands to follow along.

Using git, you can get started with this lab by cloning the Lab13-WorkingThruCorsErrors repository.

    $ git clone https://github.com/IonicWorkshop/Lab13-WorkingThruCorsErrors.git
    $ cd Lab13-WorkingThruCorsErrors

## 1.1: Seeing CORS Error

Run ionic serve and open up the Chrome developer tools.  You should see a CORS errors in the Console.

  ![Lab13-CORSErrorMessage.png](../images/Lab13/Lab13-CORSErrorMessage.png)

The Api we are consuming is a hosted at [https://ioniccorsdemoapi.herokuapp.com/api/endpoint](https://ioniccorsdemoapi.herokuapp.com/api/endpoint) and returns json results with a list users.

![Lab13-NodeApiJsonResults.png](../images/Lab13/Lab13-NodeApiJsonResults.png)

## 1.2: Setting Up and Using Ionic Proxy


1. Open the ionic.project file
1. After the app_id line add a proxies property. This proxies property can accept an array of proxies with each having its own path and url.

        {
          "name": "proxyExample",
          "app_id": "",
          "proxies":[
            {
                "path": "/api/endpoint",
                "proxyUrl": "https://ioniccorsdemoapi.herokuapp.com/api/endpoint"
            }
          ]
        }

1. Open the services.js file and change the api url to the proxy url.
1. If you have ionic serve running, quit the process and run ionic serve again.  


## 1.3: Making it Work Outside of Ionic Serve

**Steps**

The Ionic proxies only work when we are using the ionic serve command.  This mean that when you deploy to a device that it won't be able to find the API urls.  To fix this we can setup an Angular constant for the url value and use gulp to change it.

1. Open app.js and add a constant section to hold the API url.

        .constant('ApiEndpoint', {
            url: 'https://ioniccorsdemoapi.herokuapp.com/api/endpoint'
        })

1. Open the services.js and change the endpoint url to ApiEndpoint.url.  
    * Don't forget to inject the ApiEndpoint into the service.
    
1. Add a new dev dependency to package.json

        "replace": "^0.3.0"
        
1. Open the gulpfile.js
1. Add the replace package as a required module.
1. Add a variable to hold the app.js file location 
1. Add the add-proxy task  below to switch from the remote url to the ionic proxy url

        gulp.task('add-proxy', function() {
          return replace({
            regex: "https://ioniccorsdemoapi.herokuapp.com/api/endpoint",
            replacement: "http://localhost:8100/api/endpoint",
            paths: replaceFiles,
            recursive: false,
            silent: false,
          });
        });

1. Add the remove-proxy task below to switch from the ionic proxy to the remote url

        gulp.task('remove-proxy', function() {
          return replace({
            regex: "http://localhost:8100/api/endpoint",
            replacement: "https://ioniccorsdemoapi.herokuapp.com/api/endpoint",
            paths: replaceFiles,
            recursive: false,
            silent: false,
          });
        });
1. To test the gulp task, you need to run npm install to install gulp locally
1. Once gulp is installed you can test either task by running:

        $ gulp add-proxy
        $ gulp remove-proxy

1. After running the gulp task, check out the app.js file to see that it changed the ApiEndpoint Url value.
1. Switch to the ionic proxy 
1. Run your ionic application in the browser and make sure it pulls data onto the home page

## 1.4: Testing On a Device

1. Add a platform to the application
1. Switch to the remote url
1. Deploy the application to a device or emulator


## 1.5: Setting up Your API for CORS

This lab has been all about how to work around remote APIs that do not have CORS enabled.  However, you can also enable CORS within the API if you own it and skip having to setup the proxies.

The code for the API we have been using is located at [https://github.com/IonicWorkshop/Lab13-HerokuHostedApi](https://github.com/IonicWorkshop/Lab13-HerokuHostedApi).  

If you open up the server.js file, you will see there are 2 additional get functions that we have not used yet, /api/endpointNoCors and /NoCors.  Both of these functions have response headers on them that allow for cross origin calls by adding in these response headers.

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");

If you wanted all of your API calls to allow for CORS you can use the following:

    var app = express()

    app.all('*', function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        next();
    });

For a full working version of the API using the app.all, look at the serverWithCorsHeaders.js file.

Now that you understand how to setup your API with CORS enabled, lets see it in action.

1. Open up the app.js file for the Lab
1. Change the .constant.url value to

        url: 'https://ioniccorsdemoapi.herokuapp.com/api/endpointnocors'

1. Run ionic serve and you will notice that it pulled in the data on the main page instead of erroring out like it did before the proxies were setup.


## Wrap-up

During development the Ionic proxies setup everything so that you do not need to worry about the CORS errors.  However, as part of your production readiness you will want to switch the Api url back to the real url since you do not have a CORS issues on the actual device. 