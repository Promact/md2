import { ApplicationRef, ComponentFactoryResolver, ComponentRef, ModuleWithProviders } from '@angular/core';
export declare class Toast {
    message: string;
    id: number;
    constructor(message: string);
}
export declare class Md2Toast {
    private _componentFactory;
    private _appRef;
    private delay;
    private index;
    container: ComponentRef<any>;
    constructor(_componentFactory: ComponentFactoryResolver, _appRef: ApplicationRef);
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
export declare const MD2_TOAST_DIRECTIVES: any[];
export declare class Md2ToastModule {
    static forRoot(): ModuleWithProviders;
}
