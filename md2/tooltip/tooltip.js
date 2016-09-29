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
        define(["require", "exports", '@angular/core', '@angular/common', './tooltip.component', './tooltip.options'], factory);
    }
})(function (require, exports) {
    "use strict";
    var core_1 = require('@angular/core');
    var common_1 = require('@angular/common');
    var tooltip_component_1 = require('./tooltip.component');
    var tooltip_options_1 = require('./tooltip.options');
    var Md2Tooltip = (function () {
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
            var options = new tooltip_options_1.Md2TooltipOptions({
                message: this.message,
                position: this.position,
                hostEl: this._viewContainer.element
            });
            clearTimeout(this.timer);
            this.timer = setTimeout(function () {
                _this.timer = 0;
                var app = _this._appRef;
                var appContainer = app['_rootComponents'][0]['_hostElement'].vcRef;
                var providers = core_1.ReflectiveInjector.resolve([
                    { provide: tooltip_options_1.Md2TooltipOptions, useValue: options }
                ]);
                var toastFactory = _this._componentFactory.resolveComponentFactory(tooltip_component_1.Md2TooltipComponent);
                var childInjector = core_1.ReflectiveInjector.fromResolvedProviders(providers, appContainer.parentInjector);
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
            core_1.Input('tooltip'), 
            __metadata('design:type', String)
        ], Md2Tooltip.prototype, "message", void 0);
        __decorate([
            core_1.Input('tooltip-position'), 
            __metadata('design:type', String)
        ], Md2Tooltip.prototype, "position", void 0);
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
            __metadata('design:paramtypes', [core_1.ComponentFactoryResolver, core_1.ApplicationRef, core_1.ViewContainerRef])
        ], Md2Tooltip);
        return Md2Tooltip;
    }());
    exports.Md2Tooltip = Md2Tooltip;
    exports.MD2_TOOLTIP_DIRECTIVES = [Md2Tooltip, tooltip_component_1.Md2TooltipComponent];
    var Md2TooltipModule = (function () {
        function Md2TooltipModule() {
        }
        Md2TooltipModule.forRoot = function () {
            return {
                ngModule: Md2TooltipModule,
                providers: [{
                        provide: tooltip_options_1.Md2TooltipOptions, useValue: {}
                    }]
            };
        };
        Md2TooltipModule = __decorate([
            core_1.NgModule({
                imports: [common_1.CommonModule],
                declarations: exports.MD2_TOOLTIP_DIRECTIVES,
                exports: exports.MD2_TOOLTIP_DIRECTIVES,
                providers: [],
                entryComponents: [tooltip_component_1.Md2TooltipComponent]
            }), 
            __metadata('design:paramtypes', [])
        ], Md2TooltipModule);
        return Md2TooltipModule;
    }());
    exports.Md2TooltipModule = Md2TooltipModule;
});

//# sourceMappingURL=tooltip.js.map
