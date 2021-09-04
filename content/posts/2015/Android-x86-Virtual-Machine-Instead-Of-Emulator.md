---
categories:
- ionic
date: 2015-01-11T20:45:35Z
excerpt: "The Android emulator is super super slow and I could never get it working
  on my development virtual machine.  I thought no problem I will just use Genymotion
  but due to a video card driver issue on my laptop (not Genymotion's fault), I couldn't
  use it either.  I was thinking ok I will just have to use a real device and always
  have it on me when I do Android development work.  This wouldn't have been ideal
  though since Android development work is just a side project and who wants to carry
  an extra device just in case you get a few minutes to work on the project.\n\nWell
  then I ran across someone that mentioned that Android x86 project.  This project
  allows you to run Android on a pc and virtualbox machine.  So I follow the guide
  at  [Android x86 virtualbox install](http://www.android-x86.org/documents/virtualboxhowto)
  and was up and running in no time.  \n"
published: true
title: Ionic - Using Android x86 Virtual Machine Instead of Emulator
---

The Android emulator is super super slow and I could never get it working on my development virtual machine.  I thought no problem I will just use Genymotion but due to a video card driver issue on my laptop (not Genymotion's fault), I couldn't use it either.  I was thinking ok I will just have to use a real device and always have it on me when I do Android development work.  This wouldn't have been ideal though since Android development work is just a side project and who wants to carry an extra device just in case you get a few minutes to work on the project.

Well then I ran across someone that mentioned that Android x86 project.  This project allows you to run Android on a pc and virtualbox machine.  So I follow the guide at  [Android x86 virtualbox install](http://www.android-x86.org/documents/virtualboxhowto) and was up and running in no time.  

Once I was up and running, the next step was to figure out how to deploy my applications to the machine just like I would with the emulator or a real device.  Turns out this is pretty easy to do with the Android Debugging Bridge (adb)

Following the [Debug How To] (http://www.android-x86.org/documents/debug-howto) guide I was able to get it working pretty quickly. 

As the article says, it was easiest to get it working with a bridged adapter.  Because I was using a virtualbox machine for both development and android x86, this made using NAT way more complicated then if just the Android x86 was the virtual machine.  

**Bridged Adapter Setup:**

1. Get Android Virtual Machine IP
	- Open Terminal (alt + F1)
	- type netcfg 
1. On the host machine (development machine)
	- Open command prompt
	- type adb kill-server
	- type adb tcpip 5555
    	- type adb connect [Android Virtual Machine IP]:5555
