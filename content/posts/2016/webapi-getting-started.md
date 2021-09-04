---
categories:
- dotnet
date: 2016-08-23T00:00:00Z
excerpt: "Welcome to the series on getting started with .NET Web Api.  In this article
  we will create a basic C# Web Api with Windows Integrated Authentication and create
  our first Web Api endpoint.      \nASP.NET Web API is a framework that makes it
  easy to build HTTP services that reach a broad range of clients, including browsers
  and mobile devices. ASP.NET Web API is an ideal platform for building RESTful applications
  on the .NET Framework.\n\nIn this series we will learn how to:\n\n- Create a basic
  C# Web Api with Windows Integrated Authentication \n- Setup camel-cased json properties
  for the response \n- Setup A Standard Response\n- Solving CORS Issues When Using
  Credentials\n"
published: true
series: ["web-api-getting-started"]
title: ASP.NET Web Api - Getting Started
---

Welcome to the series on getting started with ASP.NET Web Api.  In this article we will create a basic C# Web Api with Windows Integrated Authentication and create our first Web Api endpoint.

ASP.NET Web API is a framework that makes it easy to build HTTP services that reach a broad range of clients, including browsers and mobile devices. ASP.NET Web API is a great platform for building RESTful applications using the .NET Framework.

In this series we will learn how to:

* Create a basic C# Web Api with Windows Integrated Authentication
* Setup camel-cased json properties for the response
* Setup A Standard Response
* Solving CORS Issues When Using Credentials

## Create a new Web Api Project

To make a C# application with Visual Studio:

* Open Visual Studio 2015.  Any edition will work.  I am using Community Edition.
* Click File -> New -> *Project...*

    ![New Project](/images/web-api-getting-started/vs-start-project.png)

* Find and select *ASP.NET Web Application*, give your application a name and select *ok*

    1. On the left side under Installed -> Templates, select Web
    1. Select "ASP.NET Web Application"
        * **Note:** Your list of templates may differ but as long as your have the ASP.NET Web Application template listed we are good to go.
    1. Give the project a name (Web Api-Demo in this case)
    1. Select a location to store the project (c:\projects in this case)
    1. Uncheck the "Application Insights" box since we are not going to be using Application Insights
    1. Click the Ok button

    ![New Web Application](/images/web-api-getting-started/vs-new-web-app.png)

* On the next screen, we need to select the New ASP.NET Project Options

    1. Select Web Api for the template
    1. Click on the "Change Authentication" button
        * Select "Windows Authentication"
        * Click Ok
    1. Uncheck "Host in the cloud"
    1. Click Ok to generate the project

    ![Web App Options](/images/web-api-getting-started/vs-new-web-app-options.png)

* You project has now been generated and you should see a screen similar to the follow in Visual Studio

    ![Generated Project](/images/web-api-getting-started/vs-new-web-app-finished.png)

* If you hit F5 your default browser will launch with the Web Api Start Page.

    ![Initial Start Page in Chrome](/images/web-api-getting-started/chrome-initial-start-page.png)

* The Web Api project comes with a couple of Web Api Endpoints and a very useful Api documentation page that shows all of the available Api endpoints.    Click on the API link in the top nav bar to view the documentation page.

    ![Api Doc Page in Chrome](/images/web-api-getting-started/chrome-api-doc-page.png)

## Creating Our First Controller

Now that we have a working Web Api project, lets add some functionality to it.  The first thing we are going to do is to create a controller that will return back the logged in Windows user using Windows Integrated Authentication.

>Note: You should only uses Windows Integrated Authentication within a business and not for a public Api.
{:.warning}

1. In the Solution Explorer, right-click on the Controllers
1. Select Add from the menu the comes up
1. Select "Controller..." from the list of templates

![Web Api New Controller](/images/web-api-getting-started/webapi-new-controller.png)

This will open up the Controller type options.

1. Select "Web API 2 Controller - Empty"
1. Click the Add button

    ![Web Api Controller Template Selection](/images/web-api-getting-started/webapi-new-controller-template.png)

Next you will need to input the file name.

1. Change the file name to FirstController
1. Click the Add button

    ![Web Api Controller File Name](/images/web-api-getting-started/webapi-new-controller-filename.png)

We now have a blank Web Api Controller that is ready for us to create methods within.

```c#
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Web Api_Demo.Controllers
{
    public class FirstController : ApiController
    {
    }
}
```

We are now going to add a GET method that will return back the logged in user.

```c#
public string Get()
{
    return RequestContext.Principal.Identity.Name;
}
```

Before we test our new controller, we need to make sure that Windows Authentication is enabled and Anonymous Authentication is disabled.

1. Open Solution Explorer, select the Solution and press F4 to open the Properties window
1. Set "Anonymous Authentication" to disabled
1. Set "Windows Integrated" to enabled

![VS Solution Properties Set Dev Server Authentication Options]({{"iisexpress-windows-auth.png)

Now we are ready to test our Api.  In Visual Studio, press F5 to start up a debugging session.  This will launch your default web browser.  Once the initial page for Web Api has loaded navigate to the /api/first page  (e.g. http://localhost:58842/api/First).  Your port number will be different than mine.

The response you get back will be an xml document that contains a string with your domain and user name that you are logged in with.  In this case it is [Your Domain]/[Your User Name].  It will look similar to below.

```xml
<string xmlns="http://schemas.microsoft.com/2003/10/Serialization/">[Your Domain]/[Your User Name]</string>
```

## Conclusion

In this guide we learned how to create a basic C# Web Api project that uses Windows Integrated Authentication.  In the next guide, we will learn how to convert the JSON responses to be camel cased instead of following the .NET pascal case convention without having to update all of our .NET class.
