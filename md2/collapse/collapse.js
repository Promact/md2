var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", '@angular/core', '@angular/common'], factory);
    }
})(function (require, exports) {
    "use strict";
    var core_1 = require('@angular/core');
    var common_1 = require('@angular/common');
    var Md2Collapse = (function () {
        function Md2Collapse() {
            this.isExpanded = true;
            this.isCollapsing = false;
        }
        Object.defineProperty(Md2Collapse.prototype, "collapse", {
            get: function () { return this.isExpanded; },
            set: function (value) {
                this.isExpanded = value;
                this.toggle();
            },
            enumerable: true,
            configurable: true
        });
        /**
         * toggle collapse
         */
        Md2Collapse.prototype.toggle = function () {
            if (this.isExpanded) {
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
            this.isCollapsing = true;
            this.isExpanded = false;
            setTimeout(function () {
                _this.isCollapsing = false;
            }, 4);
        };
        /**
         * show collapse
         */
        Md2Collapse.prototype.show = function () {
            var _this = this;
            this.isCollapsing = true;
            this.isExpanded = true;
            setTimeout(function () {
                _this.isCollapsing = false;
            }, 4);
        };
        __decorate([
            core_1.Input(), 
            __metadata('design:type', Boolean)
        ], Md2Collapse.prototype, "collapse", null);
        Md2Collapse = __decorate([
            core_1.Directive({
                selector: '[collapse]',
                host: {
                    '[class.in]': 'isExpanded',
                    '[class.collapse]': 'true',
                    '[class.collapsing]': 'isCollapsing',
                    '[attr.aria-expanded]': 'isExpanded',
                    '[attr.aria-hidden]': '!isExpanded',
                }
            }), 
            __metadata('design:paramtypes', [])
        ], Md2Collapse);
        return Md2Collapse;
    }());
    exports.Md2Collapse = Md2Collapse;
    exports.MD2_COLLAPSE_DIRECTIVES = [Md2Collapse];
    var Md2CollapseModule = (function () {
        function Md2CollapseModule() {
        }
        Md2CollapseModule.forRoot = function () {
            return {
                ngModule: Md2CollapseModule,
                providers: []
            };
        };
        Md2CollapseModule = __decorate([
            core_1.NgModule({
                declarations: exports.MD2_COLLAPSE_DIRECTIVES,
                imports: [common_1.CommonModule],
                exports: exports.MD2_COLLAPSE_DIRECTIVES,
            }), 
            __metadata('design:paramtypes', [])
        ], Md2CollapseModule);
        return Md2CollapseModule;
    }());
    exports.Md2CollapseModule = Md2CollapseModule;
});

//# sourceMappingURL=collapse.js.map
