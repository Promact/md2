import { ScrollStrategy } from './scroll-strategy';
import { ViewportRuler } from '../position/viewport-ruler';
/**
 * Strategy that will prevent the user from scrolling while the overlay is visible.
 */
export declare class BlockScrollStrategy implements ScrollStrategy {
    private _viewportRuler;
    private _previousHTMLStyles;
    private _previousScrollPosition;
    private _isEnabled;
    constructor(_viewportRuler: ViewportRuler);
    attach(): void;
    enable(): void;
    disable(): void;
    private _canBeEnabled();
}
