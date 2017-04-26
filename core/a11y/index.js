var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { FocusTrapDirective, FocusTrapDeprecatedDirective, FocusTrapFactory } from './focus-trap';
import { LIVE_ANNOUNCER_PROVIDER } from './live-announcer';
import { InteractivityChecker } from './interactivity-checker';
import { CommonModule } from '@angular/common';
import { PlatformModule } from '../platform/index';
var A11yModule = A11yModule_1 = (function () {
    function A11yModule() {
    }
    /** @deprecated */
    A11yModule.forRoot = function () {
        return {
            ngModule: A11yModule_1,
            providers: [],
        };
    };
    return A11yModule;
}());
A11yModule = A11yModule_1 = __decorate([
    NgModule({
        imports: [CommonModule, PlatformModule],
        declarations: [FocusTrapDirective, FocusTrapDeprecatedDirective],
        exports: [FocusTrapDirective, FocusTrapDeprecatedDirective],
        providers: [InteractivityChecker, FocusTrapFactory, LIVE_ANNOUNCER_PROVIDER]
    })
], A11yModule);
export { A11yModule };
var A11yModule_1;
//# sourceMappingURL=index.js.map