var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Directive, HostListener, Input, Output, EventEmitter, forwardRef, ViewEncapsulation, NgModule } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { KeyCodes } from '../core/core';
var noop = function () { };
var nextId = 0;
export var MD2_SELECT_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return Md2Select; }),
    multi: true
};
export var Md2Select = (function () {
    function Md2Select() {
        this._value = null;
        this._disabled = false;
        this._onTouchedCallback = noop;
        this._onChangeCallback = noop;
        this.isMenuVisible = false;
        this.change = new EventEmitter();
        this.id = 'md2-select-' + (++nextId);
        this.tabindex = 0;
    }
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
        set: function (value) {
            if (value !== this._value) {
                this._value = value;
                this._onChangeCallback(value);
                this.change.emit(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Md2Select.prototype.onClick = function (event) {
        if (this.disabled) {
            event.stopPropagation();
            event.preventDefault();
            return;
        }
    };
    Md2Select.prototype.onKeyDown = function (event) {
        if (this.disabled) {
            return;
        }
        if (this.isMenuVisible) {
            event.preventDefault();
            event.stopPropagation();
            switch (event.keyCode) {
                case KeyCodes.TAB:
                case KeyCodes.ESCAPE:
                    this.onBlur();
                    break;
            }
        }
    };
    Md2Select.prototype.onBlur = function () { this.isMenuVisible = false; };
    Md2Select.prototype.writeValue = function (value) { this.value = value; };
    Md2Select.prototype.registerOnChange = function (fn) { this._onChangeCallback = fn; };
    Md2Select.prototype.registerOnTouched = function (fn) { this._onTouchedCallback = fn; };
    __decorate([
        Output(), 
        __metadata('design:type', EventEmitter)
    ], Md2Select.prototype, "change", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Boolean)
    ], Md2Select.prototype, "disabled", null);
    __decorate([
        Input(), 
        __metadata('design:type', String)
    ], Md2Select.prototype, "id", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', String)
    ], Md2Select.prototype, "placeholder", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Number)
    ], Md2Select.prototype, "tabindex", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], Md2Select.prototype, "value", null);
    __decorate([
        HostListener('click', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [MouseEvent]), 
        __metadata('design:returntype', void 0)
    ], Md2Select.prototype, "onClick", null);
    __decorate([
        HostListener('keydown', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [KeyboardEvent]), 
        __metadata('design:returntype', void 0)
    ], Md2Select.prototype, "onKeyDown", null);
    __decorate([
        HostListener('blur'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], Md2Select.prototype, "onBlur", null);
    Md2Select = __decorate([
        Component({selector: 'md2-select',
            template: 'I am a select',
            styles: [''],
            providers: [MD2_SELECT_CONTROL_VALUE_ACCESSOR],
            host: {
                'role': 'select',
                '[id]': 'id',
                '[class.md2-select-disabled]': 'disabled',
                '[tabindex]': 'disabled ? -1 : tabindex',
            },
            encapsulation: ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [])
    ], Md2Select);
    return Md2Select;
}());
export var Md2Optgroup = (function () {
    function Md2Optgroup() {
    }
    Object.defineProperty(Md2Optgroup.prototype, "disabled", {
        get: function () { return this._disabled; },
        set: function (value) {
            this._disabled = (value !== null && value !== false) ? true : null;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        Input(), 
        __metadata('design:type', String)
    ], Md2Optgroup.prototype, "label", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Boolean)
    ], Md2Optgroup.prototype, "disabled", null);
    Md2Optgroup = __decorate([
        Component({selector: 'md2-optgroup',
            template: "<ng-content></ng-content>",
            styles: [''],
            host: {},
            encapsulation: ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [])
    ], Md2Optgroup);
    return Md2Optgroup;
}());
export var Md2Option = (function () {
    function Md2Option() {
    }
    Object.defineProperty(Md2Option.prototype, "disabled", {
        get: function () { return this._disabled; },
        set: function (value) {
            this._disabled = (value !== null && value !== false) ? true : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Option.prototype, "selected", {
        get: function () { return this._selected; },
        set: function (value) {
            this._selected = (value !== null && value !== false) ? true : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Option.prototype, "value", {
        get: function () { return this._value; },
        set: function (value) {
            if (value !== this._value) {
                this._value = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        Input(), 
        __metadata('design:type', String)
    ], Md2Option.prototype, "label", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Boolean)
    ], Md2Option.prototype, "disabled", null);
    __decorate([
        Input(), 
        __metadata('design:type', Boolean)
    ], Md2Option.prototype, "selected", null);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], Md2Option.prototype, "value", null);
    Md2Option = __decorate([
        Directive({ selector: 'md2-option' }), 
        __metadata('design:paramtypes', [])
    ], Md2Option);
    return Md2Option;
}());
export var MD2_SELECT_DIRECTIVES = [Md2Select, Md2Optgroup, Md2Option];
export var Md2SelectModule = (function () {
    function Md2SelectModule() {
    }
    Md2SelectModule.forRoot = function () {
        return {
            ngModule: Md2SelectModule,
            providers: []
        };
    };
    Md2SelectModule = __decorate([
        NgModule({
            declarations: MD2_SELECT_DIRECTIVES,
            imports: [CommonModule, FormsModule],
            exports: MD2_SELECT_DIRECTIVES,
        }), 
        __metadata('design:paramtypes', [])
    ], Md2SelectModule);
    return Md2SelectModule;
}());

//# sourceMappingURL=selectNew.js.map
