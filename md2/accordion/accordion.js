var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Md2Accordion } from './accordionpanel';
import { Md2AccordionTab, Md2AccordionHeader } from './accordiontab';
export * from './accordionpanel';
export * from './accordiontab';
export var MD2_ACCORDION_DIRECTIVES = [Md2Accordion, Md2AccordionTab, Md2AccordionHeader];
export var Md2AccordionModule = (function () {
    function Md2AccordionModule() {
    }
    Md2AccordionModule.forRoot = function () {
        return {
            ngModule: Md2AccordionModule,
            providers: []
        };
    };
    Md2AccordionModule = __decorate([
        NgModule({
            imports: [CommonModule],
            exports: MD2_ACCORDION_DIRECTIVES,
            declarations: MD2_ACCORDION_DIRECTIVES,
        }), 
        __metadata('design:paramtypes', [])
    ], Md2AccordionModule);
    return Md2AccordionModule;
}());
//# sourceMappingURL=accordion.js.map