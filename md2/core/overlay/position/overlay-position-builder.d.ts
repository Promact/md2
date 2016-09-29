import { ViewportRuler } from './viewport-ruler';
import { ConnectedPositionStrategy } from './connected-position-strategy';
import { ElementRef } from '@angular/core';
import { GlobalPositionStrategy } from './global-position-strategy';
import { OverlayConnectionPosition, OriginConnectionPosition } from './connected-position';
/** Builder for overlay position strategy. */
export declare class OverlayPositionBuilder {
    private _viewportRuler;
    constructor(_viewportRuler: ViewportRuler);
    /** Creates a global position strategy. */
    global(): GlobalPositionStrategy;
    /** Creates a relative position strategy. */
    connectedTo(elementRef: ElementRef, originPos: OriginConnectionPosition, overlayPos: OverlayConnectionPosition): ConnectedPositionStrategy;
}
