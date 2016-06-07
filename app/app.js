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
const core_1 = require("@angular/core");
const router_deprecated_1 = require("@angular/router-deprecated");
const common_1 = require("@angular/common");
const home_1 = require('./home');
const accordion_1 = require('./components/accordion/accordion');
const autocomplete_1 = require('./components/autocomplete/autocomplete');
const collapse_1 = require('./components/collapse/collapse');
const colorpicker_1 = require('./components/colorpicker/colorpicker');
const dialog_1 = require('./components/dialog/dialog');
const menu_1 = require('./components/menu/menu');
const multiselect_1 = require('./components/multiselect/multiselect');
const select_1 = require('./components/select/select');
const switch_1 = require('./components/switch/switch');
const tabs_1 = require('./components/tabs/tabs');
const toast_1 = require('./components/toast/toast');
const tooltip_1 = require('./components/tooltip/tooltip');
let AppComponent = class AppComponent {
    constructor(location) {
        this.location = location;
        this.isSidenavOpened = false;
    }
    ngOnInit() {
        console.log("Application component initialized ...");
    }
    sidenavToggle() {
        this.isSidenavOpened = !this.isSidenavOpened;
    }
    isActive(path) {
        return this.location.path().startsWith(path);
    }
};
AppComponent = __decorate([
    core_1.Component({
        selector: "md2-app",
        templateUrl: "./app/app.html",
        directives: [home_1.Home, accordion_1.Accordion, autocomplete_1.Autocomplete, collapse_1.Collapse, colorpicker_1.Colorpicker, dialog_1.DialogComponent, menu_1.Menu, multiselect_1.Multiselect, select_1.Select, switch_1.Switch, tabs_1.Tabs, toast_1.Toast, tooltip_1.Tooltip, router_deprecated_1.RouterLink, router_deprecated_1.ROUTER_DIRECTIVES]
    }),
    router_deprecated_1.RouteConfig([
        { path: '/', name: 'Home', component: home_1.Home },
        { path: '/Accordion', name: 'Accordion', component: accordion_1.Accordion },
        { path: '/Autocomplete', name: 'Autocomplete', component: autocomplete_1.Autocomplete },
        { path: '/Collapse', name: 'Collapse', component: collapse_1.Collapse },
        { path: '/Colorpicker', name: 'Colorpicker', component: colorpicker_1.Colorpicker },
        { path: '/Dialog', name: 'Dialog', component: dialog_1.DialogComponent },
        { path: '/Menu', name: 'Menu', component: menu_1.Menu },
        { path: '/Multiselect', name: 'Multiselect', component: multiselect_1.Multiselect },
        { path: '/Select', name: 'Select', component: select_1.Select },
        { path: '/Switch', name: 'Switch', component: switch_1.Switch },
        { path: '/Tabs', name: 'Tabs', component: tabs_1.Tabs },
        { path: '/Toast', name: 'Toast', component: toast_1.Toast },
        { path: '/Tooltip', name: 'Tooltip', component: tooltip_1.Tooltip }
    ]), 
    __metadata('design:paramtypes', [common_1.Location])
], AppComponent);
exports.AppComponent = AppComponent;

//# sourceMappingURL=app.js.map
