const gulp = require("gulp")
const cleanCSS = require("gulp-clean-css")

function minifyCss() {
  return gulp
    .src("public/css/index.css")
    .pipe(cleanCSS())
    .pipe(gulp.dest("public/css/min"))
}

exports.default = gulp.series(minifyCss)
