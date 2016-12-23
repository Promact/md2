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
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
/**
 * Service contained all registered Scrollable references and emits an event when any one of the
 * Scrollable references emit a scrolled event.
 */
export var ScrollDispatcher = (function () {
    function ScrollDispatcher() {
        var _this = this;
        /** Subject for notifying that a registered scrollable reference element has been scrolled. */
        this._scrolled = new Subject();
        /**
         * Map of all the scrollable references that are registered with the service and their
         * scroll event subscriptions.
         */
        this.scrollableReferences = new WeakMap();
        // By default, notify a scroll event when the document is scrolled or the window is resized.
        Observable.fromEvent(window.document, 'scroll').subscribe(function () { return _this._notify(); });
        Observable.fromEvent(window, 'resize').subscribe(function () { return _this._notify(); });
    }
    /**
     * Registers a Scrollable with the service and listens for its scrolled events. When the
     * scrollable is scrolled, the service emits the event in its scrolled observable.
     */
    ScrollDispatcher.prototype.register = function (scrollable) {
        var _this = this;
        var scrollSubscription = scrollable.elementScrolled().subscribe(function () { return _this._notify(); });
        this.scrollableReferences.set(scrollable, scrollSubscription);
    };
    /**
     * Deregisters a Scrollable reference and unsubscribes from its scroll event observable.
     */
    ScrollDispatcher.prototype.deregister = function (scrollable) {
        this.scrollableReferences.get(scrollable).unsubscribe();
        this.scrollableReferences.delete(scrollable);
    };
    /**
     * Returns an observable that emits an event whenever any of the registered Scrollable
     * references (or window, document, or body) fire a scrolled event.
     * TODO: Add an event limiter that includes throttle with the leading and trailing events.
     */
    ScrollDispatcher.prototype.scrolled = function () {
        return this._scrolled.asObservable();
    };
    /** Sends a notification that a scroll event has been fired. */
    ScrollDispatcher.prototype._notify = function () {
        this._scrolled.next();
    };
    ScrollDispatcher = __decorate([
        Injectable(), 
        __metadata('design:paramtypes', [])
    ], ScrollDispatcher);
    return ScrollDispatcher;
}());

//# sourceMappingURL=scroll-dispatcher.js.map
