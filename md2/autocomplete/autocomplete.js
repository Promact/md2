var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", '@angular/core', '@angular/forms', '@angular/common', './autocomplete.pipe'], factory);
    }
})(function (require, exports) {
    "use strict";
    var core_1 = require('@angular/core');
    var forms_1 = require('@angular/forms');
    var common_1 = require('@angular/common');
    var autocomplete_pipe_1 = require('./autocomplete.pipe');
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
    exports.MD2_AUTOCOMPLETE_CONTROL_VALUE_ACCESSOR = {
        provide: forms_1.NG_VALUE_ACCESSOR,
        useExisting: core_1.forwardRef(function () { return Md2Autocomplete; }),
        multi: true
    };
    var Md2Autocomplete = (function () {
        function Md2Autocomplete(element) {
            this.element = element;
            this.change = new core_1.EventEmitter();
            this._value = '';
            this._disabled = false;
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
        }
        Object.defineProperty(Md2Autocomplete.prototype, "disabled", {
            get: function () { return this._disabled; },
            set: function (value) {
                this._disabled = (value !== null && value !== false) ? true : null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Md2Autocomplete.prototype, "items", {
            set: function (value) {
                this._items = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Md2Autocomplete.prototype, "value", {
            get: function () {
                return this._value;
            },
            set: function (value) {
                this.setValue(value);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * set value
         * @param value of ngModel
         */
        Md2Autocomplete.prototype.setValue = function (value) {
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
                this._onChangeCallback(value);
                this.change.emit(this._value);
            }
        };
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
            var t1 = typeof o1, t2 = typeof o2, length, key, keySet;
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
                return ((this.inputFocused || this.noBlur) && this.list && this.list.length && !this.selectedItem) ? true : false;
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
        Md2Autocomplete.prototype.inputKeydown = function (event) {
            var _this = this;
            if (this.disabled) {
                return;
            }
            // Down Arrow
            if (event.keyCode === 40) {
                if (!this.isMenuVisible) {
                    return;
                }
                event.stopPropagation();
                event.preventDefault();
                this.focusedOption = (this.focusedOption === this.list.length - 1) ? 0 : Math.min(this.focusedOption + 1, this.list.length - 1);
                this.updateScroll();
                return;
            }
            // Up Arrow
            if (event.keyCode === 38) {
                if (!this.isMenuVisible) {
                    return;
                }
                event.stopPropagation();
                event.preventDefault();
                this.focusedOption = (this.focusedOption === 0) ? this.list.length - 1 : Math.max(0, this.focusedOption - 1);
                this.updateScroll();
                return;
            }
            // Tab Key
            if (event.keyCode === 9) {
                this.listLeave();
                return;
            }
            // Escape Key
            if (event.keyCode === 27) {
                event.stopPropagation();
                event.preventDefault();
                this.onClear();
                return;
            }
            // Enter
            if (event.keyCode === 13) {
                if (this.isMenuVisible) {
                    this.select(event, this.focusedOption);
                }
                event.preventDefault();
                return;
            }
            // filter
            setTimeout(function () {
                _this.updateItems(new RegExp(_this.inputBuffer, 'ig'));
            }, 10);
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
        Md2Autocomplete.prototype.onInputFocus = function () {
            this.inputFocused = true;
            this.updateItems(new RegExp(this.inputBuffer, 'ig'));
            this.focusedOption = 0;
        };
        /**
         * input blur listener
         */
        Md2Autocomplete.prototype.onInputBlur = function () {
            this.inputFocused = false;
        };
        /**
         * suggestion menu mouse enter listener
         */
        Md2Autocomplete.prototype.listEnter = function () { this.noBlur = true; };
        /**
         * suggestion menu mouse leave listener
         */
        Md2Autocomplete.prototype.listLeave = function () { this.noBlur = false; };
        /**
         * Update suggestion to filter the query
         * @param query
         */
        Md2Autocomplete.prototype.updateItems = function (query) {
            var _this = this;
            this.list = this._items.map(function (i) { return new Item(i, _this.textKey, _this.valueKey); }).filter(function (i) { return query.test(i.text); });
            if (this.list.length && this.list[0].text !== this.inputBuffer) {
                this.selectedItem = null;
            }
        };
        Md2Autocomplete.prototype.writeValue = function (value) { this.setValue(value); };
        Md2Autocomplete.prototype.registerOnChange = function (fn) { this._onChangeCallback = fn; };
        Md2Autocomplete.prototype.registerOnTouched = function (fn) { this._onTouchedCallback = fn; };
        __decorate([
            core_1.Output(), 
            __metadata('design:type', core_1.EventEmitter)
        ], Md2Autocomplete.prototype, "change", void 0);
        __decorate([
            core_1.Input(), 
            __metadata('design:type', String)
        ], Md2Autocomplete.prototype, "id", void 0);
        __decorate([
            core_1.Input(), 
            __metadata('design:type', Boolean)
        ], Md2Autocomplete.prototype, "disabled", null);
        __decorate([
            core_1.Input(), 
            __metadata('design:type', Number)
        ], Md2Autocomplete.prototype, "tabindex", void 0);
        __decorate([
            core_1.Input(), 
            __metadata('design:type', String)
        ], Md2Autocomplete.prototype, "placeholder", void 0);
        __decorate([
            core_1.Input('item-text'), 
            __metadata('design:type', String)
        ], Md2Autocomplete.prototype, "textKey", void 0);
        __decorate([
            core_1.Input('item-value'), 
            __metadata('design:type', String)
        ], Md2Autocomplete.prototype, "valueKey", void 0);
        __decorate([
            core_1.Input(), 
            __metadata('design:type', Array), 
            __metadata('design:paramtypes', [Array])
        ], Md2Autocomplete.prototype, "items", null);
        __decorate([
            core_1.Input(), 
            __metadata('design:type', Object)
        ], Md2Autocomplete.prototype, "value", null);
        Md2Autocomplete = __decorate([
            core_1.Component({selector: 'md2-autocomplete',
                template: "\n    <div class=\"md2-autocomplete-wrap\">\n      <input [(ngModel)]=\"inputBuffer\" type=\"text\" tabs=\"false\" autocomplete=\"off\" [tabindex]=\"disabled ? -1 : tabindex\" [disabled]=\"disabled\" class=\"md2-autocomplete-input\" (focus)=\"onInputFocus()\" (blur)=\"onInputBlur()\" (keydown)=\"inputKeydown($event)\" (change)=\"$event.stopPropagation()\" />\n      <span class=\"md2-autocomplete-placeholder\" [class.is-focused]=\"isMenuVisible\" [class.has-value]=\"inputBuffer\">{{placeholder}}</span>\n      <svg *ngIf=\"inputBuffer\" (click)=\"onClear()\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\">\n        <path d=\"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z\" />\n      </svg>\n    </div>\n    <ul *ngIf=\"isMenuVisible\" class=\"md2-autocomplete-menu\" (mouseenter)=\"listEnter()\" (mouseleave)=\"listLeave()\">\n      <li class=\"md2-option\" *ngFor=\"let l of list; let i = index;\" [class.focus]=\"focusedOption === i\" (click)=\"select($event, i)\">\n        <div class=\"md2-text\" [innerHtml]=\"l.text | hightlight:inputBuffer\"></div>\n      </li>\n    </ul>\n  ",
                styles: ["\n    md2-autocomplete { position: relative; display: block; margin: 18px 0; outline: none; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; -moz-backface-visibility: hidden; -webkit-backface-visibility: hidden; backface-visibility: hidden; }\n    md2-autocomplete.md2-autocomplete-disabled { pointer-events: none; cursor: default; }\n    md2-autocomplete .md2-autocomplete-wrap { position: relative; display: block; width: 100%; padding: 2px 2px 1px; border-bottom: 1px solid rgba(0, 0, 0, 0.12); box-sizing: border-box; min-width: 64px; min-height: 26px; cursor: pointer; }\n    md2-autocomplete.md2-autocomplete-disabled .md2-autocomplete-wrap { color: rgba(0,0,0,0.38); border-color: transparent; background-image: linear-gradient(to right, rgba(0,0,0,0.38) 0%, rgba(0,0,0,0.38) 33%, transparent 0%); background-position: bottom -1px left 0; background-size: 4px 1px; background-repeat: repeat-x; }\n    .md2-autocomplete-wrap .md2-autocomplete-input { width: 100%; height: 26px; font-size: 15px; outline: none; background: transparent; border: 0; box-sizing: border-box; }\n    md2-autocomplete .md2-autocomplete-placeholder { color: rgba(0, 0, 0, 0.38); position: absolute; right: 26px; bottom: 100%; left: 0; color: rgba(0,0,0,0.38); max-width: 100%; padding-left: 3px; padding-right: 0; line-height: 1.4; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; pointer-events: none; z-index: 1; transform: translate3d(0,26px,0) scale(1); transition: transform .4s cubic-bezier(.25,.8,.25,1); transform-origin: left top; color: rgba(0, 0, 0, 0.38); }\n    .md2-autocomplete-input:focus + .md2-autocomplete-placeholder,\n    .md2-autocomplete-placeholder.is-focused { color: #2196f3; }\n    .md2-autocomplete-placeholder.is-focused,\n    md2-autocomplete .md2-autocomplete-placeholder.has-value { transform: translate3d(0,6px,0) scale(.75); }\n    md2-autocomplete.md2-autocomplete-disabled:focus .md2-multiselect-placeholder { color: rgba(0,0,0,0.38); }\n    .md2-autocomplete-wrap svg { position: absolute; right: 0; top: 0; display: block; height: 100%; background: #fff; fill: currentColor; color: rgba(0,0,0,0.54); }\n    .md2-autocomplete-menu { position: absolute; left: 0; top: 100%; display: block; z-index: 10; width: 100%; margin: 0; padding: 8px 0; box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 2px 1px -1px rgba(0, 0, 0, 0.12); max-height: 256px; min-height: 48px; overflow-y: auto; background: #fff; }\n    .md2-autocomplete-menu .md2-option { position: relative; display: block; cursor: pointer; width: auto; padding: 0 16px; height: 48px; line-height: 48px; -moz-transition: background 0.15s linear; -o-transition: background 0.15s linear; -webkit-transition: background 0.15s linear; transition: background 0.15s linear; }\n    .md2-autocomplete-menu .md2-option:hover,\n    .md2-autocomplete-menu .md2-option.focus { background: #eeeeee; }\n    .md2-autocomplete-menu .md2-option .md2-text { width: auto; white-space: nowrap; overflow: hidden; -ms-text-overflow: ellipsis; -o-text-overflow: ellipsis; text-overflow: ellipsis; font-size: 16px; }\n    .md2-autocomplete-menu .highlight { color: #757575; }\n  "],
                providers: [exports.MD2_AUTOCOMPLETE_CONTROL_VALUE_ACCESSOR],
                host: {
                    'role': 'autocomplete',
                    '[id]': 'id',
                    '[class.md2-autocomplete-disabled]': 'disabled',
                    '[attr.aria-disabled]': 'disabled'
                },
                encapsulation: core_1.ViewEncapsulation.None
            }), 
            __metadata('design:paramtypes', [core_1.ElementRef])
        ], Md2Autocomplete);
        return Md2Autocomplete;
    }());
    exports.Md2Autocomplete = Md2Autocomplete;
    exports.MD2_AUTOCOMPLETE_DIRECTIVES = [Md2Autocomplete, autocomplete_pipe_1.HightlightPipe];
    var Md2AutocompleteModule = (function () {
        function Md2AutocompleteModule() {
        }
        Md2AutocompleteModule.forRoot = function () {
            return {
                ngModule: Md2AutocompleteModule,
                providers: []
            };
        };
        Md2AutocompleteModule = __decorate([
            core_1.NgModule({
                declarations: exports.MD2_AUTOCOMPLETE_DIRECTIVES,
                imports: [common_1.CommonModule, forms_1.FormsModule],
                exports: exports.MD2_AUTOCOMPLETE_DIRECTIVES,
            }), 
            __metadata('design:paramtypes', [])
        ], Md2AutocompleteModule);
        return Md2AutocompleteModule;
    }());
    exports.Md2AutocompleteModule = Md2AutocompleteModule;
});

//# sourceMappingURL=autocomplete.js.map
