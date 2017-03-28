import {
  Component,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  ViewEncapsulation,
  NgModule,
  ModuleWithProviders,
  Directive,
  OnDestroy,
  Optional,
  Renderer,
  Self,
  ViewChildren,
  QueryList,
  ViewContainerRef
} from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NgControl
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  Overlay,
  OverlayModule,
  OverlayState,
  OverlayRef,
  Portal,
  PortalModule,
  TemplatePortalDirective,
  HorizontalConnectionPos,
  VerticalConnectionPos
} from '../core';
import { Subscription } from 'rxjs/Subscription';
import { ColorpickerService } from './calculateColor';
import { coerceBooleanProperty } from '../core/coercion/boolean-property';
import { Container, PanelPositionX, PanelPositionY } from '../datepicker/datepicker';

let nextId = 0;

@Directive({
  selector: '[text]',
  host: {
    '(input)': 'changeInput($event)'
  }
})
export class TextDirective {
  @Output('newValue') newValue = new EventEmitter<any>();
  @Input('text') text: any;
  @Input('rg') rg: number;
  changeInput(event: any) {
    event.stopPropagation();
    event.preventDefault();
    let value = event.target.value;
    if (this.rg === undefined) {
      this.newValue.emit(value);
    } else {
      let numeric = parseFloat(value);
      if (!isNaN(numeric) && numeric >= 0 && numeric <= this.rg) {
        this.newValue.emit({ v: numeric, rg: this.rg });
      }
    }
  }
}

@Directive({
  selector: '[colorpicker-slider]',
  host: {
    '(mousedown)': 'start($event)',
    '(touchstart)': 'start($event)'
  }
})
export class ColorpickerSliderDirective {
  @Input('colorpicker-slider') slider: string;
  @Input('point-x') pointX: number;
  @Input('point-y') pointY: number;
  @Output('change') change = new EventEmitter<any>();
  private listenerMove: any;
  private listenerStop: any;

  constructor(private _element: ElementRef) {
    this.listenerMove = (event: any) => { this.move(event); };
    this.listenerStop = () => { this.stop(); };
  }

  /**
   * set cursor position
   * @param event
   */
  setCursor(event: any) {
    let height = this._getNativeElement().offsetHeight;
    let width = this._getNativeElement().offsetWidth;
    let x = Math.max(0, Math.min(this.getX(event), width));
    let y = Math.max(0, Math.min(this.getY(event), height));

    if (this.pointX !== undefined && this.pointY !== undefined) {
      this.change.emit({
        s: x / width, v: (1 - y / height),
        pointX: this.pointX, pointY: this.pointY
      });
    } else if (this.pointX === undefined && this.pointY !== undefined) {
      this.change.emit({ v: y / height, rg: this.pointY });
    } else {
      this.change.emit({ v: x / width, rg: this.pointX });
    }
  }

  /**
   * input event listner
   * @param event
   */
  move(event: any) {
    event.preventDefault();
    this.setCursor(event);
  }

  /**
   * input event listner
   * @param event
   */
  start(event: any) {
    this.setCursor(event);
    document.addEventListener('mousemove', this.listenerMove);
    document.addEventListener('touchmove', this.listenerMove);
    document.addEventListener('mouseup', this.listenerStop);
    document.addEventListener('touchend', this.listenerStop);
  }

  /**
   * stop mouse event
   */
  stop() {
    document.removeEventListener('mousemove', this.listenerMove);
    document.removeEventListener('touchmove', this.listenerMove);
    document.removeEventListener('mouseup', this.listenerStop);
    document.removeEventListener('touchend', this.listenerStop);
  }

  /**
   * get x
   * @param event
   */
  getX(event: any) {
    let boundingClientRect = this._getNativeElement().getBoundingClientRect();
    return (event.pageX !== undefined ? event.pageX : event.touches[0].pageX) -
      boundingClientRect.left - window.pageXOffset;
  }

  /**
   * get y
   * @param event
   */
  getY(event: any) {
    let boundingClientRect = this._getNativeElement().getBoundingClientRect();
    return (event.pageY !== undefined ? event.pageY : event.touches[0].pageY) -
      boundingClientRect.top - window.pageYOffset;
  }

