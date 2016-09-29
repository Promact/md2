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
var DatepickerDemo = (function () {
    function DatepickerDemo() {
        this.disabled = true;
        this.datetime = '';
        this.datetime1 = '2016-09-15 12:10';
        this.date = '2016-09-15';
        this.time = '12:10';
        this.minDate = '2016-07-15';
        this.maxDate = '2016-12-15';
    }
    DatepickerDemo.prototype.change = function (value) {
        console.log('Changed data: ', value);
    };
    DatepickerDemo = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'datepicker-demo',
            templateUrl: 'datepicker-demo.html',
        }), 
        __metadata('design:paramtypes', [])
    ], DatepickerDemo);
    return DatepickerDemo;
}());
exports.DatepickerDemo = DatepickerDemo;

//# sourceMappingURL=datepicker-demo.js.map
