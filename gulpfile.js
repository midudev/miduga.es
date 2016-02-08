'use strict'

const gulp = require('gulp')
const surge = require('gulp-surge')
const htmlmin = require('gulp-htmlmin')
const stylus = require('gulp-stylus')
const ejs = require('gulp-ejs')

gulp.task('create-index', () => {
  gulp
    .src('./_layouts/index.ejs')
    .pipe(ejs({}, {ext: '.html'}))
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('./www/'))
})

gulp.task('watch', () => {
  gulp.watch('./index.html', ['minify-html'])
  gulp.watch('*.styl', ['compily-stylus'])
})

gulp.task('compily-stylus', () => {
  gulp.src('*.styl')
    .pipe(stylus({
      compress: true
    }))
    .pipe(gulp.dest('./www/'))
})

gulp.task('deploy', [ 'create-index' ], () => {
  return surge({
    project: './www', // Path to your static build directory
    domain: 'miduga.es'  // Your domain or Surge subdomain
  })
})
