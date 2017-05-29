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
import { Directive, ElementRef, Input, Inject, NgZone, InjectionToken, Optional, } from '@angular/core';
import { RippleRenderer } from './ripple-renderer';
import { ViewportRuler } from '../overlay/position/viewport-ruler';
import { Platform } from '../platform/platform';
/** Injection token that can be used to specify the global ripple options. */
export var MD_RIPPLE_GLOBAL_OPTIONS = new InjectionToken('md-ripple-global-options');
var MdRipple = (function () {
    function MdRipple(elementRef, ngZone, ruler, platform, globalOptions) {
        /**
         * If set, the radius in pixels of foreground ripples when fully expanded. If unset, the radius
         * will be the distance from the center of the ripple to the furthest corner of the host element's
         * bounding rectangle.
         */
        this.radius = 0;
        /**
         * If set, the normal duration of ripple animations is divided by this value. For example,
         * setting it to 0.5 will cause the animations to take twice as long.
         * A changed speedFactor will not modify the fade-out duration of the ripples.
         */
        this.speedFactor = 1;
        this._rippleRenderer = new RippleRenderer(elementRef, ngZone, ruler, platform);
        this._globalOptions = globalOptions ? globalOptions : {};
        this._updateRippleRenderer();
    }
    MdRipple.prototype.ngOnChanges = function (changes) {
        if (changes['trigger'] && this.trigger) {
            this._rippleRenderer.setTriggerElement(this.trigger);
        }
        this._updateRippleRenderer();
    };
    MdRipple.prototype.ngOnDestroy = function () {
        // Set the trigger element to null to cleanup all listeners.
        this._rippleRenderer.setTriggerElement(null);
    };
    /** Launches a manual ripple at the specified position. */
    MdRipple.prototype.launch = function (pageX, pageY, config) {
        if (config === void 0) { config = this.rippleConfig; }
        return this._rippleRenderer.fadeInRipple(pageX, pageY, config);
    };
    /** Fades out all currently showing ripple elements. */
    MdRipple.prototype.fadeOutAll = function () {
        this._rippleRenderer.fadeOutAll();
    };
    Object.defineProperty(MdRipple.prototype, "rippleConfig", {
        /** Ripple configuration from the directive's input values. */
        get: function () {
            return {
                centered: this.centered,
                speedFactor: this.speedFactor * (this._globalOptions.baseSpeedFactor || 1),
                radius: this.radius,
                color: this.color
            };
        },
        enumerable: true,
        configurable: true
    });
    /** Updates the ripple renderer with the latest ripple configuration. */
    MdRipple.prototype._updateRippleRenderer = function () {
        this._rippleRenderer.rippleDisabled = this._globalOptions.disabled || this.disabled;
        this._rippleRenderer.rippleConfig = this.rippleConfig;
    };
    return MdRipple;
}());
__decorate([
    Input('mdRippleTrigger'),
    __metadata("design:type", HTMLElement)
], MdRipple.prototype, "trigger", void 0);
__decorate([
    Input('mdRippleCentered'),
    __metadata("design:type", Boolean)
], MdRipple.prototype, "centered", void 0);
__decorate([
    Input('mdRippleDisabled'),
    __metadata("design:type", Boolean)
], MdRipple.prototype, "disabled", void 0);
__decorate([
    Input('mdRippleRadius'),
    __metadata("design:type", Number)
], MdRipple.prototype, "radius", void 0);
__decorate([
    Input('mdRippleSpeedFactor'),
    __metadata("design:type", Number)
], MdRipple.prototype, "speedFactor", void 0);
__decorate([
    Input('mdRippleColor'),
    __metadata("design:type", String)
], MdRipple.prototype, "color", void 0);
__decorate([
    Input('mdRippleUnbounded'),
    __metadata("design:type", Boolean)
], MdRipple.prototype, "unbounded", void 0);
MdRipple = __decorate([
    Directive({
        selector: '[md-ripple], [mat-ripple], [mdRipple], [matRipple]',
        exportAs: 'mdRipple',
        host: {
            'class': 'mat-ripple',
            '[class.mat-ripple-unbounded]': 'unbounded'
        }
    }),
    __param(4, Optional()), __param(4, Inject(MD_RIPPLE_GLOBAL_OPTIONS)),
    __metadata("design:paramtypes", [ElementRef,
        NgZone,
        ViewportRuler,
        Platform, Object])
], MdRipple);
export { MdRipple };
//# sourceMappingURL=ripple.js.map