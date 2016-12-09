var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ElementRef, EventEmitter, forwardRef, HostListener, Input, Output, ViewEncapsulation, NgModule } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { coerceBooleanProperty, KeyCodes } from '../core/core';
export var Option = (function () {
    function Option(source, textKey, valueKey) {
        if (typeof source === 'string') {
            this.text = this.value = source;
        }
        if (typeof source === 'object') {
            this.text = source[textKey];
            this.value = valueKey ? source[valueKey] : source;
        }
    }
    return Option;
}());
var noop = function () { };
var nextId = 0;
export var MD2_MULTISELECT_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return Md2Multiselect; }),
    multi: true
};
export var Md2Multiselect = (function () {
    function Md2Multiselect(element) {
        this.element = element;
        this.change = new EventEmitter();
        this._value = '';
        this._onTouchedCallback = noop;
        this._onChangeCallback = noop;
        this._options = [];
        this._list = [];
        this._items = [];
        this._focusedOption = 0;
        this.isFocused = false;
        this.id = 'md2-multiselect-' + (++nextId);
        this.tabindex = 0;
        this.placeholder = '';
        this.textKey = 'text';
        this.valueKey = null;
    }
    Md2Multiselect.prototype.ngAfterContentInit = function () { this._isInitialized = true; };
    Object.defineProperty(Md2Multiselect.prototype, "readonly", {
        get: function () { return this._readonly; },
        set: function (value) { this._readonly = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Multiselect.prototype, "required", {
        get: function () { return this._required; },
        set: function (value) { this._required = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Multiselect.prototype, "disabled", {
        get: function () { return this._disabled; },
        set: function (value) { this._disabled = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Multiselect.prototype, "options", {
        set: function (value) { this._options = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Multiselect.prototype, "value", {
        get: function () { return this._value; },
        set: function (value) { this.setValue(value); },
        enumerable: true,
        configurable: true
    });
    /**
     * set value
     * @param value
     */
    Md2Multiselect.prototype.setValue = function (value) {
        var _this = this;
        if (value !== this._value) {
            this._value = value;
            this._items = [];
            if (value && value.length && typeof value === 'object' && Array.isArray(value)) {
                var _loop_1 = function(i) {
                    var selItm = this_1._options.find(function (itm) { return _this.equals(_this.valueKey ? itm[_this.valueKey] : itm, value[i]); });
                    if (selItm) {
                        this_1._items.push(new Option(selItm, this_1.textKey, this_1.valueKey));
                    }
                };
                var this_1 = this;
                for (var i = 0; i < value.length; i++) {
                    _loop_1(i);
                }
            }
            if (this._isInitialized) {
                this._onChangeCallback(value);
                this.change.emit(this._value);
            }
        }
    };
    /**
     * Compare two vars or objects
     * @param o1 compare first object
     * @param o2 compare second object
     * @return boolean comparation result
     */
    Md2Multiselect.prototype.equals = function (o1, o2) {
        if (o1 === o2) {
            return true;
        }
        if (o1 === null || o2 === null) {
            return false;
        }
        if (o1 !== o1 && o2 !== o2) {
            return true;
        }
        var t1 = typeof o1, t2 = typeof o2, key, keySet;
        if (t1 === t2 && t1 === 'object') {
            keySet = Object.create(null);
            for (key in o1) {
                if (!this.equals(o1[key], o2[key])) {
                    return false;
                }
                keySet[key] = true;
            }
            for (key in o2) {
                if (!(key in keySet) && key.charAt(0) !== '$' && o2[key]) {
                    return false;
                }
            }
            return true;
        }
        return false;
    };
    Object.defineProperty(Md2Multiselect.prototype, "isMenuVisible", {
        get: function () {
            return (this.isFocused && this._list && this._list.length) && !this.readonly ? true : false;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * to update scroll of options
     */
    Md2Multiselect.prototype.updateScroll = function () {
        if (this._focusedOption < 0) {
            return;
        }
        var menuContainer = this.element.nativeElement.querySelector('.md2-multiselect-menu');
        if (!menuContainer) {
            return;
        }
        var choices = menuContainer.querySelectorAll('.md2-option');
        if (choices.length < 1) {
            return;
        }
        var highlighted = choices[this._focusedOption];
        if (!highlighted) {
            return;
        }
        var top = highlighted.offsetTop + highlighted.clientHeight - menuContainer.scrollTop;
        var height = menuContainer.offsetHeight;
        if (top > height) {
            menuContainer.scrollTop += top - height;
        }
        else if (top < highlighted.clientHeight) {
            menuContainer.scrollTop -= highlighted.clientHeight - top;
        }
    };
    Md2Multiselect.prototype._handleClick = function (event) {
        if (this.disabled) {
            event.stopPropagation();
            event.preventDefault();
            return;
        }
        this.updateOptions();
        this.element.nativeElement.focus();
    };
    Md2Multiselect.prototype._handleKeydown = function (event) {
        if (this.disabled) {
            return;
        }
        if (this.isMenuVisible) {
            event.preventDefault();
            event.stopPropagation();
            switch (event.keyCode) {
                case KeyCodes.TAB:
                case KeyCodes.ESCAPE:
                    this._onBlur();
                    break;
                case KeyCodes.ENTER:
                case KeyCodes.SPACE:
                    this._handleOptionClick(event, this._focusedOption);
                    break;
                case KeyCodes.DOWN_ARROW:
                    this._focusedOption = (this._focusedOption === this._list.length - 1) ? 0 : Math.min(this._focusedOption + 1, this._list.length - 1);
                    this.updateScroll();
                    break;
                case KeyCodes.UP_ARROW:
                    this._focusedOption = (this._focusedOption === 0) ? this._list.length - 1 : Math.max(0, this._focusedOption - 1);
                    this.updateScroll();
                    break;
            }
        }
        else {
            switch (event.keyCode) {
                case KeyCodes.ENTER:
                case KeyCodes.SPACE:
                case KeyCodes.DOWN_ARROW:
                case KeyCodes.UP_ARROW:
                    event.preventDefault();
                    event.stopPropagation();
                    this.updateOptions();
                    break;
            }
        }
    };
    /**
     * on focus current component
     */
    Md2Multiselect.prototype.onFocus = function () {
        this.isFocused = true;
        this._focusedOption = 0;
    };
    Md2Multiselect.prototype._onBlur = function () { this.isFocused = false; };
    /**
     * to check current option is active or not
     * @param index
     * @return boolean the item is active or not
     */
    Md2Multiselect.prototype._isActive = function (index) {
        return this._items.map(function (i) { return i.text; }).indexOf(this._list[index].text) < 0 ? false : true;
    };
    /**
     * to toggle option to select/deselect option
     * @param event
     * @param index
     */
    Md2Multiselect.prototype._handleOptionClick = function (event, index) {
        var _this = this;
        event.preventDefault();
        event.stopPropagation();
        var ind = this._items.map(function (i) { return i.text; }).indexOf(this._list[index].text);
        if (ind < 0) {
            this._items.push(this._list[index]);
            this._items = this._items.sort(function (a, b) { return _this._list.findIndex(function (i) { return i.text === a.text; }) - _this._list.findIndex(function (i) { return i.text === b.text; }); });
        }
        else {
            this._items.splice(ind, 1);
        }
        this._value = new Array();
        for (var i = 0; i < this._items.length; i++) {
            this._value.push(this._items[i].value);
        }
        this._onChangeCallback(this._value);
        this.change.emit(this._value);
    };
    /**
     * update options
     */
    Md2Multiselect.prototype.updateOptions = function () {
        var _this = this;
        this._list = this._options.map(function (item) { return new Option(item, _this.textKey, _this.valueKey); });
        if (this._list.length > 0) {
            this.onFocus();
        }
    };
    /**
     * Implemented as part of ControlValueAccessor.
     * TODO: internal
     */
    Md2Multiselect.prototype.writeValue = function (value) {
        var _this = this;
        if (value !== this._value) {
            this._value = value;
            this._items = [];
            if (value && value.length && typeof value === 'object' && Array.isArray(value)) {
                var _loop_2 = function(i) {
                    var selItm = this_2._options.find(function (itm) { return _this.equals(_this.valueKey ? itm[_this.valueKey] : itm, value[i]); });
                    if (selItm) {
                        this_2._items.push(new Option(selItm, this_2.textKey, this_2.valueKey));
                    }
                };
                var this_2 = this;
                for (var i = 0; i < value.length; i++) {
                    _loop_2(i);
                }
            }
        }
    };
    /**
     * Implemented as part of ControlValueAccessor.
     * TODO: internal
     */
    Md2Multiselect.prototype.registerOnChange = function (fn) { this._onChangeCallback = fn; };
    /**
     * Implemented as part of ControlValueAccessor.
     * TODO: internal
     */
    Md2Multiselect.prototype.registerOnTouched = function (fn) { this._onTouchedCallback = fn; };
    __decorate([
        Output(), 
        __metadata('design:type', EventEmitter)
    ], Md2Multiselect.prototype, "change", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', String)
    ], Md2Multiselect.prototype, "id", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Number)
    ], Md2Multiselect.prototype, "tabindex", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', String)
    ], Md2Multiselect.prototype, "placeholder", void 0);
    __decorate([
        Input('item-text'), 
        __metadata('design:type', String)
    ], Md2Multiselect.prototype, "textKey", void 0);
    __decorate([
        Input('item-value'), 
        __metadata('design:type', String)
    ], Md2Multiselect.prototype, "valueKey", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Boolean)
    ], Md2Multiselect.prototype, "readonly", null);
    __decorate([
        Input(), 
        __metadata('design:type', Boolean)
    ], Md2Multiselect.prototype, "required", null);
    __decorate([
        Input(), 
        __metadata('design:type', Boolean)
    ], Md2Multiselect.prototype, "disabled", null);
    __decorate([
        Input('items'), 
        __metadata('design:type', Array), 
        __metadata('design:paramtypes', [Array])
    ], Md2Multiselect.prototype, "options", null);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], Md2Multiselect.prototype, "value", null);
    __decorate([
        HostListener('click', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [MouseEvent]), 
        __metadata('design:returntype', void 0)
    ], Md2Multiselect.prototype, "_handleClick", null);
    __decorate([
        HostListener('keydown', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [KeyboardEvent]), 
        __metadata('design:returntype', void 0)
    ], Md2Multiselect.prototype, "_handleKeydown", null);
    __decorate([
        HostListener('blur'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], Md2Multiselect.prototype, "_onBlur", null);
    Md2Multiselect = __decorate([
        Component({selector: 'md2-multiselect',
            template: "\n    <div class=\"md2-multiselect-container\">\n      <span class=\"md2-multiselect-placeholder\" [class.has-value]=\"_items.length\">\n        {{placeholder}}\n        <span class=\"md2-placeholder-required\" *ngIf=\"required\">*</span>\n      </span>\n      <div class=\"md2-multiselect-value\">\n        <div *ngFor=\"let v of _items; let last = last\" class=\"md2-multiselect-value-item\">\n          <span class=\"md2-multiselect-text\">{{v.text}}</span><span *ngIf=\"!last\">,&nbsp;</span>\n        </div>\n      </div>\n      <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\">\n        <path d=\"M7 10l5 5 5-5z\" />\n      </svg>\n    </div>\n    <ul *ngIf=\"isMenuVisible\" class=\"md2-multiselect-menu\">\n      <li class=\"md2-option\" *ngFor=\"let l of _list; let i = index;\" [class.active]=\"_isActive(i)\" [class.focus]=\"focusedOption === i\" (click)=\"_handleOptionClick($event, i)\">\n        <div class=\"md2-option-icon\"></div>\n        <div class=\"md2-option-text\" [innerHtml]=\"l.text\"></div>\n      </li>\n    </ul>\n  ",
            styles: ["md2-multiselect { position: relative; display: block; margin: 18px 0; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; -webkit-backface-visibility: hidden; backface-visibility: hidden; } md2-multiselect:focus { outline: none; } md2-multiselect.md2-multiselect-disabled { pointer-events: none; cursor: default; } md2-multiselect .md2-multiselect-container { position: relative; width: 100%; min-width: 64px; min-height: 30px; align-items: center; padding: 2px 2px 1px; border-bottom: 1px solid rgba(0, 0, 0, 0.12); box-sizing: border-box; cursor: pointer; } md2-multiselect:focus .md2-multiselect-container { padding-bottom: 0; border-bottom: 2px solid #106cc8; } md2-multiselect.md2-multiselect-disabled .md2-multiselect-container { color: rgba(0, 0, 0, 0.38); border-color: transparent; background-image: linear-gradient(to right, rgba(0, 0, 0, 0.38) 0%, rgba(0, 0, 0, 0.38) 33%, transparent 0%); background-position: bottom -1px left 0; background-size: 4px 1px; background-repeat: repeat-x; cursor: default; } md2-multiselect.md2-multiselect-disabled:focus .md2-multiselect-container { padding-bottom: 1px; border-bottom: 1px solid transparent; } md2-multiselect .md2-multiselect-placeholder { position: absolute; right: 26px; bottom: 100%; left: 0; color: rgba(0, 0, 0, 0.38); max-width: 100%; padding-left: 3px; padding-right: 0; line-height: 1.4; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; pointer-events: none; z-index: 1; transform: translate3d(0, 26px, 0) scale(1); transition: transform 400ms cubic-bezier(0.25, 0.8, 0.25, 1); transform-origin: left top; } md2-multiselect:focus .md2-multiselect-placeholder { color: #2196f3; } md2-multiselect:focus .md2-multiselect-placeholder .md2-placeholder-required { color: #f00; } md2-multiselect:focus .md2-multiselect-placeholder, md2-multiselect .md2-multiselect-placeholder.has-value { transform: translate3d(0, 6px, 0) scale(0.75); } md2-multiselect.md2-multiselect-disabled:focus .md2-multiselect-placeholder, md2-multiselect.md2-multiselect-disabled:focus .md2-multiselect-placeholder .md2-placeholder-required { color: rgba(0, 0, 0, 0.38); } md2-multiselect .md2-multiselect-container .md2-multiselect-value { display: block; max-height: 80px; padding-right: 26px; overflow-y: auto; font-size: 15px; line-height: 26px; } md2-multiselect .md2-multiselect-container .md2-multiselect-value-item { word-wrap: break-word; } md2-multiselect .md2-multiselect-container svg { position: absolute; right: 0; top: 0; display: block; height: 100%; background: #fff; fill: currentColor; color: rgba(0, 0, 0, 0.54); } md2-multiselect .md2-multiselect-menu { position: absolute; left: 0; top: 0; display: block; z-index: 10; width: 100%; margin: 0; padding: 8px 0; box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 2px 1px -1px rgba(0, 0, 0, 0.12); max-height: 256px; min-height: 48px; overflow-y: auto; transform: scale(1); background: #fff; } md2-multiselect .md2-multiselect-menu .md2-option { position: relative; display: block; cursor: pointer; width: auto; transition: background 150ms linear; padding: 0 16px 0 40px; height: 48px; line-height: 48px; } md2-multiselect .md2-multiselect-menu .md2-option.active { color: #106cc8; } md2-multiselect .md2-multiselect-menu .md2-option:hover, .md2-multiselect .md2-multiselect-menu .md2-option.focus { background: #eeeeee; } md2-multiselect .md2-multiselect-menu .md2-option .md2-option-text { width: auto; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; font-size: 16px; } md2-multiselect .md2-option .md2-option-icon { position: absolute; top: 14px; left: 12px; width: 16px; height: 16px; border: 2px solid rgba(0, 0, 0, 0.54); border-radius: 2px; box-sizing: border-box; transition: 240ms; } md2-multiselect .md2-option.active .md2-option-icon { transform: rotate(-45deg); height: 8px; top: 17px; border-color: #106cc8; border-top-style: none; border-right-style: none; } /*# sourceMappingURL=multiselect.css.map */ "],
            providers: [MD2_MULTISELECT_CONTROL_VALUE_ACCESSOR],
            host: {
                'role': 'select',
                '[id]': 'id',
                '[class.md2-multiselect-disabled]': 'disabled',
                '[tabindex]': 'disabled ? -1 : tabindex',
                '[attr.aria-disabled]': 'disabled'
            },
            encapsulation: ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [ElementRef])
    ], Md2Multiselect);
    return Md2Multiselect;
}());
export var MD2_MULTISELECT_DIRECTIVES = [Md2Multiselect];
export var Md2MultiselectModule = (function () {
    function Md2MultiselectModule() {
    }
    Md2MultiselectModule.forRoot = function () {
        return {
            ngModule: Md2MultiselectModule,
            providers: []
        };
    };
    Md2MultiselectModule = __decorate([
        NgModule({
            imports: [CommonModule, FormsModule],
            exports: MD2_MULTISELECT_DIRECTIVES,
            declarations: MD2_MULTISELECT_DIRECTIVES,
        }), 
        __metadata('design:paramtypes', [])
    ], Md2MultiselectModule);
    return Md2MultiselectModule;
}());

//# sourceMappingURL=multiselect.js.map
