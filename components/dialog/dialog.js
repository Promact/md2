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
let Md2Dialog = class Md2Dialog {
    constructor(el) {
        this.visible = false;
        this.closeOnUnfocus = true;
        this.closeButton = true;
        this.dialogHeader = '';
        this._el = el.nativeElement;
    }
    clickElement(e) {
        if (this.closeOnUnfocus) {
            if (e.srcElement.className === 'md2-dialog open') {
                this.hide();
            }
        }
    }
    getElement() {
        return this._el;
    }
    show() {
        return this.toggle(true);
    }
    hide() {
        return this.toggle(false);
    }
    toggle(isVisible) {
        var body = document.body;
        if (isVisible === undefined) {
            this.visible = !this.visible;
        }
        else {
            this.visible = isVisible;
        }
        if (this.visible) {
            body.classList.add('md2-dialog-open');
        }
        else {
            let count = document.getElementsByClassName('md2-dialog open').length;
            if (count < 2) {
                body.classList.remove('md2-dialog-open');
            }
            if (this.closeOnUnfocus) {
                this._el.childNodes[0].removeEventListener('click', (e) => {
                    if (e.srcElement.className === 'md2-dialog open') {
                        this.hide();
                    }
                });
            }
        }
        return false;
    }
};
__decorate([
    core_1.Input('close-on-unfocus'), 
    __metadata('design:type', Boolean)
], Md2Dialog.prototype, "closeOnUnfocus", void 0);
__decorate([
    core_1.Input('close-button'), 
    __metadata('design:type', Boolean)
], Md2Dialog.prototype, "closeButton", void 0);
__decorate([
    core_1.Input('dialog-header'), 
    __metadata('design:type', String)
], Md2Dialog.prototype, "dialogHeader", void 0);
Md2Dialog = __decorate([
    core_1.Component({
        selector: 'md2-dialog',
        template: `
    <div class="md2-dialog" [class.open]="visible" tabindex="-1" role="dialog" aria-labelledby="myDialogLabel" aria-hidden="true" [style.display]="visible ? 'block' : 'none'">
      <div class="md2-dialog-container" role="document">
        <div class="md2-dialog-header">
          <button *ngIf="closeButton" type="button" class="close" aria-label="Close" (click)="hide()">&times;</button>
          <h2 *ngIf="dialogHeader" class="md2-dialog-title" id="myDialogLabel" [innerHtml]="dialogHeader"></h2>
          <ng-content select="dialog-header"></ng-content>
        </div>
        <ng-content></ng-content>
      </div>
    </div>
  `,
        styles: [`
    .md2-dialog-open { overflow-y: hidden; }
    .md2-dialog { position: fixed; top: 0; right: 0; bottom: 0; left: 0; z-index: 1050; background-color: rgba(33, 33, 33, 0.48); display: none; overflow-x: hidden; overflow-y: scroll; -webkit-overflow-scrolling: touch; outline: 0; }
    .md2-dialog.open { display: block; }
    .md2-dialog .md2-dialog-container { position: relative; width: auto; margin: 15px; background-color: #fff; -webkit-background-clip: padding-box; -moz-background-clip: padding-box; background-clip: padding-box; border-radius: 4px; outline: 0; -webkit-box-shadow: 0 7px 8px -4px rgba(0,0,0,.2),0 13px 19px 2px rgba(0,0,0,.14),0 5px 24px 4px rgba(0,0,0,.12); box-shadow: 0 7px 8px -4px rgba(0,0,0,.2),0 13px 19px 2px rgba(0,0,0,.14),0 5px 24px 4px rgba(0,0,0,.12); -webkit-transition: .3s; -o-transition: .3s; -moz-transition: .3s; transition: .3s; -webkit-transform: scale(0.1); -ms-transform: scale(0.1); -o-transform: scale(0.1); -moz-transform: scale(0.1); transform: scale(0.1); }
    .md2-dialog.open .md2-dialog-container { -webkit-transform: scale(1); -ms-transform: scale(1); -o-transform: scale(1); -moz-transform: scale(1); transform: scale(1); }
    @media (min-width: 768px) {
      .md2-dialog .md2-dialog-container { width: 600px; margin: 30px auto; }
    }
    .md2-dialog-header { background: #2196f3; color: #fff; font-size: 25px; line-height: 1.1; font-weight: 500; padding: 16px; border-bottom: 1px solid #e5e5e5; }
    .md2-dialog-header .close { position: relative;display: inline-block;width: 18px;height: 18px;margin-top: 4px;overflow: hidden;-webkit-appearance: none; padding: 0; cursor: pointer; background: 0 0; border: 0; float: right; opacity: 0.8; font-size: 0; }
    .md2-dialog-header .close::before,
    .md2-dialog-header .close::after {content: '';position: absolute;height: 2px;width: 100%;top: 50%;left: 0;margin-top: -1px;background: #fff;border-radius: 2px;height: 2px;}
    .md2-dialog-header .close::before {-webkit-transform: rotate(45deg);-moz-transform: rotate(45deg);-ms-transform: rotate(45deg);-o-transform: rotate(45deg);transform: rotate(45deg);}
    .md2-dialog-header .close::after {-webkit-transform: rotate(-45deg);-moz-transform: rotate(-45deg);-ms-transform: rotate(-45deg);-o-transform: rotate(-45deg);transform: rotate(-45deg);}
    .md2-dialog-header .close:hover { opacity: 1; }
    .md2-dialog-header .md2-dialog-title { margin: 0; font-size: 25px; line-height: 1.1; font-weight: 500; }
    .md2-dialog-header dialog-header { line-height: 33px; }
    .md2-dialog-body { position: relative; padding: 16px; }
    .md2-dialog-footer { padding: 16px; text-align: right; border-top: 1px solid rgba(0,0,0,0.12); }
  `],
        host: {
            '(click)': 'clickElement($event)'
        },
        encapsulation: core_1.ViewEncapsulation.None
    }), 
    __metadata('design:paramtypes', [core_1.ElementRef])
], Md2Dialog);
exports.Md2Dialog = Md2Dialog;

//# sourceMappingURL=dialog.js.map
