import { EventEmitter, ElementRef, OnDestroy, Renderer, TemplateRef, ViewContainerRef } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { Overlay, ScrollDispatcher } from '../core';
import { ColorUtil } from './color-util';
export declare type Container = 'inline' | 'dialog';
export declare class TextDirective {
    newValue: EventEmitter<any>;
    text: any;
    rg: number;
    changeInput(event: any): void;
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
/**
 * Change event object emitted by Md2Colorpicker.
 */
export declare class Md2ColorChange {
    source: Md2Colorpicker;
    color: string;
    constructor(source: Md2Colorpicker, color: string);
}
export declare class Md2Colorpicker implements OnDestroy, ControlValueAccessor {
    private _element;
    private _overlay;
    private _viewContainerRef;
    private _renderer;
    private _scrollDispatcher;
    private _util;
    _control: NgControl;
    private _portal;
    private _overlayRef;
    private _backdropSubscription;
    private _positionSubscription;
    _innerValue: string;
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
    backColor: boolean;
    private _created;
    private _defalutColor;
    private _initialColor;
    /** Whether or not the overlay panel is open. */
    private _panelOpen;
    private _color;
    /** Whether filling out the select is required in the form.  */
    _required: boolean;
    /** Whether the select is disabled.  */
    private _disabled;
    isInputFocus: boolean;
    /** The placeholder displayed in the trigger of the select. */
    private _placeholder;
    private _container;
    fontColor: string;
    _isDark: boolean;
    isInputValidColor: boolean;
    _onChange: (value: any) => void;
    _onTouched: () => void;
    color: string;
    /** Placeholder to be shown if no value has been selected. */
    placeholder: string;
    required: boolean;
    /** Whether the component is disabled. */
    disabled: any;
    cFormat: string;
    colorpickerChange: EventEmitter<string>;
    /** Event emitted when the selected date has been changed by the user. */
    change: EventEmitter<Md2ColorChange>;
    tabindex: number;
    id: string;
    /**
    * set accessor including call the onchange callback
    */
    value: any;
    container: Container;
    readonly setGradient: {
        'background-image': string;
    };
    /** Event emitted when the select has been opened. */
    onOpen: EventEmitter<void>;
    /** Event emitted when the select has been closed. */
    onClose: EventEmitter<void>;
    _templatePortal: TemplateRef<any>;
    constructor(_element: ElementRef, _overlay: Overlay, _viewContainerRef: ViewContainerRef, _renderer: Renderer, _scrollDispatcher: ScrollDispatcher, _util: ColorUtil, _control: NgControl);
    ngOnDestroy(): void;
    /** Whether or not the overlay panel is open. */
    readonly panelOpen: boolean;
    /** Toggles the overlay panel open or closed. */
    toggle(): void;
    /** Opens the overlay panel. */
    open(): void;
    /** Closes the overlay panel and focuses the host element. */
    close(): void;
    /** Removes the panel from the DOM. */
    destroyPanel(): void;
    _handleKeydown(event: KeyboardEvent): void;
    _onFocus(): void;
    _onBlur(): void;
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
    clickOk(): void;
    /**
    * deselect recent color and close popup
    */
    cancelColor(): void;
    isValidColor(str: string): boolean;
    /**
       * set color
       * @param value
       */
    setColorFromString(value: string): void;
    formatPolicy(value: number): number;
    /**
     * update color
     */
    update(): void;
    clearColor(event: Event): void;
    isDescendant(parent: any, child: any): boolean;
    checkInputVal(event: Event): void;
    /** Emits an event when the user selects a color. */
    _emitChangeEvent(): void;
    writeValue(value: any): void;
    registerOnChange(fn: (value: any) => void): void;
    registerOnTouched(fn: () => {}): void;
    setDisabledState(isDisabled: boolean): void;
    private _subscribeToBackdrop();
    /**
     *  This method creates the overlay from the provided panel's template and saves its
     *  OverlayRef so that it can be attached to the DOM when open is called.
     */
    private _createOverlay();
    /** Create the popup PositionStrategy. */
    private _createPickerPositionStrategy();
    private _cleanUpSubscriptions();
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
export declare const MD2_COLORPICKER_DIRECTIVES: (typeof TextDirective | typeof ColorpickerSliderDirective | typeof Md2Colorpicker)[];
export declare class Md2ColorpickerModule {
}
