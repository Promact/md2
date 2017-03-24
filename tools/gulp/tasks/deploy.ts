import * as gulp from 'gulp';
// import * as path from 'path';
import * as fs from 'fs';
import gulpRunSequence = require('run-sequence');

const bump = require('gulp-bump');
const git = require('gulp-git');
const changelog = require('gulp-conventional-changelog');
// const releaser = require('conventional-github-releaser');

// Deploy demo source
gulp.task('deploy', ['build:devapp'], () => {
  fs.readFile('./dist/index.html', 'utf8', (err, data) => {
    if (err) { return console.log(err); }
    const result = data.replace('<base href="/">', '<base href=".">');

    fs.writeFile('./dist/index.html', result, 'utf8', (err) => {
      if (err) {
        return console.log(err);
      } else {
        return gulp.src('./dist/**/*')
          .pipe(gulp.dest('./deploy'));
      }
    });
  });
});

// update package.json version
gulp.task(':release:version', () => {
  gulp.src(['./package.json'])
    .pipe(bump({ type: 'patch' }))
    .pipe(gulp.dest('./'));
  return gulp.src(['./src/lib/package.json'])
    .pipe(bump({ type: 'patch' }))
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
  let version = JSON.parse(fs.readFileSync('./package.json', 'utf8')).version;
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
  let version = JSON.parse(fs.readFileSync('./package.json', 'utf8')).version;
  git.tag(version, 'Created Tag for version: ' + version, function (error: any) {
    if (error) { return cb(error); }
    git.push('origin', 'master', { args: '--tags' }, cb);
  });
});

// release
// gulp.task('github-release', function (done: any) {
//  releaser({
//    type: 'oauth',
//    token: '0126af95c0e2d9b0a7c78738c4c00a860b04acc8' 
// change this to your own GitHub token or use an environment variable
//  }, {
//      preset: 'angular' // Or to any other commit message convention you use.
//    }, done);
// });

gulp.task('release', (callback: any) => {
  gulpRunSequence(
    ':release:version',
    ':release:changelog',
    // ':release:commit',
    // ':release:push',
    // ':release:tag',
    // 'github-release',
    function (error: any) {
      if (error) {
        console.log(error.message);
      } else {
        console.log('Md2 Released Successfully');
      }
      callback(error);
    });
});
