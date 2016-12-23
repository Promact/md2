import { EventEmitter, OnDestroy, ViewContainerRef, TemplateRef, ModuleWithProviders } from '@angular/core';
import { Overlay, OverlayState, TemplatePortal } from '../core/core';
import 'rxjs/add/operator/first';
export declare class Md2DialogPortal extends TemplatePortal {
    constructor(templateRef: TemplateRef<any>, viewContainerRef: ViewContainerRef);
}
export declare class Md2DialogTitle {
}
export declare class Md2DialogFooter {
}
export declare class Md2Dialog implements OnDestroy {
    private _overlay;
    constructor(_overlay: Overlay);
    onShow: EventEmitter<Md2Dialog>;
    onClose: EventEmitter<any>;
    onCancel: EventEmitter<any>;
    /** The portal to send the dialog content through */
    _portal: Md2DialogPortal;
    /** Is the dialog active? */
    _isOpened: boolean;
    dialogTitle: string;
    /** Overlay configuration for positioning the dialog */
    config: OverlayState;
    /** @internal */
    private _overlayRef;
    ngOnDestroy(): any;
    /** Show the dialog */
    show(): Promise<Md2Dialog>;
    /** Open the dialog */
    open(): Promise<Md2Dialog>;
    /** Close the dialog */
    close(result?: any, cancel?: boolean): Promise<Md2Dialog>;
    _handleDocumentKeydown(event: KeyboardEvent): void;
}
export declare const MD2_DIALOG_DIRECTIVES: any[];
export declare const MD2_DIALOG_PROVIDERS: any[];
export declare class Md2DialogModule {
    static forRoot(): ModuleWithProviders;
}
