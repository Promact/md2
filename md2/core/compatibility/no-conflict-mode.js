var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { NgModule, Directive } from '@angular/core';
import { MATERIAL_COMPATIBILITY_MODE } from './default-mode';
/** Selector that matches all elements that may have style collisions with material1. */
export var MD_ELEMENTS_SELECTOR = "\n  md-autocomplete,\n  md-card,\n  md-card-actions,\n  md-card-content,\n  md-card-footer,\n  md-card-header,\n  md-card-subtitle,\n  md-card-title,\n  md-card-title-group,\n  md-checkbox,\n  md-chip,\n  md-dialog-container,\n  md-divider,\n  md-grid-list,\n  md-grid-tile,\n  md-grid-tile-footer,\n  md-grid-tile-header,\n  md-hint,\n  md-icon,\n  md-ink-bar,\n  md-input,\n  md-list,\n  md-list-item,\n  md-menu,\n  md-nav-list,\n  md-option,\n  md-placeholder,\n  md-progress-bar,\n  md-progress-circle,\n  md-radio-button,\n  md-radio-group,\n  md-select,\n  md-sidenav,\n  md-slider,\n  md-spinner,\n  md-tab,\n  md-toolbar\n";
/** Directive that enforces that the `md-` prefix cannot be used. */
export var MdPrefixEnforcer = (function () {
    function MdPrefixEnforcer() {
        throw Error('The "md-" prefix cannot be used in ng-material v1 compatibility mode.');
    }
    MdPrefixEnforcer = __decorate([
        Directive({ selector: MD_ELEMENTS_SELECTOR }), 
        __metadata('design:paramtypes', [])
    ], MdPrefixEnforcer);
    return MdPrefixEnforcer;
}());
export var NoConflictStyleCompatibilityMode = (function () {
    function NoConflictStyleCompatibilityMode() {
    }
    NoConflictStyleCompatibilityMode.forRoot = function () {
        return {
            ngModule: NoConflictStyleCompatibilityMode,
            providers: [],
        };
    };
    NoConflictStyleCompatibilityMode = __decorate([
        NgModule({
            declarations: [MdPrefixEnforcer],
            exports: [MdPrefixEnforcer],
            providers: [{
                    provide: MATERIAL_COMPATIBILITY_MODE, useValue: true,
                }],
        }), 
        __metadata('design:paramtypes', [])
    ], NoConflictStyleCompatibilityMode);
    return NoConflictStyleCompatibilityMode;
}());

//# sourceMappingURL=no-conflict-mode.js.map
