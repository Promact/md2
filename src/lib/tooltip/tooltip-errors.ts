import {MdError} from '../core';

/**
 * Exception thrown when a tooltip has an invalid position.
 * @docs-private
 */
export class Md2TooltipInvalidPositionError extends MdError {
  constructor(position: string) {
    super(`Tooltip position "${position}" is invalid.`);
  }
}
