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
let Md2ToastComponent = class Md2ToastComponent {
    constructor() {
        this.toasts = [];
        this.maxShown = 5;
    }
    add(toast) {
        this.toasts.push(toast);
        if (this.toasts.length > this.maxShown) {
            this.toasts.splice(0, (this.toasts.length - this.maxShown));
        }
    }
    remove(toastId) {
        this.toasts = this.toasts.filter((toast) => { return toast.id !== toastId; });
    }
    isToast() { return this.toasts.length > 0; }
};
Md2ToastComponent = __decorate([
    core_1.Component({
        selector: 'md2-toast',
        template: `
    <div class="md2-toast-wrapper">
      <div *ngFor="let toast of toasts" class="md2-toast" (click)="remove(toast.id)">
        <div class="md2-toast-message">{{toast.message}}</div>
      </div>
    </div>
  `,
        styles: [`
    .md2-toast-wrapper { position: fixed; top: 0; right: 0; z-index: 1050; -moz-box-sizing: border-box; -webkit-box-sizing: border-box; box-sizing: border-box; cursor: default; overflow: hidden; min-width: 304px; padding: 8px; -moz-transition: all .4s cubic-bezier(.25,.8,.25,1); -o-transition: all .4s cubic-bezier(.25,.8,.25,1); -webkit-transition: all .4s cubic-bezier(.25,.8,.25,1); transition: all .4s cubic-bezier(.25,.8,.25,1); -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; }
    .md2-toast { position: relative; padding: 14px 24px; margin-bottom: 5px; display: block; background-color: #323232; color: #fafafa; box-shadow: 0 2px 5px 0 rgba(0,0,0,.26); border-radius: 2px; font-size: 14px; overflow: hidden; -ms-word-wrap: break-word; word-wrap: break-word; -moz-transition: all .4s cubic-bezier(.25,.8,.25,1); -o-transition: all .4s cubic-bezier(.25,.8,.25,1); -webkit-transition: all .4s cubic-bezier(.25,.8,.25,1); transition: all .4s cubic-bezier(.25,.8,.25,1); }
    .md2-toast-message { display: block; }
  `],
        encapsulation: core_1.ViewEncapsulation.None,
    }), 
    __metadata('design:paramtypes', [])
], Md2ToastComponent);
exports.Md2ToastComponent = Md2ToastComponent;

//# sourceMappingURL=toast.component.js.map
