var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ElementRef, EventEmitter, Input, Output, Renderer, ViewEncapsulation } from '@angular/core';
import { ENTER, SPACE } from '../core/keyboard/keycodes';
import { coerceBooleanProperty } from '../core/coercion/boolean-property';
/**
 * Option IDs need to be unique across components, so this counter exists outside of
 * the component definition.
 */
var _uniqueIdCounter = 0;
export var Md2Option = (function () {
    function Md2Option(_element, _renderer) {
        this._element = _element;
        this._renderer = _renderer;
        this._selected = false;
        /** Whether the option is disabled.  */
        this._disabled = false;
        this._id = "md2-select-option-" + _uniqueIdCounter++;
        /** Event emitted when the option is selected. */
        this.onSelect = new EventEmitter();
    }
    Object.defineProperty(Md2Option.prototype, "id", {
        /** The unique ID of the option. */
        get: function () { return this._id; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Option.prototype, "disabled", {
        get: function () {
            return this._disabled;
        },
        set: function (value) {
            this._disabled = coerceBooleanProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Option.prototype, "selected", {
        /** Whether or not the option is currently selected. */
        get: function () {
            return this._selected;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Option.prototype, "viewValue", {
        /**
         * The displayed value of the option. It is necessary to show the selected option in the
         * select's trigger.
         * TODO(kara): Add input property alternative for node envs.
         */
        get: function () {
            return this._getHostElement().textContent.trim();
        },
        enumerable: true,
        configurable: true
    });
    /** Selects the option. */
    Md2Option.prototype.select = function () {
        this._selected = true;
        this.onSelect.emit();
    };
    /** Deselects the option. */
    Md2Option.prototype.deselect = function () {
        this._selected = false;
    };
    /** Sets focus onto this option. */
    Md2Option.prototype.focus = function () {
        this._renderer.invokeElementMethod(this._getHostElement(), 'focus');
    };
    /** Ensures the option is selected when activated from the keyboard. */
    Md2Option.prototype._handleKeydown = function (event) {
        if (event.keyCode === ENTER || event.keyCode === SPACE) {
            this._selectViaInteraction();
        }
    };
    /**
     * Selects the option while indicating the selection came from the user. Used to
     * determine if the select's view -> model callback should be invoked.
     */
    Md2Option.prototype._selectViaInteraction = function () {
        if (!this.disabled) {
            this._selected = true;
            this.onSelect.emit(true);
        }
    };
    /** Returns the correct tabindex for the option depending on disabled state. */
    Md2Option.prototype._getTabIndex = function () {
        return this.disabled ? '-1' : '0';
    };
    Md2Option.prototype._getHostElement = function () {
        return this._element.nativeElement;
    };
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], Md2Option.prototype, "value", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], Md2Option.prototype, "disabled", null);
    __decorate([
        Output(), 
        __metadata('design:type', Object)
    ], Md2Option.prototype, "onSelect", void 0);
    Md2Option = __decorate([
        Component({selector: 'md2-option, mat-option',
            host: {
                'role': 'option',
                '[attr.tabindex]': '_getTabIndex()',
                '[class.md2-selected]': 'selected',
                '[id]': 'id',
                '[attr.aria-selected]': 'selected.toString()',
                '[attr.aria-disabled]': 'disabled.toString()',
                '[class.md2-option-disabled]': 'disabled',
                '(click)': '_selectViaInteraction()',
                '(keydown)': '_handleKeydown($event)'
            },
            template: '<ng-content></ng-content>',
            styles: ["md2-select { display: inline-block; outline: none; } .md2-select-trigger { color: rgba(0, 0, 0, 0.38); border-bottom: 1px solid rgba(0, 0, 0, 0.12); display: flex; justify-content: space-between; align-items: center; height: 30px; min-width: 112px; cursor: pointer; position: relative; box-sizing: border-box; } [aria-disabled='true'] .md2-select-trigger { background-image: linear-gradient(to right, rgba(0, 0, 0, 0.26) 0%, rgba(0, 0, 0, 0.26) 33%, transparent 0%); background-size: 4px 1px; background-repeat: repeat-x; border-bottom: transparent; background-position: 0 bottom; cursor: default; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; } md2-select:focus:not(.md2-select-disabled) .md2-select-trigger { color: #3f51b5; border-bottom: 1px solid #3f51b5; } md2-select.ng-invalid.ng-touched:not(.md2-select-disabled) .md2-select-trigger { color: #f44336; border-bottom: 1px solid #f44336; } .md2-select-placeholder { position: relative; padding: 0 2px; transform-origin: left top; } .md2-select-placeholder.md2-floating-placeholder { top: -22px; left: -2px; transform: scale(0.75); } [dir='rtl'] .md2-select-placeholder { transform-origin: right top; } [dir='rtl'] .md2-select-placeholder.md2-floating-placeholder { left: 2px; } [aria-required=true] .md2-select-placeholder::after { content: '*'; } .md2-select-value { position: absolute; left: 0; top: 6px; white-space: nowrap; overflow-x: hidden; text-overflow: ellipsis; color: rgba(0, 0, 0, 0.87); } .md2-select-disabled .md2-select-value { color: rgba(0, 0, 0, 0.38); } [dir='rtl'] .md2-select-value { left: auto; right: 0; } .md2-select-arrow { width: 0; height: 0; border-left: 5px solid transparent; border-right: 5px solid transparent; border-top: 5px solid; margin: 0 4px; color: rgba(0, 0, 0, 0.38); } md2-select:focus:not(.md2-select-disabled) .md2-select-arrow { color: #3f51b5; } md2-select.ng-invalid.ng-touched:not(.md2-select-disabled) .md2-select-arrow { color: #f44336; } .md2-select-panel { box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12); min-width: 112px; max-width: 280px; overflow: auto; -webkit-overflow-scrolling: touch; padding-top: 0; padding-bottom: 0; max-height: 256px; } .md2-select-content { background: white; } md2-option { white-space: nowrap; overflow-x: hidden; text-overflow: ellipsis; display: flex; flex-direction: row; align-items: center; height: 48px; padding: 0 16px; font-size: 16px; font-family: Roboto, \"Helvetica Neue\", sans-serif; text-align: start; text-decoration: none; position: relative; cursor: pointer; outline: none; } md2-option[aria-disabled='true'] { cursor: default; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; } md2-option:hover:not(.md2-option-disabled), md2-option:focus:not(.md2-option-disabled) { background: rgba(0, 0, 0, 0.04); } md2-option.md2-selected { background: rgba(0, 0, 0, 0.04); color: #3f51b5; } md2-option.md2-option-disabled { color: rgba(0, 0, 0, 0.38); } /*# sourceMappingURL=select.css.map */ "],
            encapsulation: ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [ElementRef, Renderer])
    ], Md2Option);
    return Md2Option;
}());

//# sourceMappingURL=option.js.map
