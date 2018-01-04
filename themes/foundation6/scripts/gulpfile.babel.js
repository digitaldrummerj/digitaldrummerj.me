'use strict';

// 0.0 - Import
  import cp         from 'child_process';
  import fs         from 'fs';
  import gulp       from 'gulp';
  import gutil      from 'gulp-util';
  import path       from 'path';
  import plugins    from 'gulp-load-plugins';
  import prettify   from 'gulp-jsbeautifier';
  import rimraf     from 'rimraf';
  import yaml       from 'js-yaml';
  import yargs      from 'yargs';

// 0.1 - Load configuration & path variables
  const $ = plugins();                                                          // Load all Gulp plugins into one variable
  const PRODUCTION = !!(yargs.argv.production);                                 // Check for --production flag
  var { COMPATIBILITY, PORT, PATHS } = loadConfig();                            // Load settings from config.yml
  function loadConfig() {                                                       // Load Config
    let ymlFile = fs.readFileSync('config.yml', 'utf8');
    return yaml.load(ymlFile);
  }
  var THEME = {}; var HUGO = {}; THEME.source = {} ; THEME.public = {}
    THEME.root  =     path.dirname( path.resolve() );                           // Set Theme root variable first
    HUGO.root   =     path.join( THEME.root, '../..' );                         // Full path of Hugo's root (assumes it is two directories up)
    THEME = {
      root      :     THEME.root,                                               // Full path of theme's root
      name      :     THEME.root.split( path.sep ).pop(),                       // Full name of theme's root folder
      source    :     path.join(THEME.root, '/source'),                         // Full path of theme's source folder
      static    :     path.join(THEME.root, '/static'),                         // Full path of theme's static folder
    };
    HUGO = {
      root      :     HUGO.root,                                                // Full path of Hugo's root (assumes it is two directories up)
      public    :     path.join(HUGO.root, '/public'),                          // Full path of Hugo's public folder
    };

// 0.2 - SCSS build task
  function sass() {
    return gulp.src( path.join(THEME.source, '/scss/app.scss') )                // SCSS import paths in `app.scss`
      .pipe($.sourcemaps.init())
      .pipe($.sass({                                                            // Build / concat scss
        includePaths: PATHS.sass
        })
        .on('error', $.sass.logError))
      .pipe($.autoprefixer({                                                    // Autoprefixer
        browsers: COMPATIBILITY
        }))
      .pipe($.if(PRODUCTION, $.cssnano()))                                      // In production, the CSS is compressed
      .pipe($.if(!PRODUCTION, $.sourcemaps.write()))                            // In production, the CSS is sourcemapped
      .pipe(gulp.dest( path.join(THEME.static, '/css') ));
  }

// 0.3 - JS build task
  function javascript() {
    return gulp.src( PATHS.javascript )                                         // JS import paths in `config.yml`
      .pipe($.sourcemaps.init())
      .pipe($.babel({ignore: ['what-input.js']}))                               // Build babel - `what-input` breaks if not ignored
      .pipe($.concat('app.js'))                                                 // Build / concat js
      .pipe($.if(PRODUCTION, $.uglify()                                         // In production, the file is minified
        .on('error', e => { console.log(e); })
        ))
      .pipe($.if(!PRODUCTION, $.sourcemaps.write()))                            // In production, the JS is sourcemapped
      .pipe(gulp.dest( path.join(THEME.static, '/js') ));
  }

// 0.4 - Delete `public` folder
  function clean(done) {
    rimraf(HUGO.public, done);                                                  // rm -rf
  }

// 0.5 - Hugo build task
  gulp.task('hugo-build', (code) => {
    return cp.spawn('hugo', ['-t', THEME.name, '-s',HUGO.root], { stdio: 'inherit' })
      .on('error', (error) => gutil.log(gutil.colors.red(error.message)))
      .on('close', code);
  })

  gulp.task('hugo-build-prod', (code) => {
    return cp.spawn('hugo', ['--config', PATHS.prodconfig, '-t', THEME.name, '-s',HUGO.root, ''], { stdio: 'inherit' })
      .on('error', (error) => gutil.log(gutil.colors.red(error.message)))
      .on('close', code);
  })
// 0.6 - Hugo server task
  gulp.task('hugo-server', (code) => {
    return cp.spawn('hugo', ['server', '-p', PORT, '-t', THEME.name, '-s',HUGO.root], { stdio: 'inherit' })
      .on('error', (error) => gutil.log(gutil.colors.red(error.message)))
      .on('close', code);
  })

  gulp.task('hugo-server-prod', (code) => {
    return cp.spawn('hugo', ['--config', PATHS.prodconfig,'server', '-p', PORT, '-t', THEME.name, '-s',HUGO.root], { stdio: 'inherit' })
      .on('error', (error) => gutil.log(gutil.colors.red(error.message)))
      .on('close', code);
  })
// 0.7 - Html5 lint task
  gulp.task('lint', function() {
    return gulp.src( path.join(HUGO.public, '/**/*.html') )
      .pipe(prettify({
        indent_size: 2,
        preserve_newlines: false
      }))
      .pipe(gulp.dest( HUGO.public ));
  })

// 0.8 - Watch for changes for scss / js / lint
  function watch() {
    gulp.watch( path.join(THEME.source, '/scss/**/*.scss') ).on('all', gulp.series( sass, 'lint' ));
    gulp.watch( path.join(THEME.source, '/js/**/*.js') ).on('all', gulp.series( javascript, 'lint' ));
    gulp.watch( THEME.public ).on('all', gulp.series( 'lint' ));
  }

// 1.0 - `Package.json` -> Gulp tasks
  gulp.task('build', gulp.series( gulp.parallel(sass, javascript) ));           
  // Build the 'static' folder
  
  gulp.task('css', gulp.series( sass ));                                        
  // Build the 'static' folder
  
  gulp.task('js', gulp.series( javascript ));                                   
  // Build the 'static' folder
  
  gulp.task('public', gulp.series( 'build', 'hugo-build', 'lint' ));  
  gulp.task('public-prod', gulp.series( 'build', 'hugo-build-prod', 'lint' )); 
  // Build the site, run the server, and watch for file changes

  gulp.task('server', gulp.series( 'build', gulp.parallel('hugo-server', watch) ));
  gulp.task('server-prod', gulp.series( 'build', gulp.parallel('hugo-server-prod', watch) ));
  // Build the site, run the server, and watch for file changes
