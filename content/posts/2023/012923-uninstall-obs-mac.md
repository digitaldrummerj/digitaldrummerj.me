---
categories: ["obs"]
published: 2023-01-29T13:00:00Z

title: "How to Completely Uninstall OBS on Mac"
url: '/obs-mac-uninstall'
---

As part of troubleshooting why on my Mac Mini M2 NDI was not workign with OBS, I needed to completely uninstall OBS (application, plugins, configurations, etc) so that there was no traces of OBS on the system and then re-install OBS.

<!--more-->

## Uninstall OBS Application

1. Open finder
1. Click on Applications
1. Find OBS
1. Right click on OBS and click on Move to Trash.

## Uninstall OBS Plugins and Configurations

To uninstall the plugins and configurations, open terminal and run the following command:

```shell
rm -rf ~/Library/Application\ Support/obs-studio
```

## Install OBS

Now that OBS is completely removed from your system you are ready to install [OBS](https://obsproject.com) and any [OBS plugins](https://obsproject.com/forum/resources/categories/obs-studio-plugins.6/) that you use.
