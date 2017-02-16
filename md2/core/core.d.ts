import { ModuleWithProviders } from '@angular/core';
export { Dir, LayoutDirection, RtlModule } from './rtl/dir';
export { ObserveContentModule, ObserveContent } from './observe-content/observe-content';
export { MdOptionModule, MdOption } from './option/option';
export { Portal, PortalHost, BasePortalHost, ComponentPortal, TemplatePortal } from './portal/portal';
export { PortalHostDirective, TemplatePortalDirective, PortalModule } from './portal/portal-directives';
export { DomPortalHost } from './portal/dom-portal-host';
export * from './projection/projection';
export * from './platform/index';
/** @deprecated */
export { Platform as MdPlatform } from './platform/platform';
export { Overlay, OVERLAY_PROVIDERS } from './overlay/overlay';
export { OverlayContainer } from './overlay/overlay-container';
export { FullscreenOverlayContainer } from './overlay/fullscreen-overlay-container';
export { OverlayRef } from './overlay/overlay-ref';
export { OverlayState } from './overlay/overlay-state';
export { ConnectedOverlayDirective, OverlayOrigin, OverlayModule } from './overlay/overlay-directives';
export * from './overlay/position/connected-position-strategy';
export * from './overlay/position/connected-position';
export { ScrollDispatcher } from './overlay/scroll/scroll-dispatcher';
export { GestureConfig } from './gestures/gesture-config';
export { HammerInput, HammerManager } from './gestures/gesture-annotations';
export { MdRipple, MdRippleModule } from './ripple/ripple';
export { AriaLivePoliteness, LiveAnnouncer, LIVE_ANNOUNCER_ELEMENT_TOKEN, LIVE_ANNOUNCER_PROVIDER } from './a11y/live-announcer';
export * from './selection/selection';
/** @deprecated */
export { LiveAnnouncer as MdLiveAnnouncer } from './a11y/live-announcer';
export { FocusTrap } from './a11y/focus-trap';
export { InteractivityChecker } from './a11y/interactivity-checker';
export { isFakeMousedownFromScreenReader } from './a11y/fake-mousedown';
export { A11yModule } from './a11y/index';
export { UniqueSelectionDispatcher, UniqueSelectionDispatcherListener, UNIQUE_SELECTION_DISPATCHER_PROVIDER } from './coordination/unique-selection-dispatcher';
/** @deprecated */
export { UniqueSelectionDispatcher as MdUniqueSelectionDispatcher } from './coordination/unique-selection-dispatcher';
export { MdLineModule, MdLine, MdLineSetter } from './line/line';
export * from './style/index';
export { MdError } from './errors/error';
export { ComponentType } from './overlay/generic-component-type';
export * from './keyboard/keycodes';
export * from './compatibility/compatibility';
export * from './animation/animation';
export * from './selection/index';
export { coerceBooleanProperty } from './coercion/boolean-property';
export { coerceNumberProperty } from './coercion/number-property';
export { CompatibilityModule, NoConflictStyleCompatibilityMode } from './compatibility/compatibility';
export declare class MdCoreModule {
    /** @deprecated */
    static forRoot(): ModuleWithProviders;
}
