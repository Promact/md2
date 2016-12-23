(function (global, factory) {
   typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs/Subject'), require('rxjs/Observable'), require('rxjs/add/observable/fromEvent'), require('@angular/common'), require('@angular/platform-browser'), require('@angular/forms'), require('rxjs/add/operator/first')) :
   typeof define === 'function' && define.amd ? define(['exports', '@angular/core', 'rxjs/Subject', 'rxjs/Observable', 'rxjs/add/observable/fromEvent', '@angular/common', '@angular/platform-browser', '@angular/forms', 'rxjs/add/operator/first'], factory) :
   (factory((global.ng = global.ng || {}, global.ng.md2 = global.ng.md2 || {}),global.ng.core,global.Rx,global.Rx,global.Rx.Observable,global.ng.common,global.ng.platformBrowser,global.ng.forms,global.Rx.Observable.prototype));
}(this, (function (exports,_angular_core,rxjs_Subject,rxjs_Observable,rxjs_add_observable_fromEvent,_angular_common,_angular_platformBrowser,_angular_forms,rxjs_add_operator_first) { 'use strict';

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
var MATERIAL_COMPATIBILITY_MODE = new _angular_core.OpaqueToken('md-compatibiility-mode');
/** Selector that matches all elements that may have style collisions with material1. */
var MAT_ELEMENTS_SELECTOR = "\n  mat-autocomplete,\n  mat-card,\n  mat-card-actions,\n  mat-card-content,\n  mat-card-footer,\n  mat-card-header,\n  mat-card-subtitle,\n  mat-card-title,\n  mat-card-title-group,\n  mat-checkbox,\n  mat-chip,\n  mat-dialog-container,\n  mat-divider,\n  mat-grid-list,\n  mat-grid-tile,\n  mat-grid-tile-footer,\n  mat-grid-tile-header,\n  mat-hint,\n  mat-icon,\n  mat-ink-bar,\n  mat-input,\n  mat-list,\n  mat-list-item,\n  mat-menu,\n  mat-nav-list,\n  mat-option,\n  mat-placeholder,\n  mat-progress-bar,\n  mat-progress-circle,\n  mat-radio-button,\n  mat-radio-group,\n  mat-select,\n  mat-sidenav,\n  mat-slider,\n  mat-spinner,\n  mat-tab,\n  mat-toolbar\n";
/** Directive that enforces that the `mat-` prefix cannot be used. */
var MatPrefixEnforcer = (function () {
    function MatPrefixEnforcer(isCompatibilityMode) {
        if (!isCompatibilityMode) {
            throw Error('The "mat-" prefix cannot be used out of ng-material v1 compatibility mode.');
        }
    }
    MatPrefixEnforcer = __decorate$2([
        _angular_core.Directive({ selector: MAT_ELEMENTS_SELECTOR }),
        __param(0, _angular_core.Inject(MATERIAL_COMPATIBILITY_MODE)), 
        __metadata$2('design:paramtypes', [Boolean])
    ], MatPrefixEnforcer);
    return MatPrefixEnforcer;
}());
/**
 * Module that enforces the default "compatibility mode" settings. When this module is loaded
 * without NoConflictStyleCompatibilityMode also being imported, it will throw an error if
 * there are any uses of the `mat-` prefix.
 *
 * Because the point of this directive is to *not* be used, it will be tree-shaken away by
 * optimizers when not in compatibility mode.
 */
var DefaultStyleCompatibilityModeModule = (function () {
    function DefaultStyleCompatibilityModeModule() {
    }
    DefaultStyleCompatibilityModeModule.forRoot = function () {
        return {
            ngModule: DefaultStyleCompatibilityModeModule,
            providers: [],
        };
    };
    DefaultStyleCompatibilityModeModule = __decorate$2([
        _angular_core.NgModule({
            declarations: [MatPrefixEnforcer],
            exports: [MatPrefixEnforcer],
            providers: [{
                    provide: MATERIAL_COMPATIBILITY_MODE, useValue: false,
                }]
        }), 
        __metadata$2('design:paramtypes', [])
    ], DefaultStyleCompatibilityModeModule);
    return DefaultStyleCompatibilityModeModule;
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
        _angular_core.Directive({ selector: '[md-line], [mat-line]' }), 
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
            this._setClass("md-" + count + "-line", true);
        }
        else if (count > 3) {
            this._setClass("md-multi-line", true);
        }
    };
    MdLineSetter.prototype._resetClasses = function () {
        this._setClass('md-2-line', false);
        this._setClass('md-3-line', false);
        this._setClass('md-multi-line', false);
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
            imports: [DefaultStyleCompatibilityModeModule],
            exports: [MdLine, DefaultStyleCompatibilityModeModule],
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
 * Directive to listen to changes of direction of part of the DOM.
 *
 * Applications should use this directive instead of the native attribute so that Material
 * components can listen on changes of direction.
 */
var Dir = (function () {
    function Dir() {
        this._dir = 'ltr';
        this.dirChange = new _angular_core.EventEmitter();
    }
    Object.defineProperty(Dir.prototype, "dir", {
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
var ObserveContent = (function () {
    function ObserveContent(_elementRef) {
        this._elementRef = _elementRef;
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

/** @docs-private */
var ForegroundRippleState;
(function (ForegroundRippleState) {
    ForegroundRippleState[ForegroundRippleState["NEW"] = 0] = "NEW";
    ForegroundRippleState[ForegroundRippleState["EXPANDING"] = 1] = "EXPANDING";
    ForegroundRippleState[ForegroundRippleState["FADING_OUT"] = 2] = "FADING_OUT";
})(ForegroundRippleState || (ForegroundRippleState = {}));
/**
 * Wrapper for a foreground ripple DOM element and its animation state.
 * @docs-private
 */
var ForegroundRipple = (function () {
    function ForegroundRipple(rippleElement) {
        this.rippleElement = rippleElement;
        this.state = ForegroundRippleState.NEW;
    }
    return ForegroundRipple;
}());
var RIPPLE_SPEED_PX_PER_SECOND = 1000;
var MIN_RIPPLE_FILL_TIME_SECONDS = 0.1;
var MAX_RIPPLE_FILL_TIME_SECONDS = 0.3;
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
    function RippleRenderer(_elementRef, _eventHandlers, _ngZone) {
        this._eventHandlers = _eventHandlers;
        this._ngZone = _ngZone;
        this._rippleElement = _elementRef.nativeElement;
        // The background div is created in createBackgroundIfNeeded when the ripple becomes enabled.
        // This avoids creating unneeded divs when the ripple is always disabled.
        this._backgroundDiv = null;
    }
    /** Creates the div for the ripple background, if it doesn't already exist. */
    RippleRenderer.prototype.createBackgroundIfNeeded = function () {
        if (!this._backgroundDiv) {
            this._backgroundDiv = document.createElement('div');
            this._backgroundDiv.classList.add('md-ripple-background');
            this._rippleElement.appendChild(this._backgroundDiv);
        }
    };
    /**
     * Installs event handlers on the given trigger element, and removes event handlers from the
     * previous trigger if needed.
     */
    RippleRenderer.prototype.setTriggerElement = function (newTrigger) {
        var _this = this;
        if (this._triggerElement !== newTrigger) {
            if (this._triggerElement) {
                this._eventHandlers.forEach(function (eventHandler, eventName) {
                    _this._triggerElement.removeEventListener(eventName, eventHandler);
                });
            }
            this._triggerElement = newTrigger;
            if (this._triggerElement) {
                this._eventHandlers.forEach(function (eventHandler, eventName) {
                    _this._triggerElement.addEventListener(eventName, eventHandler);
                });
            }
        }
    };
    /** Installs event handlers on the host element of the md-ripple directive. */
    RippleRenderer.prototype.setTriggerElementToHost = function () {
        this.setTriggerElement(this._rippleElement);
    };
    /** Removes event handlers from the current trigger element if needed. */
    RippleRenderer.prototype.clearTriggerElement = function () {
        this.setTriggerElement(null);
    };
    /**
     * Creates a foreground ripple and sets its animation to expand and fade in from the position
     * given by rippleOriginLeft and rippleOriginTop (or from the center of the <md-ripple>
     * bounding rect if centered is true).
     */
    RippleRenderer.prototype.createForegroundRipple = function (rippleOriginLeft, rippleOriginTop, color, centered, radius, speedFactor, transitionEndCallback) {
        var _this = this;
        var parentRect = this._rippleElement.getBoundingClientRect();
        // Create a foreground ripple div with the size and position of the fully expanded ripple.
        // When the div is created, it's given a transform style that causes the ripple to be displayed
        // small and centered on the event location (or the center of the bounding rect if the centered
        // argument is true). Removing that transform causes the ripple to animate to its natural size.
        var startX = centered ? (parentRect.left + parentRect.width / 2) : rippleOriginLeft;
        var startY = centered ? (parentRect.top + parentRect.height / 2) : rippleOriginTop;
        var offsetX = startX - parentRect.left;
        var offsetY = startY - parentRect.top;
        var maxRadius = radius > 0 ? radius : distanceToFurthestCorner(startX, startY, parentRect);
        var rippleDiv = document.createElement('div');
        this._rippleElement.appendChild(rippleDiv);
        rippleDiv.classList.add('md-ripple-foreground');
        rippleDiv.style.left = (offsetX - maxRadius) + "px";
        rippleDiv.style.top = (offsetY - maxRadius) + "px";
        rippleDiv.style.width = 2 * maxRadius + "px";
        rippleDiv.style.height = rippleDiv.style.width;
        // If color input is not set, this will default to the background color defined in CSS.
        rippleDiv.style.backgroundColor = color;
        // Start the ripple tiny.
        rippleDiv.style.transform = "scale(0.001)";
        var fadeInSeconds = (1 / (speedFactor || 1)) * Math.max(MIN_RIPPLE_FILL_TIME_SECONDS, Math.min(MAX_RIPPLE_FILL_TIME_SECONDS, maxRadius / RIPPLE_SPEED_PX_PER_SECOND));
        rippleDiv.style.transitionDuration = fadeInSeconds + "s";
        // https://timtaubert.de/blog/2012/09/css-transitions-for-dynamically-created-dom-elements/
        // Store the opacity to prevent this line as being seen as a no-op by optimizers.
        this._opacity = window.getComputedStyle(rippleDiv).opacity;
        rippleDiv.classList.add('md-ripple-fade-in');
        // Clearing the transform property causes the ripple to animate to its full size.
        rippleDiv.style.transform = '';
        var ripple = new ForegroundRipple(rippleDiv);
        ripple.state = ForegroundRippleState.EXPANDING;
        rippleDiv.addEventListener('transitionend', function (event) { return transitionEndCallback(ripple, event); });
        // Ensure that ripples are always removed, even when transitionend doesn't fire.
        // Run this outside the Angular zone because there's nothing that Angular cares about.
        // If it were to run inside the Angular zone, every test that used ripples would have to be
        // either async or fakeAsync.
        this._ngZone.runOutsideAngular(function () {
            // The ripple lasts a time equal to the sum of fade-in, transform,
            // and fade-out (3 * fade-in time).
            var rippleDuration = fadeInSeconds * 3 * 1000;
            setTimeout(function () { return _this.removeRippleFromDom(ripple.rippleElement); }, rippleDuration);
        });
    };
    /** Fades out a foreground ripple after it has fully expanded and faded in. */
    RippleRenderer.prototype.fadeOutForegroundRipple = function (ripple) {
        ripple.classList.remove('md-ripple-fade-in');
        ripple.classList.add('md-ripple-fade-out');
    };
    /** Removes a foreground ripple from the DOM after it has faded out. */
    RippleRenderer.prototype.removeRippleFromDom = function (ripple) {
        if (ripple && ripple.parentElement) {
            ripple.parentElement.removeChild(ripple);
        }
    };
    /** Fades in the ripple background. */
    RippleRenderer.prototype.fadeInRippleBackground = function (color) {
        this._backgroundDiv.classList.add('md-ripple-active');
        // If color is not set, this will default to the background color defined in CSS.
        this._backgroundDiv.style.backgroundColor = color;
    };
    /** Fades out the ripple background. */
    RippleRenderer.prototype.fadeOutRippleBackground = function () {
        if (this._backgroundDiv) {
            this._backgroundDiv.classList.remove('md-ripple-active');
        }
    };
    return RippleRenderer;
}());

var __decorate$6 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$6 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Simple utility for getting the bounds of the browser viewport.
 * @docs-private
 */
var ViewportRuler = (function () {
    function ViewportRuler() {
    }
    // TODO(jelbourn): cache the document's bounding rect and only update it when the window
    // is resized (debounced).
    /** Gets a ClientRect for the viewport's bounds. */
    ViewportRuler.prototype.getViewportRect = function () {
        // Use the document element's bounding rect rather than the window scroll properties
        // (e.g. pageYOffset, scrollY) due to in issue in Chrome and IE where window scroll
        // properties and client coordinates (boundingClientRect, clientX/Y, etc.) are in different
        // conceptual viewports. Under most circumstances these viewports are equivalent, but they
        // can disagree when the page is pinch-zoomed (on devices that support touch).
        // See https://bugs.chromium.org/p/chromium/issues/detail?id=489206#c4
        // We use the documentElement instead of the body because, by default (without a css reset)
        // browsers typically give the document body an 8px margin, which is not included in
        // getBoundingClientRect().
        var documentRect = document.documentElement.getBoundingClientRect();
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
        if (documentRect === void 0) { documentRect = document.documentElement.getBoundingClientRect(); }
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
    ViewportRuler = __decorate$6([
        _angular_core.Injectable(), 
        __metadata$6('design:paramtypes', [])
    ], ViewportRuler);
    return ViewportRuler;
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
var MdRipple = (function () {
    function MdRipple(_elementRef, _ngZone, _ruler) {
        var _this = this;
        /**
         * If set, the radius in pixels of foreground ripples when fully expanded. If unset, the radius
         * will be the distance from the center of the ripple to the furthest corner of the host element's
         * bounding rectangle.
         */
        this.maxRadius = 0;
        /**
         * If set, the normal duration of ripple animations is divided by this value. For example,
         * setting it to 0.5 will cause the animations to take twice as long.
         */
        this.speedFactor = 1;
        // These event handlers are attached to the element that triggers the ripple animations.
        var eventHandlers = new Map();
        eventHandlers.set('mousedown', function (event) { return _this._mouseDown(event); });
        eventHandlers.set('click', function (event) { return _this._click(event); });
        eventHandlers.set('mouseleave', function (event) { return _this._mouseLeave(event); });
        this._rippleRenderer = new RippleRenderer(_elementRef, eventHandlers, _ngZone);
        this._ruler = _ruler;
    }
    Object.defineProperty(MdRipple.prototype, "_triggerDeprecated", {
        /** @deprecated */
        get: function () { return this.trigger; },
        set: function (value) { this.trigger = value; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(MdRipple.prototype, "_centeredDeprecated", {
        /** @deprecated */
        get: function () { return this.centered; },
        set: function (value) { this.centered = value; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(MdRipple.prototype, "_disabledDeprecated", {
        /** @deprecated */
        get: function () { return this.disabled; },
        set: function (value) { this.disabled = value; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(MdRipple.prototype, "_maxRadiusDeprecated", {
        /** @deprecated */
        get: function () { return this.maxRadius; },
        set: function (value) { this.maxRadius = value; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(MdRipple.prototype, "_speedFactorDeprecated", {
        /** @deprecated */
        get: function () { return this.speedFactor; },
        set: function (value) { this.speedFactor = value; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(MdRipple.prototype, "_colorDeprecated", {
        /** @deprecated */
        get: function () { return this.color; },
        set: function (value) { this.color = value; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(MdRipple.prototype, "_backgroundColorDeprecated", {
        /** @deprecated */
        get: function () { return this.backgroundColor; },
        set: function (value) { this.backgroundColor = value; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(MdRipple.prototype, "_focusedDeprecated", {
        /** @deprecated */
        get: function () { return this.focused; },
        set: function (value) { this.focused = value; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(MdRipple.prototype, "_unboundedDeprecated", {
        /** @deprecated */
        get: function () { return this.unbounded; },
        set: function (value) { this.unbounded = value; },
        enumerable: true,
        configurable: true
    });
    ;
    MdRipple.prototype.ngOnInit = function () {
        // If no trigger element was explicity set, use the host element
        if (!this.trigger) {
            this._rippleRenderer.setTriggerElementToHost();
        }
        if (!this.disabled) {
            this._rippleRenderer.createBackgroundIfNeeded();
        }
    };
    MdRipple.prototype.ngOnDestroy = function () {
        // Remove event listeners on the trigger element.
        this._rippleRenderer.clearTriggerElement();
    };
    MdRipple.prototype.ngOnChanges = function (changes) {
        // If the trigger element changed (or is being initially set), add event listeners to it.
        var changedInputs = Object.keys(changes);
        if (changedInputs.indexOf('trigger') !== -1) {
            this._rippleRenderer.setTriggerElement(this.trigger);
        }
        if (!this.disabled) {
            this._rippleRenderer.createBackgroundIfNeeded();
        }
    };
    /**
     * Responds to the start of a ripple animation trigger by fading the background in.
     */
    MdRipple.prototype.start = function () {
        this._rippleRenderer.createBackgroundIfNeeded();
        this._rippleRenderer.fadeInRippleBackground(this.backgroundColor);
    };
    /**
     * Responds to the end of a ripple animation trigger by fading the background out, and creating a
     * foreground ripple that expands from the event location (or from the center of the element if
     * the "centered" property is set or forceCenter is true).
     */
    MdRipple.prototype.end = function (left, top, forceCenter) {
        var _this = this;
        if (forceCenter === void 0) { forceCenter = true; }
        this._rippleRenderer.createForegroundRipple(left, top, this.color, this.centered || forceCenter, this.maxRadius, this.speedFactor, function (ripple, e) { return _this._rippleTransitionEnded(ripple, e); });
        this._rippleRenderer.fadeOutRippleBackground();
    };
    MdRipple.prototype._rippleTransitionEnded = function (ripple, event) {
        if (event.propertyName === 'opacity') {
            // If the ripple finished expanding, start fading it out. If it finished fading out,
            // remove it from the DOM.
            switch (ripple.state) {
                case ForegroundRippleState.EXPANDING:
                    this._rippleRenderer.fadeOutForegroundRipple(ripple.rippleElement);
                    ripple.state = ForegroundRippleState.FADING_OUT;
                    break;
                case ForegroundRippleState.FADING_OUT:
                    this._rippleRenderer.removeRippleFromDom(ripple.rippleElement);
                    break;
            }
        }
    };
    /**
     * Called when the trigger element receives a mousedown event. Starts the ripple animation by
     * fading in the background.
     */
    MdRipple.prototype._mouseDown = function (event) {
        if (!this.disabled && event.button === 0) {
            this.start();
        }
    };
    /**
     * Called when the trigger element receives a click event. Creates a foreground ripple and
     * runs its animation.
     */
    MdRipple.prototype._click = function (event) {
        if (!this.disabled && event.button === 0) {
            // If screen and page positions are all 0, this was probably triggered by a keypress.
            // In that case, use the center of the bounding rect as the ripple origin.
            // FIXME: This fails on IE11, which still sets pageX/Y and screenX/Y on keyboard clicks.
            var isKeyEvent = (event.screenX === 0 && event.screenY === 0 && event.pageX === 0 && event.pageY === 0);
            this.end(event.pageX - this._ruler.getViewportScrollPosition().left, event.pageY - this._ruler.getViewportScrollPosition().top, isKeyEvent);
        }
    };
    /**
     * Called when the trigger element receives a mouseleave event. Fades out the background.
     */
    MdRipple.prototype._mouseLeave = function (event) {
        // We can always fade out the background here; It's a no-op if it was already inactive.
        this._rippleRenderer.fadeOutRippleBackground();
    };
    __decorate$5([
        _angular_core.Input('mdRippleTrigger'), 
        __metadata$5('design:type', Object)
    ], MdRipple.prototype, "trigger", void 0);
    __decorate$5([
        _angular_core.Input('md-ripple-trigger'), 
        __metadata$5('design:type', Object)
    ], MdRipple.prototype, "_triggerDeprecated", null);
    __decorate$5([
        _angular_core.Input('mdRippleCentered'), 
        __metadata$5('design:type', Boolean)
    ], MdRipple.prototype, "centered", void 0);
    __decorate$5([
        _angular_core.Input('md-ripple-centered'), 
        __metadata$5('design:type', Object)
    ], MdRipple.prototype, "_centeredDeprecated", null);
    __decorate$5([
        _angular_core.Input('mdRippleDisabled'), 
        __metadata$5('design:type', Boolean)
    ], MdRipple.prototype, "disabled", void 0);
    __decorate$5([
        _angular_core.Input('md-ripple-disabled'), 
        __metadata$5('design:type', Object)
    ], MdRipple.prototype, "_disabledDeprecated", null);
    __decorate$5([
        _angular_core.Input('mdRippleMaxRadius'), 
        __metadata$5('design:type', Number)
    ], MdRipple.prototype, "maxRadius", void 0);
    __decorate$5([
        _angular_core.Input('md-ripple-max-radius'), 
        __metadata$5('design:type', Object)
    ], MdRipple.prototype, "_maxRadiusDeprecated", null);
    __decorate$5([
        _angular_core.Input('mdRippleSpeedFactor'), 
        __metadata$5('design:type', Number)
    ], MdRipple.prototype, "speedFactor", void 0);
    __decorate$5([
        _angular_core.Input('md-ripple-speed-factor'), 
        __metadata$5('design:type', Object)
    ], MdRipple.prototype, "_speedFactorDeprecated", null);
    __decorate$5([
        _angular_core.Input('mdRippleColor'), 
        __metadata$5('design:type', String)
    ], MdRipple.prototype, "color", void 0);
    __decorate$5([
        _angular_core.Input('md-ripple-color'), 
        __metadata$5('design:type', Object)
    ], MdRipple.prototype, "_colorDeprecated", null);
    __decorate$5([
        _angular_core.Input('mdRippleBackgroundColor'), 
        __metadata$5('design:type', String)
    ], MdRipple.prototype, "backgroundColor", void 0);
    __decorate$5([
        _angular_core.Input('md-ripple-background-color'), 
        __metadata$5('design:type', Object)
    ], MdRipple.prototype, "_backgroundColorDeprecated", null);
    __decorate$5([
        _angular_core.HostBinding('class.md-ripple-focused'),
        _angular_core.Input('mdRippleFocused'), 
        __metadata$5('design:type', Boolean)
    ], MdRipple.prototype, "focused", void 0);
    __decorate$5([
        _angular_core.Input('md-ripple-focused'), 
        __metadata$5('design:type', Boolean)
    ], MdRipple.prototype, "_focusedDeprecated", null);
    __decorate$5([
        _angular_core.HostBinding('class.md-ripple-unbounded'),
        _angular_core.Input('mdRippleUnbounded'), 
        __metadata$5('design:type', Boolean)
    ], MdRipple.prototype, "unbounded", void 0);
    __decorate$5([
        _angular_core.Input('md-ripple-unbounded'), 
        __metadata$5('design:type', Boolean)
    ], MdRipple.prototype, "_unboundedDeprecated", null);
    MdRipple = __decorate$5([
        _angular_core.Directive({
            selector: '[md-ripple], [mat-ripple]',
        }), 
        __metadata$5('design:paramtypes', [_angular_core.ElementRef, _angular_core.NgZone, ViewportRuler])
    ], MdRipple);
    return MdRipple;
}());
var MdRippleModule = (function () {
    function MdRippleModule() {
    }
    MdRippleModule.forRoot = function () {
        return {
            ngModule: MdRippleModule,
            providers: [ViewportRuler]
        };
    };
    MdRippleModule = __decorate$5([
        _angular_core.NgModule({
            imports: [DefaultStyleCompatibilityModeModule],
            exports: [MdRipple, DefaultStyleCompatibilityModeModule],
            declarations: [MdRipple],
        }), 
        __metadata$5('design:paramtypes', [])
    ], MdRippleModule);
    return MdRippleModule;
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
    TemplatePortalDirective = __decorate$7([
        _angular_core.Directive({
            selector: '[cdk-portal], [portal]',
            exportAs: 'cdkPortal',
        }), 
        __metadata$7('design:paramtypes', [_angular_core.TemplateRef, _angular_core.ViewContainerRef])
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
    /** Attach the given ComponentPortal to this PortalHost using the ComponentFactoryResolver. */
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
    /** Attach the given TemplatePortal to this PortlHost as an embedded View. */
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
    __decorate$7([
        _angular_core.Input('portalHost'), 
        __metadata$7('design:type', Object)
    ], PortalHostDirective.prototype, "_deprecatedPortal", null);
    PortalHostDirective = __decorate$7([
        _angular_core.Directive({
            selector: '[cdkPortalHost], [portalHost]',
            inputs: ['portal: cdkPortalHost']
        }), 
        __metadata$7('design:paramtypes', [_angular_core.ComponentFactoryResolver, _angular_core.ViewContainerRef])
    ], PortalHostDirective);
    return PortalHostDirective;
}(BasePortalHost));
var PortalModule = (function () {
    function PortalModule() {
    }
    PortalModule.forRoot = function () {
        return {
            ngModule: PortalModule,
            providers: []
        };
    };
    PortalModule = __decorate$7([
        _angular_core.NgModule({
            exports: [TemplatePortalDirective, PortalHostDirective],
            declarations: [TemplatePortalDirective, PortalHostDirective],
        }), 
        __metadata$7('design:paramtypes', [])
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
    /** Attach the given ComponentPortal to DOM element using the ComponentFactoryResolver. */
    DomPortalHost.prototype.attachComponentPortal = function (portal) {
        var _this = this;
        var componentFactory = this._componentFactoryResolver.resolveComponentFactory(portal.component);
        var componentRef;
        // If the portal specifies a ViewContainerRef, we will use that as the attachment point
        // for the component (in terms of Angular's component tree, not rendering).
        // When the ViewContainerRef is missing, we use the factory to create the component directly
        // and then manually attach the ChangeDetector for that component to the application (which
        // happens automatically when using a ViewContainer).
        if (portal.viewContainerRef) {
            componentRef = portal.viewContainerRef.createComponent(componentFactory, portal.viewContainerRef.length, portal.injector || portal.viewContainerRef.parentInjector);
            this.setDisposeFn(function () { return componentRef.destroy(); });
        }
        else {
            componentRef = componentFactory.create(portal.injector || this._defaultInjector);
            // ApplicationRef's attachView and detachView methods are in Angular ^2.3.0 but not before.
            // The `else` clause here can be removed once 2.3.0 is released.
            if (this._appRef['attachView']) {
                this._appRef.attachView(componentRef.hostView);
                this.setDisposeFn(function () {
                    _this._appRef.detachView(componentRef.hostView);
                    componentRef.destroy();
                });
            }
            else {
                // When creating a component outside of a ViewContainer, we need to manually register
                // its ChangeDetector with the application. This API is unfortunately not published
                // in Angular < 2.3.0. The change detector must also be deregistered when the component
                // is destroyed to prevent memory leaks.
                var changeDetectorRef_1 = componentRef.changeDetectorRef;
                this._appRef.registerChangeDetector(changeDetectorRef_1);
                this.setDisposeFn(function () {
                    _this._appRef.unregisterChangeDetector(changeDetectorRef_1);
                    // Normally the ViewContainer will remove the component's nodes from the DOM.
                    // Without a ViewContainer, we need to manually remove the nodes.
                    var componentRootNode = _this._getComponentRootNode(componentRef);
                    if (componentRootNode.parentNode) {
                        componentRootNode.parentNode.removeChild(componentRootNode);
                    }
                    componentRef.destroy();
                });
            }
        }
        // At this point the component has been instantiated, so we move it to the location in the DOM
        // where we want it to be rendered.
        this._hostDomElement.appendChild(this._getComponentRootNode(componentRef));
        return componentRef;
    };
    DomPortalHost.prototype.attachTemplatePortal = function (portal) {
        var _this = this;
        var viewContainer = portal.viewContainerRef;
        var viewRef = viewContainer.createEmbeddedView(portal.templateRef);
        viewRef.rootNodes.forEach(function (rootNode) { return _this._hostDomElement.appendChild(rootNode); });
        this.setDisposeFn((function () {
            var index = viewContainer.indexOf(viewRef);
            if (index != -1) {
                viewContainer.remove(index);
            }
        }));
        // TODO(jelbourn): Return locals from view.
        return new Map();
    };
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
    OverlayRef.prototype.attach = function (portal) {
        if (this._state.hasBackdrop) {
            this._attachBackdrop();
        }
        var attachResult = this._portalHost.attach(portal);
        this.updateSize();
        this.updateDirection();
        this.updatePosition();
        return attachResult;
    };
    OverlayRef.prototype.detach = function () {
        this._detachBackdrop();
        return this._portalHost.detach();
    };
    OverlayRef.prototype.dispose = function () {
        if (this._state.positionStrategy) {
            this._state.positionStrategy.dispose();
        }
        this._detachBackdrop();
        this._portalHost.dispose();
    };
    OverlayRef.prototype.hasAttached = function () {
        return this._portalHost.hasAttached();
    };
    OverlayRef.prototype.backdropClick = function () {
        return this._backdropClick.asObservable();
    };
    /** Gets the current state config of the overlay. */
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
    OverlayRef.prototype._detachBackdrop = function () {
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
/** The change event emitted by the strategy when a fallback position is used. */
var ConnectedOverlayPositionChange = (function () {
    function ConnectedOverlayPositionChange(connectionPair) {
        this.connectionPair = connectionPair;
    }
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
     */
    ConnectedPositionStrategy.prototype.apply = function (element) {
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
                this._onPositionChange.next(new ConnectedOverlayPositionChange(pos));
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
    ConnectedPositionStrategy.prototype.withFallbackPosition = function (originPos, overlayPos) {
        this._preferredPositions.push(new ConnectionPositionPair(originPos, overlayPos));
        return this;
    };
    /** Sets the layout direction so the overlay's position can be adjusted to match. */
    ConnectedPositionStrategy.prototype.withDirection = function (dir) {
        this._dir = dir;
        return this;
    };
    /** Sets an offset for the overlay's connection point on the x-axis */
    ConnectedPositionStrategy.prototype.withOffsetX = function (offset) {
        this._offsetX = offset;
        return this;
    };
    /** Sets an offset for the overlay's connection point on the y-axis */
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
        var leftOverflow = viewportRect.left - x;
        var rightOverflow = (x + overlayRect.width) - viewportRect.right;
        var topOverflow = viewportRect.top - y;
        var bottomOverflow = (y + overlayRect.height) - viewportRect.bottom;
        // Visible parts of the element on each axis.
        var visibleWidth = this._subtractOverflows(overlayRect.width, leftOverflow, rightOverflow);
        var visibleHeight = this._subtractOverflows(overlayRect.height, topOverflow, bottomOverflow);
        // The area of the element that's within the viewport.
        var visibleArea = visibleWidth * visibleHeight;
        var fitsInViewport = (overlayRect.width * overlayRect.height) === visibleArea;
        return { x: x, y: y, fitsInViewport: fitsInViewport, visibleArea: visibleArea };
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
;

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
    /** Sets the top position of the overlay. Clears any previously set vertical position. */
    GlobalPositionStrategy.prototype.top = function (value) {
        this._bottomOffset = '';
        this._topOffset = value;
        this._alignItems = 'flex-start';
        return this;
    };
    /** Sets the left position of the overlay. Clears any previously set horizontal position. */
    GlobalPositionStrategy.prototype.left = function (value) {
        this._rightOffset = '';
        this._leftOffset = value;
        this._justifyContent = 'flex-start';
        return this;
    };
    /** Sets the bottom position of the overlay. Clears any previously set vertical position. */
    GlobalPositionStrategy.prototype.bottom = function (value) {
        this._topOffset = '';
        this._bottomOffset = value;
        this._alignItems = 'flex-end';
        return this;
    };
    /** Sets the right position of the overlay. Clears any previously set horizontal position. */
    GlobalPositionStrategy.prototype.right = function (value) {
        this._leftOffset = '';
        this._rightOffset = value;
        this._justifyContent = 'flex-end';
        return this;
    };
    /** Sets the overlay width and clears any previously set width. */
    GlobalPositionStrategy.prototype.width = function (value) {
        this._width = value;
        // When the width is 100%, we should reset the `left` and the offset,
        // in order to ensure that the element is flush against the viewport edge.
        if (value === '100%') {
            this.left('0px');
        }
        return this;
    };
    /** Sets the overlay height and clears any previously set height. */
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

var __decorate$10 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$10 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/** Builder for overlay position strategy. */
var OverlayPositionBuilder = (function () {
    function OverlayPositionBuilder(_viewportRuler) {
        this._viewportRuler = _viewportRuler;
    }
    /** Creates a global position strategy. */
    OverlayPositionBuilder.prototype.global = function () {
        return new GlobalPositionStrategy();
    };
    /** Creates a relative position strategy. */
    OverlayPositionBuilder.prototype.connectedTo = function (elementRef, originPos, overlayPos) {
        return new ConnectedPositionStrategy(elementRef, originPos, overlayPos, this._viewportRuler);
    };
    OverlayPositionBuilder = __decorate$10([
        _angular_core.Injectable(), 
        __metadata$10('design:paramtypes', [ViewportRuler])
    ], OverlayPositionBuilder);
    return OverlayPositionBuilder;
}());

/**
 * The OverlayContainer is the container in which all overlays will load.
 * It should be provided in the root component to ensure it is properly shared.
 */
var OverlayContainer = (function () {
    function OverlayContainer() {
    }
    /**
     * This method returns the overlay container element.  It will lazily
     * create the element the first time  it is called to facilitate using
     * the container in non-browser environments.
     * @returns {HTMLElement} the container element
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
        document.body.appendChild(container);
        this._containerElement = container;
    };
    return OverlayContainer;
}());

var __decorate$11 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$11 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
        this.scrollableReferences = new WeakMap();
        // By default, notify a scroll event when the document is scrolled or the window is resized.
        rxjs_Observable.Observable.fromEvent(window.document, 'scroll').subscribe(function () { return _this._notify(); });
        rxjs_Observable.Observable.fromEvent(window, 'resize').subscribe(function () { return _this._notify(); });
    }
    /**
     * Registers a Scrollable with the service and listens for its scrolled events. When the
     * scrollable is scrolled, the service emits the event in its scrolled observable.
     */
    ScrollDispatcher.prototype.register = function (scrollable) {
        var _this = this;
        var scrollSubscription = scrollable.elementScrolled().subscribe(function () { return _this._notify(); });
        this.scrollableReferences.set(scrollable, scrollSubscription);
    };
    /**
     * Deregisters a Scrollable reference and unsubscribes from its scroll event observable.
     */
    ScrollDispatcher.prototype.deregister = function (scrollable) {
        this.scrollableReferences.get(scrollable).unsubscribe();
        this.scrollableReferences.delete(scrollable);
    };
    /**
     * Returns an observable that emits an event whenever any of the registered Scrollable
     * references (or window, document, or body) fire a scrolled event.
     * TODO: Add an event limiter that includes throttle with the leading and trailing events.
     */
    ScrollDispatcher.prototype.scrolled = function () {
        return this._scrolled.asObservable();
    };
    /** Sends a notification that a scroll event has been fired. */
    ScrollDispatcher.prototype._notify = function () {
        this._scrolled.next();
    };
    ScrollDispatcher = __decorate$11([
        _angular_core.Injectable(), 
        __metadata$11('design:paramtypes', [])
    ], ScrollDispatcher);
    return ScrollDispatcher;
}());

var __decorate$9 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$9 = (this && this.__metadata) || function (k, v) {
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
     * @returns A reference to the created overlay.
     */
    Overlay.prototype.create = function (state) {
        if (state === void 0) { state = defaultState; }
        return this._createOverlayRef(this._createPaneElement(), state);
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
     * @returns Promise resolving to the created element.
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
     * @returns {OverlayRef}
     */
    Overlay.prototype._createOverlayRef = function (pane, state) {
        return new OverlayRef(this._createPortalHost(pane), pane, state, this._ngZone);
    };
    Overlay = __decorate$9([
        _angular_core.Injectable(), 
        __metadata$9('design:paramtypes', [OverlayContainer, _angular_core.ComponentFactoryResolver, OverlayPositionBuilder, _angular_core.ApplicationRef, _angular_core.Injector, _angular_core.NgZone])
    ], Overlay);
    return Overlay;
}());
/** Providers for Overlay and its related injectables. */
var OVERLAY_PROVIDERS = [
    ViewportRuler,
    OverlayPositionBuilder,
    Overlay,
    OverlayContainer,
    ScrollDispatcher,
];

var __decorate$12 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$12 = (this && this.__metadata) || function (k, v) {
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
    /** Returns observable that emits when the scroll event is fired on the host element. */
    Scrollable.prototype.elementScrolled = function () {
        return rxjs_Observable.Observable.fromEvent(this._elementRef.nativeElement, 'scroll');
    };
    Scrollable = __decorate$12([
        _angular_core.Directive({
            selector: '[cdk-scrollable]'
        }), 
        __metadata$12('design:paramtypes', [_angular_core.ElementRef, ScrollDispatcher])
    ], Scrollable);
    return Scrollable;
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
    function OverlayOrigin(_elementRef) {
        this._elementRef = _elementRef;
    }
    Object.defineProperty(OverlayOrigin.prototype, "elementRef", {
        get: function () {
            return this._elementRef;
        },
        enumerable: true,
        configurable: true
    });
    OverlayOrigin = __decorate$8([
        _angular_core.Directive({
            selector: '[cdk-overlay-origin], [overlay-origin]',
            exportAs: 'cdkOverlayOrigin',
        }), 
        __metadata$8('design:paramtypes', [_angular_core.ElementRef])
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
        this.positionChange = new _angular_core.EventEmitter();
        this.attach = new _angular_core.EventEmitter();
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
        // TODO: move the boolean coercion logic to a shared function in core
        set: function (value) {
            this._hasBackdrop = value != null && "" + value !== 'false';
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
        get: function () {
            return this._overlayRef;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConnectedOverlayDirective.prototype, "dir", {
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
        overlayConfig.direction = this.dir;
        return overlayConfig;
    };
    /** Returns the position strategy of the overlay to be set on the overlay config */
    ConnectedOverlayDirective.prototype._createPositionStrategy = function () {
        var pos = this.positions[0];
        var originPoint = { originX: pos.originX, originY: pos.originY };
        var overlayPoint = { overlayX: pos.overlayX, overlayY: pos.overlayY };
        var strategy = this._overlay.position()
            .connectedTo(this.origin.elementRef, originPoint, overlayPoint)
            .withDirection(this.dir)
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
    __decorate$8([
        _angular_core.Input(), 
        __metadata$8('design:type', OverlayOrigin)
    ], ConnectedOverlayDirective.prototype, "origin", void 0);
    __decorate$8([
        _angular_core.Input(), 
        __metadata$8('design:type', Array)
    ], ConnectedOverlayDirective.prototype, "positions", void 0);
    __decorate$8([
        _angular_core.Input(), 
        __metadata$8('design:type', Number)
    ], ConnectedOverlayDirective.prototype, "offsetX", null);
    __decorate$8([
        _angular_core.Input(), 
        __metadata$8('design:type', Object)
    ], ConnectedOverlayDirective.prototype, "offsetY", null);
    __decorate$8([
        _angular_core.Input(), 
        __metadata$8('design:type', Object)
    ], ConnectedOverlayDirective.prototype, "width", void 0);
    __decorate$8([
        _angular_core.Input(), 
        __metadata$8('design:type', Object)
    ], ConnectedOverlayDirective.prototype, "height", void 0);
    __decorate$8([
        _angular_core.Input(), 
        __metadata$8('design:type', Object)
    ], ConnectedOverlayDirective.prototype, "minWidth", void 0);
    __decorate$8([
        _angular_core.Input(), 
        __metadata$8('design:type', Object)
    ], ConnectedOverlayDirective.prototype, "minHeight", void 0);
    __decorate$8([
        _angular_core.Input(), 
        __metadata$8('design:type', String)
    ], ConnectedOverlayDirective.prototype, "backdropClass", void 0);
    __decorate$8([
        _angular_core.Input(), 
        __metadata$8('design:type', Object)
    ], ConnectedOverlayDirective.prototype, "hasBackdrop", null);
    __decorate$8([
        _angular_core.Input(), 
        __metadata$8('design:type', Object)
    ], ConnectedOverlayDirective.prototype, "open", null);
    __decorate$8([
        _angular_core.Output(), 
        __metadata$8('design:type', Object)
    ], ConnectedOverlayDirective.prototype, "backdropClick", void 0);
    __decorate$8([
        _angular_core.Output(), 
        __metadata$8('design:type', Object)
    ], ConnectedOverlayDirective.prototype, "positionChange", void 0);
    __decorate$8([
        _angular_core.Output(), 
        __metadata$8('design:type', Object)
    ], ConnectedOverlayDirective.prototype, "attach", void 0);
    __decorate$8([
        _angular_core.Output(), 
        __metadata$8('design:type', Object)
    ], ConnectedOverlayDirective.prototype, "detach", void 0);
    ConnectedOverlayDirective = __decorate$8([
        _angular_core.Directive({
            selector: '[cdk-connected-overlay], [connected-overlay]',
            exportAs: 'cdkConnectedOverlay'
        }),
        __param$1(3, _angular_core.Optional()), 
        __metadata$8('design:paramtypes', [Overlay, _angular_core.TemplateRef, _angular_core.ViewContainerRef, Dir])
    ], ConnectedOverlayDirective);
    return ConnectedOverlayDirective;
}());
var OverlayModule = (function () {
    function OverlayModule() {
    }
    OverlayModule.forRoot = function () {
        return {
            ngModule: OverlayModule,
            providers: OVERLAY_PROVIDERS,
        };
    };
    OverlayModule = __decorate$8([
        _angular_core.NgModule({
            imports: [PortalModule],
            exports: [ConnectedOverlayDirective, OverlayOrigin, Scrollable],
            declarations: [ConnectedOverlayDirective, OverlayOrigin, Scrollable],
        }), 
        __metadata$8('design:paramtypes', [])
    ], OverlayModule);
    return OverlayModule;
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
    Platform = __decorate$16([
        _angular_core.Injectable(), 
        __metadata$16('design:paramtypes', [])
    ], Platform);
    return Platform;
}());

var __decorate$15 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$15 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/* The InteractivityChecker leans heavily on the ally.js accessibility utilities.
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
    /** Gets whether an element is disabled. */
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
     */
    InteractivityChecker.prototype.isVisible = function (element) {
        return hasGeometry(element) && getComputedStyle(element).visibility === 'visible';
    };
    /**
     * Gets whether an element can be reached via Tab key.
     * Assumes that the element has already been checked with isFocusable.
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
    /** Gets whether an element can be focused by the user. */
    InteractivityChecker.prototype.isFocusable = function (element) {
        // Perform checks in order of left to most expensive.
        // Again, naive approach that does not capture many edge cases and browser quirks.
        return isPotentiallyFocusable(element) && !this.isDisabled(element) && this.isVisible(element);
    };
    InteractivityChecker = __decorate$15([
        _angular_core.Injectable(), 
        __metadata$15('design:paramtypes', [Platform])
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

/** Coerces a data-bound value (typically a string) to a boolean. */
function coerceBooleanProperty(value) {
    return value != null && "" + value !== 'false';
}

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
    /** Focuses the first tabbable element within the focus trap region. */
    FocusTrap.prototype.focusFirstTabbableElement = function () {
        var rootElement = this.trappedContent.nativeElement;
        var redirectToElement = rootElement.querySelector('[cdk-focus-start]') ||
            this._getFirstTabbableElement(rootElement);
        if (redirectToElement) {
            redirectToElement.focus();
        }
    };
    /** Focuses the last tabbable element within the focus trap region. */
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
    __decorate$14([
        _angular_core.ViewChild('trappedContent'), 
        __metadata$14('design:type', _angular_core.ElementRef)
    ], FocusTrap.prototype, "trappedContent", void 0);
    __decorate$14([
        _angular_core.Input(), 
        __metadata$14('design:type', Boolean)
    ], FocusTrap.prototype, "disabled", null);
    FocusTrap = __decorate$14([
        _angular_core.Component({selector: 'cdk-focus-trap, focus-trap',
            template: "<div *ngIf=\"!disabled\" tabindex=\"0\" (focus)=\"focusLastTabbableElement()\"></div> <div #trappedContent class=\"cdk-focus-trap-content\"><ng-content></ng-content></div> <div *ngIf=\"!disabled\" tabindex=\"0\" (focus)=\"focusFirstTabbableElement()\"></div> ",
            encapsulation: _angular_core.ViewEncapsulation.None,
        }), 
        __metadata$14('design:paramtypes', [InteractivityChecker, _angular_core.NgZone])
    ], FocusTrap);
    return FocusTrap;
}());

var __decorate$17 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$17 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param$2 = (this && this.__param) || function (paramIndex, decorator) {
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
     * @param message Message to be announced to the screenreader
     * @param politeness The politeness of the announcer element.
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
    LiveAnnouncer = __decorate$17([
        _angular_core.Injectable(),
        __param$2(0, _angular_core.Optional()),
        __param$2(0, _angular_core.Inject(LIVE_ANNOUNCER_ELEMENT_TOKEN)), 
        __metadata$17('design:paramtypes', [Object])
    ], LiveAnnouncer);
    return LiveAnnouncer;
}());

var supportedInputTypes;
/** @returns {Set<string>} the input types supported by this browser. */
function getSupportedInputTypes() {
    if (!supportedInputTypes) {
        var featureTestInput_1 = document.createElement('input');
        supportedInputTypes = new Set([
            'button',
            'checkbox',
            'color',
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

var __decorate$18 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$18 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var PlatformModule = (function () {
    function PlatformModule() {
    }
    PlatformModule.forRoot = function () {
        return {
            ngModule: PlatformModule,
            providers: [Platform],
        };
    };
    PlatformModule = __decorate$18([
        _angular_core.NgModule({}), 
        __metadata$18('design:paramtypes', [])
    ], PlatformModule);
    return PlatformModule;
}());

var __decorate$13 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$13 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var A11Y_PROVIDERS = [LiveAnnouncer, InteractivityChecker];
var A11yModule = (function () {
    function A11yModule() {
    }
    A11yModule.forRoot = function () {
        return {
            ngModule: A11yModule,
            providers: [
                PlatformModule.forRoot().providers,
                A11Y_PROVIDERS,
            ],
        };
    };
    A11yModule = __decorate$13([
        _angular_core.NgModule({
            imports: [_angular_common.CommonModule, PlatformModule],
            declarations: [FocusTrap],
            exports: [FocusTrap],
        }), 
        __metadata$13('design:paramtypes', [])
    ], A11yModule);
    return A11yModule;
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
    DomProjectionHost = __decorate$19([
        _angular_core.Directive({
            selector: 'cdk-dom-projection-host'
        }), 
        __metadata$19('design:paramtypes', [_angular_core.ElementRef])
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
    DomProjection = __decorate$19([
        _angular_core.Injectable(), 
        __metadata$19('design:paramtypes', [])
    ], DomProjection);
    return DomProjection;
}());
/** @docs-private */
var ProjectionModule = (function () {
    function ProjectionModule() {
    }
    ProjectionModule.forRoot = function () {
        return {
            ngModule: ProjectionModule,
            providers: [DomProjection]
        };
    };
    ProjectionModule = __decorate$19([
        _angular_core.NgModule({
            exports: [DomProjectionHost],
            declarations: [DomProjectionHost],
        }), 
        __metadata$19('design:paramtypes', [])
    ], ProjectionModule);
    return ProjectionModule;
}());

var __extends$5 = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate$20 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$20 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/* Adjusts configuration of our gesture library, Hammer. */
var GestureConfig = (function (_super) {
    __extends$5(GestureConfig, _super);
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
    /*
     * Builds Hammer instance manually to add custom recognizers that match the Material Design spec.
     *
     * Our gesture names come from the Material Design gestures spec:
     * https://www.google.com/design/spec/patterns/gestures.html#gestures-touch-mechanics
     *
     * More information on default recognizers can be found in Hammer docs:
     * http://hammerjs.github.io/recognizer-pan/
     * http://hammerjs.github.io/recognizer-press/
     *
     * TODO: Confirm threshold numbers with Material Design UX Team
     * */
    GestureConfig.prototype.buildHammer = function (element) {
        var mc = new this._hammer(element);
        // Default Hammer Recognizers.
        var pan = new this._hammer.Pan();
        var swipe = new this._hammer.Swipe();
        var press = new this._hammer.Press();
        // Notice that a HammerJS recognizer can only depend on one other recognizer once.
        // Otherwise the previous `recognizeWith` will be dropped.
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
    GestureConfig = __decorate$20([
        _angular_core.Injectable(), 
        __metadata$20('design:paramtypes', [])
    ], GestureConfig);
    return GestureConfig;
}(_angular_platformBrowser.HammerGestureConfig));

/**
 * Stripped-down HammerJS annotations to be used within Material, which are necessary,
 * because HammerJS is an optional dependency. For the full annotations see:
 * https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/hammerjs
 */

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

var __decorate$21 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$21 = (this && this.__metadata) || function (k, v) {
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
    /** Notify other items that selection for the given name has been set. */
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
    UniqueSelectionDispatcher = __decorate$21([
        _angular_core.Injectable(), 
        __metadata$21('design:paramtypes', [])
    ], UniqueSelectionDispatcher);
    return UniqueSelectionDispatcher;
}());

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

var __decorate$22 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$22 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/** Selector that matches all elements that may have style collisions with material1. */
var MD_ELEMENTS_SELECTOR = "\n  md-autocomplete,\n  md-card,\n  md-card-actions,\n  md-card-content,\n  md-card-footer,\n  md-card-header,\n  md-card-subtitle,\n  md-card-title,\n  md-card-title-group,\n  md-checkbox,\n  md-chip,\n  md-dialog-container,\n  md-divider,\n  md-grid-list,\n  md-grid-tile,\n  md-grid-tile-footer,\n  md-grid-tile-header,\n  md-hint,\n  md-icon,\n  md-ink-bar,\n  md-input,\n  md-list,\n  md-list-item,\n  md-menu,\n  md-nav-list,\n  md-option,\n  md-placeholder,\n  md-progress-bar,\n  md-progress-circle,\n  md-radio-button,\n  md-radio-group,\n  md-select,\n  md-sidenav,\n  md-slider,\n  md-spinner,\n  md-tab,\n  md-toolbar\n";
/** Directive that enforces that the `md-` prefix cannot be used. */
var MdPrefixEnforcer = (function () {
    function MdPrefixEnforcer() {
        throw Error('The "md-" prefix cannot be used in ng-material v1 compatibility mode.');
    }
    MdPrefixEnforcer = __decorate$22([
        _angular_core.Directive({ selector: MD_ELEMENTS_SELECTOR }), 
        __metadata$22('design:paramtypes', [])
    ], MdPrefixEnforcer);
    return MdPrefixEnforcer;
}());
var NoConflictStyleCompatibilityMode = (function () {
    function NoConflictStyleCompatibilityMode() {
    }
    NoConflictStyleCompatibilityMode.forRoot = function () {
        return {
            ngModule: NoConflictStyleCompatibilityMode,
            providers: [],
        };
    };
    NoConflictStyleCompatibilityMode = __decorate$22([
        _angular_core.NgModule({
            declarations: [MdPrefixEnforcer],
            exports: [MdPrefixEnforcer],
            providers: [{
                    provide: MATERIAL_COMPATIBILITY_MODE, useValue: true,
                }],
        }), 
        __metadata$22('design:paramtypes', [])
    ], NoConflictStyleCompatibilityMode);
    return NoConflictStyleCompatibilityMode;
}());

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
    MdCoreModule.forRoot = function () {
        return {
            ngModule: MdCoreModule,
            providers: [A11Y_PROVIDERS, OVERLAY_PROVIDERS],
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
            ],
            exports: [
                MdLineModule,
                RtlModule,
                MdRippleModule,
                ObserveContentModule,
                PortalModule,
                OverlayModule,
                A11yModule,
            ],
        }), 
        __metadata('design:paramtypes', [])
    ], MdCoreModule);
    return MdCoreModule;
}());

var __decorate$25 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$25 = (this && this.__metadata) || function (k, v) {
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
    __decorate$25([
        _angular_core.Input(), 
        __metadata$25('design:type', Boolean)
    ], Md2Accordion.prototype, "multiple", null);
    __decorate$25([
        _angular_core.Input(), 
        __metadata$25('design:type', String)
    ], Md2Accordion.prototype, "class", void 0);
    __decorate$25([
        _angular_core.Output(), 
        __metadata$25('design:type', _angular_core.EventEmitter)
    ], Md2Accordion.prototype, "close", void 0);
    __decorate$25([
        _angular_core.Output(), 
        __metadata$25('design:type', _angular_core.EventEmitter)
    ], Md2Accordion.prototype, "open", void 0);
    Md2Accordion = __decorate$25([
        _angular_core.Component({selector: 'md2-accordion',
            template: "<ng-content></ng-content>",
            styles: [".md2-accordion { display: block; } md2-accordion-tab { position: relative; display: block; outline: 0; border: 0; border-width: 0 0 1px; border-style: solid; border-color: rgba(0, 0, 0, 0.12); box-sizing: border-box; } md2-accordion-tab[hidden] { display: none; } md2-accordion-tab.md2-accordion-tab-active { border-color: rgba(0, 0, 0, 0.12); } md2-accordion-tab .md2-accordion-header { position: relative; border-radius: 0; color: rgba(0, 0, 0, 0.85); font-weight: 500; cursor: pointer; display: block; align-items: inherit; line-height: 40px; margin: 0; max-height: 40px; overflow: hidden; padding: 0 35px 0 16px; text-align: left; text-decoration: none; white-space: nowrap; width: 100%; box-sizing: border-box; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; -webkit-user-drag: none; } md2-accordion-tab.md2-accordion-tab-active .md2-accordion-header { color: #106cc8; } md2-accordion-tab.md2-accordion-tab-disabled .md2-accordion-header { pointer-events: none; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; -webkit-user-drag: none; opacity: 0.5; cursor: default; } md2-accordion-tab .md2-accordion-header-icon { position: absolute; top: 12px; right: 17px; width: 8px; height: 8px; overflow: hidden; display: inline-block; border-width: 0 2px 2px 0; border-style: solid; border-color: rgba(0, 0, 0, 0.54); transform: rotate(45deg); transition: 300ms ease-in-out; } md2-accordion-tab.md2-accordion-tab-active .md2-accordion-header-icon { transform: rotate(225deg); top: 16px; } md2-accordion-tab .md2-accordion-tab-content { position: relative; display: none; padding: 16px; } md2-accordion-tab.md2-accordion-tab-active .md2-accordion-tab-content { display: block; } /*# sourceMappingURL=accordion.css.map */ "],
            host: {
                '[class]': 'class',
                '[class.md2-accordion]': 'true'
            },
            encapsulation: _angular_core.ViewEncapsulation.None
        }), 
        __metadata$25('design:paramtypes', [])
    ], Md2Accordion);
    return Md2Accordion;
}());

var __decorate$26 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$26 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var Md2AccordionHeader = (function () {
    function Md2AccordionHeader() {
    }
    Md2AccordionHeader = __decorate$26([
        _angular_core.Directive({ selector: 'md2-accordion-header' }), 
        __metadata$26('design:paramtypes', [])
    ], Md2AccordionHeader);
    return Md2AccordionHeader;
}());
var Md2AccordionTab = (function () {
    function Md2AccordionTab(_accordion) {
        this._accordion = _accordion;
        this._accordion.addTab(this);
    }
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
            this.active = true;
            this._accordion.open.emit({ originalEvent: event, index: index });
        }
        else {
            this.active = true;
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
    __decorate$26([
        _angular_core.Input(), 
        __metadata$26('design:type', String)
    ], Md2AccordionTab.prototype, "header", void 0);
    __decorate$26([
        _angular_core.Input(), 
        __metadata$26('design:type', Boolean)
    ], Md2AccordionTab.prototype, "active", void 0);
    __decorate$26([
        _angular_core.Input(), 
        __metadata$26('design:type', Boolean)
    ], Md2AccordionTab.prototype, "disabled", void 0);
    Md2AccordionTab = __decorate$26([
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
        __metadata$26('design:paramtypes', [Md2Accordion])
    ], Md2AccordionTab);
    return Md2AccordionTab;
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
    Md2AccordionModule = __decorate$24([
        _angular_core.NgModule({
            imports: [_angular_common.CommonModule],
            exports: MD2_ACCORDION_DIRECTIVES,
            declarations: MD2_ACCORDION_DIRECTIVES,
        }), 
        __metadata$24('design:paramtypes', [])
    ], Md2AccordionModule);
    return Md2AccordionModule;
}());

var __decorate$28 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$28 = (this && this.__metadata) || function (k, v) {
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
    HighlightPipe = __decorate$28([
        _angular_core.Pipe({ name: 'highlight' }), 
        __metadata$28('design:paramtypes', [])
    ], HighlightPipe);
    return HighlightPipe;
}());

var __decorate$27 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$27 = (this && this.__metadata) || function (k, v) {
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
var noop = function () { };
var nextId = 0;
var MD2_AUTOCOMPLETE_CONTROL_VALUE_ACCESSOR = {
    provide: _angular_forms.NG_VALUE_ACCESSOR,
    useExisting: _angular_core.forwardRef(function () { return Md2Autocomplete; }),
    multi: true
};
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
        this._onTouchedCallback = noop;
        this._onChangeCallback = noop;
        this._items = [];
        this._list = [];
        this.selectedItem = null;
        this.noBlur = true;
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
                    this._onChangeCallback(value);
                    this.change.emit(value);
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
        this._onChangeCallback(this._value);
        this.change.emit(this._value);
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
    Md2Autocomplete.prototype.registerOnChange = function (fn) { this._onChangeCallback = fn; };
    Md2Autocomplete.prototype.registerOnTouched = function (fn) { this._onTouchedCallback = fn; };
    __decorate$27([
        _angular_core.Output(), 
        __metadata$27('design:type', _angular_core.EventEmitter)
    ], Md2Autocomplete.prototype, "change", void 0);
    __decorate$27([
        _angular_core.Output(), 
        __metadata$27('design:type', Object)
    ], Md2Autocomplete.prototype, "textChange", void 0);
    __decorate$27([
        _angular_core.Input(), 
        __metadata$27('design:type', String)
    ], Md2Autocomplete.prototype, "id", void 0);
    __decorate$27([
        _angular_core.Input(), 
        __metadata$27('design:type', Number)
    ], Md2Autocomplete.prototype, "tabindex", void 0);
    __decorate$27([
        _angular_core.Input(), 
        __metadata$27('design:type', String)
    ], Md2Autocomplete.prototype, "placeholder", void 0);
    __decorate$27([
        _angular_core.Input('item-text'), 
        __metadata$27('design:type', String)
    ], Md2Autocomplete.prototype, "textKey", void 0);
    __decorate$27([
        _angular_core.Input('item-value'), 
        __metadata$27('design:type', String)
    ], Md2Autocomplete.prototype, "valueKey", void 0);
    __decorate$27([
        _angular_core.Input('min-length'), 
        __metadata$27('design:type', Number)
    ], Md2Autocomplete.prototype, "minLength", void 0);
    __decorate$27([
        _angular_core.Input(), 
        __metadata$27('design:type', Boolean)
    ], Md2Autocomplete.prototype, "readonly", null);
    __decorate$27([
        _angular_core.Input(), 
        __metadata$27('design:type', Boolean)
    ], Md2Autocomplete.prototype, "required", null);
    __decorate$27([
        _angular_core.Input(), 
        __metadata$27('design:type', Boolean)
    ], Md2Autocomplete.prototype, "disabled", null);
    __decorate$27([
        _angular_core.Input(), 
        __metadata$27('design:type', Array), 
        __metadata$27('design:paramtypes', [Array])
    ], Md2Autocomplete.prototype, "items", null);
    __decorate$27([
        _angular_core.Input(), 
        __metadata$27('design:type', Object)
    ], Md2Autocomplete.prototype, "value", null);
    Md2Autocomplete = __decorate$27([
        _angular_core.Component({selector: 'md2-autocomplete',
            template: "<div class=\"md2-autocomplete-trigger\" [class.is-focused]=\"_inputFocused || isMenuVisible\"> <input [(ngModel)]=\"_inputValue\" type=\"text\" tabs=\"false\" autocomplete=\"off\" [readonly]=\"readonly\" [tabindex]=\"disabled ? -1 : tabindex\" [disabled]=\"disabled\" class=\"md2-autocomplete-input\" (focus)=\"_handleFocus()\" (blur)=\"_handleBlur()\" (keydown)=\"_handleKeydown($event)\" (change)=\"$event.stopPropagation()\" /> <span class=\"md2-autocomplete-placeholder\" [class.has-value]=\"_inputValue\"> {{ placeholder }} </span> <svg *ngIf=\"_inputValue\" (click)=\"_onClear()\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"> <path d=\"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z\" /> </svg> </div> <ul *ngIf=\"isMenuVisible\" class=\"md2-autocomplete-menu\" (mouseenter)=\"_handleMouseEnter()\" (mouseleave)=\"_handleMouseLeave()\"> <li class=\"md2-option\" *ngFor=\"let l of _list; let i = index;\" [class.focus]=\"_focusedOption === i\" (click)=\"_selectOption($event, i)\"> <div class=\"md2-text\" [innerHtml]=\"l.text | highlight:_inputValue\"></div> </li> </ul> ",
            styles: ["md2-autocomplete { position: relative; display: block; margin: 18px 0; outline: none; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; -webkit-backface-visibility: hidden; backface-visibility: hidden; } md2-autocomplete.md2-autocomplete-disabled { pointer-events: none; cursor: default; } .md2-autocomplete-trigger { position: relative; display: block; width: 100%; padding: 2px 2px 1px; border-bottom: 1px solid rgba(0, 0, 0, 0.12); box-sizing: border-box; min-width: 64px; min-height: 26px; cursor: pointer; } .md2-autocomplete-trigger.is-focused { padding-bottom: 0; border-bottom: 2px solid #106cc8; } md2-autocomplete.ng-invalid.ng-touched:not(.md2-autocomplete-disabled) .md2-autocomplete-trigger { color: #f44336; border-bottom-color: #f44336; } md2-autocomplete.md2-autocomplete-disabled .md2-autocomplete-trigger { color: rgba(0, 0, 0, 0.38); border-color: transparent; background-image: linear-gradient(to right, rgba(0, 0, 0, 0.38) 0%, rgba(0, 0, 0, 0.38) 33%, transparent 0%); background-position: bottom -1px left 0; background-size: 4px 1px; background-repeat: repeat-x; cursor: default; cursor: default; } md2-autocomplete.md2-autocomplete-disabled .md2-autocomplete-trigger.is-focused { padding-bottom: 1px; border-bottom: 1px solid transparent; } .md2-autocomplete-input { width: 100%; height: 26px; font-size: 15px; outline: none; background: transparent; border: 0; box-sizing: border-box; } md2-autocomplete.md2-autocomplete-disabled .md2-autocomplete-input { color: rgba(0, 0, 0, 0.38); } .md2-autocomplete-placeholder { color: rgba(0, 0, 0, 0.38); position: absolute; right: 26px; bottom: 100%; left: 0; color: rgba(0, 0, 0, 0.38); max-width: 100%; padding-left: 3px; padding-right: 0; line-height: 1.4; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; pointer-events: none; z-index: 1; transform: translate3d(0, 26px, 0) scale(1); transition: transform 400ms cubic-bezier(0.25, 0.8, 0.25, 1); transform-origin: left top; color: rgba(0, 0, 0, 0.38); } [aria-required=true] .md2-autocomplete-placeholder::after { content: '*'; } .md2-autocomplete-trigger.is-focused .md2-autocomplete-placeholder { color: #106cc8; } .md2-autocomplete-trigger.is-focused .md2-autocomplete-placeholder, md2-autocomplete .md2-autocomplete-placeholder.has-value { transform: translate3d(0, 6px, 0) scale(0.75); } .md2-autocomplete-trigger svg { position: absolute; right: 0; top: 0; display: block; height: 100%; background: white; fill: currentColor; color: rgba(0, 0, 0, 0.54); } .md2-autocomplete-menu { position: absolute; left: 0; top: 100%; display: block; z-index: 10; width: 100%; margin: 0; padding: 8px 0; box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 2px 1px -1px rgba(0, 0, 0, 0.12); max-height: 256px; min-height: 48px; overflow-y: auto; background: white; } .md2-autocomplete-menu .md2-option { position: relative; display: block; color: #212121; cursor: pointer; width: auto; padding: 0 16px; height: 48px; line-height: 48px; transition: background 150ms linear; } .md2-autocomplete-menu .md2-option:hover, .md2-autocomplete-menu .md2-option.focus { background: #ededed; } .md2-autocomplete-menu .md2-option .md2-text { width: auto; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; font-size: 16px; } .md2-autocomplete-menu .highlight { color: #737373; } /*# sourceMappingURL=autocomplete.css.map */ "],
            providers: [MD2_AUTOCOMPLETE_CONTROL_VALUE_ACCESSOR],
            host: {
                'role': 'autocomplete',
                '[id]': 'id',
                '[attr.aria-label]': 'placeholder',
                '[attr.aria-required]': 'required.toString()',
                '[attr.aria-disabled]': 'disabled.toString()',
                '[attr.aria-invalid]': '_control?.invalid || "false"',
                '[class.md2-autocomplete-disabled]': 'disabled',
                '(keydown)': '_handleKeydown($event)',
                '(blur)': '_onBlur()'
            },
            encapsulation: _angular_core.ViewEncapsulation.None
        }), 
        __metadata$27('design:paramtypes', [_angular_core.ElementRef])
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
    Md2AutocompleteModule = __decorate$27([
        _angular_core.NgModule({
            imports: [_angular_common.CommonModule, _angular_forms.FormsModule],
            exports: MD2_AUTOCOMPLETE_DIRECTIVES,
            declarations: MD2_AUTOCOMPLETE_DIRECTIVES,
        }), 
        __metadata$27('design:paramtypes', [])
    ], Md2AutocompleteModule);
    return Md2AutocompleteModule;
}());

var __decorate$29 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$29 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var noop$1 = function () { };
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
        this.addOnBlur = true;
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
        this.textKey = 'text';
        this.valueKey = null;
        this.change = new _angular_core.EventEmitter();
        this.onTouchedCallback = noop$1;
        this.onChangeCallback = noop$1;
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
            var objText = value[this.autocompleteItemText];
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
                isExist = this.chipItemList.filter(function (chip) { return chip.text === chipString; });
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
                        a[this.textKey] = chips;
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
            if (this.isObject) {
                this._value.push(this.chipItemList[i].value);
            }
            else {
                this._value.push(this.chipItemList[i]);
            }
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
    __decorate$29([
        _angular_core.Input(), 
        __metadata$29('design:type', Number)
    ], Md2Chips.prototype, "tabindex", void 0);
    __decorate$29([
        _angular_core.Input(), 
        __metadata$29('design:type', Boolean)
    ], Md2Chips.prototype, "addOnBlur", void 0);
    __decorate$29([
        _angular_core.Input(), 
        __metadata$29('design:type', Boolean)
    ], Md2Chips.prototype, "addOnComma", void 0);
    __decorate$29([
        _angular_core.Input(), 
        __metadata$29('design:type', Boolean)
    ], Md2Chips.prototype, "addOnEnter", void 0);
    __decorate$29([
        _angular_core.Input(), 
        __metadata$29('design:type', Boolean)
    ], Md2Chips.prototype, "addOnPaste", void 0);
    __decorate$29([
        _angular_core.Input(), 
        __metadata$29('design:type', Boolean)
    ], Md2Chips.prototype, "addOnSpace", void 0);
    __decorate$29([
        _angular_core.Input(), 
        __metadata$29('design:type', RegExp)
    ], Md2Chips.prototype, "allowedPattern", void 0);
    __decorate$29([
        _angular_core.Input(), 
        __metadata$29('design:type', Array)
    ], Md2Chips.prototype, "ngModel", void 0);
    __decorate$29([
        _angular_core.Input(), 
        __metadata$29('design:type', String)
    ], Md2Chips.prototype, "pasteSplitPattern", void 0);
    __decorate$29([
        _angular_core.Input(), 
        __metadata$29('design:type', String)
    ], Md2Chips.prototype, "placeholder", void 0);
    __decorate$29([
        _angular_core.Input(), 
        __metadata$29('design:type', Array)
    ], Md2Chips.prototype, "autocompleteDataList", void 0);
    __decorate$29([
        _angular_core.Input(), 
        __metadata$29('design:type', Boolean)
    ], Md2Chips.prototype, "isAutoComplete", void 0);
    __decorate$29([
        _angular_core.Input(), 
        __metadata$29('design:type', Boolean)
    ], Md2Chips.prototype, "isRemovable", void 0);
    __decorate$29([
        _angular_core.Input(), 
        __metadata$29('design:type', Boolean)
    ], Md2Chips.prototype, "readonly", void 0);
    __decorate$29([
        _angular_core.Input(), 
        __metadata$29('design:type', Number)
    ], Md2Chips.prototype, "minChips", void 0);
    __decorate$29([
        _angular_core.Input(), 
        __metadata$29('design:type', Number)
    ], Md2Chips.prototype, "maxChips", void 0);
    __decorate$29([
        _angular_core.Input(), 
        __metadata$29('design:type', String)
    ], Md2Chips.prototype, "id", void 0);
    __decorate$29([
        _angular_core.Input('autocomplete-item-text'), 
        __metadata$29('design:type', String)
    ], Md2Chips.prototype, "autocompleteItemText", void 0);
    __decorate$29([
        _angular_core.Input('item-text'), 
        __metadata$29('design:type', String)
    ], Md2Chips.prototype, "textKey", void 0);
    __decorate$29([
        _angular_core.Input('item-value'), 
        __metadata$29('design:type', String)
    ], Md2Chips.prototype, "valueKey", void 0);
    __decorate$29([
        _angular_core.Output(), 
        __metadata$29('design:type', _angular_core.EventEmitter)
    ], Md2Chips.prototype, "change", void 0);
    __decorate$29([
        _angular_core.ViewChild('chipInputForm'), 
        __metadata$29('design:type', _angular_forms.NgForm)
    ], Md2Chips.prototype, "chipInputForm", void 0);
    __decorate$29([
        _angular_core.Input(), 
        __metadata$29('design:type', Object)
    ], Md2Chips.prototype, "value", null);
    __decorate$29([
        _angular_core.HostListener('focus'), 
        __metadata$29('design:type', Function), 
        __metadata$29('design:paramtypes', []), 
        __metadata$29('design:returntype', void 0)
    ], Md2Chips.prototype, "_handleFocus", null);
    Md2Chips = __decorate$29([
        _angular_core.Component({
            selector: 'md2-chips',
            template: "<div class=\"md2-chips-container\" [class.md2-chip-disabled]=\"readonly\"> <span *ngFor=\"let chip of chipItemList; let i = index\" class=\"md2-chip\" [class.active]=\"selectedChip === i\"> <span *ngIf=\"isObject\">{{chip.text}}</span> <span *ngIf=\"!isObject\">{{chip}}</span> <span [innerHTML]=\"templateHtmlString\"></span> <svg (click)=\"removeSelectedChip(i)\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" *ngIf=\"isRemovable\"> <path d=\"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z\" /> </svg> </span> <ng-content select=\".md2-template\"></ng-content> <form #chipInputForm=\"ngForm\" class=\"chip-input-form\" *ngIf=\"!readonly\"> <input *ngIf=\"!isAutoComplete\" class=\"chip-input\" type=\"text\" [(ngModel)]=\"inputValue\" name=\"chipInput\" [placeholder]=\"placeholder\" (paste)=\"inputPaste($event)\" (keydown)=\"inputChanged($event)\" (blur)=\"inputBlurred($event)\" (focus)=\"inputFocus()\" /> <div *ngIf=\"isAutoComplete\"> <md2-autocomplete [items]=\"autocompleteDataList\" [item-text]=\"autocompleteItemText\" [(ngModel)]=\"item\" name=\"autocomplete\" (textChange)=\"valueupdate($event)\" (change)=\"changeAutocomplete($event)\" [placeholder]=\"placeholder\" (keydown)=\"inputChanged($event)\"> </md2-autocomplete> </div> </form> </div> <div class=\"chip-error\" *ngIf=\"this.chipItemList.length<this.minChips\">Minimum {{minChips}} chip required.</div> <div class=\"chip-error\" *ngIf=\"this.chipItemList.length>=this.maxChips\">You are able to add Maximum {{maxChips}} chip.</div> ",
            styles: [".template-content { display: inline; } md2-chips { outline: none; } md2-chips .md2-chips-container { display: block; box-shadow: 0 1px #ccc; padding: 5px 0; margin-bottom: 10px; min-height: 50px; box-sizing: border-box; clear: both; } md2-chips .md2-chips-container::after { clear: both; content: ''; display: table; } md2-chips.chip-input-focus .md2-chips-container { box-shadow: 0 2px #0d8bff; } md2-chips .md2-chip-disabled { cursor: default; } md2-chips md2-autocomplete { margin: 0; } md2-chips .md2-autocomplete-wrap { border-bottom: 0 !important; } .md2-chip { font-size: 16px; position: relative; cursor: default; border-radius: 16px; display: block; height: 32px; line-height: 32px; margin: 8px 8px 0 0; padding: 0 28px 0 12px; float: left; box-sizing: border-box; max-width: 100%; background: #e0e0e0; color: #424242; white-space: nowrap; overflow: hidden; -ms-text-overflow: ellipsis; text-overflow: ellipsis; } .md2-chip.active { color: white; background: #0d8bff; } .md2-chip.active svg { color: rgba(255, 255, 255, 0.87); } .md2-chip svg { position: absolute; top: 4px; right: 4px; cursor: pointer; display: inline-block; overflow: hidden; fill: currentColor; color: rgba(0, 0, 0, 0.54); } .md2-template { display: none; } .chip-input-disabled { pointer-events: none; cursor: default; } .chip-input-form { display: inline-block; height: 32px; margin: 8px 8px 0 0; } .chip-remove { cursor: pointer; display: inline-block; padding: 0 3px; color: #616161; font-size: 30px; vertical-align: top; line-height: 21px; font-family: serif; } .chip-input { display: inline-block; width: auto; border: 0; outline: none; height: 32px; line-height: 32px; font-size: 16px; } .chip-error { font-size: 13px; color: #fd0f0f; } .md2-chips-container .chip-input-form .md2-autocomplete-wrap { border-bottom: 0; } .md2-chips-container .md2-autocomplete-wrap.is-focused .md2-autocomplete-placeholder { display: none; } .md2-chips-container .md2-autocomplete-wrap .md2-autocomplete-placeholder.has-value { display: none; } .md2-chips-container .md2-autocomplete-wrap svg { display: none; } .md2-chips-container .md2-autocomplete-wrap .md2-autocomplete-input { height: 32px; font-size: 16px; } /*# sourceMappingURL=chips.css.map */ "],
            providers: [MD2_CHIPS_CONTROL_VALUE_ACCESSOR],
            host: {
                'role': 'chips',
                '[id]': 'id',
                '[tabindex]': 'readonly ? -1 : tabindex',
                '[class.chip-input-focus]': 'inputFocused || selectedChip >= 0',
            },
            encapsulation: _angular_core.ViewEncapsulation.None
        }), 
        __metadata$29('design:paramtypes', [_angular_core.ElementRef])
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
    Md2ChipsModule = __decorate$29([
        _angular_core.NgModule({
            imports: [_angular_common.CommonModule, _angular_forms.FormsModule, Md2AutocompleteModule],
            declarations: MD2_CHIPS_DIRECTIVES,
            exports: MD2_CHIPS_DIRECTIVES
        }), 
        __metadata$29('design:paramtypes', [])
    ], Md2ChipsModule);
    return Md2ChipsModule;
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
    __decorate$30([
        _angular_core.Input(), 
        __metadata$30('design:type', Boolean)
    ], Md2Collapse.prototype, "collapse", null);
    Md2Collapse = __decorate$30([
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
        __metadata$30('design:paramtypes', [])
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
    Md2CollapseModule = __decorate$30([
        _angular_core.NgModule({
            imports: [_angular_common.CommonModule],
            exports: MD2_COLLAPSE_DIRECTIVES,
            declarations: MD2_COLLAPSE_DIRECTIVES,
        }), 
        __metadata$30('design:paramtypes', [])
    ], Md2CollapseModule);
    return Md2CollapseModule;
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
                case 'hsla':
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
                case 'hsla':
                    var hsla = this.hsva2hsla(hsva);
                    var hslaText = new Hsla(Math.round((hsla.h) * 360), Math.round(hsla.s * 100), Math.round(hsla.l * 100), Math.round(hsla.a * 100) / 100);
                    return 'hsl(' + hslaText.h + ',' + hslaText.s + '%,' + hslaText.l + '%)';
                case 'rgba':
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
        if (hexText[1] === hexText[2] && hexText[3] === hexText[4] && hexText[5] === hexText[6]) {
            hexText = '#' + hexText[1] + hexText[3] + hexText[5];
        }
        return hexText.toUpperCase();
    };
    ColorpickerService.prototype.denormalizeRGBA = function (rgba) {
        return new Rgba(Math.round(rgba.r * 255), Math.round(rgba.g * 255), Math.round(rgba.b * 255), rgba.a);
    };
    ColorpickerService = __decorate$32([
        _angular_core.Injectable(), 
        __metadata$32('design:paramtypes', [])
    ], ColorpickerService);
    return ColorpickerService;
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
var noop$2 = function () { };
var nextId$2 = 0;
var MD2_COLORPICKER_CONTROL_VALUE_ACCESSOR = {
    provide: _angular_forms.NG_VALUE_ACCESSOR,
    useExisting: _angular_core.forwardRef(function () { return Md2Colorpicker; }),
    multi: true
};
var TextDirective = (function () {
    function TextDirective() {
        this.newValue = new _angular_core.EventEmitter();
    }
    TextDirective.prototype.changeInput = function (value) {
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
    __decorate$31([
        _angular_core.Output('newValue'), 
        __metadata$31('design:type', Object)
    ], TextDirective.prototype, "newValue", void 0);
    __decorate$31([
        _angular_core.Input('text'), 
        __metadata$31('design:type', Object)
    ], TextDirective.prototype, "text", void 0);
    __decorate$31([
        _angular_core.Input('rg'), 
        __metadata$31('design:type', Number)
    ], TextDirective.prototype, "rg", void 0);
    TextDirective = __decorate$31([
        _angular_core.Directive({
            selector: '[text]',
            host: {
                '(input)': 'changeInput($event.target.value)'
            }
        }), 
        __metadata$31('design:paramtypes', [])
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
    __decorate$31([
        _angular_core.Input('colorpicker-slider'), 
        __metadata$31('design:type', String)
    ], ColorpickerSliderDirective.prototype, "slider", void 0);
    __decorate$31([
        _angular_core.Input('point-x'), 
        __metadata$31('design:type', Number)
    ], ColorpickerSliderDirective.prototype, "pointX", void 0);
    __decorate$31([
        _angular_core.Input('point-y'), 
        __metadata$31('design:type', Number)
    ], ColorpickerSliderDirective.prototype, "pointY", void 0);
    __decorate$31([
        _angular_core.Output('change'), 
        __metadata$31('design:type', Object)
    ], ColorpickerSliderDirective.prototype, "change", void 0);
    ColorpickerSliderDirective = __decorate$31([
        _angular_core.Directive({
            selector: '[colorpicker-slider]',
            host: {
                '(mousedown)': 'start($event)',
                '(touchstart)': 'start($event)'
            }
        }), 
        __metadata$31('design:paramtypes', [_angular_core.ElementRef])
    ], ColorpickerSliderDirective);
    return ColorpickerSliderDirective;
}());
var Md2Colorpicker = (function () {
    function Md2Colorpicker(service) {
        this.service = service;
        this._innerValue = '';
        this._onTouchedCallback = noop$2;
        this._onChangeCallback = noop$2;
        this._defalutColor = '#000000';
        this.cFormat = 'hex';
        this.colorpickerChange = new _angular_core.EventEmitter();
        this.change = new _angular_core.EventEmitter();
        this.tabindex = 0;
        this.id = 'md2-colorpicker-' + (++nextId$2);
        this._created = false;
    }
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
                this._onChangeCallback(v);
            }
        },
        enumerable: true,
        configurable: true
    });
    ;
    Md2Colorpicker.prototype.ngOnInit = function () {
        var hsva = this.service.stringToHsva(this._innerValue);
        if (hsva !== null) {
            this.hsva = hsva;
        }
        else {
            this.hsva = this.service.stringToHsva(this._defalutColor);
        }
        if (this._created) {
            this.colorpickerChange.emit(this.service.outputFormat(hsva, this.cFormat));
            this.change.emit(this.service.outputFormat(hsva, this.cFormat));
        }
        this.sliderDim = new SliderDimension(150, 230, 130, 150);
        this.slider = new SliderPosition(0, 0, 0, 0);
        if (this.cFormat === 'rgba') {
            this.format = 1;
        }
        else if (this.cFormat === 'hsla') {
            this.format = 2;
        }
        else {
            this.format = 0;
        }
        this.update();
    };
    /**
    * Show Colorpicker dialog
    */
    Md2Colorpicker.prototype._showColorpicker = function () {
        if (this.disabled) {
            return;
        }
        if (!this._isColorpickerVisible) {
            this.update();
            this._initialColor = this._innerValue;
            this._isColorpickerVisible = true;
        }
        else {
            this._isColorpickerVisible = false;
        }
        if (this._innerValue != this._initialColor) {
            this.change.emit(this._innerValue);
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
    /**
    * change color
    * @param value
    */
    Md2Colorpicker.prototype.colorChanged = function (value) {
        this.colorpickerChange.emit(value);
        this._onChangeCallback(value);
        this._innerValue = value;
    };
    /**
    * set color
    * @param value
    */
    Md2Colorpicker.prototype.setColorFromString = function (value) {
        var hsva = this.service.stringToHsva(value);
        if (hsva !== null) {
            this.hsva = hsva;
        }
        this.update();
    };
    Md2Colorpicker.prototype.formatPolicy = function () {
        this.format = (this.format + 1) % 3;
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
        this.hexText = this.service.hexText(rgba);
        if (this.format === 0 && this.hsva.a < 1) {
            this.format++;
        }
        this.outputColor = this.service.outputFormat(this.hsva, this.cFormat);
        this.slider = new SliderPosition((this.hsva.h) * this.sliderDim.h - 8, this.hsva.s * this.sliderDim.s - 8, (1 - this.hsva.v) * this.sliderDim.v - 8, this.hsva.a * this.sliderDim.a - 8);
        this.colorChanged(this.outputColor);
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
    Md2Colorpicker.prototype.clickOk = function () {
        this._isColorpickerVisible = false;
        if (this._innerValue != this._initialColor) {
            this.change.emit(this._innerValue);
        }
        this.closeColorpicker();
    };
    /**
    * deselect recent color and close popup
    */
    Md2Colorpicker.prototype.cancelColor = function () {
        this._innerValue = this._initialColor;
        this.setColorFromString(this._innerValue);
        this.closeColorpicker();
    };
    /**
    * close color picker
    */
    Md2Colorpicker.prototype.closeColorpicker = function () {
        this._isColorpickerVisible = false;
        this.setColorFromString(this._innerValue);
    };
    Md2Colorpicker.prototype.writeValue = function (value) { this.value = value; };
    Md2Colorpicker.prototype.registerOnChange = function (fn) { this._onChangeCallback = fn; };
    Md2Colorpicker.prototype.registerOnTouched = function (fn) { this._onTouchedCallback = fn; };
    __decorate$31([
        _angular_core.Input('format'), 
        __metadata$31('design:type', String)
    ], Md2Colorpicker.prototype, "cFormat", void 0);
    __decorate$31([
        _angular_core.Output('colorpickerChange'), 
        __metadata$31('design:type', Object)
    ], Md2Colorpicker.prototype, "colorpickerChange", void 0);
    __decorate$31([
        _angular_core.Output(), 
        __metadata$31('design:type', Object)
    ], Md2Colorpicker.prototype, "change", void 0);
    __decorate$31([
        _angular_core.Input(), 
        __metadata$31('design:type', Number)
    ], Md2Colorpicker.prototype, "tabindex", void 0);
    __decorate$31([
        _angular_core.Input(), 
        __metadata$31('design:type', Boolean)
    ], Md2Colorpicker.prototype, "disabled", void 0);
    __decorate$31([
        _angular_core.Input(), 
        __metadata$31('design:type', String)
    ], Md2Colorpicker.prototype, "id", void 0);
    Md2Colorpicker = __decorate$31([
        _angular_core.Component({selector: 'md2-colorpicker',
            template: "<div class=\"color-picker-selector\" (click)=\"_showColorpicker()\"> <div class=\"color-div\" [style.background-color]=\"_innerValue\"> </div> <label class=\"color-text\">{{_innerValue}}</label> </div> <div class=\"md2-colorpicker-wrapper\" [class.active]=\"_isColorpickerVisible\"> <div class=\"md2-color-picker\"> <div [colorpicker-slider] [style.background-color]=\"_hueSliderColor\" [point-x]=\"1\" [point-y]=\"1\" (change)=\"setSaturationAndBrightness($event)\" class=\"saturation-lightness\"> <div [style.left.px]=\"slider.s\" [style.top.px]=\"slider.v\" class=\"cursor\"></div> </div> <div [colorpicker-slider] [point-x]=\"1\" (change)=\"setHue($event)\" class=\"hue\"> <div [style.left.px]=\"slider.h\" class=\"cursor\"></div> </div> <div [colorpicker-slider] [style.background-color]=\"alphaColor\" [point-x]=\"1\" (change)=\"setAlpha($event)\" class=\"alpha\"> <div [style.left.px]=\"slider.a\" class=\"cursor\"></div> </div> <div [style.background-color]=\"outputColor\" class=\"selected-color\"></div> <div [hidden]=\"format!=2\" class=\"hsla-text\"> <input [text] type=\"number\" pattern=\"[0-9]*\" min=\"0\" max=\"360\" [rg]=\"360\" (newValue)=\"setHue($event)\" [value]=\"hslaText.h\" /> <input [text] type=\"number\" pattern=\"[0-9]*\" min=\"0\" max=\"100\" [rg]=\"100\" (newValue)=\"setSaturation($event)\" [value]=\"hslaText.s\" /> <input [text] type=\"number\" pattern=\"[0-9]*\" min=\"0\" max=\"100\" [rg]=\"100\" (newValue)=\"setLightness($event)\" [value]=\"hslaText.l\" /> <input [text] type=\"number\" pattern=\"[0-9]+([\.,][0-9]{1,2})?\" min=\"0\" max=\"1\" step=\"0.1\" [rg]=\"1\" (newValue)=\"setAlpha($event)\" [value]=\"hslaText.a\" /> <div>H</div><div>S</div><div>L</div><div>A</div> </div> <div [hidden]=\"format!=1\" class=\"rgba-text\"> <input [text] type=\"number\" pattern=\"[0-9]*\" min=\"0\" max=\"255\" [rg]=\"255\" (newValue)=\"setR($event)\" [value]=\"rgbaText.r\" /> <input [text] type=\"number\" pattern=\"[0-9]*\" min=\"0\" max=\"255\" [rg]=\"255\" (newValue)=\"setG($event)\" [value]=\"rgbaText.g\" /> <input [text] type=\"number\" pattern=\"[0-9]*\" min=\"0\" max=\"255\" [rg]=\"255\" (newValue)=\"setB($event)\" [value]=\"rgbaText.b\" /> <input [text] type=\"number\" pattern=\"[0-9]+([\.,][0-9]{1,2})?\" min=\"0\" max=\"1\" step=\"0.1\" [rg]=\"1\" (newValue)=\"setAlpha($event)\" [value]=\"rgbaText.a\" /> <div>R</div><div>G</div><div>B</div><div>A</div> </div> <div [hidden]=\"format!=0\" class=\"hex-text\"> <input [text] (newValue)=\"setColorFromString($event)\" [value]=\"hexText\" /> <div>Hex</div> </div> <div (click)=\"formatPolicy()\" class=\"type-policy\"></div> <div class=\"md2-color-picker-ok-btn\" (click)=\"clickOk()\">OK</div> <div class=\"md2-color-picker-cancel-btn\" (click)=\"cancelColor()\">Cancel</div> </div> </div> ",
            styles: ["md2-colorpicker { position: relative; display: block; max-width: 200px; outline: none; -webkit-backface-visibility: hidden; backface-visibility: hidden; } .md2-colorpicker-wrapper { width: 230px; height: 270px; position: absolute; border-radius: 2px; background-color: #fff; z-index: 10; box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4); transform: scale(0); transform-origin: left top; transition: 150ms; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; } .md2-colorpicker-wrapper.active { transform: scale(1); } md2-colorpicker.md2-colorpicker-disabled { pointer-events: none; cursor: default; } .color-picker-selector .color-div { height: 30px; width: 30px; display: inline-block; overflow: hidden; cursor: pointer; border-radius: 50%; vertical-align: middle; box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.2), 0 1px 1px 1px rgba(0, 0, 0, 0.14), 0 1px 1px 1px rgba(0, 0, 0, 0.12); } .color-picker-selector .color-text { display: inline-block; margin-left: 5px; vertical-align: middle; cursor: pointer; line-height: 30px; } .md2-color-picker, .md2-color-picker * { box-sizing: border-box; margin: 0; font-size: 12px; } .md2-color-picker i { cursor: default; position: relative; } .md2-color-picker .md2-color-picker-ok-btn { position: absolute; bottom: 5px; right: 80px; border-radius: 3px; padding: 2px 7px; box-sizing: border-box; background: transparent; text-align: center; overflow: hidden; cursor: pointer; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; outline: none; border: none; display: inline-block; white-space: nowrap; text-decoration: none; vertical-align: middle; font-size: 12px; font-weight: 500; text-transform: uppercase; line-height: 26px; transition: background 400ms cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 400ms cubic-bezier(0.25, 0.8, 0.25, 1); transform: translate3d(0, 0, 0); box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.26); color: rgba(0, 0, 0, 0.87059); background-color: #fafafa; } .md2-color-picker .md2-color-picker-ok-btn:hover { background-color: rgba(158, 158, 158, 0.2); } .md2-color-picker .md2-color-picker-cancel-btn { position: absolute; bottom: 5px; right: 7px; border-radius: 3px; padding: 2px 7px; box-sizing: border-box; background: transparent; text-align: center; overflow: hidden; cursor: pointer; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; outline: none; border: none; display: inline-block; white-space: nowrap; text-decoration: none; vertical-align: middle; font-size: 12px; font-weight: 500; text-transform: uppercase; line-height: 26px; transition: background 400ms cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 400ms cubic-bezier(0.25, 0.8, 0.25, 1); transform: translate3d(0, 0, 0); box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.26); color: rgba(0, 0, 0, 0.87059); background-color: #fafafa; } .md2-color-picker .md2-color-picker-cancel-btn:hover { background-color: rgba(158, 158, 158, 0.2); } .md2-color-picker div.cursor-sv { cursor: default; position: relative; border-radius: 50%; width: 15px; height: 15px; border: #ddd solid 1px; } .md2-color-picker div.cursor { cursor: crosshair; position: relative; border-radius: 50%; width: 15px; height: 15px; box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.5), inset 0 0 2px 0 rgba(0, 0, 0, 0.5); border: 2px solid #fff; } .md2-color-picker .saturation-lightness { width: 100%; height: 130px; border: none; top: 0; left: 0; position: absolute; background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOYAAACCCAYAAABSD7T3AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4AIWDwksPWR6lgAAIABJREFUeNrtnVuT47gRrAHN+P//Or/61Y5wONZ7mZ1u3XAeLMjJZGZVgdKsfc5xR3S0RIIUW+CHzCpc2McYo7XGv3ex7UiZd57rjyzzv+v+33X/R/+3r/f7vR386Y+TvKNcf/wdhTLPcv9qU2wZd74uth0t1821jkIZLPcsI/6nWa4XvutquU0Z85mnx80S/ZzgpnLnOtHNt7/ofx1TKXcSNzN/7qbMQ3ju7rNQmMYYd/4s2j9aa+P+gGaMcZrb1M/tdrvf7/d2v99P9/t93O/3cbvdxu12G9frdVwul3E+n8c///nP+2+//Xb66aefxl//+tfx5z//2YK5Al2rgvf4UsbpdGrB52bAvArXpuzjmiqAVSGz5eDmGYXzhbAZmCrnmzddpUU+8Y1dAOYeXCtDUwVwV7YCGH6uAmyMcZ9l5vkUaBPGMUZ7/J5w/792/fvv9Xq93263dr/fTxPECeME8nK5jM/Pz/HTTz/dv337dvrll1/GP/7xj/G3v/1t/OUvfwkVswongjdOp9PzH3U3D3zmWGnZVXn4jCqs7wC2BKP4/8tAzkZsoWx6XrqeHZymvp4ABCBJhTQwKfDT8gzrZCIqi5AhiACjBfEB2rP8/X63MM7f6/V6v9/v7Xa7bYC83W7jcrlsVHIq5ffv30+//fbb+OWXX8ZPP/00/v73v4+ff/75JSvbeu+bL2WMMaFbAlpBNM85QX+ct6qoSqkPAwuQlBVKqGNFSUOAA3Bmu7gC5hNOd15nSwvAOUW7C4giUCV8Sgn5L9hNFIqTsp0GxI0ysioyjAjkY/tGJVEpz+fz+OWXX+7fv38//f777+Pbt2/j119/HT///PP49ddfx8fHRwrmTjV779EXu2px2xhjwtdJZQcAWQIPLPISsMJaSwiD8gzIKrwSyATE5j5nAbR5c1dBUwBlsEWW0h6LqiYsqFPAQxCyRZ3wOSARxmlXMX5k64pQfvv27f75+dk+Pj5OHx8f4/v37+Pbt2/jt99+G9++fRsfHx/jcrmUFLO31gYDWblxRIs/TqfT7ousxJsAxXA2Gc7TA9XdgfdoHbFsj76X2+1WArgI1ageGwA3qupqoHsmcbI6Fu93quggFa9d7LeDtgKfAFHBJ+NEByIkcJ5KervdTmhhGcgJJSZ5vn//fj+fz+18Pp8+Pz/H5+fnmGD+/vvv4/v37+Pj42N8fn6O2+1Ws7JjjP6wraMI5E4RZ8x2vV5TSwkquotV7/d7Tz6HFWsD/qNcdw0CQ3q/321c686TwDVIdbuy73zNldhSHb8I2klZznm+InBS4U6n0302aBFsLhHDAKJVJVglfI9jhvu53W53sLANYNxAiDA6MCeUHx8f9+v12i6XS7tcLqcZW57P5yeY8/fz83Ocz+fnsSmYUyknWEG85WBst9stzSLyMdfr9Qi08iY15UZ0LlDGLhR3o5zK2j7OPUTD0E+nU3tk7Xb/16NFbhloAMuY1zjLUOO3BKeIDe+Z8s3/J4gFo4TM5jPmuRg28foUKKVSwo16TgA5npywcWLHgYl/Pz8/73/605/ab7/91m63W7tcLie0sZj4mao5gTyfz88E0f1+j8EcYzwTPEG2cqjyfHNF0M8fuqEiaOVnRzZZQNh5fwQyHg/HDGfJo89Q1zb/quu5XC6773I2XKfTqd/v9+d3wuqWva/YTdUdEV3fhIv/Viyps6YE3x3r43K5bJQS66zaxVGFsvd+//j4aF+/fm3fv39vt9utff36tf3+++/tdrudvn37ZuNLBaaCMgUzC+rZRiFowxUuJI8YMqcCp9Opq5vagaYU6lGJA1XQqejchw6Cj0Gw5nYBrGw01A2O206n04BGouNNyTfp/FwElhUey6nXrIKw7QQWddxuN2ldL5fL839gSPF8ahu/JvBO48CPSuqMf8Vp9/P53L58+dLu93s7n8/tfr8/39/v9/b5+TkhPJ3P56mQ436/j+/fv+/iSgbzer0+AZx/5+88bv6OMda6S5z6kd21fYC9dxv7cIJJ2d9AOS30fPMzyHiTM8B4DF6XUlYHp4KQW3W+1t77MNB1vGHxWq7Xa7vf78+y5/N5A+H1et29xuP5dbYtyaRu4AksbPq6936fjRzXRxBbPr/b+b18+fKljTHaBBBfn8/n0/1+H1++fBnn8zm0sB8fH5u4cr5GuBhMVk0EEn9RsctgVhM+ixlJtMA23R8B6yysAstBOgFXIKKCMIgToMqNEu2fYMH7ztc732dQKkCj1ytAZtY0Kx8pIr8GGJ+AT3V+2Hirhl++fBmXy2Wz73w+b17P8p+fn8/tUwGVleVkTyUb68DkfayWY4zxNRihU4EpLJPZVrK+u7J4/mgfKqeLW9X2REWlItL1diynbDDb3+jXgYjQqn0rrxWc+NkILP7F7xIbMvx7vV53x40xnlbWJF12ZSag/N0pW6t+ZzmOMzHjajKwDfond78zYTdfq18up97zr2q8v3IioBprRtBl0EZ9og5WBRGOdOHjIjXF7UotFbgOWnXzIJyzYvjG5IYgsmMOxHkz8OsMSrVNWeq5T8DaOcbEv1Od5rbs9aO7YvMet63EkF++fMExq+MRl4/L5bLZN/+ez+fnZ6KazuMqXSQVO5spJXflHAIzes/xJseckRJiDMog9d6VfRrqXMr6KpVV27jRwJacGovOAM1zMdQMnwK1AubK63kdCChvI1C7g0z9nf/D+Xze2Vj8H7Gx4P9duQlsYCrqyN8XqG3Hm/10Oj3jw/n+crlstuM+jPmmxT2dTuPz83Pzt2pn1XsEHX/bnPaVqVmh0xwOt0o6XLLAHePUU203wHfcrspCwmV3TryB5s0Mseeg97x/BwzCjBlbB+pRAPla0BVQuT6V6QHdBlj3d0KG147b+DqxQeUymDO43W4dQar+TIjwmAd0z8/h65vf0/yLv3Pb5XLpru/ydDo9s7ET0I+Pj6dKK9VUEIeKWQWPAOrJ8LKd4vE+t91Y3e7UFlWatg2VwJnb+HPmtvm/sfK59/OaWF3x/eP1UPHvA5DDYDpYXfb0drv1V2DkBkxtw/tEWVVlXWdC9pFYs5/jfh9dS/16vW7s6lTG+TfqsxSJHxkXXq/Xdr1eu4LsfD6P3vsT3N77DkL+zPm5jSdKL4zR3AxQd6rHkLkYlSowsrq7znzu6wSwdsMJOXmA5fBcjxtgMGBYHlr5zokhtsMCTgXLQOW4XC6dEyEMprL8mAQzXRgduix2yZzorxkYsDn3hB1VeMLGsXsVtgl2pW8S3svk0vw7R4hNaHvv4cACl5HFzwIH0Kc6zu4XjDPR/jpAVxWzO1Xk2DDb3vTcxeGU1iWZHkmIDWziWKvirCJ4Dravs6IJ/GG6cTqWdXDy+fArQDVVkLqkVjAoZIITdmmIqXwqa95N3+MGYoZQdRVNO53Y1xRkhO16vY7eu507Ca9lJnbGpxOemQhSw/AQsmmp5zU9BiU8G6wvX76M6/U6Pj4+do0Bz4CpgiknTUeDqwlKBmg3u4OVjrZ1A+rAcgaejWq6eJCvCYFDONSwOgHX4EQRw8lxbzDOdEK6gZ3Hk1b+8g2o1JFtKXyv/fEdTXuWjWXdAZiBp6ADeDrCFiim7B6ZFneeI7Gvm/PMkUDX67W7xI8b0D7/v8dA9qfN5oaCf74WZjH0mf1cmfY1Y0JUFmVrTWu8uzkNcLtEj7u5FXBTkfC6GOA5q8YMxO8KVvF6sAVGdcrUbsKODcQKkLMOMdmlxum642YrPm26AlhZW1YB1R+rrGswE8TaYAWeUMxdf+WjwSvZ2Ef3ytOyfn5+PpVPAaqOn43MtNBqvmjjxbjM4lZjZY4gqNMI5ktaW/sYKNwS+9lFQzGihmMCKPa7+Z0V6Eb0GRmobtpX8JljWu5FMLN5ja6hG9kwQgZqf5+1NH5UxzkFReCdWhJ8XdlGUkxO7HRlYRm4mVO43W7ter12TPJEw/rmEN3L5SKHIWZg9mz+pUoKOYq5bJTJdX2gme1UcxMZQFaEQIlHct32M+Y1BzGkGuzfiyAN9z+ugplZ1symCrDCYYkGxDTpI9RzBy0rHyeDUC1nWaeUaD9n4xkNyYMBDZtzZ3B++fJlY21XFDOcARJlabOyiS3uCpLI9jrZjCDkaVvcCCjwognKShWdzXZWlZMvVTgD8LpqlCLrqgbcB+qYwrgKYpT0ccCqbKyCValkEabn/FynogCrPKfqf51xJ7sGB2ZXcZmxoSOztjx300DZi7a0/2AIR0UlBag9SuDw6KcAzlaB7vHZvWpjK90dyrq6bKyDUZQbR0B05biLQkHIcSUmgIK+SwuqgHCnoio2RQU1yj+BnBy9pphVKLGyC7ZzFK1pxWK+E8IhVCWLN/uLtnUU4ayoYLoaANz8FdtaSvY4pV0BEW2ls61czqllBKpTyKgMAhrZ1cdc1RROtPmvWNkdcKZ7ZKxaWjiPLJMpp7OZKxA+rqG/oJLjxf0pnJlqLoDZo3gyU0mKGys2taKecj/d1C+rJSplBqlTyAqgR+D8KjKlmRL2gtUcAdCtsL+ijCNT1oqqqkH2OHEbG5sDFnUg5Aa+yLou2VU1ptj1S2ZQqv1ORZN9IWzRfgaRBxKoBE8UWyqlJFtrIc0AxNjSjed99CTY/XDfSzCz5M0IZoVEsWnPFNTsl8ooVC1TzbGgqFZNDSgVwKK+1sGDMKqxZCWGVMDysiEr1jVSQJUYwj5iHOlThdHt44SQg9CN+nl8D90NMIgAdgr46JqRiR9I8vRdFvbr17m/yxUMKjNLMiVUADwu2CWGhhi+F55TWM9M9cogzms1dnM4uOF/LAEYWdcqnM7yFmyq3IfwmOROd7Y1iFWtOjoY8To41mTV5IysgFFuRzsbWFGbNIIJCDv1dOo4lZG7jWBwRFtVTKuWyeCByJKOan8oZ3ep9XddNl0tDuaywLz9cXPYeDAA0SpkBO9sbVcTOVWldPv4uyzEkzxHtjvonHoSkFEWNoo1d8DhcQputd2ppNon4BzoAiJ1hBFQg0dVtdbGHHDQWushmNEQukLM2QO1G2Y8bgTXqFhcBJj7EjPgcPts8US8qPpPB/dXznOh5Z438tzH5ec6QgrOKrRRfKmysBmUDB+PhYabMlVPER+GCSITTzr7am2tArH3bgcEzPJm+cr5jJ4NnHNFDVrFXcI5Le9k5Jnw+bedbV+FfRzZIHaOOaOsLY0/7UGs58DjrGwKMIMFIGzOEW1/jGsdAtCN6hEAI4hBe9YXeRROBSVPAVPAqvIM5bx5hVKWAMP6zBRy3iescridVdFBinBxXDnG2GRY2XbCvp1lhvGtO9Bxu5h908XQu42lnSArMFdizMim8uwRCxPGnnOS8lwpnbOiDqTAjsrRN/PcoAScCbaACqVM40ylnjjTBs+bwWlAG23/UKbdkiwKWIQPGzWaczpoSlxPEj822cNWkpS7FyzsDrqpfgpG3jahw2vgbaSQAxuLWZYt7JzyNe8JoZpNAcvDFOdw0wqYT9AK1rZz/DdbSlLPp0ryIxgQJlK9AZlEq7IOXpohg9PIhrCng88JsOxiV4ZWAYfg4sikx/8ky2Z9l862uqwrfscIH8+ugTmVGyiddeVYUgEMn4GZzg14EwIsh9sx2cKKiWXReuOE5gzGOQgdlRKVVdlevqb279Xq0Qnsts2VDaBO0coezsruWtHApu6sKG4IBhN0aGU2kLrMKGRTN3HmbCDwKV14zvkMEDG4QfZVspVlaNU2mhc5TEZ3N1h/zqTheuLpW05ZWTGVjb3dbnNmxKZBnN8JqidaVLKAOyARNLS+MB54Z2+VaqoMLKroVBlngefnTPAcoHNWCSvlfA8CI0HEmBNBnBlXyMrzU7A7WVm94PPqQ2gmqKx+WDGsnvilmcSOBJqOK1nYyAIzuAyesq3UdSK3KfWcYKD95HmfYOU3qser2CtYEUA+FpfqdNvgPBZUBhDrGONRVlQsh8rLcaUCykHG0OOUwTlLBrsh5soEMGezi1E4HRVt1icp5wZEFXdibCkG8Y8vX75sbO4E0iom9z+hjSiOfy3DhpXItpVhE+UGQdvoWjtChmrGHf4YAzKgBNnGtuJxFCeGdhUAfQLLK8kBYAP6gvFJZajMG3Xkycy8KuC0q4Eyymwtwdxdv2M0mIBtK0LKnf640j00Auq4gUkdWGlhs22qJc6dZCsL19oxnlTJG4SYVRIGpD8TPFBuM6OElbS1pldid4mGAyN6ZIupbC5bXJN9fdpbThSxLUaI8IG1XIYBxW3Tjs6KQosKcxfxcQmdnwRGM10GnFcCy2XYunLMyAkdgk4mePiczsLygthcBut6goOqS7YVFXADLjaosB6s6ofcZWAZSIRYqSUkizYwttYab3vUOQ9w2HRxIIg8WwRVeE68xi4UtL3zRphxplzwuZrcqYCq1I3jPI5dnJIygEohMbPqVJSzrwzxBJTs5zN+ReUSgxikPQVF3JVBeNQxbHENrEMNvEdFZVV9lH9+ORGEsNZQpyTNc4C3AG7XF4ngzq+DrO2zbuaaOXgdaFcdkEotoSFBVX2qJ0C8OWZeG4KGlpghA0XfTOPCqV2qqwQ26QWfF2PMLhI2w1lVAa2aPsYd0za25MQRwgcZN6uQDCi+ZxiD4XEM2kZxOT41FnZnaRlcpZouzlRqqdbQVWopQoSB58RV50lBNrHi/AwXS5LrwDVlpY3Fc3ByiYGc52Trist6kOXdwInAQtJpp5QchyaquYOV7Su+fxVMaV3dc0RE2S6mUY0gLt2pMcYqrKIQ9w2l1gpQUMtQYcmmbt5DTNxdhnUCjQqtbK9SUSzvrC0mmhhE1e2FS2+oxypy/ZASutkmtjx3vcBC24PX65nbqkBCRhfjS9kIYPnee8cMagVOhI/3T1fAmdtAWZsCswTJCkQVNa0qWKSKPOpHAUhD9DrbVcyoYkwqhvh17vYAayXLQyKGYdxlUDFp494rBXRjYgO17DDYetNIUj/ezp6S0lnlpEwsWmJMkOwsKXeZKEAjIHn0EQJISaRBcO6UMINz7p/bEjjnw4ft+xmDvksxX4G2rIris7qaeKwAFMP2Oi7n4criuZwtpSUwpfLxSnORSrIqusc5ZFaXysqRWjiZ2DyAWEIL35tVSoQElFACjOeGGSE7AHEQgdo/LSvCOgGBvkxsmDbvlS3Fp5vhaB2TAGqRKrKKMrhLVpaGzEVjZ0OQxDhaCTA+QyRR1d15aQzrJntL3RibsipjG6jlgL4yqbS0sNYg1e84vhbBVrElK64CUcWYXDfKxhpIuxiVJZUxsbMy/uRBKTNRQ4kQ3LdRYLS0rJjRPlTPqY6gdJsEDc+aQXAn+HgsNUCbRuF0Oj0zwnA7bWDkbhO5Ens00qeQhS1laBMl5M/cAaxsLF8rKyql+Tf7ELLEGu/ixiimdCvo0TjfpjKwaggen4eh5v7LokLKbLuyvHhcZG8dhGrEDx7Hg93ZppJF7qBqO3iVveXEDQNInzeoe8Yq6ePaZBZ2JviM3W2UAGotekRCAGq4EkF1X3DOnR11yRsBL1tRa0PVcZiNFXZ2c34FskvomInQQ6lzpJoZbJxk43NwKJFBquJSsrByHydxKOnTxQASBmS3j+JMnsHSla3Ec6K9VWoJVn9zfjwOM7hqYAAqJQwE2a3nA48J2QGegRkpZNivSY+ys3EkKd4oJIwsvIHl3cWgLt5k4NH6OmtLWdpurOkwEMupYc7eMtDRhOcI2ui5JhVIzXzLyto/GAPuZoyo8wkoduVgJglCt7OhGbgID4Mq4si+63zUS1FuFFXFlqyaj2emHlLMcBqYu0FMuR28BbB7lOxRMSiCQXFhCKuwkhZ+pYDiGSgbsKKV8MiSRsuHSIWM9rklRiIlZZuqXjsQK8ooYJMgq3JKWVkhHbhsVxFUzthOWPkYijcbx54IKsSdT+uLr3crGKyoYgFiGR9iBk4kfloUX+JIlQRQqabmpgnhqtpQpb6RVQ1WH5DnrS4hEoGZqaerQ2dhFbz8XePxShmDbo70eISjoorO2vK8SJXI4SUmEU4zWKDzUDtWTYw7xXlbSTEj4FRg7zKnKoGRALv0Gs9Tgc1BpCywGZRQAtqVz2xrBcAMzEpfZwFSa2G5W0QBFjSMapWAEFa3HcGN7CxDzECyIkJ97qwrqWNTWVo876PPsjPkj2wvgroM5lLZKMETKVql/CvnWVFiFa/SzJUQwkoZsr67Y6vlSRV3/2tmNTOY3vnaxYwMuoPKqdzR1w7IqHymlPxaAThfU7Ko2ZXYj4AYJHL+kNdKwRQYESTRa5fsUZ/rVC1TMTyWVyYoqNtuzaHsMyv2tvoarxdfqwYgU1axFo/cnql1FGsqK+uAROV8BX4GU8WcZTATi2q7Qcyi0O0V+GhWBMNRUkn8H1SsWVE5By3Gi0ECqUeJoBfAtDa4amkdXG37AGP5Ggeb84p7UazpoKRzdFzeQ8HkoHGxprKy/Hpm5t12p47J6xTYDEz7uINEXSuxYXvFskYAc+ySxH9sf5ftKzU6IbwVBcUGg5e5FMCEXSErZR0wGayV19woM9guPjTqJdVTqR4uE4nJnLldWVkECCZLd2VLF+xtamex7IpiriSDUpvrpn9lrwGMCHyppMH+ps6LILsuFGUj1XEOXiqbqSHPUKnClpWV68kqtURVNDY4TNaocykoYeTU5ngGEQa/S1DnnE4AeXMcKjHPAmFVjCBENaeyLVNHfr3px8xUstJ94hIpfH4HKE/eDaArK6lSyVVFbdt1gxTIVk3pppVlFXi4pEhVBTObquohU85MLXn1iahvUkHJjSCMc01tLFveVVBx0DodM6jftCu7DOtIzYxrc0qp1JGP2ayYFz2Gb6HvMrO8cnGtV6Gjm3uImSfD2GpWK6uowbZGMxFKQCo1pOMtcMXFpRst+hXGoAomF3sSTBGgTglbBKWwsQ3tZqaYSp0Z1CimRDWFcCJUPYJ00BI5FkKYNoifuQxmN88SWVXWLMaUqqqgC0BmQJR6sk3u9NCf6jYLXxAfqsYEgVLAhRY2AtgtflZNFmFyhxdrLkAdWlk4D88M2ixHyepIdhMHrG/iR1ZGtq0MGpbDbRPYOXeSY1M6Ny4ZstvGSktK+XbFPATj2D371saPEsAMXhXrsZ0km/XStkhhMyBfsa6uXFZe2VCe+YMr1+GKgwrQyNYq1VRrB+EizAow6NsdNKcyVEkYeM73ys6q4kAHp6BiFklTkIrVC5oYV7uzwOGCz4UJ0Stq2lWMJy4wtb+RetL6tZFicnJmBw5UjCvXXMZVJX2MQkbf+XN5EWd78Vz8/JEsMZTBiKNzsm1inLRUQ74H4NidaqI68j5sAFgxcRveC7ieLJXfQYxjZZ2CsiWFewZXJmBIlZ1tdtrX4hSuateKso/RZOtOKW2nmq1oTzeK6dRWAWu2NRVb4hq0SXm1GvtugHrbr5IXqmSktg5CuDE2MSlPwsY5kNE2Wp3AqiZbWVLAxiBF+2iBZbuNj6MB6rsMLC7FyasaYDyo7KkoPyEtw3pEMXfPvxAJi2jAQQgjrz0rLIZSWZlIoNhwd5xK4AR9mYNjWAaLrnuImJeBVN9zBORObVvbr+mTTfFSEJLSRnHo7hEJoIi8MFqjxmvgmF5URZz4zLFgZZ8Ctu2X7ggVccKm9gVxIsOHqxXgNMKnFWZYnf1dBnOhayXq17QwFlWW09eNKyVJFmXqaONGA5aCegMbJ3UUkGY1ic3nKWgjq8qfVYGQG1gRt6rs62a6HiqqUOqdesK5NmX4nGofJoiE1d0dF9lVVkvT1/kEEaaCoYOwFpcVcoLM+7669PxC9rWqktH0sWUYld0VCpuBZ/stVRcGgy9WX2+U1Qthi9SzAqSxzZsy+OiFzBYnySGV6Gku44rD8BCOZBV3BvD5+AKRHNwMEsB6EzHnJpkTAeiUlEGkcECeB6GDZTp5YEJTlvdrknxYjTllMkfNtXwDjM7uVjK5JXUUn43rrqpK2jytaxHW0M5G8DC8rtHMYs7KSgduVQMGTYFqFvVS6rkD3sDJ46afdYFwoq11AOKCBLhvwoUgc8IGANycR6knZrdJPdsuxnyjfd3FovTlRMdEdtOl5CMV5EHsXQBis7TOwvIDZaGj2Vnpbh7cpK63VwYEMLwqbjzyl699sawFFkF1yqjUU31HfC6sW1ZFVFuXVXVgz9keEaw0ys1lWfm+azQAQSWA+hKYVfsZjPncAcUB9oIayy/UZXRNckDGji77GsWbvBo6tPrWPqOyVkBUq+INeqpzNdYs/u0ifh5qmpqIW+33JVSUcwY70KL4U9lYdU6ljtSls7lmfi9g3YzeQfVkaGFaV3ODCnaD2N8wsEDFklE3RzM3ZghdYkWHsszq70FIecnKkVkt8ezMzRq9bkGuKojRLBVSod3Y1yPqKgYW7JRQTPVyy5xIYLjOgxgT52RKJUY1dOrIiRd4futQx/A5AcSmEjz0vFWrkLzvbWAu9HOWbGgxFk1VNTpnBKk6TgwisI/HcxYXP1uAWO72ULFlBTq+aSu2VTUs6hrxM2CF+hEor1VIA9ZmFUaab1lSSgZsVs4sxzHlVLoJHr9H4DhONTkI1XC0/wiY2NoWAG5RlnHFnq6oLccpQddMuJ/O17JVA5OHLi0BqCztq7Y1++ucCd98qLI8MIHBV/cKjxQTme3hFBS3MyCqnDsuym2o80HjvFFTtrURmNaGJsmVahImjTsUXKtQZTAVs7Mvv8/+fzUrZAXcLJ6M4koe6XP0b6SmWWNDzyUpQ8bl+LtWx4tuqZ36cRYV3yuVxPNwvIiqiQCSmu7srgTzR6nkyhpCarXwFy1vGd5iP2cY06lFr5Njhhg1Y6+NB28ftbK83s8rf7kLJbKwDFPbLg25a0AdZJEiqr5phixKMDlRUtcssq1hriLqGoH+zeNgVm9OemjsETV8JdF0NHnkIFxWY1OB4Yrp7rtWJ7NgAAAPXklEQVQ3oNs5nplyVf8u2FoLu1JrHveaZWQjqAkshtFa2gzsSG3Zpkbvg3HafF9slPPlldjFlK80Gysm8Mr4MPhneNWENPGjAIpmilTPATdTRTXlCBYHYAQuPwA36xIpWtGN4q3Y2MhiGsUpuSSnlEJRD8PorC7CFYVw+F51qThgabxsTxWzCGY0ZSsb3lfqAy0OPNjNy8xiQQKsHYFQ2HBZVvVbBuq3m1oWKajqaonsM6uZUr6CjXWNZ0l5E3h3jURma6kP3MJIiy1Lm+kahQq41N2iZja5sjtlLYNZHZrH6qUGm4vMbDp6Rw2CFmvuyFkrBcCyMtFqBaECmsHoK9BZ2LA/lJcRqSaDqnaWbrZdGaz3DLgIvBln4woGztbyJGqslwxkhhHrTjTYFXCtOoKS8uLdofVdAbOylGU6nlYpXWZts4nXBq6WxJitMNokHUJnbnJplQm+aGpY2a5GMV2QD1hRubBPFKdumf5OHkLHz0F9luE5kjBjRa0nFE5CUGqHw32MmjZ6xkgINVnSnZ1VZStK2qKlRaLlQgK7uTq7JFXJwM+3SOEKyhZNI+tJ0I5qMYy9k2qJD7dVWdqKXa0CKNR0Ccjg+B2IYu2fcBZJZkMFgM11r0X92wilghFGgzVnexlqB7xL9mS29SiYUVY2nXOZjNBRsyDsQPRWW5hrZ4XcdC4HVWRbjgJr4sFofK5SzjQ7rhI1UebdPdEbj6sqIvTZQZ5va08rABsAW0UxeWytAk7A2KJ9ZpxzCioB24XFtYAeXYxr6anSqhLgppEqWbGwLunTgrV+IjWlL29ljaAl4EQMGsErp4apeZiquwRXLXAqOCeru32mmydc6oWTSWpFAGdzeTB8RTHVMEtlM90CbbQCYhPjq3egYr1FGdYIQjiuDGZ5zZ/AzobKGOyLxti6c4Rwtv2anyWlLICnlLhxJRXt6A5ebDBWFNONbxWZ2d02mnu4S9YECpeppV1zSWRBWxHYzVIv1CXSouwqqX3jBBBDZdYQbpTQW4ZQlS8r5kH4suSRmg2++3JN10x1PaAmEkmtYlEdeGpJEM6kOuCqCR22oSujj5IV2HdT0zj5prLKTjXFAPjdQlyq7xIBxAQP5yMczG4VxAKw0n6ilZ2QBce2pLulkuxxqnoIzFfgqyqjil9S1VNwBrFmeyeops8yOjZUybZdfS8CuaTIJumzs5tODaNtLpFDQ/PcJGweLhmeL1nB0KqiUDScsiUVD89Di3HtrKtSULw3RLiygZD+7sF8JTObgYsrGvDNUFRGl1iy0Ll1YkUc2aJYMog920I8qW6YDCg1Mqk0JHJFKXkbgbRreI+qpYNOZHrVcDUba7pjsphSJNtK6upgRNAVoOS0mugBeN4bIZgHhuPZ/s1ENaX6KsVr+YNrh1Nb7ipR0PE5zbNRegCbrHRUw6Yf07dLBJl1f8KB9as2V1nNqAsl62LBBhehwalerkHmB1JFIEZKSEusdl5JQj1nJlHXSCF342gJ9CYGrXelknJIXqVP8sD+qtplCR3XH2qfKq0ygMp+KnVkKxNlZ8m2YkIlVMiCnXUwl7qznBKSvQz3m3Pt6oQbXO5b5FixCh/fHxUQW/AEcK6zCNqKQnL9sywqmKuwvqSYzT/aPVNNpVyhvRW21aqciCsjdWvBwILUvh5VyCzbWoC1pJjJ680CWsl+udKB6T5RwG1mlohnlpbg47iz5U9ha0FGtmRLFYBtO99y97Ap0z+ZDTAog6kSLZsMHg/IFkkgp6CpvU2U0cYVSdnmkjwBdOmXbxTWNWzuIbipMioVxEckZEoahSOiy2M3K0jcC1LhVDwaqG0ZvkcWqCnrG4GIxykrqlbWdw6LQyBaZR8HmLRIhQWsHswD42ZXVLNkf9l+FlW0HVQ2lwFsC/Z1FdzlQR0KaPfo+Fdfu+/dwVRICu1CGR7AEIiAhc+AZUF0kOBaPxmUqg4i64vQnU4nFDYJ9Nz+1fVXveH9qmr+kPILx8oKcRV/BFbxbE0JMT0kSD4w6L/lNY8ocsqagVdU3A3MjxhxcGuqzsPH4irpaow1q6OyrVjvp9Npc59E91LldboYVzJWdimWfAW2SNEKcDaX2FmBLLA/uKxlmhh613Is1URQApbKfttwxL02q6Onx5pQxSbPojAg+v5hAnN6LHVRDXIsvKtRjiS0qJUyZTAXVbAK82ElFJWaQdVoqUC1Unt7BVaTQudM6SuqexjQJN4+0icaxv/utbKv83ETbT8H8gjcOKxOJmbUa6OOVXht3dFY6rHv9XoNzFLceEA1o8+pKm0LAHPHZ2rYKjFq0hfZFixsqHJgD3eD5n+U0kb1mFjXkn2lvMSSOsNE/CdIAKF0Sytq6urOHUN5gwg4GZosgbmggM5ucra2qrS2Ig1cbiBBcxYzgzUDNLCvL8GbZXNp6ORy3LmS+Kk83zRIAK6A1ioKa2I9NapIuiUFdfC9766PFZUtqUr6KbWk+zZU1a/ZrIXEztrjTOfz7hwKziCeXIaraHtbZIMz+2pGgazCmw4qWAFvEdhodYp0Xq0pV7G1YWYWbO4qhGq42+Z8BYtrLWvluNPpZAeaFFS1vubPgbgxsqcpnAaszBovKaFoDQ8BGtjfUOl4NAG2nmQV04feJgumvX2fsrQEWZghL0JnVdYkn3DOZIeRN86RqPWCmsvGVqEMRnwxQAxwS8EMYo3IzmY2+BCcLp4MKiuyuhImamlbZFcNoNl7tp+RHd18ZjQIRKyXdFRhN98/hyKqwXWNo7O1wiaXoHN108REZZWEq6grnIfjzeg8jdRf1XEL4kkXa5bBjKxoKaljBjeHlVxQ4GaycpW4lDOAKtnTxHAtOfzOtZwHAM7sqVXkV6yu6kap1nHkXKqWF/4XHqjenNKqBjpR3l1ch3Ejg1+EsgdQhsdG0B4FM9sWAVWpuAyiwTPleZxt9VyZVS2qXfReWqTAilpr9ApoWTjxymit7NwV4JTriZyOA9B0k7HFfULourmKYHVnRQvqGL5HMHdqFcR2qWpmcK6eTwx2dipWrviDilr+fKWq3OWRWdHKwA4eu8wjchbeRzFilqjjZN3ufCpfkJ0/scVpnYk6L0PI77lxdWCZ87WiWm7B/AGquQSnujGKsB8CJmiJq8q1pKIVWyqOiTK66r18BN8r74/AE71fdC3yPS2MxdOpnE1tlVxD9JmVOoggN+r4PjAXVFPa3Eg5jVJGFVUGNolH20GVrUB7BOySWq6WqYQdWR92pcFMYMwckbSgCKCqD67DiiWu1g8MQC9ByfcFqW1L+jL714qNCuznoSxt0da2gtWN1G8F0BK0NN0nuimelUF9dIdAfjO44UT3CjQLoUeLHJFTO3gmpRuIIOvwBQCbqNeo3qtZ9iF6xVK13GRlo4zqimq+CGdTiR1uRY8oqgE02hZBa79kZXPMquxRHKla2saZWN4mRqZUj0vLCKhkjKnqOQHNuSZVJoKvAqS1wpEquvWDC1B2ypwrCPsRMEPVTODMLJMDv6qeKXwi2JYV5Sq4qKyvgGsHCLiuj2jR59V8gMqSJ2FJZRXEHVRHj3sFPrct6OpqlW1GpatQdt0GvwfM6n63InsGVFhJGaBqgqqIV6IsXllZgySPq4R3bnt3wi5cv+cN2yqQLW1T95KYVsWWtKk4cB9W53WQQflQYR6Wl4HaJZjvVE0D5yvq+RKgZCs5qdBEP5sD94cAvQLlSgNaSMAtHx88BuNQ41zdFsX30zKbcs0MLD/ihkpQzl0wiTqKLTfbKmCmyYICnK0IbaieC4CG9iSyLQ7cIMGQwau6TKoq60Apl3WN40LZpca1CKKK9VQyyIEn8w0F8F6CL2h8o3ixGwC7s7EWzCOqmcApYxYD4jsAzVS0sl2t98pA7vrKophCVSonbYpgH6mvSn24pTBV4sdtV3BtMq5k82y+IADvUJ0uAlkCVTxIaPm+UNu/qkV4F1TzHXCGrXIAqItBKypqK99VtAOVs64O4ObX7pHLVCpYHcRmwvLR7TvYAKBBN58LGVzDuFz+hQbWgncQyCZAk+VbsPSouf93261iZgmfCpwRbAvqmSqriU2PwhjaoOyYqtIegVXViTsmyta6bGySpY3gyRrpIyAeaWDDxtpsXwKyalMDKNP7YBXMqEskUsi2uC8FNAPxAKTVfT1o6VzM0E0jF+1rWcUuHvdyg7vgoFplX8HpvHpMCOMRUPHzZkInsqlFKNX/EIO52E0SxSzOwob2VmRLW5D1XIU0rbgM1AzWgyC7fe8G7xUAK/taEBat7luqtyP7EmsaJQOj5F+mrnZfCuYCfBUAWwShyd6pMY/vAHG1UqOYpbI/gy5T0CMKm+UO3gFuC85dgfDVeguPDfITrIBLsLrcgdh3CFgFZjaKJ4Iv3F8ANEqvuxR1tVKOgLoCa1jxboBAkj6v7j/icFbA7f4rfRnQDLRViG13i0vqBQrYVqBbADZT0ZpiHoSzvQpopKIFS3sE1HfBWlHXd0H7LnArqvougMtljHBgZnh3Eoz/BKjLML4Z2Aq0+hEJr9jaVUBbvNzCIUiroC7AWmmFw4o5AK3MtB5VypZMSFgs05JyGVwlwBqsEGAAa2ZU1CjUexXGsE4rKriilBvFzOKKo3AuAroE6QFQU3u8YpNXwS5k+1TZt5UrwouN4KiUEw+k3ZWDp1RXHNRqXb21Ts39945yZSg3VnZFNQ9CF3XeZyr5DgBXKiwCMa2MxeTDYXgP1Fsf9QNKZc0k81RJk3r6EQ3rCmBVyLL75EjZ1pIVDHoFtiOAHoB0BdTVylqBsKKKS+AeBXJVLY+CXASuGvO/Auq7GuEjDfGKg1oKa1z/dmmi9I9SUGNhl0AtfulHAawoYrnSkmNXAVuGEhrEVXvUF+A5Ct2PqNOjDetyna4CmeUolmeXLN4Aq7C5Sj10Q7yjgl+t6CNxSRHmI5X+CpwreYB3Qfdqna4q21KdBuc4GoZsn49ZOOiVinwHqK9WzjvgeweEh2AU5+vtxZ9Cd9Wqkh49V18E5oj6vVyn0RStAyGIO5edXRKd5B0VGVXq2yr3xYp+5Ut+C4QJ4P1N339pQMjRejj4vb/Dcr6rQc3O/0rjmtZpeYCBiCHfCemRbNhbK/pNUPc3wfKy5f2D7OlL3/uPhve/oU4T0F8f+VNM2vyoiv0jK+KHQfdHq+0bncz4oz73/+Y6LbKw1o/5B7eOf1Rl/0du9B9tn/9bvrf/j+v0h6ttn2tp/r/4819y4/zv5391uvzzfwDifz6phT1MPgAAAABJRU5ErkJggg==\"); overflow: hidden; border-radius: 4px 4px 0 0; } .md2-color-picker .saturation-lightness:hover { cursor: crosshair; } .md2-color-picker .hue { width: 150px; height: 16px; border: none; top: 140px; left: 60px; position: absolute; background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAAAQCAYAAAD06IYnAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4AIWDwkUFWbCCAAAAFxJREFUaN7t0kEKg0AQAME2x83/n2qu5qCgD1iDhCoYdpnbQC9bbY1qVO/jvc6k3ad91s7/7F1/csgPrujuQ17BDYSFsBAWwgJhISyEBcJCWAgLhIWwEBYIi2f7Ar/1TCgFH2X9AAAAAElFTkSuQmCC\"); } .md2-color-picker .alpha { width: 150px; height: 16px; border: none; top: 165px; left: 60px; position: absolute; background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAAAQCAYAAAD06IYnAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4AIWDwYQlZMa3gAAAWVJREFUaN7tmEGO6jAQRCsOArHgBpyAJYGjcGocxAm4A2IHpmoWE0eBH+ezmFlNvU06shJ3W6VEelWMUQAIIF9f6qZpimsA1LYtS2uF51/u27YVAFZVRUkEoGHdPV/sIcbIEIIkUdI/9Xa7neyv61+SWFUVAVCSct00TWn2fv6u3+Ecfd3tXzy/0+nEUu+SPjo/kqzrmiQpScN6v98XewfA8/lMkiLJ2WxGSUopcT6fM6U0NX9/frfbjev1WtfrlZfLhYfDQQHG/AIOlnGwjINlHCxjHCzjYJm/TJWdCwquJXseFFzGwDNNeiKMOJTO8xQdDQaeB29+K9efeLaBo9J7vdvtJj1RjFFjfiv7qv95tjx/7leSQgh93e1ffMeIp6O+YQjho/N791t1XVOSSI7N//K+4/GoxWLBx+PB5/Op5XLJ+/3OlJJWqxU3m83ovv5iGf8KjYNlHCxjHCzjYBkHy5gf5gusvQU7U37jTAAAAABJRU5ErkJggg==\"); } .md2-color-picker .selected-color { width: 45px; height: 45px; top: 140px; left: 2%; position: absolute; border: 1px solid #cccccc; } .hex-text { position: absolute; top: 190px; left: 30px; font-size: 11px; } .hex-text input { float: left; width: 150px; border: 1px solid #a9a9a9; padding: 4px; } .hex-text div { text-align: center; color: #555; float: left; clear: left; width: 160px; margin-top: 4px; } .hsla-text, .rgba-text { position: absolute; top: 190px; left: 12px; font-size: 11px; } .hsla-text input, .rgba-text input { margin: 0 0 0 7px; float: left; width: 40px; border: 1px solid #a9a9a9; padding: 4px 0; } .hsla-text div, .rgba-text div { float: left; width: 40px; text-align: center; color: #555; margin-left: 7px; margin-top: 4px; } .hsla-text div:nth-child(5), .rgba-text div:nth-child(5) { clear: left; } .type-policy { position: absolute; top: 190px; left: 206px; background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAgCAYAAAAffCjxAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAACewAAAnsB01CO3AAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAIASURBVEiJ7ZY9axRRFIafsxMStrLQJpAgpBFhi+C9w1YSo00I6RZ/g9vZpBf/QOr4GyRgkSKNSrAadsZqQGwCkuAWyRZJsySwvhZ7N/vhzrgbLH3Ld8597jlzz50zJokyxXH8DqDVar0qi6v8BbItqSGpEcfxdlmsFWXkvX8AfAVWg3UKPEnT9GKujMzsAFgZsVaCN1VTQd77XUnrgE1kv+6935268WRpzrnHZvYRWC7YvC3pRZZl3wozqtVqiyH9IgjAspkd1Gq1xUJQtVrdB9ZKIAOthdg/Qc65LUk7wNIMoCVJO865rYFhkqjX6/d7vV4GPJwBMqofURS5JEk6FYBer/eeYb/Mo9WwFnPOvQbeAvfuAAK4BN4sAJtAG/gJIElmNuiJyba3EGNmZiPeZuEVmVell/Y/6N+CzDn3AXhEOOo7Hv/3BeAz8IzQkMPnJbuPx1wC+yYJ7/0nYIP5S/0FHKdp+rwCEEXRS/rf5Hl1Gtb2M0iSpCOpCZzPATmX1EySpHMLAsiy7MjMDoHrGSDXZnaYZdnRwBh7J91utwmczAA6CbG3GgPleX4jqUH/a1CktqRGnuc3hSCAMB32gKspkCtgb3KCQMmkjeP4WNJThrNNZval1WptTIsv7JtQ4tmIdRa8qSoEpWl6YWZNoAN0zKxZNPehpLSBZv2t+Q0CJ9lLnARQLAAAAABJRU5ErkJggg==\"); background-repeat: no-repeat; background-position: center; background-size: 8px 16px; width: 16px; height: 24px; } /*# sourceMappingURL=colorpicker.css.map */ "],
            providers: [MD2_COLORPICKER_CONTROL_VALUE_ACCESSOR],
            host: {
                'role': 'colorpicker',
                '[id]': 'id',
                '[tabindex]': 'disabled ? -1 : tabindex',
                '[class.md2-colorpicker-disabled]': 'disabled',
            },
            encapsulation: _angular_core.ViewEncapsulation.None
        }), 
        __metadata$31('design:paramtypes', [ColorpickerService])
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
            ngModule: Md2ColorpickerModule
        };
    };
    Md2ColorpickerModule = __decorate$31([
        _angular_core.NgModule({
            declarations: MD2_COLORPICKER_DIRECTIVES,
            imports: [_angular_common.CommonModule, _angular_forms.FormsModule],
            exports: MD2_COLORPICKER_DIRECTIVES,
            providers: [ColorpickerService]
        }), 
        __metadata$31('design:paramtypes', [])
    ], Md2ColorpickerModule);
    return Md2ColorpickerModule;
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
var __param$3 = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var Md2DataTable = (function () {
    function Md2DataTable() {
        this._dataLength = 0;
        this._activePage = 1;
        this.onDataChange = new _angular_core.EventEmitter();
        this.onSortChange = new _angular_core.EventEmitter();
        this.onPageChange = new _angular_core.EventEmitter();
        this.sortField = '';
        this.sortOrder = 'asc';
        this.isDataChanged = false;
        this.inputData = [];
        this.pageLength = 1000;
        this.activePageChange = new _angular_core.EventEmitter();
    }
    Object.defineProperty(Md2DataTable.prototype, "activePage", {
        get: function () { return this._activePage; },
        set: function (value) {
            this._activePage = value;
            this.activePageChange.emit(value);
        },
        enumerable: true,
        configurable: true
    });
    Md2DataTable.prototype.getSort = function () {
        return { sortField: this.sortField, sortOrder: this.sortOrder };
    };
    Md2DataTable.prototype.setSort = function (sortField, sortOrder) {
        if (this.sortField !== sortField || this.sortOrder !== sortOrder) {
            this.sortField = sortField;
            this.sortOrder = sortOrder;
            this.isDataChanged = true;
            this.onSortChange.emit({ sortField: sortField, sortOrder: sortOrder });
        }
    };
    Md2DataTable.prototype.getPage = function () {
        return {
            activePage: this.activePage,
            pageLength: this.pageLength,
            dataLength: this.inputData.length
        };
    };
    Md2DataTable.prototype.setPage = function (activePage, pageLength) {
        if (this.pageLength !== pageLength || this.activePage !== activePage) {
            this.activePage = this.activePage !== activePage ?
                activePage : this.calculateNewActivePage(this.pageLength, pageLength);
            this.pageLength = pageLength;
            this.isDataChanged = true;
            this.onPageChange.emit({
                activePage: this.activePage,
                pageLength: this.pageLength,
                dataLength: this.inputData.length
            });
        }
    };
    Md2DataTable.prototype.calculateNewActivePage = function (previousPageLength, currentPageLength) {
        var firstRowOnPage = (this.activePage - 1) * previousPageLength + 1;
        var newActivePage = Math.ceil(firstRowOnPage / currentPageLength);
        return newActivePage;
    };
    Md2DataTable.prototype.recalculatePage = function () {
        var _lastPage = Math.ceil(this.inputData.length / this.pageLength);
        this.activePage = _lastPage < this.activePage ? _lastPage : this.activePage;
        this.activePage = this.activePage || 1;
    };
    Md2DataTable.prototype.ngOnChanges = function (changes) {
        if (changes['inputData']) {
            this.inputData = changes['inputData'].currentValue || [];
            if (this.inputData.length > 0) {
                this.recalculatePage();
                this.onPageChange.emit({
                    activePage: this.activePage,
                    pageLength: this.pageLength,
                    dataLength: this.inputData.length
                });
                this.isDataChanged = true;
            }
        }
    };
    Md2DataTable.prototype.ngDoCheck = function () {
        if (this._dataLength !== this.inputData.length) {
            this._dataLength = this.inputData.length;
            this.fillData();
            this.recalculatePage();
            this.onPageChange.emit({
                activePage: this.activePage,
                pageLength: this.pageLength,
                dataLength: this.inputData.length
            });
            this.isDataChanged = true;
        }
        if (this.isDataChanged) {
            this.fillData();
            this.isDataChanged = false;
        }
    };
    Md2DataTable.prototype.fillData = function () {
        this.activePage = this.activePage;
        this.pageLength = this.pageLength;
        var offset = (this.activePage - 1) * this.pageLength;
        var data = this.inputData;
        var sortField = this.sortField;
        if (sortField) {
            data = data.sort(function (a, b) {
                var x = isNaN(a[sortField + '']) ? a[sortField + ''].toLowerCase() : a[sortField + ''];
                var y = isNaN(b[sortField + '']) ? b[sortField + ''].toLowerCase() : b[sortField + ''];
                return (x > y) ? 1 : (y > x) ? -1 : 0;
            });
        }
        if (this.sortOrder === 'desc') {
            data.reverse();
        }
        this.data = data.slice(offset, offset + this.pageLength);
    };
    __decorate$33([
        _angular_core.Input('md2-data'), 
        __metadata$33('design:type', Array)
    ], Md2DataTable.prototype, "inputData", void 0);
    __decorate$33([
        _angular_core.Input('md2-page-length'), 
        __metadata$33('design:type', Object)
    ], Md2DataTable.prototype, "pageLength", void 0);
    __decorate$33([
        _angular_core.Input(), 
        __metadata$33('design:type', Number)
    ], Md2DataTable.prototype, "activePage", null);
    __decorate$33([
        _angular_core.Output(), 
        __metadata$33('design:type', Object)
    ], Md2DataTable.prototype, "activePageChange", void 0);
    Md2DataTable = __decorate$33([
        _angular_core.Directive({
            selector: 'table[md2-data]',
            exportAs: 'Md2DataTable'
        }), 
        __metadata$33('design:paramtypes', [])
    ], Md2DataTable);
    return Md2DataTable;
}());
var Md2DataTableSortField = (function () {
    function Md2DataTableSortField(_md2Table) {
        var _this = this;
        this._md2Table = _md2Table;
        this._isAsc = false;
        this._isDesc = false;
        _md2Table.onSortChange.subscribe(function (event) {
            _this._isAsc = (event.sortField === _this.sortField && event.sortOrder === 'asc');
            _this._isDesc = (event.sortField === _this.sortField && event.sortOrder === 'desc');
        });
    }
    Md2DataTableSortField.prototype._sort = function () {
        if (this._isAsc) {
            this._md2Table.setSort(this.sortField, 'desc');
        }
        else {
            this._md2Table.setSort(this.sortField, 'asc');
        }
    };
    __decorate$33([
        _angular_core.Input('md2-sort-field'), 
        __metadata$33('design:type', String)
    ], Md2DataTableSortField.prototype, "sortField", void 0);
    Md2DataTableSortField = __decorate$33([
        _angular_core.Component({
            selector: '[md2-sort-field]',
            template: "\n    <span (click)=\"_sort()\">\n      <ng-content></ng-content>\n      <svg *ngIf=\"_isAsc\" width=\"24\"height=\"24\" viewBox=\"0 0 24 24\">\n        <path d=\"M7 14l5-5 5 5z\"/>\n      </svg>\n      <svg *ngIf=\"_isDesc\" width=\"24\"height=\"24\" viewBox=\"0 0 24 24\">\n        <path d=\"M7 10l5 5 5-5z\"/>\n      </svg>\n      <svg *ngIf=\"!_isAsc && !_isDesc\" width=\"24\"height=\"24\" viewBox=\"0 0 24 24\">\n        <path d=\"M7,10.5l5-5l5,5H7z\"/>\n        <path d=\"M7,12.5l5,5l5-5H7z\"/>\n      </svg>\n    </span>\n  ",
            styles: ["\n    [md2-sort-field] span {\n      position: relative;\n      display: block;\n      line-height: 24px;\n      white-space: nowrap;\n      cursor: pointer;\n      -webkit-user-select: none;\n      -moz-user-select: none;\n      -ms-user-select: none;\n      user-select: none;\n    }\n    [md2-sort-field] span svg {\n      display: inline-block;\n      vertical-align: middle;\n      fill: currentColor;\n    }\n  "],
            encapsulation: _angular_core.ViewEncapsulation.None
        }), 
        __metadata$33('design:paramtypes', [Md2DataTable])
    ], Md2DataTableSortField);
    return Md2DataTableSortField;
}());
var Md2Pagination = (function () {
    function Md2Pagination(_injectMd2Table) {
        var _this = this;
        this._injectMd2Table = _injectMd2Table;
        this._dataLength = 0;
        this.rows = [];
        this._onPageChange = function (event) {
            _this._activePage = event.activePage;
            _this._rows = event.pageLength;
            _this._dataLength = event.dataLength;
            _this._lastPage = Math.ceil(_this._dataLength / _this._rows);
        };
    }
    Md2Pagination.prototype.ngAfterViewInit = function () {
        this._md2Table = this.md2InputTable || this._injectMd2Table;
        this._onPageChange(this._md2Table.getPage());
        this._md2Table.onPageChange.subscribe(this._onPageChange);
    };
    Md2Pagination.prototype.ngOnChanges = function (changes) {
        this._md2Table = this.md2InputTable || this._injectMd2Table;
        this._onPageChange(this._md2Table.getPage());
        this._md2Table.onPageChange.subscribe(this._onPageChange);
    };
    Md2Pagination.prototype._setPage = function (page) {
        this._md2Table.setPage(page, this._rows);
    };
    Md2Pagination.prototype._setRows = function (rows) {
        this._md2Table.setPage(this._activePage, rows);
    };
    __decorate$33([
        _angular_core.Input('md2-rows'), 
        __metadata$33('design:type', Object)
    ], Md2Pagination.prototype, "rows", void 0);
    __decorate$33([
        _angular_core.Input('md2-table'), 
        __metadata$33('design:type', Md2DataTable)
    ], Md2Pagination.prototype, "md2InputTable", void 0);
    Md2Pagination = __decorate$33([
        _angular_core.Component({
            selector: 'md2-pagination',
            template: "<ul class=\"md2-pagination\" *ngIf=\"_dataLength > _rows\"> <li [class.disabled]=\"_activePage <= 1\" (click)=\"_setPage(1)\"> <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"> <path d=\"M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z\" /> </svg> </li> <li *ngIf=\"_activePage > 4 && _activePage + 1 > _lastPage\" (click)=\"_setPage(_activePage - 4)\"> {{_activePage-4}} </li> <li *ngIf=\"_activePage > 3 && _activePage + 2 > _lastPage\" (click)=\"_setPage(_activePage - 3)\"> {{_activePage-3}} </li> <li *ngIf=\"_activePage > 2\" (click)=\"_setPage(_activePage - 2)\"> {{_activePage-2}} </li> <li *ngIf=\"_activePage > 1\" (click)=\"_setPage(_activePage - 1)\"> {{_activePage-1}} </li> <li class=\"active\">{{_activePage}}</li> <li *ngIf=\"_activePage + 1 <= _lastPage\" (click)=\"_setPage(_activePage + 1)\"> {{_activePage+1}} </li> <li *ngIf=\"_activePage + 2 <= _lastPage\" (click)=\"_setPage(_activePage + 2)\"> {{_activePage+2}} </li> <li *ngIf=\"_activePage + 3 <= _lastPage && _activePage < 3\" (click)=\"_setPage(_activePage + 3)\"> {{_activePage+3}} </li> <li *ngIf=\"_activePage + 4 <= _lastPage && _activePage < 2\" (click)=\"_setPage(_activePage + 4)\"> {{_activePage+4}} </li> <li [class.disabled]=\"_activePage >= _lastPage\" (click)=\"_setPage(_lastPage)\"> <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"> <path d=\"M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z\" /> </svg> </li> </ul> <div class=\"md2-rows-select\" *ngIf=\"rows.length > 0\"> Rows per page: <select (change)=\"_setRows($event.target.value)\"> <option *ngFor=\"let row of rows\" [selected]=\"_rows===row\">{{row}}</option> </select> </div>",
            styles: ["md2-pagination { display: block; color: #0e59a5; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; } md2-pagination::before, md2-pagination::after { display: table; content: ''; } md2-pagination::after { clear: both; } md2-pagination .md2-pagination { display: inline-block; margin: 8px 0; padding: 0; } md2-pagination .md2-pagination li { position: relative; display: inline-block; width: 36px; vertical-align: top; text-align: center; line-height: 36px; border-radius: 100px; cursor: pointer; box-sizing: border-box; } md2-pagination .md2-pagination li:hover { background: rgba(0, 0, 0, 0.12); } md2-pagination .md2-pagination li.disabled, md2-pagination .md2-pagination li.disabled:hover { pointer-events: none; background: transparent; cursor: default; opacity: 0.5; } md2-pagination .md2-pagination li.active, md2-pagination .md2-pagination li.active:hover { background: #106cc8; color: #fff; cursor: default; } md2-pagination .md2-pagination li svg { fill: currentColor; margin-bottom: -7px; } md2-pagination .md2-rows-select { display: inline-block; margin: 8px 0; padding: 0; float: right; color: rgba(0, 0, 0, 0.54); line-height: 36px; } md2-pagination .md2-rows-select select { border: 0; outline: 0; } /*# sourceMappingURL=pagination.css.map */ "],
            encapsulation: _angular_core.ViewEncapsulation.None
        }),
        __param$3(0, _angular_core.Optional()), 
        __metadata$33('design:paramtypes', [Md2DataTable])
    ], Md2Pagination);
    return Md2Pagination;
}());
var MD2_DATA_TABLE_DIRECTIVES = [
    Md2DataTable,
    Md2DataTableSortField,
    Md2Pagination
];
var Md2DataTableModule = (function () {
    function Md2DataTableModule() {
    }
    Md2DataTableModule.forRoot = function () {
        return {
            ngModule: Md2DataTableModule,
            providers: []
        };
    };
    Md2DataTableModule = __decorate$33([
        _angular_core.NgModule({
            imports: [_angular_common.CommonModule],
            exports: MD2_DATA_TABLE_DIRECTIVES,
            declarations: MD2_DATA_TABLE_DIRECTIVES,
        }), 
        __metadata$33('design:paramtypes', [])
    ], Md2DataTableModule);
    return Md2DataTableModule;
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
var Md2DateUtil = (function () {
    function Md2DateUtil() {
    }
    /**
     * Gets the first day of the month for the given date's month.
     * @param {Date} date
     * @returns {Date}
     */
    Md2DateUtil.prototype.getFirstDateOfMonth = function (date) {
        return new Date(date.getFullYear(), date.getMonth(), 1, date.getHours(), date.getMinutes());
    };
    /**
     * Gets the number of days in the month for the given date's month.
     * @param date
     * @returns {number}
     */
    Md2DateUtil.prototype.getNumberOfDaysInMonth = function (date) {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };
    /**
     * Get an arbitrary date in the month after the given date's month.
     * @param date
     * @returns {Date}
     */
    Md2DateUtil.prototype.getDateInNextMonth = function (date) {
        return new Date(date.getFullYear(), date.getMonth() + 1, 1, date.getHours(), date.getMinutes());
    };
    /**
     * Get an arbitrary date in the month before the given date's month.
     * @param date
     * @returns {Date}
     */
    Md2DateUtil.prototype.getDateInPreviousMonth = function (date) {
        return new Date(date.getFullYear(), date.getMonth() - 1, 1, date.getHours(), date.getMinutes());
    };
    /**
     * Gets whether two dates have the same month and year.
     * @param {Date} d1
     * @param {Date} d2
     * @returns {boolean}
     */
    Md2DateUtil.prototype.isSameMonthAndYear = function (d1, d2) {
        return d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth();
    };
    /**
     * Gets whether two dates are the same day (not not necesarily the same time).
     * @param {Date} d1
     * @param {Date} d2
     * @returns {boolean}
     */
    Md2DateUtil.prototype.isSameDay = function (d1, d2) {
        return d1.getDate() == d2.getDate() && this.isSameMonthAndYear(d1, d2);
    };
    /**
     * Gets whether a date is in the month immediately after some date.
     * @param {Date} startDate The date from which to compare.
     * @param {Date} endDate The date to check.
     * @returns {boolean}
     */
    Md2DateUtil.prototype.isInNextMonth = function (startDate, endDate) {
        var nextMonth = this.getDateInNextMonth(startDate);
        return this.isSameMonthAndYear(nextMonth, endDate);
    };
    /**
     * Gets whether a date is in the month immediately before some date.
     * @param {Date} startDate The date from which to compare.
     * @param {Date} endDate The date to check.
     * @returns {boolean}
     */
    Md2DateUtil.prototype.isInPreviousMonth = function (startDate, endDate) {
        var previousMonth = this.getDateInPreviousMonth(startDate);
        return this.isSameMonthAndYear(endDate, previousMonth);
    };
    /**
     * Gets the midpoint between two dates.
     * @param {Date} d1
     * @param {Date} d2
     * @returns {Date}
     */
    Md2DateUtil.prototype.getDateMidpoint = function (d1, d2) {
        return this.createDateAtMidnight((d1.getTime() + d2.getTime()) / 2);
    };
    /**
     * Gets the week of the month that a given date occurs in.
     * @param {Date} date
     * @returns {number} Index of the week of the month (zero-based).
     */
    Md2DateUtil.prototype.getWeekOfMonth = function (date) {
        var firstDayOfMonth = this.getFirstDateOfMonth(date);
        return Math.floor((firstDayOfMonth.getDay() + date.getDate() - 1) / 7);
    };
    /**
     * Gets a new date incremented by the given number of minutes. Number of minutes can be negative.
     * @param {Date} date
     * @param {number} numberOfMinutes
     * @returns {Date}
     */
    Md2DateUtil.prototype.incrementMinutes = function (date, numberOfMinutes) {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes() + numberOfMinutes);
    };
    /**
     * Gets a new date incremented by the given number of hours. Number of hours can be negative.
     * @param {Date} date
     * @param {number} numberOfHours
     * @returns {Date}
     */
    Md2DateUtil.prototype.incrementHours = function (date, numberOfHours) {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours() + numberOfHours, date.getMinutes());
    };
    /**
     * Gets a new date incremented by the given number of days. Number of days can be negative.
     * @param {Date} date
     * @param {number} numberOfDays
     * @returns {Date}
     */
    Md2DateUtil.prototype.incrementDays = function (date, numberOfDays) {
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
    Md2DateUtil.prototype.incrementMonths = function (date, numberOfMonths) {
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
    Md2DateUtil.prototype.getMonthDistance = function (start, end) {
        return (12 * (end.getFullYear() - start.getFullYear())) + (end.getMonth() - start.getMonth());
    };
    /**
     * Gets the last day of the month for the given date.
     * @param {Date} date
     * @returns {Date}
     */
    Md2DateUtil.prototype.getLastDateOfMonth = function (date) {
        return new Date(date.getFullYear(), date.getMonth(), this.getNumberOfDaysInMonth(date), date.getHours(), date.getMinutes());
    };
    /**
     * Checks whether a date is valid.
     * @param {Date} date
     * @return {boolean} Whether the date is a valid Date.
     */
    Md2DateUtil.prototype.isValidDate = function (date) {
        return date != null && date.getTime && !isNaN(date.getTime());
    };
    /**
     * Sets a date's time to midnight.
     * @param {Date} date
     */
    Md2DateUtil.prototype.setDateTimeToMidnight = function (date) {
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
    Md2DateUtil.prototype.createDateAtMidnight = function (value) {
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
    Md2DateUtil.prototype.isDateWithinRange = function (date, minDate, maxDate) {
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
    Md2DateUtil.prototype.incrementYears = function (date, numberOfYears) {
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
    Md2DateUtil.prototype.getYearDistance = function (start, end) {
        return end.getFullYear() - start.getFullYear();
    };
    /**
     * Clamps a date between a minimum and a maximum date.
     * @param {Date} date Date to be clamped
     * @param {Date=} minDate Minimum date
     * @param {Date=} maxDate Maximum date
     * @return {Date}
     */
    Md2DateUtil.prototype.clampDate = function (date, minDate, maxDate) {
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
    Md2DateUtil.prototype.getTimestampFromNode = function (node) {
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
    Md2DateUtil.prototype.isMonthWithinRange = function (date, minDate, maxDate) {
        var month = date.getMonth();
        var year = date.getFullYear();
        return (!minDate || minDate.getFullYear() < year || minDate.getMonth() <= month) &&
            (!maxDate || maxDate.getFullYear() > year || maxDate.getMonth() >= month);
    };
    Md2DateUtil = __decorate$35([
        _angular_core.Injectable(), 
        __metadata$35('design:paramtypes', [])
    ], Md2DateUtil);
    return Md2DateUtil;
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
var __param$4 = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var nextId$3 = 0;
var Md2Datepicker = (function () {
    function Md2Datepicker(_dateUtil, element, _control) {
        this._dateUtil = _dateUtil;
        this.element = element;
        this._control = _control;
        // private mouseMoveListener: any;
        // private mouseUpListener: any;
        this._value = null;
        this._readonly = false;
        this._required = false;
        this._disabled = false;
        this._isInitialized = false;
        this._onChange = function (value) { };
        this._onTouched = function () { };
        this._isHoursVisible = true;
        this.months = ['January', 'February', 'March', 'April',
            'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        this._days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday',
            'Friday', 'Saturday'];
        this._hours = [];
        this._minutes = [];
        this._prevMonth = 1;
        this._currMonth = 2;
        this._nextMonth = 3;
        this._years = [];
        this._dates = [];
        this.today = new Date();
        this._displayDate = null;
        this._selectedDate = null;
        this._viewDay = { year: 0, month: '', date: '', day: '', hour: '', minute: '' };
        this._viewValue = '';
        this._clock = {
            dialRadius: 120,
            outerRadius: 99,
            innerRadius: 66,
            tickRadius: 17,
            hand: { x: 0, y: 0 },
            x: 0, y: 0,
            dx: 0, dy: 0,
            moved: false
        };
        this._minDate = null;
        this._maxDate = null;
        this.change = new _angular_core.EventEmitter();
        this.type = 'date';
        this.name = '';
        this.id = 'md2-datepicker-' + (++nextId$3);
        this.format = this.type === 'date' ?
            'DD/MM/YYYY' : this.type === 'time' ? 'HH:mm' : this.type === 'datetime' ?
            'DD/MM/YYYY HH:mm' : 'DD/MM/YYYY';
        this.tabindex = 0;
        this.getYears();
        this.generateClock();
        // this.mouseMoveListener = (event: MouseEvent) => { this.onMouseMoveClock(event); };
        // this.mouseUpListener = (event: MouseEvent) => { this.onMouseUpClock(event); };
        if (this._control) {
            this._control.valueAccessor = this;
        }
    }
    Md2Datepicker.prototype.ngAfterContentInit = function () {
        this._isInitialized = true;
        this._isCalendarVisible = this.type !== 'time' ? true : false;
    };
    Object.defineProperty(Md2Datepicker.prototype, "readonly", {
        get: function () { return this._readonly; },
        set: function (value) { this._readonly = coerceBooleanProperty(value); },
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
            this._minDate = new Date(value);
            this._minDate.setHours(0, 0, 0, 0);
            this.getYears();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Datepicker.prototype, "max", {
        set: function (value) {
            this._maxDate = new Date(value);
            this._maxDate.setHours(0, 0, 0, 0);
            this.getYears();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Datepicker.prototype, "value", {
        get: function () { return this._value; },
        set: function (value) {
            if (value && value !== this._value) {
                if (this._dateUtil.isValidDate(value)) {
                    this._value = value;
                }
                else {
                    if (this.type === 'time') {
                        this._value = new Date('1-1-1 ' + value);
                    }
                    else {
                        this._value = new Date(value);
                    }
                }
                this._viewValue = this._formatDate(this._value);
                var date = '';
                if (this.type !== 'time') {
                    date += this._value.getFullYear() + '-' + (this._value.getMonth() + 1) +
                        '-' + this._value.getDate();
                }
                if (this.type === 'datetime') {
                    date += ' ';
                }
                if (this.type !== 'date') {
                    date += this._value.getHours() + ':' + this._value.getMinutes();
                }
                if (this._isInitialized) {
                    if (this._control) {
                        this._onChange(date);
                    }
                    this.change.emit(date);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Datepicker.prototype, "displayDate", {
        get: function () {
            if (this._displayDate && this._dateUtil.isValidDate(this._displayDate)) {
                return this._displayDate;
            }
            else {
                return this.today;
            }
        },
        set: function (date) {
            if (date && this._dateUtil.isValidDate(date)) {
                if (this._minDate && this._minDate > date) {
                    date = this._minDate;
                }
                if (this._maxDate && this._maxDate < date) {
                    date = this._maxDate;
                }
                this._displayDate = date;
                this._viewDay = {
                    year: date.getFullYear(),
                    month: this.months[date.getMonth()],
                    date: this._prependZero(date.getDate() + ''),
                    day: this._days[date.getDay()],
                    hour: this._prependZero(date.getHours() + ''),
                    minute: this._prependZero(date.getMinutes() + '')
                };
            }
        },
        enumerable: true,
        configurable: true
    });
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
        if (this._isDatepickerVisible) {
            event.preventDefault();
            event.stopPropagation();
            switch (event.keyCode) {
                case TAB:
                case ESCAPE:
                    this._onBlur();
                    break;
            }
            var displayDate = this.displayDate;
            if (this._isYearsVisible) {
                switch (event.keyCode) {
                    case ENTER:
                    case SPACE:
                        this._onClickOk();
                        break;
                    case DOWN_ARROW:
                        if (this.displayDate.getFullYear() < (this.today.getFullYear() + 100)) {
                            this.displayDate = this._dateUtil.incrementYears(displayDate, 1);
                            this._scrollToSelectedYear();
                        }
                        break;
                    case UP_ARROW:
                        if (this.displayDate.getFullYear() > 1900) {
                            this.displayDate = this._dateUtil.incrementYears(displayDate, -1);
                            this._scrollToSelectedYear();
                        }
                        break;
                }
            }
            else if (this._isCalendarVisible) {
                switch (event.keyCode) {
                    case ENTER:
                    case SPACE:
                        this.setDate(this.displayDate);
                        break;
                    case RIGHT_ARROW:
                        this.displayDate = this._dateUtil.incrementDays(displayDate, 1);
                        break;
                    case LEFT_ARROW:
                        this.displayDate = this._dateUtil.incrementDays(displayDate, -1);
                        break;
                    case PAGE_DOWN:
                        this.displayDate = this._dateUtil.incrementMonths(displayDate, 1);
                        break;
                    case PAGE_UP:
                        this.displayDate = this._dateUtil.incrementMonths(displayDate, -1);
                        break;
                    case DOWN_ARROW:
                        this.displayDate = this._dateUtil.incrementDays(displayDate, 7);
                        break;
                    case UP_ARROW:
                        this.displayDate = this._dateUtil.incrementDays(displayDate, -7);
                        break;
                    case HOME:
                        this.displayDate = this._dateUtil.getFirstDateOfMonth(displayDate);
                        break;
                    case END:
                        this.displayDate = this._dateUtil.getLastDateOfMonth(displayDate);
                        break;
                }
                if (!this._dateUtil.isSameMonthAndYear(displayDate, this.displayDate)) {
                    this.generateCalendar();
                }
            }
            else if (this._isHoursVisible) {
                switch (event.keyCode) {
                    case ENTER:
                    case SPACE:
                        this.setHour(this.displayDate.getHours());
                        break;
                    case UP_ARROW:
                        this.displayDate = this._dateUtil.incrementHours(displayDate, 1);
                        this._resetClock();
                        break;
                    case DOWN_ARROW:
                        this.displayDate = this._dateUtil.incrementHours(displayDate, -1);
                        this._resetClock();
                        break;
                }
            }
            else {
                switch (event.keyCode) {
                    case ENTER:
                    case SPACE:
                        this.setMinute(this.displayDate.getMinutes());
                        break;
                    case UP_ARROW:
                        this.displayDate = this._dateUtil.incrementMinutes(displayDate, 1);
                        this._resetClock();
                        break;
                    case DOWN_ARROW:
                        this.displayDate = this._dateUtil.incrementMinutes(displayDate, -1);
                        this._resetClock();
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
                    this._showDatepicker();
                    break;
            }
        }
    };
    Md2Datepicker.prototype._onBlur = function () {
        this._isDatepickerVisible = false;
        this._isYearsVisible = false;
        this._isCalendarVisible = this.type !== 'time' ? true : false;
        this._isHoursVisible = true;
        this._onTouched();
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
        var startYear = this._minDate ? this._minDate.getFullYear() : 1900, endYear = this._maxDate ? this._maxDate.getFullYear() : this.today.getFullYear() + 100;
        this._years = [];
        for (var i = startYear; i <= endYear; i++) {
            this._years.push(i);
        }
    };
    Md2Datepicker.prototype._scrollToSelectedYear = function () {
        var _this = this;
        setTimeout(function () {
            var yearContainer = _this.element.nativeElement.querySelector('.md2-years'), selectedYear = _this.element.nativeElement.querySelector('.md2-year.selected');
            yearContainer.scrollTop = (selectedYear.offsetTop + 20) - yearContainer.clientHeight / 2;
        }, 0);
    };
    /**
     * select year
     * @param year
     */
    Md2Datepicker.prototype._setYear = function (year) {
        var date = this.displayDate;
        this.displayDate = new Date(year, date.getMonth(), date.getDate(), date.getHours(), date.getMinutes());
        this.generateCalendar();
        this._isYearsVisible = false;
        // this.isCalendarVisible = true;
    };
    /**
     * Display Datepicker
     */
    Md2Datepicker.prototype._showDatepicker = function () {
        if (this.disabled || this.readonly) {
            return;
        }
        this._isDatepickerVisible = true;
        this._selectedDate = this.value || new Date(1, 0, 1);
        this.displayDate = this.value || this.today;
        this.generateCalendar();
        this._resetClock();
        this.element.nativeElement.focus();
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
        this._isHoursVisible = value;
        this._resetClock();
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
            this.setDate(this.displayDate);
        }
        else if (this._isHoursVisible) {
            this._isHoursVisible = false;
            this._resetClock();
        }
        else {
            this.value = this.displayDate;
            this._onBlur();
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
            this.setDate(new Date(date.dateObj.year, date.dateObj.month, date.dateObj.day, this.displayDate.getHours(), this.displayDate.getMinutes()));
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
            this._onBlur();
        }
        else {
            this._selectedDate = date;
            this.displayDate = date;
            this._isCalendarVisible = false;
            this._isHoursVisible = true;
            this._resetClock();
        }
    };
    /**
     * Update Month
     * @param noOfMonths increment number of months
     */
    Md2Datepicker.prototype._updateMonth = function (noOfMonths) {
        this.displayDate = this._dateUtil.incrementMonths(this.displayDate, noOfMonths);
        this.generateCalendar();
    };
    /**
     * Check is Before month enabled or not
     * @return boolean
     */
    Md2Datepicker.prototype._isBeforeMonth = function () {
        return !this._minDate ? true :
            this._minDate && this._dateUtil.getMonthDistance(this.displayDate, this._minDate) < 0;
    };
    /**
     * Check is After month enabled or not
     * @return boolean
     */
    Md2Datepicker.prototype._isAfterMonth = function () {
        return !this._maxDate ? true :
            this._maxDate && this._dateUtil.getMonthDistance(this.displayDate, this._maxDate) > 0;
    };
    /**
     * Check the date is enabled or not
     * @param date Date Object
     * @return boolean
     */
    Md2Datepicker.prototype._isDisabledDate = function (date) {
        if (this._minDate && this._maxDate) {
            return (this._minDate > date) || (this._maxDate < date);
        }
        else if (this._minDate) {
            return (this._minDate > date);
        }
        else if (this._maxDate) {
            return (this._maxDate < date);
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
        var year = this.displayDate.getFullYear();
        var month = this.displayDate.getMonth();
        this._dates.length = 0;
        var firstDayOfMonth = this._dateUtil.getFirstDateOfMonth(this.displayDate);
        var numberOfDaysInMonth = this._dateUtil.getNumberOfDaysInMonth(this.displayDate);
        var numberOfDaysInPrevMonth = this._dateUtil.getNumberOfDaysInMonth(this._dateUtil.incrementMonths(this.displayDate, -1));
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
                        today: this._dateUtil.isSameDay(this.today, date),
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
                        today: this._dateUtil.isSameDay(this.today, date),
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
                        today: this._dateUtil.isSameDay(this.today, date),
                        disabled: this._isDisabledDate(date)
                    });
                    dayNbr++;
                }
            }
            this._dates.push(week);
        }
    };
    /**
     * Select Hour
     * @param event Event Object
     * @param hour number of hours
     */
    Md2Datepicker.prototype._onClickHour = function (event, hour) {
        event.preventDefault();
        event.stopPropagation();
        this.setHour(hour);
    };
    /**
     * Select Minute
     * @param event Event Object
     * @param minute number of minutes
     */
    Md2Datepicker.prototype._onClickMinute = function (event, minute) {
        event.preventDefault();
        event.stopPropagation();
        this.setMinute(minute);
    };
    /**
     * Set hours
     * @param hour number of hours
     */
    Md2Datepicker.prototype.setHour = function (hour) {
        var date = this.displayDate;
        this._isHoursVisible = false;
        this.displayDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), hour, date.getMinutes());
        this._resetClock();
    };
    /**
     * Set minutes
     * @param minute number of minutes
     */
    Md2Datepicker.prototype.setMinute = function (minute) {
        var date = this.displayDate;
        this.displayDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), minute);
        this._selectedDate = this.displayDate;
        this.value = this._selectedDate;
        this._onBlur();
    };
    // private onMouseDownClock(event: MouseEvent) {
    //  document.addEventListener('mousemove', this.mouseMoveListener);
    //  document.addEventListener('mouseup', this.mouseUpListener);
    //  // let offset = this.offset(event.currentTarget)
    //  // this._clock.x = offset.left + this._clock.dialRadius;
    //  // this._clock.y = offset.top + this._clock.dialRadius;
    //  // this._clock.dx = event.pageX - this._clock.x;
    //  // this._clock.dy = event.pageY - this._clock.y;
    //  // let z = Math.sqrt(this._clock.dx * this._clock.dx + this._clock.dy * this._clock.dy);
    //  // if (z < this._clock.outerRadius - this._clock.tickRadius || z > this._clock.outerRadius
    //  //  + this._clock.tickRadius) { return; }
    //  // event.preventDefault();
    //  // this.setClockHand(this._clock.dx, this._clock.dy);
    //  // // this.onMouseMoveClock = this.onMouseMoveClock.bind(this);
    //  // // this.onMouseUpClock = this.onMouseUpClock.bind(this);
    //  // document.addEventListener('mousemove', this.onMouseMoveClock);
    //  // document.addEventListener('mouseup', this.onMouseUpClock);
    // }
    // onMouseMoveClock(event: MouseEvent) {
    //   event.preventDefault();
    //   event.stopPropagation();
    //   let x = event.pageX - this._clock.x,
    //     y = event.pageY - this._clock.y;
    //   this._clock.moved = true;
    //   this._setClockHand(x, y);// , false, true
    //   // if (!moved && x === dx && y === dy) {
    //   //   // Clicking in chrome on windows will trigger a mousemove event
    //   //   return;
    //   // }
    // }
    // onMouseUpClock(event: MouseEvent) {
    //   event.preventDefault();
    //   document.removeEventListener('mousemove', this.mouseMoveListener);
    //   document.removeEventListener('mouseup', this.mouseUpListener);
    //   // let space = false;
    //   let x = event.pageX - this._clock.x,
    //     y = event.pageY - this._clock.y;
    //   if ((space || this._clockEvent.moved) && x === this._clockEvent.dx && 
    //    y === this._clockEvent.dy) {
    //     this.setClockHand(x, y);
    //   }
    //   // if (this._isHoursVisible) {
    //   //   // self.toggleView('minutes', duration / 2);
    //   // } else {
    //   //   // if (options.autoclose) {
    //   //   //   self.minutesView.addClass('clockpicker-dial-out');
    //   //   //   setTimeout(function () {
    //   //   //     self.done();
    //   //   //   }, duration / 2);
    //   //   // }
    //   // }
    //   if ((space || moved) && x === dx && y === dy) {
    //     self.setHand(x, y);
    //   }
    //   if (self.currentView === 'hours') {
    //     self.toggleView('minutes', duration / 2);
    //   } else {
    //     if (options.autoclose) {
    //       self.minutesView.addClass('clockpicker-dial-out');
    //       setTimeout(function () {
    //         self.done();
    //       }, duration / 2);
    //     }
    //   }
    //   plate.prepend(canvas);
    //   // Reset cursor style of body
    //   clearTimeout(movingTimer);
    //   $body.removeClass('clockpicker-moving');
    // }
    /**
     * reser clock hands
     */
    Md2Datepicker.prototype._resetClock = function () {
        var hour = this.displayDate.getHours();
        var minute = this.displayDate.getMinutes();
        var value = this._isHoursVisible ? hour : minute, unit = Math.PI / (this._isHoursVisible ? 6 : 30), radian = value * unit, radius = this._isHoursVisible && value > 0 && value < 13 ?
            this._clock.innerRadius : this._clock.outerRadius, x = Math.sin(radian) * radius, y = -Math.cos(radian) * radius;
        this._setClockHand(x, y);
    };
    /**
     * set clock hand
     * @param x number of x position
     * @param y number of y position
     */
    Md2Datepicker.prototype._setClockHand = function (x, y) {
        var radian = Math.atan2(x, y), unit = Math.PI / (this._isHoursVisible ? 6 : 30), z = Math.sqrt(x * x + y * y), inner = this._isHoursVisible && z < (this._clock.outerRadius + this._clock.innerRadius) / 2, radius = inner ? this._clock.innerRadius : this._clock.outerRadius, value = 0;
        if (radian < 0) {
            radian = Math.PI * 2 + radian;
        }
        value = Math.round(radian / unit);
        radian = value * unit;
        if (this._isHoursVisible) {
            if (value === 12) {
                value = 0;
            }
            value = inner ? (value === 0 ? 12 : value) : value === 0 ? 0 : value + 12;
        }
        else {
            if (value === 60) {
                value = 0;
            }
        }
        this._clock.hand = {
            x: Math.sin(radian) * radius,
            y: Math.cos(radian) * radius
        };
    };
    /**
     * render Click
     */
    Md2Datepicker.prototype.generateClock = function () {
        this._hours.length = 0;
        for (var i = 0; i < 24; i++) {
            var radian = i / 6 * Math.PI;
            var inner = i > 0 && i < 13, radius = inner ? this._clock.innerRadius : this._clock.outerRadius;
            this._hours.push({
                hour: i === 0 ? '00' : i,
                top: this._clock.dialRadius - Math.cos(radian) * radius - this._clock.tickRadius,
                left: this._clock.dialRadius + Math.sin(radian) * radius - this._clock.tickRadius
            });
        }
        for (var i = 0; i < 60; i += 5) {
            var radian = i / 30 * Math.PI;
            this._minutes.push({
                minute: i === 0 ? '00' : i,
                top: this._clock.dialRadius - Math.cos(radian) * this._clock.outerRadius -
                    this._clock.tickRadius,
                left: this._clock.dialRadius + Math.sin(radian) * this._clock.outerRadius -
                    this._clock.tickRadius
            });
        }
    };
    /**
     * format date
     * @param date Date Object
     * @return string with formatted date
     */
    Md2Datepicker.prototype._formatDate = function (date) {
        return this.format
            .replace('YYYY', date.getFullYear() + '')
            .replace('MM', this._prependZero((date.getMonth() + 1) + ''))
            .replace('DD', this._prependZero(date.getDate() + ''))
            .replace('HH', this._prependZero(date.getHours() + ''))
            .replace('mm', this._prependZero(date.getMinutes() + ''))
            .replace('ss', this._prependZero(date.getSeconds() + ''));
    };
    /**
     * Prepend Zero
     * @param value String value
     * @return string with prepend Zero
     */
    Md2Datepicker.prototype._prependZero = function (value) {
        return parseInt(value) < 10 ? '0' + value : value;
    };
    /**
     * Get Offset
     * @param element HtmlElement
     * @return top, left offset from page
     */
    Md2Datepicker.prototype._offset = function (element) {
        var top = 0, left = 0;
        do {
            top += element.offsetTop || 0;
            left += element.offsetLeft || 0;
            element = element.offsetParent;
        } while (element);
        return {
            top: top,
            left: left
        };
    };
    Md2Datepicker.prototype.writeValue = function (value) {
        if (value && value !== this._value) {
            if (this._dateUtil.isValidDate(value)) {
                this._value = value;
            }
            else {
                if (this.type === 'time') {
                    this._value = new Date('1-1-1 ' + value);
                }
                else {
                    this._value = new Date(value);
                }
            }
            this._viewValue = this._formatDate(this._value);
            var date = '';
            if (this.type !== 'time') {
                date += this._value.getFullYear() + '-' + (this._value.getMonth() + 1) +
                    '-' + this._value.getDate();
            }
            if (this.type === 'datetime') {
                date += ' ';
            }
            if (this.type !== 'date') {
                date += this._value.getHours() + ':' + this._value.getMinutes();
            }
        }
    };
    Md2Datepicker.prototype.registerOnChange = function (fn) { this._onChange = fn; };
    Md2Datepicker.prototype.registerOnTouched = function (fn) { this._onTouched = fn; };
    __decorate$34([
        _angular_core.Output(), 
        __metadata$34('design:type', _angular_core.EventEmitter)
    ], Md2Datepicker.prototype, "change", void 0);
    __decorate$34([
        _angular_core.Input(), 
        __metadata$34('design:type', Object)
    ], Md2Datepicker.prototype, "type", void 0);
    __decorate$34([
        _angular_core.Input(), 
        __metadata$34('design:type', String)
    ], Md2Datepicker.prototype, "name", void 0);
    __decorate$34([
        _angular_core.Input(), 
        __metadata$34('design:type', String)
    ], Md2Datepicker.prototype, "id", void 0);
    __decorate$34([
        _angular_core.Input(), 
        __metadata$34('design:type', String)
    ], Md2Datepicker.prototype, "placeholder", void 0);
    __decorate$34([
        _angular_core.Input(), 
        __metadata$34('design:type', String)
    ], Md2Datepicker.prototype, "format", void 0);
    __decorate$34([
        _angular_core.Input(), 
        __metadata$34('design:type', Number)
    ], Md2Datepicker.prototype, "tabindex", void 0);
    __decorate$34([
        _angular_core.Input(), 
        __metadata$34('design:type', Boolean)
    ], Md2Datepicker.prototype, "readonly", null);
    __decorate$34([
        _angular_core.Input(), 
        __metadata$34('design:type', Boolean)
    ], Md2Datepicker.prototype, "required", null);
    __decorate$34([
        _angular_core.Input(), 
        __metadata$34('design:type', Boolean)
    ], Md2Datepicker.prototype, "disabled", null);
    __decorate$34([
        _angular_core.Input(), 
        __metadata$34('design:type', String), 
        __metadata$34('design:paramtypes', [String])
    ], Md2Datepicker.prototype, "min", null);
    __decorate$34([
        _angular_core.Input(), 
        __metadata$34('design:type', String), 
        __metadata$34('design:paramtypes', [String])
    ], Md2Datepicker.prototype, "max", null);
    __decorate$34([
        _angular_core.Input(), 
        __metadata$34('design:type', Object)
    ], Md2Datepicker.prototype, "value", null);
    __decorate$34([
        _angular_core.HostListener('click', ['$event']), 
        __metadata$34('design:type', Function), 
        __metadata$34('design:paramtypes', [MouseEvent]), 
        __metadata$34('design:returntype', void 0)
    ], Md2Datepicker.prototype, "_handleClick", null);
    __decorate$34([
        _angular_core.HostListener('keydown', ['$event']), 
        __metadata$34('design:type', Function), 
        __metadata$34('design:paramtypes', [KeyboardEvent]), 
        __metadata$34('design:returntype', void 0)
    ], Md2Datepicker.prototype, "_handleKeydown", null);
    __decorate$34([
        _angular_core.HostListener('blur'), 
        __metadata$34('design:type', Function), 
        __metadata$34('design:paramtypes', []), 
        __metadata$34('design:returntype', void 0)
    ], Md2Datepicker.prototype, "_onBlur", null);
    Md2Datepicker = __decorate$34([
        _angular_core.Component({selector: 'md2-datepicker',
            template: "<div class=\"md2-datepicker-trigger\" (click)=\"_showDatepicker()\"> <div class=\"md2-datepicker-calendar-icon\"> <svg *ngIf=\"type==='date'\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"> <path d=\"M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z\"></path> </svg> <svg *ngIf=\"type==='time'\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"> <path d=\"M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22C6.47,22 2,17.5 2,12A10,10 0 0,1 12,2M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z\"></path> </svg> <svg *ngIf=\"type==='datetime'\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"> <path d=\"M15,13H16.5V15.82L18.94,17.23L18.19,18.53L15,16.69V13M19,8H5V19H9.67C9.24,18.09 9,17.07 9,16A7,7 0 0,1 16,9C17.07,9 18.09,9.24 19,9.67V8M5,21C3.89,21 3,20.1 3,19V5C3,3.89 3.89,3 5,3H6V1H8V3H16V1H18V3H19A2,2 0 0,1 21,5V11.1C22.24,12.36 23,14.09 23,16A7,7 0 0,1 16,23C14.09,23 12.36,22.24 11.1,21H5M16,11.15A4.85,4.85 0 0,0 11.15,16C11.15,18.68 13.32,20.85 16,20.85A4.85,4.85 0 0,0 20.85,16C20.85,13.32 18.68,11.15 16,11.15Z\"></path> </svg> </div> <div class=\"md2-datepicker-input\"> <span class=\"md2-datepicker-placeholder\" [class.has-value]=\"value\"> {{ placeholder }} </span> <span class=\"md2-datepicker-input-text\">{{_viewValue}}</span> <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"> <path d=\"M7 10l5 5 5-5z\" /> </svg> </div> </div> <div class=\"md2-datepicker-wrapper\" [class.active]=\"_isDatepickerVisible\"> <div class=\"md2-datepicker-header\"> <span class=\"md2-datepicker-year\" [class.active]=\"_isYearsVisible\" [class.hidden]=\"type==='time'\" (click)=\"_showYear()\">{{_viewDay.year}}</span> <span class=\"md2-datepicker-date\" [class.active]=\"_isCalendarVisible && !_isYearsVisible\" [class.hidden]=\"type==='time'\" (click)=\"_showCalendar()\">{{_viewDay.day.substr(0, 3)}},&nbsp;{{_viewDay.month.substr(0, 3)}}&nbsp;{{_viewDay.date}}</span> <span class=\"md2-datepicker-time\" [class.active]=\"!_isCalendarVisible\" [class.hidden]=\"type==='date'\"> <span class=\"md2-datepicker-hour\" [class.active]=\"_isHoursVisible\" (click)=\"_toggleHours(true)\">{{_viewDay.hour}}</span>:<span class=\"md2-datepicker-minute\" [class.active]=\"!_isHoursVisible\" (click)=\"_toggleHours(false)\">{{_viewDay.minute}}</span> </span> </div> <div class=\"md2-datepicker-body\"> <div class=\"md2-years\" [class.active]=\"_isYearsVisible\"> <div class=\"md2-years-wrapper\"> <div *ngFor=\"let y of _years\" class=\"md2-year\" [class.selected]=\"y === _viewDay.year\" (click)=\"_setYear(y)\">{{y}}</div> </div> </div> <div class=\"md2-datepicker-container\" [class.active]=\"!_isYearsVisible\"> <div class=\"md2-calendar\" [class.active]=\"_isCalendarVisible\"> <div class=\"md2-calendar-controls\"> <div class=\"md2-calendar-prev-month\" [class.disabled]=\"!_isBeforeMonth()\" (click)=\"_isBeforeMonth() && _updateMonth(-1)\"> <svg viewBox=\"0 0 24 24\" width=\"24\" height=\"24\"> <path d=\"M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z\"></path> </svg> </div> <div class=\"md2-calendar-next-month\" [class.disabled]=\"!_isAfterMonth()\" (click)=\"_isAfterMonth() && _updateMonth(1)\"> <svg viewBox=\"0 0 24 24\" width=\"24\" height=\"24\"> <path d=\"M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z\"></path> </svg> </div> <div class=\"md2-calendar-header\">{{_viewDay.month}} {{_viewDay.year}}</div> </div> <table class=\"md2-calendar-month\"> <thead><tr><th *ngFor=\"let d of _days\">{{d.substr(0, 1)}}</th></tr></thead> <tbody> <tr *ngFor=\"let w of _dates\"> <td *ngFor=\"let d of w\"> <div class=\"md2-calendar-day\" [class.today]=\"d.today\" [class.focus]=\"_dateUtil.isSameDay(displayDate, d.date)\" [class.selected]=\"_dateUtil.isSameDay(_selectedDate, d.date)\" [class.disabled]=\"d.disabled\" [class.prev-month]=\"d.calMonth===_prevMonth\" [class.curr-month]=\"d.calMonth===_currMonth\" [class.next-month]=\"d.calMonth===_nextMonth\" (click)=\"_onClickDate($event,d)\">{{d.dateObj.day}}</div> </td> </tr> </tbody> </table> </div> <div class=\"md2-clock\" [class.active]=\"!_isCalendarVisible\"> <!-- (mousedown)=\"onMouseDownClock($event)\"--> <div class=\"md2-clock-hand\"> <svg class=\"md2-clock-svg\" width=\"240\" height=\"240\"> <g transform=\"translate(120,120)\"> <line x1=\"0\" y1=\"0\" [attr.x2]=\"_clock.hand.x\" [attr.y2]=\"_clock.hand.y\"></line> <circle class=\"md2-clock-bg\" r=\"17\" [attr.cx]=\"_clock.hand.x\" [attr.cy]=\"_clock.hand.y\"></circle> <circle class=\"md2-clock-fg\" r=\"3.5\" [attr.cx]=\"_clock.hand.x\" [attr.cy]=\"_clock.hand.y\"></circle> <circle class=\"md2-clock-center\" cx=\"0\" cy=\"0\" r=\"2\"></circle> </g> </svg> </div> <div class=\"md2-clock-hours\" [class.active]=\"_isHoursVisible\"> <div *ngFor=\"let h of _hours\" class=\"md2-clock-hour\" [style.top.px]=\"h.top\" [style.left.px]=\"h.left\" (click)=\"_onClickHour($event,h.hour)\">{{h.hour}}</div> </div> <div class=\"md2-clock-minutes\" [class.active]=\"!_isHoursVisible\"> <div *ngFor=\"let m of _minutes\" class=\"md2-clock-minute\" [style.top.px]=\"m.top\" [style.left.px]=\"m.left\" (click)=\"_onClickMinute($event,m.minute)\">{{m.minute}}</div> </div> </div> </div> </div> <div class=\"md2-datepicker-footer\"> <div class=\"md2-button\" (click)=\"_onBlur()\">Cancel</div> <div class=\"md2-button\" (click)=\"_onClickOk()\">Ok</div> </div> </div> ",
            styles: ["md2-datepicker { position: relative; display: block; max-width: 200px; outline: none; -webkit-backface-visibility: hidden; backface-visibility: hidden; } md2-datepicker.md2-datepicker-disabled { pointer-events: none; cursor: default; } .md2-datepicker-trigger { display: block; padding: 18px 0 18px 32px; white-space: nowrap; cursor: pointer; } .md2-datepicker-calendar-icon { position: absolute; top: 21px; left: 0; display: block; height: 24px; width: 24px; vertical-align: middle; fill: currentColor; color: rgba(0, 0, 0, 0.54); } .md2-datepicker-input { position: relative; display: block; height: 30px; padding: 2px 26px 1px 2px; margin: 0; line-height: 26px; color: rgba(0, 0, 0, 0.87); vertical-align: middle; box-sizing: border-box; border-bottom: 1px solid rgba(0, 0, 0, 0.12); } .md2-datepicker-input svg { position: absolute; right: 0; top: 2px; fill: currentColor; color: rgba(0, 0, 0, 0.54); } md2-datepicker.ng-invalid.ng-touched:not(.md2-datepicker-disabled) .md2-datepicker-input { color: #f44336; border-bottom: 1px solid #f44336; } md2-datepicker.md2-datepicker-disabled .md2-datepicker-input { color: rgba(0, 0, 0, 0.38); border-color: transparent; background-image: linear-gradient(to right, rgba(0, 0, 0, 0.38) 0%, rgba(0, 0, 0, 0.38) 33%, transparent 0%); background-position: bottom -1px left 0; background-size: 4px 1px; background-repeat: repeat-x; } .md2-datepicker-placeholder { position: absolute; right: 26px; bottom: 100%; left: 0; color: rgba(0, 0, 0, 0.38); max-width: 100%; padding-left: 3px; padding-right: 0; line-height: 1.4; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; pointer-events: none; z-index: 1; transform: translate3d(0, 26px, 0) scale(1); transition: transform 400ms cubic-bezier(0.25, 0.8, 0.25, 1); transform-origin: left top; } [aria-required=true] .md2-datepicker-placeholder::after { content: '*'; } .md2-datepicker-placeholder.has-value { transform: translate3d(0, 6px, 0) scale(0.75); } md2-datepicker:focus .md2-datepicker-placeholder { color: #106cc8; transform: translate3d(0, 6px, 0) scale(0.75); } md2-datepicker.md2-datepicker-disabled:focus .md2-datepicker-placeholder { color: rgba(0, 0, 0, 0.38); } .md2-datepicker-input-text { display: block; font-size: 15px; line-height: 26px; } .md2-datepicker-wrapper { position: absolute; top: 0; left: 0; display: inline-block; width: 300px; border-radius: 2px; background-color: white; z-index: 10; box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4); transform: scale(0); transform-origin: left top; transition: 150ms; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; } .md2-datepicker-wrapper.active { transform: scale(1); } .md2-datepicker-header { display: block; padding: 20px; color: white; font-size: 28px; line-height: 28px; font-weight: 500; background: #106cc8; box-sizing: border-box; } .md2-datepicker-year { display: block; height: 16px; margin: 0 0 10px; font-size: 16px; line-height: 16px; opacity: 0.7; cursor: pointer; } .md2-datepicker-year.active { opacity: 1; pointer-events: none; } .md2-datepicker-year.hidden { display: none; } .md2-datepicker-date { cursor: pointer; opacity: 0.7; } .md2-datepicker-date.active { opacity: 1; pointer-events: none; } .md2-datepicker-date.hidden { display: none; } .md2-datepicker-time { display: inline-block; padding-left: 10px; cursor: pointer; opacity: 0.7; } .md2-datepicker-time.active { opacity: 1; } .md2-datepicker-time.active .md2-datepicker-hour, .md2-datepicker-time.active .md2-datepicker-minute { opacity: 0.7; } .md2-datepicker-time.active .md2-datepicker-hour.active, .md2-datepicker-time.active .md2-datepicker-minute.active { opacity: 1; pointer-events: none; } .md2-datepicker-time.hidden { display: none; } .md2-datepicker-hour, .md2-datepicker-minute { opacity: 1; } .md2-datepicker-body { position: relative; width: 100%; height: 300px; overflow: hidden; } .md2-datepicker-footer { text-align: right; } .md2-datepicker-footer .md2-button { display: inline-block; min-width: 64px; margin: 4px 8px 8px 0; padding: 0 12px; font-size: 14px; color: #106cc8; line-height: 36px; text-align: center; text-transform: uppercase; border-radius: 2px; cursor: pointer; box-sizing: border-box; transition: all 450ms cubic-bezier(0.23, 1, 0.32, 1); } .md2-datepicker-footer .md2-button:hover { background: #ebebeb; } .md2-years { position: absolute; top: 10px; right: 100%; bottom: 10px; display: block; width: 100%; line-height: 40px; background: white; overflow-x: hidden; overflow-y: auto; transition: 300ms; } .md2-years.active { right: 0; } .md2-years .md2-years-wrapper { display: flex; flex-direction: column; justify-content: center; min-height: 100%; } .md2-years .md2-year { position: relative; display: block; margin: 0 auto; padding: 0; font-size: 17px; font-weight: 400; text-align: center; cursor: pointer; } .md2-years .md2-year.selected { color: #106cc8; font-size: 26px; font-weight: 500; } .md2-datepicker-container { position: absolute; top: 0; left: 100%; display: block; width: 100%; transition: 300ms; } .md2-datepicker-container.active { left: 0; } .md2-calendar { position: absolute; right: 100%; display: block; width: 100%; font-size: 12px; font-weight: 400; text-align: center; transition: 300ms; } .md2-calendar.active { right: 0; } .md2-calendar-controls { position: relative; display: block; height: 48px; text-align: left; } .md2-calendar-header { height: 48px; line-height: 48px; font-size: 14px; font-weight: 500; text-align: center; } .md2-calendar-prev-month, .md2-calendar-next-month { position: absolute; display: inline-block; width: 48px; height: 48px; padding: 12px; margin: 0 12px; box-sizing: border-box; cursor: pointer; } .md2-calendar-prev-month.disabled, .md2-calendar-next-month.disabled { opacity: 0.25; cursor: default; pointer-events: none; } .md2-calendar-next-month { right: 0; } .md2-calendar-month { margin: 0 20px; } .md2-calendar-month th { width: 35px; height: 20px; font-weight: 500; line-height: 15px; opacity: 0.5; } .md2-calendar-month td { padding: 0; } .md2-calendar-day { position: relative; display: inline-block; width: 35px; height: 35px; border-radius: 50%; text-align: center; cursor: pointer; line-height: 35px; box-sizing: border-box; } .md2-calendar-day.today { color: #106cc8; } .md2-calendar-day:hover, .md2-calendar-day.focus { background: #e0e0e0; } .md2-calendar-day.selected, .md2-calendar-day.selected:hover { color: white; background: #106cc8; } .md2-calendar-day.disabled, .md2-calendar-day.disabled:hover { color: rgba(0, 0, 0, 0.45); background: transparent; pointer-events: none; } .md2-calendar-day.prev-month, .md2-calendar-day.next-month { visibility: hidden; } .md2-clock { position: absolute; left: 100%; display: block; width: 240px; height: 240px; margin: 30px; font-size: 14px; font-weight: 400; text-align: center; background-color: #e0e0e0; border-radius: 50%; transition: 300ms; } .md2-clock.active { left: 0; } .md2-clock-hours, .md2-clock-minutes { position: absolute; top: 0; left: 0; width: 100%; height: 100%; opacity: 0; visibility: hidden; transition: 350ms; transform: scale(1.2); } .md2-clock-hours.active, .md2-clock-minutes.active { opacity: 1; visibility: visible; transform: scale(1); } .md2-clock-minutes { transform: scale(0.8); } .md2-clock-hour, .md2-clock-minute { position: absolute; width: 34px; height: 34px; line-height: 34px; text-align: center; border-radius: 50%; cursor: pointer; } .md2-clock-hour:hover, .md2-clock-minute:hover { background: #65acf3; } .md2-clock-hand { position: absolute; top: 0; left: 0; width: 100%; height: 100%; } .md2-clock-hand line { stroke: #106cc8; stroke-width: 1; stroke-linecap: round; } .md2-clock-bg { fill: #65acf3; } .md2-clock-fg { stroke: none; fill: #106cc8; } .md2-clock-center { stroke: none; fill: #106cc8; } /*# sourceMappingURL=datepicker.css.map */ "],
            host: {
                'role': 'datepicker',
                '[id]': 'id',
                '[class.md2-datepicker-disabled]': 'disabled',
                '[tabindex]': 'disabled ? -1 : tabindex',
                '[attr.aria-label]': 'placeholder',
                '[attr.aria-required]': 'required.toString()',
                '[attr.aria-disabled]': 'disabled.toString()',
                '[attr.aria-invalid]': '_control?.invalid || "false"',
            },
            encapsulation: _angular_core.ViewEncapsulation.None
        }),
        __param$4(2, _angular_core.Optional()), 
        __metadata$34('design:paramtypes', [Md2DateUtil, _angular_core.ElementRef, _angular_forms.NgControl])
    ], Md2Datepicker);
    return Md2Datepicker;
}());
var MD2_DATEPICKER_DIRECTIVES = [Md2Datepicker];
var Md2DatepickerModule = (function () {
    function Md2DatepickerModule() {
    }
    Md2DatepickerModule.forRoot = function () {
        return {
            ngModule: Md2DatepickerModule,
            providers: [Md2DateUtil]
        };
    };
    Md2DatepickerModule = __decorate$34([
        _angular_core.NgModule({
            imports: [_angular_common.CommonModule],
            exports: MD2_DATEPICKER_DIRECTIVES,
            declarations: MD2_DATEPICKER_DIRECTIVES,
        }), 
        __metadata$34('design:paramtypes', [])
    ], Md2DatepickerModule);
    return Md2DatepickerModule;
}());

/**
 * Provide an API for animating elements with CSS transitions
 */
var Animate = (function () {
    function Animate() {
    }
    Animate.enter = function (el, cssClass) {
        el.classList.remove(cssClass);
        return new Promise(function (resolve) {
            el.classList.add(cssClass + '-add');
            setTimeout(function () {
                var duration = Animate.getTransitionDuration(el, true);
                var removeListener = function () { return done(false); };
                var callTimeout = setTimeout(function () { return done(true); }, duration);
                var done = function (timeout) {
                    if (!removeListener) {
                        return;
                    }
                    el.classList.remove(cssClass + '-add-active');
                    el.classList.remove(cssClass + '-add');
                    if (!timeout) {
                        clearTimeout(callTimeout);
                    }
                    el.removeEventListener(Animate.TRANSITION_EVENT, removeListener);
                    removeListener = null;
                    resolve();
                };
                el.addEventListener(Animate.TRANSITION_EVENT, removeListener);
                el.classList.add(cssClass + '-add-active');
                el.classList.add(cssClass);
            }, 1);
        });
    };
    Animate.leave = function (el, cssClass) {
        return new Promise(function (resolve) {
            el.classList.add(cssClass + '-remove');
            setTimeout(function () {
                var duration = Animate.getTransitionDuration(el, true);
                var callTimeout = setTimeout(function () { return done(true); }, duration);
                var removeListener = function () { return done(false); };
                var done = function (timeout) {
                    if (!removeListener) {
                        return;
                    }
                    el.classList.remove(cssClass + '-remove-active');
                    el.classList.remove(cssClass + '-remove');
                    if (!timeout) {
                        clearTimeout(callTimeout);
                    }
                    el.removeEventListener(Animate.TRANSITION_EVENT, removeListener);
                    removeListener = null;
                    resolve();
                };
                el.addEventListener(Animate.TRANSITION_EVENT, removeListener);
                el.classList.add(cssClass + '-remove-active');
                el.classList.remove(cssClass);
            }, 1);
        });
    };
    /**
     * Get the duration of any transitions being applied to the given element.
     *
     * Based on: https://gist.github.com/snorpey/5323028
     * @param element The element to query
     * @param includeDelay Include any specified transition-delay value.
     * @returns {number}
     */
    Animate.getTransitionDuration = function (element, includeDelay) {
        if (includeDelay === void 0) { includeDelay = false; }
        var prefixes = ['', 'moz', 'webkit', 'ms', 'o', 'khtml'];
        var style = window.getComputedStyle(element);
        for (var i = 0; i < prefixes.length; i++) {
            var durationProperty = (i === 0 ? '' : "-" + prefixes[i] + "-") + "transition-duration";
            var duration = style[durationProperty];
            if (!duration) {
                continue;
            }
            duration = (duration.indexOf('ms') > -1) ? parseFloat(duration) : parseFloat(duration) *
                1000;
            if (duration === 0) {
                continue;
            }
            if (includeDelay) {
                var delayProperty = (i === 0 ? '' : "-" + prefixes[i] + "-") + "transition-delay";
                var delay = style[delayProperty];
                if (typeof delay !== 'undefined') {
                    duration += (delay.indexOf('ms') > -1) ? parseFloat(delay) : parseFloat(delay) * 1000;
                }
            }
            return duration;
        }
        return -1;
    };
    Animate.setTransitionDuration = function (element, delayMs) {
    };
    /* From Modernizr */
    Animate.whichTransitionEvent = function () {
        if (typeof document === 'undefined') {
            return 'transitionend';
        }
        var t;
        var el = document.createElement('fakeelement');
        var transitions = {
            'transition': 'transitionend',
            'OTransition': 'oTransitionEnd',
            'MozTransition': 'transitionend',
            'WebkitTransition': 'webkitTransitionEnd'
        };
        for (t in transitions) {
            if (el.style[t] !== undefined) {
                return transitions[t];
            }
        }
    };
    /**
     * Set CSS styles immediately by turning off transition duration and restoring it afterward
     */
    Animate.setStyles = function (element, styles) {
        var saveDuration = Animate.getTransitionDuration(element);
        Animate.setTransitionDuration(element, 0);
        return new Promise(function (resolve, reject) {
            Object.keys(styles).forEach(function (key) {
            });
            if (saveDuration !== -1) {
                Animate.setTransitionDuration(element, saveDuration);
            }
            resolve();
        });
    };
    /**
     * Wait a period of time, then resolve a promise.
     * @param milliseconds The period to wait before resolving.
     * @returns {Promise<void>|Promise} A promise that resolves after a period of time.
     */
    Animate.wait = function (milliseconds) {
        if (milliseconds === void 0) { milliseconds = 10; }
        return new Promise(function (resolve) {
            setTimeout(function () { return resolve(); }, milliseconds);
        });
    };
    /**
     * Look up the transition event name for the browser type and cache it.
     */
    Animate.TRANSITION_EVENT = Animate.whichTransitionEvent();
    return Animate;
}());

var __extends$6 = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate$36 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$36 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var Md2DialogPortal = (function (_super) {
    __extends$6(Md2DialogPortal, _super);
    function Md2DialogPortal(templateRef, viewContainerRef) {
        _super.call(this, templateRef, viewContainerRef);
    }
    Md2DialogPortal = __decorate$36([
        _angular_core.Directive({ selector: '[md2DialogPortal]' }), 
        __metadata$36('design:paramtypes', [_angular_core.TemplateRef, _angular_core.ViewContainerRef])
    ], Md2DialogPortal);
    return Md2DialogPortal;
}(TemplatePortal));
var Md2DialogTitle = (function () {
    function Md2DialogTitle() {
    }
    Md2DialogTitle = __decorate$36([
        _angular_core.Directive({ selector: 'md2-dialog-title' }), 
        __metadata$36('design:paramtypes', [])
    ], Md2DialogTitle);
    return Md2DialogTitle;
}());
var Md2DialogFooter = (function () {
    function Md2DialogFooter() {
    }
    Md2DialogFooter = __decorate$36([
        _angular_core.Directive({ selector: 'md2-dialog-footer' }), 
        __metadata$36('design:paramtypes', [])
    ], Md2DialogFooter);
    return Md2DialogFooter;
}());
var Md2Dialog = (function () {
    function Md2Dialog(_overlay) {
        this._overlay = _overlay;
        this.onShow = new _angular_core.EventEmitter();
        this.onClose = new _angular_core.EventEmitter();
        this.onCancel = new _angular_core.EventEmitter();
        /** Is the dialog active? */
        this._isOpened = false;
        /** Overlay configuration for positioning the dialog */
        this.config = new OverlayState();
        /** @internal */
        this._overlayRef = null;
    }
    Md2Dialog.prototype.ngOnDestroy = function () {
        return this.close();
    };
    /** Show the dialog */
    Md2Dialog.prototype.show = function () {
        return this.open();
    };
    /** Open the dialog */
    Md2Dialog.prototype.open = function () {
        var _this = this;
        return this.close()
            .then(function () { return _this._overlay.create(_this.config); })
            .then(function (ref) {
            _this._overlayRef = ref;
            return ref.attach(_this._portal);
        })
            .then(function () { return Animate.wait(); })
            .then(function () {
            _this._isOpened = true;
            _this.onShow.emit(_this);
            return _this;
        });
    };
    /** Close the dialog */
    Md2Dialog.prototype.close = function (result, cancel) {
        var _this = this;
        if (result === void 0) { result = true; }
        if (cancel === void 0) { cancel = false; }
        if (!this._overlayRef) {
            return Promise.resolve(this);
        }
        this._isOpened = false;
        // TODO(jd): this is terrible, use animate states
        return Animate.wait(100)
            .then(function () { return _this._overlayRef.detach(); })
            .then(function () {
            _this._overlayRef.dispose();
            _this._overlayRef = null;
            if (cancel) {
                _this.onCancel.emit(result);
            }
            else {
                _this.onClose.emit(result);
            }
            return _this;
        });
    };
    Md2Dialog.prototype._handleDocumentKeydown = function (event) {
        if (event.keyCode === ESCAPE) {
            this.close();
        }
    };
    __decorate$36([
        _angular_core.Output(), 
        __metadata$36('design:type', _angular_core.EventEmitter)
    ], Md2Dialog.prototype, "onShow", void 0);
    __decorate$36([
        _angular_core.Output(), 
        __metadata$36('design:type', _angular_core.EventEmitter)
    ], Md2Dialog.prototype, "onClose", void 0);
    __decorate$36([
        _angular_core.Output(), 
        __metadata$36('design:type', _angular_core.EventEmitter)
    ], Md2Dialog.prototype, "onCancel", void 0);
    __decorate$36([
        _angular_core.ViewChild(Md2DialogPortal), 
        __metadata$36('design:type', Md2DialogPortal)
    ], Md2Dialog.prototype, "_portal", void 0);
    __decorate$36([
        _angular_core.Input('title'), 
        __metadata$36('design:type', String)
    ], Md2Dialog.prototype, "dialogTitle", void 0);
    __decorate$36([
        _angular_core.Input(), 
        __metadata$36('design:type', Object)
    ], Md2Dialog.prototype, "config", void 0);
    Md2Dialog = __decorate$36([
        _angular_core.Component({selector: 'md2-dialog',
            template: "<template md2DialogPortal> <div class=\"md2-dialog-backdrop\" (click)=\"close()\"></div> <div class=\"md2-dialog\" [class.open]=\"_isOpened\"> <div class=\"md2-dialog-container\"> <div class=\"md2-dialog-header\"> <button type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"close()\">&times;</button> <h2 *ngIf=\"dialogTitle\" class=\"md2-dialog-title\" id=\"myDialogLabel\" [innerHtml]=\"dialogTitle\"></h2> <ng-content select=\"md2-dialog-title\"></ng-content> </div> <div class=\"md2-dialog-body\"> <ng-content></ng-content> </div> <ng-content select=\"md2-dialog-footer\"></ng-content> </div> </div> </template> ",
            styles: [".md2-dialog-open { overflow-y: hidden; } .md2-dialog { position: fixed; top: 0; right: 0; bottom: 0; left: 0; z-index: 1050; display: none; overflow-x: hidden; overflow-y: scroll; -webkit-overflow-scrolling: touch; outline: 0; } .md2-dialog.open { display: block; } .md2-dialog .md2-dialog-container { position: relative; width: auto; margin: 15px; background-color: #fff; pointer-events: auto; background-clip: padding-box; border-radius: 0 0 4px 4px; outline: 0; box-shadow: 0 7px 8px -4px rgba(0, 0, 0, 0.2), 0 13px 19px 2px rgba(0, 0, 0, 0.14), 0 5px 24px 4px rgba(0, 0, 0, 0.12); transition: 300ms; transform: scale(0.1); } .md2-dialog.open .md2-dialog-container { transform: scale(1); } @media (min-width: 768px) { .md2-dialog .md2-dialog-container { width: 600px; margin: 30px auto; } } .md2-dialog-header { background: #2196f3; color: #fff; font-size: 25px; line-height: 1.1; font-weight: 500; padding: 0 48px 0 16px; border-bottom: 1px solid #e5e5e5; word-wrap: break-word; } .md2-dialog-header .close { position: absolute; top: 21px; right: 16px; display: inline-block; width: 18px; height: 18px; overflow: hidden; -webkit-appearance: none; padding: 0; cursor: pointer; background: 0 0; border: 0; outline: 0; opacity: 0.8; font-size: 0; z-index: 1; min-width: initial; box-shadow: none; margin: 0; } .md2-dialog-header .close::before, .md2-dialog-header .close::after { content: ''; position: absolute; top: 50%; left: 0; width: 100%; height: 2px; margin-top: -1px; background: #ccc; border-radius: 2px; } .md2-dialog-header .close::before { transform: rotate(45deg); } .md2-dialog-header .close::after { transform: rotate(-45deg); } .md2-dialog-header .close:hover { opacity: 1; } .md2-dialog-header md2-dialog-title, .md2-dialog-header .md2-dialog-title { display: block; margin: 0; padding: 16px 0; font-size: 25px; font-weight: 500; } .md2-dialog-header dialog-header { line-height: 33px; } .md2-dialog-body { position: relative; padding: 16px; } .md2-dialog-footer, md2-dialog-footer { display: block; padding: 16px; text-align: right; border-top: 1px solid rgba(0, 0, 0, 0.12); } .md2-dialog-backdrop { position: absolute; top: 0; bottom: 0; left: 0; right: 0; z-index: 1; pointer-events: auto; transition: opacity 400ms cubic-bezier(0.25, 0.8, 0.25, 1); background: #212121; opacity: 0.48; } .cdk-overlay-container { position: fixed; pointer-events: none; top: 0; left: 0; height: 100%; width: 100%; z-index: 1000; } /*# sourceMappingURL=dialog.css.map */ "],
            host: {
                'tabindex': '0',
                '(body:keydown)': '_handleDocumentKeydown($event)'
            },
            encapsulation: _angular_core.ViewEncapsulation.None,
        }), 
        __metadata$36('design:paramtypes', [Overlay])
    ], Md2Dialog);
    return Md2Dialog;
}());
var MD2_DIALOG_DIRECTIVES = [
    Md2Dialog,
    Md2DialogTitle,
    Md2DialogFooter,
    Md2DialogPortal
];
var MD2_DIALOG_PROVIDERS = [Overlay, OVERLAY_PROVIDERS];
var Md2DialogModule = (function () {
    function Md2DialogModule() {
    }
    Md2DialogModule.forRoot = function () {
        return {
            ngModule: Md2DialogModule,
            providers: MD2_DIALOG_PROVIDERS
        };
    };
    Md2DialogModule = __decorate$36([
        _angular_core.NgModule({
            imports: [_angular_common.CommonModule],
            exports: MD2_DIALOG_DIRECTIVES,
            declarations: MD2_DIALOG_DIRECTIVES,
        }), 
        __metadata$36('design:paramtypes', [])
    ], Md2DialogModule);
    return Md2DialogModule;
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
var Md2MenuContent = (function () {
    function Md2MenuContent() {
    }
    Md2MenuContent = __decorate$38([
        _angular_core.Component({selector: '[md2-menu-content]',
            host: { 'role': 'menu' },
            template: '<ng-content></ng-content>',
            styles: ["[md2-menu] { position: relative; display: inline-block; } [md2-menu-content] { position: absolute; top: 0; left: 0; display: inline-block; background: white; list-style: none; min-width: 112px; max-width: 280px; max-height: calc(100vh + 48px); padding: 8px 0; margin: 0; z-index: 1001; border-radius: 2px; transform: scale(0); transform-origin: left top; transition: all 200ms linear; box-shadow: 0 2px 6px 1px rgba(0, 0, 0, 0.34); } [md2-menu-item] [md2-menu-content] { left: 100%; margin: -8px 0; } [md2-menu-content][x-position='before'] { right: 0; left: auto; transform-origin: right top; } [md2-menu-item] [md2-menu-content][x-position='before'] { right: 100%; } [md2-menu-content][y-position='above'] { top: auto; bottom: 0; transform-origin: left bottom; } [md2-menu-content][y-position='above'][x-position='before'] { transform-origin: right bottom; } .open > [md2-menu-content] { transform: scale(1); } [md2-menu-item] { position: relative; width: 100%; cursor: pointer; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; outline: none; border: none; white-space: nowrap; text-overflow: ellipsis; display: flex; flex-direction: row; align-items: center; height: 36px; padding: 0 16px; font-size: 16px; text-align: start; text-decoration: none; background: transparent; color: rgba(0, 0, 0, 0.87); box-sizing: border-box; } [md2-menu-item][disabled] { color: rgba(0, 0, 0, 0.38); } [md2-menu-item]:hover:not([disabled]), [md2-menu-item]:focus:not([disabled]), [md2-menu-item].open { background: rgba(0, 0, 0, 0.04); text-decoration: none; } [md2-menu-item] > [md2-menu-trigger] { display: block; height: 36px; width: calc(100% + 32px); margin: 0 -16px; padding: 0 16px; font: inherit; color: inherit; text-align: left; background: transparent; outline: none; border: 0; cursor: pointer; box-shadow: none; } .md-overlay-container { position: fixed; pointer-events: none; top: 0; left: 0; height: 100%; width: 100%; z-index: 1000; } .md-overlay-pane { position: absolute; pointer-events: auto; box-sizing: border-box; z-index: 1000; } .md-overlay-backdrop { position: absolute; top: 0; bottom: 0; left: 0; right: 0; z-index: 1; pointer-events: auto; transition: opacity 400ms cubic-bezier(0.25, 0.8, 0.25, 1); opacity: 0; } .md-overlay-transparent-backdrop { background: none; } .md-overlay-backdrop.md-overlay-backdrop-showing { opacity: 0.48; } /*# sourceMappingURL=menu.css.map */ "],
            encapsulation: _angular_core.ViewEncapsulation.None,
        }), 
        __metadata$38('design:paramtypes', [])
    ], Md2MenuContent);
    return Md2MenuContent;
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
var Md2MenuItem = (function () {
    function Md2MenuItem() {
    }
    Md2MenuItem = __decorate$39([
        _angular_core.Component({selector: '[md2-menu-item]',
            host: {
                'role': 'menuitem'
            },
            template: '<ng-content></ng-content>'
        }), 
        __metadata$39('design:paramtypes', [])
    ], Md2MenuItem);
    return Md2MenuItem;
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
    Md2MenuTrigger = __decorate$40([
        _angular_core.Directive({
            selector: '[md2-menu-trigger]',
            host: {
                'aria-haspopup': 'true',
                '(click)': '_toggleMenu()',
            },
            exportAs: 'md2MenuTrigger'
        }), 
        __metadata$40('design:paramtypes', [_angular_core.ElementRef, _angular_core.Renderer])
    ], Md2MenuTrigger);
    return Md2MenuTrigger;
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
var Md2Menu = (function () {
    function Md2Menu() {
    }
    Md2Menu = __decorate$37([
        _angular_core.Component({selector: '[md2-menu]',
            template: '<ng-content></ng-content>',
            styles: ["[md2-menu] { position: relative; display: inline-block; } [md2-menu-content] { position: absolute; top: 0; left: 0; display: inline-block; background: white; list-style: none; min-width: 112px; max-width: 280px; max-height: calc(100vh + 48px); padding: 8px 0; margin: 0; z-index: 1001; border-radius: 2px; transform: scale(0); transform-origin: left top; transition: all 200ms linear; box-shadow: 0 2px 6px 1px rgba(0, 0, 0, 0.34); } [md2-menu-item] [md2-menu-content] { left: 100%; margin: -8px 0; } [md2-menu-content][x-position='before'] { right: 0; left: auto; transform-origin: right top; } [md2-menu-item] [md2-menu-content][x-position='before'] { right: 100%; } [md2-menu-content][y-position='above'] { top: auto; bottom: 0; transform-origin: left bottom; } [md2-menu-content][y-position='above'][x-position='before'] { transform-origin: right bottom; } .open > [md2-menu-content] { transform: scale(1); } [md2-menu-item] { position: relative; width: 100%; cursor: pointer; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; outline: none; border: none; white-space: nowrap; text-overflow: ellipsis; display: flex; flex-direction: row; align-items: center; height: 36px; padding: 0 16px; font-size: 16px; text-align: start; text-decoration: none; background: transparent; color: rgba(0, 0, 0, 0.87); box-sizing: border-box; } [md2-menu-item][disabled] { color: rgba(0, 0, 0, 0.38); } [md2-menu-item]:hover:not([disabled]), [md2-menu-item]:focus:not([disabled]), [md2-menu-item].open { background: rgba(0, 0, 0, 0.04); text-decoration: none; } [md2-menu-item] > [md2-menu-trigger] { display: block; height: 36px; width: calc(100% + 32px); margin: 0 -16px; padding: 0 16px; font: inherit; color: inherit; text-align: left; background: transparent; outline: none; border: 0; cursor: pointer; box-shadow: none; } .md-overlay-container { position: fixed; pointer-events: none; top: 0; left: 0; height: 100%; width: 100%; z-index: 1000; } .md-overlay-pane { position: absolute; pointer-events: auto; box-sizing: border-box; z-index: 1000; } .md-overlay-backdrop { position: absolute; top: 0; bottom: 0; left: 0; right: 0; z-index: 1; pointer-events: auto; transition: opacity 400ms cubic-bezier(0.25, 0.8, 0.25, 1); opacity: 0; } .md-overlay-transparent-backdrop { background: none; } .md-overlay-backdrop.md-overlay-backdrop-showing { opacity: 0.48; } /*# sourceMappingURL=menu.css.map */ "],
            encapsulation: _angular_core.ViewEncapsulation.None,
        }), 
        __metadata$37('design:paramtypes', [])
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
    Md2MenuModule = __decorate$37([
        _angular_core.NgModule({
            imports: [_angular_common.CommonModule],
            exports: [Md2Menu, Md2MenuContent, Md2MenuItem, Md2MenuTrigger],
            declarations: [Md2Menu, Md2MenuContent, Md2MenuItem, Md2MenuTrigger],
        }), 
        __metadata$37('design:paramtypes', [])
    ], Md2MenuModule);
    return Md2MenuModule;
}());

var __decorate$41 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$41 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var Option = (function () {
    function Option(source, textKey, valueKey) {
        if (typeof source === 'string') {
            this.text = this.value = source;
        }
        if (typeof source === 'object') {
            this.text = source[textKey];
            this.value = valueKey ? source[valueKey] : source;
        }
    }
    return Option;
}());
var noop$3 = function () { };
var nextId$4 = 0;
var MD2_MULTISELECT_CONTROL_VALUE_ACCESSOR = {
    provide: _angular_forms.NG_VALUE_ACCESSOR,
    useExisting: _angular_core.forwardRef(function () { return Md2Multiselect; }),
    multi: true
};
var Md2Multiselect = (function () {
    function Md2Multiselect(element) {
        this.element = element;
        this.change = new _angular_core.EventEmitter();
        this._value = '';
        this._onTouchedCallback = noop$3;
        this._onChangeCallback = noop$3;
        this._options = [];
        this._list = [];
        this._items = [];
        this._focusedOption = 0;
        this.isFocused = false;
        this.id = 'md2-multiselect-' + (++nextId$4);
        this.tabindex = 0;
        this.placeholder = '';
        this.textKey = 'text';
        this.valueKey = null;
    }
    Md2Multiselect.prototype.ngAfterContentInit = function () { this._isInitialized = true; };
    Object.defineProperty(Md2Multiselect.prototype, "readonly", {
        get: function () { return this._readonly; },
        set: function (value) { this._readonly = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Multiselect.prototype, "disabled", {
        get: function () { return this._disabled; },
        set: function (value) { this._disabled = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Multiselect.prototype, "options", {
        set: function (value) { this._options = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Multiselect.prototype, "value", {
        get: function () { return this._value; },
        set: function (value) { this.setValue(value); },
        enumerable: true,
        configurable: true
    });
    /**
     * set value
     * @param value
     */
    Md2Multiselect.prototype.setValue = function (value) {
        var _this = this;
        if (value !== this._value) {
            this._value = value;
            this._items = [];
            if (value && value.length && typeof value === 'object' && Array.isArray(value)) {
                var _loop_1 = function(i) {
                    var selItm = this_1._options.find(function (itm) { return _this.equals(_this.valueKey ?
                        itm[_this.valueKey] : itm, value[i]); });
                    if (selItm) {
                        this_1._items.push(new Option(selItm, this_1.textKey, this_1.valueKey));
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
    Md2Multiselect.prototype.equals = function (o1, o2) {
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
    Object.defineProperty(Md2Multiselect.prototype, "isMenuVisible", {
        get: function () {
            return (this.isFocused && this._list && this._list.length) && !this.readonly ? true : false;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * to update scroll of options
     */
    Md2Multiselect.prototype.updateScroll = function () {
        if (this._focusedOption < 0) {
            return;
        }
        var menuContainer = this.element.nativeElement.querySelector('.md2-multiselect-menu');
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
    Md2Multiselect.prototype._handleClick = function (event) {
        if (this.disabled) {
            event.stopPropagation();
            event.preventDefault();
            return;
        }
        this.updateOptions();
        this.element.nativeElement.focus();
    };
    Md2Multiselect.prototype._handleKeydown = function (event) {
        if (this.disabled) {
            return;
        }
        if (this.isMenuVisible) {
            event.preventDefault();
            event.stopPropagation();
            switch (event.keyCode) {
                case TAB:
                case ESCAPE:
                    this._onBlur();
                    break;
                case ENTER:
                case SPACE:
                    this._handleOptionClick(event, this._focusedOption);
                    break;
                case DOWN_ARROW:
                    this._focusedOption = (this._focusedOption === this._list.length - 1) ?
                        0 : Math.min(this._focusedOption + 1, this._list.length - 1);
                    this.updateScroll();
                    break;
                case UP_ARROW:
                    this._focusedOption = (this._focusedOption === 0) ?
                        this._list.length - 1 : Math.max(0, this._focusedOption - 1);
                    this.updateScroll();
                    break;
            }
        }
        else {
            switch (event.keyCode) {
                case ENTER:
                case SPACE:
                case DOWN_ARROW:
                case UP_ARROW:
                    event.preventDefault();
                    event.stopPropagation();
                    this.updateOptions();
                    break;
            }
        }
    };
    /**
     * on focus current component
     */
    Md2Multiselect.prototype.onFocus = function () {
        this.isFocused = true;
        this._focusedOption = 0;
    };
    Md2Multiselect.prototype._onBlur = function () { this.isFocused = false; };
    /**
     * to check current option is active or not
     * @param index
     * @return boolean the item is active or not
     */
    Md2Multiselect.prototype._isActive = function (index) {
        return this._items.map(function (i) { return i.text; }).indexOf(this._list[index].text) < 0 ? false : true;
    };
    /**
     * to toggle option to select/deselect option
     * @param event
     * @param index
     */
    Md2Multiselect.prototype._handleOptionClick = function (event, index) {
        var _this = this;
        event.preventDefault();
        event.stopPropagation();
        var ind = this._items.map(function (i) { return i.text; }).indexOf(this._list[index].text);
        if (ind < 0) {
            this._items.push(this._list[index]);
            this._items = this._items.sort(function (a, b) {
                return _this._list.findIndex(function (i) {
                    return i.text === a.text;
                }) - _this._list.findIndex(function (i) { return i.text === b.text; });
            });
        }
        else {
            this._items.splice(ind, 1);
        }
        this._value = new Array();
        for (var i = 0; i < this._items.length; i++) {
            this._value.push(this._items[i].value);
        }
        this._onChangeCallback(this._value);
        this.change.emit(this._value);
    };
    /**
     * update options
     */
    Md2Multiselect.prototype.updateOptions = function () {
        var _this = this;
        this._list = this._options.map(function (item) { return new Option(item, _this.textKey, _this.valueKey); });
        if (this._list.length > 0) {
            this.onFocus();
        }
    };
    /**
     * Implemented as part of ControlValueAccessor.
     * TODO: internal
     */
    Md2Multiselect.prototype.writeValue = function (value) {
        var _this = this;
        if (value !== this._value) {
            this._value = value;
            this._items = [];
            if (value && value.length && typeof value === 'object' && Array.isArray(value)) {
                var _loop_2 = function(i) {
                    var selItm = this_2._options.find(function (itm) {
                        return _this.equals(_this.valueKey ? itm[_this.valueKey] : itm, value[i]);
                    });
                    if (selItm) {
                        this_2._items.push(new Option(selItm, this_2.textKey, this_2.valueKey));
                    }
                };
                var this_2 = this;
                for (var i = 0; i < value.length; i++) {
                    _loop_2(i);
                }
            }
        }
    };
    /**
     * Implemented as part of ControlValueAccessor.
     * TODO: internal
     */
    Md2Multiselect.prototype.registerOnChange = function (fn) { this._onChangeCallback = fn; };
    /**
     * Implemented as part of ControlValueAccessor.
     * TODO: internal
     */
    Md2Multiselect.prototype.registerOnTouched = function (fn) { this._onTouchedCallback = fn; };
    __decorate$41([
        _angular_core.Output(), 
        __metadata$41('design:type', _angular_core.EventEmitter)
    ], Md2Multiselect.prototype, "change", void 0);
    __decorate$41([
        _angular_core.Input(), 
        __metadata$41('design:type', String)
    ], Md2Multiselect.prototype, "id", void 0);
    __decorate$41([
        _angular_core.Input(), 
        __metadata$41('design:type', Number)
    ], Md2Multiselect.prototype, "tabindex", void 0);
    __decorate$41([
        _angular_core.Input(), 
        __metadata$41('design:type', String)
    ], Md2Multiselect.prototype, "placeholder", void 0);
    __decorate$41([
        _angular_core.Input('item-text'), 
        __metadata$41('design:type', String)
    ], Md2Multiselect.prototype, "textKey", void 0);
    __decorate$41([
        _angular_core.Input('item-value'), 
        __metadata$41('design:type', String)
    ], Md2Multiselect.prototype, "valueKey", void 0);
    __decorate$41([
        _angular_core.Input(), 
        __metadata$41('design:type', Boolean)
    ], Md2Multiselect.prototype, "readonly", null);
    __decorate$41([
        _angular_core.Input(), 
        __metadata$41('design:type', Boolean)
    ], Md2Multiselect.prototype, "disabled", null);
    __decorate$41([
        _angular_core.Input('items'), 
        __metadata$41('design:type', Array), 
        __metadata$41('design:paramtypes', [Array])
    ], Md2Multiselect.prototype, "options", null);
    __decorate$41([
        _angular_core.Input(), 
        __metadata$41('design:type', Object)
    ], Md2Multiselect.prototype, "value", null);
    __decorate$41([
        _angular_core.HostListener('click', ['$event']), 
        __metadata$41('design:type', Function), 
        __metadata$41('design:paramtypes', [MouseEvent]), 
        __metadata$41('design:returntype', void 0)
    ], Md2Multiselect.prototype, "_handleClick", null);
    __decorate$41([
        _angular_core.HostListener('keydown', ['$event']), 
        __metadata$41('design:type', Function), 
        __metadata$41('design:paramtypes', [KeyboardEvent]), 
        __metadata$41('design:returntype', void 0)
    ], Md2Multiselect.prototype, "_handleKeydown", null);
    __decorate$41([
        _angular_core.HostListener('blur'), 
        __metadata$41('design:type', Function), 
        __metadata$41('design:paramtypes', []), 
        __metadata$41('design:returntype', void 0)
    ], Md2Multiselect.prototype, "_onBlur", null);
    Md2Multiselect = __decorate$41([
        _angular_core.Component({selector: 'md2-multiselect',
            template: "<div class=\"md2-multiselect-container\"> <span class=\"md2-multiselect-placeholder\" [class.has-value]=\"_items.length\"> {{placeholder}} </span> <div class=\"md2-multiselect-value\"> <div *ngFor=\"let v of _items; let last = last\" class=\"md2-multiselect-value-item\"> <span class=\"md2-multiselect-text\">{{v.text}}</span><span *ngIf=\"!last\">,&nbsp;</span> </div> </div> <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"> <path d=\"M7 10l5 5 5-5z\" /> </svg> </div> <ul *ngIf=\"isMenuVisible\" class=\"md2-multiselect-menu\"> <li *ngFor=\"let l of _list; let i = index;\" class=\"md2-option\" [class.active]=\"_isActive(i)\" [class.focus]=\"_focusedOption === i\" (click)=\"_handleOptionClick($event, i)\"> <div class=\"md2-option-icon\"></div> <div class=\"md2-option-text\" [innerHtml]=\"l.text\"></div> </li> </ul> ",
            styles: ["md2-multiselect { position: relative; display: block; margin: 18px 0; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; -webkit-backface-visibility: hidden; backface-visibility: hidden; } md2-multiselect:focus { outline: none; } md2-multiselect.md2-multiselect-disabled { pointer-events: none; cursor: default; } md2-multiselect .md2-multiselect-container { position: relative; width: 100%; min-width: 64px; min-height: 30px; align-items: center; padding: 2px 2px 1px; border-bottom: 1px solid rgba(0, 0, 0, 0.12); box-sizing: border-box; cursor: pointer; } md2-multiselect:focus .md2-multiselect-container { padding-bottom: 0; border-bottom: 2px solid #106cc8; } md2-multiselect.md2-multiselect-disabled .md2-multiselect-container { color: rgba(0, 0, 0, 0.38); border-color: transparent; background-image: linear-gradient(to right, rgba(0, 0, 0, 0.38) 0%, rgba(0, 0, 0, 0.38) 33%, transparent 0%); background-position: bottom -1px left 0; background-size: 4px 1px; background-repeat: repeat-x; cursor: default; } md2-multiselect.md2-multiselect-disabled:focus .md2-multiselect-container { padding-bottom: 1px; border-bottom: 1px solid transparent; } md2-multiselect .md2-multiselect-placeholder { position: absolute; right: 26px; bottom: 100%; left: 0; color: rgba(0, 0, 0, 0.38); max-width: 100%; padding-left: 3px; padding-right: 0; line-height: 1.4; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; pointer-events: none; z-index: 1; transform: translate3d(0, 26px, 0) scale(1); transition: transform 400ms cubic-bezier(0.25, 0.8, 0.25, 1); transform-origin: left top; } md2-multiselect:focus .md2-multiselect-placeholder { color: #2196f3; } md2-multiselect:focus .md2-multiselect-placeholder, md2-multiselect .md2-multiselect-placeholder.has-value { transform: translate3d(0, 6px, 0) scale(0.75); } md2-multiselect.md2-multiselect-disabled:focus .md2-multiselect-placeholder { color: rgba(0, 0, 0, 0.38); } md2-multiselect .md2-multiselect-container .md2-multiselect-value { display: block; max-height: 80px; padding-right: 26px; overflow-y: auto; font-size: 15px; line-height: 26px; } md2-multiselect .md2-multiselect-container .md2-multiselect-value-item { word-wrap: break-word; } md2-multiselect .md2-multiselect-container svg { position: absolute; right: 0; top: 0; display: block; height: 100%; background: #fff; fill: currentColor; color: rgba(0, 0, 0, 0.54); } md2-multiselect .md2-multiselect-menu { position: absolute; left: 0; top: 0; display: block; z-index: 10; width: 100%; margin: 0; padding: 8px 0; box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 2px 1px -1px rgba(0, 0, 0, 0.12); max-height: 256px; min-height: 48px; overflow-y: auto; transform: scale(1); background: #fff; } md2-multiselect .md2-multiselect-menu .md2-option { position: relative; display: block; cursor: pointer; width: auto; transition: background 150ms linear; padding: 0 16px 0 40px; height: 48px; line-height: 48px; } md2-multiselect .md2-multiselect-menu .md2-option.active { color: #106cc8; } md2-multiselect .md2-multiselect-menu .md2-option:hover, md2-multiselect .md2-multiselect-menu .md2-option.focus { background: #eeeeee; } md2-multiselect .md2-multiselect-menu .md2-option .md2-option-text { width: auto; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; font-size: 16px; } md2-multiselect .md2-option .md2-option-icon { position: absolute; top: 14px; left: 12px; width: 16px; height: 16px; border: 2px solid rgba(0, 0, 0, 0.54); border-radius: 2px; box-sizing: border-box; transition: 240ms; } md2-multiselect .md2-option.active .md2-option-icon { transform: rotate(-45deg); height: 8px; top: 17px; border-color: #106cc8; border-top-style: none; border-right-style: none; } /*# sourceMappingURL=multiselect.css.map */ "],
            providers: [MD2_MULTISELECT_CONTROL_VALUE_ACCESSOR],
            host: {
                'role': 'select',
                '[id]': 'id',
                '[class.md2-multiselect-disabled]': 'disabled',
                '[tabindex]': 'disabled ? -1 : tabindex',
                '[attr.aria-disabled]': 'disabled'
            },
            encapsulation: _angular_core.ViewEncapsulation.None
        }), 
        __metadata$41('design:paramtypes', [_angular_core.ElementRef])
    ], Md2Multiselect);
    return Md2Multiselect;
}());
var MD2_MULTISELECT_DIRECTIVES = [Md2Multiselect];
var Md2MultiselectModule = (function () {
    function Md2MultiselectModule() {
    }
    Md2MultiselectModule.forRoot = function () {
        return {
            ngModule: Md2MultiselectModule,
            providers: []
        };
    };
    Md2MultiselectModule = __decorate$41([
        _angular_core.NgModule({
            imports: [_angular_common.CommonModule, _angular_forms.FormsModule],
            exports: MD2_MULTISELECT_DIRECTIVES,
            declarations: MD2_MULTISELECT_DIRECTIVES,
        }), 
        __metadata$41('design:paramtypes', [])
    ], Md2MultiselectModule);
    return Md2MultiselectModule;
}());

var __decorate$44 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$44 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Option IDs need to be unique across components, so this counter exists outside of
 * the component definition.
 */
var _uniqueIdCounter = 0;
var Md2Option = (function () {
    function Md2Option(_element, _renderer) {
        this._element = _element;
        this._renderer = _renderer;
        this._selected = false;
        /** Whether the option is disabled.  */
        this._disabled = false;
        this._id = "md2-select-option-" + _uniqueIdCounter++;
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
        get: function () {
            return this._disabled;
        },
        set: function (value) {
            this._disabled = coerceBooleanProperty(value);
        },
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
         * TODO(kara): Add input property alternative for node envs.
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
        this.onSelect.emit();
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
            this.onSelect.emit(true);
        }
    };
    /** Returns the correct tabindex for the option depending on disabled state. */
    Md2Option.prototype._getTabIndex = function () {
        return this.disabled ? '-1' : '0';
    };
    Md2Option.prototype._getHostElement = function () {
        return this._element.nativeElement;
    };
    __decorate$44([
        _angular_core.Input(), 
        __metadata$44('design:type', Object)
    ], Md2Option.prototype, "value", void 0);
    __decorate$44([
        _angular_core.Input(), 
        __metadata$44('design:type', Object)
    ], Md2Option.prototype, "disabled", null);
    __decorate$44([
        _angular_core.Output(), 
        __metadata$44('design:type', Object)
    ], Md2Option.prototype, "onSelect", void 0);
    Md2Option = __decorate$44([
        _angular_core.Component({selector: 'md2-option, mat-option',
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
            styles: ["md2-select { display: block; outline: none; } .md2-select-trigger { color: rgba(0, 0, 0, 0.38); border-bottom: 1px solid rgba(0, 0, 0, 0.12); display: flex; justify-content: space-between; align-items: center; height: 30px; min-width: 112px; cursor: pointer; position: relative; box-sizing: border-box; } [aria-disabled='true'] .md2-select-trigger { background-image: linear-gradient(to right, rgba(0, 0, 0, 0.26) 0, rgba(0, 0, 0, 0.26) 33%, transparent 0); background-size: 4px 1px; background-repeat: repeat-x; border-bottom: transparent; background-position: 0 bottom; cursor: default; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; } md2-select:focus:not(.md2-select-disabled) .md2-select-trigger { color: #106cc8; border-bottom: 1px solid #106cc8; } md2-select.ng-invalid.ng-touched:not(.md2-select-disabled) .md2-select-trigger { color: #f44336; border-bottom: 1px solid #f44336; } .md2-select-placeholder { position: relative; padding: 0 2px; transform-origin: left top; } .md2-select-placeholder.md2-floating-placeholder { top: -22px; left: -2px; transform: scale(0.75); } [dir='rtl'] .md2-select-placeholder { transform-origin: right top; } [dir='rtl'] .md2-select-placeholder.md2-floating-placeholder { left: 2px; } [aria-required=true] .md2-select-placeholder::after { content: '*'; } .md2-select-value { position: absolute; top: 6px; right: 18px; left: 0; white-space: nowrap; overflow-x: hidden; text-overflow: ellipsis; color: rgba(0, 0, 0, 0.87); } .md2-select-disabled .md2-select-value { color: rgba(0, 0, 0, 0.38); } [dir='rtl'] .md2-select-value { left: auto; right: 0; } .md2-select-value-text:not(:last-child)::after { content: ','; margin-left: -2px; } .md2-select-arrow { width: 0; height: 0; border-left: 5px solid transparent; border-right: 5px solid transparent; border-top: 5px solid; margin: 0 4px; color: rgba(0, 0, 0, 0.38); } md2-select:focus:not(.md2-select-disabled) .md2-select-arrow { color: #106cc8; } md2-select.ng-invalid.ng-touched:not(.md2-select-disabled) .md2-select-arrow { color: #f44336; } .md2-select-panel { box-shadow: 0 0 3px rgba(0, 0, 0, 0.2), 0 8px 10px 1px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12); min-width: 112px; max-width: 280px; overflow: auto; -webkit-overflow-scrolling: touch; padding-top: 0; padding-bottom: 0; max-height: 256px; background: white; } md2-option { white-space: nowrap; overflow-x: hidden; text-overflow: ellipsis; display: flex; flex-direction: row; align-items: center; height: 48px; padding: 0 16px; font-size: 16px; font-family: Roboto, 'Helvetica Neue', sans-serif; text-align: start; text-decoration: none; position: relative; cursor: pointer; outline: none; } md2-option[aria-disabled='true'] { cursor: default; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; } md2-option:hover:not(.md2-option-disabled), md2-option:focus:not(.md2-option-disabled) { background: rgba(0, 0, 0, 0.04); } md2-option.md2-selected { color: #106cc8; } md2-option.md2-option-disabled { color: rgba(0, 0, 0, 0.38); } [multiple='true'] md2-option { padding-left: 40px; } [multiple='true'] md2-option::after { content: ''; position: absolute; top: 50%; left: 12px; display: block; width: 16px; height: 16px; margin-top: -8px; border: 2px solid; border-radius: 2px; box-sizing: border-box; transition: 240ms; } [multiple='true'] md2-option.md2-selected::after { transform: rotate(-45deg); height: 8px; border-width: 0 0 2px 2px; } .cdk-overlay-container, .cdk-global-overlay-wrapper { pointer-events: none; top: 0; left: 0; height: 100%; width: 100%; } .cdk-overlay-container { position: fixed; z-index: 1000; } .cdk-overlay-pane { position: absolute; pointer-events: auto; box-sizing: border-box; z-index: 1000; } .cdk-overlay-backdrop { position: absolute; top: 0; bottom: 0; left: 0; right: 0; z-index: 1; pointer-events: auto; transition: opacity 400ms cubic-bezier(0.25, 0.8, 0.25, 1); opacity: 0; } .cdk-overlay-transparent-backdrop { background: none; } .cdk-overlay-backdrop.cdk-overlay-backdrop-showing { opacity: 0.48; } /*# sourceMappingURL=select.css.map */ "],
            encapsulation: _angular_core.ViewEncapsulation.None
        }), 
        __metadata$44('design:paramtypes', [_angular_core.ElementRef, _angular_core.Renderer])
    ], Md2Option);
    return Md2Option;
}());

/**
 * This class manages keyboard events for selectable lists. If you pass it a query list
 * of focusable items, it will focus the correct item when arrow events occur.
 */
var ListKeyManager = (function () {
    function ListKeyManager(_items) {
        this._items = _items;
        this._tabOut = new rxjs_Subject.Subject();
        this._wrap = false;
    }
    /**
     * Turns on focus wrapping mode, which ensures that the focus will wrap to
     * the other end of list when there are no more items in the given direction.
     */
    ListKeyManager.prototype.withFocusWrap = function () {
        this._wrap = true;
        return this;
    };
    /**
     * Sets the focus of the list to the item at the index specified.
     *
     * @param index The index of the item to be focused.
     */
    ListKeyManager.prototype.setFocus = function (index) {
        this._focusedItemIndex = index;
        this._items.toArray()[index].focus();
    };
    /** Sets the focus properly depending on the key event passed in. */
    ListKeyManager.prototype.onKeydown = function (event) {
        switch (event.keyCode) {
            case DOWN_ARROW:
                this.focusNextItem();
                break;
            case UP_ARROW:
                this.focusPreviousItem();
                break;
            case HOME:
                this.focusFirstItem();
                break;
            case END:
                this.focusLastItem();
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
    /** Focuses the first enabled item in the list. */
    ListKeyManager.prototype.focusFirstItem = function () {
        this._setFocusByIndex(0, 1);
    };
    /** Focuses the last enabled item in the list. */
    ListKeyManager.prototype.focusLastItem = function () {
        this._setFocusByIndex(this._items.length - 1, -1);
    };
    /** Focuses the next enabled item in the list. */
    ListKeyManager.prototype.focusNextItem = function () {
        this._setFocusByDelta(1);
    };
    /** Focuses a previous enabled item in the list. */
    ListKeyManager.prototype.focusPreviousItem = function () {
        this._setFocusByDelta(-1);
    };
    Object.defineProperty(ListKeyManager.prototype, "focusedItemIndex", {
        /** Returns the index of the currently focused item. */
        get: function () {
            return this._focusedItemIndex;
        },
        enumerable: true,
        configurable: true
    });
    /** Allows setting of the focusedItemIndex without focusing the item. */
    ListKeyManager.prototype.updateFocusedItemIndex = function (index) {
        this._focusedItemIndex = index;
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
     * This method sets focus to the correct item, given a list of items and the delta
     * between the currently focused item and the new item to be focused. It will calculate
     * the proper focus differently depending on whether wrap mode is turned on.
     */
    ListKeyManager.prototype._setFocusByDelta = function (delta, items) {
        if (items === void 0) { items = this._items.toArray(); }
        this._wrap ? this._setWrapModeFocus(delta, items)
            : this._setDefaultModeFocus(delta, items);
    };
    /**
     * Sets the focus properly given "wrap" mode. In other words, it will continue to move
     * down the list until it finds an item that is not disabled, and it will wrap if it
     * encounters either end of the list.
     */
    ListKeyManager.prototype._setWrapModeFocus = function (delta, items) {
        // when focus would leave menu, wrap to beginning or end
        this._focusedItemIndex =
            (this._focusedItemIndex + delta + items.length) % items.length;
        // skip all disabled menu items recursively until an active one is reached
        if (items[this._focusedItemIndex].disabled) {
            this._setWrapModeFocus(delta, items);
        }
        else {
            items[this._focusedItemIndex].focus();
        }
    };
    /**
     * Sets the focus properly given the default mode. In other words, it will
     * continue to move down the list until it finds an item that is not disabled. If
     * it encounters either end of the list, it will stop and not wrap.
     */
    ListKeyManager.prototype._setDefaultModeFocus = function (delta, items) {
        this._setFocusByIndex(this._focusedItemIndex + delta, delta, items);
    };
    /**
     * Sets the focus to the first enabled item starting at the index specified. If the
     * item is disabled, it will move in the fallbackDelta direction until it either
     * finds an enabled item or encounters the end of the list.
     */
    ListKeyManager.prototype._setFocusByIndex = function (index, fallbackDelta, items) {
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
        this.setFocus(index);
    };
    return ListKeyManager;
}());

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
        top: '-22px',
        left: '-2px',
        transform: "scale(0.75)"
    })),
    _angular_core.state('floating-rtl', _angular_core.style({
        top: '-22px',
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

var __decorate$43 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$43 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param$5 = (this && this.__param) || function (paramIndex, decorator) {
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
/** Change event object emitted by Md2Select. */
var Md2SelectChange = (function () {
    function Md2SelectChange() {
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
        this.change = new _angular_core.EventEmitter();
        this.onOpen = new _angular_core.EventEmitter();
        this.onClose = new _angular_core.EventEmitter();
        if (this._control) {
            this._control.valueAccessor = this;
        }
    }
    Object.defineProperty(Md2Select.prototype, "placeholder", {
        get: function () {
            return this._placeholder;
        },
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
        get: function () {
            return this._disabled;
        },
        set: function (value) {
            this._disabled = coerceBooleanProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Select.prototype, "multiple", {
        get: function () {
            return this._multiple;
        },
        set: function (value) {
            this._multiple = coerceBooleanProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Select.prototype, "required", {
        get: function () {
            return this._required;
        },
        set: function (value) {
            this._required = coerceBooleanProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    Md2Select.prototype.ngAfterContentInit = function () {
        var _this = this;
        this._initKeyManager();
        this._resetOptions();
        this._changeSubscription = this.options.changes.subscribe(function () { return _this._resetOptions(); });
    };
    Md2Select.prototype.ngOnDestroy = function () {
        this._dropSubscriptions();
        this._changeSubscription.unsubscribe();
        this._tabSubscription.unsubscribe();
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
    /** Dispatch change event with current select and value. */
    Md2Select.prototype._emitChangeEvent = function () {
        var event = new Md2SelectChange();
        event.source = this;
        if (this.multiple) {
            event.value = this._selected.map(function (option) { return option.value; });
        }
        else {
            event.value = this._selected[0].value;
        }
        this._onChange(event.value);
        this.change.emit(event);
    };
    /**
     * Sets the select's value. Part of the ControlValueAccessor interface
     * required to integrate with Angular's core forms API.
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
     */
    Md2Select.prototype.registerOnChange = function (fn) {
        this._onChange = fn;
    };
    /**
     * Saves a callback function to be invoked when the select is blurred
     * by the user. Part of the ControlValueAccessor interface required
     * to integrate with Angular's core forms API.
     */
    Md2Select.prototype.registerOnTouched = function (fn) {
        this._onTouched = fn;
    };
    /**
     * Disables the select. Part of the ControlValueAccessor interface required
     * to integrate with Angular's core forms API.
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
     * When the panel is finished animating, emits an event and focuses
     * an option if the panel is open.
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
        var options = this.options.toArray();
        if (this.multiple) {
            this._selected = [];
            value = Array.isArray(value) ? value : [];
            for (var i = 0; i < this.options.length; i++) {
                if (value.indexOf(options[i].value) > -1) {
                    options[i].select();
                }
            }
            this._updateOptions();
        }
        else {
            for (var i = 0; i < this.options.length; i++) {
                if (options[i].value === value) {
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
        this._keyManager = new ListKeyManager(this.options);
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
            var sub = option.onSelect.subscribe(function (isUserInput) {
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
                if (isUserInput) {
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
            this._keyManager.setFocus(this._getOptionIndex(this.selected[0]));
        }
        else {
            this._keyManager.focusFirstItem();
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
    __decorate$43([
        _angular_core.ViewChild('trigger'), 
        __metadata$43('design:type', _angular_core.ElementRef)
    ], Md2Select.prototype, "trigger", void 0);
    __decorate$43([
        _angular_core.ViewChild(ConnectedOverlayDirective), 
        __metadata$43('design:type', ConnectedOverlayDirective)
    ], Md2Select.prototype, "overlayDir", void 0);
    __decorate$43([
        _angular_core.ContentChildren(Md2Option), 
        __metadata$43('design:type', _angular_core.QueryList)
    ], Md2Select.prototype, "options", void 0);
    __decorate$43([
        _angular_core.Output(), 
        __metadata$43('design:type', _angular_core.EventEmitter)
    ], Md2Select.prototype, "change", void 0);
    __decorate$43([
        _angular_core.Input(), 
        __metadata$43('design:type', Object)
    ], Md2Select.prototype, "placeholder", null);
    __decorate$43([
        _angular_core.Input(), 
        __metadata$43('design:type', Object)
    ], Md2Select.prototype, "disabled", null);
    __decorate$43([
        _angular_core.Input(), 
        __metadata$43('design:type', Object)
    ], Md2Select.prototype, "multiple", null);
    __decorate$43([
        _angular_core.Input(), 
        __metadata$43('design:type', Object)
    ], Md2Select.prototype, "required", null);
    __decorate$43([
        _angular_core.Output(), 
        __metadata$43('design:type', Object)
    ], Md2Select.prototype, "onOpen", void 0);
    __decorate$43([
        _angular_core.Output(), 
        __metadata$43('design:type', Object)
    ], Md2Select.prototype, "onClose", void 0);
    Md2Select = __decorate$43([
        _angular_core.Component({selector: 'md2-select, mat-select',
            template: "<div class=\"md2-select-trigger\" cdk-overlay-origin (click)=\"toggle()\" #origin=\"cdkOverlayOrigin\" #trigger> <span class=\"md2-select-placeholder\" [class.md2-floating-placeholder]=\"this.selected.length\" [@transformPlaceholder]=\"_placeholderState\" [style.width.px]=\"_selectedValueWidth\">{{ placeholder }}</span> <span class=\"md2-select-value\"> <span class=\"md2-select-value-text\" *ngFor=\"let option of selected\"> {{ option.viewValue }} </span> </span> <span class=\"md2-select-arrow\"></span> </div> <template cdk-connected-overlay [origin]=\"origin\" [open]=\"panelOpen\" hasBackdrop (backdropClick)=\"close()\" backdropClass=\"cdk-overlay-transparent-backdrop\" [positions]=\"_positions\" [minWidth]=\"_triggerWidth\" [offsetY]=\"_offsetY\" [offsetX]=\"_offsetX\" (attach)=\"_setScrollTop()\"> <div class=\"md2-select-panel\" [@transformPanel]=\"'showing'\" (@transformPanel.done)=\"_onPanelDone()\" (keydown)=\"_keyManager.onKeydown($event)\" [style.transformOrigin]=\"_transformOrigin\"  [attr.multiple]=\"multiple\"> <div class=\"md2-select-content\" [@fadeInContent]=\"'showing'\"> <ng-content></ng-content> </div> </div> </template> ",
            styles: ["md2-select { display: block; outline: none; } .md2-select-trigger { color: rgba(0, 0, 0, 0.38); border-bottom: 1px solid rgba(0, 0, 0, 0.12); display: flex; justify-content: space-between; align-items: center; height: 30px; min-width: 112px; cursor: pointer; position: relative; box-sizing: border-box; } [aria-disabled='true'] .md2-select-trigger { background-image: linear-gradient(to right, rgba(0, 0, 0, 0.26) 0, rgba(0, 0, 0, 0.26) 33%, transparent 0); background-size: 4px 1px; background-repeat: repeat-x; border-bottom: transparent; background-position: 0 bottom; cursor: default; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; } md2-select:focus:not(.md2-select-disabled) .md2-select-trigger { color: #106cc8; border-bottom: 1px solid #106cc8; } md2-select.ng-invalid.ng-touched:not(.md2-select-disabled) .md2-select-trigger { color: #f44336; border-bottom: 1px solid #f44336; } .md2-select-placeholder { position: relative; padding: 0 2px; transform-origin: left top; } .md2-select-placeholder.md2-floating-placeholder { top: -22px; left: -2px; transform: scale(0.75); } [dir='rtl'] .md2-select-placeholder { transform-origin: right top; } [dir='rtl'] .md2-select-placeholder.md2-floating-placeholder { left: 2px; } [aria-required=true] .md2-select-placeholder::after { content: '*'; } .md2-select-value { position: absolute; top: 6px; right: 18px; left: 0; white-space: nowrap; overflow-x: hidden; text-overflow: ellipsis; color: rgba(0, 0, 0, 0.87); } .md2-select-disabled .md2-select-value { color: rgba(0, 0, 0, 0.38); } [dir='rtl'] .md2-select-value { left: auto; right: 0; } .md2-select-value-text:not(:last-child)::after { content: ','; margin-left: -2px; } .md2-select-arrow { width: 0; height: 0; border-left: 5px solid transparent; border-right: 5px solid transparent; border-top: 5px solid; margin: 0 4px; color: rgba(0, 0, 0, 0.38); } md2-select:focus:not(.md2-select-disabled) .md2-select-arrow { color: #106cc8; } md2-select.ng-invalid.ng-touched:not(.md2-select-disabled) .md2-select-arrow { color: #f44336; } .md2-select-panel { box-shadow: 0 0 3px rgba(0, 0, 0, 0.2), 0 8px 10px 1px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12); min-width: 112px; max-width: 280px; overflow: auto; -webkit-overflow-scrolling: touch; padding-top: 0; padding-bottom: 0; max-height: 256px; background: white; } md2-option { white-space: nowrap; overflow-x: hidden; text-overflow: ellipsis; display: flex; flex-direction: row; align-items: center; height: 48px; padding: 0 16px; font-size: 16px; font-family: Roboto, 'Helvetica Neue', sans-serif; text-align: start; text-decoration: none; position: relative; cursor: pointer; outline: none; } md2-option[aria-disabled='true'] { cursor: default; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; } md2-option:hover:not(.md2-option-disabled), md2-option:focus:not(.md2-option-disabled) { background: rgba(0, 0, 0, 0.04); } md2-option.md2-selected { color: #106cc8; } md2-option.md2-option-disabled { color: rgba(0, 0, 0, 0.38); } [multiple='true'] md2-option { padding-left: 40px; } [multiple='true'] md2-option::after { content: ''; position: absolute; top: 50%; left: 12px; display: block; width: 16px; height: 16px; margin-top: -8px; border: 2px solid; border-radius: 2px; box-sizing: border-box; transition: 240ms; } [multiple='true'] md2-option.md2-selected::after { transform: rotate(-45deg); height: 8px; border-width: 0 0 2px 2px; } .cdk-overlay-container, .cdk-global-overlay-wrapper { pointer-events: none; top: 0; left: 0; height: 100%; width: 100%; } .cdk-overlay-container { position: fixed; z-index: 1000; } .cdk-overlay-pane { position: absolute; pointer-events: auto; box-sizing: border-box; z-index: 1000; } .cdk-overlay-backdrop { position: absolute; top: 0; bottom: 0; left: 0; right: 0; z-index: 1; pointer-events: auto; transition: opacity 400ms cubic-bezier(0.25, 0.8, 0.25, 1); opacity: 0; } .cdk-overlay-transparent-backdrop { background: none; } .cdk-overlay-backdrop.cdk-overlay-backdrop-showing { opacity: 0.48; } /*# sourceMappingURL=select.css.map */ "],
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
        __param$5(3, _angular_core.Optional()),
        __param$5(4, _angular_core.Optional()), 
        __metadata$43('design:paramtypes', [_angular_core.ElementRef, _angular_core.Renderer, ViewportRuler, Dir, _angular_forms.NgControl])
    ], Md2Select);
    return Md2Select;
}());
/** Clamps a value n between min and max values. */
function clampValue(min, n, max) {
    return Math.min(Math.max(min, n), max);
}

var __decorate$42 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$42 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var Md2SelectModule = (function () {
    function Md2SelectModule() {
    }
    Md2SelectModule.forRoot = function () {
        return {
            ngModule: Md2SelectModule,
            providers: [OVERLAY_PROVIDERS]
        };
    };
    Md2SelectModule = __decorate$42([
        _angular_core.NgModule({
            imports: [_angular_common.CommonModule, OverlayModule, MdRippleModule, DefaultStyleCompatibilityModeModule],
            exports: [Md2Select, Md2Option, DefaultStyleCompatibilityModeModule],
            declarations: [Md2Select, Md2Option],
        }), 
        __metadata$42('design:paramtypes', [])
    ], Md2SelectModule);
    return Md2SelectModule;
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
var Md2TabChangeEvent = (function () {
    function Md2TabChangeEvent() {
    }
    return Md2TabChangeEvent;
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
    __decorate$45([
        _angular_core.Input(), 
        __metadata$45('design:type', Object)
    ], Md2Transclude.prototype, "md2Transclude", null);
    Md2Transclude = __decorate$45([
        _angular_core.Directive({ selector: '[md2Transclude]' }), 
        __metadata$45('design:paramtypes', [_angular_core.ViewContainerRef])
    ], Md2Transclude);
    return Md2Transclude;
}());
var Md2Tab = (function () {
    function Md2Tab() {
    }
    __decorate$45([
        _angular_core.Input(), 
        __metadata$45('design:type', String)
    ], Md2Tab.prototype, "label", void 0);
    __decorate$45([
        _angular_core.Input(), 
        __metadata$45('design:type', Boolean)
    ], Md2Tab.prototype, "active", void 0);
    __decorate$45([
        _angular_core.Input(), 
        __metadata$45('design:type', Boolean)
    ], Md2Tab.prototype, "disabled", void 0);
    __decorate$45([
        _angular_core.Input(), 
        __metadata$45('design:type', String)
    ], Md2Tab.prototype, "class", void 0);
    Md2Tab = __decorate$45([
        _angular_core.Component({selector: 'md2-tab',
            template: "<ng-content></ng-content>",
            host: {
                '[class]': 'class',
                '[class.active]': 'active'
            }
        }), 
        __metadata$45('design:paramtypes', [])
    ], Md2Tab);
    return Md2Tab;
}());
var Md2TabLabel = (function () {
    function Md2TabLabel(templateRef, tab) {
        this.templateRef = templateRef;
        tab.labelRef = templateRef;
    }
    Md2TabLabel = __decorate$45([
        _angular_core.Directive({ selector: '[md2-tab-label]' }), 
        __metadata$45('design:paramtypes', [_angular_core.TemplateRef, Md2Tab])
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
    }
    Object.defineProperty(Md2Tabs.prototype, "selectedIndex", {
        get: function () { return this._selectedIndex; },
        set: function (value) {
            if (typeof value === 'string') {
                value = parseInt(value);
            }
            if (value != this._selectedIndex) {
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
                    this.change.emit(this._createChangeEvent(value));
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
    /**
     * Create Change Event
     * @param index
     * @return event of Md2TabChangeEvent
     */
    Md2Tabs.prototype._createChangeEvent = function (index) {
        var event = new Md2TabChangeEvent;
        event.index = index;
        if (this.tabs && this.tabs.length) {
            event.tab = this.tabs.toArray()[index];
        }
        return event;
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
    __decorate$45([
        _angular_core.ContentChildren(Md2Tab), 
        __metadata$45('design:type', _angular_core.QueryList)
    ], Md2Tabs.prototype, "tabs", void 0);
    __decorate$45([
        _angular_core.Input(), 
        __metadata$45('design:type', String)
    ], Md2Tabs.prototype, "class", void 0);
    __decorate$45([
        _angular_core.Input(), 
        __metadata$45('design:type', Object), 
        __metadata$45('design:paramtypes', [Object])
    ], Md2Tabs.prototype, "selectedIndex", null);
    __decorate$45([
        _angular_core.Output(), 
        __metadata$45('design:type', _angular_core.EventEmitter)
    ], Md2Tabs.prototype, "change", void 0);
    Md2Tabs = __decorate$45([
        _angular_core.Component({selector: 'md2-tabs',
            template: "<div class=\"md2-tabs-header-wrapper\"> <div role=\"button\" class=\"md2-prev-button\" [class.disabled]=\"!canPageBack()\" *ngIf=\"_shouldPaginate\" (click)=\"previousPage()\"> <em class=\"prev-icon\">Prev</em> </div> <div role=\"button\" class=\"md2-next-button\" [class.disabled]=\"!canPageForward()\" *ngIf=\"_shouldPaginate\" (click)=\"nextPage()\"> <em class=\"next-icon\">Next</em> </div> <div class=\"md2-tabs-canvas\" [class.md2-paginated]=\"_shouldPaginate\" role=\"tablist\" tabindex=\"0\" (keydown.arrowRight)=\"focusNextTab()\" (keydown.arrowLeft)=\"focusPreviousTab()\" (keydown.enter)=\"selectedIndex = focusIndex\" (mousewheel)=\"scroll($event)\"> <div class=\"md2-tabs-header\" [style.marginLeft]=\"-_offsetLeft + 'px'\"> <div class=\"md2-tab-label\" role=\"tab\" *ngFor=\"let tab of tabs; let i = index\" [class.focus]=\"focusIndex === i\" [class.active]=\"selectedIndex === i\" [class.disabled]=\"tab.disabled\" (click)=\"focusIndex = selectedIndex = i\"> <span [md2Transclude]=\"tab.labelRef\">{{tab.label}}</span> </div> <div class=\"md2-tab-ink-bar\" [style.left]=\"_inkBarLeft\" [style.width]=\"_inkBarWidth\"></div> </div> </div> </div> <div class=\"md2-tabs-body-wrapper\"> <ng-content></ng-content> </div> ",
            styles: ["md2-tabs { position: relative; overflow: hidden; display: block; margin: 0; border: 1px solid #e1e1e1; border-radius: 2px; } .md2-tabs-header-wrapper { position: relative; display: block; height: 48px; background: white; border-width: 0 0 1px; border-style: solid; border-color: rgba(0, 0, 0, 0.12); margin: 0; padding: 0; list-style: none; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; } .md2-tabs-header-wrapper::after { content: ''; display: table; clear: both; } .md2-prev-button, .md2-next-button { position: absolute; top: 0; height: 100%; width: 32px; padding: 8px 0; z-index: 2; cursor: pointer; } .md2-prev-button.disabled, .md2-next-button.disabled { opacity: 0.25; cursor: default; } .md2-prev-button { left: 0; } .md2-next-button { right: 0; } .md2-prev-button .prev-icon, .md2-next-button .next-icon { display: block; width: 12px; height: 12px; font-size: 0; border-width: 0 0 2px 2px; border-style: solid; border-color: #757575; border-radius: 1px; transform: rotate(45deg); margin: 10px; } .md2-next-button .next-icon { border-width: 2px 2px 0 0; } .md2-tabs-canvas { position: relative; height: 100%; overflow: hidden; display: block; outline: none; } .md2-tabs-canvas.md2-paginated { margin: 0 32px; } .md2-tabs-header { position: relative; display: inline-block; height: 100%; white-space: nowrap; transition: 500ms cubic-bezier(0.35, 0, 0.25, 1); } .md2-tab-label { position: relative; height: 100%; color: rgba(0, 0, 0, 0.54); font-size: 14px; text-align: center; line-height: 24px; padding: 12px 24px; transition: background-color 350ms cubic-bezier(0.35, 0, 0.25, 1); cursor: pointer; white-space: nowrap; text-transform: uppercase; display: inline-block; font-weight: 500; box-sizing: border-box; overflow: hidden; -ms-text-overflow: ellipsis; text-overflow: ellipsis; } .md2-tab-label.active { color: #106cc8; } .md2-tabs-canvas:focus .md2-tab-label.focus { background: rgba(0, 0, 0, 0.05); } .md2-tab-label.disabled { color: rgba(0, 0, 0, 0.26); pointer-events: none; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; -webkit-user-drag: none; opacity: 0.5; cursor: default; } .md2-tab-ink-bar { position: absolute; bottom: 0; height: 2px; background: #ff5252; transition: 250ms cubic-bezier(0.35, 0, 0.25, 1); } .md2-tabs-body-wrapper { position: relative; min-height: 0; display: block; clear: both; } md2-tab { padding: 16px; display: none; position: relative; } md2-tab.active { display: block; position: relative; } /*# sourceMappingURL=tabs.css.map */ "],
            host: {
                '[class]': 'class',
                '(window:resize)': 'onWindowResize($event)'
            },
            encapsulation: _angular_core.ViewEncapsulation.None
        }), 
        __metadata$45('design:paramtypes', [_angular_core.ElementRef])
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
    Md2TabsModule = __decorate$45([
        _angular_core.NgModule({
            imports: [_angular_common.CommonModule],
            exports: MD2_TABS_DIRECTIVES,
            declarations: [Md2Transclude, Md2TabLabel, Md2Tabs, Md2Tab],
        }), 
        __metadata$45('design:paramtypes', [])
    ], Md2TabsModule);
    return Md2TabsModule;
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
var noop$4 = function () { };
var nextId$5 = 0;
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
        this._onTouchedCallback = noop$4;
        this._onChangeCallback = noop$4;
        this._tags = [];
        this._list = [];
        this._items = [];
        this._focusedTag = 0;
        this._selectedTag = -1;
        this._inputValue = '';
        this._inputFocused = false;
        this.noBlur = true;
        this.id = 'md2-tags-' + (++nextId$5);
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
    __decorate$46([
        _angular_core.Output(), 
        __metadata$46('design:type', _angular_core.EventEmitter)
    ], Md2Tags.prototype, "change", void 0);
    __decorate$46([
        _angular_core.Input(), 
        __metadata$46('design:type', String)
    ], Md2Tags.prototype, "id", void 0);
    __decorate$46([
        _angular_core.Input(), 
        __metadata$46('design:type', Number)
    ], Md2Tags.prototype, "tabindex", void 0);
    __decorate$46([
        _angular_core.Input(), 
        __metadata$46('design:type', String)
    ], Md2Tags.prototype, "placeholder", void 0);
    __decorate$46([
        _angular_core.Input('md2-tag-text'), 
        __metadata$46('design:type', String)
    ], Md2Tags.prototype, "textKey", void 0);
    __decorate$46([
        _angular_core.Input('md2-tag-value'), 
        __metadata$46('design:type', String)
    ], Md2Tags.prototype, "valueKey", void 0);
    __decorate$46([
        _angular_core.Input(), 
        __metadata$46('design:type', Boolean)
    ], Md2Tags.prototype, "disabled", null);
    __decorate$46([
        _angular_core.Input('md2-tags'), 
        __metadata$46('design:type', Array), 
        __metadata$46('design:paramtypes', [Array])
    ], Md2Tags.prototype, "tags", null);
    __decorate$46([
        _angular_core.Input(), 
        __metadata$46('design:type', Object)
    ], Md2Tags.prototype, "value", null);
    __decorate$46([
        _angular_core.HostListener('keydown', ['$event']), 
        __metadata$46('design:type', Function), 
        __metadata$46('design:paramtypes', [KeyboardEvent]), 
        __metadata$46('design:returntype', void 0)
    ], Md2Tags.prototype, "_handleKeydown", null);
    __decorate$46([
        _angular_core.HostListener('focus'), 
        __metadata$46('design:type', Function), 
        __metadata$46('design:paramtypes', []), 
        __metadata$46('design:returntype', void 0)
    ], Md2Tags.prototype, "_handleFocus", null);
    Md2Tags = __decorate$46([
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
        __metadata$46('design:paramtypes', [_angular_core.ElementRef])
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
    Md2TagsModule = __decorate$46([
        _angular_core.NgModule({
            imports: [_angular_common.CommonModule, _angular_forms.FormsModule, Md2AutocompleteModule],
            exports: MD2_TAGS_DIRECTIVES,
            declarations: MD2_TAGS_DIRECTIVES,
        }), 
        __metadata$46('design:paramtypes', [])
    ], Md2TagsModule);
    return Md2TagsModule;
}());

var __decorate$47 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$47 = (this && this.__metadata) || function (k, v) {
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
        var toast;
        toast = new Toast(message);
        if (duration) {
            this._config.duration = duration;
        }
        if (toast) {
            if (!this._toastInstance) {
                var strategy = this._overlay.position().global().top('0').right('0');
                var config = new OverlayState();
                config.positionStrategy = strategy;
                this._overlayRef = this._overlay.create(config);
                var portal = new ComponentPortal(Md2ToastComponent);
                this._toastInstance = this._overlayRef.attach(portal).instance;
                this.setupToast(toast);
            }
            else {
                this.setupToast(toast);
            }
        }
    };
    /**
     * toast timeout
     * @param toastId
     */
    Md2Toast.prototype.startTimeout = function (toastId) {
        var _this = this;
        setTimeout(function () {
            _this.clear(toastId);
        }, this._config.duration);
    };
    /**
     * setup toast
     * @param toast
     */
    Md2Toast.prototype.setupToast = function (toast) {
        toast.id = ++this.index;
        this._toastInstance.add(toast);
        this.startTimeout(toast.id);
    };
    /**
     * clear specific toast
     * @param toastId
     */
    Md2Toast.prototype.clear = function (toastId) {
        var _this = this;
        if (this._toastInstance) {
            this._toastInstance.remove(toastId);
            setTimeout(function () {
                if (!_this._toastInstance.hasToast()) {
                    _this.dispose();
                }
            }, 250);
        }
    };
    /**
     * clear all toasts
     */
    Md2Toast.prototype.clearAll = function () {
        var _this = this;
        if (this._toastInstance) {
            this._toastInstance.removeAll();
            setTimeout(function () {
                if (!_this._toastInstance.hasToast()) {
                    _this.dispose();
                }
            }, 250);
        }
    };
    /**
     * dispose all toasts
     */
    Md2Toast.prototype.dispose = function () {
        this._overlayRef.dispose();
        this._overlayRef = null;
        this._toastInstance = null;
    };
    Md2Toast = __decorate$47([
        _angular_core.Injectable(), 
        __metadata$47('design:paramtypes', [Overlay, Md2ToastConfig])
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
    Md2ToastComponent.prototype.add = function (toast) {
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
    Md2ToastComponent.prototype.remove = function (toastId) {
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
    Md2ToastComponent.prototype.removeAll = function () {
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
    Md2ToastComponent = __decorate$47([
        _angular_core.Component({
            selector: 'md2-toast',
            template: "<div *ngFor=\"let toast of toasts\" class=\"md2-toast\" [class.in]=\"toast.isVisible\" (click)=\"remove(toast.id)\">{{ toast.message }}</div> ",
            styles: ["md2-toast { display: block; box-sizing: border-box; cursor: default; overflow: hidden; min-width: 304px; max-width: 100%; padding: 8px; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; } .md2-toast { position: relative; padding: 14px 24px; margin-bottom: 5px; display: block; margin-top: -53px; opacity: 0; background-color: #323232; color: #fafafa; box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.26); border-radius: 2px; font-size: 14px; overflow: hidden; word-wrap: break-word; transition: all 250ms linear; } .md2-toast.in { margin-top: 0; opacity: 1; } .cdk-visually-hidden { border: 0; clip: rect(0 0 0 0); height: 1px; margin: -1px; overflow: hidden; padding: 0; position: absolute; text-transform: none; width: 1px; } .cdk-overlay-container, .cdk-global-overlay-wrapper { pointer-events: none; top: 0; left: 0; height: 100%; width: 100%; } .cdk-overlay-container { position: fixed; z-index: 1000; } .cdk-global-overlay-wrapper { display: flex; position: absolute; z-index: 1000; } .cdk-overlay-pane { position: absolute; pointer-events: auto; box-sizing: border-box; z-index: 1000; } .cdk-overlay-backdrop { position: absolute; top: 0; bottom: 0; left: 0; right: 0; z-index: 1; pointer-events: auto; transition: opacity 400ms cubic-bezier(0.25, 0.8, 0.25, 1); opacity: 0; } .cdk-overlay-backdrop.cdk-overlay-backdrop-showing { opacity: 0.48; } .cdk-overlay-dark-backdrop { background: #212121; } /*# sourceMappingURL=toast.css.map */ "],
            encapsulation: _angular_core.ViewEncapsulation.None,
        }), 
        __metadata$47('design:paramtypes', [])
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
            providers: [Md2Toast, Md2ToastConfig, OVERLAY_PROVIDERS]
        };
    };
    Md2ToastModule = __decorate$47([
        _angular_core.NgModule({
            imports: [_angular_common.CommonModule],
            exports: MD2_TOAST_DIRECTIVES,
            declarations: MD2_TOAST_DIRECTIVES,
            entryComponents: MD2_TOAST_DIRECTIVES
        }), 
        __metadata$47('design:paramtypes', [])
    ], Md2ToastModule);
    return Md2ToastModule;
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
var Md2Tooltip = (function () {
    function Md2Tooltip(_viewContainer, _overlay) {
        this._viewContainer = _viewContainer;
        this._overlay = _overlay;
        this.visible = false;
        this.position = 'below';
        this.delay = 0;
    }
    /**
     * show tooltip while mouse enter or focus of element
     * @param event
     */
    Md2Tooltip.prototype.show = function (event) {
        var _this = this;
        if (this.visible) {
            return;
        }
        this.visible = true;
        clearTimeout(this.timer);
        this.timer = setTimeout(function () {
            _this.timer = 0;
            var strategy = _this._overlay.position().global().top('0').left('0');
            var config = new OverlayState();
            config.positionStrategy = strategy;
            _this._overlayRef = _this._overlay.create(config);
            var portal = new ComponentPortal(Md2TooltipComponent);
            _this._tooltipInstance = _this._overlayRef.attach(portal).instance;
            _this._tooltipInstance.message = _this.message;
            _this._tooltipInstance.position = _this.position;
            _this._tooltipInstance.hostEl = _this._viewContainer.element;
        }, this.delay);
    };
    /**
     * hide tooltip while mouse our/leave or blur of element
     * @param event
     */
    Md2Tooltip.prototype.hide = function (event) {
        clearTimeout(this.timer);
        if (!this.visible) {
            return;
        }
        this.visible = false;
        if (this._tooltipInstance) {
            this._overlayRef.dispose();
            this._overlayRef = null;
            this._tooltipInstance = null;
        }
    };
    __decorate$48([
        _angular_core.Input('tooltip'), 
        __metadata$48('design:type', String)
    ], Md2Tooltip.prototype, "message", void 0);
    __decorate$48([
        _angular_core.Input('tooltip-position'), 
        __metadata$48('design:type', String)
    ], Md2Tooltip.prototype, "position", void 0);
    __decorate$48([
        _angular_core.Input('tooltip-delay'), 
        __metadata$48('design:type', Number)
    ], Md2Tooltip.prototype, "delay", void 0);
    __decorate$48([
        _angular_core.HostListener('focusin', ['$event']),
        _angular_core.HostListener('mouseenter', ['$event']), 
        __metadata$48('design:type', Function), 
        __metadata$48('design:paramtypes', [Event]), 
        __metadata$48('design:returntype', void 0)
    ], Md2Tooltip.prototype, "show", null);
    __decorate$48([
        _angular_core.HostListener('focusout', ['$event']),
        _angular_core.HostListener('mouseleave', ['$event']), 
        __metadata$48('design:type', Function), 
        __metadata$48('design:paramtypes', [Event]), 
        __metadata$48('design:returntype', void 0)
    ], Md2Tooltip.prototype, "hide", null);
    Md2Tooltip = __decorate$48([
        _angular_core.Directive({
            selector: '[tooltip]'
        }), 
        __metadata$48('design:paramtypes', [_angular_core.ViewContainerRef, Overlay])
    ], Md2Tooltip);
    return Md2Tooltip;
}());
var Md2TooltipComponent = (function () {
    function Md2TooltipComponent(_element, _changeDetector) {
        this._element = _element;
        this._changeDetector = _changeDetector;
        this._top = '-1000px';
        this._left = '-1000px';
        this._isVisible = false;
    }
    Md2TooltipComponent.prototype.ngAfterViewInit = function () {
        var _position = this.positionElements(this.hostEl.nativeElement, this._element.nativeElement.children[0], this.position);
        this._top = _position.top + 'px';
        this._left = _position.left + 'px';
        this._isVisible = true;
        this._changeDetector.detectChanges();
    };
    /**
     * calculate position of target element
     * @param hostEl host element
     * @param targetEl targer element
     * @param position position
     * @return {top: number, left: number} object of top, left properties
     */
    Md2TooltipComponent.prototype.positionElements = function (hostEl, targetEl, position) {
        var positionStrParts = position.split('-');
        var pos0 = positionStrParts[0];
        var pos1 = positionStrParts[1] || 'center';
        var hostElPos = this.offset(hostEl);
        var targetElWidth = targetEl.offsetWidth;
        var targetElHeight = targetEl.offsetHeight;
        var shiftWidth = {
            center: hostElPos.left + hostElPos.width / 2 - targetElWidth / 2,
            before: hostElPos.left,
            after: hostElPos.left + hostElPos.width
        };
        var shiftHeight = {
            center: hostElPos.top + hostElPos.height / 2 - targetElHeight / 2,
            above: hostElPos.top,
            below: hostElPos.top + hostElPos.height
        };
        var targetElPos;
        switch (pos0) {
            case 'before':
                targetElPos = {
                    top: shiftHeight[pos1],
                    left: (hostElPos.left - targetElWidth)
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
    };
    /**
     * calculate offset of target element
     * @param nativeEl element
     * @return {width: number, height: number,top: number, left: number}
     *         object of with, height, top, left properties
     */
    Md2TooltipComponent.prototype.offset = function (nativeEl) {
        var boundingClientRect = nativeEl.getBoundingClientRect();
        return {
            width: boundingClientRect.width || nativeEl.offsetWidth,
            height: boundingClientRect.height || nativeEl.offsetHeight,
            top: boundingClientRect.top,
            left: boundingClientRect.left
        };
    };
    Object.defineProperty(Md2TooltipComponent.prototype, "window", {
        get: function () { return window; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2TooltipComponent.prototype, "document", {
        get: function () { return window.document; },
        enumerable: true,
        configurable: true
    });
    Md2TooltipComponent = __decorate$48([
        _angular_core.Component({selector: 'md2-tooltip',
            template: "\n    <div class=\"md2-tooltip-container\" [ngStyle]=\"{top: _top, left: _left}\">\n      <div class=\"md2-tooltip {{position}}\" [class.visible]=\"_isVisible\">{{message}}</div>\n    </div>\n  ",
            styles: ["md2-tooltip { pointer-events: none; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; -webkit-backface-visibility: hidden; backface-visibility: hidden; } md2-tooltip .md2-tooltip-container { position: fixed; display: block; overflow: hidden; z-index: 1070; } md2-tooltip .md2-tooltip { max-width: 200px; margin: 14px; padding: 4px 12px; font-family: \"\"; color: white; font-size: 10px; word-wrap: break-word; background-color: rgba(97, 97, 97, 0.9); border-radius: 2px; line-height: 1.5; opacity: 0; transition: all 200ms cubic-bezier(0.25, 0.8, 0.25, 1); transform-origin: center top; transform: scale(0); } md2-tooltip .md2-tooltip.before { transform-origin: center right; } md2-tooltip .md2-tooltip.after { transform-origin: center left; } md2-tooltip .md2-tooltip.above { transform-origin: center bottom; } md2-tooltip .md2-tooltip.visible { opacity: 1; transform: scale(1); } .cdk-visually-hidden { border: 0; clip: rect(0 0 0 0); height: 1px; margin: -1px; overflow: hidden; padding: 0; position: absolute; text-transform: none; width: 1px; } .cdk-overlay-container, .cdk-global-overlay-wrapper { pointer-events: none; top: 0; left: 0; height: 100%; width: 100%; } .cdk-overlay-container { position: fixed; z-index: 1000; } .cdk-global-overlay-wrapper { display: flex; position: absolute; z-index: 1000; } .cdk-overlay-pane { position: absolute; pointer-events: auto; box-sizing: border-box; z-index: 1000; } .cdk-overlay-backdrop { position: absolute; top: 0; bottom: 0; left: 0; right: 0; z-index: 1; pointer-events: auto; transition: opacity 400ms cubic-bezier(0.25, 0.8, 0.25, 1); opacity: 0; } .cdk-overlay-backdrop.cdk-overlay-backdrop-showing { opacity: 0.48; } .cdk-overlay-dark-backdrop { background: #212121; } /*# sourceMappingURL=tooltip.css.map */ "],
            host: {
                'role': 'tooltip',
            },
            encapsulation: _angular_core.ViewEncapsulation.None
        }), 
        __metadata$48('design:paramtypes', [_angular_core.ElementRef, _angular_core.ChangeDetectorRef])
    ], Md2TooltipComponent);
    return Md2TooltipComponent;
}());
var MD2_TOOLTIP_DIRECTIVES = [Md2Tooltip, Md2TooltipComponent];
var Md2TooltipModule = (function () {
    function Md2TooltipModule() {
    }
    Md2TooltipModule.forRoot = function () {
        return {
            ngModule: Md2TooltipModule,
            providers: [OVERLAY_PROVIDERS]
        };
    };
    Md2TooltipModule = __decorate$48([
        _angular_core.NgModule({
            imports: [_angular_common.CommonModule],
            exports: MD2_TOOLTIP_DIRECTIVES,
            declarations: MD2_TOOLTIP_DIRECTIVES,
            entryComponents: [Md2TooltipComponent]
        }), 
        __metadata$48('design:paramtypes', [])
    ], Md2TooltipModule);
    return Md2TooltipModule;
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
    Md2MultiselectModule,
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
    DefaultStyleCompatibilityModeModule,
    ObserveContentModule
];
var Md2RootModule = (function () {
    function Md2RootModule() {
    }
    Md2RootModule = __decorate$23([
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
                Md2MultiselectModule.forRoot(),
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
                DefaultStyleCompatibilityModeModule.forRoot(),
            ],
            exports: MD2_MODULES,
        }), 
        __metadata$23('design:paramtypes', [])
    ], Md2RootModule);
    return Md2RootModule;
}());
var Md2Module = (function () {
    function Md2Module() {
    }
    Md2Module.forRoot = function () {
        return { ngModule: Md2RootModule };
    };
    Md2Module = __decorate$23([
        _angular_core.NgModule({
            imports: MD2_MODULES,
            exports: MD2_MODULES,
        }), 
        __metadata$23('design:paramtypes', [])
    ], Md2Module);
    return Md2Module;
}());

exports.MdCoreModule = MdCoreModule;
exports.Dir = Dir;
exports.RtlModule = RtlModule;
exports.ObserveContentModule = ObserveContentModule;
exports.ObserveContent = ObserveContent;
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
exports.MdLiveAnnouncer = LiveAnnouncer;
exports.FocusTrap = FocusTrap;
exports.InteractivityChecker = InteractivityChecker;
exports.isFakeMousedownFromScreenReader = isFakeMousedownFromScreenReader;
exports.A11yModule = A11yModule;
exports.UniqueSelectionDispatcher = UniqueSelectionDispatcher;
exports.MdUniqueSelectionDispatcher = UniqueSelectionDispatcher;
exports.MdLineModule = MdLineModule;
exports.MdLine = MdLine;
exports.MdLineSetter = MdLineSetter;
exports.applyCssTransform = applyCssTransform;
exports.MdError = MdError;
exports.coerceBooleanProperty = coerceBooleanProperty;
exports.coerceNumberProperty = coerceNumberProperty;
exports.DefaultStyleCompatibilityModeModule = DefaultStyleCompatibilityModeModule;
exports.NoConflictStyleCompatibilityMode = NoConflictStyleCompatibilityMode;
exports.DomProjectionHost = DomProjectionHost;
exports.DomProjection = DomProjection;
exports.ProjectionModule = ProjectionModule;
exports.PlatformModule = PlatformModule;
exports.Platform = Platform;
exports.getSupportedInputTypes = getSupportedInputTypes;
exports.ConnectedPositionStrategy = ConnectedPositionStrategy;
exports.ConnectionPositionPair = ConnectionPositionPair;
exports.ConnectedOverlayPositionChange = ConnectedOverlayPositionChange;
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
exports.MatPrefixEnforcer = MatPrefixEnforcer;
exports.AnimationCurves = AnimationCurves;
exports.AnimationDurations = AnimationDurations;
exports.Md2RootModule = Md2RootModule;
exports.Md2Module = Md2Module;
exports.MD2_ACCORDION_DIRECTIVES = MD2_ACCORDION_DIRECTIVES;
exports.Md2AccordionModule = Md2AccordionModule;
exports.Md2Accordion = Md2Accordion;
exports.Md2AccordionHeader = Md2AccordionHeader;
exports.Md2AccordionTab = Md2AccordionTab;
exports.Item = Item;
exports.MD2_AUTOCOMPLETE_CONTROL_VALUE_ACCESSOR = MD2_AUTOCOMPLETE_CONTROL_VALUE_ACCESSOR;
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
exports.MD2_COLORPICKER_CONTROL_VALUE_ACCESSOR = MD2_COLORPICKER_CONTROL_VALUE_ACCESSOR;
exports.TextDirective = TextDirective;
exports.ColorpickerSliderDirective = ColorpickerSliderDirective;
exports.Md2Colorpicker = Md2Colorpicker;
exports.Hsva = Hsva;
exports.Hsla = Hsla;
exports.Rgba = Rgba;
exports.SliderPosition = SliderPosition;
exports.SliderDimension = SliderDimension;
exports.MD2_COLORPICKER_DIRECTIVES = MD2_COLORPICKER_DIRECTIVES;
exports.Md2ColorpickerModule = Md2ColorpickerModule;
exports.Md2DataTable = Md2DataTable;
exports.Md2DataTableSortField = Md2DataTableSortField;
exports.Md2Pagination = Md2Pagination;
exports.MD2_DATA_TABLE_DIRECTIVES = MD2_DATA_TABLE_DIRECTIVES;
exports.Md2DataTableModule = Md2DataTableModule;
exports.Md2Datepicker = Md2Datepicker;
exports.MD2_DATEPICKER_DIRECTIVES = MD2_DATEPICKER_DIRECTIVES;
exports.Md2DatepickerModule = Md2DatepickerModule;
exports.Md2DialogPortal = Md2DialogPortal;
exports.Md2DialogTitle = Md2DialogTitle;
exports.Md2DialogFooter = Md2DialogFooter;
exports.Md2Dialog = Md2Dialog;
exports.MD2_DIALOG_DIRECTIVES = MD2_DIALOG_DIRECTIVES;
exports.MD2_DIALOG_PROVIDERS = MD2_DIALOG_PROVIDERS;
exports.Md2DialogModule = Md2DialogModule;
exports.Md2Menu = Md2Menu;
exports.Md2MenuModule = Md2MenuModule;
exports.Md2MenuContent = Md2MenuContent;
exports.Md2MenuItem = Md2MenuItem;
exports.Md2MenuTrigger = Md2MenuTrigger;
exports.Option = Option;
exports.MD2_MULTISELECT_CONTROL_VALUE_ACCESSOR = MD2_MULTISELECT_CONTROL_VALUE_ACCESSOR;
exports.Md2Multiselect = Md2Multiselect;
exports.MD2_MULTISELECT_DIRECTIVES = MD2_MULTISELECT_DIRECTIVES;
exports.Md2MultiselectModule = Md2MultiselectModule;
exports.Md2SelectModule = Md2SelectModule;
exports.Md2Option = Md2Option;
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
exports.Md2TabChangeEvent = Md2TabChangeEvent;
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
exports.Md2Tooltip = Md2Tooltip;
exports.Md2TooltipComponent = Md2TooltipComponent;
exports.MD2_TOOLTIP_DIRECTIVES = MD2_TOOLTIP_DIRECTIVES;
exports.Md2TooltipModule = Md2TooltipModule;

Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=./md2.umd.js.map