  _getNativeElement(): HTMLElement {
    return this._element.nativeElement;
  }
}

/**
 * Change event object emitted by Md2Colorpicker.
 */
export class Md2ColorChange {
  constructor(public source: Md2Colorpicker, public color: string) { }
}


@Component({
  moduleId: module.id,
  selector: 'md2-colorpicker',
  templateUrl: 'colorpicker.html',
  styleUrls: ['colorpicker.css'],
  host: {
    'role': 'colorpicker',
    '[id]': 'id',
    '[class.md2-colorpicker-disabled]': 'disabled',
    '[attr.aria-label]': 'placeholder',
    '[attr.aria-required]': 'required.toString()',
  },
  encapsulation: ViewEncapsulation.None
})
export class Md2Colorpicker implements OnDestroy, ControlValueAccessor {
  _innerValue: string = '';
  _isColorpickerVisible: boolean;
  _hueSliderColor: string;
  slider: SliderPosition;
  sliderDim: SliderDimension;
  hsva: Hsva;
  rgbaText: Rgba;
  hslaText: Hsla;
  outputColor: string;
  alphaColor: string;
  hexText: string;
  format: number;
  backColor: boolean = true;

  private _created: boolean;
  private _defalutColor: string = '#000000';
  private _initialColor: string;
  private _overlayRef: OverlayRef;
  private _backdropSubscription: Subscription;
  private _positionSubscription: Subscription;

  /** Whether or not the overlay panel is open. */
  private _panelOpen = false;
  private _color: string = null;

  /** Whether filling out the select is required in the form.  */
  _required: boolean = false;

  /** Whether the select is disabled.  */
  private _disabled: boolean = false;
  isInputFocus: boolean = false;

  /** The placeholder displayed in the trigger of the select. */
  private _placeholder: string;
  private _container: Container = 'inline';

  fontColor: string;
  backAreaColor: string;
  isInputValidColor: boolean = false;

  _onChange = (value: any) => { };
  _onTouched = () => { };

  @Input()
  get color() { return this._color; }
  set color(value: string) { this._color = value; }

  /** Placeholder to be shown if no value has been selected. */
  @Input()
  get placeholder() { return this._placeholder; }
  set placeholder(value: string) { this._placeholder = value; }

  @Input()
  get required(): boolean { return this._required; }
  set required(value) { this._required = coerceBooleanProperty(value); }

  /** Whether the component is disabled. */
  @Input()
  get disabled() { return this._disabled; }
  set disabled(value: any) {
    this._disabled = coerceBooleanProperty(value);
  }
  @Input('format') cFormat: string = 'hex';
  @Output('colorpickerChange') colorpickerChange = new EventEmitter<string>();
  /** Event emitted when the selected date has been changed by the user. */
  @Output() change: EventEmitter<Md2ColorChange> = new EventEmitter<Md2ColorChange>();
  @Input() tabindex: number = 0;
  @Input() id: string = 'md2-colorpicker-' + (++nextId);

  /** Position of the colorpicker in the X axis. */
  positionX: PanelPositionX = 'after';

  /** Position of the colorpicker in the Y axis. */
  positionY: PanelPositionY = 'below';
  overlapTrigger: boolean = true;
  get value(): any {
    return this._innerValue;

  };
  /**
  * set accessor including call the onchange callback
  */
  set value(v: any) {
    if (v !== this._innerValue) {
      if (v) {
        this.hsva = this.service.stringToHsva(v);
      }
      this._innerValue = v;
    }
  }

  @Input()
  get container() { return this._container; }
  set container(value: Container) {
    if (this._container !== value) {
      this._container = value || 'inline';
      this.destroyPanel();
    }
  }

  get setGradient() {
    return {
      'background-image': 'linear-gradient(to right, transparent, transparent),' +
      'linear-gradient(to left, ' + this.hexText + ', rgba(255, 255, 255, 0))'
    };

  }

  /** Event emitted when the select has been opened. */
  @Output() onOpen: EventEmitter<void> = new EventEmitter<void>();

