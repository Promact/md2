/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
/**
 * Extract i18n messages from source code
 */
// Must be imported first, because angular2 decorators throws on load.
require('reflect-metadata');
var compiler = require('@angular/compiler');
var codegen_1 = require('./codegen');
var compiler_host_1 = require('./compiler_host');
var Extractor = (function () {
    function Extractor(ngExtractor, ngCompilerHost, program) {
        this.ngExtractor = ngExtractor;
        this.ngCompilerHost = ngCompilerHost;
        this.program = program;
    }
    Extractor.prototype.extract = function () {
        var _this = this;
        return this.ngExtractor.extract(this.program.getSourceFiles().map(function (sf) { return _this.ngCompilerHost.getCanonicalFileName(sf.fileName); }));
    };
    Extractor.create = function (options, translationsFormat, program, moduleResolverHost, ngCompilerHost) {
        if (!ngCompilerHost)
            ngCompilerHost =
                new compiler_host_1.CompilerHost(program, options, new compiler_host_1.ModuleResolutionHostAdapter(moduleResolverHost));
        var ngExtractor = compiler.Extractor.create(ngCompilerHost, { excludeFilePattern: codegen_1.excludeFilePattern(options) }).extractor;
        return new Extractor(ngExtractor, ngCompilerHost, program);
    };
    return Extractor;
}());
exports.Extractor = Extractor;
//# sourceMappingURL=extractor.js.map