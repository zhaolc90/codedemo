<p align="center">
  <a href="http://gulpjs.com">
    <img height="194" width="98" src="https://raw.github.com/gulpjs/artwork/master/gulp.png"/>
  </a>
  <br/>
  <a href="http://gulpjs.com/">Visit our website!</a>
</p>

# gulp [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coveralls Status][coveralls-image]][coveralls-url] [![Dependency Status](https://david-dm.org/gulpjs/gulp.png?theme=shields.io)](https://david-dm.org/gulpjs/gulp)
> The streaming build system

## Documentation

For a Getting started guide, API docs, recipes, making a plugin, etc. see the [documentation page](/docs/README.md)!

## Sample gulpfile

This file is just a quick sample to give you a taste of what gulp does.

```javascript
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');

gulp.task('scripts', function() {
  // Minify and copy all JavaScript (except vendor scripts)
  return gulp.src(['client/js/**/*.js', '!client/js/vendor/**'])
    .pipe(uglify())
    .pipe(gulp.dest('build/js'));
});

// Copy all static images
gulp.task('images', function() {
 return gulp.src('client/img/**')
    // Pass in options to the task
    .pipe(imagemin({optimizationLevel: 5}))
    .pipe(gulp.dest('build/img'));
});

// The default task (called when you run `gulp`)
gulp.task('default', function() {
  gulp.run('scripts', 'images');

  // Watch files and run tasks if they change
  gulp.watch('client/js/**', function() {
    gulp.run('scripts');
  });

  gulp.watch('client/img/**', function() {
    gulp.run('images');
  });
});
```


## gulp CLI

### Tasks

Tasks can be executed by running `gulp <task> <othertask>`. Just running `gulp` will execute the task you registered called `default`. If there is no `default` task gulp will error.

### Compilers

You can use any language you want for your gulpfile. You will have to specify the language module name so the CLI can load it (and its associated extensions) before attempting to find your gulpfile. Make sure you have this module installed accessible by the folder you are running the CLI in.

Example:

```
gulp dosomething --require coffee-script
```


[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/wearefractal/gulp/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

[npm-url]: https://npmjs.org/package/gulp
[npm-image]: https://badge.fury.io/js/gulp.png
[travis-url]: https://travis-ci.org/gulpjs/gulp
[travis-image]: https://travis-ci.org/gulpjs/gulp.png?branch=master
[coveralls-url]: https://coveralls.io/r/gulpjs/gulp
[coveralls-image]: https://coveralls.io/repos/gulpjs/gulp/badge.png
[depstat-url]: https://david-dm.org/gulpjs/gulp
[depstat-image]: https://david-dm.org/gulpjs/gulp.png













```
yarn add mongodb --ignore-engines
```

ab -n 100 http://192.168.0.108:3300/images/1

> middleware  参数 err, req, res, and next



 npx bower install jquery bootstrap@3.1.1 font-awesome


Handlebars: Access has been denied to resolve the property "uniqueId" because it is not an "own property" of its parent.
You can add a runtime option to disable the check or this warning:
See https://handlebarsjs.com/api-reference/runtime-options.html#options-to-control-prototype-access for details

## secret
openssl genrsa -out key.pem
openssl req -new -key key.pem -out csr.pem

openssl x509 -req -days 365 -in csr.pem -signkey key.pem -out cert.pem



curl -k --location --request POST 'https://localhost:3300/login' --header 'Content-Type: application/x-www-form-urlencoded' --data-urlencode 'username=asjkdfna ' --data-urlencode 'password=askfasd'