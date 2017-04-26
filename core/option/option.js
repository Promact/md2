var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Component, ElementRef, EventEmitter, Input, Output, NgModule, Renderer, ViewEncapsulation, Inject, Optional, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ENTER, SPACE } from '../keyboard/keycodes';
import { coerceBooleanProperty } from '../coercion/boolean-property';
import { MdRippleModule } from '../ripple/index';
import { MdSelectionModule } from '../selection/index';
import { MATERIAL_COMPATIBILITY_MODE } from '../../core/compatibility/compatibility';
/**
 * Option IDs need to be unique across components, so this counter exists outside of
 * the component definition.
 */
var _uniqueIdCounter = 0;
/** Event object emitted by MdOption when selected or deselected. */
var MdOptionSelectionChange = (function () {
    function MdOptionSelectionChange(source, isUserInput) {
        if (isUserInput === void 0) { isUserInput = false; }
        this.source = source;
        this.isUserInput = isUserInput;
    }
    return MdOptionSelectionChange;
}());
export { MdOptionSelectionChange };
/**
 * Single option inside of a `<md-select>` element.
 */
var MdOption = (function () {
    function MdOption(_element, _renderer, _isCompatibilityMode) {
        this._element = _element;
        this._renderer = _renderer;
        this._isCompatibilityMode = _isCompatibilityMode;
        this._selected = false;
        this._active = false;
        /** Whether the option is disabled.  */
        this._disabled = false;
        this._id = "md-option-" + _uniqueIdCounter++;
        /** Whether the wrapping component is in multiple selection mode. */
        this.multiple = false;
        /** Event emitted when the option is selected or deselected. */
        this.onSelectionChange = new EventEmitter();
    }
    Object.defineProperty(MdOption.prototype, "id", {
        /** The unique ID of the option. */
        get: function () { return this._id; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdOption.prototype, "selected", {
        /** Whether or not the option is currently selected. */
        get: function () { return this._selected; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdOption.prototype, "disabled", {
        /** Whether the option is disabled. */
        get: function () { return this._disabled; },
        set: function (value) { this._disabled = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdOption.prototype, "active", {
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
    Object.defineProperty(MdOption.prototype, "viewValue", {
        /**
         * The displayed value of the option. It is necessary to show the selected option in the
         * select's trigger.
         */
        get: function () {
            // TODO(kara): Add input property alternative for node envs.
            return this._getHostElement().textContent.trim();
        },
        enumerable: true,
        configurable: true
    });
    /** Selects the option. */
    MdOption.prototype.select = function () {
        this._selected = true;
        this._emitSelectionChangeEvent();
    };
    /** Deselects the option. */
    MdOption.prototype.deselect = function () {
        this._selected = false;
        this._emitSelectionChangeEvent();
    };
    /** Sets focus onto this option. */
    MdOption.prototype.focus = function () {
        this._renderer.invokeElementMethod(this._getHostElement(), 'focus');
    };
    /**
     * This method sets display styles on the option to make it appear
     * active. This is used by the ActiveDescendantKeyManager so key
     * events will display the proper options as active on arrow key events.
     */
    MdOption.prototype.setActiveStyles = function () {
        this._active = true;
    };
    /**
     * This method removes display styles on the option that made it appear
     * active. This is used by the ActiveDescendantKeyManager so key
     * events will display the proper options as active on arrow key events.
     */
    MdOption.prototype.setInactiveStyles = function () {
        this._active = false;
    };
    /** Ensures the option is selected when activated from the keyboard. */
    MdOption.prototype._handleKeydown = function (event) {
        if (event.keyCode === ENTER || event.keyCode === SPACE) {
            this._selectViaInteraction();
        }
    };
    /**
     * Selects the option while indicating the selection came from the user. Used to
     * determine if the select's view -> model callback should be invoked.
     */
    MdOption.prototype._selectViaInteraction = function () {
        if (!this.disabled) {
            this._selected = this.multiple ? !this._selected : true;
            this._emitSelectionChangeEvent(true);
        }
    };
    /** Returns the correct tabindex for the option depending on disabled state. */
    MdOption.prototype._getTabIndex = function () {
        return this.disabled ? '-1' : '0';
    };
    /** Fetches the host DOM element. */
    MdOption.prototype._getHostElement = function () {
        return this._element.nativeElement;
    };
    /** Emits the selection change event. */
    MdOption.prototype._emitSelectionChangeEvent = function (isUserInput) {
        if (isUserInput === void 0) { isUserInput = false; }
        this.onSelectionChange.emit(new MdOptionSelectionChange(this, isUserInput));
    };
    ;
    return MdOption;
}());
__decorate([
    Input(),
    __metadata("design:type", Object)
], MdOption.prototype, "value", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], MdOption.prototype, "disabled", null);
__decorate([
    Output(),
    __metadata("design:type", Object)
], MdOption.prototype, "onSelectionChange", void 0);
MdOption = __decorate([
    Component({selector: 'md-option, mat-option',
        host: {
            'role': 'option',
            '[attr.tabindex]': '_getTabIndex()',
            '[class.mat-selected]': 'selected',
            '[class.mat-option-multiple]': 'multiple',
            '[class.mat-active]': 'active',
            '[id]': 'id',
            '[attr.aria-selected]': 'selected.toString()',
            '[attr.aria-disabled]': 'disabled.toString()',
            '[class.mat-option-disabled]': 'disabled',
            '(click)': '_selectViaInteraction()',
            '(keydown)': '_handleKeydown($event)',
            '[class.mat-option]': 'true',
        },
        template: "<span [ngSwitch]=\"_isCompatibilityMode\" *ngIf=\"multiple\"><mat-pseudo-checkbox class=\"mat-option-pseudo-checkbox\" *ngSwitchCase=\"true\" [state]=\"selected ? 'checked' : ''\" color=\"primary\"></mat-pseudo-checkbox><md-pseudo-checkbox class=\"mat-option-pseudo-checkbox\" *ngSwitchDefault [state]=\"selected ? 'checked' : ''\" color=\"primary\"></md-pseudo-checkbox></span><ng-content></ng-content><div class=\"mat-option-ripple\" *ngIf=\"!disabled\" md-ripple [mdRippleTrigger]=\"_getHostElement()\"></div>",
        encapsulation: ViewEncapsulation.None
    }),
    __param(2, Optional()), __param(2, Inject(MATERIAL_COMPATIBILITY_MODE)),
    __metadata("design:paramtypes", [ElementRef,
        Renderer, Boolean])
], MdOption);
export { MdOption };
var MdOptionModule = MdOptionModule_1 = (function () {
    function MdOptionModule() {
    }
    MdOptionModule.forRoot = function () {
        return {
            ngModule: MdOptionModule_1,
            providers: []
        };
    };
    return MdOptionModule;
}());
MdOptionModule = MdOptionModule_1 = __decorate([
    NgModule({
        imports: [MdRippleModule, CommonModule, MdSelectionModule],
        exports: [MdOption],
        declarations: [MdOption]
    })
], MdOptionModule);
export { MdOptionModule };
var MdOptionModule_1;
//# sourceMappingURL=option.js.map