import { ElementRef, NgZone } from '@angular/core';
import { ViewportRuler } from '../overlay/position/viewport-ruler';
/** Fade-in speed in pixels per second. Can be modified with the speedFactor option. */
export declare const RIPPLE_SPEED_PX_PER_SECOND: number;
/** Fade-out speed for the ripples in milliseconds. This can't be modified by the speedFactor. */
export declare const RIPPLE_FADE_OUT_DURATION: number;
export declare type RippleConfig = {
    color?: string;
    centered?: boolean;
    radius?: number;
    speedFactor?: number;
};
/**
 * Helper service that performs DOM manipulations. Not intended to be used outside this module.
 * The constructor takes a reference to the ripple directive's host element and a map of DOM
 * event handlers to be installed on the element that triggers ripple animations.
 * This will eventually become a custom renderer once Angular support exists.
 * @docs-private
 */
export declare class RippleRenderer {
    private _ngZone;
    private _ruler;
    /** Element where the ripples are being added to. */
    private _containerElement;
    /** Element which triggers the ripple elements on mouse events. */
    private _triggerElement;
    /** Whether the mouse is currently down or not. */
    private _isMousedown;
    /** Currently active ripples that will be closed on mouseup. */
    private _activeRipples;
    /** Events to be registered on the trigger element. */
    private _triggerEvents;
    /** Ripple config for all ripples created by events. */
    rippleConfig: RippleConfig;
    /** Whether mouse ripples should be created or not. */
    rippleDisabled: boolean;
    constructor(_elementRef: ElementRef, _ngZone: NgZone, _ruler: ViewportRuler);
    /** Fades in a ripple at the given coordinates. */
    fadeInRipple(pageX: number, pageY: number, config?: RippleConfig): void;
    /** Fades out a ripple element. */
    fadeOutRipple(ripple: HTMLElement): void;
    /** Sets the trigger element and registers the mouse events. */
    setTriggerElement(element: HTMLElement): void;
    /** Listener being called on mousedown event. */
    private onMousedown(event);
    /** Listener being called on mouseup event. */
    private onMouseup();
    /** Listener being called on mouseleave event. */
    private onMouseLeave();
    /** Runs a timeout outside of the Angular zone to avoid triggering the change detection. */
    private runTimeoutOutsideZone(fn, delay?);
    /** Enforces a style recalculation of a DOM element by computing its styles. */
    private _enforceStyleRecalculation(element);
}
