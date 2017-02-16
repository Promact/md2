import { AfterContentInit, ElementRef, EventEmitter, QueryList, TemplateRef, ViewContainerRef, ModuleWithProviders } from '@angular/core';
/** Change event object that is emitted when the tab has changed. */
export declare class Md2TabChange {
    tab: Md2Tab;
    index: number;
    constructor(tab: Md2Tab, index: number);
}
export declare class Md2Transclude {
    viewRef: ViewContainerRef;
    private _md2Transclude;
    constructor(viewRef: ViewContainerRef);
    md2Transclude: TemplateRef<any>;
}
export declare class Md2Tab {
    label: string;
    active: boolean;
    disabled: boolean;
    class: string;
    labelRef: TemplateRef<any>;
}
export declare class Md2TabLabel {
    templateRef: TemplateRef<any>;
    constructor(templateRef: TemplateRef<any>, tab: Md2Tab);
}
export declare class Md2Tabs implements AfterContentInit {
    private elementRef;
    tabs: QueryList<Md2Tab>;
    private _isInitialized;
    private _focusIndex;
    private _selectedIndex;
    _shouldPaginate: boolean;
    _offsetLeft: number;
    _inkBarLeft: string;
    _inkBarWidth: string;
    class: string;
    selectedIndex: any;
    focusIndex: number;
    readonly element: any;
    change: EventEmitter<Md2TabChange>;
    selectedIndexChange: EventEmitter<number>;
    constructor(elementRef: ElementRef);
    /**
     * After Content Init
     */
    ngAfterContentInit(): void;
    /**
     * Calculates the styles from the selected tab for the ink-bar.
     */
    private _updateInkBar();
    /** Emits an event when the user selects an option. */
    _emitChangeEvent(): void;
    /**
     * Focus next Tab
     */
    focusNextTab(): void;
    /**
     * Focus previous Tab
     */
    focusPreviousTab(): void;
    /**
     * Mouse Wheel scroll
     * @param event
     */
    scroll(event: any): void;
    /**
     * Next Page
     */
    nextPage(): void;
    /**
     * Previous Page
     */
    previousPage(): void;
    /**
     * On Window Resize
     * @param event
     */
    onWindowResize(event: Event): void;
    /**
     * Can page Back
     */
    canPageBack(): boolean;
    /**
     * Can page Previous
     */
    canPageForward(): boolean;
    /**
     * Update Pagination
     */
    updatePagination(): void;
    /**
     * Increment Focus Tab
     * @param inc
     */
    incrementIndex(inc: any): void;
    /**
     * Adjust Offset of Tab
     * @param index
     */
    adjustOffset(index: number): void;
    /**
     * Fix Offset of Tab
     * @param value
     * @return value
     */
    fixOffset(value: any): any;
}
export declare const MD2_TABS_DIRECTIVES: any[];
export declare class Md2TabsModule {
    static forRoot(): ModuleWithProviders;
}
