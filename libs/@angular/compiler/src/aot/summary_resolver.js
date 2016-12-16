import { CompileSummaryKind } from '../compile_metadata';
import { GeneratedFile } from './generated_file';
import { StaticSymbol } from './static_symbol';
import { filterFileByPatterns } from './utils';
var /** @type {?} */ STRIP_SRC_FILE_SUFFIXES = /(\.ts|\.d\.ts|\.js|\.jsx|\.tsx)$/;
export var AotSummaryResolver = (function () {
    /**
     * @param {?} host
     * @param {?} staticReflector
     * @param {?} options
     */
    function AotSummaryResolver(host, staticReflector, options) {
        this.host = host;
        this.staticReflector = staticReflector;
        this.options = options;
        this.summaryCache = {};
    }
    /**
     * @param {?} srcFileUrl
     * @param {?} summaries
     * @return {?}
     */
    AotSummaryResolver.prototype.serializeSummaries = function (srcFileUrl, summaries) {
        var _this = this;
        var /** @type {?} */ jsonReplacer = function (key, value) {
            if (value instanceof StaticSymbol) {
                // We convert the source filenames into output filenames,
                // as the generated summary file will be used when the current
                // compilation unit is used as a library
                return {
                    '__symbolic__': 'symbol',
                    'name': value.name,
                    'path': _this.host.getOutputFileName(value.filePath),
                    'members': value.members
                };
            }
            return value;
        };
        var /** @type {?} */ allSummaries = summaries.slice();
        summaries.forEach(function (summary) {
            if (summary.summaryKind === CompileSummaryKind.NgModule) {
                var /** @type {?} */ moduleMeta = (summary);
                moduleMeta.exportedDirectives.concat(moduleMeta.exportedPipes).forEach(function (id) {
                    if (!filterFileByPatterns(id.reference.filePath, _this.options)) {
                        allSummaries.push(_this.resolveSummary(id.reference));
                    }
                });
            }
        });
        return new GeneratedFile(srcFileUrl, summaryFileName(srcFileUrl), JSON.stringify(allSummaries, jsonReplacer));
    };
    /**
     * @param {?} symbol
     * @return {?}
     */
    AotSummaryResolver.prototype._cacheKey = function (symbol) { return symbol.filePath + "|" + symbol.name; };
    /**
     * @param {?} staticSymbol
     * @return {?}
     */
    AotSummaryResolver.prototype.resolveSummary = function (staticSymbol) {
        var _this = this;
        var /** @type {?} */ filePath = staticSymbol.filePath;
        var /** @type {?} */ name = staticSymbol.name;
        var /** @type {?} */ cacheKey = this._cacheKey(staticSymbol);
        if (!filterFileByPatterns(filePath, this.options)) {
            var /** @type {?} */ summary = this.summaryCache[cacheKey];
            var /** @type {?} */ summaryFilePath = summaryFileName(filePath);
            if (!summary) {
                try {
                    var /** @type {?} */ jsonReviver = function (key, value) {
                        if (value && value['__symbolic__'] === 'symbol') {
                            // Note: We can't use staticReflector.findDeclaration here:
                            // Summary files can contain symbols of transitive compilation units
                            // (via the providers), and findDeclaration needs .metadata.json / .d.ts files,
                            // but we don't want to depend on these for transitive dependencies.
                            return _this.staticReflector.getStaticSymbol(value['path'], value['name'], value['members']);
                        }
                        else {
                            return value;
                        }
                    };
                    var /** @type {?} */ readSummaries = JSON.parse(this.host.loadSummary(summaryFilePath), jsonReviver);
                    readSummaries.forEach(function (summary) {
                        var /** @type {?} */ filePath = summary.type.reference.filePath;
                        _this.summaryCache[_this._cacheKey(summary.type.reference)] = summary;
                    });
                    summary = this.summaryCache[cacheKey];
                }
                catch (e) {
                    console.error("Error loading summary file " + summaryFilePath);
                    throw e;
                }
            }
            if (!summary) {
                throw new Error("Could not find the symbol " + name + " in the summary file " + summaryFilePath + "!");
            }
            return summary;
        }
        else {
            return null;
        }
    };
    return AotSummaryResolver;
}());
function AotSummaryResolver_tsickle_Closure_declarations() {
    /** @type {?} */
    AotSummaryResolver.prototype.summaryCache;
    /** @type {?} */
    AotSummaryResolver.prototype.host;
    /** @type {?} */
    AotSummaryResolver.prototype.staticReflector;
    /** @type {?} */
    AotSummaryResolver.prototype.options;
}
/**
 * @param {?} fileName
 * @return {?}
 */
function summaryFileName(fileName) {
    var /** @type {?} */ fileNameWithoutSuffix = fileName.replace(STRIP_SRC_FILE_SUFFIXES, '');
    return fileNameWithoutSuffix + ".ngsummary.json";
}
//# sourceMappingURL=summary_resolver.js.map