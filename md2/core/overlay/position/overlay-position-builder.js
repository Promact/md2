var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", './viewport-ruler', './connected-position-strategy', '@angular/core', './global-position-strategy'], factory);
    }
})(function (require, exports) {
    "use strict";
    var viewport_ruler_1 = require('./viewport-ruler');
    var connected_position_strategy_1 = require('./connected-position-strategy');
    var core_1 = require('@angular/core');
    var global_position_strategy_1 = require('./global-position-strategy');
    /** Builder for overlay position strategy. */
    var OverlayPositionBuilder = (function () {
        function OverlayPositionBuilder(_viewportRuler) {
            this._viewportRuler = _viewportRuler;
        }
        /** Creates a global position strategy. */
        OverlayPositionBuilder.prototype.global = function () {
            return new global_position_strategy_1.GlobalPositionStrategy();
        };
        /** Creates a relative position strategy. */
        OverlayPositionBuilder.prototype.connectedTo = function (elementRef, originPos, overlayPos) {
            return new connected_position_strategy_1.ConnectedPositionStrategy(elementRef, originPos, overlayPos, this._viewportRuler);
        };
        OverlayPositionBuilder = __decorate([
            core_1.Injectable(), 
            __metadata('design:paramtypes', [viewport_ruler_1.ViewportRuler])
        ], OverlayPositionBuilder);
        return OverlayPositionBuilder;
    }());
    exports.OverlayPositionBuilder = OverlayPositionBuilder;
});

//# sourceMappingURL=overlay-position-builder.js.map
