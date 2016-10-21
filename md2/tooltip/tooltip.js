var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ApplicationRef, ComponentFactoryResolver, Directive, HostListener, Input, ReflectiveInjector, ViewContainerRef, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Md2TooltipComponent } from './tooltip.component';
import { Md2TooltipOptions } from './tooltip.options';
export var Md2Tooltip = (function () {
    function Md2Tooltip(_componentFactory, _appRef, _viewContainer) {
        this._componentFactory = _componentFactory;
        this._appRef = _appRef;
        this._viewContainer = _viewContainer;
        this.visible = false;
        this.position = 'below';
        this.delay = 0;
    }
    /**
     * show tooltip while mouse enter or focus of element
     * @param event
     */
    Md2Tooltip.prototype.show = function (event) {
        var _this = this;
        if (this.visible) {
            return;
        }
        this.visible = true;
        var options = new Md2TooltipOptions({
            message: this.message,
            position: this.position,
            hostEl: this._viewContainer.element
        });
        clearTimeout(this.timer);
        this.timer = setTimeout(function () {
            _this.timer = 0;
            var app = _this._appRef;
            var appContainer = app['_rootComponents'][0]['_hostElement'].vcRef;
            var providers = ReflectiveInjector.resolve([
                { provide: Md2TooltipOptions, useValue: options }
            ]);
            var toastFactory = _this._componentFactory.resolveComponentFactory(Md2TooltipComponent);
            var childInjector = ReflectiveInjector.fromResolvedProviders(providers, appContainer.parentInjector);
            _this.tooltip = appContainer.createComponent(toastFactory, appContainer.length, childInjector);
        }, this.delay);
    };
    /**
     * hide tooltip while mouse our/leave or blur of element
     * @param event
     */
    Md2Tooltip.prototype.hide = function (event) {
        clearTimeout(this.timer);
        if (!this.visible) {
            return;
        }
        this.visible = false;
        if (this.tooltip) {
            this.tooltip.destroy();
            this.tooltip = null;
        }
    };
    __decorate([
        Input('tooltip'), 
        __metadata('design:type', String)
    ], Md2Tooltip.prototype, "message", void 0);
    __decorate([
        Input('tooltip-position'), 
        __metadata('design:type', String)
    ], Md2Tooltip.prototype, "position", void 0);
    __decorate([
        Input('tooltip-delay'), 
        __metadata('design:type', Number)
    ], Md2Tooltip.prototype, "delay", void 0);
    __decorate([
        HostListener('focusin', ['$event']),
        HostListener('mouseenter', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Event]), 
        __metadata('design:returntype', void 0)
    ], Md2Tooltip.prototype, "show", null);
    __decorate([
        HostListener('focusout', ['$event']),
        HostListener('mouseleave', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Event]), 
        __metadata('design:returntype', void 0)
    ], Md2Tooltip.prototype, "hide", null);
    Md2Tooltip = __decorate([
        Directive({
            selector: '[tooltip]'
        }), 
        __metadata('design:paramtypes', [ComponentFactoryResolver, ApplicationRef, ViewContainerRef])
    ], Md2Tooltip);
    return Md2Tooltip;
}());
export var MD2_TOOLTIP_DIRECTIVES = [Md2Tooltip, Md2TooltipComponent];
export var Md2TooltipModule = (function () {
    function Md2TooltipModule() {
    }
    Md2TooltipModule.forRoot = function () {
        return {
            ngModule: Md2TooltipModule,
            providers: [{
                    provide: Md2TooltipOptions, useValue: {}
                }]
        };
    };
    Md2TooltipModule = __decorate([
        NgModule({
            imports: [CommonModule],
            exports: MD2_TOOLTIP_DIRECTIVES,
            declarations: MD2_TOOLTIP_DIRECTIVES,
            entryComponents: [Md2TooltipComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], Md2TooltipModule);
    return Md2TooltipModule;
}());

//# sourceMappingURL=tooltip.js.map
