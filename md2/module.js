var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { MdRippleModule, RtlModule, ObserveContentModule, PortalModule, OverlayModule, A11yModule, CompatibilityModule, } from './core/index';
import { Md2AccordionModule } from './accordion/index';
import { Md2AutocompleteModule } from './autocomplete/index';
import { Md2ChipsModule } from './chips/index';
import { Md2CollapseModule } from './collapse/index';
import { Md2ColorpickerModule } from './colorpicker/index';
import { Md2DataTableModule } from './data-table/index';
import { Md2DatepickerModule } from './datepicker/index';
import { Md2DialogModule } from './dialog/index';
import { Md2MenuModule } from './menu/index';
import { Md2SelectModule } from './select/index';
import { Md2TabsModule } from './tabs/index';
import { Md2TagsModule } from './tags/index';
import { Md2ToastModule } from './toast/index';
import { Md2TooltipModule } from './tooltip/index';
import { PlatformModule } from './core/platform/index';
import { StyleModule } from './core/style/index';
var MD2_MODULES = [
    Md2AccordionModule,
    Md2AutocompleteModule,
    Md2ChipsModule,
    Md2CollapseModule,
    Md2ColorpickerModule,
    Md2DataTableModule,
    Md2DatepickerModule,
    Md2DialogModule,
    Md2MenuModule,
    MdRippleModule,
    Md2SelectModule,
    Md2TabsModule,
    Md2TagsModule,
    Md2ToastModule,
    Md2TooltipModule,
    OverlayModule,
    PortalModule,
    RtlModule,
    StyleModule,
    A11yModule,
    PlatformModule,
    CompatibilityModule,
    ObserveContentModule
];
var Md2RootModule = (function () {
    function Md2RootModule() {
    }
    return Md2RootModule;
}());
Md2RootModule = __decorate([
    NgModule({
        imports: [
            Md2AccordionModule.forRoot(),
            Md2AutocompleteModule.forRoot(),
            Md2ChipsModule.forRoot(),
            Md2CollapseModule.forRoot(),
            Md2ColorpickerModule.forRoot(),
            Md2DataTableModule.forRoot(),
            Md2DatepickerModule.forRoot(),
            Md2DialogModule.forRoot(),
            Md2MenuModule.forRoot(),
            MdRippleModule.forRoot(),
            Md2SelectModule.forRoot(),
            Md2TabsModule.forRoot(),
            Md2TagsModule.forRoot(),
            Md2ToastModule.forRoot(),
            Md2TooltipModule.forRoot(),
            PortalModule.forRoot(),
            RtlModule.forRoot(),
            ObserveContentModule.forRoot(),
            // These modules include providers.
            A11yModule.forRoot(),
            PlatformModule.forRoot(),
            OverlayModule.forRoot(),
            CompatibilityModule.forRoot(),
        ],
        exports: MD2_MODULES,
    })
], Md2RootModule);
export { Md2RootModule };
var Md2Module = (function () {
    function Md2Module() {
    }
    /** @deprecated */
    Md2Module.forRoot = function () {
        return { ngModule: Md2RootModule };
    };
    return Md2Module;
}());
Md2Module = __decorate([
    NgModule({
        imports: MD2_MODULES,
        exports: MD2_MODULES,
    })
], Md2Module);
export { Md2Module };
//# sourceMappingURL=module.js.map