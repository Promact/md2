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
import { Md2AutocompleteModule } from '../autocomplete/index';
import { ENTER, SPACE, BACKSPACE, DELETE, COMMA, LEFT_ARROW, RIGHT_ARROW } from '../core/keyboard/keycodes';
var Chip = (function () {
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
export { Chip };
var nextId = 0;
export var MD2_CHIPS_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return Md2Chips; }),
    multi: true
};
/** Change event object emitted by Md2Chips. */
var Md2ChipsChange = (function () {
    function Md2ChipsChange() {
    }
    return Md2ChipsChange;
}());
export { Md2ChipsChange };
var Md2Chips = (function () {
    function Md2Chips(elementRef) {
        this.elementRef = elementRef;
        this.tabindex = 0;
        this.addOnComma = true;
        this.addOnEnter = true;
        this.addOnPaste = true;
        this.addOnSpace = false;
        this.allowedPattern = /.+/;
        this.pasteSplitPattern = ',';
        this.placeholder = '';
        this.isAutoComplete = false;
        this.isRemovable = true;
        this.disabled = false;
        this.minChips = 0;
        this.maxChips = 10000;
        this.type = 'text';
        this.id = 'md2-chips-' + (++nextId);
        this.autocompleteItemText = 'text';
        this.autocompleteItemValue = 'value';
        this.textKey = 'text';
        this.valueKey = null;
        this.change = new EventEmitter();
        this._onChange = function () { };
        this._onTouched = function () { };
        this.chipItemList = [];
        this.inputValue = '';
        this.selectedChip = -1;
        this.inputFocused = false;
        this.autoCompleteFocued = false;
        this._value = '';
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
                    if (value && value.length && Array.isArray(value)) {
                        for (var i = 0; i < value.length; i++) {
                            this.chipItemList.push(new Chip(value[i], this.textKey, this.valueKey));
                        }
                    }
                }
            }
            this._emitChangeEvent();
        },
        enumerable: true,
        configurable: true
    });
    Md2Chips.prototype.getFocusAutocomplete = function () {
        this._onTouched();
    };
    Md2Chips.prototype.changeAutocomplete = function (value) {
        if (value) {
            this.addNewChip(value.value);
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
            case BACKSPACE:
                this.backspaceEvent();
                break;
            // delete
            case DELETE:
                this.backspaceEvent();
                break;
            // left arrow
            case LEFT_ARROW:
                if (this.isAutoComplete && this.isEmptyAutoComplete) {
                    this.leftArrowKeyEvents();
                }
                else if (!this.isAutoComplete && !this.inputValue) {
                    this.leftArrowKeyEvents();
                }
                break;
            // right arrow
            case RIGHT_ARROW:
                if (this.isAutoComplete && this.isEmptyAutoComplete) {
                    this.rightArrowKeyEvents();
                }
                else if (!this.isAutoComplete && !this.inputValue) {
                    this.rightArrowKeyEvents();
                }
                break;
            // enter
            case ENTER:
                if (this.addOnEnter) {
                    this.addNewChip(this.inputValue);
                    event.preventDefault();
                }
                break;
            // comma
            case COMMA:
                if (this.addOnComma) {
                    this.addNewChip(this.inputValue);
                    event.preventDefault();
                }
                break;
            // space
            case SPACE:
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
        if (this.disabled) {
            return;
        }
        if (!this.isAutoComplete) {
            this.elementRef.nativeElement.querySelector('input.chip-input').focus();
        }
        else {
            this.autoCompleteFocued = true;
            this._onTouched();
        }
        this._resetSelected();
    };
    Md2Chips.prototype.inputBlurred = function () {
        this.inputFocused = false;
        if (this.inputValue) {
            this.addNewChip(this.inputValue);
        }
        this._onTouched();
    };
    Md2Chips.prototype.inputFocus = function () {
        if (this.disabled) {
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
        var typeString = typeof chipString;
        if (typeString === 'string') {
            chipString = chipString.trim();
        }
        var isExist;
        isExist = this.chipItemList.filter(function (chip) { return chip.text === chipString; });
        if (this.chipItemList.indexOf(chipString) === -1 && (isExist.length ? false : true)) {
            return this.allowedPattern.test(chipString);
        }
    };
    /**
    * add new chip
    * @param chips
    */
    Md2Chips.prototype.addNewChip = function (chips) {
        var validInput = this._isValid(chips);
        if (validInput) {
            if (this.maxChips && this.maxChips < this.chipItemList.length - 1) {
                return;
            }
            else {
                this.chipItemList.push(new Chip(chips, this.autocompleteItemText, this.autocompleteItemValue));
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
        var _this = this;
        this._value = new Array();
        this._value = this.chipItemList.map(function (chip) {
            if (_this.valueKey) {
                var c = {};
                c[_this.textKey] = chip.text;
                c[_this.valueKey] = chip.value;
                return c;
            }
            else {
                return chip.value;
            }
        });
        this._emitChangeEvent();
    };
    /** Emits an event when the user selects a color. */
    Md2Chips.prototype._emitChangeEvent = function () {
        var event = new Md2ChipsChange();
        event.source = this;
        event.value = this._value;
        this._onChange(event.value);
        this.change.emit(event);
    };
    Md2Chips.prototype.writeValue = function (value) {
        if (value !== this._value) {
            this._value = value;
            this.chipItemList = [];
            if (value) {
                if (value && value.length && Array.isArray(value)) {
                    for (var i = 0; i < value.length; i++) {
                        this.chipItemList.push(new Chip(value[i], this.textKey, this.valueKey));
                    }
                }
            }
        }
    };
    Md2Chips.prototype.registerOnChange = function (fn) { this._onChange = fn; };
    Md2Chips.prototype.registerOnTouched = function (fn) { this._onTouched = fn; };
    return Md2Chips;
}());
__decorate([
    Input(),
    __metadata("design:type", Number)
], Md2Chips.prototype, "tabindex", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], Md2Chips.prototype, "addOnComma", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], Md2Chips.prototype, "addOnEnter", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], Md2Chips.prototype, "addOnPaste", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], Md2Chips.prototype, "addOnSpace", void 0);
__decorate([
    Input(),
    __metadata("design:type", RegExp)
], Md2Chips.prototype, "allowedPattern", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array)
], Md2Chips.prototype, "ngModel", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], Md2Chips.prototype, "pasteSplitPattern", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], Md2Chips.prototype, "placeholder", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array)
], Md2Chips.prototype, "autocompleteDataList", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], Md2Chips.prototype, "isAutoComplete", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], Md2Chips.prototype, "isRemovable", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], Md2Chips.prototype, "disabled", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number)
], Md2Chips.prototype, "minChips", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number)
], Md2Chips.prototype, "maxChips", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], Md2Chips.prototype, "type", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], Md2Chips.prototype, "id", void 0);
__decorate([
    Input('autocomplete-item-text'),
    __metadata("design:type", String)
], Md2Chips.prototype, "autocompleteItemText", void 0);
__decorate([
    Input('autocomplete-item-value'),
    __metadata("design:type", String)
], Md2Chips.prototype, "autocompleteItemValue", void 0);
__decorate([
    Input('item-text'),
    __metadata("design:type", String)
], Md2Chips.prototype, "textKey", void 0);
__decorate([
    Input('item-value'),
    __metadata("design:type", String)
], Md2Chips.prototype, "valueKey", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], Md2Chips.prototype, "change", void 0);
__decorate([
    ViewChild('chipInputForm'),
    __metadata("design:type", NgForm)
], Md2Chips.prototype, "chipInputForm", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], Md2Chips.prototype, "value", null);
__decorate([
    HostListener('focus'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Md2Chips.prototype, "_handleFocus", null);
Md2Chips = __decorate([
    Component({
        selector: 'md2-chips',
        template: "<div class=\"md2-chips-container\" [class.md2-chip-disabled]=\"disabled\" [class.md2-chip-remove]=\"!isRemovable\"><span *ngFor=\"let chip of chipItemList; let i = index\" class=\"md2-chip\" [class.active]=\"selectedChip === i\"><span>{{chip.text}}</span> <span [innerHTML]=\"templateHtmlString\"></span> <svg (click)=\"removeSelectedChip(i)\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" *ngIf=\"isRemovable\"><path d=\"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z\"/></svg></span><ng-content select=\".md2-template\"></ng-content><form #chipInputForm=\"ngForm\" class=\"chip-input-form\"><input *ngIf=\"!isAutoComplete\" class=\"chip-input\" [disabled]=\"disabled\" [type]=\"type\" [(ngModel)]=\"inputValue\" name=\"chipInput\" [placeholder]=\"placeholder\" (paste)=\"inputPaste($event)\" (keydown)=\"inputChanged($event)\" (blur)=\"inputBlurred()\" (focus)=\"inputFocus()\"><div *ngIf=\"isAutoComplete\"><md2-autocomplete name=\"autocomplete\" [placeholder]=\"placeholder\" [disabled]=\"disabled\" [(ngModel)]=\"item\" [items]=\"autocompleteDataList\" [item-text]=\"autocompleteItemText\" (textChange)=\"valueupdate($event)\" (change)=\"changeAutocomplete($event)\" (keydown)=\"inputChanged($event)\" (click)=\"getFocusAutocomplete()\"></md2-autocomplete></div></form></div><div class=\"chip-error\" *ngIf=\"this.chipItemList.length<this.minChips\">Minimum {{minChips}} chip required.</div><div class=\"chip-error\" *ngIf=\"this.chipItemList.length>=this.maxChips\">You are able to add Maximum {{maxChips}} chip.</div>",
        styles: [".template-content{display:inline}md2-chips{outline:0}md2-chips .md2-chips-container{display:block;box-shadow:0 1px #ccc;padding:5px 0;margin-bottom:10px;min-height:50px;box-sizing:border-box;clear:both}md2-chips .md2-chips-container::after{clear:both;content:'';display:table}md2-chips.chip-input-focus .md2-chips-container{box-shadow:0 2px #0d8bff}md2-chips .md2-chip-disabled{cursor:default}md2-chips md2-autocomplete{margin:0}md2-chips .md2-autocomplete-wrap{border-bottom:0!important}.md2-chip-remove .md2-chip{padding:0 12px}.md2-chip{font-size:14px;position:relative;cursor:default;border-radius:16px;display:block;height:32px;line-height:32px;margin:8px 8px 0 0;padding:0 28px 0 12px;float:left;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;box-sizing:border-box;max-width:100%;background:#e0e0e0;color:#424242;white-space:nowrap;overflow:hidden;-ms-text-overflow:ellipsis;-o-text-overflow:ellipsis;text-overflow:ellipsis}.md2-chip.active{color:#fff;background:#0d8bff}.md2-chip.active svg{color:rgba(255,255,255,.87)}.md2-chip svg{position:absolute;top:4px;right:4px;cursor:pointer;display:inline-block;overflow:hidden;fill:currentColor;color:rgba(0,0,0,.54)}.md2-template{display:none}.chip-input-disabled{pointer-events:none;cursor:default}.chip-input-form{display:inline-block;height:32px;margin:8px 8px 0 0}.chip-remove{cursor:pointer;display:inline-block;padding:0 3px;color:#616161;font-size:30px;vertical-align:top;line-height:21px;font-family:serif}.chip-input{display:inline-block;width:auto;border:0;outline:0;height:32px;line-height:32px;font-size:16px;background:0 0}.chip-error{font-size:13px;color:#fd0f0f}.md2-chips-container .chip-input-form .md2-autocomplete-wrap{border-bottom:0}.md2-chips-container .md2-autocomplete-wrap.is-focused .md2-autocomplete-placeholder{display:none}.md2-chips-container .md2-autocomplete-wrap .md2-autocomplete-placeholder.has-value{display:none}.md2-chips-container .md2-autocomplete-wrap svg{display:none}.md2-chips-container .md2-autocomplete-wrap .md2-autocomplete-input{height:32px;font-size:16px} /*# sourceMappingURL=chips.css.map */ "],
        providers: [MD2_CHIPS_CONTROL_VALUE_ACCESSOR],
        host: {
            'role': 'chips',
            '[id]': 'id',
            '[tabindex]': 'disabled ? -1 : tabindex',
            '[class.chip-input-focus]': 'inputFocused || selectedChip >= 0',
        },
        encapsulation: ViewEncapsulation.None
    }),
    __metadata("design:paramtypes", [ElementRef])
], Md2Chips);
export { Md2Chips };
export var MD2_CHIPS_DIRECTIVES = [Md2Chips];
var Md2ChipsModule = (function () {
    function Md2ChipsModule() {
    }
    return Md2ChipsModule;
}());
Md2ChipsModule = __decorate([
    NgModule({
        imports: [CommonModule, FormsModule, Md2AutocompleteModule],
        declarations: MD2_CHIPS_DIRECTIVES,
        exports: MD2_CHIPS_DIRECTIVES
    })
], Md2ChipsModule);
export { Md2ChipsModule };
//# sourceMappingURL=chips.js.map