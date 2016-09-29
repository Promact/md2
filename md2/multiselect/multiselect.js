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
        define(["require", "exports", '@angular/core', '@angular/forms', '@angular/common'], factory);
    }
})(function (require, exports) {
    "use strict";
    var core_1 = require('@angular/core');
    var forms_1 = require('@angular/forms');
    var common_1 = require('@angular/common');
    var Option = (function () {
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
    exports.MD2_MULTISELECT_CONTROL_VALUE_ACCESSOR = {
        provide: forms_1.NG_VALUE_ACCESSOR,
        useExisting: core_1.forwardRef(function () { return Md2Multiselect; }),
        multi: true
    };
    var Md2Multiselect = (function () {
        function Md2Multiselect(element) {
            this.element = element;
            this.change = new core_1.EventEmitter();
            this._value = '';
            this._disabled = false;
            this._onTouchedCallback = noop;
            this._onChangeCallback = noop;
            this._options = [];
            this.list = [];
            this.items = [];
            this.focusedOption = 0;
            this.isFocused = false;
            this.id = 'md2-multiselect-' + (++nextId);
            this.tabindex = 0;
            this.placeholder = '';
            this.textKey = 'text';
            this.valueKey = null;
        }
        Object.defineProperty(Md2Multiselect.prototype, "disabled", {
            get: function () { return this._disabled; },
            set: function (value) {
                this._disabled = (value !== null && value !== false) ? true : null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Md2Multiselect.prototype, "options", {
            set: function (value) {
                this._options = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Md2Multiselect.prototype, "value", {
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
         * @param value
         */
        Md2Multiselect.prototype.setValue = function (value) {
            var _this = this;
            if (value !== this._value) {
                this._value = value;
                this.items = [];
                if (value && value.length && typeof value === 'object' && Array.isArray(value)) {
                    var _loop_1 = function(i) {
                        var selItm = this_1._options.find(function (itm) { return _this.equals(_this.valueKey ? itm[_this.valueKey] : itm, value[i]); });
                        if (selItm) {
                            this_1.items.push(new Option(selItm, this_1.textKey, this_1.valueKey));
                        }
                    };
                    var this_1 = this;
                    for (var i = 0; i < value.length; i++) {
                        _loop_1(i);
                    }
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
        Object.defineProperty(Md2Multiselect.prototype, "isMenuVisible", {
            get: function () {
                return (this.isFocused && this.list && this.list.length) ? true : false;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * to update scroll of options
         */
        Md2Multiselect.prototype.updateScroll = function () {
            if (this.focusedOption < 0) {
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
        Md2Multiselect.prototype.onClick = function (event) {
            if (this.disabled) {
                event.stopPropagation();
                event.preventDefault();
                return;
            }
            this.updateOptions();
        };
        Md2Multiselect.prototype.onKeyDown = function (event) {
            // check enabled
            if (this.disabled) {
                return;
            }
            // Tab Key
            if (event.keyCode === 9) {
                if (this.isMenuVisible) {
                    this.onBlur();
                    event.preventDefault();
                }
                return;
            }
            // Escape Key
            if (event.keyCode === 27) {
                this.onBlur();
                event.stopPropagation();
                event.preventDefault();
                return;
            }
            // Down Arrow
            if (event.keyCode === 40) {
                if (this.isMenuVisible) {
                    this.focusedOption = (this.focusedOption === this.list.length - 1) ? 0 : Math.min(this.focusedOption + 1, this.list.length - 1);
                    this.updateScroll();
                }
                else {
                    this.updateOptions();
                }
                event.stopPropagation();
                event.preventDefault();
                return;
            }
            // Up Arrow
            if (event.keyCode === 38) {
                if (this.isMenuVisible) {
                    this.focusedOption = (this.focusedOption === 0) ? this.list.length - 1 : Math.max(0, this.focusedOption - 1);
                    this.updateScroll();
                }
                else {
                    this.updateOptions();
                }
                event.stopPropagation();
                event.preventDefault();
                return;
            }
            // Enter / Space
            if (event.keyCode === 13 || event.keyCode === 32) {
                if (this.isMenuVisible) {
                    this.toggleOption(event, this.focusedOption);
                }
                else {
                    this.updateOptions();
                }
                event.preventDefault();
                return;
            }
        };
        /**
         * on focus current component
         */
        Md2Multiselect.prototype.onFocus = function () {
            this.isFocused = true;
            this.focusedOption = 0;
        };
        Md2Multiselect.prototype.onBlur = function () { this.isFocused = false; };
        /**
         * to check current option is active or not
         * @param index
         * @return boolean the item is active or not
         */
        Md2Multiselect.prototype.isActive = function (index) {
            return this.items.map(function (i) { return i.text; }).indexOf(this.list[index].text) < 0 ? false : true;
        };
        /**
         * to toggle option to select/deselect option
         * @param event
         * @param index
         */
        Md2Multiselect.prototype.toggleOption = function (event, index) {
            var _this = this;
            event.preventDefault();
            event.stopPropagation();
            var ind = this.items.map(function (i) { return i.text; }).indexOf(this.list[index].text);
            if (ind < 0) {
                this.items.push(this.list[index]);
                this.items = this.items.sort(function (a, b) { return _this.list.findIndex(function (i) { return i.text === a.text; }) - _this.list.findIndex(function (i) { return i.text === b.text; }); });
            }
            else {
                this.items.splice(ind, 1);
            }
            this._value = new Array();
            for (var i = 0; i < this.items.length; i++) {
                this._value.push(this.items[i].value);
            }
            this._onChangeCallback(this._value);
            this.change.emit(this._value);
        };
        /**
         * update options
         */
        Md2Multiselect.prototype.updateOptions = function () {
            var _this = this;
            this.list = this._options.map(function (item) { return new Option(item, _this.textKey, _this.valueKey); });
            if (this.list.length > 0) {
                this.onFocus();
            }
        };
        /**
         * Implemented as part of ControlValueAccessor.
         * TODO: internal
         */
        Md2Multiselect.prototype.writeValue = function (value) { this.setValue(value); };
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
            core_1.Output(), 
            __metadata('design:type', core_1.EventEmitter)
        ], Md2Multiselect.prototype, "change", void 0);
        __decorate([
            core_1.Input(), 
            __metadata('design:type', String)
        ], Md2Multiselect.prototype, "id", void 0);
        __decorate([
            core_1.Input(), 
            __metadata('design:type', Boolean)
        ], Md2Multiselect.prototype, "disabled", null);
        __decorate([
            core_1.Input(), 
            __metadata('design:type', Number)
        ], Md2Multiselect.prototype, "tabindex", void 0);
        __decorate([
            core_1.Input(), 
            __metadata('design:type', String)
        ], Md2Multiselect.prototype, "placeholder", void 0);
        __decorate([
            core_1.Input('item-text'), 
            __metadata('design:type', String)
        ], Md2Multiselect.prototype, "textKey", void 0);
        __decorate([
            core_1.Input('item-value'), 
            __metadata('design:type', String)
        ], Md2Multiselect.prototype, "valueKey", void 0);
        __decorate([
            core_1.Input('items'), 
            __metadata('design:type', Array), 
            __metadata('design:paramtypes', [Array])
        ], Md2Multiselect.prototype, "options", null);
        __decorate([
            core_1.Input(), 
            __metadata('design:type', Object)
        ], Md2Multiselect.prototype, "value", null);
        __decorate([
            core_1.HostListener('click', ['$event']), 
            __metadata('design:type', Function), 
            __metadata('design:paramtypes', [MouseEvent]), 
            __metadata('design:returntype', void 0)
        ], Md2Multiselect.prototype, "onClick", null);
        __decorate([
            core_1.HostListener('keydown', ['$event']), 
            __metadata('design:type', Function), 
            __metadata('design:paramtypes', [KeyboardEvent]), 
            __metadata('design:returntype', void 0)
        ], Md2Multiselect.prototype, "onKeyDown", null);
        __decorate([
            core_1.HostListener('blur'), 
            __metadata('design:type', Function), 
            __metadata('design:paramtypes', []), 
            __metadata('design:returntype', void 0)
        ], Md2Multiselect.prototype, "onBlur", null);
        Md2Multiselect = __decorate([
            core_1.Component({selector: 'md2-multiselect',
                template: "\n    <div class=\"md2-multiselect-container\">\n      <span class=\"md2-multiselect-placeholder\" [class.has-value]=\"items.length\">{{placeholder}}</span>\n      <div class=\"md2-multiselect-value\">\n        <div *ngFor=\"let v of items; let last = last\" class=\"md2-multiselect-value-item\">\n          <span class=\"md2-multiselect-text\">{{v.text}}</span><span *ngIf=\"!last\">,&nbsp;</span>\n        </div>\n      </div>\n      <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\">\n        <path d=\"M7 10l5 5 5-5z\" />\n      </svg>\n    </div>\n    <ul *ngIf=\"isMenuVisible\" class=\"md2-multiselect-menu\">\n      <li class=\"md2-option\" *ngFor=\"let l of list; let i = index;\" [class.active]=\"isActive(i)\" [class.focus]=\"focusedOption === i\" (click)=\"toggleOption($event, i)\">\n        <div class=\"md2-option-icon\"></div>\n        <div class=\"md2-option-text\" [innerHtml]=\"l.text\"></div>\n      </li>\n    </ul>\n  ",
                styles: ["\n    md2-multiselect { position: relative; display: block; margin: 18px 0; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; -moz-backface-visibility: hidden; -webkit-backface-visibility: hidden; backface-visibility: hidden; }\n    md2-multiselect:focus { outline: none; }\n    md2-multiselect.md2-multiselect-disabled { pointer-events: none; cursor: default; }\n    md2-multiselect .md2-multiselect-container { position: relative; width: 100%; min-width: 64px; min-height: 30px; align-items: center; padding: 2px 2px 1px; border-bottom: 1px solid rgba(0, 0, 0, 0.12); box-sizing: border-box; cursor: pointer; }\n    md2-multiselect:focus .md2-multiselect-container { padding-bottom: 0; border-bottom: 2px solid #106cc8; }\n    md2-multiselect.md2-multiselect-disabled .md2-multiselect-container { color: rgba(0,0,0,0.38); border-color: transparent; background-image: linear-gradient(to right, rgba(0,0,0,0.38) 0%, rgba(0,0,0,0.38) 33%, transparent 0%); background-position: bottom -1px left 0; background-size: 4px 1px; background-repeat: repeat-x; cursor: default; }\n    md2-multiselect.md2-multiselect-disabled:focus .md2-multiselect-container { padding-bottom: 1px; border-bottom: 1px solid transparent; }\n    md2-multiselect .md2-multiselect-placeholder { color: rgba(0, 0, 0, 0.38); position: absolute; right: 26px; bottom: 100%; left: 0; color: rgba(0,0,0,0.38); max-width: 100%; padding-left: 3px; padding-right: 0; line-height: 1.4; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; pointer-events: none; z-index: 1; transform: translate3d(0,26px,0) scale(1); transition: transform .4s cubic-bezier(.25,.8,.25,1); transform-origin: left top; color: rgba(0, 0, 0, 0.38); }\n    md2-multiselect:focus .md2-multiselect-placeholder { color: #2196f3; }\n    md2-multiselect:focus .md2-multiselect-placeholder,\n    md2-multiselect .md2-multiselect-placeholder.has-value { transform: translate3d(0,6px,0) scale(.75); }\n    md2-multiselect.md2-multiselect-disabled:focus .md2-multiselect-placeholder { color: rgba(0,0,0,0.38); }\n    md2-multiselect .md2-multiselect-container .md2-multiselect-value { display: block; max-height: 80px; padding-right: 26px; overflow-y: auto; font-size: 15px; line-height: 26px; }\n    md2-multiselect .md2-multiselect-container .md2-multiselect-value-item { word-wrap: break-word; }\n    md2-multiselect .md2-multiselect-container svg { position: absolute; right: 0; top: 0; display: block; height: 100%; background: #fff; fill: currentColor; color: rgba(0,0,0,0.54); }\n    md2-multiselect .md2-multiselect-menu { position: absolute; left: 0; top: 0; display: block; z-index: 10; width: 100%; margin: 0; padding: 8px 0; box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 2px 1px -1px rgba(0, 0, 0, 0.12); max-height: 256px; min-height: 48px; overflow-y: auto; -moz-transform: scale(1); -ms-transform: scale(1); -o-transform: scale(1); -webkit-transform: scale(1); transform: scale(1); background: #fff; }\n    md2-multiselect .md2-multiselect-menu .md2-option { position: relative; display: block; cursor: pointer; width: auto; -moz-transition: background 0.15s linear; -o-transition: background 0.15s linear; -webkit-transition: background 0.15s linear; transition: background 0.15s linear; padding: 0 16px 0 40px; height: 48px; line-height: 48px; }\n    md2-multiselect .md2-multiselect-menu .md2-option.active { color: #106cc8; }\n    md2-multiselect .md2-multiselect-menu .md2-option:hover, .md2-multiselect .md2-multiselect-menu .md2-option.focus { background: #eeeeee; }\n    md2-multiselect .md2-multiselect-menu .md2-option .md2-option-text { width: auto; white-space: nowrap; overflow: hidden; -ms-text-overflow: ellipsis; -o-text-overflow: ellipsis; text-overflow: ellipsis; font-size: 16px; }\n    md2-multiselect .md2-option .md2-option-icon { position: absolute; top: 14px; left: 12px; width: 16px; height: 16px; border: 2px solid rgba(0,0,0,0.54); border-radius: 2px; -moz-box-sizing: border-box; -webkit-box-sizing: border-box; box-sizing: border-box; -moz-transition: 240ms; -o-transition: 240ms; -webkit-transition: 240ms; transition: 240ms; }\n    md2-multiselect .md2-option.active .md2-option-icon { -moz-transform: rotate(-45deg); -ms-transform: rotate(-45deg); -o-transform: rotate(-45deg); -webkit-transform: rotate(-45deg); transform: rotate(-45deg); height: 8px; top: 17px; border-color: #106cc8; border-top-style: none; border-right-style: none; }\n  "],
                providers: [exports.MD2_MULTISELECT_CONTROL_VALUE_ACCESSOR],
                host: {
                    'role': 'select',
                    '[id]': 'id',
                    '[class.md2-multiselect-disabled]': 'disabled',
                    '[tabindex]': 'disabled ? -1 : tabindex',
                    '[attr.aria-disabled]': 'disabled'
                },
                encapsulation: core_1.ViewEncapsulation.None
            }), 
            __metadata('design:paramtypes', [core_1.ElementRef])
        ], Md2Multiselect);
        return Md2Multiselect;
    }());
    exports.Md2Multiselect = Md2Multiselect;
    exports.MD2_MULTISELECT_DIRECTIVES = [Md2Multiselect];
    var Md2MultiselectModule = (function () {
        function Md2MultiselectModule() {
        }
        Md2MultiselectModule.forRoot = function () {
            return {
                ngModule: Md2MultiselectModule,
                providers: []
            };
        };
        Md2MultiselectModule = __decorate([
            core_1.NgModule({
                declarations: exports.MD2_MULTISELECT_DIRECTIVES,
                imports: [common_1.CommonModule, forms_1.FormsModule],
                exports: exports.MD2_MULTISELECT_DIRECTIVES,
            }), 
            __metadata('design:paramtypes', [])
        ], Md2MultiselectModule);
        return Md2MultiselectModule;
    }());
    exports.Md2MultiselectModule = Md2MultiselectModule;
});

//# sourceMappingURL=multiselect.js.map
