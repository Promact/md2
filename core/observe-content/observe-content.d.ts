import { ElementRef, EventEmitter, OnDestroy, AfterContentInit } from '@angular/core';
import 'rxjs/add/operator/debounceTime';
/**
 * Factory that creates a new MutationObserver and allows us to stub it out in unit tests.
 * @docs-private
 */
export declare class MdMutationObserverFactory {
    create(callback: any): MutationObserver;
}
/**
 * Directive that triggers a callback whenever the content of
 * its associated element has changed.
 */
export declare class ObserveContent implements AfterContentInit, OnDestroy {
    private _mutationObserverFactory;
    private _elementRef;
    private _observer;
    /** Event emitted for each change in the element's content. */
    event: EventEmitter<MutationRecord[]>;
    /** Used for debouncing the emitted values to the observeContent event. */
    private _debouncer;
    /** Debounce interval for emitting the changes. */
    debounce: number;
    constructor(_mutationObserverFactory: MdMutationObserverFactory, _elementRef: ElementRef);
    ngAfterContentInit(): void;
    ngOnDestroy(): void;
}
export declare class ObserveContentModule {
}
