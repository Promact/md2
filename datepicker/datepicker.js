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
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, forwardRef, Input, Optional, Output, ViewChild, ViewContainerRef, ViewEncapsulation, NgZone, } from '@angular/core';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR, Validators, } from '@angular/forms';
import { coerceBooleanProperty, Overlay } from '../core';
import { ComponentPortal } from '../core/portal/portal';
import { OverlayState } from '../core/overlay/overlay-state';
import { Dir } from '../core/rtl/dir';
import { RepositionScrollStrategy, ScrollDispatcher } from '../core/overlay/index';
import { ESCAPE } from '../core/keyboard/keycodes';
import { Md2Calendar } from './calendar';
import { DateLocale } from './date-locale';
import { DateUtil } from './date-util';
import 'rxjs/add/operator/first';
/** Change event object emitted by Md2Select. */
var Md2DateChange = (function () {
    function Md2DateChange(source, value) {
        this.source = source;
        this.value = value;
    }
    return Md2DateChange;
}());
export { Md2DateChange };
/** Used to generate a unique ID for each datepicker instance. */
var datepickerUid = 0;
/**
 * Component used as the content for the datepicker dialog and popup. We use this instead of using
 * Md2Calendar directly as the content so we can control the initial focus. This also gives us a
 * place to put additional features of the popup that are not part of the calendar itself in the
 * future. (e.g. confirmation buttons).
 * @docs-private
 */
