---
published: true
layout: post
title: Ionic - Using behind a proxy server
categories: [proxy, ionic]
date: 2015-01-20 20:45:35
excerpt: |
    I ran into an issue today on the vagrant IonicBox when I tried to create a new Ionic project at work behind the firewall/proxy even with all of the configurations for npm, git, bower, and bash setup for the proxy.
---

I ran into an issue today on the vagrant IonicBox when I tried to create a new Ionic project at work behind the firewall/proxy even with all of the configurations for npm, git, bower, and bash setup for the proxy as detailed at [{{"proxy-configurations" | prepend: site.baseurl | prepend: site.url}}]({{"proxy-configurations" | prepend: site.baseurl | prepend: site.url}}).

Luckily, Ionic had a fix for this already.  

**Linux**

All I had to do was put PROXY=http://myserver:myport in front of the ionic start command.

       PROXY=http://myserver:myport ionic start todo blank

**Windows**
       
 All I had to do was set the http_proxy environment variable and then run the ionic start command as I normally would.
 
    ionic start todo blank
