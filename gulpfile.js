const gulp = require("gulp")
const cleanCSS = require("gulp-clean-css")
const minify = require("gulp-minify")

function minifyCss() {
  return gulp
    .src("public/styles/index.css")
    .pipe(cleanCSS())
    .pipe(gulp.dest("public/styles/min"))
}

function minifyJs() {
  return gulp
    .src(
      "public/js/geolocation.js",
      "public/js/matching.js",
      "public/js/script.js"
    )
    .pipe(minify())
    .pipe(gulp.dest("public/js/min-js"))
}

exports.default = gulp.series(minifyCss, minifyJs)
