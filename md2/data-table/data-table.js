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
import { Component, Directive, EventEmitter, Input, Output, Optional, IterableDiffers, ViewEncapsulation, NgModule, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Md2SelectModule } from '../select/index';
var Md2PaginationChange = (function () {
    function Md2PaginationChange() {
    }
    return Md2PaginationChange;
}());
export { Md2PaginationChange };
var Md2DataTable = (function () {
    function Md2DataTable(differs) {
        this.differs = differs;
        this.isDataChanged = false;
        this._data = [];
        this._activePage = 1;
        this._rowsPerPage = 1000;
        this._sortBy = '';
        this._sortOrder = 'asc';
        this.activePageChange = new EventEmitter();
        this.sortByChange = new EventEmitter();
        this.sortOrderChange = new EventEmitter();
        this.onSortChange = new EventEmitter();
        this.onPageChange = new EventEmitter();
        this.diff = differs.find([]).create(null);
    }
    Object.defineProperty(Md2DataTable.prototype, "md2Data", {
        get: function () { return this._data; },
        set: function (value) {
            if (this._data !== value) {
                this._data = value || [];
                this.recalculatePage();
                this.isDataChanged = true;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2DataTable.prototype, "activePage", {
        get: function () { return this._activePage; },
        set: function (value) {
            if (this._activePage !== value) {
                this._activePage = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2DataTable.prototype, "rowsPerPage", {
        get: function () { return this._rowsPerPage; },
        set: function (value) {
            if (this._rowsPerPage !== value) {
                this._rowsPerPage = value;
                this.setPage(this.activePage, value);
                this.isDataChanged = true;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2DataTable.prototype, "sortBy", {
        get: function () { return this._sortBy; },
        set: function (value) {
            if (this._sortBy !== value) {
                this._sortBy = value;
                if (value) {
                    this.onSortChange.next({ sortBy: this.sortBy, sortOrder: this.sortOrder });
                }
                this.isDataChanged = true;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2DataTable.prototype, "sortOrder", {
        get: function () { return this._sortOrder; },
        set: function (value) {
            if (!(value === 'asc' || value === 'desc')) {
                console.warn('sortOrder value must be one of ["asc", "desc"], but is:', value);
                value = 'asc';
            }
            if (this._sortOrder !== value) {
                this._sortOrder = value;
                this.isDataChanged = true;
            }
        },
        enumerable: true,
        configurable: true
    });
    Md2DataTable.prototype.ngDoCheck = function () {
        var changes = this.diff.diff(this.md2Data);
        if (changes) {
            this.recalculatePage();
            this.isDataChanged = true;
        }
        if (this.isDataChanged) {
            this.fillData();
            this.diff.diff(this.md2Data);
            this.isDataChanged = false;
        }
    };
    Md2DataTable.prototype.getSort = function () {
        return { sortBy: this.sortBy, sortOrder: this.sortOrder };
    };
    Md2DataTable.prototype.setSort = function (sortBy, sortOrder) {
        if (this.sortBy !== sortBy || this.sortOrder !== sortOrder) {
            this.sortBy = sortBy;
            this.sortOrder = sortOrder;
            this.isDataChanged = true;
            this.onSortChange.next({ sortBy: sortBy, sortOrder: sortOrder });
            this.sortByChange.emit(this.sortBy);
            this.sortOrderChange.emit(this.sortOrder);
        }
    };
    Md2DataTable.prototype.getPage = function () {
        return {
            activePage: this.activePage,
            rowsPerPage: this.rowsPerPage,
            dataLength: this.md2Data.length
        };
    };
    Md2DataTable.prototype.setPage = function (activePage, rowsPerPage) {
        if (this.rowsPerPage !== rowsPerPage || this.activePage !== activePage) {
            this.activePage = this.activePage !== activePage ?
                activePage : this.calculateNewActivePage(this.rowsPerPage, rowsPerPage);
            this.rowsPerPage = rowsPerPage;
            this.isDataChanged = true;
            this.onPageChange.emit({
                activePage: this.activePage,
                rowsPerPage: this.rowsPerPage,
                dataLength: this.md2Data ? this.md2Data.length : 0
            });
            this.activePageChange.emit(this.activePage);
        }
    };
    Md2DataTable.prototype.calculateNewActivePage = function (previousRowsPerPage, currentRowsPerPage) {
        var firstRowOnPage = (this.activePage - 1) * previousRowsPerPage + 1;
        var newActivePage = Math.ceil(firstRowOnPage / currentRowsPerPage);
        return newActivePage;
    };
    Md2DataTable.prototype.recalculatePage = function () {
        var _this = this;
        var lastPage = Math.ceil(this.md2Data.length / this.rowsPerPage);
        if (lastPage < this.activePage) {
            this._activePage = lastPage || 1;
            setTimeout(function () {
                _this.activePageChange.emit(_this.activePage);
            }, 10);
        }
        else { }
        this.onPageChange.emit({
            activePage: this.activePage,
            rowsPerPage: this.rowsPerPage,
            dataLength: this.md2Data.length
        });
    };
    Md2DataTable.prototype.fillData = function () {
        var _this = this;
        var offset = (this.activePage - 1) * this.rowsPerPage;
        var data = this.md2Data;
        var sortInt = this.sortOrder === 'desc' ? -1 : 1;
        if (this.sortBy) {
            data = data.sort(function (a, b) {
                var x = _this.caseInsensitiveIteratee(a);
                var y = _this.caseInsensitiveIteratee(b);
                return ((x > y) ? 1 : (y > x) ? -1 : 0) * sortInt;
            });
        }
        this.data = data.slice(offset, offset + this.rowsPerPage);
    };
    Md2DataTable.prototype.caseInsensitiveIteratee = function (value) {
        if (typeof this.sortBy === 'string' || this.sortBy instanceof String) {
            for (var _i = 0, _a = this.sortBy.split('.'); _i < _a.length; _i++) {
                var sortByProperty = _a[_i];
                value = value[sortByProperty];
            }
        }
        else {
            value = value[this.sortBy + ''];
        }
        if (value && typeof value === 'string' || value instanceof String) {
            return value.toLowerCase();
        }
        return value;
    };
    return Md2DataTable;
}());
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Array])
], Md2DataTable.prototype, "md2Data", null);
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Number])
], Md2DataTable.prototype, "activePage", null);
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Number])
], Md2DataTable.prototype, "rowsPerPage", null);
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], Md2DataTable.prototype, "sortBy", null);
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [String])
], Md2DataTable.prototype, "sortOrder", null);
__decorate([
    Output(),
    __metadata("design:type", Object)
], Md2DataTable.prototype, "activePageChange", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], Md2DataTable.prototype, "sortByChange", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], Md2DataTable.prototype, "sortOrderChange", void 0);
Md2DataTable = __decorate([
    Directive({
        selector: 'table[md2Data]',
        exportAs: 'md2DataTable'
    }),
    __metadata("design:paramtypes", [IterableDiffers])
], Md2DataTable);
export { Md2DataTable };
var Md2DataTableSortBy = (function () {
    function Md2DataTableSortBy(_md2Table) {
        this._md2Table = _md2Table;
        this._isAsc = false;
        this._isDesc = false;
    }
    Md2DataTableSortBy.prototype.ngOnInit = function () {
        var _this = this;
        this._md2Table.onSortChange.subscribe(function (event) {
            _this._isAsc = (event.sortBy === _this.md2SortBy && event.sortOrder === 'asc');
            _this._isDesc = (event.sortBy === _this.md2SortBy && event.sortOrder === 'desc');
        });
    };
    Md2DataTableSortBy.prototype._sort = function () {
        if (this._isAsc) {
            this._md2Table.setSort(this.md2SortBy, 'desc');
        }
        else {
            this._md2Table.setSort(this.md2SortBy, 'asc');
        }
    };
    return Md2DataTableSortBy;
}());
__decorate([
    Input(),
    __metadata("design:type", String)
], Md2DataTableSortBy.prototype, "md2SortBy", void 0);
Md2DataTableSortBy = __decorate([
    Component({
        selector: '[md2SortBy]',
        template: "<ng-content></ng-content>&nbsp; <svg *ngIf=\"!_isDesc\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\"><path d=\"M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z\"/></svg> <svg *ngIf=\"_isDesc\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\"><path d=\"M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z\"/></svg>",
        styles: ["$primary: #106cc8 !default; /* * Data Table */ /* * Sort */ [md2SortBy] { line-height: 24px; color: rgba(black, 0.54); white-space: nowrap; cursor: pointer; user-select: none; svg { display: inline-block; vertical-align: middle; fill: currentColor; opacity: 0; } &:hover:not(.md2-sort-active) { svg { color: rgba(black, 0.26); opacity: 1; } } &.md2-sort-active { color: rgba(black, 0.87); svg { opacity: 1; } } } /* * Pagination */ md2-pagination { display: block; color: rgba(black, 0.54); user-select: none; &::before, &::after { display: table; content: ''; } &::after { clear: both; } .md2-pagination { display: inline-block; margin: 8px 0; padding: 0; li { position: relative; display: inline-block; width: 36px; vertical-align: top; text-align: center; line-height: 36px; border-radius: 100px; cursor: pointer; box-sizing: border-box; &:hover:not(.disabled):not(.active) { background: rgba(black, 0.12); } &.disabled { pointer-events: none; background: transparent; cursor: default; opacity: 0.48; } &.active { background: $primary; color: white; cursor: default; } svg { fill: currentColor; margin-bottom: -7px; } } } .md2-rows-select { display: inline-block; margin: 8px 0; padding: 0; float: right; color: rgba(black, 0.54); line-height: 36px; md2-select { display: inline-block; border: 0; outline: 0; } .md2-select-trigger { border-width: 0; min-width: 40px; } } } "],
        host: {
            '[class.md2-sort-active]': '_isAsc || _isDesc',
            '(click)': '_sort()'
        },
        encapsulation: ViewEncapsulation.None
    }),
    __metadata("design:paramtypes", [Md2DataTable])
], Md2DataTableSortBy);
export { Md2DataTableSortBy };
var Md2Pagination = (function () {
    function Md2Pagination(_dataTable) {
        var _this = this;
        this._dataTable = _dataTable;
        this._activePage = 1;
        this.rowsPerPageSet = [];
        this._dataLength = 0;
        this.onPageChangeSubscriber = function (event) {
            _this._activePage = event.activePage;
            _this._rowsPerPage = event.rowsPerPage;
            _this._dataLength = event.dataLength;
            _this._lastPage = Math.ceil(_this._dataLength / _this._rowsPerPage);
        };
    }
    Md2Pagination.prototype.ngDoCheck = function () {
        this.md2Table = this.md2Table || this._dataTable;
        this.onPageChangeSubscriber(this.md2Table.getPage());
        this.md2Table.onPageChange.subscribe(this.onPageChangeSubscriber);
    };
    Md2Pagination.prototype._setPage = function (pageNumber) {
        this.md2Table.setPage(pageNumber, this._rowsPerPage);
    };
    Md2Pagination.prototype._setRows = function (event) {
        this.md2Table.setPage(this._activePage, parseInt(event.value));
    };
    return Md2Pagination;
}());
__decorate([
    Input(),
    __metadata("design:type", Object)
], Md2Pagination.prototype, "rowsPerPageSet", void 0);
__decorate([
    Input(),
    __metadata("design:type", Md2DataTable)
], Md2Pagination.prototype, "md2Table", void 0);
Md2Pagination = __decorate([
    Component({
        selector: 'md2-pagination',
        template: "<ul class=\"md2-pagination\" *ngIf=\"_dataLength > _rowsPerPage\"><li [class.disabled]=\"_activePage <= 1\" (click)=\"_setPage(_activePage - 1)\"><svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><path d=\"M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z\"/></svg></li><li *ngIf=\"_activePage > 4 && _activePage + 1 > _lastPage\" (click)=\"_setPage(_activePage - 4)\">{{_activePage-4}}</li><li *ngIf=\"_activePage > 3 && _activePage + 2 > _lastPage\" (click)=\"_setPage(_activePage - 3)\">{{_activePage-3}}</li><li *ngIf=\"_activePage > 2\" (click)=\"_setPage(_activePage - 2)\">{{_activePage-2}}</li><li *ngIf=\"_activePage > 1\" (click)=\"_setPage(_activePage - 1)\">{{_activePage-1}}</li><li class=\"active\">{{_activePage}}</li><li *ngIf=\"_activePage + 1 <= _lastPage\" (click)=\"_setPage(_activePage + 1)\">{{_activePage+1}}</li><li *ngIf=\"_activePage + 2 <= _lastPage\" (click)=\"_setPage(_activePage + 2)\">{{_activePage+2}}</li><li *ngIf=\"_activePage + 3 <= _lastPage && _activePage < 3\" (click)=\"_setPage(_activePage + 3)\">{{_activePage+3}}</li><li *ngIf=\"_activePage + 4 <= _lastPage && _activePage < 2\" (click)=\"_setPage(_activePage + 4)\">{{_activePage+4}}</li><li [class.disabled]=\"_activePage >= _lastPage\" (click)=\"_setPage(_activePage + 1)\"><svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><path d=\"M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z\"/></svg></li></ul><div class=\"md2-rows-select\" *ngIf=\"rowsPerPageSet.length && _dataLength > 0\">Rows per page:<md2-select [(ngModel)]=\"_rowsPerPage\" (change)=\"_setRows($event)\"><md2-option *ngFor=\"let row of rowsPerPageSet\" [value]=\"row\">{{row}}</md2-option></md2-select></div>",
        styles: ["[md2SortBy]{line-height:24px;color:rgba(0,0,0,.54);white-space:nowrap;cursor:pointer;user-select:none}[md2SortBy] svg{display:inline-block;vertical-align:middle;fill:currentColor;opacity:0}[md2SortBy]:hover:not(.md2-sort-active) svg{color:rgba(0,0,0,.26);opacity:1}[md2SortBy].md2-sort-active{color:rgba(0,0,0,.87)}[md2SortBy].md2-sort-active svg{opacity:1}md2-pagination{display:block;color:rgba(0,0,0,.54);user-select:none}md2-pagination::after,md2-pagination::before{display:table;content:''}md2-pagination::after{clear:both}md2-pagination .md2-pagination{display:inline-block;margin:8px 0;padding:0}md2-pagination .md2-pagination li{position:relative;display:inline-block;width:36px;vertical-align:top;text-align:center;line-height:36px;border-radius:100px;cursor:pointer;box-sizing:border-box}md2-pagination .md2-pagination li:hover:not(.disabled):not(.active){background:rgba(0,0,0,.12)}md2-pagination .md2-pagination li.disabled{pointer-events:none;background:0 0;cursor:default;opacity:.48}md2-pagination .md2-pagination li.active{background:#106cc8;color:#fff;cursor:default}md2-pagination .md2-pagination li svg{fill:currentColor;margin-bottom:-7px}md2-pagination .md2-rows-select{display:inline-block;margin:8px 0;padding:0;float:right;color:rgba(0,0,0,.54);line-height:36px}md2-pagination .md2-rows-select md2-select{display:inline-block;border:0;outline:0}md2-pagination .md2-rows-select .md2-select-trigger{border-width:0;min-width:40px} /*# sourceMappingURL=data-table.css.map */ "],
        exportAs: 'md2Pagination',
        encapsulation: ViewEncapsulation.None
    }),
    __param(0, Optional()),
    __metadata("design:paramtypes", [Md2DataTable])
], Md2Pagination);
export { Md2Pagination };
export var MD2_DATA_TABLE_DIRECTIVES = [
    Md2DataTable,
    Md2DataTableSortBy,
    Md2Pagination
];
var Md2DataTableModule = Md2DataTableModule_1 = (function () {
    function Md2DataTableModule() {
    }
    Md2DataTableModule.forRoot = function () {
        return {
            ngModule: Md2DataTableModule_1
        };
    };
    return Md2DataTableModule;
}());
Md2DataTableModule = Md2DataTableModule_1 = __decorate([
    NgModule({
        imports: [CommonModule, FormsModule, Md2SelectModule.forRoot()],
        exports: MD2_DATA_TABLE_DIRECTIVES,
        declarations: MD2_DATA_TABLE_DIRECTIVES,
    })
], Md2DataTableModule);
export { Md2DataTableModule };
var Md2DataTableModule_1;
//# sourceMappingURL=data-table.js.map