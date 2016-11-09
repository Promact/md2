import { MdError } from '../errors/error';
/** Exception thrown when attempting to attach a null portal to a host. */
export declare class MdNullPortalError extends MdError {
    constructor();
}
/** Exception thrown when attempting to attach a portal to a host that is already attached. */
export declare class MdPortalAlreadyAttachedError extends MdError {
    constructor();
}
/** Exception thrown when attempting to attach a portal to an already-disposed host. */
export declare class MdPortalHostAlreadyDisposedError extends MdError {
    constructor();
}
/** Exception thrown when attempting to attach an unknown portal type. */
export declare class MdUnknownPortalTypeError extends MdError {
    constructor();
}
/** Exception thrown when attempting to attach a portal to a null host. */
export declare class MdNullPortalHostError extends MdError {
    constructor();
}
/** Exception thrown when attempting to detach a portal that is not attached. */
export declare class MdNoPortalAttachedError extends MdError {
    constructor();
}
