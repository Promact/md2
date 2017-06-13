import { ElementRef, Renderer2 } from '@angular/core';
import { CanColor } from '../../common-behaviors/color';
export declare type MdPseudoCheckboxState = 'unchecked' | 'checked' | 'indeterminate';
export declare class MdPseudoCheckboxBase {
    _renderer: Renderer2;
    _elementRef: ElementRef;
    constructor(_renderer: Renderer2, _elementRef: ElementRef);
}
export declare const _MdPseudoCheckboxBase: (new (...args: any[]) => CanColor) & typeof MdPseudoCheckboxBase;
/**
 * Component that shows a simplified checkbox without including any kind of "real" checkbox.
 * Meant to be used when the checkbox is purely decorative and a large number of them will be
 * included, such as for the options in a multi-select. Uses no SVGs or complex animations.
 *
 * Note that this component will be completely invisible to screen-reader users. This is *not*
 * interchangeable with <md-checkbox> and should *not* be used if the user would directly interact
 * with the checkbox. The pseudo-checkbox should only be used as an implementation detail of
 * more complex components that appropriately handle selected / checked state.
 * @docs-private
 */
export declare class MdPseudoCheckbox extends _MdPseudoCheckboxBase implements CanColor {
    /** Display state of the checkbox. */
    state: MdPseudoCheckboxState;
    /** Whether the checkbox is disabled. */
    disabled: boolean;
    constructor(elementRef: ElementRef, renderer: Renderer2);
}
