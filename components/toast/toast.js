"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
const core_1 = require('@angular/core');
const view_container_ref_1 = require('@angular/core/src/linker/view_container_ref');
const toast_component_1 = require('./toast.component');
let Md2Toast = class Md2Toast {
    constructor(loader, appRef) {
        this.loader = loader;
        this.appRef = appRef;
        this.hideDelay = 3000;
        this.index = 0;
    }
    show(toastObj) {
        let toast;
        if (typeof toastObj === 'string') {
            toast = new Toast(toastObj);
        }
        else if (typeof toastObj === 'object') {
            toast = new Toast(toastObj.message);
            this.hideDelay = toastObj.hideDelay;
        }
        if (toast) {
            if (!this.container) {
                let appElement = new view_container_ref_1.ViewContainerRef_(this.appRef['_rootComponents'][0]._hostElement);
                let bindings = core_1.ReflectiveInjector.resolve([]);
                this.loader.loadNextToLocation(toast_component_1.Md2ToastComponent, appElement, bindings).then((ref) => {
                    this.container = ref;
                    this.setupToast(toast);
                });
            }
            else {
                this.setupToast(toast);
            }
        }
    }
    startTimeout(toastId) {
        setTimeout(() => {
            this.clear(toastId);
        }, this.hideDelay);
    }
    setupToast(toast) {
        toast.id = ++this.index;
        this.container.instance.add(toast);
        this.startTimeout(toast.id);
    }
    clear(toastId) {
        if (this.container) {
            let instance = this.container.instance;
            instance.remove(toastId);
            if (!instance.isToast()) {
                this.hide();
            }
        }
    }
    hide() {
        this.container.destroy();
        this.container = null;
    }
};
Md2Toast = __decorate([
    core_1.Injectable(), 
    __metadata('design:paramtypes', [core_1.DynamicComponentLoader, core_1.ApplicationRef])
], Md2Toast);
exports.Md2Toast = Md2Toast;
class Toast {
    constructor(message) {
        this.message = message;
    }
}
exports.Toast = Toast;

//# sourceMappingURL=toast.js.map
