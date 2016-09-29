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
        define(["require", "exports", '@angular/core', './accordionpanel'], factory);
    }
})(function (require, exports) {
    "use strict";
    var core_1 = require('@angular/core');
    var accordionpanel_1 = require('./accordionpanel');
    var Md2AccordionTab = (function () {
        function Md2AccordionTab(accordion) {
            this.accordion = accordion;
            this.class = '';
            this.accordion.addTab(this);
        }
        /**
         * Toggle the accordion
         * @param event
         * @return if it is disabled
         */
        Md2AccordionTab.prototype.toggle = function (event) {
            if (this.disabled) {
                event.preventDefault();
                return;
            }
            var index = this.findTabIndex();
            if (this.active) {
                this.active = !this.active;
                this.accordion.close.emit({ originalEvent: event, index: index });
            }
            else if (!this.accordion.multiple) {
                for (var i = 0; i < this.accordion.tabs.length; i++) {
                    this.accordion.tabs[i].active = false;
                }
                this.active = true;
                this.accordion.open.emit({ originalEvent: event, index: index });
            }
            else {
                this.active = true;
                this.accordion.open.emit({ originalEvent: event, index: index });
            }
            event.preventDefault();
        };
        /**
         * Find index of specific tab of accordion
         * @return index number of this tab
         */
        Md2AccordionTab.prototype.findTabIndex = function () {
            var index = -1;
            for (var i = 0; i < this.accordion.tabs.length; i++) {
                if (this.accordion.tabs[i] === this) {
                    index = i;
                    break;
                }
            }
            return index;
        };
        __decorate([
            core_1.Input(), 
            __metadata('design:type', String)
        ], Md2AccordionTab.prototype, "class", void 0);
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
            core_1.Component({selector: 'md2-accordion-tab',
                template: "\n    <div class=\"md2-accordion-header\" (click)=\"toggle($event)\">\n      <span class=\"md2-accordion-title\">{{header}}</span>\n      <span class=\"md2-accordion-header-icon\"></span>\n    </div>\n    <div class=\"md2-accordion-tab-content\">\n      <ng-content></ng-content>\n    </div>\n  ",
                styles: ["\n    .md2-accordion-tab { position: relative; display: block; outline: 0; border: 0; border-width: 1px 0; border-style: solid; border-color: transparent; -moz-box-sizing: border-box; -webkit-box-sizing: border-box; box-sizing: border-box; }\n    .md2-accordion-tab.md2-accordion-tab-active { border-color: rgba(0, 0, 0, 0.12); }\n    .md2-accordion-tab .md2-accordion-header { position: relative; border-radius: 0; color: rgba(0, 0, 0, 0.54); font-weight: 500; cursor: pointer; display: block; align-items: inherit; line-height: 40px; margin: 0; max-height: 40px; overflow: hidden; padding: 0 35px 0 16px; text-align: left; text-decoration: none; white-space: nowrap; width: 100%; -moz-box-sizing: border-box; -webkit-box-sizing: border-box; box-sizing: border-box; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; -webkit-user-drag: none; }\n    .md2-accordion-tab.md2-accordion-tab-disabled .md2-accordion-header { color: rgba(0,0,0,0.26); pointer-events: none; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; -webkit-user-drag: none; opacity: 0.5; cursor: default; }\n    .md2-accordion-tab .md2-accordion-title { color: rgba(0,0,0,0.85); }\n    .md2-accordion-tab.md2-accordion-tab-active .md2-accordion-title { color: #106cc8; }\n    .md2-accordion-tab .md2-accordion-header-icon { position: absolute; top: 12px; right: 17px; width: 8px; height: 8px; overflow: hidden; display: inline-block; border-width: 0 2px 2px 0; border-style: solid; border-color: rgba(0, 0, 0, 0.54); -moz-transform: rotate(45deg); -ms-transform: rotate(45deg); -o-transform: rotate(45deg); -webkit-transform: rotate(45deg); transform: rotate(45deg); -moz-transition: 0.3s ease-in-out; -o-transition: 0.3s ease-in-out; -webkit-transition: 0.3s ease-in-out; transition: 0.3s ease-in-out; }\n    .md2-accordion-tab.md2-accordion-tab-active .md2-accordion-header-icon { -moz-transform: rotate(225deg); -ms-transform: rotate(225deg); -o-transform: rotate(225deg); -webkit-transform: rotate(225deg); transform: rotate(225deg); top: 16px; }\n    .md2-accordion-tab .md2-accordion-tab-content { position: relative; display: none; padding: 16px; }\n    .md2-accordion-tab.md2-accordion-tab-active .md2-accordion-tab-content { display: block; }\n  "],
                host: {
                    'role': 'accordion-tab',
                    '[class]': 'class',
                    '[class.md2-accordion-tab]': 'true',
                    '[class.md2-accordion-tab-active]': 'active',
                    '[class.md2-accordion-tab-disabled]': 'disabled'
                },
                encapsulation: core_1.ViewEncapsulation.None
            }), 
            __metadata('design:paramtypes', [accordionpanel_1.Md2Accordion])
        ], Md2AccordionTab);
        return Md2AccordionTab;
    }());
    exports.Md2AccordionTab = Md2AccordionTab;
});

//# sourceMappingURL=accordiontab.js.map
