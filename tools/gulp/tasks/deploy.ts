import * as gulp from 'gulp';
import * as path from 'path';
import * as fs from 'fs';
import gulpRunSequence = require('run-sequence');

const bump = require('gulp-bump');
const git = require('gulp-git');
const changelog = require('gulp-conventional-changelog');
const releaser = require('conventional-github-releaser');


gulp.task(':deploy', () => {
  gulp.src('./dist')
    .pipe(gulp.dest('./deploy'))

  const indexFile = './deploy/index.html';
  fs.readFile(indexFile, 'utf8', (err, data) => {
    if (err) { return console.log(err); }
    const result = data.replace('<base href="/">', '<base href=".">');

    fs.writeFile(indexFile, result, 'utf8', (err) => {
      if (err) {
        return console.log(err);
      } else {
        return console.log('md2 demo deployed');
      }
    });
  });
});

// update package.json version
gulp.task(':release:version', () => {
  gulp.src(['./package.json'])
    .pipe(bump({ type: "patch" }))
    .pipe(gulp.dest('./'));
  return gulp.src(['./src/lib/package.json'])
    .pipe(bump({ type: "patch" }))
    .pipe(gulp.dest('./src/lib'));
});

// update CHANGELOG.md
gulp.task(':release:changelog', () => {
  return gulp.src('CHANGELOG.md', { buffer: false })
    .pipe(changelog({ preset: 'angular' }))
    .pipe(gulp.dest('./'));
});

// release commit
gulp.task(':release:commit', () => {
  var version = JSON.parse(fs.readFileSync('./package.json', 'utf8')).version;
  return gulp.src('.')
    .pipe(git.add())
    .pipe(git.commit('Released MD2@' + version));
});

// release push
gulp.task(':release:push', (cb: any) => {
  git.push('origin', 'master', cb);
});

// release tag
gulp.task(':release:tag', (cb: any) => {
  var version = JSON.parse(fs.readFileSync('./package.json', 'utf8')).version;
  git.tag(version, 'Created Tag for version: ' + version, function (error: any) {
    if (error) { return cb(error); }
    git.push('origin', 'master', { args: '--tags' }, cb);
  });
});

// release
//gulp.task('github-release', function (done: any) {
//  releaser({
//    type: "oauth",
//    token: '0126af95c0e2d9b0a7c78738c4c00a860b04acc8' // change this to your own GitHub token or use an environment variable
//  }, {
//      preset: 'angular' // Or to any other commit message convention you use.
//    }, done);
//});

gulp.task('deploy', function (callback: any) {
  gulpRunSequence(
    ':deploy',
    //':release:version',
    //':release:changelog',
    //':release:commit',
    //':release:push',
    //':release:tag',
    //'github-release',
    function (error: any) {
      if (error) {
        console.log(error.message);
      } else {
        console.log('Md2 Released Successfully');
      }
      callback(error);
    });
});
