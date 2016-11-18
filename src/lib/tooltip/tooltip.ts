import {
  AfterViewInit,
  ApplicationRef,
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  ElementRef,
  HostListener,
  Input,
  ReflectiveInjector,
  ViewContainerRef,
  ViewEncapsulation,
  NgModule,
  ModuleWithProviders
} from '@angular/core';
import { CommonModule } from '@angular/common';

export type TooltipPosition = 'before' | 'after' | 'above' | 'below';

@Directive({
  selector: '[tooltip]'
})
export class Md2Tooltip {
  private visible: boolean = false;
  private timer: any;

  @Input('tooltip') message: string;
  @Input('tooltip-position') position: TooltipPosition = 'below';
  @Input('tooltip-delay') delay: number = 0;

  private tooltip: ComponentRef<any>;

  constructor(private _componentFactory: ComponentFactoryResolver, private _appRef: ApplicationRef, private _viewContainer: ViewContainerRef) { }

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
      let app: any = this._appRef;
      let appContainer: ViewContainerRef = app['_rootComponents'][0]['_hostElement'].vcRef;

      let toastFactory = this._componentFactory.resolveComponentFactory(Md2TooltipComponent);
      let childInjector = ReflectiveInjector.fromResolvedProviders([], appContainer.parentInjector);
      this.tooltip = appContainer.createComponent(toastFactory, appContainer.length, childInjector);
      this.tooltip.instance.message = this.message;
      this.tooltip.instance.position = this.position;
      this.tooltip.instance.hostEl = this._viewContainer.element;
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
    if (this.tooltip) {
      this.tooltip.destroy();
      this.tooltip = null;
    }
  }
}

@Component({
  moduleId: module.id,
  selector: 'md2-tooltip',
  template: `
    <div class="md2-tooltip-container" [ngStyle]="{top: top, left: left}">
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
  private _isVisible: boolean;
  private top: string = '-1000px';
  private left: string = '-1000px';
  message: string;
  position: string;
  hostEl: ElementRef;

  constructor(private _element: ElementRef, private _changeDetector: ChangeDetectorRef) {
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
      providers: []
    };
  }
}