var Md2DatepickerContent = (function () {
    function Md2DatepickerContent() {
    }
    /**
     * Handles keydown event on datepicker content.
     * @param event The event.
     */
    Md2DatepickerContent.prototype._handleKeydown = function (event) {
        switch (event.keyCode) {
            case ESCAPE:
                this.datepicker.close();
                break;
            default:
                /* Return so that we don't preventDefault on keys that are not explicitly handled. */
                return;
        }
        event.preventDefault();
    };
    return Md2DatepickerContent;
}());
__decorate([
    ViewChild(Md2Calendar),
    __metadata("design:type", Md2Calendar)
], Md2DatepickerContent.prototype, "_calendar", void 0);
Md2DatepickerContent = __decorate([
    Component({selector: 'md2-datepicker-content',
        template: "<md2-calendar cdkTrapFocus [id]=\"datepicker.id\" [attr.mode]=\"datepicker.mode\" [startAt]=\"datepicker.startAt\" [startView]=\"datepicker.startView\" [type]=\"datepicker.type\" [timeInterval]=\"datepicker.timeInterval\" [minDate]=\"datepicker._minDate\" [maxDate]=\"datepicker._maxDate\" [dateFilter]=\"datepicker._dateFilter\" [selected]=\"datepicker._selected\" (selectedChange)=\"datepicker._selectAndClose($event)\"></md2-calendar>",
        styles: [".md2-datepicker-content{box-shadow:0 5px 5px -3px rgba(0,0,0,.2),0 8px 10px 1px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12);display:block;background-color:#fff;border-radius:2px;overflow:hidden}.md2-calendar{width:296px;height:405px}.md2-calendar[mode=landscape]{width:446px;height:328px}@media (min-width:480px){.md2-calendar[mode=auto]{width:446px;height:328px}}.md2-datepicker-content-touch{box-shadow:0 0 0 0 rgba(0,0,0,.2),0 0 0 0 rgba(0,0,0,.14),0 0 0 0 rgba(0,0,0,.12);display:block;box-shadow:0 11px 15px -7px rgba(0,0,0,.2),0 24px 38px 3px rgba(0,0,0,.14),0 9px 46px 8px rgba(0,0,0,.12)}.cdk-global-overlay-wrapper,.cdk-overlay-container{pointer-events:none;top:0;left:0;height:100%;width:100%}.cdk-overlay-container{position:fixed;z-index:1000}.cdk-global-overlay-wrapper{display:flex;position:absolute;z-index:1000}.cdk-overlay-pane{position:absolute;pointer-events:auto;box-sizing:border-box;z-index:1000}.cdk-overlay-backdrop{position:absolute;top:0;bottom:0;left:0;right:0;z-index:1000;pointer-events:auto;transition:opacity .4s cubic-bezier(.25,.8,.25,1);opacity:0}.cdk-overlay-backdrop.cdk-overlay-backdrop-showing{opacity:.48}.cdk-overlay-dark-backdrop{background:rgba(0,0,0,.6)} /*# sourceMappingURL=datepicker-content.css.map */ "],
        host: {
            'class': 'md2-datepicker-content',
            '[class.md2-datepicker-content-touch]': 'datepicker.touchUi',
            '(keydown)': '_handleKeydown($event)',
        },
        encapsulation: ViewEncapsulation.None,
        changeDetection: ChangeDetectionStrategy.OnPush,
    })
], Md2DatepickerContent);
export { Md2DatepickerContent };
export var MD2_DATEPICKER_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return Md2Datepicker; }),
    multi: true
};
export var MD2_DATEPICKER_VALIDATORS = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(function () { return Md2Datepicker; }),
    multi: true
};
/* Component responsible for managing the datepicker popup/dialog. */
var Md2Datepicker = (function () {
    function Md2Datepicker(_element, _overlay, _ngZone, _viewContainerRef, _scrollDispatcher, _locale, _util, _dir) {
        var _this = this;
        this._element = _element;
        this._overlay = _overlay;
        this._ngZone = _ngZone;
        this._viewContainerRef = _viewContainerRef;
        this._scrollDispatcher = _scrollDispatcher;
        this._locale = _locale;
        this._util = _util;
        this._dir = _dir;
        this._onChange = function (value) { };
        this._onTouched = function () { };
        this._validatorOnChange = function () { };
        this._inputFocused = false;
        /** The view that the calendar should start in. */
        this.startView = 'month';
        /**
         * Whether the calendar UI is in touch mode. In touch mode the calendar opens in a dialog rather
         * than a popup and elements have more padding to allow for bigger touch targets.
         */
        this.touchUi = false;
        this.tabindex = 0;
        this.mode = 'auto';
        this.timeInterval = 1;
        this._type = 'date';
        this._required = false;
        this._disabled = false;
        this._inputValue = '';
        /** Event emitted when the select has been opened. */
        this.onOpen = new EventEmitter();
        /** Event emitted when the select has been closed. */
        this.onClose = new EventEmitter();
        /** Event emitted when the selected date has been changed by the user. */
        this.change = new EventEmitter();
        /** Emits new selected date when selected date changes. */
        this.selectedChanged = new EventEmitter();
        /** Whether the calendar is open. */
        this.opened = false;
        /** The id for the datepicker calendar. */
        this.id = "md2-datepicker-" + datepickerUid++;
        /** The currently selected date. */
        this._selected = null;
        /** The form control validator for the min date. */
        this._minValidator = function (control) {
            return (!_this.min || !control.value ||
                _this._util.compareDate(_this.min, control.value) <= 0) ?
                null : { 'md2DatepickerMin': { 'min': _this.min, 'actual': control.value } };
        };
        /** The form control validator for the max date. */
        this._maxValidator = function (control) {
            return (!_this.max || !control.value ||
                _this._util.compareDate(_this.max, control.value) >= 0) ?
                null : { 'md2DatepickerMax': { 'max': _this.max, 'actual': control.value } };
        };
        /** The form control validator for the date filter. */
        this._filterValidator = function (control) {
            return !_this._dateFilter || !control.value || _this._dateFilter(control.value) ?
                null : { 'md2DatepickerFilter': true };
        };
        /** The combined form control validator for this input. */
        this._validator = Validators.compose([this._minValidator, this._maxValidator, this._filterValidator]);
    }
    Object.defineProperty(Md2Datepicker.prototype, "type", {
        get: function () { return this._type; },
        set: function (value) {
            this._type = value || 'date';
            this._inputValue = this._formatDate(this._value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Datepicker.prototype, "format", {
        get: function () {
            return this._format || (this.type === 'month' ? 'MMMM y' : this.type === 'date' ?
                'dd/MM/y' : this.type === 'time' ? 'HH:mm' : this.type === 'datetime' ?
                'dd/MM/y HH:mm' : 'dd/MM/y');
        },
        set: function (value) {
            if (this._format !== value) {
                this._format = value;
                this._inputValue = this._formatDate(this._value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Datepicker.prototype, "min", {
        /** The minimum valid date. */
        get: function () { return this._minDate; },
        set: function (value) {
            this._minDate = value;
            this._validatorOnChange();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Datepicker.prototype, "max", {
        /** The maximum valid date. */
        get: function () { return this._maxDate; },
        set: function (value) {
            this._maxDate = value;
            this._validatorOnChange();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Datepicker.prototype, "dateFilter", {
        set: function (filter) {
            this._dateFilter = filter;
            this._validatorOnChange();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Datepicker.prototype, "required", {
        get: function () { return this._required; },
        set: function (value) { this._required = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Datepicker.prototype, "disabled", {
        get: function () { return this._disabled; },
        set: function (value) { this._disabled = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Datepicker.prototype, "value", {
        get: function () { return this._value; },
        set: function (value) {
            var _this = this;
            this._value = this.coerceDateProperty(value);
            this._selected = this._value;
            this.startAt = this._value;
            setTimeout(function () {
                _this._inputValue = _this._formatDate(_this._value);
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Datepicker.prototype, "openOnFocus", {
        get: function () { return this._openOnFocus; },
        set: function (value) { this._openOnFocus = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Datepicker.prototype, "isOpen", {
        set: function (value) {
            if (value && !this.opened) {
                this.open();
            }
        },
        enumerable: true,
        configurable: true
    });
    Md2Datepicker.prototype.ngOnDestroy = function () {
        this.close();
        if (this._popupRef) {
            this._popupRef.dispose();
        }
        if (this._dialogRef) {
            this._dialogRef.dispose();
        }
        if (this._inputSubscription) {
            this._inputSubscription.unsubscribe();
        }
    };
    Md2Datepicker.prototype.registerOnValidatorChange = function (fn) {
        this._validatorOnChange = fn;
    };
    Md2Datepicker.prototype.validate = function (c) {
        return this._validator ? this._validator(c) : null;
    };
    Md2Datepicker.prototype.writeValue = function (value) {
        this.value = value;
    };
    Md2Datepicker.prototype.registerOnChange = function (fn) { this._onChange = fn; };
    Md2Datepicker.prototype.registerOnTouched = function (fn) { this._onTouched = fn; };
    Md2Datepicker.prototype.setDisabledState = function (isDisabled) {
        this.disabled = isDisabled;
    };
    Md2Datepicker.prototype._handleFocus = function (event) {
        this._inputFocused = true;
        if (!this.opened && this.openOnFocus) {
            this.open();
        }
    };
    Md2Datepicker.prototype._handleBlur = function (event) {
        this._inputFocused = false;
        if (!this.opened) {
            this._onTouched();
        }
        var el = event.target;
        var date = this._util.parseDate(el.value, this.format);
        if (!date) {
            date = this._util.parse(el.value, this.format);
        }
        if (date != null && date.getTime && !isNaN(date.getTime())) {
            var d = new Date(this.value);
            if (this.type !== 'time') {
                d.setFullYear(date.getFullYear(), date.getMonth(), date.getDate());
            }
            if (this.type !== 'date') {
                d.setHours(date.getHours(), date.getMinutes());
            }
            if (!this._util.isSameMinute(this.value, d)) {
                this.value = this._util.createDate(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes(), d.getSeconds());
                this._emitChangeEvent();
            }
        }
        else {
            if (this.value) {
                this.value = null;
                this._emitChangeEvent();
            }
        }
    };
    Md2Datepicker.prototype.coerceDateProperty = function (value) {
        var v = null;
        if (value != null && value.getTime && !isNaN(value.getTime())) {
            v = value;
        }
        else {
            if (value && this.type === 'time') {
                var t = value + '';
                v = new Date();
                v.setHours(parseInt(t.substring(0, 2)));
                v.setMinutes(parseInt(t.substring(3, 5)));
            }
            else {
                var timestamp = Date.parse(value);
                v = isNaN(timestamp) ? null : new Date(timestamp);
            }
        }
        var d = v ? this._util.createDate(v.getFullYear(), v.getMonth(), v.getDate(), v.getHours(), v.getMinutes(), v.getSeconds()) : null;
        return d;
    };
    /**
     * format date
     * @param date Date Object
     * @return string with formatted date
     */
    Md2Datepicker.prototype._formatDate = function (date) {
        if (!this.format || !date) {
            return '';
        }
        var format = this.format;
        /* Years */
        if (format.indexOf('yy') > -1) {
            format = format.replace('yy', ('00' + this._util.getYear(date)).slice(-2));
        }
        else if (format.indexOf('y') > -1) {
            format = format.replace('y', '' + this._util.getYear(date));
        }
        /* Days */
        if (format.indexOf('dd') > -1) {
            format = format.replace('dd', ('0' + this._util.getDate(date)).slice(-2));
        }
        else if (format.indexOf('d') > -1) {
            format = format.replace('d', '' + this._util.getDate(date));
        }
        /* Hours */
        if (/[aA]/.test(format)) {
            /* 12-hour */
            if (format.indexOf('HH') > -1) {
                format = format.replace('HH', ('0' + this._getHours12(this._util.getHours(date))).slice(-2));
            }
            else if (format.indexOf('H') > -1) {
                format = format.replace('H', '' + this._getHours12(this._util.getHours(date)));
            }
            format = format.replace('A', ((this._util.getHours(date) < 12) ? 'AM' : 'PM'))
                .replace('a', ((this._util.getHours(date) < 12) ? 'am' : 'pm'));
        }
        else {
            /* 24-hour */
            if (format.indexOf('HH') > -1) {
                format = format.replace('HH', ('0' + this._util.getHours(date)).slice(-2));
            }
            else if (format.indexOf('H') > -1) {
                format = format.replace('H', '' + this._util.getHours(date));
            }
        }
        /* Minutes */
        if (format.indexOf('mm') > -1) {
            format = format.replace('mm', ('0' + this._util.getMinutes(date)).slice(-2));
        }
        else if (format.indexOf('m') > -1) {
            format = format.replace('m', '' + this._util.getMinutes(date));
        }
        /* Seconds */
        if (format.indexOf('ss') > -1) {
            format = format.replace('ss', ('0' + this._util.getSeconds(date)).slice(-2));
        }
        else if (format.indexOf('s') > -1) {
            format = format.replace('s', '' + this._util.getSeconds(date));
        }
        /* Months */
        if (format.indexOf('MMMM') > -1) {
            format = format.replace('MMMM', this._locale.getMonthNames('long')[this._util.getMonth(date)]);
        }
        else if (format.indexOf('MMM') > -1) {
            format = format.replace('MMM', this._locale.getMonthNames('short')[this._util.getMonth(date)]);
        }
        else if (format.indexOf('MM') > -1) {
            format = format.replace('MM', ('0' + (this._util.getMonth(date) + 1)).slice(-2));
        }
        else if (format.indexOf('M') > -1) {
            format = format.replace('M', '' + (this._util.getMonth(date) + 1));
        }
        return format;
    };
    /**
     * Get an hour of the date in the 12-hour format
     * @param date Date Object
     * @return hour of the date in the 12-hour format
     */
    Md2Datepicker.prototype._getHours12 = function (hours) {
        if (hours == 0) {
            hours = 12;
        }
        else if (hours > 12) {
            hours -= 12;
        }
        return hours;
    };
    /** Selects the given date and closes the currently open popup or dialog. */
    Md2Datepicker.prototype._selectAndClose = function (date) {
        var oldValue = this._selected;
        this.value = date;
        if (!this._util.sameDateAndTime(oldValue, this._selected)) {
            this._emitChangeEvent();
        }
        this.close();
    };
    /** Emits an event when the user selects a date. */
    Md2Datepicker.prototype._emitChangeEvent = function () {
        this._onChange(this.value);
        this.change.emit(new Md2DateChange(this, this.value));
    };
    /** Open the calendar. */
    Md2Datepicker.prototype.open = function () {
        if (this.opened) {
            return;
        }
        if (!this._calendarPortal) {
            this._calendarPortal = new ComponentPortal(Md2DatepickerContent, this._viewContainerRef);
        }
        this.touchUi ? this._openAsDialog() : this._openAsPopup();
        this.opened = true;
        this.onOpen.emit();
    };
    /** Close the calendar. */
    Md2Datepicker.prototype.close = function () {
        if (!this.opened) {
            return;
        }
        if (this._popupRef && this._popupRef.hasAttached()) {
            this._popupRef.detach();
        }
        if (this._dialogRef && this._dialogRef.hasAttached()) {
            this._dialogRef.detach();
        }
        if (this._calendarPortal && this._calendarPortal.isAttached) {
            this._calendarPortal.detach();
        }
        this.opened = false;
        this.onClose.emit();
    };
    /** Open the calendar as a dialog. */
    Md2Datepicker.prototype._openAsDialog = function () {
        var _this = this;
        if (!this._dialogRef) {
            this._createDialog();
        }
        if (!this._dialogRef.hasAttached()) {
            var componentRef = this._dialogRef.attach(this._calendarPortal);
            componentRef.instance.datepicker = this;
        }
        this._dialogRef.backdropClick().first().subscribe(function () { return _this.close(); });
    };
    /** Open the calendar as a popup. */
    Md2Datepicker.prototype._openAsPopup = function () {
        var _this = this;
        if (!this._popupRef) {
            this._createPopup();
        }
        if (!this._popupRef.hasAttached()) {
            var componentRef = this._popupRef.attach(this._calendarPortal);
            componentRef.instance.datepicker = this;
            /* Update the position once the calendar has rendered. */
            this._ngZone.onStable.first().subscribe(function () { return _this._popupRef.updatePosition(); });
        }
        this._popupRef.backdropClick().first().subscribe(function () { return _this.close(); });
    };
    /** Create the dialog. */
    Md2Datepicker.prototype._createDialog = function () {
        var overlayState = new OverlayState();
        overlayState.positionStrategy = this._overlay.position().global()
            .centerHorizontally()
            .centerVertically();
        overlayState.hasBackdrop = true;
        overlayState.backdropClass = 'cdk-overlay-dark-backdrop';
        overlayState.direction = this._dir ? this._dir.value : 'ltr';
        this._dialogRef = this._overlay.create(overlayState);
    };
    /** Create the popup. */
    Md2Datepicker.prototype._createPopup = function () {
        var overlayState = new OverlayState();
        overlayState.positionStrategy = this._createPopupPositionStrategy();
        overlayState.hasBackdrop = true;
        if (this.touchUi) {
            overlayState.backdropClass = 'cdk-overlay-dark-backdrop';
        }
        else {
            overlayState.backdropClass = 'cdk-overlay-transparent-backdrop';
        }
        overlayState.direction = this._dir ? this._dir.value : 'ltr';
        overlayState.scrollStrategy = new RepositionScrollStrategy(this._scrollDispatcher);
        this._popupRef = this._overlay.create(overlayState);
    };
    /** Create the popup PositionStrategy. */
    Md2Datepicker.prototype._createPopupPositionStrategy = function () {
        return this._overlay.position()
            .connectedTo(this._element, { originX: 'start', originY: 'bottom' }, { overlayX: 'start', overlayY: 'top' })
            .withFallbackPosition({ originX: 'start', originY: 'top' }, { overlayX: 'start', overlayY: 'bottom' })
            .withFallbackPosition({ originX: 'end', originY: 'bottom' }, { overlayX: 'end', overlayY: 'top' })
            .withFallbackPosition({ originX: 'end', originY: 'top' }, { overlayX: 'end', overlayY: 'bottom' });
    };
    return Md2Datepicker;
}());
__decorate([
    Input(),
    __metadata("design:type", Date)
], Md2Datepicker.prototype, "startAt", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], Md2Datepicker.prototype, "startView", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], Md2Datepicker.prototype, "touchUi", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number)
], Md2Datepicker.prototype, "tabindex", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], Md2Datepicker.prototype, "mode", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], Md2Datepicker.prototype, "placeholder", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number)
], Md2Datepicker.prototype, "timeInterval", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [String])
], Md2Datepicker.prototype, "type", null);
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [String])
], Md2Datepicker.prototype, "format", null);
__decorate([
    Input(),
    __metadata("design:type", Date),
    __metadata("design:paramtypes", [Date])
], Md2Datepicker.prototype, "min", null);
__decorate([
    Input(),
    __metadata("design:type", Date),
    __metadata("design:paramtypes", [Date])
], Md2Datepicker.prototype, "max", null);
__decorate([
    Input(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Function])
], Md2Datepicker.prototype, "dateFilter", null);
__decorate([
    Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Object])
], Md2Datepicker.prototype, "required", null);
__decorate([
    Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Object])
], Md2Datepicker.prototype, "disabled", null);
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Date])
], Md2Datepicker.prototype, "value", null);
__decorate([
    Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], Md2Datepicker.prototype, "openOnFocus", null);
__decorate([
    Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], Md2Datepicker.prototype, "isOpen", null);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], Md2Datepicker.prototype, "onOpen", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], Md2Datepicker.prototype, "onClose", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], Md2Datepicker.prototype, "change", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], Md2Datepicker.prototype, "selectedChanged", void 0);
