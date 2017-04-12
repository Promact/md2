import { task, src, dest } from 'gulp';
import { join } from 'path';
import * as fs from 'fs';

import {
  DIST_ROOT, PROJECT_ROOT
} from '../constants';

import gulpRunSequence = require('run-sequence');
const bump = require('gulp-bump');
const git = require('gulp-git');
const changelog = require('gulp-conventional-changelog');
const rename = require('gulp-rename');
// const releaser = require('conventional-github-releaser');

// Prepare rollup
task('rollup:prepare', ['aot:build'], () => {
  return src('md2/**/*', { cwd: join(DIST_ROOT, '**') })
    .pipe(dest(join(DIST_ROOT, 'node_modules')));
});

// Deploy demo source
task('deploy', () => {
  src(join(DIST_ROOT, 'index-aot.html'))
    .pipe(rename('index.html'))
    .pipe(dest(join(PROJECT_ROOT, 'deploy')));

  return src(['assets/**/*', 'libs/reflect-metadata/**/*', 'libs/zone.js/**/*',
    'libs/hammerjs/**/*', 'bundle.js', 'bundle.js.map', 'favicon.ico'],
    { cwd: join(DIST_ROOT, '**') })
    .pipe(dest(join(PROJECT_ROOT, 'deploy')));
});

// update package.json version
task(':release:version', () => {
  src(['./package.json'])
    .pipe(bump({ type: 'patch' }))
    .pipe(dest('./'));
  return src(['./src/lib/package.json'])
    .pipe(bump({ type: 'patch' }))
    .pipe(dest('./src/lib'));
});

// update CHANGELOG.md
task(':release:changelog', () => {
  return src('CHANGELOG.md', { buffer: false })
    .pipe(changelog({ preset: 'angular' }))
    .pipe(dest('./'));
});

// release commit
task(':release:commit', () => {
  let version = JSON.parse(fs.readFileSync('./package.json', 'utf8')).version;
  return src('.')
    .pipe(git.add())
    .pipe(git.commit('Released MD2@' + version));
});

// release push
task(':release:push', (cb: any) => {
  git.push('origin', 'master', cb);
});

// release tag
task(':release:tag', (cb: any) => {
  let version = JSON.parse(fs.readFileSync('./package.json', 'utf8')).version;
  git.tag(version, 'Created Tag for version: ' + version, function (error: any) {
    if (error) { return cb(error); }
    git.push('origin', 'master', { args: '--tags' }, cb);
  });
});

// release
// task('github-release', function (done: any) {
//  releaser({
//    type: 'oauth',
//    token: '0126af95c0e2d9b0a7c78738c4c00a860b04acc8'
// change this to your own GitHub token or use an environment variable
//  }, {
//      preset: 'angular' // Or to any other commit message convention you use.
//    }, done);
// });

task('release', (callback: any) => {
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
