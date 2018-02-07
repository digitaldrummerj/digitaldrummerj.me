---
categories: ["node"]
date: 2018-02-07T00:00:00Z
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

Step 1 was to get the zip file downloaded using Node and make sure that I could manually open it.  To download the zip file, I am using the superagent package and piping the download to a file using fs.

1. Install superagent package

    ```shell
    npm install --save superagent
    ```

1. Using superagent along with fs we can download a zip file and save the zip to a local file.  In the code below, I am downloading the zip for the master branch of the Github repo located at [https://github.com/digitaldrummerj/node-zip-download-sample](https://github.com/digitaldrummerj/node-zip-download-sample).

    > There are "TODO" statements in the code below for the things that you would need to change to use this code for your own zip file.


    ```javascript
    'use strict';

    // Import
    const request = require('superagent');
    const fs = require('fs');

    // TODO: change to where your zip file is located
    const repoName = 'node-zip-download-sample';
    const href = `https://github.com/digitaldrummerj/${repoName}/archive`;
    const zipFile = 'master.zip';

    const source = `${href}/${zipFile}`;

    // TODO: change to the directory instead of the zip that you want to extract
    const extractEntryTo = `${repoName}-master/`;

    // TODO: change to the directory where you want to extract to
    const outputDir = `./${repoName}-master/`;

    request
      .get(source)
      .on('error', function(error) {
        console.log(error);
      })
      .pipe(fs.createWriteStream(zipFile))
      .on('finish', function() {
          // add code below to here
      });
    ```

Now that the zip file is downloaded we can unzip it.

## Unzipping the Zip File

For unzipping, I didn't find anything built into Node but I did find the [Adm-Zip](https://www.npmjs.com/package/adm-zip) package on NPM.

[Adm-Zip](https://www.npmjs.com/package/adm-zip) has functions for dealing with the entire zip file or a single file/directory within the zip file. In my case all of my files were contained within a directory in the zip file and I wanted to extract the files contained within that directory.

1. Install [Adm-Zip](https://www.npmjs.com/package/adm-zip)

    ```shell
    npm install --save adm-zip
    ```

1. Add Adm-Zip to the list of requires

    ```javascript
    const admZip = require('adm-zip');
    ```

1. Within the on finish statement from the previous section, add the code below to use Adm-Zip to extract a directory from the downloaded zip file and extract it to a directory

    ```javascript
    console.log('finished downloading');
    var zip = new admZip(zipFile);
    console.log('start unzip');
    zip.extractEntryTo(extractEntryTo, outputDir, false, true);
    console.log('finished unzip');
    ```

Just like that we had our zip file downloaded and extracted to a directory.

You can find a working sample at [https://github.com/digitaldrummerj/node-zip-download-sample](https://github.com/digitaldrummerj/node-zip-download-sample)

Leave a comment below if you end up using this solution or are doing it another way.
