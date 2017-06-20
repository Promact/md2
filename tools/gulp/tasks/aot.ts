import {task} from 'gulp';
import {join} from 'path';
import {DIST_ROOT} from '../constants';
import {execNodeTask, sequenceTask} from '../util/task_helpers';

/**
 * Prepares the AOT compilation by copying the demo-app and building the components with their
 * associated metadata files from the Angular compiler.
 */
task('aot:deps', sequenceTask(
  'build:devapp',
  ':build:components:release')
);

/** Build the demo-app and a release to confirm that the library is AOT-compatible. */
task('aot:build', sequenceTask('aot:deps', 'aot:compiler-cli'));

/** Build the demo-app and a release to confirm that the library is AOT-compatible. */
task('aot:compiler-cli', execNodeTask(
  '@angular/compiler-cli', 'ngc', ['-p', join(DIST_ROOT, 'tsconfig-aot.json')]
));