Md2Datepicker = __decorate([
    Component({selector: 'md2-datepicker',
        template: "<div class=\"md2-datepicker-trigger\"><button type=\"button\" class=\"md2-datepicker-button\" tabindex=\"-1\" (click)=\"open()\" [ngSwitch]=\"type\"><svg *ngSwitchCase=\"'time'\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><path d=\"M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22C6.47,22 2,17.5 2,12A10,10 0 0,1 12,2M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z\"></path></svg> <svg *ngSwitchCase=\"'datetime'\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><path d=\"M15,13H16.5V15.82L18.94,17.23L18.19,18.53L15,16.69V13M19,8H5V19H9.67C9.24,18.09 9,17.07 9,16A7,7 0 0,1 16,9C17.07,9 18.09,9.24 19,9.67V8M5,21C3.89,21 3,20.1 3,19V5C3,3.89 3.89,3 5,3H6V1H8V3H16V1H18V3H19A2,2 0 0,1 21,5V11.1C22.24,12.36 23,14.09 23,16A7,7 0 0,1 16,23C14.09,23 12.36,22.24 11.1,21H5M16,11.15A4.85,4.85 0 0,0 11.15,16C11.15,18.68 13.32,20.85 16,20.85A4.85,4.85 0 0,0 20.85,16C20.85,13.32 18.68,11.15 16,11.15Z\"></path></svg> <svg *ngSwitchDefault width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><path d=\"M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z\"></path></svg></button><div class=\"md2-datepicker-input\" [class.md2-datepicker-input-focused]=\"_inputFocused\"><span class=\"md2-datepicker-placeholder\" [class.md2-floating-placeholder]=\"value || _inputFocused\">{{ placeholder }}</span> <input #input type=\"text\" class=\"md2-datepicker-value\" [tabindex]=\"tabindex\" [disabled]=\"disabled\" autocomplete=\"off\" [value]=\"_inputValue\" (change)=\"$event.stopPropagation()\" (click)=\"_handleFocus($event)\" (focus)=\"_handleFocus($event)\" (blur)=\"_handleBlur($event)\"> <span class=\"md2-datepicker-arrow\" (click)=\"open()\"></span></div></div>",
        styles: ["md2-datepicker{position:relative;display:inline-block;min-width:175px;outline:0;backface-visibility:hidden}md2-datepicker.md2-datepicker-disabled{pointer-events:none;cursor:default}.md2-datepicker-trigger{display:block;padding:18px 0 4px 46px;white-space:nowrap}.md2-datepicker-button{position:absolute;top:13px;left:0;display:inline-block;height:40px;width:40px;padding:8px;line-height:24px;color:rgba(0,0,0,.54);fill:currentColor;border:0;border-radius:50%;outline:0;user-select:none;cursor:pointer;box-sizing:border-box;background:0 0;vertical-align:middle;align-items:center;text-align:center}.md2-datepicker-button:focus{background-color:rgba(158,158,158,.2)}.md2-datepicker-disabled .md2-datepicker-button{color:rgba(0,0,0,.38)}.md2-datepicker-input{color:rgba(0,0,0,.38);border-bottom:1px solid rgba(0,0,0,.12);display:flex;justify-content:space-between;align-items:center;height:30px;min-width:168px;line-height:22px;position:relative;padding-right:20px;box-sizing:border-box}[aria-disabled=true] .md2-datepicker-input{background-image:linear-gradient(to right,rgba(0,0,0,.26) 0,rgba(0,0,0,.26) 33%,transparent 0);background-size:4px 1px;background-repeat:repeat-x;border-color:transparent;background-position:0 bottom;cursor:default;user-select:none}.md2-datepicker-input.md2-datepicker-input-focused{color:#106cc8;border-color:#106cc8}md2-datepicker.ng-invalid.ng-touched:not(.md2-datepicker-disabled) .md2-datepicker-input{color:#f44336;border-color:#f44336}.md2-datepicker-placeholder{position:absolute;right:18px;bottom:100%;left:0;padding:0 2px;transform:translate3d(0,26px,0) scale(1);transform-origin:left top;white-space:nowrap;overflow-x:hidden;text-overflow:ellipsis;transition:all 150ms cubic-bezier(.25,.8,.25,1)}.md2-datepicker-placeholder.md2-floating-placeholder{left:-2px;text-align:left;transform:translate3d(0,6px,0) scale(.75)}[dir=rtl] .md2-datepicker-placeholder{right:0;left:18px;transform-origin:right top}[dir=rtl] .md2-datepicker-placeholder.md2-floating-placeholder{right:-2px;text-align:right}[aria-required=true] .md2-datepicker-placeholder::after{content:'*'}.md2-datepicker-value{position:relative;width:100%;white-space:nowrap;overflow-x:hidden;text-overflow:ellipsis;color:rgba(0,0,0,.87);border:0;outline:0;background:0 0}.md2-datepicker-disabled .md2-datepicker-value{color:rgba(0,0,0,.38)}[dir=rtl] .md2-datepicker-value{left:auto;right:0}.md2-datepicker-arrow{position:absolute;right:0;width:0;height:0;border-left:5px solid transparent;border-right:5px solid transparent;border-top:5px solid;margin:0 4px;color:rgba(0,0,0,.38)}.md2-datepicker-input-focused .md2-datepicker-arrow{color:#106cc8}md2-datepicker.ng-invalid.ng-touched:not(.md2-datepicker-disabled) .md2-datepicker-arrow{color:#f44336}.md2-calendar-years{position:absolute;top:10px;right:100%;bottom:10px;display:block;width:100%;line-height:40px;background:#fff;overflow-x:hidden;overflow-y:auto;transition:.3s}.md2-calendar-years.active{right:0}.md2-calendar-years .md2-calendar-years-content{display:flex;flex-direction:column;justify-content:center;min-height:100%}.md2-calendar-year{position:relative;display:block;margin:0 auto;padding:0;font-size:17px;font-weight:400;text-align:center;cursor:pointer}.md2-calendar-year.selected{color:#106cc8;font-size:26px;font-weight:500}.md2-datepicker-actions{text-align:right}.md2-datepicker-actions .md2-button{display:inline-block;min-width:64px;margin:4px 8px 8px 0;padding:0 12px;font-size:14px;color:#106cc8;line-height:36px;text-align:center;text-transform:uppercase;border-radius:2px;cursor:pointer;box-sizing:border-box;transition:all 450ms cubic-bezier(.23,1,.32,1)}.md2-datepicker-actions .md2-button:hover{background:#ebebeb} /*# sourceMappingURL=datepicker.css.map */ "],
        providers: [MD2_DATEPICKER_VALUE_ACCESSOR, MD2_DATEPICKER_VALIDATORS],
        host: {
            'role': 'datepicker',
            '[class.md2-datepicker-disabled]': 'disabled',
            '[class.md2-datepicker-opened]': 'opened',
            '[attr.aria-label]': 'placeholder',
            '[attr.aria-required]': 'required.toString()',
            '[attr.aria-disabled]': 'disabled.toString()',
        },
        encapsulation: ViewEncapsulation.None,
    }),
    __param(7, Optional()),
    __metadata("design:paramtypes", [ElementRef,
        Overlay,
        NgZone,
        ViewContainerRef,
        ScrollDispatcher,
        DateLocale, DateUtil,
        Dir])
], Md2Datepicker);
export { Md2Datepicker };
//# sourceMappingURL=datepicker.js.map