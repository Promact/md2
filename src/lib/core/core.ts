import { NgModule, ModuleWithProviders } from '@angular/core';
import { PortalModule } from './portal/portal-directives';
import { OverlayModule } from './overlay/overlay-directives';

// Portals
export {
  Portal,
  PortalHost,
  BasePortalHost,
  ComponentPortal,
  TemplatePortal
} from './portal/portal';
export {
  PortalHostDirective,
  TemplatePortalDirective,
  PortalModule,
} from './portal/portal-directives';
export { DomPortalHost } from './portal/dom-portal-host';

// Overlay
export { Overlay, OVERLAY_PROVIDERS } from './overlay/overlay';
export { OverlayContainer } from './overlay/overlay-container';
export { OverlayRef } from './overlay/overlay-ref';
export { OverlayState } from './overlay/overlay-state';
export {
  ConnectedOverlayDirective,
  OverlayOrigin,
  OverlayModule,
} from './overlay/overlay-directives';
export * from './overlay/position/connected-position-strategy';
export * from './overlay/position/connected-position';

// Style
export { applyCssTransform } from './style/apply-transform';

// Error
export { MdError } from './errors/error';

// Misc
export { ComponentType } from './overlay/generic-component-type';

// Keybindings
export * from './keyboard/keycodes';

// Coersion
export { coerceBooleanProperty } from './coersion/boolean-property';

@NgModule({
  imports: [PortalModule, OverlayModule],
  exports: [PortalModule, OverlayModule],
})
export class MdCoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: MdCoreModule,
      providers: []
    };
  }
}
