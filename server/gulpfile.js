'use strict';

var gulp        = require('gulp');
var browserSync = require('browser-sync');
var neat        = require('node-neat').includePaths;
var nodemon     = require('gulp-nodemon');
var sass        = require('gulp-sass');
var imagemin    = require('gulp-imagemin');

// we'd need a slight delay to reload browsers
// connected to browser-sync after restarting nodemon
var BROWSER_SYNC_RELOAD_DELAY = 500;

gulp.task('nodemon', function (cb) {
  var called = false;
  return nodemon({

    // nodemon our expressjs server
    script: './bin/www',

    // watch core server file(s) that require server restart on change
    watch: ['app.js']
  })
    .on('start', function onStart() {
      // ensure start only got called once
      if (!called) { cb(); }
      called = true;
    })
    .on('restart', function onRestart() {
      // reload connected browsers after a slight delay
      setTimeout(function reload() {
        browserSync.reload({
          stream: false
        });
      }, BROWSER_SYNC_RELOAD_DELAY);
    });
});

gulp.task('browser-sync', ['nodemon'], function () {

  // for more browser-sync config options: http://www.browsersync.io/docs/options/
  browserSync({

    // informs browser-sync to proxy our expressjs app which would run at the following location
    proxy: 'http://localhost:3000',

    // informs browser-sync to use the following port for the proxied app
    // notice that the default port is 3000, which would clash with our expressjs
    port: 4000,

    // open the proxied app in chrome
    browser: ['google-chrome']
  });
});

gulp.task('js',  function () {
  return gulp.src('./public/**/*.js')
    // do stuff to JavaScript files
    //.pipe(uglify())
    //.pipe(gulp.dest('...'));
});

gulp.task('css', function () {
  return gulp.src('./public/**/*.css')
    .pipe(browserSync.reload({ stream: true }))
});

gulp.task('global-styles', function () {
  return gulp.src('./styles/**/*.scss')
    .pipe(sass({
      includePaths: ['sass'].concat(neat)
    }))
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public/stylesheets'));
});

gulp.task('page-styles', function () {
  return gulp.src('./views/**/*.scss')
    .pipe(sass({
      includePaths: ['sass'].concat(neat)
    }))
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public/stylesheets'));
});

gulp.task('images', function () {
  return gulp.src('./views/**/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./public/'))
});

gulp.task('bs-reload', function () {
  browserSync.reload();
});

gulp.task('default', ['browser-sync'], function () {
  gulp.watch('./public/**/*.js',     ['js', browserSync.reload]);
  gulp.watch('./public/**/*.css',    ['css']);
  gulp.watch('./styles/**/*.scss',   ['global-styles']);
  gulp.watch('./views/**/*.scss',    ['page-styles']);
  gulp.watch('./views/**/images/*',  ['images']);
  gulp.watch('./public/**/*.html',   ['bs-reload']);
});