  /** Event emitted when the select has been closed. */
  @Output() onClose: EventEmitter<void> = new EventEmitter<void>();

  @ViewChildren(TemplatePortalDirective) templatePortals: QueryList<Portal<any>>;
  @ViewChildren(TemplatePortalDirective) templatePortal: Portal<any>;

  constructor(private _element: ElementRef, private overlay: Overlay,
    private _viewContainerRef: ViewContainerRef, private _renderer: Renderer,
    private service: ColorpickerService, @Self() @Optional() public _control: NgControl) {
    this._created = false;
    if (this._control) {
      this._control.valueAccessor = this;
    }
  }

  ngOnDestroy() { this.destroyPanel(); }

  /** Whether or not the overlay panel is open. */
  get panelOpen(): boolean {
    return this._panelOpen;
  }

  /** Toggles the overlay panel open or closed. */
  toggle(): void {
    this.panelOpen ? this.close() : this.open();
  }

  /** Opens the overlay panel. */
  open(): void {
    let hsva = this.service.stringToHsva(this.color + '');
    this.isInputFocus = true;
    if (hsva) {
      this.hsva = hsva;
    } else {
      this.hsva = this.service.stringToHsva(this._defalutColor);
    }

    this.sliderDim = new SliderDimension(245, 250, 130, 245);
    this.slider = new SliderPosition(0, 0, 0, 0);
    if (this.cFormat === 'rgb') {
      this.format = 1;
    } else if (this.cFormat === 'hsl') {
      this.format = 2;
    } else {
      this.format = 0;
    }

    this.update();
    if (this.disabled) { return; }
    if (!this._isColorpickerVisible) {
      this._initialColor = this.color;
      this.update();
      this._isColorpickerVisible = true;
    } else {
      this._isColorpickerVisible = false;
    }

    this._createOverlay();
    this._overlayRef.attach(this.templatePortals.first);
    this._subscribeToBackdrop();
    this._panelOpen = true;
    this.onOpen.emit();
  }

  /** Closes the overlay panel and focuses the host element. */
  close(): void {
    this._panelOpen = false;
    this.isInputFocus = false;
    if (this._overlayRef) {
      this._overlayRef.detach();
      this._backdropSubscription.unsubscribe();
    }
    this._isColorpickerVisible = false;
    if (this._innerValue) {
      this.setColorFromString(this._innerValue);
    }
  }

  /** Removes the panel from the DOM. */
  destroyPanel(): void {
    if (this._overlayRef) {
      this._overlayRef.dispose();
      this._overlayRef = null;

      this._cleanUpSubscriptions();
    }
  }

  _handleKeydown(event: KeyboardEvent) {
    if (this.disabled) { return; }
  }

  _onFocus() {

  }

  _onBlur() {
    if (!this.panelOpen) {
      this._onTouched();
    }
  }
  /**
    * input event listner
    * @param event
    */
  changeInput(event: any) {
    let value = event.target.value;
    this.colorpickerChange.emit(value);
  }

  /**
  * set saturation,lightness,hue,alpha,RGB value
  * @param val
  * @param rg
  */
  setSaturation(val: { v: number, rg: number }) {
    let hsla = this.service.hsva2hsla(this.hsva);
    hsla.s = val.v / val.rg;
    this.hsva = this.service.hsla2hsva(hsla);
    this.update();
  }

  setLightness(val: { v: number, rg: number }) {
    let hsla = this.service.hsva2hsla(this.hsva);
    hsla.l = val.v / val.rg;
    this.hsva = this.service.hsla2hsva(hsla);
    this.update();
  }

  setHue(val: { v: number, rg: number }) {
    this.hsva.h = val.v / val.rg;
    this.update();
  }

  setAlpha(val: { v: number, rg: number }) {
    this.hsva.a = val.v / val.rg;
    this.update();
  }

