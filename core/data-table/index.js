var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HeaderRowPlaceholder, RowPlaceholder, CdkTable } from './data-table';
import { CdkCellOutlet, CdkHeaderRow, CdkHeaderRowDef, CdkRow, CdkRowDef } from './row';
import { CdkColumnDef, CdkHeaderCellDef, CdkHeaderCell, CdkCell, CdkCellDef } from './cell';
export * from './data-source';
export * from './data-table';
var CdkDataTableModule = (function () {
    function CdkDataTableModule() {
    }
    return CdkDataTableModule;
}());
CdkDataTableModule = __decorate([
    NgModule({
        imports: [CommonModule],
        exports: [
            CdkTable, CdkRowDef, CdkCellDef, CdkCellOutlet, CdkHeaderCellDef,
            CdkColumnDef, CdkCell, CdkRow,
            CdkHeaderCell, CdkHeaderRow, CdkHeaderRowDef
        ],
        declarations: [
            CdkTable, CdkRowDef, CdkCellDef, CdkCellOutlet, CdkHeaderCellDef,
            CdkColumnDef, CdkCell, CdkRow,
            CdkHeaderCell, CdkHeaderRow, CdkHeaderRowDef,
            RowPlaceholder, HeaderRowPlaceholder,
        ]
    })
], CdkDataTableModule);
export { CdkDataTableModule };
//# sourceMappingURL=index.js.map