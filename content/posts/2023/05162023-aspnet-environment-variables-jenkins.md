---
categories: ["jenkins", "aspnet core", "dotnet"]
date: 2023-05-16T13:00:00Z
published: true
title: "ASP.NET Core Environment Variables With Semicolon in Jenkins"
url: '/jenkins-aspnet-environment-semicolon'
---

In my ASP.NET Core project, I am using an environment variable in the form of `MyProject:MyVariableName` and needed to create a Jenkins pipeline but I could not get it to recognize that format.  It kept making the environment variable name just `MyVariableName`.

Below is the code from the Jenkinsfile that I tried that was causing the issue.

```text
stage('Run All Test') {
    environment {
        MyProject:MyVariableName = "Some Value"
    }
}
```

Turns out that Jenkins does not recognize the `:` in environment variable names.  After much searching,  I ran across this [article](https://learn.microsoft.com/en-us/aspnet/core/fundamentals/configuration/?tabs=basicconfiguration&view=aspnetcore-7.0#non-prefixed-environment-variables) that mentioned that not all platforms support `:` in the environment names and that for those environmments you can use a double underscore `__`

So I updated the Jenkinsfile code above with the double underscore `__` and this make Jenkins see the environment variable name as `MyProject:MyVariableName`

```text
stage('Run All Test') {
    environment {
        MyProject__MyVariableName = "Some Value"
    }
}
```
