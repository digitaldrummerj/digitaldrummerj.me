---
categories: ["testing", "dotnet-core"]
date: 2022-02-08T13:00:00Z
published: false
title: "DotCover - Combine Multiple Results into Single Report"
url: '/dotcover-combine-multiple-results'
series: ['aspnet-core-code-coverage']

---
In TeamCity, what if you need to combine the code coverage results say from unit test and integration test projectsthst run as seperate build steps?

Luckily, TeamCity does this work for you but it is not obvious that it will do it for.

To get TeamCity to combine the multiple the code coverage results into a single code coverage result, you just need to add the echo command to import the data into the build like we did in our previous post