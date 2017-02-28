var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { NgModule, Component, Directive, Input, ElementRef, ViewContainerRef, style, trigger, state, transition, animate, NgZone, Optional, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import { Overlay, OverlayState, OverlayModule, ComponentPortal, CompatibilityModule } from '../core';
import { Md2TooltipInvalidPositionError } from './tooltip-errors';
import { Subject } from 'rxjs/Subject';
import { Dir } from '../core/rtl/dir';
import 'rxjs/add/operator/first';
import { ScrollDispatcher } from '../core/overlay/scroll/scroll-dispatcher';
/** Time in ms to delay before changing the tooltip visibility to hidden */
export var TOUCHEND_HIDE_DELAY = 1500;
/** Time in ms to throttle repositioning after scroll events. */
export var SCROLL_THROTTLE_MS = 20;
/**
 * Directive that attaches a material design tooltip to the host element. Animates the showing and
 * hiding of a tooltip provided position (defaults to below the element).
 *
 * https://material.google.com/components/tooltips.html
 */
export var Md2Tooltip = (function () {
    function Md2Tooltip(_overlay, _scrollDispatcher, _elementRef, _viewContainerRef, _ngZone, _dir) {
        this._overlay = _overlay;
        this._scrollDispatcher = _scrollDispatcher;
        this._elementRef = _elementRef;
        this._viewContainerRef = _viewContainerRef;
        this._ngZone = _ngZone;
        this._dir = _dir;
        this._position = 'below';
        /** The default delay in ms before showing the tooltip after show is called */
        this.showDelay = 0;
        /** The default delay in ms before hiding the tooltip after hide is called */
        this.hideDelay = 0;
    }
    Object.defineProperty(Md2Tooltip.prototype, "position", {
        /** Allows the user to define the position of the tooltip relative to the parent element */
        get: function () { return this._position; },
        set: function (value) {
            if (value !== this._position) {
                this._position = value;
                // TODO(andrewjs): When the overlay's position can be dynamically changed, do not destroy
                // the tooltip.
                if (this._tooltipInstance) {
                    this._disposeTooltip();
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Tooltip.prototype, "message", {
        /** The message to be displayed in the tooltip */
        get: function () { return this._message; },
        set: function (value) {
            this._message = value;
            if (this._tooltipInstance) {
                this._setTooltipMessage(this._message);
            }
        },
        enumerable: true,
        configurable: true
    });
    Md2Tooltip.prototype.ngOnInit = function () {
        var _this = this;
        // When a scroll on the page occurs, update the position in case this tooltip needs
        // to be repositioned.
        this.scrollSubscription = this._scrollDispatcher.scrolled(SCROLL_THROTTLE_MS).subscribe(function () {
            if (_this._overlayRef) {
                _this._overlayRef.updatePosition();
            }
        });
    };
    /**
     * Dispose the tooltip when destroyed.
     */
    Md2Tooltip.prototype.ngOnDestroy = function () {
        if (this._tooltipInstance) {
            this._disposeTooltip();
        }
        this.scrollSubscription.unsubscribe();
    };
    /** Shows the tooltip after the delay in ms, defaults to tooltip-delay-show or 0ms if no input */
    Md2Tooltip.prototype.show = function (delay) {
        if (delay === void 0) { delay = this.showDelay; }
        if (!this._message || !this._message.trim()) {
            return;
        }
        if (!this._tooltipInstance) {
            this._createTooltip();
        }
        this._setTooltipMessage(this._message);
        this._tooltipInstance.show(this._position, delay);
    };
    /** Hides the tooltip after the delay in ms, defaults to tooltip-delay-hide or 0ms if no input */
    Md2Tooltip.prototype.hide = function (delay) {
        if (delay === void 0) { delay = this.hideDelay; }
        if (this._tooltipInstance) {
            this._tooltipInstance.hide(delay);
        }
    };
    /** Shows/hides the tooltip */
    Md2Tooltip.prototype.toggle = function () {
        this._isTooltipVisible() ? this.hide() : this.show();
    };
    /** Returns true if the tooltip is currently visible to the user */
    Md2Tooltip.prototype._isTooltipVisible = function () {
        return this._tooltipInstance && this._tooltipInstance.isVisible();
    };
    /** Create the tooltip to display */
    Md2Tooltip.prototype._createTooltip = function () {
        var _this = this;
        this._createOverlay();
        var portal = new ComponentPortal(Md2TooltipComponent, this._viewContainerRef);
        this._tooltipInstance = this._overlayRef.attach(portal).instance;
        // Dispose the overlay when finished the shown tooltip.
        this._tooltipInstance.afterHidden().subscribe(function () {
            // Check first if the tooltip has already been removed through this components destroy.
            if (_this._tooltipInstance) {
                _this._disposeTooltip();
            }
        });
    };
    /** Create the overlay config and position strategy */
    Md2Tooltip.prototype._createOverlay = function () {
        var _this = this;
        var origin = this._getOrigin();
        var position = this._getOverlayPosition();
        // Create connected position strategy that listens for scroll events to reposition.
        // After position changes occur and the overlay is clipped by a parent scrollable then
        // close the tooltip.
        var strategy = this._overlay.position().connectedTo(this._elementRef, origin, position);
        strategy.withScrollableContainers(this._scrollDispatcher.getScrollContainers(this._elementRef));
        strategy.onPositionChange.subscribe(function (change) {
            if (change.scrollableViewProperties.isOverlayClipped &&
                _this._tooltipInstance && _this._tooltipInstance.isVisible()) {
                _this.hide(0);
            }
        });
        var config = new OverlayState();
        config.positionStrategy = strategy;
        this._overlayRef = this._overlay.create(config);
    };
    /** Disposes the current tooltip and the overlay it is attached to */
    Md2Tooltip.prototype._disposeTooltip = function () {
        this._overlayRef.dispose();
        this._overlayRef = null;
        this._tooltipInstance = null;
    };
    /** Returns the origin position based on the user's position preference */
    Md2Tooltip.prototype._getOrigin = function () {
        if (this.position == 'above' || this.position == 'below') {
            return { originX: 'center', originY: this.position == 'above' ? 'top' : 'bottom' };
        }
        var isDirectionLtr = !this._dir || this._dir.value == 'ltr';
        if (this.position == 'left' ||
            this.position == 'before' && isDirectionLtr ||
            this.position == 'after' && !isDirectionLtr) {
            return { originX: 'start', originY: 'center' };
        }
        if (this.position == 'right' ||
            this.position == 'after' && isDirectionLtr ||
            this.position == 'before' && !isDirectionLtr) {
            return { originX: 'end', originY: 'center' };
        }
        throw new Md2TooltipInvalidPositionError(this.position);
    };
    /** Returns the overlay position based on the user's preference */
    Md2Tooltip.prototype._getOverlayPosition = function () {
        if (this.position == 'above') {
            return { overlayX: 'center', overlayY: 'bottom' };
        }
        if (this.position == 'below') {
            return { overlayX: 'center', overlayY: 'top' };
        }
        var isLtr = !this._dir || this._dir.value == 'ltr';
        if (this.position == 'left' ||
            this.position == 'before' && isLtr ||
            this.position == 'after' && !isLtr) {
            return { overlayX: 'end', overlayY: 'center' };
        }
        if (this.position == 'right' ||
            this.position == 'after' && isLtr ||
            this.position == 'before' && !isLtr) {
            return { overlayX: 'start', overlayY: 'center' };
        }
        throw new Md2TooltipInvalidPositionError(this.position);
    };
    /** Updates the tooltip message and repositions the overlay according to the new message length */
    Md2Tooltip.prototype._setTooltipMessage = function (message) {
        var _this = this;
        // Must wait for the message to be painted to the tooltip so that the overlay can properly
        // calculate the correct positioning based on the size of the text.
        this._tooltipInstance.message = message;
        this._ngZone.onMicrotaskEmpty.first().subscribe(function () {
            if (_this._tooltipInstance) {
                _this._overlayRef.updatePosition();
            }
        });
    };
    __decorate([
        Input('tooltip-position'), 
        __metadata('design:type', String)
    ], Md2Tooltip.prototype, "position", null);
    __decorate([
        Input('tooltip-delay'), 
        __metadata('design:type', Object)
    ], Md2Tooltip.prototype, "showDelay", void 0);
    __decorate([
        Input('tooltip-hide-delay'), 
        __metadata('design:type', Object)
    ], Md2Tooltip.prototype, "hideDelay", void 0);
    __decorate([
        Input('tooltip'), 
        __metadata('design:type', Object)
    ], Md2Tooltip.prototype, "message", null);
    Md2Tooltip = __decorate([
        Directive({
            selector: '[tooltip]',
            host: {
                '(longpress)': 'show()',
                '(touchend)': 'hide(' + TOUCHEND_HIDE_DELAY + ')',
                '(mouseenter)': 'show()',
                '(mouseleave)': 'hide()',
            },
            exportAs: 'md2Tooltip',
        }),
        __param(5, Optional()), 
        __metadata('design:paramtypes', [Overlay, ScrollDispatcher, ElementRef, ViewContainerRef, NgZone, Dir])
    ], Md2Tooltip);
    return Md2Tooltip;
}());
/**
 * Internal component that wraps the tooltip's content.
 * @docs-private
 */
export var Md2TooltipComponent = (function () {
    function Md2TooltipComponent(_dir, _changeDetectorRef) {
        this._dir = _dir;
        this._changeDetectorRef = _changeDetectorRef;
        /** Property watched by the animation framework to show or hide the tooltip */
        this._visibility = 'initial';
        /** Whether interactions on the page should close the tooltip */
        this._closeOnInteraction = false;
        /** The transform origin used in the animation for showing and hiding the tooltip */
        this._transformOrigin = 'bottom';
        /** Subject for notifying that the tooltip has been hidden from the view */
        this._onHide = new Subject();
    }
    /**
     * Shows the tooltip with an animation originating from the provided origin
     * @param position Position of the tooltip.
     * @param delay Amount of milliseconds to the delay showing the tooltip.
     */
    Md2TooltipComponent.prototype.show = function (position, delay) {
        var _this = this;
        // Cancel the delayed hide if it is scheduled
        if (this._hideTimeoutId) {
            clearTimeout(this._hideTimeoutId);
        }
        // Body interactions should cancel the tooltip if there is a delay in showing.
        this._closeOnInteraction = true;
        this._setTransformOrigin(position);
        this._showTimeoutId = setTimeout(function () {
            _this._visibility = 'visible';
            // If this was set to true immediately, then a body click that triggers show() would
            // trigger interaction and close the tooltip right after it was displayed.
            _this._closeOnInteraction = false;
            // Mark for check so if any parent component has set the
            // ChangeDetectionStrategy to OnPush it will be checked anyways
            _this._changeDetectorRef.markForCheck();
            setTimeout(function () { _this._closeOnInteraction = true; }, 0);
        }, delay);
    };
    /**
     * Begins the animation to hide the tooltip after the provided delay in ms.
     * @param delay Amount of milliseconds to delay showing the tooltip.
     */
    Md2TooltipComponent.prototype.hide = function (delay) {
        var _this = this;
        // Cancel the delayed show if it is scheduled
        if (this._showTimeoutId) {
            clearTimeout(this._showTimeoutId);
        }
        this._hideTimeoutId = setTimeout(function () {
            _this._visibility = 'hidden';
            _this._closeOnInteraction = false;
            // Mark for check so if any parent component has set the
            // ChangeDetectionStrategy to OnPush it will be checked anyways
            _this._changeDetectorRef.markForCheck();
        }, delay);
    };
    /**
     * Returns an observable that notifies when the tooltip has been hidden from view
     */
    Md2TooltipComponent.prototype.afterHidden = function () {
        return this._onHide.asObservable();
    };
    /**
     * Whether the tooltip is being displayed
     */
    Md2TooltipComponent.prototype.isVisible = function () {
        return this._visibility === 'visible';
    };
    /** Sets the tooltip transform origin according to the tooltip position */
    Md2TooltipComponent.prototype._setTransformOrigin = function (value) {
        var isLtr = !this._dir || this._dir.value == 'ltr';
        switch (value) {
            case 'before':
                this._transformOrigin = isLtr ? 'right' : 'left';
                break;
            case 'after':
                this._transformOrigin = isLtr ? 'left' : 'right';
                break;
            case 'left':
                this._transformOrigin = 'right';
                break;
            case 'right':
                this._transformOrigin = 'left';
                break;
            case 'above':
                this._transformOrigin = 'bottom';
                break;
            case 'below':
                this._transformOrigin = 'top';
                break;
            default: throw new Md2TooltipInvalidPositionError(value);
        }
    };
    Md2TooltipComponent.prototype._afterVisibilityAnimation = function (e) {
        if (e.toState === 'hidden' && !this.isVisible()) {
            this._onHide.next();
        }
    };
    /**
     * Interactions on the HTML body should close the tooltip immediately as defined in the
     * material design spec.
     * https://material.google.com/components/tooltips.html#tooltips-interaction
     */
    Md2TooltipComponent.prototype._handleBodyInteraction = function () {
        if (this._closeOnInteraction) {
            this.hide(0);
        }
    };
    Md2TooltipComponent = __decorate([
        Component({selector: 'md2-tooltip',
            template: "<div class=\"md2-tooltip\" [style.transform-origin]=\"_transformOrigin\" [@state]=\"_visibility\" (@state.done)=\"_afterVisibilityAnimation($event)\" [innerHTML]=\"message\"> </div>",
            styles: ["md2-tooltip { pointer-events: none; } .md2-tooltip { color: white; padding: 6px 8px; border-radius: 2px; font-size: 10px; margin: 14px; max-width: 250px; background: rgba(97, 97, 97, 0.9); } .cdk-overlay-container, .cdk-global-overlay-wrapper { pointer-events: none; top: 0; left: 0; height: 100%; width: 100%; } .cdk-overlay-container { position: fixed; z-index: 1000; } .cdk-global-overlay-wrapper { display: flex; position: absolute; z-index: 1000; } .cdk-overlay-pane { position: absolute; pointer-events: auto; box-sizing: border-box; z-index: 1000; } /*# sourceMappingURL=tooltip.css.map */ "],
            animations: [
                trigger('state', [
                    state('void', style({ transform: 'scale(0)' })),
                    state('initial', style({ transform: 'scale(0)' })),
                    state('visible', style({ transform: 'scale(1)' })),
                    state('hidden', style({ transform: 'scale(0)' })),
                    transition('* => visible', animate('150ms cubic-bezier(0.0, 0.0, 0.2, 1)')),
                    transition('* => hidden', animate('150ms cubic-bezier(0.4, 0.0, 1, 1)')),
                ])
            ],
            host: {
                '(body:click)': 'this._handleBodyInteraction()'
            },
            encapsulation: ViewEncapsulation.None
        }),
        __param(0, Optional()), 
        __metadata('design:paramtypes', [Dir, ChangeDetectorRef])
    ], Md2TooltipComponent);
    return Md2TooltipComponent;
}());
export var Md2TooltipModule = (function () {
    function Md2TooltipModule() {
    }
    /** @deprecated */
    Md2TooltipModule.forRoot = function () {
        return {
            ngModule: Md2TooltipModule,
            providers: []
        };
    };
    Md2TooltipModule = __decorate([
        NgModule({
            imports: [OverlayModule, CompatibilityModule],
            exports: [Md2Tooltip, Md2TooltipComponent, CompatibilityModule],
            declarations: [Md2Tooltip, Md2TooltipComponent],
            entryComponents: [Md2TooltipComponent],
        }), 
        __metadata('design:paramtypes', [])
    ], Md2TooltipModule);
    return Md2TooltipModule;
}());
//# sourceMappingURL=tooltip.js.map