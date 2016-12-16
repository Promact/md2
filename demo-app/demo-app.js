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
var common_1 = require('@angular/common');
var router_1 = require('@angular/router');
var Home = (function () {
    function Home() {
    }
    Home = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'home',
            templateUrl: 'home.html',
        }), 
        __metadata('design:paramtypes', [])
    ], Home);
    return Home;
}());
exports.Home = Home;
var DemoApp = (function () {
    function DemoApp(location, _router) {
        var _this = this;
        this.location = location;
        this._router = _router;
        this.isSidenavOpened = false;
        this.footerNav = { prev: null, next: null };
        this.navItems = [
            { name: 'Accordion', route: 'accordion' },
            { name: 'Autocomplete', route: 'autocomplete' },
            { name: 'Chips', route: 'chips' },
            { name: 'Collapse', route: 'collapse' },
            { name: 'Colorpicker', route: 'colorpicker' },
            { name: 'Data Table', route: 'datatable' },
            { name: 'Datepicker', route: 'datepicker' },
            { name: 'Dialog', route: 'dialog' },
            { name: 'Menu', route: 'menu' },
            { name: 'Multiselect', route: 'multiselect' },
            { name: 'Select', route: 'select' },
            { name: 'Tabs', route: 'tabs' },
            { name: 'Tags', route: 'tags' },
            { name: 'Toast', route: 'toast' },
            { name: 'Tooltip', route: 'tooltip' },
        ];
        _router.events.subscribe(function (value) {
            var current = _this.navItems.map(function (v) { return '/' + v.route; }).indexOf(value.url);
            _this.footerNav.prev = _this.navItems[current - 1];
            _this.footerNav.next = _this.navItems[current + 1];
            if (current === 0) {
                _this.footerNav.prev = { name: 'Home', route: '' };
            }
        });
    }
    DemoApp.prototype.ngOnInit = function () {
        console.log('Application component initialized ...');
    };
    DemoApp.prototype.sidenavToggle = function () {
        this.isSidenavOpened = !this.isSidenavOpened;
    };
    DemoApp.prototype.sidenav = function (state) {
        this.isSidenavOpened = state;
        if (this.isSidenavOpened && this.window.innerWidth > 767) {
            this.isSidenavOpened = false;
        }
    };
    DemoApp.prototype.isActive = function (path) {
        return this.location.path() === '/' + path;
    };
    Object.defineProperty(DemoApp.prototype, "window", {
        get: function () { return window; },
        enumerable: true,
        configurable: true
    });
    DemoApp = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'demo-app',
            providers: [],
            templateUrl: 'demo-app.html',
            encapsulation: core_1.ViewEncapsulation.None,
        }), 
        __metadata('design:paramtypes', [common_1.Location, router_1.Router])
    ], DemoApp);
    return DemoApp;
}());
exports.DemoApp = DemoApp;

//# sourceMappingURL=demo-app.js.map
