import { ElementRef } from '@angular/core';
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
    scrollableReferences: Map<Scrollable, Subscription>;
    constructor();
    /**
     * Registers a Scrollable with the service and listens for its scrolled events. When the
     * scrollable is scrolled, the service emits the event in its scrolled observable.
     *
     * @param scrollable Scrollable instance to be registered.
     */
    register(scrollable: Scrollable): void;
    /**
     * Deregisters a Scrollable reference and unsubscribes from its scroll event observable.
     *
     * @param scrollable Scrollable instance to be deregistered.
     */
    deregister(scrollable: Scrollable): void;
    /**
     * Returns an observable that emits an event whenever any of the registered Scrollable
     * references (or window, document, or body) fire a scrolled event.
     */
    scrolled(): Observable<void>;
    /** Returns all registered Scrollables that contain the provided element. */
    getScrollContainers(elementRef: ElementRef): Scrollable[];
    /** Returns true if the element is contained within the provided Scrollable. */
    scrollableContainsElement(scrollable: Scrollable, elementRef: ElementRef): boolean;
    /** Sends a notification that a scroll event has been fired. */
    _notify(): void;
}
