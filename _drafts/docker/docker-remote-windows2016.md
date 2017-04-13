---
layout: post
title: 'Using VMware With Windows Server 2016 to Run Remote Docker Host'
date: 2017-04-05 06:00
categories: ['docker']
published: true
excerpt: | 

---

1. Open Powershell
1. Set Environment Variable for Proxy

    ```powershell
    [Environment]::SetEnvironmentVariable("HTTP_PROXY", "http://username:password@proxy:port/", [EnvironmentVariableTarget]::Machine)
    ```

1. Restart Docker

    ```powershell
    Restart-Service docker
    ```

pruned from [https://docs.microsoft.com/en-us/virtualization/windowscontainers/manage-docker/configure-docker-daemon](https://docs.microsoft.com/en-us/virtualization/windowscontainers/manage-docker/configure-docker-daemon)