import { AfterViewInit, ChangeDetectorRef, ElementRef, ViewContainerRef, ModuleWithProviders } from '@angular/core';
import { Overlay, OverlayRef } from '../core';
export declare type TooltipPosition = 'before' | 'after' | 'above' | 'below';
export declare class Md2Tooltip {
    private _viewContainer;
    private _overlay;
    private visible;
    private timer;
    _overlayRef: OverlayRef;
    _tooltipInstance: Md2TooltipComponent;
    message: string;
    position: TooltipPosition;
    delay: number;
    constructor(_viewContainer: ViewContainerRef, _overlay: Overlay);
    /**
     * show tooltip while mouse enter or focus of element
     * @param event
     */
    show(event: Event): void;
    /**
     * hide tooltip while mouse our/leave or blur of element
     * @param event
     */
    hide(event: Event): void;
}
export declare class Md2TooltipComponent implements AfterViewInit {
    private _element;
    private _changeDetector;
    _isVisible: boolean;
    _top: string;
    _left: string;
    message: string;
    position: string;
    hostEl: ElementRef;
    constructor(_element: ElementRef, _changeDetector: ChangeDetectorRef);
    ngAfterViewInit(): void;
    /**
     * calculate position of target element
     * @param hostEl host element
     * @param targetEl targer element
     * @param position position
     * @return {top: number, left: number} object of top, left properties
     */
    private positionElements(hostEl, targetEl, position);
    /**
     * calculate offset of target element
     * @param nativeEl element
     * @return {width: number, height: number,top: number, left: number} object of with, height, top, left properties
     */
    private offset(nativeEl);
    private readonly window;
    private readonly document;
}
export declare const MD2_TOOLTIP_DIRECTIVES: any[];
export declare class Md2TooltipModule {
    static forRoot(): ModuleWithProviders;
}
