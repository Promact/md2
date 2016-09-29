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
        define(["require", "exports", '@angular/core', './overlay-state', '../portal/dom-portal-host', './overlay-ref', './position/overlay-position-builder', './position/viewport-ruler', './overlay-container'], factory);
    }
})(function (require, exports) {
    "use strict";
    var core_1 = require('@angular/core');
    var overlay_state_1 = require('./overlay-state');
    var dom_portal_host_1 = require('../portal/dom-portal-host');
    var overlay_ref_1 = require('./overlay-ref');
    var overlay_position_builder_1 = require('./position/overlay-position-builder');
    var viewport_ruler_1 = require('./position/viewport-ruler');
    var overlay_container_1 = require('./overlay-container');
    /** Next overlay unique ID. */
    var nextUniqueId = 0;
    /** The default state for newly created overlays. */
    var defaultState = new overlay_state_1.OverlayState();
    /**
     * Service to create Overlays. Overlays are dynamically added pieces of floating UI, meant to be
     * used as a low-level building building block for other components. Dialogs, tooltips, menus,
     * selects, etc. can all be built using overlays. The service should primarily be used by authors
     * of re-usable components rather than developers building end-user applications.
     *
     * An overlay *is* a PortalHost, so any kind of Portal can be loaded into one.
     */
    var Overlay = (function () {
        function Overlay(_overlayContainer, _componentFactoryResolver, _positionBuilder) {
            this._overlayContainer = _overlayContainer;
            this._componentFactoryResolver = _componentFactoryResolver;
            this._positionBuilder = _positionBuilder;
        }
        /**
         * Creates an overlay.
         * @param state State to apply to the overlay.
         * @returns A reference to the created overlay.
         */
        Overlay.prototype.create = function (state) {
            if (state === void 0) { state = defaultState; }
            return this._createOverlayRef(this._createPaneElement(), state);
        };
        /**
         * Returns a position builder that can be used, via fluent API,
         * to construct and configure a position strategy.
         */
        Overlay.prototype.position = function () {
            return this._positionBuilder;
        };
        /**
         * Creates the DOM element for an overlay and appends it to the overlay container.
         * @returns Promise resolving to the created element.
         */
        Overlay.prototype._createPaneElement = function () {
            var pane = document.createElement('div');
            pane.id = "md-overlay-" + nextUniqueId++;
            pane.classList.add('md-overlay-pane');
            this._overlayContainer.getContainerElement().appendChild(pane);
            return pane;
        };
        /**
         * Create a DomPortalHost into which the overlay content can be loaded.
         * @param pane The DOM element to turn into a portal host.
         * @returns A portal host for the given DOM element.
         */
        Overlay.prototype._createPortalHost = function (pane) {
            return new dom_portal_host_1.DomPortalHost(pane, this._componentFactoryResolver);
        };
        /**
         * Creates an OverlayRef for an overlay in the given DOM element.
         * @param pane DOM element for the overlay
         * @param state
         * @returns {OverlayRef}
         */
        Overlay.prototype._createOverlayRef = function (pane, state) {
            return new overlay_ref_1.OverlayRef(this._createPortalHost(pane), pane, state);
        };
        Overlay = __decorate([
            core_1.Injectable(), 
            __metadata('design:paramtypes', [overlay_container_1.OverlayContainer, core_1.ComponentFactoryResolver, overlay_position_builder_1.OverlayPositionBuilder])
        ], Overlay);
        return Overlay;
    }());
    exports.Overlay = Overlay;
    /** Providers for Overlay and its related injectables. */
    exports.OVERLAY_PROVIDERS = [
        viewport_ruler_1.ViewportRuler,
        overlay_position_builder_1.OverlayPositionBuilder,
        Overlay,
        overlay_container_1.OverlayContainer,
    ];
});

//# sourceMappingURL=overlay.js.map
