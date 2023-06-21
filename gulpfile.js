const gulp = require("gulp")
const cleanCSS = require("gulp-clean-css")

function minifyCss() {
  return gulp
    .src("public/styles/index.css")
    .pipe(cleanCSS())
    .pipe(gulp.dest("public/styles/min"))
}

exports.default = gulp.series(minifyCss)
