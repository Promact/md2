import {
  NgModule,
  ModuleWithProviders,
  Component,
  Directive,
  Input,
  ElementRef,
  ViewContainerRef,
  ChangeDetectorRef,
  ViewEncapsulation
} from '@angular/core';
import {
  Overlay,
  OverlayState,
  OverlayModule,
  OverlayRef,
  ComponentPortal,
  OverlayConnectionPosition,
  OriginConnectionPosition,
  OVERLAY_PROVIDERS,
} from '../core';

export type TooltipPosition = 'before' | 'after' | 'above' | 'below';

@Directive({
  selector: '[tooltip]',
  host: {
    '(mouseenter)': '_handleMouseEnter($event)',
    '(mouseleave)': '_handleMouseLeave($event)',
  }
})
export class Md2Tooltip {
  visible: boolean = false;

  /** Allows the user to define the delay of the tooltip */
  private _delay: any;
  @Input('tooltip-delay') delay: number = 0;

  /** Allows the user to define the position of the tooltip relative to the parent element */
  private _position: TooltipPosition = 'below';
  @Input('tooltip-position')
  get position(): TooltipPosition {
    return this._position;
  }
  set position(value: TooltipPosition) {
    if (value !== this._position) {
      this._position = value;
      this._createOverlay();
      this._updatePosition();
    }
  }

  /** The message to be displayed in the tooltip */
  private _message: string;
  @Input('tooltip') get message() {
    return this._message;
  }
  set message(value: string) {
    this._message = value;
    this._updatePosition();
  }

  private _overlayRef: OverlayRef;

  constructor(private _overlay: Overlay, private _elementRef: ElementRef,
    private _viewContainerRef: ViewContainerRef,
    private _changeDetectionRef: ChangeDetectorRef) { }

  /**
   * Create overlay on init
   * TODO: internal
   */
  ngOnInit() {
    this._createOverlay();
  }

  /**
   * Create the overlay config and position strategy
   */
  private _createOverlay() {
    if (this._overlayRef) {
      if (this.visible) {
        // if visible, hide before destroying
        this.hide();
        this._createOverlay();
      } else {
        // if not visible, dispose and recreate
        this._overlayRef.dispose();
        this._overlayRef = null;
        this._createOverlay();
      }
    } else {
      let origin = this._getOrigin();
      let position = this._getOverlayPosition();
      let strategy = this._overlay.position().connectedTo(this._elementRef, origin, position);
      let config = new OverlayState();
      config.positionStrategy = strategy;

      this._overlayRef = this._overlay.create(config);
    }
  }

  /**
   * Returns the origin position based on the user's position preference
   */
  private _getOrigin(): OriginConnectionPosition {
    switch (this.position) {
      case 'before': return { originX: 'start', originY: 'center' };
      case 'after': return { originX: 'end', originY: 'center' };
      case 'above': return { originX: 'center', originY: 'top' };
      case 'below': return { originX: 'center', originY: 'bottom' };
    }
  }

  /**
   * Returns the overlay position based on the user's preference
   */
  private _getOverlayPosition(): OverlayConnectionPosition {
    switch (this.position) {
      case 'before': return { overlayX: 'end', overlayY: 'center' };
      case 'after': return { overlayX: 'start', overlayY: 'center' };
      case 'above': return { overlayX: 'center', overlayY: 'bottom' };
      case 'below': return { overlayX: 'center', overlayY: 'top' };
    }
  }

  /**
   * Shows the tooltip on mouse enter
   * @param event
   */
  _handleMouseEnter(event: MouseEvent) {
    clearTimeout(this._delay);
    this._delay = setTimeout(() => {
      this._delay = 0;
      this.show();
    }, this.delay);
  }

  /**
   * Hides the tooltip on mouse leave
   * @param event
   */
  _handleMouseLeave(event: MouseEvent) {
    clearTimeout(this._delay);
    this.hide();
  }

  /**
   * Shows the tooltip and returns a promise that will resolve when the tooltip is visible
   */
  show(): void {
    if (!this.visible && this._overlayRef && !this._overlayRef.hasAttached()) {
      this.visible = true;

      let portal = new ComponentPortal(TooltipComponent, this._viewContainerRef);
      let tooltipRef = this._overlayRef.attach(portal);
      tooltipRef.instance.message = this.message;
      tooltipRef.instance.position = this.position;
      this._updatePosition();
    }
  }

  /**
   * Hides the tooltip and returns a promise that will resolve when the tooltip is hidden
   */
  hide(): void {
    if (this.visible && this._overlayRef && this._overlayRef.hasAttached()) {
      this.visible = false;
      this._overlayRef.detach();
    }
  }

  /**
   * Shows/hides the tooltip and returns a promise that will resolve when it is done
   */
  toggle(): void {
    if (this.visible) {
      this.hide();
    } else {
      this.show();
    }
  }

  /**
   * Updates the tooltip's position
   */
  private _updatePosition() {
    if (this._overlayRef) {
      this._changeDetectionRef.detectChanges();
      this._overlayRef.updatePosition();
    }
  }
}

@Component({
  moduleId: module.id,
  selector: 'md2-tooltip',
  template: `<div class="md2-tooltip {{position}}" [class.visible]="_isVisible">{{message}}</div>`,
  styleUrls: ['tooltip.css'],
  host: {
    'role': 'tooltip',
  },
  encapsulation: ViewEncapsulation.None
})
export class TooltipComponent {
  message: string;
  position: string;
  private _isVisible: boolean = false;
  ngAfterViewInit() {
    this._isVisible = true;
  }
}

export const MD2_TOOLTIP_DIRECTIVES: any[] = [Md2Tooltip, TooltipComponent];

@NgModule({
  imports: [OverlayModule],
  exports: MD2_TOOLTIP_DIRECTIVES,
  declarations: MD2_TOOLTIP_DIRECTIVES,
  entryComponents: [TooltipComponent],
})
export class Md2TooltipModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: Md2TooltipModule,
      providers: OVERLAY_PROVIDERS,
    };
  }
}
