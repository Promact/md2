import {
  ApplicationRef,
  ComponentRef,
  Directive,
  //DynamicComponentLoader,
  HostListener,
  Input,
  Provider,
  ReflectiveInjector,
  ViewContainerRef,
  NgModule,
  ModuleWithProviders,

  Optional, ComponentFactoryResolver

} from '@angular/core';
import {CommonModule} from '@angular/common';
//import { ViewContainerRef_ } from '@angular/core/src/linker/view_container_ref';
import { ComponentsHelper } from '../core/components.helper';
import { Md2TooltipComponent } from './tooltip.component';
import { Md2TooltipOptions } from './tooltip.options';


import {
  Overlay,
  OverlayState,
  OverlayModule,
  OverlayRef,
  ComponentPortal,
  OverlayConnectionPosition,
  OriginConnectionPosition,
  OVERLAY_PROVIDERS,
} from '../core/core';

@Directive({
  selector: '[tooltip]'
})

export class Md2Tooltip {
  private visible: boolean = false;
  private timer: any;

  @Input('tooltip') content: string;
  @Input('tooltip-direction') direction: string = 'bottom';
  @Input('tooltip-delay') delay: number = 0;

  private componentsHelper: ComponentsHelper;

  private tooltip: ComponentRef<any>;

  private appRef: any;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private _viewContainerRef: ViewContainerRef, componentsHelper: ComponentsHelper, appRef: ApplicationRef) {
    this.componentsHelper = componentsHelper;
    this.appRef = appRef;
  }

  /**
   * show tooltip while mouse enter or focus of element
   * @param event
   */
  @HostListener('focusin', ['$event'])
  @HostListener('mouseenter', ['$event'])
  public show(event: Event): void {
    //if (this.visible) {
    //  return;
    //}
    //this.visible = true;
    //let options = new Md2TooltipOptions({
    //  content: this.content,
    //  direction: this.direction,
    //  hostEl: this._viewContainerRef.element
    //});

    //let binding = ReflectiveInjector.resolve([
    //  { provide: Md2TooltipOptions, useValue: options }
    //]);
    //clearTimeout(this.timer);
    //this.timer = setTimeout(() => {
    //  this.timer = 0;
    //  //let appElement: ViewContainerRef = new ViewContainerRef_(this.appRef['_rootComponents'][0]._hostElement);
    //  let appContainer: ViewContainerRef = this.appRef['_rootComponents'][0]['_hostElement'].vcRef;

    //  //let toastFactory = this.componentFactoryResolver.resolveComponentFactory(Md2TooltipComponent);
    //  //let childInjector = ReflectiveInjector.fromResolvedProviders(binding, appContainer.parentInjector);
    //  //this.tooltip = appContainer.createComponent(toastFactory, appContainer.length, childInjector);

    //  let portal = new ComponentPortal(Md2TooltipComponent, this._viewContainerRef);
    //  this.tooltip = this.componentsHelper
    //    //.appendNextToRoot(Md2TooltipComponent, this.viewContainerRef, binding);
    //    .appendNextToLocation(Md2TooltipComponent, this._viewContainerRef, binding);

    //  //this.tooltip = this.loader
    //  //  .loadNextToLocation(Md2TooltipComponent, appElement, binding)
    //  //  .then((componentRef: ComponentRef<any>) => {
    //  //    return componentRef;
    //  //  });
    //}, this.delay);
  }

  /**
   * hide tooltip while mouse our/leave or blur of element
   * @param event
   */
  @HostListener('focusout', ['$event'])
  @HostListener('mouseleave', ['$event'])
  public hide(event: Event): void {
    //clearTimeout(this.timer);
    //if (!this.visible) {
    //  return;
    //}
    //this.visible = false;
    //if (this.tooltip) {
    //  this.tooltip.destroy();
    //  //this.tooltip = null;
    //  //this.tooltip.then((componentRef: ComponentRef<any>) => {
    //  //  componentRef.destroy();
    //  //  return componentRef;
    //  //});
    //}
  }
}

export const MD2_TOOLTIP_DIRECTIVES: any[] = [Md2Tooltip, Md2TooltipComponent];

@NgModule({
  declarations: MD2_TOOLTIP_DIRECTIVES,
  imports: [CommonModule],
  exports: MD2_TOOLTIP_DIRECTIVES,
})
export class Md2TooltipModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: Md2TooltipModule,
      providers: [ComponentsHelper]
    };
  }
}






