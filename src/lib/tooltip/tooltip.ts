import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  HostListener,
  Input,
  ReflectiveInjector,
  ViewContainerRef,
  NgModule,
  ModuleWithProviders
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Md2TooltipComponent } from './tooltip.component';
import { Md2TooltipOptions } from './tooltip.options';

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
    let options = new Md2TooltipOptions({
      message: this.message,
      position: this.position,
      hostEl: this._viewContainer.element
    });

    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.timer = 0;
      let app: any = this._appRef;
      let appContainer: ViewContainerRef = app['_rootComponents'][0]['_hostElement'].vcRef;

      let providers = ReflectiveInjector.resolve([
        { provide: Md2TooltipOptions, useValue: <Md2TooltipOptions>options }
      ]);

      let toastFactory = this._componentFactory.resolveComponentFactory(Md2TooltipComponent);
      let childInjector = ReflectiveInjector.fromResolvedProviders(providers, appContainer.parentInjector);
      this.tooltip = appContainer.createComponent(toastFactory, appContainer.length, childInjector);
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
      providers: [{
        provide: Md2TooltipOptions, useValue: {}
      }]
    };
  }
}
