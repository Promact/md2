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
        define(["require", "exports", '@angular/core', '@angular/forms', '@angular/common', 'md2/autocomplete/autocomplete'], factory);
    }
})(function (require, exports) {
    "use strict";
    var core_1 = require('@angular/core');
    var forms_1 = require('@angular/forms');
    var common_1 = require('@angular/common');
    //import { HightlightPipe } from '../autocomplete/autocomplete.pipe';
    var autocomplete_1 = require('md2/autocomplete/autocomplete');
    var noop = function () { };
    var nextId = 0;
    var Tag = (function () {
        function Tag(source, textKey, valueKey) {
            if (typeof source === 'string') {
                this.text = this.value = source;
            }
            if (typeof source === 'object') {
                this.text = source[textKey];
                this.value = valueKey ? source[valueKey] : source;
            }
        }
        return Tag;
    }());
    exports.MD2_TAGS_CONTROL_VALUE_ACCESSOR = {
        provide: forms_1.NG_VALUE_ACCESSOR,
        useExisting: core_1.forwardRef(function () { return Md2Tags; }),
        multi: true
    };
    var Md2Tags = (function () {
        function Md2Tags(element) {
            this.element = element;
            this.change = new core_1.EventEmitter();
            this._value = '';
            this._disabled = false;
            this._onTouchedCallback = noop;
            this._onChangeCallback = noop;
            this._tags = [];
            this.list = [];
            this.items = [];
            this.focusedTag = 0;
            this.selectedTag = -1;
            this.tagBuffer = '';
            this.inputFocused = false;
            this.noBlur = true;
            this.id = 'md2-tags-' + (++nextId);
            this.tabindex = 0;
            this.placeholder = '';
            this.textKey = 'text';
            this.valueKey = null;
            this.selectAndFocusTagSafe = function (index) {
                if (!this.items.length) {
                    this.selectTag(-1);
                    this.onFocus();
                    return;
                }
                if (index === this.items.length) {
                    return this.onFocus();
                }
                index = Math.max(index, 0);
                index = Math.min(index, this.items.length - 1);
                this.selectTag(index);
            };
        }
        Object.defineProperty(Md2Tags.prototype, "disabled", {
            get: function () { return this._disabled; },
            set: function (value) {
                this._disabled = (value !== null && value !== false) ? true : null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Md2Tags.prototype, "tags", {
            set: function (value) {
                this._tags = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Md2Tags.prototype, "value", {
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
         * setup value
         * @param value
         */
        Md2Tags.prototype.setValue = function (value) {
            var _this = this;
            if (value !== this._value) {
                this._value = value;
                this.items = [];
                if (value && value.length && typeof value === 'object' && Array.isArray(value)) {
                    var _loop_1 = function(i) {
                        var selItm = this_1._tags.find(function (t) { return _this.equals(_this.valueKey ? t[_this.valueKey] : t, value[i]); });
                        if (selItm) {
                            this_1.items.push(new Tag(selItm, this_1.textKey, this_1.valueKey));
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
        Md2Tags.prototype.equals = function (o1, o2) {
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
        Object.defineProperty(Md2Tags.prototype, "isMenuVisible", {
            get: function () {
                return ((this.inputFocused || this.noBlur) && this.tagBuffer && this.list && this.list.length) ? true : false;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * update scroll of tags suggestion menu
         */
        Md2Tags.prototype.updateScroll = function () {
            if (this.focusedTag < 0) {
                return;
            }
            var menuContainer = this.element.nativeElement.querySelector('.md2-tags-menu');
            if (!menuContainer) {
                return;
            }
            var choices = menuContainer.querySelectorAll('.md2-option');
            if (choices.length < 1) {
                return;
            }
            var highlighted = choices[this.focusedTag];
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
         * input key listener
         * @param event
         */
        Md2Tags.prototype.inputKeydown = function (event) {
            var _this = this;
            // Backspace
            if (event.keyCode === 8 && !this.tagBuffer) {
                event.preventDefault();
                event.stopPropagation();
                if (this.items.length && this.selectedTag < 0) {
                    this.selectAndFocusTagSafe(this.items.length - 1);
                }
                if (this.items.length && this.selectedTag > -1) {
                    this.removeAndSelectAdjacentTag(this.selectedTag);
                }
                return;
            }
            // Del Key
            if (event.keyCode === 46 && !this.tagBuffer) {
                return;
            }
            // Left / Right Arrow
            if ((event.keyCode === 37 || event.keyCode === 39) && !this.tagBuffer) {
                return;
            }
            // Down Arrow
            if (event.keyCode === 40) {
                if (!this.isMenuVisible) {
                    return;
                }
                event.stopPropagation();
                event.preventDefault();
                this.focusedTag = (this.focusedTag === this.list.length - 1) ? 0 : Math.min(this.focusedTag + 1, this.list.length - 1);
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
                this.focusedTag = (this.focusedTag === 0) ? this.list.length - 1 : Math.max(0, this.focusedTag - 1);
                this.updateScroll();
                return;
            }
            // Tab Key
            if (event.keyCode === 9) {
                return;
            }
            // Enter / Space
            if (event.keyCode === 13 || event.keyCode === 32) {
                if (!this.tagBuffer || !this.isMenuVisible) {
                    event.preventDefault();
                    return;
                }
                event.preventDefault();
                this.addTag(event, this.focusedTag);
                return;
            }
            // Escape Key
            if (event.keyCode === 27) {
                event.stopPropagation();
                event.preventDefault();
                if (this.tagBuffer) {
                    this.tagBuffer = '';
                }
                if (this.selectedTag >= 0) {
                    this.onFocus();
                }
                return;
            }
            // reset selected tag
            if (this.selectedTag >= 0) {
                this.resetselectedTag();
            }
            // filter
            setTimeout(function () {
                _this.filterMatches(new RegExp(_this.tagBuffer, 'ig'));
            }, 10);
        };
        Md2Tags.prototype.onKeydown = function (event) {
            if (this.tagBuffer || this.disabled) {
                return;
            }
            // Backspace / Del Key
            if (event.keyCode === 8 || event.keyCode === 46) {
                if (this.selectedTag < 0) {
                    return;
                }
                event.preventDefault();
                this.removeAndSelectAdjacentTag(this.selectedTag);
            }
            // Left Arrow
            if (event.keyCode === 37) {
                event.preventDefault();
                if (this.selectedTag < 0) {
                    this.selectedTag = this.items.length;
                }
                if (this.items.length) {
                    this.selectAndFocusTagSafe(this.selectedTag - 1);
                }
            }
            // Right Arrow
            if (event.keyCode === 39) {
                event.preventDefault();
                if (this.selectedTag >= this.items.length) {
                    this.selectedTag = -1;
                }
                this.selectAndFocusTagSafe(this.selectedTag + 1);
            }
            // Escape / Tab Key
            if (event.keyCode === 27 || event.keyCode === 9) {
                if (this.selectedTag < 0) {
                    return;
                }
                event.preventDefault();
                this.onFocus();
            }
        };
        Md2Tags.prototype.removeAndSelectAdjacentTag = function (index) {
            var selIndex = this.getAdjacentTagIndex(index);
            this.removeTag(index);
            this.selectAndFocusTagSafe(selIndex);
        };
        Md2Tags.prototype.resetselectedTag = function () {
            this.selectedTag = -1;
        };
        Md2Tags.prototype.getAdjacentTagIndex = function (index) {
            var len = this.items.length - 1;
            return (len === 0) ? -1 :
                (index === len) ? index - 1 : index;
        };
        /**
         * add tag
         * @param event
         * @param index index of the specific tag
         */
        Md2Tags.prototype.addTag = function (event, index) {
            event.preventDefault();
            event.stopPropagation();
            this.items.push(this.list[index]);
            this.tagBuffer = '';
            this.updateValue();
        };
        Md2Tags.prototype.removeTagAndFocusInput = function (index) {
            this.removeTag(index);
            this.onFocus();
        };
        /**
         * remove tag
         * @param index
         */
        Md2Tags.prototype.removeTag = function (index) {
            this.items.splice(index, 1);
            this.updateValue();
        };
        /**
         * update value
         */
        Md2Tags.prototype.updateValue = function () {
            this._value = new Array();
            for (var i = 0; i < this.items.length; i++) {
                this._value.push(this.items[i].value);
            }
            this._onChangeCallback(this._value);
            this.change.emit(this._value);
        };
        /**
         * select tag
         * @param index of select tag
         */
        Md2Tags.prototype.selectTag = function (index) {
            if (index >= -1 && index <= this.items.length) {
                this.selectedTag = index;
            }
        };
        Md2Tags.prototype.onFocus = function () {
            this.element.nativeElement.querySelector('input').focus();
            this.resetselectedTag();
        };
        Md2Tags.prototype.onInputFocus = function () {
            this.inputFocused = true;
            this.resetselectedTag();
        };
        Md2Tags.prototype.onInputBlur = function () {
            this.inputFocused = false;
        };
        Md2Tags.prototype.listEnter = function () { this.noBlur = true; };
        Md2Tags.prototype.listLeave = function () { this.noBlur = false; };
        /**
         * update suggestion menu with filter
         * @param query
         */
        Md2Tags.prototype.filterMatches = function (query) {
            var _this = this;
            var tempList = this._tags.map(function (tag) { return new Tag(tag, _this.textKey, _this.valueKey); });
            this.list = tempList.filter(function (t) { return (query.test(t.text) && !_this.items.find(function (i) { return t.text === i.text; })); });
            if (this.list.length > 0) {
                this.focusedTag = 0;
            }
        };
        Md2Tags.prototype.writeValue = function (value) {
            this.setValue(value);
        };
        Md2Tags.prototype.registerOnChange = function (fn) { this._onChangeCallback = fn; };
        Md2Tags.prototype.registerOnTouched = function (fn) { this._onTouchedCallback = fn; };
        __decorate([
            core_1.Output(), 
            __metadata('design:type', core_1.EventEmitter)
        ], Md2Tags.prototype, "change", void 0);
        __decorate([
            core_1.Input(), 
            __metadata('design:type', String)
        ], Md2Tags.prototype, "id", void 0);
        __decorate([
            core_1.Input(), 
            __metadata('design:type', Boolean)
        ], Md2Tags.prototype, "disabled", null);
        __decorate([
            core_1.Input(), 
            __metadata('design:type', Number)
        ], Md2Tags.prototype, "tabindex", void 0);
        __decorate([
            core_1.Input(), 
            __metadata('design:type', String)
        ], Md2Tags.prototype, "placeholder", void 0);
        __decorate([
            core_1.Input('md2-tag-text'), 
            __metadata('design:type', String)
        ], Md2Tags.prototype, "textKey", void 0);
        __decorate([
            core_1.Input('md2-tag-value'), 
            __metadata('design:type', String)
        ], Md2Tags.prototype, "valueKey", void 0);
        __decorate([
            core_1.Input('md2-tags'), 
            __metadata('design:type', Array), 
            __metadata('design:paramtypes', [Array])
        ], Md2Tags.prototype, "tags", null);
        __decorate([
            core_1.Input(), 
            __metadata('design:type', Object)
        ], Md2Tags.prototype, "value", null);
        __decorate([
            core_1.HostListener('keydown', ['$event']), 
            __metadata('design:type', Function), 
            __metadata('design:paramtypes', [KeyboardEvent]), 
            __metadata('design:returntype', void 0)
        ], Md2Tags.prototype, "onKeydown", null);
        __decorate([
            core_1.HostListener('focus'), 
            __metadata('design:type', Function), 
            __metadata('design:paramtypes', []), 
            __metadata('design:returntype', void 0)
        ], Md2Tags.prototype, "onFocus", null);
        Md2Tags = __decorate([
            core_1.Component({selector: 'md2-tags',
                template: "\n    <div class=\"md2-tags-container\">\n      <span *ngFor=\"let t of items; let i = index;\" class=\"md2-tag\" [class.active]=\"selectedTag === i\" (click)=\"selectTag(i)\">\n        <span class=\"md2-tag-text\">{{t.text}}</span>\n        <svg (click)=\"removeTagAndFocusInput(i)\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\">\n          <path d=\"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z\" />\n        </svg>\n      </span>\n      <span class=\"md2-tag-add\">\n        <input [(ngModel)]=\"tagBuffer\" type=\"text\" tabs=\"false\" autocomplete=\"off\" tabindex=\"-1\" [disabled]=\"disabled\" class=\"md2-tags-input\" [placeholder]=\"placeholder\" (focus)=\"onInputFocus()\" (blur)=\"onInputBlur()\" (keydown)=\"inputKeydown($event)\" (change)=\"$event.stopPropagation()\" />\n        <ul *ngIf=\"isMenuVisible\" class=\"md2-tags-menu\" (mouseenter)=\"listEnter()\" (mouseleave)=\"listLeave()\">\n          <li class=\"md2-option\" *ngFor=\"let l of list; let i = index;\" [class.focused]=\"focusedTag === i\" (click)=\"addTag($event, i)\">\n            <span class=\"md2-option-text\" [innerHtml]=\"l.text | hightlight:tagBuffer\"></span>\n          </li>\n        </ul>\n      </span>\n    </div>\n  ",
                styles: ["\n    md2-tags { -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; -moz-backface-visibility: hidden; -webkit-backface-visibility: hidden; backface-visibility: hidden; }\n    md2-tags:focus { outline: none; }\n    md2-tags .md2-tags-container { position: relative; display: block; max-width: 100%; padding: 2px 3px 8px; border-bottom: 1px solid rgba(0, 0, 0, 0.38); -moz-box-sizing: content-box; -webkit-box-sizing: content-box; box-sizing: content-box; min-width: 64px; min-height: 26px; cursor: text; }\n    md2-tags .md2-tags-container:before, .md2-tags .md2-tags-container:after { display: table; content: \" \"; }\n    md2-tags .md2-tags-container:after { clear: both; }\n    md2-tags.focus .md2-tags-container { padding-bottom: 7px; border-bottom: 2px solid #106cc8; }\n    md2-tags.md2-tags-disabled .md2-tags-container { color: rgba(0,0,0,0.38); cursor: default; }\n    md2-tags.md2-tags-disabled.focus .md2-tags-container { padding-bottom: 8px; border-bottom: 1px solid rgba(0, 0, 0, 0.38); }\n    md2-tags .md2-tags-container .md2-tag { position: relative; cursor: default; border-radius: 16px; display: block; height: 32px; line-height: 32px; margin: 8px 8px 0 0; padding: 0 26px 0 12px; float: left; -moz-box-sizing: border-box; -webkit-box-sizing: border-box; box-sizing: border-box; max-width: 100%; background: rgb(224,224,224); color: rgb(66,66,66); white-space: nowrap; overflow: hidden; -ms-text-overflow: ellipsis; -o-text-overflow: ellipsis; text-overflow: ellipsis; }\n    md2-tags .md2-tags-container .md2-tag.active { background: #106cc8; color: rgba(255,255,255,0.87); }\n    md2-tags .md2-tags-container .md2-tag svg { position: absolute; top: 4px; right: 2px; cursor: pointer; display: inline-block; overflow: hidden;fill: currentColor; color: rgba(0,0,0,0.54); }\n    md2-tags .md2-tag.active svg { color: rgba(255,255,255,0.87); }\n    md2-tags .md2-tag-add { position: relative; display: inline-block; }\n    md2-tags input { border: 0; outline: 0; margin-top: 8px; height: 32px; line-height: 32px; padding: 0; color: rgba(0,0,0,0.87); background: 0 0; }\n    md2-tags .md2-tags-container .md2-tags-placeholder { color: rgba(0, 0, 0, 0.38); }\n    md2-tags .md2-tags-menu { position: absolute; left: 0; top: 100%; display: block; z-index: 10; -ms-flex-direction: column; -webkit-flex-direction: column; flex-direction: column; width: 100%; margin: 6px 0 0; padding: 8px 0; box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 2px 1px -1px rgba(0, 0, 0, 0.12); max-height: 256px; min-height: 48px; overflow-y: auto; -moz-transform: scale(1); -ms-transform: scale(1); -o-transform: scale(1); -webkit-transform: scale(1); transform: scale(1); background: #fff; }\n    md2-tags .md2-tags-menu .md2-option { cursor: pointer; position: relative; display: block; align-items: center; width: auto; -moz-transition: background 0.15s linear; -o-transition: background 0.15s linear; -webkit-transition: background 0.15s linear; transition: background 0.15s linear; padding: 0 16px; height: 48px; line-height: 48px; }\n    md2-tags .md2-tags-menu .md2-option:hover, .md2-tags .md2-tags-menu .md2-option.focused { background: #eeeeee; }\n    md2-tags .md2-tags-menu .md2-option .md2-option-text { width: auto; white-space: nowrap; overflow: hidden; -ms-text-overflow: ellipsis; -o-text-overflow: ellipsis; text-overflow: ellipsis; font-size: 16px; }\n    md2-tags .highlight { color: #757575; }\n  "],
                host: {
                    'role': 'tags',
                    '[id]': 'id',
                    '[class.focus]': 'inputFocused || selectedTag >= 0',
                    '[class.md2-tags-disabled]': 'disabled',
                    '[tabindex]': 'disabled ? -1 : tabindex',
                    '[attr.aria-disabled]': 'disabled'
                },
                providers: [exports.MD2_TAGS_CONTROL_VALUE_ACCESSOR],
                encapsulation: core_1.ViewEncapsulation.None
            }), 
            __metadata('design:paramtypes', [core_1.ElementRef])
        ], Md2Tags);
        return Md2Tags;
    }());
    exports.Md2Tags = Md2Tags;
    exports.MD2_TAGS_DIRECTIVES = [Md2Tags];
    var Md2TagsModule = (function () {
        function Md2TagsModule() {
        }
        Md2TagsModule.forRoot = function () {
            return {
                ngModule: Md2TagsModule,
                providers: []
            };
        };
        Md2TagsModule = __decorate([
            core_1.NgModule({
                declarations: exports.MD2_TAGS_DIRECTIVES,
                imports: [common_1.CommonModule, forms_1.FormsModule, autocomplete_1.Md2AutocompleteModule],
                exports: exports.MD2_TAGS_DIRECTIVES,
            }), 
            __metadata('design:paramtypes', [])
        ], Md2TagsModule);
        return Md2TagsModule;
    }());
    exports.Md2TagsModule = Md2TagsModule;
});

//# sourceMappingURL=tags.js.map
