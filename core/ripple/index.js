var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { MdRipple } from './ripple';
import { MdCommonModule } from '../common-behaviors/common-module';
import { VIEWPORT_RULER_PROVIDER } from '../overlay/position/viewport-ruler';
import { ScrollDispatchModule } from '../overlay/scroll/index';
import { PlatformModule } from '../platform/index';
export { MdRipple, MD_RIPPLE_GLOBAL_OPTIONS } from './ripple';
export { RippleRef, RippleState } from './ripple-ref';
export { RIPPLE_FADE_IN_DURATION, RIPPLE_FADE_OUT_DURATION } from './ripple-renderer';
var MdRippleModule = (function () {
    function MdRippleModule() {
    }
    return MdRippleModule;
}());
MdRippleModule = __decorate([
    NgModule({
        imports: [MdCommonModule, PlatformModule, ScrollDispatchModule],
        exports: [MdRipple, MdCommonModule],
        declarations: [MdRipple],
        providers: [VIEWPORT_RULER_PROVIDER],
    })
], MdRippleModule);
export { MdRippleModule };
//# sourceMappingURL=index.js.map