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
const core_1 = require('@angular/core');
const accordionpanel_1 = require('./accordionpanel');
let Md2AccordionTab = class Md2AccordionTab {
    constructor(accordion) {
        this.accordion = accordion;
        this.accordion.addTab(this);
    }
    toggle(event) {
        if (this.disabled) {
            event.preventDefault();
            return;
        }
        let index = this.findTabIndex();
        if (this.active) {
            this.active = !this.active;
            this.accordion.close.emit({ originalEvent: event, index: index });
        }
        else {
            if (!this.accordion.multiple) {
                for (let i = 0; i < this.accordion.tabs.length; i++) {
                    this.accordion.tabs[i].active = false;
                }
            }
            this.active = true;
            this.accordion.open.emit({ originalEvent: event, index: index });
        }
        event.preventDefault();
    }
    findTabIndex() {
        let index = -1;
        for (let i = 0; i < this.accordion.tabs.length; i++) {
            if (this.accordion.tabs[i] === this) {
                index = i;
                break;
            }
        }
        return index;
    }
};
__decorate([
    core_1.Input(), 
    __metadata('design:type', String)
], Md2AccordionTab.prototype, "header", void 0);
__decorate([
    core_1.Input(), 
    __metadata('design:type', Boolean)
], Md2AccordionTab.prototype, "active", void 0);
__decorate([
    core_1.Input(), 
    __metadata('design:type', Boolean)
], Md2AccordionTab.prototype, "disabled", void 0);
Md2AccordionTab = __decorate([
    core_1.Component({
        selector: 'md2-accordion-tab',
        template: `
    <div class="md2-accordion-header" (click)="toggle($event)">
      <span class="md2-accordion-title">{{header}}</span>
      <span class="md2-accordion-header-icon"></span>
    </div>
    <div class="md2-accordion-tab-content">
      <ng-content></ng-content>
    </div>
  `,
        styles: [`
    .md2-accordion-tab { position: relative; display: block; outline: 0; border: 0; border-width: 1px 0; border-style: solid; border-color: transparent; -moz-box-sizing: border-box; -webkit-box-sizing: border-box; box-sizing: border-box; }
    .md2-accordion-tab.md2-accordion-tab-active { border-color: rgba(0, 0, 0, 0.12); }
    .md2-accordion-tab .md2-accordion-header { position: relative; border-radius: 0; color: rgba(0, 0, 0, 0.54); font-weight: 500; cursor: pointer; display: block; align-items: inherit; line-height: 40px; margin: 0; max-height: 40px; overflow: hidden; padding: 0 35px 0 16px; text-align: left; text-decoration: none; white-space: nowrap; width: 100%; -moz-box-sizing: border-box; -webkit-box-sizing: border-box; box-sizing: border-box; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; -webkit-user-drag: none; }
    .md2-accordion-tab.md2-accordion-tab-disabled .md2-accordion-header { color: rgba(0,0,0,0.26); pointer-events: none; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; -webkit-user-drag: none; opacity: 0.5; cursor: default; }
    .md2-accordion-tab .md2-accordion-title { color: rgba(0,0,0,0.85); }
    .md2-accordion-tab.md2-accordion-tab-active .md2-accordion-title { color: #106cc8; }
    .md2-accordion-tab .md2-accordion-header-icon { position: absolute; top: 12px; right: 17px; width: 8px; height: 8px; overflow: hidden; display: inline-block; border-width: 0 2px 2px 0; border-style: solid; border-color: rgba(0, 0, 0, 0.54); -moz-transform: rotate(45deg); -ms-transform: rotate(45deg); -o-transform: rotate(45deg); -webkit-transform: rotate(45deg); transform: rotate(45deg); -moz-transition: 0.3s ease-in-out; -o-transition: 0.3s ease-in-out; -webkit-transition: 0.3s ease-in-out; transition: 0.3s ease-in-out; }
    .md2-accordion-tab.md2-accordion-tab-active .md2-accordion-header-icon { -moz-transform: rotate(225deg); -ms-transform: rotate(225deg); -o-transform: rotate(225deg); -webkit-transform: rotate(225deg); transform: rotate(225deg); top: 16px; }
    .md2-accordion-tab .md2-accordion-tab-content { position: relative; display: none; padding: 16px; }
    .md2-accordion-tab.md2-accordion-tab-active .md2-accordion-tab-content { display: block; }
  `],
        host: {
            'role': 'accordion-tab',
            '[class.md2-accordion-tab]': 'true',
            '[class.md2-accordion-tab-active]': 'active',
            '[class.md2-accordion-tab-disabled]': 'disabled'
        },
        encapsulation: core_1.ViewEncapsulation.None
    }), 
    __metadata('design:paramtypes', [accordionpanel_1.Md2Accordion])
], Md2AccordionTab);
exports.Md2AccordionTab = Md2AccordionTab;

//# sourceMappingURL=accordiontab.js.map
