import { ElementRef, ModuleWithProviders, EventEmitter, OnDestroy, AfterContentInit } from '@angular/core';
export declare class ObserveContent implements AfterContentInit, OnDestroy {
    private _elementRef;
    private _observer;
    event: EventEmitter<void>;
    constructor(_elementRef: ElementRef);
    ngAfterContentInit(): void;
    ngOnDestroy(): void;
}
export declare class ObserveContentModule {
    static forRoot(): ModuleWithProviders;
}
