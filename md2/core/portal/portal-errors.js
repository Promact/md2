var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
import { MdError } from '../errors/error';
/**
 * Exception thrown when attempting to attach a null portal to a host.
 * @docs-private
 */
var NullPortalError = (function (_super) {
    __extends(NullPortalError, _super);
    function NullPortalError() {
        return _super.call(this, 'Must provide a portal to attach') || this;
    }
    return NullPortalError;
}(MdError));
export { NullPortalError };
/**
 * Exception thrown when attempting to attach a portal to a host that is already attached.
 * @docs-private
 */
var PortalAlreadyAttachedError = (function (_super) {
    __extends(PortalAlreadyAttachedError, _super);
    function PortalAlreadyAttachedError() {
        return _super.call(this, 'Host already has a portal attached') || this;
    }
    return PortalAlreadyAttachedError;
}(MdError));
export { PortalAlreadyAttachedError };
/**
 * Exception thrown when attempting to attach a portal to an already-disposed host.
 * @docs-private
 */
var PortalHostAlreadyDisposedError = (function (_super) {
    __extends(PortalHostAlreadyDisposedError, _super);
    function PortalHostAlreadyDisposedError() {
        return _super.call(this, 'This PortalHost has already been disposed') || this;
    }
    return PortalHostAlreadyDisposedError;
}(MdError));
export { PortalHostAlreadyDisposedError };
/**
 * Exception thrown when attempting to attach an unknown portal type.
 * @docs-private
 */
var UnknownPortalTypeError = (function (_super) {
    __extends(UnknownPortalTypeError, _super);
    function UnknownPortalTypeError() {
        return _super.call(this, 'Attempting to attach an unknown Portal type. ' +
            'BasePortalHost accepts either a ComponentPortal or a TemplatePortal.') || this;
    }
    return UnknownPortalTypeError;
}(MdError));
export { UnknownPortalTypeError };
/**
 * Exception thrown when attempting to attach a portal to a null host.
 * @docs-private
 */
var NullPortalHostError = (function (_super) {
    __extends(NullPortalHostError, _super);
    function NullPortalHostError() {
        return _super.call(this, 'Attempting to attach a portal to a null PortalHost') || this;
    }
    return NullPortalHostError;
}(MdError));
export { NullPortalHostError };
/**
 * Exception thrown when attempting to detach a portal that is not attached.
 * @docs-private
 */
var NoPortalAttachedError = (function (_super) {
    __extends(NoPortalAttachedError, _super);
    function NoPortalAttachedError() {
        return _super.call(this, 'Attempting to detach a portal that is not attached to a host') || this;
    }
    return NoPortalAttachedError;
}(MdError));
export { NoPortalAttachedError };
//# sourceMappingURL=portal-errors.js.map