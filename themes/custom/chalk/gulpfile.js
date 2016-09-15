var gulp = require('gulp');
var styleguide = require('sc5-styleguide');
var sass = require('gulp-sass');
var neat = require("node-neat").includePaths;
// neat requires bourbon it should include it under the hood
var bourbon = require('node-bourbon').includePaths;
var livereload = require('gulp-livereload');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var combineMq = require('gulp-combine-mq');
var imagemin = require('gulp-imagemin');
var cssGlobbing = require('gulp-css-globbing');
var ghPages = require('gulp-gh-pages');
var spritesmith = require('gulp.spritesmith');
var concat = require("gulp-concat");
var notify = require("gulp-notify");

var paths = {
    sass: './sass/**/*.scss',
    templates: './templates/**/*.twig',
    js: './js/**/*.js',
    styles: './sass/style.scss',
    styleguide: 'styleguide'
};

// Error notifications with notify
// Shows a banner on macOs
var reportError = function(error) {
  notify({
    title: 'Gulp Task Error',
    message: 'Check the console.'
  }).write(error);
  console.log(error.toString());
  this.emit('end');
}

// Minify jpg, png, gif, svg
gulp.task('images', () =>
  gulp.src('images-src/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest('images'))
);

// Generate sprites
gulp.task('sprite', function () {
    var spriteData = gulp.src('./images-src/sprites/*.png')
        .pipe(spritesmith({
            imgName: 'sprite.png',
            cssName: 'sprite.css'
        }));
    spriteData.img.pipe(gulp.dest('images'));
    spriteData.css.pipe(gulp.dest('css'));
});

// Styleguide configuration for deploying on GitHub pages
gulp.task('styleguide-deploy:generate', function() {
  return gulp.src(paths.sass)
    .pipe(styleguide.generate({
        title: 'Living Styleguide',
        server: false,
        sideNav: true,
        disableHtml5Mode: true,
        overviewPath: paths.styleguide+'/README.md',
        appRoot: '.',
      }))
    .pipe(gulp.dest(paths.styleguide));
});

// Styleguide development configuration
gulp.task('styleguide:generate', function() {
  return gulp.src(paths.sass)
    .pipe(styleguide.generate({
        title: 'chalk Living Styleguide',
        server: true,
        sideNav: true,
        disableEncapsulation: false,
        rootPath: paths.styleguide,
        overviewPath: paths.styleguide+'/README.md',
        appRoot: '/themes/custom/chalk/'+paths.styleguide,
      }))
    .pipe(gulp.dest(paths.styleguide));
});

// Styleguide styles generation
gulp.task('styleguide:applystyles', function() {
  return gulp.src([
      'sass/utils.scss',
      'sass/style.scss',
      ])
    .pipe(cssGlobbing({
      extensions: ['.scss']
    }))
    .pipe(concat('all.scss'))
    .pipe(sass({
      errLogToConsole: false,
      includePaths: bourbon,
      includePaths: neat
    }))
    .on('error', reportError)
    .pipe(styleguide.applyStyles())
    .pipe(gulp.dest(paths.styleguide));
});

// Sass compilation
gulp.task('sass', function () {
  gulp.src(paths.styles)
    .pipe(cssGlobbing({
      extensions: ['.scss']
    }))
    .pipe(sass({
      errLogToConsole: false,
      sourceComments: true,
      precision: 3,
      includePaths: bourbon,
      includePaths: neat
    }))
    // Show errors
    // .on('error', sass.logError)
    .on('error', reportError)
    .pipe(gulp.dest('./css'))
    .pipe(livereload());
});

// Sass production build
gulp.task('sass:build', function () {
  var processors = [
    autoprefixer({browsers: ['last 2 versions']}),
  ];
  return gulp.src(paths.styles)
    .pipe(cssGlobbing({
      extensions: ['.scss']
    }))
    .pipe(sass({
      errLogToConsole: true,
      outputStyle: 'compressed',
      precision: 3,
      includePaths: bourbon,
      includePaths: neat
    }))
    .pipe(combineMq({
      beautify: false // false will inline css
    }))
    .pipe(postcss(processors))
    // .on('error', sass.logError)
    .pipe(gulp.dest('./css'))
});

//
// Tasks
//

// Watch sass files and update css folder
gulp.task('default', ['watch']);

// Watch sass files & generate styleguide
gulp.task('watch', ['sass','styleguide'], function() {
  // Start watching changes and update styleguide & theme css file whenever changes are detected
  // Styleguide automatically detects existing server instance
  livereload.listen();
  // reload only .css when sass is changed
  gulp.watch(paths.sass, ['sass','styleguide']);
  // reload full page when templates changes
  gulp.watch(paths.templates, function (files){
      livereload.changed(files)
    });
});

// Generate styleguide
gulp.task('styleguide', ['styleguide:generate', 'styleguide:applystyles']);

// Build
gulp.task('build', ['sass:build', 'images']);

// Deploy production style guide on github
// Watch out, this automatically publish on a gh-pages branch
gulp.task('deploy', ['styleguide-deploy:generate', 'styleguide:applystyles'], function() {
  return gulp.src(paths.styleguide+'/**/*')
    .pipe(ghPages());
});
