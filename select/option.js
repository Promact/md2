var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ElementRef, EventEmitter, Input, Output, NgModule, Renderer, ViewEncapsulation, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ENTER, SPACE } from '../core/keyboard/keycodes';
import { coerceBooleanProperty } from '../core/coercion/boolean-property';
import { MdSelectionModule } from '../core/selection/index';
/**
 * Option IDs need to be unique across components, so this counter exists outside of
 * the component definition.
 */
var _uniqueIdCounter = 0;
/** Event object emitted by MdOption when selected or deselected. */
var Md2OptionSelectionChange = (function () {
    function Md2OptionSelectionChange(source, isUserInput) {
        if (isUserInput === void 0) { isUserInput = false; }
        this.source = source;
        this.isUserInput = isUserInput;
    }
    return Md2OptionSelectionChange;
}());
export { Md2OptionSelectionChange };
/**
 * Single option inside of a `<md2-select>` element.
 */
var Md2Option = (function () {
    function Md2Option(_element, _renderer) {
        this._element = _element;
        this._renderer = _renderer;
        this._selected = false;
        this._active = false;
        /** Whether the option is disabled.  */
        this._disabled = false;
        this._id = "md2-option-" + _uniqueIdCounter++;
        /** Whether the wrapping component is in multiple selection mode. */
        this.multiple = false;
        /** Event emitted when the option is selected or deselected. */
        this.onSelectionChange = new EventEmitter();
    }
    Object.defineProperty(Md2Option.prototype, "id", {
        /** The unique ID of the option. */
        get: function () { return this._id; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Option.prototype, "selected", {
        /** Whether or not the option is currently selected. */
        get: function () { return this._selected; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Option.prototype, "disabled", {
        /** Whether the option is disabled. */
        get: function () { return this._disabled; },
        set: function (value) { this._disabled = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Option.prototype, "active", {
        /**
         * Whether or not the option is currently active and ready to be selected.
         * An active option displays styles as if it is focused, but the
         * focus is actually retained somewhere else. This comes in handy
         * for components like autocomplete where focus must remain on the input.
         */
        get: function () {
            return this._active;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Option.prototype, "viewValue", {
        /**
         * The displayed value of the option. It is necessary to show the selected option in the
         * select's trigger.
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
        this._emitSelectionChangeEvent();
    };
    /** Deselects the option. */
    Md2Option.prototype.deselect = function () {
        this._selected = false;
        this._emitSelectionChangeEvent();
    };
    /** Sets focus onto this option. */
    Md2Option.prototype.focus = function () {
        this._renderer.invokeElementMethod(this._getHostElement(), 'focus');
    };
    /**
     * This method sets display styles on the option to make it appear
     * active. This is used by the ActiveDescendantKeyManager so key
     * events will display the proper options as active on arrow key events.
     */
    Md2Option.prototype.setActiveStyles = function () {
        this._active = true;
    };
    /**
     * This method removes display styles on the option that made it appear
     * active. This is used by the ActiveDescendantKeyManager so key
     * events will display the proper options as active on arrow key events.
     */
    Md2Option.prototype.setInactiveStyles = function () {
        this._active = false;
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
            this._selected = this.multiple ? !this._selected : true;
            this._emitSelectionChangeEvent(true);
        }
    };
    /** Returns the correct tabindex for the option depending on disabled state. */
    Md2Option.prototype._getTabIndex = function () {
        return this.disabled ? '-1' : '0';
    };
    /** Fetches the host DOM element. */
    Md2Option.prototype._getHostElement = function () {
        return this._element.nativeElement;
    };
    /** Emits the selection change event. */
    Md2Option.prototype._emitSelectionChangeEvent = function (isUserInput) {
        if (isUserInput === void 0) { isUserInput = false; }
        this.onSelectionChange.emit(new Md2OptionSelectionChange(this, isUserInput));
    };
    ;
    return Md2Option;
}());
__decorate([
    Input(),
    __metadata("design:type", Object)
], Md2Option.prototype, "value", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], Md2Option.prototype, "disabled", null);
__decorate([
    Output(),
    __metadata("design:type", Object)
], Md2Option.prototype, "onSelectionChange", void 0);
Md2Option = __decorate([
    Component({selector: 'md2-option',
        host: {
            'role': 'option',
            '[attr.tabindex]': '_getTabIndex()',
            '[class.md2-selected]': 'selected',
            '[class.md2-option-multiple]': 'multiple',
            '[class.md2-active]': 'active',
            '[id]': 'id',
            '[attr.aria-selected]': 'selected.toString()',
            '[attr.aria-disabled]': 'disabled.toString()',
            '[class.md2-option-disabled]': 'disabled',
            '(click)': '_selectViaInteraction()',
            '(keydown)': '_handleKeydown($event)',
            '[class.md2-option]': 'true',
        },
        template: '<ng-content></ng-content>',
        encapsulation: ViewEncapsulation.None
    }),
    __metadata("design:paramtypes", [ElementRef,
        Renderer])
], Md2Option);
export { Md2Option };
var Md2OptionModule = Md2OptionModule_1 = (function () {
    function Md2OptionModule() {
    }
    Md2OptionModule.forRoot = function () {
        return {
            ngModule: Md2OptionModule_1,
            providers: []
        };
    };
    return Md2OptionModule;
}());
Md2OptionModule = Md2OptionModule_1 = __decorate([
    NgModule({
        imports: [CommonModule, MdSelectionModule],
        exports: [Md2Option],
        declarations: [Md2Option]
    })
], Md2OptionModule);
export { Md2OptionModule };
var Md2OptionModule_1;
//# sourceMappingURL=option.js.map