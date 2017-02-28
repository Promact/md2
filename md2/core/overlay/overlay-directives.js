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
import { NgModule, Directive, EventEmitter, TemplateRef, ViewContainerRef, Optional, Input, Output, ElementRef } from '@angular/core';
import { Overlay, OVERLAY_PROVIDERS } from './overlay';
import { TemplatePortal } from '../portal/portal';
import { OverlayState } from './overlay-state';
import { ConnectionPositionPair } from './position/connected-position';
import { PortalModule } from '../portal/portal-directives';
import { Dir } from '../rtl/dir';
import { Scrollable } from './scroll/scrollable';
import { coerceBooleanProperty } from '../coercion/boolean-property';
/** Default set of positions for the overlay. Follows the behavior of a dropdown. */
var defaultPositionList = [
    new ConnectionPositionPair({ originX: 'start', originY: 'bottom' }, { overlayX: 'start', overlayY: 'top' }),
    new ConnectionPositionPair({ originX: 'start', originY: 'top' }, { overlayX: 'start', overlayY: 'bottom' }),
];
/**
 * Directive applied to an element to make it usable as an origin for an Overlay using a
 * ConnectedPositionStrategy.
 */
export var OverlayOrigin = (function () {
    function OverlayOrigin(elementRef) {
        this.elementRef = elementRef;
    }
    OverlayOrigin = __decorate([
        Directive({
            selector: '[cdk-overlay-origin], [overlay-origin]',
            exportAs: 'cdkOverlayOrigin',
        }), 
        __metadata('design:paramtypes', [ElementRef])
    ], OverlayOrigin);
    return OverlayOrigin;
}());
/**
 * Directive to facilitate declarative creation of an Overlay using a ConnectedPositionStrategy.
 */
