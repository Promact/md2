import { ModuleWithProviders } from '@angular/core';
import { Overlay, OverlayRef } from '../core';
export declare class Toast {
    message: string;
    id: number;
    isVisible: boolean;
    constructor(message: string);
}
export declare class Md2Toast {
    private _overlay;
    private delay;
    private index;
    _overlayRef: OverlayRef;
    _toastInstance: Md2ToastComponent;
    constructor(_overlay: Overlay);
    /**
     * toast message
     * @param toast string or object with message and other properties of toast
     */
    toast(toast: string | {
        message: string;
        hideDelay: number;
    }): void;
    /**
     * show toast
     * @param toastObj string or object with message and other properties of toast
     */
    show(toastObj: string | {
        message: string;
        hideDelay: number;
    }): void;
    /**
     * toast timeout
     * @param toastId
     */
    startTimeout(toastId: number): void;
    /**
     * setup toast
     * @param toast
     */
    setupToast(toast: Toast): void;
    /**
     * clear specific toast
     * @param toastId
     */
    clear(toastId: number): void;
    /**
     * clear all toasts
     */
    clearAll(): void;
    /**
     * dispose all toasts
     */
    dispose(): void;
}
export declare class Md2ToastComponent {
    toasts: Toast[];
    maxShown: number;
    /**
     * add toast
     * @param toast toast object with all parameters
     */
    add(toast: Toast): void;
    /**
     * remove toast
     * @param toastId number of toast id
     */
    remove(toastId: number): void;
    /**
     * remove all toasts
     * @param toastId number of toast id
     */
    removeAll(): void;
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
