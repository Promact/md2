import { ElementRef, EventEmitter, NgZone, OnDestroy, Optional, Renderer } from '@angular/core';
import { Observable } from 'rxjs/Observable';
export declare const TOUCH_BUFFER_MS: number;
export declare type FocusOrigin = 'touch' | 'mouse' | 'keyboard' | 'program';
/** Monitors mouse and keyboard events to determine the cause of focus events. */
export declare class FocusOriginMonitor {
    private _ngZone;
    /** The focus origin that the next focus event is a result of. */
    private _origin;
    /** The FocusOrigin of the last focus event tracked by the FocusOriginMonitor. */
    private _lastFocusOrigin;
    /** Whether the window has just been focused. */
    private _windowFocused;
    /** The target of the last touch event. */
    private _lastTouchTarget;
    /** The timeout id of the touch timeout, used to cancel timeout later. */
    private _touchTimeout;
    /** Weak map of elements being monitored to their info. */
    private _elementInfo;
    constructor(_ngZone: NgZone);
    /**
     * Monitors focus on an element and applies appropriate CSS classes.
     * @param element The element to monitor
     * @param renderer The renderer to use to apply CSS classes to the element.
     * @param checkChildren Whether to count the element as focused when its children are focused.
     * @returns An observable that emits when the focus state of the element changes.
     *     When the element is blurred, null will be emitted.
     */
    monitor(element: Element, renderer: Renderer, checkChildren: boolean): Observable<FocusOrigin>;
    /**
     * Stops monitoring an element and removes all focus classes.
     * @param element The element to stop monitoring.
     */
    unmonitor(element: Element): void;
    /**
     * Focuses the element via the specified focus origin.
     * @param element The element to focus.
     * @param renderer The renderer to use to invoke the focus method on the element.
     * @param origin The focus origin.
     */
    focusVia(element: Node, renderer: Renderer, origin: FocusOrigin): void;
    /** Register necessary event listeners on the document and window. */
    private _registerDocumentEvents();
    /**
     * Sets the focus classes on the element based on the given focus origin.
     * @param element The element to update the classes on.
     * @param origin The focus origin.
     */
    private _setClasses(element, origin);
    /**
     * Sets the origin and schedules an async function to clear it at the end of the event queue.
     * @param origin The origin to set.
     */
    private _setOriginForCurrentEventQueue(origin);
    /**
     * Checks whether the given focus event was caused by a touchstart event.
     * @param event The focus event to check.
     * @returns Whether the event was caused by a touch.
     */
    private _wasCausedByTouch(event);
    /**
     * Handles focus events on a registered element.
     * @param event The focus event.
     * @param element The monitored element.
     */
    private _onFocus(event, element);
    /**
     * Handles blur events on a registered element.
     * @param event The blur event.
     * @param element The monitored element.
     */
    private _onBlur(event, element);
}
/**
 * Directive that determines how a particular element was focused (via keyboard, mouse, touch, or
 * programmatically) and adds corresponding classes to the element.
 *
 * There are two variants of this directive:
 * 1) cdkMonitorElementFocus: does not consider an element to be focused if one of its children is
 *    focused.
 * 2) cdkMonitorSubtreeFocus: considers an element focused if it or any of its children are focused.
 */
export declare class CdkMonitorFocus implements OnDestroy {
    private _elementRef;
    private _focusOriginMonitor;
    cdkFocusChange: EventEmitter<FocusOrigin>;
    constructor(_elementRef: ElementRef, _focusOriginMonitor: FocusOriginMonitor, renderer: Renderer);
    ngOnDestroy(): void;
}
export declare function FOCUS_ORIGIN_MONITOR_PROVIDER_FACTORY(parentDispatcher: FocusOriginMonitor, ngZone: NgZone): FocusOriginMonitor;
export declare const FOCUS_ORIGIN_MONITOR_PROVIDER: {
    provide: typeof FocusOriginMonitor;
    deps: (typeof NgZone | Optional[])[];
    useFactory: (parentDispatcher: FocusOriginMonitor, ngZone: NgZone) => FocusOriginMonitor;
};
