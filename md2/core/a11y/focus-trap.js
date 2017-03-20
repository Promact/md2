var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Directive, ElementRef, Input, NgZone, Injectable } from '@angular/core';
import { InteractivityChecker } from './interactivity-checker';
import { coerceBooleanProperty } from '../coercion/boolean-property';
/**
 * Class that allows for trapping focus within a DOM element.
 *
 * NOTE: This class currently uses a very simple (naive) approach to focus trapping.
 * It assumes that the tab order is the same as DOM order, which is not necessarily true.
 * Things like tabIndex > 0, flex `order`, and shadow roots can cause to two to misalign.
 * This will be replaced with a more intelligent solution before the library is considered stable.
 */
export var FocusTrap = (function () {
    function FocusTrap(_element, _checker, _ngZone, deferAnchors) {
        if (deferAnchors === void 0) { deferAnchors = false; }
        this._element = _element;
        this._checker = _checker;
        this._ngZone = _ngZone;
        this._enabled = true;
        if (!deferAnchors) {
            this.attachAnchors();
        }
    }
    Object.defineProperty(FocusTrap.prototype, "enabled", {
        /** Whether the focus trap is active. */
        get: function () { return this._enabled; },
        set: function (val) {
            this._enabled = val;
            if (this._startAnchor && this._endAnchor) {
                this._startAnchor.tabIndex = this._endAnchor.tabIndex = this._enabled ? 0 : -1;
            }
        },
        enumerable: true,
        configurable: true
    });
    /** Destroys the focus trap by cleaning up the anchors. */
    FocusTrap.prototype.destroy = function () {
        if (this._startAnchor && this._startAnchor.parentNode) {
            this._startAnchor.parentNode.removeChild(this._startAnchor);
        }
        if (this._endAnchor && this._endAnchor.parentNode) {
            this._endAnchor.parentNode.removeChild(this._endAnchor);
        }
        this._startAnchor = this._endAnchor = null;
    };
    /**
     * Inserts the anchors into the DOM. This is usually done automatically
     * in the constructor, but can be deferred for cases like directives with `*ngIf`.
     */
    FocusTrap.prototype.attachAnchors = function () {
        var _this = this;
        if (!this._startAnchor) {
            this._startAnchor = this._createAnchor();
        }
        if (!this._endAnchor) {
            this._endAnchor = this._createAnchor();
        }
        this._ngZone.runOutsideAngular(function () {
            _this._startAnchor.addEventListener('focus', function () { return _this.focusLastTabbableElement(); });
            _this._endAnchor.addEventListener('focus', function () { return _this.focusFirstTabbableElement(); });
            _this._element.parentNode.insertBefore(_this._startAnchor, _this._element);
            _this._element.parentNode.insertBefore(_this._endAnchor, _this._element.nextSibling);
        });
    };
    /**
     * Waits for microtask queue to empty, then focuses
     * the first tabbable element within the focus trap region.
     */
    FocusTrap.prototype.focusFirstTabbableElementWhenReady = function () {
        var _this = this;
        this._ngZone.onMicrotaskEmpty.first().subscribe(function () { return _this.focusFirstTabbableElement(); });
    };
    /**
     * Waits for microtask queue to empty, then focuses
     * the last tabbable element within the focus trap region.
     */
    FocusTrap.prototype.focusLastTabbableElementWhenReady = function () {
        var _this = this;
        this._ngZone.onMicrotaskEmpty.first().subscribe(function () { return _this.focusLastTabbableElement(); });
    };
    /** Focuses the first tabbable element within the focus trap region. */
    FocusTrap.prototype.focusFirstTabbableElement = function () {
        var redirectToElement = this._element.querySelector('[cdk-focus-start]') ||
            this._getFirstTabbableElement(this._element);
        if (redirectToElement) {
            redirectToElement.focus();
        }
    };
    /** Focuses the last tabbable element within the focus trap region. */
    FocusTrap.prototype.focusLastTabbableElement = function () {
        var focusTargets = this._element.querySelectorAll('[cdk-focus-end]');
        var redirectToElement = null;
        if (focusTargets.length) {
            redirectToElement = focusTargets[focusTargets.length - 1];
        }
        else {
            redirectToElement = this._getLastTabbableElement(this._element);
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
        // Iterate in DOM order. Note that IE doesn't have `children` for SVG so we fall
        // back to `childNodes` which includes text nodes, comments etc.
        var children = root.children || root.childNodes;
        for (var i = 0; i < children.length; i++) {
            var tabbableChild = children[i].nodeType === Node.ELEMENT_NODE ?
                this._getFirstTabbableElement(children[i]) :
                null;
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
        var children = root.children || root.childNodes;
        for (var i = children.length - 1; i >= 0; i--) {
            var tabbableChild = children[i].nodeType === Node.ELEMENT_NODE ?
                this._getLastTabbableElement(children[i]) :
                null;
            if (tabbableChild) {
                return tabbableChild;
            }
        }
        return null;
    };
    /** Creates an anchor element. */
    FocusTrap.prototype._createAnchor = function () {
        var anchor = document.createElement('div');
        anchor.tabIndex = this._enabled ? 0 : -1;
        anchor.classList.add('cdk-visually-hidden');
        anchor.classList.add('cdk-focus-trap-anchor');
        return anchor;
    };
    return FocusTrap;
}());
/** Factory that allows easy instantiation of focus traps. */
export var FocusTrapFactory = (function () {
    function FocusTrapFactory(_checker, _ngZone) {
        this._checker = _checker;
        this._ngZone = _ngZone;
    }
    FocusTrapFactory.prototype.create = function (element, deferAnchors) {
        if (deferAnchors === void 0) { deferAnchors = false; }
        return new FocusTrap(element, this._checker, this._ngZone, deferAnchors);
    };
    FocusTrapFactory = __decorate([
        Injectable(), 
        __metadata('design:paramtypes', [InteractivityChecker, NgZone])
    ], FocusTrapFactory);
    return FocusTrapFactory;
}());
/**
 * Directive for trapping focus within a region.
 * @deprecated
 */
export var FocusTrapDeprecatedDirective = (function () {
    function FocusTrapDeprecatedDirective(_elementRef, _focusTrapFactory) {
        this._elementRef = _elementRef;
        this._focusTrapFactory = _focusTrapFactory;
        this.focusTrap = this._focusTrapFactory.create(this._elementRef.nativeElement, true);
    }
    Object.defineProperty(FocusTrapDeprecatedDirective.prototype, "disabled", {
        /** Whether the focus trap is active. */
        get: function () { return !this.focusTrap.enabled; },
        set: function (val) {
            this.focusTrap.enabled = !coerceBooleanProperty(val);
        },
        enumerable: true,
        configurable: true
    });
    FocusTrapDeprecatedDirective.prototype.ngOnDestroy = function () {
        this.focusTrap.destroy();
    };
    FocusTrapDeprecatedDirective.prototype.ngAfterContentInit = function () {
        this.focusTrap.attachAnchors();
    };
    __decorate([
        Input(), 
        __metadata('design:type', Boolean)
    ], FocusTrapDeprecatedDirective.prototype, "disabled", null);
    FocusTrapDeprecatedDirective = __decorate([
        Directive({
            selector: 'cdk-focus-trap',
        }), 
        __metadata('design:paramtypes', [ElementRef, FocusTrapFactory])
    ], FocusTrapDeprecatedDirective);
    return FocusTrapDeprecatedDirective;
}());
/** Directive for trapping focus within a region. */
export var FocusTrapDirective = (function () {
    function FocusTrapDirective(_elementRef, _focusTrapFactory) {
        this._elementRef = _elementRef;
        this._focusTrapFactory = _focusTrapFactory;
        this.focusTrap = this._focusTrapFactory.create(this._elementRef.nativeElement, true);
    }
    Object.defineProperty(FocusTrapDirective.prototype, "enabled", {
        /** Whether the focus trap is active. */
        get: function () { return this.focusTrap.enabled; },
        set: function (value) { this.focusTrap.enabled = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    FocusTrapDirective.prototype.ngOnDestroy = function () {
        this.focusTrap.destroy();
    };
    FocusTrapDirective.prototype.ngAfterContentInit = function () {
        this.focusTrap.attachAnchors();
    };
    __decorate([
        Input('cdkTrapFocus'), 
        __metadata('design:type', Boolean)
    ], FocusTrapDirective.prototype, "enabled", null);
    FocusTrapDirective = __decorate([
        Directive({
            selector: '[cdkTrapFocus]'
        }), 
        __metadata('design:paramtypes', [ElementRef, FocusTrapFactory])
    ], FocusTrapDirective);
    return FocusTrapDirective;
}());
//# sourceMappingURL=focus-trap.js.map