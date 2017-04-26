var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { NgModule, Directive, HostBinding, Output, Input, EventEmitter } from '@angular/core';
/**
 * Directive to listen for changes of direction of part of the DOM.
 *
 * Applications should use this directive instead of the native attribute so that Material
 * components can listen on changes of direction.
 */
var Dir = (function () {
    function Dir() {
        /** Layout direction of the element. */
        this._dir = 'ltr';
        /** Event emitted when the direction changes. */
        this.dirChange = new EventEmitter();
    }
    Object.defineProperty(Dir.prototype, "dir", {
        /** @docs-private */
        get: function () {
            return this._dir;
        },
        set: function (v) {
            var old = this._dir;
            this._dir = v;
            if (old != this._dir) {
                this.dirChange.emit();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Dir.prototype, "value", {
        /** Current layout direction of the element. */
        get: function () { return this.dir; },
        set: function (v) { this.dir = v; },
        enumerable: true,
        configurable: true
    });
    return Dir;
}());
__decorate([
    Input('dir'),
    __metadata("design:type", String)
], Dir.prototype, "_dir", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], Dir.prototype, "dirChange", void 0);
__decorate([
    HostBinding('attr.dir'),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], Dir.prototype, "dir", null);
Dir = __decorate([
    Directive({
        selector: '[dir]',
        // TODO(hansl): maybe `$implicit` isn't the best option here, but for now that's the best we got.
        exportAs: '$implicit'
    })
], Dir);
export { Dir };
var RtlModule = RtlModule_1 = (function () {
    function RtlModule() {
    }
    /** @deprecated */
    RtlModule.forRoot = function () {
        return {
            ngModule: RtlModule_1,
            providers: []
        };
    };
    return RtlModule;
}());
RtlModule = RtlModule_1 = __decorate([
    NgModule({
        exports: [Dir],
        declarations: [Dir]
    })
], RtlModule);
export { RtlModule };
var RtlModule_1;
//# sourceMappingURL=dir.js.map