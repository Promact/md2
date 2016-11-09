import { ElementRef } from '@angular/core';
import { InteractivityChecker } from './interactivity-checker';
/**
 * Directive for trapping focus within a region.
 *
 * NOTE: This directive currently uses a very simple (naive) approach to focus trapping.
 * It assumes that the tab order is the same as DOM order, which is not necessarily true.
 * Things like tabIndex > 0, flex `order`, and shadow roots can cause to two to misalign.
 * This will be replaced with a more intelligent solution before the library is considered stable.
 */
export declare class FocusTrap {
    private _checker;
    trappedContent: ElementRef;
    constructor(_checker: InteractivityChecker);
    /** Focuses the first tabbable element within the focus trap region. */
    focusFirstTabbableElement(): void;
    /** Focuses the last tabbable element within the focus trap region. */
    focusLastTabbableElement(): void;
    /** Get the first tabbable element from a DOM subtree (inclusive). */
    private _getFirstTabbableElement(root);
    /** Get the last tabbable element from a DOM subtree (inclusive). */
    private _getLastTabbableElement(root);
}
