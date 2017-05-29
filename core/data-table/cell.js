var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ContentChild, Directive, ElementRef, Input, Renderer2, TemplateRef } from '@angular/core';
/**
 * Cell definition for a CDK data-table.
 * Captures the template of a column's data row cell as well as cell-specific properties.
 */
var CdkCellDef = (function () {
    function CdkCellDef(template) {
        this.template = template;
    }
    return CdkCellDef;
}());
CdkCellDef = __decorate([
    Directive({ selector: '[cdkCellDef]' }),
    __metadata("design:paramtypes", [TemplateRef])
], CdkCellDef);
export { CdkCellDef };
/**
 * Header cell definition for a CDK data-table.
 * Captures the template of a column's header cell and as well as cell-specific properties.
 */
var CdkHeaderCellDef = (function () {
    function CdkHeaderCellDef(template) {
        this.template = template;
    }
    return CdkHeaderCellDef;
}());
CdkHeaderCellDef = __decorate([
    Directive({ selector: '[cdkHeaderCellDef]' }),
    __metadata("design:paramtypes", [TemplateRef])
], CdkHeaderCellDef);
export { CdkHeaderCellDef };
/**
 * Column definition for the CDK data-table.
 * Defines a set of cells available for a table column.
 */
var CdkColumnDef = (function () {
    function CdkColumnDef() {
    }
    return CdkColumnDef;
}());
__decorate([
    Input('cdkColumnDef'),
    __metadata("design:type", String)
], CdkColumnDef.prototype, "name", void 0);
__decorate([
    ContentChild(CdkCellDef),
    __metadata("design:type", CdkCellDef)
], CdkColumnDef.prototype, "cell", void 0);
__decorate([
    ContentChild(CdkHeaderCellDef),
    __metadata("design:type", CdkHeaderCellDef)
], CdkColumnDef.prototype, "headerCell", void 0);
CdkColumnDef = __decorate([
    Directive({ selector: '[cdkColumnDef]' })
], CdkColumnDef);
export { CdkColumnDef };
/** Header cell template container that adds the right classes and role. */
var CdkHeaderCell = (function () {
    function CdkHeaderCell(columnDef, elementRef, renderer) {
        this.columnDef = columnDef;
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.renderer.addClass(elementRef.nativeElement, "cdk-column-" + columnDef.name);
    }
    return CdkHeaderCell;
}());
CdkHeaderCell = __decorate([
    Directive({
        selector: 'cdk-header-cell',
        host: {
            'class': 'cdk-header-cell',
            'role': 'columnheader',
        },
    }),
    __metadata("design:paramtypes", [CdkColumnDef,
        ElementRef,
        Renderer2])
], CdkHeaderCell);
export { CdkHeaderCell };
/** Cell template container that adds the right classes and role. */
var CdkCell = (function () {
    function CdkCell(columnDef, elementRef, renderer) {
        this.columnDef = columnDef;
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.renderer.addClass(elementRef.nativeElement, "cdk-column-" + columnDef.name);
    }
    return CdkCell;
}());
CdkCell = __decorate([
    Directive({
        selector: 'cdk-cell',
        host: {
            'class': 'cdk-cell',
            'role': 'gridcell',
        },
    }),
    __metadata("design:paramtypes", [CdkColumnDef,
        ElementRef,
        Renderer2])
], CdkCell);
export { CdkCell };
//# sourceMappingURL=cell.js.map