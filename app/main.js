"use strict";
const app_1 = require('./app');
const platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
const core_1 = require("@angular/core");
const common_1 = require("@angular/common");
const router_deprecated_1 = require("@angular/router-deprecated");
platform_browser_dynamic_1.bootstrap(app_1.AppComponent, [
    router_deprecated_1.ROUTER_PROVIDERS,
    core_1.provide(common_1.LocationStrategy, { useClass: common_1.HashLocationStrategy })
]);

//# sourceMappingURL=main.js.map
