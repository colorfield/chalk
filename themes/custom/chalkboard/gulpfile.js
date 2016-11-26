'use strict';

var gulp = require('gulp');
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
var spritesmith = require('gulp.spritesmith');
var concat = require("gulp-concat");
var notify = require("gulp-notify");

var paths = {
    sass: './sass/**/*.scss',
    templates: './templates/**/*.twig',
    js: './js/**/*.js',
    styles: './sass/**/*.scss',
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
};

/*
 * Configure a Fractal instance.
 *
 * This configuration could also be done in a separate file, provided that this file
 * then imported the configured fractal instance from it to work with in your Gulp tasks.
 * i.e. const fractal = require('./my-fractal-config-file');
 */

const fractal = require('@frctl/fractal').create();
const mandelbrot = require('@frctl/mandelbrot');
const ghPages = require('gulp-gh-pages');

const myCustomisedTheme = mandelbrot({
    panels: ["notes", "html", "view", "context", "resources", "info"],
    skin: "black",
    static: {
        "mount": "theme",
    }
});

fractal.web.theme(myCustomisedTheme); // tell Fractal to use the configured theme by default
fractal.set('project.title', 'Living Styleguide'); // title for the project
fractal.web.set('builder.dest', 'styleguide'); // destination for the static export
fractal.web.set('static.path', `${__dirname}/css`);
fractal.web.set('server.sync', true); // browsersync
fractal.docs.set('path', `${__dirname}/styleguide-src/docs`); // location of the documentation directory.
// fractal.docs.set('ext', '.hbs');
fractal.components.set('path', `${__dirname}/styleguide-src/components`); // location of the component directory.
fractal.components.set('default.preview', '@preview'); // let Fractal know that this preview layout should be used as the default layout for our components
fractal.components.set('default.status', 'wip'); // set default components status to work in progress. This has to be overridden in component.config.js files

// any other configuration or customisation here

const logger = fractal.cli.console; // keep a reference to the fractal CLI console utility

// fractal.components.engine(hbs); /* set as the default template engine for components */
// fractal.docs.engine(hbs); /* you can also use the same instance for documentation, if you like! */

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
      includePaths: neat,
    }))
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
    .on('error', reportError)
    .pipe(gulp.dest('./css'))
});

/*
 * Start the Fractal server
 *
 * In this example we are passing the option 'sync: true' which means that it will
 * use BrowserSync to watch for changes to the filesystem and refresh the browser automatically.
 * Obviously this is completely optional!
 *
 * This task will also log any errors to the console.
 */

gulp.task('fractal:start', function(){
    const server = fractal.web.server({
        sync: true
    });
    server.on('error', err => logger.error(err.message));
    return server.start().then(() => {
        logger.success(`Fractal server is now running at ${server.url}`);
    });
});

/*
 * Run a static export of the project web UI.
 *
 * This task will report on progress using the 'progress' event emitted by the
 * builder instance, and log any errors to the terminal.
 *
 * The build destination will be the directory specified in the 'builder.dest'
 * configuration option set above.
 */

gulp.task('fractal:build', function(){
    const builder = fractal.web.builder();
    builder.on('progress', (completed, total) => logger.update(`Exported ${completed} of ${total} items`, 'info'));
    builder.on('error', err => logger.error(err.message));
    return builder.build().then(() => {
        logger.success('Fractal build completed!');
    });
});

/**
 * Build tasks
 */

// Watch sass files and update css folder
gulp.task('default', ['watch']);

// Watch sass files & generate styleguide
gulp.task('watch', ['sass','fractal:start'], function() {
  // Start watching changes and update styleguide & theme css file whenever changes are detected
  // Styleguide automatically detects existing server instance
  livereload.listen();
  // reload only .css when sass is changed
  gulp.watch(paths.sass, ['sass']);
  // reload full page when templates changes
  gulp.watch(paths.templates, function (files){
      livereload.changed(files)
    });
});

// Deploy production style guide on github
// Automatically publish on a gh-pages branch
// @todo fix prompted error "Error: write after end"
gulp.task('deploy', ['fractal:build'], function() {
  return gulp.src(`${__dirname}/styleguide/**/*`)
    .pipe(ghPages({
                  'push': true, // false will run dry test
                  // 'message': "Update 2 [timestamp]" // change commit message
                }));
});
