import { ElementRef, OnDestroy, ModuleWithProviders } from '@angular/core';
export declare class Md2MenuNotClosable {
    private elementRef;
    constructor(elementRef: ElementRef);
    /**
     * contains
     * @param element
     */
    contains(element: HTMLElement): boolean;
}
export declare class Md2Menu {
    private elementRef;
    private isVisible;
    notClosable: Md2MenuNotClosable;
    constructor(elementRef: ElementRef);
    /**
     * open menu
     */
    open(): void;
    /**
     * close menu
     */
    close(): void;
    /**
     * check closeble
     * @param element
     */
    isInClosableZone(element: HTMLElement): boolean;
}
export declare class Md2MenuOpen implements OnDestroy {
    private menu;
    private elementRef;
    private close;
    constructor(menu: Md2Menu, elementRef: ElementRef);
    private open();
    ngOnDestroy(): void;
}
export declare const MD2_MENU_DIRECTIVES: any[];
export declare class Md2MenuModule {
    static forRoot(): ModuleWithProviders;
}
