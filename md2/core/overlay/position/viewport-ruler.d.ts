/**
 * Simple utility for getting the bounds of the browser viewport.
 * TODO: internal
 */
export declare class ViewportRuler {
    /** Gets a ClientRect for the viewport's bounds. */
    getViewportRect(): ClientRect;
    /**
     * Gets the (top, left) scroll position of the viewport.
     * @param documentRect
     */
    getViewportScrollPosition(documentRect?: ClientRect): {
        top: number;
        left: number;
    };
}
