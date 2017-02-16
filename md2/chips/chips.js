var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, forwardRef, Output, ViewChild, NgModule, ElementRef, EventEmitter, HostListener, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR, NgForm, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Md2AutocompleteModule } from '../autocomplete/autocomplete';
import { KeyCodes } from '../core/core';
var noop = function () { };
export var Chip = (function () {
    function Chip(source, textKey, valueKey) {
        if (typeof source === 'string') {
            this.text = this.value = source;
        }
        if (typeof source === 'object') {
            this.text = source[textKey];
            this.value = valueKey ? source[valueKey] : source;
        }
    }
    return Chip;
}());
var nextId = 0;
export var MD2_CHIPS_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return Md2Chips; }),
    multi: true
};
export var Md2Chips = (function () {
    function Md2Chips(elementRef) {
        this.elementRef = elementRef;
        this.tabindex = 0;
        this.addOnBlur = true;
        this.addOnComma = true;
        this.addOnEnter = true;
        this.addOnPaste = true;
        this.addOnSpace = false;
        this.allowedPattern = /.+/;
        this.pasteSplitPattern = ',';
        this.placeholder = 'Add New';
        this.isAutoComplete = false;
        this.isRemovable = true;
        this.readonly = false;
        this.minChips = 0;
        this.maxChips = 10000;
        this.id = 'md2-chips-' + (++nextId);
        this.autocompleteItemText = 'text';
        this.textKey = 'text';
        this.valueKey = null;
        this.change = new EventEmitter();
        this.onTouchedCallback = noop;
        this.onChangeCallback = noop;
        this.chipItemList = [];
        this.inputValue = '';
        this._value = '';
        this.selectedChip = -1;
        this.inputFocused = false;
        this.isEmptyAutoComplete = true;
    }
    Object.defineProperty(Md2Chips.prototype, "element", {
        get: function () {
            var elements = { root: this.elementRef.nativeElement, mainDiv: null, template: null };
            elements.mainDiv = elements.root.querySelector('.md2-chips-container');
            elements.template = elements.mainDiv.querySelector('.md2-template');
            return elements;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Chips.prototype, "value", {
        get: function () { return this._value; },
        set: function (value) { this.setValue(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Chips.prototype, "setValue", {
        /**
         * set value
         * @param value
         */
        set: function (value) {
            if (value !== this._value) {
                this._value = value;
                this.chipItemList = [];
                if (value) {
                    if (value && value.length && typeof value[0] === 'object' && Array.isArray(value)) {
                        for (var i = 0; i < value.length; i++) {
                            this.chipItemList.push(new Chip(value[i], this.textKey, this.valueKey));
                        }
                        this.isObject = true;
                    }
                    else if (value && value.length && typeof value[0] === 'string' && Array.isArray(value)) {
                        this.chipItemList = value;
                        this.isObject = false;
                    }
                }
            }
            this.onChangeCallback(value);
            this.change.emit(this.chipItemList);
        },
        enumerable: true,
        configurable: true
    });
    Md2Chips.prototype.changeAutocomplete = function (value) {
        if (value) {
            var objText = value[this.autocompleteItemText];
            this.addNewChip(objText);
            this.item = null;
        }
    };
    Md2Chips.prototype.ngAfterContentInit = function () {
        var elements = this.element;
        this.splitRegExp = new RegExp(this.pasteSplitPattern);
        if (elements.template) {
            this.templateHtmlString = elements.template.innerHTML;
        }
    };
    // check autocomplete input is empty or not
    Md2Chips.prototype.valueupdate = function (evt) {
        this.isEmptyAutoComplete = evt ? false : true;
    };
    /**
     * input key listener
     * @param event
     */
    Md2Chips.prototype.inputChanged = function (event) {
        var key = event.keyCode;
        switch (key) {
            // back space
            case KeyCodes.BACKSPACE:
                this.backspaceEvent();
                break;
            // delete
            case KeyCodes.DELETE:
                this.backspaceEvent();
                break;
            // left arrow
            case KeyCodes.LEFT_ARROW:
                if (this.isAutoComplete && this.isEmptyAutoComplete) {
                    this.leftArrowKeyEvents();
                }
                else if (!this.isAutoComplete && !this.inputValue) {
                    this.leftArrowKeyEvents();
                }
                break;
            // right arrow
            case KeyCodes.RIGHT_ARROW:
                if (this.isAutoComplete && this.isEmptyAutoComplete) {
                    this.rightArrowKeyEvents();
                }
                else if (!this.isAutoComplete && !this.inputValue) {
                    this.rightArrowKeyEvents();
                }
                break;
            // enter
            case KeyCodes.ENTER:
                if (this.addOnEnter) {
                    this.addNewChip(this.inputValue);
                    event.preventDefault();
                }
                break;
            // comma
            case KeyCodes.COMMA:
                if (this.addOnComma) {
                    this.addNewChip(this.inputValue);
                    event.preventDefault();
                }
                break;
            // space
            case KeyCodes.SPACE:
                if (this.addOnSpace) {
                    this.addNewChip(this.inputValue);
                    event.preventDefault();
                }
                break;
            default:
                break;
        }
    };
    Md2Chips.prototype._handleFocus = function () {
        if (this.readonly) {
            return;
        }
        if (!this.isAutoComplete) {
            this.elementRef.nativeElement.querySelector('input.chip-input').focus();
        }
        this._resetSelected();
    };
    Md2Chips.prototype.inputBlurred = function (event) {
        this.inputFocused = false;
    };
    Md2Chips.prototype.inputFocus = function (event) {
        if (this.readonly) {
            return;
        }
        this.inputFocused = true;
    };
    Md2Chips.prototype.inputPaste = function (event) {
        var _this = this;
        var clipboardData = event.clipboardData ||
            (event.originalEvent && event.originalEvent.clipboardData);
        var pastedString = clipboardData.getData('text/plain');
        var chips = this.addRegExpString(pastedString);
        var chipsToAdd = chips.filter(function (chip) { return _this._isValid(chip); });
        this.addNewChip(chipsToAdd);
        setTimeout(function () { return _this._resetInput(); });
    };
    Md2Chips.prototype.leftArrowKeyEvents = function () {
        event.preventDefault();
        if (this.selectedChip) {
            if (this.selectedChip < 0) {
                this.selectedChip = this.chipItemList.length - 1;
            }
            else {
                this.selectedChip = this.selectedChip - 1;
            }
        }
    };
    Md2Chips.prototype.rightArrowKeyEvents = function () {
        event.preventDefault();
        if (this.selectedChip != -1) {
            if (this.selectedChip >= this.chipItemList.length) {
                this.selectedChip = 0;
            }
            else {
                this.selectedChip = this.selectedChip + 1;
            }
        }
    };
    Md2Chips.prototype.addRegExpString = function (chipInputString) {
        chipInputString = chipInputString.trim();
        var chips = chipInputString.split(this.splitRegExp);
        return chips.filter(function (chip) { return !!chip; });
    };
    Md2Chips.prototype._isValid = function (chipString) {
        if (chipString) {
            var isExist = void 0;
            if (this.isObject) {
                isExist = this.chipItemList.filter(function (chip) { return chip.text === chipString; });
                return isExist.length ? false : true;
            }
            else if (this.chipItemList.indexOf(chipString) === -1) {
                return this.allowedPattern.test(chipString);
            }
        }
    };
    /**
    * add new chip
    * @param chips
    */
    Md2Chips.prototype.addNewChip = function (chips) {
        var validInput = this._isValid(chips);
        if (validInput) {
            if (this.maxChips) {
                if (this.chipItemList.length < this.maxChips) {
                    if (this.isObject && this.chipItemList.length > 0) {
                        var a = {};
                        a[this.textKey] = chips;
                        this.chipItemList.push(new Chip(a, this.textKey, this.valueKey));
                    }
                    else {
                        this.chipItemList.push(chips);
                    }
                }
            }
            else {
                this.chipItemList.push(new Chip(chips, this.textKey, this.valueKey));
                this.item = null;
            }
        }
        this._resetSelected();
        this._resetInput();
        this.updateValue();
    };
    /**
   * remove selected chip
   * @param chipIndexToRemove index of selected chip
   */
    Md2Chips.prototype.removeSelectedChip = function (chipIndexToRemove) {
        this.chipItemList.splice(chipIndexToRemove, 1);
        this._resetSelected();
        this.updateValue();
    };
    Md2Chips.prototype.backspaceEvent = function () {
        if (!this.inputValue.length && this.chipItemList.length &&
            this.isRemovable && this.isEmptyAutoComplete) {
            if (this.selectedChip != -1) {
                this.removeSelectedChip(this.selectedChip);
                this.selectedChip = this.chipItemList.length - 1;
            }
            else {
                this.selectedChip = this.chipItemList.length - 1;
            }
        }
    };
    Md2Chips.prototype._resetSelected = function () {
        this.selectedChip = -1;
    };
    Md2Chips.prototype._resetInput = function () {
        if (this.isAutoComplete) {
            this.chipInputForm.controls['autocomplete'].setValue('');
        }
        else {
            this.chipInputForm.controls['chipInput'].setValue('');
        }
    };
    /**
     * update value
     */
    Md2Chips.prototype.updateValue = function () {
        this._value = new Array();
        for (var i = 0; i < this.chipItemList.length; i++) {
            if (this.isObject) {
                this._value.push(this.chipItemList[i].value);
            }
            else {
                this._value.push(this.chipItemList[i]);
            }
        }
        this.onChangeCallback(this._value);
        this.change.emit(this._value);
    };
    Md2Chips.prototype.writeValue = function (value) {
        if (value !== this._value) {
            this._value = value;
            this.chipItemList = [];
            if (value) {
                if (value && value.length && typeof value[0] === 'object' && Array.isArray(value)) {
                    for (var i = 0; i < value.length; i++) {
                        this.chipItemList.push(new Chip(value[i], this.textKey, this.valueKey));
                    }
                    this.isObject = true;
                }
                else if (value && value.length && typeof value[0] === 'string' && Array.isArray(value)) {
                    this.chipItemList = value;
                    this.isObject = false;
                }
            }
        }
    };
    Md2Chips.prototype.registerOnChange = function (fn) { this.onChangeCallback = fn; };
    Md2Chips.prototype.registerOnTouched = function (fn) { this.onTouchedCallback = fn; };
    __decorate([
        Input(), 
        __metadata('design:type', Number)
    ], Md2Chips.prototype, "tabindex", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Boolean)
    ], Md2Chips.prototype, "addOnBlur", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Boolean)
    ], Md2Chips.prototype, "addOnComma", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Boolean)
    ], Md2Chips.prototype, "addOnEnter", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Boolean)
    ], Md2Chips.prototype, "addOnPaste", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Boolean)
    ], Md2Chips.prototype, "addOnSpace", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', RegExp)
    ], Md2Chips.prototype, "allowedPattern", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Array)
    ], Md2Chips.prototype, "ngModel", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', String)
    ], Md2Chips.prototype, "pasteSplitPattern", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', String)
    ], Md2Chips.prototype, "placeholder", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Array)
    ], Md2Chips.prototype, "autocompleteDataList", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Boolean)
    ], Md2Chips.prototype, "isAutoComplete", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Boolean)
    ], Md2Chips.prototype, "isRemovable", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Boolean)
    ], Md2Chips.prototype, "readonly", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Number)
    ], Md2Chips.prototype, "minChips", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Number)
    ], Md2Chips.prototype, "maxChips", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', String)
    ], Md2Chips.prototype, "id", void 0);
    __decorate([
        Input('autocomplete-item-text'), 
        __metadata('design:type', String)
    ], Md2Chips.prototype, "autocompleteItemText", void 0);
    __decorate([
        Input('item-text'), 
        __metadata('design:type', String)
    ], Md2Chips.prototype, "textKey", void 0);
    __decorate([
        Input('item-value'), 
        __metadata('design:type', String)
    ], Md2Chips.prototype, "valueKey", void 0);
    __decorate([
        Output(), 
        __metadata('design:type', EventEmitter)
    ], Md2Chips.prototype, "change", void 0);
    __decorate([
        ViewChild('chipInputForm'), 
        __metadata('design:type', NgForm)
    ], Md2Chips.prototype, "chipInputForm", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], Md2Chips.prototype, "value", null);
    __decorate([
        HostListener('focus'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], Md2Chips.prototype, "_handleFocus", null);
    Md2Chips = __decorate([
        Component({
            selector: 'md2-chips',
            template: "<div class=\"md2-chips-container\" [class.md2-chip-disabled]=\"readonly\"> <span *ngFor=\"let chip of chipItemList; let i = index\" class=\"md2-chip\" [class.active]=\"selectedChip === i\"> <span *ngIf=\"isObject\">{{chip.text}}</span> <span *ngIf=\"!isObject\">{{chip}}</span> <span [innerHTML]=\"templateHtmlString\"></span> <svg (click)=\"removeSelectedChip(i)\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" *ngIf=\"isRemovable\"> <path d=\"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z\" /> </svg> </span> <ng-content select=\".md2-template\"></ng-content> <form #chipInputForm=\"ngForm\" class=\"chip-input-form\" *ngIf=\"!readonly\"> <input *ngIf=\"!isAutoComplete\" class=\"chip-input\" type=\"text\" [(ngModel)]=\"inputValue\" name=\"chipInput\" [placeholder]=\"placeholder\" (paste)=\"inputPaste($event)\" (keydown)=\"inputChanged($event)\" (blur)=\"inputBlurred($event)\" (focus)=\"inputFocus()\" /> <div *ngIf=\"isAutoComplete\"> <md2-autocomplete [items]=\"autocompleteDataList\" [item-text]=\"autocompleteItemText\" [(ngModel)]=\"item\" name=\"autocomplete\" (textChange)=\"valueupdate($event)\" (change)=\"changeAutocomplete($event)\" [placeholder]=\"placeholder\" (keydown)=\"inputChanged($event)\"> </md2-autocomplete> </div> </form> </div> <div class=\"chip-error\" *ngIf=\"this.chipItemList.length<this.minChips\">Minimum {{minChips}} chip required.</div> <div class=\"chip-error\" *ngIf=\"this.chipItemList.length>=this.maxChips\">You are able to add Maximum {{maxChips}} chip.</div> ",
            styles: [".template-content { display: inline; } md2-chips { outline: none; } md2-chips .md2-chips-container { display: block; box-shadow: 0 1px #ccc; padding: 5px 0; margin-bottom: 10px; min-height: 50px; box-sizing: border-box; clear: both; } md2-chips .md2-chips-container::after { clear: both; content: ''; display: table; } md2-chips.chip-input-focus .md2-chips-container { box-shadow: 0 2px #0d8bff; } md2-chips .md2-chip-disabled { cursor: default; } md2-chips md2-autocomplete { margin: 0; } md2-chips .md2-autocomplete-wrap { border-bottom: 0 !important; } .md2-chip { font-size: 16px; position: relative; cursor: default; border-radius: 16px; display: block; height: 32px; line-height: 32px; margin: 8px 8px 0 0; padding: 0 28px 0 12px; float: left; box-sizing: border-box; max-width: 100%; background: #e0e0e0; color: #424242; white-space: nowrap; overflow: hidden; -ms-text-overflow: ellipsis; text-overflow: ellipsis; } .md2-chip.active { color: white; background: #0d8bff; } .md2-chip.active svg { color: rgba(255, 255, 255, 0.87); } .md2-chip svg { position: absolute; top: 4px; right: 4px; cursor: pointer; display: inline-block; overflow: hidden; fill: currentColor; color: rgba(0, 0, 0, 0.54); } .md2-template { display: none; } .chip-input-disabled { pointer-events: none; cursor: default; } .chip-input-form { display: inline-block; height: 32px; margin: 8px 8px 0 0; } .chip-remove { cursor: pointer; display: inline-block; padding: 0 3px; color: #616161; font-size: 30px; vertical-align: top; line-height: 21px; font-family: serif; } .chip-input { display: inline-block; width: auto; border: 0; outline: none; height: 32px; line-height: 32px; font-size: 16px; } .chip-error { font-size: 13px; color: #fd0f0f; } .md2-chips-container .chip-input-form .md2-autocomplete-wrap { border-bottom: 0; } .md2-chips-container .md2-autocomplete-wrap.is-focused .md2-autocomplete-placeholder { display: none; } .md2-chips-container .md2-autocomplete-wrap .md2-autocomplete-placeholder.has-value { display: none; } .md2-chips-container .md2-autocomplete-wrap svg { display: none; } .md2-chips-container .md2-autocomplete-wrap .md2-autocomplete-input { height: 32px; font-size: 16px; } /*# sourceMappingURL=chips.css.map */ "],
            providers: [MD2_CHIPS_CONTROL_VALUE_ACCESSOR],
            host: {
                'role': 'chips',
                '[id]': 'id',
                '[tabindex]': 'readonly ? -1 : tabindex',
                '[class.chip-input-focus]': 'inputFocused || selectedChip >= 0',
            },
            encapsulation: ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [ElementRef])
    ], Md2Chips);
    return Md2Chips;
}());
export var MD2_CHIPS_DIRECTIVES = [Md2Chips];
export var Md2ChipsModule = (function () {
    function Md2ChipsModule() {
    }
    Md2ChipsModule.forRoot = function () {
        return {
            ngModule: Md2ChipsModule,
            providers: []
        };
    };
    Md2ChipsModule = __decorate([
        NgModule({
            imports: [CommonModule, FormsModule, Md2AutocompleteModule],
            declarations: MD2_CHIPS_DIRECTIVES,
            exports: MD2_CHIPS_DIRECTIVES
        }), 
        __metadata('design:paramtypes', [])
    ], Md2ChipsModule);
    return Md2ChipsModule;
}());
//# sourceMappingURL=chips.js.map