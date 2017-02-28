/**
  * @license Md2 v0.0.16
  * Copyright (c) 2017 Promact, Inc. http://code.promactinfo.com/md2/
  * License: MIT
  */
(function (global, factory) {
   typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('rxjs/Subject'), require('rxjs/Observable'), require('rxjs/add/observable/fromEvent'), require('rxjs/add/operator/auditTime'), require('@angular/platform-browser'), require('@angular/forms'), require('rxjs/add/operator/first')) :
   typeof define === 'function' && define.amd ? define(['exports', '@angular/core', '@angular/common', 'rxjs/Subject', 'rxjs/Observable', 'rxjs/add/observable/fromEvent', 'rxjs/add/operator/auditTime', '@angular/platform-browser', '@angular/forms', 'rxjs/add/operator/first'], factory) :
   (factory((global.ng = global.ng || {}, global.ng.md2 = global.ng.md2 || {}),global.ng.core,global.ng.common,global.Rx,global.Rx,global.Rx.Observable,global.Rx.Observable.prototype,global.ng.platformBrowser,global.ng.forms,global.Rx.Observable.prototype));
}(this, (function (exports,_angular_core,_angular_common,rxjs_Subject,rxjs_Observable,rxjs_add_observable_fromEvent,rxjs_add_operator_auditTime,_angular_platformBrowser,_angular_forms,rxjs_add_operator_first) { 'use strict';

var __decorate$2 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$2 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var MATERIAL_COMPATIBILITY_MODE = new _angular_core.OpaqueToken('md-compatibility-mode');
/** Selector that matches all elements that may have style collisions with AngularJS Material. */
var MAT_ELEMENTS_SELECTOR = "\n  [mat-button],\n  [mat-dialog-actions],\n  [mat-dialog-close],\n  [mat-dialog-content],\n  [mat-dialog-title],\n  [mat-fab],\n  [mat-icon-button],\n  [mat-menu-trigger-for],\n  [mat-mini-fab],\n  [mat-raised-button],\n  [mat-tab-label],\n  [mat-tab-link],\n  [mat-tab-nav-bar],\n  [matTooltip],\n  mat-autocomplete,\n  mat-button-toggle,\n  mat-button-toggle-group,\n  mat-button-toggle,\n  mat-card,\n  mat-card-actions,\n  mat-card-content,\n  mat-card-footer,\n  mat-card-header,\n  mat-card-subtitle,\n  mat-card-title,\n  mat-card-title-group,\n  mat-checkbox,\n  mat-chip,\n  mat-dialog-actions,\n  mat-dialog-container,\n  mat-dialog-content,\n  mat-divider,\n  mat-grid-list,\n  mat-grid-tile,\n  mat-grid-tile-footer,\n  mat-grid-tile-header,\n  mat-hint,\n  mat-icon,\n  mat-list,\n  mat-list-item,\n  mat-menu,\n  mat-nav-list,\n  mat-option,\n  mat-placeholder,\n  mat-progress-bar,\n  mat-progress-circle,\n  mat-pseudo-checkbox,\n  mat-radio-button,\n  mat-radio-group,\n  mat-select,\n  mat-sidenav,\n  mat-sidenav-container,\n  mat-slider,\n  mat-spinner,\n  mat-tab,\n  mat-tab-group,\n  mat-toolbar";
/** Selector that matches all elements that may have style collisions with AngularJS Material. */
var MD_ELEMENTS_SELECTOR = "  \n  [md-button],\n  [md-dialog-actions],\n  [md-dialog-close],\n  [md-dialog-content],\n  [md-dialog-title],\n  [md-fab],\n  [md-icon-button],\n  [md-menu-trigger-for],\n  [md-mini-fab],\n  [md-raised-button],\n  [md-tab-label],\n  [md-tab-link],\n  [md-tab-nav-bar],\n  [mdTooltip],\n  md-autocomplete,\n  md-button-toggle,\n  md-button-toggle-group,\n  md-button-toggle,\n  md-card,\n  md-card-actions,\n  md-card-content,\n  md-card-footer,\n  md-card-header,\n  md-card-subtitle,\n  md-card-title,\n  md-card-title-group,\n  md-checkbox,\n  md-chip,\n  md-dialog-actions,\n  md-dialog-container,\n  md-dialog-content,\n  md-divider,\n  md-grid-list,\n  md-grid-tile,\n  md-grid-tile-footer,\n  md-grid-tile-header,\n  md-hint,\n  md-icon,\n  md-list,\n  md-list-item,\n  md-menu,\n  md-nav-list,\n  md-option,\n  md-placeholder,\n  md-progress-bar,\n  md-progress-circle,\n  md-pseudo-checkbox,\n  md-radio-button,\n  md-radio-group,\n  md-select,\n  md-sidenav,\n  md-sidenav-container,\n  md-slider,\n  md-spinner,\n  md-tab,\n  md-tab-group,\n  md-toolbar";
/** Directive that enforces that the `mat-` prefix cannot be used. */
var MatPrefixRejector = (function () {
    function MatPrefixRejector(isCompatibilityMode) {
        if (!isCompatibilityMode) {
            throw Error('The "mat-" prefix cannot be used out of ng-material v1 compatibility mode.');
        }
    }
    MatPrefixRejector = __decorate$2([
        _angular_core.Directive({ selector: MAT_ELEMENTS_SELECTOR }),
        __param(0, _angular_core.Optional()),
        __param(0, _angular_core.Inject(MATERIAL_COMPATIBILITY_MODE)), 
        __metadata$2('design:paramtypes', [Boolean])
    ], MatPrefixRejector);
    return MatPrefixRejector;
}());
/** Directive that enforces that the `md-` prefix cannot be used. */
var MdPrefixRejector = (function () {
    function MdPrefixRejector(isCompatibilityMode) {
        if (isCompatibilityMode) {
            throw Error('The "md-" prefix cannot be used in ng-material v1 compatibility mode.');
        }
    }
    MdPrefixRejector = __decorate$2([
        _angular_core.Directive({ selector: MD_ELEMENTS_SELECTOR }),
        __param(0, _angular_core.Optional()),
        __param(0, _angular_core.Inject(MATERIAL_COMPATIBILITY_MODE)), 
        __metadata$2('design:paramtypes', [Boolean])
    ], MdPrefixRejector);
    return MdPrefixRejector;
}());
/**
 * Module that enforces the default compatibility mode settings. When this module is loaded
 * without NoConflictStyleCompatibilityMode also being imported, it will throw an error if
 * there are any uses of the `mat-` prefix.
 */
var CompatibilityModule = (function () {
    function CompatibilityModule() {
    }
    CompatibilityModule.forRoot = function () {
        return {
            ngModule: CompatibilityModule,
            providers: [],
        };
    };
    CompatibilityModule = __decorate$2([
        _angular_core.NgModule({
            declarations: [MatPrefixRejector, MdPrefixRejector],
            exports: [MatPrefixRejector, MdPrefixRejector],
        }), 
        __metadata$2('design:paramtypes', [])
    ], CompatibilityModule);
    return CompatibilityModule;
}());
/**
 * Module that enforces "no-conflict" compatibility mode settings. When this module is loaded,
 * it will throw an error if there are any uses of the `md-` prefix.
 */
var NoConflictStyleCompatibilityMode = (function () {
    function NoConflictStyleCompatibilityMode() {
    }
    NoConflictStyleCompatibilityMode = __decorate$2([
        _angular_core.NgModule({
            providers: [{
                    provide: MATERIAL_COMPATIBILITY_MODE, useValue: true,
                }],
        }), 
        __metadata$2('design:paramtypes', [])
    ], NoConflictStyleCompatibilityMode);
    return NoConflictStyleCompatibilityMode;
}());

var __decorate$1 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$1 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Shared directive to count lines inside a text area, such as a list item.
 * Line elements can be extracted with a @ContentChildren(MdLine) query, then
 * counted by checking the query list's length.
 */
var MdLine = (function () {
    function MdLine() {
    }
    MdLine = __decorate$1([
        _angular_core.Directive({
            selector: '[md-line], [mat-line]',
            host: {
                '[class.mat-line]': 'true'
            }
        }), 
        __metadata$1('design:paramtypes', [])
    ], MdLine);
    return MdLine;
}());
/**
 * Helper that takes a query list of lines and sets the correct class on the host.
 * @docs-private
 */
var MdLineSetter = (function () {
    function MdLineSetter(_lines, _renderer, _element) {
        var _this = this;
        this._lines = _lines;
        this._renderer = _renderer;
        this._element = _element;
        this._setLineClass(this._lines.length);
        this._lines.changes.subscribe(function () {
            _this._setLineClass(_this._lines.length);
        });
    }
    MdLineSetter.prototype._setLineClass = function (count) {
        this._resetClasses();
        if (count === 2 || count === 3) {
            this._setClass("mat-" + count + "-line", true);
        }
        else if (count > 3) {
            this._setClass("mat-multi-line", true);
        }
    };
    MdLineSetter.prototype._resetClasses = function () {
        this._setClass('mat-2-line', false);
        this._setClass('mat-3-line', false);
        this._setClass('mat-multi-line', false);
    };
    MdLineSetter.prototype._setClass = function (className, bool) {
        this._renderer.setElementClass(this._element.nativeElement, className, bool);
    };
    return MdLineSetter;
}());
var MdLineModule = (function () {
    function MdLineModule() {
    }
    MdLineModule = __decorate$1([
        _angular_core.NgModule({
            imports: [CompatibilityModule],
            exports: [MdLine, CompatibilityModule],
            declarations: [MdLine],
        }), 
        __metadata$1('design:paramtypes', [])
    ], MdLineModule);
    return MdLineModule;
}());

var __decorate$3 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$3 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Directive to listen for changes of direction of part of the DOM.
 *
 * Applications should use this directive instead of the native attribute so that Material
 * components can listen on changes of direction.
 */
var Dir = (function () {
    function Dir() {
        /** Layout direction of the element. */
        this._dir = 'ltr';
        /** Event emitted when the direction changes. */
        this.dirChange = new _angular_core.EventEmitter();
    }
    Object.defineProperty(Dir.prototype, "dir", {
        /** @docs-private */
        get: function () {
            return this._dir;
        },
        set: function (v) {
            var old = this._dir;
            this._dir = v;
            if (old != this._dir) {
                this.dirChange.emit();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Dir.prototype, "value", {
        /** Current layout direction of the element. */
        get: function () { return this.dir; },
        set: function (v) { this.dir = v; },
        enumerable: true,
        configurable: true
    });
    __decorate$3([
        _angular_core.Input('dir'), 
        __metadata$3('design:type', String)
    ], Dir.prototype, "_dir", void 0);
    __decorate$3([
        _angular_core.Output(), 
        __metadata$3('design:type', Object)
    ], Dir.prototype, "dirChange", void 0);
    __decorate$3([
        _angular_core.HostBinding('attr.dir'), 
        __metadata$3('design:type', String)
    ], Dir.prototype, "dir", null);
    Dir = __decorate$3([
        _angular_core.Directive({
            selector: '[dir]',
            // TODO(hansl): maybe `$implicit` isn't the best option here, but for now that's the best we got.
            exportAs: '$implicit'
        }), 
        __metadata$3('design:paramtypes', [])
    ], Dir);
    return Dir;
}());
var RtlModule = (function () {
    function RtlModule() {
    }
    /** @deprecated */
    RtlModule.forRoot = function () {
        return {
            ngModule: RtlModule,
            providers: []
        };
    };
    RtlModule = __decorate$3([
        _angular_core.NgModule({
            exports: [Dir],
            declarations: [Dir]
        }), 
        __metadata$3('design:paramtypes', [])
    ], RtlModule);
    return RtlModule;
}());

var __decorate$4 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$4 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Directive that triggers a callback whenever the content of
 * its associated element has changed.
 */
var ObserveContent = (function () {
    function ObserveContent(_elementRef) {
        this._elementRef = _elementRef;
        /** Event emitted for each change in the element's content. */
        this.event = new _angular_core.EventEmitter();
    }
    ObserveContent.prototype.ngAfterContentInit = function () {
        var _this = this;
        this._observer = new MutationObserver(function (mutations) { return mutations.forEach(function () { return _this.event.emit(); }); });
        this._observer.observe(this._elementRef.nativeElement, {
            characterData: true,
            childList: true,
            subtree: true
        });
    };
    ObserveContent.prototype.ngOnDestroy = function () {
        if (this._observer) {
            this._observer.disconnect();
        }
    };
    __decorate$4([
        _angular_core.Output('cdkObserveContent'), 
        __metadata$4('design:type', Object)
    ], ObserveContent.prototype, "event", void 0);
    ObserveContent = __decorate$4([
        _angular_core.Directive({
            selector: '[cdkObserveContent]'
        }), 
        __metadata$4('design:paramtypes', [_angular_core.ElementRef])
    ], ObserveContent);
    return ObserveContent;
}());
var ObserveContentModule = (function () {
    function ObserveContentModule() {
    }
    /** @deprecated */
    ObserveContentModule.forRoot = function () {
        return {
            ngModule: ObserveContentModule,
            providers: []
        };
    };
    ObserveContentModule = __decorate$4([
        _angular_core.NgModule({
            exports: [ObserveContent],
            declarations: [ObserveContent]
        }), 
        __metadata$4('design:paramtypes', [])
    ], ObserveContentModule);
    return ObserveContentModule;
}());

// Due to a bug in the ChromeDriver, Angular 2 keyboard events are not triggered by `sendKeys`
// during E2E tests when using dot notation such as `(keydown.rightArrow)`. To get around this,
// we are temporarily using a single (keydown) handler.
// See: https://github.com/angular/angular/issues/9419
var UP_ARROW = 38;
var DOWN_ARROW = 40;
var RIGHT_ARROW = 39;
var LEFT_ARROW = 37;
var PAGE_UP = 33;
var PAGE_DOWN = 34;
var HOME = 36;
var END = 35;
var ENTER = 13;
var SPACE = 32;
var TAB = 9;
var ESCAPE = 27;
var BACKSPACE = 8;
var DELETE = 46;

(function (KeyCodes) {
    KeyCodes[KeyCodes["UP_ARROW"] = 38] = "UP_ARROW";
    KeyCodes[KeyCodes["DOWN_ARROW"] = 40] = "DOWN_ARROW";
    KeyCodes[KeyCodes["RIGHT_ARROW"] = 39] = "RIGHT_ARROW";
    KeyCodes[KeyCodes["LEFT_ARROW"] = 37] = "LEFT_ARROW";
    KeyCodes[KeyCodes["ENTER"] = 13] = "ENTER";
    KeyCodes[KeyCodes["SPACE"] = 32] = "SPACE";
    KeyCodes[KeyCodes["BACKSPACE"] = 8] = "BACKSPACE";
    KeyCodes[KeyCodes["DELETE"] = 46] = "DELETE";
    KeyCodes[KeyCodes["TAB"] = 9] = "TAB";
    KeyCodes[KeyCodes["ESCAPE"] = 27] = "ESCAPE";
    KeyCodes[KeyCodes["COMMA"] = 188] = "COMMA";
})(exports.KeyCodes || (exports.KeyCodes = {}));

/** Coerces a data-bound value (typically a string) to a boolean. */
function coerceBooleanProperty(value) {
    return value != null && "" + value !== 'false';
}

/** Fade-in duration for the ripples. Can be modified with the speedFactor option. */
var RIPPLE_FADE_IN_DURATION = 450;
/** Fade-out duration for the ripples in milliseconds. This can't be modified by the speedFactor. */
var RIPPLE_FADE_OUT_DURATION = 400;
/**
 * Returns the distance from the point (x, y) to the furthest corner of a rectangle.
 */
var distanceToFurthestCorner = function (x, y, rect) {
    var distX = Math.max(Math.abs(x - rect.left), Math.abs(x - rect.right));
    var distY = Math.max(Math.abs(y - rect.top), Math.abs(y - rect.bottom));
    return Math.sqrt(distX * distX + distY * distY);
};
/**
 * Helper service that performs DOM manipulations. Not intended to be used outside this module.
 * The constructor takes a reference to the ripple directive's host element and a map of DOM
 * event handlers to be installed on the element that triggers ripple animations.
 * This will eventually become a custom renderer once Angular support exists.
 * @docs-private
 */
var RippleRenderer = (function () {
    function RippleRenderer(_elementRef, _ngZone, _ruler) {
        this._ngZone = _ngZone;
        this._ruler = _ruler;
        /** Whether the mouse is currently down or not. */
        this._isMousedown = false;
        /** Currently active ripples that will be closed on mouseup. */
        this._activeRipples = [];
        /** Events to be registered on the trigger element. */
        this._triggerEvents = new Map();
        /** Ripple config for all ripples created by events. */
        this.rippleConfig = {};
        /** Whether mouse ripples should be created or not. */
        this.rippleDisabled = false;
        this._containerElement = _elementRef.nativeElement;
        // Specify events which need to be registered on the trigger.
        this._triggerEvents.set('mousedown', this.onMousedown.bind(this));
        this._triggerEvents.set('mouseup', this.onMouseup.bind(this));
        this._triggerEvents.set('mouseleave', this.onMouseLeave.bind(this));
        // By default use the host element as trigger element.
        this.setTriggerElement(this._containerElement);
    }
    /** Fades in a ripple at the given coordinates. */
    RippleRenderer.prototype.fadeInRipple = function (pageX, pageY, config) {
        var _this = this;
        if (config === void 0) { config = {}; }
        var containerRect = this._containerElement.getBoundingClientRect();
        if (config.centered) {
            pageX = containerRect.left + containerRect.width / 2;
            pageY = containerRect.top + containerRect.height / 2;
        }
        else {
            // Subtract scroll values from the coordinates because calculations below
            // are always relative to the viewport rectangle.
            var scrollPosition = this._ruler.getViewportScrollPosition();
            pageX -= scrollPosition.left;
            pageY -= scrollPosition.top;
        }
        var radius = config.radius || distanceToFurthestCorner(pageX, pageY, containerRect);
        var duration = RIPPLE_FADE_IN_DURATION * (1 / (config.speedFactor || 1));
        var offsetX = pageX - containerRect.left;
        var offsetY = pageY - containerRect.top;
        var ripple = document.createElement('div');
        ripple.classList.add('mat-ripple-element');
        ripple.style.left = (offsetX - radius) + "px";
        ripple.style.top = (offsetY - radius) + "px";
        ripple.style.height = radius * 2 + "px";
        ripple.style.width = radius * 2 + "px";
        // If the color is not set, the default CSS color will be used.
        ripple.style.backgroundColor = config.color;
        ripple.style.transitionDuration = duration + "ms";
        this._containerElement.appendChild(ripple);
        // By default the browser does not recalculate the styles of dynamically created
        // ripple elements. This is critical because then the `scale` would not animate properly.
        this._enforceStyleRecalculation(ripple);
        ripple.style.transform = 'scale(1)';
        // Wait for the ripple to be faded in. Once it's faded in, the ripple can be hidden immediately
        // if the mouse is released.
        this.runTimeoutOutsideZone(function () {
            _this._isMousedown ? _this._activeRipples.push(ripple) : _this.fadeOutRipple(ripple);
        }, duration);
    };
    /** Fades out a ripple element. */
    RippleRenderer.prototype.fadeOutRipple = function (ripple) {
        ripple.style.transitionDuration = RIPPLE_FADE_OUT_DURATION + "ms";
        ripple.style.opacity = '0';
        // Once the ripple faded out, the ripple can be safely removed from the DOM.
        this.runTimeoutOutsideZone(function () {
            ripple.parentNode.removeChild(ripple);
        }, RIPPLE_FADE_OUT_DURATION);
    };
    /** Sets the trigger element and registers the mouse events. */
    RippleRenderer.prototype.setTriggerElement = function (element) {
        var _this = this;
        // Remove all previously register event listeners from the trigger element.
        if (this._triggerElement) {
            this._triggerEvents.forEach(function (fn, type) { return _this._triggerElement.removeEventListener(type, fn); });
        }
        if (element) {
            // If the element is not null, register all event listeners on the trigger element.
            this._ngZone.runOutsideAngular(function () {
                _this._triggerEvents.forEach(function (fn, type) { return element.addEventListener(type, fn); });
            });
        }
        this._triggerElement = element;
    };
    /** Listener being called on mousedown event. */
    RippleRenderer.prototype.onMousedown = function (event) {
        if (!this.rippleDisabled) {
            this._isMousedown = true;
            this.fadeInRipple(event.pageX, event.pageY, this.rippleConfig);
        }
    };
    /** Listener being called on mouseup event. */
    RippleRenderer.prototype.onMouseup = function () {
        var _this = this;
        this._isMousedown = false;
        this._activeRipples.forEach(function (ripple) { return _this.fadeOutRipple(ripple); });
        this._activeRipples = [];
    };
    /** Listener being called on mouseleave event. */
    RippleRenderer.prototype.onMouseLeave = function () {
        if (this._isMousedown) {
            this.onMouseup();
        }
    };
    /** Runs a timeout outside of the Angular zone to avoid triggering the change detection. */
    RippleRenderer.prototype.runTimeoutOutsideZone = function (fn, delay) {
        if (delay === void 0) { delay = 0; }
        this._ngZone.runOutsideAngular(function () { return setTimeout(fn, delay); });
    };
    /** Enforces a style recalculation of a DOM element by computing its styles. */
    // TODO(devversion): Move into global utility function.
    RippleRenderer.prototype._enforceStyleRecalculation = function (element) {
        // Enforce a style recalculation by calling `getComputedStyle` and accessing any property.
        // Calling `getPropertyValue` is important to let optimizers know that this is not a noop.
        // See: https://gist.github.com/paulirish/5d52fb081b3570c81e3a
        window.getComputedStyle(element).getPropertyValue('opacity');
    };
    return RippleRenderer;
}());

var __decorate$8 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$8 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/** Time in ms to throttle the scrolling events by default. */
var DEFAULT_SCROLL_TIME = 20;
/**
 * Service contained all registered Scrollable references and emits an event when any one of the
 * Scrollable references emit a scrolled event.
 */
var ScrollDispatcher = (function () {
    function ScrollDispatcher() {
        var _this = this;
        /** Subject for notifying that a registered scrollable reference element has been scrolled. */
        this._scrolled = new rxjs_Subject.Subject();
        /**
         * Map of all the scrollable references that are registered with the service and their
         * scroll event subscriptions.
         */
        this.scrollableReferences = new Map();
        // By default, notify a scroll event when the document is scrolled or the window is resized.
        rxjs_Observable.Observable.fromEvent(window.document, 'scroll').subscribe(function () { return _this._notify(); });
        rxjs_Observable.Observable.fromEvent(window, 'resize').subscribe(function () { return _this._notify(); });
    }
    /**
     * Registers a Scrollable with the service and listens for its scrolled events. When the
     * scrollable is scrolled, the service emits the event in its scrolled observable.
     * @param scrollable Scrollable instance to be registered.
     */
    ScrollDispatcher.prototype.register = function (scrollable) {
        var _this = this;
        var scrollSubscription = scrollable.elementScrolled().subscribe(function () { return _this._notify(); });
        this.scrollableReferences.set(scrollable, scrollSubscription);
    };
    /**
     * Deregisters a Scrollable reference and unsubscribes from its scroll event observable.
     * @param scrollable Scrollable instance to be deregistered.
     */
    ScrollDispatcher.prototype.deregister = function (scrollable) {
        if (this.scrollableReferences.has(scrollable)) {
            this.scrollableReferences.get(scrollable).unsubscribe();
            this.scrollableReferences.delete(scrollable);
        }
    };
    /**
     * Returns an observable that emits an event whenever any of the registered Scrollable
     * references (or window, document, or body) fire a scrolled event. Can provide a time in ms
     * to override the default "throttle" time.
     */
    ScrollDispatcher.prototype.scrolled = function (auditTimeInMs) {
        if (auditTimeInMs === void 0) { auditTimeInMs = DEFAULT_SCROLL_TIME; }
        // In the case of a 0ms delay, return the observable without auditTime since it does add
        // a perceptible delay in processing overhead.
        if (auditTimeInMs == 0) {
            return this._scrolled.asObservable();
        }
        return this._scrolled.asObservable().auditTime(auditTimeInMs);
    };
    /** Returns all registered Scrollables that contain the provided element. */
    ScrollDispatcher.prototype.getScrollContainers = function (elementRef) {
        var _this = this;
        var scrollingContainers = [];
        this.scrollableReferences.forEach(function (subscription, scrollable) {
            if (_this.scrollableContainsElement(scrollable, elementRef)) {
                scrollingContainers.push(scrollable);
            }
        });
        return scrollingContainers;
    };
    /** Returns true if the element is contained within the provided Scrollable. */
    ScrollDispatcher.prototype.scrollableContainsElement = function (scrollable, elementRef) {
        var element = elementRef.nativeElement;
        var scrollableElement = scrollable.getElementRef().nativeElement;
        // Traverse through the element parents until we reach null, checking if any of the elements
        // are the scrollable's element.
        do {
            if (element == scrollableElement) {
                return true;
            }
        } while (element = element.parentElement);
    };
    /** Sends a notification that a scroll event has been fired. */
    ScrollDispatcher.prototype._notify = function () {
        this._scrolled.next();
    };
    ScrollDispatcher = __decorate$8([
        _angular_core.Injectable(), 
        __metadata$8('design:paramtypes', [])
    ], ScrollDispatcher);
    return ScrollDispatcher;
}());
function SCROLL_DISPATCHER_PROVIDER_FACTORY(parentDispatcher) {
    return parentDispatcher || new ScrollDispatcher();
}
var SCROLL_DISPATCHER_PROVIDER = {
    // If there is already a ScrollDispatcher available, use that. Otherwise, provide a new one.
    provide: ScrollDispatcher,
    deps: [[new _angular_core.Optional(), new _angular_core.SkipSelf(), ScrollDispatcher]],
    useFactory: SCROLL_DISPATCHER_PROVIDER_FACTORY
};

var __decorate$7 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$7 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Simple utility for getting the bounds of the browser viewport.
 * @docs-private
 */
var ViewportRuler = (function () {
    function ViewportRuler(scrollDispatcher) {
        var _this = this;
        // Initially cache the document rectangle.
        this._cacheViewportGeometry();
        // Subscribe to scroll and resize events and update the document rectangle on changes.
        scrollDispatcher.scrolled().subscribe(function () { return _this._cacheViewportGeometry(); });
    }
    /** Gets a ClientRect for the viewport's bounds. */
    ViewportRuler.prototype.getViewportRect = function (documentRect) {
        if (documentRect === void 0) { documentRect = this._documentRect; }
        // Use the document element's bounding rect rather than the window scroll properties
        // (e.g. pageYOffset, scrollY) due to in issue in Chrome and IE where window scroll
        // properties and client coordinates (boundingClientRect, clientX/Y, etc.) are in different
        // conceptual viewports. Under most circumstances these viewports are equivalent, but they
        // can disagree when the page is pinch-zoomed (on devices that support touch).
        // See https://bugs.chromium.org/p/chromium/issues/detail?id=489206#c4
        // We use the documentElement instead of the body because, by default (without a css reset)
        // browsers typically give the document body an 8px margin, which is not included in
        // getBoundingClientRect().
        var scrollPosition = this.getViewportScrollPosition(documentRect);
        var height = window.innerHeight;
        var width = window.innerWidth;
        return {
            top: scrollPosition.top,
            left: scrollPosition.left,
            bottom: scrollPosition.top + height,
            right: scrollPosition.left + width,
            height: height,
            width: width,
        };
    };
    /**
     * Gets the (top, left) scroll position of the viewport.
     * @param documentRect
     */
    ViewportRuler.prototype.getViewportScrollPosition = function (documentRect) {
        if (documentRect === void 0) { documentRect = this._documentRect; }
        // The top-left-corner of the viewport is determined by the scroll position of the document
        // body, normally just (scrollLeft, scrollTop). However, Chrome and Firefox disagree about
        // whether `document.body` or `document.documentElement` is the scrolled element, so reading
        // `scrollTop` and `scrollLeft` is inconsistent. However, using the bounding rect of
        // `document.documentElement` works consistently, where the `top` and `left` values will
        // equal negative the scroll position.
        var top = -documentRect.top || document.body.scrollTop || window.scrollY || 0;
        var left = -documentRect.left || document.body.scrollLeft || window.scrollX || 0;
        return { top: top, left: left };
    };
    /** Caches the latest client rectangle of the document element. */
    ViewportRuler.prototype._cacheViewportGeometry = function () {
        this._documentRect = document.documentElement.getBoundingClientRect();
    };
    ViewportRuler = __decorate$7([
        _angular_core.Injectable(), 
        __metadata$7('design:paramtypes', [ScrollDispatcher])
    ], ViewportRuler);
    return ViewportRuler;
}());
function VIEWPORT_RULER_PROVIDER_FACTORY(parentRuler, scrollDispatcher) {
    return parentRuler || new ViewportRuler(scrollDispatcher);
}
var VIEWPORT_RULER_PROVIDER = {
    // If there is already a ViewportRuler available, use that. Otherwise, provide a new one.
    provide: ViewportRuler,
    deps: [[new _angular_core.Optional(), new _angular_core.SkipSelf(), ViewportRuler], ScrollDispatcher],
    useFactory: VIEWPORT_RULER_PROVIDER_FACTORY
};

var __decorate$6 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$6 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var MdRipple = (function () {
    function MdRipple(elementRef, ngZone, ruler) {
        /**
         * If set, the radius in pixels of foreground ripples when fully expanded. If unset, the radius
         * will be the distance from the center of the ripple to the furthest corner of the host element's
         * bounding rectangle.
         */
        this.radius = 0;
        /**
         * If set, the normal duration of ripple animations is divided by this value. For example,
         * setting it to 0.5 will cause the animations to take twice as long.
         * A changed speedFactor will not modify the fade-out duration of the ripples.
         */
        this.speedFactor = 1;
        this._rippleRenderer = new RippleRenderer(elementRef, ngZone, ruler);
    }
    MdRipple.prototype.ngOnChanges = function (changes) {
        if (changes['trigger'] && this.trigger) {
            this._rippleRenderer.setTriggerElement(this.trigger);
        }
        this._rippleRenderer.rippleDisabled = this.disabled;
        this._rippleRenderer.rippleConfig = this.rippleConfig;
    };
    MdRipple.prototype.ngOnDestroy = function () {
        // Set the trigger element to null to cleanup all listeners.
        this._rippleRenderer.setTriggerElement(null);
    };
    /** Launches a manual ripple at the specified position. */
    MdRipple.prototype.launch = function (pageX, pageY, config) {
        if (config === void 0) { config = this.rippleConfig; }
        this._rippleRenderer.fadeInRipple(pageX, pageY, config);
    };
    Object.defineProperty(MdRipple.prototype, "rippleConfig", {
        /** Ripple configuration from the directive's input values. */
        get: function () {
            return {
                centered: this.centered,
                speedFactor: this.speedFactor,
                radius: this.radius,
                color: this.color
            };
        },
        enumerable: true,
        configurable: true
    });
    __decorate$6([
        _angular_core.Input('mdRippleTrigger'), 
        __metadata$6('design:type', Object)
    ], MdRipple.prototype, "trigger", void 0);
    __decorate$6([
        _angular_core.Input('mdRippleCentered'), 
        __metadata$6('design:type', Boolean)
    ], MdRipple.prototype, "centered", void 0);
    __decorate$6([
        _angular_core.Input('mdRippleDisabled'), 
        __metadata$6('design:type', Boolean)
    ], MdRipple.prototype, "disabled", void 0);
    __decorate$6([
        _angular_core.Input('mdRippleRadius'), 
        __metadata$6('design:type', Number)
    ], MdRipple.prototype, "radius", void 0);
    __decorate$6([
        _angular_core.Input('mdRippleSpeedFactor'), 
        __metadata$6('design:type', Number)
    ], MdRipple.prototype, "speedFactor", void 0);
    __decorate$6([
        _angular_core.Input('mdRippleColor'), 
        __metadata$6('design:type', String)
    ], MdRipple.prototype, "color", void 0);
    __decorate$6([
        _angular_core.Input('mdRippleUnbounded'), 
        __metadata$6('design:type', Boolean)
    ], MdRipple.prototype, "unbounded", void 0);
    MdRipple = __decorate$6([
        _angular_core.Directive({
            selector: '[md-ripple], [mat-ripple]',
            exportAs: 'mdRipple',
            host: {
                '[class.mat-ripple]': 'true',
                '[class.mat-ripple-unbounded]': 'unbounded'
            }
        }), 
        __metadata$6('design:paramtypes', [_angular_core.ElementRef, _angular_core.NgZone, ViewportRuler])
    ], MdRipple);
    return MdRipple;
}());
var MdRippleModule = (function () {
    function MdRippleModule() {
    }
    /** @deprecated */
    MdRippleModule.forRoot = function () {
        return {
            ngModule: MdRippleModule,
            providers: []
        };
    };
    MdRippleModule = __decorate$6([
        _angular_core.NgModule({
            imports: [CompatibilityModule],
            exports: [MdRipple, CompatibilityModule],
            declarations: [MdRipple],
            providers: [VIEWPORT_RULER_PROVIDER, SCROLL_DISPATCHER_PROVIDER],
        }), 
        __metadata$6('design:paramtypes', [])
    ], MdRippleModule);
    return MdRippleModule;
}());

var __decorate$5 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$5 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Option IDs need to be unique across components, so this counter exists outside of
 * the component definition.
 */
var _uniqueIdCounter = 0;
/** Event object emitted by MdOption when selected. */
var MdOptionSelectEvent = (function () {
    function MdOptionSelectEvent(source, isUserInput) {
        if (isUserInput === void 0) { isUserInput = false; }
        this.source = source;
        this.isUserInput = isUserInput;
    }
    return MdOptionSelectEvent;
}());
/**
 * Single option inside of a `<md-select>` element.
 */
var MdOption = (function () {
    function MdOption(_element, _renderer) {
        this._element = _element;
        this._renderer = _renderer;
        this._selected = false;
        this._active = false;
        /** Whether the option is disabled.  */
        this._disabled = false;
        this._id = "md-option-" + _uniqueIdCounter++;
        /** Event emitted when the option is selected. */
        this.onSelect = new _angular_core.EventEmitter();
    }
    Object.defineProperty(MdOption.prototype, "id", {
        /** The unique ID of the option. */
        get: function () { return this._id; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdOption.prototype, "disabled", {
        /** Whether the option is disabled. */
        get: function () { return this._disabled; },
        set: function (value) { this._disabled = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdOption.prototype, "selected", {
        /** Whether or not the option is currently selected. */
        get: function () {
            return this._selected;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdOption.prototype, "active", {
        /**
         * Whether or not the option is currently active and ready to be selected.
         * An active option displays styles as if it is focused, but the
         * focus is actually retained somewhere else. This comes in handy
         * for components like autocomplete where focus must remain on the input.
         */
        get: function () {
            return this._active;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdOption.prototype, "viewValue", {
        /**
         * The displayed value of the option. It is necessary to show the selected option in the
         * select's trigger.
         */
        get: function () {
            // TODO(kara): Add input property alternative for node envs.
            return this._getHostElement().textContent.trim();
        },
        enumerable: true,
        configurable: true
    });
    /** Selects the option. */
    MdOption.prototype.select = function () {
        this._selected = true;
        this.onSelect.emit(new MdOptionSelectEvent(this, false));
    };
    /** Deselects the option. */
    MdOption.prototype.deselect = function () {
        this._selected = false;
    };
    /** Sets focus onto this option. */
    MdOption.prototype.focus = function () {
        this._renderer.invokeElementMethod(this._getHostElement(), 'focus');
    };
    /**
     * This method sets display styles on the option to make it appear
     * active. This is used by the ActiveDescendantKeyManager so key
     * events will display the proper options as active on arrow key events.
     */
    MdOption.prototype.setActiveStyles = function () {
        var _this = this;
        Promise.resolve(null).then(function () { return _this._active = true; });
    };
    /**
     * This method removes display styles on the option that made it appear
     * active. This is used by the ActiveDescendantKeyManager so key
     * events will display the proper options as active on arrow key events.
     */
    MdOption.prototype.setInactiveStyles = function () {
        var _this = this;
        Promise.resolve(null).then(function () { return _this._active = false; });
    };
    /** Ensures the option is selected when activated from the keyboard. */
    MdOption.prototype._handleKeydown = function (event) {
        if (event.keyCode === ENTER || event.keyCode === SPACE) {
            this._selectViaInteraction();
        }
    };
    /**
     * Selects the option while indicating the selection came from the user. Used to
     * determine if the select's view -> model callback should be invoked.
     */
    MdOption.prototype._selectViaInteraction = function () {
        if (!this.disabled) {
            this._selected = true;
            this.onSelect.emit(new MdOptionSelectEvent(this, true));
        }
    };
    /** Returns the correct tabindex for the option depending on disabled state. */
    MdOption.prototype._getTabIndex = function () {
        return this.disabled ? '-1' : '0';
    };
    MdOption.prototype._getHostElement = function () {
        return this._element.nativeElement;
    };
    __decorate$5([
        _angular_core.Input(), 
        __metadata$5('design:type', Object)
    ], MdOption.prototype, "value", void 0);
    __decorate$5([
        _angular_core.Input(), 
        __metadata$5('design:type', Object)
    ], MdOption.prototype, "disabled", null);
    __decorate$5([
        _angular_core.Output(), 
        __metadata$5('design:type', Object)
    ], MdOption.prototype, "onSelect", void 0);
    MdOption = __decorate$5([
        _angular_core.Component({selector: 'md-option, mat-option',
            host: {
                'role': 'option',
                '[attr.tabindex]': '_getTabIndex()',
                '[class.mat-selected]': 'selected',
                '[class.mat-active]': 'active',
                '[id]': 'id',
                '[attr.aria-selected]': 'selected.toString()',
                '[attr.aria-disabled]': 'disabled.toString()',
                '[class.mat-option-disabled]': 'disabled',
                '(click)': '_selectViaInteraction()',
                '(keydown)': '_handleKeydown($event)',
                '[class.mat-option]': 'true',
            },
            template: "<ng-content></ng-content> <div class=\"mat-option-ripple\" *ngIf=\"!disabled\" md-ripple [mdRippleTrigger]=\"_getHostElement()\"> </div> ",
            encapsulation: _angular_core.ViewEncapsulation.None
        }), 
        __metadata$5('design:paramtypes', [_angular_core.ElementRef, _angular_core.Renderer])
    ], MdOption);
    return MdOption;
}());
var MdOptionModule = (function () {
    function MdOptionModule() {
    }
    MdOptionModule.forRoot = function () {
        return {
            ngModule: MdOptionModule,
            providers: []
        };
    };
    MdOptionModule = __decorate$5([
        _angular_core.NgModule({
            imports: [MdRippleModule, _angular_common.CommonModule],
            exports: [MdOption],
            declarations: [MdOption]
        }), 
        __metadata$5('design:paramtypes', [])
    ], MdOptionModule);
    return MdOptionModule;
}());

// TODO(kara): Revisit why error messages are not being properly set.
var __extends$3 = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Wrapper around Error that sets the error message.
 * @docs-private
 */
var MdError = (function (_super) {
    __extends$3(MdError, _super);
    function MdError(value) {
        _super.call(this);
        this.message = value;
    }
    return MdError;
}(Error));

var __extends$2 = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Exception thrown when attempting to attach a null portal to a host.
 * @docs-private
 */
var NullPortalError = (function (_super) {
    __extends$2(NullPortalError, _super);
    function NullPortalError() {
        _super.call(this, 'Must provide a portal to attach');
    }
    return NullPortalError;
}(MdError));
/**
 * Exception thrown when attempting to attach a portal to a host that is already attached.
 * @docs-private
 */
var PortalAlreadyAttachedError = (function (_super) {
    __extends$2(PortalAlreadyAttachedError, _super);
    function PortalAlreadyAttachedError() {
        _super.call(this, 'Host already has a portal attached');
    }
    return PortalAlreadyAttachedError;
}(MdError));
/**
 * Exception thrown when attempting to attach a portal to an already-disposed host.
 * @docs-private
 */
var PortalHostAlreadyDisposedError = (function (_super) {
    __extends$2(PortalHostAlreadyDisposedError, _super);
    function PortalHostAlreadyDisposedError() {
        _super.call(this, 'This PortalHost has already been disposed');
    }
    return PortalHostAlreadyDisposedError;
}(MdError));
/**
 * Exception thrown when attempting to attach an unknown portal type.
 * @docs-private
 */
var UnknownPortalTypeError = (function (_super) {
    __extends$2(UnknownPortalTypeError, _super);
    function UnknownPortalTypeError() {
        _super.call(this, 'Attempting to attach an unknown Portal type. ' +
            'BasePortalHost accepts either a ComponentPortal or a TemplatePortal.');
    }
    return UnknownPortalTypeError;
}(MdError));
/**
 * Exception thrown when attempting to attach a portal to a null host.
 * @docs-private
 */
var NullPortalHostError = (function (_super) {
    __extends$2(NullPortalHostError, _super);
    function NullPortalHostError() {
        _super.call(this, 'Attempting to attach a portal to a null PortalHost');
    }
    return NullPortalHostError;
}(MdError));
/**
 * Exception thrown when attempting to detach a portal that is not attached.
 * @docs-private
 */
var NoPortalAttachedError = (function (_super) {
    __extends$2(NoPortalAttachedError, _super);
    function NoPortalAttachedError() {
        _super.call(this, 'Attempting to detach a portal that is not attached to a host');
    }
    return NoPortalAttachedError;
}(MdError));

var __extends$1 = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * A `Portal` is something that you want to render somewhere else.
 * It can be attach to / detached from a `PortalHost`.
 */
var Portal = (function () {
    function Portal() {
    }
    /** Attach this portal to a host. */
    Portal.prototype.attach = function (host) {
        if (host == null) {
            throw new NullPortalHostError();
        }
        if (host.hasAttached()) {
            throw new PortalAlreadyAttachedError();
        }
        this._attachedHost = host;
        return host.attach(this);
    };
    /** Detach this portal from its host */
    Portal.prototype.detach = function () {
        var host = this._attachedHost;
        if (host == null) {
            throw new NoPortalAttachedError();
        }
        this._attachedHost = null;
        return host.detach();
    };
    Object.defineProperty(Portal.prototype, "isAttached", {
        /** Whether this portal is attached to a host. */
        get: function () {
            return this._attachedHost != null;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Sets the PortalHost reference without performing `attach()`. This is used directly by
     * the PortalHost when it is performing an `attach()` or `detach()`.
     */
    Portal.prototype.setAttachedHost = function (host) {
        this._attachedHost = host;
    };
    return Portal;
}());
/**
 * A `ComponentPortal` is a portal that instantiates some Component upon attachment.
 */
var ComponentPortal = (function (_super) {
    __extends$1(ComponentPortal, _super);
    function ComponentPortal(component, viewContainerRef, injector) {
        if (viewContainerRef === void 0) { viewContainerRef = null; }
        if (injector === void 0) { injector = null; }
        _super.call(this);
        this.component = component;
        this.viewContainerRef = viewContainerRef;
        this.injector = injector;
    }
    return ComponentPortal;
}(Portal));
/**
 * A `TemplatePortal` is a portal that represents some embedded template (TemplateRef).
 */
var TemplatePortal = (function (_super) {
    __extends$1(TemplatePortal, _super);
    function TemplatePortal(template, viewContainerRef) {
        _super.call(this);
        /**
         * Additional locals for the instantiated embedded view.
         * These locals can be seen as "exports" for the template, such as how ngFor has
         * index / event / odd.
         * See https://angular.io/docs/ts/latest/api/core/EmbeddedViewRef-class.html
         */
        this.locals = new Map();
        this.templateRef = template;
        this.viewContainerRef = viewContainerRef;
    }
    Object.defineProperty(TemplatePortal.prototype, "origin", {
        get: function () {
            return this.templateRef.elementRef;
        },
        enumerable: true,
        configurable: true
    });
    TemplatePortal.prototype.attach = function (host, locals) {
        this.locals = locals == null ? new Map() : locals;
        return _super.prototype.attach.call(this, host);
    };
    TemplatePortal.prototype.detach = function () {
        this.locals = new Map();
        return _super.prototype.detach.call(this);
    };
    return TemplatePortal;
}(Portal));
/**
 * Partial implementation of PortalHost that only deals with attaching either a
 * ComponentPortal or a TemplatePortal.
 */
var BasePortalHost = (function () {
    function BasePortalHost() {
        /** Whether this host has already been permanently disposed. */
        this._isDisposed = false;
    }
    /** Whether this host has an attached portal. */
    BasePortalHost.prototype.hasAttached = function () {
        return this._attachedPortal != null;
    };
    BasePortalHost.prototype.attach = function (portal) {
        if (portal == null) {
            throw new NullPortalError();
        }
        if (this.hasAttached()) {
            throw new PortalAlreadyAttachedError();
        }
        if (this._isDisposed) {
            throw new PortalHostAlreadyDisposedError();
        }
        if (portal instanceof ComponentPortal) {
            this._attachedPortal = portal;
            return this.attachComponentPortal(portal);
        }
        else if (portal instanceof TemplatePortal) {
            this._attachedPortal = portal;
            return this.attachTemplatePortal(portal);
        }
        throw new UnknownPortalTypeError();
    };
    BasePortalHost.prototype.detach = function () {
        if (this._attachedPortal) {
            this._attachedPortal.setAttachedHost(null);
        }
        this._attachedPortal = null;
        if (this._disposeFn != null) {
            this._disposeFn();
            this._disposeFn = null;
        }
    };
    BasePortalHost.prototype.dispose = function () {
        if (this.hasAttached()) {
            this.detach();
        }
        this._isDisposed = true;
    };
    BasePortalHost.prototype.setDisposeFn = function (fn) {
        this._disposeFn = fn;
    };
    return BasePortalHost;
}());

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate$9 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$9 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Directive version of a `TemplatePortal`. Because the directive *is* a TemplatePortal,
 * the directive instance itself can be attached to a host, enabling declarative use of portals.
 *
 * Usage:
 * <template portal #greeting>
 *   <p> Hello {{name}} </p>
 * </template>
 */
var TemplatePortalDirective = (function (_super) {
    __extends(TemplatePortalDirective, _super);
    function TemplatePortalDirective(templateRef, viewContainerRef) {
        _super.call(this, templateRef, viewContainerRef);
    }
    TemplatePortalDirective = __decorate$9([
        _angular_core.Directive({
            selector: '[cdk-portal], [portal]',
            exportAs: 'cdkPortal',
        }), 
        __metadata$9('design:paramtypes', [_angular_core.TemplateRef, _angular_core.ViewContainerRef])
    ], TemplatePortalDirective);
    return TemplatePortalDirective;
}(TemplatePortal));
/**
 * Directive version of a PortalHost. Because the directive *is* a PortalHost, portals can be
 * directly attached to it, enabling declarative use.
 *
 * Usage:
 * <template [cdkPortalHost]="greeting"></template>
 */
var PortalHostDirective = (function (_super) {
    __extends(PortalHostDirective, _super);
    function PortalHostDirective(_componentFactoryResolver, _viewContainerRef) {
        _super.call(this);
        this._componentFactoryResolver = _componentFactoryResolver;
        this._viewContainerRef = _viewContainerRef;
    }
    Object.defineProperty(PortalHostDirective.prototype, "_deprecatedPortal", {
        /** @deprecated */
        get: function () { return this.portal; },
        set: function (v) { this.portal = v; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PortalHostDirective.prototype, "portal", {
        /** Portal associated with the Portal host. */
        get: function () {
            return this._portal;
        },
        set: function (p) {
            if (p) {
                this._replaceAttachedPortal(p);
            }
        },
        enumerable: true,
        configurable: true
    });
    PortalHostDirective.prototype.ngOnDestroy = function () {
        this.dispose();
    };
    /**
     * Attach the given ComponentPortal to this PortalHost using the ComponentFactoryResolver.
     *
     * @param portal Portal to be attached to the portal host.
     */
    PortalHostDirective.prototype.attachComponentPortal = function (portal) {
        portal.setAttachedHost(this);
        // If the portal specifies an origin, use that as the logical location of the component
        // in the application tree. Otherwise use the location of this PortalHost.
        var viewContainerRef = portal.viewContainerRef != null ?
            portal.viewContainerRef :
            this._viewContainerRef;
        var componentFactory = this._componentFactoryResolver.resolveComponentFactory(portal.component);
        var ref = viewContainerRef.createComponent(componentFactory, viewContainerRef.length, portal.injector || viewContainerRef.parentInjector);
        this.setDisposeFn(function () { return ref.destroy(); });
        return ref;
    };
    /**
     * Attach the given TemplatePortal to this PortlHost as an embedded View.
     * @param portal Portal to be attached.
     */
    PortalHostDirective.prototype.attachTemplatePortal = function (portal) {
        var _this = this;
        portal.setAttachedHost(this);
        this._viewContainerRef.createEmbeddedView(portal.templateRef);
        this.setDisposeFn(function () { return _this._viewContainerRef.clear(); });
        // TODO(jelbourn): return locals from view
        return new Map();
    };
    /** Detaches the currently attached Portal (if there is one) and attaches the given Portal. */
    PortalHostDirective.prototype._replaceAttachedPortal = function (p) {
        if (this.hasAttached()) {
            this.detach();
        }
        if (p) {
            this.attach(p);
            this._portal = p;
        }
    };
    __decorate$9([
        _angular_core.Input('portalHost'), 
        __metadata$9('design:type', Object)
    ], PortalHostDirective.prototype, "_deprecatedPortal", null);
    PortalHostDirective = __decorate$9([
        _angular_core.Directive({
            selector: '[cdkPortalHost], [portalHost]',
            inputs: ['portal: cdkPortalHost']
        }), 
        __metadata$9('design:paramtypes', [_angular_core.ComponentFactoryResolver, _angular_core.ViewContainerRef])
    ], PortalHostDirective);
    return PortalHostDirective;
}(BasePortalHost));
var PortalModule = (function () {
    function PortalModule() {
    }
    /** @deprecated */
    PortalModule.forRoot = function () {
        return {
            ngModule: PortalModule,
            providers: []
        };
    };
    PortalModule = __decorate$9([
        _angular_core.NgModule({
            exports: [TemplatePortalDirective, PortalHostDirective],
            declarations: [TemplatePortalDirective, PortalHostDirective],
        }), 
        __metadata$9('design:paramtypes', [])
    ], PortalModule);
    return PortalModule;
}());

/**
 * OverlayState is a bag of values for either the initial configuration or current state of an
 * overlay.
 */
var OverlayState = (function () {
    function OverlayState() {
        /** Whether the overlay has a backdrop. */
        this.hasBackdrop = false;
        /** Custom class to add to the backdrop **/
        this.backdropClass = 'cdk-overlay-dark-backdrop';
        /** The direction of the text in the overlay panel. */
        this.direction = 'ltr';
    }
    return OverlayState;
}());

var __extends$4 = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * A PortalHost for attaching portals to an arbitrary DOM element outside of the Angular
 * application context.
 *
 * This is the only part of the portal core that directly touches the DOM.
 */
var DomPortalHost = (function (_super) {
    __extends$4(DomPortalHost, _super);
    function DomPortalHost(_hostDomElement, _componentFactoryResolver, _appRef, _defaultInjector) {
        _super.call(this);
        this._hostDomElement = _hostDomElement;
        this._componentFactoryResolver = _componentFactoryResolver;
        this._appRef = _appRef;
        this._defaultInjector = _defaultInjector;
    }
    /**
     * Attach the given ComponentPortal to DOM element using the ComponentFactoryResolver.
     * @param portal Portal to be attached
     */
    DomPortalHost.prototype.attachComponentPortal = function (portal) {
        var _this = this;
        var componentFactory = this._componentFactoryResolver.resolveComponentFactory(portal.component);
        var componentRef;
        // If the portal specifies a ViewContainerRef, we will use that as the attachment point
        // for the component (in terms of Angular's component tree, not rendering).
        // When the ViewContainerRef is missing, we use the factory to create the component directly
        // and then manually attach the view to the application.
        if (portal.viewContainerRef) {
            componentRef = portal.viewContainerRef.createComponent(componentFactory, portal.viewContainerRef.length, portal.injector || portal.viewContainerRef.parentInjector);
            this.setDisposeFn(function () { return componentRef.destroy(); });
        }
        else {
            componentRef = componentFactory.create(portal.injector || this._defaultInjector);
            this._appRef.attachView(componentRef.hostView);
            this.setDisposeFn(function () {
                _this._appRef.detachView(componentRef.hostView);
                componentRef.destroy();
            });
        }
        // At this point the component has been instantiated, so we move it to the location in the DOM
        // where we want it to be rendered.
        this._hostDomElement.appendChild(this._getComponentRootNode(componentRef));
        return componentRef;
    };
    /**
     * Attaches a template portal to the DOM as an embedded view.
     * @param portal Portal to be attached.
     */
    DomPortalHost.prototype.attachTemplatePortal = function (portal) {
        var _this = this;
        var viewContainer = portal.viewContainerRef;
        var viewRef = viewContainer.createEmbeddedView(portal.templateRef);
        // The method `createEmbeddedView` will add the view as a child of the viewContainer.
        // But for the DomPortalHost the view can be added everywhere in the DOM (e.g Overlay Container)
        // To move the view to the specified host element. We just re-append the existing root nodes.
        viewRef.rootNodes.forEach(function (rootNode) { return _this._hostDomElement.appendChild(rootNode); });
        this.setDisposeFn((function () {
            var index = viewContainer.indexOf(viewRef);
            if (index !== -1) {
                viewContainer.remove(index);
            }
        }));
        // TODO(jelbourn): Return locals from view.
        return new Map();
    };
    /**
     * Clears out a portal from the DOM.
     */
    DomPortalHost.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        if (this._hostDomElement.parentNode != null) {
            this._hostDomElement.parentNode.removeChild(this._hostDomElement);
        }
    };
    /** Gets the root HTMLElement for an instantiated component. */
    DomPortalHost.prototype._getComponentRootNode = function (componentRef) {
        return componentRef.hostView.rootNodes[0];
    };
    return DomPortalHost;
}(BasePortalHost));

/**
 * Reference to an overlay that has been created with the Overlay service.
 * Used to manipulate or dispose of said overlay.
 */
var OverlayRef = (function () {
    function OverlayRef(_portalHost, _pane, _state, _ngZone) {
        this._portalHost = _portalHost;
        this._pane = _pane;
        this._state = _state;
        this._ngZone = _ngZone;
        this._backdropElement = null;
        this._backdropClick = new rxjs_Subject.Subject();
    }
    Object.defineProperty(OverlayRef.prototype, "overlayElement", {
        /** The overlay's HTML element */
        get: function () {
            return this._pane;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Attaches the overlay to a portal instance and adds the backdrop.
     * @param portal Portal instance to which to attach the overlay.
     * @returns The portal attachment result.
     */
    OverlayRef.prototype.attach = function (portal) {
        if (this._state.hasBackdrop) {
            this._attachBackdrop();
        }
        var attachResult = this._portalHost.attach(portal);
        // Update the pane element with the given state configuration.
        this.updateSize();
        this.updateDirection();
        this.updatePosition();
        // Enable pointer events for the overlay pane element.
        this._togglePointerEvents(true);
        return attachResult;
    };
    /**
     * Detaches an overlay from a portal.
     * @returns Resolves when the overlay has been detached.
     */
    OverlayRef.prototype.detach = function () {
        this.detachBackdrop();
        // When the overlay is detached, the pane element should disable pointer events.
        // This is necessary because otherwise the pane element will cover the page and disable
        // pointer events therefore. Depends on the position strategy and the applied pane boundaries.
        this._togglePointerEvents(false);
        return this._portalHost.detach();
    };
    /**
     * Cleans up the overlay from the DOM.
     */
    OverlayRef.prototype.dispose = function () {
        if (this._state.positionStrategy) {
            this._state.positionStrategy.dispose();
        }
        this.detachBackdrop();
        this._portalHost.dispose();
    };
    /**
     * Checks whether the overlay has been attached.
     */
    OverlayRef.prototype.hasAttached = function () {
        return this._portalHost.hasAttached();
    };
    /**
     * Returns an observable that emits when the backdrop has been clicked.
     */
    OverlayRef.prototype.backdropClick = function () {
        return this._backdropClick.asObservable();
    };
    /**
     * Gets the current state config of the overlay.
     */
    OverlayRef.prototype.getState = function () {
        return this._state;
    };
    /** Updates the position of the overlay based on the position strategy. */
    OverlayRef.prototype.updatePosition = function () {
        if (this._state.positionStrategy) {
            this._state.positionStrategy.apply(this._pane);
        }
    };
    /** Updates the text direction of the overlay panel. **/
    OverlayRef.prototype.updateDirection = function () {
        this._pane.setAttribute('dir', this._state.direction);
    };
    /** Updates the size of the overlay based on the overlay config. */
    OverlayRef.prototype.updateSize = function () {
        if (this._state.width || this._state.width === 0) {
            this._pane.style.width = formatCssUnit(this._state.width);
        }
        if (this._state.height || this._state.height === 0) {
            this._pane.style.height = formatCssUnit(this._state.height);
        }
        if (this._state.minWidth || this._state.minWidth === 0) {
            this._pane.style.minWidth = formatCssUnit(this._state.minWidth);
        }
        if (this._state.minHeight || this._state.minHeight === 0) {
            this._pane.style.minHeight = formatCssUnit(this._state.minHeight);
        }
    };
    /** Toggles the pointer events for the overlay pane element. */
    OverlayRef.prototype._togglePointerEvents = function (enablePointer) {
        this._pane.style.pointerEvents = enablePointer ? 'auto' : 'none';
    };
    /** Attaches a backdrop for this overlay. */
    OverlayRef.prototype._attachBackdrop = function () {
        var _this = this;
        this._backdropElement = document.createElement('div');
        this._backdropElement.classList.add('cdk-overlay-backdrop');
        this._backdropElement.classList.add(this._state.backdropClass);
        // Insert the backdrop before the pane in the DOM order,
        // in order to handle stacked overlays properly.
        this._pane.parentElement.insertBefore(this._backdropElement, this._pane);
        // Forward backdrop clicks such that the consumer of the overlay can perform whatever
        // action desired when such a click occurs (usually closing the overlay).
        this._backdropElement.addEventListener('click', function () { return _this._backdropClick.next(null); });
        // Add class to fade-in the backdrop after one frame.
        requestAnimationFrame(function () {
            if (_this._backdropElement) {
                _this._backdropElement.classList.add('cdk-overlay-backdrop-showing');
            }
        });
    };
    /** Detaches the backdrop (if any) associated with the overlay. */
    OverlayRef.prototype.detachBackdrop = function () {
        var _this = this;
        var backdropToDetach = this._backdropElement;
        if (backdropToDetach) {
            var finishDetach_1 = function () {
                // It may not be attached to anything in certain cases (e.g. unit tests).
                if (backdropToDetach && backdropToDetach.parentNode) {
                    backdropToDetach.parentNode.removeChild(backdropToDetach);
                }
                // It is possible that a new portal has been attached to this overlay since we started
                // removing the backdrop. If that is the case, only clear the backdrop reference if it
                // is still the same instance that we started to remove.
                if (_this._backdropElement == backdropToDetach) {
                    _this._backdropElement = null;
                }
            };
            backdropToDetach.classList.remove('cdk-overlay-backdrop-showing');
            backdropToDetach.classList.remove(this._state.backdropClass);
            backdropToDetach.addEventListener('transitionend', finishDetach_1);
            // If the backdrop doesn't have a transition, the `transitionend` event won't fire.
            // In this case we make it unclickable and we try to remove it after a delay.
            backdropToDetach.style.pointerEvents = 'none';
            // Run this outside the Angular zone because there's nothing that Angular cares about.
            // If it were to run inside the Angular zone, every test that used Overlay would have to be
            // either async or fakeAsync.
            this._ngZone.runOutsideAngular(function () {
                setTimeout(finishDetach_1, 500);
            });
        }
    };
    return OverlayRef;
}());
function formatCssUnit(value) {
    return typeof value === 'string' ? value : value + "px";
}

var __decorate$13 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$13 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param$2 = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
/** The points of the origin element and the overlay element to connect. */
var ConnectionPositionPair = (function () {
    function ConnectionPositionPair(origin, overlay) {
        this.originX = origin.originX;
        this.originY = origin.originY;
        this.overlayX = overlay.overlayX;
        this.overlayY = overlay.overlayY;
    }
    return ConnectionPositionPair;
}());
/**
 * Set of properties regarding the position of the origin and overlay relative to the viewport
 * with respect to the containing Scrollable elements.
 *
 * The overlay and origin are clipped if any part of their bounding client rectangle exceeds the
 * bounds of any one of the strategy's Scrollable's bounding client rectangle.
 *
 * The overlay and origin are outside view if there is no overlap between their bounding client
 * rectangle and any one of the strategy's Scrollable's bounding client rectangle.
 *
 *       -----------                    -----------
 *       | outside |                    | clipped |
 *       |  view   |              --------------------------
 *       |         |              |     |         |        |
 *       ----------               |     -----------        |
 *  --------------------------    |                        |
 *  |                        |    |      Scrollable        |
 *  |                        |    |                        |
 *  |                        |     --------------------------
 *  |      Scrollable        |
 *  |                        |
 *  --------------------------
 */
var ScrollableViewProperties = (function () {
    function ScrollableViewProperties() {
    }
    return ScrollableViewProperties;
}());
/** The change event emitted by the strategy when a fallback position is used. */
var ConnectedOverlayPositionChange = (function () {
    function ConnectedOverlayPositionChange(connectionPair, scrollableViewProperties) {
        this.connectionPair = connectionPair;
        this.scrollableViewProperties = scrollableViewProperties;
    }
    ConnectedOverlayPositionChange = __decorate$13([
        __param$2(1, _angular_core.Optional()), 
        __metadata$13('design:paramtypes', [ConnectionPositionPair, ScrollableViewProperties])
    ], ConnectedOverlayPositionChange);
    return ConnectedOverlayPositionChange;
}());

/**
 * A strategy for positioning overlays. Using this strategy, an overlay is given an
 * implicit position relative some origin element. The relative position is defined in terms of
 * a point on the origin element that is connected to a point on the overlay element. For example,
 * a basic dropdown is connecting the bottom-left corner of the origin to the top-left corner
 * of the overlay.
 */
var ConnectedPositionStrategy = (function () {
    function ConnectedPositionStrategy(_connectedTo, _originPos, _overlayPos, _viewportRuler) {
        this._connectedTo = _connectedTo;
        this._originPos = _originPos;
        this._overlayPos = _overlayPos;
        this._viewportRuler = _viewportRuler;
        this._dir = 'ltr';
        /** The offset in pixels for the overlay connection point on the x-axis */
        this._offsetX = 0;
        /** The offset in pixels for the overlay connection point on the y-axis */
        this._offsetY = 0;
        /** The Scrollable containers used to check scrollable view properties on position change. */
        this.scrollables = [];
        /** Ordered list of preferred positions, from most to least desirable. */
        this._preferredPositions = [];
        this._onPositionChange = new rxjs_Subject.Subject();
        this._origin = this._connectedTo.nativeElement;
        this.withFallbackPosition(_originPos, _overlayPos);
    }
    Object.defineProperty(ConnectedPositionStrategy.prototype, "_isRtl", {
        /** Whether the we're dealing with an RTL context */
        get: function () {
            return this._dir === 'rtl';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConnectedPositionStrategy.prototype, "onPositionChange", {
        /** Emits an event when the connection point changes. */
        get: function () {
            return this._onPositionChange.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConnectedPositionStrategy.prototype, "positions", {
        /** Ordered list of preferred positions, from most to least desirable. */
        get: function () {
            return this._preferredPositions;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * To be used to for any cleanup after the element gets destroyed.
     */
    ConnectedPositionStrategy.prototype.dispose = function () { };
    /**
     * Updates the position of the overlay element, using whichever preferred position relative
     * to the origin fits on-screen.
     * @docs-private
     *
     * @param element Element to which to apply the CSS styles.
     * @returns Resolves when the styles have been applied.
     */
    ConnectedPositionStrategy.prototype.apply = function (element) {
        // Cache the overlay pane element in case re-calculating position is necessary
        this._pane = element;
        // We need the bounding rects for the origin and the overlay to determine how to position
        // the overlay relative to the origin.
        var originRect = this._origin.getBoundingClientRect();
        var overlayRect = element.getBoundingClientRect();
        // We use the viewport rect to determine whether a position would go off-screen.
        var viewportRect = this._viewportRuler.getViewportRect();
        // Fallback point if none of the fallbacks fit into the viewport.
        var fallbackPoint = null;
        // We want to place the overlay in the first of the preferred positions such that the
        // overlay fits on-screen.
        for (var _i = 0, _a = this._preferredPositions; _i < _a.length; _i++) {
            var pos = _a[_i];
            // Get the (x, y) point of connection on the origin, and then use that to get the
            // (top, left) coordinate for the overlay at `pos`.
            var originPoint = this._getOriginConnectionPoint(originRect, pos);
            var overlayPoint = this._getOverlayPoint(originPoint, overlayRect, viewportRect, pos);
            // If the overlay in the calculated position fits on-screen, put it there and we're done.
            if (overlayPoint.fitsInViewport) {
                this._setElementPosition(element, overlayPoint);
                // Save the last connected position in case the position needs to be re-calculated.
                this._lastConnectedPosition = pos;
                // Notify that the position has been changed along with its change properties.
                var scrollableViewProperties = this.getScrollableViewProperties(element);
                var positionChange = new ConnectedOverlayPositionChange(pos, scrollableViewProperties);
                this._onPositionChange.next(positionChange);
                return Promise.resolve(null);
            }
            else if (!fallbackPoint || fallbackPoint.visibleArea < overlayPoint.visibleArea) {
                fallbackPoint = overlayPoint;
            }
        }
        // If none of the preferred positions were in the viewport, take the one
        // with the largest visible area.
        this._setElementPosition(element, fallbackPoint);
        return Promise.resolve(null);
    };
    /**
     * This re-aligns the overlay element with the trigger in its last calculated position,
     * even if a position higher in the "preferred positions" list would now fit. This
     * allows one to re-align the panel without changing the orientation of the panel.
     */
    ConnectedPositionStrategy.prototype.recalculateLastPosition = function () {
        var originRect = this._origin.getBoundingClientRect();
        var overlayRect = this._pane.getBoundingClientRect();
        var viewportRect = this._viewportRuler.getViewportRect();
        var lastPosition = this._lastConnectedPosition || this._preferredPositions[0];
        var originPoint = this._getOriginConnectionPoint(originRect, lastPosition);
        var overlayPoint = this._getOverlayPoint(originPoint, overlayRect, viewportRect, lastPosition);
        this._setElementPosition(this._pane, overlayPoint);
    };
    /**
     * Sets the list of Scrollable containers that host the origin element so that
     * on reposition we can evaluate if it or the overlay has been clipped or outside view. Every
     * Scrollable must be an ancestor element of the strategy's origin element.
     */
    ConnectedPositionStrategy.prototype.withScrollableContainers = function (scrollables) {
        this.scrollables = scrollables;
    };
    /**
     * Adds a new preferred fallback position.
     * @param originPos
     * @param overlayPos
     */
    ConnectedPositionStrategy.prototype.withFallbackPosition = function (originPos, overlayPos) {
        this._preferredPositions.push(new ConnectionPositionPair(originPos, overlayPos));
        return this;
    };
    /**
     * Sets the layout direction so the overlay's position can be adjusted to match.
     * @param dir New layout direction.
     */
    ConnectedPositionStrategy.prototype.withDirection = function (dir) {
        this._dir = dir;
        return this;
    };
    /**
     * Sets an offset for the overlay's connection point on the x-axis
     * @param offset New offset in the X axis.
     */
    ConnectedPositionStrategy.prototype.withOffsetX = function (offset) {
        this._offsetX = offset;
        return this;
    };
    /**
     * Sets an offset for the overlay's connection point on the y-axis
     * @param  offset New offset in the Y axis.
     */
    ConnectedPositionStrategy.prototype.withOffsetY = function (offset) {
        this._offsetY = offset;
        return this;
    };
    /**
     * Gets the horizontal (x) "start" dimension based on whether the overlay is in an RTL context.
     * @param rect
     */
    ConnectedPositionStrategy.prototype._getStartX = function (rect) {
        return this._isRtl ? rect.right : rect.left;
    };
    /**
     * Gets the horizontal (x) "end" dimension based on whether the overlay is in an RTL context.
     * @param rect
     */
    ConnectedPositionStrategy.prototype._getEndX = function (rect) {
        return this._isRtl ? rect.left : rect.right;
    };
    /**
     * Gets the (x, y) coordinate of a connection point on the origin based on a relative position.
     * @param originRect
     * @param pos
     */
    ConnectedPositionStrategy.prototype._getOriginConnectionPoint = function (originRect, pos) {
        var originStartX = this._getStartX(originRect);
        var originEndX = this._getEndX(originRect);
        var x;
        if (pos.originX == 'center') {
            x = originStartX + (originRect.width / 2);
        }
        else {
            x = pos.originX == 'start' ? originStartX : originEndX;
        }
        var y;
        if (pos.originY == 'center') {
            y = originRect.top + (originRect.height / 2);
        }
        else {
            y = pos.originY == 'top' ? originRect.top : originRect.bottom;
        }
        return { x: x, y: y };
    };
    /**
     * Gets the (x, y) coordinate of the top-left corner of the overlay given a given position and
     * origin point to which the overlay should be connected, as well as how much of the element
     * would be inside the viewport at that position.
     */
    ConnectedPositionStrategy.prototype._getOverlayPoint = function (originPoint, overlayRect, viewportRect, pos) {
        // Calculate the (overlayStartX, overlayStartY), the start of the potential overlay position
        // relative to the origin point.
        var overlayStartX;
        if (pos.overlayX == 'center') {
            overlayStartX = -overlayRect.width / 2;
        }
        else if (pos.overlayX === 'start') {
            overlayStartX = this._isRtl ? -overlayRect.width : 0;
        }
        else {
            overlayStartX = this._isRtl ? 0 : -overlayRect.width;
        }
        var overlayStartY;
        if (pos.overlayY == 'center') {
            overlayStartY = -overlayRect.height / 2;
        }
        else {
            overlayStartY = pos.overlayY == 'top' ? 0 : -overlayRect.height;
        }
        // The (x, y) coordinates of the overlay.
        var x = originPoint.x + overlayStartX + this._offsetX;
        var y = originPoint.y + overlayStartY + this._offsetY;
        // How much the overlay would overflow at this position, on each side.
        var leftOverflow = 0 - x;
        var rightOverflow = (x + overlayRect.width) - viewportRect.width;
        var topOverflow = 0 - y;
        var bottomOverflow = (y + overlayRect.height) - viewportRect.height;
        // Visible parts of the element on each axis.
        var visibleWidth = this._subtractOverflows(overlayRect.width, leftOverflow, rightOverflow);
        var visibleHeight = this._subtractOverflows(overlayRect.height, topOverflow, bottomOverflow);
        // The area of the element that's within the viewport.
        var visibleArea = visibleWidth * visibleHeight;
        var fitsInViewport = (overlayRect.width * overlayRect.height) === visibleArea;
        return { x: x, y: y, fitsInViewport: fitsInViewport, visibleArea: visibleArea };
    };
    /**
     * Gets the view properties of the trigger and overlay, including whether they are clipped
     * or completely outside the view of any of the strategy's scrollables.
     */
    ConnectedPositionStrategy.prototype.getScrollableViewProperties = function (overlay) {
        var _this = this;
        var originBounds = this._getElementBounds(this._origin);
        var overlayBounds = this._getElementBounds(overlay);
        var scrollContainerBounds = this.scrollables.map(function (scrollable) {
            return _this._getElementBounds(scrollable.getElementRef().nativeElement);
        });
        return {
            isOriginClipped: this.isElementClipped(originBounds, scrollContainerBounds),
            isOriginOutsideView: this.isElementOutsideView(originBounds, scrollContainerBounds),
            isOverlayClipped: this.isElementClipped(overlayBounds, scrollContainerBounds),
            isOverlayOutsideView: this.isElementOutsideView(overlayBounds, scrollContainerBounds),
        };
    };
    /** Whether the element is completely out of the view of any of the containers. */
    ConnectedPositionStrategy.prototype.isElementOutsideView = function (elementBounds, containersBounds) {
        return containersBounds.some(function (containerBounds) {
            var outsideAbove = elementBounds.bottom < containerBounds.top;
            var outsideBelow = elementBounds.top > containerBounds.bottom;
            var outsideLeft = elementBounds.right < containerBounds.left;
            var outsideRight = elementBounds.left > containerBounds.right;
            return outsideAbove || outsideBelow || outsideLeft || outsideRight;
        });
    };
    /** Whether the element is clipped by any of the containers. */
    ConnectedPositionStrategy.prototype.isElementClipped = function (elementBounds, containersBounds) {
        return containersBounds.some(function (containerBounds) {
            var clippedAbove = elementBounds.top < containerBounds.top;
            var clippedBelow = elementBounds.bottom > containerBounds.bottom;
            var clippedLeft = elementBounds.left < containerBounds.left;
            var clippedRight = elementBounds.right > containerBounds.right;
            return clippedAbove || clippedBelow || clippedLeft || clippedRight;
        });
    };
    /**
     * Physically positions the overlay element to the given coordinate.
     * @param element
     * @param overlayPoint
     */
    ConnectedPositionStrategy.prototype._setElementPosition = function (element, overlayPoint) {
        element.style.left = overlayPoint.x + 'px';
        element.style.top = overlayPoint.y + 'px';
    };
    /** Returns the bounding positions of the provided element with respect to the viewport. */
    ConnectedPositionStrategy.prototype._getElementBounds = function (element) {
        var boundingClientRect = element.getBoundingClientRect();
        return {
            top: boundingClientRect.top,
            right: boundingClientRect.left + boundingClientRect.width,
            bottom: boundingClientRect.top + boundingClientRect.height,
            left: boundingClientRect.left
        };
    };
    /**
     * Subtracts the amount that an element is overflowing on an axis from it's length.
     */
    ConnectedPositionStrategy.prototype._subtractOverflows = function (length) {
        var overflows = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            overflows[_i - 1] = arguments[_i];
        }
        return overflows.reduce(function (currentValue, currentOverflow) {
            return currentValue - Math.max(currentOverflow, 0);
        }, length);
    };
    return ConnectedPositionStrategy;
}());

/**
 * A strategy for positioning overlays. Using this strategy, an overlay is given an
 * explicit position relative to the browser's viewport. We use flexbox, instead of
 * transforms, in order to avoid issues with subpixel rendering which can cause the
 * element to become blurry.
 */
var GlobalPositionStrategy = (function () {
    function GlobalPositionStrategy() {
        this._cssPosition = 'static';
        this._topOffset = '';
        this._bottomOffset = '';
        this._leftOffset = '';
        this._rightOffset = '';
        this._alignItems = '';
        this._justifyContent = '';
        this._width = '';
        this._height = '';
    }
    /**
     * Sets the top position of the overlay. Clears any previously set vertical position.
     * @param value New top offset.
     */
    GlobalPositionStrategy.prototype.top = function (value) {
        this._bottomOffset = '';
        this._topOffset = value;
        this._alignItems = 'flex-start';
        return this;
    };
    /**
     * Sets the left position of the overlay. Clears any previously set horizontal position.
     * @param value New left offset.
     */
    GlobalPositionStrategy.prototype.left = function (value) {
        this._rightOffset = '';
        this._leftOffset = value;
        this._justifyContent = 'flex-start';
        return this;
    };
    /**
     * Sets the bottom position of the overlay. Clears any previously set vertical position.
     * @param value New bottom offset.
     */
    GlobalPositionStrategy.prototype.bottom = function (value) {
        this._topOffset = '';
        this._bottomOffset = value;
        this._alignItems = 'flex-end';
        return this;
    };
    /**
     * Sets the right position of the overlay. Clears any previously set horizontal position.
     * @param value New right offset.
     */
    GlobalPositionStrategy.prototype.right = function (value) {
        this._leftOffset = '';
        this._rightOffset = value;
        this._justifyContent = 'flex-end';
        return this;
    };
    /**
     * Sets the overlay width and clears any previously set width.
     * @param value New width for the overlay
     */
    GlobalPositionStrategy.prototype.width = function (value) {
        this._width = value;
        // When the width is 100%, we should reset the `left` and the offset,
        // in order to ensure that the element is flush against the viewport edge.
        if (value === '100%') {
            this.left('0px');
        }
        return this;
    };
    /**
     * Sets the overlay height and clears any previously set height.
     * @param value New height for the overlay
     */
    GlobalPositionStrategy.prototype.height = function (value) {
        this._height = value;
        // When the height is 100%, we should reset the `top` and the offset,
        // in order to ensure that the element is flush against the viewport edge.
        if (value === '100%') {
            this.top('0px');
        }
        return this;
    };
    /**
     * Centers the overlay horizontally with an optional offset.
     * Clears any previously set horizontal position.
     *
     * @param offset Overlay offset from the horizontal center.
     */
    GlobalPositionStrategy.prototype.centerHorizontally = function (offset) {
        if (offset === void 0) { offset = ''; }
        this.left(offset);
        this._justifyContent = 'center';
        return this;
    };
    /**
     * Centers the overlay vertically with an optional offset.
     * Clears any previously set vertical position.
     *
     * @param offset Overlay offset from the vertical center.
     */
    GlobalPositionStrategy.prototype.centerVertically = function (offset) {
        if (offset === void 0) { offset = ''; }
        this.top(offset);
        this._alignItems = 'center';
        return this;
    };
    /**
     * Apply the position to the element.
     * @docs-private
     *
     * @param element Element to which to apply the CSS.
     * @returns Resolved when the styles have been applied.
     */
    GlobalPositionStrategy.prototype.apply = function (element) {
        if (!this._wrapper) {
            this._wrapper = document.createElement('div');
            this._wrapper.classList.add('cdk-global-overlay-wrapper');
            element.parentNode.insertBefore(this._wrapper, element);
            this._wrapper.appendChild(element);
        }
        var styles = element.style;
        var parentStyles = element.parentNode.style;
        styles.position = this._cssPosition;
        styles.marginTop = this._topOffset;
        styles.marginLeft = this._leftOffset;
        styles.marginBottom = this._bottomOffset;
        styles.marginRight = this._rightOffset;
        styles.width = this._width;
        styles.height = this._height;
        parentStyles.justifyContent = this._justifyContent;
        parentStyles.alignItems = this._alignItems;
        return Promise.resolve(null);
    };
    /**
     * Removes the wrapper element from the DOM.
     */
    GlobalPositionStrategy.prototype.dispose = function () {
        if (this._wrapper && this._wrapper.parentNode) {
            this._wrapper.parentNode.removeChild(this._wrapper);
            this._wrapper = null;
        }
    };
    return GlobalPositionStrategy;
}());

var __decorate$12 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$12 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/** Builder for overlay position strategy. */
var OverlayPositionBuilder = (function () {
    function OverlayPositionBuilder(_viewportRuler) {
        this._viewportRuler = _viewportRuler;
    }
    /**
     * Creates a global position strategy.
     */
    OverlayPositionBuilder.prototype.global = function () {
        return new GlobalPositionStrategy();
    };
    /**
     * Creates a relative position strategy.
     * @param elementRef
     * @param originPos
     * @param overlayPos
     */
    OverlayPositionBuilder.prototype.connectedTo = function (elementRef, originPos, overlayPos) {
        return new ConnectedPositionStrategy(elementRef, originPos, overlayPos, this._viewportRuler);
    };
    OverlayPositionBuilder = __decorate$12([
        _angular_core.Injectable(), 
        __metadata$12('design:paramtypes', [ViewportRuler])
    ], OverlayPositionBuilder);
    return OverlayPositionBuilder;
}());

var __decorate$14 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$14 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * The OverlayContainer is the container in which all overlays will load.
 * It should be provided in the root component to ensure it is properly shared.
 */
var OverlayContainer = (function () {
    function OverlayContainer() {
    }
    Object.defineProperty(OverlayContainer.prototype, "themeClass", {
        /**
         * Base theme to be applied to all overlay-based components.
         */
        get: function () { return this._themeClass; },
        set: function (value) {
            if (this._containerElement) {
                this._containerElement.classList.remove(this._themeClass);
                if (value) {
                    this._containerElement.classList.add(value);
                }
            }
            this._themeClass = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * This method returns the overlay container element.  It will lazily
     * create the element the first time  it is called to facilitate using
     * the container in non-browser environments.
     * @returns the container element
     */
    OverlayContainer.prototype.getContainerElement = function () {
        if (!this._containerElement) {
            this._createContainer();
        }
        return this._containerElement;
    };
    /**
     * Create the overlay container element, which is simply a div
     * with the 'cdk-overlay-container' class on the document body.
     */
    OverlayContainer.prototype._createContainer = function () {
        var container = document.createElement('div');
        container.classList.add('cdk-overlay-container');
        if (this._themeClass) {
            container.classList.add(this._themeClass);
        }
        document.body.appendChild(container);
        this._containerElement = container;
    };
    OverlayContainer = __decorate$14([
        _angular_core.Injectable(), 
        __metadata$14('design:paramtypes', [])
    ], OverlayContainer);
    return OverlayContainer;
}());
function OVERLAY_CONTAINER_PROVIDER_FACTORY(parentContainer) {
    return parentContainer || new OverlayContainer();
}

var OVERLAY_CONTAINER_PROVIDER = {
    // If there is already an OverlayContainer available, use that. Otherwise, provide a new one.
    provide: OverlayContainer,
    deps: [[new _angular_core.Optional(), new _angular_core.SkipSelf(), OverlayContainer]],
    useFactory: OVERLAY_CONTAINER_PROVIDER_FACTORY
};

var __decorate$11 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$11 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/** Next overlay unique ID. */
var nextUniqueId = 0;
/** The default state for newly created overlays. */
var defaultState = new OverlayState();
/**
 * Service to create Overlays. Overlays are dynamically added pieces of floating UI, meant to be
 * used as a low-level building building block for other components. Dialogs, tooltips, menus,
 * selects, etc. can all be built using overlays. The service should primarily be used by authors
 * of re-usable components rather than developers building end-user applications.
 *
 * An overlay *is* a PortalHost, so any kind of Portal can be loaded into one.
 */
var Overlay = (function () {
    function Overlay(_overlayContainer, _componentFactoryResolver, _positionBuilder, _appRef, _injector, _ngZone) {
        this._overlayContainer = _overlayContainer;
        this._componentFactoryResolver = _componentFactoryResolver;
        this._positionBuilder = _positionBuilder;
        this._appRef = _appRef;
        this._injector = _injector;
        this._ngZone = _ngZone;
    }
    /**
     * Creates an overlay.
     * @param state State to apply to the overlay.
     * @returns Reference to the created overlay.
     */
    Overlay.prototype.create = function (state$$1) {
        if (state$$1 === void 0) { state$$1 = defaultState; }
        return this._createOverlayRef(this._createPaneElement(), state$$1);
    };
    /**
     * Returns a position builder that can be used, via fluent API,
     * to construct and configure a position strategy.
     */
    Overlay.prototype.position = function () {
        return this._positionBuilder;
    };
    /**
     * Creates the DOM element for an overlay and appends it to the overlay container.
     * @returns Newly-created pane element
     */
    Overlay.prototype._createPaneElement = function () {
        var pane = document.createElement('div');
        pane.id = "cdk-overlay-" + nextUniqueId++;
        pane.classList.add('cdk-overlay-pane');
        this._overlayContainer.getContainerElement().appendChild(pane);
        return pane;
    };
    /**
     * Create a DomPortalHost into which the overlay content can be loaded.
     * @param pane The DOM element to turn into a portal host.
     * @returns A portal host for the given DOM element.
     */
    Overlay.prototype._createPortalHost = function (pane) {
        return new DomPortalHost(pane, this._componentFactoryResolver, this._appRef, this._injector);
    };
    /**
     * Creates an OverlayRef for an overlay in the given DOM element.
     * @param pane DOM element for the overlay
     * @param state
     */
    Overlay.prototype._createOverlayRef = function (pane, state$$1) {
        return new OverlayRef(this._createPortalHost(pane), pane, state$$1, this._ngZone);
    };
    Overlay = __decorate$11([
        _angular_core.Injectable(), 
        __metadata$11('design:paramtypes', [OverlayContainer, _angular_core.ComponentFactoryResolver, OverlayPositionBuilder, _angular_core.ApplicationRef, _angular_core.Injector, _angular_core.NgZone])
    ], Overlay);
    return Overlay;
}());
/** Providers for Overlay and its related injectables. */
var OVERLAY_PROVIDERS = [
    Overlay,
    OverlayPositionBuilder,
    VIEWPORT_RULER_PROVIDER,
    SCROLL_DISPATCHER_PROVIDER,
    OVERLAY_CONTAINER_PROVIDER,
];

var __decorate$15 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$15 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Sends an event when the directive's element is scrolled. Registers itself with the
 * ScrollDispatcher service to include itself as part of its collection of scrolling events that it
 * can be listened to through the service.
 */
var Scrollable = (function () {
    function Scrollable(_elementRef, _scroll) {
        this._elementRef = _elementRef;
        this._scroll = _scroll;
    }
    Scrollable.prototype.ngOnInit = function () {
        this._scroll.register(this);
    };
    Scrollable.prototype.ngOnDestroy = function () {
        this._scroll.deregister(this);
    };
    /**
     * Returns observable that emits when a scroll event is fired on the host element.
     */
    Scrollable.prototype.elementScrolled = function () {
        return rxjs_Observable.Observable.fromEvent(this._elementRef.nativeElement, 'scroll');
    };
    Scrollable.prototype.getElementRef = function () {
        return this._elementRef;
    };
    Scrollable = __decorate$15([
        _angular_core.Directive({
            selector: '[cdk-scrollable]'
        }), 
        __metadata$15('design:paramtypes', [_angular_core.ElementRef, ScrollDispatcher])
    ], Scrollable);
    return Scrollable;
}());

var __decorate$10 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$10 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param$1 = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
/** Default set of positions for the overlay. Follows the behavior of a dropdown. */
var defaultPositionList = [
    new ConnectionPositionPair({ originX: 'start', originY: 'bottom' }, { overlayX: 'start', overlayY: 'top' }),
    new ConnectionPositionPair({ originX: 'start', originY: 'top' }, { overlayX: 'start', overlayY: 'bottom' }),
];
/**
 * Directive applied to an element to make it usable as an origin for an Overlay using a
 * ConnectedPositionStrategy.
 */
var OverlayOrigin = (function () {
    function OverlayOrigin(elementRef) {
        this.elementRef = elementRef;
    }
    OverlayOrigin = __decorate$10([
        _angular_core.Directive({
            selector: '[cdk-overlay-origin], [overlay-origin]',
            exportAs: 'cdkOverlayOrigin',
        }), 
        __metadata$10('design:paramtypes', [_angular_core.ElementRef])
    ], OverlayOrigin);
    return OverlayOrigin;
}());
/**
 * Directive to facilitate declarative creation of an Overlay using a ConnectedPositionStrategy.
 */
var ConnectedOverlayDirective = (function () {
    // TODO(jelbourn): inputs for size, scroll behavior, animation, etc.
    function ConnectedOverlayDirective(_overlay, templateRef, viewContainerRef, _dir) {
        this._overlay = _overlay;
        this._dir = _dir;
        this._open = false;
        this._hasBackdrop = false;
        this._offsetX = 0;
        this._offsetY = 0;
        /** Event emitted when the backdrop is clicked. */
        this.backdropClick = new _angular_core.EventEmitter();
        /** Event emitted when the position has changed. */
        this.positionChange = new _angular_core.EventEmitter();
        /** Event emitted when the overlay has been attached. */
        this.attach = new _angular_core.EventEmitter();
        /** Event emitted when the overlay has been detached. */
        this.detach = new _angular_core.EventEmitter();
        this._templatePortal = new TemplatePortal(templateRef, viewContainerRef);
    }
    Object.defineProperty(ConnectedOverlayDirective.prototype, "offsetX", {
        /** The offset in pixels for the overlay connection point on the x-axis */
        get: function () {
            return this._offsetX;
        },
        set: function (offsetX) {
            this._offsetX = offsetX;
            if (this._position) {
                this._position.withOffsetX(offsetX);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConnectedOverlayDirective.prototype, "offsetY", {
        /** The offset in pixels for the overlay connection point on the y-axis */
        get: function () {
            return this._offsetY;
        },
        set: function (offsetY) {
            this._offsetY = offsetY;
            if (this._position) {
                this._position.withOffsetY(offsetY);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConnectedOverlayDirective.prototype, "hasBackdrop", {
        /** Whether or not the overlay should attach a backdrop. */
        get: function () {
            return this._hasBackdrop;
        },
        set: function (value) {
            this._hasBackdrop = coerceBooleanProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConnectedOverlayDirective.prototype, "open", {
        get: function () {
            return this._open;
        },
        set: function (value) {
            value ? this._attachOverlay() : this._detachOverlay();
            this._open = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConnectedOverlayDirective.prototype, "overlayRef", {
        /** The associated overlay reference. */
        get: function () {
            return this._overlayRef;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConnectedOverlayDirective.prototype, "dir", {
        /** The element's layout direction. */
        get: function () {
            return this._dir ? this._dir.value : 'ltr';
        },
        enumerable: true,
        configurable: true
    });
    ConnectedOverlayDirective.prototype.ngOnDestroy = function () {
        this._destroyOverlay();
    };
    /** Creates an overlay */
    ConnectedOverlayDirective.prototype._createOverlay = function () {
        if (!this.positions || !this.positions.length) {
            this.positions = defaultPositionList;
        }
        this._overlayRef = this._overlay.create(this._buildConfig());
    };
    /** Builds the overlay config based on the directive's inputs */
    ConnectedOverlayDirective.prototype._buildConfig = function () {
        var overlayConfig = new OverlayState();
        if (this.width || this.width === 0) {
            overlayConfig.width = this.width;
        }
        if (this.height || this.height === 0) {
            overlayConfig.height = this.height;
        }
        if (this.minWidth || this.minWidth === 0) {
            overlayConfig.minWidth = this.minWidth;
        }
        if (this.minHeight || this.minHeight === 0) {
            overlayConfig.minHeight = this.minHeight;
        }
        overlayConfig.hasBackdrop = this.hasBackdrop;
        if (this.backdropClass) {
            overlayConfig.backdropClass = this.backdropClass;
        }
        this._position = this._createPositionStrategy();
        overlayConfig.positionStrategy = this._position;
        return overlayConfig;
    };
    /** Returns the position strategy of the overlay to be set on the overlay config */
    ConnectedOverlayDirective.prototype._createPositionStrategy = function () {
        var pos = this.positions[0];
        var originPoint = { originX: pos.originX, originY: pos.originY };
        var overlayPoint = { overlayX: pos.overlayX, overlayY: pos.overlayY };
        var strategy = this._overlay.position()
            .connectedTo(this.origin.elementRef, originPoint, overlayPoint)
            .withOffsetX(this.offsetX)
            .withOffsetY(this.offsetY);
        this._handlePositionChanges(strategy);
        return strategy;
    };
    ConnectedOverlayDirective.prototype._handlePositionChanges = function (strategy) {
        var _this = this;
        for (var i = 1; i < this.positions.length; i++) {
            strategy.withFallbackPosition({ originX: this.positions[i].originX, originY: this.positions[i].originY }, { overlayX: this.positions[i].overlayX, overlayY: this.positions[i].overlayY });
        }
        this._positionSubscription =
            strategy.onPositionChange.subscribe(function (pos) { return _this.positionChange.emit(pos); });
    };
    /** Attaches the overlay and subscribes to backdrop clicks if backdrop exists */
    ConnectedOverlayDirective.prototype._attachOverlay = function () {
        var _this = this;
        if (!this._overlayRef) {
            this._createOverlay();
        }
        this._position.withDirection(this.dir);
        this._overlayRef.getState().direction = this.dir;
        if (!this._overlayRef.hasAttached()) {
            this._overlayRef.attach(this._templatePortal);
            this.attach.emit();
        }
        if (this.hasBackdrop) {
            this._backdropSubscription = this._overlayRef.backdropClick().subscribe(function () {
                _this.backdropClick.emit();
            });
        }
    };
    /** Detaches the overlay and unsubscribes to backdrop clicks if backdrop exists */
    ConnectedOverlayDirective.prototype._detachOverlay = function () {
        if (this._overlayRef) {
            this._overlayRef.detach();
            this.detach.emit();
        }
        if (this._backdropSubscription) {
            this._backdropSubscription.unsubscribe();
            this._backdropSubscription = null;
        }
    };
    /** Destroys the overlay created by this directive. */
    ConnectedOverlayDirective.prototype._destroyOverlay = function () {
        if (this._overlayRef) {
            this._overlayRef.dispose();
        }
        if (this._backdropSubscription) {
            this._backdropSubscription.unsubscribe();
        }
        if (this._positionSubscription) {
            this._positionSubscription.unsubscribe();
        }
    };
    __decorate$10([
        _angular_core.Input(), 
        __metadata$10('design:type', OverlayOrigin)
    ], ConnectedOverlayDirective.prototype, "origin", void 0);
    __decorate$10([
        _angular_core.Input(), 
        __metadata$10('design:type', Array)
    ], ConnectedOverlayDirective.prototype, "positions", void 0);
    __decorate$10([
        _angular_core.Input(), 
        __metadata$10('design:type', Number)
    ], ConnectedOverlayDirective.prototype, "offsetX", null);
    __decorate$10([
        _angular_core.Input(), 
        __metadata$10('design:type', Object)
    ], ConnectedOverlayDirective.prototype, "offsetY", null);
    __decorate$10([
        _angular_core.Input(), 
        __metadata$10('design:type', Object)
    ], ConnectedOverlayDirective.prototype, "width", void 0);
    __decorate$10([
        _angular_core.Input(), 
        __metadata$10('design:type', Object)
    ], ConnectedOverlayDirective.prototype, "height", void 0);
    __decorate$10([
        _angular_core.Input(), 
        __metadata$10('design:type', Object)
    ], ConnectedOverlayDirective.prototype, "minWidth", void 0);
    __decorate$10([
        _angular_core.Input(), 
        __metadata$10('design:type', Object)
    ], ConnectedOverlayDirective.prototype, "minHeight", void 0);
    __decorate$10([
        _angular_core.Input(), 
        __metadata$10('design:type', String)
    ], ConnectedOverlayDirective.prototype, "backdropClass", void 0);
    __decorate$10([
        _angular_core.Input(), 
        __metadata$10('design:type', Object)
    ], ConnectedOverlayDirective.prototype, "hasBackdrop", null);
    __decorate$10([
        _angular_core.Input(), 
        __metadata$10('design:type', Object)
    ], ConnectedOverlayDirective.prototype, "open", null);
    __decorate$10([
        _angular_core.Output(), 
        __metadata$10('design:type', Object)
    ], ConnectedOverlayDirective.prototype, "backdropClick", void 0);
    __decorate$10([
        _angular_core.Output(), 
        __metadata$10('design:type', Object)
    ], ConnectedOverlayDirective.prototype, "positionChange", void 0);
    __decorate$10([
        _angular_core.Output(), 
        __metadata$10('design:type', Object)
    ], ConnectedOverlayDirective.prototype, "attach", void 0);
    __decorate$10([
        _angular_core.Output(), 
        __metadata$10('design:type', Object)
    ], ConnectedOverlayDirective.prototype, "detach", void 0);
    ConnectedOverlayDirective = __decorate$10([
        _angular_core.Directive({
            selector: '[cdk-connected-overlay], [connected-overlay]',
            exportAs: 'cdkConnectedOverlay'
        }),
        __param$1(3, _angular_core.Optional()), 
        __metadata$10('design:paramtypes', [Overlay, _angular_core.TemplateRef, _angular_core.ViewContainerRef, Dir])
    ], ConnectedOverlayDirective);
    return ConnectedOverlayDirective;
}());
var OverlayModule = (function () {
    function OverlayModule() {
    }
    /** @deprecated */
    OverlayModule.forRoot = function () {
        return {
            ngModule: OverlayModule,
            providers: [],
        };
    };
    OverlayModule = __decorate$10([
        _angular_core.NgModule({
            imports: [PortalModule],
            exports: [ConnectedOverlayDirective, OverlayOrigin, Scrollable],
            declarations: [ConnectedOverlayDirective, OverlayOrigin, Scrollable],
            providers: [OVERLAY_PROVIDERS],
        }), 
        __metadata$10('design:paramtypes', [])
    ], OverlayModule);
    return OverlayModule;
}());

var __decorate$19 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$19 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
// Whether the current platform supports the V8 Break Iterator. The V8 check
// is necessary to detect all Blink based browsers.
var hasV8BreakIterator = typeof (window) !== 'undefined' ?
    (window.Intl && window.Intl.v8BreakIterator) :
    (typeof (Intl) !== 'undefined' && Intl.v8BreakIterator);
/**
 * Service to detect the current platform by comparing the userAgent strings and
 * checking browser-specific global properties.
 * @docs-private
 */
var Platform = (function () {
    function Platform() {
        /** Layout Engines */
        this.EDGE = /(edge)/i.test(navigator.userAgent);
        this.TRIDENT = /(msie|trident)/i.test(navigator.userAgent);
        // EdgeHTML and Trident mock Blink specific things and need to excluded from this check.
        this.BLINK = !!(window.chrome || hasV8BreakIterator) && !!CSS && !this.EDGE && !this.TRIDENT;
        // Webkit is part of the userAgent in EdgeHTML Blink and Trident, so we need to
        // ensure that Webkit runs standalone and is not use as another engines base.
        this.WEBKIT = /AppleWebKit/i.test(navigator.userAgent) && !this.BLINK && !this.EDGE && !this.TRIDENT;
        /** Browsers and Platform Types */
        this.IOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
        // It's difficult to detect the plain Gecko engine, because most of the browsers identify
        // them self as Gecko-like browsers and modify the userAgent's according to that.
        // Since we only cover one explicit Firefox case, we can simply check for Firefox
        // instead of having an unstable check for Gecko.
        this.FIREFOX = /(firefox|minefield)/i.test(navigator.userAgent);
        // Trident on mobile adds the android platform to the userAgent to trick detections.
        this.ANDROID = /android/i.test(navigator.userAgent) && !this.TRIDENT;
    }
    Platform = __decorate$19([
        _angular_core.Injectable(), 
        __metadata$19('design:paramtypes', [])
    ], Platform);
    return Platform;
}());

var __decorate$18 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$18 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * The InteractivityChecker leans heavily on the ally.js accessibility utilities.
 * Methods like `isTabbable` are only covering specific edge-cases for the browsers which are
 * supported.
 */
/**
 * Utility for checking the interactivity of an element, such as whether is is focusable or
 * tabbable.
 */
var InteractivityChecker = (function () {
    function InteractivityChecker(_platform) {
        this._platform = _platform;
    }
    /**
     * Gets whether an element is disabled.
     *
     * @param element Element to be checked.
     * @returns Whether the element is disabled.
     */
    InteractivityChecker.prototype.isDisabled = function (element) {
        // This does not capture some cases, such as a non-form control with a disabled attribute or
        // a form control inside of a disabled form, but should capture the most common cases.
        return element.hasAttribute('disabled');
    };
    /**
     * Gets whether an element is visible for the purposes of interactivity.
     *
     * This will capture states like `display: none` and `visibility: hidden`, but not things like
     * being clipped by an `overflow: hidden` parent or being outside the viewport.
     *
     * @returns Whether the element is visible.
     */
    InteractivityChecker.prototype.isVisible = function (element) {
        return hasGeometry(element) && getComputedStyle(element).visibility === 'visible';
    };
    /**
     * Gets whether an element can be reached via Tab key.
     * Assumes that the element has already been checked with isFocusable.
     *
     * @param element Element to be checked.
     * @returns Whether the element is tabbable.
     */
    InteractivityChecker.prototype.isTabbable = function (element) {
        var frameElement = getWindow(element).frameElement;
        if (frameElement) {
            var frameType = frameElement && frameElement.nodeName.toLowerCase();
            // Frame elements inherit their tabindex onto all child elements.
            if (getTabIndexValue(frameElement) === -1) {
                return false;
            }
            // Webkit and Blink consider anything inside of an <object> element as non-tabbable.
            if ((this._platform.BLINK || this._platform.WEBKIT) && frameType === 'object') {
                return false;
            }
            // Webkit and Blink disable tabbing to an element inside of an invisible frame.
            if ((this._platform.BLINK || this._platform.WEBKIT) && !this.isVisible(frameElement)) {
                return false;
            }
        }
        var nodeName = element.nodeName.toLowerCase();
        var tabIndexValue = getTabIndexValue(element);
        if (element.hasAttribute('contenteditable')) {
            return tabIndexValue !== -1;
        }
        if (nodeName === 'iframe') {
            // The frames may be tabbable depending on content, but it's not possibly to reliably
            // investigate the content of the frames.
            return false;
        }
        if (nodeName === 'audio') {
            if (!element.hasAttribute('controls')) {
                // By default an <audio> element without the controls enabled is not tabbable.
                return false;
            }
            else if (this._platform.BLINK) {
                // In Blink <audio controls> elements are always tabbable.
                return true;
            }
        }
        if (nodeName === 'video') {
            if (!element.hasAttribute('controls') && this._platform.TRIDENT) {
                // In Trident a <video> element without the controls enabled is not tabbable.
                return false;
            }
            else if (this._platform.BLINK || this._platform.FIREFOX) {
                // In Chrome and Firefox <video controls> elements are always tabbable.
                return true;
            }
        }
        if (nodeName === 'object' && (this._platform.BLINK || this._platform.WEBKIT)) {
            // In all Blink and WebKit based browsers <object> elements are never tabbable.
            return false;
        }
        // In iOS the browser only considers some specific elements as tabbable.
        if (this._platform.WEBKIT && this._platform.IOS && !isPotentiallyTabbableIOS(element)) {
            return false;
        }
        return element.tabIndex >= 0;
    };
    /**
     * Gets whether an element can be focused by the user.
     *
     * @param element Element to be checked.
     * @returns Whether the element is focusable.
     */
    InteractivityChecker.prototype.isFocusable = function (element) {
        // Perform checks in order of left to most expensive.
        // Again, naive approach that does not capture many edge cases and browser quirks.
        return isPotentiallyFocusable(element) && !this.isDisabled(element) && this.isVisible(element);
    };
    InteractivityChecker = __decorate$18([
        _angular_core.Injectable(), 
        __metadata$18('design:paramtypes', [Platform])
    ], InteractivityChecker);
    return InteractivityChecker;
}());
/** Checks whether the specified element has any geometry / rectangles. */
function hasGeometry(element) {
    // Use logic from jQuery to check for an invisible element.
    // See https://github.com/jquery/jquery/blob/master/src/css/hiddenVisibleSelectors.js#L12
    return !!(element.offsetWidth || element.offsetHeight || element.getClientRects().length);
}
/** Gets whether an element's  */
function isNativeFormElement(element) {
    var nodeName = element.nodeName.toLowerCase();
    return nodeName === 'input' ||
        nodeName === 'select' ||
        nodeName === 'button' ||
        nodeName === 'textarea';
}
/** Gets whether an element is an <input type="hidden">. */
function isHiddenInput(element) {
    return isInputElement(element) && element.type == 'hidden';
}
/** Gets whether an element is an anchor that has an href attribute. */
function isAnchorWithHref(element) {
    return isAnchorElement(element) && element.hasAttribute('href');
}
/** Gets whether an element is an input element. */
function isInputElement(element) {
    return element.nodeName == 'input';
}
/** Gets whether an element is an anchor element. */
function isAnchorElement(element) {
    return element.nodeName.toLowerCase() == 'a';
}
/** Gets whether an element has a valid tabindex. */
function hasValidTabIndex(element) {
    if (!element.hasAttribute('tabindex') || element.tabIndex === undefined) {
        return false;
    }
    var tabIndex = element.getAttribute('tabindex');
    // IE11 parses tabindex="" as the value "-32768"
    if (tabIndex == '-32768') {
        return false;
    }
    return !!(tabIndex && !isNaN(parseInt(tabIndex, 10)));
}
/**
 * Returns the parsed tabindex from the element attributes instead of returning the
 * evaluated tabindex from the browsers defaults.
 */
function getTabIndexValue(element) {
    if (!hasValidTabIndex(element)) {
        return null;
    }
    // See browser issue in Gecko https://bugzilla.mozilla.org/show_bug.cgi?id=1128054
    var tabIndex = parseInt(element.getAttribute('tabindex'), 10);
    return isNaN(tabIndex) ? -1 : tabIndex;
}
/** Checks whether the specified element is potentially tabbable on iOS */
function isPotentiallyTabbableIOS(element) {
    var nodeName = element.nodeName.toLowerCase();
    var inputType = nodeName === 'input' && element.type;
    return inputType === 'text'
        || inputType === 'password'
        || nodeName === 'select'
        || nodeName === 'textarea';
}
/**
 * Gets whether an element is potentially focusable without taking current visible/disabled state
 * into account.
 */
function isPotentiallyFocusable(element) {
    // Inputs are potentially focusable *unless* they're type="hidden".
    if (isHiddenInput(element)) {
        return false;
    }
    return isNativeFormElement(element) ||
        isAnchorWithHref(element) ||
        element.hasAttribute('contenteditable') ||
        hasValidTabIndex(element);
}
/** Gets the parent window of a DOM node with regards of being inside of an iframe. */
function getWindow(node) {
    return node.ownerDocument.defaultView || window;
}

var __decorate$17 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$17 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Directive for trapping focus within a region.
 *
 * NOTE: This directive currently uses a very simple (naive) approach to focus trapping.
 * It assumes that the tab order is the same as DOM order, which is not necessarily true.
 * Things like tabIndex > 0, flex `order`, and shadow roots can cause to two to misalign.
 * This will be replaced with a more intelligent solution before the library is considered stable.
 */
var FocusTrap = (function () {
    function FocusTrap(_checker, _ngZone) {
        this._checker = _checker;
        this._ngZone = _ngZone;
        this._disabled = false;
    }
    Object.defineProperty(FocusTrap.prototype, "disabled", {
        /** Whether the focus trap is active. */
        get: function () { return this._disabled; },
        set: function (val) { this._disabled = coerceBooleanProperty(val); },
        enumerable: true,
        configurable: true
    });
    /**
     * Waits for microtask queue to empty, then focuses the first tabbable element within the focus
     * trap region.
     */
    FocusTrap.prototype.focusFirstTabbableElementWhenReady = function () {
        var _this = this;
        this._ngZone.onMicrotaskEmpty.first().subscribe(function () {
            _this.focusFirstTabbableElement();
        });
    };
    /**
     * Waits for microtask queue to empty, then focuses the last tabbable element within the focus
     * trap region.
     */
    FocusTrap.prototype.focusLastTabbableElementWhenReady = function () {
        var _this = this;
        this._ngZone.onMicrotaskEmpty.first().subscribe(function () {
            _this.focusLastTabbableElement();
        });
    };
    /**
     * Focuses the first tabbable element within the focus trap region.
     */
    FocusTrap.prototype.focusFirstTabbableElement = function () {
        var rootElement = this.trappedContent.nativeElement;
        var redirectToElement = rootElement.querySelector('[cdk-focus-start]') ||
            this._getFirstTabbableElement(rootElement);
        if (redirectToElement) {
            redirectToElement.focus();
        }
    };
    /**
     * Focuses the last tabbable element within the focus trap region.
     */
    FocusTrap.prototype.focusLastTabbableElement = function () {
        var rootElement = this.trappedContent.nativeElement;
        var focusTargets = rootElement.querySelectorAll('[cdk-focus-end]');
        var redirectToElement = null;
        if (focusTargets.length) {
            redirectToElement = focusTargets[focusTargets.length - 1];
        }
        else {
            redirectToElement = this._getLastTabbableElement(rootElement);
        }
        if (redirectToElement) {
            redirectToElement.focus();
        }
    };
    /** Get the first tabbable element from a DOM subtree (inclusive). */
    FocusTrap.prototype._getFirstTabbableElement = function (root) {
        if (this._checker.isFocusable(root) && this._checker.isTabbable(root)) {
            return root;
        }
        // Iterate in DOM order.
        var childCount = root.children.length;
        for (var i = 0; i < childCount; i++) {
            var tabbableChild = this._getFirstTabbableElement(root.children[i]);
            if (tabbableChild) {
                return tabbableChild;
            }
        }
        return null;
    };
    /** Get the last tabbable element from a DOM subtree (inclusive). */
    FocusTrap.prototype._getLastTabbableElement = function (root) {
        if (this._checker.isFocusable(root) && this._checker.isTabbable(root)) {
            return root;
        }
        // Iterate in reverse DOM order.
        for (var i = root.children.length - 1; i >= 0; i--) {
            var tabbableChild = this._getLastTabbableElement(root.children[i]);
            if (tabbableChild) {
                return tabbableChild;
            }
        }
        return null;
    };
    __decorate$17([
        _angular_core.ViewChild('trappedContent'), 
        __metadata$17('design:type', _angular_core.ElementRef)
    ], FocusTrap.prototype, "trappedContent", void 0);
    __decorate$17([
        _angular_core.Input(), 
        __metadata$17('design:type', Boolean)
    ], FocusTrap.prototype, "disabled", null);
    FocusTrap = __decorate$17([
        _angular_core.Component({selector: 'cdk-focus-trap, focus-trap',
            template: "<div *ngIf=\"!disabled\" tabindex=\"0\" (focus)=\"focusLastTabbableElement()\"></div> <div #trappedContent class=\"cdk-focus-trap-content\"><ng-content></ng-content></div> <div *ngIf=\"!disabled\" tabindex=\"0\" (focus)=\"focusFirstTabbableElement()\"></div> ",
            encapsulation: _angular_core.ViewEncapsulation.None,
        }), 
        __metadata$17('design:paramtypes', [InteractivityChecker, _angular_core.NgZone])
    ], FocusTrap);
    return FocusTrap;
}());

var __decorate$20 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$20 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param$3 = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var LIVE_ANNOUNCER_ELEMENT_TOKEN = new _angular_core.OpaqueToken('liveAnnouncerElement');
var LiveAnnouncer = (function () {
    function LiveAnnouncer(elementToken) {
        // We inject the live element as `any` because the constructor signature cannot reference
        // browser globals (HTMLElement) on non-browser environments, since having a class decorator
        // causes TypeScript to preserve the constructor signature types.
        this._liveElement = elementToken || this._createLiveElement();
    }
    /**
     * Announces a message to screenreaders.
     * @param message Message to be announced to the screenreader
     * @param politeness The politeness of the announcer element
     */
    LiveAnnouncer.prototype.announce = function (message, politeness) {
        var _this = this;
        if (politeness === void 0) { politeness = 'polite'; }
        this._liveElement.textContent = '';
        // TODO: ensure changing the politeness works on all environments we support.
        this._liveElement.setAttribute('aria-live', politeness);
        // This 100ms timeout is necessary for some browser + screen-reader combinations:
        // - Both JAWS and NVDA over IE11 will not announce anything without a non-zero timeout.
        // - With Chrome and IE11 with NVDA or JAWS, a repeated (identical) message won't be read a
        //   second time without clearing and then using a non-zero delay.
        // (using JAWS 17 at time of this writing).
        setTimeout(function () { return _this._liveElement.textContent = message; }, 100);
    };
    /** Removes the aria-live element from the DOM. */
    LiveAnnouncer.prototype._removeLiveElement = function () {
        if (this._liveElement && this._liveElement.parentNode) {
            this._liveElement.parentNode.removeChild(this._liveElement);
        }
    };
    LiveAnnouncer.prototype._createLiveElement = function () {
        var liveEl = document.createElement('div');
        liveEl.classList.add('cdk-visually-hidden');
        liveEl.setAttribute('aria-atomic', 'true');
        liveEl.setAttribute('aria-live', 'polite');
        document.body.appendChild(liveEl);
        return liveEl;
    };
    LiveAnnouncer = __decorate$20([
        _angular_core.Injectable(),
        __param$3(0, _angular_core.Optional()),
        __param$3(0, _angular_core.Inject(LIVE_ANNOUNCER_ELEMENT_TOKEN)), 
        __metadata$20('design:paramtypes', [Object])
    ], LiveAnnouncer);
    return LiveAnnouncer;
}());
function LIVE_ANNOUNCER_PROVIDER_FACTORY(parentDispatcher, liveElement) {
    return parentDispatcher || new LiveAnnouncer(liveElement);
}

var LIVE_ANNOUNCER_PROVIDER = {
    // If there is already a LiveAnnouncer available, use that. Otherwise, provide a new one.
    provide: LiveAnnouncer,
    deps: [
        [new _angular_core.Optional(), new _angular_core.SkipSelf(), LiveAnnouncer],
        [new _angular_core.Optional(), new _angular_core.Inject(LIVE_ANNOUNCER_ELEMENT_TOKEN)]
    ],
    useFactory: LIVE_ANNOUNCER_PROVIDER_FACTORY
};

var supportedInputTypes;
/** @returns The input types supported by this browser. */
function getSupportedInputTypes() {
    if (!supportedInputTypes) {
        var featureTestInput_1 = document.createElement('input');
        supportedInputTypes = new Set([
            // `color` must come first. Chrome 56 shows a warning if we change the type to `color` after
            // first changing it to something else:
            // The specified value "" does not conform to the required format.
            // The format is "#rrggbb" where rr, gg, bb are two-digit hexadecimal numbers.
            'color',
            'button',
            'checkbox',
            'date',
            'datetime-local',
            'email',
            'file',
            'hidden',
            'image',
            'month',
            'number',
            'password',
            'radio',
            'range',
            'reset',
            'search',
            'submit',
            'tel',
            'text',
            'time',
            'url',
            'week',
        ].filter(function (value) {
            featureTestInput_1.setAttribute('type', value);
            return featureTestInput_1.type === value;
        }));
    }
    return supportedInputTypes;
}

var __decorate$21 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$21 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var PlatformModule = (function () {
    function PlatformModule() {
    }
    /** @deprecated */
    PlatformModule.forRoot = function () {
        return {
            ngModule: PlatformModule,
            providers: [],
        };
    };
    PlatformModule = __decorate$21([
        _angular_core.NgModule({
            providers: [Platform]
        }), 
        __metadata$21('design:paramtypes', [])
    ], PlatformModule);
    return PlatformModule;
}());

var __decorate$16 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$16 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var A11yModule = (function () {
    function A11yModule() {
    }
    /** @deprecated */
    A11yModule.forRoot = function () {
        return {
            ngModule: A11yModule,
            providers: [],
        };
    };
    A11yModule = __decorate$16([
        _angular_core.NgModule({
            imports: [_angular_common.CommonModule, PlatformModule],
            declarations: [FocusTrap],
            exports: [FocusTrap],
            providers: [InteractivityChecker, LIVE_ANNOUNCER_PROVIDER]
        }), 
        __metadata$16('design:paramtypes', [])
    ], A11yModule);
    return A11yModule;
}());

var __decorate$23 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$23 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Component that shows a simplified checkbox without including any kind of "real" checkbox.
 * Meant to be used when the checkbox is purely decorative and a large number of them will be
 * included, such as for the options in a multi-select. Uses no SVGs or complex animations.
 *
 * Note that this component will be completely invisible to screen-reader users. This is *not*
 * interchangeable with <md-checkbox> and should *not* be used if the user would directly interact
 * with the checkbox. The pseudo-checkbox should only be used as an implementation detail of
 * more complex components that appropriately handle selected / checked state.
 * @docs-private
 */
var MdPseudoCheckbox = (function () {
    function MdPseudoCheckbox(_elementRef, _renderer) {
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        /** Display state of the checkbox. */
        this.state = 'unchecked';
        /** Whether the checkbox is disabled. */
        this.disabled = false;
        this.color = 'accent';
    }
    Object.defineProperty(MdPseudoCheckbox.prototype, "color", {
        /** Color of the checkbox. */
        get: function () { return this._color; },
        set: function (value) {
            if (value) {
                var nativeElement = this._elementRef.nativeElement;
                this._renderer.setElementClass(nativeElement, "mat-" + this.color, false);
                this._renderer.setElementClass(nativeElement, "mat-" + value, true);
                this._color = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    
    __decorate$23([
        _angular_core.Input(), 
        __metadata$23('design:type', String)
    ], MdPseudoCheckbox.prototype, "state", void 0);
    __decorate$23([
        _angular_core.Input(), 
        __metadata$23('design:type', Boolean)
    ], MdPseudoCheckbox.prototype, "disabled", void 0);
    __decorate$23([
        _angular_core.Input(), 
        __metadata$23('design:type', String)
    ], MdPseudoCheckbox.prototype, "color", null);
    MdPseudoCheckbox = __decorate$23([
        _angular_core.Component({encapsulation: _angular_core.ViewEncapsulation.None,
            selector: 'md-pseudo-checkbox, mat-pseudo-checkbox',
            styles: [".mat-pseudo-checkbox { width: 20px; height: 20px; border: 2px solid; border-radius: 2px; cursor: pointer; display: inline-block; vertical-align: middle; box-sizing: border-box; position: relative; transition: border-color 90ms cubic-bezier(0, 0, 0.2, 0.1), background-color 90ms cubic-bezier(0, 0, 0.2, 0.1); } .mat-pseudo-checkbox::after { position: absolute; opacity: 0; content: ''; border-bottom: 2px solid currentColor; transition: opacity 90ms cubic-bezier(0, 0, 0.2, 0.1); } .mat-pseudo-checkbox.mat-pseudo-checkbox-checked, .mat-pseudo-checkbox.mat-pseudo-checkbox-indeterminate { border: none; } .mat-pseudo-checkbox-disabled { cursor: default; } .mat-pseudo-checkbox-indeterminate::after { top: 9px; left: 2px; width: 16px; opacity: 1; } .mat-pseudo-checkbox-checked::after { top: 5px; left: 3px; width: 12px; height: 5px; border-left: 2px solid currentColor; transform: rotate(-45deg); opacity: 1; } /*# sourceMappingURL=pseudo-checkbox.css.map */ "],
            template: '',
            host: {
                '[class.mat-pseudo-checkbox]': 'true',
                '[class.mat-pseudo-checkbox-indeterminate]': 'state === "indeterminate"',
                '[class.mat-pseudo-checkbox-checked]': 'state === "checked"',
                '[class.mat-pseudo-checkbox-disabled]': 'disabled',
            },
        }), 
        __metadata$23('design:paramtypes', [_angular_core.ElementRef, _angular_core.Renderer])
    ], MdPseudoCheckbox);
    return MdPseudoCheckbox;
}());

var __decorate$22 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$22 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var MdSelectionModule = (function () {
    function MdSelectionModule() {
    }
    MdSelectionModule = __decorate$22([
        _angular_core.NgModule({
            exports: [MdPseudoCheckbox],
            declarations: [MdPseudoCheckbox]
        }), 
        __metadata$22('design:paramtypes', [])
    ], MdSelectionModule);
    return MdSelectionModule;
}());

var __decorate$24 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$24 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
// "Polyfill" for `Node.replaceWith()`.
// cf. https://developer.mozilla.org/en-US/docs/Web/API/ChildNode/replaceWith
function _replaceWith(toReplaceEl, otherEl) {
    toReplaceEl.parentElement.replaceChild(otherEl, toReplaceEl);
}
/** @docs-private */
var DomProjectionHost = (function () {
    function DomProjectionHost(ref) {
        this.ref = ref;
    }
    DomProjectionHost = __decorate$24([
        _angular_core.Directive({
            selector: 'cdk-dom-projection-host'
        }), 
        __metadata$24('design:paramtypes', [_angular_core.ElementRef])
    ], DomProjectionHost);
    return DomProjectionHost;
}());
/** @docs-private */
var DomProjection = (function () {
    function DomProjection() {
    }
    /**
     * Project an element into a host element.
     * Replace a host element by another element. This also replaces the children of the element
     * by the children of the host.
     *
     * It should be used like this:
     *
     * ```
     *   @Component({
     *     template: `<div>
     *       <cdk-dom-projection-host>
     *         <div>other</div>
     *         <ng-content></ng-content>
     *       </cdk-dom-projection-host>
     *     </div>`
     *   })
     *   class Cmpt {
     *     constructor(private _projector: DomProjection, private _el: ElementRef) {}
     *     ngOnInit() { this._projector.project(this._el, this._projector); }
     *   }
     * ```
     *
     * This component will move the content of the element it's applied to in the outer div. Because
     * `project()` also move the children of the host inside the projected element, the element will
     * contain the `<div>other</div>` HTML as well as its own children.
     *
     * Note: without `<ng-content></ng-content>` the projection will project an empty element.
     *
     * @param ref ElementRef to be projected.
     * @param host Projection host into which to project the `ElementRef`.
     */
    DomProjection.prototype.project = function (ref, host) {
        var projectedEl = ref.nativeElement;
        var hostEl = host.ref.nativeElement;
        var childNodes = projectedEl.childNodes;
        var child = childNodes[0];
        // We hoist all of the projected element's children out into the projected elements position
        // because we *only* want to move the projected element and not its children.
        _replaceWith(projectedEl, child);
        var l = childNodes.length;
        while (l--) {
            child.parentNode.insertBefore(childNodes[0], child.nextSibling);
            child = child.nextSibling; // nextSibling is now the childNodes[0].
        }
        // Insert all host children under the projectedEl, then replace host by component.
        l = hostEl.childNodes.length;
        while (l--) {
            projectedEl.appendChild(hostEl.childNodes[0]);
        }
        _replaceWith(hostEl, projectedEl);
        // At this point the host is replaced by the component. Nothing else to be done.
    };
    DomProjection = __decorate$24([
        _angular_core.Injectable(), 
        __metadata$24('design:paramtypes', [])
    ], DomProjection);
    return DomProjection;
}());
/** @docs-private */
var ProjectionModule = (function () {
    function ProjectionModule() {
    }
    /** @deprecated */
    ProjectionModule.forRoot = function () {
        return {
            ngModule: ProjectionModule,
        };
    };
    ProjectionModule = __decorate$24([
        _angular_core.NgModule({
            exports: [DomProjectionHost],
            declarations: [DomProjectionHost],
            providers: [DomProjection],
        }), 
        __metadata$24('design:paramtypes', [])
    ], ProjectionModule);
    return ProjectionModule;
}());

var __extends$5 = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate$25 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$25 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * The FullscreenOverlayContainer is the alternative to OverlayContainer
 * that supports correct displaying of overlay elements in Fullscreen mode
 * https://developer.mozilla.org/en-US/docs/Web/API/Element/requestFullScreen
 * It should be provided in the root component that way:
 * providers: [
 *   {provide: OverlayContainer, useClass: FullscreenOverlayContainer}
 * ],
 */
var FullscreenOverlayContainer = (function (_super) {
    __extends$5(FullscreenOverlayContainer, _super);
    function FullscreenOverlayContainer() {
        _super.apply(this, arguments);
    }
    FullscreenOverlayContainer.prototype._createContainer = function () {
        var _this = this;
        _super.prototype._createContainer.call(this);
        this._adjustParentForFullscreenChange();
        this._addFullscreenChangeListener(function () { return _this._adjustParentForFullscreenChange(); });
    };
    FullscreenOverlayContainer.prototype._adjustParentForFullscreenChange = function () {
        if (!this._containerElement) {
            return;
        }
        var fullscreenElement = this.getFullscreenElement();
        var parent = fullscreenElement || document.body;
        parent.appendChild(this._containerElement);
    };
    FullscreenOverlayContainer.prototype._addFullscreenChangeListener = function (fn) {
        if (document.fullscreenEnabled) {
            document.addEventListener('fullscreenchange', fn);
        }
        else if (document.webkitFullscreenEnabled) {
            document.addEventListener('webkitfullscreenchange', fn);
        }
        else if (document.mozFullScreenEnabled) {
            document.addEventListener('mozfullscreenchange', fn);
        }
        else if (document.msFullscreenEnabled) {
            document.addEventListener('MSFullscreenChange', fn);
        }
    };
    /**
     * When the page is put into fullscreen mode, a specific element is specified.
     * Only that element and its children are visible when in fullscreen mode.
    */
    FullscreenOverlayContainer.prototype.getFullscreenElement = function () {
        return document.fullscreenElement ||
            document.webkitFullscreenElement ||
            document.mozFullScreenElement ||
            document.msFullscreenElement ||
            null;
    };
    FullscreenOverlayContainer = __decorate$25([
        _angular_core.Injectable(), 
        __metadata$25('design:paramtypes', [])
    ], FullscreenOverlayContainer);
    return FullscreenOverlayContainer;
}(OverlayContainer));

var __extends$6 = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate$26 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$26 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/* Adjusts configuration of our gesture library, Hammer. */
var GestureConfig = (function (_super) {
    __extends$6(GestureConfig, _super);
    function GestureConfig() {
        _super.call(this);
        this._hammer = typeof window !== 'undefined' ? window.Hammer : null;
        /* List of new event names to add to the gesture support list */
        this.events = this._hammer ? [
            'longpress',
            'slide',
            'slidestart',
            'slideend',
            'slideright',
            'slideleft'
        ] : [];
        if (!this._hammer && _angular_core.isDevMode()) {
            console.warn('Could not find HammerJS. Certain Angular Material ' +
                'components may not work correctly.');
        }
    }
    /**
     * Builds Hammer instance manually to add custom recognizers that match the Material Design spec.
     *
     * Our gesture names come from the Material Design gestures spec:
     * https://www.google.com/design/spec/patterns/gestures.html#gestures-touch-mechanics
     *
     * More information on default recognizers can be found in Hammer docs:
     * http://hammerjs.github.io/recognizer-pan/
     * http://hammerjs.github.io/recognizer-press/
     *
     * @param element Element to which to assign the new HammerJS gestures.
     * @returns Newly-created HammerJS instance.
     */
    GestureConfig.prototype.buildHammer = function (element) {
        var mc = new this._hammer(element);
        // Default Hammer Recognizers.
        var pan = new this._hammer.Pan();
        var swipe = new this._hammer.Swipe();
        var press = new this._hammer.Press();
        // Notice that a HammerJS recognizer can only depend on one other recognizer once.
        // Otherwise the previous `recognizeWith` will be dropped.
        // TODO: Confirm threshold numbers with Material Design UX Team
        var slide = this._createRecognizer(pan, { event: 'slide', threshold: 0 }, swipe);
        var longpress = this._createRecognizer(press, { event: 'longpress', time: 500 });
        // Overwrite the default `pan` event to use the swipe event.
        pan.recognizeWith(swipe);
        // Add customized gestures to Hammer manager
        mc.add([swipe, press, pan, slide, longpress]);
        return mc;
    };
    /** Creates a new recognizer, without affecting the default recognizers of HammerJS */
    GestureConfig.prototype._createRecognizer = function (base, options) {
        var inheritances = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            inheritances[_i - 2] = arguments[_i];
        }
        var recognizer = new base.constructor(options);
        inheritances.push(base);
        inheritances.forEach(function (item) { return recognizer.recognizeWith(item); });
        return recognizer;
    };
    GestureConfig = __decorate$26([
        _angular_core.Injectable(), 
        __metadata$26('design:paramtypes', [])
    ], GestureConfig);
    return GestureConfig;
}(_angular_platformBrowser.HammerGestureConfig));

/**
 * Class to be used to power selecting one or more options from a list.
 * @docs-private
 */
var SelectionModel = (function () {
    function SelectionModel(_isMulti, initiallySelectedValues) {
        var _this = this;
        if (_isMulti === void 0) { _isMulti = false; }
        this._isMulti = _isMulti;
        /** Currently-selected values. */
        this._selection = new Set();
        /** Keeps track of the deselected options that haven't been emitted by the change event. */
        this._deselectedToEmit = [];
        /** Keeps track of the selected option that haven't been emitted by the change event. */
        this._selectedToEmit = [];
        /** Event emitted when the value has changed. */
        this.onChange = new rxjs_Subject.Subject();
        if (initiallySelectedValues) {
            if (_isMulti) {
                initiallySelectedValues.forEach(function (value) { return _this._markSelected(value); });
            }
            else {
                this._markSelected(initiallySelectedValues[0]);
            }
            // Clear the array in order to avoid firing the change event for preselected values.
            this._selectedToEmit.length = 0;
        }
    }
    Object.defineProperty(SelectionModel.prototype, "selected", {
        /** Selected value(s). */
        get: function () {
            if (!this._selected) {
                this._selected = Array.from(this._selection.values());
            }
            return this._selected;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Selects a value or an array of values.
     */
    SelectionModel.prototype.select = function (value) {
        this._markSelected(value);
        this._emitChangeEvent();
    };
    /**
     * Deselects a value or an array of values.
     */
    SelectionModel.prototype.deselect = function (value) {
        this._unmarkSelected(value);
        this._emitChangeEvent();
    };
    /**
     * Clears all of the selected values.
     */
    SelectionModel.prototype.clear = function () {
        this._unmarkAll();
        this._emitChangeEvent();
    };
    /**
     * Determines whether a value is selected.
     */
    SelectionModel.prototype.isSelected = function (value) {
        return this._selection.has(value);
    };
    /**
     * Determines whether the model has a value.
     */
    SelectionModel.prototype.isEmpty = function () {
        return this._selection.size === 0;
    };
    /** Emits a change event and clears the records of selected and deselected values. */
    SelectionModel.prototype._emitChangeEvent = function () {
        if (this._selectedToEmit.length || this._deselectedToEmit.length) {
            var eventData = new SelectionChange(this._selectedToEmit, this._deselectedToEmit);
            this.onChange.next(eventData);
            this._deselectedToEmit = [];
            this._selectedToEmit = [];
            this._selected = null;
        }
    };
    /** Selects a value. */
    SelectionModel.prototype._markSelected = function (value) {
        if (!this.isSelected(value)) {
            if (!this._isMulti) {
                this._unmarkAll();
            }
            this._selection.add(value);
            this._selectedToEmit.push(value);
        }
    };
    /** Deselects a value. */
    SelectionModel.prototype._unmarkSelected = function (value) {
        if (this.isSelected(value)) {
            this._selection.delete(value);
            this._deselectedToEmit.push(value);
        }
    };
    /** Clears out the selected values. */
    SelectionModel.prototype._unmarkAll = function () {
        var _this = this;
        if (!this.isEmpty()) {
            this._selection.forEach(function (value) { return _this._unmarkSelected(value); });
        }
    };
    return SelectionModel;
}());
/**
 * Describes an event emitted when the value of a MdSelectionModel has changed.
 * @docs-private
 */
var SelectionChange = (function () {
    function SelectionChange(added, removed) {
        this.added = added;
        this.removed = removed;
    }
    return SelectionChange;
}());

/**
 * Screenreaders will often fire fake mousedown events when a focusable element
 * is activated using the keyboard. We can typically distinguish between these faked
 * mousedown events and real mousedown events using the "buttons" property. While
 * real mousedowns will indicate the mouse button that was pressed (e.g. "1" for
 * the left mouse button), faked mousedowns will usually set the property value to 0.
 */
function isFakeMousedownFromScreenReader(event) {
    return event.buttons === 0;
}

var __decorate$27 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$27 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Class to coordinate unique selection based on name.
 * Intended to be consumed as an Angular service.
 * This service is needed because native radio change events are only fired on the item currently
 * being selected, and we still need to uncheck the previous selection.
 *
 * This service does not *store* any IDs and names because they may change at any time, so it is
 * less error-prone if they are simply passed through when the events occur.
 */
var UniqueSelectionDispatcher = (function () {
    function UniqueSelectionDispatcher() {
        this._listeners = [];
    }
    /**
     * Notify other items that selection for the given name has been set.
     * @param id ID of the item.
     * @param name Name of the item.
     */
    UniqueSelectionDispatcher.prototype.notify = function (id, name) {
        for (var _i = 0, _a = this._listeners; _i < _a.length; _i++) {
            var listener = _a[_i];
            listener(id, name);
        }
    };
    /** Listen for future changes to item selection. */
    UniqueSelectionDispatcher.prototype.listen = function (listener) {
        this._listeners.push(listener);
    };
    UniqueSelectionDispatcher = __decorate$27([
        _angular_core.Injectable(), 
        __metadata$27('design:paramtypes', [])
    ], UniqueSelectionDispatcher);
    return UniqueSelectionDispatcher;
}());
function UNIQUE_SELECTION_DISPATCHER_PROVIDER_FACTORY(parentDispatcher) {
    return parentDispatcher || new UniqueSelectionDispatcher();
}
var UNIQUE_SELECTION_DISPATCHER_PROVIDER = {
    // If there is already a dispatcher available, use that. Otherwise, provide a new one.
    provide: UniqueSelectionDispatcher,
    deps: [[new _angular_core.Optional(), new _angular_core.SkipSelf(), UniqueSelectionDispatcher]],
    useFactory: UNIQUE_SELECTION_DISPATCHER_PROVIDER_FACTORY
};

var __decorate$29 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$29 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
// This is the value used by AngularJS Material. Through trial and error (on iPhone 6S) they found
// that a value of around 650ms seems appropriate.
var TOUCH_BUFFER_MS = 650;
/** Monitors mouse and keyboard events to determine the cause of focus events. */
var FocusOriginMonitor = (function () {
    function FocusOriginMonitor(_ngZone) {
        var _this = this;
        this._ngZone = _ngZone;
        /** The focus origin that the next focus event is a result of. */
        this._origin = null;
        /** Whether the window has just been focused. */
        this._windowFocused = false;
        /** Weak map of elements being monitored to their info. */
        this._elementInfo = new WeakMap();
        this._ngZone.runOutsideAngular(function () { return _this._registerDocumentEvents(); });
    }
    /**
     * Monitors focus on an element and applies appropriate CSS classes.
     * @param element The element to monitor
     * @param renderer The renderer to use to apply CSS classes to the element.
     * @param checkChildren Whether to count the element as focused when its children are focused.
     * @returns An observable that emits when the focus state of the element changes.
     *     When the element is blurred, null will be emitted.
     */
    FocusOriginMonitor.prototype.monitor = function (element, renderer, checkChildren) {
        var _this = this;
        // Check if we're already monitoring this element.
        if (this._elementInfo.has(element)) {
            var info_1 = this._elementInfo.get(element);
            info_1.checkChildren = checkChildren;
            return info_1.subject.asObservable();
        }
        // Create monitored element info.
        var info = {
            unlisten: null,
            checkChildren: checkChildren,
            renderer: renderer,
            subject: new rxjs_Subject.Subject()
        };
        this._elementInfo.set(element, info);
        // Start listening. We need to listen in capture phase since focus events don't bubble.
        var focusListener = function (event) { return _this._onFocus(event, element); };
        var blurListener = function (event) { return _this._onBlur(event, element); };
        this._ngZone.runOutsideAngular(function () {
            element.addEventListener('focus', focusListener, true);
            element.addEventListener('blur', blurListener, true);
        });
        // Create an unlisten function for later.
        info.unlisten = function () {
            element.removeEventListener('focus', focusListener, true);
            element.removeEventListener('blur', blurListener, true);
        };
        return info.subject.asObservable();
    };
    /**
     * Stops monitoring an element and removes all focus classes.
     * @param element The element to stop monitoring.
     */
    FocusOriginMonitor.prototype.unmonitor = function (element) {
        if (!this._elementInfo.has(element)) {
            return;
        }
        this._elementInfo.get(element).unlisten();
        this._setClasses(element, null);
        this._elementInfo.delete(element);
    };
    /**
     * Focuses the element via the specified focus origin.
     * @param element The element to focus.
     * @param renderer The renderer to use to invoke the focus method on the element.
     * @param origin The focus origin.
     */
    FocusOriginMonitor.prototype.focusVia = function (element, renderer, origin) {
        this._setOriginForCurrentEventQueue(origin);
        renderer.invokeElementMethod(element, 'focus');
    };
    /** Register necessary event listeners on the document and window. */
    FocusOriginMonitor.prototype._registerDocumentEvents = function () {
        // Note: we listen to events in the capture phase so we can detect them even if the user stops
        // propagation.
        var _this = this;
        // On keydown record the origin and clear any touch event that may be in progress.
        document.addEventListener('keydown', function () {
            _this._lastTouchTarget = null;
            _this._setOriginForCurrentEventQueue('keyboard');
        }, true);
        // On mousedown record the origin only if there is not touch target, since a mousedown can
        // happen as a result of a touch event.
        document.addEventListener('mousedown', function () {
            if (!_this._lastTouchTarget) {
                _this._setOriginForCurrentEventQueue('mouse');
            }
        }, true);
        // When the touchstart event fires the focus event is not yet in the event queue. This means
        // we can't rely on the trick used above (setting timeout of 0ms). Instead we wait 650ms to
        // see if a focus happens.
        document.addEventListener('touchstart', function (event) {
            if (_this._touchTimeout != null) {
                clearTimeout(_this._touchTimeout);
            }
            _this._lastTouchTarget = event.target;
            _this._touchTimeout = setTimeout(function () { return _this._lastTouchTarget = null; }, TOUCH_BUFFER_MS);
        }, true);
        // Make a note of when the window regains focus, so we can restore the origin info for the
        // focused element.
        window.addEventListener('focus', function () {
            _this._windowFocused = true;
            setTimeout(function () { return _this._windowFocused = false; }, 0);
        });
    };
    /**
     * Sets the focus classes on the element based on the given focus origin.
     * @param element The element to update the classes on.
     * @param origin The focus origin.
     */
    FocusOriginMonitor.prototype._setClasses = function (element, origin) {
        var renderer = this._elementInfo.get(element).renderer;
        renderer.setElementClass(element, 'cdk-focused', !!origin);
        renderer.setElementClass(element, 'cdk-touch-focused', origin === 'touch');
        renderer.setElementClass(element, 'cdk-keyboard-focused', origin === 'keyboard');
        renderer.setElementClass(element, 'cdk-mouse-focused', origin === 'mouse');
        renderer.setElementClass(element, 'cdk-program-focused', origin === 'program');
    };
    /**
     * Sets the origin and schedules an async function to clear it at the end of the event queue.
     * @param origin The origin to set.
     */
    FocusOriginMonitor.prototype._setOriginForCurrentEventQueue = function (origin) {
        var _this = this;
        this._origin = origin;
        setTimeout(function () { return _this._origin = null; }, 0);
    };
    /**
     * Checks whether the given focus event was caused by a touchstart event.
     * @param event The focus event to check.
     * @returns Whether the event was caused by a touch.
     */
    FocusOriginMonitor.prototype._wasCausedByTouch = function (event) {
        // Note(mmalerba): This implementation is not quite perfect, there is a small edge case.
        // Consider the following dom structure:
        //
        // <div #parent tabindex="0" cdkFocusClasses>
        //   <div #child (click)="#parent.focus()"></div>
        // </div>
        //
        // If the user touches the #child element and the #parent is programmatically focused as a
        // result, this code will still consider it to have been caused by the touch event and will
        // apply the cdk-touch-focused class rather than the cdk-program-focused class. This is a
        // relatively small edge-case that can be worked around by using
        // focusVia(parentEl, renderer,  'program') to focus the parent element.
        //
        // If we decide that we absolutely must handle this case correctly, we can do so by listening
        // for the first focus event after the touchstart, and then the first blur event after that
        // focus event. When that blur event fires we know that whatever follows is not a result of the
        // touchstart.
        var focusTarget = event.target;
        return this._lastTouchTarget instanceof Node && focusTarget instanceof Node &&
            (focusTarget === this._lastTouchTarget || focusTarget.contains(this._lastTouchTarget));
    };
    /**
     * Handles focus events on a registered element.
     * @param event The focus event.
     * @param element The monitored element.
     */
    FocusOriginMonitor.prototype._onFocus = function (event, element) {
        // NOTE(mmalerba): We currently set the classes based on the focus origin of the most recent
        // focus event affecting the monitored element. If we want to use the origin of the first event
        // instead we should check for the cdk-focused class here and return if the element already has
        // it. (This only matters for elements that have includesChildren = true).
        // If we are not counting child-element-focus as focused, make sure that the event target is the
        // monitored element itself.
        if (!this._elementInfo.get(element).checkChildren && element !== event.target) {
            return;
        }
        // If we couldn't detect a cause for the focus event, it's due to one of three reasons:
        // 1) The window has just regained focus, in which case we want to restore the focused state of
        //    the element from before the window blurred.
        // 2) It was caused by a touch event, in which case we mark the origin as 'touch'.
        // 3) The element was programmatically focused, in which case we should mark the origin as
        //    'program'.
        if (!this._origin) {
            if (this._windowFocused && this._lastFocusOrigin) {
                this._origin = this._lastFocusOrigin;
            }
            else if (this._wasCausedByTouch(event)) {
                this._origin = 'touch';
            }
            else {
                this._origin = 'program';
            }
        }
        this._setClasses(element, this._origin);
        this._elementInfo.get(element).subject.next(this._origin);
        this._lastFocusOrigin = this._origin;
        this._origin = null;
    };
    /**
     * Handles blur events on a registered element.
     * @param event The blur event.
     * @param element The monitored element.
     */
    FocusOriginMonitor.prototype._onBlur = function (event, element) {
        // If we are counting child-element-focus as focused, make sure that we aren't just blurring in
        // order to focus another child of the monitored element.
        if (this._elementInfo.get(element).checkChildren && event.relatedTarget instanceof Node &&
            element.contains(event.relatedTarget)) {
            return;
        }
        this._setClasses(element, null);
        this._elementInfo.get(element).subject.next(null);
    };
    FocusOriginMonitor = __decorate$29([
        _angular_core.Injectable(), 
        __metadata$29('design:paramtypes', [_angular_core.NgZone])
    ], FocusOriginMonitor);
    return FocusOriginMonitor;
}());
/**
 * Directive that determines how a particular element was focused (via keyboard, mouse, touch, or
 * programmatically) and adds corresponding classes to the element.
 *
 * There are two variants of this directive:
 * 1) cdkMonitorElementFocus: does not consider an element to be focused if one of its children is
 *    focused.
 * 2) cdkMonitorSubtreeFocus: considers an element focused if it or any of its children are focused.
 */
var CdkMonitorFocus = (function () {
    function CdkMonitorFocus(_elementRef, _focusOriginMonitor, renderer) {
        var _this = this;
        this._elementRef = _elementRef;
        this._focusOriginMonitor = _focusOriginMonitor;
        this.cdkFocusChange = new _angular_core.EventEmitter();
        this._focusOriginMonitor.monitor(this._elementRef.nativeElement, renderer, this._elementRef.nativeElement.hasAttribute('cdkMonitorSubtreeFocus'))
            .subscribe(function (origin) { return _this.cdkFocusChange.emit(origin); });
    }
    CdkMonitorFocus.prototype.ngOnDestroy = function () {
        this._focusOriginMonitor.unmonitor(this._elementRef.nativeElement);
    };
    __decorate$29([
        _angular_core.Output(), 
        __metadata$29('design:type', Object)
    ], CdkMonitorFocus.prototype, "cdkFocusChange", void 0);
    CdkMonitorFocus = __decorate$29([
        _angular_core.Directive({
            selector: '[cdkMonitorElementFocus], [cdkMonitorSubtreeFocus]',
        }), 
        __metadata$29('design:paramtypes', [_angular_core.ElementRef, FocusOriginMonitor, _angular_core.Renderer])
    ], CdkMonitorFocus);
    return CdkMonitorFocus;
}());
function FOCUS_ORIGIN_MONITOR_PROVIDER_FACTORY(parentDispatcher, ngZone) {
    return parentDispatcher || new FocusOriginMonitor(ngZone);
}
var FOCUS_ORIGIN_MONITOR_PROVIDER = {
    // If there is already a FocusOriginMonitor available, use that. Otherwise, provide a new one.
    provide: FocusOriginMonitor,
    deps: [[new _angular_core.Optional(), new _angular_core.SkipSelf(), FocusOriginMonitor], _angular_core.NgZone],
    useFactory: FOCUS_ORIGIN_MONITOR_PROVIDER_FACTORY
};

/**
 * Applies a CSS transform to an element, including browser-prefixed properties.
 * @param element
 * @param transformValue
 */
function applyCssTransform(element, transformValue) {
    // It's important to trim the result, because the browser will ignore the set operation
    // if the string contains only whitespace.
    var value = transformValue.trim();
    element.style.transform = value;
    element.style.webkitTransform = value;
}

var __decorate$28 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$28 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var StyleModule = (function () {
    function StyleModule() {
    }
    StyleModule = __decorate$28([
        _angular_core.NgModule({
            declarations: [CdkMonitorFocus],
            exports: [CdkMonitorFocus],
            providers: [FOCUS_ORIGIN_MONITOR_PROVIDER],
        }), 
        __metadata$28('design:paramtypes', [])
    ], StyleModule);
    return StyleModule;
}());

/** @docs-private */
var AnimationCurves = (function () {
    function AnimationCurves() {
    }
    AnimationCurves.STANDARD_CURVE = 'cubic-bezier(0.4,0.0,0.2,1)';
    AnimationCurves.DECELERATION_CURVE = 'cubic-bezier(0.0,0.0,0.2,1)';
    AnimationCurves.ACCELERATION_CURVE = 'cubic-bezier(0.4,0.0,1,1)';
    AnimationCurves.SHARP_CURVE = 'cubic-bezier(0.4,0.0,0.6,1)';
    return AnimationCurves;
}());
/** @docs-private */
var AnimationDurations = (function () {
    function AnimationDurations() {
    }
    AnimationDurations.COMPLEX = '375ms';
    AnimationDurations.ENTERING = '225ms';
    AnimationDurations.EXITING = '195ms';
    return AnimationDurations;
}());

/** Coerces a data-bound value (typically a string) to a number. */
function coerceNumberProperty(value, fallbackValue) {
    if (fallbackValue === void 0) { fallbackValue = 0; }
    // parseFloat(value) handles most of the cases we're interested in (it treats null, empty string,
    // and other non-number values as NaN, where Number just uses 0) but it considers the string
    // '123hello' to be a valid number. Therefore we also check if Number(value) is NaN.
    return isNaN(parseFloat(value)) || isNaN(Number(value)) ? fallbackValue : Number(value);
}

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var MdCoreModule = (function () {
    function MdCoreModule() {
    }
    /** @deprecated */
    MdCoreModule.forRoot = function () {
        return {
            ngModule: MdCoreModule,
            providers: [],
        };
    };
    MdCoreModule = __decorate([
        _angular_core.NgModule({
            imports: [
                MdLineModule,
                RtlModule,
                MdRippleModule,
                ObserveContentModule,
                PortalModule,
                OverlayModule,
                A11yModule,
                MdOptionModule,
                MdSelectionModule,
            ],
            exports: [
                MdLineModule,
                RtlModule,
                MdRippleModule,
                ObserveContentModule,
                PortalModule,
                OverlayModule,
                A11yModule,
                MdOptionModule,
                MdSelectionModule,
            ],
        }), 
        __metadata('design:paramtypes', [])
    ], MdCoreModule);
    return MdCoreModule;
}());

var __decorate$32 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$32 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var Md2Accordion = (function () {
    function Md2Accordion() {
        this.class = '';
        this.close = new _angular_core.EventEmitter();
        this.open = new _angular_core.EventEmitter();
        this.tabs = [];
    }
    Object.defineProperty(Md2Accordion.prototype, "multiple", {
        get: function () { return this._multiple; },
        set: function (value) { this._multiple = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    /**
     * Add or append tab in accordion
     * @param tab object of Md2AccordionTab
     */
    Md2Accordion.prototype.addTab = function (tab) {
        this.tabs.push(tab);
    };
    __decorate$32([
        _angular_core.Input(), 
        __metadata$32('design:type', Boolean)
    ], Md2Accordion.prototype, "multiple", null);
    __decorate$32([
        _angular_core.Input(), 
        __metadata$32('design:type', String)
    ], Md2Accordion.prototype, "class", void 0);
    __decorate$32([
        _angular_core.Output(), 
        __metadata$32('design:type', _angular_core.EventEmitter)
    ], Md2Accordion.prototype, "close", void 0);
    __decorate$32([
        _angular_core.Output(), 
        __metadata$32('design:type', _angular_core.EventEmitter)
    ], Md2Accordion.prototype, "open", void 0);
    Md2Accordion = __decorate$32([
        _angular_core.Component({selector: 'md2-accordion',
            template: "<ng-content></ng-content>",
            styles: [".md2-accordion { display: block; } md2-accordion-tab { position: relative; display: block; outline: 0; border: 0; border-width: 0 0 1px; border-style: solid; border-color: rgba(0, 0, 0, 0.12); box-sizing: border-box; } md2-accordion-tab[hidden] { display: none; } md2-accordion-tab.md2-accordion-tab-active { border-color: rgba(0, 0, 0, 0.12); } md2-accordion-tab .md2-accordion-header { position: relative; border-radius: 0; color: rgba(0, 0, 0, 0.85); font-weight: 500; cursor: pointer; display: block; align-items: inherit; line-height: 40px; margin: 0; max-height: 40px; overflow: hidden; padding: 0 35px 0 16px; text-align: left; text-decoration: none; white-space: nowrap; width: 100%; box-sizing: border-box; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; -webkit-user-drag: none; } md2-accordion-tab.md2-accordion-tab-active .md2-accordion-header { color: #106cc8; } md2-accordion-tab.md2-accordion-tab-disabled .md2-accordion-header { pointer-events: none; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; -webkit-user-drag: none; opacity: 0.5; cursor: default; } md2-accordion-tab .md2-accordion-header-icon { position: absolute; top: 12px; right: 17px; width: 8px; height: 8px; overflow: hidden; display: inline-block; border-width: 0 2px 2px 0; border-style: solid; border-color: rgba(0, 0, 0, 0.54); transform: rotate(45deg); transition: 300ms ease-in-out; } md2-accordion-tab.md2-accordion-tab-active .md2-accordion-header-icon { transform: rotate(225deg); top: 16px; } md2-accordion-tab .md2-accordion-tab-content { position: relative; display: none; padding: 16px; } md2-accordion-tab.md2-accordion-tab-active .md2-accordion-tab-content { display: block; } /*# sourceMappingURL=accordion.css.map */ "],
            host: {
                '[class]': 'class',
                '[class.md2-accordion]': 'true'
            },
            encapsulation: _angular_core.ViewEncapsulation.None
        }), 
        __metadata$32('design:paramtypes', [])
    ], Md2Accordion);
    return Md2Accordion;
}());

var __decorate$33 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$33 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var Md2AccordionHeader = (function () {
    function Md2AccordionHeader() {
    }
    Md2AccordionHeader = __decorate$33([
        _angular_core.Directive({ selector: 'md2-accordion-header' }), 
        __metadata$33('design:paramtypes', [])
    ], Md2AccordionHeader);
    return Md2AccordionHeader;
}());
var Md2AccordionTab = (function () {
    function Md2AccordionTab(_accordion) {
        this._accordion = _accordion;
        this._disabled = false;
        this._active = false;
        this._accordion.addTab(this);
    }
    Object.defineProperty(Md2AccordionTab.prototype, "active", {
        get: function () { return this._active; },
        set: function (value) {
            this._active = coerceBooleanProperty(value);
            if (this._active) {
                for (var i = 0; i < this._accordion.tabs.length; i++) {
                    if (this._accordion.tabs[i] !== this) {
                        this._accordion.tabs[i].active = false;
                    }
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2AccordionTab.prototype, "disabled", {
        get: function () { return this._disabled; },
        set: function (value) { this._disabled = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    /**
     * Toggle the accordion
     * @param event
     * @return if it is disabled
     */
    Md2AccordionTab.prototype._handleClick = function (event) {
        if (this.disabled) {
            event.preventDefault();
            return;
        }
        var index = this.findTabIndex();
        if (this.active) {
            this.active = !this.active;
            this._accordion.close.emit({ originalEvent: event, index: index });
        }
        else if (!this._accordion.multiple) {
            for (var i = 0; i < this._accordion.tabs.length; i++) {
                this._accordion.tabs[i].active = false;
            }
            this._active = true;
            this._accordion.open.emit({ originalEvent: event, index: index });
        }
        else {
            this._active = true;
            this._accordion.open.emit({ originalEvent: event, index: index });
        }
        event.preventDefault();
    };
    /**
     * Find index of specific tab of accordion
     * @return index number of this tab
     */
    Md2AccordionTab.prototype.findTabIndex = function () {
        var index = -1;
        for (var i = 0; i < this._accordion.tabs.length; i++) {
            if (this._accordion.tabs[i] === this) {
                index = i;
                break;
            }
        }
        return index;
    };
    __decorate$33([
        _angular_core.Input(), 
        __metadata$33('design:type', String)
    ], Md2AccordionTab.prototype, "header", void 0);
    __decorate$33([
        _angular_core.Input(), 
        __metadata$33('design:type', Boolean)
    ], Md2AccordionTab.prototype, "active", null);
    __decorate$33([
        _angular_core.Input(), 
        __metadata$33('design:type', Boolean)
    ], Md2AccordionTab.prototype, "disabled", null);
    Md2AccordionTab = __decorate$33([
        _angular_core.Component({selector: 'md2-accordion-tab',
            template: "\n    <div class=\"md2-accordion-header\" (click)=\"_handleClick($event)\">\n      <span>{{header}}</span>\n      <ng-content select=\"md2-accordion-header\"></ng-content>\n      <span class=\"md2-accordion-header-icon\"></span>\n    </div>\n    <div class=\"md2-accordion-tab-content\">\n      <ng-content></ng-content>\n    </div>\n  ",
            styles: [".md2-accordion { display: block; } md2-accordion-tab { position: relative; display: block; outline: 0; border: 0; border-width: 0 0 1px; border-style: solid; border-color: rgba(0, 0, 0, 0.12); box-sizing: border-box; } md2-accordion-tab[hidden] { display: none; } md2-accordion-tab.md2-accordion-tab-active { border-color: rgba(0, 0, 0, 0.12); } md2-accordion-tab .md2-accordion-header { position: relative; border-radius: 0; color: rgba(0, 0, 0, 0.85); font-weight: 500; cursor: pointer; display: block; align-items: inherit; line-height: 40px; margin: 0; max-height: 40px; overflow: hidden; padding: 0 35px 0 16px; text-align: left; text-decoration: none; white-space: nowrap; width: 100%; box-sizing: border-box; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; -webkit-user-drag: none; } md2-accordion-tab.md2-accordion-tab-active .md2-accordion-header { color: #106cc8; } md2-accordion-tab.md2-accordion-tab-disabled .md2-accordion-header { pointer-events: none; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; -webkit-user-drag: none; opacity: 0.5; cursor: default; } md2-accordion-tab .md2-accordion-header-icon { position: absolute; top: 12px; right: 17px; width: 8px; height: 8px; overflow: hidden; display: inline-block; border-width: 0 2px 2px 0; border-style: solid; border-color: rgba(0, 0, 0, 0.54); transform: rotate(45deg); transition: 300ms ease-in-out; } md2-accordion-tab.md2-accordion-tab-active .md2-accordion-header-icon { transform: rotate(225deg); top: 16px; } md2-accordion-tab .md2-accordion-tab-content { position: relative; display: none; padding: 16px; } md2-accordion-tab.md2-accordion-tab-active .md2-accordion-tab-content { display: block; } /*# sourceMappingURL=accordion.css.map */ "],
            host: {
                'role': 'accordion-tab',
                '[class.md2-accordion-tab-active]': 'active',
                '[class.md2-accordion-tab-disabled]': 'disabled'
            },
            encapsulation: _angular_core.ViewEncapsulation.None
        }), 
        __metadata$33('design:paramtypes', [Md2Accordion])
    ], Md2AccordionTab);
    return Md2AccordionTab;
}());

var __decorate$31 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$31 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var MD2_ACCORDION_DIRECTIVES = [Md2Accordion, Md2AccordionTab, Md2AccordionHeader];
var Md2AccordionModule = (function () {
    function Md2AccordionModule() {
    }
    Md2AccordionModule.forRoot = function () {
        return {
            ngModule: Md2AccordionModule,
            providers: []
        };
    };
    Md2AccordionModule = __decorate$31([
        _angular_core.NgModule({
            imports: [_angular_common.CommonModule],
            exports: MD2_ACCORDION_DIRECTIVES,
            declarations: MD2_ACCORDION_DIRECTIVES,
        }), 
        __metadata$31('design:paramtypes', [])
    ], Md2AccordionModule);
    return Md2AccordionModule;
}());

var __decorate$35 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$35 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var HighlightPipe = (function () {
    function HighlightPipe() {
    }
    /**
     * Transform function
     * @param value string
     * @param query string filter value
     * @return filtered string with markup
     */
    HighlightPipe.prototype.transform = function (value, query) {
        if (query.length < 1) {
            return value;
        }
        return query ? value.replace(new RegExp(this._escapeRegexp(query), 'gi'), '<span class="highlight">$&</span>') : value;
    };
    /**
     * filter pipe
     * @param queryToEscape
     * @return queryToEscape with replace string
     */
    HighlightPipe.prototype._escapeRegexp = function (queryToEscape) {
        return queryToEscape.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1');
    };
    HighlightPipe = __decorate$35([
        _angular_core.Pipe({ name: 'highlight' }), 
        __metadata$35('design:paramtypes', [])
    ], HighlightPipe);
    return HighlightPipe;
}());

var __decorate$34 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$34 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var Item = (function () {
    function Item(source, textKey, valueKey) {
        if (typeof source === 'string') {
            this.text = this.value = source;
        }
        if (typeof source === 'object') {
            this.text = source[textKey];
            this.value = valueKey ? source[valueKey] : source;
        }
    }
    return Item;
}());
var nextId = 0;
var MD2_AUTOCOMPLETE_CONTROL_VALUE_ACCESSOR = {
    provide: _angular_forms.NG_VALUE_ACCESSOR,
    useExisting: _angular_core.forwardRef(function () { return Md2Autocomplete; }),
    multi: true
};
/** Change event object emitted by Md2Autocomplete. */
var Md2AutocompleteChange = (function () {
    function Md2AutocompleteChange() {
    }
    return Md2AutocompleteChange;
}());
var Md2Autocomplete = (function () {
    function Md2Autocomplete(_element) {
        this._element = _element;
        this.change = new _angular_core.EventEmitter();
        this.textChange = new _angular_core.EventEmitter();
        this._value = '';
        this._readonly = false;
        this._required = false;
        this._disabled = false;
        this._isInitialized = false;
        this._onChange = function (value) { };
        this._onTouched = function () { };
        this._items = [];
        this._list = [];
        this.selectedItem = null;
        this.noBlur = false;
        this._focusedOption = 0;
        this._inputValue = '';
        this._inputFocused = false;
        this.id = 'md2-autocomplete-' + (++nextId);
        this.tabindex = 0;
        this.placeholder = '';
        this.textKey = 'text';
        this.valueKey = null;
        this.minLength = 1;
    }
    Md2Autocomplete.prototype.ngAfterContentInit = function () { this._isInitialized = true; };
    Object.defineProperty(Md2Autocomplete.prototype, "readonly", {
        get: function () { return this._readonly; },
        set: function (value) { this._readonly = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Autocomplete.prototype, "required", {
        get: function () { return this._required; },
        set: function (value) { this._required = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Autocomplete.prototype, "disabled", {
        get: function () { return this._disabled; },
        set: function (value) { this._disabled = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Autocomplete.prototype, "items", {
        set: function (value) { this._items = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Autocomplete.prototype, "value", {
        get: function () { return this._value; },
        set: function (value) {
            var _this = this;
            if (value !== this._value) {
                this._value = value;
                this._inputValue = '';
                if (value) {
                    var selItm = this._items.find(function (i) { return _this.equals(_this.valueKey ?
                        i[_this.valueKey] : i, value); });
                    this.selectedItem = new Item(selItm, this.textKey, this.valueKey);
                    if (this.selectedItem) {
                        this._inputValue = this.selectedItem.text;
                    }
                }
                if (!this._inputValue) {
                    this._inputValue = '';
                }
                if (this._isInitialized) {
                    this._emitChangeEvent();
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Compare two vars or objects
     * @param o1 compare first object
     * @param o2 compare second object
     * @return boolean comparation result
     */
    Md2Autocomplete.prototype.equals = function (o1, o2) {
        if (o1 === o2) {
            return true;
        }
        if (o1 === null || o2 === null) {
            return false;
        }
        if (o1 !== o1 && o2 !== o2) {
            return true;
        }
        var t1 = typeof o1, t2 = typeof o2, key, keySet;
        if (t1 === t2 && t1 === 'object') {
            keySet = Object.create(null);
            for (key in o1) {
                if (!this.equals(o1[key], o2[key])) {
                    return false;
                }
                keySet[key] = true;
            }
            for (key in o2) {
                if (!(key in keySet) && key.charAt(0) !== '$' && o2[key]) {
                    return false;
                }
            }
            return true;
        }
        return false;
    };
    Object.defineProperty(Md2Autocomplete.prototype, "isMenuVisible", {
        get: function () {
            return ((this._inputFocused || this.noBlur) && this._list && this._list.length &&
                !this.selectedItem) && !this.readonly ? true : false;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * update scroll of suggestion menu
     */
    Md2Autocomplete.prototype.updateScroll = function () {
        if (this._focusedOption < 0) {
            return;
        }
        var menuContainer = this._element.nativeElement.querySelector('.md2-autocomplete-menu');
        if (!menuContainer) {
            return;
        }
        var choices = menuContainer.querySelectorAll('.md2-option');
        if (choices.length < 1) {
            return;
        }
        var highlighted = choices[this._focusedOption];
        if (!highlighted) {
            return;
        }
        var top = highlighted.offsetTop + highlighted.clientHeight - menuContainer.scrollTop;
        var height = menuContainer.offsetHeight;
        if (top > height) {
            menuContainer.scrollTop += top - height;
        }
        else if (top < highlighted.clientHeight) {
            menuContainer.scrollTop -= highlighted.clientHeight - top;
        }
    };
    /**
     * input event listner
     * @param event
     */
    Md2Autocomplete.prototype._handleKeydown = function (event) {
        var _this = this;
        if (this.disabled) {
            return;
        }
        this.textChange.emit(this._inputValue);
        switch (event.keyCode) {
            case TAB:
                this._handleMouseLeave();
                break;
            case ESCAPE:
                event.stopPropagation();
                event.preventDefault();
                if (this._inputValue) {
                    this._onClear();
                }
                break;
            case ENTER:
                event.preventDefault();
                event.stopPropagation();
                if (this.isMenuVisible) {
                    this._selectOption(event, this._focusedOption);
                }
                break;
            case DOWN_ARROW:
                event.preventDefault();
                event.stopPropagation();
                if (this.isMenuVisible) {
                    this._focusedOption = (this._focusedOption === this._list.length - 1) ? 0 :
                        Math.min(this._focusedOption + 1, this._list.length - 1);
                    this.updateScroll();
                }
                break;
            case UP_ARROW:
                event.preventDefault();
                event.stopPropagation();
                if (this.isMenuVisible) {
                    this._focusedOption = (this._focusedOption === 0) ? this._list.length - 1 :
                        Math.max(0, this._focusedOption - 1);
                    this.updateScroll();
                }
                break;
            default:
                setTimeout(function () {
                    _this.updateItems(new RegExp(_this._inputValue, 'ig'));
                }, 10);
        }
    };
    /**
     * select option
     * @param event
     * @param index of selected item
     */
    Md2Autocomplete.prototype._selectOption = function (event, index) {
        event.preventDefault();
        event.stopPropagation();
        this.selectedItem = this._list[index];
        this._inputValue = this._list[index].text;
        this.updateValue();
        this._handleMouseLeave();
    };
    /**
     * clear selected suggestion
     */
    Md2Autocomplete.prototype._onClear = function () {
        if (this.disabled) {
            return;
        }
        this._inputValue = '';
        this.selectedItem = null;
        this.updateItems(new RegExp(this._inputValue, 'ig'));
        this._value = this.selectedItem ? this.selectedItem.value : this.selectedItem;
        this.updateValue();
    };
    /**
     * update value
     */
    Md2Autocomplete.prototype.updateValue = function () {
        this._value = this.selectedItem ? this.selectedItem.value : this.selectedItem;
        this._emitChangeEvent();
        this.onFocus();
    };
    /**
     * component focus listener
     */
    Md2Autocomplete.prototype.onFocus = function () {
        if (this.disabled) {
            return;
        }
        this._element.nativeElement.querySelector('input').focus();
    };
    /**
     * input focus listener
     */
    Md2Autocomplete.prototype._handleFocus = function () {
        this._inputFocused = true;
        this.updateItems(new RegExp(this._inputValue, 'ig'));
        this._focusedOption = 0;
    };
    /**
     * input blur listener
     */
    Md2Autocomplete.prototype._handleBlur = function () {
        this._inputFocused = false;
        this._onTouched();
    };
    /**
     * suggestion menu mouse enter listener
     */
    Md2Autocomplete.prototype._handleMouseEnter = function () { this.noBlur = true; };
    /**
     * suggestion menu mouse leave listener
     */
    Md2Autocomplete.prototype._handleMouseLeave = function () { this.noBlur = false; };
    /**
     * Update suggestion to filter the query
     * @param query
     */
    Md2Autocomplete.prototype.updateItems = function (query) {
        var _this = this;
        if (this._inputValue.length < this.minLength) {
            this._list = [];
        }
        else {
            this._list = this._items.map(function (i) { return new Item(i, _this.textKey, _this.valueKey); }).filter(function (i) { return query.test(i.text); });
            if (this._list.length && this._list[0].text !== this._inputValue) {
                this.selectedItem = null;
            }
        }
    };
    Md2Autocomplete.prototype._emitChangeEvent = function () {
        var event = new Md2AutocompleteChange();
        event.source = this;
        event.value = this._value;
        this._onChange(event.value);
        this.change.emit(event);
    };
    Md2Autocomplete.prototype.writeValue = function (value) {
        var _this = this;
        if (value !== this._value) {
            this._value = value;
            this._inputValue = '';
            if (value) {
                var selItm = this._items.find(function (i) { return _this.equals(_this.valueKey ?
                    i[_this.valueKey] : i, value); });
                this.selectedItem = new Item(selItm, this.textKey, this.valueKey);
                if (this.selectedItem) {
                    this._inputValue = this.selectedItem.text;
                }
            }
            if (!this._inputValue) {
                this._inputValue = '';
            }
        }
    };
    Md2Autocomplete.prototype.registerOnChange = function (fn) { this._onChange = fn; };
    Md2Autocomplete.prototype.registerOnTouched = function (fn) { this._onTouched = fn; };
    __decorate$34([
        _angular_core.Output(), 
        __metadata$34('design:type', _angular_core.EventEmitter)
    ], Md2Autocomplete.prototype, "change", void 0);
    __decorate$34([
        _angular_core.Output(), 
        __metadata$34('design:type', Object)
    ], Md2Autocomplete.prototype, "textChange", void 0);
    __decorate$34([
        _angular_core.Input(), 
        __metadata$34('design:type', String)
    ], Md2Autocomplete.prototype, "id", void 0);
    __decorate$34([
        _angular_core.Input(), 
        __metadata$34('design:type', Number)
    ], Md2Autocomplete.prototype, "tabindex", void 0);
    __decorate$34([
        _angular_core.Input(), 
        __metadata$34('design:type', String)
    ], Md2Autocomplete.prototype, "placeholder", void 0);
    __decorate$34([
        _angular_core.Input('item-text'), 
        __metadata$34('design:type', String)
    ], Md2Autocomplete.prototype, "textKey", void 0);
    __decorate$34([
        _angular_core.Input('item-value'), 
        __metadata$34('design:type', String)
    ], Md2Autocomplete.prototype, "valueKey", void 0);
    __decorate$34([
        _angular_core.Input('min-length'), 
        __metadata$34('design:type', Number)
    ], Md2Autocomplete.prototype, "minLength", void 0);
    __decorate$34([
        _angular_core.Input(), 
        __metadata$34('design:type', Boolean)
    ], Md2Autocomplete.prototype, "readonly", null);
    __decorate$34([
        _angular_core.Input(), 
        __metadata$34('design:type', Boolean)
    ], Md2Autocomplete.prototype, "required", null);
    __decorate$34([
        _angular_core.Input(), 
        __metadata$34('design:type', Boolean)
    ], Md2Autocomplete.prototype, "disabled", null);
    __decorate$34([
        _angular_core.Input(), 
        __metadata$34('design:type', Array), 
        __metadata$34('design:paramtypes', [Array])
    ], Md2Autocomplete.prototype, "items", null);
    __decorate$34([
        _angular_core.Input(), 
        __metadata$34('design:type', Object)
    ], Md2Autocomplete.prototype, "value", null);
    Md2Autocomplete = __decorate$34([
        _angular_core.Component({selector: 'md2-autocomplete',
            template: "<div class=\"md2-autocomplete-trigger\" [class.is-focused]=\"_inputFocused || isMenuVisible\"> <input [(ngModel)]=\"_inputValue\" type=\"text\" tabs=\"false\" autocomplete=\"off\" [readonly]=\"readonly\" [tabindex]=\"disabled ? -1 : tabindex\" [disabled]=\"disabled\" class=\"md2-autocomplete-input\" (focus)=\"_handleFocus()\" (blur)=\"_handleBlur()\" (keydown)=\"_handleKeydown($event)\" (change)=\"$event.stopPropagation()\" /> <span class=\"md2-autocomplete-placeholder\" [class.has-value]=\"_inputValue\"> {{ placeholder }} </span> <svg *ngIf=\"_inputValue && !required && !disabled\" (click)=\"_onClear()\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"> <path d=\"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z\" /> </svg> </div> <ul *ngIf=\"isMenuVisible\" class=\"md2-autocomplete-menu\" (mouseenter)=\"_handleMouseEnter()\" (mouseleave)=\"_handleMouseLeave()\"> <li class=\"md2-option\" *ngFor=\"let l of _list; let i = index;\" [class.focus]=\"_focusedOption === i\" (click)=\"_selectOption($event, i)\"> <div class=\"md2-text\" [innerHtml]=\"l.text | highlight:_inputValue\"></div> </li> </ul> ",
            styles: ["md2-autocomplete { position: relative; display: block; margin: 18px 0; outline: none; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; -webkit-backface-visibility: hidden; backface-visibility: hidden; } md2-autocomplete.md2-autocomplete-disabled { pointer-events: none; cursor: default; } .md2-autocomplete-trigger { position: relative; display: block; width: 100%; padding: 2px 2px 1px; border-bottom: 1px solid rgba(0, 0, 0, 0.12); box-sizing: border-box; min-width: 64px; min-height: 26px; cursor: pointer; } .md2-autocomplete-trigger.is-focused { padding-bottom: 0; border-bottom: 2px solid #106cc8; } md2-autocomplete.ng-invalid.ng-touched:not(.md2-autocomplete-disabled) .md2-autocomplete-trigger { color: #f44336; border-bottom-color: #f44336; } md2-autocomplete.md2-autocomplete-disabled .md2-autocomplete-trigger { color: rgba(0, 0, 0, 0.38); border-color: transparent; background-image: linear-gradient(to right, rgba(0, 0, 0, 0.38) 0%, rgba(0, 0, 0, 0.38) 33%, transparent 0%); background-position: bottom -1px left 0; background-size: 4px 1px; background-repeat: repeat-x; cursor: default; } md2-autocomplete.md2-autocomplete-disabled .md2-autocomplete-trigger.is-focused { padding-bottom: 1px; border-bottom: 1px solid transparent; } .md2-autocomplete-input { width: 100%; height: 26px; font-size: 15px; outline: none; background: transparent; border: 0; box-sizing: border-box; } md2-autocomplete.md2-autocomplete-disabled .md2-autocomplete-input { color: rgba(0, 0, 0, 0.38); } .md2-autocomplete-placeholder { position: absolute; right: 26px; bottom: 100%; left: 0; max-width: 100%; padding-left: 3px; padding-right: 0; line-height: 1.4; color: rgba(0, 0, 0, 0.38); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; pointer-events: none; z-index: 1; transform: translate3d(0, 26px, 0) scale(1); transition: transform 400ms cubic-bezier(0.25, 0.8, 0.25, 1); transform-origin: left top; } [aria-required=true] .md2-autocomplete-placeholder::after { content: '*'; } .md2-autocomplete-trigger.is-focused .md2-autocomplete-placeholder { color: #106cc8; } .md2-autocomplete-trigger.is-focused .md2-autocomplete-placeholder, md2-autocomplete .md2-autocomplete-placeholder.has-value { transform: translate3d(0, 6px, 0) scale(0.75); } .md2-autocomplete-trigger svg { position: absolute; right: 0; top: 0; display: block; height: 100%; background: white; fill: currentColor; color: rgba(0, 0, 0, 0.54); } .md2-autocomplete-menu { position: absolute; left: 0; top: 100%; display: block; z-index: 10; width: 100%; margin: 0; padding: 8px 0; box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 2px 1px -1px rgba(0, 0, 0, 0.12); max-height: 256px; min-height: 48px; overflow-y: auto; background: white; } .md2-autocomplete-menu .md2-option { position: relative; display: block; color: #212121; cursor: pointer; width: auto; padding: 0 16px; height: 48px; line-height: 48px; transition: background 150ms linear; } .md2-autocomplete-menu .md2-option:hover, .md2-autocomplete-menu .md2-option.focus { background: #ededed; } .md2-autocomplete-menu .md2-option .md2-text { width: auto; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; font-size: 16px; } .md2-autocomplete-menu .highlight { color: #737373; } /*# sourceMappingURL=autocomplete.css.map */ "],
            providers: [MD2_AUTOCOMPLETE_CONTROL_VALUE_ACCESSOR],
            host: {
                'role': 'autocomplete',
                '[id]': 'id',
                '[attr.aria-label]': 'placeholder',
                '[attr.aria-required]': 'required.toString()',
                '[attr.aria-disabled]': 'disabled.toString()',
                '[class.md2-autocomplete-disabled]': 'disabled',
            },
            encapsulation: _angular_core.ViewEncapsulation.None
        }), 
        __metadata$34('design:paramtypes', [_angular_core.ElementRef])
    ], Md2Autocomplete);
    return Md2Autocomplete;
}());
var MD2_AUTOCOMPLETE_DIRECTIVES = [Md2Autocomplete, HighlightPipe];
var Md2AutocompleteModule = (function () {
    function Md2AutocompleteModule() {
    }
    Md2AutocompleteModule.forRoot = function () {
        return {
            ngModule: Md2AutocompleteModule,
            providers: []
        };
    };
    Md2AutocompleteModule = __decorate$34([
        _angular_core.NgModule({
            imports: [_angular_common.CommonModule, _angular_forms.FormsModule],
            exports: MD2_AUTOCOMPLETE_DIRECTIVES,
            declarations: MD2_AUTOCOMPLETE_DIRECTIVES,
        }), 
        __metadata$34('design:paramtypes', [])
    ], Md2AutocompleteModule);
    return Md2AutocompleteModule;
}());

var __decorate$36 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$36 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var noop = function () { };
var Chip = (function () {
    function Chip(source, textKey, valueKey) {
        if (typeof source === 'string') {
            this.text = this.value = source;
        }
        if (typeof source === 'object') {
            this.text = source[textKey];
            this.value = valueKey ? source[valueKey] : source;
        }
    }
    return Chip;
}());
var nextId$1 = 0;
var MD2_CHIPS_CONTROL_VALUE_ACCESSOR = {
    provide: _angular_forms.NG_VALUE_ACCESSOR,
    useExisting: _angular_core.forwardRef(function () { return Md2Chips; }),
    multi: true
};
var Md2Chips = (function () {
    function Md2Chips(elementRef) {
        this.elementRef = elementRef;
        this.tabindex = 0;
        this.addOnComma = true;
        this.addOnEnter = true;
        this.addOnPaste = true;
        this.addOnSpace = false;
        this.allowedPattern = /.+/;
        this.pasteSplitPattern = ',';
        this.placeholder = 'Add New';
        this.isAutoComplete = false;
        this.isRemovable = true;
        this.readonly = false;
        this.minChips = 0;
        this.maxChips = 10000;
        this.id = 'md2-chips-' + (++nextId$1);
        this.autocompleteItemText = 'text';
        this.autocompleteItemValue = 'value';
        this.textKey = 'text';
        this.valueKey = 'value';
        this.change = new _angular_core.EventEmitter();
        this.onTouchedCallback = noop;
        this.onChangeCallback = noop;
        this.chipItemList = [];
        this.inputValue = '';
        this._value = '';
        this.selectedChip = -1;
        this.inputFocused = false;
        this.isEmptyAutoComplete = true;
    }
    Object.defineProperty(Md2Chips.prototype, "element", {
        get: function () {
            var elements = { root: this.elementRef.nativeElement, mainDiv: null, template: null };
            elements.mainDiv = elements.root.querySelector('.md2-chips-container');
            elements.template = elements.mainDiv.querySelector('.md2-template');
            return elements;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Chips.prototype, "value", {
        get: function () { return this._value; },
        set: function (value) { this.setValue(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Chips.prototype, "setValue", {
        /**
         * set value
         * @param value
         */
        set: function (value) {
            if (value !== this._value) {
                this._value = value;
                this.chipItemList = [];
                if (value) {
                    if (value && value.length && typeof value[0] === 'object' && Array.isArray(value)) {
                        for (var i = 0; i < value.length; i++) {
                            this.chipItemList.push(new Chip(value[i], this.textKey, this.valueKey));
                        }
                        this.isObject = true;
                    }
                    else if (value && value.length && typeof value[0] === 'string' && Array.isArray(value)) {
                        this.chipItemList = value;
                        this.isObject = false;
                    }
                }
            }
            this.onChangeCallback(value);
            this.change.emit(this.chipItemList);
        },
        enumerable: true,
        configurable: true
    });
    Md2Chips.prototype.changeAutocomplete = function (value) {
        if (value) {
            var objText = value.value;
            this.addNewChip(objText);
            this.item = null;
        }
    };
    Md2Chips.prototype.ngAfterContentInit = function () {
        var elements = this.element;
        this.splitRegExp = new RegExp(this.pasteSplitPattern);
        if (elements.template) {
            this.templateHtmlString = elements.template.innerHTML;
        }
    };
    // check autocomplete input is empty or not
    Md2Chips.prototype.valueupdate = function (evt) {
        this.isEmptyAutoComplete = evt ? false : true;
    };
    /**
     * input key listener
     * @param event
     */
    Md2Chips.prototype.inputChanged = function (event) {
        var key = event.keyCode;
        switch (key) {
            // back space
            case exports.KeyCodes.BACKSPACE:
                this.backspaceEvent();
                break;
            // delete
            case exports.KeyCodes.DELETE:
                this.backspaceEvent();
                break;
            // left arrow
            case exports.KeyCodes.LEFT_ARROW:
                if (this.isAutoComplete && this.isEmptyAutoComplete) {
                    this.leftArrowKeyEvents();
                }
                else if (!this.isAutoComplete && !this.inputValue) {
                    this.leftArrowKeyEvents();
                }
                break;
            // right arrow
            case exports.KeyCodes.RIGHT_ARROW:
                if (this.isAutoComplete && this.isEmptyAutoComplete) {
                    this.rightArrowKeyEvents();
                }
                else if (!this.isAutoComplete && !this.inputValue) {
                    this.rightArrowKeyEvents();
                }
                break;
            // enter
            case exports.KeyCodes.ENTER:
                if (this.addOnEnter) {
                    this.addNewChip(this.inputValue);
                    event.preventDefault();
                }
                break;
            // comma
            case exports.KeyCodes.COMMA:
                if (this.addOnComma) {
                    this.addNewChip(this.inputValue);
                    event.preventDefault();
                }
                break;
            // space
            case exports.KeyCodes.SPACE:
                if (this.addOnSpace) {
                    this.addNewChip(this.inputValue);
                    event.preventDefault();
                }
                break;
            default:
                break;
        }
    };
    Md2Chips.prototype._handleFocus = function () {
        if (this.readonly) {
            return;
        }
        if (!this.isAutoComplete) {
            this.elementRef.nativeElement.querySelector('input.chip-input').focus();
        }
        this._resetSelected();
    };
    Md2Chips.prototype.inputBlurred = function (event) {
        this.inputFocused = false;
        this.addNewChip(this.inputValue);
    };
    Md2Chips.prototype.inputFocus = function (event) {
        if (this.readonly) {
            return;
        }
        this.inputFocused = true;
    };
    Md2Chips.prototype.inputPaste = function (event) {
        var _this = this;
        var clipboardData = event.clipboardData ||
            (event.originalEvent && event.originalEvent.clipboardData);
        var pastedString = clipboardData.getData('text/plain');
        var chips = this.addRegExpString(pastedString);
        var chipsToAdd = chips.filter(function (chip) { return _this._isValid(chip); });
        this.addNewChip(chipsToAdd);
        setTimeout(function () { return _this._resetInput(); });
    };
    Md2Chips.prototype.leftArrowKeyEvents = function () {
        event.preventDefault();
        if (this.selectedChip) {
            if (this.selectedChip < 0) {
                this.selectedChip = this.chipItemList.length - 1;
            }
            else {
                this.selectedChip = this.selectedChip - 1;
            }
        }
    };
    Md2Chips.prototype.rightArrowKeyEvents = function () {
        event.preventDefault();
        if (this.selectedChip != -1) {
            if (this.selectedChip >= this.chipItemList.length) {
                this.selectedChip = 0;
            }
            else {
                this.selectedChip = this.selectedChip + 1;
            }
        }
    };
    Md2Chips.prototype.addRegExpString = function (chipInputString) {
        chipInputString = chipInputString.trim();
        var chips = chipInputString.split(this.splitRegExp);
        return chips.filter(function (chip) { return !!chip; });
    };
    Md2Chips.prototype._isValid = function (chipString) {
        if (chipString) {
            var isExist = void 0;
            if (this.isObject) {
                isExist = this.chipItemList.filter(function (chip) { return chip.text === chipString.text; });
                return isExist.length ? false : true;
            }
            else if (this.chipItemList.indexOf(chipString) === -1) {
                return this.allowedPattern.test(chipString);
            }
        }
    };
    /**
    * add new chip
    * @param chips
    */
    Md2Chips.prototype.addNewChip = function (chips) {
        var validInput = this._isValid(chips);
        if (validInput) {
            if (this.maxChips) {
                if (this.chipItemList.length < this.maxChips) {
                    if (this.isObject && this.chipItemList.length > 0) {
                        var a = {};
                        a[this.textKey] = chips[this.autocompleteItemText];
                        a[this.valueKey] = chips[this.autocompleteItemValue];
                        this.chipItemList.push(new Chip(a, this.textKey, this.valueKey));
                    }
                    else {
                        this.chipItemList.push(chips);
                    }
                }
            }
            else {
                this.chipItemList.push(new Chip(chips, this.textKey, this.valueKey));
                this.item = null;
            }
        }
        this._resetSelected();
        this._resetInput();
        this.updateValue();
    };
    /**
   * remove selected chip
   * @param chipIndexToRemove index of selected chip
   */
    Md2Chips.prototype.removeSelectedChip = function (chipIndexToRemove) {
        this.chipItemList.splice(chipIndexToRemove, 1);
        this._resetSelected();
        this.updateValue();
    };
    Md2Chips.prototype.backspaceEvent = function () {
        if (!this.inputValue.length && this.chipItemList.length &&
            this.isRemovable && this.isEmptyAutoComplete) {
            if (this.selectedChip != -1) {
                this.removeSelectedChip(this.selectedChip);
                this.selectedChip = this.chipItemList.length - 1;
            }
            else {
                this.selectedChip = this.chipItemList.length - 1;
            }
        }
    };
    Md2Chips.prototype._resetSelected = function () {
        this.selectedChip = -1;
    };
    Md2Chips.prototype._resetInput = function () {
        if (this.isAutoComplete) {
            this.chipInputForm.controls['autocomplete'].setValue('');
        }
        else {
            this.chipInputForm.controls['chipInput'].setValue('');
        }
    };
    /**
     * update value
     */
    Md2Chips.prototype.updateValue = function () {
        this._value = new Array();
        for (var i = 0; i < this.chipItemList.length; i++) {
            //if (this.isObject) {
            //  this._value.push(this.chipItemList[i].value);
            //} else {
            //  this._value.push(this.chipItemList[i]);
            //}
            this._value.push(this.chipItemList[i]);
        }
        this.onChangeCallback(this._value);
        this.change.emit(this._value);
    };
    Md2Chips.prototype.writeValue = function (value) {
        if (value !== this._value) {
            this._value = value;
            this.chipItemList = [];
            if (value) {
                if (value && value.length && typeof value[0] === 'object' && Array.isArray(value)) {
                    for (var i = 0; i < value.length; i++) {
                        this.chipItemList.push(new Chip(value[i], this.textKey, this.valueKey));
                    }
                    this.isObject = true;
                }
                else if (value && value.length && typeof value[0] === 'string' && Array.isArray(value)) {
                    this.chipItemList = value;
                    this.isObject = false;
                }
            }
        }
    };
    Md2Chips.prototype.registerOnChange = function (fn) { this.onChangeCallback = fn; };
    Md2Chips.prototype.registerOnTouched = function (fn) { this.onTouchedCallback = fn; };
    __decorate$36([
        _angular_core.Input(), 
        __metadata$36('design:type', Number)
    ], Md2Chips.prototype, "tabindex", void 0);
    __decorate$36([
        _angular_core.Input(), 
        __metadata$36('design:type', Boolean)
    ], Md2Chips.prototype, "addOnComma", void 0);
    __decorate$36([
        _angular_core.Input(), 
        __metadata$36('design:type', Boolean)
    ], Md2Chips.prototype, "addOnEnter", void 0);
    __decorate$36([
        _angular_core.Input(), 
        __metadata$36('design:type', Boolean)
    ], Md2Chips.prototype, "addOnPaste", void 0);
    __decorate$36([
        _angular_core.Input(), 
        __metadata$36('design:type', Boolean)
    ], Md2Chips.prototype, "addOnSpace", void 0);
    __decorate$36([
        _angular_core.Input(), 
        __metadata$36('design:type', RegExp)
    ], Md2Chips.prototype, "allowedPattern", void 0);
    __decorate$36([
        _angular_core.Input(), 
        __metadata$36('design:type', Array)
    ], Md2Chips.prototype, "ngModel", void 0);
    __decorate$36([
        _angular_core.Input(), 
        __metadata$36('design:type', String)
    ], Md2Chips.prototype, "pasteSplitPattern", void 0);
    __decorate$36([
        _angular_core.Input(), 
        __metadata$36('design:type', String)
    ], Md2Chips.prototype, "placeholder", void 0);
    __decorate$36([
        _angular_core.Input(), 
        __metadata$36('design:type', Array)
    ], Md2Chips.prototype, "autocompleteDataList", void 0);
    __decorate$36([
        _angular_core.Input(), 
        __metadata$36('design:type', Boolean)
    ], Md2Chips.prototype, "isAutoComplete", void 0);
    __decorate$36([
        _angular_core.Input(), 
        __metadata$36('design:type', Boolean)
    ], Md2Chips.prototype, "isRemovable", void 0);
    __decorate$36([
        _angular_core.Input(), 
        __metadata$36('design:type', Boolean)
    ], Md2Chips.prototype, "readonly", void 0);
    __decorate$36([
        _angular_core.Input(), 
        __metadata$36('design:type', Number)
    ], Md2Chips.prototype, "minChips", void 0);
    __decorate$36([
        _angular_core.Input(), 
        __metadata$36('design:type', Number)
    ], Md2Chips.prototype, "maxChips", void 0);
    __decorate$36([
        _angular_core.Input(), 
        __metadata$36('design:type', String)
    ], Md2Chips.prototype, "id", void 0);
    __decorate$36([
        _angular_core.Input('autocomplete-item-text'), 
        __metadata$36('design:type', String)
    ], Md2Chips.prototype, "autocompleteItemText", void 0);
    __decorate$36([
        _angular_core.Input('autocomplete-item-value'), 
        __metadata$36('design:type', String)
    ], Md2Chips.prototype, "autocompleteItemValue", void 0);
    __decorate$36([
        _angular_core.Input('item-text'), 
        __metadata$36('design:type', String)
    ], Md2Chips.prototype, "textKey", void 0);
    __decorate$36([
        _angular_core.Input('item-value'), 
        __metadata$36('design:type', String)
    ], Md2Chips.prototype, "valueKey", void 0);
    __decorate$36([
        _angular_core.Output(), 
        __metadata$36('design:type', _angular_core.EventEmitter)
    ], Md2Chips.prototype, "change", void 0);
    __decorate$36([
        _angular_core.ViewChild('chipInputForm'), 
        __metadata$36('design:type', _angular_forms.NgForm)
    ], Md2Chips.prototype, "chipInputForm", void 0);
    __decorate$36([
        _angular_core.Input(), 
        __metadata$36('design:type', Object)
    ], Md2Chips.prototype, "value", null);
    __decorate$36([
        _angular_core.HostListener('focus'), 
        __metadata$36('design:type', Function), 
        __metadata$36('design:paramtypes', []), 
        __metadata$36('design:returntype', void 0)
    ], Md2Chips.prototype, "_handleFocus", null);
    Md2Chips = __decorate$36([
        _angular_core.Component({
            selector: 'md2-chips',
            template: "<div class=\"md2-chips-container\" [class.md2-chip-disabled]=\"readonly\" [class.md2-chip-remove]=\"!isRemovable\">    <span *ngFor=\"let chip of chipItemList; let i = index\" class=\"md2-chip\" [class.active]=\"selectedChip === i\"> <span *ngIf=\"isObject\">{{chip.text}}</span> <span *ngIf=\"!isObject\">{{chip}}</span> <span [innerHTML]=\"templateHtmlString\"></span> <svg (click)=\"removeSelectedChip(i)\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" *ngIf=\"isRemovable\"> <path d=\"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z\" /> </svg> </span> <ng-content select=\".md2-template\"></ng-content> <form #chipInputForm=\"ngForm\" class=\"chip-input-form\" *ngIf=\"!readonly\"> <input *ngIf=\"!isAutoComplete\" class=\"chip-input\" type=\"text\" [(ngModel)]=\"inputValue\" name=\"chipInput\" [placeholder]=\"placeholder\" (paste)=\"inputPaste($event)\" (keydown)=\"inputChanged($event)\" (blur)=\"inputBlurred($event)\" (focus)=\"inputFocus()\" /> <div *ngIf=\"isAutoComplete\"> <md2-autocomplete [items]=\"autocompleteDataList\" [item-text]=\"autocompleteItemText\" [(ngModel)]=\"item\" name=\"autocomplete\" (textChange)=\"valueupdate($event)\" (change)=\"changeAutocomplete($event)\" [placeholder]=\"placeholder\" (keydown)=\"inputChanged($event)\"> </md2-autocomplete> </div> </form> </div> <div class=\"chip-error\" *ngIf=\"this.chipItemList.length<this.minChips\">Minimum {{minChips}} chip required.</div> <div class=\"chip-error\" *ngIf=\"this.chipItemList.length>=this.maxChips\">You are able to add Maximum {{maxChips}} chip.</div> ",
            styles: [".template-content { display: inline; } md2-chips { outline: none; } md2-chips .md2-chips-container { display: block; box-shadow: 0 1px #ccc; padding: 5px 0; margin-bottom: 10px; min-height: 50px; box-sizing: border-box; clear: both; } md2-chips .md2-chips-container::after { clear: both; content: ''; display: table; } md2-chips.chip-input-focus .md2-chips-container { box-shadow: 0 2px #0d8bff; } md2-chips .md2-chip-disabled { cursor: default; } md2-chips md2-autocomplete { margin: 0; } md2-chips .md2-autocomplete-wrap { border-bottom: 0 !important; } .md2-chip-remove .md2-chip { padding: 0 12px; } .md2-chip { font-size: 14px; position: relative; cursor: default; border-radius: 16px; display: block; height: 32px; line-height: 32px; margin: 8px 8px 0 0; padding: 0 28px 0 12px; float: left; box-sizing: border-box; max-width: 100%; background: #e0e0e0; color: #424242; white-space: nowrap; overflow: hidden; -ms-text-overflow: ellipsis; text-overflow: ellipsis; } .md2-chip.active { color: white; background: #0d8bff; } .md2-chip.active svg { color: rgba(255, 255, 255, 0.87); } .md2-chip svg { position: absolute; top: 4px; right: 4px; cursor: pointer; display: inline-block; overflow: hidden; fill: currentColor; color: rgba(0, 0, 0, 0.54); } .md2-template { display: none; } .chip-input-disabled { pointer-events: none; cursor: default; } .chip-input-form { display: inline-block; height: 32px; margin: 8px 8px 0 0; } .chip-remove { cursor: pointer; display: inline-block; padding: 0 3px; color: #616161; font-size: 30px; vertical-align: top; line-height: 21px; font-family: serif; } .chip-input { display: inline-block; width: auto; border: 0; outline: none; height: 32px; line-height: 32px; font-size: 16px; } .chip-error { font-size: 13px; color: #fd0f0f; } .md2-chips-container .chip-input-form .md2-autocomplete-wrap { border-bottom: 0; } .md2-chips-container .md2-autocomplete-wrap.is-focused .md2-autocomplete-placeholder { display: none; } .md2-chips-container .md2-autocomplete-wrap .md2-autocomplete-placeholder.has-value { display: none; } .md2-chips-container .md2-autocomplete-wrap svg { display: none; } .md2-chips-container .md2-autocomplete-wrap .md2-autocomplete-input { height: 32px; font-size: 16px; } /*# sourceMappingURL=chips.css.map */ "],
            providers: [MD2_CHIPS_CONTROL_VALUE_ACCESSOR],
            host: {
                'role': 'chips',
                '[id]': 'id',
                '[tabindex]': 'readonly ? -1 : tabindex',
                '[class.chip-input-focus]': 'inputFocused || selectedChip >= 0',
            },
            encapsulation: _angular_core.ViewEncapsulation.None
        }), 
        __metadata$36('design:paramtypes', [_angular_core.ElementRef])
    ], Md2Chips);
    return Md2Chips;
}());
var MD2_CHIPS_DIRECTIVES = [Md2Chips];
var Md2ChipsModule = (function () {
    function Md2ChipsModule() {
    }
    Md2ChipsModule.forRoot = function () {
        return {
            ngModule: Md2ChipsModule,
            providers: []
        };
    };
    Md2ChipsModule = __decorate$36([
        _angular_core.NgModule({
            imports: [_angular_common.CommonModule, _angular_forms.FormsModule, Md2AutocompleteModule],
            declarations: MD2_CHIPS_DIRECTIVES,
            exports: MD2_CHIPS_DIRECTIVES
        }), 
        __metadata$36('design:paramtypes', [])
    ], Md2ChipsModule);
    return Md2ChipsModule;
}());

var __decorate$37 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$37 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var Md2Collapse = (function () {
    function Md2Collapse() {
        this._isExpanded = true;
        this._isCollapsing = false;
    }
    Object.defineProperty(Md2Collapse.prototype, "collapse", {
        get: function () { return this._isExpanded; },
        set: function (value) {
            this._isExpanded = value;
            this.toggle();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * toggle collapse
     */
    Md2Collapse.prototype.toggle = function () {
        if (this._isExpanded) {
            this.hide();
        }
        else {
            this.show();
        }
    };
    /**
     * hide collapse
     */
    Md2Collapse.prototype.hide = function () {
        var _this = this;
        this._isCollapsing = true;
        this._isExpanded = false;
        setTimeout(function () {
            _this._isCollapsing = false;
        }, 4);
    };
    /**
     * show collapse
     */
    Md2Collapse.prototype.show = function () {
        var _this = this;
        this._isCollapsing = true;
        this._isExpanded = true;
        setTimeout(function () {
            _this._isCollapsing = false;
        }, 4);
    };
    __decorate$37([
        _angular_core.Input(), 
        __metadata$37('design:type', Boolean)
    ], Md2Collapse.prototype, "collapse", null);
    Md2Collapse = __decorate$37([
        _angular_core.Directive({
            selector: '[collapse]',
            host: {
                '[class.in]': '_isExpanded',
                '[class.collapse]': 'true',
                '[class.collapsing]': '_isCollapsing',
                '[attr.aria-expanded]': '_isExpanded',
                '[attr.aria-hidden]': '!_isExpanded',
            }
        }), 
        __metadata$37('design:paramtypes', [])
    ], Md2Collapse);
    return Md2Collapse;
}());
var MD2_COLLAPSE_DIRECTIVES = [Md2Collapse];
var Md2CollapseModule = (function () {
    function Md2CollapseModule() {
    }
    Md2CollapseModule.forRoot = function () {
        return {
            ngModule: Md2CollapseModule,
            providers: []
        };
    };
    Md2CollapseModule = __decorate$37([
        _angular_core.NgModule({
            imports: [_angular_common.CommonModule],
            exports: MD2_COLLAPSE_DIRECTIVES,
            declarations: MD2_COLLAPSE_DIRECTIVES,
        }), 
        __metadata$37('design:paramtypes', [])
    ], Md2CollapseModule);
    return Md2CollapseModule;
}());

var __decorate$39 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$39 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var COLOR_RGB = /(rgb)a?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*%?,\s*(\d{1,3})\s*%?(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/;
var COLOR_HSL = /(hsl)a?\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/;
var ColorpickerService = (function () {
    function ColorpickerService() {
    }
    /**
  * hsla to hsva
  * @param hsla
  */
    ColorpickerService.prototype.hsla2hsva = function (hsla) {
        var h = Math.min(hsla.h, 1), s = Math.min(hsla.s, 1), l = Math.min(hsla.l, 1);
        var a = Math.min(hsla.a, 1);
        if (l === 0) {
            return { h: h, s: 0, v: 0, a: a };
        }
        else {
            var v = l + s * (1 - Math.abs(2 * l - 1)) / 2;
            return { h: h, s: 2 * (v - l) / v, v: v, a: a };
        }
    };
    /**
    * hsva to hsla
    * @param hsva
    */
    ColorpickerService.prototype.hsva2hsla = function (hsva) {
        var h = hsva.h, s = hsva.s, v = hsva.v, a = hsva.a;
        if (v === 0) {
            return new Hsla(h, 0, 0, a);
        }
        else if (s === 0 && v === 1) {
            return new Hsla(h, 1, 1, a);
        }
        else {
            var l = v * (2 - s) / 2;
            return new Hsla(h, v * s / (1 - Math.abs(2 * l - 1)), l, a);
        }
    };
    /**
     * rgba to hsva
     * @param rgba
     */
    ColorpickerService.prototype.rgbaToHsva = function (rgba) {
        var r = Math.min(rgba.r, 1), g = Math.min(rgba.g, 1), b = Math.min(rgba.b, 1);
        var a = Math.min(rgba.a, 1);
        var max = Math.max(r, g, b), min = Math.min(r, g, b);
        var h, s, v = max;
        var d = max - min;
        s = max === 0 ? 0 : d / max;
        if (max === min) {
            h = 0;
        }
        else {
            switch (max) {
                case r:
                    h = (g - b) / d + (g < b ? 6 : 0);
                    break;
                case g:
                    h = (b - r) / d + 2;
                    break;
                case b:
                    h = (r - g) / d + 4;
                    break;
            }
            h /= 6;
        }
        return new Hsva(h, s, v, a);
    };
    /**
     * hsva to rgba
     * @param hsva
     */
    ColorpickerService.prototype.hsvaToRgba = function (hsva) {
        var h = hsva.h, s = hsva.s, v = hsva.v, a = hsva.a;
        var r, g, b;
        var i = Math.floor(h * 6);
        var f = h * 6 - i;
        var p = v * (1 - s);
        var q = v * (1 - f * s);
        var t = v * (1 - (1 - f) * s);
        switch (i % 6) {
            case 0:
                r = v;
                g = t;
                b = p;
                break;
            case 1:
                r = q;
                g = v;
                b = p;
                break;
            case 2:
                r = p;
                g = v;
                b = t;
                break;
            case 3:
                r = p;
                g = q;
                b = v;
                break;
            case 4:
                r = t;
                g = p;
                b = v;
                break;
            case 5:
                r = v;
                g = p;
                b = q;
                break;
        }
        return new Rgba(r, g, b, a);
    };
    /**
     * string to hsva
     * @param colorString
     */
    ColorpickerService.prototype.stringToHsva = function (colorString) {
        var stringParsers = [
            {
                re: COLOR_RGB,
                parse: function (execResult) {
                    return new Rgba(parseInt(execResult[2]) / 255, parseInt(execResult[3]) / 255, parseInt(execResult[4]) / 255, isNaN(parseFloat(execResult[5])) ? 1 : parseFloat(execResult[5]));
                }
            },
            {
                re: COLOR_HSL,
                parse: function (execResult) {
                    return new Hsla(parseInt(execResult[2]) / 360, parseInt(execResult[3]) / 100, parseInt(execResult[4]) / 100, isNaN(parseFloat(execResult[5])) ? 1 : parseFloat(execResult[5]));
                }
            },
            {
                re: /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})$/,
                parse: function (execResult) {
                    return new Rgba(parseInt(execResult[1], 16) / 255, parseInt(execResult[2], 16) / 255, parseInt(execResult[3], 16) / 255, 1);
                }
            },
            {
                re: /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])$/,
                parse: function (execResult) {
                    return new Rgba(parseInt(execResult[1] + execResult[1], 16) / 255, parseInt(execResult[2] + execResult[2], 16) / 255, parseInt(execResult[3] + execResult[3], 16) / 255, 1);
                }
            }
        ];
        colorString = colorString.toLowerCase();
        var hsva = null;
        for (var key in stringParsers) {
            if (stringParsers.hasOwnProperty(key)) {
                var parser = stringParsers[key];
                var match = parser.re.exec(colorString);
                var color = match && parser.parse(match);
                if (color) {
                    if (color instanceof Rgba) {
                        hsva = this.rgbaToHsva(color);
                    }
                    else if (color instanceof Hsla) {
                        hsva = this.hsla2hsva(color);
                    }
                    return hsva;
                }
            }
        }
        return hsva;
    };
    /**
     * output formate of color
     * @param hsva
     * @param outputFormat
     */
    ColorpickerService.prototype.outputFormat = function (hsva, outputFormat) {
        if (hsva.a < 1) {
            switch (outputFormat) {
                case 'hsl':
                    var hsla = this.hsva2hsla(hsva);
                    var hslaText = new Hsla(Math.round((hsla.h) * 360), Math.round(hsla.s * 100), Math.round(hsla.l * 100), Math.round(hsla.a * 100) / 100);
                    return 'hsla(' + hslaText.h + ',' + hslaText.s + '%,' +
                        hslaText.l + '%,' + hslaText.a + ')';
                default:
                    var rgba = this.denormalizeRGBA(this.hsvaToRgba(hsva));
                    return 'rgba(' + rgba.r + ',' + rgba.g + ',' + rgba.b +
                        ',' + Math.round(rgba.a * 100) / 100 + ')';
            }
        }
        else {
            switch (outputFormat) {
                case 'hsl':
                    var hsla = this.hsva2hsla(hsva);
                    var hslaText = new Hsla(Math.round((hsla.h) * 360), Math.round(hsla.s * 100), Math.round(hsla.l * 100), Math.round(hsla.a * 100) / 100);
                    return 'hsl(' + hslaText.h + ',' + hslaText.s + '%,' + hslaText.l + '%)';
                case 'rgb':
                    var rgba = this.denormalizeRGBA(this.hsvaToRgba(hsva));
                    return 'rgb(' + rgba.r + ',' + rgba.g + ',' + rgba.b + ')';
                default:
                    return this.hexText(this.denormalizeRGBA(this.hsvaToRgba(hsva)));
            }
        }
    };
    ColorpickerService.prototype.hexText = function (rgba) {
        var mainText = ((1 << 24) | (rgba.r << 16) | (rgba.g << 8) | rgba.b).toString(16);
        var hexText = '#' + mainText.substr(1);
        return hexText.toLowerCase();
    };
    ColorpickerService.prototype.denormalizeRGBA = function (rgba) {
        return new Rgba(Math.round(rgba.r * 255), Math.round(rgba.g * 255), Math.round(rgba.b * 255), rgba.a);
    };
    ColorpickerService = __decorate$39([
        _angular_core.Injectable(), 
        __metadata$39('design:paramtypes', [])
    ], ColorpickerService);
    return ColorpickerService;
}());

var __decorate$38 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$38 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param$4 = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var nextId$2 = 0;
var TextDirective = (function () {
    function TextDirective() {
        this.newValue = new _angular_core.EventEmitter();
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
    __decorate$38([
        _angular_core.Output('newValue'), 
        __metadata$38('design:type', Object)
    ], TextDirective.prototype, "newValue", void 0);
    __decorate$38([
        _angular_core.Input('text'), 
        __metadata$38('design:type', Object)
    ], TextDirective.prototype, "text", void 0);
    __decorate$38([
        _angular_core.Input('rg'), 
        __metadata$38('design:type', Number)
    ], TextDirective.prototype, "rg", void 0);
    TextDirective = __decorate$38([
        _angular_core.Directive({
            selector: '[text]',
            host: {
                '(input)': 'changeInput($event)'
            }
        }), 
        __metadata$38('design:paramtypes', [])
    ], TextDirective);
    return TextDirective;
}());
var ColorpickerSliderDirective = (function () {
    function ColorpickerSliderDirective(_element) {
        var _this = this;
        this._element = _element;
        this.change = new _angular_core.EventEmitter();
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
    __decorate$38([
        _angular_core.Input('colorpicker-slider'), 
        __metadata$38('design:type', String)
    ], ColorpickerSliderDirective.prototype, "slider", void 0);
    __decorate$38([
        _angular_core.Input('point-x'), 
        __metadata$38('design:type', Number)
    ], ColorpickerSliderDirective.prototype, "pointX", void 0);
    __decorate$38([
        _angular_core.Input('point-y'), 
        __metadata$38('design:type', Number)
    ], ColorpickerSliderDirective.prototype, "pointY", void 0);
    __decorate$38([
        _angular_core.Output('change'), 
        __metadata$38('design:type', Object)
    ], ColorpickerSliderDirective.prototype, "change", void 0);
    ColorpickerSliderDirective = __decorate$38([
        _angular_core.Directive({
            selector: '[colorpicker-slider]',
            host: {
                '(mousedown)': 'start($event)',
                '(touchstart)': 'start($event)'
            }
        }), 
        __metadata$38('design:paramtypes', [_angular_core.ElementRef])
    ], ColorpickerSliderDirective);
    return ColorpickerSliderDirective;
}());
/**
 * Change event object emitted by Md2Colorpicker.
 */
var Md2ColorChange = (function () {
    function Md2ColorChange(source, color) {
        this.source = source;
        this.color = color;
    }
    return Md2ColorChange;
}());
var Md2Colorpicker = (function () {
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
        /** The placeholder displayed in the trigger of the select. */
        this._placeholder = 'daa';
        this._onChange = function (value) { };
        this._onTouched = function () { };
        this.cFormat = 'hex';
        this.colorpickerChange = new _angular_core.EventEmitter();
        /** Event emitted when the selected date has been changed by the user. */
        this.change = new _angular_core.EventEmitter();
        this.tabindex = 0;
        this.id = 'md2-colorpicker-' + (++nextId$2);
        /** Event emitted when the select has been opened. */
        this.onOpen = new _angular_core.EventEmitter();
        /** Event emitted when the select has been closed. */
        this.onClose = new _angular_core.EventEmitter();
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
        var hsva = this.service.stringToHsva(this.color);
        if (hsva !== null) {
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
        if (this._overlayRef) {
            this._overlayRef.detach();
            this._backdropSubscription.unsubscribe();
        }
        this._isColorpickerVisible = false;
        this.setColorFromString(this._innerValue);
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
            config.positionStrategy = this.overlay.position()
                .global()
                .centerHorizontally()
                .centerVertically();
            config.hasBackdrop = true;
            config.backdropClass = 'cdk-overlay-dark-backdrop';
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
    __decorate$38([
        _angular_core.Input(), 
        __metadata$38('design:type', Object)
    ], Md2Colorpicker.prototype, "color", null);
    __decorate$38([
        _angular_core.Input(), 
        __metadata$38('design:type', Object)
    ], Md2Colorpicker.prototype, "placeholder", null);
    __decorate$38([
        _angular_core.Input(), 
        __metadata$38('design:type', Boolean)
    ], Md2Colorpicker.prototype, "required", null);
    __decorate$38([
        _angular_core.Input(), 
        __metadata$38('design:type', Object)
    ], Md2Colorpicker.prototype, "disabled", null);
    __decorate$38([
        _angular_core.Input('format'), 
        __metadata$38('design:type', String)
    ], Md2Colorpicker.prototype, "cFormat", void 0);
    __decorate$38([
        _angular_core.Output('colorpickerChange'), 
        __metadata$38('design:type', Object)
    ], Md2Colorpicker.prototype, "colorpickerChange", void 0);
    __decorate$38([
        _angular_core.Output(), 
        __metadata$38('design:type', _angular_core.EventEmitter)
    ], Md2Colorpicker.prototype, "change", void 0);
    __decorate$38([
        _angular_core.Input(), 
        __metadata$38('design:type', Number)
    ], Md2Colorpicker.prototype, "tabindex", void 0);
    __decorate$38([
        _angular_core.Input(), 
        __metadata$38('design:type', String)
    ], Md2Colorpicker.prototype, "id", void 0);
    __decorate$38([
        _angular_core.Output(), 
        __metadata$38('design:type', _angular_core.EventEmitter)
    ], Md2Colorpicker.prototype, "onOpen", void 0);
    __decorate$38([
        _angular_core.Output(), 
        __metadata$38('design:type', _angular_core.EventEmitter)
    ], Md2Colorpicker.prototype, "onClose", void 0);
    __decorate$38([
        _angular_core.ViewChildren(TemplatePortalDirective), 
        __metadata$38('design:type', _angular_core.QueryList)
    ], Md2Colorpicker.prototype, "templatePortals", void 0);
    __decorate$38([
        _angular_core.ViewChildren(TemplatePortalDirective), 
        __metadata$38('design:type', Portal)
    ], Md2Colorpicker.prototype, "templatePortal", void 0);
    Md2Colorpicker = __decorate$38([
        _angular_core.Component({selector: 'md2-colorpicker',
            template: " <div class=\"md2-colorpicker-trigger\" (click)=\"toggle()\"> <div class=\"color-picker-selector\"> <div class=\"color-div\"> <div class=\"color-fill\" [style.background-color]=\"color\"> </div> </div> <label class=\"color-text\">{{color}}</label> </div> </div> <template portal> <div class=\"md2-colorpicker-panel\"> <div class=\"md2-colorpicker-content\"> <div class=\"md2-colorpicker-wrapper\" [class.active]=\"_isColorpickerVisible\"> <div class=\"md2-color-picker\"> <div [style.background-color]=\"outputColor\" class=\"selected-color\"> <div [hidden]=\"format!=2\" class=\"hsla-text\"> <input [text] type=\"number\" [style.color]=\"fontColor\" pattern=\"[0-9]*\" min=\"0\" max=\"360\" [rg]=\"360\" (newValue)=\"setHue($event)\" [value]=\"hslaText.h\" /> <input [text] type=\"number\" [style.color]=\"fontColor\" pattern=\"[0-9]*\" min=\"0\" max=\"100\" [rg]=\"100\" (newValue)=\"setSaturation($event)\" [value]=\"hslaText.s\" /> <input [text] type=\"number\" [style.color]=\"fontColor\" pattern=\"[0-9]*\" min=\"0\" max=\"100\" [rg]=\"100\" (newValue)=\"setLightness($event)\" [value]=\"hslaText.l\" /> <input [text] type=\"number\" [style.color]=\"fontColor\" pattern=\"[0-9]+([\.,][0-9]{1,2})?\" min=\"0\" max=\"1\" step=\"0.1\" [rg]=\"1\" (newValue)=\"setAlpha($event)\" [value]=\"hslaText.a\" /> </div> <div [hidden]=\"format!=1\" class=\"rgba-text\"> <input [text] type=\"number\" [style.color]=\"fontColor\" pattern=\"[0-9]*\" min=\"0\" max=\"255\" [rg]=\"255\" (newValue)=\"setR($event)\" [value]=\"rgbaText.r\" /> <input [text] type=\"number\" [style.color]=\"fontColor\" pattern=\"[0-9]*\" min=\"0\" max=\"255\" [rg]=\"255\" (newValue)=\"setG($event)\" [value]=\"rgbaText.g\" /> <input [text] type=\"number\" [style.color]=\"fontColor\" pattern=\"[0-9]*\" min=\"0\" max=\"255\" [rg]=\"255\" (newValue)=\"setB($event)\" [value]=\"rgbaText.b\" /> <input [text] type=\"number\" [style.color]=\"fontColor\" pattern=\"[0-9]+([\.,][0-9]{1,2})?\" min=\"0\" max=\"1\" step=\"0.1\" [rg]=\"1\" (newValue)=\"setAlpha($event)\" [value]=\"rgbaText.a\" /> </div> <div [hidden]=\"format!=0\" class=\"hex-text\"> <input [text] (newValue)=\"setColorFromString($event)\" [style.color]=\"fontColor\" [value]=\"hexText\" /> </div> <div [style.color]=\"fontColor\"> <div class=\"type-policy\" [style.background]=\"backAreaColor\" [class.active]=\"format==0\" (click)=\"formatPolicy(0)\">HEX</div> <div class=\"type-policy\" [style.background]=\"backAreaColor\" [class.active]=\"format==1\" (click)=\"formatPolicy(1)\">RGBA</div> <div class=\"type-policy\" [style.background]=\"backAreaColor\" [class.active]=\"format==2\" (click)=\"formatPolicy(2)\">HSLA</div> </div> </div> <div class=\"input-color-content\"> <div [colorpicker-slider] [style.background-color]=\"_hueSliderColor\" [point-x]=\"1\" [point-y]=\"1\" (change)=\"setSaturationAndBrightness($event)\" class=\"saturation-lightness\"> <div [style.left.px]=\"slider.s\" [style.top.px]=\"slider.v\" class=\"cursor\"></div> </div> <div [colorpicker-slider] [point-x]=\"1\" (change)=\"setHue($event)\" class=\"hue\"> <div [style.left.px]=\"slider.h\" class=\"color-picker-marker\"></div> </div> <div [colorpicker-slider] [style.background-color]=\"alphaColor\" [point-x]=\"1\" (change)=\"setAlpha($event)\" class=\"alpha\"> <div [style.left.px]=\"slider.a\" class=\"color-picker-marker\"></div> </div> </div> <div class=\"md2-color-picker-actions\"> <div class=\"md2-button\" (click)=\"cancelColor()\">Cancel</div> <div class=\"md2-button\" (click)=\"clickOk()\">Ok</div> </div> </div> </div> </div> </div> </template>",
            styles: [".md2-colorpicker-wrapper { width: 270px; height: 345px; border-radius: 2px; background-color: #fff; z-index: 10; box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4); transform: scale(0); transform-origin: left top; transition: 150ms; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; } .md2-colorpicker-wrapper.active { transform: scale(1); } .md2-colorpicker-disabled { pointer-events: none; cursor: default; } .md2-colorpicker-disabled .color-picker-selector .color-text { color: rgba(0, 0, 0, 0.38); border-color: transparent; background-image: linear-gradient(to right, rgba(0, 0, 0, 0.38) 0%, rgba(0, 0, 0, 0.38) 33%, transparent 0%); background-position: bottom -1px left 0; background-size: 4px 1px; background-repeat: repeat-x; } .color-picker-selector { display: block; padding: 18px 0 18px 32px; white-space: nowrap; cursor: pointer; } .color-picker-selector .color-div { content: ''; width: 24px; height: 24px; overflow: hidden; background-color: #fff; background-image: linear-gradient(45deg, #ddd 25%, transparent 0, transparent 75%, #ddd 0, #ddd), linear-gradient(45deg, #ddd 25%, transparent 0, transparent 75%, #ddd 0, #ddd); background-size: 8px 8px; background-position: 0 0, 4px 4px; position: absolute; top: 21px; left: 0; border: 2px solid #fafafa; display: block; fill: currentColor; cursor: pointer; border-radius: 50%; vertical-align: middle; box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.2), 0 1px 1px 1px rgba(0, 0, 0, 0.14), 0 1px 1px 1px rgba(0, 0, 0, 0.12); } .color-picker-selector .color-div .color-fill { width: 100%; height: 100%; } .color-picker-selector .color-text { cursor: pointer; position: relative; display: block; min-width: 150px; height: 30px; padding: 2px 26px 1px 2px; margin: 0; line-height: 26px; color: rgba(0, 0, 0, 0.87); vertical-align: middle; box-sizing: border-box; border-bottom: 1px solid rgba(0, 0, 0, 0.12); } md2-colorpicker { position: relative; display: block; max-width: 175px; outline: none; -webkit-backface-visibility: hidden; backface-visibility: hidden; } .md2-color-picker { position: relative; display: block; outline: none; -webkit-backface-visibility: hidden; backface-visibility: hidden; } .md2-color-picker * { box-sizing: border-box; } .md2-color-picker .input-color-content { width: 250px; position: relative; margin: 10px auto; } .md2-color-picker i { cursor: default; position: relative; } .md2-color-picker input { font-size: 15px; } .md2-color-picker div.cursor-sv { cursor: default; position: relative; border-radius: 50%; width: 15px; height: 15px; border: #ddd solid 1px; } .md2-color-picker div.cursor { cursor: crosshair; position: relative; border-radius: 50%; width: 13px; height: 13px; box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.5), inset 0 0 2px 0 rgba(0, 0, 0, 0.5); border: 2px solid #fff; } .md2-color-picker div.color-picker-marker { cursor: crosshair; position: relative; border: 2px solid #fff; box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.5); height: 100%; width: 5px; border-bottom: 0; border-top: 0; } .md2-color-picker .saturation-lightness { width: 100%; height: 130px; border: none; overflow: hidden; background-image: linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, rgba(255, 255, 255, 0)); -ms-filter: 'progid:DXImageTransform.Microsoft.gradient(startColorstr=#00CC9A81, endColorstr=#FF000000)'; filter: progid:dximagetransform.microsoft.gradient(startColorstr='#00CC9A81', endColorstr='#FF000000'); } .md2-color-picker .saturation-lightness:hover { cursor: crosshair; } .md2-color-picker .hue { width: 100%; height: 30px; border: none; margin: 10px 0; background: -webkit-linear-gradient(left, #f00 0%, #ff0 16.66%, #0f0 33.33%, #0ff 50%, #00f 66.66%, #f0f 83.33%, #f00 100%); } .md2-color-picker .alpha { border: 1px solid #efefef; width: 100%; height: 30px; background-image: linear-gradient(to left, transparent, transparent), linear-gradient(to right, #fff, rgba(255, 255, 255, 0)); } .md2-color-picker .selected-color { width: 100%; height: 65px; padding-top: 10px; position: relative; } .hex-text { width: 100%; } .hex-text input { width: 100%; border: 0; padding: 4px; text-align: center; background: transparent; outline: none; font-size: 15px; } .hex-text div { text-align: center; float: left; clear: left; width: 160px; margin-top: 4px; } .hsla-text, .rgba-text { text-align: center; } .hsla-text input, .rgba-text input { width: 50px; border: 0; padding: 4px 0; background: transparent; text-align: center; } .hsla-text div, .rgba-text div { text-align: center; display: block; } .hsla-text label, .rgba-text label { text-align: center; display: inline-block; font-size: 15px; } .md2-color-picker-actions { text-align: right; } .md2-color-picker-actions .md2-button { display: inline-block; min-width: 64px; margin: 4px 8px 8px 0; padding: 0 12px; font-size: 14px; color: #106cc8; line-height: 36px; text-align: center; text-transform: uppercase; border-radius: 2px; cursor: pointer; box-sizing: border-box; transition: all 450ms cubic-bezier(0.23, 1, 0.32, 1); } .md2-color-picker-actions .md2-button:hover { background: #ebebeb; } .hsla-text div:nth-child(5), .rgba-text div:nth-child(5) { clear: left; } .type-policy { width: 33.3%; text-align: center; font-size: 14px; display: inline-block; float: left; padding: 2px; margin-top: 6px; cursor: pointer; background: rgba(255, 255, 255, 0.4); } .type-policy.active { background: rgba(153, 153, 153, 0.2) !important; } .cdk-overlay-container, .cdk-global-overlay-wrapper { pointer-events: none; top: 0; left: 0; height: 100%; width: 100%; } .cdk-overlay-container { position: fixed; z-index: 1000; } .cdk-global-overlay-wrapper { display: flex; position: absolute; z-index: 1000; } .cdk-overlay-pane { position: absolute; pointer-events: auto; box-sizing: border-box; z-index: 1000; } .cdk-overlay-backdrop { position: absolute; top: 0; bottom: 0; left: 0; right: 0; z-index: 1000; pointer-events: auto; transition: opacity 400ms cubic-bezier(0.25, 0.8, 0.25, 1); opacity: 0; } .cdk-overlay-backdrop.cdk-overlay-backdrop-showing { opacity: 0.48; } .cdk-overlay-dark-backdrop { background: rgba(0, 0, 0, 0.6); } /*# sourceMappingURL=colorpicker.css.map */ "],
            host: {
                'role': 'colorpicker',
                '[id]': 'id',
                '[tabindex]': 'disabled ? -1 : tabindex',
                '[class.md2-colorpicker-disabled]': 'disabled',
            },
            encapsulation: _angular_core.ViewEncapsulation.None
        }),
        __param$4(5, _angular_core.Self()),
        __param$4(5, _angular_core.Optional()), 
        __metadata$38('design:paramtypes', [_angular_core.ElementRef, Overlay, _angular_core.ViewContainerRef, _angular_core.Renderer, ColorpickerService, _angular_forms.NgControl])
    ], Md2Colorpicker);
    return Md2Colorpicker;
}());
var Hsva = (function () {
    function Hsva(h, s, v, a) {
        this.h = h;
        this.s = s;
        this.v = v;
        this.a = a;
    }
    return Hsva;
}());
var Hsla = (function () {
    function Hsla(h, s, l, a) {
        this.h = h;
        this.s = s;
        this.l = l;
        this.a = a;
    }
    return Hsla;
}());
var Rgba = (function () {
    function Rgba(r, g, b, a) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }
    return Rgba;
}());
var SliderPosition = (function () {
    function SliderPosition(h, s, v, a) {
        this.h = h;
        this.s = s;
        this.v = v;
        this.a = a;
    }
    return SliderPosition;
}());
var SliderDimension = (function () {
    function SliderDimension(h, s, v, a) {
        this.h = h;
        this.s = s;
        this.v = v;
        this.a = a;
    }
    return SliderDimension;
}());
var MD2_COLORPICKER_DIRECTIVES = [
    Md2Colorpicker, ColorpickerSliderDirective, TextDirective
];
var Md2ColorpickerModule = (function () {
    function Md2ColorpickerModule() {
    }
    Md2ColorpickerModule.forRoot = function () {
        return {
            ngModule: Md2ColorpickerModule,
            providers: [ColorpickerService]
        };
    };
    Md2ColorpickerModule = __decorate$38([
        _angular_core.NgModule({
            declarations: MD2_COLORPICKER_DIRECTIVES,
            imports: [_angular_common.CommonModule, _angular_forms.FormsModule, OverlayModule, PortalModule],
            exports: MD2_COLORPICKER_DIRECTIVES
        }), 
        __metadata$38('design:paramtypes', [])
    ], Md2ColorpickerModule);
    return Md2ColorpickerModule;
}());

var __decorate$43 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$43 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Option IDs need to be unique across components, so this counter exists outside of
 * the component definition.
 */
var _uniqueIdCounter$1 = 0;
/** Event object emitted by MdOption when selected. */
var Md2OptionSelectEvent = (function () {
    function Md2OptionSelectEvent(source, isUserInput) {
        if (isUserInput === void 0) { isUserInput = false; }
        this.source = source;
        this.isUserInput = isUserInput;
    }
    return Md2OptionSelectEvent;
}());
/**
 * Single option inside of a `<md2-select>` element.
 */
var Md2Option = (function () {
    function Md2Option(_element, _renderer) {
        this._element = _element;
        this._renderer = _renderer;
        this._selected = false;
        /** Whether the option is disabled.  */
        this._disabled = false;
        this._id = "md2-option-" + _uniqueIdCounter$1++;
        /** Event emitted when the option is selected. */
        this.onSelect = new _angular_core.EventEmitter();
    }
    Object.defineProperty(Md2Option.prototype, "id", {
        /** The unique ID of the option. */
        get: function () { return this._id; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Option.prototype, "disabled", {
        /** Whether the option is disabled. */
        get: function () { return this._disabled; },
        set: function (value) { this._disabled = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Option.prototype, "selected", {
        /** Whether or not the option is currently selected. */
        get: function () {
            return this._selected;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Option.prototype, "viewValue", {
        /**
         * The displayed value of the option. It is necessary to show the selected option in the
         * select's trigger.
         */
        get: function () {
            return this._getHostElement().textContent.trim();
        },
        enumerable: true,
        configurable: true
    });
    /** Selects the option. */
    Md2Option.prototype.select = function () {
        this._selected = true;
        this.onSelect.emit(new Md2OptionSelectEvent(this, false));
    };
    /** Deselects the option. */
    Md2Option.prototype.deselect = function () {
        this._selected = false;
    };
    /** Sets focus onto this option. */
    Md2Option.prototype.focus = function () {
        this._renderer.invokeElementMethod(this._getHostElement(), 'focus');
    };
    /** Ensures the option is selected when activated from the keyboard. */
    Md2Option.prototype._handleKeydown = function (event) {
        if (event.keyCode === ENTER || event.keyCode === SPACE) {
            this._selectViaInteraction();
        }
    };
    /**
     * Selects the option while indicating the selection came from the user. Used to
     * determine if the select's view -> model callback should be invoked.
     */
    Md2Option.prototype._selectViaInteraction = function () {
        if (!this.disabled) {
            this._selected = true;
            this.onSelect.emit(new Md2OptionSelectEvent(this, true));
        }
    };
    /** Returns the correct tabindex for the option depending on disabled state. */
    Md2Option.prototype._getTabIndex = function () {
        return this.disabled ? '-1' : '0';
    };
    Md2Option.prototype._getHostElement = function () {
        return this._element.nativeElement;
    };
    __decorate$43([
        _angular_core.Input(), 
        __metadata$43('design:type', Object)
    ], Md2Option.prototype, "value", void 0);
    __decorate$43([
        _angular_core.Input(), 
        __metadata$43('design:type', Object)
    ], Md2Option.prototype, "disabled", null);
    __decorate$43([
        _angular_core.Output(), 
        __metadata$43('design:type', Object)
    ], Md2Option.prototype, "onSelect", void 0);
    Md2Option = __decorate$43([
        _angular_core.Component({selector: 'md2-option',
            host: {
                'role': 'option',
                '[attr.tabindex]': '_getTabIndex()',
                '[class.md2-selected]': 'selected',
                '[id]': 'id',
                '[attr.aria-selected]': 'selected.toString()',
                '[attr.aria-disabled]': 'disabled.toString()',
                '[class.md2-option-disabled]': 'disabled',
                '(click)': '_selectViaInteraction()',
                '(keydown)': '_handleKeydown($event)'
            },
            template: '<ng-content></ng-content>',
            styles: ["md2-select { display: block; outline: none; } .md2-select-trigger { color: rgba(0, 0, 0, 0.38); border-bottom: 1px solid rgba(0, 0, 0, 0.12); display: flex; justify-content: space-between; align-items: center; height: 30px; min-width: 112px; line-height: 22px; cursor: pointer; position: relative; box-sizing: border-box; } [aria-disabled='true'] .md2-select-trigger { background-image: linear-gradient(to right, rgba(0, 0, 0, 0.26) 0, rgba(0, 0, 0, 0.26) 33%, transparent 0); background-size: 4px 1px; background-repeat: repeat-x; border-color: transparent; background-position: 0 bottom; cursor: default; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; } md2-select:focus:not(.md2-select-disabled) .md2-select-trigger { color: #106cc8; border-color: #106cc8; } md2-select.ng-invalid.ng-touched:not(.md2-select-disabled) .md2-select-trigger { color: #f44336; border-color: #f44336; } .md2-select-placeholder { position: absolute; right: 18px; left: 0; padding: 0 2px; transform-origin: left top; white-space: nowrap; overflow-x: hidden; text-overflow: ellipsis; } .md2-select-placeholder.md2-floating-placeholder { top: -16px; left: -2px; text-align: left; transform: scale(0.75); } [dir='rtl'] .md2-select-placeholder { transform-origin: right top; } [dir='rtl'] .md2-select-placeholder.md2-floating-placeholder { left: 2px; text-align: right; } [aria-required=true] .md2-select-placeholder::after { content: '*'; } .md2-select-value { position: relative; white-space: nowrap; overflow-x: hidden; text-overflow: ellipsis; color: rgba(0, 0, 0, 0.87); } .md2-select-disabled .md2-select-value { color: rgba(0, 0, 0, 0.38); } [dir='rtl'] .md2-select-value { left: auto; right: 0; } .md2-select-value-text:not(:last-child)::after { content: ','; margin-left: -2px; } .md2-select-arrow { width: 0; height: 0; border-left: 5px solid transparent; border-right: 5px solid transparent; border-top: 5px solid; margin: 0 4px; color: rgba(0, 0, 0, 0.38); } md2-select:focus:not(.md2-select-disabled) .md2-select-arrow { color: #106cc8; } md2-select.ng-invalid.ng-touched:not(.md2-select-disabled) .md2-select-arrow { color: #f44336; } .md2-select-panel { box-shadow: 0 0 3px rgba(0, 0, 0, 0.2), 0 8px 10px 1px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12); min-width: 112px; max-width: 280px; overflow: auto; -webkit-overflow-scrolling: touch; padding-top: 0; padding-bottom: 0; max-height: 256px; background: white; } md2-option { white-space: nowrap; overflow-x: hidden; text-overflow: ellipsis; display: block; flex-direction: row; align-items: center; padding: 13px 16px; font-size: 16px; font-family: Roboto, 'Helvetica Neue', sans-serif; text-align: start; text-decoration: none; position: relative; cursor: pointer; outline: none; box-sizing: padding-box; } md2-option[aria-disabled='true'] { cursor: default; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; } md2-option:hover:not(.md2-option-disabled), md2-option:focus:not(.md2-option-disabled) { background: rgba(0, 0, 0, 0.04); } md2-option.md2-selected { color: #106cc8; } md2-option.md2-option-disabled { color: rgba(0, 0, 0, 0.38); } [multiple='true'] md2-option { padding-left: 40px; } [multiple='true'] md2-option::after { content: ''; position: absolute; top: 50%; left: 12px; display: block; width: 16px; height: 16px; margin-top: -8px; border: 2px solid; border-radius: 2px; box-sizing: border-box; transition: 240ms; } [multiple='true'] md2-option.md2-selected::after { transform: rotate(-45deg); height: 8px; border-width: 0 0 2px 2px; } .cdk-overlay-container, .cdk-global-overlay-wrapper { pointer-events: none; top: 0; left: 0; height: 100%; width: 100%; } .cdk-overlay-container { position: fixed; z-index: 1000; } .cdk-overlay-pane { position: absolute; pointer-events: auto; box-sizing: border-box; z-index: 1000; } .cdk-overlay-backdrop { position: absolute; top: 0; bottom: 0; left: 0; right: 0; z-index: 1000; pointer-events: auto; transition: opacity 400ms cubic-bezier(0.25, 0.8, 0.25, 1); opacity: 0; } .cdk-overlay-transparent-backdrop { background: none; } .cdk-overlay-backdrop.cdk-overlay-backdrop-showing { opacity: 0.48; } /*# sourceMappingURL=select.css.map */ "],
            encapsulation: _angular_core.ViewEncapsulation.None
        }), 
        __metadata$43('design:paramtypes', [_angular_core.ElementRef, _angular_core.Renderer])
    ], Md2Option);
    return Md2Option;
}());
var Md2OptionModule = (function () {
    function Md2OptionModule() {
    }
    Md2OptionModule.forRoot = function () {
        return {
            ngModule: Md2OptionModule,
            providers: []
        };
    };
    Md2OptionModule = __decorate$43([
        _angular_core.NgModule({
            imports: [_angular_common.CommonModule],
            exports: [Md2Option],
            declarations: [Md2Option]
        }), 
        __metadata$43('design:paramtypes', [])
    ], Md2OptionModule);
    return Md2OptionModule;
}());

/**
 * This class manages keyboard events for selectable lists. If you pass it a query list
 * of items, it will set the active item correctly when arrow events occur.
 */
var ListKeyManager = (function () {
    function ListKeyManager(_items) {
        this._items = _items;
        this._tabOut = new rxjs_Subject.Subject();
        this._wrap = false;
    }
    /**
     * Turns on wrapping mode, which ensures that the active item will wrap to
     * the other end of list when there are no more items in the given direction.
     *
     * @returns The ListKeyManager that the method was called on.
     */
    ListKeyManager.prototype.withWrap = function () {
        this._wrap = true;
        return this;
    };
    /**
     * Sets the active item to the item at the index specified.
     *
     * @param index The index of the item to be set as active.
     */
    ListKeyManager.prototype.setActiveItem = function (index) {
        this._activeItemIndex = index;
        this._activeItem = this._items.toArray()[index];
    };
    /**
     * Sets the active item depending on the key event passed in.
     * @param event Keyboard event to be used for determining which element should be active.
     */
    ListKeyManager.prototype.onKeydown = function (event) {
        switch (event.keyCode) {
            case DOWN_ARROW:
                this.setNextItemActive();
                break;
            case UP_ARROW:
                this.setPreviousItemActive();
                break;
            case HOME:
                this.setFirstItemActive();
                break;
            case END:
                this.setLastItemActive();
                break;
            case TAB:
                // Note that we shouldn't prevent the default action on tab.
                this._tabOut.next(null);
                return;
            default:
                return;
        }
        event.preventDefault();
    };
    Object.defineProperty(ListKeyManager.prototype, "activeItemIndex", {
        /** Returns the index of the currently active item. */
        get: function () {
            return this._activeItemIndex;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ListKeyManager.prototype, "activeItem", {
        /** Returns the currently active item. */
        get: function () {
            return this._activeItem;
        },
        enumerable: true,
        configurable: true
    });
    /** Sets the active item to the first enabled item in the list. */
    ListKeyManager.prototype.setFirstItemActive = function () {
        this._setActiveItemByIndex(0, 1);
    };
    /** Sets the active item to the last enabled item in the list. */
    ListKeyManager.prototype.setLastItemActive = function () {
        this._setActiveItemByIndex(this._items.length - 1, -1);
    };
    /** Sets the active item to the next enabled item in the list. */
    ListKeyManager.prototype.setNextItemActive = function () {
        this._activeItemIndex === null ? this.setFirstItemActive() : this._setActiveItemByDelta(1);
    };
    /** Sets the active item to a previous enabled item in the list. */
    ListKeyManager.prototype.setPreviousItemActive = function () {
        this._activeItemIndex === null && this._wrap ? this.setLastItemActive()
            : this._setActiveItemByDelta(-1);
    };
    /**
     * Allows setting of the activeItemIndex without any other effects.
     * @param index The new activeItemIndex.
     */
    ListKeyManager.prototype.updateActiveItemIndex = function (index) {
        this._activeItemIndex = index;
    };
    Object.defineProperty(ListKeyManager.prototype, "tabOut", {
        /**
         * Observable that emits any time the TAB key is pressed, so components can react
         * when focus is shifted off of the list.
         */
        get: function () {
            return this._tabOut.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * This method sets the active item, given a list of items and the delta between the
     * currently active item and the new active item. It will calculate differently
     * depending on whether wrap mode is turned on.
     */
    ListKeyManager.prototype._setActiveItemByDelta = function (delta, items) {
        if (items === void 0) { items = this._items.toArray(); }
        this._wrap ? this._setActiveInWrapMode(delta, items)
            : this._setActiveInDefaultMode(delta, items);
    };
    /**
     * Sets the active item properly given "wrap" mode. In other words, it will continue to move
     * down the list until it finds an item that is not disabled, and it will wrap if it
     * encounters either end of the list.
     */
    ListKeyManager.prototype._setActiveInWrapMode = function (delta, items) {
        // when active item would leave menu, wrap to beginning or end
        this._activeItemIndex =
            (this._activeItemIndex + delta + items.length) % items.length;
        // skip all disabled menu items recursively until an enabled one is reached
        if (items[this._activeItemIndex].disabled) {
            this._setActiveInWrapMode(delta, items);
        }
        else {
            this.setActiveItem(this._activeItemIndex);
        }
    };
    /**
     * Sets the active item properly given the default mode. In other words, it will
     * continue to move down the list until it finds an item that is not disabled. If
     * it encounters either end of the list, it will stop and not wrap.
     */
    ListKeyManager.prototype._setActiveInDefaultMode = function (delta, items) {
        this._setActiveItemByIndex(this._activeItemIndex + delta, delta, items);
    };
    /**
     * Sets the active item to the first enabled item starting at the index specified. If the
     * item is disabled, it will move in the fallbackDelta direction until it either
     * finds an enabled item or encounters the end of the list.
     */
    ListKeyManager.prototype._setActiveItemByIndex = function (index, fallbackDelta, items) {
        if (items === void 0) { items = this._items.toArray(); }
        if (!items[index]) {
            return;
        }
        while (items[index].disabled) {
            index += fallbackDelta;
            if (!items[index]) {
                return;
            }
        }
        this.setActiveItem(index);
    };
    return ListKeyManager;
}());

var __extends$7 = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var FocusKeyManager = (function (_super) {
    __extends$7(FocusKeyManager, _super);
    function FocusKeyManager(items) {
        _super.call(this, items);
    }
    /**
     * This method sets the active item to the item at the specified index.
     * It also adds focuses the newly active item.
     */
    FocusKeyManager.prototype.setActiveItem = function (index) {
        _super.prototype.setActiveItem.call(this, index);
        this.activeItem.focus();
    };
    return FocusKeyManager;
}(ListKeyManager));

/**
 * The following are all the animations for the md2-select component, with each
 * const containing the metadata for one animation.
 *
 * The values below match the implementation of the Material 1 md2-select animation.
 */
/**
 * This animation shrinks the placeholder text to 75% of its normal size and translates
 * it to either the top left corner (ltr) or top right corner (rtl) of the trigger,
 * depending on the text direction of the application.
 */
var transformPlaceholder = _angular_core.trigger('transformPlaceholder', [
    _angular_core.state('floating-ltr', _angular_core.style({
        top: '-16px',
        left: '-2px',
        transform: "scale(0.75)"
    })),
    _angular_core.state('floating-rtl', _angular_core.style({
        top: '-16px',
        left: '2px',
        transform: "scale(0.75)"
    })),
    _angular_core.transition('* => *', _angular_core.animate("400ms cubic-bezier(0.25, 0.8, 0.25, 1)"))
]);
/**
 * This animation transforms the select's overlay panel on and off the page.
 *
 * When the panel is attached to the DOM, it expands its width 32px, scales it up to
 * 100% on the Y axis, fades in its border, and translates slightly up and to the
 * side to ensure the option text correctly overlaps the trigger text.
 *
 * When the panel is removed from the DOM, it simply fades out linearly.
 */
var transformPanel = _angular_core.trigger('transformPanel', [
    _angular_core.state('showing', _angular_core.style({
        opacity: 1,
        minWidth: 'calc(100% + 32px)',
        transform: "translate3d(0,0,0) scaleY(1)"
    })),
    _angular_core.transition('void => *', [
        _angular_core.style({
            opacity: 0,
            minWidth: '100%',
            transform: "translate3d(0, 0, 0) scaleY(0)"
        }),
        _angular_core.animate("150ms cubic-bezier(0.25, 0.8, 0.25, 1)")
    ]),
    _angular_core.transition('* => void', [
        _angular_core.animate('250ms 100ms linear', _angular_core.style({ opacity: 0 }))
    ])
]);
/**
 * This animation fades in the background color and text content of the
 * select's options. It is time delayed to occur 100ms after the overlay
 * panel has transformed in.
 */
var fadeInContent = _angular_core.trigger('fadeInContent', [
    _angular_core.state('showing', _angular_core.style({ opacity: 1 })),
    _angular_core.transition('void => showing', [
        _angular_core.style({ opacity: 0 }),
        _angular_core.animate("150ms 100ms cubic-bezier(0.55, 0, 0.55, 0.2)")
    ])
]);

var __decorate$42 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$42 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param$6 = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
/**
 * The following style constants are necessary to save here in order
 * to properly calculate the alignment of the selected option over
 * the trigger element.
 */
/** The fixed height of every option element. */
var SELECT_OPTION_HEIGHT = 48;
/** The max height of the select's overlay panel */
var SELECT_PANEL_MAX_HEIGHT = 256;
/** The max number of options visible at once in the select panel. */
var SELECT_MAX_OPTIONS_DISPLAYED = 5;
/** The fixed height of the select's trigger element. */
var SELECT_TRIGGER_HEIGHT = 30;
/**
 * Must adjust for the difference in height between the option and the trigger,
 * so the text will align on the y axis.
 * (SELECT_OPTION_HEIGHT (48) - SELECT_TRIGGER_HEIGHT (30)) / 2 = 9
 */
var SELECT_OPTION_HEIGHT_ADJUSTMENT = 9;
/** The panel's padding on the x-axis */
var SELECT_PANEL_PADDING_X = 16;
/**
 * The panel's padding on the y-axis. This padding indicates there are more
 * options available if you scroll.
 */
var SELECT_PANEL_PADDING_Y = 16;
/**
 * The select panel will only "fit" inside the viewport if it is positioned at
 * this value or more away from the viewport boundary.
 */
var SELECT_PANEL_VIEWPORT_PADDING = 8;
/** Change event object that is emitted when the select value has changed. */
var Md2SelectChange = (function () {
    function Md2SelectChange(source, value) {
        this.source = source;
        this.value = value;
    }
    return Md2SelectChange;
}());
var Md2Select = (function () {
    function Md2Select(_element, _renderer, _viewportRuler, _dir, _control) {
        this._element = _element;
        this._renderer = _renderer;
        this._viewportRuler = _viewportRuler;
        this._dir = _dir;
        this._control = _control;
        /** Whether or not the overlay panel is open. */
        this._panelOpen = false;
        /** The currently selected option. */
        this._selected = [];
        /** Subscriptions to option events. */
        this._subscriptions = [];
        /** Whether filling out the select is required in the form.  */
        this._required = false;
        /** Whether the select is disabled.  */
        this._disabled = false;
        /** Whether the select is multiple.  */
        this._multiple = false;
        /** The scroll position of the overlay panel, calculated to center the selected option. */
        this._scrollTop = 0;
        /** The animation state of the placeholder. */
        this._placeholderState = '';
        /** View -> model callback called when value changes */
        this._onChange = function (value) { };
        /** View -> model callback called when select has been touched */
        this._onTouched = function () { };
        /** The IDs of child options to be passed to the aria-owns attribute. */
        this._optionIds = '';
        /** The value of the select panel's transform-origin property. */
        this._transformOrigin = 'top';
        /** Whether the panel's animation is done. */
        this._panelDoneAnimating = false;
        /**
         * The x-offset of the overlay panel in relation to the trigger's top start corner.
         * This must be adjusted to align the selected option text over the trigger text when
         * the panel opens. Will change based on LTR or RTL text direction.
         */
        this._offsetX = 0;
        /**
         * The y-offset of the overlay panel in relation to the trigger's top start corner.
         * This must be adjusted to align the selected option text over the trigger text.
         * when the panel opens. Will change based on the y-position of the selected option.
         */
        this._offsetY = 0;
        /**
         * This position config ensures that the top "start" corner of the overlay
         * is aligned with with the top "start" of the origin by default (overlapping
         * the trigger completely). If the panel cannot fit below the trigger, it
         * will fall back to a position above the trigger.
         */
        this._positions = [
            {
                originX: 'start',
                originY: 'top',
                overlayX: 'start',
                overlayY: 'top',
            },
            {
                originX: 'start',
                originY: 'bottom',
                overlayX: 'start',
                overlayY: 'bottom',
            },
        ];
        /** Event emitted when the select has been opened. */
        this.onOpen = new _angular_core.EventEmitter();
        /** Event emitted when the select has been closed. */
        this.onClose = new _angular_core.EventEmitter();
        /** Event emitted when the selected value has been changed by the user. */
        this.change = new _angular_core.EventEmitter();
        if (this._control) {
            this._control.valueAccessor = this;
        }
    }
    Object.defineProperty(Md2Select.prototype, "placeholder", {
        /** Placeholder to be shown if no value has been selected. */
        get: function () { return this._placeholder; },
        set: function (value) {
            var _this = this;
            this._placeholder = value;
            // Must wait to record the trigger width to ensure placeholder width is included.
            Promise.resolve(null).then(function () { return _this._triggerWidth = _this._getWidth(); });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Select.prototype, "disabled", {
        /** Whether the component is disabled. */
        get: function () { return this._disabled; },
        set: function (value) {
            this._disabled = coerceBooleanProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Select.prototype, "multiple", {
        /** Whether the component is multiple. */
        get: function () { return this._multiple; },
        set: function (value) { this._multiple = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Select.prototype, "required", {
        /** Whether the component is required. */
        get: function () { return this._required; },
        set: function (value) { this._required = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Md2Select.prototype.ngAfterContentInit = function () {
        var _this = this;
        this._initKeyManager();
        this._resetOptions();
        this._changeSubscription = this.options.changes.subscribe(function () {
            _this._resetOptions();
            if (_this._control) {
                // Defer setting the value in order to avoid the "Expression
                // has changed after it was checked" errors from Angular.
                Promise.resolve(null).then(function () { return _this._setSelectionByValue(_this._control.value); });
            }
        });
    };
    Md2Select.prototype.ngOnDestroy = function () {
        this._dropSubscriptions();
        if (this._changeSubscription) {
            this._changeSubscription.unsubscribe();
        }
        if (this._tabSubscription) {
            this._tabSubscription.unsubscribe();
        }
    };
    /** Toggles the overlay panel open or closed. */
    Md2Select.prototype.toggle = function () {
        this.panelOpen ? this.close() : this.open();
    };
    /** Opens the overlay panel. */
    Md2Select.prototype.open = function () {
        if (this.disabled) {
            return;
        }
        this._triggerWidth = this._getWidth();
        this._calculateOverlayPosition();
        this._placeholderState = this._isRtl() ? 'floating-rtl' : 'floating-ltr';
        this._panelOpen = true;
    };
    /** Closes the overlay panel and focuses the host element. */
    Md2Select.prototype.close = function () {
        this._panelOpen = false;
        if (!this._selected.length) {
            this._placeholderState = '';
        }
        this._focusHost();
    };
    /**
     * Sets the select's value. Part of the ControlValueAccessor interface
     * required to integrate with Angular's core forms API.
     *
     * @param value New value to be written to the model.
     */
    Md2Select.prototype.writeValue = function (value) {
        var _this = this;
        if (!this.options) {
            // In reactive forms, writeValue() will be called synchronously before
            // the select's child options have been created. It's necessary to call
            // writeValue() again after the options have been created to ensure any
            // initial view value is set.
            Promise.resolve(null).then(function () { return _this.writeValue(value); });
            return;
        }
        this._setSelectionByValue(value);
    };
    /**
     * Saves a callback function to be invoked when the select's value
     * changes from user input. Part of the ControlValueAccessor interface
     * required to integrate with Angular's core forms API.
     *
     * @param fn Callback to be triggered when the value changes.
     */
    Md2Select.prototype.registerOnChange = function (fn) {
        this._onChange = fn;
    };
    /**
     * Saves a callback function to be invoked when the select is blurred
     * by the user. Part of the ControlValueAccessor interface required
     * to integrate with Angular's core forms API.
     *
     * @param fn Callback to be triggered when the component has been touched.
     */
    Md2Select.prototype.registerOnTouched = function (fn) {
        this._onTouched = fn;
    };
    /**
     * Disables the select. Part of the ControlValueAccessor interface required
     * to integrate with Angular's core forms API.
     *
     * @param isDisabled Sets whether the component is disabled.
     */
    Md2Select.prototype.setDisabledState = function (isDisabled) {
        this.disabled = isDisabled;
    };
    Object.defineProperty(Md2Select.prototype, "panelOpen", {
        /** Whether or not the overlay panel is open. */
        get: function () {
            return this._panelOpen;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Select.prototype, "selected", {
        /** The currently selected option. */
        get: function () {
            return this._selected;
        },
        enumerable: true,
        configurable: true
    });
    Md2Select.prototype._isRtl = function () {
        return this._dir ? this._dir.value === 'rtl' : false;
    };
    /** The width of the trigger element. This is necessary to match
     * the overlay width to the trigger width.
     */
    Md2Select.prototype._getWidth = function () {
        return this._getTriggerRect().width;
    };
    /** Ensures the panel opens if activated by the keyboard. */
    Md2Select.prototype._handleKeydown = function (event) {
        if (event.keyCode === ENTER || event.keyCode === SPACE) {
            this.open();
        }
    };
    /**
     * When the panel element is finished transforming in (though not fading in), it
     * emits an event and focuses an option if the panel is open.
     */
    Md2Select.prototype._onPanelDone = function () {
        if (this.panelOpen) {
            this._focusCorrectOption();
            this.onOpen.emit();
        }
        else {
            this.onClose.emit();
        }
    };
    /**
     * When the panel content is done fading in, the _panelDoneAnimating property is
     * set so the proper class can be added to the panel.
     */
    Md2Select.prototype._onFadeInDone = function () {
        this._panelDoneAnimating = this.panelOpen;
    };
    /**
     * Calls the touched callback only if the panel is closed. Otherwise, the trigger will
     * "blur" to the panel when it opens, causing a false positive.
     */
    Md2Select.prototype._onBlur = function () {
        if (!this.panelOpen) {
            this._onTouched();
        }
    };
    /** Returns the correct tabindex for the select depending on disabled state. */
    Md2Select.prototype._getTabIndex = function () {
        return this.disabled ? '-1' : '0';
    };
    /**
     * Sets the scroll position of the scroll container. This must be called after
     * the overlay pane is attached or the scroll container element will not yet be
     * present in the DOM.
     */
    Md2Select.prototype._setScrollTop = function () {
        var scrollContainer = this.overlayDir.overlayRef.overlayElement.querySelector('.md2-select-panel');
        scrollContainer.scrollTop = this._scrollTop;
    };
    /**
     * Sets the selected option based on a value. If no option can be
     * found with the designated value, the select trigger is cleared.
     */
    Md2Select.prototype._setSelectionByValue = function (value) {
        var _this = this;
        var options = this.options.toArray();
        if (this.multiple) {
            this._selected = [];
            value = Array.isArray(value) ? value : [];
            var _loop_1 = function(i) {
                value.find(function (v) {
                    if (_this._equals(v, options[i].value)) {
                        options[i].select();
                    }
                });
            };
            for (var i = 0; i < this.options.length; i++) {
                _loop_1(i);
            }
            this._updateOptions();
        }
        else {
            for (var i = 0; i < this.options.length; i++) {
                if (this._equals(options[i].value, value)) {
                    options[i].select();
                    return;
                }
            }
            // Clear selection if no item was selected.
            this._clearSelection();
        }
    };
    /** Clears the select trigger and deselects every option in the list. */
    Md2Select.prototype._clearSelection = function () {
        this._selected = [];
        this._updateOptions();
    };
    Md2Select.prototype._getTriggerRect = function () {
        return this.trigger.nativeElement.getBoundingClientRect();
    };
    /** Sets up a key manager to listen to keyboard events on the overlay panel. */
    Md2Select.prototype._initKeyManager = function () {
        var _this = this;
        this._keyManager = new FocusKeyManager(this.options);
        this._tabSubscription = this._keyManager.tabOut.subscribe(function () {
            _this.close();
        });
    };
    /** Drops current option subscriptions and IDs and resets from scratch. */
    Md2Select.prototype._resetOptions = function () {
        this._dropSubscriptions();
        this._listenToOptions();
        this._setOptionIds();
    };
    /** Listens to selection events on each option. */
    Md2Select.prototype._listenToOptions = function () {
        var _this = this;
        this.options.forEach(function (option) {
            var sub = option.onSelect.subscribe(function (event) {
                if (_this.multiple) {
                    var ind = _this._selected.indexOf(option);
                    if (ind < 0) {
                        _this._selected.push(option);
                        _this._selected = _this._selected.sort(function (a, b) {
                            return _this.options.toArray().indexOf(a) - _this.options.toArray().indexOf(b);
                        });
                    }
                    else {
                        _this._selected.splice(ind, 1);
                    }
                }
                else {
                    _this._selected[0] = option;
                    if (_this.panelOpen) {
                        _this.close();
                    }
                }
                if (event.isUserInput) {
                    _this._emitChangeEvent();
                }
                _this._updateOptions();
                _this._setValueWidth();
                _this._placeholderState = '';
            });
            _this._subscriptions.push(sub);
        });
    };
    /** Unsubscribes from all option subscriptions. */
    Md2Select.prototype._dropSubscriptions = function () {
        this._subscriptions.forEach(function (sub) { return sub.unsubscribe(); });
        this._subscriptions = [];
    };
    /** Emits an event when the user selects an option. */
    Md2Select.prototype._emitChangeEvent = function () {
        var value;
        if (this.multiple) {
            value = this._selected.map(function (option) { return option.value; });
        }
        else {
            value = this._selected[0].value;
        }
        this._onChange(value);
        this.change.emit(new Md2SelectChange(this, value));
    };
    /** Records option IDs to pass to the aria-owns property. */
    Md2Select.prototype._setOptionIds = function () {
        this._optionIds = this.options.map(function (option) { return option.id; }).join(' ');
    };
    /** Deselect each option that doesn't match the current selection. */
    Md2Select.prototype._updateOptions = function () {
        var _this = this;
        this.options.forEach(function (option) {
            if (_this.multiple) {
                if (_this._selected.indexOf(option) < 0) {
                    option.deselect();
                }
            }
            else {
                if (option !== _this.selected[0]) {
                    option.deselect();
                }
            }
        });
    };
    /**
     * Must set the width of the selected option's value programmatically
     * because it is absolutely positioned and otherwise will not clip
     * overflow. The selection arrow is 9px wide, add 4px of padding = 13
     */
    Md2Select.prototype._setValueWidth = function () {
        this._selectedValueWidth = this._triggerWidth - 13;
    };
    /** Focuses the selected item. If no option is selected, it will focus
     * the first item instead.
     */
    Md2Select.prototype._focusCorrectOption = function () {
        if (this.selected.length) {
            this._keyManager.setActiveItem(this._getOptionIndex(this.selected[0]));
        }
        else {
            this._keyManager.setFirstItemActive();
        }
    };
    /** Focuses the host element when the panel closes. */
    Md2Select.prototype._focusHost = function () {
        this._renderer.invokeElementMethod(this._element.nativeElement, 'focus');
    };
    /** Gets the index of the provided option in the option list. */
    Md2Select.prototype._getOptionIndex = function (option) {
        return this.options.reduce(function (result, current, index) {
            return result === undefined ? (option === current ? index : undefined) : result;
        }, undefined);
    };
    /** Calculates the scroll position and x- and y-offsets of the overlay panel. */
    Md2Select.prototype._calculateOverlayPosition = function () {
        this._offsetX = this._isRtl() ? SELECT_PANEL_PADDING_X : -SELECT_PANEL_PADDING_X;
        var panelHeight = Math.min(this.options.length * SELECT_OPTION_HEIGHT, SELECT_PANEL_MAX_HEIGHT);
        var scrollContainerHeight = this.options.length * SELECT_OPTION_HEIGHT;
        // The farthest the panel can be scrolled before it hits the bottom
        var maxScroll = scrollContainerHeight - panelHeight;
        if (this.selected) {
            var selectedIndex = this._getOptionIndex(this.selected[0]);
            // We must maintain a scroll buffer so the selected option will be scrolled to the
            // center of the overlay panel rather than the top.
            var scrollBuffer = panelHeight / 2;
            this._scrollTop = this._calculateOverlayScroll(selectedIndex, scrollBuffer, maxScroll);
            this._offsetY = this._calculateOverlayOffset(selectedIndex, scrollBuffer, maxScroll);
        }
        else {
            // If no option is selected, the panel centers on the first option. In this case,
            // we must only adjust for the height difference between the option element
            // and the trigger element, then multiply it by -1 to ensure the panel moves
            // in the correct direction up the page.
            this._offsetY = (SELECT_OPTION_HEIGHT - SELECT_TRIGGER_HEIGHT) / 2 * -1;
        }
        this._checkOverlayWithinViewport(maxScroll);
    };
    /**
     * Calculates the scroll position of the select's overlay panel.
     *
     * Attempts to center the selected option in the panel. If the option is
     * too high or too low in the panel to be scrolled to the center, it clamps the
     * scroll position to the min or max scroll positions respectively.
     */
    Md2Select.prototype._calculateOverlayScroll = function (selectedIndex, scrollBuffer, maxScroll) {
        var optionOffsetFromScrollTop = SELECT_OPTION_HEIGHT * selectedIndex;
        var halfOptionHeight = SELECT_OPTION_HEIGHT / 2;
        // Starts at the optionOffsetFromScrollTop, which scrolls the option to the top of the
        // scroll container, then subtracts the scroll buffer to scroll the option down to
        // the center of the overlay panel. Half the option height must be re-added to the
        // scrollTop so the option is centered based on its middle, not its top edge.
        var optimalScrollPosition = optionOffsetFromScrollTop - scrollBuffer + halfOptionHeight;
        return clampValue(0, optimalScrollPosition, maxScroll);
    };
    /**
     * Calculates the y-offset of the select's overlay panel in relation to the
     * top start corner of the trigger. It has to be adjusted in order for the
     * selected option to be aligned over the trigger when the panel opens.
     */
    Md2Select.prototype._calculateOverlayOffset = function (selectedIndex, scrollBuffer, maxScroll) {
        var optionOffsetFromPanelTop;
        if (this._scrollTop === 0) {
            optionOffsetFromPanelTop = selectedIndex * SELECT_OPTION_HEIGHT;
        }
        else if (this._scrollTop === maxScroll) {
            var firstDisplayedIndex = this.options.length - SELECT_MAX_OPTIONS_DISPLAYED;
            var selectedDisplayIndex = selectedIndex - firstDisplayedIndex;
            // Because the panel height is longer than the height of the options alone,
            // there is always extra padding at the top or bottom of the panel. When
            // scrolled to the very bottom, this padding is at the top of the panel and
            // must be added to the offset.
            optionOffsetFromPanelTop =
                selectedDisplayIndex * SELECT_OPTION_HEIGHT + SELECT_PANEL_PADDING_Y;
        }
        else {
            // If the option was scrolled to the middle of the panel using a scroll buffer,
            // its offset will be the scroll buffer minus the half height that was added to
            // center it.
            optionOffsetFromPanelTop = scrollBuffer - SELECT_OPTION_HEIGHT / 2;
        }
        // The final offset is the option's offset from the top, adjusted for the height
        // difference, multiplied by -1 to ensure that the overlay moves in the correct
        // direction up the page.
        return optionOffsetFromPanelTop * -1 - SELECT_OPTION_HEIGHT_ADJUSTMENT;
    };
    /**
     * Checks that the attempted overlay position will fit within the viewport.
     * If it will not fit, tries to adjust the scroll position and the associated
     * y-offset so the panel can open fully on-screen. If it still won't fit,
     * sets the offset back to 0 to allow the fallback position to take over.
     */
    Md2Select.prototype._checkOverlayWithinViewport = function (maxScroll) {
        var viewportRect = this._viewportRuler.getViewportRect();
        var triggerRect = this._getTriggerRect();
        var topSpaceAvailable = triggerRect.top - SELECT_PANEL_VIEWPORT_PADDING;
        var bottomSpaceAvailable = viewportRect.height - triggerRect.bottom - SELECT_PANEL_VIEWPORT_PADDING;
        var panelHeightTop = Math.abs(this._offsetY);
        var totalPanelHeight = Math.min(this.options.length * SELECT_OPTION_HEIGHT, SELECT_PANEL_MAX_HEIGHT);
        var panelHeightBottom = totalPanelHeight - panelHeightTop - triggerRect.height;
        if (panelHeightBottom > bottomSpaceAvailable) {
            this._adjustPanelUp(panelHeightBottom, bottomSpaceAvailable);
        }
        else if (panelHeightTop > topSpaceAvailable) {
            this._adjustPanelDown(panelHeightTop, topSpaceAvailable, maxScroll);
        }
        else {
            this._transformOrigin = this._getOriginBasedOnOption();
        }
    };
    /** Adjusts the overlay panel up to fit in the viewport. */
    Md2Select.prototype._adjustPanelUp = function (panelHeightBottom, bottomSpaceAvailable) {
        var distanceBelowViewport = panelHeightBottom - bottomSpaceAvailable;
        // Scrolls the panel up by the distance it was extending past the boundary, then
        // adjusts the offset by that amount to move the panel up into the viewport.
        this._scrollTop -= distanceBelowViewport;
        this._offsetY -= distanceBelowViewport;
        this._transformOrigin = this._getOriginBasedOnOption();
        // If the panel is scrolled to the very top, it won't be able to fit the panel
        // by scrolling, so set the offset to 0 to allow the fallback position to take
        // effect.
        if (this._scrollTop <= 0) {
            this._scrollTop = 0;
            this._offsetY = 0;
            this._transformOrigin = "50% bottom 0px";
        }
    };
    /** Adjusts the overlay panel down to fit in the viewport. */
    Md2Select.prototype._adjustPanelDown = function (panelHeightTop, topSpaceAvailable, maxScroll) {
        var distanceAboveViewport = panelHeightTop - topSpaceAvailable;
        // Scrolls the panel down by the distance it was extending past the boundary, then
        // adjusts the offset by that amount to move the panel down into the viewport.
        this._scrollTop += distanceAboveViewport;
        this._offsetY += distanceAboveViewport;
        this._transformOrigin = this._getOriginBasedOnOption();
        // If the panel is scrolled to the very bottom, it won't be able to fit the
        // panel by scrolling, so set the offset to 0 to allow the fallback position
        // to take effect.
        if (this._scrollTop >= maxScroll) {
            this._scrollTop = maxScroll;
            this._offsetY = 0;
            this._transformOrigin = "50% top 0px";
            return;
        }
    };
    /** Sets the transform origin point based on the selected option. */
    Md2Select.prototype._getOriginBasedOnOption = function () {
        var originY = Math.abs(this._offsetY) - SELECT_OPTION_HEIGHT_ADJUSTMENT + SELECT_OPTION_HEIGHT / 2;
        return "50% " + originY + "px 0px";
    };
    Md2Select.prototype._equals = function (o1, o2) {
        if (o1 === o2) {
            return true;
        }
        if (o1 === null || o2 === null) {
            return false;
        }
        if (o1 !== o1 && o2 !== o2) {
            return true;
        }
        var t1 = typeof o1, t2 = typeof o2, key, keySet;
        if (t1 === t2 && t1 === 'object') {
            keySet = Object.create(null);
            for (key in o1) {
                if (!this._equals(o1[key], o2[key])) {
                    return false;
                }
                keySet[key] = true;
            }
            for (key in o2) {
                if (!(key in keySet) && key.charAt(0) !== '$' && o2[key]) {
                    return false;
                }
            }
            return true;
        }
        return false;
    };
    __decorate$42([
        _angular_core.ViewChild('trigger'), 
        __metadata$42('design:type', _angular_core.ElementRef)
    ], Md2Select.prototype, "trigger", void 0);
    __decorate$42([
        _angular_core.ViewChild(ConnectedOverlayDirective), 
        __metadata$42('design:type', ConnectedOverlayDirective)
    ], Md2Select.prototype, "overlayDir", void 0);
    __decorate$42([
        _angular_core.ContentChildren(Md2Option), 
        __metadata$42('design:type', _angular_core.QueryList)
    ], Md2Select.prototype, "options", void 0);
    __decorate$42([
        _angular_core.Input(), 
        __metadata$42('design:type', Object)
    ], Md2Select.prototype, "placeholder", null);
    __decorate$42([
        _angular_core.Input(), 
        __metadata$42('design:type', Object)
    ], Md2Select.prototype, "disabled", null);
    __decorate$42([
        _angular_core.Input(), 
        __metadata$42('design:type', Object)
    ], Md2Select.prototype, "multiple", null);
    __decorate$42([
        _angular_core.Input(), 
        __metadata$42('design:type', Object)
    ], Md2Select.prototype, "required", null);
    __decorate$42([
        _angular_core.Output(), 
        __metadata$42('design:type', _angular_core.EventEmitter)
    ], Md2Select.prototype, "onOpen", void 0);
    __decorate$42([
        _angular_core.Output(), 
        __metadata$42('design:type', _angular_core.EventEmitter)
    ], Md2Select.prototype, "onClose", void 0);
    __decorate$42([
        _angular_core.Output(), 
        __metadata$42('design:type', _angular_core.EventEmitter)
    ], Md2Select.prototype, "change", void 0);
    Md2Select = __decorate$42([
        _angular_core.Component({selector: 'md2-select',
            template: "<div class=\"md2-select-trigger\" cdk-overlay-origin (click)=\"toggle()\" #origin=\"cdkOverlayOrigin\" #trigger> <span class=\"md2-select-placeholder\" [class.md2-floating-placeholder]=\"selected.length\" [@transformPlaceholder]=\"_placeholderState\" [style.width.px]=\"_selectedValueWidth\">{{ placeholder }}</span> <span class=\"md2-select-value\"> <span class=\"md2-select-value-text\" *ngFor=\"let option of selected\"> {{ option.viewValue }} </span> </span> <span class=\"md2-select-arrow\"></span> </div> <template cdk-connected-overlay [origin]=\"origin\" [open]=\"panelOpen\" hasBackdrop (backdropClick)=\"close()\" backdropClass=\"cdk-overlay-transparent-backdrop\" [positions]=\"_positions\" [minWidth]=\"_triggerWidth\" [offsetY]=\"_offsetY\" [offsetX]=\"_offsetX\" (attach)=\"_setScrollTop()\"> <div class=\"md2-select-panel\" [@transformPanel]=\"'showing'\" (@transformPanel.done)=\"_onPanelDone()\" (keydown)=\"_keyManager.onKeydown($event)\" [style.transformOrigin]=\"_transformOrigin\" [attr.multiple]=\"multiple\" [class.md2-select-panel-done-animating]=\"_panelDoneAnimating\"> <div class=\"md2-select-content\" [@fadeInContent]=\"'showing'\" (@fadeInContent.done)=\"_onFadeInDone()\"> <ng-content></ng-content> </div> </div> </template> ",
            styles: ["md2-select { display: block; outline: none; } .md2-select-trigger { color: rgba(0, 0, 0, 0.38); border-bottom: 1px solid rgba(0, 0, 0, 0.12); display: flex; justify-content: space-between; align-items: center; height: 30px; min-width: 112px; line-height: 22px; cursor: pointer; position: relative; box-sizing: border-box; } [aria-disabled='true'] .md2-select-trigger { background-image: linear-gradient(to right, rgba(0, 0, 0, 0.26) 0, rgba(0, 0, 0, 0.26) 33%, transparent 0); background-size: 4px 1px; background-repeat: repeat-x; border-color: transparent; background-position: 0 bottom; cursor: default; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; } md2-select:focus:not(.md2-select-disabled) .md2-select-trigger { color: #106cc8; border-color: #106cc8; } md2-select.ng-invalid.ng-touched:not(.md2-select-disabled) .md2-select-trigger { color: #f44336; border-color: #f44336; } .md2-select-placeholder { position: absolute; right: 18px; left: 0; padding: 0 2px; transform-origin: left top; white-space: nowrap; overflow-x: hidden; text-overflow: ellipsis; } .md2-select-placeholder.md2-floating-placeholder { top: -16px; left: -2px; text-align: left; transform: scale(0.75); } [dir='rtl'] .md2-select-placeholder { transform-origin: right top; } [dir='rtl'] .md2-select-placeholder.md2-floating-placeholder { left: 2px; text-align: right; } [aria-required=true] .md2-select-placeholder::after { content: '*'; } .md2-select-value { position: relative; white-space: nowrap; overflow-x: hidden; text-overflow: ellipsis; color: rgba(0, 0, 0, 0.87); } .md2-select-disabled .md2-select-value { color: rgba(0, 0, 0, 0.38); } [dir='rtl'] .md2-select-value { left: auto; right: 0; } .md2-select-value-text:not(:last-child)::after { content: ','; margin-left: -2px; } .md2-select-arrow { width: 0; height: 0; border-left: 5px solid transparent; border-right: 5px solid transparent; border-top: 5px solid; margin: 0 4px; color: rgba(0, 0, 0, 0.38); } md2-select:focus:not(.md2-select-disabled) .md2-select-arrow { color: #106cc8; } md2-select.ng-invalid.ng-touched:not(.md2-select-disabled) .md2-select-arrow { color: #f44336; } .md2-select-panel { box-shadow: 0 0 3px rgba(0, 0, 0, 0.2), 0 8px 10px 1px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12); min-width: 112px; max-width: 280px; overflow: auto; -webkit-overflow-scrolling: touch; padding-top: 0; padding-bottom: 0; max-height: 256px; background: white; } md2-option { white-space: nowrap; overflow-x: hidden; text-overflow: ellipsis; display: block; flex-direction: row; align-items: center; padding: 13px 16px; font-size: 16px; font-family: Roboto, 'Helvetica Neue', sans-serif; text-align: start; text-decoration: none; position: relative; cursor: pointer; outline: none; box-sizing: padding-box; } md2-option[aria-disabled='true'] { cursor: default; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; } md2-option:hover:not(.md2-option-disabled), md2-option:focus:not(.md2-option-disabled) { background: rgba(0, 0, 0, 0.04); } md2-option.md2-selected { color: #106cc8; } md2-option.md2-option-disabled { color: rgba(0, 0, 0, 0.38); } [multiple='true'] md2-option { padding-left: 40px; } [multiple='true'] md2-option::after { content: ''; position: absolute; top: 50%; left: 12px; display: block; width: 16px; height: 16px; margin-top: -8px; border: 2px solid; border-radius: 2px; box-sizing: border-box; transition: 240ms; } [multiple='true'] md2-option.md2-selected::after { transform: rotate(-45deg); height: 8px; border-width: 0 0 2px 2px; } .cdk-overlay-container, .cdk-global-overlay-wrapper { pointer-events: none; top: 0; left: 0; height: 100%; width: 100%; } .cdk-overlay-container { position: fixed; z-index: 1000; } .cdk-overlay-pane { position: absolute; pointer-events: auto; box-sizing: border-box; z-index: 1000; } .cdk-overlay-backdrop { position: absolute; top: 0; bottom: 0; left: 0; right: 0; z-index: 1000; pointer-events: auto; transition: opacity 400ms cubic-bezier(0.25, 0.8, 0.25, 1); opacity: 0; } .cdk-overlay-transparent-backdrop { background: none; } .cdk-overlay-backdrop.cdk-overlay-backdrop-showing { opacity: 0.48; } /*# sourceMappingURL=select.css.map */ "],
            encapsulation: _angular_core.ViewEncapsulation.None,
            host: {
                'role': 'listbox',
                '[attr.tabindex]': '_getTabIndex()',
                '[attr.aria-label]': 'placeholder',
                '[attr.aria-required]': 'required.toString()',
                '[attr.aria-disabled]': 'disabled.toString()',
                '[attr.aria-invalid]': '_control?.invalid || "false"',
                '[attr.aria-owns]': '_optionIds',
                '[class.md2-select-disabled]': 'disabled',
                '(keydown)': '_handleKeydown($event)',
                '(blur)': '_onBlur()'
            },
            animations: [
                transformPlaceholder,
                transformPanel,
                fadeInContent
            ],
            exportAs: 'md2Select',
        }),
        __param$6(3, _angular_core.Optional()),
        __param$6(4, _angular_core.Self()),
        __param$6(4, _angular_core.Optional()), 
        __metadata$42('design:paramtypes', [_angular_core.ElementRef, _angular_core.Renderer, ViewportRuler, Dir, _angular_forms.NgControl])
    ], Md2Select);
    return Md2Select;
}());
/** Clamps a value n between min and max values. */
function clampValue(min, n, max) {
    return Math.min(Math.max(min, n), max);
}

var __decorate$41 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$41 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var Md2SelectModule = (function () {
    function Md2SelectModule() {
    }
    /** @deprecated */
    Md2SelectModule.forRoot = function () {
        return {
            ngModule: Md2SelectModule,
            providers: []
        };
    };
    Md2SelectModule = __decorate$41([
        _angular_core.NgModule({
            imports: [_angular_common.CommonModule, OverlayModule, Md2OptionModule, CompatibilityModule],
            exports: [Md2Select, Md2OptionModule, CompatibilityModule],
            declarations: [Md2Select],
        }), 
        __metadata$41('design:paramtypes', [])
    ], Md2SelectModule);
    return Md2SelectModule;
}());

var __decorate$40 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$40 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param$5 = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var Md2PaginationChange = (function () {
    function Md2PaginationChange() {
    }
    return Md2PaginationChange;
}());
var Md2DataTable = (function () {
    function Md2DataTable(differs) {
        this.differs = differs;
        this.isDataChanged = false;
        this._data = [];
        this._activePage = 1;
        this._rowsPerPage = 1000;
        this._sortBy = '';
        this._sortOrder = 'asc';
        this.activePageChange = new _angular_core.EventEmitter();
        this.sortByChange = new _angular_core.EventEmitter();
        this.sortOrderChange = new _angular_core.EventEmitter();
        this.onSortChange = new _angular_core.EventEmitter();
        this.onPageChange = new _angular_core.EventEmitter();
        this.diff = differs.find([]).create(null);
    }
    Object.defineProperty(Md2DataTable.prototype, "md2Data", {
        get: function () { return this._data; },
        set: function (value) {
            if (this._data !== value) {
                this._data = value || [];
                this.recalculatePage();
                this.isDataChanged = true;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2DataTable.prototype, "activePage", {
        get: function () { return this._activePage; },
        set: function (value) {
            if (this._activePage !== value) {
                this._activePage = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2DataTable.prototype, "rowsPerPage", {
        get: function () { return this._rowsPerPage; },
        set: function (value) {
            if (this._rowsPerPage !== value) {
                this._rowsPerPage = value;
                this.setPage(this.activePage, value);
                this.isDataChanged = true;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2DataTable.prototype, "sortBy", {
        get: function () { return this._sortBy; },
        set: function (value) {
            if (this._sortBy !== value) {
                this._sortBy = value;
                if (value) {
                    this.onSortChange.next({ sortBy: this.sortBy, sortOrder: this.sortOrder });
                }
                this.isDataChanged = true;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2DataTable.prototype, "sortOrder", {
        get: function () { return this._sortOrder; },
        set: function (value) {
            if (!(value === 'asc' || value === 'desc')) {
                console.warn('sortOrder value must be one of ["asc", "desc"], but is:', value);
                value = 'asc';
            }
            if (this._sortOrder !== value) {
                this._sortOrder = value;
                this.isDataChanged = true;
            }
        },
        enumerable: true,
        configurable: true
    });
    Md2DataTable.prototype.ngDoCheck = function () {
        var changes = this.diff.diff(this.md2Data);
        if (changes) {
            this.recalculatePage();
            this.isDataChanged = true;
        }
        if (this.isDataChanged) {
            this.fillData();
            this.diff.diff(this.md2Data);
            this.isDataChanged = false;
        }
    };
    Md2DataTable.prototype.getSort = function () {
        return { sortBy: this.sortBy, sortOrder: this.sortOrder };
    };
    Md2DataTable.prototype.setSort = function (sortBy, sortOrder) {
        if (this.sortBy !== sortBy || this.sortOrder !== sortOrder) {
            this.sortBy = sortBy;
            this.sortOrder = sortOrder;
            this.isDataChanged = true;
            this.onSortChange.next({ sortBy: sortBy, sortOrder: sortOrder });
            this.sortByChange.emit(this.sortBy);
            this.sortOrderChange.emit(this.sortOrder);
        }
    };
    Md2DataTable.prototype.getPage = function () {
        return {
            activePage: this.activePage,
            rowsPerPage: this.rowsPerPage,
            dataLength: this.md2Data.length
        };
    };
    Md2DataTable.prototype.setPage = function (activePage, rowsPerPage) {
        if (this.rowsPerPage !== rowsPerPage || this.activePage !== activePage) {
            this.activePage = this.activePage !== activePage ?
                activePage : this.calculateNewActivePage(this.rowsPerPage, rowsPerPage);
            this.rowsPerPage = rowsPerPage;
            this.isDataChanged = true;
            this.onPageChange.emit({
                activePage: this.activePage,
                rowsPerPage: this.rowsPerPage,
                dataLength: this.md2Data ? this.md2Data.length : 0
            });
            this.activePageChange.emit(this.activePage);
        }
    };
    Md2DataTable.prototype.calculateNewActivePage = function (previousRowsPerPage, currentRowsPerPage) {
        var firstRowOnPage = (this.activePage - 1) * previousRowsPerPage + 1;
        var newActivePage = Math.ceil(firstRowOnPage / currentRowsPerPage);
        return newActivePage;
    };
    Md2DataTable.prototype.recalculatePage = function () {
        var _this = this;
        var lastPage = Math.ceil(this.md2Data.length / this.rowsPerPage);
        if (lastPage < this.activePage) {
            this._activePage = lastPage || 1;
            setTimeout(function () {
                _this.activePageChange.emit(_this.activePage);
            }, 10);
        }
        else { }
        this.onPageChange.emit({
            activePage: this.activePage,
            rowsPerPage: this.rowsPerPage,
            dataLength: this.md2Data.length
        });
    };
    Md2DataTable.prototype.fillData = function () {
        var _this = this;
        var offset = (this.activePage - 1) * this.rowsPerPage;
        var data = this.md2Data;
        var sortInt = this.sortOrder === 'desc' ? -1 : 1;
        if (this.sortBy) {
            data = data.sort(function (a, b) {
                var x = _this.caseInsensitiveIteratee(a);
                var y = _this.caseInsensitiveIteratee(b);
                return ((x > y) ? 1 : (y > x) ? -1 : 0) * sortInt;
            });
        }
        this.data = data.slice(offset, offset + this.rowsPerPage);
    };
    Md2DataTable.prototype.caseInsensitiveIteratee = function (value) {
        if (typeof this.sortBy === 'string' || this.sortBy instanceof String) {
            for (var _i = 0, _a = this.sortBy.split('.'); _i < _a.length; _i++) {
                var sortByProperty = _a[_i];
                value = value[sortByProperty];
            }
        }
        else {
            value = value[this.sortBy + ''];
        }
        if (value && typeof value === 'string' || value instanceof String) {
            return value.toLowerCase();
        }
        return value;
    };
    __decorate$40([
        _angular_core.Input(), 
        __metadata$40('design:type', Object)
    ], Md2DataTable.prototype, "md2Data", null);
    __decorate$40([
        _angular_core.Input(), 
        __metadata$40('design:type', Object)
    ], Md2DataTable.prototype, "activePage", null);
    __decorate$40([
        _angular_core.Input(), 
        __metadata$40('design:type', Object)
    ], Md2DataTable.prototype, "rowsPerPage", null);
    __decorate$40([
        _angular_core.Input(), 
        __metadata$40('design:type', Object)
    ], Md2DataTable.prototype, "sortBy", null);
    __decorate$40([
        _angular_core.Input(), 
        __metadata$40('design:type', Object)
    ], Md2DataTable.prototype, "sortOrder", null);
    __decorate$40([
        _angular_core.Output(), 
        __metadata$40('design:type', Object)
    ], Md2DataTable.prototype, "activePageChange", void 0);
    __decorate$40([
        _angular_core.Output(), 
        __metadata$40('design:type', Object)
    ], Md2DataTable.prototype, "sortByChange", void 0);
    __decorate$40([
        _angular_core.Output(), 
        __metadata$40('design:type', Object)
    ], Md2DataTable.prototype, "sortOrderChange", void 0);
    Md2DataTable = __decorate$40([
        _angular_core.Directive({
            selector: 'table[md2Data]',
            exportAs: 'md2DataTable'
        }), 
        __metadata$40('design:paramtypes', [_angular_core.IterableDiffers])
    ], Md2DataTable);
    return Md2DataTable;
}());
var Md2DataTableSortBy = (function () {
    function Md2DataTableSortBy(_md2Table) {
        this._md2Table = _md2Table;
        this._isAsc = false;
        this._isDesc = false;
    }
    Md2DataTableSortBy.prototype.ngOnInit = function () {
        var _this = this;
        this._md2Table.onSortChange.subscribe(function (event) {
            _this._isAsc = (event.sortBy === _this.md2SortBy && event.sortOrder === 'asc');
            _this._isDesc = (event.sortBy === _this.md2SortBy && event.sortOrder === 'desc');
        });
    };
    Md2DataTableSortBy.prototype._sort = function () {
        if (this._isAsc) {
            this._md2Table.setSort(this.md2SortBy, 'desc');
        }
        else {
            this._md2Table.setSort(this.md2SortBy, 'asc');
        }
    };
    __decorate$40([
        _angular_core.Input(), 
        __metadata$40('design:type', String)
    ], Md2DataTableSortBy.prototype, "md2SortBy", void 0);
    Md2DataTableSortBy = __decorate$40([
        _angular_core.Component({
            selector: '[md2SortBy]',
            template: "<ng-content></ng-content> &nbsp; <svg *ngIf=\"!_isDesc\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\"> <path d=\"M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z\" /> </svg> <svg *ngIf=\"_isDesc\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\"> <path d=\"M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z\" /> </svg> ",
            styles: ["$primary: #106cc8 !default; /* * Data Table */ /* * Sort */ [md2SortBy] { line-height: 24px; color: rgba(black, 0.54); white-space: nowrap; cursor: pointer; user-select: none; svg { display: inline-block; vertical-align: middle; fill: currentColor; opacity: 0; } &:hover:not(.md2-sort-active) { svg { color: rgba(black, 0.26); opacity: 1; } } &.md2-sort-active { color: rgba(black, 0.87); svg { opacity: 1; } } } /* * Pagination */ md2-pagination { display: block; color: rgba(black, 0.54); user-select: none; &::before, &::after { display: table; content: ''; } &::after { clear: both; } .md2-pagination { display: inline-block; margin: 8px 0; padding: 0; li { position: relative; display: inline-block; width: 36px; vertical-align: top; text-align: center; line-height: 36px; border-radius: 100px; cursor: pointer; box-sizing: border-box; &:hover:not(.disabled):not(.active) { background: rgba(black, 0.12); } &.disabled { pointer-events: none; background: transparent; cursor: default; opacity: 0.48; } &.active { background: $primary; color: white; cursor: default; } svg { fill: currentColor; margin-bottom: -7px; } } } .md2-rows-select { display: inline-block; margin: 8px 0; padding: 0; float: right; color: rgba(black, 0.54); line-height: 36px; md2-select { display: inline-block; border: 0; outline: 0; } .md2-select-trigger { border-width: 0; min-width: 40px; } } } "],
            host: {
                '[class.md2-sort-active]': '_isAsc || _isDesc',
                '(click)': '_sort()'
            },
            encapsulation: _angular_core.ViewEncapsulation.None
        }), 
        __metadata$40('design:paramtypes', [Md2DataTable])
    ], Md2DataTableSortBy);
    return Md2DataTableSortBy;
}());
var Md2Pagination = (function () {
    function Md2Pagination(_dataTable) {
        var _this = this;
        this._dataTable = _dataTable;
        this._activePage = 1;
        this.rowsPerPageSet = [];
        this._dataLength = 0;
        this.onPageChangeSubscriber = function (event) {
            _this._activePage = event.activePage;
            _this._rowsPerPage = event.rowsPerPage;
            _this._dataLength = event.dataLength;
            _this._lastPage = Math.ceil(_this._dataLength / _this._rowsPerPage);
        };
    }
    Md2Pagination.prototype.ngDoCheck = function () {
        this.md2Table = this.md2Table || this._dataTable;
        this.onPageChangeSubscriber(this.md2Table.getPage());
        this.md2Table.onPageChange.subscribe(this.onPageChangeSubscriber);
    };
    Md2Pagination.prototype._setPage = function (pageNumber) {
        this.md2Table.setPage(pageNumber, this._rowsPerPage);
    };
    Md2Pagination.prototype._setRows = function (event) {
        this.md2Table.setPage(this._activePage, parseInt(event.value));
    };
    __decorate$40([
        _angular_core.Input(), 
        __metadata$40('design:type', Object)
    ], Md2Pagination.prototype, "rowsPerPageSet", void 0);
    __decorate$40([
        _angular_core.Input(), 
        __metadata$40('design:type', Md2DataTable)
    ], Md2Pagination.prototype, "md2Table", void 0);
    Md2Pagination = __decorate$40([
        _angular_core.Component({
            selector: 'md2-pagination',
            template: "<ul class=\"md2-pagination\" *ngIf=\"_dataLength > _rowsPerPage\"> <li [class.disabled]=\"_activePage <= 1\" (click)=\"_setPage(_activePage - 1)\"> <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"> <path d=\"M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z\" /> </svg> </li> <li *ngIf=\"_activePage > 4 && _activePage + 1 > _lastPage\" (click)=\"_setPage(_activePage - 4)\"> {{_activePage-4}} </li> <li *ngIf=\"_activePage > 3 && _activePage + 2 > _lastPage\" (click)=\"_setPage(_activePage - 3)\"> {{_activePage-3}} </li> <li *ngIf=\"_activePage > 2\" (click)=\"_setPage(_activePage - 2)\"> {{_activePage-2}} </li> <li *ngIf=\"_activePage > 1\" (click)=\"_setPage(_activePage - 1)\"> {{_activePage-1}} </li> <li class=\"active\">{{_activePage}}</li> <li *ngIf=\"_activePage + 1 <= _lastPage\" (click)=\"_setPage(_activePage + 1)\"> {{_activePage+1}} </li> <li *ngIf=\"_activePage + 2 <= _lastPage\" (click)=\"_setPage(_activePage + 2)\"> {{_activePage+2}} </li> <li *ngIf=\"_activePage + 3 <= _lastPage && _activePage < 3\" (click)=\"_setPage(_activePage + 3)\"> {{_activePage+3}} </li> <li *ngIf=\"_activePage + 4 <= _lastPage && _activePage < 2\" (click)=\"_setPage(_activePage + 4)\"> {{_activePage+4}} </li> <li [class.disabled]=\"_activePage >= _lastPage\" (click)=\"_setPage(_activePage + 1)\"> <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"> <path d=\"M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z\" /> </svg> </li> </ul> <div class=\"md2-rows-select\" *ngIf=\"rowsPerPageSet.length && _dataLength > 0\"> Rows per page: <md2-select [(ngModel)]=\"_rowsPerPage\" (change)=\"_setRows($event)\"> <md2-option *ngFor=\"let row of rowsPerPageSet\" [value]=\"row\">{{row}}</md2-option> </md2-select> </div> ",
            styles: ["/* * Data Table */ /* * Sort */ [md2SortBy] { line-height: 24px; color: rgba(0, 0, 0, 0.54); white-space: nowrap; cursor: pointer; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; } [md2SortBy] svg { display: inline-block; vertical-align: middle; fill: currentColor; opacity: 0; } [md2SortBy]:hover:not(.md2-sort-active) svg { color: rgba(0, 0, 0, 0.26); opacity: 1; } [md2SortBy].md2-sort-active { color: rgba(0, 0, 0, 0.87); } [md2SortBy].md2-sort-active svg { opacity: 1; } /* * Pagination */ md2-pagination { display: block; color: rgba(0, 0, 0, 0.54); -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; } md2-pagination::before, md2-pagination::after { display: table; content: ''; } md2-pagination::after { clear: both; } md2-pagination .md2-pagination { display: inline-block; margin: 8px 0; padding: 0; } md2-pagination .md2-pagination li { position: relative; display: inline-block; width: 36px; vertical-align: top; text-align: center; line-height: 36px; border-radius: 100px; cursor: pointer; box-sizing: border-box; } md2-pagination .md2-pagination li:hover:not(.disabled):not(.active) { background: rgba(0, 0, 0, 0.12); } md2-pagination .md2-pagination li.disabled { pointer-events: none; background: transparent; cursor: default; opacity: 0.48; } md2-pagination .md2-pagination li.active { background: #106cc8; color: white; cursor: default; } md2-pagination .md2-pagination li svg { fill: currentColor; margin-bottom: -7px; } md2-pagination .md2-rows-select { display: inline-block; margin: 8px 0; padding: 0; float: right; color: rgba(0, 0, 0, 0.54); line-height: 36px; } md2-pagination .md2-rows-select md2-select { display: inline-block; border: 0; outline: 0; } md2-pagination .md2-rows-select .md2-select-trigger { border-width: 0; min-width: 40px; } /*# sourceMappingURL=data-table.css.map */ "],
            exportAs: 'md2Pagination',
            encapsulation: _angular_core.ViewEncapsulation.None
        }),
        __param$5(0, _angular_core.Optional()), 
        __metadata$40('design:paramtypes', [Md2DataTable])
    ], Md2Pagination);
    return Md2Pagination;
}());
var MD2_DATA_TABLE_DIRECTIVES = [
    Md2DataTable,
    Md2DataTableSortBy,
    Md2Pagination
];
var Md2DataTableModule = (function () {
    function Md2DataTableModule() {
    }
    Md2DataTableModule.forRoot = function () {
        return {
            ngModule: Md2DataTableModule
        };
    };
    Md2DataTableModule = __decorate$40([
        _angular_core.NgModule({
            imports: [_angular_common.CommonModule, _angular_forms.FormsModule, Md2SelectModule.forRoot()],
            exports: MD2_DATA_TABLE_DIRECTIVES,
            declarations: MD2_DATA_TABLE_DIRECTIVES,
        }), 
        __metadata$40('design:paramtypes', [])
    ], Md2DataTableModule);
    return Md2DataTableModule;
}());

var __decorate$45 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$45 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/** Date locale info. TODO(mmalerba): Integrate with i18n solution once we know what we're doing. */
var DateLocale = (function () {
    function DateLocale() {
        this.firstDayOfWeek = 0;
        this.months = [
            { full: 'January', short: 'Jan' },
            { full: 'February', short: 'Feb' },
            { full: 'March', short: 'Mar' },
            { full: 'April', short: 'Apr' },
            { full: 'May', short: 'May' },
            { full: 'June', short: 'Jun' },
            { full: 'July', short: 'Jul' },
            { full: 'August', short: 'Aug' },
            { full: 'September', short: 'Sep' },
            { full: 'October', short: 'Oct' },
            { full: 'November', short: 'Nov' },
            { full: 'December', short: 'Dec' },
        ];
        this.days = [
            { full: 'Sunday', short: 'Sun', xshort: 'S' },
            { full: 'Monday', short: 'Mon', xshort: 'M' },
            { full: 'Tuesday', short: 'Tue', xshort: 'T' },
            { full: 'Wednesday', short: 'Wed', xshort: 'W' },
            { full: 'Thursday', short: 'Thu', xshort: 'T' },
            { full: 'Friday', short: 'Fri', xshort: 'F' },
            { full: 'Saturday', short: 'Sat', xshort: 'S' },
        ];
    }
    DateLocale.prototype.getDateLabel = function (d) { return "" + d; };
    DateLocale.prototype.getMonthLabel = function (m, y) { return this.months[m].short.toUpperCase() + " " + y; };
    DateLocale.prototype.getYearLabel = function (y) { return "" + y; };
    /**
     * Gets the first day of the month for the given date's month.
     * @param {Date} date
     * @returns {Date}
     */
    DateLocale.prototype.getFirstDateOfMonth = function (date) {
        return new Date(date.getFullYear(), date.getMonth(), 1, date.getHours(), date.getMinutes());
    };
    /**
     * Gets the number of days in the month for the given date's month.
     * @param date
     * @returns {number}
     */
    DateLocale.prototype.getNumberOfDaysInMonth = function (date) {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };
    /**
     * Get an arbitrary date in the month after the given date's month.
     * @param date
     * @returns {Date}
     */
    DateLocale.prototype.getDateInNextMonth = function (date) {
        return new Date(date.getFullYear(), date.getMonth() + 1, 1, date.getHours(), date.getMinutes());
    };
    /**
     * Get an arbitrary date in the month before the given date's month.
     * @param date
     * @returns {Date}
     */
    DateLocale.prototype.getDateInPreviousMonth = function (date) {
        return new Date(date.getFullYear(), date.getMonth() - 1, 1, date.getHours(), date.getMinutes());
    };
    /**
     * Gets whether two dates have the same month and year.
     * @param {Date} d1
     * @param {Date} d2
     * @returns {boolean}
     */
    DateLocale.prototype.isSameMonthAndYear = function (d1, d2) {
        return d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth();
    };
    /**
     * Gets whether two dates are the same day (not not necesarily the same time).
     * @param {Date} d1
     * @param {Date} d2
     * @returns {boolean}
     */
    DateLocale.prototype.isSameDay = function (d1, d2) {
        return d1.getDate() == d2.getDate() && this.isSameMonthAndYear(d1, d2);
    };
    /**
     * Gets whether a date is in the month immediately after some date.
     * @param {Date} startDate The date from which to compare.
     * @param {Date} endDate The date to check.
     * @returns {boolean}
     */
    DateLocale.prototype.isInNextMonth = function (startDate, endDate) {
        var nextMonth = this.getDateInNextMonth(startDate);
        return this.isSameMonthAndYear(nextMonth, endDate);
    };
    /**
     * Gets whether a date is in the month immediately before some date.
     * @param {Date} startDate The date from which to compare.
     * @param {Date} endDate The date to check.
     * @returns {boolean}
     */
    DateLocale.prototype.isInPreviousMonth = function (startDate, endDate) {
        var previousMonth = this.getDateInPreviousMonth(startDate);
        return this.isSameMonthAndYear(endDate, previousMonth);
    };
    /**
     * Gets the midpoint between two dates.
     * @param {Date} d1
     * @param {Date} d2
     * @returns {Date}
     */
    DateLocale.prototype.getDateMidpoint = function (d1, d2) {
        return this.createDateAtMidnight((d1.getTime() + d2.getTime()) / 2);
    };
    /**
     * Gets the week of the month that a given date occurs in.
     * @param {Date} date
     * @returns {number} Index of the week of the month (zero-based).
     */
    DateLocale.prototype.getWeekOfMonth = function (date) {
        var firstDayOfMonth = this.getFirstDateOfMonth(date);
        return Math.floor((firstDayOfMonth.getDay() + date.getDate() - 1) / 7);
    };
    /**
     * Gets a new date incremented by the given number of minutes. Number of minutes can be negative.
     * @param {Date} date
     * @param {number} numberOfMinutes
     * @returns {Date}
     */
    DateLocale.prototype.incrementMinutes = function (date, numberOfMinutes) {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes() + numberOfMinutes);
    };
    /**
     * Gets a new date incremented by the given number of hours. Number of hours can be negative.
     * @param {Date} date
     * @param {number} numberOfHours
     * @returns {Date}
     */
    DateLocale.prototype.incrementHours = function (date, numberOfHours) {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours() + numberOfHours, date.getMinutes());
    };
    /**
     * Gets a new date incremented by the given number of days. Number of days can be negative.
     * @param {Date} date
     * @param {number} numberOfDays
     * @returns {Date}
     */
    DateLocale.prototype.incrementDays = function (date, numberOfDays) {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate() + numberOfDays, date.getHours(), date.getMinutes());
    };
    /**
     * Gets a new date incremented by the given number of months. Number of months can be negative.
     * If the date of the given month does not match the target month, the date will be set to the
     * last day of the month.
     * @param {Date} date
     * @param {number} numberOfMonths
     * @returns {Date}
     */
    DateLocale.prototype.incrementMonths = function (date, numberOfMonths) {
        // If the same date in the target month does not actually exist, the Date object will
        // automatically advance *another* month by the number of missing days.
        // For example, if you try to go from Jan. 30 to Feb. 30, you'll end up on March 2.
        // So, we check if the month overflowed and go to the last day of the target month instead.
        var dateInTargetMonth = new Date(date.getFullYear(), date.getMonth() + numberOfMonths, 1, date.getHours(), date.getMinutes());
        var numberOfDaysInMonth = this.getNumberOfDaysInMonth(dateInTargetMonth);
        if (numberOfDaysInMonth < date.getDate()) {
            dateInTargetMonth.setDate(numberOfDaysInMonth);
        }
        else {
            dateInTargetMonth.setDate(date.getDate());
        }
        return dateInTargetMonth;
    };
    /**
     * Get the integer distance between two months. This *only* considers the month and year
     * portion of the Date instances.
     *
     * @param {Date} start
     * @param {Date} end
     * @returns {number} Number of months between `start` and `end`. If `end` is before `start`
     *     chronologically, this number will be negative.
     */
    DateLocale.prototype.getMonthDistance = function (start, end) {
        return (12 * (end.getFullYear() - start.getFullYear())) + (end.getMonth() - start.getMonth());
    };
    /**
     * Gets the last day of the month for the given date.
     * @param {Date} date
     * @returns {Date}
     */
    DateLocale.prototype.getLastDateOfMonth = function (date) {
        return new Date(date.getFullYear(), date.getMonth(), this.getNumberOfDaysInMonth(date), date.getHours(), date.getMinutes());
    };
    /**
     * Checks whether a date is valid.
     * @param {Date} date
     * @return {boolean} Whether the date is a valid Date.
     */
    DateLocale.prototype.isValidDate = function (date) {
        return date != null && date.getTime && !isNaN(date.getTime());
    };
    /**
     * Sets a date's time to midnight.
     * @param {Date} date
     */
    DateLocale.prototype.setDateTimeToMidnight = function (date) {
        if (this.isValidDate(date)) {
            date.setHours(0, 0, 0, 0);
        }
    };
    /**
     * Creates a date with the time set to midnight.
     * Drop-in replacement for two forms of the Date constructor:
     * 1. No argument for Date representing now.
     * 2. Single-argument value representing number of seconds since Unix Epoch
     * or a Date object.
     * @param {number|Date=} value
     * @return {Date} New date with time set to midnight.
     */
    DateLocale.prototype.createDateAtMidnight = function (value) {
        var date;
        if (!value) {
            date = new Date();
        }
        else {
            date = new Date(value);
        }
        this.setDateTimeToMidnight(date);
        return date;
    };
    /**
     * Checks if a date is within a min and max range, ignoring the time component.
     * If minDate or maxDate are not dates, they are ignored.
     * @param {Date} date
     * @param {Date} minDate
     * @param {Date} maxDate
     */
    DateLocale.prototype.isDateWithinRange = function (date, minDate, maxDate) {
        var dateAtMidnight = this.createDateAtMidnight(date);
        var minDateAtMidnight = this.isValidDate(minDate) ? this.createDateAtMidnight(minDate) : null;
        var maxDateAtMidnight = this.isValidDate(maxDate) ? this.createDateAtMidnight(maxDate) : null;
        return (!minDateAtMidnight || minDateAtMidnight <= dateAtMidnight) &&
            (!maxDateAtMidnight || maxDateAtMidnight >= dateAtMidnight);
    };
    /**
     * Gets a new date incremented by the given number of years. Number of years can be negative.
     * See `incrementMonths` for notes on overflow for specific dates.
     * @param {Date} date
     * @param {number} numberOfYears
     * @returns {Date}
     */
    DateLocale.prototype.incrementYears = function (date, numberOfYears) {
        return this.incrementMonths(date, numberOfYears * 12);
    };
    /**
     * Get the integer distance between two years. This *only* considers the year portion of the
     * Date instances.
     *
     * @param {Date} start
     * @param {Date} end
     * @returns {number} Number of months between `start` and `end`. If `end` is before `start`
     *     chronologically, this number will be negative.
     */
    DateLocale.prototype.getYearDistance = function (start, end) {
        return end.getFullYear() - start.getFullYear();
    };
    /**
     * Clamps a date between a minimum and a maximum date.
     * @param {Date} date Date to be clamped
     * @param {Date=} minDate Minimum date
     * @param {Date=} maxDate Maximum date
     * @return {Date}
     */
    DateLocale.prototype.clampDate = function (date, minDate, maxDate) {
        var boundDate = date;
        if (minDate && date < minDate) {
            boundDate = new Date(minDate.getTime());
        }
        if (maxDate && date > maxDate) {
            boundDate = new Date(maxDate.getTime());
        }
        return boundDate;
    };
    /**
     * Extracts and parses the timestamp from a DOM node.
     * @param  {HTMLElement} node Node from which the timestamp will be extracted.
     * @return {number} Time since epoch.
     */
    DateLocale.prototype.getTimestampFromNode = function (node) {
        if (node && node.hasAttribute('data-timestamp')) {
            return Number(node.getAttribute('data-timestamp'));
        }
    };
    /**
     * Checks if a month is within a min and max range, ignoring the date and time components.
     * If minDate or maxDate are not dates, they are ignored.
     * @param {Date} date
     * @param {Date} minDate
     * @param {Date} maxDate
     */
    DateLocale.prototype.isMonthWithinRange = function (date, minDate, maxDate) {
        var month = date.getMonth();
        var year = date.getFullYear();
        return (!minDate || minDate.getFullYear() < year || minDate.getMonth() <= month) &&
            (!maxDate || maxDate.getFullYear() > year || maxDate.getMonth() >= month);
    };
    DateLocale = __decorate$45([
        _angular_core.Injectable(), 
        __metadata$45('design:paramtypes', [])
    ], DateLocale);
    return DateLocale;
}());

var __decorate$46 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$46 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var CLOCK_HOURS = 24;
var CLOCK_MINUTES = 60;
var CLOCK_RADIUS = 120;
var CLOCK_INNER_RADIUS = 66;
var CLOCK_OUTER_RADIUS = 99;
var CLOCK_TICK_RADIUS = 17;
var Md2Clock = (function () {
    function Md2Clock(_element) {
        var _this = this;
        this._element = _element;
        this._view = true;
        this._hours = [];
        this._minutes = [];
        this._hour = 0;
        this._minute = 0;
        this.timeChange = new _angular_core.EventEmitter();
        this.onHourChange = new _angular_core.EventEmitter();
        this.onMinuteChange = new _angular_core.EventEmitter();
        this.renderClock();
        this.mouseMoveListener = function (event) { _this._handleMousemove(event); };
        this.mouseUpListener = function (event) { _this._handleMouseup(event); };
    }
    Object.defineProperty(Md2Clock.prototype, "time", {
        get: function () { return this._time; },
        set: function (value) {
            if (this._time !== value) {
                this._time = value || '00:00';
                this._hour = parseInt(this._time.split(':')[0]);
                this._minute = parseInt(this._time.split(':')[1]);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Clock.prototype, "view", {
        set: function (value) {
            if (value === 'minute') {
                this._view = false;
            }
            else {
                this._view = true;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Clock.prototype, "hand", {
        get: function () {
            var deg = 0;
            var radius = CLOCK_OUTER_RADIUS;
            if (this._view) {
                var inner = this._hour > 0 && this._hour < 13;
                radius = inner ? CLOCK_INNER_RADIUS : CLOCK_OUTER_RADIUS;
                deg = Math.round(this._hour * (360 / (CLOCK_HOURS / 2)));
            }
            else {
                deg = Math.round(this._minute * (360 / CLOCK_MINUTES));
            }
            return {
                'transform': "rotate(" + deg + "deg)",
                'height': radius + "px",
                'margin-top': (120 - radius) + "px"
            };
        },
        enumerable: true,
        configurable: true
    });
    Md2Clock.prototype._handleMousedown = function (event) {
        this.setTime(event);
        document.addEventListener('mousemove', this.mouseMoveListener);
        document.addEventListener('touchmove', this.mouseMoveListener);
        document.addEventListener('mouseup', this.mouseUpListener);
        document.addEventListener('touchend', this.mouseUpListener);
    };
    Md2Clock.prototype._handleMousemove = function (event) {
        event.preventDefault();
        this.setTime(event);
    };
    Md2Clock.prototype._handleMouseup = function (event) {
        document.removeEventListener('mousemove', this.mouseMoveListener);
        document.removeEventListener('touchmove', this.mouseMoveListener);
        document.removeEventListener('mouseup', this.mouseUpListener);
        document.removeEventListener('touchend', this.mouseUpListener);
        if (this._view) {
            this.onHourChange.emit(this._hour);
        }
        else {
            this.onMinuteChange.emit(this._minute);
        }
    };
    Md2Clock.prototype._handleKeydown = function (event) { };
    /** Emits an event when the user selects a time. */
    Md2Clock.prototype._emitChangeEvent = function () {
        this.timeChange.emit(this.time);
    };
    /**
     * render Click
     */
    Md2Clock.prototype.renderClock = function () {
        this._hours.length = 0;
        for (var i = 0; i < CLOCK_HOURS; i++) {
            var radian = i / 6 * Math.PI;
            var inner = i > 0 && i < 13, radius = inner ? CLOCK_INNER_RADIUS : CLOCK_OUTER_RADIUS;
            this._hours.push({
                hour: i === 0 ? '00' : i,
                top: CLOCK_RADIUS - Math.cos(radian) * radius - CLOCK_TICK_RADIUS,
                left: CLOCK_RADIUS + Math.sin(radian) * radius - CLOCK_TICK_RADIUS
            });
        }
        for (var i = 0; i < CLOCK_MINUTES; i += 5) {
            var radian = i / 30 * Math.PI;
            this._minutes.push({
                minute: i === 0 ? '00' : i,
                top: CLOCK_RADIUS - Math.cos(radian) * CLOCK_OUTER_RADIUS - CLOCK_TICK_RADIUS,
                left: CLOCK_RADIUS + Math.sin(radian) * CLOCK_OUTER_RADIUS - CLOCK_TICK_RADIUS
            });
        }
    };
    /**
     * Set Time
     * @param event
     */
    Md2Clock.prototype.setTime = function (event) {
        var trigger$$1 = this._element.nativeElement;
        var triggerRect = trigger$$1.getBoundingClientRect();
        var width = trigger$$1.offsetWidth;
        var height = trigger$$1.offsetHeight;
        var pageX = event.pageX !== undefined ? event.pageX : event.touches[0].pageX;
        var pageY = event.pageY !== undefined ? event.pageY : event.touches[0].pageY;
        var x = (width / 2) - (pageX - triggerRect.left - window.pageXOffset);
        var y = (height / 2) - (pageY - triggerRect.top - window.pageYOffset);
        var radian = Math.atan2(-x, y);
        var unit = Math.PI / (this._view ? 6 : 30);
        var z = Math.sqrt(x * x + y * y);
        var inner = this._view && z < (CLOCK_OUTER_RADIUS + CLOCK_INNER_RADIUS) / 2;
        var value = 0;
        if (radian < 0) {
            radian = Math.PI * 2 + radian;
        }
        value = Math.round(radian / unit);
        radian = value * unit;
        if (this._view) {
            if (value === 12) {
                value = 0;
            }
            value = inner ? (value === 0 ? 12 : value) : value === 0 ? 0 : value + 12;
            this._hour = value;
        }
        else {
            if (value === 60) {
                value = 0;
            }
            this._minute = value;
        }
        this._time = this._hour + ':' + this._minute;
        this._emitChangeEvent();
    };
    __decorate$46([
        _angular_core.Output(), 
        __metadata$46('design:type', _angular_core.EventEmitter)
    ], Md2Clock.prototype, "timeChange", void 0);
    __decorate$46([
        _angular_core.Output(), 
        __metadata$46('design:type', _angular_core.EventEmitter)
    ], Md2Clock.prototype, "onHourChange", void 0);
    __decorate$46([
        _angular_core.Output(), 
        __metadata$46('design:type', _angular_core.EventEmitter)
    ], Md2Clock.prototype, "onMinuteChange", void 0);
    __decorate$46([
        _angular_core.Input(), 
        __metadata$46('design:type', Object)
    ], Md2Clock.prototype, "time", null);
    __decorate$46([
        _angular_core.Input(), 
        __metadata$46('design:type', String), 
        __metadata$46('design:paramtypes', [String])
    ], Md2Clock.prototype, "view", null);
    Md2Clock = __decorate$46([
        _angular_core.Component({selector: 'md2-clock',
            template: "<div class=\"md2-clock-center\"></div> <div class=\"md2-clock-hand\" [ngStyle]=\"hand\"></div> <div class=\"md2-clock-hours\" [class.active]=\"_view\"> <div *ngFor=\"let h of _hours\" class=\"md2-clock-hour\" [class.active]=\"_hour == h.hour\" [style.top.px]=\"h.top\" [style.left.px]=\"h.left\">{{ h.hour }}</div> </div> <div class=\"md2-clock-minutes\" [class.active]=\"!_view\"> <div *ngFor=\"let m of _minutes\" class=\"md2-clock-minute\" [class.active]=\"_minute == m.minute\" [style.top.px]=\"m.top\" [style.left.px]=\"m.left\">{{ m.minute }}</div> </div> ",
            styles: ["md2-datepicker { position: relative; display: inline-block; min-width: 175px; outline: none; -webkit-backface-visibility: hidden; backface-visibility: hidden; } md2-datepicker.md2-datepicker-disabled { pointer-events: none; cursor: default; } .md2-datepicker-trigger { display: block; padding: 18px 0 18px 32px; white-space: nowrap; cursor: pointer; } .md2-datepicker-icon { position: absolute; top: 21px; left: 0; display: block; height: 24px; width: 24px; vertical-align: middle; fill: currentColor; color: rgba(0, 0, 0, 0.54); } .md2-datepicker-disabled .md2-datepicker-icon { color: rgba(0, 0, 0, 0.38); } .md2-datepicker-input { color: rgba(0, 0, 0, 0.38); border-bottom: 1px solid rgba(0, 0, 0, 0.12); display: flex; justify-content: space-between; align-items: center; height: 30px; min-width: 168px; line-height: 22px; position: relative; box-sizing: border-box; } [aria-disabled='true'] .md2-datepicker-input { background-image: linear-gradient(to right, rgba(0, 0, 0, 0.26) 0, rgba(0, 0, 0, 0.26) 33%, transparent 0); background-size: 4px 1px; background-repeat: repeat-x; border-color: transparent; background-position: 0 bottom; cursor: default; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; } md2-datepicker:focus:not(.md2-datepicker-disabled) .md2-datepicker-input { color: #106cc8; border-color: #106cc8; } md2-datepicker.ng-invalid.ng-touched:not(.md2-datepicker-disabled) .md2-datepicker-input { color: #f44336; border-color: #f44336; } .md2-datepicker-placeholder { position: absolute; right: 18px; bottom: 100%; left: 0; padding: 0 2px; transform: translate3d(0, 26px, 0) scale(1); transform-origin: left top; white-space: nowrap; overflow-x: hidden; text-overflow: ellipsis; transition: all 150ms cubic-bezier(0.25, 0.8, 0.25, 1); } .md2-datepicker-placeholder.md2-floating-placeholder { left: -2px; text-align: left; transform: translate3d(0, 6px, 0) scale(0.75); } [dir='rtl'] .md2-datepicker-placeholder { right: 0; left: 18px; transform-origin: right top; } [dir='rtl'] .md2-datepicker-placeholder.md2-floating-placeholder { right: -2px; text-align: right; } [aria-required=true] .md2-datepicker-placeholder::after { content: '*'; } .md2-datepicker-value { position: relative; white-space: nowrap; overflow-x: hidden; text-overflow: ellipsis; color: rgba(0, 0, 0, 0.87); } .md2-datepicker-disabled .md2-datepicker-value { color: rgba(0, 0, 0, 0.38); } [dir='rtl'] .md2-datepicker-value { left: auto; right: 0; } .md2-datepicker-arrow { width: 0; height: 0; border-left: 5px solid transparent; border-right: 5px solid transparent; border-top: 5px solid; margin: 0 4px; color: rgba(0, 0, 0, 0.38); } md2-datepicker:focus:not(.md2-datepicker-disabled) .md2-datepicker-arrow { color: #106cc8; } md2-datepicker.ng-invalid.ng-touched:not(.md2-datepicker-disabled) .md2-datepicker-arrow { color: #f44336; } .md2-datepicker-panel { width: 300px; border-radius: 3px; background-color: white; overflow: hidden; box-shadow: 0 11px 15px -7px rgba(0, 0, 0, 0.2), 0 24px 38px 3px rgba(0, 0, 0, 0.14), 0 9px 46px 8px rgba(0, 0, 0, 0.12); outline: none; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; } .md2-datepicker-header { padding: 16px; color: white; font-weight: 500; white-space: nowrap; background: #106cc8; box-sizing: border-box; } .md2-datepicker-header .hidden { display: none; } .md2-datepicker-header-year { font-size: 16px; opacity: 0.7; cursor: pointer; } .md2-datepicker-header-year.active { opacity: 1; pointer-events: none; } .md2-datepicker-header-date-time { font-size: 32px; } .md2-datepicker-header-date { opacity: 0.7; cursor: pointer; } .md2-datepicker-header-date.active { opacity: 1; pointer-events: none; } .md2-datepicker-header-time { opacity: 0.7; display: inline-block; padding-left: 8px; cursor: pointer; } .md2-datepicker-header-time.active { opacity: 1; cursor: default; } .md2-datepicker-header-time.active .md2-datepicker-header-hour, .md2-datepicker-header-time.active .md2-datepicker-header-minute { opacity: 0.7; cursor: pointer; } .md2-datepicker-header-time.active .md2-datepicker-header-hour.active, .md2-datepicker-header-time.active .md2-datepicker-header-minute.active { opacity: 1; pointer-events: none; } .md2-datepicker-content { position: relative; width: 100%; padding-top: 300px; overflow: hidden; } .md2-datepicker-calendar { position: absolute; top: 0; right: 100%; display: block; width: 100%; height: 300px; transition: 300ms; } .md2-datepicker-calendar.active { right: 0; } .md2-calendar-years { position: absolute; top: 10px; right: 100%; bottom: 10px; display: block; width: 100%; line-height: 40px; background: white; overflow-x: hidden; overflow-y: auto; transition: 300ms; } .md2-calendar-years.active { right: 0; } .md2-calendar-years .md2-calendar-years-content { display: flex; flex-direction: column; justify-content: center; min-height: 100%; } .md2-calendar-year { position: relative; display: block; margin: 0 auto; padding: 0; font-size: 17px; font-weight: 400; text-align: center; cursor: pointer; } .md2-calendar-year.selected { color: #106cc8; font-size: 26px; font-weight: 500; } .md2-calendar-month { position: absolute; left: 100%; display: block; width: 100%; font-size: 12px; font-weight: 400; text-align: center; transition: 300ms; } .md2-calendar-month.active { left: 0; } .md2-calendar-month-header { display: flex; justify-content: space-between; font-size: 14px; font-weight: 700; text-align: center; line-height: 48px; } .md2-calendar-month-header .md2-button { display: inline-block; width: 48px; height: 48px; padding: 12px; outline: none; border: 0; cursor: pointer; background: transparent; box-sizing: border-box; } .md2-calendar-month-header .md2-button svg { vertical-align: top; } .md2-calendar-month-header .md2-calendar-month-year-header { width: 100%; } .md2-calendar-dates { margin: 0 auto; } .md2-calendar-dates th { width: 35px; height: 20px; font-weight: 500; line-height: 15px; opacity: 0.5; } .md2-calendar-dates td { padding: 0; } .md2-calendar-day { position: relative; display: inline-block; width: 35px; height: 35px; border-radius: 50%; text-align: center; cursor: pointer; line-height: 35px; box-sizing: border-box; } .md2-calendar-day.today { color: #106cc8; } .md2-calendar-day:hover, .md2-calendar-day.focus { background: #e0e0e0; } .md2-calendar-day.selected, .md2-calendar-day.selected:hover { color: white; background: #106cc8; } .md2-calendar-day.disabled, .md2-calendar-day.disabled:hover { color: rgba(0, 0, 0, 0.45); background: transparent; pointer-events: none; } .md2-calendar-day.prev-month, .md2-calendar-day.next-month { visibility: hidden; } md2-clock { position: absolute; top: 0; left: 100%; display: block; width: 240px; height: 240px; margin: 30px; font-size: 14px; font-weight: 400; text-align: center; background-color: #e0e0e0; border-radius: 50%; overflow: hidden; transition: 300ms; } md2-clock.active { left: 0; } .md2-clock-center { position: absolute; top: 50%; left: 50%; height: 6px; width: 6px; margin: -3px; border-radius: 50%; background-color: #106cc8; } .md2-clock-hand { position: absolute; top: 0; right: 0; bottom: 0; left: 0; width: 1px; height: 99px; margin: 0 auto; background-color: #106cc8; transform-origin: bottom; /*transition: all 100ms;*/ } .md2-clock-hand::before { content: ''; position: absolute; top: -4px; left: -4px; width: 8px; height: 8px; border-radius: 50%; background-color: #106cc8; } .md2-clock-hours, .md2-clock-minutes { position: absolute; top: 0; left: 0; width: 100%; height: 100%; opacity: 0; visibility: hidden; transition: 350ms; transform: scale(1.2); } .md2-clock-hours.active, .md2-clock-minutes.active { opacity: 1; visibility: visible; transform: scale(1); } .md2-clock-minutes { transform: scale(0.8); } .md2-clock-hour, .md2-clock-minute { position: absolute; width: 34px; height: 34px; line-height: 34px; text-align: center; border-radius: 50%; cursor: pointer; } .md2-clock-hour:hover, .md2-clock-minute:hover { background: #fafafa; } .md2-clock-hour.active, .md2-clock-minute.active { background: #65acf3; } .md2-datepicker-actions { text-align: right; } .md2-datepicker-actions .md2-button { display: inline-block; min-width: 64px; margin: 4px 8px 8px 0; padding: 0 12px; font-size: 14px; color: #106cc8; line-height: 36px; text-align: center; text-transform: uppercase; border-radius: 2px; cursor: pointer; box-sizing: border-box; transition: all 450ms cubic-bezier(0.23, 1, 0.32, 1); } .md2-datepicker-actions .md2-button:hover { background: #ebebeb; } @media (min-width: 480px) { .md2-datepicker-panel { display: flex; width: 450px; } .md2-datepicker-header { width: 150px; min-width: 150px; padding-right: 15px; white-space: normal; word-wrap: break-word; } .md2-datepicker-header-time { display: block; padding-left: 0; } } .cdk-overlay-container, .cdk-global-overlay-wrapper { pointer-events: none; top: 0; left: 0; height: 100%; width: 100%; } .cdk-overlay-container { position: fixed; z-index: 1000; } .cdk-global-overlay-wrapper { display: flex; position: absolute; z-index: 1000; } .cdk-overlay-pane { position: absolute; pointer-events: auto; box-sizing: border-box; z-index: 1000; } .cdk-overlay-backdrop { position: absolute; top: 0; bottom: 0; left: 0; right: 0; z-index: 1000; pointer-events: auto; transition: opacity 400ms cubic-bezier(0.25, 0.8, 0.25, 1); opacity: 0; } .cdk-overlay-backdrop.cdk-overlay-backdrop-showing { opacity: 0.48; } .cdk-overlay-dark-backdrop { background: rgba(0, 0, 0, 0.6); } /*# sourceMappingURL=datepicker.css.map */ "],
            host: {
                'role': 'clock',
                '(mousedown)': '_handleMousedown($event)',
            },
            encapsulation: _angular_core.ViewEncapsulation.None
        }), 
        __metadata$46('design:paramtypes', [_angular_core.ElementRef])
    ], Md2Clock);
    return Md2Clock;
}());

/**
 * This animation fades in the background color and text content of the
 * select's options. It is time delayed to occur 100ms after the overlay
 * panel has transformed in.
 */
var fadeInContent$1 = _angular_core.trigger('fadeInContent', [
    _angular_core.state('showing', _angular_core.style({ opacity: 1 })),
    _angular_core.transition('void => showing', [
        _angular_core.style({ opacity: 0 }),
        _angular_core.animate("150ms 100ms cubic-bezier(0.55, 0, 0.55, 0.2)")
    ])
]);

var __decorate$44 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$44 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param$7 = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
/** Change event object emitted by Md2Select. */
var Md2DateChange = (function () {
    function Md2DateChange(source, value) {
        this.source = source;
        this.value = value;
    }
    return Md2DateChange;
}());
var nextId$3 = 0;
var Md2Datepicker = (function () {
    function Md2Datepicker(_element, overlay, _renderer, _locale, _control) {
        this._element = _element;
        this.overlay = overlay;
        this._renderer = _renderer;
        this._locale = _locale;
        this._control = _control;
        this._value = null;
        this._selected = null;
        this._date = null;
        this._panelOpen = false;
        this._openOnFocus = false;
        this._type = 'date';
        this._required = false;
        this._disabled = false;
        this.today = new Date();
        this._min = null;
        this._max = null;
        this._years = [];
        this._dates = [];
        this._clockView = 'hour';
        this._prevMonth = 1;
        this._currMonth = 2;
        this._nextMonth = 3;
        this._transformOrigin = 'top';
        this._panelDoneAnimating = false;
        this._onChange = function (value) { };
        this._onTouched = function () { };
        /** Event emitted when the select has been opened. */
        this.onOpen = new _angular_core.EventEmitter();
        /** Event emitted when the select has been closed. */
        this.onClose = new _angular_core.EventEmitter();
        /** Event emitted when the selected date has been changed by the user. */
        this.change = new _angular_core.EventEmitter();
        this.name = '';
        this.id = 'md2-datepicker-' + (++nextId$3);
        this.tabindex = 0;
        if (this._control) {
            this._control.valueAccessor = this;
        }
        this._weekDays = _locale.days;
        this.getYears();
    }
    Md2Datepicker.prototype.ngOnDestroy = function () { this.destroyPanel(); };
    Object.defineProperty(Md2Datepicker.prototype, "value", {
        get: function () { return this._value; },
        set: function (value) {
            this._value = this.coerceDateProperty(value);
            if (value && value !== this._value) {
                if (this._locale.isValidDate(value)) {
                    this._value = value;
                }
                else {
                    if (this.type === 'time') {
                        var t = value + '';
                        this._value = new Date();
                        this._value.setHours(parseInt(t.substring(0, 2)));
                        this._value.setMinutes(parseInt(t.substring(3, 5)));
                    }
                    else {
                        this._value = new Date(value);
                    }
                }
            }
            this.date = this._value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Datepicker.prototype, "date", {
        get: function () { return this._date || this.today; },
        set: function (value) {
            if (value && this._locale.isValidDate(value)) {
                if (this._min && this._min > value) {
                    value = this._min;
                }
                if (this._max && this._max < value) {
                    value = this._max;
                }
                this._date = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Datepicker.prototype, "time", {
        get: function () { return this.date.getHours() + ':' + this.date.getMinutes(); },
        set: function (value) {
            this.date = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate(), parseInt(value.split(':')[0]), parseInt(value.split(':')[1]));
            // if (this._clockView === 'hour') {
            //  this.date.setHours(parseInt(value.split(':')[0]));
            // } else {
            //  this.date.setMinutes(parseInt(value.split(':')[1]));
            // }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Datepicker.prototype, "type", {
        get: function () { return this._type; },
        set: function (value) {
            this._type = value || 'date';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Datepicker.prototype, "selected", {
        get: function () { return this._selected; },
        set: function (value) { this._selected = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Datepicker.prototype, "format", {
        get: function () {
            return this._format || (this.type === 'date' ?
                'dd/MM/y' : this.type === 'time' ? 'HH:mm' : this.type === 'datetime' ?
                'dd/MM/y HH:mm' : 'dd/MM/y');
        },
        set: function (value) {
            if (this._format !== value) {
                this._format = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Datepicker.prototype, "required", {
        get: function () { return this._required; },
        set: function (value) { this._required = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Datepicker.prototype, "disabled", {
        get: function () { return this._disabled; },
        set: function (value) { this._disabled = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Datepicker.prototype, "min", {
        set: function (value) {
            if (value && this._locale.isValidDate(value)) {
                this._min = new Date(value);
                this._min.setHours(0, 0, 0, 0);
                this.getYears();
            }
            else {
                this._min = null;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Datepicker.prototype, "max", {
        set: function (value) {
            if (value && this._locale.isValidDate(value)) {
                this._max = new Date(value);
                this._max.setHours(0, 0, 0, 0);
                this.getYears();
            }
            else {
                this._max = null;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Datepicker.prototype, "openOnFocus", {
        get: function () { return this._openOnFocus; },
        set: function (value) { this._openOnFocus = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Datepicker.prototype, "isOpen", {
        set: function (value) {
            if (value && !this.panelOpen) {
                this.open();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Datepicker.prototype, "panelOpen", {
        get: function () {
            return this._panelOpen;
        },
        enumerable: true,
        configurable: true
    });
    Md2Datepicker.prototype.toggle = function () {
        this.panelOpen ? this.close() : this.open();
    };
    /** Opens the overlay panel. */
    Md2Datepicker.prototype.open = function () {
        if (this.disabled) {
            return;
        }
        this._isCalendarVisible = this.type !== 'time' ? true : false;
        this._createOverlay();
        this._overlayRef.attach(this.templatePortals.first);
        this._subscribeToBackdrop();
        this._panelOpen = true;
        this.selected = this.value || new Date(1, 0, 1);
        this.date = this.value || this.today;
        this.generateCalendar();
    };
    /** Closes the overlay panel and focuses the host element. */
    Md2Datepicker.prototype.close = function () {
        var _this = this;
        setTimeout(function () {
            _this._panelOpen = false;
            if (_this._openOnFocus) {
                _this._openOnFocus = false;
                setTimeout(function () { _this._openOnFocus = true; }, 100);
            }
            // if (!this._date) {
            //  this._placeholderState = '';
            // }
            if (_this._overlayRef) {
                _this._overlayRef.detach();
                _this._backdropSubscription.unsubscribe();
            }
            _this._focusHost();
            _this._isYearsVisible = false;
            _this._isCalendarVisible = _this.type !== 'time' ? true : false;
            _this._clockView = 'hour';
        }, 10);
    };
    /** Removes the panel from the DOM. */
    Md2Datepicker.prototype.destroyPanel = function () {
        if (this._overlayRef) {
            this._overlayRef.dispose();
            this._overlayRef = null;
            this._cleanUpSubscriptions();
        }
    };
    Md2Datepicker.prototype._onPanelDone = function () {
        if (this.panelOpen) {
            this._focusPanel();
            this.onOpen.emit();
        }
        else {
            this.onClose.emit();
        }
    };
    Md2Datepicker.prototype._onFadeInDone = function () {
        this._panelDoneAnimating = this.panelOpen;
    };
    Md2Datepicker.prototype._focusPanel = function () {
        var el = document.querySelectorAll('.md2-datepicker-panel')[0];
        el.focus();
    };
    Md2Datepicker.prototype._focusHost = function () {
        this._renderer.invokeElementMethod(this._element.nativeElement, 'focus');
    };
    Md2Datepicker.prototype.coerceDateProperty = function (value, fallbackValue) {
        if (fallbackValue === void 0) { fallbackValue = new Date(); }
        var timestamp = Date.parse(value);
        fallbackValue = null;
        return isNaN(timestamp) ? fallbackValue : new Date(timestamp);
    };
    Md2Datepicker.prototype._handleClick = function (event) {
        if (this.disabled) {
            event.stopPropagation();
            event.preventDefault();
            return;
        }
    };
    Md2Datepicker.prototype._handleKeydown = function (event) {
        if (this.disabled) {
            return;
        }
        if (this.panelOpen) {
            event.preventDefault();
            event.stopPropagation();
            switch (event.keyCode) {
                case TAB:
                case ESCAPE:
                    this._onBlur();
                    this.close();
                    break;
            }
            var date = this.date;
            if (this._isYearsVisible) {
                switch (event.keyCode) {
                    case ENTER:
                    case SPACE:
                        this._onClickOk();
                        break;
                    case DOWN_ARROW:
                        if (this.date.getFullYear() < (this.today.getFullYear() + 100)) {
                            this.date = this._locale.incrementYears(date, 1);
                            this._scrollToSelectedYear();
                        }
                        break;
                    case UP_ARROW:
                        if (this.date.getFullYear() > 1900) {
                            this.date = this._locale.incrementYears(date, -1);
                            this._scrollToSelectedYear();
                        }
                        break;
                }
            }
            else if (this._isCalendarVisible) {
                switch (event.keyCode) {
                    case ENTER:
                    case SPACE:
                        this.setDate(this.date);
                        break;
                    case RIGHT_ARROW:
                        this.date = this._locale.incrementDays(date, 1);
                        break;
                    case LEFT_ARROW:
                        this.date = this._locale.incrementDays(date, -1);
                        break;
                    case PAGE_DOWN:
                        if (event.shiftKey) {
                            this.date = this._locale.incrementYears(date, 1);
                        }
                        else {
                            this.date = this._locale.incrementMonths(date, 1);
                        }
                        break;
                    case PAGE_UP:
                        if (event.shiftKey) {
                            this.date = this._locale.incrementYears(date, -1);
                        }
                        else {
                            this.date = this._locale.incrementMonths(date, -1);
                        }
                        break;
                    case DOWN_ARROW:
                        this.date = this._locale.incrementDays(date, 7);
                        break;
                    case UP_ARROW:
                        this.date = this._locale.incrementDays(date, -7);
                        break;
                    case HOME:
                        this.date = this._locale.getFirstDateOfMonth(date);
                        break;
                    case END:
                        this.date = this._locale.getLastDateOfMonth(date);
                        break;
                }
                if (!this._locale.isSameMonthAndYear(date, this.date)) {
                    this.generateCalendar();
                }
            }
            else if (this._clockView === 'hour') {
                switch (event.keyCode) {
                    case ENTER:
                    case SPACE:
                        this.setHour(this.date.getHours());
                        break;
                    case UP_ARROW:
                        this.date = this._locale.incrementHours(date, 1);
                        break;
                    case DOWN_ARROW:
                        this.date = this._locale.incrementHours(date, -1);
                        break;
                }
            }
            else {
                switch (event.keyCode) {
                    case ENTER:
                    case SPACE:
                        this.setMinute(this.date.getMinutes());
                        break;
                    case UP_ARROW:
                        this.date = this._locale.incrementMinutes(date, 1);
                        break;
                    case DOWN_ARROW:
                        this.date = this._locale.incrementMinutes(date, -1);
                        break;
                }
            }
        }
        else {
            switch (event.keyCode) {
                case ENTER:
                case SPACE:
                    event.preventDefault();
                    event.stopPropagation();
                    this.open();
                    break;
            }
        }
    };
    Md2Datepicker.prototype._onFocus = function () {
        if (!this.panelOpen && this.openOnFocus) {
            this.open();
        }
    };
    Md2Datepicker.prototype._onBlur = function () {
        if (!this.panelOpen) {
            this._onTouched();
        }
    };
    /**
     * Display Years
     */
    Md2Datepicker.prototype._showYear = function () {
        this._isYearsVisible = true;
        this._isCalendarVisible = true;
        this._scrollToSelectedYear();
    };
    Md2Datepicker.prototype.getYears = function () {
        var startYear = this._min ? this._min.getFullYear() : 1900, endYear = this._max ? this._max.getFullYear() : this.today.getFullYear() + 100;
        this._years = [];
        for (var i = startYear; i <= endYear; i++) {
            this._years.push(i);
        }
    };
    Md2Datepicker.prototype._scrollToSelectedYear = function () {
        setTimeout(function () {
            var yearContainer = document.querySelector('.md2-calendar-years'), selectedYear = document.querySelector('.md2-calendar-year.selected');
            yearContainer.scrollTop = (selectedYear.offsetTop + 20) - yearContainer.clientHeight / 2;
        }, 0);
    };
    /**
     * select year
     * @param year
     */
    Md2Datepicker.prototype._setYear = function (year) {
        this.date = new Date(year, this.date.getMonth(), this.date.getDate(), this.date.getHours(), this.date.getMinutes());
        this.generateCalendar();
        this._isYearsVisible = false;
    };
    /**
     * Display Calendar
     */
    Md2Datepicker.prototype._showCalendar = function () {
        this._isYearsVisible = false;
        this._isCalendarVisible = true;
    };
    /**
     * Toggle Hour visiblity
     */
    Md2Datepicker.prototype._toggleHours = function (value) {
        this._isYearsVisible = false;
        this._isCalendarVisible = false;
        this._isYearsVisible = false;
        this._clockView = value;
    };
    /**
     * Ok Button Event
     */
    Md2Datepicker.prototype._onClickOk = function () {
        if (this._isYearsVisible) {
            this.generateCalendar();
            this._isYearsVisible = false;
            this._isCalendarVisible = true;
        }
        else if (this._isCalendarVisible) {
            this.setDate(this.date);
        }
        else if (this._clockView === 'hour') {
            this._clockView = 'minute';
        }
        else {
            this.value = this.date;
            this._emitChangeEvent();
            this._onBlur();
            this.close();
        }
    };
    /**
     * Date Selection Event
     * @param event Event Object
     * @param date Date Object
     */
    Md2Datepicker.prototype._onClickDate = function (event, date) {
        event.preventDefault();
        event.stopPropagation();
        if (date.disabled) {
            return;
        }
        if (date.calMonth === this._prevMonth) {
            this._updateMonth(-1);
        }
        else if (date.calMonth === this._currMonth) {
            this.setDate(new Date(date.dateObj.year, date.dateObj.month, date.dateObj.day, this.date.getHours(), this.date.getMinutes()));
        }
        else if (date.calMonth === this._nextMonth) {
            this._updateMonth(1);
        }
    };
    /**
     * Set Date
     * @param date Date Object
     */
    Md2Datepicker.prototype.setDate = function (date) {
        if (this.type === 'date') {
            this.value = date;
            this._emitChangeEvent();
            this._onBlur();
            this.close();
        }
        else {
            this.selected = date;
            this.date = date;
            this._isCalendarVisible = false;
            this._clockView = 'hour';
        }
    };
    /**
     * Update Month
     * @param noOfMonths increment number of months
     */
    Md2Datepicker.prototype._updateMonth = function (noOfMonths) {
        this.date = this._locale.incrementMonths(this.date, noOfMonths);
        this.generateCalendar();
    };
    /**
     * Check is Before month enabled or not
     * @return boolean
     */
    Md2Datepicker.prototype._isBeforeMonth = function () {
        return !this._min ? true :
            this._min && this._locale.getMonthDistance(this.date, this._min) < 0;
    };
    /**
     * Check is After month enabled or not
     * @return boolean
     */
    Md2Datepicker.prototype._isAfterMonth = function () {
        return !this._max ? true :
            this._max && this._locale.getMonthDistance(this.date, this._max) > 0;
    };
    Md2Datepicker.prototype._onTimeChange = function (event) {
        if (this.time !== event) {
            this.time = event;
        }
    };
    Md2Datepicker.prototype._onHourChange = function (event) {
        this._clockView = 'minute';
    };
    Md2Datepicker.prototype._onMinuteChange = function (event) {
        this.value = this.date;
        this._emitChangeEvent();
        this._onBlur();
        this.close();
    };
    /**
     * Check the date is enabled or not
     * @param date Date Object
     * @return boolean
     */
    Md2Datepicker.prototype._isDisabledDate = function (date) {
        if (this._min && this._max) {
            return (this._min > date) || (this._max < date);
        }
        else if (this._min) {
            return (this._min > date);
        }
        else if (this._max) {
            return (this._max < date);
        }
        else {
            return false;
        }
        // if (this.disableWeekends) {
        //   let dayNbr = this.getDayNumber(date);
        //   if (dayNbr === 0 || dayNbr === 6) {
        //     return true;
        //   }
        // }
        // return false;
    };
    /**
     * Generate Month Calendar
     */
    Md2Datepicker.prototype.generateCalendar = function () {
        var year = this.date.getFullYear();
        var month = this.date.getMonth();
        this._dates.length = 0;
        var firstDayOfMonth = this._locale.getFirstDateOfMonth(this.date);
        var numberOfDaysInMonth = this._locale.getNumberOfDaysInMonth(this.date);
        var numberOfDaysInPrevMonth = this._locale.getNumberOfDaysInMonth(this._locale.incrementMonths(this.date, -1));
        var dayNbr = 1;
        var calMonth = this._prevMonth;
        for (var i = 1; i < 7; i++) {
            var week = [];
            if (i === 1) {
                var prevMonth = numberOfDaysInPrevMonth - firstDayOfMonth.getDay() + 1;
                for (var j = prevMonth; j <= numberOfDaysInPrevMonth; j++) {
                    var iDate = { year: year, month: month - 1, day: j, hour: 0, minute: 0 };
                    var date = new Date(year, month - 1, j);
                    week.push({
                        date: date,
                        dateObj: iDate,
                        calMonth: calMonth,
                        today: this._locale.isSameDay(this.today, date),
                        disabled: this._isDisabledDate(date)
                    });
                }
                calMonth = this._currMonth;
                var daysLeft = 7 - week.length;
                for (var j = 0; j < daysLeft; j++) {
                    var iDate = { year: year, month: month, day: dayNbr, hour: 0, minute: 0 };
                    var date = new Date(year, month, dayNbr);
                    week.push({
                        date: date,
                        dateObj: iDate,
                        calMonth: calMonth,
                        today: this._locale.isSameDay(this.today, date),
                        disabled: this._isDisabledDate(date)
                    });
                    dayNbr++;
                }
            }
            else {
                for (var j = 1; j < 8; j++) {
                    if (dayNbr > numberOfDaysInMonth) {
                        dayNbr = 1;
                        calMonth = this._nextMonth;
                    }
                    var iDate = {
                        year: year,
                        month: calMonth === this._currMonth ? month : month + 1,
                        day: dayNbr, hour: 0, minute: 0
                    };
                    var date = new Date(year, iDate.month, dayNbr);
                    week.push({
                        date: date,
                        dateObj: iDate,
                        calMonth: calMonth,
                        today: this._locale.isSameDay(this.today, date),
                        disabled: this._isDisabledDate(date)
                    });
                    dayNbr++;
                }
            }
            this._dates.push(week);
        }
    };
    /**
     * Set hours
     * @param hour number of hours
     */
    Md2Datepicker.prototype.setHour = function (hour) {
        this._clockView = 'minute';
        this.date = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate(), hour, this.date.getMinutes());
    };
    /**
     * Set minutes
     * @param minute number of minutes
     */
    Md2Datepicker.prototype.setMinute = function (minute) {
        this.date = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate(), this.date.getHours(), minute);
        this.selected = this.date;
        this.value = this.date;
        this._emitChangeEvent();
        this._onBlur();
        this.close();
    };
    /** Emits an event when the user selects a date. */
    Md2Datepicker.prototype._emitChangeEvent = function () {
        this._onChange(this.value);
        this.change.emit(new Md2DateChange(this, this.value));
    };
    Md2Datepicker.prototype.writeValue = function (value) {
        this.value = value;
    };
    Md2Datepicker.prototype.registerOnChange = function (fn) { this._onChange = fn; };
    Md2Datepicker.prototype.registerOnTouched = function (fn) { this._onTouched = fn; };
    Md2Datepicker.prototype._subscribeToBackdrop = function () {
        var _this = this;
        this._backdropSubscription = this._overlayRef.backdropClick().subscribe(function () {
            _this.close();
        });
    };
    /**
     *  This method creates the overlay from the provided panel's template and saves its
     *  OverlayRef so that it can be attached to the DOM when open is called.
     */
    Md2Datepicker.prototype._createOverlay = function () {
        if (!this._overlayRef) {
            var config = new OverlayState();
            config.positionStrategy = this.overlay.position()
                .global()
                .centerHorizontally()
                .centerVertically();
            config.hasBackdrop = true;
            config.backdropClass = 'cdk-overlay-dark-backdrop';
            this._overlayRef = this.overlay.create(config);
        }
    };
    Md2Datepicker.prototype._cleanUpSubscriptions = function () {
        if (this._backdropSubscription) {
            this._backdropSubscription.unsubscribe();
        }
    };
    __decorate$44([
        _angular_core.ViewChildren(TemplatePortalDirective), 
        __metadata$44('design:type', _angular_core.QueryList)
    ], Md2Datepicker.prototype, "templatePortals", void 0);
    __decorate$44([
        _angular_core.Output(), 
        __metadata$44('design:type', _angular_core.EventEmitter)
    ], Md2Datepicker.prototype, "onOpen", void 0);
    __decorate$44([
        _angular_core.Output(), 
        __metadata$44('design:type', _angular_core.EventEmitter)
    ], Md2Datepicker.prototype, "onClose", void 0);
    __decorate$44([
        _angular_core.Output(), 
        __metadata$44('design:type', _angular_core.EventEmitter)
    ], Md2Datepicker.prototype, "change", void 0);
    __decorate$44([
        _angular_core.Input(), 
        __metadata$44('design:type', String)
    ], Md2Datepicker.prototype, "name", void 0);
    __decorate$44([
        _angular_core.Input(), 
        __metadata$44('design:type', String)
    ], Md2Datepicker.prototype, "id", void 0);
    __decorate$44([
        _angular_core.Input(), 
        __metadata$44('design:type', String)
    ], Md2Datepicker.prototype, "placeholder", void 0);
    __decorate$44([
        _angular_core.Input(), 
        __metadata$44('design:type', Number)
    ], Md2Datepicker.prototype, "tabindex", void 0);
    __decorate$44([
        _angular_core.Input(), 
        __metadata$44('design:type', Object)
    ], Md2Datepicker.prototype, "value", null);
    __decorate$44([
        _angular_core.Input(), 
        __metadata$44('design:type', Object)
    ], Md2Datepicker.prototype, "type", null);
    __decorate$44([
        _angular_core.Input(), 
        __metadata$44('design:type', Object)
    ], Md2Datepicker.prototype, "selected", null);
    __decorate$44([
        _angular_core.Input(), 
        __metadata$44('design:type', Object)
    ], Md2Datepicker.prototype, "format", null);
    __decorate$44([
        _angular_core.Input(), 
        __metadata$44('design:type', Boolean)
    ], Md2Datepicker.prototype, "required", null);
    __decorate$44([
        _angular_core.Input(), 
        __metadata$44('design:type', Boolean)
    ], Md2Datepicker.prototype, "disabled", null);
    __decorate$44([
        _angular_core.Input(), 
        __metadata$44('design:type', Date), 
        __metadata$44('design:paramtypes', [Date])
    ], Md2Datepicker.prototype, "min", null);
    __decorate$44([
        _angular_core.Input(), 
        __metadata$44('design:type', Date), 
        __metadata$44('design:paramtypes', [Date])
    ], Md2Datepicker.prototype, "max", null);
    __decorate$44([
        _angular_core.Input(), 
        __metadata$44('design:type', Boolean)
    ], Md2Datepicker.prototype, "openOnFocus", null);
    __decorate$44([
        _angular_core.Input(), 
        __metadata$44('design:type', Boolean), 
        __metadata$44('design:paramtypes', [Boolean])
    ], Md2Datepicker.prototype, "isOpen", null);
    __decorate$44([
        _angular_core.HostListener('click', ['$event']), 
        __metadata$44('design:type', Function), 
        __metadata$44('design:paramtypes', [MouseEvent]), 
        __metadata$44('design:returntype', void 0)
    ], Md2Datepicker.prototype, "_handleClick", null);
    Md2Datepicker = __decorate$44([
        _angular_core.Component({selector: 'md2-datepicker',
            template: "<div class=\"md2-datepicker-trigger\" (click)=\"toggle()\"> <div class=\"md2-datepicker-icon\"> <svg *ngIf=\"type==='date'\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"> <path d=\"M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z\"></path> </svg> <svg *ngIf=\"type==='time'\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"> <path d=\"M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22C6.47,22 2,17.5 2,12A10,10 0 0,1 12,2M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z\"></path> </svg> <svg *ngIf=\"type==='datetime'\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"> <path d=\"M15,13H16.5V15.82L18.94,17.23L18.19,18.53L15,16.69V13M19,8H5V19H9.67C9.24,18.09 9,17.07 9,16A7,7 0 0,1 16,9C17.07,9 18.09,9.24 19,9.67V8M5,21C3.89,21 3,20.1 3,19V5C3,3.89 3.89,3 5,3H6V1H8V3H16V1H18V3H19A2,2 0 0,1 21,5V11.1C22.24,12.36 23,14.09 23,16A7,7 0 0,1 16,23C14.09,23 12.36,22.24 11.1,21H5M16,11.15A4.85,4.85 0 0,0 11.15,16C11.15,18.68 13.32,20.85 16,20.85A4.85,4.85 0 0,0 20.85,16C20.85,13.32 18.68,11.15 16,11.15Z\"></path> </svg> </div> <div class=\"md2-datepicker-input\"> <span class=\"md2-datepicker-placeholder\" [class.md2-floating-placeholder]=\"value\">{{ placeholder }}</span> <span class=\"md2-datepicker-value\">{{ value | date:format }}</span> <span class=\"md2-datepicker-arrow\"></span> </div> </div> <template portal> <div class=\"md2-datepicker-panel\" [@fadeInContent]=\"'showing'\" (@fadeInContent.done)=\"_onPanelDone()\" (keydown)=\"_handleKeydown($event)\" [style.transformOrigin]=\"_transformOrigin\" [class.md2-datepicker-panel-done-animating]=\"_panelDoneAnimating\" tabindex=\"0\"> <div class=\"md2-datepicker-header\"> <div class=\"md2-datepicker-header-year\" [class.active]=\"_isYearsVisible\" [class.hidden]=\"type==='time'\" (click)=\"_showYear()\">{{ date | date: 'y' }}</div> <div class=\"md2-datepicker-header-date-time\"> <span class=\"md2-datepicker-header-date\" [class.active]=\"_isCalendarVisible && !_isYearsVisible\" [class.hidden]=\"type==='time'\" (click)=\"_showCalendar()\"> {{ date | date: 'EEE, MMM dd' }} </span> <span class=\"md2-datepicker-header-time\" [class.active]=\"!_isCalendarVisible\" [class.hidden]=\"type==='date'\"> <span class=\"md2-datepicker-header-hour\" [class.active]=\"_clockView === 'hour'\" (click)=\"_toggleHours('hour')\">{{ date.getHours() }}</span>:<span class=\"md2-datepicker-header-minute\" [class.active]=\"_clockView === 'minute'\" (click)=\"_toggleHours('minute')\">{{ date.getMinutes() }}</span> </span> </div> </div> <div class=\"md2-datepicker-content\"> <div class=\"md2-datepicker-calendar\" [class.active]=\"_isCalendarVisible\"> <div class=\"md2-calendar-years\" [class.active]=\"_isYearsVisible\"> <div class=\"md2-calendar-years-content\"> <div *ngFor=\"let y of _years\" class=\"md2-calendar-year\" [class.selected]=\"y === date.getFullYear()\" (click)=\"_setYear(y)\">{{y}}</div> </div> </div> <div class=\"md2-calendar-month\" [class.active]=\"!_isYearsVisible\"> <div class=\"md2-calendar-month-header\"> <div class=\"md2-button\" [class.disabled]=\"!_isBeforeMonth()\" (click)=\"_isBeforeMonth() && _updateMonth(-1)\"> <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"> <path d=\"M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z\"></path> </svg> </div> <div class=\"md2-calendar-month-year\">{{ date | date: 'MMMM y' }}</div> <div class=\"md2-button\" [class.disabled]=\"!_isAfterMonth()\" (click)=\"_isAfterMonth() && _updateMonth(1)\"> <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"> <path d=\"M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z\"></path> </svg> </div> </div> <table class=\"md2-calendar-dates\"> <thead><tr><th *ngFor=\"let day of _weekDays\">{{day.xshort}}</th></tr></thead> <tbody> <tr *ngFor=\"let w of _dates\"> <td *ngFor=\"let d of w\"> <div class=\"md2-calendar-day\" [class.today]=\"d.today\" [class.focus]=\"_locale.isSameDay(date, d.date)\" [class.selected]=\"_locale.isSameDay(selected, d.date)\" [class.disabled]=\"d.disabled\" [class.prev-month]=\"d.calMonth===_prevMonth\" [class.curr-month]=\"d.calMonth===_currMonth\" [class.next-month]=\"d.calMonth===_nextMonth\" (click)=\"_onClickDate($event,d)\">{{d.dateObj.day}}</div> </td> </tr> </tbody> </table> </div> </div> <md2-clock [class.active]=\"!_isCalendarVisible\" [time]=\"time\" [view]=\"_clockView\" (timeChange)=\"_onTimeChange($event)\" (onHourChange)=\"_onHourChange($event)\" (onMinuteChange)=\"_onMinuteChange($event)\"></md2-clock> <div class=\"md2-datepicker-actions\"> <div class=\"md2-button\" (click)=\"close()\">Cancel</div> <div class=\"md2-button\" (click)=\"_onClickOk()\">Ok</div> </div> </div> </div> </template>",
            styles: ["md2-datepicker { position: relative; display: inline-block; min-width: 175px; outline: none; -webkit-backface-visibility: hidden; backface-visibility: hidden; } md2-datepicker.md2-datepicker-disabled { pointer-events: none; cursor: default; } .md2-datepicker-trigger { display: block; padding: 18px 0 18px 32px; white-space: nowrap; cursor: pointer; } .md2-datepicker-icon { position: absolute; top: 21px; left: 0; display: block; height: 24px; width: 24px; vertical-align: middle; fill: currentColor; color: rgba(0, 0, 0, 0.54); } .md2-datepicker-disabled .md2-datepicker-icon { color: rgba(0, 0, 0, 0.38); } .md2-datepicker-input { color: rgba(0, 0, 0, 0.38); border-bottom: 1px solid rgba(0, 0, 0, 0.12); display: flex; justify-content: space-between; align-items: center; height: 30px; min-width: 168px; line-height: 22px; position: relative; box-sizing: border-box; } [aria-disabled='true'] .md2-datepicker-input { background-image: linear-gradient(to right, rgba(0, 0, 0, 0.26) 0, rgba(0, 0, 0, 0.26) 33%, transparent 0); background-size: 4px 1px; background-repeat: repeat-x; border-color: transparent; background-position: 0 bottom; cursor: default; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; } md2-datepicker:focus:not(.md2-datepicker-disabled) .md2-datepicker-input { color: #106cc8; border-color: #106cc8; } md2-datepicker.ng-invalid.ng-touched:not(.md2-datepicker-disabled) .md2-datepicker-input { color: #f44336; border-color: #f44336; } .md2-datepicker-placeholder { position: absolute; right: 18px; bottom: 100%; left: 0; padding: 0 2px; transform: translate3d(0, 26px, 0) scale(1); transform-origin: left top; white-space: nowrap; overflow-x: hidden; text-overflow: ellipsis; transition: all 150ms cubic-bezier(0.25, 0.8, 0.25, 1); } .md2-datepicker-placeholder.md2-floating-placeholder { left: -2px; text-align: left; transform: translate3d(0, 6px, 0) scale(0.75); } [dir='rtl'] .md2-datepicker-placeholder { right: 0; left: 18px; transform-origin: right top; } [dir='rtl'] .md2-datepicker-placeholder.md2-floating-placeholder { right: -2px; text-align: right; } [aria-required=true] .md2-datepicker-placeholder::after { content: '*'; } .md2-datepicker-value { position: relative; white-space: nowrap; overflow-x: hidden; text-overflow: ellipsis; color: rgba(0, 0, 0, 0.87); } .md2-datepicker-disabled .md2-datepicker-value { color: rgba(0, 0, 0, 0.38); } [dir='rtl'] .md2-datepicker-value { left: auto; right: 0; } .md2-datepicker-arrow { width: 0; height: 0; border-left: 5px solid transparent; border-right: 5px solid transparent; border-top: 5px solid; margin: 0 4px; color: rgba(0, 0, 0, 0.38); } md2-datepicker:focus:not(.md2-datepicker-disabled) .md2-datepicker-arrow { color: #106cc8; } md2-datepicker.ng-invalid.ng-touched:not(.md2-datepicker-disabled) .md2-datepicker-arrow { color: #f44336; } .md2-datepicker-panel { width: 300px; border-radius: 3px; background-color: white; overflow: hidden; box-shadow: 0 11px 15px -7px rgba(0, 0, 0, 0.2), 0 24px 38px 3px rgba(0, 0, 0, 0.14), 0 9px 46px 8px rgba(0, 0, 0, 0.12); outline: none; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; } .md2-datepicker-header { padding: 16px; color: white; font-weight: 500; white-space: nowrap; background: #106cc8; box-sizing: border-box; } .md2-datepicker-header .hidden { display: none; } .md2-datepicker-header-year { font-size: 16px; opacity: 0.7; cursor: pointer; } .md2-datepicker-header-year.active { opacity: 1; pointer-events: none; } .md2-datepicker-header-date-time { font-size: 32px; } .md2-datepicker-header-date { opacity: 0.7; cursor: pointer; } .md2-datepicker-header-date.active { opacity: 1; pointer-events: none; } .md2-datepicker-header-time { opacity: 0.7; display: inline-block; padding-left: 8px; cursor: pointer; } .md2-datepicker-header-time.active { opacity: 1; cursor: default; } .md2-datepicker-header-time.active .md2-datepicker-header-hour, .md2-datepicker-header-time.active .md2-datepicker-header-minute { opacity: 0.7; cursor: pointer; } .md2-datepicker-header-time.active .md2-datepicker-header-hour.active, .md2-datepicker-header-time.active .md2-datepicker-header-minute.active { opacity: 1; pointer-events: none; } .md2-datepicker-content { position: relative; width: 100%; padding-top: 300px; overflow: hidden; } .md2-datepicker-calendar { position: absolute; top: 0; right: 100%; display: block; width: 100%; height: 300px; transition: 300ms; } .md2-datepicker-calendar.active { right: 0; } .md2-calendar-years { position: absolute; top: 10px; right: 100%; bottom: 10px; display: block; width: 100%; line-height: 40px; background: white; overflow-x: hidden; overflow-y: auto; transition: 300ms; } .md2-calendar-years.active { right: 0; } .md2-calendar-years .md2-calendar-years-content { display: flex; flex-direction: column; justify-content: center; min-height: 100%; } .md2-calendar-year { position: relative; display: block; margin: 0 auto; padding: 0; font-size: 17px; font-weight: 400; text-align: center; cursor: pointer; } .md2-calendar-year.selected { color: #106cc8; font-size: 26px; font-weight: 500; } .md2-calendar-month { position: absolute; left: 100%; display: block; width: 100%; font-size: 12px; font-weight: 400; text-align: center; transition: 300ms; } .md2-calendar-month.active { left: 0; } .md2-calendar-month-header { display: flex; justify-content: space-between; font-size: 14px; font-weight: 700; text-align: center; line-height: 48px; } .md2-calendar-month-header .md2-button { display: inline-block; width: 48px; height: 48px; padding: 12px; outline: none; border: 0; cursor: pointer; background: transparent; box-sizing: border-box; } .md2-calendar-month-header .md2-button svg { vertical-align: top; } .md2-calendar-month-header .md2-calendar-month-year-header { width: 100%; } .md2-calendar-dates { margin: 0 auto; } .md2-calendar-dates th { width: 35px; height: 20px; font-weight: 500; line-height: 15px; opacity: 0.5; } .md2-calendar-dates td { padding: 0; } .md2-calendar-day { position: relative; display: inline-block; width: 35px; height: 35px; border-radius: 50%; text-align: center; cursor: pointer; line-height: 35px; box-sizing: border-box; } .md2-calendar-day.today { color: #106cc8; } .md2-calendar-day:hover, .md2-calendar-day.focus { background: #e0e0e0; } .md2-calendar-day.selected, .md2-calendar-day.selected:hover { color: white; background: #106cc8; } .md2-calendar-day.disabled, .md2-calendar-day.disabled:hover { color: rgba(0, 0, 0, 0.45); background: transparent; pointer-events: none; } .md2-calendar-day.prev-month, .md2-calendar-day.next-month { visibility: hidden; } md2-clock { position: absolute; top: 0; left: 100%; display: block; width: 240px; height: 240px; margin: 30px; font-size: 14px; font-weight: 400; text-align: center; background-color: #e0e0e0; border-radius: 50%; overflow: hidden; transition: 300ms; } md2-clock.active { left: 0; } .md2-clock-center { position: absolute; top: 50%; left: 50%; height: 6px; width: 6px; margin: -3px; border-radius: 50%; background-color: #106cc8; } .md2-clock-hand { position: absolute; top: 0; right: 0; bottom: 0; left: 0; width: 1px; height: 99px; margin: 0 auto; background-color: #106cc8; transform-origin: bottom; /*transition: all 100ms;*/ } .md2-clock-hand::before { content: ''; position: absolute; top: -4px; left: -4px; width: 8px; height: 8px; border-radius: 50%; background-color: #106cc8; } .md2-clock-hours, .md2-clock-minutes { position: absolute; top: 0; left: 0; width: 100%; height: 100%; opacity: 0; visibility: hidden; transition: 350ms; transform: scale(1.2); } .md2-clock-hours.active, .md2-clock-minutes.active { opacity: 1; visibility: visible; transform: scale(1); } .md2-clock-minutes { transform: scale(0.8); } .md2-clock-hour, .md2-clock-minute { position: absolute; width: 34px; height: 34px; line-height: 34px; text-align: center; border-radius: 50%; cursor: pointer; } .md2-clock-hour:hover, .md2-clock-minute:hover { background: #fafafa; } .md2-clock-hour.active, .md2-clock-minute.active { background: #65acf3; } .md2-datepicker-actions { text-align: right; } .md2-datepicker-actions .md2-button { display: inline-block; min-width: 64px; margin: 4px 8px 8px 0; padding: 0 12px; font-size: 14px; color: #106cc8; line-height: 36px; text-align: center; text-transform: uppercase; border-radius: 2px; cursor: pointer; box-sizing: border-box; transition: all 450ms cubic-bezier(0.23, 1, 0.32, 1); } .md2-datepicker-actions .md2-button:hover { background: #ebebeb; } @media (min-width: 480px) { .md2-datepicker-panel { display: flex; width: 450px; } .md2-datepicker-header { width: 150px; min-width: 150px; padding-right: 15px; white-space: normal; word-wrap: break-word; } .md2-datepicker-header-time { display: block; padding-left: 0; } } .cdk-overlay-container, .cdk-global-overlay-wrapper { pointer-events: none; top: 0; left: 0; height: 100%; width: 100%; } .cdk-overlay-container { position: fixed; z-index: 1000; } .cdk-global-overlay-wrapper { display: flex; position: absolute; z-index: 1000; } .cdk-overlay-pane { position: absolute; pointer-events: auto; box-sizing: border-box; z-index: 1000; } .cdk-overlay-backdrop { position: absolute; top: 0; bottom: 0; left: 0; right: 0; z-index: 1000; pointer-events: auto; transition: opacity 400ms cubic-bezier(0.25, 0.8, 0.25, 1); opacity: 0; } .cdk-overlay-backdrop.cdk-overlay-backdrop-showing { opacity: 0.48; } .cdk-overlay-dark-backdrop { background: rgba(0, 0, 0, 0.6); } /*# sourceMappingURL=datepicker.css.map */ "],
            host: {
                'role': 'datepicker',
                '[id]': 'id',
                '[class.md2-datepicker-disabled]': 'disabled',
                '[class.md2-datepicker-opened]': 'panelOpen',
                '[attr.tabindex]': 'disabled ? -1 : tabindex',
                '[attr.aria-label]': 'placeholder',
                '[attr.aria-required]': 'required.toString()',
                '[attr.aria-disabled]': 'disabled.toString()',
                '[attr.aria-invalid]': '_control?.invalid || "false"',
                '(keydown)': '_handleKeydown($event)',
                '(focus)': '_onFocus()',
                '(blur)': '_onBlur()'
            },
            animations: [
                fadeInContent$1
            ],
            encapsulation: _angular_core.ViewEncapsulation.None
        }),
        __param$7(4, _angular_core.Self()),
        __param$7(4, _angular_core.Optional()), 
        __metadata$44('design:paramtypes', [_angular_core.ElementRef, Overlay, _angular_core.Renderer, DateLocale, _angular_forms.NgControl])
    ], Md2Datepicker);
    return Md2Datepicker;
}());
var MD2_DATEPICKER_DIRECTIVES = [Md2Datepicker, Md2Clock];
var Md2DatepickerModule = (function () {
    function Md2DatepickerModule() {
    }
    Md2DatepickerModule.forRoot = function () {
        return {
            ngModule: Md2DatepickerModule,
            providers: []
        };
    };
    Md2DatepickerModule = __decorate$44([
        _angular_core.NgModule({
            imports: [_angular_common.CommonModule, OverlayModule, PortalModule],
            exports: MD2_DATEPICKER_DIRECTIVES,
            declarations: MD2_DATEPICKER_DIRECTIVES,
            providers: [DateLocale]
        }), 
        __metadata$44('design:paramtypes', [])
    ], Md2DatepickerModule);
    return Md2DatepickerModule;
}());

var __extends$8 = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate$47 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$47 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var Md2DialogPortal = (function (_super) {
    __extends$8(Md2DialogPortal, _super);
    function Md2DialogPortal(templateRef, viewContainerRef) {
        _super.call(this, templateRef, viewContainerRef);
    }
    Md2DialogPortal = __decorate$47([
        _angular_core.Directive({ selector: '[md2DialogPortal]' }), 
        __metadata$47('design:paramtypes', [_angular_core.TemplateRef, _angular_core.ViewContainerRef])
    ], Md2DialogPortal);
    return Md2DialogPortal;
}(TemplatePortalDirective));
var Md2DialogTitle = (function () {
    function Md2DialogTitle() {
    }
    Md2DialogTitle = __decorate$47([
        _angular_core.Directive({ selector: 'md2-dialog-title' }), 
        __metadata$47('design:paramtypes', [])
    ], Md2DialogTitle);
    return Md2DialogTitle;
}());
var Md2DialogFooter = (function () {
    function Md2DialogFooter() {
    }
    Md2DialogFooter = __decorate$47([
        _angular_core.Directive({ selector: 'md2-dialog-footer' }), 
        __metadata$47('design:paramtypes', [])
    ], Md2DialogFooter);
    return Md2DialogFooter;
}());
var Md2Dialog = (function () {
    function Md2Dialog(_overlay) {
        this._overlay = _overlay;
        this._panelOpen = false;
        this._overlayRef = null;
        /** Property watched by the animation framework to show or hide the dialog */
        this._visibility = 'initial';
        this.onOpen = new _angular_core.EventEmitter();
        this.onClose = new _angular_core.EventEmitter();
    }
    Md2Dialog.prototype.ngOnDestroy = function () { this.destroyPanel(); };
    /** Open the dialog */
    Md2Dialog.prototype.open = function () {
        if (this._panelOpen) {
            return Promise.resolve(this);
        }
        this._createOverlay();
        this._overlayRef.attach(this._portal);
        this._subscribeToBackdrop();
        this._panelOpen = true;
        this._visibility = 'visible';
        return Promise.resolve(this);
    };
    /** Close the dialog */
    Md2Dialog.prototype.close = function () {
        this._visibility = 'hidden';
        this._panelOpen = false;
        if (this._overlayRef) {
            this._overlayRef.detach();
            this._backdropSubscription.unsubscribe();
        }
        return Promise.resolve(this);
    };
    /** Removes the panel from the DOM. */
    Md2Dialog.prototype.destroyPanel = function () {
        if (this._overlayRef) {
            this._overlayRef.dispose();
            this._overlayRef = null;
            this._cleanUpSubscriptions();
        }
    };
    Md2Dialog.prototype._onPanelDone = function () {
        if (this._panelOpen) {
            this.onOpen.emit(this);
        }
        else {
            this.onClose.emit();
        }
    };
    Md2Dialog.prototype._handleEscKeydown = function (event) {
        this.close();
    };
    Md2Dialog.prototype._subscribeToBackdrop = function () {
        var _this = this;
        this._backdropSubscription = this._overlayRef.backdropClick().subscribe(function () {
            _this.close();
        });
    };
    Md2Dialog.prototype._createOverlay = function () {
        if (!this._overlayRef) {
            var config = new OverlayState();
            config.positionStrategy = this._overlay.position()
                .global()
                .centerHorizontally()
                .centerVertically();
            config.hasBackdrop = true;
            config.backdropClass = 'cdk-overlay-dark-backdrop';
            this._overlayRef = this._overlay.create(config);
        }
    };
    Md2Dialog.prototype._cleanUpSubscriptions = function () {
        if (this._backdropSubscription) {
            this._backdropSubscription.unsubscribe();
        }
    };
    __decorate$47([
        _angular_core.Output(), 
        __metadata$47('design:type', _angular_core.EventEmitter)
    ], Md2Dialog.prototype, "onOpen", void 0);
    __decorate$47([
        _angular_core.Output(), 
        __metadata$47('design:type', _angular_core.EventEmitter)
    ], Md2Dialog.prototype, "onClose", void 0);
    __decorate$47([
        _angular_core.ViewChild(Md2DialogPortal), 
        __metadata$47('design:type', Md2DialogPortal)
    ], Md2Dialog.prototype, "_portal", void 0);
    __decorate$47([
        _angular_core.Input('title'), 
        __metadata$47('design:type', String)
    ], Md2Dialog.prototype, "dialogTitle", void 0);
    Md2Dialog = __decorate$47([
        _angular_core.Component({selector: 'md2-dialog',
            template: "<template md2DialogPortal> <div class=\"md2-dialog-panel\" [@state]=\"_visibility\" (@state.done)=\"_onPanelDone()\"> <div class=\"md2-dialog-content\"> <div class=\"md2-dialog-header\"> <button type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"close()\">&times;</button> <h2 *ngIf=\"dialogTitle\" class=\"md2-dialog-title\" id=\"myDialogLabel\" [innerHtml]=\"dialogTitle\"></h2> <ng-content select=\"md2-dialog-title\"></ng-content> </div> <div class=\"md2-dialog-body\"> <ng-content></ng-content> </div> <ng-content select=\"md2-dialog-footer\"></ng-content> </div> </div> </template>",
            styles: [".md2-dialog-panel { position: relative; max-width: 90vw; width: 600px; border-radius: 3px; background-color: white; overflow: hidden; box-shadow: 0 11px 15px -7px rgba(0, 0, 0, 0.2), 0 24px 38px 3px rgba(0, 0, 0, 0.14), 0 9px 46px 8px rgba(0, 0, 0, 0.12); } .md2-dialog-header { background: #2196f3; color: #fff; font-size: 25px; line-height: 1.1; font-weight: 500; padding: 0 48px 0 16px; border-bottom: 1px solid #e5e5e5; word-wrap: break-word; } .md2-dialog-header .close { position: absolute; top: 21px; right: 16px; display: inline-block; width: 18px; height: 18px; overflow: hidden; -webkit-appearance: none; padding: 0; cursor: pointer; background: 0 0; border: 0; outline: 0; opacity: 0.8; font-size: 0; z-index: 1; min-width: initial; box-shadow: none; margin: 0; } .md2-dialog-header .close::before, .md2-dialog-header .close::after { content: ''; position: absolute; top: 50%; left: 0; width: 100%; height: 2px; margin-top: -1px; background: #ccc; border-radius: 2px; } .md2-dialog-header .close::before { transform: rotate(45deg); } .md2-dialog-header .close::after { transform: rotate(-45deg); } .md2-dialog-header .close:hover { opacity: 1; } .md2-dialog-header md2-dialog-title, .md2-dialog-header .md2-dialog-title { display: block; margin: 0; padding: 16px 0; font-size: 25px; font-weight: 500; } .md2-dialog-header dialog-header { line-height: 33px; } .md2-dialog-body { position: relative; max-height: 65vh; padding: 16px; overflow-y: auto; } .md2-dialog-footer, md2-dialog-footer { display: block; padding: 16px; text-align: right; border-top: 1px solid rgba(0, 0, 0, 0.12); } .cdk-overlay-container, .cdk-global-overlay-wrapper { pointer-events: none; top: 0; left: 0; height: 100%; width: 100%; } .cdk-overlay-container { position: fixed; z-index: 1000; } .cdk-global-overlay-wrapper { display: flex; position: absolute; z-index: 1000; } .cdk-overlay-pane { position: absolute; pointer-events: auto; box-sizing: border-box; z-index: 1000; } .cdk-overlay-backdrop { position: absolute; top: 0; bottom: 0; left: 0; right: 0; z-index: 1000; pointer-events: auto; transition: opacity 400ms cubic-bezier(0.25, 0.8, 0.25, 1); opacity: 0; } .cdk-overlay-backdrop.cdk-overlay-backdrop-showing { opacity: 0.48; } .cdk-overlay-dark-backdrop { background: rgba(0, 0, 0, 0.6); } /*# sourceMappingURL=dialog.css.map */ "],
            host: {
                'tabindex': '0',
                '(body:keydown.esc)': '_handleEscKeydown($event)'
            },
            animations: [
                _angular_core.trigger('state', [
                    _angular_core.state('void', _angular_core.style({ transform: 'scale(0.3)' })),
                    _angular_core.state('initial', _angular_core.style({ transform: 'scale(0.3)' })),
                    _angular_core.state('visible', _angular_core.style({ transform: 'scale(1)' })),
                    _angular_core.state('hidden', _angular_core.style({ transform: 'scale(0.3)' })),
                    _angular_core.transition('* => visible', _angular_core.animate('150ms cubic-bezier(0.0, 0.0, 0.2, 1)')),
                    _angular_core.transition('* => hidden', _angular_core.animate('150ms cubic-bezier(0.4, 0.0, 1, 1)')),
                ])
            ],
            encapsulation: _angular_core.ViewEncapsulation.None,
            exportAs: 'md2Dialog'
        }), 
        __metadata$47('design:paramtypes', [Overlay])
    ], Md2Dialog);
    return Md2Dialog;
}());
var MD2_DIALOG_DIRECTIVES = [
    Md2Dialog,
    Md2DialogTitle,
    Md2DialogFooter,
    Md2DialogPortal
];
var Md2DialogModule = (function () {
    function Md2DialogModule() {
    }
    Md2DialogModule.forRoot = function () {
        return {
            ngModule: Md2DialogModule,
            providers: []
        };
    };
    Md2DialogModule = __decorate$47([
        _angular_core.NgModule({
            imports: [_angular_common.CommonModule, OverlayModule],
            exports: MD2_DIALOG_DIRECTIVES,
            declarations: MD2_DIALOG_DIRECTIVES,
        }), 
        __metadata$47('design:paramtypes', [])
    ], Md2DialogModule);
    return Md2DialogModule;
}());

var __decorate$49 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$49 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var Md2MenuContent = (function () {
    function Md2MenuContent() {
    }
    Md2MenuContent = __decorate$49([
        _angular_core.Component({selector: '[md2-menu-content]',
            host: { 'role': 'menu' },
            template: '<ng-content></ng-content>',
            styles: ["[md2-menu] { position: relative; display: inline-block; } [md2-menu-content] { position: absolute; top: 0; left: 0; display: inline-block; background: white; list-style: none; min-width: 112px; max-width: 280px; max-height: calc(100vh + 48px); padding: 8px 0; margin: 0; z-index: 1001; border-radius: 2px; transform: scale(0); transform-origin: left top; transition: all 200ms linear; box-shadow: 0 2px 6px 1px rgba(0, 0, 0, 0.34); } [md2-menu-item] [md2-menu-content] { left: 100%; margin: -8px 0; } [md2-menu-content][x-position='before'] { right: 0; left: auto; transform-origin: right top; } [md2-menu-item] [md2-menu-content][x-position='before'] { right: 100%; } [md2-menu-content][y-position='above'] { top: auto; bottom: 0; transform-origin: left bottom; } [md2-menu-content][y-position='above'][x-position='before'] { transform-origin: right bottom; } .open > [md2-menu-content] { transform: scale(1); } [md2-menu-item] { position: relative; width: 100%; cursor: pointer; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; outline: none; border: none; white-space: nowrap; text-overflow: ellipsis; display: flex; flex-direction: row; align-items: center; height: 36px; padding: 0 16px; font-size: 16px; text-align: start; text-decoration: none; background: transparent; color: rgba(0, 0, 0, 0.87); box-sizing: border-box; } [md2-menu-item][disabled] { color: rgba(0, 0, 0, 0.38); } [md2-menu-item]:hover:not([disabled]), [md2-menu-item]:focus:not([disabled]), [md2-menu-item].open { background: rgba(0, 0, 0, 0.04); text-decoration: none; } [md2-menu-item] > [md2-menu-trigger] { display: block; height: 36px; width: calc(100% + 32px); margin: 0 -16px; padding: 0 16px; font: inherit; color: inherit; text-align: left; background: transparent; outline: none; border: 0; cursor: pointer; box-shadow: none; } .md-overlay-container { position: fixed; pointer-events: none; top: 0; left: 0; height: 100%; width: 100%; z-index: 1000; } .md-overlay-pane { position: absolute; pointer-events: auto; box-sizing: border-box; z-index: 1000; } .md-overlay-backdrop { position: absolute; top: 0; bottom: 0; left: 0; right: 0; z-index: 1; pointer-events: auto; transition: opacity 400ms cubic-bezier(0.25, 0.8, 0.25, 1); opacity: 0; } .md-overlay-transparent-backdrop { background: none; } .md-overlay-backdrop.md-overlay-backdrop-showing { opacity: 0.48; } /*# sourceMappingURL=menu.css.map */ "],
            encapsulation: _angular_core.ViewEncapsulation.None,
        }), 
        __metadata$49('design:paramtypes', [])
    ], Md2MenuContent);
    return Md2MenuContent;
}());

var __decorate$50 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$50 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var Md2MenuItem = (function () {
    function Md2MenuItem() {
    }
    Md2MenuItem = __decorate$50([
        _angular_core.Component({selector: '[md2-menu-item]',
            host: {
                'role': 'menuitem'
            },
            template: '<ng-content></ng-content>'
        }), 
        __metadata$50('design:paramtypes', [])
    ], Md2MenuItem);
    return Md2MenuItem;
}());

var __decorate$51 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$51 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var Md2MenuTrigger = (function () {
    function Md2MenuTrigger(_element, _renderer) {
        this._element = _element;
        this._renderer = _renderer;
    }
    Md2MenuTrigger.prototype.ngAfterViewInit = function () {
        var _this = this;
        this._handleClick = this._renderer.listenGlobal('document', 'click', function (event) {
            if (!_this._hasChildMenu(event)) {
                _this._closeMenu();
            }
        });
    };
    Md2MenuTrigger.prototype.ngOnDestroy = function () {
        this._handleClick = null;
    };
    Md2MenuTrigger.prototype._toggleMenu = function () {
        if (this._hasClass(this._getParentElement(), 'open')) {
            this._closeMenu();
        }
        else {
            this._openMenu();
        }
    };
    Md2MenuTrigger.prototype._openMenu = function () {
        var _this = this;
        this._getParentElement().classList.add('open');
        var siblingElements = this._getSiblingElements(this._getParentElement());
        siblingElements.forEach(function (el) {
            el.classList.remove('open');
            _this._closeChildrenMenu(el);
        });
    };
    Md2MenuTrigger.prototype._closeMenu = function () {
        this._getParentElement().classList.remove('open');
        this._closeChildrenMenu(this._getParentElement());
    };
    Md2MenuTrigger.prototype._closeChildrenMenu = function (element) {
        [].forEach.call(element.querySelectorAll('.open'), function (el) {
            el.classList.remove('open');
        });
    };
    Md2MenuTrigger.prototype._getHostElement = function () {
        return this._element.nativeElement;
    };
    Md2MenuTrigger.prototype._getParentElement = function () {
        return this._element.nativeElement.parentNode;
    };
    Md2MenuTrigger.prototype._getSiblingElements = function (element) {
        var siblingElements = [];
        var el = element.parentNode.firstChild;
        for (; el; el = el.nextSibling) {
            if (el.nodeType == 1 && el !== element) {
                siblingElements.push(el);
            }
        }
        return siblingElements;
    };
    Md2MenuTrigger.prototype._getClosestElement = function (element, target) {
        if (element.hasAttribute(target)) {
            return element;
        }
        var parentEl;
        while (element) {
            parentEl = element.parentElement;
            if (parentEl && parentEl.hasAttribute(target)) {
                return parentEl;
            }
            element = parentEl;
        }
        return null;
    };
    Md2MenuTrigger.prototype._hasClass = function (element, className) {
        return (' ' + element.className + ' ').indexOf(' ' + className + ' ') > -1;
    };
    Md2MenuTrigger.prototype._hasChildMenu = function (event) {
        var el = this._getClosestElement(event.target, 'md2-menu-trigger');
        if (el && el === this._getHostElement()) {
            return true;
        }
        else if (this._getParentElement().contains(event.target)) {
            el = this._getClosestElement(event.target, 'md2-menu-item');
            if (el && el.querySelectorAll('[md2-menu-content]').length > 0) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    };
    Md2MenuTrigger = __decorate$51([
        _angular_core.Directive({
            selector: '[md2-menu-trigger]',
            host: {
                'aria-haspopup': 'true',
                '(click)': '_toggleMenu()',
            },
            exportAs: 'md2MenuTrigger'
        }), 
        __metadata$51('design:paramtypes', [_angular_core.ElementRef, _angular_core.Renderer])
    ], Md2MenuTrigger);
    return Md2MenuTrigger;
}());

var __decorate$48 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$48 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var Md2Menu = (function () {
    function Md2Menu() {
    }
    Md2Menu = __decorate$48([
        _angular_core.Component({selector: '[md2-menu]',
            template: '<ng-content></ng-content>',
            styles: ["[md2-menu] { position: relative; display: inline-block; } [md2-menu-content] { position: absolute; top: 0; left: 0; display: inline-block; background: white; list-style: none; min-width: 112px; max-width: 280px; max-height: calc(100vh + 48px); padding: 8px 0; margin: 0; z-index: 1001; border-radius: 2px; transform: scale(0); transform-origin: left top; transition: all 200ms linear; box-shadow: 0 2px 6px 1px rgba(0, 0, 0, 0.34); } [md2-menu-item] [md2-menu-content] { left: 100%; margin: -8px 0; } [md2-menu-content][x-position='before'] { right: 0; left: auto; transform-origin: right top; } [md2-menu-item] [md2-menu-content][x-position='before'] { right: 100%; } [md2-menu-content][y-position='above'] { top: auto; bottom: 0; transform-origin: left bottom; } [md2-menu-content][y-position='above'][x-position='before'] { transform-origin: right bottom; } .open > [md2-menu-content] { transform: scale(1); } [md2-menu-item] { position: relative; width: 100%; cursor: pointer; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; outline: none; border: none; white-space: nowrap; text-overflow: ellipsis; display: flex; flex-direction: row; align-items: center; height: 36px; padding: 0 16px; font-size: 16px; text-align: start; text-decoration: none; background: transparent; color: rgba(0, 0, 0, 0.87); box-sizing: border-box; } [md2-menu-item][disabled] { color: rgba(0, 0, 0, 0.38); } [md2-menu-item]:hover:not([disabled]), [md2-menu-item]:focus:not([disabled]), [md2-menu-item].open { background: rgba(0, 0, 0, 0.04); text-decoration: none; } [md2-menu-item] > [md2-menu-trigger] { display: block; height: 36px; width: calc(100% + 32px); margin: 0 -16px; padding: 0 16px; font: inherit; color: inherit; text-align: left; background: transparent; outline: none; border: 0; cursor: pointer; box-shadow: none; } .md-overlay-container { position: fixed; pointer-events: none; top: 0; left: 0; height: 100%; width: 100%; z-index: 1000; } .md-overlay-pane { position: absolute; pointer-events: auto; box-sizing: border-box; z-index: 1000; } .md-overlay-backdrop { position: absolute; top: 0; bottom: 0; left: 0; right: 0; z-index: 1; pointer-events: auto; transition: opacity 400ms cubic-bezier(0.25, 0.8, 0.25, 1); opacity: 0; } .md-overlay-transparent-backdrop { background: none; } .md-overlay-backdrop.md-overlay-backdrop-showing { opacity: 0.48; } /*# sourceMappingURL=menu.css.map */ "],
            encapsulation: _angular_core.ViewEncapsulation.None,
        }), 
        __metadata$48('design:paramtypes', [])
    ], Md2Menu);
    return Md2Menu;
}());
var Md2MenuModule = (function () {
    function Md2MenuModule() {
    }
    Md2MenuModule.forRoot = function () {
        return {
            ngModule: Md2MenuModule,
        };
    };
    Md2MenuModule = __decorate$48([
        _angular_core.NgModule({
            imports: [_angular_common.CommonModule],
            exports: [Md2Menu, Md2MenuContent, Md2MenuItem, Md2MenuTrigger],
            declarations: [Md2Menu, Md2MenuContent, Md2MenuItem, Md2MenuTrigger],
        }), 
        __metadata$48('design:paramtypes', [])
    ], Md2MenuModule);
    return Md2MenuModule;
}());

var __decorate$52 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$52 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/** Change event object that is emitted when the tab has changed. */
var Md2TabChange = (function () {
    function Md2TabChange(tab, index) {
        this.tab = tab;
        this.index = index;
    }
    return Md2TabChange;
}());
var Md2Transclude = (function () {
    function Md2Transclude(viewRef) {
        this.viewRef = viewRef;
    }
    Object.defineProperty(Md2Transclude.prototype, "md2Transclude", {
        get: function () { return this._md2Transclude; },
        set: function (templateRef) {
            this._md2Transclude = templateRef;
            if (templateRef) {
                this.viewRef.createEmbeddedView(templateRef);
            }
        },
        enumerable: true,
        configurable: true
    });
    __decorate$52([
        _angular_core.Input(), 
        __metadata$52('design:type', Object)
    ], Md2Transclude.prototype, "md2Transclude", null);
    Md2Transclude = __decorate$52([
        _angular_core.Directive({ selector: '[md2Transclude]' }), 
        __metadata$52('design:paramtypes', [_angular_core.ViewContainerRef])
    ], Md2Transclude);
    return Md2Transclude;
}());
var Md2Tab = (function () {
    function Md2Tab() {
    }
    __decorate$52([
        _angular_core.Input(), 
        __metadata$52('design:type', String)
    ], Md2Tab.prototype, "label", void 0);
    __decorate$52([
        _angular_core.Input(), 
        __metadata$52('design:type', Boolean)
    ], Md2Tab.prototype, "active", void 0);
    __decorate$52([
        _angular_core.Input(), 
        __metadata$52('design:type', Boolean)
    ], Md2Tab.prototype, "disabled", void 0);
    __decorate$52([
        _angular_core.Input(), 
        __metadata$52('design:type', String)
    ], Md2Tab.prototype, "class", void 0);
    Md2Tab = __decorate$52([
        _angular_core.Component({selector: 'md2-tab',
            template: "<ng-content></ng-content>",
            host: {
                '[class]': 'class',
                '[class.active]': 'active'
            }
        }), 
        __metadata$52('design:paramtypes', [])
    ], Md2Tab);
    return Md2Tab;
}());
var Md2TabLabel = (function () {
    function Md2TabLabel(templateRef, tab) {
        this.templateRef = templateRef;
        tab.labelRef = templateRef;
    }
    Md2TabLabel = __decorate$52([
        _angular_core.Directive({ selector: '[md2-tab-label]' }), 
        __metadata$52('design:paramtypes', [_angular_core.TemplateRef, Md2Tab])
    ], Md2TabLabel);
    return Md2TabLabel;
}());
var Md2Tabs = (function () {
    function Md2Tabs(elementRef) {
        this.elementRef = elementRef;
        this._isInitialized = false;
        this._focusIndex = 0;
        this._selectedIndex = 0;
        this._shouldPaginate = false;
        this._offsetLeft = 0;
        this._inkBarLeft = '0';
        this._inkBarWidth = '0';
        this.change = new _angular_core.EventEmitter();
        this.selectedIndexChange = new _angular_core.EventEmitter();
    }
    Object.defineProperty(Md2Tabs.prototype, "selectedIndex", {
        get: function () { return this._selectedIndex; },
        set: function (value) {
            if (typeof value === 'string') {
                value = parseInt(value);
            }
            if (value !== this._selectedIndex) {
                this._selectedIndex = value;
                this.adjustOffset(value);
                this._updateInkBar();
                if (this.tabs) {
                    var tabs = this.tabs.toArray();
                    if (!tabs[value].disabled) {
                        tabs.forEach(function (tab) { return tab.active = false; });
                        tabs[value].active = true;
                    }
                }
                if (this._isInitialized) {
                    this._emitChangeEvent();
                    this.selectedIndexChange.emit(value);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Tabs.prototype, "focusIndex", {
        get: function () { return this._focusIndex; },
        set: function (value) {
            this._focusIndex = value;
            this.adjustOffset(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Tabs.prototype, "element", {
        get: function () {
            var elements = {
                root: this.elementRef.nativeElement,
                wrapper: null,
                canvas: null,
                paging: null,
                tabs: null
            };
            elements.wrapper = elements.root.querySelector('.md2-tabs-header-wrapper');
            elements.canvas = elements.wrapper.querySelector('.md2-tabs-canvas');
            elements.paging = elements.canvas.querySelector('.md2-tabs-header');
            elements.tabs = elements.paging.querySelectorAll('.md2-tab-label');
            return elements;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * After Content Init
     */
    Md2Tabs.prototype.ngAfterContentInit = function () {
        var _this = this;
        setTimeout(function () {
            _this.updatePagination();
        }, 0);
        setTimeout(function () {
            var tabs = _this.tabs.toArray();
            if (_this.selectedIndex) {
                if (_this.selectedIndex >= tabs.length) {
                    _this.selectedIndex = 0;
                }
                tabs.forEach(function (tab) { return tab.active = false; });
                tabs[_this.selectedIndex].active = true;
                _this.adjustOffset(_this.selectedIndex);
            }
            else {
                var index = tabs.findIndex(function (t) { return t.active; });
                if (index < 0) {
                    tabs[0].active = true;
                }
                else {
                    _this.selectedIndex = index;
                }
            }
            _this._updateInkBar();
        }, 0);
        this._isInitialized = true;
    };
    /**
     * Calculates the styles from the selected tab for the ink-bar.
     */
    Md2Tabs.prototype._updateInkBar = function () {
        var elements = this.element;
        if (!elements.tabs[this.selectedIndex]) {
            return;
        }
        var tab = elements.tabs[this.selectedIndex];
        this._inkBarLeft = tab.offsetLeft + 'px';
        this._inkBarWidth = tab.offsetWidth + 'px';
    };
    /** Emits an event when the user selects an option. */
    Md2Tabs.prototype._emitChangeEvent = function () {
        var index = this._selectedIndex;
        this.change.emit(new Md2TabChange(this.tabs.toArray()[index], index));
    };
    /**
     * Focus next Tab
     */
    Md2Tabs.prototype.focusNextTab = function () { this.incrementIndex(1); };
    /**
     * Focus previous Tab
     */
    Md2Tabs.prototype.focusPreviousTab = function () { this.incrementIndex(-1); };
    /**
     * Mouse Wheel scroll
     * @param event
     */
    Md2Tabs.prototype.scroll = function (event) {
        if (!this._shouldPaginate) {
            return;
        }
        event.preventDefault();
        this._offsetLeft = this.fixOffset(this._offsetLeft - event.wheelDelta);
    };
    /**
     * Next Page
     */
    Md2Tabs.prototype.nextPage = function () {
        var elements = this.element;
        var viewportWidth = elements.canvas.clientWidth, totalWidth = viewportWidth + this._offsetLeft, i, tab;
        for (i = 0; i < elements.tabs.length; i++) {
            tab = elements.tabs[i];
            if (tab.offsetLeft + tab.offsetWidth > totalWidth) {
                break;
            }
        }
        this._offsetLeft = this.fixOffset(tab.offsetLeft);
    };
    /**
     * Previous Page
     */
    Md2Tabs.prototype.previousPage = function () {
        var i, tab, elements = this.element;
        for (i = 0; i < elements.tabs.length; i++) {
            tab = elements.tabs[i];
            if (tab.offsetLeft + tab.offsetWidth >= this._offsetLeft) {
                break;
            }
        }
        this._offsetLeft = this.fixOffset(tab.offsetLeft +
            tab.offsetWidth - elements.canvas.clientWidth);
    };
    /**
     * On Window Resize
     * @param event
     */
    Md2Tabs.prototype.onWindowResize = function (event) {
        this._offsetLeft = this.fixOffset(this._offsetLeft);
        this.updatePagination();
    };
    /**
     * Can page Back
     */
    Md2Tabs.prototype.canPageBack = function () { return this._offsetLeft > 0; };
    /**
     * Can page Previous
     */
    Md2Tabs.prototype.canPageForward = function () {
        var elements = this.element;
        var lastTab = elements.tabs[elements.tabs.length - 1];
        return lastTab && lastTab.offsetLeft + lastTab.offsetWidth > elements.canvas.clientWidth +
            this._offsetLeft;
    };
    /**
     * Update Pagination
     */
    Md2Tabs.prototype.updatePagination = function () {
        var canvasWidth = this.element.root.clientWidth;
        this.element.tabs.forEach(function (tab) {
            canvasWidth -= tab.offsetWidth;
        });
        this._shouldPaginate = canvasWidth < 0;
    };
    /**
     * Increment Focus Tab
     * @param inc
     */
    Md2Tabs.prototype.incrementIndex = function (inc) {
        var newIndex, index = this.focusIndex;
        for (newIndex = index + inc; this.tabs.toArray()[newIndex] && this.tabs.toArray()[newIndex].disabled; newIndex += inc) { }
        if (this.tabs.toArray()[newIndex]) {
            this.focusIndex = newIndex;
        }
    };
    /**
     * Adjust Offset of Tab
     * @param index
     */
    Md2Tabs.prototype.adjustOffset = function (index) {
        var elements = this.element;
        if (!elements.tabs[index]) {
            return;
        }
        var tab = elements.tabs[index], left = tab.offsetLeft, right = tab.offsetWidth + left;
        this._offsetLeft = Math.max(this._offsetLeft, this.fixOffset(right - elements.canvas.clientWidth + 32 * 2));
        this._offsetLeft = Math.min(this._offsetLeft, this.fixOffset(left));
    };
    /**
     * Fix Offset of Tab
     * @param value
     * @return value
     */
    Md2Tabs.prototype.fixOffset = function (value) {
        var elements = this.element;
        if (!elements.tabs.length || !this._shouldPaginate) {
            return 0;
        }
        var lastTab = elements.tabs[elements.tabs.length - 1], totalWidth = lastTab.offsetLeft + lastTab.offsetWidth;
        value = Math.max(0, value);
        value = Math.min(totalWidth - elements.canvas.clientWidth, value);
        return value;
    };
    __decorate$52([
        _angular_core.ContentChildren(Md2Tab), 
        __metadata$52('design:type', _angular_core.QueryList)
    ], Md2Tabs.prototype, "tabs", void 0);
    __decorate$52([
        _angular_core.Input(), 
        __metadata$52('design:type', String)
    ], Md2Tabs.prototype, "class", void 0);
    __decorate$52([
        _angular_core.Input(), 
        __metadata$52('design:type', Object)
    ], Md2Tabs.prototype, "selectedIndex", null);
    __decorate$52([
        _angular_core.Output(), 
        __metadata$52('design:type', _angular_core.EventEmitter)
    ], Md2Tabs.prototype, "change", void 0);
    __decorate$52([
        _angular_core.Output(), 
        __metadata$52('design:type', _angular_core.EventEmitter)
    ], Md2Tabs.prototype, "selectedIndexChange", void 0);
    Md2Tabs = __decorate$52([
        _angular_core.Component({selector: 'md2-tabs',
            template: "<div class=\"md2-tabs-header-wrapper\"> <div role=\"button\" class=\"md2-prev-button\" [class.disabled]=\"!canPageBack()\" *ngIf=\"_shouldPaginate\" (click)=\"previousPage()\"> <em class=\"prev-icon\">Prev</em> </div> <div role=\"button\" class=\"md2-next-button\" [class.disabled]=\"!canPageForward()\" *ngIf=\"_shouldPaginate\" (click)=\"nextPage()\"> <em class=\"next-icon\">Next</em> </div> <div class=\"md2-tabs-canvas\" [class.md2-paginated]=\"_shouldPaginate\" role=\"tablist\" tabindex=\"0\" (keydown.arrowRight)=\"focusNextTab()\" (keydown.arrowLeft)=\"focusPreviousTab()\" (keydown.enter)=\"selectedIndex = focusIndex\" (mousewheel)=\"scroll($event)\"> <div class=\"md2-tabs-header\" [style.marginLeft]=\"-_offsetLeft + 'px'\"> <div class=\"md2-tab-label\" role=\"tab\" *ngFor=\"let tab of tabs; let i = index\" [class.focus]=\"focusIndex === i\" [class.active]=\"selectedIndex === i\" [class.disabled]=\"tab.disabled\" (click)=\"focusIndex = selectedIndex = i\"> <span [md2Transclude]=\"tab.labelRef\">{{tab.label}}</span> </div> <div class=\"md2-tab-ink-bar\" [style.left]=\"_inkBarLeft\" [style.width]=\"_inkBarWidth\"></div> </div> </div> </div> <div class=\"md2-tabs-body-wrapper\"> <ng-content></ng-content> </div> ",
            styles: ["md2-tabs { position: relative; overflow: hidden; display: block; margin: 0; border: 1px solid #e1e1e1; border-radius: 2px; } .md2-tabs-header-wrapper { position: relative; display: block; height: 48px; background: white; border-width: 0 0 1px; border-style: solid; border-color: rgba(0, 0, 0, 0.12); margin: 0; padding: 0; list-style: none; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; } .md2-tabs-header-wrapper::after { content: ''; display: table; clear: both; } .md2-prev-button, .md2-next-button { position: absolute; top: 0; height: 100%; width: 32px; padding: 8px 0; z-index: 2; cursor: pointer; } .md2-prev-button.disabled, .md2-next-button.disabled { opacity: 0.25; cursor: default; } .md2-prev-button { left: 0; } .md2-next-button { right: 0; } .md2-prev-button .prev-icon, .md2-next-button .next-icon { display: block; width: 12px; height: 12px; font-size: 0; border-width: 0 0 2px 2px; border-style: solid; border-color: #757575; border-radius: 1px; transform: rotate(45deg); margin: 10px; } .md2-next-button .next-icon { border-width: 2px 2px 0 0; } .md2-tabs-canvas { position: relative; height: 100%; overflow: hidden; display: block; outline: none; } .md2-tabs-canvas.md2-paginated { margin: 0 32px; } .md2-tabs-header { position: relative; display: inline-block; height: 100%; white-space: nowrap; transition: 500ms cubic-bezier(0.35, 0, 0.25, 1); } .md2-tab-label { position: relative; height: 100%; color: rgba(0, 0, 0, 0.54); font-size: 14px; text-align: center; line-height: 24px; padding: 12px 24px; transition: background-color 350ms cubic-bezier(0.35, 0, 0.25, 1); cursor: pointer; white-space: nowrap; text-transform: uppercase; display: inline-block; font-weight: 500; box-sizing: border-box; overflow: hidden; -ms-text-overflow: ellipsis; text-overflow: ellipsis; } .md2-tab-label.active { color: #106cc8; } .md2-tabs-canvas:focus .md2-tab-label.focus { background: rgba(0, 0, 0, 0.05); } .md2-tab-label.disabled { color: rgba(0, 0, 0, 0.26); pointer-events: none; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; -webkit-user-drag: none; opacity: 0.5; cursor: default; } .md2-tab-ink-bar { position: absolute; bottom: 0; height: 2px; background: #ff5252; transition: 250ms cubic-bezier(0.35, 0, 0.25, 1); } .md2-tabs-body-wrapper { position: relative; min-height: 0; display: block; clear: both; } md2-tab { padding: 16px; display: none; position: relative; } md2-tab.active { display: block; position: relative; } /*# sourceMappingURL=tabs.css.map */ "],
            host: {
                '[class]': 'class',
                '(window:resize)': 'onWindowResize($event)'
            },
            encapsulation: _angular_core.ViewEncapsulation.None
        }), 
        __metadata$52('design:paramtypes', [_angular_core.ElementRef])
    ], Md2Tabs);
    return Md2Tabs;
}());
var MD2_TABS_DIRECTIVES = [Md2TabLabel, Md2Tabs, Md2Tab];
var Md2TabsModule = (function () {
    function Md2TabsModule() {
    }
    Md2TabsModule.forRoot = function () {
        return {
            ngModule: Md2TabsModule,
            providers: []
        };
    };
    Md2TabsModule = __decorate$52([
        _angular_core.NgModule({
            imports: [_angular_common.CommonModule],
            exports: MD2_TABS_DIRECTIVES,
            declarations: [Md2Transclude, Md2TabLabel, Md2Tabs, Md2Tab],
        }), 
        __metadata$52('design:paramtypes', [])
    ], Md2TabsModule);
    return Md2TabsModule;
}());

var __decorate$53 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$53 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var noop$1 = function () { };
var nextId$4 = 0;
var Tag = (function () {
    function Tag(source, textKey, valueKey) {
        if (typeof source === 'string') {
            this.text = this.value = source;
        }
        if (typeof source === 'object') {
            this.text = source[textKey];
            this.value = valueKey ? source[valueKey] : source;
        }
    }
    return Tag;
}());
var MD2_TAGS_CONTROL_VALUE_ACCESSOR = {
    provide: _angular_forms.NG_VALUE_ACCESSOR,
    useExisting: _angular_core.forwardRef(function () { return Md2Tags; }),
    multi: true
};
var Md2Tags = (function () {
    function Md2Tags(_element) {
        this._element = _element;
        this.change = new _angular_core.EventEmitter();
        this._value = '';
        this._disabled = false;
        this._isInitialized = false;
        this._onTouchedCallback = noop$1;
        this._onChangeCallback = noop$1;
        this._tags = [];
        this._list = [];
        this._items = [];
        this._focusedTag = 0;
        this._selectedTag = -1;
        this._inputValue = '';
        this._inputFocused = false;
        this.noBlur = true;
        this.id = 'md2-tags-' + (++nextId$4);
        this.tabindex = 0;
        this.placeholder = '';
        this.textKey = 'text';
        this.valueKey = null;
        this.selectAndFocusTagSafe = function (index) {
            if (!this._items.length) {
                this._selectTag(-1);
                this.onFocus();
                return;
            }
            if (index === this._items.length) {
                return this.onFocus();
            }
            index = Math.max(index, 0);
            index = Math.min(index, this._items.length - 1);
            this._selectTag(index);
        };
    }
    Md2Tags.prototype.ngAfterContentInit = function () { this._isInitialized = true; };
    Object.defineProperty(Md2Tags.prototype, "disabled", {
        get: function () { return this._disabled; },
        set: function (value) { this._disabled = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Tags.prototype, "tags", {
        set: function (value) { this._tags = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Tags.prototype, "value", {
        get: function () { return this._value; },
        set: function (value) { this.setValue(value); },
        enumerable: true,
        configurable: true
    });
    /**
     * setup value
     * @param value
     */
    Md2Tags.prototype.setValue = function (value) {
        var _this = this;
        if (value !== this._value) {
            this._value = value;
            this._items = [];
            if (value && value.length && typeof value === 'object' && Array.isArray(value)) {
                var _loop_1 = function(i) {
                    var selItm = this_1._tags.find(function (t) { return _this.equals(_this.valueKey ?
                        t[_this.valueKey] : t, value[i]); });
                    if (selItm) {
                        this_1._items.push(new Tag(selItm, this_1.textKey, this_1.valueKey));
                    }
                };
                var this_1 = this;
                for (var i = 0; i < value.length; i++) {
                    _loop_1(i);
                }
            }
            if (this._isInitialized) {
                this._onChangeCallback(value);
                this.change.emit(this._value);
            }
        }
    };
    /**
     * Compare two vars or objects
     * @param o1 compare first object
     * @param o2 compare second object
     * @return boolean comparation result
     */
    Md2Tags.prototype.equals = function (o1, o2) {
        if (o1 === o2) {
            return true;
        }
        if (o1 === null || o2 === null) {
            return false;
        }
        if (o1 !== o1 && o2 !== o2) {
            return true;
        }
        var t1 = typeof o1, t2 = typeof o2, key, keySet;
        if (t1 === t2 && t1 === 'object') {
            keySet = Object.create(null);
            for (key in o1) {
                if (!this.equals(o1[key], o2[key])) {
                    return false;
                }
                keySet[key] = true;
            }
            for (key in o2) {
                if (!(key in keySet) && key.charAt(0) !== '$' && o2[key]) {
                    return false;
                }
            }
            return true;
        }
        return false;
    };
    Object.defineProperty(Md2Tags.prototype, "isMenuVisible", {
        get: function () {
            return ((this._inputFocused || this.noBlur) && this._inputValue &&
                this._list && this._list.length) ? true : false;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * update scroll of tags suggestion menu
     */
    Md2Tags.prototype.updateScroll = function () {
        if (this._focusedTag < 0) {
            return;
        }
        var menuContainer = this._element.nativeElement.querySelector('.md2-tags-menu');
        if (!menuContainer) {
            return;
        }
        var choices = menuContainer.querySelectorAll('.md2-option');
        if (choices.length < 1) {
            return;
        }
        var highlighted = choices[this._focusedTag];
        if (!highlighted) {
            return;
        }
        var top = highlighted.offsetTop + highlighted.clientHeight - menuContainer.scrollTop;
        var height = menuContainer.offsetHeight;
        if (top > height) {
            menuContainer.scrollTop += top - height;
        }
        else if (top < highlighted.clientHeight) {
            menuContainer.scrollTop -= highlighted.clientHeight - top;
        }
    };
    /**
     * input key listener
     * @param event
     */
    Md2Tags.prototype._handleInputKeydown = function (event) {
        var _this = this;
        // Backspace
        if (event.keyCode === 8 && !this._inputValue) {
            event.preventDefault();
            event.stopPropagation();
            if (this._items.length && this._selectedTag < 0) {
                this.selectAndFocusTagSafe(this._items.length - 1);
            }
            if (this._items.length && this._selectedTag > -1) {
                this.removeAndSelectAdjacentTag(this._selectedTag);
            }
            return;
        }
        // Del Key
        if (event.keyCode === 46 && !this._inputValue) {
            return;
        }
        // Left / Right Arrow
        if ((event.keyCode === 37 || event.keyCode === 39) && !this._inputValue) {
            return;
        }
        // Down Arrow
        if (event.keyCode === 40) {
            if (!this.isMenuVisible) {
                return;
            }
            event.stopPropagation();
            event.preventDefault();
            this._focusedTag = (this._focusedTag === this._list.length - 1) ?
                0 : Math.min(this._focusedTag + 1, this._list.length - 1);
            this.updateScroll();
            return;
        }
        // Up Arrow
        if (event.keyCode === 38) {
            if (!this.isMenuVisible) {
                return;
            }
            event.stopPropagation();
            event.preventDefault();
            this._focusedTag = (this._focusedTag === 0) ?
                this._list.length - 1 : Math.max(0, this._focusedTag - 1);
            this.updateScroll();
            return;
        }
        // Tab Key
        if (event.keyCode === 9) {
            return;
        }
        // Enter / Space
        if (event.keyCode === 13 || event.keyCode === 32) {
            if (!this._inputValue || !this.isMenuVisible) {
                event.preventDefault();
                return;
            }
            event.preventDefault();
            this._addTag(event, this._focusedTag);
            return;
        }
        // Escape Key
        if (event.keyCode === 27) {
            event.stopPropagation();
            event.preventDefault();
            if (this._inputValue) {
                this._inputValue = '';
            }
            if (this._selectedTag >= 0) {
                this._handleFocus();
            }
            return;
        }
        // reset selected tag
        if (this._selectedTag >= 0) {
            this.resetselectedTag();
        }
        // filter
        setTimeout(function () {
            _this.filterMatches(new RegExp(_this._inputValue, 'ig'));
        }, 10);
    };
    Md2Tags.prototype._handleKeydown = function (event) {
        if (this.disabled || this._inputValue) {
            return;
        }
        switch (event.keyCode) {
            case BACKSPACE:
            case DELETE:
                if (this._selectedTag < 0) {
                    return;
                }
                event.preventDefault();
                this.removeAndSelectAdjacentTag(this._selectedTag);
                break;
            case TAB:
            case ESCAPE:
                if (this._selectedTag < 0) {
                    return;
                }
                event.preventDefault();
                this._handleFocus();
                break;
            case LEFT_ARROW:
                event.preventDefault();
                if (this._selectedTag < 0) {
                    this._selectedTag = this._items.length;
                }
                if (this._items.length) {
                    this.selectAndFocusTagSafe(this._selectedTag - 1);
                }
                break;
            case RIGHT_ARROW:
                event.preventDefault();
                if (this._selectedTag >= this._items.length) {
                    this._selectedTag = -1;
                }
                this.selectAndFocusTagSafe(this._selectedTag + 1);
                break;
        }
    };
    Md2Tags.prototype.removeAndSelectAdjacentTag = function (index) {
        var selIndex = this.getAdjacentTagIndex(index);
        this.removeTag(index);
        this.selectAndFocusTagSafe(selIndex);
    };
    Md2Tags.prototype.resetselectedTag = function () {
        this._selectedTag = -1;
    };
    Md2Tags.prototype.getAdjacentTagIndex = function (index) {
        var len = this._items.length - 1;
        return (len === 0) ? -1 :
            (index === len) ? index - 1 : index;
    };
    /**
     * add tag
     * @param event
     * @param index index of the specific tag
     */
    Md2Tags.prototype._addTag = function (event, index) {
        event.preventDefault();
        event.stopPropagation();
        this._items.push(this._list[index]);
        this._inputValue = '';
        this.updateValue();
    };
    Md2Tags.prototype._removeTagAndFocusInput = function (index) {
        this.removeTag(index);
        this._handleFocus();
    };
    /**
     * remove tag
     * @param index
     */
    Md2Tags.prototype.removeTag = function (index) {
        this._items.splice(index, 1);
        this.updateValue();
    };
    /**
     * update value
     */
    Md2Tags.prototype.updateValue = function () {
        this._value = new Array();
        for (var i = 0; i < this._items.length; i++) {
            this._value.push(this._items[i].value);
        }
        this._onChangeCallback(this._value);
        this.change.emit(this._value);
    };
    /**
     * select tag
     * @param index of select tag
     */
    Md2Tags.prototype._selectTag = function (index) {
        if (index >= -1 && index <= this._items.length) {
            this._selectedTag = index;
        }
    };
    Md2Tags.prototype._handleFocus = function () {
        this._element.nativeElement.querySelector('input').focus();
        this.resetselectedTag();
    };
    Md2Tags.prototype._onInputFocus = function () {
        this._inputFocused = true;
        this.resetselectedTag();
    };
    Md2Tags.prototype._onInputBlur = function () {
        this._inputFocused = false;
    };
    Md2Tags.prototype._listEnter = function () { this.noBlur = true; };
    Md2Tags.prototype._listLeave = function () { this.noBlur = false; };
    /**
     * update suggestion menu with filter
     * @param query
     */
    Md2Tags.prototype.filterMatches = function (query) {
        var _this = this;
        var tempList = this._tags.map(function (tag) { return new Tag(tag, _this.textKey, _this.valueKey); });
        this._list = tempList.filter(function (t) {
            return (query.test(t.text) && !_this._items.find(function (i) { return t.text === i.text; }));
        });
        if (this._list.length > 0) {
            this._focusedTag = 0;
        }
    };
    Md2Tags.prototype.writeValue = function (value) {
        var _this = this;
        if (value !== this._value) {
            this._value = value;
            this._items = [];
            if (value && value.length && typeof value === 'object' && Array.isArray(value)) {
                var _loop_2 = function(i) {
                    var selItm = this_2._tags.find(function (t) { return _this.equals(_this.valueKey ?
                        t[_this.valueKey] : t, value[i]); });
                    if (selItm) {
                        this_2._items.push(new Tag(selItm, this_2.textKey, this_2.valueKey));
                    }
                };
                var this_2 = this;
                for (var i = 0; i < value.length; i++) {
                    _loop_2(i);
                }
            }
        }
    };
    Md2Tags.prototype.registerOnChange = function (fn) { this._onChangeCallback = fn; };
    Md2Tags.prototype.registerOnTouched = function (fn) { this._onTouchedCallback = fn; };
    __decorate$53([
        _angular_core.Output(), 
        __metadata$53('design:type', _angular_core.EventEmitter)
    ], Md2Tags.prototype, "change", void 0);
    __decorate$53([
        _angular_core.Input(), 
        __metadata$53('design:type', String)
    ], Md2Tags.prototype, "id", void 0);
    __decorate$53([
        _angular_core.Input(), 
        __metadata$53('design:type', Number)
    ], Md2Tags.prototype, "tabindex", void 0);
    __decorate$53([
        _angular_core.Input(), 
        __metadata$53('design:type', String)
    ], Md2Tags.prototype, "placeholder", void 0);
    __decorate$53([
        _angular_core.Input('md2-tag-text'), 
        __metadata$53('design:type', String)
    ], Md2Tags.prototype, "textKey", void 0);
    __decorate$53([
        _angular_core.Input('md2-tag-value'), 
        __metadata$53('design:type', String)
    ], Md2Tags.prototype, "valueKey", void 0);
    __decorate$53([
        _angular_core.Input(), 
        __metadata$53('design:type', Boolean)
    ], Md2Tags.prototype, "disabled", null);
    __decorate$53([
        _angular_core.Input('md2-tags'), 
        __metadata$53('design:type', Array), 
        __metadata$53('design:paramtypes', [Array])
    ], Md2Tags.prototype, "tags", null);
    __decorate$53([
        _angular_core.Input(), 
        __metadata$53('design:type', Object)
    ], Md2Tags.prototype, "value", null);
    __decorate$53([
        _angular_core.HostListener('keydown', ['$event']), 
        __metadata$53('design:type', Function), 
        __metadata$53('design:paramtypes', [KeyboardEvent]), 
        __metadata$53('design:returntype', void 0)
    ], Md2Tags.prototype, "_handleKeydown", null);
    __decorate$53([
        _angular_core.HostListener('focus'), 
        __metadata$53('design:type', Function), 
        __metadata$53('design:paramtypes', []), 
        __metadata$53('design:returntype', void 0)
    ], Md2Tags.prototype, "_handleFocus", null);
    Md2Tags = __decorate$53([
        _angular_core.Component({selector: 'md2-tags',
            template: "<div class=\"md2-tags-container\"> <span *ngFor=\"let t of _items; let i = index;\" class=\"md2-tag\" [class.active]=\"_selectedTag === i\" (click)=\"_selectTag(i)\"> <span class=\"md2-tag-text\">{{t.text}}</span> <svg (click)=\"_removeTagAndFocusInput(i)\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"> <path d=\"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z\" /> </svg> </span> <span class=\"md2-tag-add\"> <input [(ngModel)]=\"_inputValue\" type=\"text\" tabs=\"false\" autocomplete=\"off\" tabindex=\"-1\" [disabled]=\"disabled\" class=\"md2-tags-input\" [placeholder]=\"placeholder\" (focus)=\"_onInputFocus()\" (blur)=\"_onInputBlur()\" (keydown)=\"_handleInputKeydown($event)\" (change)=\"$event.stopPropagation()\" /> <ul *ngIf=\"isMenuVisible\" class=\"md2-tags-menu\" (mouseenter)=\"_listEnter()\" (mouseleave)=\"_listLeave()\"> <li class=\"md2-option\" *ngFor=\"let l of _list; let i = index;\" [class.focused]=\"_focusedTag === i\" (click)=\"_addTag($event, i)\"> <span class=\"md2-option-text\" [innerHtml]=\"l.text | highlight:_inputValue\"></span> </li> </ul> </span> </div> ",
            styles: ["md2-tags { -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; -webkit-backface-visibility: hidden; backface-visibility: hidden; } md2-tags:focus { outline: none; } md2-tags .md2-tags-container { position: relative; display: block; max-width: 100%; padding: 2px 3px 8px; border-bottom: 1px solid rgba(0, 0, 0, 0.38); box-sizing: content-box; min-width: 64px; min-height: 26px; cursor: text; } md2-tags .md2-tags-container::before, md2-tags .md2-tags-container::after { display: table; content: ' '; } md2-tags .md2-tags-container::after { clear: both; } md2-tags.focus .md2-tags-container { padding-bottom: 7px; border-bottom: 2px solid #106cc8; } md2-tags.md2-tags-disabled .md2-tags-container { color: rgba(0, 0, 0, 0.38); cursor: default; } md2-tags.md2-tags-disabled.focus .md2-tags-container { padding-bottom: 8px; border-bottom: 1px solid rgba(0, 0, 0, 0.38); } md2-tags .md2-tags-container .md2-tag { position: relative; cursor: default; border-radius: 16px; display: block; height: 32px; line-height: 32px; margin: 8px 8px 0 0; padding: 0 26px 0 12px; float: left; box-sizing: border-box; max-width: 100%; background: #e0e0e0; color: #424242; white-space: nowrap; overflow: hidden; -ms-text-overflow: ellipsis; text-overflow: ellipsis; } md2-tags .md2-tags-container .md2-tag.active { background: #106cc8; color: rgba(255, 255, 255, 0.87); } md2-tags .md2-tags-container .md2-tag svg { position: absolute; top: 4px; right: 2px; cursor: pointer; display: inline-block; overflow: hidden; fill: currentColor; color: rgba(0, 0, 0, 0.54); } md2-tags .md2-tag.active svg { color: rgba(255, 255, 255, 0.87); } md2-tags .md2-tag-add { position: relative; display: inline-block; } md2-tags input { border: 0; outline: 0; margin-top: 8px; height: 32px; line-height: 32px; padding: 0; color: rgba(0, 0, 0, 0.87); background: 0 0; } md2-tags .md2-tags-container .md2-tags-placeholder { color: rgba(0, 0, 0, 0.38); } md2-tags .md2-tags-menu { position: absolute; left: 0; top: 100%; display: block; z-index: 10; flex-direction: column; width: 100%; margin: 6px 0 0; padding: 8px 0; box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 2px 1px -1px rgba(0, 0, 0, 0.12); max-height: 256px; min-height: 48px; overflow-y: auto; transform: scale(1); background: #fff; } md2-tags .md2-tags-menu .md2-option { cursor: pointer; position: relative; display: block; color: #212121; align-items: center; width: auto; transition: background 150ms linear; padding: 0 16px; height: 48px; line-height: 48px; } md2-tags .md2-tags-menu .md2-option:hover, md2-tags .md2-tags-menu .md2-option.focused { background: #eeeeee; } md2-tags .md2-tags-menu .md2-option .md2-option-text { width: auto; white-space: nowrap; overflow: hidden; -ms-text-overflow: ellipsis; text-overflow: ellipsis; font-size: 16px; } md2-tags .highlight { color: #757575; } /*# sourceMappingURL=tags.css.map */ "],
            host: {
                'role': 'tags',
                '[id]': 'id',
                '[class.focus]': '_inputFocused || _selectedTag >= 0',
                '[class.md2-tags-disabled]': 'disabled',
                '[tabindex]': 'disabled ? -1 : tabindex',
                '[attr.aria-disabled]': 'disabled'
            },
            providers: [MD2_TAGS_CONTROL_VALUE_ACCESSOR],
            encapsulation: _angular_core.ViewEncapsulation.None
        }), 
        __metadata$53('design:paramtypes', [_angular_core.ElementRef])
    ], Md2Tags);
    return Md2Tags;
}());
var MD2_TAGS_DIRECTIVES = [Md2Tags];
var Md2TagsModule = (function () {
    function Md2TagsModule() {
    }
    Md2TagsModule.forRoot = function () {
        return {
            ngModule: Md2TagsModule,
            providers: []
        };
    };
    Md2TagsModule = __decorate$53([
        _angular_core.NgModule({
            imports: [_angular_common.CommonModule, _angular_forms.FormsModule, Md2AutocompleteModule],
            exports: MD2_TAGS_DIRECTIVES,
            declarations: MD2_TAGS_DIRECTIVES,
        }), 
        __metadata$53('design:paramtypes', [])
    ], Md2TagsModule);
    return Md2TagsModule;
}());

var __decorate$54 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$54 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var Toast = (function () {
    function Toast(message) {
        this.message = message;
    }
    return Toast;
}());
var Md2ToastConfig = (function () {
    function Md2ToastConfig() {
        this.duration = 3000;
        this.viewContainerRef = null;
    }
    return Md2ToastConfig;
}());
var Md2Toast = (function () {
    function Md2Toast(_overlay, _config) {
        this._overlay = _overlay;
        this._config = _config;
        this.index = 0;
    }
    /**
     * toast message
     * @param toast string or object with message and other properties of toast
     */
    Md2Toast.prototype.toast = function (message, duration) {
        this.show(message, duration);
    };
    /**
     * show toast
     * @param toastObj string or object with message and other properties of toast
     */
    Md2Toast.prototype.show = function (message, duration) {
        if (!message || !message.trim()) {
            return;
        }
        if (duration) {
            this._config.duration = duration;
        }
        var toast;
        toast = new Toast(message);
        if (toast) {
            if (!this._toastInstance) {
                this._createToast();
            }
            this._setToastMessage(toast);
        }
    };
    /** Create the toast to display */
    Md2Toast.prototype._createToast = function () {
        this._createOverlay();
        var portal = new ComponentPortal(Md2ToastComponent, this._config.viewContainerRef);
        this._toastInstance = this._overlayRef.attach(portal).instance;
    };
    /** Create the overlay config and position strategy */
    Md2Toast.prototype._createOverlay = function () {
        if (!this._overlayRef) {
            var config = new OverlayState();
            config.positionStrategy = this._overlay.position()
                .global()
                .top('0').right('0');
            this._overlayRef = this._overlay.create(config);
        }
    };
    /** Disposes the current toast and the overlay it is attached to */
    Md2Toast.prototype._disposeToast = function () {
        this._overlayRef.dispose();
        this._overlayRef = null;
        this._toastInstance = null;
    };
    /** Updates the toast message and repositions the overlay according to the new message length */
    Md2Toast.prototype._setToastMessage = function (toast) {
        var _this = this;
        toast.id = ++this.index;
        this._toastInstance.addToast(toast);
        setTimeout(function () {
            _this.clearToast(toast.id);
        }, this._config.duration);
    };
    /**
     * clear specific toast
     * @param toastId
     */
    Md2Toast.prototype.clearToast = function (toastId) {
        var _this = this;
        if (this._toastInstance) {
            this._toastInstance.removeToast(toastId);
            setTimeout(function () {
                if (!_this._toastInstance.hasToast()) {
                    _this._disposeToast();
                }
            }, 250);
        }
    };
    /**
     * clear all toasts
     */
    Md2Toast.prototype.clearAllToasts = function () {
        var _this = this;
        if (this._toastInstance) {
            this._toastInstance.removeAllToasts();
            setTimeout(function () {
                if (!_this._toastInstance.hasToast()) {
                    _this._disposeToast();
                }
            }, 250);
        }
    };
    Md2Toast = __decorate$54([
        _angular_core.Injectable(), 
        __metadata$54('design:paramtypes', [Overlay, Md2ToastConfig])
    ], Md2Toast);
    return Md2Toast;
}());
var Md2ToastComponent = (function () {
    function Md2ToastComponent() {
        this.toasts = [];
        this.maxShown = 5;
    }
    /**
     * add toast
     * @param toast toast object with all parameters
     */
    Md2ToastComponent.prototype.addToast = function (toast) {
        var _this = this;
        setTimeout(function () {
            toast.isVisible = true;
        }, 1);
        this.toasts.push(toast);
        if (this.toasts.length > this.maxShown) {
            this.toasts[0].isVisible = false;
            setTimeout(function () {
                _this.toasts.splice(0, (_this.toasts.length - _this.maxShown));
            }, 250);
        }
    };
    /**
     * remove toast
     * @param toastId number of toast id
     */
    Md2ToastComponent.prototype.removeToast = function (toastId) {
        var _this = this;
        this.toasts.forEach(function (t) { if (t.id === toastId) {
            t.isVisible = false;
        } });
        setTimeout(function () {
            _this.toasts = _this.toasts.filter(function (toast) { return toast.id !== toastId; });
        }, 250);
    };
    /**
     * remove all toasts
     * @param toastId number of toast id
     */
    Md2ToastComponent.prototype.removeAllToasts = function () {
        var _this = this;
        this.toasts.forEach(function (t) { t.isVisible = false; });
        setTimeout(function () {
            _this.toasts = [];
        }, 250);
    };
    /**
     * check has any toast
     * @return boolean
     */
    Md2ToastComponent.prototype.hasToast = function () { return this.toasts.length > 0; };
    Md2ToastComponent = __decorate$54([
        _angular_core.Component({
            selector: 'md2-toast',
            template: "<div *ngFor=\"let toast of toasts\" class=\"md2-toast\" [class.in]=\"toast.isVisible\" (click)=\"remove(toast.id)\">{{ toast.message }}</div> ",
            styles: ["md2-toast { display: block; box-sizing: border-box; cursor: default; overflow: hidden; min-width: 304px; max-width: 100%; padding: 8px; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; } .md2-toast { position: relative; padding: 14px 24px; margin-bottom: 5px; display: block; margin-top: -53px; opacity: 0; background-color: #323232; color: #fafafa; box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.26); border-radius: 2px; font-size: 14px; overflow: hidden; word-wrap: break-word; transition: all 250ms linear; } .md2-toast.in { margin-top: 0; opacity: 1; } .cdk-visually-hidden { border: 0; clip: rect(0 0 0 0); height: 1px; margin: -1px; overflow: hidden; padding: 0; position: absolute; text-transform: none; width: 1px; } .cdk-overlay-container, .cdk-global-overlay-wrapper { pointer-events: none; top: 0; left: 0; height: 100%; width: 100%; } .cdk-overlay-container { position: fixed; z-index: 1000; } .cdk-global-overlay-wrapper { display: flex; position: absolute; z-index: 1000; } .cdk-overlay-pane { position: absolute; pointer-events: auto; box-sizing: border-box; z-index: 1000; } /*# sourceMappingURL=toast.css.map */ "],
            encapsulation: _angular_core.ViewEncapsulation.None,
        }), 
        __metadata$54('design:paramtypes', [])
    ], Md2ToastComponent);
    return Md2ToastComponent;
}());
var MD2_TOAST_DIRECTIVES = [Md2ToastComponent];
var Md2ToastModule = (function () {
    function Md2ToastModule() {
    }
    Md2ToastModule.forRoot = function () {
        return {
            ngModule: Md2ToastModule,
            providers: []
        };
    };
    Md2ToastModule = __decorate$54([
        _angular_core.NgModule({
            imports: [_angular_common.CommonModule],
            exports: MD2_TOAST_DIRECTIVES,
            declarations: MD2_TOAST_DIRECTIVES,
            entryComponents: MD2_TOAST_DIRECTIVES,
            providers: [Md2Toast, Md2ToastConfig, OVERLAY_PROVIDERS]
        }), 
        __metadata$54('design:paramtypes', [])
    ], Md2ToastModule);
    return Md2ToastModule;
}());

var __extends$9 = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Exception thrown when a tooltip has an invalid position.
 * @docs-private
 */
var Md2TooltipInvalidPositionError = (function (_super) {
    __extends$9(Md2TooltipInvalidPositionError, _super);
    function Md2TooltipInvalidPositionError(position) {
        _super.call(this, "Tooltip position \"" + position + "\" is invalid.");
    }
    return Md2TooltipInvalidPositionError;
}(MdError));

var __decorate$55 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$55 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param$8 = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
/** Time in ms to delay before changing the tooltip visibility to hidden */
var TOUCHEND_HIDE_DELAY = 1500;
/** Time in ms to throttle repositioning after scroll events. */
var SCROLL_THROTTLE_MS = 20;
/**
 * Directive that attaches a material design tooltip to the host element. Animates the showing and
 * hiding of a tooltip provided position (defaults to below the element).
 *
 * https://material.google.com/components/tooltips.html
 */
var Md2Tooltip = (function () {
    function Md2Tooltip(_overlay, _scrollDispatcher, _elementRef, _viewContainerRef, _ngZone, _dir) {
        this._overlay = _overlay;
        this._scrollDispatcher = _scrollDispatcher;
        this._elementRef = _elementRef;
        this._viewContainerRef = _viewContainerRef;
        this._ngZone = _ngZone;
        this._dir = _dir;
        this._position = 'below';
        /** The default delay in ms before showing the tooltip after show is called */
        this.showDelay = 0;
        /** The default delay in ms before hiding the tooltip after hide is called */
        this.hideDelay = 0;
    }
    Object.defineProperty(Md2Tooltip.prototype, "position", {
        /** Allows the user to define the position of the tooltip relative to the parent element */
        get: function () { return this._position; },
        set: function (value) {
            if (value !== this._position) {
                this._position = value;
                // TODO(andrewjs): When the overlay's position can be dynamically changed, do not destroy
                // the tooltip.
                if (this._tooltipInstance) {
                    this._disposeTooltip();
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Tooltip.prototype, "message", {
        /** The message to be displayed in the tooltip */
        get: function () { return this._message; },
        set: function (value) {
            this._message = value;
            if (this._tooltipInstance) {
                this._setTooltipMessage(this._message);
            }
        },
        enumerable: true,
        configurable: true
    });
    Md2Tooltip.prototype.ngOnInit = function () {
        var _this = this;
        // When a scroll on the page occurs, update the position in case this tooltip needs
        // to be repositioned.
        this.scrollSubscription = this._scrollDispatcher.scrolled(SCROLL_THROTTLE_MS).subscribe(function () {
            if (_this._overlayRef) {
                _this._overlayRef.updatePosition();
            }
        });
    };
    /**
     * Dispose the tooltip when destroyed.
     */
    Md2Tooltip.prototype.ngOnDestroy = function () {
        if (this._tooltipInstance) {
            this._disposeTooltip();
        }
        this.scrollSubscription.unsubscribe();
    };
    /** Shows the tooltip after the delay in ms, defaults to tooltip-delay-show or 0ms if no input */
    Md2Tooltip.prototype.show = function (delay) {
        if (delay === void 0) { delay = this.showDelay; }
        if (!this._message || !this._message.trim()) {
            return;
        }
        if (!this._tooltipInstance) {
            this._createTooltip();
        }
        this._setTooltipMessage(this._message);
        this._tooltipInstance.show(this._position, delay);
    };
    /** Hides the tooltip after the delay in ms, defaults to tooltip-delay-hide or 0ms if no input */
    Md2Tooltip.prototype.hide = function (delay) {
        if (delay === void 0) { delay = this.hideDelay; }
        if (this._tooltipInstance) {
            this._tooltipInstance.hide(delay);
        }
    };
    /** Shows/hides the tooltip */
    Md2Tooltip.prototype.toggle = function () {
        this._isTooltipVisible() ? this.hide() : this.show();
    };
    /** Returns true if the tooltip is currently visible to the user */
    Md2Tooltip.prototype._isTooltipVisible = function () {
        return this._tooltipInstance && this._tooltipInstance.isVisible();
    };
    /** Create the tooltip to display */
    Md2Tooltip.prototype._createTooltip = function () {
        var _this = this;
        this._createOverlay();
        var portal = new ComponentPortal(Md2TooltipComponent, this._viewContainerRef);
        this._tooltipInstance = this._overlayRef.attach(portal).instance;
        // Dispose the overlay when finished the shown tooltip.
        this._tooltipInstance.afterHidden().subscribe(function () {
            // Check first if the tooltip has already been removed through this components destroy.
            if (_this._tooltipInstance) {
                _this._disposeTooltip();
            }
        });
    };
    /** Create the overlay config and position strategy */
    Md2Tooltip.prototype._createOverlay = function () {
        var _this = this;
        var origin = this._getOrigin();
        var position = this._getOverlayPosition();
        // Create connected position strategy that listens for scroll events to reposition.
        // After position changes occur and the overlay is clipped by a parent scrollable then
        // close the tooltip.
        var strategy = this._overlay.position().connectedTo(this._elementRef, origin, position);
        strategy.withScrollableContainers(this._scrollDispatcher.getScrollContainers(this._elementRef));
        strategy.onPositionChange.subscribe(function (change) {
            if (change.scrollableViewProperties.isOverlayClipped &&
                _this._tooltipInstance && _this._tooltipInstance.isVisible()) {
                _this.hide(0);
            }
        });
        var config = new OverlayState();
        config.positionStrategy = strategy;
        this._overlayRef = this._overlay.create(config);
    };
    /** Disposes the current tooltip and the overlay it is attached to */
    Md2Tooltip.prototype._disposeTooltip = function () {
        this._overlayRef.dispose();
        this._overlayRef = null;
        this._tooltipInstance = null;
    };
    /** Returns the origin position based on the user's position preference */
    Md2Tooltip.prototype._getOrigin = function () {
        if (this.position == 'above' || this.position == 'below') {
            return { originX: 'center', originY: this.position == 'above' ? 'top' : 'bottom' };
        }
        var isDirectionLtr = !this._dir || this._dir.value == 'ltr';
        if (this.position == 'left' ||
            this.position == 'before' && isDirectionLtr ||
            this.position == 'after' && !isDirectionLtr) {
            return { originX: 'start', originY: 'center' };
        }
        if (this.position == 'right' ||
            this.position == 'after' && isDirectionLtr ||
            this.position == 'before' && !isDirectionLtr) {
            return { originX: 'end', originY: 'center' };
        }
        throw new Md2TooltipInvalidPositionError(this.position);
    };
    /** Returns the overlay position based on the user's preference */
    Md2Tooltip.prototype._getOverlayPosition = function () {
        if (this.position == 'above') {
            return { overlayX: 'center', overlayY: 'bottom' };
        }
        if (this.position == 'below') {
            return { overlayX: 'center', overlayY: 'top' };
        }
        var isLtr = !this._dir || this._dir.value == 'ltr';
        if (this.position == 'left' ||
            this.position == 'before' && isLtr ||
            this.position == 'after' && !isLtr) {
            return { overlayX: 'end', overlayY: 'center' };
        }
        if (this.position == 'right' ||
            this.position == 'after' && isLtr ||
            this.position == 'before' && !isLtr) {
            return { overlayX: 'start', overlayY: 'center' };
        }
        throw new Md2TooltipInvalidPositionError(this.position);
    };
    /** Updates the tooltip message and repositions the overlay according to the new message length */
    Md2Tooltip.prototype._setTooltipMessage = function (message) {
        var _this = this;
        // Must wait for the message to be painted to the tooltip so that the overlay can properly
        // calculate the correct positioning based on the size of the text.
        this._tooltipInstance.message = message;
        this._ngZone.onMicrotaskEmpty.first().subscribe(function () {
            if (_this._tooltipInstance) {
                _this._overlayRef.updatePosition();
            }
        });
    };
    __decorate$55([
        _angular_core.Input('tooltip-position'), 
        __metadata$55('design:type', String)
    ], Md2Tooltip.prototype, "position", null);
    __decorate$55([
        _angular_core.Input('tooltip-delay'), 
        __metadata$55('design:type', Object)
    ], Md2Tooltip.prototype, "showDelay", void 0);
    __decorate$55([
        _angular_core.Input('tooltip-hide-delay'), 
        __metadata$55('design:type', Object)
    ], Md2Tooltip.prototype, "hideDelay", void 0);
    __decorate$55([
        _angular_core.Input('tooltip'), 
        __metadata$55('design:type', Object)
    ], Md2Tooltip.prototype, "message", null);
    Md2Tooltip = __decorate$55([
        _angular_core.Directive({
            selector: '[tooltip]',
            host: {
                '(longpress)': 'show()',
                '(touchend)': 'hide(' + TOUCHEND_HIDE_DELAY + ')',
                '(mouseenter)': 'show()',
                '(mouseleave)': 'hide()',
            },
            exportAs: 'md2Tooltip',
        }),
        __param$8(5, _angular_core.Optional()), 
        __metadata$55('design:paramtypes', [Overlay, ScrollDispatcher, _angular_core.ElementRef, _angular_core.ViewContainerRef, _angular_core.NgZone, Dir])
    ], Md2Tooltip);
    return Md2Tooltip;
}());
/**
 * Internal component that wraps the tooltip's content.
 * @docs-private
 */
var Md2TooltipComponent = (function () {
    function Md2TooltipComponent(_dir, _changeDetectorRef) {
        this._dir = _dir;
        this._changeDetectorRef = _changeDetectorRef;
        /** Property watched by the animation framework to show or hide the tooltip */
        this._visibility = 'initial';
        /** Whether interactions on the page should close the tooltip */
        this._closeOnInteraction = false;
        /** The transform origin used in the animation for showing and hiding the tooltip */
        this._transformOrigin = 'bottom';
        /** Subject for notifying that the tooltip has been hidden from the view */
        this._onHide = new rxjs_Subject.Subject();
    }
    /**
     * Shows the tooltip with an animation originating from the provided origin
     * @param position Position of the tooltip.
     * @param delay Amount of milliseconds to the delay showing the tooltip.
     */
    Md2TooltipComponent.prototype.show = function (position, delay) {
        var _this = this;
        // Cancel the delayed hide if it is scheduled
        if (this._hideTimeoutId) {
            clearTimeout(this._hideTimeoutId);
        }
        // Body interactions should cancel the tooltip if there is a delay in showing.
        this._closeOnInteraction = true;
        this._setTransformOrigin(position);
        this._showTimeoutId = setTimeout(function () {
            _this._visibility = 'visible';
            // If this was set to true immediately, then a body click that triggers show() would
            // trigger interaction and close the tooltip right after it was displayed.
            _this._closeOnInteraction = false;
            // Mark for check so if any parent component has set the
            // ChangeDetectionStrategy to OnPush it will be checked anyways
            _this._changeDetectorRef.markForCheck();
            setTimeout(function () { _this._closeOnInteraction = true; }, 0);
        }, delay);
    };
    /**
     * Begins the animation to hide the tooltip after the provided delay in ms.
     * @param delay Amount of milliseconds to delay showing the tooltip.
     */
    Md2TooltipComponent.prototype.hide = function (delay) {
        var _this = this;
        // Cancel the delayed show if it is scheduled
        if (this._showTimeoutId) {
            clearTimeout(this._showTimeoutId);
        }
        this._hideTimeoutId = setTimeout(function () {
            _this._visibility = 'hidden';
            _this._closeOnInteraction = false;
            // Mark for check so if any parent component has set the
            // ChangeDetectionStrategy to OnPush it will be checked anyways
            _this._changeDetectorRef.markForCheck();
        }, delay);
    };
    /**
     * Returns an observable that notifies when the tooltip has been hidden from view
     */
    Md2TooltipComponent.prototype.afterHidden = function () {
        return this._onHide.asObservable();
    };
    /**
     * Whether the tooltip is being displayed
     */
    Md2TooltipComponent.prototype.isVisible = function () {
        return this._visibility === 'visible';
    };
    /** Sets the tooltip transform origin according to the tooltip position */
    Md2TooltipComponent.prototype._setTransformOrigin = function (value) {
        var isLtr = !this._dir || this._dir.value == 'ltr';
        switch (value) {
            case 'before':
                this._transformOrigin = isLtr ? 'right' : 'left';
                break;
            case 'after':
                this._transformOrigin = isLtr ? 'left' : 'right';
                break;
            case 'left':
                this._transformOrigin = 'right';
                break;
            case 'right':
                this._transformOrigin = 'left';
                break;
            case 'above':
                this._transformOrigin = 'bottom';
                break;
            case 'below':
                this._transformOrigin = 'top';
                break;
            default: throw new Md2TooltipInvalidPositionError(value);
        }
    };
    Md2TooltipComponent.prototype._afterVisibilityAnimation = function (e) {
        if (e.toState === 'hidden' && !this.isVisible()) {
            this._onHide.next();
        }
    };
    /**
     * Interactions on the HTML body should close the tooltip immediately as defined in the
     * material design spec.
     * https://material.google.com/components/tooltips.html#tooltips-interaction
     */
    Md2TooltipComponent.prototype._handleBodyInteraction = function () {
        if (this._closeOnInteraction) {
            this.hide(0);
        }
    };
    Md2TooltipComponent = __decorate$55([
        _angular_core.Component({selector: 'md2-tooltip',
            template: "<div class=\"md2-tooltip\" [style.transform-origin]=\"_transformOrigin\" [@state]=\"_visibility\" (@state.done)=\"_afterVisibilityAnimation($event)\" [innerHTML]=\"message\"> </div>",
            styles: ["md2-tooltip { pointer-events: none; } .md2-tooltip { color: white; padding: 6px 8px; border-radius: 2px; font-size: 10px; margin: 14px; max-width: 250px; background: rgba(97, 97, 97, 0.9); } .cdk-overlay-container, .cdk-global-overlay-wrapper { pointer-events: none; top: 0; left: 0; height: 100%; width: 100%; } .cdk-overlay-container { position: fixed; z-index: 1000; } .cdk-global-overlay-wrapper { display: flex; position: absolute; z-index: 1000; } .cdk-overlay-pane { position: absolute; pointer-events: auto; box-sizing: border-box; z-index: 1000; } /*# sourceMappingURL=tooltip.css.map */ "],
            animations: [
                _angular_core.trigger('state', [
                    _angular_core.state('void', _angular_core.style({ transform: 'scale(0)' })),
                    _angular_core.state('initial', _angular_core.style({ transform: 'scale(0)' })),
                    _angular_core.state('visible', _angular_core.style({ transform: 'scale(1)' })),
                    _angular_core.state('hidden', _angular_core.style({ transform: 'scale(0)' })),
                    _angular_core.transition('* => visible', _angular_core.animate('150ms cubic-bezier(0.0, 0.0, 0.2, 1)')),
                    _angular_core.transition('* => hidden', _angular_core.animate('150ms cubic-bezier(0.4, 0.0, 1, 1)')),
                ])
            ],
            host: {
                '(body:click)': 'this._handleBodyInteraction()'
            },
            encapsulation: _angular_core.ViewEncapsulation.None
        }),
        __param$8(0, _angular_core.Optional()), 
        __metadata$55('design:paramtypes', [Dir, _angular_core.ChangeDetectorRef])
    ], Md2TooltipComponent);
    return Md2TooltipComponent;
}());
var Md2TooltipModule = (function () {
    function Md2TooltipModule() {
    }
    /** @deprecated */
    Md2TooltipModule.forRoot = function () {
        return {
            ngModule: Md2TooltipModule,
            providers: []
        };
    };
    Md2TooltipModule = __decorate$55([
        _angular_core.NgModule({
            imports: [OverlayModule, CompatibilityModule],
            exports: [Md2Tooltip, Md2TooltipComponent, CompatibilityModule],
            declarations: [Md2Tooltip, Md2TooltipComponent],
            entryComponents: [Md2TooltipComponent],
        }), 
        __metadata$55('design:paramtypes', [])
    ], Md2TooltipModule);
    return Md2TooltipModule;
}());

var __decorate$30 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$30 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var MD2_MODULES = [
    Md2AccordionModule,
    Md2AutocompleteModule,
    Md2ChipsModule,
    Md2CollapseModule,
    Md2ColorpickerModule,
    Md2DataTableModule,
    Md2DatepickerModule,
    Md2DialogModule,
    Md2MenuModule,
    MdRippleModule,
    Md2SelectModule,
    Md2TabsModule,
    Md2TagsModule,
    Md2ToastModule,
    Md2TooltipModule,
    OverlayModule,
    PortalModule,
    RtlModule,
    A11yModule,
    PlatformModule,
    ProjectionModule,
    CompatibilityModule,
    ObserveContentModule
];
var Md2RootModule = (function () {
    function Md2RootModule() {
    }
    Md2RootModule = __decorate$30([
        _angular_core.NgModule({
            imports: [
                Md2AccordionModule.forRoot(),
                Md2AutocompleteModule.forRoot(),
                Md2ChipsModule.forRoot(),
                Md2CollapseModule.forRoot(),
                Md2ColorpickerModule.forRoot(),
                Md2DataTableModule.forRoot(),
                Md2DatepickerModule.forRoot(),
                Md2DialogModule.forRoot(),
                Md2MenuModule.forRoot(),
                MdRippleModule.forRoot(),
                Md2SelectModule.forRoot(),
                Md2TabsModule.forRoot(),
                Md2TagsModule.forRoot(),
                Md2ToastModule.forRoot(),
                Md2TooltipModule.forRoot(),
                A11yModule.forRoot(),
                OverlayModule.forRoot(),
                PlatformModule.forRoot(),
                PortalModule.forRoot(),
                ProjectionModule.forRoot(),
                RtlModule.forRoot(),
                ObserveContentModule.forRoot(),
                CompatibilityModule.forRoot(),
            ],
            exports: MD2_MODULES,
        }), 
        __metadata$30('design:paramtypes', [])
    ], Md2RootModule);
    return Md2RootModule;
}());
var Md2Module = (function () {
    function Md2Module() {
    }
    /** @deprecated */
    Md2Module.forRoot = function () {
        return { ngModule: Md2RootModule };
    };
    Md2Module = __decorate$30([
        _angular_core.NgModule({
            imports: MD2_MODULES,
            exports: MD2_MODULES,
        }), 
        __metadata$30('design:paramtypes', [])
    ], Md2Module);
    return Md2Module;
}());

exports.MdCoreModule = MdCoreModule;
exports.Dir = Dir;
exports.RtlModule = RtlModule;
exports.ObserveContentModule = ObserveContentModule;
exports.ObserveContent = ObserveContent;
exports.MdOptionModule = MdOptionModule;
exports.MdOption = MdOption;
exports.Portal = Portal;
exports.BasePortalHost = BasePortalHost;
exports.ComponentPortal = ComponentPortal;
exports.TemplatePortal = TemplatePortal;
exports.PortalHostDirective = PortalHostDirective;
exports.TemplatePortalDirective = TemplatePortalDirective;
exports.PortalModule = PortalModule;
exports.DomPortalHost = DomPortalHost;
exports.MdPlatform = Platform;
exports.Overlay = Overlay;
exports.OVERLAY_PROVIDERS = OVERLAY_PROVIDERS;
exports.OverlayContainer = OverlayContainer;
exports.FullscreenOverlayContainer = FullscreenOverlayContainer;
exports.OverlayRef = OverlayRef;
exports.OverlayState = OverlayState;
exports.ConnectedOverlayDirective = ConnectedOverlayDirective;
exports.OverlayOrigin = OverlayOrigin;
exports.OverlayModule = OverlayModule;
exports.ScrollDispatcher = ScrollDispatcher;
exports.GestureConfig = GestureConfig;
exports.MdRipple = MdRipple;
exports.MdRippleModule = MdRippleModule;
exports.LiveAnnouncer = LiveAnnouncer;
exports.LIVE_ANNOUNCER_ELEMENT_TOKEN = LIVE_ANNOUNCER_ELEMENT_TOKEN;
exports.LIVE_ANNOUNCER_PROVIDER = LIVE_ANNOUNCER_PROVIDER;
exports.MdLiveAnnouncer = LiveAnnouncer;
exports.FocusTrap = FocusTrap;
exports.InteractivityChecker = InteractivityChecker;
exports.isFakeMousedownFromScreenReader = isFakeMousedownFromScreenReader;
exports.A11yModule = A11yModule;
exports.UniqueSelectionDispatcher = UniqueSelectionDispatcher;
exports.UNIQUE_SELECTION_DISPATCHER_PROVIDER = UNIQUE_SELECTION_DISPATCHER_PROVIDER;
exports.MdUniqueSelectionDispatcher = UniqueSelectionDispatcher;
exports.MdLineModule = MdLineModule;
exports.MdLine = MdLine;
exports.MdLineSetter = MdLineSetter;
exports.MdError = MdError;
exports.coerceBooleanProperty = coerceBooleanProperty;
exports.coerceNumberProperty = coerceNumberProperty;
exports.CompatibilityModule = CompatibilityModule;
exports.NoConflictStyleCompatibilityMode = NoConflictStyleCompatibilityMode;
exports.DomProjectionHost = DomProjectionHost;
exports.DomProjection = DomProjection;
exports.ProjectionModule = ProjectionModule;
exports.PlatformModule = PlatformModule;
exports.Platform = Platform;
exports.getSupportedInputTypes = getSupportedInputTypes;
exports.ConnectedPositionStrategy = ConnectedPositionStrategy;
exports.ConnectionPositionPair = ConnectionPositionPair;
exports.ScrollableViewProperties = ScrollableViewProperties;
exports.ConnectedOverlayPositionChange = ConnectedOverlayPositionChange;
exports.SelectionModel = SelectionModel;
exports.SelectionChange = SelectionChange;
exports.StyleModule = StyleModule;
exports.TOUCH_BUFFER_MS = TOUCH_BUFFER_MS;
exports.FocusOriginMonitor = FocusOriginMonitor;
exports.CdkMonitorFocus = CdkMonitorFocus;
exports.FOCUS_ORIGIN_MONITOR_PROVIDER_FACTORY = FOCUS_ORIGIN_MONITOR_PROVIDER_FACTORY;
exports.FOCUS_ORIGIN_MONITOR_PROVIDER = FOCUS_ORIGIN_MONITOR_PROVIDER;
exports.applyCssTransform = applyCssTransform;
exports.UP_ARROW = UP_ARROW;
exports.DOWN_ARROW = DOWN_ARROW;
exports.RIGHT_ARROW = RIGHT_ARROW;
exports.LEFT_ARROW = LEFT_ARROW;
exports.PAGE_UP = PAGE_UP;
exports.PAGE_DOWN = PAGE_DOWN;
exports.HOME = HOME;
exports.END = END;
exports.ENTER = ENTER;
exports.SPACE = SPACE;
exports.TAB = TAB;
exports.ESCAPE = ESCAPE;
exports.BACKSPACE = BACKSPACE;
exports.DELETE = DELETE;
exports.MATERIAL_COMPATIBILITY_MODE = MATERIAL_COMPATIBILITY_MODE;
exports.MAT_ELEMENTS_SELECTOR = MAT_ELEMENTS_SELECTOR;
exports.MD_ELEMENTS_SELECTOR = MD_ELEMENTS_SELECTOR;
exports.MatPrefixRejector = MatPrefixRejector;
exports.MdPrefixRejector = MdPrefixRejector;
exports.AnimationCurves = AnimationCurves;
exports.AnimationDurations = AnimationDurations;
exports.MdSelectionModule = MdSelectionModule;
exports.MdPseudoCheckbox = MdPseudoCheckbox;
exports.Md2RootModule = Md2RootModule;
exports.Md2Module = Md2Module;
exports.MD2_ACCORDION_DIRECTIVES = MD2_ACCORDION_DIRECTIVES;
exports.Md2AccordionModule = Md2AccordionModule;
exports.Md2Accordion = Md2Accordion;
exports.Md2AccordionHeader = Md2AccordionHeader;
exports.Md2AccordionTab = Md2AccordionTab;
exports.Item = Item;
exports.MD2_AUTOCOMPLETE_CONTROL_VALUE_ACCESSOR = MD2_AUTOCOMPLETE_CONTROL_VALUE_ACCESSOR;
exports.Md2AutocompleteChange = Md2AutocompleteChange;
exports.Md2Autocomplete = Md2Autocomplete;
exports.MD2_AUTOCOMPLETE_DIRECTIVES = MD2_AUTOCOMPLETE_DIRECTIVES;
exports.Md2AutocompleteModule = Md2AutocompleteModule;
exports.Chip = Chip;
exports.MD2_CHIPS_CONTROL_VALUE_ACCESSOR = MD2_CHIPS_CONTROL_VALUE_ACCESSOR;
exports.Md2Chips = Md2Chips;
exports.MD2_CHIPS_DIRECTIVES = MD2_CHIPS_DIRECTIVES;
exports.Md2ChipsModule = Md2ChipsModule;
exports.Md2Collapse = Md2Collapse;
exports.MD2_COLLAPSE_DIRECTIVES = MD2_COLLAPSE_DIRECTIVES;
exports.Md2CollapseModule = Md2CollapseModule;
exports.TextDirective = TextDirective;
exports.ColorpickerSliderDirective = ColorpickerSliderDirective;
exports.Md2ColorChange = Md2ColorChange;
exports.Md2Colorpicker = Md2Colorpicker;
exports.Hsva = Hsva;
exports.Hsla = Hsla;
exports.Rgba = Rgba;
exports.SliderPosition = SliderPosition;
exports.SliderDimension = SliderDimension;
exports.MD2_COLORPICKER_DIRECTIVES = MD2_COLORPICKER_DIRECTIVES;
exports.Md2ColorpickerModule = Md2ColorpickerModule;
exports.Md2PaginationChange = Md2PaginationChange;
exports.Md2DataTable = Md2DataTable;
exports.Md2DataTableSortBy = Md2DataTableSortBy;
exports.Md2Pagination = Md2Pagination;
exports.MD2_DATA_TABLE_DIRECTIVES = MD2_DATA_TABLE_DIRECTIVES;
exports.Md2DataTableModule = Md2DataTableModule;
exports.Md2DateChange = Md2DateChange;
exports.Md2Datepicker = Md2Datepicker;
exports.MD2_DATEPICKER_DIRECTIVES = MD2_DATEPICKER_DIRECTIVES;
exports.Md2DatepickerModule = Md2DatepickerModule;
exports.Md2DialogPortal = Md2DialogPortal;
exports.Md2DialogTitle = Md2DialogTitle;
exports.Md2DialogFooter = Md2DialogFooter;
exports.Md2Dialog = Md2Dialog;
exports.MD2_DIALOG_DIRECTIVES = MD2_DIALOG_DIRECTIVES;
exports.Md2DialogModule = Md2DialogModule;
exports.Md2Menu = Md2Menu;
exports.Md2MenuModule = Md2MenuModule;
exports.Md2MenuContent = Md2MenuContent;
exports.Md2MenuItem = Md2MenuItem;
exports.Md2MenuTrigger = Md2MenuTrigger;
exports.Md2SelectModule = Md2SelectModule;
exports.fadeInContent = fadeInContent;
exports.transformPanel = transformPanel;
exports.transformPlaceholder = transformPlaceholder;
exports.SELECT_OPTION_HEIGHT = SELECT_OPTION_HEIGHT;
exports.SELECT_PANEL_MAX_HEIGHT = SELECT_PANEL_MAX_HEIGHT;
exports.SELECT_MAX_OPTIONS_DISPLAYED = SELECT_MAX_OPTIONS_DISPLAYED;
exports.SELECT_TRIGGER_HEIGHT = SELECT_TRIGGER_HEIGHT;
exports.SELECT_OPTION_HEIGHT_ADJUSTMENT = SELECT_OPTION_HEIGHT_ADJUSTMENT;
exports.SELECT_PANEL_PADDING_X = SELECT_PANEL_PADDING_X;
exports.SELECT_PANEL_PADDING_Y = SELECT_PANEL_PADDING_Y;
exports.SELECT_PANEL_VIEWPORT_PADDING = SELECT_PANEL_VIEWPORT_PADDING;
exports.Md2SelectChange = Md2SelectChange;
exports.Md2Select = Md2Select;
exports.Md2OptionSelectEvent = Md2OptionSelectEvent;
exports.Md2Option = Md2Option;
exports.Md2OptionModule = Md2OptionModule;
exports.Md2TabChange = Md2TabChange;
exports.Md2Transclude = Md2Transclude;
exports.Md2Tab = Md2Tab;
exports.Md2TabLabel = Md2TabLabel;
exports.Md2Tabs = Md2Tabs;
exports.MD2_TABS_DIRECTIVES = MD2_TABS_DIRECTIVES;
exports.Md2TabsModule = Md2TabsModule;
exports.Tag = Tag;
exports.MD2_TAGS_CONTROL_VALUE_ACCESSOR = MD2_TAGS_CONTROL_VALUE_ACCESSOR;
exports.Md2Tags = Md2Tags;
exports.MD2_TAGS_DIRECTIVES = MD2_TAGS_DIRECTIVES;
exports.Md2TagsModule = Md2TagsModule;
exports.Toast = Toast;
exports.Md2ToastConfig = Md2ToastConfig;
exports.Md2Toast = Md2Toast;
exports.Md2ToastComponent = Md2ToastComponent;
exports.MD2_TOAST_DIRECTIVES = MD2_TOAST_DIRECTIVES;
exports.Md2ToastModule = Md2ToastModule;
exports.TOUCHEND_HIDE_DELAY = TOUCHEND_HIDE_DELAY;
exports.SCROLL_THROTTLE_MS = SCROLL_THROTTLE_MS;
exports.Md2Tooltip = Md2Tooltip;
exports.Md2TooltipComponent = Md2TooltipComponent;
exports.Md2TooltipModule = Md2TooltipModule;

Object.defineProperty(exports, '__esModule', { value: true });

})));
