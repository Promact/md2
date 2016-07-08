
// Portals
export {
Portal,
PortalHost,
//BasePortalHost,
//ComponentPortal,
TemplatePortal
} from './portal/portal';
export {
//PortalHostDirective,
TemplatePortalDirective,
PORTAL_DIRECTIVES
} from './portal/portal-directives';
export {DomPortalHost} from './portal/dom-portal-host';

// Overlay
export {Overlay, OVERLAY_CONTAINER_TOKEN} from './overlay/overlay';
export {OverlayRef} from './overlay/overlay-ref';
export {OverlayState} from './overlay/overlay-state';

//============================================


import {provide} from "@angular/core";
import {OVERLAY_CONTAINER_TOKEN} from "./overlay/overlay";
import {createOverlayContainer} from "./overlay/overlay-container";

export const MATERIAL_BROWSER_PROVIDERS: any[] = [
    provide( OVERLAY_CONTAINER_TOKEN, { useValue: createOverlayContainer() }),
];