import { ModuleWithProviders, EventEmitter } from '@angular/core';
export declare type LayoutDirection = 'ltr' | 'rtl';
/**
 * Directive to listen for changes of direction of part of the DOM.
 *
 * Applications should use this directive instead of the native attribute so that Material
 * components can listen on changes of direction.
 */
export declare class Dir {
    /** Layout direction of the element. */
    _dir: LayoutDirection;
    /** Event emitted when the direction changes. */
    dirChange: EventEmitter<void>;
    /** @docs-private */
    dir: LayoutDirection;
    /** Current layout direction of the element. */
    value: LayoutDirection;
}
export declare class RtlModule {
    static forRoot(): ModuleWithProviders;
}
