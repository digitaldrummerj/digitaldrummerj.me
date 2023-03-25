---
categories: ["dotnet", "testing"]
date: 2023-02-16T13:00:00Z
published: true
title: "Xunit Create Generic Exception Tests"
url: '/xunit-generic-exception-tests'
---

Using XUnit, I was creating a bunch of exception test methods that did the same exact test with the only difference being the type of exception being thrown and I thought there has to be a way to use an XUnit theory to only write a single test method and validate the various exception scenarios.

Luckily, it was really easy to accomplish the goal of having a single test method that validated multiple types of exceptions using an XUnit theory but it took a bit to figure how to accomplish this goal.

<!--more-->

To validate an exception with XUnit you normally make an `Assert.Throws` calls and tell the type of exception like so:

```c#
ApplicationException exception =
                Assert
                   .Throws<ApplicationException>(() => Your_Method_Call);
```

This works great to catch a single exception type.  However, what if you needed to test different scenarios in an XUnit theory that throw different exception types.

One option would be to create a test method for each exception type you need to assert but this creates a good amount of duplicate code.

Another option would be to make all of your exceptions types the same but that makes your code less obvious and it is not great practice to not throw the proper exception type.

That leaves us with the best option which is to use one of the overloads of the Asset.Throws method where you can specify the exception type.  Since all exceptions inherit for `Exception`, we can get the type of exception from the Exception that we pass in through the XUnit Theory

```c#
Exception exception =
        Assert
            .Throws(expectedException.GetType(),
                    () => Your_Method_Call);
```

Now lets look at the complete example where we setup the test data to use in the XUnit Theory `MemberData` attribute and then write the XUnit `Theory` test method.

```c#
 public static IEnumerable<object[]> ExceptionData => new List<object[]>
{
    new object[]
    {
        Guid.Empty, // argument1
        Guid.Empty, // argument2
        new ArgumentNullException("Argument1", "Exception Message") // exceptedException
    },
};

[Theory]
[MemberData(nameof(ExceptionData))]
public void ShouldThrowException(Guid argument1, Guid argument2, Exception expectedException)
{
    Exception exception =
        Assert
            .Throws(expectedException.GetType(),
                    () => Your_Method_Call);

    Assert.NotNull(exception);
    Assert.Equal(expectedException.Message, exception.Message);
}
```
