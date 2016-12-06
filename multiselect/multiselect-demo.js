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
var MultiselectDemo = (function () {
    function MultiselectDemo() {
        this.items = [
            { name: 'Vadodara', value: '1', disabled: false },
            { name: 'Rajkot', value: '2', disabled: false },
            { name: 'Delhi', value: '3', disabled: false },
            { name: 'Chennai', value: '4', disabled: true },
            { name: 'Mumbai', value: '5', disabled: false },
            { name: 'Goa', value: '6', disabled: true }
        ];
        this.item = [{ name: 'Birmingham', value: '2' }, { name: 'Dortmund', value: '3' }];
    }
    MultiselectDemo.prototype.handleChange = function (value) {
        console.log('Changed data: ', value);
    };
    MultiselectDemo = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'multiselect',
            templateUrl: 'multiselect-demo.html'
        }), 
        __metadata('design:paramtypes', [])
    ], MultiselectDemo);
    return MultiselectDemo;
}());
exports.MultiselectDemo = MultiselectDemo;

//# sourceMappingURL=multiselect-demo.js.map
