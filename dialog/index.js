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
import { Md2Dialog, Md2DialogTitle, Md2DialogContent, Md2DialogActions, Md2DialogPortal } from './dialog';
var Md2DialogModule = (function () {
    function Md2DialogModule() {
    }
    return Md2DialogModule;
}());
Md2DialogModule = __decorate([
    NgModule({
        imports: [CommonModule, OverlayModule, MdCommonModule, PlatformModule],
        exports: [
            Md2Dialog,
            Md2DialogTitle,
            Md2DialogContent,
            Md2DialogActions,
            Md2DialogPortal
        ],
        declarations: [
            Md2Dialog,
            Md2DialogTitle,
            Md2DialogContent,
            Md2DialogActions,
            Md2DialogPortal
        ],
        entryComponents: [Md2Dialog],
    })
], Md2DialogModule);
export { Md2DialogModule };
export * from './dialog';
//# sourceMappingURL=index.js.map