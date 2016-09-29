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
        define(["require", "exports", '@angular/core'], factory);
    }
})(function (require, exports) {
    "use strict";
    var core_1 = require('@angular/core');
    var Md2ToastComponent = (function () {
        function Md2ToastComponent() {
            this.toasts = [];
            this.maxShown = 5;
            this.animate = 'top';
        }
        /**
         * add toast
         * @param toast toast object with all parameters
         */
        Md2ToastComponent.prototype.add = function (toast) {
            this.toasts.push(toast);
            if (this.toasts.length > this.maxShown) {
                this.toasts.splice(0, (this.toasts.length - this.maxShown));
            }
        };
        /**
         * remove toast
         * @param toastId number of toast id
         */
        Md2ToastComponent.prototype.remove = function (toastId) {
            this.toasts = this.toasts.filter(function (toast) { return toast.id !== toastId; });
        };
        /**
         * remove all toasts
         * @param toastId number of toast id
         */
        Md2ToastComponent.prototype.removeAll = function (toastId) {
            this.toasts = [];
        };
        /**
         * check has any toast
         * @return boolean
         */
        Md2ToastComponent.prototype.hasToast = function () { return this.toasts.length > 0; };
        Md2ToastComponent = __decorate([
            core_1.Component({
                selector: 'md2-toast',
                template: "\n    <div class=\"md2-toast-wrapper\">\n      <div *ngFor=\"let toast of toasts\" class=\"md2-toast\" [@inOut]=\"animate\" (click)=\"remove(toast.id)\">{{toast.message}}</div>\n    </div>\n  ",
                styles: ["\n    .md2-toast-wrapper { position: fixed; top: 0; right: 0; z-index: 1060; -moz-box-sizing: border-box; -webkit-box-sizing: border-box; box-sizing: border-box; cursor: default; overflow: hidden; min-width: 304px; padding: 8px; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; }\n    .md2-toast { position: relative; padding: 14px 24px; margin-bottom: 5px; display: block; background-color: #323232; color: #fafafa; box-shadow: 0 2px 5px 0 rgba(0,0,0,.26); border-radius: 2px; font-size: 14px; overflow: hidden; -ms-word-wrap: break-word; word-wrap: break-word; transition: all .25s linear; }\n  "],
                animations: [
                    core_1.trigger('inOut', [
                        core_1.state('top', core_1.style({ opacity: 1, marginTop: 0 })),
                        core_1.transition('void => top', [
                            core_1.style({
                                opacity: 0,
                                marginTop: '-53px'
                            }),
                            core_1.animate('0.25s linear')
                        ]),
                        core_1.transition('top => void', [
                            core_1.animate('0.25s linear', core_1.style({
                                opacity: 0,
                                marginTop: '-53px'
                            }))
                        ]),
                    ]),
                ],
                encapsulation: core_1.ViewEncapsulation.None,
            }), 
            __metadata('design:paramtypes', [])
        ], Md2ToastComponent);
        return Md2ToastComponent;
    }());
    exports.Md2ToastComponent = Md2ToastComponent;
});

//# sourceMappingURL=toast.component.js.map
