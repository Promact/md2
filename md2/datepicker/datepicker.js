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
import { Component, ElementRef, HostListener, Input, Output, Optional, EventEmitter, Self, TemplateRef, ViewChild, ViewContainerRef, ViewEncapsulation, NgModule } from '@angular/core';
import { NgControl, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DateLocale } from './date-locale';
import { DateUtil } from './date-util';
import { Md2Clock } from './clock';
import { coerceBooleanProperty, ENTER, SPACE, TAB, ESCAPE, HOME, END, PAGE_UP, PAGE_DOWN, LEFT_ARROW, RIGHT_ARROW, UP_ARROW, DOWN_ARROW, Overlay, OverlayState, OverlayModule, TemplatePortal, PortalModule, } from '../core';
import { fadeInContent, slideCalendar } from './datepicker-animations';
/** Change event object emitted by Md2Select. */
var Md2DateChange = (function () {
    function Md2DateChange(source, value) {
        this.source = source;
        this.value = value;
    }
    return Md2DateChange;
}());
export { Md2DateChange };
var Md2Datepicker = (function () {
    function Md2Datepicker(_element, overlay, _viewContainerRef, _locale, _util, _control) {
        this._element = _element;
        this.overlay = overlay;
        this._viewContainerRef = _viewContainerRef;
        this._locale = _locale;
        this._util = _util;
        this._control = _control;
        this._value = null;
        this._selected = null;
        this._date = null;
        this._panelOpen = false;
        this._openOnFocus = false;
        this._type = 'date';
        this._mode = 'auto';
        this._container = 'inline';
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
        this._inputFocused = false;
        this._onChange = function (value) { };
        this._onTouched = function () { };
        /** Event emitted when the select has been opened. */
        this.onOpen = new EventEmitter();
        /** Event emitted when the select has been closed. */
        this.onClose = new EventEmitter();
        /** Event emitted when the selected date has been changed by the user. */
        this.change = new EventEmitter();
        this.okLabel = 'Ok';
        this.cancelLabel = 'Cancel';
        this.tabindex = 0;
        this.enableDates = [];
        this.disableDates = [];
        this.disableWeekDays = [];
        /** Position of the menu in the X axis. */
        this.positionX = 'after';
        /** Position of the menu in the Y axis. */
        this.positionY = 'below';
        this.overlapTrigger = true;
        if (this._control) {
            this._control.valueAccessor = this;
        }
        this._weekDays = this._locale.getDays();
        this.getYears();
    }
    Md2Datepicker.prototype.ngOnDestroy = function () { this.destroyPanel(); };
    Object.defineProperty(Md2Datepicker.prototype, "type", {
        get: function () { return this._type; },
        set: function (value) {
            this._type = value || 'date';
        },
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
    Object.defineProperty(Md2Datepicker.prototype, "mode", {
        get: function () { return this._mode; },
        set: function (value) {
            this._mode = value || 'auto';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Datepicker.prototype, "container", {
        get: function () { return this._container; },
        set: function (value) {
            if (this._container !== value) {
                this._container = value || 'inline';
                this.destroyPanel();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Datepicker.prototype, "value", {
        get: function () { return this._value; },
        set: function (value) {
            this._value = this.coerceDateProperty(value);
            this.date = this._value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Datepicker.prototype, "date", {
        get: function () { return this._date || this.today; },
        set: function (value) {
            if (value && this._util.isValidDate(value)) {
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
    Object.defineProperty(Md2Datepicker.prototype, "selected", {
        get: function () { return this._selected; },
        set: function (value) { this._selected = value; },
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
            if (value && this._util.isValidDate(value)) {
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
            if (value && this._util.isValidDate(value)) {
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
    Object.defineProperty(Md2Datepicker.prototype, "getDateLabel", {
        get: function () {
            return this._locale.getDateLabel(this.date);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Datepicker.prototype, "getMonthLabel", {
        get: function () {
            return this._locale.getMonthLabel(this.date.getMonth(), this.date.getFullYear());
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
        if (!this._portal) {
            this._portal = new TemplatePortal(this._templatePortal, this._viewContainerRef);
        }
        this._overlayRef.attach(this._portal);
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
    Md2Datepicker.prototype._handleWindowResize = function (event) {
        if (this.container === 'inline') {
            this.close();
        }
    };
    Md2Datepicker.prototype._focusPanel = function () {
        var el = document.querySelectorAll('.md2-datepicker-panel')[0];
        el.focus();
    };
    Md2Datepicker.prototype._focusHost = function () {
        this._element.nativeElement.querySelectorAll('input')[0].focus();
    };
    Md2Datepicker.prototype.coerceDateProperty = function (value) {
        var v = null;
        if (this._util.isValidDate(value)) {
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
        return v;
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
                            this.date = this._util.incrementYears(date, 1);
                            this._scrollToSelectedYear();
                        }
                        break;
                    case UP_ARROW:
                        if (this.date.getFullYear() > 1900) {
                            this.date = this._util.incrementYears(date, -1);
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
                        this.date = this._util.incrementDays(date, 1);
                        break;
                    case LEFT_ARROW:
                        this.date = this._util.incrementDays(date, -1);
                        break;
                    case PAGE_DOWN:
                        if (event.shiftKey) {
                            this.date = this._util.incrementYears(date, 1);
                        }
                        else {
                            this.date = this._util.incrementMonths(date, 1);
                        }
                        break;
                    case PAGE_UP:
                        if (event.shiftKey) {
                            this.date = this._util.incrementYears(date, -1);
                        }
                        else {
                            this.date = this._util.incrementMonths(date, -1);
                        }
                        break;
                    case DOWN_ARROW:
                        this.date = this._util.incrementDays(date, 7);
                        break;
                    case UP_ARROW:
                        this.date = this._util.incrementDays(date, -7);
                        break;
                    case HOME:
                        this.date = this._util.getFirstDateOfMonth(date);
                        break;
                    case END:
                        this.date = this._util.getLastDateOfMonth(date);
                        break;
                }
                if (!this._util.isSameMonthAndYear(date, this.date)) {
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
                        this.date = this._util.incrementHours(date, 1);
                        break;
                    case DOWN_ARROW:
                        this.date = this._util.incrementHours(date, -1);
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
                        this.date = this._util.incrementMinutes(date, 1);
                        break;
                    case DOWN_ARROW:
                        this.date = this._util.incrementMinutes(date, -1);
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
    Md2Datepicker.prototype._onBlur = function () {
        if (!this.panelOpen) {
            this._onTouched();
        }
    };
    Md2Datepicker.prototype._handleFocus = function (event) {
        this._inputFocused = true;
        if (!this.panelOpen && this.openOnFocus) {
            this.open();
        }
    };
    Md2Datepicker.prototype._handleBlur = function (event) {
        this._inputFocused = false;
        if (!this.panelOpen) {
            this._onTouched();
        }
        var el = event.target;
        var d = this._util.parseDate(el.value, this.format);
        if (this._util.isValidDate(d) && !this._util.isSameDay(this.value, d)) {
            this.value = d;
            this._emitChangeEvent();
        }
    };
    Md2Datepicker.prototype._clearValue = function (event) {
        event.stopPropagation();
        this.value = null;
        this._emitChangeEvent();
        this._focusHost();
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
            this.setDate(date.date);
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
        this.date = this._util.incrementMonths(this.date, noOfMonths);
        this.generateCalendar();
        if (noOfMonths > 0) {
            this.calendarState('right');
        }
        else {
            this.calendarState('left');
        }
    };
    /**
     * Check is Before month enabled or not
     * @return boolean
     */
    Md2Datepicker.prototype._isBeforeMonth = function () {
        return !this._min ? true :
            this._min && this._util.getMonthDistance(this.date, this._min) < 0;
    };
    /**
     * Check is After month enabled or not
     * @return boolean
     */
    Md2Datepicker.prototype._isAfterMonth = function () {
        return !this._max ? true :
            this._max && this._util.getMonthDistance(this.date, this._max) > 0;
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
        for (var _i = 0, _a = this.enableDates; _i < _a.length; _i++) {
            var d = _a[_i];
            if (this._util.isSameDay(date, d)) {
                return false;
            }
        }
        for (var _b = 0, _c = this.disableDates; _b < _c.length; _b++) {
            var d = _c[_b];
            if (this._util.isSameDay(date, d)) {
                return true;
            }
        }
        for (var _d = 0, _e = this.disableWeekDays; _d < _e.length; _d++) {
            var d = _e[_d];
            if (date.getDay() === d) {
                return true;
            }
        }
        return !this._util.isDateWithinRange(date, this._min, this._max);
    };
    /**
     * Generate Month Calendar
     */
    Md2Datepicker.prototype.generateCalendar = function () {
        this._dates.length = 0;
        var year = this.date.getFullYear();
        var month = this.date.getMonth();
        var firstDayOfMonth = this._util.getFirstDateOfMonth(this.date);
        var calMonth = this._prevMonth;
        var date = this._util.getFirstDateOfWeek(firstDayOfMonth, this._locale.firstDayOfWeek);
        do {
            var week = [];
            for (var i = 0; i < 7; i++) {
                if (date.getDate() === 1) {
                    if (calMonth === this._prevMonth) {
                        calMonth = this._currMonth;
                    }
                    else {
                        calMonth = this._nextMonth;
                    }
                }
                week.push({
                    date: date,
                    index: date.getDate(),
                    calMonth: calMonth,
                    today: this._util.isSameDay(this.today, date),
                    disabled: this._isDisabledDate(date)
                });
                date = new Date(date.getTime());
                date.setDate(date.getDate() + 1);
            }
            this._dates.push(week);
        } while ((date.getMonth() <= month) && (date.getFullYear() === year));
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
    Md2Datepicker.prototype.setDisabledState = function (isDisabled) {
        this.disabled = isDisabled;
    };
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
            if (this.container === 'inline') {
                var _a = this.positionX === 'before' ? ['end', 'start'] : ['start', 'end'], posX = _a[0], fallbackX = _a[1];
                var _b = this.positionY === 'above' ? ['bottom', 'top'] : ['top', 'bottom'], overlayY = _b[0], fallbackOverlayY = _b[1];
                var originY = overlayY;
                var fallbackOriginY = fallbackOverlayY;
                if (!this.overlapTrigger) {
                    originY = overlayY === 'top' ? 'bottom' : 'top';
                    fallbackOriginY = fallbackOverlayY === 'top' ? 'bottom' : 'top';
                }
                config.positionStrategy = this.overlay.position().connectedTo(this._element, { originX: posX, originY: originY }, { overlayX: posX, overlayY: overlayY })
                    .withFallbackPosition({ originX: fallbackX, originY: originY }, { overlayX: fallbackX, overlayY: overlayY })
                    .withFallbackPosition({ originX: posX, originY: fallbackOriginY }, { overlayX: posX, overlayY: fallbackOverlayY })
                    .withFallbackPosition({ originX: fallbackX, originY: fallbackOriginY }, { overlayX: fallbackX, overlayY: fallbackOverlayY });
                config.hasBackdrop = true;
                config.backdropClass = 'cdk-overlay-transparent-backdrop';
            }
            else {
                config.positionStrategy = this.overlay.position()
                    .global()
                    .centerHorizontally()
                    .centerVertically();
                config.hasBackdrop = true;
            }
            this._overlayRef = this.overlay.create(config);
        }
    };
    Md2Datepicker.prototype._cleanUpSubscriptions = function () {
        if (this._backdropSubscription) {
            this._backdropSubscription.unsubscribe();
        }
    };
    Md2Datepicker.prototype.calendarState = function (direction) {
        var _this = this;
        this._calendarState = direction;
        setTimeout(function () { return _this._calendarState = ''; }, 180);
    };
    return Md2Datepicker;
}());
__decorate([
    ViewChild('portal'),
    __metadata("design:type", TemplateRef)
], Md2Datepicker.prototype, "_templatePortal", void 0);
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
    Input(),
    __metadata("design:type", String)
], Md2Datepicker.prototype, "placeholder", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], Md2Datepicker.prototype, "okLabel", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], Md2Datepicker.prototype, "cancelLabel", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number)
], Md2Datepicker.prototype, "tabindex", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array)
], Md2Datepicker.prototype, "enableDates", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array)
], Md2Datepicker.prototype, "disableDates", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array)
], Md2Datepicker.prototype, "disableWeekDays", void 0);
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
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [String])
], Md2Datepicker.prototype, "mode", null);
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [String])
], Md2Datepicker.prototype, "container", null);
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Date])
], Md2Datepicker.prototype, "value", null);
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Date])
], Md2Datepicker.prototype, "selected", null);
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
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], Md2Datepicker.prototype, "openOnFocus", null);
__decorate([
    Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], Md2Datepicker.prototype, "isOpen", null);
