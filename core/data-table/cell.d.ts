import { ElementRef, Renderer2, TemplateRef } from '@angular/core';
/**
 * Cell definition for a CDK data-table.
 * Captures the template of a column's data row cell as well as cell-specific properties.
 */
export declare class CdkCellDef {
    template: TemplateRef<any>;
    constructor(template: TemplateRef<any>);
}
/**
 * Header cell definition for a CDK data-table.
 * Captures the template of a column's header cell and as well as cell-specific properties.
 */
export declare class CdkHeaderCellDef {
    template: TemplateRef<any>;
    constructor(template: TemplateRef<any>);
}
/**
 * Column definition for the CDK data-table.
 * Defines a set of cells available for a table column.
 */
export declare class CdkColumnDef {
    name: string;
    cell: CdkCellDef;
    headerCell: CdkHeaderCellDef;
}
/** Header cell template container that adds the right classes and role. */
export declare class CdkHeaderCell {
    private columnDef;
    private elementRef;
    private renderer;
    constructor(columnDef: CdkColumnDef, elementRef: ElementRef, renderer: Renderer2);
}
/** Cell template container that adds the right classes and role. */
export declare class CdkCell {
    private columnDef;
    private elementRef;
    private renderer;
    constructor(columnDef: CdkColumnDef, elementRef: ElementRef, renderer: Renderer2);
}
