var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, ContentChildren, Directive, Input, QueryList, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/let';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/combineLatest';
import { DataSource } from './data-source';
import { CdkCellOutlet, CdkHeaderRowDef, CdkRowDef } from './row';
import { CdkColumnDef } from './cell';
/**
 * Provides a handle for the table to grab the view container's ng-container to insert data rows.
 * @docs-private
 */
var RowPlaceholder = (function () {
    function RowPlaceholder(viewContainer) {
        this.viewContainer = viewContainer;
    }
    return RowPlaceholder;
}());
RowPlaceholder = __decorate([
    Directive({ selector: '[rowPlaceholder]' }),
    __metadata("design:paramtypes", [ViewContainerRef])
], RowPlaceholder);
export { RowPlaceholder };
/**
 * Provides a handle for the table to grab the view container's ng-container to insert the header.
 * @docs-private
 */
var HeaderRowPlaceholder = (function () {
    function HeaderRowPlaceholder(viewContainer) {
        this.viewContainer = viewContainer;
    }
    return HeaderRowPlaceholder;
}());
HeaderRowPlaceholder = __decorate([
    Directive({ selector: '[headerRowPlaceholder]' }),
    __metadata("design:paramtypes", [ViewContainerRef])
], HeaderRowPlaceholder);
export { HeaderRowPlaceholder };
/**
 * A data table that connects with a data source to retrieve data and renders
 * a header row and data rows. Updates the rows when new data is provided by the data source.
 */
var CdkTable = (function () {
    function CdkTable(_changeDetectorRef) {
        this._changeDetectorRef = _changeDetectorRef;
        // TODO(andrewseguin): Remove max value as the end index
        // and instead calculate the view on init and scroll.
        /**
         * Stream containing the latest information on what rows are being displayed on screen.
         * Can be used by the data source to as a heuristic of what data should be provided.
         */
        this.viewChanged = new BehaviorSubject({ start: 0, end: Number.MAX_VALUE });
        /**
         * Map of all the user's defined columns identified by name.
         * Contains the header and data-cell templates.
         */
        this._columnDefinitionsByName = new Map();
        console.warn('The data table is still in active development ' +
            'and should be considered unstable.');
    }
    CdkTable.prototype.ngOnDestroy = function () {
        // TODO(andrewseguin): Disconnect from the data source so
        // that it can unsubscribe from its streams.
    };
    CdkTable.prototype.ngOnInit = function () {
        // TODO(andrewseguin): Setup a listener for scroll events
        //   and emit the calculated view to this.viewChanged
    };
    CdkTable.prototype.ngAfterContentInit = function () {
        var _this = this;
        // TODO(andrewseguin): Throw an error if two columns share the same name
        this._columnDefinitions.forEach(function (columnDef) {
            _this._columnDefinitionsByName.set(columnDef.name, columnDef);
        });
    };
    CdkTable.prototype.ngAfterViewInit = function () {
        var _this = this;
        // TODO(andrewseguin): Re-render the header when the header's columns change.
        this.renderHeaderRow();
        // TODO(andrewseguin): Re-render rows when their list of columns change.
        // TODO(andrewseguin): If the data source is not
        //   present after view init, connect it when it is defined.
        // TODO(andrewseguin): Unsubscribe from this on destroy.
        this.dataSource.connect(this).subscribe(function (rowsData) {
            // TODO(andrewseguin): Add a differ that will check if the data has changed,
            //   rather than re-rendering all rows
            _this._rowPlaceholder.viewContainer.clear();
            rowsData.forEach(function (rowData) { return _this.insertRow(rowData); });
            _this._changeDetectorRef.markForCheck();
        });
    };
    /**
     * Create the embedded view for the header template and place it in the header row view container.
     */
    CdkTable.prototype.renderHeaderRow = function () {
        var cells = this.getHeaderCellTemplatesForRow(this._headerDefinition);
        // TODO(andrewseguin): add some code to enforce that exactly
        // one CdkCellOutlet was instantiated as a result
        // of `createEmbeddedView`.
        this._headerRowPlaceholder.viewContainer
            .createEmbeddedView(this._headerDefinition.template, { cells: cells });
        CdkCellOutlet.mostRecentCellOutlet.cells = cells;
        CdkCellOutlet.mostRecentCellOutlet.context = {};
    };
    /**
     * Create the embedded view for the data row template and place it in the correct index location
     * within the data row view container.
     */
    CdkTable.prototype.insertRow = function (rowData) {
        // TODO(andrewseguin): Add when predicates to the row definitions
        //   to find the right template to used based on
        //   the data rather than choosing the first row definition.
        var row = this._rowDefinitions.first;
        // TODO(andrewseguin): Add more context, such as first/last/isEven/etc
        var context = { $implicit: rowData };
        // TODO(andrewseguin): add some code to enforce that exactly one
        //   CdkCellOutlet was instantiated as a result  of `createEmbeddedView`.
        this._rowPlaceholder.viewContainer.createEmbeddedView(row.template, context);
        // Insert empty cells if there is no data to improve rendering time.
        CdkCellOutlet.mostRecentCellOutlet.cells = rowData ? this.getCellTemplatesForRow(row) : [];
        CdkCellOutlet.mostRecentCellOutlet.context = context;
    };
    /**
     * Returns the cell template definitions to insert into the header
     * as defined by its list of columns to display.
     */
    CdkTable.prototype.getHeaderCellTemplatesForRow = function (headerDef) {
        var _this = this;
        return headerDef.columns.map(function (columnId) {
            return _this._columnDefinitionsByName.get(columnId).headerCell;
        });
    };
    /**
     * Returns the cell template definitions to insert in the provided row
     * as defined by its list of columns to display.
     */
    CdkTable.prototype.getCellTemplatesForRow = function (rowDef) {
        var _this = this;
        return rowDef.columns.map(function (columnId) {
            return _this._columnDefinitionsByName.get(columnId).cell;
        });
    };
    return CdkTable;
}());
__decorate([
    Input(),
    __metadata("design:type", DataSource)
], CdkTable.prototype, "dataSource", void 0);
__decorate([
    ViewChild(RowPlaceholder),
    __metadata("design:type", RowPlaceholder)
], CdkTable.prototype, "_rowPlaceholder", void 0);
__decorate([
    ViewChild(HeaderRowPlaceholder),
    __metadata("design:type", HeaderRowPlaceholder)
], CdkTable.prototype, "_headerRowPlaceholder", void 0);
__decorate([
    ContentChildren(CdkColumnDef),
    __metadata("design:type", QueryList)
], CdkTable.prototype, "_columnDefinitions", void 0);
__decorate([
    ContentChild(CdkHeaderRowDef),
    __metadata("design:type", CdkHeaderRowDef)
], CdkTable.prototype, "_headerDefinition", void 0);
__decorate([
    ContentChildren(CdkRowDef),
    __metadata("design:type", QueryList)
], CdkTable.prototype, "_rowDefinitions", void 0);
CdkTable = __decorate([
    Component({
        selector: 'cdk-table',
        template: "\n    <ng-container headerRowPlaceholder></ng-container>\n    <ng-container rowPlaceholder></ng-container>\n  ",
        host: {
            'class': 'cdk-table',
            'role': 'grid' // TODO(andrewseguin): Allow the user to choose either grid or treegrid
        },
        encapsulation: ViewEncapsulation.None,
        changeDetection: ChangeDetectionStrategy.OnPush,
    }),
    __metadata("design:paramtypes", [ChangeDetectorRef])
], CdkTable);
export { CdkTable };
//# sourceMappingURL=data-table.js.map