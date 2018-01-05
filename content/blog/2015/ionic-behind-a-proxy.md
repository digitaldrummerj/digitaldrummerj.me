---
categories:
- proxy
- ionic
date: 2015-01-20T20:45:35Z
excerpt: |
  I ran into an issue today on the vagrant IonicBox when I tried to create a new Ionic project at work behind the firewall/proxy even with all of the configurations for npm, git, bower, and bash setup for the proxy.
published: true
title: Ionic - Using behind a proxy server

---

I ran into an issue today on the vagrant IonicBox when I tried to create a new Ionic project at work behind the firewall/proxy even with all of the configurations for npm, git, bower, and bash setup for the proxy as detailed at [proxy-configurations]({{< relref "proxy-configurations.md" >}}).

Luckily, Ionic had a fix for this already.  

**Linux**

All I had to do was put PROXY=http://myserver:myport in front of the ionic start command.

       PROXY=http://myserver:myport ionic start todo blank

**Windows**
       
 All I had to do was set the http_proxy environment variable and then run the ionic start command as I normally would.
 
    ionic start todo blank
