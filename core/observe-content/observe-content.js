var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Directive, ElementRef, NgModule, Output, Input, EventEmitter, Injectable, } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
/**
 * Factory that creates a new MutationObserver and allows us to stub it out in unit tests.
 * @docs-private
 */
var MdMutationObserverFactory = (function () {
    function MdMutationObserverFactory() {
    }
    MdMutationObserverFactory.prototype.create = function (callback) {
        return new MutationObserver(callback);
    };
    return MdMutationObserverFactory;
}());
MdMutationObserverFactory = __decorate([
    Injectable()
], MdMutationObserverFactory);
export { MdMutationObserverFactory };
/**
 * Directive that triggers a callback whenever the content of
 * its associated element has changed.
 */
var ObserveContent = (function () {
    function ObserveContent(_mutationObserverFactory, _elementRef) {
        this._mutationObserverFactory = _mutationObserverFactory;
        this._elementRef = _elementRef;
        /** Event emitted for each change in the element's content. */
        this.event = new EventEmitter();
        /** Used for debouncing the emitted values to the observeContent event. */
        this._debouncer = new Subject();
    }
    ObserveContent.prototype.ngAfterContentInit = function () {
        var _this = this;
        if (this.debounce > 0) {
            this._debouncer
                .debounceTime(this.debounce)
                .subscribe(function (mutations) { return _this.event.emit(mutations); });
        }
        else {
            this._debouncer.subscribe(function (mutations) { return _this.event.emit(mutations); });
        }
        this._observer = this._mutationObserverFactory.create(function (mutations) {
            _this._debouncer.next(mutations);
        });
        this._observer.observe(this._elementRef.nativeElement, {
            characterData: true,
            childList: true,
            subtree: true
        });
    };
    ObserveContent.prototype.ngOnDestroy = function () {
        if (this._observer) {
            this._observer.disconnect();
            this._debouncer.complete();
            this._debouncer = this._observer = null;
        }
    };
    return ObserveContent;
}());
__decorate([
    Output('cdkObserveContent'),
    __metadata("design:type", Object)
], ObserveContent.prototype, "event", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number)
], ObserveContent.prototype, "debounce", void 0);
ObserveContent = __decorate([
    Directive({
        selector: '[cdkObserveContent]'
    }),
    __metadata("design:paramtypes", [MdMutationObserverFactory,
        ElementRef])
], ObserveContent);
export { ObserveContent };
var ObserveContentModule = (function () {
    function ObserveContentModule() {
    }
    return ObserveContentModule;
}());
ObserveContentModule = __decorate([
    NgModule({
        exports: [ObserveContent],
        declarations: [ObserveContent],
        providers: [MdMutationObserverFactory]
    })
], ObserveContentModule);
export { ObserveContentModule };
//# sourceMappingURL=observe-content.js.map