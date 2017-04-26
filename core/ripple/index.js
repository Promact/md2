var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { MdRipple } from './ripple';
import { CompatibilityModule } from '../compatibility/compatibility';
import { VIEWPORT_RULER_PROVIDER } from '../overlay/position/viewport-ruler';
import { SCROLL_DISPATCHER_PROVIDER } from '../overlay/scroll/scroll-dispatcher';
export { MdRipple, MD_RIPPLE_GLOBAL_OPTIONS } from './ripple';
export { RippleRef, RippleState } from './ripple-ref';
export { RIPPLE_FADE_IN_DURATION, RIPPLE_FADE_OUT_DURATION } from './ripple-renderer';
var MdRippleModule = MdRippleModule_1 = (function () {
    function MdRippleModule() {
    }
    /** @deprecated */
    MdRippleModule.forRoot = function () {
        return {
            ngModule: MdRippleModule_1,
            providers: []
        };
    };
    return MdRippleModule;
}());
MdRippleModule = MdRippleModule_1 = __decorate([
    NgModule({
        imports: [CompatibilityModule],
        exports: [MdRipple, CompatibilityModule],
        declarations: [MdRipple],
        providers: [VIEWPORT_RULER_PROVIDER, SCROLL_DISPATCHER_PROVIDER],
    })
], MdRippleModule);
export { MdRippleModule };
var MdRippleModule_1;
//# sourceMappingURL=index.js.map