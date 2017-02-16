var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { coerceBooleanProperty } from '../core/core';
export var Md2Accordion = (function () {
    function Md2Accordion() {
        this.class = '';
        this.close = new EventEmitter();
        this.open = new EventEmitter();
        this.tabs = [];
    }
    Object.defineProperty(Md2Accordion.prototype, "multiple", {
        get: function () { return this._multiple; },
        set: function (value) { this._multiple = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    /**
     * Add or append tab in accordion
     * @param tab object of Md2AccordionTab
     */
    Md2Accordion.prototype.addTab = function (tab) {
        this.tabs.push(tab);
    };
    __decorate([
        Input(), 
        __metadata('design:type', Boolean)
    ], Md2Accordion.prototype, "multiple", null);
    __decorate([
        Input(), 
        __metadata('design:type', String)
    ], Md2Accordion.prototype, "class", void 0);
    __decorate([
        Output(), 
        __metadata('design:type', EventEmitter)
    ], Md2Accordion.prototype, "close", void 0);
    __decorate([
        Output(), 
        __metadata('design:type', EventEmitter)
    ], Md2Accordion.prototype, "open", void 0);
    Md2Accordion = __decorate([
        Component({selector: 'md2-accordion',
            template: "<ng-content></ng-content>",
            styles: [".md2-accordion { display: block; } md2-accordion-tab { position: relative; display: block; outline: 0; border: 0; border-width: 0 0 1px; border-style: solid; border-color: rgba(0, 0, 0, 0.12); box-sizing: border-box; } md2-accordion-tab[hidden] { display: none; } md2-accordion-tab.md2-accordion-tab-active { border-color: rgba(0, 0, 0, 0.12); } md2-accordion-tab .md2-accordion-header { position: relative; border-radius: 0; color: rgba(0, 0, 0, 0.85); font-weight: 500; cursor: pointer; display: block; align-items: inherit; line-height: 40px; margin: 0; max-height: 40px; overflow: hidden; padding: 0 35px 0 16px; text-align: left; text-decoration: none; white-space: nowrap; width: 100%; box-sizing: border-box; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; -webkit-user-drag: none; } md2-accordion-tab.md2-accordion-tab-active .md2-accordion-header { color: #106cc8; } md2-accordion-tab.md2-accordion-tab-disabled .md2-accordion-header { pointer-events: none; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; -webkit-user-drag: none; opacity: 0.5; cursor: default; } md2-accordion-tab .md2-accordion-header-icon { position: absolute; top: 12px; right: 17px; width: 8px; height: 8px; overflow: hidden; display: inline-block; border-width: 0 2px 2px 0; border-style: solid; border-color: rgba(0, 0, 0, 0.54); transform: rotate(45deg); transition: 300ms ease-in-out; } md2-accordion-tab.md2-accordion-tab-active .md2-accordion-header-icon { transform: rotate(225deg); top: 16px; } md2-accordion-tab .md2-accordion-tab-content { position: relative; display: none; padding: 16px; } md2-accordion-tab.md2-accordion-tab-active .md2-accordion-tab-content { display: block; } /*# sourceMappingURL=accordion.css.map */ "],
            host: {
                '[class]': 'class',
                '[class.md2-accordion]': 'true'
            },
            encapsulation: ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [])
    ], Md2Accordion);
    return Md2Accordion;
}());
//# sourceMappingURL=accordionpanel.js.map