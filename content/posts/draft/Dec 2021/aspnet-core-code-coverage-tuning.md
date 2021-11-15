---
categories:
    - dotnet-core
    - Testing
date: 2020-05-03T00:00:00Z
draft: true
title: ASP.NET Code Coverage with DotCover Tuning
series: ["Code Coverage"]
---

```bash
dotnet dotcover --dotCoverOutput="../UnitTestCodeCoverage.Snapshot.dcvr" --dotCoverFilters="+:Assembly=<Name>.*;-:Assembly=<Name>.UnitTest;-:Assembly=<Name>.MockData;-:Class=<Name>.Data.Migrations.*" test --logger "console;verbosity=normal"
```