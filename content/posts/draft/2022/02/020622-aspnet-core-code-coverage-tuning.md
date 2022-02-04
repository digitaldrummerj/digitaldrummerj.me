---
categories: ["Testing", "dotnet-core"]
date: 2022-02-06T13:00:00Z
published: false
title: "ASP.NET Core - Code Coverage Fine Tuning DotCover By Only Including Developer Created Code"
url: '/aspnet-core-code-coverage-tuning-dotcover/'
series: ['aspnet-core-code-coverage']
---


```bash
dotnet dotcover --dotCoverOutput="../UnitTestCodeCoverage.Snapshot.dcvr" --dotCoverFilters="+:Assembly=<Name>.*;-:Assembly=<Name>.UnitTest;-:Assembly=<Name>.MockData;-:Class=<Name>.Data.Migrations.*" test --logger "console;verbosity=normal"
```