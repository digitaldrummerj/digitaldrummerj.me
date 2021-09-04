---
categories:
- dotnet
date: 2016-08-31T00:00:00Z
draft: true
excerpt: ""
series: ["web-api-getting-started"]
title: ASP.NET Web Api with Credentials CORS Issues Solved

---

Welcome to the continuing series on getting started with ASP.NET Web Api.  At this point we have created a ASP.NET Web Api project, created our 1st controller, enabled Windows authentication, set the JSON format, and created a generic response handler.  In this article we will learn how to solve in an issue that many enterprise developers have run across when called your ASP.NET Web Api with Windows Authentication client-side code such as Angular.  When you try to make this access the endpoints for your Api from Angular when using credentials, you will get a Cross-Origin Resource Sharing (CORS) error.

When you make a call to your Api from Angular, Web Api will check if the url is allowed to access the Api by using the CORS setup.  However, when using credentials you can not have a wildcard for the allowed url which presents a problem when you are trying to make a Api for other websites to use.

In order to setup CORS, we need to installed the Nuget package `Microsoft.AspNet.WebApi.Cors`

1. To install the nuget package, right-click on the project in Solution Explorer and select Manage Nuget Packages.
1. Once the Nuget UI comes up, click on Browse and search for Microsoft.AspNet.WebApi.Cors
1. Once you find the package, click on it and then click the install button

After the package is installed, we can configure CORS in either the web.config or the App_Start\WebApiConfig.cs.  Since ultimately we are making an Api that any website can call, we are going to set the CORS configuration in code instead of using the web.config.

With in the WebApiConfig.cs to the Register method, add the following code before the routes are defined.

    //CORS
    EnableCorsAttribute cors = new EnableCorsAttribute(
        "*", // Origin
        "*", // Headers
        "GET,POST,PUT,DELETE,OPTIONS"  // HTTP Verbs
        )
    {
        SupportsCredentials = true
    };

    config.EnableCors(cors);

You also need to add the following using statement:

    using System.Web.Http.Cors;

If you were to run to code and make a call from Angular you will still get a CORS error like below since you can not have a wildard for the origin.

![Angular CORS Origin Header Error](/images/web-api-cors/cors-no-origin-header.png)

To fix this, we can add in a bit of code to the global.asax.cs in the Application_BeginRequest method to grab the url (origin) making the call and add the Request header "Access-Control-Allow-Origin" set to the origin url.

Another very important bit of code is checking if the HttpMethod is Options and if so then returning a 200 status code and completing the request.

**global.asax.cs**

	protected void Application_BeginRequest()
    {
        string origin = Request.Headers.Get("ORIGIN");
        if (origin != null)
        {
            Request.Headers.Add("Access-Control-Allow-Origin", origin);

        }

        if (Request.HttpMethod == "OPTIONS")
        {
            HttpContext.Current.Response.StatusCode = 200;
            CompleteRequest();
        }
    }

Now if we try our Api from Angular, we are able to make the call and get data back.

## Further Reading

[http://www.asp.net/web-api/overview/security/enabling-cross-origin-requests-in-web-api](http://www.asp.net/web-api/overview/security/enabling-cross-origin-requests-in-web-api)
