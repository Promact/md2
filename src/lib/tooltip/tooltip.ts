import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Directive,
  ElementRef,
  HostListener,
  Input,
  ViewContainerRef,
  ViewEncapsulation,
  NgModule,
  ModuleWithProviders
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Overlay,
  OverlayState,
  OverlayRef,
  ComponentPortal,
  OVERLAY_PROVIDERS
} from '../core';

export type TooltipPosition = 'before' | 'after' | 'above' | 'below';

@Directive({
  selector: '[tooltip]'
})
export class Md2Tooltip {
  private visible: boolean = false;
  private timer: any;

  _overlayRef: OverlayRef;
  _tooltipInstance: Md2TooltipComponent;

  @Input('tooltip') message: string;
  @Input('tooltip-position') position: TooltipPosition = 'below';
  @Input('tooltip-delay') delay: number = 0;

  constructor(private _viewContainer: ViewContainerRef, private _overlay: Overlay) { }

  /**
   * show tooltip while mouse enter or focus of element
   * @param event
   */
  @HostListener('focusin', ['$event'])
  @HostListener('mouseenter', ['$event'])
  public show(event: Event): void {
    if (this.visible) {
      return;
    }
    this.visible = true;

    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.timer = 0;

      let strategy = this._overlay.position().global().fixed().top('0').left('0');
      let config = new OverlayState();
      config.positionStrategy = strategy;

      this._overlayRef = this._overlay.create(config);
      let portal = new ComponentPortal(Md2TooltipComponent);
      this._tooltipInstance = this._overlayRef.attach(portal).instance;

      this._tooltipInstance.message = this.message;
      this._tooltipInstance.position = this.position;
      this._tooltipInstance.hostEl = this._viewContainer.element;
    }, this.delay);
  }

  /**
   * hide tooltip while mouse our/leave or blur of element
   * @param event
   */
  @HostListener('focusout', ['$event'])
  @HostListener('mouseleave', ['$event'])
  public hide(event: Event): void {
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
  }
}

@Component({
  moduleId: module.id,
  selector: 'md2-tooltip',
  template: `
    <div class="md2-tooltip-container" [ngStyle]="{top: _top, left: _left}">
      <div class="md2-tooltip {{position}}" [class.visible]="_isVisible">{{message}}</div>
    </div>
  `,
  styleUrls: ['tooltip.css'],
  host: {
    'role': 'tooltip',
  },
  encapsulation: ViewEncapsulation.None
})
export class Md2TooltipComponent implements AfterViewInit {
  _isVisible: boolean;
  _top: string = '-1000px';
  _left: string = '-1000px';
  message: string;
  position: string;
  hostEl: ElementRef;

  constructor(private _element: ElementRef, private _changeDetector: ChangeDetectorRef) {
    this._isVisible = false;
  }

  ngAfterViewInit() {
    let _position = this.positionElements(this.hostEl.nativeElement, this._element.nativeElement.children[0], this.position);
    this._top = _position.top + 'px';
    this._left = _position.left + 'px';
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
      top: boundingClientRect.top,
      left: boundingClientRect.left
    };
  }

  private get window(): Window { return window; }

  private get document(): Document { return window.document; }

}

export const MD2_TOOLTIP_DIRECTIVES: any[] = [Md2Tooltip, Md2TooltipComponent];

@NgModule({
  imports: [CommonModule],
  exports: MD2_TOOLTIP_DIRECTIVES,
  declarations: MD2_TOOLTIP_DIRECTIVES,
  entryComponents: [Md2TooltipComponent]
})
export class Md2TooltipModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: Md2TooltipModule,
      providers: [OVERLAY_PROVIDERS]
    };
  }
}
