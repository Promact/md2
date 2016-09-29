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
var core_1 = require('@angular/core');
var SelectDemo = (function () {
    function SelectDemo() {
        this.disabled = false;
        this.items = [
            { name: 'Amsterdam', value: '1', disabled: true },
            { name: 'Birmingham', value: '2', disabled: false },
            { name: 'Dortmund', value: '3', disabled: false },
            { name: 'Gothenburg', value: '4', disabled: true },
            { name: 'London', value: '5', disabled: false },
            { name: 'Seville', value: '6', disabled: true }
        ];
        this.item = '3';
    }
    SelectDemo.prototype.change = function (value) {
        console.log('Changed data: ', value);
    };
    SelectDemo = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'select-demo',
            templateUrl: 'select-demo.html'
        }), 
        __metadata('design:paramtypes', [])
    ], SelectDemo);
    return SelectDemo;
}());
exports.SelectDemo = SelectDemo;

//# sourceMappingURL=select-demo.js.map
