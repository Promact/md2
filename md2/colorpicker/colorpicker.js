var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Component, Input, Output, EventEmitter, ElementRef, ViewEncapsulation, NgModule, Directive, Optional, Renderer, Self, ViewChildren, QueryList, ViewContainerRef } from '@angular/core';
import { FormsModule, NgControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Overlay, OverlayModule, OverlayState, Portal, PortalModule, TemplatePortalDirective } from '../core';
import { ColorpickerService } from './calculateColor';
import { coerceBooleanProperty } from '../core/coercion/boolean-property';
var nextId = 0;
export var TextDirective = (function () {
    function TextDirective() {
        this.newValue = new EventEmitter();
    }
    TextDirective.prototype.changeInput = function (event) {
        event.stopPropagation();
        event.preventDefault();
        var value = event.target.value;
        if (this.rg === undefined) {
            this.newValue.emit(value);
        }
        else {
            var numeric = parseFloat(value);
            if (!isNaN(numeric) && numeric >= 0 && numeric <= this.rg) {
                this.newValue.emit({ v: numeric, rg: this.rg });
            }
        }
    };
    __decorate([
        Output('newValue'), 
        __metadata('design:type', Object)
    ], TextDirective.prototype, "newValue", void 0);
    __decorate([
        Input('text'), 
        __metadata('design:type', Object)
    ], TextDirective.prototype, "text", void 0);
    __decorate([
        Input('rg'), 
        __metadata('design:type', Number)
    ], TextDirective.prototype, "rg", void 0);
    TextDirective = __decorate([
        Directive({
            selector: '[text]',
            host: {
                '(input)': 'changeInput($event)'
            }
        }), 
        __metadata('design:paramtypes', [])
    ], TextDirective);
    return TextDirective;
}());
export var ColorpickerSliderDirective = (function () {
    function ColorpickerSliderDirective(_element) {
        var _this = this;
        this._element = _element;
        this.change = new EventEmitter();
        this.listenerMove = function (event) { _this.move(event); };
        this.listenerStop = function () { _this.stop(); };
    }
    /**
     * set cursor position
     * @param event
     */
    ColorpickerSliderDirective.prototype.setCursor = function (event) {
        var height = this._getNativeElement().offsetHeight;
        var width = this._getNativeElement().offsetWidth;
        var x = Math.max(0, Math.min(this.getX(event), width));
        var y = Math.max(0, Math.min(this.getY(event), height));
        if (this.pointX !== undefined && this.pointY !== undefined) {
            this.change.emit({
                s: x / width, v: (1 - y / height),
                pointX: this.pointX, pointY: this.pointY
            });
        }
        else if (this.pointX === undefined && this.pointY !== undefined) {
            this.change.emit({ v: y / height, rg: this.pointY });
        }
        else {
            this.change.emit({ v: x / width, rg: this.pointX });
        }
    };
    /**
     * input event listner
     * @param event
     */
    ColorpickerSliderDirective.prototype.move = function (event) {
        event.preventDefault();
        this.setCursor(event);
    };
    /**
     * input event listner
     * @param event
     */
    ColorpickerSliderDirective.prototype.start = function (event) {
        this.setCursor(event);
        document.addEventListener('mousemove', this.listenerMove);
        document.addEventListener('touchmove', this.listenerMove);
        document.addEventListener('mouseup', this.listenerStop);
        document.addEventListener('touchend', this.listenerStop);
    };
    /**
     * stop mouse event
     */
    ColorpickerSliderDirective.prototype.stop = function () {
        document.removeEventListener('mousemove', this.listenerMove);
        document.removeEventListener('touchmove', this.listenerMove);
        document.removeEventListener('mouseup', this.listenerStop);
        document.removeEventListener('touchend', this.listenerStop);
    };
    /**
     * get x
     * @param event
     */
    ColorpickerSliderDirective.prototype.getX = function (event) {
        var boundingClientRect = this._getNativeElement().getBoundingClientRect();
        return (event.pageX !== undefined ? event.pageX : event.touches[0].pageX) -
            boundingClientRect.left - window.pageXOffset;
    };
    /**
     * get y
     * @param event
     */
    ColorpickerSliderDirective.prototype.getY = function (event) {
        var boundingClientRect = this._getNativeElement().getBoundingClientRect();
        return (event.pageY !== undefined ? event.pageY : event.touches[0].pageY) -
            boundingClientRect.top - window.pageYOffset;
    };
    ColorpickerSliderDirective.prototype._getNativeElement = function () {
        return this._element.nativeElement;
    };
    __decorate([
        Input('colorpicker-slider'), 
        __metadata('design:type', String)
    ], ColorpickerSliderDirective.prototype, "slider", void 0);
    __decorate([
        Input('point-x'), 
        __metadata('design:type', Number)
    ], ColorpickerSliderDirective.prototype, "pointX", void 0);
    __decorate([
        Input('point-y'), 
        __metadata('design:type', Number)
    ], ColorpickerSliderDirective.prototype, "pointY", void 0);
    __decorate([
        Output('change'), 
        __metadata('design:type', Object)
    ], ColorpickerSliderDirective.prototype, "change", void 0);
    ColorpickerSliderDirective = __decorate([
        Directive({
            selector: '[colorpicker-slider]',
            host: {
                '(mousedown)': 'start($event)',
                '(touchstart)': 'start($event)'
            }
        }), 
        __metadata('design:paramtypes', [ElementRef])
    ], ColorpickerSliderDirective);
    return ColorpickerSliderDirective;
}());
/**
 * Change event object emitted by Md2Colorpicker.
 */
