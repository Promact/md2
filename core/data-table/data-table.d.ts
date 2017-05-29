import { ChangeDetectorRef, QueryList, ViewContainerRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/let';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/combineLatest';
import { CollectionViewer, DataSource } from './data-source';
import { CdkHeaderRowDef, CdkRowDef } from './row';
import { CdkCellDef, CdkColumnDef, CdkHeaderCellDef } from './cell';
/**
 * Provides a handle for the table to grab the view container's ng-container to insert data rows.
 * @docs-private
 */
export declare class RowPlaceholder {
    viewContainer: ViewContainerRef;
    constructor(viewContainer: ViewContainerRef);
}
/**
 * Provides a handle for the table to grab the view container's ng-container to insert the header.
 * @docs-private
 */
export declare class HeaderRowPlaceholder {
    viewContainer: ViewContainerRef;
    constructor(viewContainer: ViewContainerRef);
}
/**
 * A data table that connects with a data source to retrieve data and renders
 * a header row and data rows. Updates the rows when new data is provided by the data source.
 */
export declare class CdkTable implements CollectionViewer {
    private _changeDetectorRef;
    /**
     * Provides a stream containing the latest data array to render. Influenced by the table's
     * stream of view window (what rows are currently on screen).
     */
    dataSource: DataSource<any>;
    /**
     * Stream containing the latest information on what rows are being displayed on screen.
     * Can be used by the data source to as a heuristic of what data should be provided.
     */
    viewChanged: BehaviorSubject<{
        start: number;
        end: number;
    }>;
    /**
     * Map of all the user's defined columns identified by name.
     * Contains the header and data-cell templates.
     */
    private _columnDefinitionsByName;
    _rowPlaceholder: RowPlaceholder;
    _headerRowPlaceholder: HeaderRowPlaceholder;
    /**
     * The column definitions provided by the user that contain what the header and cells should
     * render for each column.
     */
    _columnDefinitions: QueryList<CdkColumnDef>;
    /** Template used as the header container. */
    _headerDefinition: CdkHeaderRowDef;
    /** Set of templates that used as the data row containers. */
    _rowDefinitions: QueryList<CdkRowDef>;
    constructor(_changeDetectorRef: ChangeDetectorRef);
    ngOnDestroy(): void;
    ngOnInit(): void;
    ngAfterContentInit(): void;
    ngAfterViewInit(): void;
    /**
     * Create the embedded view for the header template and place it in the header row view container.
     */
    renderHeaderRow(): void;
    /**
     * Create the embedded view for the data row template and place it in the correct index location
     * within the data row view container.
     */
    insertRow(rowData: any): void;
    /**
     * Returns the cell template definitions to insert into the header
     * as defined by its list of columns to display.
     */
    getHeaderCellTemplatesForRow(headerDef: CdkHeaderRowDef): CdkHeaderCellDef[];
    /**
     * Returns the cell template definitions to insert in the provided row
     * as defined by its list of columns to display.
     */
    getCellTemplatesForRow(rowDef: CdkRowDef): CdkCellDef[];
}