export var ConnectedOverlayDirective = (function () {
    // TODO(jelbourn): inputs for size, scroll behavior, animation, etc.
    function ConnectedOverlayDirective(_overlay, templateRef, viewContainerRef, _dir) {
        this._overlay = _overlay;
        this._dir = _dir;
        this._open = false;
        this._hasBackdrop = false;
        this._offsetX = 0;
        this._offsetY = 0;
        /** Event emitted when the backdrop is clicked. */
        this.backdropClick = new EventEmitter();
        /** Event emitted when the position has changed. */
        this.positionChange = new EventEmitter();
        /** Event emitted when the overlay has been attached. */
        this.attach = new EventEmitter();
        /** Event emitted when the overlay has been detached. */
        this.detach = new EventEmitter();
        this._templatePortal = new TemplatePortal(templateRef, viewContainerRef);
    }
    Object.defineProperty(ConnectedOverlayDirective.prototype, "offsetX", {
        /** The offset in pixels for the overlay connection point on the x-axis */
        get: function () {
            return this._offsetX;
        },
        set: function (offsetX) {
            this._offsetX = offsetX;
            if (this._position) {
                this._position.withOffsetX(offsetX);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConnectedOverlayDirective.prototype, "offsetY", {
        /** The offset in pixels for the overlay connection point on the y-axis */
        get: function () {
            return this._offsetY;
        },
        set: function (offsetY) {
            this._offsetY = offsetY;
            if (this._position) {
                this._position.withOffsetY(offsetY);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConnectedOverlayDirective.prototype, "hasBackdrop", {
        /** Whether or not the overlay should attach a backdrop. */
        get: function () {
            return this._hasBackdrop;
        },
        set: function (value) {
            this._hasBackdrop = coerceBooleanProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConnectedOverlayDirective.prototype, "open", {
        get: function () {
            return this._open;
        },
        set: function (value) {
            value ? this._attachOverlay() : this._detachOverlay();
            this._open = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConnectedOverlayDirective.prototype, "overlayRef", {
        /** The associated overlay reference. */
        get: function () {
            return this._overlayRef;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConnectedOverlayDirective.prototype, "dir", {
        /** The element's layout direction. */
        get: function () {
            return this._dir ? this._dir.value : 'ltr';
        },
        enumerable: true,
        configurable: true
    });
    ConnectedOverlayDirective.prototype.ngOnDestroy = function () {
        this._destroyOverlay();
    };
    /** Creates an overlay */
    ConnectedOverlayDirective.prototype._createOverlay = function () {
        if (!this.positions || !this.positions.length) {
            this.positions = defaultPositionList;
        }
        this._overlayRef = this._overlay.create(this._buildConfig());
    };
    /** Builds the overlay config based on the directive's inputs */
    ConnectedOverlayDirective.prototype._buildConfig = function () {
        var overlayConfig = new OverlayState();
        if (this.width || this.width === 0) {
            overlayConfig.width = this.width;
        }
        if (this.height || this.height === 0) {
            overlayConfig.height = this.height;
        }
        if (this.minWidth || this.minWidth === 0) {
            overlayConfig.minWidth = this.minWidth;
        }
        if (this.minHeight || this.minHeight === 0) {
            overlayConfig.minHeight = this.minHeight;
        }
        overlayConfig.hasBackdrop = this.hasBackdrop;
        if (this.backdropClass) {
            overlayConfig.backdropClass = this.backdropClass;
        }
        this._position = this._createPositionStrategy();
        overlayConfig.positionStrategy = this._position;
        return overlayConfig;
    };
    /** Returns the position strategy of the overlay to be set on the overlay config */
    ConnectedOverlayDirective.prototype._createPositionStrategy = function () {
        var pos = this.positions[0];
        var originPoint = { originX: pos.originX, originY: pos.originY };
        var overlayPoint = { overlayX: pos.overlayX, overlayY: pos.overlayY };
        var strategy = this._overlay.position()
            .connectedTo(this.origin.elementRef, originPoint, overlayPoint)
            .withOffsetX(this.offsetX)
            .withOffsetY(this.offsetY);
        this._handlePositionChanges(strategy);
        return strategy;
    };
    ConnectedOverlayDirective.prototype._handlePositionChanges = function (strategy) {
        var _this = this;
        for (var i = 1; i < this.positions.length; i++) {
            strategy.withFallbackPosition({ originX: this.positions[i].originX, originY: this.positions[i].originY }, { overlayX: this.positions[i].overlayX, overlayY: this.positions[i].overlayY });
        }
        this._positionSubscription =
            strategy.onPositionChange.subscribe(function (pos) { return _this.positionChange.emit(pos); });
    };
    /** Attaches the overlay and subscribes to backdrop clicks if backdrop exists */
    ConnectedOverlayDirective.prototype._attachOverlay = function () {
        var _this = this;
        if (!this._overlayRef) {
            this._createOverlay();
        }
        this._position.withDirection(this.dir);
        this._overlayRef.getState().direction = this.dir;
        if (!this._overlayRef.hasAttached()) {
            this._overlayRef.attach(this._templatePortal);
            this.attach.emit();
        }
        if (this.hasBackdrop) {
            this._backdropSubscription = this._overlayRef.backdropClick().subscribe(function () {
                _this.backdropClick.emit();
            });
        }
    };
    /** Detaches the overlay and unsubscribes to backdrop clicks if backdrop exists */
    ConnectedOverlayDirective.prototype._detachOverlay = function () {
        if (this._overlayRef) {
            this._overlayRef.detach();
            this.detach.emit();
        }
        if (this._backdropSubscription) {
            this._backdropSubscription.unsubscribe();
            this._backdropSubscription = null;
        }
    };
    /** Destroys the overlay created by this directive. */
    ConnectedOverlayDirective.prototype._destroyOverlay = function () {
        if (this._overlayRef) {
            this._overlayRef.dispose();
        }
        if (this._backdropSubscription) {
            this._backdropSubscription.unsubscribe();
        }
        if (this._positionSubscription) {
            this._positionSubscription.unsubscribe();
        }
    };
    __decorate([
        Input(), 
        __metadata('design:type', OverlayOrigin)
    ], ConnectedOverlayDirective.prototype, "origin", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Array)
    ], ConnectedOverlayDirective.prototype, "positions", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Number)
    ], ConnectedOverlayDirective.prototype, "offsetX", null);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], ConnectedOverlayDirective.prototype, "offsetY", null);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], ConnectedOverlayDirective.prototype, "width", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], ConnectedOverlayDirective.prototype, "height", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], ConnectedOverlayDirective.prototype, "minWidth", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], ConnectedOverlayDirective.prototype, "minHeight", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', String)
    ], ConnectedOverlayDirective.prototype, "backdropClass", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], ConnectedOverlayDirective.prototype, "hasBackdrop", null);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], ConnectedOverlayDirective.prototype, "open", null);
    __decorate([
        Output(), 
        __metadata('design:type', Object)
    ], ConnectedOverlayDirective.prototype, "backdropClick", void 0);
    __decorate([
        Output(), 
        __metadata('design:type', Object)
    ], ConnectedOverlayDirective.prototype, "positionChange", void 0);
    __decorate([
        Output(), 
        __metadata('design:type', Object)
    ], ConnectedOverlayDirective.prototype, "attach", void 0);
    __decorate([
        Output(), 
        __metadata('design:type', Object)
    ], ConnectedOverlayDirective.prototype, "detach", void 0);
    ConnectedOverlayDirective = __decorate([
        Directive({
            selector: '[cdk-connected-overlay], [connected-overlay]',
            exportAs: 'cdkConnectedOverlay'
        }),
        __param(3, Optional()), 
        __metadata('design:paramtypes', [Overlay, TemplateRef, ViewContainerRef, Dir])
    ], ConnectedOverlayDirective);
    return ConnectedOverlayDirective;
}());
export var OverlayModule = (function () {
    function OverlayModule() {
    }
    /** @deprecated */
    OverlayModule.forRoot = function () {
        return {
            ngModule: OverlayModule,
            providers: [],
        };
    };
    OverlayModule = __decorate([
        NgModule({
            imports: [PortalModule],
            exports: [ConnectedOverlayDirective, OverlayOrigin, Scrollable],
            declarations: [ConnectedOverlayDirective, OverlayOrigin, Scrollable],
            providers: [OVERLAY_PROVIDERS],
        }), 
        __metadata('design:paramtypes', [])
    ], OverlayModule);
    return OverlayModule;
}());
//# sourceMappingURL=overlay-directives.js.map