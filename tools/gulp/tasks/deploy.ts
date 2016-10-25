import * as gulp from 'gulp';
import { task } from 'gulp';
import * as path from 'path';
import * as fs from 'fs';
import { DIST_ROOT } from '../constants';
import gulpRunSequence = require('run-sequence');

const ghPages = require('gulp-gh-pages');
//const shell = require('gulp-shell');
const ghpages = require('gh-pages');

task(':deploy', () => {
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
  ghpages.publish(DIST_ROOT, (err:any)=> {
    if (err) {
        return console.log(err);
      }
  });
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
