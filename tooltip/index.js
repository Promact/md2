var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { OverlayModule, MdCommonModule } from '../core';
import { PlatformModule } from '../core/platform/index';
import { Md2Tooltip, Md2TooltipComponent } from './tooltip';
var Md2TooltipModule = (function () {
    function Md2TooltipModule() {
    }
    return Md2TooltipModule;
}());
Md2TooltipModule = __decorate([
    NgModule({
        imports: [OverlayModule, MdCommonModule, PlatformModule],
        exports: [Md2Tooltip, Md2TooltipComponent, MdCommonModule],
        declarations: [Md2Tooltip, Md2TooltipComponent],
        entryComponents: [Md2TooltipComponent],
    })
], Md2TooltipModule);
export { Md2TooltipModule };
export * from './tooltip';
//# sourceMappingURL=index.js.map