export var Md2ColorChange = (function () {
    function Md2ColorChange(source, color) {
        this.source = source;
        this.color = color;
    }
    return Md2ColorChange;
}());
export var Md2Colorpicker = (function () {
    function Md2Colorpicker(_element, overlay, _viewContainerRef, _renderer, service, _control) {
        this._element = _element;
        this.overlay = overlay;
        this._viewContainerRef = _viewContainerRef;
        this._renderer = _renderer;
        this.service = service;
        this._control = _control;
        this._innerValue = '';
        this._defalutColor = '#000000';
        this.backColor = true;
        /** Whether or not the overlay panel is open. */
        this._panelOpen = false;
        this._color = null;
        /** Whether filling out the select is required in the form.  */
        this._required = false;
        /** Whether the select is disabled.  */
        this._disabled = false;
        this.isInputFocus = false;
        this._container = 'inline';
        this.isInputValidColor = false;
        this._onChange = function (value) { };
        this._onTouched = function () { };
        this.cFormat = 'hex';
        this.colorpickerChange = new EventEmitter();
        /** Event emitted when the selected date has been changed by the user. */
        this.change = new EventEmitter();
        this.tabindex = 0;
        this.id = 'md2-colorpicker-' + (++nextId);
        /** Position of the colorpicker in the X axis. */
        this.positionX = 'after';
        /** Position of the colorpicker in the Y axis. */
        this.positionY = 'below';
        this.overlapTrigger = true;
        /** Event emitted when the select has been opened. */
        this.onOpen = new EventEmitter();
        /** Event emitted when the select has been closed. */
        this.onClose = new EventEmitter();
        this._created = false;
        if (this._control) {
            this._control.valueAccessor = this;
        }
    }
    Object.defineProperty(Md2Colorpicker.prototype, "color", {
        get: function () { return this._color; },
        set: function (value) { this._color = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Colorpicker.prototype, "placeholder", {
        /** Placeholder to be shown if no value has been selected. */
        get: function () { return this._placeholder; },
        set: function (value) { this._placeholder = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Colorpicker.prototype, "required", {
        get: function () { return this._required; },
        set: function (value) { this._required = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Colorpicker.prototype, "disabled", {
        /** Whether the component is disabled. */
        get: function () { return this._disabled; },
        set: function (value) {
            this._disabled = coerceBooleanProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Colorpicker.prototype, "value", {
        get: function () {
            return this._innerValue;
        },
        /**
        * set accessor including call the onchange callback
        */
        set: function (v) {
            if (v !== this._innerValue) {
                if (v) {
                    this.hsva = this.service.stringToHsva(v);
                }
                this._innerValue = v;
            }
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(Md2Colorpicker.prototype, "container", {
        get: function () { return this._container; },
        set: function (value) {
            if (this._container !== value) {
                this._container = value || 'inline';
                this.destroyPanel();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Colorpicker.prototype, "setGradient", {
        get: function () {
            return {
                'background-image': 'linear-gradient(to right, transparent, transparent),' +
                    'linear-gradient(to left, ' + this.hexText + ', rgba(255, 255, 255, 0))'
            };
        },
        enumerable: true,
        configurable: true
    });
    Md2Colorpicker.prototype.ngOnDestroy = function () { this.destroyPanel(); };
    Object.defineProperty(Md2Colorpicker.prototype, "panelOpen", {
        /** Whether or not the overlay panel is open. */
        get: function () {
            return this._panelOpen;
        },
        enumerable: true,
        configurable: true
    });
    /** Toggles the overlay panel open or closed. */
    Md2Colorpicker.prototype.toggle = function () {
        this.panelOpen ? this.close() : this.open();
    };
    /** Opens the overlay panel. */
    Md2Colorpicker.prototype.open = function () {
        var hsva = this.service.stringToHsva(this.color + '');
        this.isInputFocus = true;
        if (hsva) {
            this.hsva = hsva;
        }
        else {
            this.hsva = this.service.stringToHsva(this._defalutColor);
        }
        this.sliderDim = new SliderDimension(245, 250, 130, 245);
        this.slider = new SliderPosition(0, 0, 0, 0);
        if (this.cFormat === 'rgb') {
            this.format = 1;
        }
        else if (this.cFormat === 'hsl') {
            this.format = 2;
        }
        else {
            this.format = 0;
        }
        this.update();
        if (this.disabled) {
            return;
        }
        if (!this._isColorpickerVisible) {
            this._initialColor = this.color;
            this.update();
            this._isColorpickerVisible = true;
        }
        else {
            this._isColorpickerVisible = false;
        }
        this._createOverlay();
        this._overlayRef.attach(this.templatePortals.first);
        this._subscribeToBackdrop();
        this._panelOpen = true;
        this.onOpen.emit();
    };
    /** Closes the overlay panel and focuses the host element. */
    Md2Colorpicker.prototype.close = function () {
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
    };
    /** Removes the panel from the DOM. */
    Md2Colorpicker.prototype.destroyPanel = function () {
        if (this._overlayRef) {
            this._overlayRef.dispose();
            this._overlayRef = null;
            this._cleanUpSubscriptions();
        }
    };
    Md2Colorpicker.prototype._handleKeydown = function (event) {
        if (this.disabled) {
            return;
        }
    };
    Md2Colorpicker.prototype._onFocus = function () {
    };
    Md2Colorpicker.prototype._onBlur = function () {
        if (!this.panelOpen) {
            this._onTouched();
        }
    };
    /**
      * input event listner
      * @param event
      */
    Md2Colorpicker.prototype.changeInput = function (event) {
        var value = event.target.value;
        this.colorpickerChange.emit(value);
    };
    /**
    * set saturation,lightness,hue,alpha,RGB value
    * @param val
    * @param rg
    */
    Md2Colorpicker.prototype.setSaturation = function (val) {
        var hsla = this.service.hsva2hsla(this.hsva);
        hsla.s = val.v / val.rg;
        this.hsva = this.service.hsla2hsva(hsla);
        this.update();
    };
    Md2Colorpicker.prototype.setLightness = function (val) {
        var hsla = this.service.hsva2hsla(this.hsva);
        hsla.l = val.v / val.rg;
        this.hsva = this.service.hsla2hsva(hsla);
        this.update();
    };
    Md2Colorpicker.prototype.setHue = function (val) {
        this.hsva.h = val.v / val.rg;
        this.update();
    };
    Md2Colorpicker.prototype.setAlpha = function (val) {
        this.hsva.a = val.v / val.rg;
        this.update();
    };
    Md2Colorpicker.prototype.setR = function (val) {
        var rgba = this.service.hsvaToRgba(this.hsva);
        rgba.r = val.v / val.rg;
        this.hsva = this.service.rgbaToHsva(rgba);
        this.update();
    };
    Md2Colorpicker.prototype.setG = function (val) {
        var rgba = this.service.hsvaToRgba(this.hsva);
        rgba.g = val.v / val.rg;
        this.hsva = this.service.rgbaToHsva(rgba);
        this.update();
    };
    Md2Colorpicker.prototype.setB = function (val) {
        var rgba = this.service.hsvaToRgba(this.hsva);
        rgba.b = val.v / val.rg;
        this.hsva = this.service.rgbaToHsva(rgba);
        this.update();
    };
    Md2Colorpicker.prototype.setSaturationAndBrightness = function (val) {
        this.hsva.s = val.s / val.pointX;
        this.hsva.v = val.v / val.pointY;
        this.update();
    };
    Md2Colorpicker.prototype.clickOk = function () {
        this._isColorpickerVisible = false;
        this.isInputValidColor = false;
        this.color = this._innerValue;
        if (this._innerValue != this._initialColor) {
            this._emitChangeEvent();
        }
        this.close();
    };
    /**
    * deselect recent color and close popup
    */
    Md2Colorpicker.prototype.cancelColor = function () {
        this._innerValue = this._initialColor;
        this.close();
    };
    Md2Colorpicker.prototype.isValidColor = function (str) {
        return str.match(/^#[a-f0-9]{6}$/i) !== null;
    };
    /**
       * set color
       * @param value
       */
    Md2Colorpicker.prototype.setColorFromString = function (value) {
        if (!this.isValidColor(value)) {
            value = '#000000';
            this.backColor = false;
        }
        var hsva = this.service.stringToHsva(value);
        if (hsva !== null) {
            this.hsva = hsva;
        }
        this.update();
    };
    Md2Colorpicker.prototype.formatPolicy = function (value) {
        this.format = value;
        if (this.format === 0 && this.hsva.a < 1) {
            this.format++;
        }
        return this.format;
    };
    /**
     * update color
     */
    Md2Colorpicker.prototype.update = function () {
        var hsla = this.service.hsva2hsla(this.hsva);
        var rgba = this.service.denormalizeRGBA(this.service.hsvaToRgba(this.hsva));
        var hueRgba = this.service.denormalizeRGBA(this.service.hsvaToRgba(new Hsva(this.hsva.h, 1, 1, 1)));
        this.alphaColor = 'rgb(' + rgba.r + ',' + rgba.g + ',' + rgba.b + ')';
        this._hueSliderColor = 'rgb(' + hueRgba.r + ',' + hueRgba.g + ',' + hueRgba.b + ')';
        this.hslaText = new Hsla(Math.round((hsla.h) * 360), Math.round(hsla.s * 100), Math.round(hsla.l * 100), Math.round(hsla.a * 100) / 100);
        this.rgbaText = new Rgba(rgba.r, rgba.g, rgba.b, Math.round(rgba.a * 100) / 100);
        if (this.backColor) {
            this.hexText = this.service.hexText(rgba);
        }
        this.backColor = true;
        var colorCode = Math.round((this.rgbaText.r * 299 + this.rgbaText.g * 587 +
            this.rgbaText.b * 114) / 1000);
        if (colorCode >= 128 || this.hsva.a < 0.35) {
            this.fontColor = 'black';
            this.backAreaColor = 'rgba(0,0,0,.4)';
        }
        else {
            this.fontColor = 'white';
            this.backAreaColor = 'rgba(255,255,255,.4)';
        }
        if (this.format === 0 && this.hsva.a < 1) {
            this.format++;
        }
        this.outputColor = this.service.outputFormat(this.hsva, this.cFormat);
        this.slider = new SliderPosition((this.hsva.h) * this.sliderDim.h, this.hsva.s * this.sliderDim.s - 7, (1 - this.hsva.v) * this.sliderDim.v - 7, this.hsva.a * this.sliderDim.a);
        this._innerValue = this.outputColor;
    };
    Md2Colorpicker.prototype.clearColor = function (event) {
        event.stopPropagation();
        this.color = '';
        this._emitChangeEvent();
    };
    Md2Colorpicker.prototype.isDescendant = function (parent, child) {
        var node = child.parentNode;
        while (node !== null) {
            if (node === parent) {
                return true;
            }
            node = node.parentNode;
        }
        return false;
    };
    Md2Colorpicker.prototype.checkInputVal = function (event) {
        this.hsva = this.service.stringToHsva(this.color + '');
        this.isInputFocus = false;
        if (this.hsva) {
            if (this._innerValue !== this.color) {
                this._emitChangeEvent();
            }
            this.isInputValidColor = false;
        }
        else {
            this.isInputValidColor = true;
        }
    };
    /** Emits an event when the user selects a color. */
    Md2Colorpicker.prototype._emitChangeEvent = function () {
        this._onChange(this.color);
        this.change.emit(new Md2ColorChange(this, this.color));
        this._innerValue = this.color;
    };
    Md2Colorpicker.prototype.writeValue = function (value) {
        this._innerValue = value;
        this.color = value;
    };
    Md2Colorpicker.prototype.registerOnChange = function (fn) { this._onChange = fn; };
    Md2Colorpicker.prototype.registerOnTouched = function (fn) { this._onTouched = fn; };
    Md2Colorpicker.prototype._subscribeToBackdrop = function () {
        var _this = this;
        this._backdropSubscription = this._overlayRef.backdropClick().subscribe(function () {
            _this._innerValue = _this._initialColor;
            _this.close();
        });
    };
    /**
     *  This method creates the overlay from the provided panel's template and saves its
     *  OverlayRef so that it can be attached to the DOM when open is called.
     */
    Md2Colorpicker.prototype._createOverlay = function () {
        if (!this._overlayRef) {
            var config = new OverlayState();
            if (this.container === 'inline') {
                var _a = this.positionX === 'before' ? ['end', 'start'] : ['start', 'end'], posX = _a[0], fallbackX = _a[1];
                var _b = this.positionY === 'above' ? ['bottom', 'top'] : ['top', 'bottom'], overlayY = _b[0], fallbackOverlayY = _b[1];
                var originY = overlayY;
                var fallbackOriginY = fallbackOverlayY;
                if (!this.overlapTrigger) {
                    originY = overlayY === 'top' ? 'bottom' : 'top';
                    fallbackOriginY = fallbackOverlayY === 'top' ? 'bottom' : 'top';
                }
                config.positionStrategy = this.overlay.position().connectedTo(this._element, { originX: posX, originY: originY }, { overlayX: posX, overlayY: overlayY })
                    .withFallbackPosition({ originX: fallbackX, originY: originY }, { overlayX: fallbackX, overlayY: overlayY })
                    .withFallbackPosition({ originX: posX, originY: fallbackOriginY }, { overlayX: posX, overlayY: fallbackOverlayY })
                    .withFallbackPosition({ originX: fallbackX, originY: fallbackOriginY }, { overlayX: fallbackX, overlayY: fallbackOverlayY });
                config.hasBackdrop = true;
                config.backdropClass = 'cdk-overlay-transparent-backdrop';
            }
            else {
                config.positionStrategy = this.overlay.position()
                    .global()
                    .centerHorizontally()
                    .centerVertically();
                config.hasBackdrop = true;
            }
            this._overlayRef = this.overlay.create(config);
        }
    };
    Md2Colorpicker.prototype._cleanUpSubscriptions = function () {
        if (this._backdropSubscription) {
            this._backdropSubscription.unsubscribe();
        }
        if (this._positionSubscription) {
            this._positionSubscription.unsubscribe();
        }
    };
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], Md2Colorpicker.prototype, "color", null);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], Md2Colorpicker.prototype, "placeholder", null);
    __decorate([
        Input(), 
        __metadata('design:type', Boolean)
    ], Md2Colorpicker.prototype, "required", null);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], Md2Colorpicker.prototype, "disabled", null);
    __decorate([
        Input('format'), 
        __metadata('design:type', String)
    ], Md2Colorpicker.prototype, "cFormat", void 0);
    __decorate([
        Output('colorpickerChange'), 
        __metadata('design:type', Object)
    ], Md2Colorpicker.prototype, "colorpickerChange", void 0);
    __decorate([
        Output(), 
        __metadata('design:type', EventEmitter)
    ], Md2Colorpicker.prototype, "change", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Number)
    ], Md2Colorpicker.prototype, "tabindex", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', String)
    ], Md2Colorpicker.prototype, "id", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], Md2Colorpicker.prototype, "container", null);
    __decorate([
        Output(), 
        __metadata('design:type', EventEmitter)
    ], Md2Colorpicker.prototype, "onOpen", void 0);
    __decorate([
        Output(), 
        __metadata('design:type', EventEmitter)
    ], Md2Colorpicker.prototype, "onClose", void 0);
    __decorate([
        ViewChildren(TemplatePortalDirective), 
        __metadata('design:type', QueryList)
    ], Md2Colorpicker.prototype, "templatePortals", void 0);
    __decorate([
        ViewChildren(TemplatePortalDirective), 
        __metadata('design:type', Portal)
    ], Md2Colorpicker.prototype, "templatePortal", void 0);
    Md2Colorpicker = __decorate([
        Component({selector: 'md2-colorpicker',
            template: " <div class=\"md2-colorpicker-trigger\"> <div class=\"color-picker-selector\" [class.color-error]=\"isInputValidColor\"> <div class=\"color-div\" (click)=\"toggle()\"> <div class=\"color-fill\" [style.background-color]=\"color\"> </div> </div> <div class=\"md2-colorpicker-input\" [class.input-focused]=\"isInputFocus\"> <span class=\"md2-colorpicker-placeholder\" [class.md2-floating-placeholder]=\"color\">{{ placeholder }}</span> <input class=\"md2-colorpicker-value\" value=\"color\" [tabindex]=\"tabindex\" [disabled]=\"disabled\" [(ngModel)]=\"color\" (focus)=\"isInputFocus=true\" (blur)=\"checkInputVal($event)\" /> <span *ngIf=\"color && !required && !disabled\" class=\"color-clear\" (click)=\"clearColor($event)\"> <svg viewBox=\"0 0 20 20\" width=\"20\" height=\"20\"> <path d=\"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z\" /> </svg> </span> </div> </div> </div> <template portal> <div class=\"md2-colorpicker-panel\"> <div class=\"md2-colorpicker-content\"> <div class=\"md2-colorpicker-wrapper\" [class.active]=\"_isColorpickerVisible\"> <div class=\"md2-color-picker\"> <div class=\"selected-color\"> <div class=\"selected-color-bg\" [style.background]=\"outputColor\"> <div class=\"color-input\"> <div [hidden]=\"format!=2\" class=\"hsla-text\"> <input [text] type=\"number\" [style.color]=\"fontColor\" pattern=\"[0-9]*\" min=\"0\" max=\"360\" [rg]=\"360\" (newValue)=\"setHue($event)\" [value]=\"hslaText.h\" /> <input [text] type=\"number\" [style.color]=\"fontColor\" pattern=\"[0-9]*\" min=\"0\" max=\"100\" [rg]=\"100\" (newValue)=\"setSaturation($event)\" [value]=\"hslaText.s\" /> <input [text] type=\"number\" [style.color]=\"fontColor\" pattern=\"[0-9]*\" min=\"0\" max=\"100\" [rg]=\"100\" (newValue)=\"setLightness($event)\" [value]=\"hslaText.l\" /> <input [text] type=\"number\" [style.color]=\"fontColor\" pattern=\"[0-9]+([\.,][0-9]{1,2})?\" min=\"0\" max=\"1\" step=\"0.1\" [rg]=\"1\" (newValue)=\"setAlpha($event)\" [value]=\"hslaText.a\" /> </div> <div [hidden]=\"format!=1\" class=\"rgba-text\"> <input [text] type=\"number\" [style.color]=\"fontColor\" pattern=\"[0-9]*\" min=\"0\" max=\"255\" [rg]=\"255\" (newValue)=\"setR($event)\" [value]=\"rgbaText.r\" /> <input [text] type=\"number\" [style.color]=\"fontColor\" pattern=\"[0-9]*\" min=\"0\" max=\"255\" [rg]=\"255\" (newValue)=\"setG($event)\" [value]=\"rgbaText.g\" /> <input [text] type=\"number\" [style.color]=\"fontColor\" pattern=\"[0-9]*\" min=\"0\" max=\"255\" [rg]=\"255\" (newValue)=\"setB($event)\" [value]=\"rgbaText.b\" /> <input [text] type=\"number\" [style.color]=\"fontColor\" pattern=\"[0-9]+([\.,][0-9]{1,2})?\" min=\"0\" max=\"1\" step=\"0.1\" [rg]=\"1\" (newValue)=\"setAlpha($event)\" [value]=\"rgbaText.a\" /> </div> <div [hidden]=\"format!=0\" class=\"hex-text\"> <input [text] (newValue)=\"setColorFromString($event)\" [style.color]=\"fontColor\" [value]=\"hexText\" /> </div> </div> <div class=\"color-bar \"> <div [style.color]=\"fontColor\" class=\"clearfix\"> <div class=\"type-policy\" [style.background]=\"backAreaColor\" [class.active]=\"format==0\" (click)=\"formatPolicy(0)\">HEX</div> <div class=\"type-policy\" [style.background]=\"backAreaColor\" [class.active]=\"format==1\" (click)=\"formatPolicy(1)\">RGBA</div> <div class=\"type-policy\" [style.background]=\"backAreaColor\" [class.active]=\"format==2\" (click)=\"formatPolicy(2)\">HSLA</div> </div> </div> </div> </div> <div class=\"input-color-content\"> <div [colorpicker-slider] [style.background-color]=\"_hueSliderColor\" [point-x]=\"1\" [point-y]=\"1\" (change)=\"setSaturationAndBrightness($event)\" class=\"saturation-lightness\"> <div [style.left.px]=\"slider.s\" [style.top.px]=\"slider.v\" class=\"cursor\"></div> </div> <div [colorpicker-slider] [point-x]=\"1\" (change)=\"setHue($event)\" class=\"hue\"> <div [style.left.px]=\"slider.h\" class=\"color-picker-marker\"></div> </div> <div [colorpicker-slider] [point-x]=\"1\" (change)=\"setAlpha($event)\" class=\"alpha\"> <div class=\"alpha-main\" [ngStyle]=\"setGradient\"> <div [style.left.px]=\"slider.a\" class=\"color-picker-marker\"></div> </div> </div> </div> <div class=\"md2-color-picker-actions\"> <div class=\"md2-button\" (click)=\"cancelColor()\">Cancel</div> <div class=\"md2-button\" (click)=\"clickOk()\">Ok</div> </div> </div> </div> </div> </div> </template>",
            styles: [".md2-colorpicker-wrapper { width: 270px; height: 355px; border-radius: 2px; background-color: #fff; z-index: 10; box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4); transform: scale(0); transform-origin: left top; transition: 150ms; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; } .md2-colorpicker-wrapper.active { transform: scale(1); } .md2-colorpicker-disabled { pointer-events: none; cursor: default; } .md2-colorpicker-disabled .color-picker-selector .md2-colorpicker-value { color: rgba(0, 0, 0, 0.38); border-color: transparent; background-image: linear-gradient(to right, rgba(0, 0, 0, 0.38) 0%, rgba(0, 0, 0, 0.38) 33%, transparent 0%); background-position: bottom -1px left 0; background-size: 4px 1px; background-repeat: repeat-x; } .md2-colorpicker-input { color: rgba(0, 0, 0, 0.38); border-bottom: 1px solid rgba(0, 0, 0, 0.12); display: flex; justify-content: space-between; align-items: center; height: 30px; min-width: 180px; line-height: 22px; position: relative; box-sizing: border-box; } [aria-disabled='true'] .md2-colorpicker-input { background-image: linear-gradient(to right, rgba(0, 0, 0, 0.26) 0, rgba(0, 0, 0, 0.26) 33%, transparent 0); background-size: 4px 1px; background-repeat: repeat-x; border-color: transparent; background-position: 0 bottom; cursor: default; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; } md2-colorpicker:focus:not(.md2-colorpicker-disabled) .md2-colorpicker-input { color: #106cc8; border-color: #106cc8; } md2-colorpicker.ng-invalid.ng-touched:not(.md2-colorpicker-disabled) .md2-colorpicker-input { color: #f44336; border-color: #f44336; } .input-focused { color: #106cc8; border-color: #106cc8; } .inline-control { width: 150px; margin-right: 16px; padding: 16px 0; } .md2-colorpicker-placeholder { position: absolute; right: 18px; bottom: 100%; left: 0; padding: 0 2px; transform: translate3d(0, 26px, 0) scale(1); transform-origin: left top; white-space: nowrap; overflow-x: hidden; text-overflow: ellipsis; transition: all 150ms cubic-bezier(0.25, 0.8, 0.25, 1); } .md2-colorpicker-placeholder.md2-floating-placeholder { left: -2px; text-align: left; transform: translate3d(0, 6px, 0) scale(0.75); } [aria-required=true] .md2-colorpicker-placeholder::after { content: '*'; } .color-error .md2-colorpicker-input { color: #f44336; border-color: #f44336; } .color-error .color-fill { background-color: transparent !important; } .color-picker-selector { display: block; padding: 18px 0 18px 32px; white-space: nowrap; } .color-picker-selector .color-div { content: ''; width: 24px; height: 24px; overflow: hidden; background-color: #fff; background-image: linear-gradient(45deg, #ddd 25%, transparent 0, transparent 75%, #ddd 0, #ddd), linear-gradient(45deg, #ddd 25%, transparent 0, transparent 75%, #ddd 0, #ddd); background-size: 8px 8px; background-position: 0 0, 4px 4px; position: absolute; top: 21px; left: 0; border: 2px solid #fafafa; display: block; fill: #5a5a5a; cursor: pointer; border-radius: 50%; vertical-align: middle; box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.2), 0 1px 1px 1px rgba(0, 0, 0, 0.14), 0 1px 1px 1px rgba(0, 0, 0, 0.12); } .color-picker-selector .color-div .color-fill { width: 100%; height: 100%; } .color-picker-selector .md2-colorpicker-value { font-size: 15px; background: transparent; border: 0; outline: none; position: relative; display: block; min-width: 160px; height: 30px; padding: 2px 2px 1px; margin: 0; line-height: 26px; color: rgba(0, 0, 0, 0.87); vertical-align: middle; box-sizing: border-box; } md2-colorpicker { position: relative; display: block; max-width: 215px; outline: none; -webkit-backface-visibility: hidden; backface-visibility: hidden; } .md2-color-picker { position: relative; display: block; outline: none; -webkit-backface-visibility: hidden; backface-visibility: hidden; } .md2-color-picker * { box-sizing: border-box; } .md2-color-picker .input-color-content { width: 250px; position: relative; margin: 10px auto; } .md2-color-picker i { cursor: default; position: relative; } .md2-color-picker input { font-size: 16px; height: 50px; outline: none; } .md2-color-picker div.cursor-sv { cursor: default; position: relative; border-radius: 50%; width: 15px; height: 15px; border: #ddd solid 1px; } .md2-color-picker div.cursor { cursor: crosshair; position: relative; border-radius: 50%; width: 13px; height: 13px; box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.5), inset 0 0 2px 0 rgba(0, 0, 0, 0.5); border: 2px solid #fff; } .md2-color-picker div.color-picker-marker { cursor: crosshair; position: relative; border: 2px solid #fff; box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.5); height: 100%; width: 5px; border-bottom: 0; border-top: 0; } .md2-color-picker .saturation-lightness { width: 100%; height: 130px; border: none; overflow: hidden; background-image: linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, rgba(255, 255, 255, 0)); -ms-filter: 'progid:DXImageTransform.Microsoft.gradient(startColorstr=#00CC9A81, endColorstr=#FF000000)'; filter: progid:dximagetransform.microsoft.gradient(startColorstr='#00CC9A81', endColorstr='#FF000000'); } .md2-color-picker .saturation-lightness:hover { cursor: crosshair; } .md2-color-picker .hue { width: 100%; height: 30px; border: none; margin: 10px 0; background: -webkit-linear-gradient(left, #f00 0%, #ff0 16.66%, #0f0 33.33%, #0ff 50%, #00f 66.66%, #f0f 83.33%, #f00 100%); } .md2-color-picker .alpha { border: 1px solid #efefef; width: 100%; height: 30px; background-color: #fff; background-size: 8px 8px; background-position: 0 0,4px 4px; position: relative; /*background-image: linear-gradient(to left, transparent, transparent), linear-gradient(to right, #fff, rgba(255, 255, 255, 0));*/ background-image: linear-gradient(45deg, #dddddd 25%, transparent 0px, transparent 75%, #dddddd 0px, #dddddd), linear-gradient(45deg, #dddddd 25%, transparent 0px, transparent 75%, #dddddd 0px, #dddddd); background-image: -webkit-linear-gradient(45deg, #ddd 25%, transparent 0, transparent 75%, #ddd 0, #ddd), -webkit-linear-gradient(45deg, #ddd 25%, transparent 0, transparent 75%, #ddd 0, #ddd); } .md2-color-picker .alpha .alpha-main { position: absolute; height: 100%; opacity: 1; background-image: linear-gradient(to left, transparent, transparent), linear-gradient(to right, #fff, rgba(255, 255, 255, 0)); width: 100%; } .md2-color-picker .selected-color { width: 100%; height: 75px; background-color: #fff; background-size: 8px 8px; background-position: 0 0,4px 4px; position: relative; background-image: linear-gradient(45deg, #dddddd 25%, transparent 0px, transparent 75%, #dddddd 0px, #dddddd), linear-gradient(45deg, #dddddd 25%, transparent 0px, transparent 75%, #dddddd 0px, #dddddd); background-image: -webkit-linear-gradient(45deg, #ddd 25%, transparent 0, transparent 75%, #ddd 0, #ddd), -webkit-linear-gradient(45deg, #ddd 25%, transparent 0, transparent 75%, #ddd 0, #ddd); } .md2-color-picker .selected-color .selected-color-bg { position: absolute; height: 100%; opacity: 1; width: 100%; } .md2-color-picker .selected-color .color-bar { position: absolute; width: 100%; bottom: 0; } .md2-color-picker .selected-color .color-input { position: relative; } .color-clear { color: rgba(0, 0, 0, 0.4); cursor: pointer; } .color-clear svg { fill: #686868; } .clearfix:before, .clearfix:after { content: \" \"; display: table; } .clearfix:after { clear: both; } .hex-text { width: 100%; } .hex-text input { width: 100%; border: 0; padding: 4px; text-align: center; background: transparent; } .hex-text div { text-align: center; float: left; clear: left; width: 160px; margin-top: 4px; } .hsla-text, .rgba-text { text-align: center; } .hsla-text input, .rgba-text input { width: 50px; border: 0; padding: 4px 0; background: transparent; text-align: center; } .hsla-text div, .rgba-text div { text-align: center; display: block; } .hsla-text label, .rgba-text label { text-align: center; display: inline-block; font-size: 15px; } .md2-color-picker-actions { text-align: right; } .md2-color-picker-actions .md2-button { display: inline-block; min-width: 64px; margin: 4px 8px 8px 0; padding: 0 12px; font-size: 14px; color: #106cc8; line-height: 36px; text-align: center; text-transform: uppercase; border-radius: 2px; cursor: pointer; box-sizing: border-box; transition: all 450ms cubic-bezier(0.23, 1, 0.32, 1); } .md2-color-picker-actions .md2-button:hover { background: #ebebeb; } .hsla-text div:nth-child(5), .rgba-text div:nth-child(5) { clear: left; } .type-policy { width: 33.333333%; text-align: center; font-size: 14px; display: inline-block; float: left; padding: 3px; cursor: pointer; background: rgba(255, 255, 255, 0.4); } .type-policy.active { background: rgba(153, 153, 153, 0.35) !important; } .cdk-overlay-container, .cdk-global-overlay-wrapper { pointer-events: none; top: 0; left: 0; height: 100%; width: 100%; } .cdk-overlay-container { position: fixed; z-index: 1000; } .cdk-global-overlay-wrapper { display: flex; position: absolute; z-index: 1000; } .cdk-overlay-pane { position: absolute; pointer-events: auto; box-sizing: border-box; z-index: 1000; } .cdk-overlay-backdrop { position: absolute; top: 0; bottom: 0; left: 0; right: 0; z-index: 1000; pointer-events: auto; transition: opacity 400ms cubic-bezier(0.25, 0.8, 0.25, 1); opacity: 0; } .cdk-overlay-backdrop.cdk-overlay-backdrop-showing { opacity: 0.48; } .cdk-overlay-dark-backdrop { background: rgba(0, 0, 0, 0.6); } /*# sourceMappingURL=colorpicker.css.map */ "],
            host: {
                'role': 'colorpicker',
                '[id]': 'id',
                '[class.color-focus]': 'inputFocused || !disabled',
                '[class.md2-colorpicker-disabled]': 'disabled',
                '[attr.aria-label]': 'placeholder',
                '[attr.aria-required]': 'required.toString()',
            },
            encapsulation: ViewEncapsulation.None
        }),
        __param(5, Self()),
        __param(5, Optional()), 
        __metadata('design:paramtypes', [ElementRef, Overlay, ViewContainerRef, Renderer, ColorpickerService, NgControl])
    ], Md2Colorpicker);
    return Md2Colorpicker;
}());
export var Hsva = (function () {
    function Hsva(h, s, v, a) {
        this.h = h;
        this.s = s;
        this.v = v;
        this.a = a;
    }
    return Hsva;
}());
export var Hsla = (function () {
    function Hsla(h, s, l, a) {
        this.h = h;
        this.s = s;
        this.l = l;
        this.a = a;
    }
    return Hsla;
}());
export var Rgba = (function () {
    function Rgba(r, g, b, a) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }
    return Rgba;
}());
export var SliderPosition = (function () {
    function SliderPosition(h, s, v, a) {
        this.h = h;
        this.s = s;
        this.v = v;
        this.a = a;
    }
    return SliderPosition;
}());
export var SliderDimension = (function () {
    function SliderDimension(h, s, v, a) {
        this.h = h;
        this.s = s;
        this.v = v;
        this.a = a;
    }
    return SliderDimension;
}());
export var MD2_COLORPICKER_DIRECTIVES = [
    Md2Colorpicker, ColorpickerSliderDirective, TextDirective
];
export var Md2ColorpickerModule = (function () {
    function Md2ColorpickerModule() {
    }
    Md2ColorpickerModule.forRoot = function () {
        return {
            ngModule: Md2ColorpickerModule,
            providers: []
        };
    };
    Md2ColorpickerModule = __decorate([
        NgModule({
            declarations: MD2_COLORPICKER_DIRECTIVES,
            imports: [CommonModule, FormsModule, OverlayModule, PortalModule],
            exports: MD2_COLORPICKER_DIRECTIVES,
            providers: [ColorpickerService]
        }), 
        __metadata('design:paramtypes', [])
    ], Md2ColorpickerModule);
    return Md2ColorpickerModule;
}());
//# sourceMappingURL=colorpicker.js.map