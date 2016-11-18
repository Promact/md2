/** The points of the origin element and the overlay element to connect. */
export var ConnectionPositionPair = (function () {
    function ConnectionPositionPair(origin, overlay) {
        this.originX = origin.originX;
        this.originY = origin.originY;
        this.overlayX = overlay.overlayX;
        this.overlayY = overlay.overlayY;
    }
    return ConnectionPositionPair;
}());
/** The change event emitted by the strategy when a fallback position is used. */
export var ConnectedOverlayPositionChange = (function () {
    function ConnectedOverlayPositionChange(connectionPair) {
        this.connectionPair = connectionPair;
    }
    return ConnectedOverlayPositionChange;
}());

//# sourceMappingURL=connected-position.js.map
