/**
 * Provide an API for animating elements with CSS transitions
 */
export declare class Animate {
    /**
     * Look up the transition event name for the browser type and cache it.
     */
    static TRANSITION_EVENT: string;
    static enter(el: HTMLElement, cssClass: string): Promise<void>;
    static leave(el: HTMLElement, cssClass: string): Promise<void>;
    /**
     * Get the duration of any transitions being applied to the given element.
     *
     * Based on: https://gist.github.com/snorpey/5323028
     * @param element The element to query
     * @param includeDelay Include any specified transition-delay value.
     * @returns {number}
     */
    static getTransitionDuration(element: HTMLElement, includeDelay?: boolean): any;
    static setTransitionDuration(element: HTMLElement, delayMs: number): void;
    static whichTransitionEvent(): string;
    /**
     * Set CSS styles immediately by turning off transition duration and restoring it afterward
     */
    static setStyles(element: HTMLElement, styles: {
        [style: string]: string | number;
    }): Promise<void>;
    /**
     * Wait a period of time, then resolve a promise.
     * @param milliseconds The period to wait before resolving.
     * @returns {Promise<void>|Promise} A promise that resolves after a period of time.
     */
    static wait(milliseconds?: number): Promise<void>;
}
