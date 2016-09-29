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
        define(["require", "exports", '../errors/error'], factory);
    }
})(function (require, exports) {
    "use strict";
    var error_1 = require('../errors/error');
    /** Exception thrown when a ComponentPortal is attached to a DomPortalHost without an origin. */
    var MdComponentPortalAttachedToDomWithoutOriginError = (function (_super) {
        __extends(MdComponentPortalAttachedToDomWithoutOriginError, _super);
        function MdComponentPortalAttachedToDomWithoutOriginError() {
            _super.call(this, 'A ComponentPortal must have an origin set when attached to a DomPortalHost ' +
                'because the DOM element is not part of the Angular application context.');
        }
        return MdComponentPortalAttachedToDomWithoutOriginError;
    }(error_1.MdError));
    exports.MdComponentPortalAttachedToDomWithoutOriginError = MdComponentPortalAttachedToDomWithoutOriginError;
    /** Exception thrown when attempting to attach a null portal to a host. */
    var MdNullPortalError = (function (_super) {
        __extends(MdNullPortalError, _super);
        function MdNullPortalError() {
            _super.call(this, 'Must provide a portal to attach');
        }
        return MdNullPortalError;
    }(error_1.MdError));
    exports.MdNullPortalError = MdNullPortalError;
    /** Exception thrown when attempting to attach a portal to a host that is already attached. */
    var MdPortalAlreadyAttachedError = (function (_super) {
        __extends(MdPortalAlreadyAttachedError, _super);
        function MdPortalAlreadyAttachedError() {
            _super.call(this, 'Host already has a portal attached');
        }
        return MdPortalAlreadyAttachedError;
    }(error_1.MdError));
    exports.MdPortalAlreadyAttachedError = MdPortalAlreadyAttachedError;
    /** Exception thrown when attempting to attach a portal to an already-disposed host. */
    var MdPortalHostAlreadyDisposedError = (function (_super) {
        __extends(MdPortalHostAlreadyDisposedError, _super);
        function MdPortalHostAlreadyDisposedError() {
            _super.call(this, 'This PortalHost has already been disposed');
        }
        return MdPortalHostAlreadyDisposedError;
    }(error_1.MdError));
    exports.MdPortalHostAlreadyDisposedError = MdPortalHostAlreadyDisposedError;
    /** Exception thrown when attempting to attach an unknown portal type. */
    var MdUnknownPortalTypeError = (function (_super) {
        __extends(MdUnknownPortalTypeError, _super);
        function MdUnknownPortalTypeError() {
            _super.call(this, 'Attempting to attach an unknown Portal type. ' +
                'BasePortalHost accepts either a ComponentPortal or a TemplatePortal.');
        }
        return MdUnknownPortalTypeError;
    }(error_1.MdError));
    exports.MdUnknownPortalTypeError = MdUnknownPortalTypeError;
    /** Exception thrown when attempting to attach a portal to a null host. */
    var MdNullPortalHostError = (function (_super) {
        __extends(MdNullPortalHostError, _super);
        function MdNullPortalHostError() {
            _super.call(this, 'Attempting to attach a portal to a null PortalHost');
        }
        return MdNullPortalHostError;
    }(error_1.MdError));
    exports.MdNullPortalHostError = MdNullPortalHostError;
    /** Exception thrown when attempting to detach a portal that is not attached. */
    var MdNoPortalAttachedError = (function (_super) {
        __extends(MdNoPortalAttachedError, _super);
        function MdNoPortalAttachedError() {
            _super.call(this, 'Attempting to detach a portal that is not attached to a host');
        }
        return MdNoPortalAttachedError;
    }(error_1.MdError));
    exports.MdNoPortalAttachedError = MdNoPortalAttachedError;
});

//# sourceMappingURL=portal-errors.js.map
