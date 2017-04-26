var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { OverlayModule, CompatibilityModule } from '../core';
import { PlatformModule } from '../core/platform/index';
import { Md2Tooltip, Md2TooltipComponent } from './tooltip';
var Md2TooltipModule = Md2TooltipModule_1 = (function () {
    function Md2TooltipModule() {
    }
    /** @deprecated */
    Md2TooltipModule.forRoot = function () {
        return {
            ngModule: Md2TooltipModule_1,
            providers: []
        };
    };
    return Md2TooltipModule;
}());
Md2TooltipModule = Md2TooltipModule_1 = __decorate([
    NgModule({
        imports: [OverlayModule, CompatibilityModule, PlatformModule],
        exports: [Md2Tooltip, Md2TooltipComponent, CompatibilityModule],
        declarations: [Md2Tooltip, Md2TooltipComponent],
        entryComponents: [Md2TooltipComponent],
    })
], Md2TooltipModule);
export { Md2TooltipModule };
export * from './tooltip';
var Md2TooltipModule_1;
//# sourceMappingURL=index.js.map