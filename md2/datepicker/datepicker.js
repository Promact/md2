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
import { Component, ElementRef, HostListener, Input, Output, Optional, EventEmitter, Renderer, Self, ViewChildren, QueryList, ViewEncapsulation, NgModule } from '@angular/core';
import { NgControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DateLocale } from './date-locale';
import { Md2Clock } from './clock';
import { coerceBooleanProperty, ENTER, SPACE, TAB, ESCAPE, HOME, END, PAGE_UP, PAGE_DOWN, LEFT_ARROW, RIGHT_ARROW, UP_ARROW, DOWN_ARROW, Overlay, OverlayState, OverlayModule, TemplatePortalDirective, PortalModule } from '../core';
import { fadeInContent } from './datepicker-animations';
/** Change event object emitted by Md2Select. */
export var Md2DateChange = (function () {
    function Md2DateChange(source, value) {
        this.source = source;
        this.value = value;
    }
    return Md2DateChange;
}());
var nextId = 0;
export var Md2Datepicker = (function () {
    function Md2Datepicker(_element, overlay, _renderer, _locale, _control) {
        this._element = _element;
        this.overlay = overlay;
        this._renderer = _renderer;
        this._locale = _locale;
        this._control = _control;
        this._value = null;
        this._selected = null;
        this._date = null;
        this._panelOpen = false;
        this._openOnFocus = false;
        this._type = 'date';
        this._required = false;
        this._disabled = false;
        this.today = new Date();
        this._min = null;
        this._max = null;
        this._years = [];
        this._dates = [];
        this._clockView = 'hour';
        this._prevMonth = 1;
        this._currMonth = 2;
        this._nextMonth = 3;
        this._transformOrigin = 'top';
        this._panelDoneAnimating = false;
        this._onChange = function (value) { };
        this._onTouched = function () { };
        /** Event emitted when the select has been opened. */
        this.onOpen = new EventEmitter();
        /** Event emitted when the select has been closed. */
        this.onClose = new EventEmitter();
        /** Event emitted when the selected date has been changed by the user. */
        this.change = new EventEmitter();
        this.name = '';
        this.id = 'md2-datepicker-' + (++nextId);
        this.tabindex = 0;
        if (this._control) {
            this._control.valueAccessor = this;
        }
        this._weekDays = _locale.days;
        this.getYears();
    }
    Md2Datepicker.prototype.ngOnDestroy = function () { this.destroyPanel(); };
    Object.defineProperty(Md2Datepicker.prototype, "value", {
        get: function () { return this._value; },
        set: function (value) {
            this._value = this.coerceDateProperty(value);
            if (value && value !== this._value) {
                if (this._locale.isValidDate(value)) {
                    this._value = value;
                }
                else {
                    if (this.type === 'time') {
                        var t = value + '';
                        this._value = new Date();
                        this._value.setHours(parseInt(t.substring(0, 2)));
                        this._value.setMinutes(parseInt(t.substring(3, 5)));
                    }
                    else {
                        this._value = new Date(value);
                    }
                }
            }
            this.date = this._value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Datepicker.prototype, "date", {
        get: function () { return this._date || this.today; },
        set: function (value) {
            if (value && this._locale.isValidDate(value)) {
                if (this._min && this._min > value) {
                    value = this._min;
                }
                if (this._max && this._max < value) {
                    value = this._max;
                }
                this._date = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Datepicker.prototype, "time", {
        get: function () { return this.date.getHours() + ':' + this.date.getMinutes(); },
        set: function (value) {
            this.date = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate(), parseInt(value.split(':')[0]), parseInt(value.split(':')[1]));
            // if (this._clockView === 'hour') {
            //  this.date.setHours(parseInt(value.split(':')[0]));
            // } else {
            //  this.date.setMinutes(parseInt(value.split(':')[1]));
            // }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Datepicker.prototype, "type", {
        get: function () { return this._type; },
        set: function (value) {
            this._type = value || 'date';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Datepicker.prototype, "selected", {
        get: function () { return this._selected; },
        set: function (value) { this._selected = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Datepicker.prototype, "format", {
        get: function () {
            return this._format || (this.type === 'date' ?
                'dd/MM/y' : this.type === 'time' ? 'HH:mm' : this.type === 'datetime' ?
                'dd/MM/y HH:mm' : 'dd/MM/y');
        },
        set: function (value) {
            if (this._format !== value) {
                this._format = value;
            }
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
    Object.defineProperty(Md2Datepicker.prototype, "min", {
        set: function (value) {
            if (value && this._locale.isValidDate(value)) {
                this._min = new Date(value);
                this._min.setHours(0, 0, 0, 0);
                this.getYears();
            }
            else {
                this._min = null;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Datepicker.prototype, "max", {
        set: function (value) {
            if (value && this._locale.isValidDate(value)) {
                this._max = new Date(value);
                this._max.setHours(0, 0, 0, 0);
                this.getYears();
            }
            else {
                this._max = null;
            }
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
            if (value && !this.panelOpen) {
                this.open();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Datepicker.prototype, "panelOpen", {
        get: function () {
            return this._panelOpen;
        },
        enumerable: true,
        configurable: true
    });
    Md2Datepicker.prototype.toggle = function () {
        this.panelOpen ? this.close() : this.open();
    };
    /** Opens the overlay panel. */
    Md2Datepicker.prototype.open = function () {
        if (this.disabled) {
            return;
        }
        this._isCalendarVisible = this.type !== 'time' ? true : false;
        this._createOverlay();
        this._overlayRef.attach(this.templatePortals.first);
        this._subscribeToBackdrop();
        this._panelOpen = true;
        this.selected = this.value || new Date(1, 0, 1);
        this.date = this.value || this.today;
        this.generateCalendar();
    };
    /** Closes the overlay panel and focuses the host element. */
    Md2Datepicker.prototype.close = function () {
        var _this = this;
        setTimeout(function () {
            _this._panelOpen = false;
            if (_this._openOnFocus) {
                _this._openOnFocus = false;
                setTimeout(function () { _this._openOnFocus = true; }, 100);
            }
            // if (!this._date) {
            //  this._placeholderState = '';
            // }
            if (_this._overlayRef) {
                _this._overlayRef.detach();
                _this._backdropSubscription.unsubscribe();
            }
            _this._focusHost();
            _this._isYearsVisible = false;
            _this._isCalendarVisible = _this.type !== 'time' ? true : false;
            _this._clockView = 'hour';
        }, 10);
    };
    /** Removes the panel from the DOM. */
    Md2Datepicker.prototype.destroyPanel = function () {
        if (this._overlayRef) {
            this._overlayRef.dispose();
            this._overlayRef = null;
            this._cleanUpSubscriptions();
        }
    };
    Md2Datepicker.prototype._onPanelDone = function () {
        if (this.panelOpen) {
            this._focusPanel();
            this.onOpen.emit();
        }
        else {
            this.onClose.emit();
        }
    };
    Md2Datepicker.prototype._onFadeInDone = function () {
        this._panelDoneAnimating = this.panelOpen;
    };
    Md2Datepicker.prototype._focusPanel = function () {
        var el = document.querySelectorAll('.md2-datepicker-panel')[0];
        el.focus();
    };
    Md2Datepicker.prototype._focusHost = function () {
        this._renderer.invokeElementMethod(this._element.nativeElement, 'focus');
    };
    Md2Datepicker.prototype.coerceDateProperty = function (value, fallbackValue) {
        if (fallbackValue === void 0) { fallbackValue = new Date(); }
        var timestamp = Date.parse(value);
        fallbackValue = null;
        return isNaN(timestamp) ? fallbackValue : new Date(timestamp);
    };
    Md2Datepicker.prototype._handleClick = function (event) {
        if (this.disabled) {
            event.stopPropagation();
            event.preventDefault();
            return;
        }
    };
    Md2Datepicker.prototype._handleKeydown = function (event) {
        if (this.disabled) {
            return;
        }
        if (this.panelOpen) {
            event.preventDefault();
            event.stopPropagation();
            switch (event.keyCode) {
                case TAB:
                case ESCAPE:
                    this._onBlur();
                    this.close();
                    break;
            }
            var date = this.date;
            if (this._isYearsVisible) {
                switch (event.keyCode) {
                    case ENTER:
                    case SPACE:
                        this._onClickOk();
                        break;
                    case DOWN_ARROW:
                        if (this.date.getFullYear() < (this.today.getFullYear() + 100)) {
                            this.date = this._locale.incrementYears(date, 1);
                            this._scrollToSelectedYear();
                        }
                        break;
                    case UP_ARROW:
                        if (this.date.getFullYear() > 1900) {
                            this.date = this._locale.incrementYears(date, -1);
                            this._scrollToSelectedYear();
                        }
                        break;
                }
            }
            else if (this._isCalendarVisible) {
                switch (event.keyCode) {
                    case ENTER:
                    case SPACE:
                        this.setDate(this.date);
                        break;
                    case RIGHT_ARROW:
                        this.date = this._locale.incrementDays(date, 1);
                        break;
                    case LEFT_ARROW:
                        this.date = this._locale.incrementDays(date, -1);
                        break;
                    case PAGE_DOWN:
                        if (event.shiftKey) {
                            this.date = this._locale.incrementYears(date, 1);
                        }
                        else {
                            this.date = this._locale.incrementMonths(date, 1);
                        }
                        break;
                    case PAGE_UP:
                        if (event.shiftKey) {
                            this.date = this._locale.incrementYears(date, -1);
                        }
                        else {
                            this.date = this._locale.incrementMonths(date, -1);
                        }
                        break;
                    case DOWN_ARROW:
                        this.date = this._locale.incrementDays(date, 7);
                        break;
                    case UP_ARROW:
                        this.date = this._locale.incrementDays(date, -7);
                        break;
                    case HOME:
                        this.date = this._locale.getFirstDateOfMonth(date);
                        break;
                    case END:
                        this.date = this._locale.getLastDateOfMonth(date);
                        break;
                }
                if (!this._locale.isSameMonthAndYear(date, this.date)) {
                    this.generateCalendar();
                }
            }
            else if (this._clockView === 'hour') {
                switch (event.keyCode) {
                    case ENTER:
                    case SPACE:
                        this.setHour(this.date.getHours());
                        break;
                    case UP_ARROW:
                        this.date = this._locale.incrementHours(date, 1);
                        break;
                    case DOWN_ARROW:
                        this.date = this._locale.incrementHours(date, -1);
                        break;
                }
            }
            else {
                switch (event.keyCode) {
                    case ENTER:
                    case SPACE:
                        this.setMinute(this.date.getMinutes());
                        break;
                    case UP_ARROW:
                        this.date = this._locale.incrementMinutes(date, 1);
                        break;
                    case DOWN_ARROW:
                        this.date = this._locale.incrementMinutes(date, -1);
                        break;
                }
            }
        }
        else {
            switch (event.keyCode) {
                case ENTER:
                case SPACE:
                    event.preventDefault();
                    event.stopPropagation();
                    this.open();
                    break;
            }
        }
    };
    Md2Datepicker.prototype._onFocus = function () {
        if (!this.panelOpen && this.openOnFocus) {
            this.open();
        }
    };
    Md2Datepicker.prototype._onBlur = function () {
        if (!this.panelOpen) {
            this._onTouched();
        }
    };
    /**
     * Display Years
     */
    Md2Datepicker.prototype._showYear = function () {
        this._isYearsVisible = true;
        this._isCalendarVisible = true;
        this._scrollToSelectedYear();
    };
    Md2Datepicker.prototype.getYears = function () {
        var startYear = this._min ? this._min.getFullYear() : 1900, endYear = this._max ? this._max.getFullYear() : this.today.getFullYear() + 100;
        this._years = [];
        for (var i = startYear; i <= endYear; i++) {
            this._years.push(i);
        }
    };
    Md2Datepicker.prototype._scrollToSelectedYear = function () {
        setTimeout(function () {
            var yearContainer = document.querySelector('.md2-calendar-years'), selectedYear = document.querySelector('.md2-calendar-year.selected');
            yearContainer.scrollTop = (selectedYear.offsetTop + 20) - yearContainer.clientHeight / 2;
        }, 0);
    };
    /**
     * select year
     * @param year
     */
    Md2Datepicker.prototype._setYear = function (year) {
        this.date = new Date(year, this.date.getMonth(), this.date.getDate(), this.date.getHours(), this.date.getMinutes());
        this.generateCalendar();
        this._isYearsVisible = false;
    };
    /**
     * Display Calendar
     */
    Md2Datepicker.prototype._showCalendar = function () {
        this._isYearsVisible = false;
        this._isCalendarVisible = true;
    };
    /**
     * Toggle Hour visiblity
     */
    Md2Datepicker.prototype._toggleHours = function (value) {
        this._isYearsVisible = false;
        this._isCalendarVisible = false;
        this._isYearsVisible = false;
        this._clockView = value;
    };
    /**
     * Ok Button Event
     */
    Md2Datepicker.prototype._onClickOk = function () {
        if (this._isYearsVisible) {
            this.generateCalendar();
            this._isYearsVisible = false;
            this._isCalendarVisible = true;
        }
        else if (this._isCalendarVisible) {
            this.setDate(this.date);
        }
        else if (this._clockView === 'hour') {
            this._clockView = 'minute';
        }
        else {
            this.value = this.date;
            this._emitChangeEvent();
            this._onBlur();
            this.close();
        }
    };
    /**
     * Date Selection Event
     * @param event Event Object
     * @param date Date Object
     */
    Md2Datepicker.prototype._onClickDate = function (event, date) {
        event.preventDefault();
        event.stopPropagation();
        if (date.disabled) {
            return;
        }
        if (date.calMonth === this._prevMonth) {
            this._updateMonth(-1);
        }
        else if (date.calMonth === this._currMonth) {
            this.setDate(new Date(date.dateObj.year, date.dateObj.month, date.dateObj.day, this.date.getHours(), this.date.getMinutes()));
        }
        else if (date.calMonth === this._nextMonth) {
            this._updateMonth(1);
        }
    };
    /**
     * Set Date
     * @param date Date Object
     */
    Md2Datepicker.prototype.setDate = function (date) {
        if (this.type === 'date') {
            this.value = date;
            this._emitChangeEvent();
            this._onBlur();
            this.close();
        }
        else {
            this.selected = date;
            this.date = date;
            this._isCalendarVisible = false;
            this._clockView = 'hour';
        }
    };
    /**
     * Update Month
     * @param noOfMonths increment number of months
     */
    Md2Datepicker.prototype._updateMonth = function (noOfMonths) {
        this.date = this._locale.incrementMonths(this.date, noOfMonths);
        this.generateCalendar();
    };
    /**
     * Check is Before month enabled or not
     * @return boolean
     */
    Md2Datepicker.prototype._isBeforeMonth = function () {
        return !this._min ? true :
            this._min && this._locale.getMonthDistance(this.date, this._min) < 0;
    };
    /**
     * Check is After month enabled or not
     * @return boolean
     */
    Md2Datepicker.prototype._isAfterMonth = function () {
        return !this._max ? true :
            this._max && this._locale.getMonthDistance(this.date, this._max) > 0;
    };
    Md2Datepicker.prototype._onTimeChange = function (event) {
        if (this.time !== event) {
            this.time = event;
        }
    };
    Md2Datepicker.prototype._onHourChange = function (event) {
        this._clockView = 'minute';
    };
    Md2Datepicker.prototype._onMinuteChange = function (event) {
        this.value = this.date;
        this._emitChangeEvent();
        this._onBlur();
        this.close();
    };
    /**
     * Check the date is enabled or not
     * @param date Date Object
     * @return boolean
     */
    Md2Datepicker.prototype._isDisabledDate = function (date) {
        if (this._min && this._max) {
            return (this._min > date) || (this._max < date);
        }
        else if (this._min) {
            return (this._min > date);
        }
        else if (this._max) {
            return (this._max < date);
        }
        else {
            return false;
        }
        // if (this.disableWeekends) {
        //   let dayNbr = this.getDayNumber(date);
        //   if (dayNbr === 0 || dayNbr === 6) {
        //     return true;
        //   }
        // }
        // return false;
    };
    /**
     * Generate Month Calendar
     */
    Md2Datepicker.prototype.generateCalendar = function () {
        var year = this.date.getFullYear();
        var month = this.date.getMonth();
        this._dates.length = 0;
        var firstDayOfMonth = this._locale.getFirstDateOfMonth(this.date);
        var numberOfDaysInMonth = this._locale.getNumberOfDaysInMonth(this.date);
        var numberOfDaysInPrevMonth = this._locale.getNumberOfDaysInMonth(this._locale.incrementMonths(this.date, -1));
        var dayNbr = 1;
        var calMonth = this._prevMonth;
        for (var i = 1; i < 7; i++) {
            var week = [];
            if (i === 1) {
                var prevMonth = numberOfDaysInPrevMonth - firstDayOfMonth.getDay() + 1;
                for (var j = prevMonth; j <= numberOfDaysInPrevMonth; j++) {
                    var iDate = { year: year, month: month - 1, day: j, hour: 0, minute: 0 };
                    var date = new Date(year, month - 1, j);
                    week.push({
                        date: date,
                        dateObj: iDate,
                        calMonth: calMonth,
                        today: this._locale.isSameDay(this.today, date),
                        disabled: this._isDisabledDate(date)
                    });
                }
                calMonth = this._currMonth;
                var daysLeft = 7 - week.length;
                for (var j = 0; j < daysLeft; j++) {
                    var iDate = { year: year, month: month, day: dayNbr, hour: 0, minute: 0 };
                    var date = new Date(year, month, dayNbr);
                    week.push({
                        date: date,
                        dateObj: iDate,
                        calMonth: calMonth,
                        today: this._locale.isSameDay(this.today, date),
                        disabled: this._isDisabledDate(date)
                    });
                    dayNbr++;
                }
            }
            else {
                for (var j = 1; j < 8; j++) {
                    if (dayNbr > numberOfDaysInMonth) {
                        dayNbr = 1;
                        calMonth = this._nextMonth;
                    }
                    var iDate = {
                        year: year,
                        month: calMonth === this._currMonth ? month : month + 1,
                        day: dayNbr, hour: 0, minute: 0
                    };
                    var date = new Date(year, iDate.month, dayNbr);
                    week.push({
                        date: date,
                        dateObj: iDate,
                        calMonth: calMonth,
                        today: this._locale.isSameDay(this.today, date),
                        disabled: this._isDisabledDate(date)
                    });
                    dayNbr++;
                }
            }
            this._dates.push(week);
        }
    };
    /**
     * Set hours
     * @param hour number of hours
     */
    Md2Datepicker.prototype.setHour = function (hour) {
        this._clockView = 'minute';
        this.date = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate(), hour, this.date.getMinutes());
    };
    /**
     * Set minutes
     * @param minute number of minutes
     */
    Md2Datepicker.prototype.setMinute = function (minute) {
        this.date = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate(), this.date.getHours(), minute);
        this.selected = this.date;
        this.value = this.date;
        this._emitChangeEvent();
        this._onBlur();
        this.close();
    };
    /** Emits an event when the user selects a date. */
    Md2Datepicker.prototype._emitChangeEvent = function () {
        this._onChange(this.value);
        this.change.emit(new Md2DateChange(this, this.value));
    };
    Md2Datepicker.prototype.writeValue = function (value) {
        this.value = value;
    };
    Md2Datepicker.prototype.registerOnChange = function (fn) { this._onChange = fn; };
    Md2Datepicker.prototype.registerOnTouched = function (fn) { this._onTouched = fn; };
    Md2Datepicker.prototype._subscribeToBackdrop = function () {
        var _this = this;
        this._backdropSubscription = this._overlayRef.backdropClick().subscribe(function () {
            _this.close();
        });
    };
    /**
     *  This method creates the overlay from the provided panel's template and saves its
     *  OverlayRef so that it can be attached to the DOM when open is called.
     */
    Md2Datepicker.prototype._createOverlay = function () {
        if (!this._overlayRef) {
            var config = new OverlayState();
            config.positionStrategy = this.overlay.position()
                .global()
                .centerHorizontally()
                .centerVertically();
            config.hasBackdrop = true;
            config.backdropClass = 'cdk-overlay-dark-backdrop';
            this._overlayRef = this.overlay.create(config);
        }
    };
    Md2Datepicker.prototype._cleanUpSubscriptions = function () {
        if (this._backdropSubscription) {
            this._backdropSubscription.unsubscribe();
        }
    };
    __decorate([
        ViewChildren(TemplatePortalDirective), 
        __metadata('design:type', QueryList)
    ], Md2Datepicker.prototype, "templatePortals", void 0);
    __decorate([
        Output(), 
        __metadata('design:type', EventEmitter)
    ], Md2Datepicker.prototype, "onOpen", void 0);
    __decorate([
        Output(), 
        __metadata('design:type', EventEmitter)
    ], Md2Datepicker.prototype, "onClose", void 0);
    __decorate([
        Output(), 
        __metadata('design:type', EventEmitter)
    ], Md2Datepicker.prototype, "change", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', String)
    ], Md2Datepicker.prototype, "name", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', String)
    ], Md2Datepicker.prototype, "id", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', String)
    ], Md2Datepicker.prototype, "placeholder", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Number)
    ], Md2Datepicker.prototype, "tabindex", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], Md2Datepicker.prototype, "value", null);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], Md2Datepicker.prototype, "type", null);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], Md2Datepicker.prototype, "selected", null);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], Md2Datepicker.prototype, "format", null);
    __decorate([
        Input(), 
        __metadata('design:type', Boolean)
    ], Md2Datepicker.prototype, "required", null);
    __decorate([
        Input(), 
        __metadata('design:type', Boolean)
    ], Md2Datepicker.prototype, "disabled", null);
    __decorate([
        Input(), 
        __metadata('design:type', Date), 
        __metadata('design:paramtypes', [Date])
    ], Md2Datepicker.prototype, "min", null);
    __decorate([
        Input(), 
        __metadata('design:type', Date), 
        __metadata('design:paramtypes', [Date])
    ], Md2Datepicker.prototype, "max", null);
    __decorate([
        Input(), 
        __metadata('design:type', Boolean)
    ], Md2Datepicker.prototype, "openOnFocus", null);
    __decorate([
        Input(), 
        __metadata('design:type', Boolean), 
        __metadata('design:paramtypes', [Boolean])
    ], Md2Datepicker.prototype, "isOpen", null);
    __decorate([
        HostListener('click', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [MouseEvent]), 
        __metadata('design:returntype', void 0)
    ], Md2Datepicker.prototype, "_handleClick", null);
    Md2Datepicker = __decorate([
        Component({selector: 'md2-datepicker',
            template: "<div class=\"md2-datepicker-trigger\" (click)=\"toggle()\"> <div class=\"md2-datepicker-icon\"> <svg *ngIf=\"type==='date'\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"> <path d=\"M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z\"></path> </svg> <svg *ngIf=\"type==='time'\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"> <path d=\"M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22C6.47,22 2,17.5 2,12A10,10 0 0,1 12,2M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z\"></path> </svg> <svg *ngIf=\"type==='datetime'\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"> <path d=\"M15,13H16.5V15.82L18.94,17.23L18.19,18.53L15,16.69V13M19,8H5V19H9.67C9.24,18.09 9,17.07 9,16A7,7 0 0,1 16,9C17.07,9 18.09,9.24 19,9.67V8M5,21C3.89,21 3,20.1 3,19V5C3,3.89 3.89,3 5,3H6V1H8V3H16V1H18V3H19A2,2 0 0,1 21,5V11.1C22.24,12.36 23,14.09 23,16A7,7 0 0,1 16,23C14.09,23 12.36,22.24 11.1,21H5M16,11.15A4.85,4.85 0 0,0 11.15,16C11.15,18.68 13.32,20.85 16,20.85A4.85,4.85 0 0,0 20.85,16C20.85,13.32 18.68,11.15 16,11.15Z\"></path> </svg> </div> <div class=\"md2-datepicker-input\"> <span class=\"md2-datepicker-placeholder\" [class.md2-floating-placeholder]=\"value\">{{ placeholder }}</span> <span class=\"md2-datepicker-value\">{{ value | date:format }}</span> <span class=\"md2-datepicker-arrow\"></span> </div> </div> <template portal> <div class=\"md2-datepicker-panel\" [@fadeInContent]=\"'showing'\" (@fadeInContent.done)=\"_onPanelDone()\" (keydown)=\"_handleKeydown($event)\" [style.transformOrigin]=\"_transformOrigin\" [class.md2-datepicker-panel-done-animating]=\"_panelDoneAnimating\" tabindex=\"0\"> <div class=\"md2-datepicker-header\"> <div class=\"md2-datepicker-header-year\" [class.active]=\"_isYearsVisible\" [class.hidden]=\"type==='time'\" (click)=\"_showYear()\">{{ date | date: 'y' }}</div> <div class=\"md2-datepicker-header-date-time\"> <span class=\"md2-datepicker-header-date\" [class.active]=\"_isCalendarVisible && !_isYearsVisible\" [class.hidden]=\"type==='time'\" (click)=\"_showCalendar()\"> {{ date | date: 'EEE, MMM dd' }} </span> <span class=\"md2-datepicker-header-time\" [class.active]=\"!_isCalendarVisible\" [class.hidden]=\"type==='date'\"> <span class=\"md2-datepicker-header-hour\" [class.active]=\"_clockView === 'hour'\" (click)=\"_toggleHours('hour')\">{{ date.getHours() }}</span>:<span class=\"md2-datepicker-header-minute\" [class.active]=\"_clockView === 'minute'\" (click)=\"_toggleHours('minute')\">{{ date.getMinutes() }}</span> </span> </div> </div> <div class=\"md2-datepicker-content\"> <div class=\"md2-datepicker-calendar\" [class.active]=\"_isCalendarVisible\"> <div class=\"md2-calendar-years\" [class.active]=\"_isYearsVisible\"> <div class=\"md2-calendar-years-content\"> <div *ngFor=\"let y of _years\" class=\"md2-calendar-year\" [class.selected]=\"y === date.getFullYear()\" (click)=\"_setYear(y)\">{{y}}</div> </div> </div> <div class=\"md2-calendar-month\" [class.active]=\"!_isYearsVisible\"> <div class=\"md2-calendar-month-header\"> <div class=\"md2-button\" [class.disabled]=\"!_isBeforeMonth()\" (click)=\"_isBeforeMonth() && _updateMonth(-1)\"> <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"> <path d=\"M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z\"></path> </svg> </div> <div class=\"md2-calendar-month-year\">{{ date | date: 'MMMM y' }}</div> <div class=\"md2-button\" [class.disabled]=\"!_isAfterMonth()\" (click)=\"_isAfterMonth() && _updateMonth(1)\"> <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"> <path d=\"M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z\"></path> </svg> </div> </div> <table class=\"md2-calendar-dates\"> <thead><tr><th *ngFor=\"let day of _weekDays\">{{day.xshort}}</th></tr></thead> <tbody> <tr *ngFor=\"let w of _dates\"> <td *ngFor=\"let d of w\"> <div class=\"md2-calendar-day\" [class.today]=\"d.today\" [class.focus]=\"_locale.isSameDay(date, d.date)\" [class.selected]=\"_locale.isSameDay(selected, d.date)\" [class.disabled]=\"d.disabled\" [class.prev-month]=\"d.calMonth===_prevMonth\" [class.curr-month]=\"d.calMonth===_currMonth\" [class.next-month]=\"d.calMonth===_nextMonth\" (click)=\"_onClickDate($event,d)\">{{d.dateObj.day}}</div> </td> </tr> </tbody> </table> </div> </div> <md2-clock [class.active]=\"!_isCalendarVisible\" [time]=\"time\" [view]=\"_clockView\" (timeChange)=\"_onTimeChange($event)\" (onHourChange)=\"_onHourChange($event)\" (onMinuteChange)=\"_onMinuteChange($event)\"></md2-clock> <div class=\"md2-datepicker-actions\"> <div class=\"md2-button\" (click)=\"close()\">Cancel</div> <div class=\"md2-button\" (click)=\"_onClickOk()\">Ok</div> </div> </div> </div> </template>",
            styles: ["md2-datepicker { position: relative; display: inline-block; min-width: 175px; outline: none; -webkit-backface-visibility: hidden; backface-visibility: hidden; } md2-datepicker.md2-datepicker-disabled { pointer-events: none; cursor: default; } .md2-datepicker-trigger { display: block; padding: 18px 0 18px 32px; white-space: nowrap; cursor: pointer; } .md2-datepicker-icon { position: absolute; top: 21px; left: 0; display: block; height: 24px; width: 24px; vertical-align: middle; fill: currentColor; color: rgba(0, 0, 0, 0.54); } .md2-datepicker-disabled .md2-datepicker-icon { color: rgba(0, 0, 0, 0.38); } .md2-datepicker-input { color: rgba(0, 0, 0, 0.38); border-bottom: 1px solid rgba(0, 0, 0, 0.12); display: flex; justify-content: space-between; align-items: center; height: 30px; min-width: 168px; line-height: 22px; position: relative; box-sizing: border-box; } [aria-disabled='true'] .md2-datepicker-input { background-image: linear-gradient(to right, rgba(0, 0, 0, 0.26) 0, rgba(0, 0, 0, 0.26) 33%, transparent 0); background-size: 4px 1px; background-repeat: repeat-x; border-color: transparent; background-position: 0 bottom; cursor: default; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; } md2-datepicker:focus:not(.md2-datepicker-disabled) .md2-datepicker-input { color: #106cc8; border-color: #106cc8; } md2-datepicker.ng-invalid.ng-touched:not(.md2-datepicker-disabled) .md2-datepicker-input { color: #f44336; border-color: #f44336; } .md2-datepicker-placeholder { position: absolute; right: 18px; bottom: 100%; left: 0; padding: 0 2px; transform: translate3d(0, 26px, 0) scale(1); transform-origin: left top; white-space: nowrap; overflow-x: hidden; text-overflow: ellipsis; transition: all 150ms cubic-bezier(0.25, 0.8, 0.25, 1); } .md2-datepicker-placeholder.md2-floating-placeholder { left: -2px; text-align: left; transform: translate3d(0, 6px, 0) scale(0.75); } [dir='rtl'] .md2-datepicker-placeholder { right: 0; left: 18px; transform-origin: right top; } [dir='rtl'] .md2-datepicker-placeholder.md2-floating-placeholder { right: -2px; text-align: right; } [aria-required=true] .md2-datepicker-placeholder::after { content: '*'; } .md2-datepicker-value { position: relative; white-space: nowrap; overflow-x: hidden; text-overflow: ellipsis; color: rgba(0, 0, 0, 0.87); } .md2-datepicker-disabled .md2-datepicker-value { color: rgba(0, 0, 0, 0.38); } [dir='rtl'] .md2-datepicker-value { left: auto; right: 0; } .md2-datepicker-arrow { width: 0; height: 0; border-left: 5px solid transparent; border-right: 5px solid transparent; border-top: 5px solid; margin: 0 4px; color: rgba(0, 0, 0, 0.38); } md2-datepicker:focus:not(.md2-datepicker-disabled) .md2-datepicker-arrow { color: #106cc8; } md2-datepicker.ng-invalid.ng-touched:not(.md2-datepicker-disabled) .md2-datepicker-arrow { color: #f44336; } .md2-datepicker-panel { width: 300px; border-radius: 3px; background-color: white; overflow: hidden; box-shadow: 0 11px 15px -7px rgba(0, 0, 0, 0.2), 0 24px 38px 3px rgba(0, 0, 0, 0.14), 0 9px 46px 8px rgba(0, 0, 0, 0.12); outline: none; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; } .md2-datepicker-header { padding: 16px; color: white; font-weight: 500; white-space: nowrap; background: #106cc8; box-sizing: border-box; } .md2-datepicker-header .hidden { display: none; } .md2-datepicker-header-year { font-size: 16px; opacity: 0.7; cursor: pointer; } .md2-datepicker-header-year.active { opacity: 1; pointer-events: none; } .md2-datepicker-header-date-time { font-size: 32px; } .md2-datepicker-header-date { opacity: 0.7; cursor: pointer; } .md2-datepicker-header-date.active { opacity: 1; pointer-events: none; } .md2-datepicker-header-time { opacity: 0.7; display: inline-block; padding-left: 8px; cursor: pointer; } .md2-datepicker-header-time.active { opacity: 1; cursor: default; } .md2-datepicker-header-time.active .md2-datepicker-header-hour, .md2-datepicker-header-time.active .md2-datepicker-header-minute { opacity: 0.7; cursor: pointer; } .md2-datepicker-header-time.active .md2-datepicker-header-hour.active, .md2-datepicker-header-time.active .md2-datepicker-header-minute.active { opacity: 1; pointer-events: none; } .md2-datepicker-content { position: relative; width: 100%; padding-top: 300px; overflow: hidden; } .md2-datepicker-calendar { position: absolute; top: 0; right: 100%; display: block; width: 100%; height: 300px; transition: 300ms; } .md2-datepicker-calendar.active { right: 0; } .md2-calendar-years { position: absolute; top: 10px; right: 100%; bottom: 10px; display: block; width: 100%; line-height: 40px; background: white; overflow-x: hidden; overflow-y: auto; transition: 300ms; } .md2-calendar-years.active { right: 0; } .md2-calendar-years .md2-calendar-years-content { display: flex; flex-direction: column; justify-content: center; min-height: 100%; } .md2-calendar-year { position: relative; display: block; margin: 0 auto; padding: 0; font-size: 17px; font-weight: 400; text-align: center; cursor: pointer; } .md2-calendar-year.selected { color: #106cc8; font-size: 26px; font-weight: 500; } .md2-calendar-month { position: absolute; left: 100%; display: block; width: 100%; font-size: 12px; font-weight: 400; text-align: center; transition: 300ms; } .md2-calendar-month.active { left: 0; } .md2-calendar-month-header { display: flex; justify-content: space-between; font-size: 14px; font-weight: 700; text-align: center; line-height: 48px; } .md2-calendar-month-header .md2-button { display: inline-block; width: 48px; height: 48px; padding: 12px; outline: none; border: 0; cursor: pointer; background: transparent; box-sizing: border-box; } .md2-calendar-month-header .md2-button svg { vertical-align: top; } .md2-calendar-month-header .md2-calendar-month-year-header { width: 100%; } .md2-calendar-dates { margin: 0 auto; } .md2-calendar-dates th { width: 35px; height: 20px; font-weight: 500; line-height: 15px; opacity: 0.5; } .md2-calendar-dates td { padding: 0; } .md2-calendar-day { position: relative; display: inline-block; width: 35px; height: 35px; border-radius: 50%; text-align: center; cursor: pointer; line-height: 35px; box-sizing: border-box; } .md2-calendar-day.today { color: #106cc8; } .md2-calendar-day:hover, .md2-calendar-day.focus { background: #e0e0e0; } .md2-calendar-day.selected, .md2-calendar-day.selected:hover { color: white; background: #106cc8; } .md2-calendar-day.disabled, .md2-calendar-day.disabled:hover { color: rgba(0, 0, 0, 0.45); background: transparent; pointer-events: none; } .md2-calendar-day.prev-month, .md2-calendar-day.next-month { visibility: hidden; } md2-clock { position: absolute; top: 0; left: 100%; display: block; width: 240px; height: 240px; margin: 30px; font-size: 14px; font-weight: 400; text-align: center; background-color: #e0e0e0; border-radius: 50%; overflow: hidden; transition: 300ms; } md2-clock.active { left: 0; } .md2-clock-center { position: absolute; top: 50%; left: 50%; height: 6px; width: 6px; margin: -3px; border-radius: 50%; background-color: #106cc8; } .md2-clock-hand { position: absolute; top: 0; right: 0; bottom: 0; left: 0; width: 1px; height: 99px; margin: 0 auto; background-color: #106cc8; transform-origin: bottom; /*transition: all 100ms;*/ } .md2-clock-hand::before { content: ''; position: absolute; top: -4px; left: -4px; width: 8px; height: 8px; border-radius: 50%; background-color: #106cc8; } .md2-clock-hours, .md2-clock-minutes { position: absolute; top: 0; left: 0; width: 100%; height: 100%; opacity: 0; visibility: hidden; transition: 350ms; transform: scale(1.2); } .md2-clock-hours.active, .md2-clock-minutes.active { opacity: 1; visibility: visible; transform: scale(1); } .md2-clock-minutes { transform: scale(0.8); } .md2-clock-hour, .md2-clock-minute { position: absolute; width: 34px; height: 34px; line-height: 34px; text-align: center; border-radius: 50%; cursor: pointer; } .md2-clock-hour:hover, .md2-clock-minute:hover { background: #fafafa; } .md2-clock-hour.active, .md2-clock-minute.active { background: #65acf3; } .md2-datepicker-actions { text-align: right; } .md2-datepicker-actions .md2-button { display: inline-block; min-width: 64px; margin: 4px 8px 8px 0; padding: 0 12px; font-size: 14px; color: #106cc8; line-height: 36px; text-align: center; text-transform: uppercase; border-radius: 2px; cursor: pointer; box-sizing: border-box; transition: all 450ms cubic-bezier(0.23, 1, 0.32, 1); } .md2-datepicker-actions .md2-button:hover { background: #ebebeb; } @media (min-width: 480px) { .md2-datepicker-panel { display: flex; width: 450px; } .md2-datepicker-header { width: 150px; min-width: 150px; padding-right: 15px; white-space: normal; word-wrap: break-word; } .md2-datepicker-header-time { display: block; padding-left: 0; } } .cdk-overlay-container, .cdk-global-overlay-wrapper { pointer-events: none; top: 0; left: 0; height: 100%; width: 100%; } .cdk-overlay-container { position: fixed; z-index: 1000; } .cdk-global-overlay-wrapper { display: flex; position: absolute; z-index: 1000; } .cdk-overlay-pane { position: absolute; pointer-events: auto; box-sizing: border-box; z-index: 1000; } .cdk-overlay-backdrop { position: absolute; top: 0; bottom: 0; left: 0; right: 0; z-index: 1000; pointer-events: auto; transition: opacity 400ms cubic-bezier(0.25, 0.8, 0.25, 1); opacity: 0; } .cdk-overlay-backdrop.cdk-overlay-backdrop-showing { opacity: 0.48; } .cdk-overlay-dark-backdrop { background: rgba(0, 0, 0, 0.6); } /*# sourceMappingURL=datepicker.css.map */ "],
            host: {
                'role': 'datepicker',
                '[id]': 'id',
                '[class.md2-datepicker-disabled]': 'disabled',
                '[class.md2-datepicker-opened]': 'panelOpen',
                '[attr.tabindex]': 'disabled ? -1 : tabindex',
                '[attr.aria-label]': 'placeholder',
                '[attr.aria-required]': 'required.toString()',
                '[attr.aria-disabled]': 'disabled.toString()',
                '[attr.aria-invalid]': '_control?.invalid || "false"',
                '(keydown)': '_handleKeydown($event)',
                '(focus)': '_onFocus()',
                '(blur)': '_onBlur()'
            },
            animations: [
                fadeInContent
            ],
            encapsulation: ViewEncapsulation.None
        }),
        __param(4, Self()),
        __param(4, Optional()), 
        __metadata('design:paramtypes', [ElementRef, Overlay, Renderer, DateLocale, NgControl])
    ], Md2Datepicker);
    return Md2Datepicker;
}());
export var MD2_DATEPICKER_DIRECTIVES = [Md2Datepicker, Md2Clock];
export var Md2DatepickerModule = (function () {
    function Md2DatepickerModule() {
    }
    Md2DatepickerModule.forRoot = function () {
        return {
            ngModule: Md2DatepickerModule,
            providers: []
        };
    };
    Md2DatepickerModule = __decorate([
        NgModule({
            imports: [CommonModule, OverlayModule, PortalModule],
            exports: MD2_DATEPICKER_DIRECTIVES,
            declarations: MD2_DATEPICKER_DIRECTIVES,
            providers: [DateLocale]
        }), 
        __metadata('design:paramtypes', [])
    ], Md2DatepickerModule);
    return Md2DatepickerModule;
}());
//# sourceMappingURL=datepicker.js.map