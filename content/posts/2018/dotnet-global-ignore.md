---
categories:
- dotnet-core
- web-api
date: 2018-11-06T00:00:00Z
published: true
title: Download .gitignore with a .NET CLI Global Tool
series: ["DotnetGlobalTools"]
---

If you are using Git as your version control system, you need a .gitignore file to keep all of those user specific files out of Git like the bin/obj directories.  You could manually create and configure the .gitignore file but why do it yourself when others have already done it for you.  A quick search and you will run across the [gitignore repo](https://github.com/github/gitignore) where you could download a premade file but what about if you had a tool to do this for you?

This is where .NET CLI Global Tool [dotnet-ignore](https://github.com/Arasz/dotnet-ignore) comes into play.  This tool allow you to easily see a list of preconfigured .gitignore files from this repo and then download the one you need.

The first thing you need to do is install the dotnet-ignore tool:

```bash
dotnet tool install -g dotnet-ignore
```

Now that it is installed you can see the available commands by viewing the help:

```bash
dotnet-ignore -h
```

You will notice that there are two commands available:  get and list.

When you run the `list` command it will show you all of the available .gitignore file

```bash
dotnet-ignore list
```

Once you find the one that you need in the list, you will run the `get` command to download it by using the `-n` parameter to specify the name.

```bash
dotnet-ignore get  -n "Git Ignore Name"
```

To download the Visual Studio .gitignore file run

```bash
dotnet-ignore get -n visualstudio.ignore
```

By default the .gitignore file is placed into the directory that the command is run from.  If you want it in a different directory use the `-d` parameter.

Just like that you have your .gitignore file.  Way better than manually searching for it and downloading it.
