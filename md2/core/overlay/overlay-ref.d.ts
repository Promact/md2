import { NgZone } from '@angular/core';
import { PortalHost, Portal } from '../portal/portal';
import { OverlayState } from './overlay-state';
import { Observable } from 'rxjs/Observable';
/**
 * Reference to an overlay that has been created with the Overlay service.
 * Used to manipulate or dispose of said overlay.
 */
export declare class OverlayRef implements PortalHost {
    private _portalHost;
    private _pane;
    private _state;
    private _ngZone;
    private _backdropElement;
    private _backdropClick;
    constructor(_portalHost: PortalHost, _pane: HTMLElement, _state: OverlayState, _ngZone: NgZone);
    /** The overlay's HTML element */
    readonly overlayElement: HTMLElement;
    /**
     * Attaches the overlay to a portal instance and adds the backdrop.
     * @param portal Portal instance to which to attach the overlay.
     * @returns The portal attachment result.
     */
    attach(portal: Portal<any>): any;
    /**
     * Detaches an overlay from a portal.
     * @returns Resolves when the overlay has been detached.
     */
    detach(): Promise<any>;
    /**
     * Cleans up the overlay from the DOM.
     */
    dispose(): void;
    /**
     * Checks whether the overlay has been attached.
     */
    hasAttached(): boolean;
    /**
     * Returns an observable that emits when the backdrop has been clicked.
     */
    backdropClick(): Observable<void>;
    /**
     * Gets the current state config of the overlay.
     */
    getState(): OverlayState;
    /** Updates the position of the overlay based on the position strategy. */
    updatePosition(): void;
    /** Updates the text direction of the overlay panel. **/
    private updateDirection();
    /** Updates the size of the overlay based on the overlay config. */
    updateSize(): void;
    /** Attaches a backdrop for this overlay. */
    private _attachBackdrop();
    /** Detaches the backdrop (if any) associated with the overlay. */
    private _detachBackdrop();
}
