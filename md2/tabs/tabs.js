var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ContentChildren, Directive, ElementRef, EventEmitter, Input, Output, QueryList, TemplateRef, ViewContainerRef, ViewEncapsulation, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
export var Md2TabChangeEvent = (function () {
    function Md2TabChangeEvent() {
    }
    return Md2TabChangeEvent;
}());
export var Md2Transclude = (function () {
    function Md2Transclude(viewRef) {
        this.viewRef = viewRef;
    }
    Object.defineProperty(Md2Transclude.prototype, "md2Transclude", {
        get: function () {
            return this._md2Transclude;
        },
        set: function (templateRef) {
            this._md2Transclude = templateRef;
            if (templateRef) {
                this.viewRef.createEmbeddedView(templateRef);
            }
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        Input(), 
        __metadata('design:type', TemplateRef), 
        __metadata('design:paramtypes', [TemplateRef])
    ], Md2Transclude.prototype, "md2Transclude", null);
    Md2Transclude = __decorate([
        Directive({ selector: '[md2Transclude]' }), 
        __metadata('design:paramtypes', [ViewContainerRef])
    ], Md2Transclude);
    return Md2Transclude;
}());
export var Md2Tab = (function () {
    function Md2Tab() {
    }
    __decorate([
        Input(), 
        __metadata('design:type', String)
    ], Md2Tab.prototype, "label", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Boolean)
    ], Md2Tab.prototype, "active", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Boolean)
    ], Md2Tab.prototype, "disabled", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', String)
    ], Md2Tab.prototype, "class", void 0);
    Md2Tab = __decorate([
        Component({selector: 'md2-tab',
            template: "<ng-content></ng-content>",
            host: {
                '[class]': 'class',
                '[class.active]': 'active'
            }
        }), 
        __metadata('design:paramtypes', [])
    ], Md2Tab);
    return Md2Tab;
}());
export var Md2TabLabel = (function () {
    function Md2TabLabel(templateRef, tab) {
        this.templateRef = templateRef;
        tab.labelRef = templateRef;
    }
    Md2TabLabel = __decorate([
        Directive({ selector: '[md2-tab-label]' }), 
        __metadata('design:paramtypes', [TemplateRef, Md2Tab])
    ], Md2TabLabel);
    return Md2TabLabel;
}());
export var Md2Tabs = (function () {
    function Md2Tabs(elementRef) {
        this.elementRef = elementRef;
        this._isInitialized = false;
        this._focusIndex = 0;
        this._selectedIndex = 0;
        this.shouldPaginate = false;
        this.offsetLeft = 0;
        this.inkBarLeft = '0';
        this.inkBarWidth = '0';
        this.change = new EventEmitter();
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
            var elements = { root: this.elementRef.nativeElement, wrapper: null, canvas: null, paging: null, tabs: null };
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
        this.inkBarLeft = tab.offsetLeft + 'px';
        this.inkBarWidth = tab.offsetWidth + 'px';
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
        if (!this.shouldPaginate) {
            return;
        }
        event.preventDefault();
        this.offsetLeft = this.fixOffset(this.offsetLeft - event.wheelDelta);
    };
    /**
     * Next Page
     */
    Md2Tabs.prototype.nextPage = function () {
        var elements = this.element;
        var viewportWidth = elements.canvas.clientWidth, totalWidth = viewportWidth + this.offsetLeft, i, tab;
        for (i = 0; i < elements.tabs.length; i++) {
            tab = elements.tabs[i];
            if (tab.offsetLeft + tab.offsetWidth > totalWidth) {
                break;
            }
        }
        this.offsetLeft = this.fixOffset(tab.offsetLeft);
    };
    /**
     * Previous Page
     */
    Md2Tabs.prototype.previousPage = function () {
        var i, tab, elements = this.element;
        for (i = 0; i < elements.tabs.length; i++) {
            tab = elements.tabs[i];
            if (tab.offsetLeft + tab.offsetWidth >= this.offsetLeft) {
                break;
            }
        }
        this.offsetLeft = this.fixOffset(tab.offsetLeft + tab.offsetWidth - elements.canvas.clientWidth);
    };
    /**
     * On Window Resize
     * @param event
     */
    Md2Tabs.prototype.onWindowResize = function (event) {
        this.offsetLeft = this.fixOffset(this.offsetLeft);
        this.updatePagination();
    };
    /**
     * Can page Back
     */
    Md2Tabs.prototype.canPageBack = function () { return this.offsetLeft > 0; };
    /**
     * Can page Previous
     */
    Md2Tabs.prototype.canPageForward = function () {
        var elements = this.element;
        var lastTab = elements.tabs[elements.tabs.length - 1];
        return lastTab && lastTab.offsetLeft + lastTab.offsetWidth > elements.canvas.clientWidth +
            this.offsetLeft;
    };
    /**
     * Update Pagination
     */
    Md2Tabs.prototype.updatePagination = function () {
        var canvasWidth = this.element.root.clientWidth;
        this.element.tabs.forEach(function (tab) {
            canvasWidth -= tab.offsetWidth;
        });
        this.shouldPaginate = canvasWidth < 0;
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
        this.offsetLeft = Math.max(this.offsetLeft, this.fixOffset(right - elements.canvas.clientWidth + 32 * 2));
        this.offsetLeft = Math.min(this.offsetLeft, this.fixOffset(left));
    };
    /**
     * Fix Offset of Tab
     * @param value
     * @return value
     */
    Md2Tabs.prototype.fixOffset = function (value) {
        var elements = this.element;
        if (!elements.tabs.length || !this.shouldPaginate) {
            return 0;
        }
        var lastTab = elements.tabs[elements.tabs.length - 1], totalWidth = lastTab.offsetLeft + lastTab.offsetWidth;
        value = Math.max(0, value);
        value = Math.min(totalWidth - elements.canvas.clientWidth, value);
        return value;
    };
    __decorate([
        ContentChildren(Md2Tab), 
        __metadata('design:type', QueryList)
    ], Md2Tabs.prototype, "tabs", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', String)
    ], Md2Tabs.prototype, "class", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object), 
        __metadata('design:paramtypes', [Object])
    ], Md2Tabs.prototype, "selectedIndex", null);
    __decorate([
        Output(), 
        __metadata('design:type', EventEmitter)
    ], Md2Tabs.prototype, "change", void 0);
    Md2Tabs = __decorate([
        Component({selector: 'md2-tabs',
            template: "\n    <div class=\"md2-tabs-header-wrapper\">\n      <div role=\"button\" class=\"md2-prev-button\" [class.disabled]=\"!canPageBack()\" *ngIf=\"shouldPaginate\" (click)=\"previousPage()\">\n        <em class=\"prev-icon\">Prev</em>\n      </div>\n      <div role=\"button\" class=\"md2-next-button\" [class.disabled]=\"!canPageForward()\" *ngIf=\"shouldPaginate\" (click)=\"nextPage()\">\n        <em class=\"next-icon\">Next</em>\n      </div>\n      <div class=\"md2-tabs-canvas\" [class.md2-paginated]=\"shouldPaginate\" role=\"tablist\" tabindex=\"0\" (keydown.arrowRight)=\"focusNextTab()\" (keydown.arrowLeft)=\"focusPreviousTab()\" (keydown.enter)=\"selectedIndex = focusIndex\" (mousewheel)=\"scroll($event)\">\n        <div class=\"md2-tabs-header\" [style.marginLeft]=\"-offsetLeft + 'px'\">\n          <div class=\"md2-tab-label\" role=\"tab\" *ngFor=\"let tab of tabs; let i = index\" [class.focus]=\"focusIndex === i\" [class.active]=\"selectedIndex === i\" [class.disabled]=\"tab.disabled\" (click)=\"focusIndex = selectedIndex = i\">\n            <span [md2Transclude]=\"tab.labelRef\">{{tab.label}}</span>\n          </div>\n          <div class=\"md2-tab-ink-bar\" [style.left]=\"inkBarLeft\" [style.width]=\"inkBarWidth\"></div>\n        </div>\n      </div>\n    </div>\n    <div class=\"md2-tabs-body-wrapper\">\n      <ng-content></ng-content>\n    </div>\n  ",
            styles: ["\n    md2-tabs { position: relative; overflow: hidden; display: block; margin: 0; border: 1px solid #e1e1e1; border-radius: 2px; }\n    .md2-tabs-header-wrapper { position: relative; display: block; height: 48px; background: white; border-width: 0 0 1px; border-style: solid; border-color: rgba(0,0,0,0.12); display: block; margin: 0; padding: 0; list-style: none; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; }\n    .md2-tabs-header-wrapper:after { content: ''; display: table; clear: both; }\n    .md2-prev-button,\n    .md2-next-button { position: absolute; top: 0; height: 100%; width: 32px; padding: 8px 0; z-index: 2; cursor: pointer; }\n    .md2-prev-button { left: 0; }\n    .md2-next-button { right: 0; }\n    .md2-prev-button.disabled,\n    .md2-next-button.disabled { opacity: .25; cursor: default; }\n    .md2-prev-button .prev-icon,\n    .md2-next-button .next-icon { display: block; width: 12px; height: 12px; font-size: 0; border-width: 0 0 2px 2px; border-style: solid; border-color: #757575; border-radius: 1px; transform: rotate(45deg); margin: 10px; }\n    .md2-next-button .next-icon { border-width: 2px 2px 0 0; }\n    .md2-tabs-canvas { position: relative; height: 100%; overflow: hidden; display: block; outline: none; }\n    .md2-tabs-canvas.md2-paginated { margin: 0 32px; }\n    .md2-tabs-header { position: relative; display: inline-block; height: 100%; white-space: nowrap; -moz-transition: 0.5s cubic-bezier(0.35,0,0.25,1); -o-transition: 0.5s cubic-bezier(0.35,0,0.25,1); -webkit-transition: 0.5s cubic-bezier(0.35,0,0.25,1); transition: 0.5s cubic-bezier(0.35,0,0.25,1); }\n    .md2-tab-label { position: relative; height: 100%; color: rgba(0,0,0,0.54); font-size: 14px; text-align: center; line-height: 24px; padding: 12px 24px; -moz-transition: background-color .35s cubic-bezier(.35,0,.25,1); -o-transition: background-color .35s cubic-bezier(.35,0,.25,1); -webkit-transition: background-color .35s cubic-bezier(.35,0,.25,1); transition: background-color .35s cubic-bezier(.35,0,.25,1); cursor: pointer; white-space: nowrap; text-transform: uppercase; display: inline-block; font-weight: 500; -moz-box-sizing: border-box; -webkit-box-sizing: border-box; box-sizing: border-box; overflow: hidden; -ms-text-overflow: ellipsis; -o-text-overflow: ellipsis; text-overflow: ellipsis; }\n    .md2-tab-label.active { color: rgb(16,108,200); }\n    .md2-tabs-canvas:focus .md2-tab-label.focus { background: rgba(0,0,0,0.05); }\n    .md2-tab-label.disabled { color: rgba(0,0,0,0.26); pointer-events: none; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; -webkit-user-drag: none; opacity: 0.5; cursor: default; }\n    .md2-tab-ink-bar { position: absolute; bottom: 0; height: 2px; background: rgb(255,82,82); transition: .25s cubic-bezier(.35,0,.25,1); }\n    .md2-tabs-body-wrapper { position: relative; min-height: 0; display: block; clear: both; }\n    md2-tab { padding: 16px; display: none; position: relative; }\n    md2-tab.active { display: block; position: relative; }\n  "],
            host: {
                '[class]': 'class',
                '(window:resize)': 'onWindowResize($event)'
            },
            encapsulation: ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [ElementRef])
    ], Md2Tabs);
    return Md2Tabs;
}());
export var MD2_TABS_DIRECTIVES = [Md2TabLabel, Md2Tabs, Md2Tab];
export var Md2TabsModule = (function () {
    function Md2TabsModule() {
    }
    Md2TabsModule.forRoot = function () {
        return {
            ngModule: Md2TabsModule,
            providers: []
        };
    };
    Md2TabsModule = __decorate([
        NgModule({
            imports: [CommonModule],
            exports: MD2_TABS_DIRECTIVES,
            declarations: [Md2Transclude, Md2TabLabel, Md2Tabs, Md2Tab],
        }), 
        __metadata('design:paramtypes', [])
    ], Md2TabsModule);
    return Md2TabsModule;
}());

//# sourceMappingURL=tabs.js.map
