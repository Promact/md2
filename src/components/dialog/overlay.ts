import {provide} from "@angular/core";
import {OVERLAY_CONTAINER_TOKEN} from "./overlay/overlay";
import {createOverlayContainer} from "./overlay/overlay-container";

export const OVERLAY_PROVIDERS: any[] = [
    provide( OVERLAY_CONTAINER_TOKEN, { useValue: createOverlayContainer() }),
];