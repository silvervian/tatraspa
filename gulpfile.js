/* eslint-disable prefer-arrow-callback */
/* eslint-disable prefer-destructuring */
const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const clean = require('gulp-clean-css');
const browserSync = require('browser-sync');
const del = require('del');
const imagemin = require('gulp-imagemin');
const changed = require('gulp-changed');
const sourceMaps = require('gulp-sourcemaps');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config');

const sync = browserSync.create();
const reload = sync.reload;
const config = {
  paths: {
    src: {
      html: './src/**/*.html',
      img: './src/img/**.*',
      sass: ['./src/sass/main.scss'],
      js: [
        './src/js/lol.js',
        './src/js/app.js'
      ]
    },
    dist: {
      main: './dist',
      css: './dist/css',
      js: './dist/js',
      img: './dist/img'
    }
  }
};

function refresh(done) {
  reload();
  done();
}

gulp.task('sass', () => {
  return gulp.src(config.paths.src.sass)
    .pipe(sourceMaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 5 versions']
    }))
    .pipe(clean({
      rebaseTo: './css/'
    }))
    .pipe(sourceMaps.write())
    .pipe(gulp.dest(config.paths.dist.css))
    .pipe(sync.stream());
});


gulp.task('js', gulp.series((callback) => {
  webpack(webpackConfig, (err, stats) => {
    if (err) {
      console.log(err.toString());
    }

    console.log(stats.toString());
    callback();
  });
}, refresh));

gulp.task('static', gulp.series(
  function moveHtml() {
    return gulp.src(config.paths.src.html)
      .pipe(gulp.dest(config.paths.dist.main));
  }, refresh
));

gulp.task('image', gulp.series(() => {
  return gulp.src(config.paths.src.img)
    .pipe(changed(config.paths.dist.img))
    .pipe(imagemin([
      imagemin.gifsicle({ interlaced: true }),
      imagemin.jpegtran({ progressive: true }),
      imagemin.optipng({ optimizationLevel: 7 }),
      imagemin.svgo({
        plugins: [{ removeViewBox: false },
          { cleanupIDs: false },
          { removeViewBox: false },
          { removeUselessStrokeAndFill: false },
          { removeEmptyAttrs: false }
        ]
      })
    ], { verbose: true }))
    .pipe(gulp.dest(config.paths.dist.img));
}), refresh);

gulp.task('clean', () => {
  return del([config.paths.dist.main]);
});

gulp.task('build', gulp.series(['clean', 'sass', 'js', 'static', 'image']));

function server() {
  return sync.init({
    injectChanges: true,
    server: config.paths.dist.main
  });
}

gulp.task('default', gulp.series(['build']));

gulp.task('watch', gulp.series(['default'], function watch() {
  gulp.watch('src/sass/**/*.scss', gulp.series(['sass']));
  gulp.watch('src/img/**/*.*', gulp.series(['image']));
  gulp.watch('src/js/**/*.js', gulp.series(['js']));
  gulp.watch('src/*.html', gulp.series(['static']));
  return server();
}));
