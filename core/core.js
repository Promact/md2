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
import { MdOptionModule } from './option/index';
import { PortalModule } from './portal/portal-directives';
import { OverlayModule } from './overlay/overlay-directives';
import { A11yModule } from './a11y/index';
import { MdSelectionModule } from './selection/index';
import { MdRippleModule } from './ripple/index';
// RTL
export { Dir, RtlModule } from './rtl/dir';
// Mutation Observer
export { ObserveContentModule, ObserveContent } from './observe-content/observe-content';
export * from './option/index';
// Portals
export { Portal, BasePortalHost, ComponentPortal, TemplatePortal } from './portal/portal';
export { PortalHostDirective, TemplatePortalDirective, PortalModule, } from './portal/portal-directives';
export { DomPortalHost } from './portal/dom-portal-host';
// Platform
export * from './platform/index';
// Overlay
export * from './overlay/index';
// Gestures
export { GestureConfig } from './gestures/gesture-config';
// Ripple
export * from './ripple/index';
// a11y
export { LiveAnnouncer, LIVE_ANNOUNCER_ELEMENT_TOKEN, LIVE_ANNOUNCER_PROVIDER, } from './a11y/live-announcer';
// Selection
export * from './selection/selection';
export * from './a11y/focus-trap';
export { InteractivityChecker } from './a11y/interactivity-checker';
export { isFakeMousedownFromScreenReader } from './a11y/fake-mousedown';
export { A11yModule } from './a11y/index';
export { UniqueSelectionDispatcher, UNIQUE_SELECTION_DISPATCHER_PROVIDER, } from './coordination/unique-selection-dispatcher';
export { MdLineModule, MdLine, MdLineSetter } from './line/line';
// Style
export * from './style/index';
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
// Common material module
export { MdCommonModule } from './common-behaviors/common-module';
// Datetime
export * from './datetime/index';
var MdCoreModule = (function () {
    function MdCoreModule() {
    }
    return MdCoreModule;
}());
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
    })
], MdCoreModule);
export { MdCoreModule };
//# sourceMappingURL=core.js.map