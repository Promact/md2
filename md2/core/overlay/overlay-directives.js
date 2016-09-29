var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", '@angular/core', './overlay', '../portal/portal', './overlay-state', './position/connected-position', '../portal/portal-directives'], factory);
    }
})(function (require, exports) {
    "use strict";
    var core_1 = require('@angular/core');
    var overlay_1 = require('./overlay');
    var portal_1 = require('../portal/portal');
    var overlay_state_1 = require('./overlay-state');
    var connected_position_1 = require('./position/connected-position');
    var portal_directives_1 = require('../portal/portal-directives');
    /** Default set of positions for the overlay. Follows the behavior of a dropdown. */
    var defaultPositionList = [
        new connected_position_1.ConnectionPositionPair({ originX: 'start', originY: 'bottom' }, { overlayX: 'start', overlayY: 'top' }),
        new connected_position_1.ConnectionPositionPair({ originX: 'start', originY: 'top' }, { overlayX: 'start', overlayY: 'bottom' }),
    ];
    /**
     * Directive applied to an element to make it usable as an origin for an Overlay using a
     * ConnectedPositionStrategy.
     */
    var OverlayOrigin = (function () {
        function OverlayOrigin(_elementRef) {
            this._elementRef = _elementRef;
        }
        Object.defineProperty(OverlayOrigin.prototype, "elementRef", {
            get: function () {
                return this._elementRef;
            },
            enumerable: true,
            configurable: true
        });
        OverlayOrigin = __decorate([
            core_1.Directive({
                selector: '[overlay-origin]',
                exportAs: 'overlayOrigin',
            }), 
            __metadata('design:paramtypes', [core_1.ElementRef])
        ], OverlayOrigin);
        return OverlayOrigin;
    }());
    exports.OverlayOrigin = OverlayOrigin;
    /**
     * Directive to facilitate declarative creation of an Overlay using a ConnectedPositionStrategy.
     */
    var ConnectedOverlayDirective = (function () {
        // TODO(jelbourn): inputs for size, scroll behavior, animation, etc.
        function ConnectedOverlayDirective(_overlay, templateRef, viewContainerRef) {
            this._overlay = _overlay;
            this._templatePortal = new portal_1.TemplatePortal(templateRef, viewContainerRef);
        }
        Object.defineProperty(ConnectedOverlayDirective.prototype, "overlayRef", {
            get: function () {
                return this._overlayRef;
            },
            enumerable: true,
            configurable: true
        });
        /** TODO: internal */
        ConnectedOverlayDirective.prototype.ngOnInit = function () {
            this._createOverlay();
        };
        /** TODO: internal */
        ConnectedOverlayDirective.prototype.ngOnDestroy = function () {
            this._destroyOverlay();
        };
        /** Creates an overlay and attaches this directive's template to it. */
        ConnectedOverlayDirective.prototype._createOverlay = function () {
            if (!this.positions || !this.positions.length) {
                this.positions = defaultPositionList;
            }
            var overlayConfig = new overlay_state_1.OverlayState();
            overlayConfig.positionStrategy =
                this._overlay.position().connectedTo(this.origin.elementRef, { originX: this.positions[0].overlayX, originY: this.positions[0].originY }, { overlayX: this.positions[0].overlayX, overlayY: this.positions[0].overlayY });
            this._overlayRef = this._overlay.create(overlayConfig);
            this._overlayRef.attach(this._templatePortal);
        };
        /** Destroys the overlay created by this directive. */
        ConnectedOverlayDirective.prototype._destroyOverlay = function () {
            this._overlayRef.dispose();
        };
        __decorate([
            core_1.Input(), 
            __metadata('design:type', OverlayOrigin)
        ], ConnectedOverlayDirective.prototype, "origin", void 0);
        __decorate([
            core_1.Input(), 
            __metadata('design:type', Array)
        ], ConnectedOverlayDirective.prototype, "positions", void 0);
        ConnectedOverlayDirective = __decorate([
            core_1.Directive({
                selector: '[connected-overlay]'
            }), 
            __metadata('design:paramtypes', [overlay_1.Overlay, core_1.TemplateRef, core_1.ViewContainerRef])
        ], ConnectedOverlayDirective);
        return ConnectedOverlayDirective;
    }());
    exports.ConnectedOverlayDirective = ConnectedOverlayDirective;
    var OverlayModule = (function () {
        function OverlayModule() {
        }
        OverlayModule.forRoot = function () {
            return {
                ngModule: OverlayModule,
                providers: overlay_1.OVERLAY_PROVIDERS,
            };
        };
        OverlayModule = __decorate([
            core_1.NgModule({
                imports: [portal_directives_1.PortalModule],
                exports: [ConnectedOverlayDirective, OverlayOrigin],
                declarations: [ConnectedOverlayDirective, OverlayOrigin],
            }), 
            __metadata('design:paramtypes', [])
        ], OverlayModule);
        return OverlayModule;
    }());
    exports.OverlayModule = OverlayModule;
});

//# sourceMappingURL=overlay-directives.js.map
