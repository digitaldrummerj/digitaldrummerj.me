---
categories: ["node"]
date: 2018-02-08T00:00:00Z
published: true
title: How to Download and Extract a Zip File with Node
---

Downloading and extracting a zip file using Node seemed like a pretty easy task but alas it took some time to figure out.

While researching how to do this, I didn't find a library that had all of the requirements within it but I did find a few that allowed me to meet the requirements

## Requirements

1. Download zip file from a url
1. Extract zip file to a directory location
1. Extract a single directory and all of its sub-directories within the zip file

## Downloading the Zip File

Step 1 was to get the zip file downloaded using Node and making sure that I could manually open the zip file. Using the superagent and fs modules, you can download the zip file and write it to the file system./

1. Install superagent

  ```shell
  npm install --save superagent
  ```

1. Use superagent to request the file and pipe it to disk

  ```javascript
  'use strict';
  const request = require('superagent');
  const fs = require('fs');

  const repoName = 'node-zip-download-sample';
  const href = `https://github.com/digitaldrummerj/${repoName}/archive`;
  const zipFile = 'master.zip';
  const source = `${href}/${zipFile}`;
  const extractEntryTo = `${repoName}-master/`;
  const outputDir = `./${repoName}-master/`;

  request
    .get(source)
    .on('error', function(error) {
      console.log(error);
    })
    .pipe(fs.createWriteStream(zipFile))
    .on('finish', function() {});
  ```

Now that the zip file is downloaded we can unzip it.

## Unzipping the Zip File

For unzipping, I didn't find anything built into Node but I did find the [AdmZip](https://www.npmjs.com/package/adm-zip) module on NPM.

> AdmZip has functions for dealing with the entire zip file or a single file/directory within the zip file. In my case all of my files were contained within a directory in the zip file and I wanted to extract the files contained within that directory.

1. Install Adm-Zip

  ```shell
  npm install --save adm-zip
  ```

1. Within the finish above, we want to use Adm-Zip to grab a directory out of the zip file and extract it under the directory that our code is running in

  ```javascript
  console.log('finished dowloading');
  var zip = new admZip(zipFile);
  console.log('start unzip');
  zip.extractEntryTo(extractEntryTo, outputDir, false, true);
  console.log('finished unzip');
  ```

Just like that we had our zip file downloaded and extracted to a directory.

You can find a working sample at [https://github.com/digitaldrummerj/node-zip-download-sample](https://github.com/digitaldrummerj/node-zip-download-sample)

Leave a comment below if you end up using this solution or are doing it another way.
