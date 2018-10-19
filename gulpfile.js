const gulp = require("gulp"),
  less = require("gulp-less");

gulp.task("css", function() {
  gulp
    .src("style.less")
    .pipe(less())
    .pipe(gulp.dest(""));
});

gulp.task("watch", function() {
  gulp.watch("style.less", ["css"]);
});

gulp.task("default", ["css", "watch"]);
