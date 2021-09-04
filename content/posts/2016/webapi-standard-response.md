---
categories:
- web api
date: 2016-09-29T00:00:00Z
excerpt: "Welcome to the continuing series on getting started with ASP.NET Web Api.
  \ In this article we will learn how to setup a standard response format for all
  of the endpoints.    \n"
published: true
series: ["web-api-getting-started"]
title: ASP.NET Web Api - Setup Generic Response Handler

---

Welcome to the continuing series on getting started with ASP.NET Web Api.  In the previous post, we created our ASP.NET Web Api project, created our 1st controller, enabled Windows authentication and configured JSON to be camel cased for our returned C# class.  In this article we will learn how to setup a generic response handler for all of Api calls.  This will allow us to consolidate the logic needed to create a proper response as well as it will allow us to consolidate the exception handling logic.     

Before we get started, if you have not read the previous post, I would suggest that you do so before continuing with this artcle so that you are at the same starting point as I am. 

Our generic response handler will inherit from IHttpActionResult which basically defines an HttpResponseMessage factory. 

Some of the advantages of using IHttpActionResult are:

* Simplifies unit testing your controllers
* Moves common logic for creating HTTP responses into separate classes.
* Makes the intent of the controller action clearer, by hiding the low-level details of constructing the response.

IHttpActionResult contains a single method, ExecuteAsync, which asynchronously creates an HttpResponseMessage instanc that returns back an Http response message.

## Create the Response Handler

Lets go ahead and start creating our generic reponse handler.

1. Open the solution in Visual Studio and within the Api project create a new directory called Helpers.   
1. Within the Helpers directory, create a class called WrapResponseResult.cs.
1. To the WrapResponseResult class definition add `<T>` to the class name, inherit the class from IHttpActionResult, and add the ExecuteAsync method.

```C#
public class WrapResponseResult<T> : IHttpActionResult
{
    public Task<HttpResponseMessage> ExecuteAsync(CancellationToken cancellationToken)
    {
        throw new NotImplementedException("Not Implemented Yet.");
    }
}
```    

Now that we have the structure for the WrapResponseResult, we need to add some functionality to it.  The first thing we are going to do within the WrapResponseResult class is to add a variable to hold the value for our function in Func<T> and a 2nd variable  to hold the HttpRequestMessage.  Then we will set the values in the constructor.


The Func<T> is not something that you see everyday but it is very useful.  Basically it is a placeholder for a function and returns back whatever object we tell it to.  This is very useful when creating generic handlers like we are doing.  The value that we will set the Func<T> variable to when we call our wrapper is the function that will give us the results for the response.

```c#
private readonly Func<T> _func;
private readonly HttpRequestMessage _request;

public WrapResponseResult(Func<T> func, HttpRequestMessage request)
{
    _func = func;
    _request = request;
}
```    

Next we are going to create a method within the WrapResponseResult class to create our HttpResponseMessage.  This method will take in two parameters: Func<T> and HttpRequestMessage.  Then it will execute the Func<T> to get the result to add to the response.  If the execution is successful it will return back a status message of 200.  If it is not successful, it will check if it is an HttpResponseException and if it is will just rethrow the error since it is already in the format needed.  If it is not an HttpResponseException it will return an HttpResponseMessage with a status code of 500 Internal Server Error.

```c#
public HttpResponseMessage CreateResponse(Func<T> func, HttpRequestMessage request)
{
    try
    {
        return request.CreateResponse(HttpStatusCode.OK, func());
    }
    catch (HttpResponseException ex)
    {
        throw;
    }
    catch (Exception ex)
    {
        return request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
    }
}
```    

The last thing to do is update the ExecuteAsync method to call the CreateResponse method and pass in our _func and _request variables.  

```c#
public Task<HttpResponseMessage> ExecuteAsync(CancellationToken cancellationToken)
{
    return Task.FromResult(CreateResponse(_func, _request));
}
```

## Completed WrapResponseResult

The completed WrapResponseResult should look like:

```c#
public class WrapResponseResult<T> : IHttpActionResult
{
    private readonly Func<T> _func;
    private readonly HttpRequestMessage _request;

    public WrapResponseResult(Func<T> func, HttpRequestMessage request)
    {
        _request = request;
        _func = func;
    }

    public Task<HttpResponseMessage> ExecuteAsync(CancellationToken cancellationToken)
    {
        return Task.FromResult(CreateResponse(_func, _request));
    }

    public HttpResponseMessage CreateResponse(Func<T> func, HttpRequestMessage request)
    {
        try
        {
            return request.CreateResponse(HttpStatusCode.OK, func());
        }
        catch (HttpResponseException ex)
        {
            throw;
        }
        catch (Exception ex)
        {
            return request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
        }
    }
}
```    

## Updating Api Method to Use Generic Response Handler

Now that we have our WrapResponseResult class created, we need to update our FirstController to return a WrapResponseResult<UserModel>.  

1. Open up the Controllers\FirstController.cs file

1. Change the return type of the Get method to WrapResponseResult<UserModel>

        public WrapResponseResult<UserModel> Get()
        {
        }

1. Replace the contents of the Get method with the code below.  When the WrapResponseResult ExecuteAsync method is called it will run the code in the () => { } function.  

        
        return new WrapResponseResult<UserModel>(() =>
        {
            string userName = RequestContext.Principal.Identity.Name;
            return new UserModel { UserName = userName };
        }, this.Request);            

If you open a web browser and do a get against the api/First endpoint, you won't see any difference from what is returned back compared to just returning UserModel.  However, the benefit is that you now have a single generic method that will execute the function to get the results, format out the results, and check for errors.  This greatly simplifies the logic and amount of code that you will need to write for all of your Web Api methods.  As well since all of the methods will be using the same response handler, if you ever had to make a change to how the response is generated, all of the logic is contained within one class.  


