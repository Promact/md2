import { Constructor } from './constructor';
import { ElementRef, Renderer2 } from '@angular/core';
/** @docs-private */
export interface CanColor {
    color: string;
}
/** @docs-private */
export interface HasRenderer {
    _renderer: Renderer2;
    _elementRef: ElementRef;
}
/** Possible color palette values.  */
export declare type ThemePalette = 'primary' | 'accent' | 'warn' | null;
/** Mixin to augment a directive with a `color` property. */
export declare function mixinColor<T extends Constructor<HasRenderer>>(base: T, defaultColor?: ThemePalette): Constructor<CanColor> & T;
