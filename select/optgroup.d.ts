import { CanDisable } from '../core/common-behaviors/disabled';
export declare class Md2OptgroupBase {
}
export declare const _Md2OptgroupMixinBase: (new (...args: any[]) => CanDisable) & typeof Md2OptgroupBase;
/**
 * Component that is used to group instances of `md2-option`.
 */
export declare class Md2Optgroup extends _Md2OptgroupMixinBase implements CanDisable {
    /** Label for the option group. */
    label: string;
    /** Unique id for the underlying label. */
    _labelId: string;
}
