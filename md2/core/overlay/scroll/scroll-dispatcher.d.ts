import { Scrollable } from './scrollable';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/fromEvent';
/**
 * Service contained all registered Scrollable references and emits an event when any one of the
 * Scrollable references emit a scrolled event.
 */
export declare class ScrollDispatcher {
    /** Subject for notifying that a registered scrollable reference element has been scrolled. */
    _scrolled: Subject<void>;
    /**
     * Map of all the scrollable references that are registered with the service and their
     * scroll event subscriptions.
     */
    scrollableReferences: WeakMap<Scrollable, Subscription>;
    constructor();
    /**
     * Registers a Scrollable with the service and listens for its scrolled events. When the
     * scrollable is scrolled, the service emits the event in its scrolled observable.
     */
    register(scrollable: Scrollable): void;
    /**
     * Deregisters a Scrollable reference and unsubscribes from its scroll event observable.
     */
    deregister(scrollable: Scrollable): void;
    /**
     * Returns an observable that emits an event whenever any of the registered Scrollable
     * references (or window, document, or body) fire a scrolled event.
     * TODO: Add an event limiter that includes throttle with the leading and trailing events.
     */
    scrolled(): Observable<void>;
    /** Sends a notification that a scroll event has been fired. */
    _notify(): void;
}
