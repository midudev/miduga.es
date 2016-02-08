'use strict'

const gulp = require('gulp')
const surge = require('gulp-surge')
const htmlmin = require('gulp-htmlmin')
const stylus = require('gulp-stylus')
const gulpejs = require('gulp-ejs')
const ejs = require('ejs')
const markdown = require('gulp-markdown')
const frontMatter = require('gulp-front-matter')
const data = require('gulp-data')

gulp.task('create-index', () => {
  gulp
    .src('./_layouts/index.ejs')
    .pipe(gulpejs({}, {ext: '.html'}))
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('./www/'))
})

gulp.task('create-articles', () => {
  gulp.src('./_posts/*.md')
    .pipe(frontMatter({
      property: 'metadata',
      remove: true
    }))
    .pipe(markdown())
    .pipe(data((file, cb) => {
      let layout = __dirname + `/_layouts/${file.metadata.layout}.ejs`
      let data = file.metadata
      data.article = String(file.contents)
      ejs.renderFile(layout, data, (err, result) => {
        if (err) return cb(err)
        else cb(null, result)
      })
    }))
    .pipe(gulp.dest('./www/articles/'))
})

gulp.task('watch', () => {
  gulp.watch('./index.html', ['minify-html'])
  gulp.watch('*.styl', ['compily-stylus'])
  gulp.watch('./_articles/*.md', ['create-articles'])
})

gulp.task('compily-stylus', () => {
  gulp.src('*.styl')
    .pipe(stylus({compress: true}))
    .pipe(gulp.dest('./www/'))
})

gulp.task('deploy', [ 'create-index' ], () => {
  return surge({
    project: './www', // Path to your static build directory
    domain: 'miduga.es'  // Your domain or Surge subdomain
  })
})
