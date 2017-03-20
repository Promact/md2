import { ModuleWithProviders, ElementRef, ViewContainerRef, AnimationTransitionEvent, NgZone, OnDestroy, Renderer, OnInit, ChangeDetectorRef } from '@angular/core';
import { Overlay, OverlayRef, OverlayConnectionPosition, OriginConnectionPosition } from '../core';
import { Observable } from 'rxjs/Observable';
import { Dir } from '../core/rtl/dir';
import { Platform } from '../core/platform/index';
import 'rxjs/add/operator/first';
import { ScrollDispatcher } from '../core/overlay/scroll/scroll-dispatcher';
import { Subscription } from 'rxjs/Subscription';
export declare type TooltipPosition = 'left' | 'right' | 'above' | 'below' | 'before' | 'after';
/** Time in ms to delay before changing the tooltip visibility to hidden */
export declare const TOUCHEND_HIDE_DELAY: number;
/** Time in ms to throttle repositioning after scroll events. */
export declare const SCROLL_THROTTLE_MS: number;
/**
 * Directive that attaches a material design tooltip to the host element. Animates the showing and
 * hiding of a tooltip provided position (defaults to below the element).
 *
 * https://material.google.com/components/tooltips.html
 */
export declare class Md2Tooltip implements OnInit, OnDestroy {
    private _overlay;
    private _elementRef;
    private _scrollDispatcher;
    private _viewContainerRef;
    private _ngZone;
    private _renderer;
    private _platform;
    private _dir;
    _overlayRef: OverlayRef;
    _tooltipInstance: Md2TooltipComponent;
    scrollSubscription: Subscription;
    private _position;
    /** Allows the user to define the position of the tooltip relative to the parent element */
    position: TooltipPosition;
    /** The default delay in ms before showing the tooltip after show is called */
    showDelay: number;
    /** The default delay in ms before hiding the tooltip after hide is called */
    hideDelay: number;
    private _message;
    /** The message to be displayed in the tooltip */
    message: string;
    constructor(_overlay: Overlay, _elementRef: ElementRef, _scrollDispatcher: ScrollDispatcher, _viewContainerRef: ViewContainerRef, _ngZone: NgZone, _renderer: Renderer, _platform: Platform, _dir: Dir);
    ngOnInit(): void;
    /**
     * Dispose the tooltip when destroyed.
     */
    ngOnDestroy(): void;
    /** Shows the tooltip after the delay in ms, defaults to tooltip-delay-show or 0ms if no input */
    show(delay?: number): void;
    /** Hides the tooltip after the delay in ms, defaults to tooltip-delay-hide or 0ms if no input */
    hide(delay?: number): void;
    /** Shows/hides the tooltip */
    toggle(): void;
    /** Returns true if the tooltip is currently visible to the user */
    _isTooltipVisible(): boolean;
    /** Create the tooltip to display */
    private _createTooltip();
    /** Create the overlay config and position strategy */
    private _createOverlay();
    /** Disposes the current tooltip and the overlay it is attached to */
    private _disposeTooltip();
    /** Returns the origin position based on the user's position preference */
    _getOrigin(): OriginConnectionPosition;
    /** Returns the overlay position based on the user's preference */
    _getOverlayPosition(): OverlayConnectionPosition;
    /** Updates the tooltip message and repositions the overlay according to the new message length */
    private _setTooltipMessage(message);
}
export declare type TooltipVisibility = 'initial' | 'visible' | 'hidden';
/**
 * Internal component that wraps the tooltip's content.
 * @docs-private
 */
export declare class Md2TooltipComponent {
    private _dir;
    private _changeDetectorRef;
    /** Message to display in the tooltip */
    message: string;
    /** The timeout ID of any current timer set to show the tooltip */
    _showTimeoutId: number;
    /** The timeout ID of any current timer set to hide the tooltip */
    _hideTimeoutId: number;
    /** Property watched by the animation framework to show or hide the tooltip */
    _visibility: TooltipVisibility;
    /** Whether interactions on the page should close the tooltip */
    _closeOnInteraction: boolean;
    /** The transform origin used in the animation for showing and hiding the tooltip */
    _transformOrigin: string;
    /** Subject for notifying that the tooltip has been hidden from the view */
    private _onHide;
    constructor(_dir: Dir, _changeDetectorRef: ChangeDetectorRef);
    /**
     * Shows the tooltip with an animation originating from the provided origin
     * @param position Position of the tooltip.
     * @param delay Amount of milliseconds to the delay showing the tooltip.
     */
    show(position: TooltipPosition, delay: number): void;
    /**
     * Begins the animation to hide the tooltip after the provided delay in ms.
     * @param delay Amount of milliseconds to delay showing the tooltip.
     */
    hide(delay: number): void;
    /**
     * Returns an observable that notifies when the tooltip has been hidden from view
     */
    afterHidden(): Observable<void>;
    /**
     * Whether the tooltip is being displayed
     */
    isVisible(): boolean;
    /** Sets the tooltip transform origin according to the tooltip position */
    _setTransformOrigin(value: TooltipPosition): void;
    _afterVisibilityAnimation(e: AnimationTransitionEvent): void;
    /**
     * Interactions on the HTML body should close the tooltip immediately as defined in the
     * material design spec.
     * https://material.google.com/components/tooltips.html#tooltips-interaction
     */
    _handleBodyInteraction(): void;
}
export declare class Md2TooltipModule {
    /** @deprecated */
    static forRoot(): ModuleWithProviders;
}
