import { EventEmitter, OnInit, DoCheck, IterableDiffers, ModuleWithProviders } from '@angular/core';
export declare class Md2PaginationChange {
    source: Md2Pagination;
    activePage: number;
}
export interface SortEvent {
    sortBy: string | string[];
    sortOrder: string;
}
export interface PageEvent {
    activePage: number;
    rowsPerPage: number;
    dataLength: number;
}
export interface DataEvent {
    length: number;
}
export declare class Md2DataTable implements DoCheck {
    private differs;
    private diff;
    private isDataChanged;
    private _data;
    private _activePage;
    private _rowsPerPage;
    private _sortBy;
    private _sortOrder;
    data: Array<any>;
    md2Data: Array<any>;
    activePage: number;
    rowsPerPage: number;
    sortBy: string | Array<string>;
    sortOrder: string;
    activePageChange: EventEmitter<number>;
    sortByChange: EventEmitter<string | string[]>;
    sortOrderChange: EventEmitter<string>;
    onSortChange: EventEmitter<SortEvent>;
    onPageChange: EventEmitter<PageEvent>;
    constructor(differs: IterableDiffers);
    ngDoCheck(): any;
    getSort(): SortEvent;
    setSort(sortBy: string | string[], sortOrder: string): void;
    getPage(): PageEvent;
    setPage(activePage: number, rowsPerPage: number): void;
    private calculateNewActivePage(previousRowsPerPage, currentRowsPerPage);
    private recalculatePage();
    private fillData();
    private caseInsensitiveIteratee(value);
}
export declare class Md2DataTableSortBy implements OnInit {
    private _md2Table;
    md2SortBy: string;
    _isAsc: boolean;
    _isDesc: boolean;
    constructor(_md2Table: Md2DataTable);
    ngOnInit(): void;
    _sort(): void;
}
export declare class Md2Pagination {
    private _dataTable;
    private _activePage;
    rowsPerPageSet: any;
    md2Table: Md2DataTable;
    _rowsPerPage: number;
    _dataLength: number;
    _lastPage: number;
    constructor(_dataTable: Md2DataTable);
    ngDoCheck(): void;
    _setPage(pageNumber: number): void;
    _setRows(event: any): void;
    private onPageChangeSubscriber;
}
export declare const MD2_DATA_TABLE_DIRECTIVES: any[];
export declare class Md2DataTableModule {
    static forRoot(): ModuleWithProviders;
}
