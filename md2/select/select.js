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
    exports.MD2_SELECT_CONTROL_VALUE_ACCESSOR = {
        provide: forms_1.NG_VALUE_ACCESSOR,
        useExisting: core_1.forwardRef(function () { return Md2Select; }),
        multi: true
    };
    var _uniqueIdCounter = 0;
    var Md2SelectDispatcher = (function () {
        function Md2SelectDispatcher() {
            this._listeners = [];
        }
        Md2SelectDispatcher.prototype.notify = function (id, name) {
            for (var _i = 0, _a = this._listeners; _i < _a.length; _i++) {
                var listener = _a[_i];
                listener(id, name);
            }
        };
        Md2SelectDispatcher.prototype.listen = function (listener) {
            this._listeners.push(listener);
        };
        Md2SelectDispatcher = __decorate([
            core_1.Injectable(), 
            __metadata('design:paramtypes', [])
        ], Md2SelectDispatcher);
        return Md2SelectDispatcher;
    }());
    exports.Md2SelectDispatcher = Md2SelectDispatcher;
    var Md2OptionChange = (function () {
        function Md2OptionChange() {
        }
        return Md2OptionChange;
    }());
    exports.Md2OptionChange = Md2OptionChange;
    var Md2Select = (function () {
        function Md2Select(element) {
            this.element = element;
            this._value = null;
            this._name = 'md2-select-' + _uniqueIdCounter++;
            this._disabled = false;
            this._selected = null;
            this.isOpenable = true;
            this.isMenuVisible = false;
            this.selectedValue = '';
            this.focusIndex = 0;
            this._controlValueAccessorChangeFn = function (value) { };
            this.onTouched = function () { };
            this.change = new core_1.EventEmitter();
            this._options = null;
            this.tabindex = 0;
            this.placeholder = '';
        }
        Object.defineProperty(Md2Select.prototype, "name", {
            get: function () { return this._name; },
            set: function (value) {
                this._name = value;
                this._updateOptions();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Md2Select.prototype, "disabled", {
            get: function () { return this._disabled; },
            set: function (value) {
                this._disabled = (value !== null && value !== false) ? true : null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Md2Select.prototype, "value", {
            get: function () { return this._value; },
            set: function (newValue) {
                if (this._value !== newValue) {
                    this._value = newValue;
                    this._updateSelectedOptionValue();
                    this._emitChangeEvent();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Md2Select.prototype, "selected", {
            get: function () { return this._selected; },
            set: function (selected) {
                this._selected = selected;
                this.value = selected ? selected.value : null;
                if (selected) {
                    if (!selected.selected) {
                        selected.selected = true;
                    }
                    this.selectedValue = selected.content;
                }
                else {
                    this.selectedValue = '';
                }
            },
            enumerable: true,
            configurable: true
        });
        Md2Select.prototype.ngAfterContentChecked = function () {
            var _this = this;
            var opt = this._options.filter(function (o) { return _this.equals(o.value, _this.value); })[0];
            if (opt) {
                this.selectedValue = opt.content;
            }
        };
        /**
         * Compare two vars or objects
         * @param o1 compare first object
         * @param o2 compare second object
         * @return boolean comparation result
         */
        Md2Select.prototype.equals = function (o1, o2) {
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
        /**
         * To update scroll to position of focused option
         */
        Md2Select.prototype.updateScroll = function () {
            if (this.focusIndex < 0) {
                return;
            }
            var menuContainer = this.element.nativeElement.querySelector('.md2-select-menu');
            if (!menuContainer) {
                return;
            }
            var choices = menuContainer.querySelectorAll('md2-option');
            if (choices.length < 1) {
                return;
            }
            var highlighted = choices[this.focusIndex];
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
         * get index of focused option
         */
        Md2Select.prototype.getFocusIndex = function () { return this._options.toArray().findIndex(function (o) { return o.focused; }); };
        /**
         * update focused option
         * @param inc
         */
        Md2Select.prototype.updateFocus = function (inc) {
            var options = this._options.toArray();
            var index = this.focusIndex;
            options.forEach(function (o) { if (o.focused) {
                o.focused = false;
            } });
            var option;
            do {
                index += inc;
                if (index < 0) {
                    index = options.length - 1;
                }
                if (index > options.length - 1) {
                    index = 0;
                }
                option = options[index];
                this.focusIndex = index;
                if (option.disabled) {
                    option = undefined;
                }
            } while (!option);
            if (option) {
                option.focused = true;
            }
            this.updateScroll();
        };
        Md2Select.prototype.onClick = function (e) {
            var _this = this;
            if (this.disabled) {
                e.stopPropagation();
                e.preventDefault();
                return;
            }
            if (this.isOpenable) {
                if (!this.isMenuVisible) {
                    this._options.forEach(function (o) {
                        o.focused = false;
                        if (o.selected) {
                            o.focused = true;
                        }
                    });
                    this.focusIndex = this.getFocusIndex();
                    this.isMenuVisible = true;
                    setTimeout(function () {
                        _this.updateScroll();
                    }, 0);
                }
            }
            this.isOpenable = true;
        };
        Md2Select.prototype.onKeyDown = function (e) {
            if (this.disabled) {
                return;
            }
            // Tab Key
            if (e.keyCode === 9) {
                if (this.isMenuVisible) {
                    this.onBlur();
                    e.preventDefault();
                }
                return;
            }
            // Escape Key
            if (e.keyCode === 27) {
                this.onBlur();
                e.stopPropagation();
                e.preventDefault();
                return;
            }
            // Up Arrow
            if (e.keyCode === 38) {
                if (this.isMenuVisible) {
                    this.updateFocus(-1);
                }
                else {
                    this.onClick(e);
                }
                e.stopPropagation();
                e.preventDefault();
                return;
            }
            // Down Arrow
            if (e.keyCode === 40) {
                if (this.isMenuVisible) {
                    this.updateFocus(1);
                }
                else {
                    this.onClick(e);
                }
                e.stopPropagation();
                e.preventDefault();
                return;
            }
            // Enter / Space
            if (e.keyCode === 13 || e.keyCode === 32) {
                if (this.isMenuVisible) {
                    this._options.toArray()[this.focusIndex].onClick(e);
                }
                else {
                    this.onClick(e);
                }
                e.preventDefault();
                return;
            }
        };
        Md2Select.prototype.onBlur = function () {
            var _this = this;
            this.isMenuVisible = false;
            this.isOpenable = false;
            setTimeout(function () {
                _this.isOpenable = true;
            }, 200);
        };
        Md2Select.prototype.touch = function () {
            if (this.onTouched) {
                this.onTouched();
            }
        };
        Md2Select.prototype._updateOptions = function () {
            var _this = this;
            if (this._options) {
                this._options.forEach(function (option) {
                    option.name = _this.name;
                });
            }
        };
        Md2Select.prototype._updateSelectedOptionValue = function () {
            var _this = this;
            var isAlreadySelected = this._selected !== null && this._selected.value === this._value;
            if (this._options !== null && !isAlreadySelected) {
                var matchingOption = this._options.filter(function (option) { return option.value === _this._value; })[0];
                if (matchingOption) {
                    this.selected = matchingOption;
                }
                else if (!this.value) {
                    this.selected = null;
                    this._options.forEach(function (option) { option.selected = false; });
                }
            }
        };
        Md2Select.prototype._emitChangeEvent = function () {
            var event = new Md2OptionChange();
            event.source = this._selected;
            event.value = this._value;
            this._controlValueAccessorChangeFn(event.value);
            this.change.emit(event);
        };
        Md2Select.prototype.writeValue = function (value) { this.value = value; };
        Md2Select.prototype.registerOnChange = function (fn) { this._controlValueAccessorChangeFn = fn; };
        Md2Select.prototype.registerOnTouched = function (fn) { this.onTouched = fn; };
        __decorate([
            core_1.Output(), 
            __metadata('design:type', core_1.EventEmitter)
        ], Md2Select.prototype, "change", void 0);
        __decorate([
            core_1.ContentChildren(core_1.forwardRef(function () { return Md2Option; })), 
            __metadata('design:type', core_1.QueryList)
        ], Md2Select.prototype, "_options", void 0);
        __decorate([
            core_1.Input(), 
            __metadata('design:type', String)
        ], Md2Select.prototype, "name", null);
        __decorate([
            core_1.Input(), 
            __metadata('design:type', Number)
        ], Md2Select.prototype, "tabindex", void 0);
        __decorate([
            core_1.Input(), 
            __metadata('design:type', String)
        ], Md2Select.prototype, "placeholder", void 0);
        __decorate([
            core_1.HostBinding('class.md2-select-disabled'),
            core_1.Input(), 
            __metadata('design:type', Boolean)
        ], Md2Select.prototype, "disabled", null);
        __decorate([
            core_1.Input(), 
            __metadata('design:type', Object)
        ], Md2Select.prototype, "value", null);
        __decorate([
            core_1.Input(), 
            __metadata('design:type', Object)
        ], Md2Select.prototype, "selected", null);
        __decorate([
            core_1.HostListener('click', ['$event']), 
            __metadata('design:type', Function), 
            __metadata('design:paramtypes', [Object]), 
            __metadata('design:returntype', void 0)
        ], Md2Select.prototype, "onClick", null);
        __decorate([
            core_1.HostListener('keydown', ['$event']), 
            __metadata('design:type', Function), 
            __metadata('design:paramtypes', [Object]), 
            __metadata('design:returntype', void 0)
        ], Md2Select.prototype, "onKeyDown", null);
        __decorate([
            core_1.HostListener('blur'), 
            __metadata('design:type', Function), 
            __metadata('design:paramtypes', []), 
            __metadata('design:returntype', void 0)
        ], Md2Select.prototype, "onBlur", null);
        Md2Select = __decorate([
            core_1.Component({selector: 'md2-select',
                template: "\n    <div class=\"md2-select-container\">\n      <span class=\"md2-select-placeholder\" [class.has-value]=\"selectedValue\">{{placeholder}}</span>\n      <span *ngIf=\"selectedValue.length > 0\" class=\"md2-select-value\" [innerHtml]=\"selectedValue\"></span>\n      <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\">\n        <path d=\"M7 10l5 5 5-5z\" />\n      </svg>\n    </div>\n    <div class=\"md2-select-menu\" [class.open]=\"isMenuVisible\">\n      <ng-content></ng-content>\n    </div>\n  ",
                styles: ["\n    md2-select { position: relative; display: block; margin: 18px 0; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; -moz-backface-visibility: hidden; -webkit-backface-visibility: hidden; backface-visibility: hidden; }\n    md2-select:focus { outline: none; }\n    md2-select.md2-select-disabled { pointer-events: none; cursor: default; }\n    md2-select .md2-select-container { position: relative; width: 100%; min-width: 64px; min-height: 26px; align-items: center; padding: 2px 26px 1px 2px; border-bottom: 1px solid rgba(0, 0, 0, 0.12); box-sizing: border-box; cursor: pointer; }\n    md2-select:focus .md2-select-container { padding-bottom: 0; border-bottom: 2px solid #106cc8; }\n    md2-select.md2-select-disabled .md2-select-container { color: rgba(0,0,0,0.38); border-color: transparent; background-image: linear-gradient(to right, rgba(0,0,0,0.38) 0%, rgba(0,0,0,0.38) 33%, transparent 0%); background-position: bottom -1px left 0; background-size: 4px 1px; background-repeat: repeat-x; cursor: default; }\n    md2-select.md2-select-disabled:focus .md2-select-container { padding-bottom: 1px; border-bottom: 1px solid transparent; }\n    md2-select .md2-select-container .md2-select-placeholder { position: absolute; right: 26px; bottom: 100%; left: 0; color: rgba(0,0,0,0.38); max-width: 100%; padding-left: 3px; padding-right: 0; line-height: 1.4; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; pointer-events: none; z-index: 1; transform: translate3d(0,26px,0) scale(1); transition: transform .4s cubic-bezier(.25,.8,.25,1); transform-origin: left top; color: rgba(0, 0, 0, 0.38); }\n    md2-select:focus .md2-select-placeholder { color: #2196f3; }\n    md2-select:focus .md2-select-placeholder,\n    md2-select .md2-select-placeholder.has-value { transform: translate3d(0,6px,0) scale(.75); }\n    md2-select.md2-select-disabled:focus .md2-select-placeholder { color: rgba(0,0,0,0.38); }\n    md2-select .md2-select-container .md2-select-value { display: block; font-size: 15px; line-height: 26px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }\n    md2-select .md2-select-container .md2-select-value * { display: inline; }\n    md2-select .md2-select-container svg { position: absolute; right: 0; top: 2px; display: block; fill: currentColor; color: rgba(0,0,0,0.54); }\n    md2-select .md2-select-menu { position: absolute; left: 0; top: 0; display: none; z-index: 10; -ms-flex-direction: column; -webkit-flex-direction: column; flex-direction: column; width: 100%; margin: 0; padding: 8px 0; box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 2px 1px -1px rgba(0, 0, 0, 0.12); max-height: 256px; min-height: 48px; overflow-y: auto; -moz-transform: scale(1); -ms-transform: scale(1); -o-transform: scale(1); -webkit-transform: scale(1); transform: scale(1); background: #fff; }\n    md2-select .md2-select-menu.open { display: block; }\n  "],
                providers: [exports.MD2_SELECT_CONTROL_VALUE_ACCESSOR],
                host: {
                    'role': 'select',
                    '[tabindex]': 'disabled ? -1 : tabindex',
                    '[attr.aria-disabled]': 'disabled'
                },
                encapsulation: core_1.ViewEncapsulation.None
            }), 
            __metadata('design:paramtypes', [core_1.ElementRef])
        ], Md2Select);
        return Md2Select;
    }());
    exports.Md2Select = Md2Select;
    var Md2Option = (function () {
        function Md2Option(select, selectDispatcher, element) {
            var _this = this;
            this.selectDispatcher = selectDispatcher;
            this.element = element;
            this.focused = false;
            this._selected = false;
            this.id = "md2-option-" + _uniqueIdCounter++;
            this._value = null;
            this.content = null;
            this.select = select;
            selectDispatcher.listen(function (id, name) {
                if (id !== _this.id && name === _this.name) {
                    _this.selected = false;
                }
            });
        }
        Object.defineProperty(Md2Option.prototype, "selected", {
            get: function () { return this._selected; },
            set: function (selected) {
                if (selected) {
                    this.selectDispatcher.notify(this.id, this.name);
                }
                this._selected = selected;
                if (selected && this.select.value !== this.value) {
                    this.select.selected = this;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Md2Option.prototype, "value", {
            get: function () { return this._value; },
            set: function (value) {
                if (this._value !== value) {
                    if (this.selected) {
                        this.select.value = value;
                    }
                    this._value = value;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Md2Option.prototype, "disabled", {
            get: function () {
                return this._disabled || (this.select.disabled);
            },
            set: function (disabled) {
                this._disabled = disabled;
            },
            enumerable: true,
            configurable: true
        });
        Md2Option.prototype.ngOnInit = function () {
            this.selected = this.select.value === this._value;
            this.name = this.select.name;
        };
        Md2Option.prototype.ngAfterViewInit = function () {
            this.content = this.element.nativeElement.innerHTML;
        };
        /**
         * on click to select option
         * @param event
         */
        Md2Option.prototype.onClick = function (event) {
            if (this.disabled) {
                event.preventDefault();
                event.stopPropagation();
                return;
            }
            this.select.selected = this;
            this.select.touch();
            this.select.onBlur();
        };
        __decorate([
            core_1.HostBinding('class.md2-option-focused'), 
            __metadata('design:type', Boolean)
        ], Md2Option.prototype, "focused", void 0);
        __decorate([
            core_1.HostBinding('id'),
            core_1.Input(), 
            __metadata('design:type', String)
        ], Md2Option.prototype, "id", void 0);
        __decorate([
            core_1.HostBinding('class.md2-option-selected'),
            core_1.Input(), 
            __metadata('design:type', Boolean)
        ], Md2Option.prototype, "selected", null);
        __decorate([
            core_1.Input(), 
            __metadata('design:type', Object)
        ], Md2Option.prototype, "value", null);
        __decorate([
            core_1.HostBinding('class.md2-option-disabled'),
            core_1.Input(), 
            __metadata('design:type', Boolean)
        ], Md2Option.prototype, "disabled", null);
        Md2Option = __decorate([
            core_1.Component({selector: 'md2-option',
                template: '<div class="md2-option-text"><ng-content></ng-content></div>',
                styles: ["\n    md2-option { cursor: pointer; position: relative; display: block; align-items: center; width: auto; -moz-transition: background 0.15s linear; -o-transition: background 0.15s linear; -webkit-transition: background 0.15s linear; transition: background 0.15s linear; padding: 0 16px; height: 48px; line-height: 48px; }\n    md2-option.md2-option-selected { color: #106cc8; }\n    md2-option:hover, md2-option.md2-option-focused { background: #eeeeee; }\n    md2-option.md2-option-disabled, md2-option.md2-option-disabled:hover { color: rgba(189,189,189,0.87); cursor: default; background: transparent; }\n    md2-option .md2-option-text { width: auto; white-space: nowrap; overflow: hidden; -ms-text-overflow: ellipsis; -o-text-overflow: ellipsis; text-overflow: ellipsis; font-size: 16px; }\n  "],
                host: {
                    'role': 'option',
                    '(click)': 'onClick($event)'
                },
                encapsulation: core_1.ViewEncapsulation.None
            }), 
            __metadata('design:paramtypes', [Md2Select, Md2SelectDispatcher, core_1.ElementRef])
        ], Md2Option);
        return Md2Option;
    }());
    exports.Md2Option = Md2Option;
    exports.MD2_SELECT_DIRECTIVES = [Md2Select, Md2Option];
    var Md2SelectModule = (function () {
        function Md2SelectModule() {
        }
        Md2SelectModule.forRoot = function () {
            return {
                ngModule: Md2SelectModule,
                providers: [Md2SelectDispatcher]
            };
        };
        Md2SelectModule = __decorate([
            core_1.NgModule({
                declarations: exports.MD2_SELECT_DIRECTIVES,
                imports: [common_1.CommonModule, forms_1.FormsModule],
                exports: exports.MD2_SELECT_DIRECTIVES,
            }), 
            __metadata('design:paramtypes', [])
        ], Md2SelectModule);
        return Md2SelectModule;
    }());
    exports.Md2SelectModule = Md2SelectModule;
});

//# sourceMappingURL=select.js.map
