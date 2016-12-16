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
import { NgModule, Directive, OpaqueToken, Inject } from '@angular/core';
export var MATERIAL_COMPATIBILITY_MODE = new OpaqueToken('md-compatibiility-mode');
/** Selector that matches all elements that may have style collisions with material1. */
export var MAT_ELEMENTS_SELECTOR = "\n  mat-autocomplete,\n  mat-card,\n  mat-card-actions,\n  mat-card-content,\n  mat-card-footer,\n  mat-card-header,\n  mat-card-subtitle,\n  mat-card-title,\n  mat-card-title-group,\n  mat-checkbox,\n  mat-chip,\n  mat-dialog-container,\n  mat-divider,\n  mat-grid-list,\n  mat-grid-tile,\n  mat-grid-tile-footer,\n  mat-grid-tile-header,\n  mat-hint,\n  mat-icon,\n  mat-ink-bar,\n  mat-input,\n  mat-list,\n  mat-list-item,\n  mat-menu,\n  mat-nav-list,\n  mat-option,\n  mat-placeholder,\n  mat-progress-bar,\n  mat-progress-circle,\n  mat-radio-button,\n  mat-radio-group,\n  mat-select,\n  mat-sidenav,\n  mat-slider,\n  mat-spinner,\n  mat-tab,\n  mat-toolbar\n";
/** Directive that enforces that the `mat-` prefix cannot be used. */
export var MatPrefixEnforcer = (function () {
    function MatPrefixEnforcer(isCompatibilityMode) {
        if (!isCompatibilityMode) {
            throw Error('The "mat-" prefix cannot be used out of ng-material v1 compatibility mode.');
        }
    }
    MatPrefixEnforcer = __decorate([
        Directive({ selector: MAT_ELEMENTS_SELECTOR }),
        __param(0, Inject(MATERIAL_COMPATIBILITY_MODE)), 
        __metadata('design:paramtypes', [Boolean])
    ], MatPrefixEnforcer);
    return MatPrefixEnforcer;
}());
/**
 * Module that enforces the default "compatibility mode" settings. When this module is loaded
 * without NoConflictStyleCompatibilityMode also being imported, it will throw an error if
 * there are any uses of the `mat-` prefix.
 *
 * Because the point of this directive is to *not* be used, it will be tree-shaken away by
 * optimizers when not in compatibility mode.
 */
export var DefaultStyleCompatibilityModeModule = (function () {
    function DefaultStyleCompatibilityModeModule() {
    }
    DefaultStyleCompatibilityModeModule.forRoot = function () {
        return {
            ngModule: DefaultStyleCompatibilityModeModule,
            providers: [],
        };
    };
    DefaultStyleCompatibilityModeModule = __decorate([
        NgModule({
            declarations: [MatPrefixEnforcer],
            exports: [MatPrefixEnforcer],
            providers: [{
                    provide: MATERIAL_COMPATIBILITY_MODE, useValue: false,
                }]
        }), 
        __metadata('design:paramtypes', [])
    ], DefaultStyleCompatibilityModeModule);
    return DefaultStyleCompatibilityModeModule;
}());

//# sourceMappingURL=default-mode.js.map
