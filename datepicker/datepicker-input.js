var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Directive, ElementRef, EventEmitter, forwardRef, Inject, Input, Optional, Renderer2 } from '@angular/core';
import { Md2Datepicker } from './datepicker';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { DOWN_ARROW } from '../core/keyboard/keycodes';
import { DateAdapter } from '../core/datetime/index';
import { MD_DATE_FORMATS } from '../core/datetime/date-formats';
export var MD2_DATEPICKER_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return Md2DatepickerInput; }),
    multi: true
};
export var MD2_DATEPICKER_VALIDATORS = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(function () { return Md2DatepickerInput; }),
    multi: true
};
/** Directive used to connect an input to a MdDatepicker. */
var Md2DatepickerInput = (function () {
    function Md2DatepickerInput(_elementRef, _renderer, _dateAdapter, _dateFormats) {
        var _this = this;
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this._dateAdapter = _dateAdapter;
        this._dateFormats = _dateFormats;
        /** Emits when the value changes (either due to user input or programmatic change). */
        this._valueChange = new EventEmitter();
        this._onTouched = function () { };
        this._cvaOnChange = function (value) { };
        this._validatorOnChange = function () { };
        /** The form control validator for the min date. */
        this._minValidator = function (control) {
            return (!_this.min || !control.value ||
                _this._dateAdapter.compareDate(_this.min, control.value) <= 0) ?
                null : { 'md2DatepickerMin': { 'min': _this.min, 'actual': control.value } };
        };
        /** The form control validator for the max date. */
        this._maxValidator = function (control) {
            return (!_this.max || !control.value ||
                _this._dateAdapter.compareDate(_this.max, control.value) >= 0) ?
                null : { 'md2DatepickerMax': { 'max': _this.max, 'actual': control.value } };
        };
        /** The form control validator for the date filter. */
        this._filterValidator = function (control) {
            return !_this._dateFilter || !control.value || _this._dateFilter(control.value) ?
                null : { 'md2DatepickerFilter': true };
        };
        /** The combined form control validator for this input. */
        this._validator = Validators.compose([this._minValidator, this._maxValidator, this._filterValidator]);
        if (!this._dateAdapter) {
            throw Error('DateAdapter');
        }
        if (!this._dateFormats) {
            throw Error('MD2_DATE_FORMATS');
        }
    }
    Object.defineProperty(Md2DatepickerInput.prototype, "md2Datepicker", {
        /** The datepicker that this input is associated with. */
        set: function (value) {
            if (value) {
                this._datepicker = value;
                // this._datepicker._registerInput(this);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2DatepickerInput.prototype, "md2DatepickerFilter", {
        set: function (filter) {
            this._dateFilter = filter;
            this._validatorOnChange();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2DatepickerInput.prototype, "value", {
        /** The value of the input. */
        get: function () {
            return this._dateAdapter.parse(this._elementRef.nativeElement.value, this._dateFormats.parse.dateInput);
        },
        set: function (value) {
            var date = this._dateAdapter.parse(value, this._dateFormats.parse.dateInput);
            var oldDate = this.value;
            this._renderer.setProperty(this._elementRef.nativeElement, 'value', date ? this._dateAdapter.format(date, this._dateFormats.display.dateInput) : '');
            if (!this._dateAdapter.sameDate(oldDate, date)) {
                this._valueChange.emit(date);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2DatepickerInput.prototype, "min", {
        /** The minimum valid date. */
        get: function () { return this._min; },
        set: function (value) {
            this._min = value;
            this._validatorOnChange();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2DatepickerInput.prototype, "max", {
        /** The maximum valid date. */
        get: function () { return this._max; },
        set: function (value) {
            this._max = value;
            this._validatorOnChange();
        },
        enumerable: true,
        configurable: true
    });
    Md2DatepickerInput.prototype.ngAfterContentInit = function () {
        var _this = this;
        if (this._datepicker) {
            this._datepickerSubscription =
                this._datepicker.selectedChanged.subscribe(function (selected) {
                    _this.value = selected;
                    _this._cvaOnChange(selected);
                });
        }
    };
    Md2DatepickerInput.prototype.ngOnDestroy = function () {
        if (this._datepickerSubscription) {
            this._datepickerSubscription.unsubscribe();
        }
    };
    Md2DatepickerInput.prototype.registerOnValidatorChange = function (fn) {
        this._validatorOnChange = fn;
    };
    Md2DatepickerInput.prototype.validate = function (c) {
        return this._validator ? this._validator(c) : null;
    };
    /**
     * Gets the element that the datepicker popup should be connected to.
     * @return The element to connect the popup to.
     */
    Md2DatepickerInput.prototype.getPopupConnectionElementRef = function () {
        return this._elementRef;
    };
    // Implemented as part of ControlValueAccessor
    Md2DatepickerInput.prototype.writeValue = function (value) {
        this.value = value;
    };
    // Implemented as part of ControlValueAccessor
    Md2DatepickerInput.prototype.registerOnChange = function (fn) {
        this._cvaOnChange = fn;
    };
    // Implemented as part of ControlValueAccessor
    Md2DatepickerInput.prototype.registerOnTouched = function (fn) {
        this._onTouched = fn;
    };
    // Implemented as part of ControlValueAccessor
    Md2DatepickerInput.prototype.setDisabledState = function (disabled) {
        this._renderer.setProperty(this._elementRef.nativeElement, 'disabled', disabled);
    };
    Md2DatepickerInput.prototype._onKeydown = function (event) {
        if (event.altKey && event.keyCode === DOWN_ARROW) {
            this._datepicker.open();
            event.preventDefault();
        }
    };
    Md2DatepickerInput.prototype._onInput = function (value) {
        var date = this._dateAdapter.parse(value, this._dateFormats.parse.dateInput);
        this._cvaOnChange(date);
        this._valueChange.emit(date);
    };
    return Md2DatepickerInput;
}());
__decorate([
    Input(),
    __metadata("design:type", Md2Datepicker),
    __metadata("design:paramtypes", [Md2Datepicker])
], Md2DatepickerInput.prototype, "md2Datepicker", null);
__decorate([
    Input(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Function])
], Md2DatepickerInput.prototype, "md2DatepickerFilter", null);
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], Md2DatepickerInput.prototype, "value", null);
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], Md2DatepickerInput.prototype, "min", null);
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], Md2DatepickerInput.prototype, "max", null);
Md2DatepickerInput = __decorate([
    Directive({
        selector: 'input[md2Datepicker]',
        providers: [MD2_DATEPICKER_VALUE_ACCESSOR, MD2_DATEPICKER_VALIDATORS],
        host: {
            '[attr.aria-expanded]': '_datepicker?.opened || "false"',
            '[attr.aria-haspopup]': 'true',
            '[attr.aria-owns]': '_datepicker?.id',
            '[attr.min]': 'min ? _dateAdapter.getISODateString(min) : null',
            '[attr.max]': 'max ? _dateAdapter.getISODateString(max) : null',
            '(input)': '_onInput($event.target.value)',
            '(blur)': '_onTouched()',
            '(keydown)': '_onKeydown($event)',
        }
    }),
    __param(2, Optional()),
    __param(3, Optional()), __param(3, Inject(MD_DATE_FORMATS)),
    __metadata("design:paramtypes", [ElementRef,
        Renderer2,
        DateAdapter, Object])
], Md2DatepickerInput);
export { Md2DatepickerInput };
//# sourceMappingURL=datepicker-input.js.map