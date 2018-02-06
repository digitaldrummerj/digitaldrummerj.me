---
categories: ["node"]
date: 2018-02-08T00:00:00Z
draft: true
title: Download and Extract a Zip File with Node
---

Recently, I had a requirement for a Node app that I was working on to download and extract a zip file.  This seemed like a pretty easy requirement and something that Node should be good at but it took me way longer to get it working than I expected.

While researching how to do this, I found a few libraries that looked like they would work but I didn't want to add a dependency for a task that seemed like Node should be able to do out of the box.
 
## Downloading the Zip File

Step 1 for me was to focus on getting the zip file downloaded and making sure it was a valid zip file that I could open manually.
  
The first thing I tried was using the https module built into Node to download the zip file.  This option kept resulting in an invalid zip file on download.  After lots of research, trying various variations of code and seeing multiple comments that it was unreliable to use the https module to  download files, I ditched this attempt.
 
Next, i went down the route of using the request module and piping it to a file.  This worked on the first try and is the solution that I went with.

?? add code ??

Now that I had the file downloaded I could focus on  unzipping the files.  

## Unzipping the Zip File 

For unzipping I thought there had to be something built in Node but I could find anything that would work.  At that point I started looking for a library and i ran across [AdmZip](https://www.npmjs.com/package/adm-zip).  

AdmZip has functions for dealing with the entire zip file or a single file/directory within the zip file.  In my case all of my files were contained within a directory in the zip file and I wanted to extract the files contained within that directory.

?? add code here ??

Just like that we had our zip file downloaded and extracted to a directory.  

Leave a comment below if you end up using this solution or are doing it another way.


