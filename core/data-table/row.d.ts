import { TemplateRef, ViewContainerRef } from '@angular/core';
import { CdkCellDef } from './cell';
/**
 * Header row definition for the CDK data-table.
 * Captures the header row's template and other header properties such as the columns to display.
 */
export declare class CdkHeaderRowDef {
    template: TemplateRef<any>;
    columns: string[];
    constructor(template: TemplateRef<any>);
}
/**
 * Data row definition for the CDK data-table.
 * Captures the header row's template and other row properties such as the columns to display.
 */
export declare class CdkRowDef {
    template: TemplateRef<any>;
    columns: string[];
    constructor(template: TemplateRef<any>);
}
/**
 * Outlet for rendering cells inside of a row or header row.
 * @docs-private
 */
export declare class CdkCellOutlet {
    private _viewContainer;
    /** The ordered list of cells to render within this outlet's view container */
    cells: CdkCellDef[];
    /** The data context to be provided to each cell */
    context: any;
    /**
     * Static property containing the latest constructed instance of this class.
     * Used by the CDK data-table when each CdkHeaderRow and CdkRow component is created using
     * createEmbeddedView. After one of these components are created, this property will provide
     * a handle to provide that component's cells and context. After init, the CdkCellOutlet will
     * construct the cells with the provided context.
     */
    static mostRecentCellOutlet: CdkCellOutlet;
    constructor(_viewContainer: ViewContainerRef);
    ngOnInit(): void;
}
/** Header template container that contains the cell outlet. Adds the right class and role. */
export declare class CdkHeaderRow {
}
/** Data row template container that contains the cell outlet. Adds the right class and role. */
export declare class CdkRow {
}
