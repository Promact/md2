import { ModuleWithProviders, ElementRef, NgZone, OnChanges, OnDestroy, OnInit, SimpleChange } from '@angular/core';
import { ViewportRuler } from '../overlay/position/viewport-ruler';
export declare class MdRipple implements OnInit, OnDestroy, OnChanges {
    /**
     * The element that triggers the ripple when click events are received. Defaults to the
     * directive's host element.
     */
    trigger: HTMLElement | HTMLElement;
    /**
     * Whether the ripple always originates from the center of the host element's bounds, rather
     * than originating from the location of the click event.
     */
    centered: boolean;
    /**
     * Whether click events will not trigger the ripple. It can still be triggered by manually
     * calling start() and end().
     */
    disabled: boolean;
    /**
     * If set, the radius in pixels of foreground ripples when fully expanded. If unset, the radius
     * will be the distance from the center of the ripple to the furthest corner of the host element's
     * bounding rectangle.
     */
    maxRadius: number;
    /**
     * If set, the normal duration of ripple animations is divided by this value. For example,
     * setting it to 0.5 will cause the animations to take twice as long.
     */
    speedFactor: number;
    /** Custom color for ripples. */
    color: string;
    /** Custom color for the ripple background. */
    backgroundColor: string;
    /** Whether the ripple background will be highlighted to indicated a focused state. */
    focused: boolean;
    /** Whether foreground ripples should be visible outside the component's bounds. */
    unbounded: boolean;
    private _rippleRenderer;
    _ruler: ViewportRuler;
    constructor(_elementRef: ElementRef, _ngZone: NgZone, _ruler: ViewportRuler);
    ngOnInit(): void;
    ngOnDestroy(): void;
    ngOnChanges(changes: {
        [propertyName: string]: SimpleChange;
    }): void;
    /**
     * Responds to the start of a ripple animation trigger by fading the background in.
     */
    start(): void;
    /**
     * Responds to the end of a ripple animation trigger by fading the background out, and creating a
     * foreground ripple that expands from the event location (or from the center of the element if
     * the "centered" property is set or forceCenter is true).
     */
    end(left: number, top: number, forceCenter?: boolean): void;
    private _rippleTransitionEnded(ripple, event);
    /**
     * Called when the trigger element receives a mousedown event. Starts the ripple animation by
     * fading in the background.
     */
    private _mouseDown(event);
    /**
     * Called when the trigger element receives a click event. Creates a foreground ripple and
     * runs its animation.
     */
    private _click(event);
    /**
     * Called when the trigger element receives a mouseleave event. Fades out the background.
     */
    private _mouseLeave(event);
}
export declare class MdRippleModule {
    static forRoot(): ModuleWithProviders;
}
