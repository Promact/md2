var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewEncapsulation, Input, ElementRef, Renderer2, } from '@angular/core';
import { mixinColor } from '../../common-behaviors/color';
// Boilerplate for applying mixins to MdChip.
var MdPseudoCheckboxBase = (function () {
    function MdPseudoCheckboxBase(_renderer, _elementRef) {
        this._renderer = _renderer;
        this._elementRef = _elementRef;
    }
    return MdPseudoCheckboxBase;
}());
export { MdPseudoCheckboxBase };
export var _MdPseudoCheckboxBase = mixinColor(MdPseudoCheckboxBase, 'accent');
/**
 * Component that shows a simplified checkbox without including any kind of "real" checkbox.
 * Meant to be used when the checkbox is purely decorative and a large number of them will be
 * included, such as for the options in a multi-select. Uses no SVGs or complex animations.
 *
 * Note that this component will be completely invisible to screen-reader users. This is *not*
 * interchangeable with <md-checkbox> and should *not* be used if the user would directly interact
 * with the checkbox. The pseudo-checkbox should only be used as an implementation detail of
 * more complex components that appropriately handle selected / checked state.
 * @docs-private
 */
var MdPseudoCheckbox = (function (_super) {
    __extends(MdPseudoCheckbox, _super);
    function MdPseudoCheckbox(elementRef, renderer) {
        var _this = _super.call(this, renderer, elementRef) || this;
        /** Display state of the checkbox. */
        _this.state = 'unchecked';
        /** Whether the checkbox is disabled. */
        _this.disabled = false;
        return _this;
    }
    return MdPseudoCheckbox;
}(_MdPseudoCheckboxBase));
__decorate([
    Input(),
    __metadata("design:type", String)
], MdPseudoCheckbox.prototype, "state", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], MdPseudoCheckbox.prototype, "disabled", void 0);
MdPseudoCheckbox = __decorate([
    Component({encapsulation: ViewEncapsulation.None,
        selector: 'md-pseudo-checkbox, mat-pseudo-checkbox',
        styles: [".mat-pseudo-checkbox{width:20px;height:20px;border:2px solid;border-radius:2px;cursor:pointer;display:inline-block;vertical-align:middle;box-sizing:border-box;position:relative;transition:border-color 90ms cubic-bezier(0,0,.2,.1),background-color 90ms cubic-bezier(0,0,.2,.1)}.mat-pseudo-checkbox::after{position:absolute;opacity:0;content:'';border-bottom:2px solid currentColor;transition:opacity 90ms cubic-bezier(0,0,.2,.1)}.mat-pseudo-checkbox.mat-pseudo-checkbox-checked,.mat-pseudo-checkbox.mat-pseudo-checkbox-indeterminate{border:none}.mat-pseudo-checkbox-disabled{cursor:default}.mat-pseudo-checkbox-indeterminate::after{top:9px;left:2px;width:16px;opacity:1}.mat-pseudo-checkbox-checked::after{top:5px;left:3px;width:12px;height:5px;border-left:2px solid currentColor;transform:rotate(-45deg);opacity:1} /*# sourceMappingURL=pseudo-checkbox.css.map */ "],
        inputs: ['color'],
        template: '',
        host: {
            '[class.mat-pseudo-checkbox]': 'true',
            '[class.mat-pseudo-checkbox-indeterminate]': 'state === "indeterminate"',
            '[class.mat-pseudo-checkbox-checked]': 'state === "checked"',
            '[class.mat-pseudo-checkbox-disabled]': 'disabled',
        },
    }),
    __metadata("design:paramtypes", [ElementRef, Renderer2])
], MdPseudoCheckbox);
export { MdPseudoCheckbox };
//# sourceMappingURL=pseudo-checkbox.js.map