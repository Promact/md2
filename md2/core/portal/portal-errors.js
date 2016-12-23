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
export var NullPortalError = (function (_super) {
    __extends(NullPortalError, _super);
    function NullPortalError() {
        _super.call(this, 'Must provide a portal to attach');
    }
    return NullPortalError;
}(MdError));
/**
 * Exception thrown when attempting to attach a portal to a host that is already attached.
 * @docs-private
 */
export var PortalAlreadyAttachedError = (function (_super) {
    __extends(PortalAlreadyAttachedError, _super);
    function PortalAlreadyAttachedError() {
        _super.call(this, 'Host already has a portal attached');
    }
    return PortalAlreadyAttachedError;
}(MdError));
/**
 * Exception thrown when attempting to attach a portal to an already-disposed host.
 * @docs-private
 */
export var PortalHostAlreadyDisposedError = (function (_super) {
    __extends(PortalHostAlreadyDisposedError, _super);
    function PortalHostAlreadyDisposedError() {
        _super.call(this, 'This PortalHost has already been disposed');
    }
    return PortalHostAlreadyDisposedError;
}(MdError));
/**
 * Exception thrown when attempting to attach an unknown portal type.
 * @docs-private
 */
export var UnknownPortalTypeError = (function (_super) {
    __extends(UnknownPortalTypeError, _super);
    function UnknownPortalTypeError() {
        _super.call(this, 'Attempting to attach an unknown Portal type. ' +
            'BasePortalHost accepts either a ComponentPortal or a TemplatePortal.');
    }
    return UnknownPortalTypeError;
}(MdError));
/**
 * Exception thrown when attempting to attach a portal to a null host.
 * @docs-private
 */
export var NullPortalHostError = (function (_super) {
    __extends(NullPortalHostError, _super);
    function NullPortalHostError() {
        _super.call(this, 'Attempting to attach a portal to a null PortalHost');
    }
    return NullPortalHostError;
}(MdError));
/**
 * Exception thrown when attempting to detach a portal that is not attached.
 * @docs-private
 */
export var NoPortalAttachedError = (function (_super) {
    __extends(NoPortalAttachedError, _super);
    function NoPortalAttachedError() {
        _super.call(this, 'Attempting to detach a portal that is not attached to a host');
    }
    return NoPortalAttachedError;
}(MdError));

//# sourceMappingURL=portal-errors.js.map
