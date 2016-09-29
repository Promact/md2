import { ModuleWithProviders } from '@angular/core';
export { Portal, PortalHost, BasePortalHost, ComponentPortal, TemplatePortal } from './portal/portal';
export { PortalHostDirective, TemplatePortalDirective, PortalModule } from './portal/portal-directives';
export { DomPortalHost } from './portal/dom-portal-host';
export { Overlay, OVERLAY_PROVIDERS } from './overlay/overlay';
export { OverlayContainer } from './overlay/overlay-container';
export { OverlayRef } from './overlay/overlay-ref';
export { OverlayState } from './overlay/overlay-state';
export { ConnectedOverlayDirective, OverlayOrigin, OverlayModule } from './overlay/overlay-directives';
export * from './overlay/position/connected-position-strategy';
export * from './overlay/position/connected-position';
export { MdUniqueSelectionDispatcher, MdUniqueSelectionDispatcherListener } from './coordination/unique-selection-dispatcher';
export { applyCssTransform } from './style/apply-transform';
export { MdError } from './errors/error';
export { ComponentType } from './overlay/generic-component-type';
export * from './keyboard/keycodes';
export declare class MdCoreModule {
    static forRoot(): ModuleWithProviders;
}
