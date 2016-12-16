import { MdPlatform } from '../platform/platform';
/**
 * Utility for checking the interactivity of an element, such as whether is is focusable or
 * tabbable.
 */
export declare class InteractivityChecker {
    private _platform;
    constructor(_platform: MdPlatform);
    /** Gets whether an element is disabled. */
    isDisabled(element: HTMLElement): boolean;
    /**
     * Gets whether an element is visible for the purposes of interactivity.
     *
     * This will capture states like `display: none` and `visibility: hidden`, but not things like
     * being clipped by an `overflow: hidden` parent or being outside the viewport.
     */
    isVisible(element: HTMLElement): boolean;
    /**
     * Gets whether an element can be reached via Tab key.
     * Assumes that the element has already been checked with isFocusable.
     */
    isTabbable(element: HTMLElement): boolean;
    /** Gets whether an element can be focused by the user. */
    isFocusable(element: HTMLElement): boolean;
}
