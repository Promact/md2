import { ModuleWithProviders } from '@angular/core';
export { Dir, LayoutDirection, RtlModule } from './rtl/dir';
export { ObserveContentModule, ObserveContent } from './observe-content/observe-content';
export { Portal, PortalHost, BasePortalHost, ComponentPortal, TemplatePortal } from './portal/portal';
export { PortalHostDirective, TemplatePortalDirective, PortalModule } from './portal/portal-directives';
export { DomPortalHost } from './portal/dom-portal-host';
export * from './projection/projection';
export * from './platform/index';
/** @deprecated */
export { Platform as MdPlatform } from './platform/platform';
export { Overlay, OVERLAY_PROVIDERS } from './overlay/overlay';
export { OverlayContainer } from './overlay/overlay-container';
export { OverlayRef } from './overlay/overlay-ref';
export { OverlayState } from './overlay/overlay-state';
export { ConnectedOverlayDirective, OverlayOrigin, OverlayModule } from './overlay/overlay-directives';
export * from './overlay/position/connected-position-strategy';
export * from './overlay/position/connected-position';
export { ScrollDispatcher } from './overlay/scroll/scroll-dispatcher';
export { GestureConfig } from './gestures/gesture-config';
export * from './gestures/gesture-annotations';
export { MdRipple, MdRippleModule } from './ripple/ripple';
export { AriaLivePoliteness, LiveAnnouncer, LIVE_ANNOUNCER_ELEMENT_TOKEN } from './a11y/live-announcer';
/** @deprecated */
export { LiveAnnouncer as MdLiveAnnouncer } from './a11y/live-announcer';
export { FocusTrap } from './a11y/focus-trap';
export { InteractivityChecker } from './a11y/interactivity-checker';
export { isFakeMousedownFromScreenReader } from './a11y/fake-mousedown';
export { A11yModule } from './a11y/index';
export { UniqueSelectionDispatcher, UniqueSelectionDispatcherListener } from './coordination/unique-selection-dispatcher';
/** @deprecated */
export { UniqueSelectionDispatcher as MdUniqueSelectionDispatcher } from './coordination/unique-selection-dispatcher';
export { MdLineModule, MdLine, MdLineSetter } from './line/line';
export { applyCssTransform } from './style/apply-transform';
export { MdError } from './errors/error';
export { ComponentType } from './overlay/generic-component-type';
export * from './keyboard/keycodes';
export * from './compatibility/default-mode';
export * from './animation/animation';
export { coerceBooleanProperty } from './coercion/boolean-property';
export { coerceNumberProperty } from './coercion/number-property';
export { DefaultStyleCompatibilityModeModule } from './compatibility/default-mode';
export { NoConflictStyleCompatibilityMode } from './compatibility/no-conflict-mode';
export declare class MdCoreModule {
    static forRoot(): ModuleWithProviders;
}
