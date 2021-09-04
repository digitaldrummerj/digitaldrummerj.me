---
categories:
- dotnet
date: 2016-09-01T00:00:00Z
draft: true
excerpt: ""
title: WebApi Cors Solved
---

>Note: If you are using Windows Authentication and expecting the caller to pass credentials to use your WebApi you need to follow the instructions in the [WebApi Cors with Credentials/](../webapi-cors-with-credentials/) post.

{{< alert  class="success" >}}
global.asax.cs
{{</alert>}}

```c#
protected void Application_BeginRequest()
{
    if (Request.HttpMethod == "OPTIONS")
    {
        HttpContext.Current.Response.StatusCode = 200;
        CompleteRequest();
    }
}
```

{{< alert class="success" >}}
web.config
{{</alert>}}

```xml
<system.webServer>
    <httpProtocol>
        <customHeaders>
            <add name="Access-Control-Allow-Origin" value="[YOUR SITE URL]" />
            <add name="Access-Control-Allow-Headers" value="Origin, X-Requested-With, Content-Type, Accept, X-Token" />
            <add name="Access-Control-Allow-Methods" value="GET,POST,PUT,DELETE" />
        </customHeaders>
    </httpProtocol>
</system.webServer>
```

{{< alert class="success" >}}
nuget package
{{</alert>}}

Microsoft.AspNet.Cors

{{< alert class="success" >}}
WebApiConfig.cs
{{</alert>}}

```c#
//CORS
EnableCorsAttribute cors = new EnableCorsAttribute(
    "[YOUR SITE URL]",
    "*",
    "GET,POST,PUT,DELETE,OPTIONS"
    );

config.EnableCors(cors);
```

## Further Reading

[http://www.asp.net/web-api/overview/security/enabling-cross-origin-requests-in-web-api](http://www.asp.net/web-api/overview/security/enabling-cross-origin-requests-in-web-api)
