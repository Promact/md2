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
var nextId = 0;
export var MD2_CHIPS_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return Md2Chips; }),
    multi: true
};
export var Md2Chips = (function () {
    function Md2Chips(elementRef) {
        this.elementRef = elementRef;
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
        this.change = new EventEmitter();
        this.onTouchedCallback = noop;
        this.onChangeCallback = noop;
        this.chipItemList = [];
        this.inputValue = '';
        this.selectedChip = -1;
        this.isFocused = false;
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
        get: function () {
            return this.value;
        },
        /**
         * set value
         * @param value
         */
        set: function (v) {
            this.onChangeCallback(v);
            this.change.emit(v);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Md2Chips.prototype.changeAutocomplete = function (value) {
        if (value) {
            this.addNewChip([value]);
            this.item = null;
        }
    };
    Md2Chips.prototype.ngAfterContentInit = function () {
        var elements = this.element;
        if (this.ngModel) {
            this.chipItemList = this.ngModel;
        }
        this.splitRegExp = new RegExp(this.pasteSplitPattern);
        if (elements.template) {
            this.templateHtmlString = elements.template.innerHTML;
        }
    };
    /**
     * input key listener
     * @param event
     */
    Md2Chips.prototype.inputChanged = function (event) {
        var key = event.keyCode;
        switch (key) {
            //back space
            case KeyCodes.BACKSPACE:
                this.backspaceEvent();
                break;
            //delete
            case KeyCodes.DELETE:
                this.backspaceEvent();
                break;
            //left arrow
            case KeyCodes.LEFT_ARROW:
                event.preventDefault();
                if (this.selectedChip) {
                    if (this.selectedChip < 0) {
                        this.selectedChip = this.chipItemList.length - 1;
                    }
                    else {
                        this.selectedChip = this.selectedChip - 1;
                    }
                }
                break;
            //right arrow
            case KeyCodes.RIGHT_ARROW:
                event.preventDefault();
                if (this.selectedChip != -1) {
                    if (this.selectedChip >= this.chipItemList.length) {
                        this.selectedChip = 0;
                    }
                    else {
                        this.selectedChip = this.selectedChip + 1;
                    }
                }
                break;
            //enter
            case KeyCodes.ENTER:
                if (this.addOnEnter) {
                    this.addNewChip([this.inputValue]);
                    event.preventDefault();
                }
                break;
            //comma
            case KeyCodes.COMMA:
                if (this.addOnComma) {
                    this.addNewChip([this.inputValue]);
                    event.preventDefault();
                }
                break;
            //space
            case KeyCodes.SPACE:
                if (this.addOnSpace) {
                    this.addNewChip([this.inputValue]);
                    event.preventDefault();
                }
                break;
            default:
                break;
        }
    };
    Md2Chips.prototype.inputBlurred = function (event) {
        if (this.addOnBlur && !this.readonly) {
            this.addNewChip([this.inputValue]);
        }
        this.isFocused = false;
    };
    Md2Chips.prototype.inputFocus = function (event) {
        this.isFocused = true;
    };
    Md2Chips.prototype.inputPaste = function (event) {
        var _this = this;
        var clipboardData = event.clipboardData || (event.originalEvent && event.originalEvent.clipboardData);
        var pastedString = clipboardData.getData('text/plain');
        var chips = this.addRegExpString(pastedString);
        var chipsToAdd = chips.filter(function (chip) { return _this._isValid(chip); });
        this.addNewChip(chipsToAdd);
        setTimeout(function () { return _this._resetInput(); });
    };
    Md2Chips.prototype.addRegExpString = function (chipInputString) {
        chipInputString = chipInputString.trim();
        var chips = chipInputString.split(this.splitRegExp);
        return chips.filter(function (chip) { return !!chip; });
    };
    Md2Chips.prototype._isValid = function (chipString) {
        if (this.chipItemList.indexOf(chipString) === -1)
            return this.allowedPattern.test(chipString);
    };
    /**
    * add new chip
    * @param chips
    */
    Md2Chips.prototype.addNewChip = function (chips) {
        var _this = this;
        var validInput = chips.filter(function (chip) { return _this._isValid(chip); });
        if (this.maxChips) {
            if (this.chipItemList.length < this.maxChips) {
                this.chipItemList = this.chipItemList.concat(validInput.map(function (chip) { return chip.trim(); }));
            }
        }
        else {
            this.chipItemList = this.chipItemList.concat(validInput.map(function (chip) { return chip.trim(); }));
            this.item = null;
        }
        this._resetSelected();
        this._resetInput();
        this.onChangeCallback(this.chipItemList);
        this.change.emit(this.chipItemList);
    };
    /**
   * remove selected chip
   * @param chipIndexToRemove index of selected chip
   */
    Md2Chips.prototype.removeSelectedChip = function (chipIndexToRemove) {
        this.chipItemList.splice(chipIndexToRemove, 1);
        this._resetSelected();
        this.onChangeCallback(this.chipItemList);
        this.change.emit(this.chipItemList);
    };
    /**
    * select chip
    * @param index of select chip
    */
    Md2Chips.prototype.selectChip = function (index) {
        if (index >= -1 && index <= this.chipItemList.length) {
            this.selectedChip = index;
        }
    };
    Md2Chips.prototype.backspaceEvent = function () {
        if (!this.inputValue.length && this.chipItemList.length && this.isRemovable) {
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
    Md2Chips.prototype.writeValue = function (value) {
        this.value = value;
        this.chipItemList = value;
    };
    Md2Chips.prototype.registerOnChange = function (fn) { this.onChangeCallback = fn; };
    Md2Chips.prototype.registerOnTouched = function (fn) { this.onTouchedCallback = fn; };
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
        Output(), 
        __metadata('design:type', EventEmitter)
    ], Md2Chips.prototype, "change", void 0);
    __decorate([
        ViewChild('chipInputForm'), 
        __metadata('design:type', NgForm)
    ], Md2Chips.prototype, "chipInputForm", void 0);
    __decorate([
        HostListener('focus'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Event]), 
        __metadata('design:returntype', void 0)
    ], Md2Chips.prototype, "inputBlurred", null);
    Md2Chips = __decorate([
        Component({
            selector: 'md2-chips',
            template: "<div class=\"md2-chips-container\" [class.md2-chip-disabled]=\"readonly\">\n        <span *ngFor=\"let chip of chipItemList; let i = index\" class=\"md2-chip\" [class.active]=\"selectedChip === i\">\n            <span>{{chip}}</span>\n            <span [innerHTML]=\"templateHtmlString\"></span>\n            <svg (click)=\"removeSelectedChip(i)\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"  *ngIf=\"isRemovable\">\n              <path d=\"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z\" />\n            </svg>            \n        </span>\n        <ng-content select=\".md2-template\"></ng-content>      \n        <form #chipInputForm=\"ngForm\" class=\"chip-input-form\" *ngIf=\"!readonly\">\n            <input *ngIf=\"!isAutoComplete\" class=\"chip-input\" type=\"text\" [(ngModel)]=\"inputValue\" name=\"chipInput\" [placeholder]=\"placeholder\" (paste)=\"inputPaste($event)\" (keydown)=\"inputChanged($event)\" (blur)=\"inputBlurred($event)\" (focus)=\"inputFocus()\"/>\n            <div *ngIf=\"isAutoComplete\">\n                <md2-autocomplete [items]=\"autocompleteDataList\"\n                                item-text=\"name\"\n                                [(ngModel)]=\"item\" name=\"autocomplete\" (change)=\"changeAutocomplete($event)\" [placeholder]=\"placeholder\" (keydown)=\"inputChanged($event)\">\n\t\t        </md2-autocomplete>\n            </div>\n        </form>\n    </div>   \n    <div class=\"chip-error\" *ngIf=\"this.chipItemList.length<this.minChips\">Minimum {{minChips}} chip required.</div>\n    <div class=\"chip-error\" *ngIf=\"this.chipItemList.length>=this.maxChips\">You are able to add Maximum {{maxChips}} chip.</div>\n",
            styles: ["\n    .template-content{display:inline;}\n    md2-chips{outline:none;}\n    md2-chips .md2-chips-container{display: block;box-shadow: 0 1px #ccc;padding: 5px 0;margin-bottom:10px;min-height:50px;box-sizing: border-box;clear:both;}\n    md2-chips .md2-chips-container:after{clear:both;content:'';display:table;}\n    md2-chips.chip-input-focus .md2-chips-container{box-shadow: 0 2px #0d8bff;}\n    md2-chips .md2-chip-disabled{cursor: default;}\n    md2-chips md2-autocomplete{margin:7px 0;}\n    md2-chips .md2-autocomplete-wrap{border-bottom:0 !important;}\n    .md2-template{display:none;}\n    .chip-input-disabled{pointer-events: none;cursor: default;}\n    .md2-chip{font-size: 16px;position: relative;cursor: default;border-radius: 16px;display: block;height: 32px;line-height: 32px;margin: 8px 8px 0 0;padding: 0 28px 0 12px;float: left;-moz-box-sizing: border-box;-webkit-box-sizing: border-box;box-sizing: border-box;max-width: 100%;background: rgb(224,224,224);color: rgb(66,66,66);white-space: nowrap;overflow: hidden;-ms-text-overflow: ellipsis;-o-text-overflow: ellipsis;text-overflow: ellipsis;}\n    .md2-chip.active {color: white;background: #0d8bff;}    \n    .chip-input-form {display: inline-block;height:32px;margin: 8px 8px 0 0;}\n    .md2-chip svg {position: absolute; top: 4px; right: 4px; cursor: pointer; display: inline-block; overflow: hidden;fill: currentColor; color: rgba(0,0,0,0.54); }\n    .md2-chip.active svg { color: rgba(255,255,255,0.87); }\n    .chip-remove {cursor: pointer;display: inline-block;padding: 0 3px;color: #616161;font-size: 30px;vertical-align: top;line-height: 21px;font-family: serif;}\n    .chip-input {display: inline-block;width: auto;box-shadow: one;border: 0;outline:none;height: 32px;line-height: 32px;font-size: 16px;}\n    .chip-error{font-size:13px;color:#fd0f0f;}\n    .md2-chips-container .chip-input-form .md2-autocomplete-wrap{border-bottom:0!important;}\n  "],
            providers: [MD2_CHIPS_CONTROL_VALUE_ACCESSOR],
            host: {
                'role': 'chips',
                '[id]': 'id',
                '[tabindex]': 'readonly ? -1 : tabindex',
                '[class.chip-input-focus]': 'isFocused || selectedChip >= 0',
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
