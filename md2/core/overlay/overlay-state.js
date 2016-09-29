(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    /**
     * OverlayState is a bag of values for either the initial configuration or current state of an
     * overlay.
     */
    var OverlayState = (function () {
        function OverlayState() {
            /** Whether the overlay has a backdrop. */
            this.hasBackdrop = false;
        }
        return OverlayState;
    }());
    exports.OverlayState = OverlayState;
});

//# sourceMappingURL=overlay-state.js.map
