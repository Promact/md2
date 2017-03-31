"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var DatepickerDemo = (function () {
    function DatepickerDemo() {
        this.isRequired = false;
        this.isDisabled = false;
        this.isOpenOnFocus = false;
        this.isOpen = false;
        this.today = new Date();
        this.type = 'date';
        this.types = [
            { text: 'Date', value: 'date' },
            { text: 'Time', value: 'time' },
            { text: 'Date Time', value: 'datetime' }
        ];
        this.mode = 'auto';
        this.modes = [
            { text: 'Auto', value: 'auto' },
            { text: 'Portrait', value: 'portrait' },
            { text: 'Landscape', value: 'landscape' }
        ];
        this.container = 'inline';
        this.containers = [
            { text: 'Inline', value: 'inline' },
            { text: 'Dialog', value: 'dialog' }
        ];
        this.date = null;
        this.minDate = null;
        this.maxDate = null;
        this.enableDates = [
            new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate() - 7),
            new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate() - 1),
            new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate() + 5),
            new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate() + 7),
            new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate() + 8)
        ];
        this.disableDates = [
            new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate() - 2),
            new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate() - 1),
            new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate() + 2),
            new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate() + 5),
            new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate() + 9)
        ];
        this.disableWeekDays = [0, 6];
    }
    DatepickerDemo.prototype.openDatepicker = function () {
        var _this = this;
        this.isOpen = true;
        setTimeout(function () {
            _this.isOpen = false;
        }, 1000);
    };
    DatepickerDemo.prototype.setDate = function () {
        this.date = new Date(this.today);
    };
    DatepickerDemo.prototype.setDateRange = function () {
        this.minDate = new Date(this.today);
        this.minDate.setMonth(this.minDate.getMonth() - 3);
        this.maxDate = new Date(this.today);
        this.maxDate.setMonth(this.maxDate.getMonth() + 3);
    };
    return DatepickerDemo;
}());
DatepickerDemo = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'datepicker-demo',
        templateUrl: 'datepicker-demo.html',
        styles: ["\n    .inline-control {\n      display: inline-block;\n      width: 150px;\n      margin-right: 16px;\n      padding: 16px 0;\n    }\n  "]
    })
], DatepickerDemo);
exports.DatepickerDemo = DatepickerDemo;
//# sourceMappingURL=datepicker-demo.js.map