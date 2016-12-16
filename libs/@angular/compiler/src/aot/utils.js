/**
 * @license undefined
  * Copyright Google Inc. All Rights Reserved.
  * *
  * Use of this source code is governed by an MIT-style license that can be
  * found in the LICENSE file at https://angular.io/license
 * @param {?} fileName
 * @param {?=} options
 * @return {?}
 */
export function filterFileByPatterns(fileName, options) {
    if (options === void 0) { options = {}; }
    var /** @type {?} */ match = true;
    if (options.includeFilePattern) {
        match = match && !!options.includeFilePattern.exec(fileName);
    }
    if (options.excludeFilePattern) {
        match = match && !options.excludeFilePattern.exec(fileName);
    }
    return match;
}
//# sourceMappingURL=utils.js.map