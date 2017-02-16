var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Directive, ElementRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ScrollDispatcher } from './scroll-dispatcher';
import 'rxjs/add/observable/fromEvent';
/**
 * Sends an event when the directive's element is scrolled. Registers itself with the
 * ScrollDispatcher service to include itself as part of its collection of scrolling events that it
 * can be listened to through the service.
 */
export var Scrollable = (function () {
    function Scrollable(_elementRef, _scroll) {
        this._elementRef = _elementRef;
        this._scroll = _scroll;
    }
    Scrollable.prototype.ngOnInit = function () {
        this._scroll.register(this);
    };
    Scrollable.prototype.ngOnDestroy = function () {
        this._scroll.deregister(this);
    };
    /**
     * Returns observable that emits when a scroll event is fired on the host element.
     */
    Scrollable.prototype.elementScrolled = function () {
        return Observable.fromEvent(this._elementRef.nativeElement, 'scroll');
    };
    Scrollable.prototype.getElementRef = function () {
        return this._elementRef;
    };
    Scrollable = __decorate([
        Directive({
            selector: '[cdk-scrollable]'
        }), 
        __metadata('design:paramtypes', [ElementRef, ScrollDispatcher])
    ], Scrollable);
    return Scrollable;
}());
//# sourceMappingURL=scrollable.js.map