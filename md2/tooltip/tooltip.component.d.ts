import { AfterViewInit, ChangeDetectorRef, ElementRef } from '@angular/core';
import { Md2TooltipOptions } from './tooltip.options';
export declare class Md2TooltipComponent implements AfterViewInit {
    private _element;
    private _changeDetector;
    private _isVisible;
    private top;
    private left;
    private message;
    private position;
    private hostEl;
    constructor(_element: ElementRef, _changeDetector: ChangeDetectorRef, options: Md2TooltipOptions);
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
