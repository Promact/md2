// RTL
export {Dir, LayoutDirection} from './rtl/dir';

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
PORTAL_DIRECTIVES
} from './portal/portal-directives';
export {DomPortalHost} from './portal/dom-portal-host';

// Overlay
export {Overlay, OVERLAY_CONTAINER_TOKEN, OVERLAY_PROVIDERS} from './overlay/overlay';
export {OverlayRef} from './overlay/overlay-ref';
export {OverlayState} from './overlay/overlay-state';
export {
ConnectedOverlayDirective,
OverlayOrigin,
OVERLAY_DIRECTIVES
} from './overlay/overlay-directives';

export {
MdUniqueSelectionDispatcher,
MdUniqueSelectionDispatcherListener
} from './coordination/unique-selection-dispatcher';


//============================================


import {provide} from "@angular/core";
import {ViewportHelper, BrowserViewportHelper, NodeViewportHelper} from "./util/viewport";
import {OVERLAY_CONTAINER_TOKEN} from "./overlay/overlay";
import {createOverlayContainer} from "./overlay/overlay-container";

export const MATERIAL_BROWSER_PROVIDERS: any[] = [
  provide( ViewportHelper, { useClass: BrowserViewportHelper }),
  provide( OVERLAY_CONTAINER_TOKEN, { useValue: createOverlayContainer() }),
];

export const MATERIAL_PROVIDERS = MATERIAL_BROWSER_PROVIDERS;