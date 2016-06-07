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
const tooltip_component_1 = require('./tooltip.component');
const tooltip_options_1 = require('./tooltip.options');
let Md2Tooltip = class Md2Tooltip {
    constructor(viewContainerRef, loader) {
        this.visible = false;
        this.direction = 'bottom';
        this.delay = 0;
        this.viewContainerRef = viewContainerRef;
        this.loader = loader;
    }
    show(event) {
        if (this.visible) {
            return;
        }
        this.visible = true;
        let options = new tooltip_options_1.Md2TooltipOptions({
            content: this.content,
            direction: this.direction,
            hostEl: this.viewContainerRef.element
        });
        let binding = core_1.ReflectiveInjector.resolve([
            new core_1.Provider(tooltip_options_1.Md2TooltipOptions, { useValue: options })
        ]);
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            this.timer = 0;
            this.tooltip = this.loader
                .loadNextToLocation(tooltip_component_1.Md2TooltipComponent, this.viewContainerRef, binding)
                .then((componentRef) => {
                return componentRef;
            });
        }, this.delay);
    }
    hide(event) {
        clearTimeout(this.timer);
        if (!this.visible) {
            return;
        }
        this.visible = false;
        if (this.tooltip) {
            this.tooltip.then((componentRef) => {
                componentRef.destroy();
                return componentRef;
            });
        }
    }
};
__decorate([
    core_1.Input('tooltip'), 
    __metadata('design:type', String)
], Md2Tooltip.prototype, "content", void 0);
__decorate([
    core_1.Input('tooltip-direction'), 
    __metadata('design:type', String)
], Md2Tooltip.prototype, "direction", void 0);
__decorate([
    core_1.Input('tooltip-delay'), 
    __metadata('design:type', Number)
], Md2Tooltip.prototype, "delay", void 0);
__decorate([
    core_1.HostListener('focusin', ['$event']),
    core_1.HostListener('mouseenter', ['$event']), 
    __metadata('design:type', Function), 
    __metadata('design:paramtypes', [Event]), 
    __metadata('design:returntype', void 0)
], Md2Tooltip.prototype, "show", null);
__decorate([
    core_1.HostListener('focusout', ['$event']),
    core_1.HostListener('mouseleave', ['$event']), 
    __metadata('design:type', Function), 
    __metadata('design:paramtypes', [Event]), 
    __metadata('design:returntype', void 0)
], Md2Tooltip.prototype, "hide", null);
Md2Tooltip = __decorate([
    core_1.Directive({
        selector: '[tooltip]'
    }), 
    __metadata('design:paramtypes', [core_1.ViewContainerRef, core_1.DynamicComponentLoader])
], Md2Tooltip);
exports.Md2Tooltip = Md2Tooltip;
exports.TOOLTIP_DIRECTIVES = [Md2Tooltip, tooltip_component_1.Md2TooltipComponent];

//# sourceMappingURL=tooltip.js.map
