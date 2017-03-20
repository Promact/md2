var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { NgModule } from '@angular/core';
import { MdLineModule } from './line/line';
import { RtlModule } from './rtl/dir';
import { ObserveContentModule } from './observe-content/observe-content';
import { MdOptionModule } from './option/option';
import { PortalModule } from './portal/portal-directives';
import { OverlayModule } from './overlay/overlay-directives';
import { A11yModule } from './a11y/index';
import { MdSelectionModule } from './selection/index';
import { MdRippleModule } from './ripple/index';
// RTL
export { Dir, RtlModule } from './rtl/dir';
// Mutation Observer
export { ObserveContentModule, ObserveContent } from './observe-content/observe-content';
export { MdOptionModule, MdOption } from './option/option';
// Portals
export { Portal, BasePortalHost, ComponentPortal, TemplatePortal } from './portal/portal';
export { PortalHostDirective, TemplatePortalDirective, PortalModule } from './portal/portal-directives';
export { DomPortalHost } from './portal/dom-portal-host';
// Projection
export * from './projection/projection';
// Platform
export * from './platform/index';
/** @deprecated */
export { Platform as MdPlatform } from './platform/platform';
// Overlay
export { Overlay, OVERLAY_PROVIDERS } from './overlay/overlay';
export { OverlayContainer } from './overlay/overlay-container';
export { FullscreenOverlayContainer } from './overlay/fullscreen-overlay-container';
export { OverlayRef } from './overlay/overlay-ref';
export { OverlayState } from './overlay/overlay-state';
export { ConnectedOverlayDirective, OverlayOrigin, OverlayModule } from './overlay/overlay-directives';
export * from './overlay/position/connected-position-strategy';
export * from './overlay/position/connected-position';
export { ScrollDispatcher } from './overlay/scroll/scroll-dispatcher';
// Gestures
export { GestureConfig } from './gestures/gesture-config';
// Explicitly specify the interfaces which should be re-exported, because if everything
// is re-exported, module bundlers may run into issues with treeshaking.
// Ripple
export * from './ripple/index';
// a11y
export { LiveAnnouncer, LIVE_ANNOUNCER_ELEMENT_TOKEN, LIVE_ANNOUNCER_PROVIDER } from './a11y/live-announcer';
// Selection
export * from './selection/selection';
/** @deprecated */
export { LiveAnnouncer as MdLiveAnnouncer } from './a11y/live-announcer';
export * from './a11y/focus-trap';
export { InteractivityChecker } from './a11y/interactivity-checker';
export { isFakeMousedownFromScreenReader } from './a11y/fake-mousedown';
export { A11yModule } from './a11y/index';
export { UniqueSelectionDispatcher, UNIQUE_SELECTION_DISPATCHER_PROVIDER } from './coordination/unique-selection-dispatcher';
/** @deprecated */
export { UniqueSelectionDispatcher as MdUniqueSelectionDispatcher } from './coordination/unique-selection-dispatcher';
export { MdLineModule, MdLine, MdLineSetter } from './line/line';
// Style
export * from './style/index';
// Error
export { MdError } from './errors/error';
// Misc
// Keybindings
export * from './keyboard/keycodes';
export * from './compatibility/compatibility';
// Animation
export * from './animation/animation';
// Selection
export * from './selection/index';
// Coercion
export { coerceBooleanProperty } from './coercion/boolean-property';
export { coerceNumberProperty } from './coercion/number-property';
// Compatibility
export { CompatibilityModule, NoConflictStyleCompatibilityMode } from './compatibility/compatibility';
export var MdCoreModule = (function () {
    function MdCoreModule() {
    }
    /** @deprecated */
    MdCoreModule.forRoot = function () {
        return {
            ngModule: MdCoreModule,
            providers: [],
        };
    };
    MdCoreModule = __decorate([
        NgModule({
            imports: [
                MdLineModule,
                RtlModule,
                MdRippleModule,
                ObserveContentModule,
                PortalModule,
                OverlayModule,
                A11yModule,
                MdOptionModule,
                MdSelectionModule,
            ],
            exports: [
                MdLineModule,
                RtlModule,
                MdRippleModule,
                ObserveContentModule,
                PortalModule,
                OverlayModule,
                A11yModule,
                MdOptionModule,
                MdSelectionModule,
            ],
        }), 
        __metadata('design:paramtypes', [])
    ], MdCoreModule);
    return MdCoreModule;
}());
//# sourceMappingURL=core.js.map