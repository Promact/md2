import { EventEmitter, OnDestroy, ViewContainerRef, TemplateRef, ModuleWithProviders } from '@angular/core';
import { Overlay, OverlayState, TemplatePortal } from '../core/core';
export declare class Md2DialogPortal extends TemplatePortal {
    constructor(templateRef: TemplateRef<any>, viewContainerRef: ViewContainerRef);
}
export declare class Md2DialogTitle {
}
export declare class Md2DialogFooter {
}
export declare class Md2Dialog implements OnDestroy {
    private overlay;
    constructor(overlay: Overlay);
    onShow: EventEmitter<Md2Dialog>;
    onClose: EventEmitter<any>;
    onCancel: EventEmitter<any>;
    /** The portal to send the dialog content through */
    private portal;
    /** Is the dialog active? */
    private isOpened;
    dialogTitle: string;
    /** Overlay configuration for positioning the dialog */
    config: OverlayState;
    ngOnDestroy(): any;
    show(): Promise<Md2Dialog>;
    /** Open the dialog */
    open(): Promise<Md2Dialog>;
    /** Close the dialog */
    close(result?: any, cancel?: boolean): Promise<Md2Dialog>;
    private onDocumentKeypress(event);
}
export declare const MD2_DIALOG_DIRECTIVES: any[];
export declare const MD2_DIALOG_PROVIDERS: any[];
export declare class Md2DialogModule {
    static forRoot(): ModuleWithProviders;
}
