//import {Component, Input, HostListener, ElementRef, ViewEncapsulation} from "@angular/core";
//import {NgClass} from 'angular2/common';
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
//@Component({
//  selector: "md2-menu",
//  template: `
//    <div class="md2-menu-button" type="button"><!-- (click)="toggleMenu($event)"-->
//      <span *ngIf="menuLabel" class="md2-menu-label" [innerHtml]="menuLabel"></span>
//      <ng-content select="menu-label"></ng-content>
//    </div>
//    <div class="md2-menu-content" [ngClass]="direction"><!-- (click)="hide($event)"-->
//      <ng-content></ng-content>
//    </div>
//  `,
//  styles: [`
//    .md2-menu { position: relative; display: inline-block; }
//    .md2-menu .md2-menu-button { -moz-box-sizing: border-box; -webkit-box-sizing: border-box; box-sizing: border-box; color: currentColor; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; position: relative; outline: 0; border: 0; display: inline-block; line-height: 36px; min-height: 36px; background: 0 0; white-space: nowrap; font-weight: 500; font-size: 14px; font-style: inherit; font-variant: inherit; font-family: inherit; text-decoration: none; cursor: pointer; overflow: hidden; }
//    .md2-menu .md2-menu-content { position: absolute; top: 0; left: 0; display: inline-block; background: #fff; list-style: none; min-width: 100px; padding: 8px 0; margin: 0; -moz-transform: scale(0); -ms-transform: scale(0); -o-transform: scale(0); -webkit-transform: scale(0); transform: scale(0); -moz-transform-origin: left top; -ms-transform-origin: left top; -o-transform-origin: left top; -webkit-transform-origin: left top; transform-origin: left top; -moz-transition: all .4s linear; -o-transition: all .4s linear; -webkit-transition: all .4s linear; transition: all .4s linear; -moz-transition-duration: 0.2s; -o-transition-duration: 0.2s; -webkit-transition-duration: 0.2s; transition-duration: 0.2s; box-shadow: 0 2px 4px -1px rgba(0,0,0,.2),0 4px 5px 0 rgba(0,0,0,.14),0 1px 10px 0 rgba(0,0,0,.12); z-index: 1; border-radius: 2px; }
//    .md2-menu .md2-menu-content.right { left: auto; right: 0; -moz-transform-origin: right top; -ms-transform-origin: right top; -o-transform-origin: right top; -webkit-transform-origin: right top; transform-origin: right top; }
//    .md2-menu .md2-menu-content.top { top: auto; bottom: 0; -moz-transform-origin: left bottom; -ms-transform-origin: left bottom; -o-transform-origin: left bottom; -webkit-transform-origin: left bottom; transform-origin: left bottom; }
//    .md2-menu .md2-menu-content.top.right { -moz-transform-origin: right bottom; -ms-transform-origin: right bottom; -o-transform-origin: right bottom; -webkit-transform-origin: right bottom; transform-origin: right bottom; }
//    .md2-menu.open > .md2-menu-content { -moz-transform: scale(1); -ms-transform: scale(1); -o-transform: scale(1); -webkit-transform: scale(1); transform: scale(1); }
//    .md2-menu .md2-menu-item { position: relative; display: block; padding: 0 16px; line-height: 36px; color: rgba(0,0,0,.87); cursor: pointer; text-decoration: none; transition: 0.3s; }
//    .md2-menu .md2-menu-item:hover { background-color: rgba(158,158,158,0.2); }
//  `],
//  host: {
//    'role': 'menu',
//    '[class.md2-menu]': 'true',
//    '[class.open]': 'isVisible'
//  },
//  encapsulation: ViewEncapsulation.None
//})
//export class Md2Menu {
//  @Input() direction: string;
//  @Input('menu-label') menuLabel: string;
//  private isVisible: boolean = false;
//  constructor(private element: ElementRef) { }
//  private hide(e) {
//    let elem = e.target;
//    do {
//      if (elem.className && elem.className.indexOf('md2-menu-item') < 0) { return; }
//      elem = elem.parentNode;
//    } while (elem);
//    this.isVisible = false;
//  }
//  private toggleMenu(event): void {
//    //event.preventDefault();
//    //event.stopPropagation();
//    this.isVisible = !this.isVisible;
//  }
//  @HostListener('click', ['$event'])
//  public onClick(e: MouseEvent) {
//    console.log(e);
//    this.isVisible = !this.isVisible;
//    //if (closestByClass(e.target, 'some-class')) {
//    //  // Do something
//    //} else {
//    //  // Do something else
//    //}
//  }
//  @HostListener('document:click', ['$event.target'])
//  public onDocumentClick(targetElement) {
//    let clickedInside = this.element.nativeElement.contains(targetElement);
//    if (!clickedInside) {
//      this.isVisible = false;
//    }
//  }
//  private _closest(el, clazz) {
//    while (el.className != clazz) {
//      el = el.parentNode;
//      if (!el) {
//        return null;
//      }
//    }
//    return el;
//  }
//  //  var closest = function (el, fn) {
//  //  return el && (fn(el) ? el : closest(el.parentNode, fn));
//  //}
//  //  var nav = closest(srcEl[0], function (el) {
//  //  // Here's the beauty of this function, we have control
//  //  // on the target, here we're using class name `.nav`
//  //  return el.className === 'nav';
//  //});
//  //  var nav = closest(srcEl[0], function (el) {
//  //  return el.id === 'nav-id';
//  //});
//  //// Here it's the tag <nav>
//  //var nav = closest(srcEl[0], function (el) {
//  //  return el.tagName.toLowerCase() === 'nav';
//  //});
//}
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
