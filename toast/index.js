var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule, MdCommonModule } from '../core';
import { PlatformModule } from '../core/platform/index';
import { Md2Toast, Md2ToastConfig, Md2ToastComponent } from './toast';
export * from './toast';
var Md2ToastModule = (function () {
    function Md2ToastModule() {
    }
    return Md2ToastModule;
}());
Md2ToastModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            OverlayModule,
            MdCommonModule,
            PlatformModule
        ],
        exports: [Md2ToastComponent, MdCommonModule],
        declarations: [Md2ToastComponent],
        entryComponents: [Md2ToastComponent],
        providers: [Md2Toast, Md2ToastConfig],
    })
], Md2ToastModule);
export { Md2ToastModule };
//# sourceMappingURL=index.js.map