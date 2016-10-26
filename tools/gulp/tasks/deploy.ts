import * as gulp from 'gulp';
import { task } from 'gulp';
import * as path from 'path';
import * as fs from 'fs';
import { DIST_ROOT } from '../constants';
import gulpRunSequence = require('run-sequence');

const ghPages = require('gulp-gh-pages');
//const shell = require('gulp-shell');
const ghpages = require('gh-pages');
const conventionalChangelog = require('gulp-conventional-changelog');
const conventionalGithubReleaser = require('conventional-github-releaser');
const bump = require('gulp-bump');
const gutil = require('gulp-util');
const git = require('gulp-git');


task(':deploy', () => {
  //return gulp.src('CHANGELOG.md')
  //  .pipe(conventionalChangelog({
  //    preset: 'angular'
  //  }))
  //  .pipe(gulp.dest('./'));

  //const indexFile = './dist/index.html';
  //fs.readFile(indexFile, 'utf8', (err, data) => {
  //  if (err) { return console.log(err); }
  //  const result = data.replace('<base href="/">', '<base href=".">');

  //  fs.writeFile(indexFile, result, 'utf8', (err) => {
  //    if (err) {
  //      return console.log(err);
  //    } else {
  //      //gulp.src('./dist/**/*').pipe(ghPages({ push: true, force: true, message: 'update md2 demo' }));
  //      return console.log('md2 demo deployed');
  //    }
  //  });
  //});
  //ghpages.publish(DIST_ROOT, {
  //  branch: '',
  //}, (err: any) => {
  //  if (err) {
  //      return console.log(err);
  //    }
  //});
});

//gulp.task('shorthand', () => {
//  shell.task([
//    'cls',
//    'echo hello',
//    'echo world'
//  ]);
//})

task('deploy', (done: () => void) => {
  gulpRunSequence(
    //'build:devapp',
    ':deploy',
    //'shorthand',
    done
  );
});







//=================================================================================================


// update package.json version
gulp.task(':release:version', () => {
  gulp.src(['./package.json'])
    .pipe(bump({ type: "patch" }).on('error', gutil.log))
    .pipe(gulp.dest('./'));
  return gulp.src(['./src/lib/package.json'])
    .pipe(bump({ type: "patch" }).on('error', gutil.log))
    .pipe(gulp.dest('./src/lib'));
});

// update CHANGELOG.md
gulp.task(':release:changelog', () => {
  return gulp.src('CHANGELOG.md', {
    buffer: false
  }).pipe(conventionalChangelog({
    preset: 'angular'
  })).pipe(gulp.dest('./'));
});

// release commit
gulp.task(':release:commit', () => {
  return gulp.src('.')
    .pipe(git.add())
    .pipe(git.commit('[Prerelease] Bumped version number'));
});

// release push
gulp.task(':release:push', (cb: any) => {
  git.push('origin', 'master', cb);
});

// release tag
gulp.task(':release:tag', (cb: any) => {
  var version = getPackageJsonVersion();
  git.tag(version, 'Created Tag for version: ' + version, function (error: any) {
    if (error) { return cb(error); }
    git.push('origin', 'master', { args: '--tags' }, cb);
  });
  function getPackageJsonVersion() {
    return JSON.parse(fs.readFileSync('./package.json', 'utf8')).version;
  };
});

// release
//gulp.task('github-release', function (done: any) {
//  conventionalGithubReleaser({
//    type: "oauth",
//    token: '0126af95c0e2d9b0a7c78738c4c00a860b04acc8' // change this to your own GitHub token or use an environment variable
//  }, {
//      preset: 'angular' // Or to any other commit message convention you use.
//    }, done);
//});

gulp.task('deploy1', function (callback: any) {
  gulpRunSequence(
    ':release:version',
    ':release:changelog',
    ':release:commit',
    ':release:push',
    ':release:tag',
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
