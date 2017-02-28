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
import { NgModule, Directive, OpaqueToken, Inject, Optional } from '@angular/core';
export var MATERIAL_COMPATIBILITY_MODE = new OpaqueToken('md-compatibility-mode');
/** Selector that matches all elements that may have style collisions with AngularJS Material. */
export var MAT_ELEMENTS_SELECTOR = "\n  [mat-button],\n  [mat-dialog-actions],\n  [mat-dialog-close],\n  [mat-dialog-content],\n  [mat-dialog-title],\n  [mat-fab],\n  [mat-icon-button],\n  [mat-menu-trigger-for],\n  [mat-mini-fab],\n  [mat-raised-button],\n  [mat-tab-label],\n  [mat-tab-link],\n  [mat-tab-nav-bar],\n  [matTooltip],\n  mat-autocomplete,\n  mat-button-toggle,\n  mat-button-toggle-group,\n  mat-button-toggle,\n  mat-card,\n  mat-card-actions,\n  mat-card-content,\n  mat-card-footer,\n  mat-card-header,\n  mat-card-subtitle,\n  mat-card-title,\n  mat-card-title-group,\n  mat-checkbox,\n  mat-chip,\n  mat-dialog-actions,\n  mat-dialog-container,\n  mat-dialog-content,\n  mat-divider,\n  mat-grid-list,\n  mat-grid-tile,\n  mat-grid-tile-footer,\n  mat-grid-tile-header,\n  mat-hint,\n  mat-icon,\n  mat-list,\n  mat-list-item,\n  mat-menu,\n  mat-nav-list,\n  mat-option,\n  mat-placeholder,\n  mat-progress-bar,\n  mat-progress-circle,\n  mat-pseudo-checkbox,\n  mat-radio-button,\n  mat-radio-group,\n  mat-select,\n  mat-sidenav,\n  mat-sidenav-container,\n  mat-slider,\n  mat-spinner,\n  mat-tab,\n  mat-tab-group,\n  mat-toolbar";
/** Selector that matches all elements that may have style collisions with AngularJS Material. */
export var MD_ELEMENTS_SELECTOR = "  \n  [md-button],\n  [md-dialog-actions],\n  [md-dialog-close],\n  [md-dialog-content],\n  [md-dialog-title],\n  [md-fab],\n  [md-icon-button],\n  [md-menu-trigger-for],\n  [md-mini-fab],\n  [md-raised-button],\n  [md-tab-label],\n  [md-tab-link],\n  [md-tab-nav-bar],\n  [mdTooltip],\n  md-autocomplete,\n  md-button-toggle,\n  md-button-toggle-group,\n  md-button-toggle,\n  md-card,\n  md-card-actions,\n  md-card-content,\n  md-card-footer,\n  md-card-header,\n  md-card-subtitle,\n  md-card-title,\n  md-card-title-group,\n  md-checkbox,\n  md-chip,\n  md-dialog-actions,\n  md-dialog-container,\n  md-dialog-content,\n  md-divider,\n  md-grid-list,\n  md-grid-tile,\n  md-grid-tile-footer,\n  md-grid-tile-header,\n  md-hint,\n  md-icon,\n  md-list,\n  md-list-item,\n  md-menu,\n  md-nav-list,\n  md-option,\n  md-placeholder,\n  md-progress-bar,\n  md-progress-circle,\n  md-pseudo-checkbox,\n  md-radio-button,\n  md-radio-group,\n  md-select,\n  md-sidenav,\n  md-sidenav-container,\n  md-slider,\n  md-spinner,\n  md-tab,\n  md-tab-group,\n  md-toolbar";
/** Directive that enforces that the `mat-` prefix cannot be used. */
export var MatPrefixRejector = (function () {
    function MatPrefixRejector(isCompatibilityMode) {
        if (!isCompatibilityMode) {
            throw Error('The "mat-" prefix cannot be used out of ng-material v1 compatibility mode.');
        }
    }
    MatPrefixRejector = __decorate([
        Directive({ selector: MAT_ELEMENTS_SELECTOR }),
        __param(0, Optional()),
        __param(0, Inject(MATERIAL_COMPATIBILITY_MODE)), 
        __metadata('design:paramtypes', [Boolean])
    ], MatPrefixRejector);
    return MatPrefixRejector;
}());
/** Directive that enforces that the `md-` prefix cannot be used. */
export var MdPrefixRejector = (function () {
    function MdPrefixRejector(isCompatibilityMode) {
        if (isCompatibilityMode) {
            throw Error('The "md-" prefix cannot be used in ng-material v1 compatibility mode.');
        }
    }
    MdPrefixRejector = __decorate([
        Directive({ selector: MD_ELEMENTS_SELECTOR }),
        __param(0, Optional()),
        __param(0, Inject(MATERIAL_COMPATIBILITY_MODE)), 
        __metadata('design:paramtypes', [Boolean])
    ], MdPrefixRejector);
    return MdPrefixRejector;
}());
/**
 * Module that enforces the default compatibility mode settings. When this module is loaded
 * without NoConflictStyleCompatibilityMode also being imported, it will throw an error if
 * there are any uses of the `mat-` prefix.
 */
export var CompatibilityModule = (function () {
    function CompatibilityModule() {
    }
    CompatibilityModule.forRoot = function () {
        return {
            ngModule: CompatibilityModule,
            providers: [],
        };
    };
    CompatibilityModule = __decorate([
        NgModule({
            declarations: [MatPrefixRejector, MdPrefixRejector],
            exports: [MatPrefixRejector, MdPrefixRejector],
        }), 
        __metadata('design:paramtypes', [])
    ], CompatibilityModule);
    return CompatibilityModule;
}());
/**
 * Module that enforces "no-conflict" compatibility mode settings. When this module is loaded,
 * it will throw an error if there are any uses of the `md-` prefix.
 */
export var NoConflictStyleCompatibilityMode = (function () {
    function NoConflictStyleCompatibilityMode() {
    }
    NoConflictStyleCompatibilityMode = __decorate([
        NgModule({
            providers: [{
                    provide: MATERIAL_COMPATIBILITY_MODE, useValue: true,
                }],
        }), 
        __metadata('design:paramtypes', [])
    ], NoConflictStyleCompatibilityMode);
    return NoConflictStyleCompatibilityMode;
}());
//# sourceMappingURL=compatibility.js.map