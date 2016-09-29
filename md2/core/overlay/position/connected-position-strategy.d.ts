import { PositionStrategy } from './position-strategy';
import { ElementRef } from '@angular/core';
import { ViewportRuler } from './viewport-ruler';
import { ConnectionPositionPair, OriginConnectionPosition, OverlayConnectionPosition } from './connected-position';
/**
 * A strategy for positioning overlays. Using this strategy, an overlay is given an
 * implict position relative some origin element. The relative position is defined in terms of
 * a point on the origin element that is connected to a point on the overlay element. For example,
 * a basic dropdown is connecting the bottom-left corner of the origin to the top-left corner
 * of the overlay.
 */
export declare class ConnectedPositionStrategy implements PositionStrategy {
    private _connectedTo;
    private _originPos;
    private _overlayPos;
    private _viewportRuler;
    /** Whether the we're dealing with an RTL context */
    _isRtl: boolean;
    /** Ordered list of preferred positions, from most to least desirable. */
    _preferredPositions: ConnectionPositionPair[];
    /** The origin element against which the overlay will be positioned. */
    private _origin;
    constructor(_connectedTo: ElementRef, _originPos: OriginConnectionPosition, _overlayPos: OverlayConnectionPosition, _viewportRuler: ViewportRuler);
    readonly positions: ConnectionPositionPair[];
    /**
     * Updates the position of the overlay element, using whichever preferred position relative
     * to the origin fits on-screen.
     * TODO: internal
     */
    apply(element: HTMLElement): Promise<void>;
    withFallbackPosition(originPos: OriginConnectionPosition, overlayPos: OverlayConnectionPosition): this;
    /**
     * Gets the horizontal (x) "start" dimension based on whether the overlay is in an RTL context.
     * @param rect
     */
    private _getStartX(rect);
    /**
     * Gets the horizontal (x) "end" dimension based on whether the overlay is in an RTL context.
     * @param rect
     */
    private _getEndX(rect);
    /**
     * Gets the (x, y) coordinate of a connection point on the origin based on a relative position.
     * @param originRect
     * @param pos
     */
    private _getOriginConnectionPoint(originRect, pos);
    /**
     * Gets the (x, y) coordinate of the top-left corner of the overlay given a given position and
     * origin point to which the overlay should be connected.
     * @param originPoint
     * @param overlayRect
     * @param pos
     */
    private _getOverlayPoint(originPoint, overlayRect, pos);
    /**
     * Gets whether the overlay positioned at the given point will fit on-screen.
     * @param overlayPoint The top-left coordinate of the overlay.
     * @param overlayRect Bounding rect of the overlay, used to get its size.
     * @param viewportRect The bounding viewport.
     */
    private _willOverlayFitWithinViewport(overlayPoint, overlayRect, viewportRect);
    /**
     * Physically positions the overlay element to the given coordinate.
     * @param element
     * @param overlayPoint
     */
    private _setElementPosition(element, overlayPoint);
}
