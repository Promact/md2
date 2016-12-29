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
        Component({selector: 'md2-option',
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
            styles: ["md2-select { display: block; outline: none; } .md2-select-trigger { color: rgba(0, 0, 0, 0.38); border-bottom: 1px solid rgba(0, 0, 0, 0.12); display: flex; justify-content: space-between; align-items: center; height: 30px; min-width: 112px; margin: 18px 0; line-height: 22px; cursor: pointer; position: relative; box-sizing: border-box; } [aria-disabled='true'] .md2-select-trigger { background-image: linear-gradient(to right, rgba(0, 0, 0, 0.26) 0, rgba(0, 0, 0, 0.26) 33%, transparent 0); background-size: 4px 1px; background-repeat: repeat-x; border-bottom: transparent; background-position: 0 bottom; cursor: default; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; } md2-select:focus:not(.md2-select-disabled) .md2-select-trigger { color: #106cc8; border-bottom: 1px solid #106cc8; } md2-select.ng-invalid.ng-touched:not(.md2-select-disabled) .md2-select-trigger { color: #f44336; border-bottom: 1px solid #f44336; } .md2-select-placeholder { position: absolute; right: 18px; left: 0; padding: 0 2px; transform-origin: left top; white-space: nowrap; overflow-x: hidden; text-overflow: ellipsis; } .md2-select-placeholder.md2-floating-placeholder { top: -16px; left: -2px; transform: scale(0.75); } [dir='rtl'] .md2-select-placeholder { transform-origin: right top; } [dir='rtl'] .md2-select-placeholder.md2-floating-placeholder { left: 2px; } [aria-required=true] .md2-select-placeholder::after { content: '*'; } .md2-select-value { position: relative; white-space: nowrap; overflow-x: hidden; text-overflow: ellipsis; color: rgba(0, 0, 0, 0.87); } .md2-select-disabled .md2-select-value { color: rgba(0, 0, 0, 0.38); } [dir='rtl'] .md2-select-value { left: auto; right: 0; } .md2-select-value-text:not(:last-child)::after { content: ','; margin-left: -2px; } .md2-select-arrow { width: 0; height: 0; border-left: 5px solid transparent; border-right: 5px solid transparent; border-top: 5px solid; margin: 0 4px; color: rgba(0, 0, 0, 0.38); } md2-select:focus:not(.md2-select-disabled) .md2-select-arrow { color: #106cc8; } md2-select.ng-invalid.ng-touched:not(.md2-select-disabled) .md2-select-arrow { color: #f44336; } .md2-select-panel { box-shadow: 0 0 3px rgba(0, 0, 0, 0.2), 0 8px 10px 1px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12); min-width: 112px; max-width: 280px; overflow: auto; -webkit-overflow-scrolling: touch; padding-top: 0; padding-bottom: 0; max-height: 256px; background: white; } md2-option { white-space: nowrap; overflow-x: hidden; text-overflow: ellipsis; display: block; flex-direction: row; align-items: center; padding: 13px 16px; font-size: 16px; font-family: Roboto, 'Helvetica Neue', sans-serif; text-align: start; text-decoration: none; position: relative; cursor: pointer; outline: none; box-sizing: padding-box; } md2-option[aria-disabled='true'] { cursor: default; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; } md2-option:hover:not(.md2-option-disabled), md2-option:focus:not(.md2-option-disabled) { background: rgba(0, 0, 0, 0.04); } md2-option.md2-selected { color: #106cc8; } md2-option.md2-option-disabled { color: rgba(0, 0, 0, 0.38); } [multiple='true'] md2-option { padding-left: 40px; } [multiple='true'] md2-option::after { content: ''; position: absolute; top: 50%; left: 12px; display: block; width: 16px; height: 16px; margin-top: -8px; border: 2px solid; border-radius: 2px; box-sizing: border-box; transition: 240ms; } [multiple='true'] md2-option.md2-selected::after { transform: rotate(-45deg); height: 8px; border-width: 0 0 2px 2px; } .cdk-overlay-container, .cdk-global-overlay-wrapper { pointer-events: none; top: 0; left: 0; height: 100%; width: 100%; } .cdk-overlay-container { position: fixed; z-index: 1000; } .cdk-overlay-pane { position: absolute; pointer-events: auto; box-sizing: border-box; z-index: 1000; } .cdk-overlay-backdrop { position: absolute; top: 0; bottom: 0; left: 0; right: 0; z-index: 1; pointer-events: auto; transition: opacity 400ms cubic-bezier(0.25, 0.8, 0.25, 1); opacity: 0; } .cdk-overlay-transparent-backdrop { background: none; } .cdk-overlay-backdrop.cdk-overlay-backdrop-showing { opacity: 0.48; } /*# sourceMappingURL=select.css.map */ "],
            encapsulation: ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [ElementRef, Renderer])
    ], Md2Option);
    return Md2Option;
}());

//# sourceMappingURL=option.js.map
