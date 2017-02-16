var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewEncapsulation } from '@angular/core';
export var Md2MenuContent = (function () {
    function Md2MenuContent() {
    }
    Md2MenuContent = __decorate([
        Component({selector: '[md2-menu-content]',
            host: { 'role': 'menu' },
            template: '<ng-content></ng-content>',
            styles: ["[md2-menu] { position: relative; display: inline-block; } [md2-menu-content] { position: absolute; top: 0; left: 0; display: inline-block; background: white; list-style: none; min-width: 112px; max-width: 280px; max-height: calc(100vh + 48px); padding: 8px 0; margin: 0; z-index: 1001; border-radius: 2px; transform: scale(0); transform-origin: left top; transition: all 200ms linear; box-shadow: 0 2px 6px 1px rgba(0, 0, 0, 0.34); } [md2-menu-item] [md2-menu-content] { left: 100%; margin: -8px 0; } [md2-menu-content][x-position='before'] { right: 0; left: auto; transform-origin: right top; } [md2-menu-item] [md2-menu-content][x-position='before'] { right: 100%; } [md2-menu-content][y-position='above'] { top: auto; bottom: 0; transform-origin: left bottom; } [md2-menu-content][y-position='above'][x-position='before'] { transform-origin: right bottom; } .open > [md2-menu-content] { transform: scale(1); } [md2-menu-item] { position: relative; width: 100%; cursor: pointer; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; outline: none; border: none; white-space: nowrap; text-overflow: ellipsis; display: flex; flex-direction: row; align-items: center; height: 36px; padding: 0 16px; font-size: 16px; text-align: start; text-decoration: none; background: transparent; color: rgba(0, 0, 0, 0.87); box-sizing: border-box; } [md2-menu-item][disabled] { color: rgba(0, 0, 0, 0.38); } [md2-menu-item]:hover:not([disabled]), [md2-menu-item]:focus:not([disabled]), [md2-menu-item].open { background: rgba(0, 0, 0, 0.04); text-decoration: none; } [md2-menu-item] > [md2-menu-trigger] { display: block; height: 36px; width: calc(100% + 32px); margin: 0 -16px; padding: 0 16px; font: inherit; color: inherit; text-align: left; background: transparent; outline: none; border: 0; cursor: pointer; box-shadow: none; } .md-overlay-container { position: fixed; pointer-events: none; top: 0; left: 0; height: 100%; width: 100%; z-index: 1000; } .md-overlay-pane { position: absolute; pointer-events: auto; box-sizing: border-box; z-index: 1000; } .md-overlay-backdrop { position: absolute; top: 0; bottom: 0; left: 0; right: 0; z-index: 1; pointer-events: auto; transition: opacity 400ms cubic-bezier(0.25, 0.8, 0.25, 1); opacity: 0; } .md-overlay-transparent-backdrop { background: none; } .md-overlay-backdrop.md-overlay-backdrop-showing { opacity: 0.48; } /*# sourceMappingURL=menu.css.map */ "],
            encapsulation: ViewEncapsulation.None,
        }), 
        __metadata('design:paramtypes', [])
    ], Md2MenuContent);
    return Md2MenuContent;
}());
//# sourceMappingURL=menu-content.js.map