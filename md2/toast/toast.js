var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Injectable, NgModule, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Overlay, OverlayState, ComponentPortal, OVERLAY_PROVIDERS } from '../core';
export var Toast = (function () {
    function Toast(message) {
        this.message = message;
    }
    return Toast;
}());
export var Md2ToastConfig = (function () {
    function Md2ToastConfig() {
        this.duration = 3000;
    }
    return Md2ToastConfig;
}());
export var Md2Toast = (function () {
    function Md2Toast(_overlay, _config) {
        this._overlay = _overlay;
        this._config = _config;
        this.index = 0;
    }
    /**
     * toast message
     * @param toast string or object with message and other properties of toast
     */
    Md2Toast.prototype.toast = function (message, duration) {
        this.show(message, duration);
    };
    /**
     * show toast
     * @param toastObj string or object with message and other properties of toast
     */
    Md2Toast.prototype.show = function (message, duration) {
        var toast;
        toast = new Toast(message);
        if (duration) {
            this._config.duration = duration;
        }
        if (toast) {
            if (!this._toastInstance) {
                var strategy = this._overlay.position().global().top('0').right('0');
                var config = new OverlayState();
                config.positionStrategy = strategy;
                this._overlayRef = this._overlay.create(config);
                var portal = new ComponentPortal(Md2ToastComponent);
                this._toastInstance = this._overlayRef.attach(portal).instance;
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
        }, this._config.duration);
    };
    /**
     * setup toast
     * @param toast
     */
    Md2Toast.prototype.setupToast = function (toast) {
        toast.id = ++this.index;
        this._toastInstance.add(toast);
        this.startTimeout(toast.id);
    };
    /**
     * clear specific toast
     * @param toastId
     */
    Md2Toast.prototype.clear = function (toastId) {
        var _this = this;
        if (this._toastInstance) {
            this._toastInstance.remove(toastId);
            setTimeout(function () {
                if (!_this._toastInstance.hasToast()) {
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
        if (this._toastInstance) {
            this._toastInstance.removeAll();
            setTimeout(function () {
                if (!_this._toastInstance.hasToast()) {
                    _this.dispose();
                }
            }, 250);
        }
    };
    /**
     * dispose all toasts
     */
    Md2Toast.prototype.dispose = function () {
        this._overlayRef.dispose();
        this._overlayRef = null;
        this._toastInstance = null;
    };
    Md2Toast = __decorate([
        Injectable(), 
        __metadata('design:paramtypes', [Overlay, Md2ToastConfig])
    ], Md2Toast);
    return Md2Toast;
}());
export var Md2ToastComponent = (function () {
    function Md2ToastComponent() {
        this.toasts = [];
        this.maxShown = 5;
    }
    /**
     * add toast
     * @param toast toast object with all parameters
     */
    Md2ToastComponent.prototype.add = function (toast) {
        var _this = this;
        setTimeout(function () {
            toast.isVisible = true;
        }, 1);
        this.toasts.push(toast);
        if (this.toasts.length > this.maxShown) {
            this.toasts[0].isVisible = false;
            setTimeout(function () {
                _this.toasts.splice(0, (_this.toasts.length - _this.maxShown));
            }, 250);
        }
    };
    /**
     * remove toast
     * @param toastId number of toast id
     */
    Md2ToastComponent.prototype.remove = function (toastId) {
        var _this = this;
        this.toasts.forEach(function (t) { if (t.id === toastId) {
            t.isVisible = false;
        } });
        setTimeout(function () {
            _this.toasts = _this.toasts.filter(function (toast) { return toast.id !== toastId; });
        }, 250);
    };
    /**
     * remove all toasts
     * @param toastId number of toast id
     */
    Md2ToastComponent.prototype.removeAll = function () {
        var _this = this;
        this.toasts.forEach(function (t) { t.isVisible = false; });
        setTimeout(function () {
            _this.toasts = [];
        }, 250);
    };
    /**
     * check has any toast
     * @return boolean
     */
    Md2ToastComponent.prototype.hasToast = function () { return this.toasts.length > 0; };
    Md2ToastComponent = __decorate([
        Component({
            selector: 'md2-toast',
            template: "<div *ngFor=\"let toast of toasts\" class=\"md2-toast\" [class.in]=\"toast.isVisible\" (click)=\"remove(toast.id)\">{{ toast.message }}</div> ",
            styles: ["md2-toast { display: block; box-sizing: border-box; cursor: default; overflow: hidden; min-width: 304px; max-width: 100%; padding: 8px; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; } .md2-toast { position: relative; padding: 14px 24px; margin-bottom: 5px; display: block; margin-top: -53px; opacity: 0; background-color: #323232; color: #fafafa; box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.26); border-radius: 2px; font-size: 14px; overflow: hidden; word-wrap: break-word; transition: all 250ms linear; } .md2-toast.in { margin-top: 0; opacity: 1; } .cdk-visually-hidden { border: 0; clip: rect(0 0 0 0); height: 1px; margin: -1px; overflow: hidden; padding: 0; position: absolute; text-transform: none; width: 1px; } .cdk-overlay-container, .cdk-global-overlay-wrapper { pointer-events: none; top: 0; left: 0; height: 100%; width: 100%; } .cdk-overlay-container { position: fixed; z-index: 1000; } .cdk-global-overlay-wrapper { display: flex; position: absolute; z-index: 1000; } .cdk-overlay-pane { position: absolute; pointer-events: auto; box-sizing: border-box; z-index: 1000; } .cdk-overlay-backdrop { position: absolute; top: 0; bottom: 0; left: 0; right: 0; z-index: 1; pointer-events: auto; transition: opacity 400ms cubic-bezier(0.25, 0.8, 0.25, 1); opacity: 0; } .cdk-overlay-backdrop.cdk-overlay-backdrop-showing { opacity: 0.48; } .cdk-overlay-dark-backdrop { background: #212121; } /*# sourceMappingURL=toast.css.map */ "],
            encapsulation: ViewEncapsulation.None,
        }), 
        __metadata('design:paramtypes', [])
    ], Md2ToastComponent);
    return Md2ToastComponent;
}());
export var MD2_TOAST_DIRECTIVES = [Md2ToastComponent];
export var Md2ToastModule = (function () {
    function Md2ToastModule() {
    }
    Md2ToastModule.forRoot = function () {
        return {
            ngModule: Md2ToastModule,
            providers: [Md2Toast, Md2ToastConfig, OVERLAY_PROVIDERS]
        };
    };
    Md2ToastModule = __decorate([
        NgModule({
            imports: [CommonModule],
            exports: MD2_TOAST_DIRECTIVES,
            declarations: MD2_TOAST_DIRECTIVES,
            entryComponents: MD2_TOAST_DIRECTIVES
        }), 
        __metadata('design:paramtypes', [])
    ], Md2ToastModule);
    return Md2ToastModule;
}());

//# sourceMappingURL=toast.js.map
