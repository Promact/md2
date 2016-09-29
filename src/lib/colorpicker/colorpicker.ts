import {
  Component,
  HostListener,
  OnInit,
  Input,
  Output,
  EventEmitter,
  forwardRef,
  ViewEncapsulation,
  NgModule,
  ModuleWithProviders,
  ElementRef,
  Directive
} from '@angular/core';
import {
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
  FormsModule
} from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ColorpickerService } from './colorpicker.service';

const noop = () => { };
let nextId = 0;

export const MD2_COLORPICKER_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => Md2Colorpicker),
  multi: true
};

@Directive({
  selector: '[text]',
  host: {
    '(input)': 'changeInput($event.target.value)'
  }
})
export class TextDirective {
  @Output('newValue') newValue = new EventEmitter<any>();
  @Input('text') text: any;
  @Input('rg') rg: number;
  changeInput(value: string) {
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

  constructor(private el: ElementRef) {
    this.listenerMove = (event: any) => { this.move(event); };
    this.listenerStop = () => { this.stop(); };
  }

  /**
   * set cursor position
   * @param event
   */
  setCursor(event: any) {
    let height = this.el.nativeElement.offsetHeight;
    let width = this.el.nativeElement.offsetWidth;
    let x = Math.max(0, Math.min(this.getX(event), width));
    let y = Math.max(0, Math.min(this.getY(event), height));

    if (this.pointX !== undefined && this.pointY !== undefined) {
      this.change.emit({ s: x / width, v: (1 - y / height), pointX: this.pointX, pointY: this.pointY });
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
    return (event.pageX !== undefined ? event.pageX : event.touches[0].pageX) - this.el.nativeElement.getBoundingClientRect().left - window.pageXOffset;
  }

  /**
   * get y
   * @param event
   */
  getY(event: any) {
    return (event.pageY !== undefined ? event.pageY : event.touches[0].pageY) - this.el.nativeElement.getBoundingClientRect().top - window.pageYOffset;
  }
}

@Component({
  moduleId: module.id,
  selector: 'md2-colorpicker',
  templateUrl: 'colorpicker.html',
  styleUrls: ['colorpicker.css'],
  providers: [MD2_COLORPICKER_CONTROL_VALUE_ACCESSOR],
  host: {
    'role': 'colorpicker',
    '[id]': 'id',
    '[tabindex]': 'disabled ? -1 : tabindex',
    '[class.md2-colorpicker-disabled]': 'disabled',
  },
  encapsulation: ViewEncapsulation.None
})
export class Md2Colorpicker implements OnInit, ControlValueAccessor {
  private innerValue: string = '';
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;
  private created: boolean;
  private defalutColor: string = '#000000';
  private isColorpickerVisible: boolean;
  private slider: SliderPosition;
  private sliderDim: SliderDimension;
  private hueSliderColor: string;
  private hsva: Hsva;
  private outputColor: string;
  private alphaColor: string;
  private rgbaText: Rgba;
  private hslaText: Hsla;
  private hexText: string;
  private format: number;
  private initialColor: string;
  private toggled: boolean=true;

  @Input('format') cFormat: string = 'hex';
  @Output('colorpickerChange') colorpickerChange = new EventEmitter<string>();
  @Output() change = new EventEmitter<string>();
  @Input() tabindex: number = 0;
  @Input() disabled: boolean; 
  @Input() id: string = 'md2-colorpicker-' + (++nextId);

  get value(): any {
    return this.innerValue;
  };
  /**
  * set accessor including call the onchange callback
  */
  set value(v: any) {
    if (v !== this.innerValue) {
      if (v) {
        this.hsva = this.service.stringToHsva(v);
      }
      this.innerValue = v;
      this.onChangeCallback(v);
    }
  }

  constructor(private service: ColorpickerService, private el: ElementRef) {
    this.created = false;
  }
  
  ngOnInit() {
    let hsva = this.service.stringToHsva(this.innerValue);
    if (hsva !== null) {
      this.hsva = hsva;
    } else {
      this.hsva = this.service.stringToHsva(this.defalutColor);
    }
    if (this.created) {
      this.colorpickerChange.emit(this.service.outputFormat(hsva, this.cFormat));
      this.change.emit(this.service.outputFormat(hsva, this.cFormat));
    }
    this.sliderDim = new SliderDimension(150, 230, 130, 150);
    this.slider = new SliderPosition(0, 0, 0, 0);
    if (this.cFormat === 'rgba') {
      this.format = 1;
    } else if (this.cFormat === 'hsla') {
      this.format = 2;
    } else {
      this.format = 0;
    }      
    this.update();
  }
 
  /**
  * Show Colorpicker dialog
  */
  private showColorpicker() {
    if (this.disabled) { return; }    
    if (!this.isColorpickerVisible) {
      this.update();
      this.initialColor = this.innerValue;
      this.isColorpickerVisible = true;
    }
    else {      
      this.isColorpickerVisible = false;
    }
    if (this.innerValue != this.initialColor) {
      this.change.emit(this.innerValue);
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

  /**
  * change color
  * @param value
  */
  colorChanged(value: string) {
    this.colorpickerChange.emit(value);
    this.onChangeCallback(value);
    this.innerValue = value;
  }

  /**
  * set color
  * @param value
  */
  setColorFromString(value: string) {
    let hsva = this.service.stringToHsva(value);
    if (hsva !== null) {
      this.hsva = hsva;
    }
    this.update();
  }

  formatPolicy() {
    this.format = (this.format + 1) % 3;
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
    let hueRgba = this.service.denormalizeRGBA(this.service.hsvaToRgba(new Hsva(this.hsva.h, 1, 1, 1)));

    this.alphaColor = 'rgb(' + rgba.r + ',' + rgba.g + ',' + rgba.b + ')';
    this.hueSliderColor = 'rgb(' + hueRgba.r + ',' + hueRgba.g + ',' + hueRgba.b + ')';
    this.hslaText = new Hsla(Math.round((hsla.h) * 360), Math.round(hsla.s * 100), Math.round(hsla.l * 100), Math.round(hsla.a * 100) / 100);
    this.rgbaText = new Rgba(rgba.r, rgba.g, rgba.b, Math.round(rgba.a * 100) / 100);
    this.hexText = this.service.hexText(rgba);

    if (this.format === 0 && this.hsva.a < 1) {
      this.format++;
    }
    this.outputColor = this.service.outputFormat(this.hsva, this.cFormat);
    this.slider = new SliderPosition((this.hsva.h) * this.sliderDim.h - 8, this.hsva.s * this.sliderDim.s - 8,
      (1 - this.hsva.v) * this.sliderDim.v - 8, this.hsva.a * this.sliderDim.a - 8);

    this.colorChanged(this.outputColor);
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
  clickOk() {
    this.isColorpickerVisible = false;
    if (this.innerValue != this.initialColor) {
      this.change.emit(this.innerValue);
    }
    this.closeColorpicker();
  }

  /**
  * deselect recent color and close popup
  */
  cancelColor() {
    this.innerValue = this.initialColor;
    this.setColorFromString(this.innerValue);
    this.closeColorpicker();
  }
  /**
  * close color picker
  */
  closeColorpicker() {
    this.isColorpickerVisible = false;
    this.setColorFromString(this.innerValue);
  }
  /**
   * create color box
   * @param element
   * @param offset
   */
  createBox(element: any, offset: any) {
    return {
      top: element.getBoundingClientRect().top + (offset ? window.pageYOffset : 0),
      left: element.getBoundingClientRect().left + (offset ? window.pageXOffset : 0),
      width: element.offsetWidth,
      height: element.offsetHeight
    };
  }

  writeValue(value: any): void { this.value = value; }

  registerOnChange(fn: any) { this.onChangeCallback = fn; }

  registerOnTouched(fn: any) { this.onTouchedCallback = fn; }

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

export const MD2_COLORPICKER_DIRECTIVES = [Md2Colorpicker, ColorpickerSliderDirective, TextDirective];

@NgModule({
  declarations: MD2_COLORPICKER_DIRECTIVES,
  imports: [CommonModule, FormsModule],
  exports: MD2_COLORPICKER_DIRECTIVES,
  providers: [ColorpickerService]
})
export class Md2ColorpickerModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: Md2ColorpickerModule
    };
  }
}