var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Directive, Input, ViewEncapsulation, } from '@angular/core';
import { animate, state, style, transition, trigger, } from '@angular/animations';
import { Md2Accordion } from './accordion';
import { coerceBooleanProperty } from '../core';
var Md2AccordionHeader = (function () {
    function Md2AccordionHeader() {
    }
    return Md2AccordionHeader;
}());
Md2AccordionHeader = __decorate([
    Directive({ selector: 'md2-accordion-header' })
], Md2AccordionHeader);
export { Md2AccordionHeader };
var Md2AccordionTab = (function () {
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
            if (this._active && !this._accordion.multiple) {
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
    Object.defineProperty(Md2AccordionTab.prototype, "slide", {
        get: function () {
            return this.active ? 'down' : 'up';
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
    return Md2AccordionTab;
}());
__decorate([
    Input(),
    __metadata("design:type", String)
], Md2AccordionTab.prototype, "header", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Object])
], Md2AccordionTab.prototype, "active", null);
__decorate([
    Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Object])
], Md2AccordionTab.prototype, "disabled", null);
Md2AccordionTab = __decorate([
    Component({selector: 'md2-accordion-tab',
        template: "\n    <div class=\"md2-accordion-header\" (click)=\"_handleClick($event)\">\n      <span>{{header}}</span>\n      <ng-content select=\"md2-accordion-header\"></ng-content>\n      <span class=\"md2-accordion-header-icon\"></span>\n    </div>\n    <div class=\"md2-accordion-tab-body\" [@slide]=\"slide\">\n      <div class=\"md2-accordion-tab-content\">\n        <ng-content></ng-content>\n      </div>\n    </div>\n  ",
        styles: ["md2-accordion{display:block}md2-accordion-tab{position:relative;display:block;outline:0;box-sizing:border-box}md2-accordion-tab[hidden]{display:none}.md2-accordion-header{position:relative;display:block;padding-right:30px;font-weight:500;line-height:40px;text-align:left;color:rgba(0,0,0,.87);cursor:pointer;white-space:nowrap;border-bottom:1px solid rgba(0,0,0,.12);border-radius:0;box-sizing:border-box;user-select:none}md2-accordion-tab.md2-accordion-tab-active>.md2-accordion-header{border-color:#106cc8;box-shadow:0 1px 0 #106cc8}md2-accordion-tab.md2-accordion-tab-disabled>.md2-accordion-header{pointer-events:none;color:rgba(0,0,0,.26);background-image:linear-gradient(to right,rgba(0,0,0,.26) 0,rgba(0,0,0,.26) 33%,transparent 0);background-size:4px 1px;background-repeat:repeat-x;background-position:0 bottom;border-color:transparent;box-shadow:none;cursor:default}.md2-accordion-header-icon{position:absolute;top:12px;right:8px;width:8px;height:8px;overflow:hidden;display:inline-block;border-width:0 2px 2px 0;border-style:solid;border-color:currentColor;opacity:.64;transform:rotate(45deg);transition:.3s ease-in-out}md2-accordion-tab.md2-accordion-tab-active>.md2-accordion-header>.md2-accordion-header-icon{transform:rotate(225deg);top:16px}.md2-accordion-tab-body{position:relative;overflow:hidden}md2-accordion-tab.md2-accordion-tab-active .md2-accordion-tab-body{overflow:visible}.md2-accordion-tab-content{position:relative;padding:20px 0;border-bottom:1px solid rgba(0,0,0,.12)} /*# sourceMappingURL=accordion.css.map */ "],
        animations: [
            trigger('slide', [
                state('up', style({ height: 0 })),
                state('down', style({ height: '*' })),
                transition('down => up', [
                    style({ height: '*' }),
                    animate(300, style({ height: 0 }))
                ]),
                transition('up => down', [
                    style({ height: 0 }),
                    animate(300, style({
                        height: '*'
                    }))
                ])
            ])
        ],
        host: {
            'role': 'accordion-tab',
            '[class.md2-accordion-tab-active]': 'active',
            '[class.md2-accordion-tab-disabled]': 'disabled'
        },
        encapsulation: ViewEncapsulation.None,
        exportAs: 'md2AccordionTab'
    }),
    __metadata("design:paramtypes", [Md2Accordion])
], Md2AccordionTab);
export { Md2AccordionTab };
//# sourceMappingURL=accordiontab.js.map