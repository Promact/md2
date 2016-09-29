(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    var RelativePositionStrategy = (function () {
        function RelativePositionStrategy(_relativeTo) {
            this._relativeTo = _relativeTo;
        }
        RelativePositionStrategy.prototype.apply = function (element) {
            // Not yet implemented.
            return null;
        };
        return RelativePositionStrategy;
    }());
    exports.RelativePositionStrategy = RelativePositionStrategy;
});

//# sourceMappingURL=relative-position-strategy.js.map
