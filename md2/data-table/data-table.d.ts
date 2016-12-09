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
    private _dataLength;
    private _activePage;
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
    activePageChange: EventEmitter<{}>;
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
}
export declare class Md2DataTableSortField {
    private _md2Table;
    _isAsc: boolean;
    _isDesc: boolean;
    sortField: string;
    constructor(_md2Table: Md2DataTable);
    _sort(): void;
}
export declare class Md2Pagination implements OnChanges {
    private _injectMd2Table;
    private _md2Table;
    _activePage: number;
    _rows: number;
    _lastPage: number;
    _dataLength: number;
    rows: any;
    md2InputTable: Md2DataTable;
    constructor(_injectMd2Table: Md2DataTable);
    ngAfterViewInit(): void;
    ngOnChanges(changes: any): any;
    _setPage(page: number): void;
    _setRows(rows: number): void;
    private _onPageChange;
}
export declare const MD2_DATA_TABLE_DIRECTIVES: any[];
export declare class Md2DataTableModule {
    static forRoot(): ModuleWithProviders;
}
