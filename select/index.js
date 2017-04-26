var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Md2Select } from './select';
import { Md2SelectHeader } from './select-header';
import { Md2OptionModule } from './option';
import { CompatibilityModule, OverlayModule } from '../core';
var Md2SelectModule = Md2SelectModule_1 = (function () {
    function Md2SelectModule() {
    }
    /** @deprecated */
    Md2SelectModule.forRoot = function () {
        return {
            ngModule: Md2SelectModule_1,
            providers: []
        };
    };
    return Md2SelectModule;
}());
Md2SelectModule = Md2SelectModule_1 = __decorate([
    NgModule({
        imports: [CommonModule, OverlayModule, Md2OptionModule, CompatibilityModule],
        exports: [Md2Select, Md2SelectHeader, Md2OptionModule, CompatibilityModule],
        declarations: [Md2Select, Md2SelectHeader],
    })
], Md2SelectModule);
export { Md2SelectModule };
export * from './select';
export * from './select-header';
export * from './option';
export { fadeInContent, transformPanel, transformPlaceholder } from './select-animations';
var Md2SelectModule_1;
//# sourceMappingURL=index.js.map