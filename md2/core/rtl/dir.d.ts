import { ModuleWithProviders, EventEmitter } from '@angular/core';
export declare type LayoutDirection = 'ltr' | 'rtl';
/**
 * Directive to listen to changes of direction of part of the DOM.
 *
 * Applications should use this directive instead of the native attribute so that Material
 * components can listen on changes of direction.
 */
export declare class Dir {
    _dir: LayoutDirection;
    dirChange: EventEmitter<void>;
    dir: LayoutDirection;
    value: LayoutDirection;
}
export declare class RtlModule {
    static forRoot(): ModuleWithProviders;
}
