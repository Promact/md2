var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ApplicationRef, ComponentFactoryResolver, Injectable, ReflectiveInjector, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Md2ToastComponent } from './toast.component';
export var Toast = (function () {
    function Toast(message) {
        this.message = message;
    }
    return Toast;
}());
export var Md2Toast = (function () {
    function Md2Toast(_componentFactory, _appRef) {
        this._componentFactory = _componentFactory;
        this._appRef = _appRef;
        this.delay = 3000;
        this.index = 0;
    }
    /**
     * toast message
     * @param toast string or object with message and other properties of toast
     */
    Md2Toast.prototype.toast = function (toast) {
        this.show(toast);
    };
    /**
     * show toast
     * @param toastObj string or object with message and other properties of toast
     */
    Md2Toast.prototype.show = function (toastObj) {
        var toast;
        if (typeof toastObj === 'string') {
            toast = new Toast(toastObj);
        }
        else if (typeof toastObj === 'object') {
            toast = new Toast(toastObj.message);
            this.delay = toastObj.hideDelay;
        }
        if (toast) {
            if (!this.container) {
                var app = this._appRef;
                var appContainer = app['_rootComponents'][0]['_hostElement'].vcRef;
                var providers = ReflectiveInjector.resolve([]);
                var toastFactory = this._componentFactory.resolveComponentFactory(Md2ToastComponent);
                var childInjector = ReflectiveInjector.fromResolvedProviders(providers, appContainer.parentInjector);
                this.container = appContainer.createComponent(toastFactory, appContainer.length, childInjector);
                this.setupToast(toast);
            }
            else {
                this.setupToast(toast);
            }
        }
    };
    /**
     * toast timeout
     * @param toastId
     */
    Md2Toast.prototype.startTimeout = function (toastId) {
        var _this = this;
        setTimeout(function () {
            _this.clear(toastId);
        }, this.delay);
    };
    /**
     * setup toast
     * @param toast
     */
    Md2Toast.prototype.setupToast = function (toast) {
        toast.id = ++this.index;
        this.container.instance.add(toast);
        this.startTimeout(toast.id);
    };
    /**
     * clear specific toast
     * @param toastId
     */
    Md2Toast.prototype.clear = function (toastId) {
        var _this = this;
        if (this.container) {
            var instance_1 = this.container.instance;
            instance_1.remove(toastId);
            setTimeout(function () {
                if (!instance_1.hasToast()) {
                    _this.dispose();
                }
            }, 250);
        }
    };
    /**
     * clear all toasts
     */
    Md2Toast.prototype.clearAll = function () {
        var _this = this;
        if (this.container) {
            var instance_2 = this.container.instance;
            instance_2.removeAll();
            setTimeout(function () {
                if (!instance_2.hasToast()) {
                    _this.dispose();
                }
            }, 250);
        }
    };
    /**
     * dispose all toasts
     */
    Md2Toast.prototype.dispose = function () {
        this.container.destroy();
        this.container = null;
    };
    Md2Toast = __decorate([
        Injectable(), 
        __metadata('design:paramtypes', [ComponentFactoryResolver, ApplicationRef])
    ], Md2Toast);
    return Md2Toast;
}());
export var MD2_TOAST_DIRECTIVES = [Md2ToastComponent];
export var Md2ToastModule = (function () {
    function Md2ToastModule() {
    }
    Md2ToastModule.forRoot = function () {
        return {
            ngModule: Md2ToastModule,
            providers: []
        };
    };
    Md2ToastModule = __decorate([
        NgModule({
            imports: [CommonModule],
            exports: MD2_TOAST_DIRECTIVES,
            declarations: MD2_TOAST_DIRECTIVES,
            providers: [Md2Toast],
            entryComponents: MD2_TOAST_DIRECTIVES
        }), 
        __metadata('design:paramtypes', [])
    ], Md2ToastModule);
    return Md2ToastModule;
}());

//# sourceMappingURL=toast.js.map
