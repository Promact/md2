"use strict";
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
const core_1 = require("@angular/core");
let Md2MenuNotClosable = class Md2MenuNotClosable {
    constructor(elementRef) {
        this.elementRef = elementRef;
    }
    contains(element) {
        let thisElement = this.elementRef.nativeElement;
        return thisElement.contains(element);
    }
};
Md2MenuNotClosable = __decorate([
    core_1.Directive({ selector: "[md2-menu-not-closable]" }), 
    __metadata('design:paramtypes', [core_1.ElementRef])
], Md2MenuNotClosable);
exports.Md2MenuNotClosable = Md2MenuNotClosable;
let Md2Menu = class Md2Menu {
    constructor(elementRef) {
        this.elementRef = elementRef;
        this.isVisible = false;
    }
    open() { this.isVisible = true; }
    close() { this.isVisible = false; }
    isInClosableZone(element) {
        if (!this.notClosable)
            return false;
        return this.notClosable.contains(element);
    }
};
__decorate([
    core_1.ContentChild(Md2MenuNotClosable), 
    __metadata('design:type', Md2MenuNotClosable)
], Md2Menu.prototype, "notClosable", void 0);
Md2Menu = __decorate([
    core_1.Directive({
        selector: "[md2-menu]",
        host: {
            'role': 'menu',
            '[class.md2-menu]': 'true',
            '[class.open]': 'isVisible'
        }
    }), 
    __metadata('design:paramtypes', [core_1.ElementRef])
], Md2Menu);
exports.Md2Menu = Md2Menu;
let Md2MenuOpen = class Md2MenuOpen {
    constructor(menu, elementRef) {
        this.menu = menu;
        this.elementRef = elementRef;
        this.close = (event) => {
            if (!this.menu.isInClosableZone(event.target) && event.target !== this.elementRef.nativeElement) {
                this.menu.close();
                document.removeEventListener("click", this.close);
            }
        };
    }
    open() {
        this.menu.open();
        document.addEventListener("click", this.close, true);
    }
    ngOnDestroy() {
        document.removeEventListener("click", this.close);
    }
};
__decorate([
    core_1.HostListener('click'), 
    __metadata('design:type', Function), 
    __metadata('design:paramtypes', []), 
    __metadata('design:returntype', void 0)
], Md2MenuOpen.prototype, "open", null);
Md2MenuOpen = __decorate([
    core_1.Directive({ selector: "[md2-menu-open]" }),
    __param(0, core_1.Host()), 
    __metadata('design:paramtypes', [Md2Menu, core_1.ElementRef])
], Md2MenuOpen);
exports.Md2MenuOpen = Md2MenuOpen;
exports.MENU_DIRECTIVES = [Md2MenuNotClosable, Md2Menu, Md2MenuOpen];

//# sourceMappingURL=menu.js.map
