import { PositionStrategy } from './position-strategy';
/**
 * A strategy for positioning overlays. Using this strategy, an overlay is given an
 * explicit position relative to the browser's viewport. We use flexbox, instead of
 * transforms, in order to avoid issues with subpixel rendering which can cause the
 * element to become blurry.
 */
export declare class GlobalPositionStrategy implements PositionStrategy {
    private _cssPosition;
    private _topOffset;
    private _bottomOffset;
    private _leftOffset;
    private _rightOffset;
    private _alignItems;
    private _justifyContent;
    private _width;
    private _height;
    private _wrapper;
    /** Sets the top position of the overlay. Clears any previously set vertical position. */
    top(value: string): this;
    /** Sets the left position of the overlay. Clears any previously set horizontal position. */
    left(value: string): this;
    /** Sets the bottom position of the overlay. Clears any previously set vertical position. */
    bottom(value: string): this;
    /** Sets the right position of the overlay. Clears any previously set horizontal position. */
    right(value: string): this;
    /** Sets the overlay width and clears any previously set width. */
    width(value: string): this;
    /** Sets the overlay height and clears any previously set height. */
    height(value: string): this;
    /**
     * Centers the overlay horizontally with an optional offset.
     * Clears any previously set horizontal position.
     */
    centerHorizontally(offset?: string): this;
    /**
     * Centers the overlay vertically with an optional offset.
     * Clears any previously set vertical position.
     */
    centerVertically(offset?: string): this;
    /**
     * Apply the position to the element.
     * @docs-private
     */
    apply(element: HTMLElement): Promise<void>;
    /**
     * Removes the wrapper element from the DOM.
     */
    dispose(): void;
}
