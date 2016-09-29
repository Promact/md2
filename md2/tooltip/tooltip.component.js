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
        define(["require", "exports", '@angular/core', './tooltip.options'], factory);
    }
})(function (require, exports) {
    "use strict";
    var core_1 = require('@angular/core');
    var tooltip_options_1 = require('./tooltip.options');
    var Md2TooltipComponent = (function () {
        function Md2TooltipComponent(_element, _changeDetector, options) {
            this._element = _element;
            this._changeDetector = _changeDetector;
            this.top = '-1000px';
            this.left = '-1000px';
            Object.assign(this, options);
            this._isVisible = false;
        }
        Md2TooltipComponent.prototype.ngAfterViewInit = function () {
            var _position = this.positionElements(this.hostEl.nativeElement, this._element.nativeElement.children[0], this.position);
            this.top = _position.top + 'px';
            this.left = _position.left + 'px';
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
                        left: (hostElPos.left - targetElWidth) // > 0 ? (hostElPos.left - targetElWidth) : (hostElPos.width + hostElPos.left)
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
         * @return {width: number, height: number,top: number, left: number} object of with, height, top, left properties
         */
        Md2TooltipComponent.prototype.offset = function (nativeEl) {
            var boundingClientRect = nativeEl.getBoundingClientRect();
            return {
                width: boundingClientRect.width || nativeEl.offsetWidth,
                height: boundingClientRect.height || nativeEl.offsetHeight,
                top: boundingClientRect.top + (this.window.pageYOffset || this.document.documentElement.scrollTop) - this.document.body.scrollTop,
                left: boundingClientRect.left + (this.window.pageXOffset || this.document.documentElement.scrollLeft) - this.document.body.scrollLeft
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
            core_1.Component({selector: 'md2-tooltip',
                template: "\n    <div class=\"md2-tooltip-container\" [class.md2-tooltip-visible]=\"_isVisible\" [ngStyle]=\"{top: top, left: left}\">\n      <div class=\"md2-tooltip\" [innerHTML]=\"message\"></div>\n    </div>\n  ",
                styles: ["\n    .md2-tooltip-container { position: fixed; z-index: 1070; overflow: hidden; pointer-events: none; border-radius: 4px; font-weight: 500; font-style: normal; font-size: 10px; display: block; color: rgb(255,255,255); -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; -moz-backface-visibility: hidden; -webkit-backface-visibility: hidden; backface-visibility: hidden; }\n    md2-tooltip .md2-tooltip { position: relative; margin: 5px; color: #fff; text-align: center; opacity: 0; max-width: 200px; background-color: rgba(97, 97, 97, 0.9); border-radius: 4px; line-height: 1.5; padding: 4px 12px; -moz-transition: all .2s cubic-bezier(.25,.8,.25,1); -o-transition: all .2s cubic-bezier(.25,.8,.25,1); -webkit-transition: all .2s cubic-bezier(.25,.8,.25,1); transition: all .2s cubic-bezier(.25,.8,.25,1); -moz-transform-origin: center top; -ms-transform-origin: center top; -o-transform-origin: center top; -webkit-transform-origin: center top; transform-origin: center top; -moz-transform: scale(0); -ms-transform: scale(0); -o-transform: scale(0); -webkit-transform: scale(0); transform: scale(0); }\n    md2-tooltip.before .md2-tooltip { -moz-transform-origin: center right; -ms-transform-origin: center right; -o-transform-origin: center right; -webkit-transform-origin: center right; transform-origin: center right; }    \n    md2-tooltip.after .md2-tooltip { -moz-transform-origin: center left; -ms-transform-origin: center left; -o-transform-origin: center left; -webkit-transform-origin: center left; transform-origin: center left; }\n    md2-tooltip.above .md2-tooltip { -moz-transform-origin: center bottom; -ms-transform-origin: center bottom; -o-transform-origin: center bottom; -webkit-transform-origin: center bottom; transform-origin: center bottom; }\n    .md2-tooltip-visible .md2-tooltip { opacity: 1; -moz-transform: scale(1); -ms-transform: scale(1); -o-transform: scale(1); -webkit-transform: scale(1); transform: scale(1); }\n  "],
                host: {
                    'role': 'tooltip',
                    '[class]': 'position'
                },
                encapsulation: core_1.ViewEncapsulation.None
            }), 
            __metadata('design:paramtypes', [core_1.ElementRef, core_1.ChangeDetectorRef, tooltip_options_1.Md2TooltipOptions])
        ], Md2TooltipComponent);
        return Md2TooltipComponent;
    }());
    exports.Md2TooltipComponent = Md2TooltipComponent;
});

//# sourceMappingURL=tooltip.component.js.map
