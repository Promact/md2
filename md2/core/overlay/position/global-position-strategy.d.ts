import { PositionStrategy } from './position-strategy';
/**
 * A strategy for positioning overlays. Using this strategy, an overlay is given an
 * explicit position relative to the browser's viewport.
 */
export declare class GlobalPositionStrategy implements PositionStrategy {
    private _cssPosition;
    private _top;
    private _bottom;
    private _left;
    private _right;
    /** Array of individual applications of translateX(). Currently only for centering. */
    private _translateX;
    /** Array of individual applications of translateY(). Currently only for centering. */
    private _translateY;
    /** Sets the element to use CSS position: fixed */
    fixed(): this;
    /** Sets the element to use CSS position: absolute. This is the default. */
    absolute(): this;
    /** Sets the top position of the overlay. Clears any previously set vertical position. */
    top(value: string): this;
    /** Sets the left position of the overlay. Clears any previously set horizontal position. */
    left(value: string): this;
    /** Sets the bottom position of the overlay. Clears any previously set vertical position. */
    bottom(value: string): this;
    /** Sets the right position of the overlay. Clears any previously set horizontal position. */
    right(value: string): this;
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
     * TODO: internal
     */
    apply(element: HTMLElement): Promise<void>;
    /** Reduce a list of translate values to a string that can be used in the transform property */
    private _reduceTranslateValues(translateFn, values);
}
