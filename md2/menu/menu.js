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
    var Md2MenuNotClosable = (function () {
        function Md2MenuNotClosable(elementRef) {
            this.elementRef = elementRef;
        }
        /**
         * contains
         * @param element
         */
        Md2MenuNotClosable.prototype.contains = function (element) {
            var thisElement = this.elementRef.nativeElement;
            return thisElement.contains(element);
        };
        Md2MenuNotClosable = __decorate([
            core_1.Directive({ selector: '[md2-menu-not-closable]' }), 
            __metadata('design:paramtypes', [core_1.ElementRef])
        ], Md2MenuNotClosable);
        return Md2MenuNotClosable;
    }());
    exports.Md2MenuNotClosable = Md2MenuNotClosable;
    var Md2Menu = (function () {
        function Md2Menu(elementRef) {
            this.elementRef = elementRef;
            this.isVisible = false;
        }
        /**
         * open menu
         */
        Md2Menu.prototype.open = function () { this.isVisible = true; };
        /**
         * close menu
         */
        Md2Menu.prototype.close = function () { this.isVisible = false; };
        /**
         * check closeble
         * @param element
         */
        Md2Menu.prototype.isInClosableZone = function (element) {
            if (!this.notClosable) {
                return false;
            }
            return this.notClosable.contains(element);
        };
        __decorate([
            core_1.ContentChild(Md2MenuNotClosable), 
            __metadata('design:type', Md2MenuNotClosable)
        ], Md2Menu.prototype, "notClosable", void 0);
        Md2Menu = __decorate([
            core_1.Directive({
                selector: '[md2-menu]',
                host: {
                    'role': 'menu',
                    '[class.md2-menu]': 'true',
                    '[class.open]': 'isVisible'
                }
            }), 
            __metadata('design:paramtypes', [core_1.ElementRef])
        ], Md2Menu);
        return Md2Menu;
    }());
    exports.Md2Menu = Md2Menu;
    var Md2MenuOpen = (function () {
        function Md2MenuOpen(menu, elementRef) {
            var _this = this;
            this.menu = menu;
            this.elementRef = elementRef;
            this.close = function (event) {
                if (!_this.menu.isInClosableZone(event.target) &&
                    event.target !== _this.elementRef.nativeElement) {
                    _this.menu.close();
                    document.removeEventListener('click', _this.close);
                }
            };
        }
        Md2MenuOpen.prototype.open = function () {
            this.menu.open();
            document.addEventListener('click', this.close, true);
        };
        Md2MenuOpen.prototype.ngOnDestroy = function () {
            document.removeEventListener('click', this.close);
        };
        __decorate([
            core_1.HostListener('click'), 
            __metadata('design:type', Function), 
            __metadata('design:paramtypes', []), 
            __metadata('design:returntype', void 0)
        ], Md2MenuOpen.prototype, "open", null);
        Md2MenuOpen = __decorate([
            core_1.Directive({ selector: '[md2-menu-open]' }),
            __param(0, core_1.Host()), 
            __metadata('design:paramtypes', [Md2Menu, core_1.ElementRef])
        ], Md2MenuOpen);
        return Md2MenuOpen;
    }());
    exports.Md2MenuOpen = Md2MenuOpen;
    exports.MD2_MENU_DIRECTIVES = [Md2MenuNotClosable, Md2Menu, Md2MenuOpen];
    var Md2MenuModule = (function () {
        function Md2MenuModule() {
        }
        Md2MenuModule.forRoot = function () {
            return {
                ngModule: Md2MenuModule,
                providers: []
            };
        };
        Md2MenuModule = __decorate([
            core_1.NgModule({
                declarations: exports.MD2_MENU_DIRECTIVES,
                imports: [common_1.CommonModule],
                exports: exports.MD2_MENU_DIRECTIVES,
            }), 
            __metadata('design:paramtypes', [])
        ], Md2MenuModule);
        return Md2MenuModule;
    }());
    exports.Md2MenuModule = Md2MenuModule;
});

//# sourceMappingURL=menu.js.map
