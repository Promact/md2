var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Directive, Input, ViewEncapsulation } from '@angular/core';
import { Md2Accordion } from './accordionpanel';
import { coerceBooleanProperty } from '../core';
export var Md2AccordionHeader = (function () {
    function Md2AccordionHeader() {
    }
    Md2AccordionHeader = __decorate([
        Directive({ selector: 'md2-accordion-header' }), 
        __metadata('design:paramtypes', [])
    ], Md2AccordionHeader);
    return Md2AccordionHeader;
}());
export var Md2AccordionTab = (function () {
    function Md2AccordionTab(_accordion) {
        this._accordion = _accordion;
        this._disabled = false;
        this._active = false;
        this._accordion.addTab(this);
    }
    Object.defineProperty(Md2AccordionTab.prototype, "active", {
        get: function () { return this._active; },
        set: function (value) {
            this._active = coerceBooleanProperty(value);
            if (this._active) {
                for (var i = 0; i < this._accordion.tabs.length; i++) {
                    if (this._accordion.tabs[i] !== this) {
                        this._accordion.tabs[i].active = false;
                    }
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2AccordionTab.prototype, "disabled", {
        get: function () { return this._disabled; },
        set: function (value) { this._disabled = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    /**
     * Toggle the accordion
     * @param event
     * @return if it is disabled
     */
    Md2AccordionTab.prototype._handleClick = function (event) {
        if (this.disabled) {
            event.preventDefault();
            return;
        }
        var index = this.findTabIndex();
        if (this.active) {
            this.active = !this.active;
            this._accordion.close.emit({ originalEvent: event, index: index });
        }
        else if (!this._accordion.multiple) {
            for (var i = 0; i < this._accordion.tabs.length; i++) {
                this._accordion.tabs[i].active = false;
            }
            this._active = true;
            this._accordion.open.emit({ originalEvent: event, index: index });
        }
        else {
            this._active = true;
            this._accordion.open.emit({ originalEvent: event, index: index });
        }
        event.preventDefault();
    };
    /**
     * Find index of specific tab of accordion
     * @return index number of this tab
     */
    Md2AccordionTab.prototype.findTabIndex = function () {
        var index = -1;
        for (var i = 0; i < this._accordion.tabs.length; i++) {
            if (this._accordion.tabs[i] === this) {
                index = i;
                break;
            }
        }
        return index;
    };
    __decorate([
        Input(), 
        __metadata('design:type', String)
    ], Md2AccordionTab.prototype, "header", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Boolean)
    ], Md2AccordionTab.prototype, "active", null);
    __decorate([
        Input(), 
        __metadata('design:type', Boolean)
    ], Md2AccordionTab.prototype, "disabled", null);
    Md2AccordionTab = __decorate([
        Component({selector: 'md2-accordion-tab',
            template: "\n    <div class=\"md2-accordion-header\" (click)=\"_handleClick($event)\">\n      <span>{{header}}</span>\n      <ng-content select=\"md2-accordion-header\"></ng-content>\n      <span class=\"md2-accordion-header-icon\"></span>\n    </div>\n    <div class=\"md2-accordion-tab-content\">\n      <ng-content></ng-content>\n    </div>\n  ",
            styles: [".md2-accordion { display: block; } md2-accordion-tab { position: relative; display: block; outline: 0; border: 0; border-width: 0 0 1px; border-style: solid; border-color: rgba(0, 0, 0, 0.12); box-sizing: border-box; } md2-accordion-tab[hidden] { display: none; } md2-accordion-tab.md2-accordion-tab-active { border-color: rgba(0, 0, 0, 0.12); } md2-accordion-tab .md2-accordion-header { position: relative; border-radius: 0; color: rgba(0, 0, 0, 0.85); font-weight: 500; cursor: pointer; display: block; align-items: inherit; line-height: 40px; margin: 0; max-height: 40px; overflow: hidden; padding: 0 35px 0 16px; text-align: left; text-decoration: none; white-space: nowrap; width: 100%; box-sizing: border-box; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; -webkit-user-drag: none; } md2-accordion-tab.md2-accordion-tab-active .md2-accordion-header { color: #106cc8; } md2-accordion-tab.md2-accordion-tab-disabled .md2-accordion-header { pointer-events: none; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; -webkit-user-drag: none; opacity: 0.5; cursor: default; } md2-accordion-tab .md2-accordion-header-icon { position: absolute; top: 12px; right: 17px; width: 8px; height: 8px; overflow: hidden; display: inline-block; border-width: 0 2px 2px 0; border-style: solid; border-color: rgba(0, 0, 0, 0.54); transform: rotate(45deg); transition: 300ms ease-in-out; } md2-accordion-tab.md2-accordion-tab-active .md2-accordion-header-icon { transform: rotate(225deg); top: 16px; } md2-accordion-tab .md2-accordion-tab-content { position: relative; display: none; padding: 16px; } md2-accordion-tab.md2-accordion-tab-active .md2-accordion-tab-content { display: block; } /*# sourceMappingURL=accordion.css.map */ "],
            host: {
                'role': 'accordion-tab',
                '[class.md2-accordion-tab-active]': 'active',
                '[class.md2-accordion-tab-disabled]': 'disabled'
            },
            encapsulation: ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [Md2Accordion])
    ], Md2AccordionTab);
    return Md2AccordionTab;
}());
//# sourceMappingURL=accordiontab.js.map