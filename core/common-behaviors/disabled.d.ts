/** @docs-private */
export declare type Constructor<T> = new (...args: any[]) => T;
/** @docs-private */
export interface CanDisable {
    disabled: boolean;
}
/** Mixin to augment a directive with a `disabled` property. */
export declare function mixinDisabled<T extends Constructor<{}>>(base: T): Constructor<CanDisable> & T;
