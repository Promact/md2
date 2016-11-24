var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ElementRef, EventEmitter, forwardRef, Input, Output, ViewEncapsulation, NgModule } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HighlightPipe } from './autocomplete-pipe';
import { coerceBooleanProperty, UP_ARROW, DOWN_ARROW, ENTER, ESCAPE, TAB } from '../core/core';
var Item = (function () {
    function Item(source, textKey, valueKey) {
        if (typeof source === 'string') {
            this.text = this.value = source;
        }
        if (typeof source === 'object') {
            this.text = source[textKey];
            this.value = valueKey ? source[valueKey] : source;
        }
    }
    return Item;
}());
var noop = function () { };
var nextId = 0;
export var MD2_AUTOCOMPLETE_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return Md2Autocomplete; }),
    multi: true
};
export var Md2Autocomplete = (function () {
    function Md2Autocomplete(element) {
        this.element = element;
        this.change = new EventEmitter();
        this.textChange = new EventEmitter();
        this._value = '';
        this._disabled = false;
        this._isInitialized = false;
        this._onTouchedCallback = noop;
        this._onChangeCallback = noop;
        this._items = [];
        this.list = [];
        this.focusedOption = 0;
        this.inputBuffer = '';
        this.selectedItem = null;
        this.inputFocused = false;
        this.noBlur = true;
        this.id = 'md2-autocomplete-' + (++nextId);
        this.tabindex = 0;
        this.placeholder = '';
        this.textKey = 'text';
        this.valueKey = null;
        this.minLength = 1;
    }
    Md2Autocomplete.prototype.ngAfterContentInit = function () { this._isInitialized = true; };
    Object.defineProperty(Md2Autocomplete.prototype, "readonly", {
        get: function () { return this._readonly; },
        set: function (value) { this._readonly = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Autocomplete.prototype, "required", {
        get: function () { return this._required; },
        set: function (value) { this._required = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Autocomplete.prototype, "disabled", {
        get: function () { return this._disabled; },
        set: function (value) { this._disabled = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Autocomplete.prototype, "items", {
        set: function (value) { this._items = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Autocomplete.prototype, "value", {
        get: function () { return this._value; },
        set: function (value) {
            var _this = this;
            if (value !== this._value) {
                this._value = value;
                this.inputBuffer = '';
                if (value) {
                    var selItm = this._items.find(function (i) { return _this.equals(_this.valueKey ? i[_this.valueKey] : i, value); });
                    this.selectedItem = new Item(selItm, this.textKey, this.valueKey);
                    if (this.selectedItem) {
                        this.inputBuffer = this.selectedItem.text;
                    }
                }
                if (!this.inputBuffer) {
                    this.inputBuffer = '';
                }
                if (this._isInitialized) {
                    this._onChangeCallback(value);
                    this.change.emit(value);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Compare two vars or objects
     * @param o1 compare first object
     * @param o2 compare second object
     * @return boolean comparation result
     */
    Md2Autocomplete.prototype.equals = function (o1, o2) {
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
    Object.defineProperty(Md2Autocomplete.prototype, "isMenuVisible", {
        get: function () {
            return ((this.inputFocused || this.noBlur) && this.list && this.list.length && !this.selectedItem) && !this.readonly ? true : false;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * update scroll of suggestion menu
     */
    Md2Autocomplete.prototype.updateScroll = function () {
        if (this.focusedOption < 0) {
            return;
        }
        var menuContainer = this.element.nativeElement.querySelector('.md2-autocomplete-menu');
        if (!menuContainer) {
            return;
        }
        var choices = menuContainer.querySelectorAll('.md2-option');
        if (choices.length < 1) {
            return;
        }
        var highlighted = choices[this.focusedOption];
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
    /**
     * input event listner
     * @param event
     */
    Md2Autocomplete.prototype._handleKeydown = function (event) {
        var _this = this;
        if (this.disabled) {
            return;
        }
        this.textChange.emit(this.inputBuffer);
        switch (event.keyCode) {
            case TAB:
                this._handleMouseLeave();
                break;
            case ESCAPE:
                event.stopPropagation();
                event.preventDefault();
                if (this.inputBuffer) {
                    this.onClear();
                }
                break;
            case ENTER:
                event.preventDefault();
                event.stopPropagation();
                if (this.isMenuVisible) {
                    this.select(event, this.focusedOption);
                }
                break;
            case DOWN_ARROW:
                event.preventDefault();
                event.stopPropagation();
                if (this.isMenuVisible) {
                    this.focusedOption = (this.focusedOption === this.list.length - 1) ? 0 : Math.min(this.focusedOption + 1, this.list.length - 1);
                    this.updateScroll();
                }
                break;
            case UP_ARROW:
                event.preventDefault();
                event.stopPropagation();
                if (this.isMenuVisible) {
                    this.focusedOption = (this.focusedOption === 0) ? this.list.length - 1 : Math.max(0, this.focusedOption - 1);
                    this.updateScroll();
                }
                break;
            default:
                setTimeout(function () {
                    _this.updateItems(new RegExp(_this.inputBuffer, 'ig'));
                }, 10);
        }
    };
    /**
     * select option
     * @param event
     * @param index of selected item
     */
    Md2Autocomplete.prototype.select = function (event, index) {
        event.preventDefault();
        event.stopPropagation();
        this.selectedItem = this.list[index];
        this.inputBuffer = this.list[index].text;
        this.updateValue();
    };
    /**
     * clear selected suggestion
     */
    Md2Autocomplete.prototype.onClear = function () {
        if (this.disabled) {
            return;
        }
        this.inputBuffer = '';
        this.selectedItem = null;
        this.updateItems(new RegExp(this.inputBuffer, 'ig'));
        this._value = this.selectedItem ? this.selectedItem.value : this.selectedItem;
        this.updateValue();
    };
    /**
     * update value
     */
    Md2Autocomplete.prototype.updateValue = function () {
        this._value = this.selectedItem ? this.selectedItem.value : this.selectedItem;
        this._onChangeCallback(this._value);
        this.change.emit(this._value);
        this.onFocus();
    };
    /**
     * component focus listener
     */
    Md2Autocomplete.prototype.onFocus = function () {
        if (this.disabled) {
            return;
        }
        this.element.nativeElement.querySelector('input').focus();
    };
    /**
     * input focus listener
     */
    Md2Autocomplete.prototype._handleFocus = function () {
        this.inputFocused = true;
        this.updateItems(new RegExp(this.inputBuffer, 'ig'));
        this.focusedOption = 0;
    };
    /**
     * input blur listener
     */
    Md2Autocomplete.prototype._handleBlur = function () {
        this.inputFocused = false;
    };
    /**
     * suggestion menu mouse enter listener
     */
    Md2Autocomplete.prototype._handleMouseEnter = function () { this.noBlur = true; };
    /**
     * suggestion menu mouse leave listener
     */
    Md2Autocomplete.prototype._handleMouseLeave = function () { this.noBlur = false; };
    /**
     * Update suggestion to filter the query
     * @param query
     */
    Md2Autocomplete.prototype.updateItems = function (query) {
        var _this = this;
        if (this.inputBuffer.length < this.minLength) {
            this.list = [];
        }
        else {
            this.list = this._items.map(function (i) { return new Item(i, _this.textKey, _this.valueKey); }).filter(function (i) { return query.test(i.text); });
            if (this.list.length && this.list[0].text !== this.inputBuffer) {
                this.selectedItem = null;
            }
        }
    };
    Md2Autocomplete.prototype.writeValue = function (value) {
        var _this = this;
        if (value !== this._value) {
            this._value = value;
            this.inputBuffer = '';
            if (value) {
                var selItm = this._items.find(function (i) { return _this.equals(_this.valueKey ? i[_this.valueKey] : i, value); });
                this.selectedItem = new Item(selItm, this.textKey, this.valueKey);
                if (this.selectedItem) {
                    this.inputBuffer = this.selectedItem.text;
                }
            }
            if (!this.inputBuffer) {
                this.inputBuffer = '';
            }
        }
    };
    Md2Autocomplete.prototype.registerOnChange = function (fn) { this._onChangeCallback = fn; };
    Md2Autocomplete.prototype.registerOnTouched = function (fn) { this._onTouchedCallback = fn; };
    __decorate([
        Output(), 
        __metadata('design:type', EventEmitter)
    ], Md2Autocomplete.prototype, "change", void 0);
    __decorate([
        Output(), 
        __metadata('design:type', Object)
    ], Md2Autocomplete.prototype, "textChange", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', String)
    ], Md2Autocomplete.prototype, "id", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Number)
    ], Md2Autocomplete.prototype, "tabindex", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', String)
    ], Md2Autocomplete.prototype, "placeholder", void 0);
    __decorate([
        Input('item-text'), 
        __metadata('design:type', String)
    ], Md2Autocomplete.prototype, "textKey", void 0);
    __decorate([
        Input('item-value'), 
        __metadata('design:type', String)
    ], Md2Autocomplete.prototype, "valueKey", void 0);
    __decorate([
        Input('min-length'), 
        __metadata('design:type', Number)
    ], Md2Autocomplete.prototype, "minLength", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Boolean)
    ], Md2Autocomplete.prototype, "readonly", null);
    __decorate([
        Input(), 
        __metadata('design:type', Boolean)
    ], Md2Autocomplete.prototype, "required", null);
    __decorate([
        Input(), 
        __metadata('design:type', Boolean)
    ], Md2Autocomplete.prototype, "disabled", null);
    __decorate([
        Input(), 
        __metadata('design:type', Array), 
        __metadata('design:paramtypes', [Array])
    ], Md2Autocomplete.prototype, "items", null);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], Md2Autocomplete.prototype, "value", null);
    Md2Autocomplete = __decorate([
        Component({selector: 'md2-autocomplete',
            template: "\n    <div class=\"md2-autocomplete-wrap\" [class.is-focused]=\"inputFocused || isMenuVisible\">\n      <input [(ngModel)]=\"inputBuffer\" type=\"text\" tabs=\"false\" autocomplete=\"off\" [readonly]=\"readonly\" [tabindex]=\"disabled ? -1 : tabindex\" [disabled]=\"disabled\" class=\"md2-autocomplete-input\" (focus)=\"_handleFocus()\" (blur)=\"_handleBlur()\" (keydown)=\"_handleKeydown($event)\" (change)=\"$event.stopPropagation()\" />\n      <span class=\"md2-autocomplete-placeholder\" [class.has-value]=\"inputBuffer\">\n        {{placeholder}}\n        <span class=\"md2-placeholder-required\" *ngIf=\"required\">*</span>\n      </span>\n      <svg *ngIf=\"inputBuffer\" (click)=\"onClear()\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\">\n        <path d=\"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z\" />\n      </svg>\n    </div>\n    <ul *ngIf=\"isMenuVisible\" class=\"md2-autocomplete-menu\" (mouseenter)=\"_handleMouseEnter()\" (mouseleave)=\"_handleMouseLeave()\">\n      <li class=\"md2-option\" *ngFor=\"let l of list; let i = index;\" [class.focus]=\"focusedOption === i\" (click)=\"select($event, i)\">\n        <div class=\"md2-text\" [innerHtml]=\"l.text | highlight:inputBuffer\"></div>\n      </li>\n    </ul>\n  ",
            styles: ["\n    md2-autocomplete { position: relative; display: block; margin: 18px 0; outline: none; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; -moz-backface-visibility: hidden; -webkit-backface-visibility: hidden; backface-visibility: hidden; }\n    md2-autocomplete.md2-autocomplete-disabled { pointer-events: none; cursor: default; }\n    md2-autocomplete .md2-autocomplete-wrap { position: relative; display: block; width: 100%; padding: 2px 2px 1px; border-bottom: 1px solid rgba(0, 0, 0, 0.12); box-sizing: border-box; min-width: 64px; min-height: 26px; cursor: pointer; }\n    .md2-autocomplete-wrap.is-focused { padding-bottom: 0; border-bottom: 2px solid #106cc8; }\n    md2-autocomplete.md2-autocomplete-disabled .md2-autocomplete-wrap { color: rgba(0,0,0,0.38); border-color: transparent; background-image: linear-gradient(to right, rgba(0,0,0,0.38) 0%, rgba(0,0,0,0.38) 33%, transparent 0%); background-position: bottom -1px left 0; background-size: 4px 1px; background-repeat: repeat-x; cursor: default; cursor: default; }\n    md2-autocomplete.md2-autocomplete-disabled .md2-autocomplete-wrap.is-focused { padding-bottom: 1px; border-bottom: 1px solid transparent; }\n    .md2-autocomplete-wrap .md2-autocomplete-input { width: 100%; height: 26px; font-size: 15px; outline: none; background: transparent; border: 0; box-sizing: border-box; }\n    md2-autocomplete.md2-autocomplete-disabled .md2-autocomplete-input { color: rgba(0,0,0,0.38); }\n    md2-autocomplete .md2-autocomplete-placeholder { color: rgba(0, 0, 0, 0.38); position: absolute; right: 26px; bottom: 100%; left: 0; color: rgba(0,0,0,0.38); max-width: 100%; padding-left: 3px; padding-right: 0; line-height: 1.4; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; pointer-events: none; z-index: 1; transform: translate3d(0,26px,0) scale(1); transition: transform .4s cubic-bezier(.25,.8,.25,1); transform-origin: left top; color: rgba(0, 0, 0, 0.38); }\n    .md2-autocomplete-wrap.is-focused .md2-autocomplete-placeholder { color: #2196f3; }\n    .md2-autocomplete-wrap.is-focused .md2-autocomplete-placeholder .md2-placeholder-required { color: #f00; }\n    .md2-autocomplete-wrap.is-focused .md2-autocomplete-placeholder,\n    md2-autocomplete .md2-autocomplete-placeholder.has-value { transform: translate3d(0,6px,0) scale(.75); }\n    .md2-autocomplete-wrap svg { position: absolute; right: 0; top: 0; display: block; height: 100%; background: #fff; fill: currentColor; color: rgba(0,0,0,0.54); }\n    .md2-autocomplete-menu { position: absolute; left: 0; top: 100%; display: block; z-index: 10; width: 100%; margin: 0; padding: 8px 0; box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 2px 1px -1px rgba(0, 0, 0, 0.12); max-height: 256px; min-height: 48px; overflow-y: auto; background: #fff; }\n    .md2-autocomplete-menu .md2-option { position: relative; display: block; color: #212121; cursor: pointer; width: auto; padding: 0 16px; height: 48px; line-height: 48px; -moz-transition: background 0.15s linear; -o-transition: background 0.15s linear; -webkit-transition: background 0.15s linear; transition: background 0.15s linear; }\n    .md2-autocomplete-menu .md2-option:hover,\n    .md2-autocomplete-menu .md2-option.focus { background: #eeeeee; }\n    .md2-autocomplete-menu .md2-option .md2-text { width: auto; white-space: nowrap; overflow: hidden; -ms-text-overflow: ellipsis; -o-text-overflow: ellipsis; text-overflow: ellipsis; font-size: 16px; }\n    .md2-autocomplete-menu .highlight { color: #757575; }\n  "],
            providers: [MD2_AUTOCOMPLETE_CONTROL_VALUE_ACCESSOR],
            host: {
                'role': 'autocomplete',
                '[id]': 'id',
                '[class.md2-autocomplete-disabled]': 'disabled',
                '[attr.aria-disabled]': 'disabled'
            },
            encapsulation: ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [ElementRef])
    ], Md2Autocomplete);
    return Md2Autocomplete;
}());
export var MD2_AUTOCOMPLETE_DIRECTIVES = [Md2Autocomplete, HighlightPipe];
export var Md2AutocompleteModule = (function () {
    function Md2AutocompleteModule() {
    }
    Md2AutocompleteModule.forRoot = function () {
        return {
            ngModule: Md2AutocompleteModule,
            providers: []
        };
    };
    Md2AutocompleteModule = __decorate([
        NgModule({
            imports: [CommonModule, FormsModule],
            exports: MD2_AUTOCOMPLETE_DIRECTIVES,
            declarations: MD2_AUTOCOMPLETE_DIRECTIVES,
        }), 
        __metadata('design:paramtypes', [])
    ], Md2AutocompleteModule);
    return Md2AutocompleteModule;
}());

//# sourceMappingURL=autocomplete.js.map
