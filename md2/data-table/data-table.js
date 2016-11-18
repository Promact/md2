var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Component, Directive, Input, EventEmitter, Optional, NgModule, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
export var Md2DataTable = (function () {
    function Md2DataTable() {
        this.dataLength = 0;
        this.onDataChange = new EventEmitter();
        this.onSortChange = new EventEmitter();
        this.onPageChange = new EventEmitter();
        this.sortField = '';
        this.sortOrder = 'asc';
        this.isDataChanged = false;
        this.inputData = [];
        this.pageLength = 1000;
        this.activePage = 1;
    }
    Md2DataTable.prototype.getSort = function () {
        return { sortField: this.sortField, sortOrder: this.sortOrder };
    };
    Md2DataTable.prototype.setSort = function (sortField, sortOrder) {
        if (this.sortField !== sortField || this.sortOrder !== sortOrder) {
            this.sortField = sortField;
            this.sortOrder = sortOrder;
            this.isDataChanged = true;
            this.onSortChange.emit({ sortField: sortField, sortOrder: sortOrder });
        }
    };
    Md2DataTable.prototype.getPage = function () {
        return { activePage: this.activePage, pageLength: this.pageLength, dataLength: this.inputData.length };
    };
    Md2DataTable.prototype.setPage = function (activePage, pageLength) {
        if (this.pageLength !== pageLength || this.activePage !== activePage) {
            this.activePage = this.activePage !== activePage ? activePage : this.calculateNewActivePage(this.pageLength, pageLength);
            this.pageLength = pageLength;
            this.isDataChanged = true;
            this.onPageChange.emit({
                activePage: this.activePage,
                pageLength: this.pageLength,
                dataLength: this.inputData.length
            });
        }
    };
    Md2DataTable.prototype.calculateNewActivePage = function (previousPageLength, currentPageLength) {
        var firstRowOnPage = (this.activePage - 1) * previousPageLength + 1;
        var newActivePage = Math.ceil(firstRowOnPage / currentPageLength);
        return newActivePage;
    };
    Md2DataTable.prototype.recalculatePage = function () {
        var _lastPage = Math.ceil(this.inputData.length / this.pageLength);
        this.activePage = _lastPage < this.activePage ? _lastPage : this.activePage;
        this.activePage = this.activePage || 1;
    };
    Md2DataTable.prototype.ngOnChanges = function (changes) {
        if (changes['inputData']) {
            this.inputData = changes['inputData'].currentValue || [];
            this.recalculatePage();
            this.onPageChange.emit({
                activePage: this.activePage,
                pageLength: this.pageLength,
                dataLength: this.inputData.length
            });
            this.isDataChanged = true;
        }
    };
    Md2DataTable.prototype.ngDoCheck = function () {
        if (this.dataLength !== this.inputData.length) {
            this.dataLength = this.inputData.length;
            this.fillData();
            this.recalculatePage();
            this.onPageChange.emit({
                activePage: this.activePage,
                pageLength: this.pageLength,
                dataLength: this.inputData.length
            });
            this.isDataChanged = true;
        }
        if (this.isDataChanged) {
            this.fillData();
            this.isDataChanged = false;
        }
    };
    Md2DataTable.prototype.fillData = function () {
        this.activePage = this.activePage;
        this.pageLength = this.pageLength;
        var offset = (this.activePage - 1) * this.pageLength;
        var data = this.inputData;
        var sortField = this.sortField;
        if (sortField) {
            data = data.sort(function (a, b) {
                var x = isNaN(a[sortField + '']) ? a[sortField + ''].toLowerCase() : a[sortField + ''];
                var y = isNaN(b[sortField + '']) ? b[sortField + ''].toLowerCase() : b[sortField + ''];
                return (x > y) ? 1 : (y > x) ? -1 : 0;
            });
        }
        if (this.sortOrder === 'desc') {
            data.reverse();
        }
        this.data = data.slice(offset, offset + this.pageLength);
    };
    Md2DataTable.prototype.caseInsensitiveIteratee = function (sortField) {
        return function (row) {
            var value = row[sortField];
            if (value && typeof value === 'string' || value instanceof String) {
                return value.toLowerCase();
            }
            return value;
        };
    };
    __decorate([
        Input('md2-data'), 
        __metadata('design:type', Array)
    ], Md2DataTable.prototype, "inputData", void 0);
    __decorate([
        Input('md2-page-length'), 
        __metadata('design:type', Object)
    ], Md2DataTable.prototype, "pageLength", void 0);
    __decorate([
        Input('md2-active-page'), 
        __metadata('design:type', Object)
    ], Md2DataTable.prototype, "activePage", void 0);
    Md2DataTable = __decorate([
        Directive({
            selector: 'table[md2-data]',
            exportAs: 'Md2DataTable'
        }), 
        __metadata('design:paramtypes', [])
    ], Md2DataTable);
    return Md2DataTable;
}());
export var Md2DataTableSortField = (function () {
    function Md2DataTableSortField(_md2Table) {
        var _this = this;
        this._md2Table = _md2Table;
        this.isAsc = false;
        this.isDesc = false;
        _md2Table.onSortChange.subscribe(function (event) {
            _this.isAsc = (event.sortField === _this.sortField && event.sortOrder === "asc");
            _this.isDesc = (event.sortField === _this.sortField && event.sortOrder === "desc");
        });
    }
    Md2DataTableSortField.prototype._sort = function () {
        if (this.isAsc) {
            this._md2Table.setSort(this.sortField, "desc");
        }
        else {
            this._md2Table.setSort(this.sortField, "asc");
        }
    };
    __decorate([
        Input('md2-sort-field'), 
        __metadata('design:type', String)
    ], Md2DataTableSortField.prototype, "sortField", void 0);
    Md2DataTableSortField = __decorate([
        Component({
            selector: "[md2-sort-field]",
            template: "\n    <span (click)=\"_sort()\">\n      <ng-content></ng-content>\n      <svg *ngIf=\"isAsc\" width=\"24\"height=\"24\" viewBox=\"0 0 24 24\">\n        <path d=\"M7 14l5-5 5 5z\"/>\n      </svg>\n      <svg *ngIf=\"isDesc\" width=\"24\"height=\"24\" viewBox=\"0 0 24 24\">\n        <path d=\"M7 10l5 5 5-5z\"/>\n      </svg>\n      <svg *ngIf=\"!isAsc && !isDesc\" width=\"24\"height=\"24\" viewBox=\"0 0 24 24\">\n        <path d=\"M7,10.5l5-5l5,5H7z\"/>\n        <path d=\"M7,12.5l5,5l5-5H7z\"/>\n      </svg>\n    </span>\n  ",
            styles: ["\n    [md2-sort-field] span { position: relative; display: block; line-height: 24px; white-space: nowrap; cursor: pointer; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; }\n    [md2-sort-field] span svg { display: inline-block; vertical-align: middle; fill: currentColor; }\n  "],
            encapsulation: ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [Md2DataTable])
    ], Md2DataTableSortField);
    return Md2DataTableSortField;
}());
export var Md2Pagination = (function () {
    function Md2Pagination(injectMd2Table) {
        var _this = this;
        this.injectMd2Table = injectMd2Table;
        this._minRows = 0;
        this.dataLength = 0;
        this.rows = [];
        this._onPageChange = function (event) {
            _this._activePage = event.activePage;
            _this._rows = event.pageLength;
            _this.dataLength = event.dataLength;
            _this._lastPage = Math.ceil(_this.dataLength / _this._rows);
        };
    }
    Md2Pagination.prototype.ngOnChanges = function (changes) {
        if (changes.rows) {
        }
        this._md2Table = this.md2InputTable || this.injectMd2Table;
        this._onPageChange(this._md2Table.getPage());
        this._md2Table.onPageChange.subscribe(this._onPageChange);
    };
    Md2Pagination.prototype._setPage = function (page) {
        this._md2Table.setPage(page, this._rows);
    };
    Md2Pagination.prototype._setRows = function (rows) {
        this._md2Table.setPage(this._activePage, rows);
    };
    __decorate([
        Input('md2-rows'), 
        __metadata('design:type', Object)
    ], Md2Pagination.prototype, "rows", void 0);
    __decorate([
        Input('md2-table'), 
        __metadata('design:type', Md2DataTable)
    ], Md2Pagination.prototype, "md2InputTable", void 0);
    Md2Pagination = __decorate([
        Component({
            selector: 'md2-pagination',
            template: "\n    <ul class=\"md2-pagination\" *ngIf=\"dataLength > _rows\">\n      <li [class.disabled]=\"_activePage <= 1\" (click)=\"_setPage(1)\">\n        <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\">\n          <path d=\"M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z\"/>\n        </svg>\n      </li>\n      <li *ngIf=\"_activePage > 4 && _activePage + 1 > _lastPage\" (click)=\"_setPage(_activePage - 4)\">{{_activePage-4}}</li>\n      <li *ngIf=\"_activePage > 3 && _activePage + 2 > _lastPage\" (click)=\"_setPage(_activePage - 3)\">{{_activePage-3}}</li>\n      <li *ngIf=\"_activePage > 2\" (click)=\"_setPage(_activePage - 2)\">{{_activePage-2}}</li>\n      <li *ngIf=\"_activePage > 1\" (click)=\"_setPage(_activePage - 1)\">{{_activePage-1}}</li>\n      <li class=\"active\">{{_activePage}}</li>\n      <li *ngIf=\"_activePage + 1 <= _lastPage\" (click)=\"_setPage(_activePage + 1)\">{{_activePage+1}}</li>\n      <li *ngIf=\"_activePage + 2 <= _lastPage\" (click)=\"_setPage(_activePage + 2)\">{{_activePage+2}}</li>\n      <li *ngIf=\"_activePage + 3 <= _lastPage && _activePage < 3\" (click)=\"_setPage(_activePage + 3)\">{{_activePage+3}}</li>\n      <li *ngIf=\"_activePage + 4 <= _lastPage && _activePage < 2\" (click)=\"_setPage(_activePage + 4)\">{{_activePage+4}}</li>\n      <li [class.disabled]=\"_activePage >= _lastPage\" (click)=\"_setPage(_lastPage)\">\n        <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\">\n          <path d=\"M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z\"/>\n        </svg>\n      </li>\n    </ul>\n    <div class=\"md2-rows-select\" *ngIf=\"dataLength > _minRows\">\n      Rows per page:\n      <select (change)=\"_setRows($event.target.value)\">\n        <option *ngFor=\"let row of rows\" [selected]=\"_rows===row\">{{row}}</option>\n      </select>\n    </div>\n  ",
            styles: ["\n    md2-pagination { display: block; color: #0e59a5; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; }\n    md2-pagination:before,\n    md2-pagination:after { display: table; content: ''; }\n    md2-pagination:after { clear: both; }\n    md2-pagination .md2-pagination { display: inline-block; margin: .5rem 0; padding: 0; }\n    md2-pagination .md2-pagination li { position: relative; display: inline-block; width: 36px; vertical-align: top; text-align: center; line-height: 36px; border-radius: 100px; cursor: pointer; box-sizing: border-box; }\n    md2-pagination .md2-pagination li:hover { background: rgba(0,0,0,0.12); }\n    md2-pagination .md2-pagination li.disabled,\n    md2-pagination .md2-pagination li.disabled:hover { pointer-events: none; background: transparent; cursor: default; opacity: .5; }\n    md2-pagination .md2-pagination li.active,\n    md2-pagination .md2-pagination li.active:hover { background: #106CC8; color: #fff; cursor: default; }\n    md2-pagination .md2-pagination li svg { fill: currentColor; margin-bottom: -7px; }\n    md2-pagination .md2-rows-select { display: inline-block; margin: .5rem 0; padding: 0; float: right; color: rgba(0,0,0,.54); line-height: 36px; }\n    md2-pagination .md2-rows-select select { border: 0; outline: 0; }\n  "],
            encapsulation: ViewEncapsulation.None
        }),
        __param(0, Optional()), 
        __metadata('design:paramtypes', [Md2DataTable])
    ], Md2Pagination);
    return Md2Pagination;
}());
export var MD2_DATA_TABLE_DIRECTIVES = [Md2DataTable, Md2DataTableSortField, Md2Pagination];
export var Md2DataTableModule = (function () {
    function Md2DataTableModule() {
    }
    Md2DataTableModule.forRoot = function () {
        return {
            ngModule: Md2DataTableModule,
            providers: []
        };
    };
    Md2DataTableModule = __decorate([
        NgModule({
            imports: [CommonModule],
            exports: MD2_DATA_TABLE_DIRECTIVES,
            declarations: MD2_DATA_TABLE_DIRECTIVES,
        }), 
        __metadata('design:paramtypes', [])
    ], Md2DataTableModule);
    return Md2DataTableModule;
}());

//# sourceMappingURL=data-table.js.map
