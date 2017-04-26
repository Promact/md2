var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
export { PortalHostDirective, TemplatePortalDirective, PortalModule, } from './portal/portal-directives';
export { DomPortalHost } from './portal/dom-portal-host';
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
export { ConnectedOverlayDirective, OverlayOrigin, OverlayModule, } from './overlay/overlay-directives';
export * from './overlay/position/connected-position-strategy';
export * from './overlay/position/connected-position';
export { ScrollDispatcher } from './overlay/scroll/scroll-dispatcher';
// Gestures
export { GestureConfig } from './gestures/gesture-config';
// Ripple
export * from './ripple/index';
// a11y
export { LiveAnnouncer, LIVE_ANNOUNCER_ELEMENT_TOKEN, LIVE_ANNOUNCER_PROVIDER, } from './a11y/live-announcer';
// Selection
export * from './selection/selection';
/** @deprecated */
export { LiveAnnouncer as MdLiveAnnouncer } from './a11y/live-announcer';
export * from './a11y/focus-trap';
export { InteractivityChecker } from './a11y/interactivity-checker';
export { isFakeMousedownFromScreenReader } from './a11y/fake-mousedown';
export { A11yModule } from './a11y/index';
export { UniqueSelectionDispatcher, UNIQUE_SELECTION_DISPATCHER_PROVIDER, } from './coordination/unique-selection-dispatcher';
/** @deprecated */
export { UniqueSelectionDispatcher as MdUniqueSelectionDispatcher } from './coordination/unique-selection-dispatcher';
export { MdLineModule, MdLine, MdLineSetter } from './line/line';
// Style
export * from './style/index';
// Error
export { MdError } from './errors/error';
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
var MdCoreModule = MdCoreModule_1 = (function () {
    function MdCoreModule() {
    }
    /** @deprecated */
    MdCoreModule.forRoot = function () {
        return {
            ngModule: MdCoreModule_1,
            providers: [],
        };
    };
    return MdCoreModule;
}());
MdCoreModule = MdCoreModule_1 = __decorate([
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
    })
], MdCoreModule);
export { MdCoreModule };
var MdCoreModule_1;
//# sourceMappingURL=core.js.map