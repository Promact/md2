var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Directive, ElementRef, NgModule, Output, EventEmitter } from '@angular/core';
/**
 * Directive that triggers a callback whenever the content of
 * its associated element has changed.
 */
export var ObserveContent = (function () {
    function ObserveContent(_elementRef) {
        this._elementRef = _elementRef;
        /** Event emitted for each change in the element's content. */
        this.event = new EventEmitter();
    }
    ObserveContent.prototype.ngAfterContentInit = function () {
        var _this = this;
        this._observer = new MutationObserver(function (mutations) { return mutations.forEach(function () { return _this.event.emit(); }); });
        this._observer.observe(this._elementRef.nativeElement, {
            characterData: true,
            childList: true,
            subtree: true
        });
    };
    ObserveContent.prototype.ngOnDestroy = function () {
        if (this._observer) {
            this._observer.disconnect();
        }
    };
    __decorate([
        Output('cdkObserveContent'), 
        __metadata('design:type', Object)
    ], ObserveContent.prototype, "event", void 0);
    ObserveContent = __decorate([
        Directive({
            selector: '[cdkObserveContent]'
        }), 
        __metadata('design:paramtypes', [ElementRef])
    ], ObserveContent);
    return ObserveContent;
}());
export var ObserveContentModule = (function () {
    function ObserveContentModule() {
    }
    /** @deprecated */
    ObserveContentModule.forRoot = function () {
        return {
            ngModule: ObserveContentModule,
            providers: []
        };
    };
    ObserveContentModule = __decorate([
        NgModule({
            exports: [ObserveContent],
            declarations: [ObserveContent]
        }), 
        __metadata('design:paramtypes', [])
    ], ObserveContentModule);
    return ObserveContentModule;
}());
//# sourceMappingURL=observe-content.js.map