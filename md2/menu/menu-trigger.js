var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Directive, ElementRef, Renderer } from '@angular/core';
export var Md2MenuTrigger = (function () {
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
    Md2MenuTrigger = __decorate([
        Directive({
            selector: '[md2-menu-trigger]',
            host: {
                'aria-haspopup': 'true',
                '(click)': '_toggleMenu()',
            },
            exportAs: 'md2MenuTrigger'
        }), 
        __metadata('design:paramtypes', [ElementRef, Renderer])
    ], Md2MenuTrigger);
    return Md2MenuTrigger;
}());
//# sourceMappingURL=menu-trigger.js.map