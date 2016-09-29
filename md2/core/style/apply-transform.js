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
     * Applies a CSS transform to an element, including browser-prefixed properties.
     * @param element
     * @param transformValue
     */
    function applyCssTransform(element, transformValue) {
        // It's important to trim the result, because the browser will ignore the set operation
        // if the string contains only whitespace.
        var value = transformValue.trim();
        element.style.transform = value;
        element.style.webkitTransform = value;
    }
    exports.applyCssTransform = applyCssTransform;
});

//# sourceMappingURL=apply-transform.js.map
