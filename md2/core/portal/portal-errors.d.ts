import { MdError } from '../errors/error';
/**
 * Exception thrown when attempting to attach a null portal to a host.
 * @docs-private
 */
export declare class NullPortalError extends MdError {
    constructor();
}
/**
 * Exception thrown when attempting to attach a portal to a host that is already attached.
 * @docs-private
 */
export declare class PortalAlreadyAttachedError extends MdError {
    constructor();
}
/**
 * Exception thrown when attempting to attach a portal to an already-disposed host.
 * @docs-private
 */
export declare class PortalHostAlreadyDisposedError extends MdError {
    constructor();
}
/**
 * Exception thrown when attempting to attach an unknown portal type.
 * @docs-private
 */
export declare class UnknownPortalTypeError extends MdError {
    constructor();
}
/**
 * Exception thrown when attempting to attach a portal to a null host.
 * @docs-private
 */
export declare class NullPortalHostError extends MdError {
    constructor();
}
/**
 * Exception thrown when attempting to detach a portal that is not attached.
 * @docs-private
 */
export declare class NoPortalAttachedError extends MdError {
    constructor();
}
