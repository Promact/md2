var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StyleModule, OverlayModule, PortalModule, A11yModule } from '../core';
import { Md2Colorpicker, ColorpickerSliderDirective, TextDirective } from './colorpicker';
import { ColorUtil } from './color-util';
export * from './colorpicker';
export * from './color-util';
var Md2ColorpickerModule = (function () {
    function Md2ColorpickerModule() {
    }
    return Md2ColorpickerModule;
}());
Md2ColorpickerModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            OverlayModule,
            PortalModule,
            StyleModule,
            A11yModule,
        ],
        exports: [
            Md2Colorpicker,
            ColorpickerSliderDirective,
            TextDirective
        ],
        declarations: [
            Md2Colorpicker,
            ColorpickerSliderDirective,
            TextDirective
        ],
        providers: [ColorUtil]
    })
], Md2ColorpickerModule);
export { Md2ColorpickerModule };
//# sourceMappingURL=index.js.map