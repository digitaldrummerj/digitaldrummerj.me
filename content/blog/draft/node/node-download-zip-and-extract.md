---
categories:
- node
date: 2017-10-03T00:00:00Z
draft: true
excerpt: |-
  I had a requirement for a Node based Cli that I was working  to download a zip and extract  it to a directory.  This seemed like a pretty easy requirement but took me several hours to figure out.
  I found a few libraries that looked like they would work but I didn't want to add a dependency for a task that seemed like Node could easily do  out of the box.
  Before wiring about unzipping the file, I focused on getting the zip file downloaded and making sure it was a valid zip file that I could open manually.
title: Download and Extract Zip File with Node

---

I had a requirement for a Node based Cli that I was working  to download a zip and extract  it to a directory.  This seemed like a pretty easy requirement but took me several hours to figure out. 

I found a few libraries that looked like they would work but I didn't want to add a dependency for a task that seemed like Node could easily do  out of the box.
 
Before wiring about unzipping the file, I focused on getting the zip file downloaded and making sure it was a valid zip file that I could open manually.
  
The first thing I tried was using the https module built into Node to download the zip file.    This option kept resulting in an invalid zip file on download.  After lots of research, trying various variations of code  and seeing multiple comments on various sites like stackoverflow that it was unreliable to use the https module to  download  files, I ditched this attempt.
 
 My next attempt and the one the work right away was using the request module and piping  it  to a file.  

Now that I had the file downloaded I could focus on  unzipping the files.  

To unzip the files I decided to use [AdmZip](https://www.npmjs.com/package/adm-zip).  AdmZip had  functions for  the entire the zip file or  a single file/directory.  I my case all of my files were contained within a directory in the zip file and I wanted to extract the files contained within that directory.


