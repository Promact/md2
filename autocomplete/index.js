var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HighlightPipe } from './autocomplete-pipe';
import { Md2Autocomplete } from './autocomplete';
export * from './autocomplete';
export * from './autocomplete-pipe';
var Md2AutocompleteModule = (function () {
    function Md2AutocompleteModule() {
    }
    return Md2AutocompleteModule;
}());
Md2AutocompleteModule = __decorate([
    NgModule({
        imports: [CommonModule, FormsModule],
        exports: [Md2Autocomplete, HighlightPipe],
        declarations: [Md2Autocomplete, HighlightPipe],
    })
], Md2AutocompleteModule);
export { Md2AutocompleteModule };
//# sourceMappingURL=index.js.map