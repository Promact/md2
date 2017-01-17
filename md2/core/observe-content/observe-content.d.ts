import { ElementRef, ModuleWithProviders, EventEmitter, OnDestroy, AfterContentInit } from '@angular/core';
/**
 * Directive that triggers a callback whenever the content of
 * its associated element has changed.
 */
export declare class ObserveContent implements AfterContentInit, OnDestroy {
    private _elementRef;
    private _observer;
    /** Event emitted for each change in the element's content. */
    event: EventEmitter<void>;
    constructor(_elementRef: ElementRef);
    ngAfterContentInit(): void;
    ngOnDestroy(): void;
}
export declare class ObserveContentModule {
    static forRoot(): ModuleWithProviders;
}
