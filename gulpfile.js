/* packages */

// general
const { src, dest, parallel, series, watch } = require('gulp');
const del = require('del');
const rename = require('gulp-rename');
const browserSync = require('browser-sync').create();
const plumber = require('gulp-plumber');
const gulpIf = require('gulp-if');

// html
const pug = require('gulp-pug');

// styles
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const cleanCSS = require('gulp-clean-css');

// js
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const webpackConfig = require('./webpack.config.js');
const uglify = require('gulp-uglify');

// img
const tinyPng = require('gulp-tinypng');

/* variables */

let isBuildFlag = false;

const app = 'src/',
  dist = 'dist/';

const config = {
  app: {
    html: app + 'pug/*.pug',
    style: app + 'styles/main.sass',
    js: app + 'js/**/*.js',
    img: app + 'img/**/*.*',
    api: app + 'api/**/*.*'
  },
  dist: {
    html: dist,
    style: dist + 'css/',
    js: dist + 'js/',
    img: dist + 'img/',
    api: dist + 'api/'
  },
  watch: {
    html: app + 'pug/**/*.pug',
    style: app + 'styles/**/*.sass',
    js: app + 'js/**/*.js',
    img: app + 'img/**/*.*',
    api: app + 'api/**/*.*'
  }
}

/* tasks */

// general

const deleteBuild = () => {
  return del(dist, {force: true});
}

const setMode = (isBuild) => {
  return cb => {
    isBuildFlag = isBuild;
    cb();
  }
}

// html 

const compilePug = () => {
  return src(config.app.html)
    .pipe(plumber())
    .pipe(pug({
      pretty: true
    }))
    .pipe(plumber.stop())
    .pipe(dest(config.dist.html))
    .pipe(browserSync.stream())
}

// styles 

const stylesHandler = () => {
  return src(config.app.style)
  .pipe(plumber())
    .pipe( gulpIf( !isBuildFlag, sourcemaps.init()) )
    .pipe(sass({
        outputStyle: 'expanded',
      }))
    .pipe(rename({
        suffix: '.min',
      }))
    .pipe(autoprefixer({
        cascade: 'false',
      }))
    .pipe(cleanCSS({
        level: 2,
      }))
    .pipe( gulpIf( !isBuildFlag, sourcemaps.write('.')) )
    .pipe(plumber.stop())
    .pipe(dest(config.dist.style))
    .pipe(browserSync.stream());
};

// scripts

const scriptsHandler = () => {
  return src(config.app.js)
    .pipe(plumber())
    .pipe(webpackStream(webpackConfig), webpack)
    .pipe(plumber.stop())
    .pipe(dest(config.dist.js))
    .pipe( gulpIf( isBuildFlag, uglify() ) )
    .pipe(rename( { suffix: '.min' }))
    .pipe(dest(config.dist.js))
    .pipe(browserSync.stream());
}

// img
const minifyImg = () => {
  return src(app + 'img/**/*.+(jpg|jpeg|png|svg)')
    .pipe(tinyPng('...'))
    .pipe(dest(config.dist.img));
}

const moveImg = () => {
  return src(config.app.img)
    .pipe(dest(config.dist.img))
    .pipe(browserSync.stream());
}

const moveAPI = () => {
  return src(config.app.api)
    .pipe(dest(config.dist.api));
}

// watch files

const watchFiles = () => {
  browserSync.init({
    server: {
      baseDir: './dist',
    },
    port: 9000,
    notify: false,
    open: false
  });

  watch(config.watch.html, compilePug).on('change', browserSync.reload);
  watch(config.watch.style, stylesHandler);
  watch(config.watch.js, scriptsHandler);
  watch(config.watch.img, moveImg);
  watch(config.watch.api, moveAPI);
};

exports.default = series(
  deleteBuild, 
  parallel(compilePug, 
    moveImg, 
    moveAPI
    ), 
  stylesHandler, 
  scriptsHandler,
  watchFiles);

exports.build = series(
  deleteBuild, 
  setMode(true),
  parallel(compilePug, moveImg, moveAPI), 
  stylesHandler, 
  scriptsHandler);
