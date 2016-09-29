import { ModuleWithProviders, TemplateRef, ViewContainerRef, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { Overlay } from './overlay';
import { OverlayRef } from './overlay-ref';
import { ConnectionPositionPair } from './position/connected-position';
/**
 * Directive applied to an element to make it usable as an origin for an Overlay using a
 * ConnectedPositionStrategy.
 */
export declare class OverlayOrigin {
    private _elementRef;
    constructor(_elementRef: ElementRef);
    readonly elementRef: ElementRef;
}
/**
 * Directive to facilitate declarative creation of an Overlay using a ConnectedPositionStrategy.
 */
export declare class ConnectedOverlayDirective implements OnInit, OnDestroy {
    private _overlay;
    private _overlayRef;
    private _templatePortal;
    origin: OverlayOrigin;
    positions: ConnectionPositionPair[];
    constructor(_overlay: Overlay, templateRef: TemplateRef<any>, viewContainerRef: ViewContainerRef);
    readonly overlayRef: OverlayRef;
    /** TODO: internal */
    ngOnInit(): void;
    /** TODO: internal */
    ngOnDestroy(): void;
    /** Creates an overlay and attaches this directive's template to it. */
    private _createOverlay();
    /** Destroys the overlay created by this directive. */
    private _destroyOverlay();
}
export declare class OverlayModule {
    static forRoot(): ModuleWithProviders;
}
