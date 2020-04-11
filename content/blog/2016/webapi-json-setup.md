---
categories:
- dotnet
date: 2016-08-31T00:00:00Z
excerpt: |
  Welcome to the continuing series on getting started with ASP.NET Web Api.  In the last post, we created our ASP.NET Web Api project, created our 1st controller and enabled Windows authentication.  In this article we will learn how to set the JSON response to convert the .NET pascal cased properties into camel cased properties.

  The naming convention between .NET and JSON is different and we want to present our Api users with the naming convention that they expect.  .NET uses pascal case which means that each word starts with a captial letter (e.g. UserName).  However, JSON uses camel case which means that the properties start with a lowercase letter and then each word after that starts with a captial letter (e.g. userName).  Notice the lower case u in userName for the JSON naming convention.

  ### Creating Class to Return

  In order to test the camel case configuration, we are going to update the FirstController that we created in the previous post to return a .NET class called UserModel instead of a string.
published: true
series: ["web-api-getting-started"]
title: ASP.NET Web Api - Setup JSON Camel Cased Fields

---

Welcome to the continuing series on getting started with ASP.NET Web Api.  In the last post, we created our ASP.NET Web Api project, created our 1st controller and enabled Windows authentication.  In this article we will learn how to set the JSON response to convert the .NET pascal cased properties into camel cased properties.

The naming convention between .NET and JSON is different but we should present our Api users the naming convention that they expect without having to write all kinds of conversion code.  Luckily  this is very easy to accomplish with a few lines of code in ASP.NET Web Api.

For the naming convention, .NET uses pascal case which means that properties start each word in the property name with a captial letter (e.g. UserName).  JSON uses camel case which means that the property names start with a lowercase letter and then each word after that starts with a captial letter (e.g. userName).  Notice the lower case u in userName and then the uppercase N for the next work.

Before we get started, if you have not read the first post, I would suggest that you do so before continuing with this artcle so that you are at the same starting point as I am.  It will take you about 10 minutes to complete the 1st article.



The first thing that we are going to do is create a C# class to hold the information about the logged in user.  Then we will  update the FirstController that we created in the previous post to return the C# class that we created.

### Creating A Class to Return from Web Api Method

1. Open up the solution that we created in the previous article in Visual Studio
1. In the solution explorer, right-click on the Models directory
1. Select Add
1. Select Class

![Add New Class to Model Folder in Visual Studio](/images/web-api-getting-started/webapi-add-new-model.png)

In the "Add New Item" dialog that comes up, name the file UserModel.cs and click ok

![Set new model file name to UserModel.cs](/images/web-api-getting-started/webapi-add-new-model-filename.png)

In the UserModel.cs replace the contents with the following code:

```c#
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Web Api_Demo.Models
{
	public class UserModel
	{
		public string UserName { get; set; }
	}
}

```

Next we need to update the FirstController Get method to return a UserModel with the UserName set to the logged in user.

1. Open the Controllers\FirstController.cs file
1. Change the return type of the Get method to `UserModel`
1. Change the return statement to create a new UserModel with the UserName set to RequestContext.Principal.Identity.Name

```c#
public UserModel Get()
{
    return new UserModel { UserName = RequestContext.Principal.Identity.Name };
}
```

You will also need to add the following using statement so that is knows how to find the UserModel class we created.

```c#
using Web Api_Demo.Models;
```

## Testing Default Behavior

We are now ready to test our changes.  However, before we do, we need to make 1 configuration change.   Previously we were able to test in our browser since we didn't care if XML was returned.  This time we do care about the return type as we want it to be JSON.  By default XML is returned when hitting the url directly from the browser since it sends application/xml as the content-type from the browser.  There are two options to fix this: 1.) Use the Google Chrome Extension Postman to do our testing and tell it the type is application/json 2.) Turn off XML as a format option.

Since we do not need XML to be returned from our Web Api we are going to go with option #2.

1. Open the file App_Start\Web ApiConfig.cs
1. In the `Register` method, add the following code after the call to config.Routes.MapHttpRoute

```c#
config.Formatters.Remove(config.Formatters.XmlFormatter);
```

Press F5 to compile our code and start a debug session.  Go to the api/first endpoint and you will notice that the output casing currently matches that of our C# class.

```json
{"UserName":"[My User Name]"}
```

Now that we have our Api updated to return the UserModel C# class that we created, we need to configure the JSON formatter to convert the C# class properties to camel case.

## Updating Web Api Configuration

To fix the casing, we will use the CamelCasePropertyNamesContractResolver that is part of the JSON.NET library that is included with Web Api.

1. Open the file App_Start\Web ApiConfig.cs
1. In the `Register` method, add the following code after the call to config.Routes.MapHttpRoute

```c#
var json = GlobalConfiguration.Configuration.Formatters.JsonFormatter;
json.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
```

We also need to add the using statement to tell .NET where to find the CamelCasePropertyNamesContractResolver

```c#
using Newtonsoft.Json.Serialization;
```

Now anytime we return back a serialized .NET class, all of the properties will be converted to the standard JSON camel case instead of using the standard .NET Pascal case.

If you press F5 to compile our code and start a debug session and go to the api/first endpoint, you will notice that the output casing is now camel cased

```json
{"userName":"[My User Name]"}
```

## Conclussion

In this guide we learned how to convert the JSON output response to be camel cased instead of the .NET pascal case without having to modify all of our .NET classes.  In the next post, we will look at creating a common response format to all of the endpoint return values.


