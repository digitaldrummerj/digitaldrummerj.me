---
categories:
- debugging
- chrome
- gulp
date: 2015-05-17T00:00:00Z
excerpt: "When you release your web site to production, you should minify and concatenate
  your javascript files.  You will have much better performance by doing this but
  unfortunately debugging becomes difficult with the minified code as it shortens
  all of the variable and method names.  Luckily there is a simple solution to tell
  the browser developer tools to use the original javascript files when debugging
  the code, called source maps. \n\nSourcemaps bacically are a way to map the combined/minified
  file back to the original file. As part of the minification process you generate
  a source map which holds the information about your original files.  The developer
  tools will then parse the source map and make it appear as though you're running
  unminified and uncombined files.\n\nTo generate the sourcemaps we are going to gulp
  with the gulp-concat, gulp-uglify, and gulp-sourcemaps modules.   If you are not
  familiar with gulp, it is basically a javascript build system that allows you to
  write code to automate tasks.  \n"
published: true
title: Javascript Debugging Made Easier with Sourcemaps

---

Updated: Add clean task that uses rimraf to delete the bundle.min.js file if it already exist.  Without this it would just append to the existing bundle.min.js file.

When you release your web site to production, you should minify and concatenate your javascript files.  You will have much better performance by doing this but unfortunately debugging becomes difficult with the minified code as it shortens all of the variable and method names.  Luckily there is a simple solution to tell the browser developer tools to use the original javascript files when debugging the code, called source maps.

Sourcemaps bacically are a way to map the combined/minified file back to the original file. As part of the minification process you generate a source map which holds the information about your original files.  The developer tools will then parse the source map and make it appear as though you're running unminified and uncombined files.

##Creating Sourcemaps

To generate the sourcemaps we are going to gulp with the gulp-concat, gulp-uglify, and gulp-sourcemaps modules.   If you are not familiar with gulp, it is basically a javascript build system that allows you to write code to automate tasks.

1. Install [node.js](http://nodejs.org) if you don't have it installed already.
1. Install Gulp and the Gulp modules that we need.

        $ npm install --save gulp
        $ npm install --save gulp-concat
        $ npm install --save-dev gulp-uglify
        $ npm install --save-dev gulp-sourcemaps
        $ npm install --save-dev rimraf

1. Create a file called gulpfile.js if you don't already have one.
1. Add the required gulp modules to the gulpfile.js.

        var gulp = require('gulp');
        var gutil = require('gulp-util');
        var concat = require('gulp-concat');
        var uglify = require('gulp-uglify');
        var sourcemaps = require('gulp-sourcemaps');
        var rimraf = require('rimraf');

1. Create the input paths variable to hold what files we should minify/concatenate.  I keep my files in the www folder.  The ! in the 2nd input path means to exclude this path.  I typically keep my vendor skips like angular, ionic, jquery, etc in the lib folder, so I don't want to minify those scripts again.

          var inputPaths = {
            javascript: ['./www/**/*.js', '!./www/lib/**']
          };

1. Create the output path variable to tell gulp where to output the minified file.

          var outputPaths = {
            'javascript': './www/js'
          };

1. Now we need to create the actual gulp task that does the minification and source map creation.  This tasks takes  the inputPaths.javscript files, combines them, minifies them, creates the source maps and save it all as a file called bundle.min.js.  By default the gulp.dest call will append the minified text to the bundle.min.js instead of overwriting it.  Instead we need to call the clean task task first which will delete the minified file if it already exist.

          var minifiedJsFileName = 'bundle.min.js';

          gulp.task('build-js', ['clean'], function() {
            return gulp.src(inputPaths.javascript)
              .pipe(sourcemaps.init())
              .pipe(concat(minifiedJsFileName))
              .pipe(uglify())
              .pipe(sourcemaps.write())
              .pipe(gulp.dest(outputPaths.javascript));
          });

1. Create the clean task

          gulp.task("clean", function (cb) {
            rimraf(outputPaths.javascript + '/' + minifiedJsFileName, cb);
          });

1. Once the task is created, we want to setup a gulp watch to regenerate the file when any of the javascript changes.

        gulp.task('watch', function() {
          gulp.watch(inputPaths.javascript, ['build-js']);
        });

1. Finally, we are going to create a default task to run the build-js task we created.  The default task will typically what you want to run anytime you start up the web server.

        gulp.task('default', ['build-js']);

##Running Task

1. Open a command prompt or terminal.
1. Navigate to the directory that contain the gulpfile.js we created.
1. Run the following command:

        $ gulp build-js

1. If it worked successfully, you should have a minified file in your www/js folder.
1. To use the file, open up the index.html file and remove all of your javascript script tags that reference your js files in the www folder and replace it with a single script tag that references the www/js/bundle.min.js file.  Make sure to leave any vendor script tags.

##Enabling Sourcemaps in Chrome Developer Tools

Now that we have the source maps generated, we have to tell the Chrome Developer Tools to enable the source maps.

1. Open Google Chrome.
1. Open the Developer Tools.

    ![Open Chrome Developer Tools](/images/ChromeDevTools/ChromeDevTools-Open.png)

1.  Click on the Setting Cog.

    ![Open Settings](/images/ChromeDevTools/ChromeDevTools-SettingsCog.png)

1. Scroll down in the General Settings under you see the Sources section and ensure that the "Enable JavaScript source maps" is checked.

    ![Enable Javascript Source Maps](/images/ChromeDevTools/ChromeDevTools-JavascriptSourcemapsEnabled.png)

1. Click on the X in the upper right of the Settings windows to close it.
1. Now view your web site in the browser to make sure everything is still working.
    * Note: If you are using Angular, you have to make sure that you use the minification safe syntax for the dependency injection.  See the next section for examples.
    * Note 2: If you are using the Ionic Framework, the default templates (blank, tabs, sidemenu) do not use the Angular minification safe syntax.  You will need to modify the template after you generate your application.

##Angular Minification Safe Syntax

If you are using the AngularJs framework it does a lot of dependency injection.  Out of the box, if you just pass in your arguments to the different functions, it is not minification safe.  There are a couple of easy ways to make it minification safe with a minimal amount of code changes.

Option 1: $inject method
{{< highlight text >}}

//Controllers
var myController = function(anyVariableName, $http) {
};

myController.$inject = ['$scope', '$http'];

{{< / highlight >}}

Option 2: &#91;&#93; syntax.  You start the 2nd parameter with a &#91;, put your list of dependencies as string, your function to run and then the closing &#93;.

  {{< highlight text >}}

//Modules
var myApp = angular.module('myApp',
     [ //Dependencies go here.]
);

//Services
myApp.service('serviceName',
   ['$http', '$location',
        function($http, $location) {
        }
   ]
);

//Directives
myApp.directive('directiveName',
    ['$http', '$location',
         function($http, $location)
         {
         }
    ]
);

//Factories
myApp.factory('factoryName',
     ['$http', '$location',
          function($http, $location) {
          }
     ]
);
{{< / highlight >}}
