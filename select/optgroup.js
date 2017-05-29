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
import { Component, ViewEncapsulation, Input } from '@angular/core';
import { mixinDisabled } from '../core/common-behaviors/disabled';
// Boilerplate for applying mixins to Md2Optgroup.
var Md2OptgroupBase = (function () {
    function Md2OptgroupBase() {
    }
    return Md2OptgroupBase;
}());
export { Md2OptgroupBase };
export var _Md2OptgroupMixinBase = mixinDisabled(Md2OptgroupBase);
// Counter for unique group ids.
var nextId = 0;
/**
 * Component that is used to group instances of `md2-option`.
 */
var Md2Optgroup = (function (_super) {
    __extends(Md2Optgroup, _super);
    function Md2Optgroup() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /** Unique id for the underlying label. */
        _this._labelId = "md2-optgroup-label-" + nextId++;
        return _this;
    }
    return Md2Optgroup;
}(_Md2OptgroupMixinBase));
__decorate([
    Input(),
    __metadata("design:type", String)
], Md2Optgroup.prototype, "label", void 0);
Md2Optgroup = __decorate([
    Component({selector: 'md2-optgroup',
        template: "<label class=\"md2-optgroup-label\" [id]=\"_labelId\">{{ label }}</label><ng-content select=\"md2-option\"></ng-content>",
        styles: [".md2-optgroup-label{color:rgba(0,0,0,.54);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;line-height:48px;height:48px;padding:0 16px;text-align:left;text-decoration:none;user-select:none;cursor:default;font-weight:700;font-size:14px}.md2-optgroup-disabled .md2-optgroup-label{color:rgba(0,0,0,.38)} /*# sourceMappingURL=optgroup.css.map */ "],
        encapsulation: ViewEncapsulation.None,
        inputs: ['disabled'],
        host: {
            'class': 'md2-optgroup',
            'role': 'group',
            '[class.md2-optgroup-disabled]': 'disabled',
            '[attr.aria-disabled]': 'disabled.toString()',
            '[attr.aria-labelledby]': '_labelId',
        }
    })
], Md2Optgroup);
export { Md2Optgroup };
//# sourceMappingURL=optgroup.js.map