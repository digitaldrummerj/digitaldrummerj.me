---
categories:
- ionic
- gulp
date: 2015-04-30T00:00:00Z
excerpt: As you work on an Ionic based project or for that matter any web projects
  that have javascript or css file, you will at some point forget to add your new
  javascript or css file to the page and wonder why the page is broken.  This is really
  annoying when it happens as many times you spend quite a bit of time troubleshooting
  before you realize that you just forgot to add the script or css tag.  You can fix
  this problem using gulp and the gulp inject module to automatically add the script
  and css tags onto the page.
published: true
title: Automatically Add JS/CSS Files to Your Ionic Projects
---

As you work on an Ionic based project or for that matter any web projects that have javascript or css file, you will at some point forget to add your new javascript or css file to the page and wonder why the page is broken.  This is really annoying when it happens as many times you spend quite a bit of time troubleshooting before you realize that you just forgot to add the script or css tag.  You can fix this problem using gulp and the gulp inject module to automatically add the script and css tags onto the page.

## Installing Gulp

You should already have NodeJS installed.  To install Gulp:

1. Open command prompt
1. On Windows, run the command:

        $ npm install gulp -g

1. On OSx, run the command:

        $ sudo npm install gulp -g

## Installing Gulp-Inject

1. To add the gulp-inject module to the package.json file as a development dependency  you need to install gulp-inject with the --save-dev argument.  From your Ionic project directory run the command:

        $ npm install gulp-inject --save-dev

## Adding Inject Task to gulpfile.js

1. Open the gulpfile.js
1. Add gulp-inject as a required module.  Name the variable used inject.

        var inject = require('gulp-inject');

1. Next you need to add to the paths where to look for changes to javascript and css files.  Note taht the ! in front of the file/path means to exclude that file/path from being injected.

        var paths = {
            sass: ['./scss/**/*.scss'],
            javascript: [
                './www/**/*.js',
                '!./www/js/app.js',
                '!./www/lib/**'
            ],
            css: [
                './www/**/*.css',
                '!./www/css/ionic.app*.css',
                '!./www/lib/**'
            ]
        };

1. Next we need to add a new gulp task called index (could be called anything).

        gulp.task('index', function(){
            return gulp.src('./www/index.html')
                .pipe(inject(
                    gulp.src(paths.javascript,
                        {read: false}), {relative: true}))
                .pipe(gulp.dest('./www'))
                .pipe(inject(
                    gulp.src(paths.css,
                    {read: false}), {relative: true}))
                .pipe(gulp.dest('./www'));
        });

1. Next add the index task to the gulp default task

        gulp.task('default', ['sass', 'index']);

1. Finally, add the javascript and css paths to the gulp watch task and have it call the index task when a change is detected.

        gulp.task('watch', function() {
            gulp.watch(paths.sass, ['sass']);
            gulp.watch([
            paths.javascript,
            paths.css
            ], ['index']);
        });

## Setting up index.html to Accept Inject

1. Open up the index.html file
1. In the head tag, replace all of the script tags for your controllers and services with the inject:js comment below.  Make sure to leaveLeave the app.js script tag.

        <!-- inject:js -->
        <!-- endinject -->
 
1. Replace the css tag for the style.css with the inject:css command below

        <!-- inject:css -->
        <!-- endinject -->

## Manually Running It

1. Run the gulp task index and then look at the index.html page.  You should see all of the javascript and css files added back in.

        gulp index
    
## Running it with Ionic serve

1. Open the ionic.project file and add the gulp index task to the gulpStartUpTasks.  If you don't have a gulpStartupTasks section, go ahead and add it without the sass task.

        "gulpStartupTasks": [
            "index",
            "watch",
            "sass"
        ],

1. In the index.html page, remove the javascript and css tags again.  Then run the ionic serve command.  You should that the gulp index task was run and all of the javascript and css files were added back in.

## Section 12.5: Further Reading

There is a lot of different options for the gulp-inject package.  If you want to read about all of the different options and see examples, the documentation is available at [https://www.npmjs.com/package/gulp-inject](https://www.npmjs.com/package/gulp-inject)

## Wrap-up

With just a little bit of code, you no longer will you have to wonder why a feature is not working, just to realize that it is because you forgot to include a javascript file.  There is all of kinds of additional functionality that you can perform with gulp such as minifying of css and javascript files, running npm/bower commands, or running sass compile commands.  The gulp-inject is just one module.  I encourage you to add gulp into your normal workflow and automate the mundane tasks.