  setR(val: { v: number, rg: number }) {
    let rgba = this.service.hsvaToRgba(this.hsva);
    rgba.r = val.v / val.rg;
    this.hsva = this.service.rgbaToHsva(rgba);
    this.update();
  }
  setG(val: { v: number, rg: number }) {
    let rgba = this.service.hsvaToRgba(this.hsva);
    rgba.g = val.v / val.rg;
    this.hsva = this.service.rgbaToHsva(rgba);
    this.update();
  }
  setB(val: { v: number, rg: number }) {
    let rgba = this.service.hsvaToRgba(this.hsva);
    rgba.b = val.v / val.rg;
    this.hsva = this.service.rgbaToHsva(rgba);
    this.update();
  }
  setSaturationAndBrightness(val: { s: number, v: number, pointX: number, pointY: number }) {
    this.hsva.s = val.s / val.pointX;
    this.hsva.v = val.v / val.pointY;
    this.update();
  }
  clickOk() {
    this._isColorpickerVisible = false;
    this.isInputValidColor = false;
    this.color = this._innerValue;

    if (this._innerValue != this._initialColor) {
      this._emitChangeEvent();
    }
    this.close();
  }

  /**
  * deselect recent color and close popup
  */
  cancelColor() {
    this._innerValue = this._initialColor;
    this.close();
  }
  isValidColor(str: string) {
    return str.match(/^#[a-f0-9]{6}$/i) !== null;
  }
  /**
     * set color
     * @param value
     */
  setColorFromString(value: string) {
    if (!this.isValidColor(value)) {
      value = '#000000';
      this.backColor = false;
    }
    let hsva = this.service.stringToHsva(value);
    if (hsva !== null) {
      this.hsva = hsva;
    }
    this.update();
  }

  formatPolicy(value: number) {
    this.format = value;
    if (this.format === 0 && this.hsva.a < 1) {
      this.format++;
    }
    return this.format;
  }

  /**
   * update color
   */
  update() {
    let hsla = this.service.hsva2hsla(this.hsva);
    let rgba = this.service.denormalizeRGBA(this.service.hsvaToRgba(this.hsva));
    let hueRgba = this.service.denormalizeRGBA(this.service.hsvaToRgba(
      new Hsva(this.hsva.h, 1, 1, 1)));

    this.alphaColor = 'rgb(' + rgba.r + ',' + rgba.g + ',' + rgba.b + ')';
    this._hueSliderColor = 'rgb(' + hueRgba.r + ',' + hueRgba.g + ',' + hueRgba.b + ')';
    this.hslaText = new Hsla(Math.round((hsla.h) * 360), Math.round(hsla.s * 100),
      Math.round(hsla.l * 100), Math.round(hsla.a * 100) / 100);
    this.rgbaText = new Rgba(rgba.r, rgba.g, rgba.b, Math.round(rgba.a * 100) / 100);
    if (this.backColor) {
      this.hexText = this.service.hexText(rgba);
    }
    this.backColor = true;
    let colorCode = Math.round((this.rgbaText.r * 299 + this.rgbaText.g * 587 +
      this.rgbaText.b * 114) / 1000);
    if (colorCode >= 128 || this.hsva.a < 0.35) {
      this.fontColor = 'black';
      this.backAreaColor = 'rgba(0,0,0,.4)';
    } else {
      this.fontColor = 'white';
      this.backAreaColor = 'rgba(255,255,255,.4)';
    }

    if (this.format === 0 && this.hsva.a < 1) {
      this.format++;
    }
    this.outputColor = this.service.outputFormat(this.hsva, this.cFormat);
    this.slider = new SliderPosition((this.hsva.h) * this.sliderDim.h,
      this.hsva.s * this.sliderDim.s - 7, (1 - this.hsva.v) * this.sliderDim.v - 7,
      this.hsva.a * this.sliderDim.a);
    this._innerValue = this.outputColor;
  }

  clearColor(event: Event) {
    event.stopPropagation();
    this.color = '';
    this._emitChangeEvent();
  }

  isDescendant(parent: any, child: any) {
    var node = child.parentNode;
    while (node !== null) {
      if (node === parent) {
        return true;
      }
      node = node.parentNode;
    }
    return false;
  }

  checkInputVal(event: Event): void {
    this.hsva = this.service.stringToHsva(this.color + '');
    this.isInputFocus = false;
    if (this.hsva) {
      if (this._innerValue !== this.color) {
        this._emitChangeEvent();
      }
      this.isInputValidColor = false;
    } else {
      this.isInputValidColor = true;
    }
    this._onTouched();
  }

  /** Emits an event when the user selects a color. */
  _emitChangeEvent(): void {
    this._onChange(this.color);
    this.change.emit(new Md2ColorChange(this, this.color));
    this._innerValue = this.color;
  }
  writeValue(value: any): void {
    this._innerValue = value;
    this.color = value;
  }

  registerOnChange(fn: (value: any) => void): void { this._onChange = fn; }

  registerOnTouched(fn: () => {}): void { this._onTouched = fn; }

  private _subscribeToBackdrop(): void {
    this._backdropSubscription = this._overlayRef.backdropClick().subscribe(() => {
      this._innerValue = this._initialColor;
      this.close();
    });
  }

  /**
   *  This method creates the overlay from the provided panel's template and saves its
   *  OverlayRef so that it can be attached to the DOM when open is called.
   */
  private _createOverlay(): void {
    if (!this._overlayRef) {
      let config = new OverlayState();
      if (this.container === 'inline') {
        const [posX, fallbackX]: HorizontalConnectionPos[] =
          this.positionX === 'before' ? ['end', 'start'] : ['start', 'end'];

        const [overlayY, fallbackOverlayY]: VerticalConnectionPos[] =
          this.positionY === 'above' ? ['bottom', 'top'] : ['top', 'bottom'];

        let originY = overlayY;
        let fallbackOriginY = fallbackOverlayY;

        if (!this.overlapTrigger) {
          originY = overlayY === 'top' ? 'bottom' : 'top';
          fallbackOriginY = fallbackOverlayY === 'top' ? 'bottom' : 'top';
        }
        config.positionStrategy = this.overlay.position().connectedTo(this._element,
          { originX: posX, originY: originY },
          { overlayX: posX, overlayY: overlayY })
          .withFallbackPosition(
          { originX: fallbackX, originY: originY },
          { overlayX: fallbackX, overlayY: overlayY })
          .withFallbackPosition(
          { originX: posX, originY: fallbackOriginY },
          { overlayX: posX, overlayY: fallbackOverlayY })
          .withFallbackPosition(
          { originX: fallbackX, originY: fallbackOriginY },
          { overlayX: fallbackX, overlayY: fallbackOverlayY });
        config.hasBackdrop = true;
        config.backdropClass = 'cdk-overlay-transparent-backdrop';
      } else {
        config.positionStrategy = this.overlay.position()
          .global()
          .centerHorizontally()
          .centerVertically();
        config.hasBackdrop = true;
      }
      this._overlayRef = this.overlay.create(config);
    }
  }

  private _cleanUpSubscriptions(): void {
    if (this._backdropSubscription) {
      this._backdropSubscription.unsubscribe();
    }
    if (this._positionSubscription) {
      this._positionSubscription.unsubscribe();
    }
  }

}

export class Hsva {
  constructor(public h: number, public s: number, public v: number, public a: number) { }
}
export class Hsla {
  constructor(public h: number, public s: number, public l: number, public a: number) { }
}
export class Rgba {
  constructor(public r: number, public g: number, public b: number, public a: number) { }
}
export class SliderPosition {
  constructor(public h: number, public s: number, public v: number, public a: number) { }
}
export class SliderDimension {
  constructor(public h: number, public s: number, public v: number, public a: number) { }
}

export const MD2_COLORPICKER_DIRECTIVES = [
  Md2Colorpicker, ColorpickerSliderDirective, TextDirective
];

@NgModule({
  declarations: MD2_COLORPICKER_DIRECTIVES,
  imports: [CommonModule, FormsModule, OverlayModule, PortalModule],
  exports: MD2_COLORPICKER_DIRECTIVES,
  providers: [ColorpickerService]
})
export class Md2ColorpickerModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: Md2ColorpickerModule,
      providers: []
    };
  }
}
