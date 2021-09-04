---
categories:
- gulp
date: 2015-10-29T00:00:00Z
excerpt: |
  Gulp 4 is not released yet but if you have a need to install it here is how to do it.  I will cover how to globally install it as well as how to update your package.json for your projects.
published: true
title: Installing Gulp 4.x

---

Gulp 4 is not released yet but if you have a need to install it here is how to do it.  I will cover how to globally install it as well as how to update your package.json for your projects.

## Globally Installing Gulp

The first thing we need to do is install the Gulp command line to be able to run the gulp task.

1. Open a Command Prompt (Windows) or Terminal (Mac or Linux)
1. Check if you have Gulp CLI < 1.2.1 installed

    	$ gulp -v

1. If a Gulp version is < 1.2.1, you will need to upgrade by running the following commands

        $ npm install -g gulp-cli

1. Verify Gulp CLI 1.2.1 installed correctly
    
        $ gulp -v
            
## Updating Your Projects package.son

Now we need to tell our project to use Gulp 4.0 when it runs the gulp task.

If you using a previous version of Gulp in your package.json file, you can upgrade it if you would like or continue to use Gulp 3.x.  I have not had any issue with leaving my local repository at 3.9 while having Gulp 4 installed globally.

1. Open a Command Prompt (Windows) or Terminal (Mac or Linux)
1. Navigate to the directory that contains your package.json
1. Uninstall gulp.  **Note:** If your package.json has gulp listed as a dev dependency use  --save-dev.  If gulp is listed as a dependency use --save.

        $ npm uninstall gulp --save-dev
        $ npm install git+https://git@github.com/gulpjs/gulp.git#4.0 --save-dev
        
        OR
        
        $ npm uninstall gulp --save
        $ npm install git+https://git@github.com/gulpjs/gulp.git#4.0  --save
    
## Wrap-up

You can keep up to date on Gulp 4 at [https://github.com/gulpjs/gulp/tree/4.0](https://github.com/gulpjs/gulp/tree/4.0) and [https://twitter.com/gulpjs?lang=en](https://twitter.com/gulpjs?lang=en)