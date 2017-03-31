"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var ChipsDemo = (function () {
    function ChipsDemo() {
        this.isDisabled = false;
        this.isRemovable = true;
        this._itemsData = [
            { name: 'Vadodara', value: '1' },
            { name: 'Mumbai', value: '5' },
            { name: 'Goa', value: '6' }
        ];
        this._items = [
            { text: 'Vadodaraa', id: '8' },
            { text: 'Mumbaia', id: '2' },
            { text: 'Goaa', id: '4' }
        ];
        this._validPattern = /^[0-9]*$/;
    }
    ChipsDemo.prototype.handleChange = function (value) {
        console.log('Changed data: ', value);
    };
    return ChipsDemo;
}());
ChipsDemo = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'md-chips-demo',
        templateUrl: 'chips-demo.html'
    })
], ChipsDemo);
exports.ChipsDemo = ChipsDemo;
//# sourceMappingURL=chips-demo.js.map