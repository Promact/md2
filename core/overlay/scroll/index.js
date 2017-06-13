var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { SCROLL_DISPATCHER_PROVIDER } from './scroll-dispatcher';
import { Scrollable } from './scrollable';
import { PlatformModule } from '../../platform/index';
import { ScrollStrategyOptions } from './scroll-strategy-options';
export { Scrollable } from './scrollable';
export { ScrollDispatcher } from './scroll-dispatcher';
export { ScrollStrategyOptions } from './scroll-strategy-options';
export { RepositionScrollStrategy } from './reposition-scroll-strategy';
export { CloseScrollStrategy } from './close-scroll-strategy';
export { NoopScrollStrategy } from './noop-scroll-strategy';
export { BlockScrollStrategy } from './block-scroll-strategy';
var ScrollDispatchModule = (function () {
    function ScrollDispatchModule() {
    }
    return ScrollDispatchModule;
}());
ScrollDispatchModule = __decorate([
    NgModule({
        imports: [PlatformModule],
        exports: [Scrollable],
        declarations: [Scrollable],
        providers: [SCROLL_DISPATCHER_PROVIDER, ScrollStrategyOptions],
    })
], ScrollDispatchModule);
export { ScrollDispatchModule };
//# sourceMappingURL=index.js.map