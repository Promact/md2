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
const switch_1 = require('../../../components/switch/switch');
let Switch = class Switch {
    constructor() {
        this.disabled = false;
        this.switchState = true;
        this.switchState1 = true;
        this.switchState2 = false;
        this.switchState3 = true;
        this.switchState4 = true;
    }
};
Switch = __decorate([
    core_1.Component({
        selector: 'switch',
        templateUrl: './app/components/switch/switch.html',
        directives: [switch_1.Md2Switch]
    }), 
    __metadata('design:paramtypes', [])
], Switch);
exports.Switch = Switch;

//# sourceMappingURL=switch.js.map
