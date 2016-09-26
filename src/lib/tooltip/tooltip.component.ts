import {
  AfterViewInit,
  Component,
  ChangeDetectorRef,
  ElementRef,
  HostBinding,
  ViewEncapsulation
} from '@angular/core';
import { Md2TooltipOptions } from './tooltip.options';

@Component({
  moduleId: module.id,
  selector: 'md2-tooltip',
  template: `
    <div class="md2-tooltip {{position}}" [class.md2-tooltip-visible]="_isVisible" [ngStyle]="{top: top, left: left}">
      <div class="md2-tooltip-inner" [innerHTML]="message"></div>
    </div>
  `,
  styles: [`
    .md2-tooltip { position: fixed; z-index: 1070; overflow: hidden; pointer-events: none; border-radius: 4px; font-weight: 500; font-style: normal; font-size: 10px; display: block; color: rgb(255,255,255); -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; -moz-backface-visibility: hidden; -webkit-backface-visibility: hidden; backface-visibility: hidden; }
    .md2-tooltip .md2-tooltip-inner { position: relative; margin: 5px; color: #fff; text-align: center; opacity: 0; max-width: 200px; background-color: rgba(97, 97, 97, 0.9); border-radius: 4px; line-height: 1.5; padding: 4px 12px; -moz-transition: all .2s cubic-bezier(.25,.8,.25,1); -o-transition: all .2s cubic-bezier(.25,.8,.25,1); -webkit-transition: all .2s cubic-bezier(.25,.8,.25,1); transition: all .2s cubic-bezier(.25,.8,.25,1); -moz-transform-origin: center top; -ms-transform-origin: center top; -o-transform-origin: center top; -webkit-transform-origin: center top; transform-origin: center top; -moz-transform: scale(0); -ms-transform: scale(0); -o-transform: scale(0); -webkit-transform: scale(0); transform: scale(0); }
    .md2-tooltip.before .md2-tooltip-inner { -moz-transform-origin: center right; -ms-transform-origin: center right; -o-transform-origin: center right; -webkit-transform-origin: center right; transform-origin: center right; }    
    .md2-tooltip.after .md2-tooltip-inner { -moz-transform-origin: center left; -ms-transform-origin: center left; -o-transform-origin: center left; -webkit-transform-origin: center left; transform-origin: center left; }
    .md2-tooltip.above .md2-tooltip-inner { -moz-transform-origin: center bottom; -ms-transform-origin: center bottom; -o-transform-origin: center bottom; -webkit-transform-origin: center bottom; transform-origin: center bottom; }
    .md2-tooltip-visible .md2-tooltip-inner { opacity: 1; -moz-transform: scale(1); -ms-transform: scale(1); -o-transform: scale(1); -webkit-transform: scale(1); transform: scale(1); }
  `],
  host: {
    'role': 'tooltip'
  },
  encapsulation: ViewEncapsulation.None
})
export class Md2TooltipComponent implements AfterViewInit {
  private _isVisible: boolean;
  private top: string = '-1000px';
  private left: string = '-1000px';
  private message: string;
  private position: string;
  private hostEl: ElementRef;

  constructor(private _element: ElementRef, private _changeDetector: ChangeDetectorRef, options: Md2TooltipOptions) {
    Object.assign(this, options);
    this._isVisible = false;
  }

  ngAfterViewInit() {
    let _position = this.positionElements(this.hostEl.nativeElement, this._element.nativeElement.children[0], this.position);
    this.top = _position.top + 'px';
    this.left = _position.left + 'px';
    this._isVisible = true;
    this._changeDetector.detectChanges();
  }

  /**
   * calculate position of target element
   * @param hostEl host element
   * @param targetEl targer element
   * @param position position
   * @return {top: number, left: number} object of top, left properties
   */
  private positionElements(hostEl: HTMLElement, targetEl: HTMLElement, position: string): { top: number, left: number } {
    let positionStrParts = position.split('-');
    let pos0 = positionStrParts[0];
    let pos1 = positionStrParts[1] || 'center';
    let hostElPos = this.offset(hostEl);
    let targetElWidth = targetEl.offsetWidth;
    let targetElHeight = targetEl.offsetHeight;
    let shiftWidth: any = {
      center: hostElPos.left + hostElPos.width / 2 - targetElWidth / 2,
      before: hostElPos.left,
      after: hostElPos.left + hostElPos.width
    };

    let shiftHeight: any = {
      center: hostElPos.top + hostElPos.height / 2 - targetElHeight / 2,
      above: hostElPos.top,
      below: hostElPos.top + hostElPos.height
    };

    let targetElPos: { top: number, left: number };
    switch (pos0) {
      case 'before':
        targetElPos = {
          top: shiftHeight[pos1],
          left: (hostElPos.left - targetElWidth)// > 0 ? (hostElPos.left - targetElWidth) : (hostElPos.width + hostElPos.left)
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
  }

  /**
   * calculate offset of target element
   * @param nativeEl element
   * @return {width: number, height: number,top: number, left: number} object of with, height, top, left properties
   */
  private offset(nativeEl: any): { width: number, height: number, top: number, left: number } {
    let boundingClientRect = nativeEl.getBoundingClientRect();
    return {
      width: boundingClientRect.width || nativeEl.offsetWidth,
      height: boundingClientRect.height || nativeEl.offsetHeight,
      top: boundingClientRect.top + (this.window.pageYOffset || this.document.documentElement.scrollTop) - this.document.body.scrollTop,
      left: boundingClientRect.left + (this.window.pageXOffset || this.document.documentElement.scrollLeft) - this.document.body.scrollLeft
    };
  }

  private get window(): Window { return window; }

  private get document(): Document { return window.document; }

}
