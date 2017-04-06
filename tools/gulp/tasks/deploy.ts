import { task, watch, src, dest } from 'gulp';
import { join } from 'path';
import { ScriptTarget, ModuleKind } from 'typescript';
import * as fs from 'fs';

import {
  DIST_ROOT, PROJECT_ROOT, COMPONENTS_DIR, HTML_MINIFIER_OPTIONS, LICENSE_BANNER
} from '../constants';
import {
  sassBuildTask, tsBuildTask, execNodeTask, sequenceTask,
  triggerLivereload
} from '../util/task_helpers';

// There are no type definitions available for these imports.
const gulpRollup = require('gulp-better-rollup');
const gulpMinifyHtml = require('gulp-htmlmin');
const gulpIf = require('gulp-if');

import gulpRunSequence = require('run-sequence');
const bump = require('gulp-bump');
const git = require('gulp-git');
const changelog = require('gulp-conventional-changelog');
const systemjsBuilder = require('gulp-systemjs-builder');
const sysBuilder = require('systemjs-builder');
const rollup = require('rollup-stream');
const exec = require('child_process').exec;
// const releaser = require('conventional-github-releaser');

task(':demoapp:aot', sequenceTask(
  'aot:build',
  ':build:devapp:vendor',
  ':demoapp:rollup1'
));

task('demoapp:aot', ['build:devapp'], (cb: any) => {
  exec('node_modules\.bin\ngc -p ' + join(DIST_ROOT, 'tsconfig-aot.json'), (err: any) => {
    cb(err);
  });
});

task(':demoapp:rollup', execNodeTask(
  join(PROJECT_ROOT, 'node_modules', '.bin', 'rollup'), ['-c', join(DIST_ROOT, 'rollup-config.js')])
);

task(':demoapp:rollup1', (cb: any) => {
  exec('node_modules\.bin\rollup -c ' + join(DIST_ROOT, 'rollup-config.js'), (err: any) => {
    cb(err);
  });
});

task('bundle', (done: any) => {
  var builder = new sysBuilder(DIST_ROOT, join(DIST_ROOT, 'system-config.ts'));
  builder
    .buildStatic(DIST_ROOT, join(DIST_ROOT, 'bundle.js'), {
      runtime: false
    }).then(() => {
      done();
    });
});

task(':build:devapp:sysbundle', ['build:devapp'], () => {
  var builder = systemjsBuilder()
  builder.loadConfigSync(join(DIST_ROOT, 'system-config.js'))

  builder.buildStatic(join(DIST_ROOT, 'main.js'), {
    minify: false,
    mangle: false
  }).pipe(dest(join(DIST_ROOT, 'bundle')));
})

/** Builds a bundle for demo app components. */
task(':build:devapp:bundle', [':build:devapp:vendor'], () => {//'build:devapp',
  return src(join(DIST_ROOT, 'main.js'))
    .pipe(createRollupBundle('iife', 'bundle.js'))
    .pipe(dest(join(DIST_ROOT, 'bundles')));
});

const ROLLUP_GLOBALS = {
  // Angular dependencies
  '@angular/core': 'ng.core',
  '@angular/common': 'ng.common',
  '@angular/forms': 'ng.forms',
  '@angular/http': 'ng.http',
  '@angular/animations': 'ng.animations',
  '@angular/animations/browser': 'ng.animations.browser',
  '@angular/platform-browser': 'ng.platformBrowser',
  '@angular/platform-browser/animations': 'ng.platformBrowser.animations',

  // Rxjs dependencies
  'rxjs/Subject': 'Rx',
  'rxjs/add/observable/fromEvent': 'Rx.Observable',
  'rxjs/add/observable/forkJoin': 'Rx.Observable',
  'rxjs/add/observable/of': 'Rx.Observable',
  'rxjs/add/observable/merge': 'Rx.Observable',
  'rxjs/add/observable/throw': 'Rx.Observable',
  'rxjs/add/operator/auditTime': 'Rx.Observable.prototype',
  'rxjs/add/operator/toPromise': 'Rx.Observable.prototype',
  'rxjs/add/operator/map': 'Rx.Observable.prototype',
  'rxjs/add/operator/filter': 'Rx.Observable.prototype',
  'rxjs/add/operator/do': 'Rx.Observable.prototype',
  'rxjs/add/operator/share': 'Rx.Observable.prototype',
  'rxjs/add/operator/finally': 'Rx.Observable.prototype',
  'rxjs/add/operator/catch': 'Rx.Observable.prototype',
  'rxjs/add/operator/first': 'Rx.Observable.prototype',
  'rxjs/add/operator/startWith': 'Rx.Observable.prototype',
  'rxjs/add/operator/switchMap': 'Rx.Observable.prototype',
  'rxjs/Observable': 'Rx'
};

/** Creates a rollup bundles of the Material components.*/
function createRollupBundle(format: string, outFile: string) {
  let rollupOptions = {
    context: 'this',
    //external: Object.keys(ROLLUP_GLOBALS)
  };

  let rollupGenerateOptions = {
    // Keep the moduleId empty because we don't want to force developers to a specific moduleId.
    moduleId: '',
    moduleName: 'ng.app',
    banner: LICENSE_BANNER,
    format: format,
    entry: 'main.js',
    dest: outFile,
    sourceMap: false,
    //globals: ROLLUP_GLOBALS,
    //onwarn: (warning) =>{
    //  // Skip certain warnings
    //  // should intercept ... but doesn't in some rollup versions
    //  if (warning.code === 'THIS_IS_UNDEFINED') { return; }
    //  // intercepts in some rollup versions
    //  if (warning.indexOf("The 'this' keyword is equivalent to 'undefined'") > -1) { return; }
    //  // console.warn everything else
    //  console.warn(warning.message);
    //},
    //plugins: [
    //  nodeResolve({ jsnext: true, module: true }),
    //  commonjs({
    //    include: 'node_modules/rxjs/**',
    //  }),
    //  uglify()
    //]
  };

  return gulpRollup(rollupOptions, rollupGenerateOptions);
}

// Deploy demo source
task('deploy', ['build:devapp'], () => {
  fs.readFile('./dist/index.html', 'utf8', (err, data) => {
    if (err) { return console.log(err); }
    const result = data.replace('<base href="/">', '<base href=".">');

    fs.writeFile('./dist/index.html', result, 'utf8', (e) => {
      if (e) {
        return console.log(e);
      } else {
        return src('./dist/**/*')
          .pipe(dest('./deploy'));
      }
    });
  });
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
