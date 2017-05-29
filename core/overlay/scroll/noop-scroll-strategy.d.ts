import { ScrollStrategy } from './scroll-strategy';
/**
 * Scroll strategy that doesn't do anything.
 */
export declare class NoopScrollStrategy implements ScrollStrategy {
    enable(): void;
    disable(): void;
    attach(): void;
}
