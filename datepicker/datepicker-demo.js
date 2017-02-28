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
        this.isRequired = false;
        this.isDisabled = false;
        this.isOpenOnFocus = false;
        this.isOpen = false;
        this.type = 'date';
        this.types = [
            { text: 'Date', value: 'date' },
            { text: 'Time', value: 'time' },
            { text: 'Date Time', value: 'datetime' }];
        this.date = null;
        this.minDate = null;
        this.maxDate = null;
    }
    DatepickerDemo.prototype.openDatepicker = function () {
        var _this = this;
        this.isOpen = true;
        setTimeout(function () {
            _this.isOpen = false;
        }, 1000);
    };
    DatepickerDemo.prototype.setDate = function () {
        this.date = new Date();
    };
    DatepickerDemo.prototype.setDateRange = function () {
        this.minDate = new Date();
        this.minDate.setMonth(this.minDate.getMonth() - 3);
        this.maxDate = new Date();
        this.maxDate.setMonth(this.maxDate.getMonth() + 3);
    };
    DatepickerDemo = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'datepicker-demo',
            templateUrl: 'datepicker-demo.html',
            styles: [" .type { width: 150px; padding: 16px 0; } "]
        }), 
        __metadata('design:paramtypes', [])
    ], DatepickerDemo);
    return DatepickerDemo;
}());
exports.DatepickerDemo = DatepickerDemo;
//# sourceMappingURL=datepicker-demo.js.map