////


//import {
//  NgModule,
//  ModuleWithProviders,
//  Component,
//  Directive,
//  Input,
//  ElementRef,
//  ViewContainerRef,
//  ChangeDetectorRef,
//  ViewEncapsulation,
//} from '@angular/core';
//import {
//  Overlay,
//  OverlayState,
//  OverlayModule,
//  OverlayRef,
//  ComponentPortal,
//  OverlayConnectionPosition,
//  OriginConnectionPosition,
//  OVERLAY_PROVIDERS,
//} from '../core/core';

//export type TooltipPosition = 'before' | 'after' | 'above' | 'below';

//@Directive({
//  selector: '[tooltip]',
//  host: {
//    '(mouseenter)': '_handleMouseEnter($event)',
//    '(mouseleave)': '_handleMouseLeave($event)',
//  }
//})
//export class Md2Tooltip {
//  visible: boolean = false;

//  @Input('tooltip-delay') delay: number = 0;

//  /** Allows the user to define the position of the tooltip relative to the parent element */
//  @Input('tooltip-position') position: TooltipPosition = 'below';
//  //private _position: TooltipPosition = 'below';
//  //@Input('tooltip-position') get position(): TooltipPosition {
//  //  return this._position;
//  //}
//  //set position(value: TooltipPosition) {
//  //  if (value !== this._position) {
//  //    this._position = value;
//  //    //this._createOverlay();
//  //    this._updatePosition();
//  //  }
//  //}

//  /** The message to be displayed in the tooltip */
//  private _message: string;
//  @Input('tooltip') get message() {
//    return this._message;
//  }
//  set message(value: string) {
//    this._message = value;
//    this._updatePosition();
//  }

//  private _overlayRef: OverlayRef;

//  constructor(private _overlay: Overlay, private _elementRef: ElementRef,
//    private _viewContainerRef: ViewContainerRef,
//    private _changeDetectionRef: ChangeDetectorRef) { }

//  /**
//   * Create overlay on init
//   * TODO: internal
//   */
//  ngOnInit() {
//    this._createOverlay();
//  }

//  /**
//   * Create the overlay config and position strategy
//   */
//  private _createOverlay() {
//    if (this._overlayRef) {
//      if (this.visible) {
//        // if visible, hide before destroying
//        this.hide();
//        this._createOverlay();
//      } else {
//        // if not visible, dispose and recreate
//        this._overlayRef.dispose();
//        this._overlayRef = null;
//        this._createOverlay();
//      }
//    } else {
//      let origin = this._getOrigin();
//      let position = this._getOverlayPosition();
//      let strategy = this._overlay.position().connectedTo(this._elementRef, origin, position);
//      let config = new OverlayState();
//      config.positionStrategy = strategy;

//      this._overlayRef = this._overlay.create(config);
//    }
//  }

//  /**
//   * Returns the origin position based on the user's position preference
//   */
//  private _getOrigin(): OriginConnectionPosition {
//    switch (this.position) {
//      case 'before': return { originX: 'start', originY: 'center' };
//      case 'after': return { originX: 'end', originY: 'center' };
//      case 'above': return { originX: 'center', originY: 'top' };
//      case 'below': return { originX: 'center', originY: 'bottom' };
//    }
//  }

//  /**
//   * Returns the overlay position based on the user's preference
//   */
//  private _getOverlayPosition(): OverlayConnectionPosition {
//    switch (this.position) {
//      case 'before': return { overlayX: 'end', overlayY: 'center' };
//      case 'after': return { overlayX: 'start', overlayY: 'center' };
//      case 'above': return { overlayX: 'center', overlayY: 'bottom' };
//      case 'below': return { overlayX: 'center', overlayY: 'top' };
//    }
//  }

//  /**
//   * Shows the tooltip on mouse enter
//   * @param event
//   */
//  _handleMouseEnter(event: MouseEvent) {
//    this.show();
//  }

//  /**
//   * Hides the tooltip on mouse leave
//   * @param event
//   */
//  _handleMouseLeave(event: MouseEvent) {
//    this.hide();
//  }

