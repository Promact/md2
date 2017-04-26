import { MdError } from '../core/errors/error';
/**
 * Exception thrown when attempting to change a select's `multiple` option after initialization.
 * @docs-private
 */
export declare class MdSelectDynamicMultipleError extends MdError {
    constructor();
}
/**
 * Exception thrown when attempting to assign a non-array value to a select in `multiple` mode.
 * Note that `undefined` and `null` are still valid values to allow for resetting the value.
 * @docs-private
 */
export declare class MdSelectNonArrayValueError extends MdError {
    constructor();
}
