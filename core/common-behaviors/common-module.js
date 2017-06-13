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
import { NgModule, InjectionToken, Optional, Inject, isDevMode } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { CompatibilityModule } from '../compatibility/compatibility';
/** Injection token that configures whether the Material sanity checks are enabled. */
export var MATERIAL_SANITY_CHECKS = new InjectionToken('md-sanity-checks');
/**
 * Module that captures anything that should be loaded and/or run for *all* Angular Material
 * components. This includes Bidi, compatibility mode, etc.
 *
 * This module should be imported to each top-level component module (e.g., MdTabsModule).
 */
var MdCommonModule = (function () {
    function MdCommonModule(_document, _sanityChecksEnabled) {
        this._document = _document;
        /** Whether we've done the global sanity checks (e.g. a theme is loaded, there is a doctype). */
        this._hasDoneGlobalChecks = false;
        if (_sanityChecksEnabled && !this._hasDoneGlobalChecks && _document && isDevMode()) {
            this._checkDoctype();
            this._checkTheme();
            this._hasDoneGlobalChecks = true;
        }
    }
    MdCommonModule.prototype._checkDoctype = function () {
        if (!this._document.doctype) {
            console.warn('Current document does not have a doctype. This may cause ' +
                'some Angular Material components not to behave as expected.');
        }
    };
    MdCommonModule.prototype._checkTheme = function () {
        if (typeof getComputedStyle === 'function') {
            var testElement = this._document.createElement('div');
            testElement.classList.add('mat-theme-loaded-marker');
            this._document.body.appendChild(testElement);
            if (getComputedStyle(testElement).display !== 'none') {
                console.warn('Could not find Angular Material core theme. Most Material ' +
                    'components may not work as expected. For more info refer ' +
                    'to the theming guide: https://material.angular.io/guide/theming');
            }
            this._document.body.removeChild(testElement);
        }
    };
    return MdCommonModule;
}());
MdCommonModule = __decorate([
    NgModule({
        imports: [CompatibilityModule],
        exports: [CompatibilityModule],
        providers: [{
                provide: MATERIAL_SANITY_CHECKS, useValue: true,
            }],
    }),
    __param(0, Optional()), __param(0, Inject(DOCUMENT)),
    __param(1, Optional()), __param(1, Inject(MATERIAL_SANITY_CHECKS)),
    __metadata("design:paramtypes", [Object, Boolean])
], MdCommonModule);
export { MdCommonModule };
//# sourceMappingURL=common-module.js.map