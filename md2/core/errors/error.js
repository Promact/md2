// TODO(kara): Revisit why error messages are not being properly set.
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
     * Wrapper around Error that sets the error message.
     */
    var MdError = (function (_super) {
        __extends(MdError, _super);
        function MdError(value) {
            _super.call(this);
            this.message = value;
        }
        return MdError;
    }(Error));
    exports.MdError = MdError;
});

//# sourceMappingURL=error.js.map
