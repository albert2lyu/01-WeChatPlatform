var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var cssnano = require('gulp-cssnano');
var uglify = require('gulp-uglify');
var image = require('gulp-image');
var browserSync = require('browser-sync').create();

// 开发阶段
gulp.task("dev", ["serve"], function () {
  console.log("正在监听文件变动……");
})

// 开发阶段：编译 Scss
gulp.task('dev:css', function () {
  return gulp.src('./src/scss/index.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
            browsers: ['last 4 versions'],
            cascade: false
        }))
    .pipe(gulp.dest('./src/css'));
});

// 开发阶段：浏览器自动刷新
gulp.task('serve', ['dev:sass'], function() {
    browserSync.init({
        proxy: "http://localhost/Pro1-WeixinSpider/index.php"
    });
    gulp.watch("../web/src/scss/**/*.scss", ['dev:sass']);
    gulp.watch("../web/src/**/*.twig").on('change', browserSync.reload);
    gulp.watch("../web/src/**/*.js").on('change', browserSync.reload);
    gulp.watch("../index.php").on('change', browserSync.reload);
});

// 编译 Sass 并把 CSS 注入浏览器
gulp.task('dev:sass', function() {
    return gulp.src("./src/scss/index.scss")
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
                browsers: ['last 4 versions'],
                cascade: false
            }))
        .pipe(gulp.dest("./src/css"))
        .pipe(browserSync.stream());
});



// 打包阶段
gulp.task("build", ['build:copyCSS', 'build:copyJS', "build:img"], function () {
  console.log("编译已完成，请查看 dist 文件夹");
})

// 打包阶段：编译 Scss 并压缩 CSS
gulp.task('build:css', function () {
  return gulp.src('./src/scss/index.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
            browsers: ['last 4 versions'],
            cascade: false
        }))
    .pipe(cssnano())
    .pipe(gulp.dest('./src/css'));
});

// 打包阶段：复制 CSS
gulp.task('build:copyCSS', ["build:css"], function () {
  gulp.src('./src/css/**/*.css')
      .pipe(gulp.dest('./dist/css/'));
});

// 打包阶段：压缩图片
gulp.task('build:img', function () {
  gulp.src('./src/img/raw/*')
    .pipe(image({
      pngquant: true,
      optipng: false,
      zopflipng: true,
      advpng: true,
      jpegRecompress: false,
      jpegoptim: true,
      mozjpeg: true,
      gifsicle: true,
      svgo: true
    }))
    .pipe(gulp.dest('./dist/img-compressed/'));
});

// 打包阶段：压缩并复制 JS
gulp.task('build:copyJS', function () {
  gulp.src('./src/js/**/*.js')
      .pipe(uglify())
      .pipe(gulp.dest('./dist/js/'));
});
