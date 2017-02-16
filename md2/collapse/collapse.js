var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Directive, Input, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
export var Md2Collapse = (function () {
    function Md2Collapse() {
        this._isExpanded = true;
        this._isCollapsing = false;
    }
    Object.defineProperty(Md2Collapse.prototype, "collapse", {
        get: function () { return this._isExpanded; },
        set: function (value) {
            this._isExpanded = value;
            this.toggle();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * toggle collapse
     */
    Md2Collapse.prototype.toggle = function () {
        if (this._isExpanded) {
            this.hide();
        }
        else {
            this.show();
        }
    };
    /**
     * hide collapse
     */
    Md2Collapse.prototype.hide = function () {
        var _this = this;
        this._isCollapsing = true;
        this._isExpanded = false;
        setTimeout(function () {
            _this._isCollapsing = false;
        }, 4);
    };
    /**
     * show collapse
     */
    Md2Collapse.prototype.show = function () {
        var _this = this;
        this._isCollapsing = true;
        this._isExpanded = true;
        setTimeout(function () {
            _this._isCollapsing = false;
        }, 4);
    };
    __decorate([
        Input(), 
        __metadata('design:type', Boolean)
    ], Md2Collapse.prototype, "collapse", null);
    Md2Collapse = __decorate([
        Directive({
            selector: '[collapse]',
            host: {
                '[class.in]': '_isExpanded',
                '[class.collapse]': 'true',
                '[class.collapsing]': '_isCollapsing',
                '[attr.aria-expanded]': '_isExpanded',
                '[attr.aria-hidden]': '!_isExpanded',
            }
        }), 
        __metadata('design:paramtypes', [])
    ], Md2Collapse);
    return Md2Collapse;
}());
export var MD2_COLLAPSE_DIRECTIVES = [Md2Collapse];
export var Md2CollapseModule = (function () {
    function Md2CollapseModule() {
    }
    Md2CollapseModule.forRoot = function () {
        return {
            ngModule: Md2CollapseModule,
            providers: []
        };
    };
    Md2CollapseModule = __decorate([
        NgModule({
            imports: [CommonModule],
            exports: MD2_COLLAPSE_DIRECTIVES,
            declarations: MD2_COLLAPSE_DIRECTIVES,
        }), 
        __metadata('design:paramtypes', [])
    ], Md2CollapseModule);
    return Md2CollapseModule;
}());
//# sourceMappingURL=collapse.js.map