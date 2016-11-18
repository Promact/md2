/** Horizontal dimension of a connection point on the perimeter of the origin or overlay element. */
export declare type HorizontalConnectionPos = 'start' | 'center' | 'end';
/** Vertical dimension of a connection point on the perimeter of the origin or overlay element. */
export declare type VerticalConnectionPos = 'top' | 'center' | 'bottom';
/** A connection point on the origin element. */
export interface OriginConnectionPosition {
    originX: HorizontalConnectionPos;
    originY: VerticalConnectionPos;
}
/** A connection point on the overlay element. */
export interface OverlayConnectionPosition {
    overlayX: HorizontalConnectionPos;
    overlayY: VerticalConnectionPos;
}
/** The points of the origin element and the overlay element to connect. */
export declare class ConnectionPositionPair {
    originX: HorizontalConnectionPos;
    originY: VerticalConnectionPos;
    overlayX: HorizontalConnectionPos;
    overlayY: VerticalConnectionPos;
    constructor(origin: OriginConnectionPosition, overlay: OverlayConnectionPosition);
}
/** The change event emitted by the strategy when a fallback position is used. */
export declare class ConnectedOverlayPositionChange {
    connectionPair: ConnectionPositionPair;
    constructor(connectionPair: ConnectionPositionPair);
}
