---
layout: post
title: 'WebApi Cors Solved'
date: 2016-09-01 06:00
categories: ['webapi','cors']
published: false
excerpt: |

---

>Note: If you are using Windows Authentication and expecting the caller to pass credentials to use your WebApi you need to follow the instructions in the [WebApi Cors with Credentials/](../webapi-cors-with-credentials/) post.


**global.asax.cs**

	protected void Application_BeginRequest()
    {
        if (Request.HttpMethod == "OPTIONS")
        {
            HttpContext.Current.Response.StatusCode = 200;
            CompleteRequest();
        }
    }


**web.config**

	<system.webServer>
    <httpProtocol>
        <customHeaders>
            <add name="Access-Control-Allow-Origin" value="[YOUR SITE URL]" />
            <add name="Access-Control-Allow-Headers" value="Origin, X-Requested-With, Content-Type, Accept, X-Token" />
            <add name="Access-Control-Allow-Methods" value="GET,POST,PUT,DELETE" />
        </customHeaders>
    </httpProtocol>
	</system.webServer>


**nuget package**

Microsoft.AspNet.Cors

**WebApiConfig.cs**

    //CORS
    EnableCorsAttribute cors = new EnableCorsAttribute(
        "[YOUR SITE URL]",
        "*",
        "GET,POST,PUT,DELETE,OPTIONS"
        );

    config.EnableCors(cors);

## Further Reading


[http://www.asp.net/web-api/overview/security/enabling-cross-origin-requests-in-web-api](http://www.asp.net/web-api/overview/security/enabling-cross-origin-requests-in-web-api)