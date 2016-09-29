var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", '@angular/core', '@angular/common', './accordionpanel', './accordiontab', './accordionpanel', './accordiontab'], factory);
    }
})(function (require, exports) {
    "use strict";
    var core_1 = require('@angular/core');
    var common_1 = require('@angular/common');
    var accordionpanel_1 = require('./accordionpanel');
    var accordiontab_1 = require('./accordiontab');
    var accordionpanel_2 = require('./accordionpanel');
    exports.Md2Accordion = accordionpanel_2.Md2Accordion;
    var accordiontab_2 = require('./accordiontab');
    exports.Md2AccordionTab = accordiontab_2.Md2AccordionTab;
    exports.MD2_ACCORDION_DIRECTIVES = [accordionpanel_1.Md2Accordion, accordiontab_1.Md2AccordionTab];
    var Md2AccordionModule = (function () {
        function Md2AccordionModule() {
        }
        Md2AccordionModule.forRoot = function () {
            return {
                ngModule: Md2AccordionModule,
                providers: []
            };
        };
        Md2AccordionModule = __decorate([
            core_1.NgModule({
                declarations: exports.MD2_ACCORDION_DIRECTIVES,
                imports: [common_1.CommonModule],
                exports: exports.MD2_ACCORDION_DIRECTIVES,
            }), 
            __metadata('design:paramtypes', [])
        ], Md2AccordionModule);
        return Md2AccordionModule;
    }());
    exports.Md2AccordionModule = Md2AccordionModule;
});

//# sourceMappingURL=accordion.js.map
