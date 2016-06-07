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
const toast_1 = require('../../../components/toast/toast');
let Toast = class Toast {
    constructor(toast) {
        this.toast = toast;
    }
    toastMe() {
        this.toast.show('test message...');
        //this.toast.show({ message: 'test object message...', hideDelay: 1000 });
    }
};
Toast = __decorate([
    core_1.Component({
        selector: 'toast',
        templateUrl: './app/components/toast/toast.html',
        providers: [toast_1.Md2Toast]
    }), 
    __metadata('design:paramtypes', [toast_1.Md2Toast])
], Toast);
exports.Toast = Toast;

//# sourceMappingURL=toast.js.map
