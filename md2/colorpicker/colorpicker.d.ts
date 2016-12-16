import { OnInit, EventEmitter, ModuleWithProviders, ElementRef } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { ColorpickerService } from './calculateColor';
export declare const MD2_COLORPICKER_CONTROL_VALUE_ACCESSOR: any;
export declare class TextDirective {
    newValue: EventEmitter<any>;
    text: any;
    rg: number;
    changeInput(value: string): void;
}
export declare class ColorpickerSliderDirective {
    private _element;
    slider: string;
    pointX: number;
    pointY: number;
    change: EventEmitter<any>;
    private listenerMove;
    private listenerStop;
    constructor(_element: ElementRef);
    /**
     * set cursor position
     * @param event
     */
    setCursor(event: any): void;
    /**
     * input event listner
     * @param event
     */
    move(event: any): void;
    /**
     * input event listner
     * @param event
     */
    start(event: any): void;
    /**
     * stop mouse event
     */
    stop(): void;
    /**
     * get x
     * @param event
     */
    getX(event: any): number;
    /**
     * get y
     * @param event
     */
    getY(event: any): number;
    _getNativeElement(): HTMLElement;
}
export declare class Md2Colorpicker implements OnInit, ControlValueAccessor {
    private service;
    _innerValue: string;
    private _onTouchedCallback;
    private _onChangeCallback;
    private _created;
    private _defalutColor;
    _isColorpickerVisible: boolean;
    _hueSliderColor: string;
    private _initialColor;
    slider: SliderPosition;
    private sliderDim;
    private hsva;
    rgbaText: Rgba;
    hslaText: Hsla;
    outputColor: string;
    alphaColor: string;
    hexText: string;
    format: number;
    cFormat: string;
    colorpickerChange: EventEmitter<string>;
    change: EventEmitter<string>;
    tabindex: number;
    disabled: boolean;
    id: string;
    /**
    * set accessor including call the onchange callback
    */
    value: any;
    constructor(service: ColorpickerService);
    ngOnInit(): void;
    /**
    * Show Colorpicker dialog
    */
    _showColorpicker(): void;
    /**
    * input event listner
    * @param event
    */
    changeInput(event: any): void;
    /**
    * set saturation,lightness,hue,alpha,RGB value
    * @param val
    * @param rg
    */
    setSaturation(val: {
        v: number;
        rg: number;
    }): void;
    setLightness(val: {
        v: number;
        rg: number;
    }): void;
    setHue(val: {
        v: number;
        rg: number;
    }): void;
    setAlpha(val: {
        v: number;
        rg: number;
    }): void;
    setR(val: {
        v: number;
        rg: number;
    }): void;
    setG(val: {
        v: number;
        rg: number;
    }): void;
    setB(val: {
        v: number;
        rg: number;
    }): void;
    setSaturationAndBrightness(val: {
        s: number;
        v: number;
        pointX: number;
        pointY: number;
    }): void;
    /**
    * change color
    * @param value
    */
    colorChanged(value: string): void;
    /**
    * set color
    * @param value
    */
    setColorFromString(value: string): void;
    formatPolicy(): number;
    /**
     * update color
     */
    update(): void;
    isDescendant(parent: any, child: any): boolean;
    clickOk(): void;
    /**
    * deselect recent color and close popup
    */
    cancelColor(): void;
    /**
    * close color picker
    */
    closeColorpicker(): void;
    writeValue(value: any): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
}
export declare class Hsva {
    h: number;
    s: number;
    v: number;
    a: number;
    constructor(h: number, s: number, v: number, a: number);
}
export declare class Hsla {
    h: number;
    s: number;
    l: number;
    a: number;
    constructor(h: number, s: number, l: number, a: number);
}
export declare class Rgba {
    r: number;
    g: number;
    b: number;
    a: number;
    constructor(r: number, g: number, b: number, a: number);
}
export declare class SliderPosition {
    h: number;
    s: number;
    v: number;
    a: number;
    constructor(h: number, s: number, v: number, a: number);
}
export declare class SliderDimension {
    h: number;
    s: number;
    v: number;
    a: number;
    constructor(h: number, s: number, v: number, a: number);
}
export declare const MD2_COLORPICKER_DIRECTIVES: (typeof Md2Colorpicker | typeof TextDirective | typeof ColorpickerSliderDirective)[];
export declare class Md2ColorpickerModule {
    static forRoot(): ModuleWithProviders;
}
