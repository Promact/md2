var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Md2AutocompleteModule } from '../autocomplete/index';
import { Md2Tags } from './tags';
export * from './tags';
var Md2TagsModule = (function () {
    function Md2TagsModule() {
    }
    return Md2TagsModule;
}());
Md2TagsModule = __decorate([
    NgModule({
        imports: [CommonModule, FormsModule, Md2AutocompleteModule],
        exports: [Md2Tags],
        declarations: [Md2Tags],
    })
], Md2TagsModule);
export { Md2TagsModule };
//# sourceMappingURL=index.js.map