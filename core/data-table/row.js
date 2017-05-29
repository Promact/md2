var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ChangeDetectionStrategy, Component, Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
/**
 * Header row definition for the CDK data-table.
 * Captures the header row's template and other header properties such as the columns to display.
 */
var CdkHeaderRowDef = (function () {
    function CdkHeaderRowDef(template) {
        this.template = template;
    }
    return CdkHeaderRowDef;
}());
__decorate([
    Input('cdkHeaderRowDef'),
    __metadata("design:type", Array)
], CdkHeaderRowDef.prototype, "columns", void 0);
CdkHeaderRowDef = __decorate([
    Directive({ selector: '[cdkHeaderRowDef]' }),
    __metadata("design:paramtypes", [TemplateRef])
], CdkHeaderRowDef);
export { CdkHeaderRowDef };
/**
 * Data row definition for the CDK data-table.
 * Captures the header row's template and other row properties such as the columns to display.
 */
var CdkRowDef = (function () {
    // TODO(andrewseguin): Add an input for providing a switch function to determine
    //   if this template should be used.
    function CdkRowDef(template) {
        this.template = template;
    }
    return CdkRowDef;
}());
__decorate([
    Input('cdkRowDefColumns'),
    __metadata("design:type", Array)
], CdkRowDef.prototype, "columns", void 0);
CdkRowDef = __decorate([
    Directive({ selector: '[cdkRowDef]' }),
    __metadata("design:paramtypes", [TemplateRef])
], CdkRowDef);
export { CdkRowDef };
/**
 * Outlet for rendering cells inside of a row or header row.
 * @docs-private
 */
var CdkCellOutlet = CdkCellOutlet_1 = (function () {
    function CdkCellOutlet(_viewContainer) {
        this._viewContainer = _viewContainer;
        CdkCellOutlet_1.mostRecentCellOutlet = this;
    }
    CdkCellOutlet.prototype.ngOnInit = function () {
        var _this = this;
        this.cells.forEach(function (cell) {
            _this._viewContainer.createEmbeddedView(cell.template, _this.context);
        });
    };
    return CdkCellOutlet;
}());
/**
 * Static property containing the latest constructed instance of this class.
 * Used by the CDK data-table when each CdkHeaderRow and CdkRow component is created using
 * createEmbeddedView. After one of these components are created, this property will provide
 * a handle to provide that component's cells and context. After init, the CdkCellOutlet will
 * construct the cells with the provided context.
 */
CdkCellOutlet.mostRecentCellOutlet = null;
CdkCellOutlet = CdkCellOutlet_1 = __decorate([
    Directive({ selector: '[cdkCellOutlet]' }),
    __metadata("design:paramtypes", [ViewContainerRef])
], CdkCellOutlet);
export { CdkCellOutlet };
/** Header template container that contains the cell outlet. Adds the right class and role. */
var CdkHeaderRow = (function () {
    function CdkHeaderRow() {
    }
    return CdkHeaderRow;
}());
CdkHeaderRow = __decorate([
    Component({
        selector: 'cdk-header-row',
        template: '<ng-container cdkCellOutlet></ng-container>',
        host: {
            'class': 'cdk-header-row',
            'role': 'row',
        },
        changeDetection: ChangeDetectionStrategy.OnPush,
    })
], CdkHeaderRow);
export { CdkHeaderRow };
/** Data row template container that contains the cell outlet. Adds the right class and role. */
var CdkRow = (function () {
    function CdkRow() {
    }
    return CdkRow;
}());
CdkRow = __decorate([
    Component({
        selector: 'cdk-row',
        template: '<ng-container cdkCellOutlet></ng-container>',
        host: {
            'class': 'cdk-row',
            'role': 'row',
        },
        changeDetection: ChangeDetectionStrategy.OnPush,
    })
], CdkRow);
export { CdkRow };
var CdkCellOutlet_1;
//# sourceMappingURL=row.js.map