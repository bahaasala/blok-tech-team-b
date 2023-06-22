const gulp = require("gulp")
const cleanCSS = require("gulp-clean-css")
const uglify = require("gulp-uglify")

function minifyCss() {
  return gulp
    .src("public/styles/index.css")
    .pipe(cleanCSS())
    .pipe(gulp.dest("public/styles/min"))
}

function minifyJs() {
  return gulp
    .src("public/js/*.js")
    .pipe(uglify())
    .pipe(gulp.dest("public/js/min"))
}

exports.default = gulp.series(minifyCss, minifyJs)
