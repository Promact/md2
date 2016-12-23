var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ChangeDetectorRef, Component, Directive, ElementRef, HostListener, Input, ViewContainerRef, ViewEncapsulation, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Overlay, OverlayState, ComponentPortal, OVERLAY_PROVIDERS } from '../core';
export var Md2Tooltip = (function () {
    function Md2Tooltip(_viewContainer, _overlay) {
        this._viewContainer = _viewContainer;
        this._overlay = _overlay;
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
        clearTimeout(this.timer);
        this.timer = setTimeout(function () {
            _this.timer = 0;
            var strategy = _this._overlay.position().global().top('0').left('0');
            var config = new OverlayState();
            config.positionStrategy = strategy;
            _this._overlayRef = _this._overlay.create(config);
            var portal = new ComponentPortal(Md2TooltipComponent);
            _this._tooltipInstance = _this._overlayRef.attach(portal).instance;
            _this._tooltipInstance.message = _this.message;
            _this._tooltipInstance.position = _this.position;
            _this._tooltipInstance.hostEl = _this._viewContainer.element;
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
        if (this._tooltipInstance) {
            this._overlayRef.dispose();
            this._overlayRef = null;
            this._tooltipInstance = null;
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
        __metadata('design:paramtypes', [ViewContainerRef, Overlay])
    ], Md2Tooltip);
    return Md2Tooltip;
}());
export var Md2TooltipComponent = (function () {
    function Md2TooltipComponent(_element, _changeDetector) {
        this._element = _element;
        this._changeDetector = _changeDetector;
        this._top = '-1000px';
        this._left = '-1000px';
        this._isVisible = false;
    }
    Md2TooltipComponent.prototype.ngAfterViewInit = function () {
        var _position = this.positionElements(this.hostEl.nativeElement, this._element.nativeElement.children[0], this.position);
        this._top = _position.top + 'px';
        this._left = _position.left + 'px';
        this._isVisible = true;
        this._changeDetector.detectChanges();
    };
    /**
     * calculate position of target element
     * @param hostEl host element
     * @param targetEl targer element
     * @param position position
     * @return {top: number, left: number} object of top, left properties
     */
    Md2TooltipComponent.prototype.positionElements = function (hostEl, targetEl, position) {
        var positionStrParts = position.split('-');
        var pos0 = positionStrParts[0];
        var pos1 = positionStrParts[1] || 'center';
        var hostElPos = this.offset(hostEl);
        var targetElWidth = targetEl.offsetWidth;
        var targetElHeight = targetEl.offsetHeight;
        var shiftWidth = {
            center: hostElPos.left + hostElPos.width / 2 - targetElWidth / 2,
            before: hostElPos.left,
            after: hostElPos.left + hostElPos.width
        };
        var shiftHeight = {
            center: hostElPos.top + hostElPos.height / 2 - targetElHeight / 2,
            above: hostElPos.top,
            below: hostElPos.top + hostElPos.height
        };
        var targetElPos;
        switch (pos0) {
            case 'before':
                targetElPos = {
                    top: shiftHeight[pos1],
                    left: (hostElPos.left - targetElWidth)
                };
                break;
            case 'after':
                targetElPos = {
                    top: shiftHeight[pos1],
                    left: shiftWidth[pos0]
                };
                break;
            case 'above':
                targetElPos = {
                    top: hostElPos.top - targetElHeight,
                    left: shiftWidth[pos1]
                };
                break;
            default:
                targetElPos = {
                    top: shiftHeight[pos0],
                    left: shiftWidth[pos1]
                };
                break;
        }
        return targetElPos;
    };
    /**
     * calculate offset of target element
     * @param nativeEl element
     * @return {width: number, height: number,top: number, left: number}
     *         object of with, height, top, left properties
     */
    Md2TooltipComponent.prototype.offset = function (nativeEl) {
        var boundingClientRect = nativeEl.getBoundingClientRect();
        return {
            width: boundingClientRect.width || nativeEl.offsetWidth,
            height: boundingClientRect.height || nativeEl.offsetHeight,
            top: boundingClientRect.top,
            left: boundingClientRect.left
        };
    };
    Object.defineProperty(Md2TooltipComponent.prototype, "window", {
        get: function () { return window; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2TooltipComponent.prototype, "document", {
        get: function () { return window.document; },
        enumerable: true,
        configurable: true
    });
    Md2TooltipComponent = __decorate([
        Component({selector: 'md2-tooltip',
            template: "\n    <div class=\"md2-tooltip-container\" [ngStyle]=\"{top: _top, left: _left}\">\n      <div class=\"md2-tooltip {{position}}\" [class.visible]=\"_isVisible\">{{message}}</div>\n    </div>\n  ",
            styles: ["md2-tooltip { pointer-events: none; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; -webkit-backface-visibility: hidden; backface-visibility: hidden; } md2-tooltip .md2-tooltip-container { position: fixed; display: block; overflow: hidden; z-index: 1070; } md2-tooltip .md2-tooltip { max-width: 200px; margin: 14px; padding: 4px 12px; font-family: \"\"; color: white; font-size: 10px; word-wrap: break-word; background-color: rgba(97, 97, 97, 0.9); border-radius: 2px; line-height: 1.5; opacity: 0; transition: all 200ms cubic-bezier(0.25, 0.8, 0.25, 1); transform-origin: center top; transform: scale(0); } md2-tooltip .md2-tooltip.before { transform-origin: center right; } md2-tooltip .md2-tooltip.after { transform-origin: center left; } md2-tooltip .md2-tooltip.above { transform-origin: center bottom; } md2-tooltip .md2-tooltip.visible { opacity: 1; transform: scale(1); } .cdk-visually-hidden { border: 0; clip: rect(0 0 0 0); height: 1px; margin: -1px; overflow: hidden; padding: 0; position: absolute; text-transform: none; width: 1px; } .cdk-overlay-container, .cdk-global-overlay-wrapper { pointer-events: none; top: 0; left: 0; height: 100%; width: 100%; } .cdk-overlay-container { position: fixed; z-index: 1000; } .cdk-global-overlay-wrapper { display: flex; position: absolute; z-index: 1000; } .cdk-overlay-pane { position: absolute; pointer-events: auto; box-sizing: border-box; z-index: 1000; } .cdk-overlay-backdrop { position: absolute; top: 0; bottom: 0; left: 0; right: 0; z-index: 1; pointer-events: auto; transition: opacity 400ms cubic-bezier(0.25, 0.8, 0.25, 1); opacity: 0; } .cdk-overlay-backdrop.cdk-overlay-backdrop-showing { opacity: 0.48; } .cdk-overlay-dark-backdrop { background: #212121; } /*# sourceMappingURL=tooltip.css.map */ "],
            host: {
                'role': 'tooltip',
            },
            encapsulation: ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [ElementRef, ChangeDetectorRef])
    ], Md2TooltipComponent);
    return Md2TooltipComponent;
}());
export var MD2_TOOLTIP_DIRECTIVES = [Md2Tooltip, Md2TooltipComponent];
export var Md2TooltipModule = (function () {
    function Md2TooltipModule() {
    }
    Md2TooltipModule.forRoot = function () {
        return {
            ngModule: Md2TooltipModule,
            providers: [OVERLAY_PROVIDERS]
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
