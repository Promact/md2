import { ElementRef, NgZone, OnDestroy, AfterContentInit } from '@angular/core';
import { InteractivityChecker } from './interactivity-checker';
/**
 * Class that allows for trapping focus within a DOM element.
 *
 * NOTE: This class currently uses a very simple (naive) approach to focus trapping.
 * It assumes that the tab order is the same as DOM order, which is not necessarily true.
 * Things like tabIndex > 0, flex `order`, and shadow roots can cause to two to misalign.
 * This will be replaced with a more intelligent solution before the library is considered stable.
 */
export declare class FocusTrap {
    private _element;
    private _checker;
    private _ngZone;
    private _startAnchor;
    private _endAnchor;
    /** Whether the focus trap is active. */
    enabled: boolean;
    private _enabled;
    constructor(_element: HTMLElement, _checker: InteractivityChecker, _ngZone: NgZone, deferAnchors?: boolean);
    /** Destroys the focus trap by cleaning up the anchors. */
    destroy(): void;
    /**
     * Inserts the anchors into the DOM. This is usually done automatically
     * in the constructor, but can be deferred for cases like directives with `*ngIf`.
     */
    attachAnchors(): void;
    /**
     * Waits for microtask queue to empty, then focuses
     * the first tabbable element within the focus trap region.
     */
    focusFirstTabbableElementWhenReady(): void;
    /**
     * Waits for microtask queue to empty, then focuses
     * the last tabbable element within the focus trap region.
     */
    focusLastTabbableElementWhenReady(): void;
    /** Focuses the first tabbable element within the focus trap region. */
    focusFirstTabbableElement(): void;
    /** Focuses the last tabbable element within the focus trap region. */
    focusLastTabbableElement(): void;
    /** Get the first tabbable element from a DOM subtree (inclusive). */
    private _getFirstTabbableElement(root);
    /** Get the last tabbable element from a DOM subtree (inclusive). */
    private _getLastTabbableElement(root);
    /** Creates an anchor element. */
    private _createAnchor();
}
/** Factory that allows easy instantiation of focus traps. */
export declare class FocusTrapFactory {
    private _checker;
    private _ngZone;
    constructor(_checker: InteractivityChecker, _ngZone: NgZone);
    create(element: HTMLElement, deferAnchors?: boolean): FocusTrap;
}
/**
 * Directive for trapping focus within a region.
 * @deprecated
 */
export declare class FocusTrapDeprecatedDirective implements OnDestroy, AfterContentInit {
    private _elementRef;
    private _focusTrapFactory;
    focusTrap: FocusTrap;
    /** Whether the focus trap is active. */
    disabled: boolean;
    constructor(_elementRef: ElementRef, _focusTrapFactory: FocusTrapFactory);
    ngOnDestroy(): void;
    ngAfterContentInit(): void;
}
/** Directive for trapping focus within a region. */
export declare class FocusTrapDirective implements OnDestroy, AfterContentInit {
    private _elementRef;
    private _focusTrapFactory;
    focusTrap: FocusTrap;
    /** Whether the focus trap is active. */
    enabled: boolean;
    constructor(_elementRef: ElementRef, _focusTrapFactory: FocusTrapFactory);
    ngOnDestroy(): void;
    ngAfterContentInit(): void;
}
