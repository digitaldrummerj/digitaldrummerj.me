---
categories:
- dotnet
date: 2015-10-05T00:00:00Z
excerpt: "Throwing away exceptions in your code is just a bad practice and makes it
  harder to support your application.  It may make it easier for you as a developer
  to get something working but in the long run it cost way more money to do the maintenance
  and troubleshooting then if you had just put in proper exception handling to start
  with.  \n\nI have worked on several codebases recently where methods returned false
  if either a business rule failed or an unexpected exception occurred with no logging
  of the error anywhere.  This made it extremely difficult to figure out what the
  issue was.  In several cases, even when you hooked up a debugger there was no way
  to get at the exception details since the exception was not passed into the catch
  block.     \n\n## Examples of Issue\n\nHere are a couple of examples of what I am
  talking about when I say swallowing the exception.  \n\n**Example 1: Totally Throwing
  Away Exception**\n\nIn this example, the code does nothing with the exception and
  does not even tell the caller that something failed.  I have spent many hours troubleshooting
  projects with this exact try/catch block and wondering why something that I thought
  should have worked was not, just to discover that deep down in the call stack it
  was swallowing the exception.  Since the catch block is empty, there is no way to
  put a breakpoint in the catch block but even if you could, there is no way to get
  at the exception in the catch block since it was not passed into it.  You would
  need to make a temp code change to add an exception parameter to the catch block
  and a bogus line in the catch block to be able to get at the exception.  \n    \n
  \   public void SomeMethod()\n    {\n        try\n        {\n            //Some
  Code That Errors\n        }\n        catch\n        {\n        }\n    }\n"
published: true
title: Do Not Swallow The Exceptions
---

Throwing away exceptions in your code is just a bad practice and makes it harder to support your application.  It may make it easier for you as a developer to get something working but in the long run it cost way more money to do the maintenance and troubleshooting then if you had just put in proper exception handling to start with.

I have worked on several codebases recently where methods returned false if either a business rule failed or an unexpected exception occurred with no logging of the error anywhere.  This made it extremely difficult to figure out what the issue was.  In several cases, even when you hooked up a debugger there was no way to get at the exception details since the exception was not passed into the catch block.

## Examples of Issue

Here are a couple of examples of what I am talking about when I say swallowing the exception.

**Example 1: Totally Throwing Away Exception**

In this example, the code does nothing with the exception and does not even tell the caller that something failed.  I have spent many hours troubleshooting projects with this exact try/catch block and wondering why something that I thought should have worked was not, just to discover that deep down in the call stack it was swallowing the exception.  Since the catch block is empty, there is no way to put a breakpoint in the catch block but even if you could, there is no way to get at the exception in the catch block since it was not passed into it.  You would need to make a temp code change to add an exception parameter to the catch block and a bogus line in the catch block to be able to get at the exception.

    public void SomeMethod()
    {
        try
        {
            //Some Code That Errors
        }
        catch
        {
        }
    }

**Example 2: At Least Tells You Something Went Wrong**

In this example, the code at least returns false back from the method so you can assume that something didn't go right but you don't know if it was an exception or if it was business logic that failed.  This example is also not logging any information about the exception and there is no way in a debugger to get the exception details.  You can at least put a breakpoint in the catch block, but you would need to make a code change to add pass the exception into the catch block.

    public bool SomeMethod()
    {
        try
        {
           //Some code
           if ("Business Logic Failed")
           {
                return false;
           }

           //everything passed
           return true;
        }
        catch
        {
            return false;
        }
    }

## Fixing This Issue

Now that you understand the issue, lets examine how to fix it.  The fix is really simple.  There are two options that I use:

1. Pass the exception variable into the catch block and log the information somewhere.
1. Let the exception bubble up the call stack and handle it at a higher level.

**Fix Example #1: Logging The Exception**

In this example, the exception along with all of the inner exceptions are logged and the business rules are checked.  You can also put a breakpoint inside the catch block to get details on the exception.  This code still returns a false though if something went wrong which doesn't make it obvious if it was an exception or business logic that didn't pass without looking at the logs.

    public bool SomeMethod()
    {
        try
        {
           //Some code
           if ("Business Logic Failed")
           {
                throw new ApplicationException("Business Logic Failed...Give details on what failed");
           }

           return true;
        }
        catch (Exception ex)
        {
            //Logs StackTrace, Message, and all InnerException Message/StackTrace
            LogMessage(ex);
            return false;
        }
    }

**Fix Example #2: Bubbling Exception Up Call Stack**

This example lets the full exception go up the call stack with a custom exception so that the calling method can figure out how it wants to handle the exception.  You should handle this exception at some point.  It is bad practice to let it become an unhandled exception and crash your application.

The reason for using a custom exception is to be able to catch your business logic errors versus an unexpected exception.

    public void SomeMethod()
    {
        //Some Code
        if ("Business Logic Failed")
        {
            //Let Exception Bubble Up the Call Stack with a custom exception
            //Can also use ApplicationException but harder to catch specific exceptions without examining the exception message
            throw new MyCustomException("Business Logic Failed...Give details on what failed");
        }

    }


**Fix Example #3: Ability to Put in a Breakpoint**

Yes I know I said there is 2 ways to fix it but you can also do it this way.  However this is my least favorite way to not swallow exception as you are still technically swallowing the error but you can at least hook up the debugger, put a breakpoint on the return statement, and get at the exception details.  This only is of value in your development machine but it is at least better than nothing.

    public void SomeMethod()
    {
        try
        {

            //Some Code
        }
        catch (Exception ex)
        {
            return;
        }
    }


## Wrap-Up

As you can see it does not take much more work to be able to do something with the exception.  It will save you hours of troubleshooting work just by handling the exception and not throwing it away.  Don't take the easy way out by swallowing exceptions.  Be nice to your fellow developers and don't throw away the exceptions.
