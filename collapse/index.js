var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Md2Collapse } from './collapse';
export * from './collapse';
var Md2CollapseModule = (function () {
    function Md2CollapseModule() {
    }
    return Md2CollapseModule;
}());
Md2CollapseModule = __decorate([
    NgModule({
        imports: [CommonModule],
        exports: [Md2Collapse],
        declarations: [Md2Collapse],
    })
], Md2CollapseModule);
export { Md2CollapseModule };
//# sourceMappingURL=index.js.map