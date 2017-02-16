import { Optional, Renderer, ElementRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
export declare const TOUCH_BUFFER_MS: number;
export declare type FocusOrigin = 'touch' | 'mouse' | 'keyboard' | 'program';
/** Monitors mouse and keyboard events to determine the cause of focus events. */
export declare class FocusOriginMonitor {
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
    constructor();
    /** Register an element to receive focus classes. */
    registerElementForFocusClasses(element: Element, renderer: Renderer): Observable<FocusOrigin>;
    /** Focuses the element via the specified focus origin. */
    focusVia(element: Node, renderer: Renderer, origin: FocusOrigin): void;
    /** Sets the origin and schedules an async function to clear it at the end of the event queue. */
    private _setOriginForCurrentEventQueue(origin);
    /** Checks whether the given focus event was caused by a touchstart event. */
    private _wasCausedByTouch(event);
    /** Handles focus events on a registered element. */
    private _onFocus(event, element, renderer, subject);
    /** Handles blur events on a registered element. */
    private _onBlur(element, renderer, subject);
}
/**
 * Directive that determines how a particular element was focused (via keyboard, mouse, or
 * programmatically) and adds corresponding classes to the element.
 */
export declare class CdkFocusClasses {
    changes: Observable<FocusOrigin>;
    constructor(elementRef: ElementRef, focusOriginMonitor: FocusOriginMonitor, renderer: Renderer);
}
export declare function FOCUS_ORIGIN_MONITOR_PROVIDER_FACTORY(parentDispatcher: FocusOriginMonitor): FocusOriginMonitor;
export declare const FOCUS_ORIGIN_MONITOR_PROVIDER: {
    provide: typeof FocusOriginMonitor;
    deps: Optional[][];
    useFactory: (parentDispatcher: FocusOriginMonitor) => FocusOriginMonitor;
};
