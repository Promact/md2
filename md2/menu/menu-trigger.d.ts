import { ElementRef, Renderer } from '@angular/core';
export declare class Md2MenuTrigger {
    private _element;
    private _renderer;
    private _handleClick;
    constructor(_element: ElementRef, _renderer: Renderer);
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    _toggleMenu(): void;
    _openMenu(): void;
    _closeMenu(): void;
    _closeChildrenMenu(element: Element): void;
    _getHostElement(): HTMLElement;
    _getParentElement(): HTMLElement;
    _getSiblingElements(element: Element): Node[];
    _getClosestElement(element: Element, target: string): Element;
    _hasClass(element: Element, className: string): boolean;
    _hasChildMenu(event: any): boolean;
}
