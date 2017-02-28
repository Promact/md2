var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { NgModule, Directive, ElementRef, Input, NgZone } from '@angular/core';
import { RippleRenderer } from './ripple-renderer';
import { CompatibilityModule } from '../compatibility/compatibility';
import { ViewportRuler, VIEWPORT_RULER_PROVIDER } from '../overlay/position/viewport-ruler';
import { SCROLL_DISPATCHER_PROVIDER } from '../overlay/scroll/scroll-dispatcher';
export var MdRipple = (function () {
    function MdRipple(elementRef, ngZone, ruler) {
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
        this._rippleRenderer = new RippleRenderer(elementRef, ngZone, ruler);
    }
    MdRipple.prototype.ngOnChanges = function (changes) {
        if (changes['trigger'] && this.trigger) {
            this._rippleRenderer.setTriggerElement(this.trigger);
        }
        this._rippleRenderer.rippleDisabled = this.disabled;
        this._rippleRenderer.rippleConfig = this.rippleConfig;
    };
    MdRipple.prototype.ngOnDestroy = function () {
        // Set the trigger element to null to cleanup all listeners.
        this._rippleRenderer.setTriggerElement(null);
    };
    /** Launches a manual ripple at the specified position. */
    MdRipple.prototype.launch = function (pageX, pageY, config) {
        if (config === void 0) { config = this.rippleConfig; }
        this._rippleRenderer.fadeInRipple(pageX, pageY, config);
    };
    Object.defineProperty(MdRipple.prototype, "rippleConfig", {
        /** Ripple configuration from the directive's input values. */
        get: function () {
            return {
                centered: this.centered,
                speedFactor: this.speedFactor,
                radius: this.radius,
                color: this.color
            };
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        Input('mdRippleTrigger'), 
        __metadata('design:type', Object)
    ], MdRipple.prototype, "trigger", void 0);
    __decorate([
        Input('mdRippleCentered'), 
        __metadata('design:type', Boolean)
    ], MdRipple.prototype, "centered", void 0);
    __decorate([
        Input('mdRippleDisabled'), 
        __metadata('design:type', Boolean)
    ], MdRipple.prototype, "disabled", void 0);
    __decorate([
        Input('mdRippleRadius'), 
        __metadata('design:type', Number)
    ], MdRipple.prototype, "radius", void 0);
    __decorate([
        Input('mdRippleSpeedFactor'), 
        __metadata('design:type', Number)
    ], MdRipple.prototype, "speedFactor", void 0);
    __decorate([
        Input('mdRippleColor'), 
        __metadata('design:type', String)
    ], MdRipple.prototype, "color", void 0);
    __decorate([
        Input('mdRippleUnbounded'), 
        __metadata('design:type', Boolean)
    ], MdRipple.prototype, "unbounded", void 0);
    MdRipple = __decorate([
        Directive({
            selector: '[md-ripple], [mat-ripple]',
            exportAs: 'mdRipple',
            host: {
                '[class.mat-ripple]': 'true',
                '[class.mat-ripple-unbounded]': 'unbounded'
            }
        }), 
        __metadata('design:paramtypes', [ElementRef, NgZone, ViewportRuler])
    ], MdRipple);
    return MdRipple;
}());
export var MdRippleModule = (function () {
    function MdRippleModule() {
    }
    /** @deprecated */
    MdRippleModule.forRoot = function () {
        return {
            ngModule: MdRippleModule,
            providers: []
        };
    };
    MdRippleModule = __decorate([
        NgModule({
            imports: [CompatibilityModule],
            exports: [MdRipple, CompatibilityModule],
            declarations: [MdRipple],
            providers: [VIEWPORT_RULER_PROVIDER, SCROLL_DISPATCHER_PROVIDER],
        }), 
        __metadata('design:paramtypes', [])
    ], MdRippleModule);
    return MdRippleModule;
}());
//# sourceMappingURL=ripple.js.map