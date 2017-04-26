import { ModuleWithProviders, EventEmitter, TemplateRef, ViewContainerRef, OnDestroy, ElementRef } from '@angular/core';
import { Overlay } from './overlay';
import { OverlayRef } from './overlay-ref';
import { ConnectionPositionPair, ConnectedOverlayPositionChange } from './position/connected-position';
import { Dir, LayoutDirection } from '../rtl/dir';
/**
 * Directive applied to an element to make it usable as an origin for an Overlay using a
 * ConnectedPositionStrategy.
 */
export declare class OverlayOrigin {
    elementRef: ElementRef;
    constructor(elementRef: ElementRef);
}
/**
 * Directive to facilitate declarative creation of an Overlay using a ConnectedPositionStrategy.
 */
export declare class ConnectedOverlayDirective implements OnDestroy {
    private _overlay;
    private _dir;
    private _overlayRef;
    private _templatePortal;
    private _open;
    private _hasBackdrop;
    private _backdropSubscription;
    private _positionSubscription;
    private _offsetX;
    private _offsetY;
    private _position;
    /** Origin for the connected overlay. */
    origin: OverlayOrigin;
    /** Registered connected position pairs. */
    positions: ConnectionPositionPair[];
    /** The offset in pixels for the overlay connection point on the x-axis */
    offsetX: number;
    /** The offset in pixels for the overlay connection point on the y-axis */
    offsetY: number;
    /** The width of the overlay panel. */
    width: number | string;
    /** The height of the overlay panel. */
    height: number | string;
    /** The min width of the overlay panel. */
    minWidth: number | string;
    /** The min height of the overlay panel. */
    minHeight: number | string;
    /** The custom class to be set on the backdrop element. */
    backdropClass: string;
    /** Whether or not the overlay should attach a backdrop. */
    hasBackdrop: any;
    open: boolean;
    /** Event emitted when the backdrop is clicked. */
    backdropClick: EventEmitter<void>;
    /** Event emitted when the position has changed. */
    positionChange: EventEmitter<ConnectedOverlayPositionChange>;
    /** Event emitted when the overlay has been attached. */
    attach: EventEmitter<void>;
    /** Event emitted when the overlay has been detached. */
    detach: EventEmitter<void>;
    constructor(_overlay: Overlay, templateRef: TemplateRef<any>, viewContainerRef: ViewContainerRef, _dir: Dir);
    /** The associated overlay reference. */
    readonly overlayRef: OverlayRef;
    /** The element's layout direction. */
    readonly dir: LayoutDirection;
    ngOnDestroy(): void;
    /** Creates an overlay */
    private _createOverlay();
    /** Builds the overlay config based on the directive's inputs */
    private _buildConfig();
    /** Returns the position strategy of the overlay to be set on the overlay config */
    private _createPositionStrategy();
    private _handlePositionChanges(strategy);
    /** Attaches the overlay and subscribes to backdrop clicks if backdrop exists */
    private _attachOverlay();
    /** Detaches the overlay and unsubscribes to backdrop clicks if backdrop exists */
    private _detachOverlay();
    /** Destroys the overlay created by this directive. */
    private _destroyOverlay();
}
export declare class OverlayModule {
    /** @deprecated */
    static forRoot(): ModuleWithProviders;
}
