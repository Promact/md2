import { ElementRef, NgZone } from '@angular/core';
/** @docs-private */
export declare enum ForegroundRippleState {
    NEW = 0,
    EXPANDING = 1,
    FADING_OUT = 2,
}
/**
 * Wrapper for a foreground ripple DOM element and its animation state.
 * @docs-private
 */
export declare class ForegroundRipple {
    rippleElement: Element;
    state: ForegroundRippleState;
    constructor(rippleElement: Element);
}
/**
 * Helper service that performs DOM manipulations. Not intended to be used outside this module.
 * The constructor takes a reference to the ripple directive's host element and a map of DOM
 * event handlers to be installed on the element that triggers ripple animations.
 * This will eventually become a custom renderer once Angular support exists.
 * @docs-private
 */
export declare class RippleRenderer {
    private _eventHandlers;
    private _ngZone;
    private _backgroundDiv;
    private _rippleElement;
    private _triggerElement;
    _opacity: string;
    constructor(_elementRef: ElementRef, _eventHandlers: Map<string, (e: Event) => void>, _ngZone: NgZone);
    /** Creates the div for the ripple background, if it doesn't already exist. */
    createBackgroundIfNeeded(): void;
    /**
     * Installs event handlers on the given trigger element, and removes event handlers from the
     * previous trigger if needed.
     *
     * @param newTrigger New trigger to which to attach the ripple handlers.
     */
    setTriggerElement(newTrigger: HTMLElement): void;
    /** Installs event handlers on the host element of the md-ripple directive. */
    setTriggerElementToHost(): void;
    /** Removes event handlers from the current trigger element if needed. */
    clearTriggerElement(): void;
    /**
     * Creates a foreground ripple and sets its animation to expand and fade in from the position
     * given by rippleOriginLeft and rippleOriginTop (or from the center of the <md-ripple>
     * bounding rect if centered is true).
     *
     * @param rippleOriginLeft Left origin of the ripple.
     * @param rippleOriginTop Top origin of the ripple.
     * @param color Ripple color.
     * @param centered Whether the ripple should be centered.
     * @param radius Radius of the ripple.
     * @param speedFactor Speed at which the ripple expands towards the edges.
     * @param transitionEndCallback Callback to be triggered when the ripple transition is done.
     */
    createForegroundRipple(rippleOriginLeft: number, rippleOriginTop: number, color: string, centered: boolean, radius: number, speedFactor: number, transitionEndCallback: (r: ForegroundRipple, e: TransitionEvent) => void): void;
    /**
     * Fades out a foreground ripple after it has fully expanded and faded in.
     * @param ripple Ripple to be faded out.
     */
    fadeOutForegroundRipple(ripple: Element): void;
    /**
     * Removes a foreground ripple from the DOM after it has faded out.
     * @param ripple Ripple to be removed from the DOM.
     */
    removeRippleFromDom(ripple: Element): void;
    /**
     * Fades in the ripple background.
     * @param color New background color for the ripple.
     */
    fadeInRippleBackground(color: string): void;
    /** Fades out the ripple background. */
    fadeOutRippleBackground(): void;
}
