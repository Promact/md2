import { ViewContainerRef, ModuleWithProviders } from '@angular/core';
import { Overlay, OverlayRef } from '../core';
export declare class Toast {
    message: string;
    id: number;
    isVisible: boolean;
    constructor(message: string);
}
export declare class Md2ToastConfig {
    duration: number;
    viewContainerRef?: ViewContainerRef;
}
export declare class Md2Toast {
    private _overlay;
    private _config;
    private index;
    _overlayRef: OverlayRef;
    _toastInstance: Md2ToastComponent;
    constructor(_overlay: Overlay, _config: Md2ToastConfig);
    /**
     * toast message
     * @param toast string or object with message and other properties of toast
     */
    toast(message: string, duration?: number): void;
    /**
     * show toast
     * @param toastObj string or object with message and other properties of toast
     */
    show(message: string, duration?: number): void;
    /** Create the toast to display */
    private _createToast();
    /** Create the overlay config and position strategy */
    private _createOverlay();
    /** Disposes the current toast and the overlay it is attached to */
    private _disposeToast();
    /** Updates the toast message and repositions the overlay according to the new message length */
    private _setToastMessage(toast);
    /**
     * clear specific toast
     * @param toastId
     */
    private clearToast(toastId);
    /**
     * clear all toasts
     */
    clearAllToasts(): void;
}
export declare class Md2ToastComponent {
    toasts: Toast[];
    maxShown: number;
    /**
     * add toast
     * @param toast toast object with all parameters
     */
    addToast(toast: Toast): void;
    /**
     * remove toast
     * @param toastId number of toast id
     */
    removeToast(toastId: number): void;
    /**
     * remove all toasts
     * @param toastId number of toast id
     */
    removeAllToasts(): void;
    /**
     * check has any toast
     * @return boolean
     */
    hasToast(): boolean;
}
export declare const MD2_TOAST_DIRECTIVES: any[];
export declare class Md2ToastModule {
    static forRoot(): ModuleWithProviders;
}
