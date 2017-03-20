var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Directive, EventEmitter, Input, Output, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
export var Md2Collapse = (function () {
    function Md2Collapse() {
        this._collapse = true;
        this._collapsing = false;
        this.collapsed = new EventEmitter();
        this.expanded = new EventEmitter();
    }
    Object.defineProperty(Md2Collapse.prototype, "collapse", {
        get: function () { return this._collapse; },
        set: function (value) {
            this._collapse = value;
            this.toggle();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * toggle collapse
     */
    Md2Collapse.prototype.toggle = function () {
        if (this._collapse) {
            this.hide();
        }
        else {
            this.show();
        }
    };
    /**
    * show collapse
    */
    Md2Collapse.prototype.show = function () {
        var _this = this;
        this._collapsing = true;
        this._collapse = true;
        setTimeout(function () {
            _this._collapsing = false;
        }, 4);
        this.expanded.emit();
    };
    /**
     * hide collapse
     */
    Md2Collapse.prototype.hide = function () {
        var _this = this;
        this._collapsing = true;
        this._collapse = false;
        setTimeout(function () {
            _this._collapsing = false;
        }, 4);
        this.collapsed.emit();
    };
    __decorate([
        Output(), 
        __metadata('design:type', EventEmitter)
    ], Md2Collapse.prototype, "collapsed", void 0);
    __decorate([
        Output(), 
        __metadata('design:type', EventEmitter)
    ], Md2Collapse.prototype, "expanded", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Boolean)
    ], Md2Collapse.prototype, "collapse", null);
    Md2Collapse = __decorate([
        Directive({
            selector: '[collapse]',
            host: {
                'role': 'collapse',
                '[class.in]': '_collapse',
                '[class.collapse]': 'true',
                '[class.collapsing]': '_collapsing',
                '[attr.aria-expanded]': '_collapse',
                '[attr.aria-hidden]': '!_collapse'
            },
            exportAs: 'md2Collapse'
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