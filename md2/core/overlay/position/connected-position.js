(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    /** The points of the origin element and the overlay element to connect. */
    var ConnectionPositionPair = (function () {
        function ConnectionPositionPair(origin, overlay) {
            this.originX = origin.originX;
            this.originY = origin.originY;
            this.overlayX = overlay.overlayX;
            this.overlayY = overlay.overlayY;
        }
        return ConnectionPositionPair;
    }());
    exports.ConnectionPositionPair = ConnectionPositionPair;
});

//# sourceMappingURL=connected-position.js.map
