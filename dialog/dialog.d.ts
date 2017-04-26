import { EventEmitter, OnDestroy, ViewContainerRef, TemplateRef, ModuleWithProviders } from '@angular/core';
import { Overlay, TemplatePortalDirective } from '../core/core';
import 'rxjs/add/operator/first';
export declare type DialogVisibility = 'initial' | 'visible' | 'hidden';
export declare type DialogRole = 'dialog' | 'alertdialog';
export declare class Md2DialogConfig {
    role?: DialogRole;
    disableClose?: boolean;
}
export declare class Md2DialogPortal extends TemplatePortalDirective {
    constructor(templateRef: TemplateRef<any>, viewContainerRef: ViewContainerRef);
}
/**
 * Title of a dialog element. Stays fixed to the top of the dialog when scrolling.
 */
export declare class Md2DialogTitle {
}
/**
 * Scrollable content container of a dialog.
 */
export declare class Md2DialogContent {
}
/**
 * Container for the bottom action buttons in a dialog.
 * Stays fixed to the bottom when scrolling.
 */
export declare class Md2DialogActions {
}
export declare class Md2Dialog implements OnDestroy {
    private _overlay;
    private _parentDialog;
    private _openDialogsAtThisLevel;
    private _boundKeydown;
    private _panelOpen;
    private _overlayRef;
    private _backdropSubscription;
    config: Md2DialogConfig;
    /** Property watched by the animation framework to show or hide the dialog */
    _visibility: DialogVisibility;
    constructor(_overlay: Overlay, _parentDialog: Md2Dialog);
    onOpen: EventEmitter<Md2Dialog>;
    onClose: EventEmitter<any>;
    /** The portal to send the dialog content through */
    _portal: Md2DialogPortal;
    dialogTitle: string;
    ngOnDestroy(): void;
    readonly _openDialogs: Array<any>;
    /** Open the dialog */
    open(config?: Md2DialogConfig): Promise<Md2Dialog>;
    /** Close the dialog */
    close(): Promise<Md2Dialog>;
    /** Removes the panel from the DOM. */
    destroyPanel(): void;
    _onPanelDone(): void;
    _handleKeydown(event: KeyboardEvent): void;
    private _subscribeToBackdrop();
    private _createOverlay();
    private _cleanUpSubscriptions();
}
export declare const MD2_DIALOG_DIRECTIVES: any[];
export declare class Md2DialogModule {
    static forRoot(): ModuleWithProviders;
}
