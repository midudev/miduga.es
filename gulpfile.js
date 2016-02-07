'use strict'

const gulp = require('gulp')
const surge = require('gulp-surge')
const htmlmin = require('gulp-htmlmin')
const del = require('del')
const stylus = require('gulp-stylus')

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

gulp.task('minify-html', () => {
  del(['www/index.html']).then(paths => {
    gulp.src('index.html')
      .pipe(htmlmin({collapseWhitespace: true}))
      .pipe(gulp.dest('www'))
  })
})

gulp.task('deploy', [ 'minify-html' ], () => {
  return surge({
    project: './www', // Path to your static build directory
    domain: 'miduga.es'  // Your domain or Surge subdomain
  })
})
