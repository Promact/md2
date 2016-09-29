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
        define(["require", "exports", '@angular/core', 'md2/accordion', 'md2/autocomplete', 'md2/collapse', 'md2/colorpicker', 'md2/datepicker', 'md2/dialog', 'md2/menu', 'md2/multiselect', 'md2/select', 'md2/tabs', 'md2/tags', 'md2/toast', 'md2/tooltip'], factory);
    }
})(function (require, exports) {
    "use strict";
    var core_1 = require('@angular/core');
    var accordion_1 = require('md2/accordion');
    var autocomplete_1 = require('md2/autocomplete');
    var collapse_1 = require('md2/collapse');
    var colorpicker_1 = require('md2/colorpicker');
    var datepicker_1 = require('md2/datepicker');
    var dialog_1 = require('md2/dialog');
    var menu_1 = require('md2/menu');
    var multiselect_1 = require('md2/multiselect');
    var select_1 = require('md2/select');
    var tabs_1 = require('md2/tabs');
    var tags_1 = require('md2/tags');
    var toast_1 = require('md2/toast');
    var tooltip_1 = require('md2/tooltip');
    var MD2_MODULES = [
        accordion_1.Md2AccordionModule,
        autocomplete_1.Md2AutocompleteModule,
        collapse_1.Md2CollapseModule,
        colorpicker_1.Md2ColorpickerModule,
        datepicker_1.Md2DatepickerModule,
        dialog_1.Md2DialogModule,
        menu_1.Md2MenuModule,
        multiselect_1.Md2MultiselectModule,
        select_1.Md2SelectModule,
        tabs_1.Md2TabsModule,
        tags_1.Md2TagsModule,
        toast_1.Md2ToastModule,
        tooltip_1.Md2TooltipModule,
    ];
    var Md2RootModule = (function () {
        function Md2RootModule() {
        }
        Md2RootModule = __decorate([
            core_1.NgModule({
                imports: [
                    accordion_1.Md2AccordionModule.forRoot(),
                    autocomplete_1.Md2AutocompleteModule.forRoot(),
                    collapse_1.Md2CollapseModule.forRoot(),
                    colorpicker_1.Md2ColorpickerModule.forRoot(),
                    datepicker_1.Md2DatepickerModule.forRoot(),
                    dialog_1.Md2DialogModule.forRoot(),
                    menu_1.Md2MenuModule.forRoot(),
                    multiselect_1.Md2MultiselectModule.forRoot(),
                    select_1.Md2SelectModule.forRoot(),
                    tabs_1.Md2TabsModule.forRoot(),
                    tags_1.Md2TagsModule.forRoot(),
                    toast_1.Md2ToastModule.forRoot(),
                    tooltip_1.Md2TooltipModule.forRoot(),
                ],
                exports: MD2_MODULES,
                providers: []
            }), 
            __metadata('design:paramtypes', [])
        ], Md2RootModule);
        return Md2RootModule;
    }());
    exports.Md2RootModule = Md2RootModule;
    var Md2Module = (function () {
        function Md2Module() {
        }
        Md2Module.forRoot = function () {
            return { ngModule: Md2RootModule };
        };
        Md2Module = __decorate([
            core_1.NgModule({
                imports: MD2_MODULES,
                exports: MD2_MODULES,
            }), 
            __metadata('design:paramtypes', [])
        ], Md2Module);
        return Md2Module;
    }());
    exports.Md2Module = Md2Module;
});

//# sourceMappingURL=all.js.map
