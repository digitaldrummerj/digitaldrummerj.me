---
categories:
- dotnet-core
- web-api
date: 2018-11-05T00:00:00Z
published: true
title: Dotnet CLI Global Tools Are Awesome!
series: ["DotnetGlobalTools"]
---

With the release of .NET Core 2.1 the .NET Core CLI includes a feature called Global Tools that provides a simple way to create and share cross-platform console tools.

When you install a global tool, the CLI will download a special NuGet package that contains a console application and make your console tool available as a new command from the command line.

> Note: You will need to download .NET Core 2.1 to use this to try this on your own.

To install a global tool you execute “dotnet tool install”.  For example to install the "amazing-tool" you would run:

```bash
dotnet tool install -g amazing-tool
```

Once you have the "amazing-tool" installed, now you can run it from the command line.  The `-h` used below is the standard for seeing the help.

```bash
amazing-tool -h
```

Unfortunately, one of the features that is missing though is the ability to search a registery of all of the available tools out there.  I did find a really nice list of tools from Nate McMaster at
 [https://github.com/natemcmaster/dotnet-tools](https://github.com/natemcmaster/dotnet-tools)

In our next article, we will start to take a look at a few of the global tools that I am using.