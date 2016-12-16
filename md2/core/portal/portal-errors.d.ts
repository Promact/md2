import { MdError } from '../errors/error';
/**
 * Exception thrown when attempting to attach a null portal to a host.
 * @docs-private
 */
export declare class MdNullPortalError extends MdError {
    constructor();
}
/**
 * Exception thrown when attempting to attach a portal to a host that is already attached.
 * @docs-private
 */
export declare class MdPortalAlreadyAttachedError extends MdError {
    constructor();
}
/**
 * Exception thrown when attempting to attach a portal to an already-disposed host.
 * @docs-private
 */
export declare class MdPortalHostAlreadyDisposedError extends MdError {
    constructor();
}
/**
 * Exception thrown when attempting to attach an unknown portal type.
 * @docs-private
 */
export declare class MdUnknownPortalTypeError extends MdError {
    constructor();
}
/**
 * Exception thrown when attempting to attach a portal to a null host.
 * @docs-private
 */
export declare class MdNullPortalHostError extends MdError {
    constructor();
}
/**
 * Exception thrown when attempting to detach a portal that is not attached.
 * @docs-private
 */
export declare class MdNoPortalAttachedError extends MdError {
    constructor();
}