__decorate([
    HostListener('click', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [MouseEvent]),
    __metadata("design:returntype", void 0)
], Md2Datepicker.prototype, "_handleClick", null);
Md2Datepicker = __decorate([
    Component({selector: 'md2-datepicker',
        template: "<div class=\"md2-datepicker-trigger\"><button type=\"button\" class=\"md2-datepicker-button\" tabindex=\"-1\" (click)=\"toggle()\"><svg *ngIf=\"type==='date'\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><path d=\"M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z\"></path></svg> <svg *ngIf=\"type==='time'\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><path d=\"M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22C6.47,22 2,17.5 2,12A10,10 0 0,1 12,2M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z\"></path></svg> <svg *ngIf=\"type==='datetime'\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><path d=\"M15,13H16.5V15.82L18.94,17.23L18.19,18.53L15,16.69V13M19,8H5V19H9.67C9.24,18.09 9,17.07 9,16A7,7 0 0,1 16,9C17.07,9 18.09,9.24 19,9.67V8M5,21C3.89,21 3,20.1 3,19V5C3,3.89 3.89,3 5,3H6V1H8V3H16V1H18V3H19A2,2 0 0,1 21,5V11.1C22.24,12.36 23,14.09 23,16A7,7 0 0,1 16,23C14.09,23 12.36,22.24 11.1,21H5M16,11.15A4.85,4.85 0 0,0 11.15,16C11.15,18.68 13.32,20.85 16,20.85A4.85,4.85 0 0,0 20.85,16C20.85,13.32 18.68,11.15 16,11.15Z\"></path></svg></button><div class=\"md2-datepicker-input\" [class.md2-datepicker-input-focused]=\"_inputFocused\"><span class=\"md2-datepicker-placeholder\" [class.md2-floating-placeholder]=\"value || _inputFocused\">{{ placeholder }}</span> <input type=\"text\" class=\"md2-datepicker-value\" [tabindex]=\"tabindex\" [disabled]=\"disabled\" [value]=\"value | date:format\" autocomplete=\"off\" (change)=\"$event.stopPropagation()\" (focus)=\"_handleFocus($event)\" (blur)=\"_handleBlur($event)\" (keydown)=\"_handleKeydown($event)\"> <span *ngIf=\"!value || required || disabled\" class=\"md2-datepicker-arrow\"></span> <span *ngIf=\"value && !required && !disabled\" class=\"md2-datepicker-clear\" (click)=\"_clearValue($event)\"><svg viewBox=\"0 0 24 24\" width=\"20\" height=\"20\"><path d=\"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z\"/></svg></span></div></div><ng-template #portal><div class=\"md2-datepicker-panel\" [@fadeInContent]=\"'showing'\" (@fadeInContent.done)=\"_onPanelDone()\" (keydown)=\"_handleKeydown($event)\" [style.transformOrigin]=\"_transformOrigin\" [class.md2-datepicker-panel-done-animating]=\"_panelDoneAnimating\" tabindex=\"0\" [attr.container]=\"container\" [attr.mode]=\"mode\"><div class=\"md2-datepicker-header\"><div class=\"md2-datepicker-header-year\" *ngIf=\"type!=='time'\" [class.active]=\"_isYearsVisible\" (click)=\"_showYear()\">{{ date | date: 'y' }}</div><div class=\"md2-datepicker-header-date-time\"><span class=\"md2-datepicker-header-date\" *ngIf=\"type!=='time'\" [class.active]=\"_isCalendarVisible && !_isYearsVisible\" (click)=\"_showCalendar()\">{{ getDateLabel }} </span><span class=\"md2-datepicker-header-time\" *ngIf=\"type!=='date'\" [class.active]=\"!_isCalendarVisible\"><span class=\"md2-datepicker-header-hour\" [class.active]=\"_clockView === 'hour'\" (click)=\"_toggleHours('hour')\">{{ date.getHours() }}</span>:<span class=\"md2-datepicker-header-minute\" [class.active]=\"_clockView === 'minute'\" (click)=\"_toggleHours('minute')\">{{ date.getMinutes() }}</span></span></div></div><div class=\"md2-datepicker-content\"><div class=\"md2-datepicker-calendar\" [class.active]=\"_isCalendarVisible\"><div class=\"md2-calendar-years\" [class.active]=\"_isYearsVisible\"><div class=\"md2-calendar-years-content\"><div *ngFor=\"let y of _years\" class=\"md2-calendar-year\" [class.selected]=\"y === date.getFullYear()\" (click)=\"_setYear(y)\">{{y}}</div></div></div><div class=\"md2-calendar-month\" [class.active]=\"!_isYearsVisible\"><div class=\"md2-calendar-header\"><div class=\"md2-button\" [class.disabled]=\"!_isBeforeMonth()\" (click)=\"_isBeforeMonth() && _updateMonth(-1)\"><svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><path d=\"M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z\"></path></svg></div><div class=\"md2-calendar-month-year\" [@slideCalendar]=\"_calendarState\">{{ getMonthLabel }}</div><div class=\"md2-button\" [class.disabled]=\"!_isAfterMonth()\" (click)=\"_isAfterMonth() && _updateMonth(1)\"><svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><path d=\"M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z\"></path></svg></div></div><table class=\"md2-calendar-dates\"><thead><tr><th *ngFor=\"let day of _weekDays\">{{day.xshort}}</th></tr></thead><tbody [@slideCalendar]=\"_calendarState\"><tr *ngFor=\"let w of _dates\"><td *ngFor=\"let d of w\"><div class=\"md2-calendar-day\" [class.today]=\"d.today\" [class.focus]=\"_util.isSameDay(date, d.date)\" [class.selected]=\"_util.isSameDay(selected, d.date)\" [class.disabled]=\"d.disabled\" [class.prev-month]=\"d.calMonth===_prevMonth\" [class.curr-month]=\"d.calMonth===_currMonth\" [class.next-month]=\"d.calMonth===_nextMonth\" (click)=\"_onClickDate($event,d)\">{{d.index}}</div></td></tr></tbody></table></div></div><md2-clock [class.active]=\"!_isCalendarVisible\" [time]=\"time\" [view]=\"_clockView\" (timeChange)=\"_onTimeChange($event)\" (onHourChange)=\"_onHourChange($event)\" (onMinuteChange)=\"_onMinuteChange($event)\"></md2-clock><div class=\"md2-datepicker-actions\"><div class=\"md2-button\" (click)=\"close()\">{{ cancelLabel }}</div><div class=\"md2-button\" (click)=\"_onClickOk()\">{{ okLabel }}</div></div></div></div></ng-template>",
        styles: ["md2-datepicker{position:relative;display:inline-block;min-width:175px;outline:0;backface-visibility:hidden}md2-datepicker.md2-datepicker-disabled{pointer-events:none;cursor:default}.md2-datepicker-trigger{display:block;padding:18px 0 4px 46px;white-space:nowrap}.md2-datepicker-button{position:absolute;top:13px;left:0;display:inline-block;height:40px;width:40px;padding:8px;line-height:24px;color:rgba(0,0,0,.54);fill:currentColor;border:0;border-radius:50%;outline:0;user-select:none;cursor:pointer;box-sizing:border-box;background:0 0;vertical-align:middle;align-items:center;text-align:center}.md2-datepicker-button:focus{background-color:rgba(158,158,158,.2)}.md2-datepicker-disabled .md2-datepicker-button{color:rgba(0,0,0,.38)}.md2-datepicker-input{color:rgba(0,0,0,.38);border-bottom:1px solid rgba(0,0,0,.12);display:flex;justify-content:space-between;align-items:center;height:30px;min-width:168px;line-height:22px;position:relative;padding-right:20px;box-sizing:border-box}[aria-disabled=true] .md2-datepicker-input{background-image:linear-gradient(to right,rgba(0,0,0,.26) 0,rgba(0,0,0,.26) 33%,transparent 0);background-size:4px 1px;background-repeat:repeat-x;border-color:transparent;background-position:0 bottom;cursor:default;user-select:none}.md2-datepicker-input.md2-datepicker-input-focused{color:#106cc8;border-color:#106cc8}md2-datepicker.ng-invalid.ng-touched:not(.md2-datepicker-disabled) .md2-datepicker-input{color:#f44336;border-color:#f44336}.md2-datepicker-placeholder{position:absolute;right:18px;bottom:100%;left:0;padding:0 2px;transform:translate3d(0,26px,0) scale(1);transform-origin:left top;white-space:nowrap;overflow-x:hidden;text-overflow:ellipsis;transition:all 150ms cubic-bezier(.25,.8,.25,1)}.md2-datepicker-placeholder.md2-floating-placeholder{left:-2px;text-align:left;transform:translate3d(0,6px,0) scale(.75)}[dir=rtl] .md2-datepicker-placeholder{right:0;left:18px;transform-origin:right top}[dir=rtl] .md2-datepicker-placeholder.md2-floating-placeholder{right:-2px;text-align:right}[aria-required=true] .md2-datepicker-placeholder::after{content:'*'}.md2-datepicker-value{position:relative;width:100%;white-space:nowrap;overflow-x:hidden;text-overflow:ellipsis;color:rgba(0,0,0,.87);border:0;outline:0;background:0 0}.md2-datepicker-disabled .md2-datepicker-value{color:rgba(0,0,0,.38)}[dir=rtl] .md2-datepicker-value{left:auto;right:0}.md2-datepicker-arrow{position:absolute;right:0;width:0;height:0;border-left:5px solid transparent;border-right:5px solid transparent;border-top:5px solid;margin:0 4px;color:rgba(0,0,0,.38)}.md2-datepicker-input-focused .md2-datepicker-arrow{color:#106cc8}md2-datepicker.ng-invalid.ng-touched:not(.md2-datepicker-disabled) .md2-datepicker-arrow{color:#f44336}.md2-datepicker-clear{position:absolute;right:0;height:20px;color:rgba(0,0,0,.54);cursor:pointer}.md2-datepicker-clear svg{fill:currentColor}.md2-datepicker-panel{width:276px;border-radius:3px;color:rgba(0,0,0,.87);background-color:#fff;overflow:hidden;box-shadow:0 5px 5px -3px rgba(0,0,0,.2),0 8px 10px 1px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12);outline:0;user-select:none}.md2-datepicker-panel[container=dialog]{box-shadow:0 11px 15px -7px rgba(0,0,0,.2),0 24px 38px 3px rgba(0,0,0,.14),0 9px 46px 8px rgba(0,0,0,.12)}.md2-datepicker-panel[mode=landscape]{display:flex;width:426px}.md2-datepicker-header{padding:16px;color:#fff;font-weight:500;white-space:nowrap;background:#106cc8;box-sizing:border-box}[mode=landscape] .md2-datepicker-header{width:150px;min-width:150px;padding-right:15px;white-space:normal;word-wrap:break-word}.md2-datepicker-header-year{font-size:16px;opacity:.7;cursor:pointer}.md2-datepicker-header-year.active{opacity:1;pointer-events:none}.md2-datepicker-header-date-time{font-size:32px}.md2-datepicker-header-date{opacity:.7;cursor:pointer}.md2-datepicker-header-date.active{opacity:1;pointer-events:none}.md2-datepicker-header-time{opacity:.7;display:inline-block;padding-left:8px;cursor:pointer}.md2-datepicker-header-time.active{opacity:1;cursor:default}.md2-datepicker-header-time.active .md2-datepicker-header-hour,.md2-datepicker-header-time.active .md2-datepicker-header-minute{opacity:.7;cursor:pointer}.md2-datepicker-header-time.active .md2-datepicker-header-hour.active,.md2-datepicker-header-time.active .md2-datepicker-header-minute.active{opacity:1;pointer-events:none}[mode=landscape] .md2-datepicker-header-time{display:block;padding-left:0}.md2-datepicker-content{position:relative;width:100%;padding-top:280px;overflow:hidden}.md2-datepicker-calendar{position:absolute;top:0;right:100%;display:block;width:100%;height:280px;transition:.3s}.md2-datepicker-calendar.active{right:0}.md2-calendar-years{position:absolute;top:10px;right:100%;bottom:10px;display:block;width:100%;line-height:40px;background:#fff;overflow-x:hidden;overflow-y:auto;transition:.3s}.md2-calendar-years.active{right:0}.md2-calendar-years .md2-calendar-years-content{display:flex;flex-direction:column;justify-content:center;min-height:100%}.md2-calendar-year{position:relative;display:block;margin:0 auto;padding:0;font-size:17px;font-weight:400;text-align:center;cursor:pointer}.md2-calendar-year.selected{color:#106cc8;font-size:26px;font-weight:500}.md2-calendar-month{position:absolute;left:100%;display:block;width:100%;font-size:12px;font-weight:400;text-align:center;transition:.3s}.md2-calendar-month.active{left:0}.md2-calendar-header{display:flex;justify-content:space-between;font-size:14px;font-weight:700;text-align:center;line-height:48px}.md2-calendar-header .md2-calendar-month-year-header{width:100%}.md2-calendar-header .md2-button{display:inline-block;width:48px;height:48px;padding:12px;outline:0;border:0;cursor:pointer;background:0 0;box-sizing:border-box}.md2-calendar-header .md2-button svg{vertical-align:top}.md2-calendar-dates{margin:0 8px}.md2-calendar-dates th{width:35px;height:16px;font-weight:500;line-height:10px;opacity:.5}.md2-calendar-dates td{padding:0}.md2-calendar-day{position:relative;display:inline-block;width:35px;height:35px;border-radius:50%;text-align:center;cursor:pointer;line-height:35px;box-sizing:border-box}.md2-calendar-day.today{color:#106cc8}.md2-calendar-day.focus,.md2-calendar-day:hover{background:#e0e0e0}.md2-calendar-day.selected,.md2-calendar-day.selected:hover{color:#fff;background:#106cc8}.md2-calendar-day.disabled,.md2-calendar-day.disabled:hover{color:rgba(0,0,0,.43);background:0 0;pointer-events:none}.md2-calendar-day.next-month,.md2-calendar-day.prev-month{visibility:hidden}md2-clock{position:absolute;top:0;left:100%;display:block;width:240px;height:240px;margin:30px;font-size:14px;font-weight:400;text-align:center;background-color:#e0e0e0;border-radius:50%;overflow:hidden;transition:.3s}md2-clock.active{left:0}.md2-clock-center{position:absolute;top:50%;left:50%;height:6px;width:6px;margin:-3px;border-radius:50%;background-color:#106cc8}.md2-clock-hand{position:absolute;top:0;right:0;bottom:0;left:0;width:1px;height:99px;margin:0 auto;background-color:#106cc8;transform-origin:bottom}.md2-clock-hand::before{content:'';position:absolute;top:-4px;left:-4px;width:8px;height:8px;border-radius:50%;background-color:#106cc8}.md2-clock-hours,.md2-clock-minutes{position:absolute;top:0;left:0;width:100%;height:100%;opacity:0;visibility:hidden;transition:350ms;transform:scale(1.2)}.md2-clock-hours.active,.md2-clock-minutes.active{opacity:1;visibility:visible;transform:scale(1)}.md2-clock-minutes{transform:scale(.8)}.md2-clock-hour,.md2-clock-minute{position:absolute;width:34px;height:34px;line-height:34px;text-align:center;border-radius:50%;cursor:pointer}.md2-clock-hour:hover,.md2-clock-minute:hover{background:#fafafa}.md2-clock-hour.active,.md2-clock-minute.active{background:#65acf3}.md2-datepicker-actions{text-align:right}.md2-datepicker-actions .md2-button{display:inline-block;min-width:64px;margin:4px 8px 8px 0;padding:0 12px;font-size:14px;color:#106cc8;line-height:36px;text-align:center;text-transform:uppercase;border-radius:2px;cursor:pointer;box-sizing:border-box;transition:all 450ms cubic-bezier(.23,1,.32,1)}.md2-datepicker-actions .md2-button:hover{background:#ebebeb}@media (min-width:480px){.md2-datepicker-panel[mode=auto]{display:flex;width:426px}[mode=auto] .md2-datepicker-header{width:150px;min-width:150px;padding-right:15px;white-space:normal;word-wrap:break-word}[mode=auto] .md2-datepicker-header-time{display:block;padding-left:0}}.cdk-global-overlay-wrapper,.cdk-overlay-container{pointer-events:none;top:0;left:0;height:100%;width:100%}.cdk-overlay-container{position:fixed;z-index:1000}.cdk-global-overlay-wrapper{display:flex;position:absolute;z-index:1000}.cdk-overlay-pane{position:absolute;pointer-events:auto;box-sizing:border-box;z-index:1000}.cdk-overlay-backdrop{position:absolute;top:0;bottom:0;left:0;right:0;z-index:1000;pointer-events:auto;transition:opacity .4s cubic-bezier(.25,.8,.25,1);opacity:0}.cdk-overlay-backdrop.cdk-overlay-backdrop-showing{opacity:.48}.cdk-overlay-dark-backdrop{background:rgba(0,0,0,.6)} /*# sourceMappingURL=datepicker.css.map */ "],
        host: {
            'role': 'datepicker',
            '[class.md2-datepicker-disabled]': 'disabled',
            '[class.md2-datepicker-opened]': 'panelOpen',
            '[attr.aria-label]': 'placeholder',
            '[attr.aria-required]': 'required.toString()',
            '[attr.aria-disabled]': 'disabled.toString()',
            '[attr.aria-invalid]': '_control?.invalid || "false"',
            '(window:resize)': '_handleWindowResize($event)'
        },
        animations: [
            fadeInContent,
            slideCalendar
        ],
        encapsulation: ViewEncapsulation.None
    }),
    __param(5, Self()), __param(5, Optional()),
    __metadata("design:paramtypes", [ElementRef, Overlay,
        ViewContainerRef, DateLocale,
        DateUtil, NgControl])
], Md2Datepicker);
export { Md2Datepicker };
export var MD2_DATEPICKER_DIRECTIVES = [Md2Datepicker, Md2Clock];
var Md2DatepickerModule = Md2DatepickerModule_1 = (function () {
    function Md2DatepickerModule() {
    }
    Md2DatepickerModule.forRoot = function () {
        return {
            ngModule: Md2DatepickerModule_1,
            providers: []
        };
    };
    return Md2DatepickerModule;
}());
Md2DatepickerModule = Md2DatepickerModule_1 = __decorate([
    NgModule({
        imports: [CommonModule, FormsModule, OverlayModule, PortalModule],
        exports: MD2_DATEPICKER_DIRECTIVES,
        declarations: MD2_DATEPICKER_DIRECTIVES,
        providers: [DateLocale, DateUtil]
    })
], Md2DatepickerModule);
export { Md2DatepickerModule };
var Md2DatepickerModule_1;
//# sourceMappingURL=datepicker.js.map