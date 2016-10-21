"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var platform_browser_1 = require('@angular/platform-browser');
var http_1 = require('@angular/http');
var forms_1 = require('@angular/forms');
var demo_app_1 = require('./demo-app/demo-app');
var router_1 = require('@angular/router');
var md2_1 = require('md2');
var routes_1 = require('./demo-app/routes');
var accordion_demo_1 = require('./accordion/accordion-demo');
var autocomplete_demo_1 = require('./autocomplete/autocomplete-demo');
var chips_demo_1 = require('./chips/chips-demo');
var collapse_demo_1 = require('./collapse/collapse-demo');
var colorpicker_demo_1 = require('./colorpicker/colorpicker-demo');
var data_table_demo_1 = require('./data-table/data-table-demo');
var datepicker_demo_1 = require('./datepicker/datepicker-demo');
var dialog_demo_1 = require('./dialog/dialog-demo');
var menu_demo_1 = require('./menu/menu-demo');
var multiselect_demo_1 = require('./multiselect/multiselect-demo');
var select_demo_1 = require('./select/select-demo');
var tabs_demo_1 = require('./tabs/tabs-demo');
var tags_demo_1 = require('./tags/tags-demo');
var toast_demo_1 = require('./toast/toast-demo');
var tooltip_demo_1 = require('./tooltip/tooltip-demo');
var DemoAppModule = (function () {
    function DemoAppModule(_appRef) {
        this._appRef = _appRef;
    }
    DemoAppModule.prototype.ngDoBootstrap = function () {
        this._appRef.bootstrap(demo_app_1.DemoApp);
    };
    DemoAppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                http_1.HttpModule,
                router_1.RouterModule.forRoot(routes_1.DEMO_APP_ROUTES),
                md2_1.Md2Module.forRoot(),
            ],
            declarations: [
                demo_app_1.DemoApp,
                demo_app_1.Home,
                accordion_demo_1.AccordionDemo,
                autocomplete_demo_1.AutocompleteDemo,
                chips_demo_1.ChipsDemo,
                collapse_demo_1.CollapseDemo,
                colorpicker_demo_1.ColorpickerDemo,
                data_table_demo_1.DataTableDemo,
                datepicker_demo_1.DatepickerDemo,
                dialog_demo_1.DialogDemo,
                menu_demo_1.MenuDemo,
                multiselect_demo_1.MultiselectDemo,
                select_demo_1.SelectDemo,
                tabs_demo_1.TabsDemo,
                tags_demo_1.TagsDemo,
                toast_demo_1.ToastDemo,
                tooltip_demo_1.TooltipDemo,
            ],
            entryComponents: [
                demo_app_1.DemoApp,
            ],
        }), 
        __metadata('design:paramtypes', [core_1.ApplicationRef])
    ], DemoAppModule);
    return DemoAppModule;
}());
exports.DemoAppModule = DemoAppModule;

//# sourceMappingURL=demo-app-module.js.map
