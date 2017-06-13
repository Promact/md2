var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { CloseScrollStrategy } from './close-scroll-strategy';
import { NoopScrollStrategy } from './noop-scroll-strategy';
import { BlockScrollStrategy } from './block-scroll-strategy';
import { ScrollDispatcher } from './scroll-dispatcher';
import { ViewportRuler } from '../position/viewport-ruler';
import { RepositionScrollStrategy, } from './reposition-scroll-strategy';
/**
 * Options for how an overlay will handle scrolling.
 *
 * Users can provide a custom value for `ScrollStrategyOptions` to replace the default
 * behaviors. This class primarily acts as a factory for ScrollStrategy instances.
 */
var ScrollStrategyOptions = (function () {
    function ScrollStrategyOptions(_scrollDispatcher, _viewportRuler) {
        var _this = this;
        this._scrollDispatcher = _scrollDispatcher;
        this._viewportRuler = _viewportRuler;
        /** Do nothing on scroll. */
        this.noop = function () { return new NoopScrollStrategy(); };
        /** Close the overlay as soon as the user scrolls. */
        this.close = function () { return new CloseScrollStrategy(_this._scrollDispatcher); };
        /** Block scrolling. */
        this.block = function () { return new BlockScrollStrategy(_this._viewportRuler); };
        /**
         * Update the overlay's position on scroll.
         * @param config Configuration to be used inside the scroll strategy.
         * Allows debouncing the reposition calls.
         */
        this.reposition = function (config) {
            return new RepositionScrollStrategy(_this._scrollDispatcher, config);
        };
    }
    return ScrollStrategyOptions;
}());
ScrollStrategyOptions = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [ScrollDispatcher,
        ViewportRuler])
], ScrollStrategyOptions);
export { ScrollStrategyOptions };
//# sourceMappingURL=scroll-strategy-options.js.map