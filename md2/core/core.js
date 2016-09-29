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
        define(["require", "exports", '@angular/core', './portal/portal-directives', './overlay/overlay-directives', './portal/portal', './portal/portal-directives', './portal/dom-portal-host', './overlay/overlay', './overlay/overlay-container', './overlay/overlay-ref', './overlay/overlay-state', './overlay/overlay-directives', './overlay/position/connected-position-strategy', './overlay/position/connected-position', './coordination/unique-selection-dispatcher', './style/apply-transform', './errors/error', './keyboard/keycodes'], factory);
    }
})(function (require, exports) {
    "use strict";
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    var core_1 = require('@angular/core');
    //import {MdLineModule} from './line/line';
    //import {RtlModule} from './rtl/dir';
    //import {MdRippleModule} from './ripple/ripple';
    var portal_directives_1 = require('./portal/portal-directives');
    var overlay_directives_1 = require('./overlay/overlay-directives');
    //import {MdLiveAnnouncer} from './a11y/live-announcer';
    // RTL
    //export {Dir, LayoutDirection, RtlModule} from './rtl/dir';
    // Portals
    var portal_1 = require('./portal/portal');
    exports.Portal = portal_1.Portal;
    exports.BasePortalHost = portal_1.BasePortalHost;
    exports.ComponentPortal = portal_1.ComponentPortal;
    exports.TemplatePortal = portal_1.TemplatePortal;
    var portal_directives_2 = require('./portal/portal-directives');
    exports.PortalHostDirective = portal_directives_2.PortalHostDirective;
    exports.TemplatePortalDirective = portal_directives_2.TemplatePortalDirective;
    exports.PortalModule = portal_directives_2.PortalModule;
    var dom_portal_host_1 = require('./portal/dom-portal-host');
    exports.DomPortalHost = dom_portal_host_1.DomPortalHost;
    // Overlay
    var overlay_1 = require('./overlay/overlay');
    exports.Overlay = overlay_1.Overlay;
    exports.OVERLAY_PROVIDERS = overlay_1.OVERLAY_PROVIDERS;
    var overlay_container_1 = require('./overlay/overlay-container');
    exports.OverlayContainer = overlay_container_1.OverlayContainer;
    var overlay_ref_1 = require('./overlay/overlay-ref');
    exports.OverlayRef = overlay_ref_1.OverlayRef;
    var overlay_state_1 = require('./overlay/overlay-state');
    exports.OverlayState = overlay_state_1.OverlayState;
    var overlay_directives_2 = require('./overlay/overlay-directives');
    exports.ConnectedOverlayDirective = overlay_directives_2.ConnectedOverlayDirective;
    exports.OverlayOrigin = overlay_directives_2.OverlayOrigin;
    exports.OverlayModule = overlay_directives_2.OverlayModule;
    __export(require('./overlay/position/connected-position-strategy'));
    __export(require('./overlay/position/connected-position'));
    // Gestures
    //export {MdGestureConfig} from './gestures/MdGestureConfig';
    // Ripple
    //export {MdRipple, MdRippleModule} from './ripple/ripple';
    // a11y
    //export {
    //  AriaLivePoliteness,
    //  MdLiveAnnouncer,
    //  LIVE_ANNOUNCER_ELEMENT_TOKEN,
    //} from './a11y/live-announcer';
    var unique_selection_dispatcher_1 = require('./coordination/unique-selection-dispatcher');
    exports.MdUniqueSelectionDispatcher = unique_selection_dispatcher_1.MdUniqueSelectionDispatcher;
    //export {MdLineModule, MdLine, MdLineSetter} from './line/line';
    // Style
    var apply_transform_1 = require('./style/apply-transform');
    exports.applyCssTransform = apply_transform_1.applyCssTransform;
    // Error
    var error_1 = require('./errors/error');
    exports.MdError = error_1.MdError;
    // Annotations.
    //export {BooleanFieldValue} from './annotations/field-value';
    // Misc
    // Keybindings
    __export(require('./keyboard/keycodes'));
    var MdCoreModule = (function () {
        function MdCoreModule() {
        }
        MdCoreModule.forRoot = function () {
            return {
                ngModule: MdCoreModule,
                providers: [] //MdLiveAnnouncer
            };
        };
        MdCoreModule = __decorate([
            core_1.NgModule({
                imports: [portal_directives_1.PortalModule, overlay_directives_1.OverlayModule],
                exports: [portal_directives_1.PortalModule, overlay_directives_1.OverlayModule],
            }), 
            __metadata('design:paramtypes', [])
        ], MdCoreModule);
        return MdCoreModule;
    }());
    exports.MdCoreModule = MdCoreModule;
});

//# sourceMappingURL=core.js.map
