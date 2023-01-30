---
categories: ["obs"]
date: 2023-01-29T13:05:00Z
published: true
title: "Get NDI working with OBS 29 on Apple Silicon"
url: '/obs29-ndi-apple-silicon'
---

I just got a Mac Mini M2 and needed to get OBS 29 (latest version) working with NDI but no matter what I did I kept getting the following error everytime I started OBS.

![OBS NDI Error on Startup Missing NDI Runtime](/images/obs-mac/obs-ndi-error.png)

<!--more-->

## Initial Install

Initially, I tried the following as this is what the [OBS NDI plugin](https://obsproject.com/forum/resources/obs-ndi-newtek-ndi™-integration-into-obs-studio.528/) recommended but it is what led to the error above.

1. Install [OBS](https://obsproject.com/download)
1. Install the [OBS NDI 4.5 Runtime](https://ndi.palakis.fr/runtime/ndi-runtime-4.5.1-macOS.pkg)
1. Install the [obs-ndi-4.10.1-macos-arm64.pkg](https://github.com/DDRBoxman/obs-ndi/releases/tag/4.10.1)

Upon launching OBS, you will get the NDI runtime is missing error

![OBS NDI Error on Startup Missing NDI Runtime](/images/obs-mac/obs-ndi-error.png)

## Fixing the NDI Runtime Missing Error

No matter how many times I download the OBS NDI 4.5 runtime, the error kept popping up.

To fix the error, I needed to close OBS, install the NDI Tools from NewTek and copy the libndi_advanced.dylib to the /usr/local/lib folder as libndi.4.dylib

1. Quit OBS
1. Install the [NDI Tools](https://www.ndi.tv/tools/)
1. Reboot your Mac
1. Open a terminal and run the following command to copy the libndi lib to the right place

  ```shell
  sudo cp "/Applications/NDI Video Monitor.app/Contents/Frameworks/libndi_advanced.dylib" "/usr/local/lib/libndi.4.dylib"
  ```

## Verify NDI Is Working

1. Open OBS and the NDI Runtime missing error should not appear
1. Under the tools menu you have the NDI Output settings option
1. In a scene you can add an NDI Source

{{< alert class="warning" >}}
**Note:** I also found that when sending NDI Audio to another computer, that the audio had a lot of static on it but only in the right channel.  The fix was to go into the OBS Audio setting on the computer sending the NDI output and set the Audio -> General -> Channels to Mono.
{{</alert>}}
