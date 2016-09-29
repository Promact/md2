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
var Home = (function () {
    function Home() {
    }
    Home = __decorate([
        core_1.Component({
            selector: 'home',
            template: "\n    <h4>Angular2 based Material Design components, directives and services are Accordion, Autocomplete, Collapse, Colorpicker, Datepicker, Dialog(Modal), Menu, Multiselect, Select, Tabs, Toast and Tooltip.</h4>\n    <hr>\n    <div class=\"home-page\">\n      <a button=\"primary\" href=\"https://github.com/Promact/md2\">View on GitHub</a>\n      <a button=\"primary\" href=\"https://github.com/Promact/md2/zipball/master\">Download .zip</a>\n      <a button=\"primary\" href=\"https://github.com/Promact/md2/tarball/master\">Download .tar.gz</a>\n      <h1>Getting started</h1>\n      <h4>Dependencies</h4>\n      <p>This module consists of native Angular2 components, directives and services, no jQuery, Material or Bootstrap javascript is required.</p>\n      <p>Plus this module plays nice with Material Design CSS</p>\n      <h4>Installation</h4>\n      <p>Currently preferable way to install this module is <code>npm</code>:</p>\n      <pre class=\"language-bash\"><code class=\"language-bash\">npm <span class=\"token function\">install</span> --save md2</code></pre>\n      <h4>Reading documentation</h4>\n      <p>Each <code>MD2</code> components has api and annotation docs, examples and working demo. Each <code>property</code> and <code>event</code> has type annotation and default value if any.</p>\n    </div>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], Home);
    return Home;
}());
exports.Home = Home;
var DemoApp = (function () {
    function DemoApp(location) {
        this.location = location;
        this.isSidenavOpened = false;
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
        return this.location.path() === path;
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
            styleUrls: ['demo-app.css'],
            encapsulation: core_1.ViewEncapsulation.None,
        }), 
        __metadata('design:paramtypes', [common_1.Location])
    ], DemoApp);
    return DemoApp;
}());
exports.DemoApp = DemoApp;

//# sourceMappingURL=demo-app.js.map
