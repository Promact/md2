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
const common_1 = require('@angular/common');
const tooltip_options_1 = require('./tooltip.options');
let Md2TooltipComponent = class Md2TooltipComponent {
    constructor(element, cdr, options) {
        this.top = '-1000px';
        this.left = '-1000px';
        this.element = element;
        this.cdr = cdr;
        Object.assign(this, options);
        this.show = false;
    }
    ngAfterViewInit() {
        let p = this.positionElements(this.hostEl.nativeElement, this.element.nativeElement.children[0], this.direction);
        this.top = p.top + 'px';
        this.left = p.left + 'px';
        this.show = true;
        this.cdr.detectChanges();
    }
    positionElements(hostEl, targetEl, direction) {
        let positionStrParts = direction.split('-');
        let pos0 = positionStrParts[0];
        let pos1 = positionStrParts[1] || 'center';
        let hostElPos = this.offset(hostEl);
        let targetElWidth = targetEl.offsetWidth;
        let targetElHeight = targetEl.offsetHeight;
        let shiftWidth = {
            center: hostElPos.left + hostElPos.width / 2 - targetElWidth / 2,
            left: hostElPos.left,
            right: hostElPos.left + hostElPos.width
        };
        let shiftHeight = {
            center: hostElPos.top + hostElPos.height / 2 - targetElHeight / 2,
            top: hostElPos.top,
            bottom: hostElPos.top + hostElPos.height
        };
        let targetElPos;
        switch (pos0) {
            case 'right':
                targetElPos = {
                    top: shiftHeight[pos1],
                    left: shiftWidth[pos0]
                };
                break;
            case 'left':
                targetElPos = {
                    top: shiftHeight[pos1],
                    left: (hostElPos.left - targetElWidth) // > 0 ? (hostElPos.left - targetElWidth) : (hostElPos.width + hostElPos.left)
                };
                break;
            case 'top':
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
    }
    offset(nativeEl) {
        let boundingClientRect = nativeEl.getBoundingClientRect();
        return {
            width: boundingClientRect.width || nativeEl.offsetWidth,
            height: boundingClientRect.height || nativeEl.offsetHeight,
            top: boundingClientRect.top + (this.window.pageYOffset || this.document.documentElement.scrollTop) - this.document.body.scrollTop,
            left: boundingClientRect.left + (this.window.pageXOffset || this.document.documentElement.scrollLeft) - this.document.body.scrollLeft
        };
    }
    get window() { return window; }
    get document() { return window.document; }
};
Md2TooltipComponent = __decorate([
    core_1.Component({
        selector: 'md2-tooltip',
        directives: [common_1.NgClass, common_1.NgStyle],
        template: `
    <div class="md2-tooltip" [class.md2-show]="show" [ngClass]="direction" [ngStyle]="{top: top, left: left}">
      <div class="md2-tooltip-inner">{{content}}</div>
    </div>
  `,
        styles: [`
    .md2-tooltip { position: fixed; z-index: 1070; overflow: hidden; pointer-events: none; border-radius: 4px; font-weight: 500; font-style: normal; font-size: 10px; display: block; color: rgb(255,255,255); -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; }
    .md2-tooltip .md2-tooltip-inner { position: relative; color: #fff; text-align: center; opacity: 0; min-height: 22px; max-width: 200px; background-color: rgba(0,0,0,0.8); border-radius: 4px; line-height: 1.5; padding: 4px 12px; -moz-transition: all .2s cubic-bezier(.25,.8,.25,1); -o-transition: all .2s cubic-bezier(.25,.8,.25,1); -webkit-transition: all .2s cubic-bezier(.25,.8,.25,1); transition: all .2s cubic-bezier(.25,.8,.25,1); -moz-transform-origin: center top; -ms-transform-origin: center top; -o-transform-origin: center top; -webkit-transform-origin: center top; transform-origin: center top; -moz-transform: scale(0); -ms-transform: scale(0); -o-transform: scale(0); -webkit-transform: scale(0); transform: scale(0); }
    .md2-tooltip.top .md2-tooltip-inner { -moz-transform-origin: center bottom; -ms-transform-origin: center bottom; -o-transform-origin: center bottom; -webkit-transform-origin: center bottom; transform-origin: center bottom; }
    .md2-tooltip.right .md2-tooltip-inner { -moz-transform-origin: center left; -ms-transform-origin: center left; -o-transform-origin: center left; -webkit-transform-origin: center left; transform-origin: center left; }
    .md2-tooltip.left .md2-tooltip-inner { -moz-transform-origin: center right; -ms-transform-origin: center right; -o-transform-origin: center right; -webkit-transform-origin: center right; transform-origin: center right; }
    .md2-show .md2-tooltip-inner { opacity: 1; -moz-transform: scale(1); -ms-transform: scale(1); -o-transform: scale(1); -webkit-transform: scale(1); transform: scale(1); }
  `],
        host: {
            'role': 'tooltip'
        },
        encapsulation: core_1.ViewEncapsulation.None
    }), 
    __metadata('design:paramtypes', [core_1.ElementRef, core_1.ChangeDetectorRef, tooltip_options_1.Md2TooltipOptions])
], Md2TooltipComponent);
exports.Md2TooltipComponent = Md2TooltipComponent;

//# sourceMappingURL=tooltip.component.js.map