//  /**
//   * Shows the tooltip and returns a promise that will resolve when the tooltip is visible
//   */
//  show(): void {
//    if (!this.visible && this._overlayRef && !this._overlayRef.hasAttached()) {
//      this.visible = true;

//      let portal = new ComponentPortal(Md2TooltipComponent, this._viewContainerRef);
//      let tooltipRef = this._overlayRef.attach(portal);
//      tooltipRef.instance.message = this.message;
//      tooltipRef.instance.position = this.position;
//      this._updatePosition();
//    }
//  }

//  /**
//   * Hides the tooltip and returns a promise that will resolve when the tooltip is hidden
//   */
//  hide(): void {
//    if (this.visible && this._overlayRef && this._overlayRef.hasAttached()) {
//      this.visible = false;
//      this._overlayRef.detach();
//    }
//  }

//  /**
//   * Shows/hides the tooltip and returns a promise that will resolve when it is done
//   */
//  toggle(): void {
//    if (this.visible) {
//      this.hide();
//    } else {
//      this.show();
//    }
//  }

//  /**
//   * Updates the tooltip's position
//   */
//  private _updatePosition() {
//    if (this._overlayRef) {
//      this._changeDetectionRef.detectChanges();
//      this._overlayRef.updatePosition();
//    }
//  }
//}

//@Component({
//  moduleId: module.id,
//  selector: 'md2-tooltip',
//  template: `<div class="md2-tooltip-inner {{position}}">{{message}}</div>`,
//  styles: [`
//.md-overlay-container {
//    position: absolute;
//    pointer-events: none;
//    top: 0;
//    left: 0;
//    height: 100%;
//    width: 100%;
//    z-index: 1;
//}
//    md2-tooltip { position: fixed; z-index: 1070; overflow: hidden; pointer-events: none; border-radius: 4px; font-weight: 500; font-style: normal; font-size: 10px; display: block; color: rgb(255,255,255); -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; -moz-backface-visibility: hidden; -webkit-backface-visibility: hidden; backface-visibility: hidden; }
//    md2-tooltip .md2-tooltip-inner { position: relative; color: #fff; text-align: center; opacity: 0; max-width: 200px; background-color: rgba(0,0,0,0.8); border-radius: 4px; line-height: 1.5; padding: 4px 12px; margin: 14px; -moz-transition: all .2s cubic-bezier(.25,.8,.25,1); -o-transition: all .2s cubic-bezier(.25,.8,.25,1); -webkit-transition: all .2s cubic-bezier(.25,.8,.25,1); transition: all .2s cubic-bezier(.25,.8,.25,1); -moz-transform-origin: center top; -ms-transform-origin: center top; -o-transform-origin: center top; -webkit-transform-origin: center top; transform-origin: center top; -moz-transform: scale(0); -ms-transform: scale(0); -o-transform: scale(0); -webkit-transform: scale(0); transform: scale(0); }
//    md2-tooltip .md2-tooltip-inner.before { -moz-transform-origin: center right; -ms-transform-origin: center right; -o-transform-origin: center right; -webkit-transform-origin: center right; transform-origin: center right; }    
//    md2-tooltip .md2-tooltip-inner.after { -moz-transform-origin: center left; -ms-transform-origin: center left; -o-transform-origin: center left; -webkit-transform-origin: center left; transform-origin: center left; }
//    md2-tooltip .md2-tooltip-inner.above { -moz-transform-origin: center bottom; -ms-transform-origin: center bottom; -o-transform-origin: center bottom; -webkit-transform-origin: center bottom; transform-origin: center bottom; }
//    md2-tooltip .md2-tooltip-inner { opacity: 1; -moz-transform: scale(1); -ms-transform: scale(1); -o-transform: scale(1); -webkit-transform: scale(1); transform: scale(1); }
//  `],
//  encapsulation: ViewEncapsulation.None,
//})
//export class Md2TooltipComponent {
//  message: string;
//  position: string;
//}


//@NgModule({
//  imports: [OverlayModule],
//  exports: [Md2Tooltip, Md2TooltipComponent],
//  declarations: [Md2Tooltip, Md2TooltipComponent],
//  entryComponents: [Md2TooltipComponent],
//})
//export class Md2TooltipModule {
//  static forRoot(): ModuleWithProviders {
//    return {
//      ngModule: Md2TooltipModule,
//      providers: OVERLAY_PROVIDERS,
//    };
//  }
//}
