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
const dialog_1 = require('../../../components/dialog/dialog');
let DialogComponent = class DialogComponent {
    constructor() {
        this.dialogHeader = 'Lorum Ipsum';
    }
    launchDialog(dialog) {
        dialog.show();
    }
};
DialogComponent = __decorate([
    core_1.Component({
        selector: 'dialog-demo',
        templateUrl: './app/components/dialog/dialog.html',
        directives: [dialog_1.Md2Dialog]
    }), 
    __metadata('design:paramtypes', [])
], DialogComponent);
exports.DialogComponent = DialogComponent;

//# sourceMappingURL=dialog.js.map
