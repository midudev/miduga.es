'use strict'

const gulp = require('gulp')
const surge = require('gulp-surge')
const htmlmin = require('gulp-htmlmin')
const del = require('del')

gulp.task('minify-html', () => {
  del(['www/index.html']).then(paths => {
    gulp.src('*.html')
      .pipe(htmlmin({collapseWhitespace: true}))
      .pipe(gulp.dest('www'))
  })
})

gulp.task('deploy', [ 'minify-html' ], () => {
  return surge({
    project: './www',         // Path to your static build directory
    domain: 'miduga.es'  // Your domain or Surge subdomain
  })
})
