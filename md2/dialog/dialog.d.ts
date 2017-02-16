import { EventEmitter, OnDestroy, ViewContainerRef, TemplateRef, ModuleWithProviders } from '@angular/core';
import { Overlay, TemplatePortalDirective } from '../core/core';
import 'rxjs/add/operator/first';
export declare class Md2DialogPortal extends TemplatePortalDirective {
    constructor(templateRef: TemplateRef<any>, viewContainerRef: ViewContainerRef);
}
export declare class Md2DialogTitle {
}
export declare class Md2DialogFooter {
}
export declare class Md2Dialog implements OnDestroy {
    private _overlay;
    private _panelOpen;
    private _overlayRef;
    private _backdropSubscription;
    constructor(_overlay: Overlay);
    onOpen: EventEmitter<Md2Dialog>;
    onClose: EventEmitter<any>;
    /** The portal to send the dialog content through */
    _portal: Md2DialogPortal;
    dialogTitle: string;
    ngOnDestroy(): void;
    /** Show the dialog */
    show(): void;
    /** Open the dialog */
    open(): void;
    /** Close the dialog */
    close(result?: any, cancel?: boolean): void;
    /** Removes the panel from the DOM. */
    destroyPanel(): void;
    _onPanelDone(): void;
    _handleEscKeydown(event: KeyboardEvent): void;
    private _subscribeToBackdrop();
    private _createOverlay();
    private _cleanUpSubscriptions();
}
export declare const MD2_DIALOG_DIRECTIVES: any[];
export declare class Md2DialogModule {
    static forRoot(): ModuleWithProviders;
}
