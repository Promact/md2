import { Renderer, ElementRef, QueryList } from '@angular/core';
/**
 * Shared directive to count lines inside a text area, such as a list item.
 * Line elements can be extracted with a @ContentChildren(MdLine) query, then
 * counted by checking the query list's length.
 */
export declare class MdLine {
}
export declare class MdLineSetter {
    private _lines;
    private _renderer;
    private _element;
    constructor(_lines: QueryList<MdLine>, _renderer: Renderer, _element: ElementRef);
    private _setLineClass(count);
    private _resetClasses();
    private _setClass(className, bool);
}
export declare class MdLineModule {
}
