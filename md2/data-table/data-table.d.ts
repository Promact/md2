import { EventEmitter, SimpleChange, OnChanges, DoCheck, ModuleWithProviders } from '@angular/core';
export interface SortEvent {
    sortField: string | string[];
    sortOrder: string;
}
export interface PageEvent {
    activePage: number;
    pageLength: number;
    dataLength: number;
}
export interface DataEvent {
    length: number;
}
export declare class Md2DataTable implements OnChanges, DoCheck {
    data: any[];
    onDataChange: EventEmitter<DataEvent>;
    onSortChange: EventEmitter<SortEvent>;
    onPageChange: EventEmitter<PageEvent>;
    private sortField;
    private sortOrder;
    private isDataChanged;
    inputData: any[];
    pageLength: number;
    activePage: number;
    getSort(): SortEvent;
    setSort(sortField: string | string[], sortOrder: string): void;
    getPage(): PageEvent;
    setPage(activePage: number, pageLength: number): void;
    private calculateNewActivePage(previousPageLength, currentPageLength);
    private recalculatePage();
    ngOnChanges(changes: {
        [key: string]: SimpleChange;
    }): any;
    ngDoCheck(): any;
    private fillData();
    private caseInsensitiveIteratee(sortField);
}
export declare class Md2DataTableSortField {
    private _md2Table;
    private isAsc;
    private isDesc;
    private sortField;
    constructor(_md2Table: Md2DataTable);
    private _sort();
}
export declare class Md2Pagination implements OnChanges {
    private injectMd2Table;
    private _md2Table;
    private _minRows;
    private _activePage;
    private _rows;
    private _lastPage;
    private dataLength;
    rows: any;
    md2InputTable: Md2DataTable;
    constructor(injectMd2Table: Md2DataTable);
    ngOnChanges(changes: any): any;
    private _setPage(page);
    private _setRows(rows);
    private _onPageChange;
}
export declare const MD2_DATA_TABLE_DIRECTIVES: any[];
export declare class Md2DataTableModule {
    static forRoot(): ModuleWithProviders;
}
