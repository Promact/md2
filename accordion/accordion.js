var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Md2Accordion } from './accordionpanel';
import { Md2AccordionTab, Md2AccordionHeader } from './accordiontab';
export * from './accordionpanel';
export * from './accordiontab';
export var MD2_ACCORDION_DIRECTIVES = [Md2Accordion, Md2AccordionTab, Md2AccordionHeader];
var Md2AccordionModule = Md2AccordionModule_1 = (function () {
    function Md2AccordionModule() {
    }
    Md2AccordionModule.forRoot = function () {
        return {
            ngModule: Md2AccordionModule_1,
            providers: []
        };
    };
    return Md2AccordionModule;
}());
Md2AccordionModule = Md2AccordionModule_1 = __decorate([
    NgModule({
        imports: [CommonModule],
        exports: MD2_ACCORDION_DIRECTIVES,
        declarations: MD2_ACCORDION_DIRECTIVES,
    })
], Md2AccordionModule);
export { Md2AccordionModule };
var Md2AccordionModule_1;
//# sourceMappingURL=accordion.js.map