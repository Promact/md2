var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Output, Input, EventEmitter, ViewChild, ViewEncapsulation, Directive, ViewContainerRef, TemplateRef, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Overlay, OverlayState, OverlayModule, TemplatePortalDirective } from '../core/core';
import 'rxjs/add/operator/first';
import { zoomInContent } from './dialog-animations';
export var Md2DialogPortal = (function (_super) {
    __extends(Md2DialogPortal, _super);
    function Md2DialogPortal(templateRef, viewContainerRef) {
        _super.call(this, templateRef, viewContainerRef);
    }
    Md2DialogPortal = __decorate([
        Directive({ selector: '[md2DialogPortal]' }), 
        __metadata('design:paramtypes', [TemplateRef, ViewContainerRef])
    ], Md2DialogPortal);
    return Md2DialogPortal;
}(TemplatePortalDirective));
export var Md2DialogTitle = (function () {
    function Md2DialogTitle() {
    }
    Md2DialogTitle = __decorate([
        Directive({ selector: 'md2-dialog-title' }), 
        __metadata('design:paramtypes', [])
    ], Md2DialogTitle);
    return Md2DialogTitle;
}());
export var Md2DialogFooter = (function () {
    function Md2DialogFooter() {
    }
    Md2DialogFooter = __decorate([
        Directive({ selector: 'md2-dialog-footer' }), 
        __metadata('design:paramtypes', [])
    ], Md2DialogFooter);
    return Md2DialogFooter;
}());
export var Md2Dialog = (function () {
    function Md2Dialog(_overlay) {
        this._overlay = _overlay;
        this._panelOpen = false;
        this._overlayRef = null;
        this.onOpen = new EventEmitter();
        this.onClose = new EventEmitter();
    }
    Md2Dialog.prototype.ngOnDestroy = function () { this.destroyPanel(); };
    /** Show the dialog */
    Md2Dialog.prototype.show = function () {
        this.open();
    };
    /** Open the dialog */
    Md2Dialog.prototype.open = function () {
        if (!this._panelOpen) {
            this._createOverlay();
            this._overlayRef.attach(this._portal);
            this._subscribeToBackdrop();
            this._panelOpen = true;
        }
    };
    /** Close the dialog */
    Md2Dialog.prototype.close = function (result, cancel) {
        if (result === void 0) { result = true; }
        if (cancel === void 0) { cancel = false; }
        this._panelOpen = false;
        if (this._overlayRef) {
            this._overlayRef.detach();
            this._backdropSubscription.unsubscribe();
        }
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
    __decorate([
        Output(), 
        __metadata('design:type', EventEmitter)
    ], Md2Dialog.prototype, "onOpen", void 0);
    __decorate([
        Output(), 
        __metadata('design:type', EventEmitter)
    ], Md2Dialog.prototype, "onClose", void 0);
    __decorate([
        ViewChild(Md2DialogPortal), 
        __metadata('design:type', Md2DialogPortal)
    ], Md2Dialog.prototype, "_portal", void 0);
    __decorate([
        Input('title'), 
        __metadata('design:type', String)
    ], Md2Dialog.prototype, "dialogTitle", void 0);
    Md2Dialog = __decorate([
        Component({selector: 'md2-dialog',
            template: "<template md2DialogPortal> <div class=\"md2-dialog-panel\" [@zoomInContent]=\"'in'\" (@zoomInContent.done)=\"_onPanelDone()\"> <div class=\"md2-dialog-content\"> <div class=\"md2-dialog-header\"> <button type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"close()\">&times;</button> <h2 *ngIf=\"dialogTitle\" class=\"md2-dialog-title\" id=\"myDialogLabel\" [innerHtml]=\"dialogTitle\"></h2> <ng-content select=\"md2-dialog-title\"></ng-content> </div> <div class=\"md2-dialog-body\"> <ng-content></ng-content> </div> <ng-content select=\"md2-dialog-footer\"></ng-content> </div> </div> </template>",
            styles: [".md2-dialog-panel { position: relative; max-width: 90vw; width: 600px; border-radius: 3px; background-color: white; overflow: hidden; box-shadow: 0 11px 15px -7px rgba(0, 0, 0, 0.2), 0 24px 38px 3px rgba(0, 0, 0, 0.14), 0 9px 46px 8px rgba(0, 0, 0, 0.12); } .md2-dialog-header { background: #2196f3; color: #fff; font-size: 25px; line-height: 1.1; font-weight: 500; padding: 0 48px 0 16px; border-bottom: 1px solid #e5e5e5; word-wrap: break-word; } .md2-dialog-header .close { position: absolute; top: 21px; right: 16px; display: inline-block; width: 18px; height: 18px; overflow: hidden; -webkit-appearance: none; padding: 0; cursor: pointer; background: 0 0; border: 0; outline: 0; opacity: 0.8; font-size: 0; z-index: 1; min-width: initial; box-shadow: none; margin: 0; } .md2-dialog-header .close::before, .md2-dialog-header .close::after { content: ''; position: absolute; top: 50%; left: 0; width: 100%; height: 2px; margin-top: -1px; background: #ccc; border-radius: 2px; } .md2-dialog-header .close::before { transform: rotate(45deg); } .md2-dialog-header .close::after { transform: rotate(-45deg); } .md2-dialog-header .close:hover { opacity: 1; } .md2-dialog-header md2-dialog-title, .md2-dialog-header .md2-dialog-title { display: block; margin: 0; padding: 16px 0; font-size: 25px; font-weight: 500; } .md2-dialog-header dialog-header { line-height: 33px; } .md2-dialog-body { position: relative; max-height: 65vh; padding: 16px; overflow-y: auto; } .md2-dialog-footer, md2-dialog-footer { display: block; padding: 16px; text-align: right; border-top: 1px solid rgba(0, 0, 0, 0.12); } .cdk-overlay-container, .cdk-global-overlay-wrapper { pointer-events: none; top: 0; left: 0; height: 100%; width: 100%; } .cdk-overlay-container { position: fixed; z-index: 1000; } .cdk-global-overlay-wrapper { display: flex; position: absolute; z-index: 1000; } .cdk-overlay-pane { position: absolute; pointer-events: auto; box-sizing: border-box; z-index: 1000; } .cdk-overlay-backdrop { position: absolute; top: 0; bottom: 0; left: 0; right: 0; z-index: 1000; pointer-events: auto; transition: opacity 400ms cubic-bezier(0.25, 0.8, 0.25, 1); opacity: 0; } .cdk-overlay-backdrop.cdk-overlay-backdrop-showing { opacity: 0.48; } .cdk-overlay-dark-backdrop { background: rgba(0, 0, 0, 0.6); } /*# sourceMappingURL=dialog.css.map */ "],
            host: {
                'tabindex': '0',
                '(body:keydown.esc)': '_handleEscKeydown($event)'
            },
            animations: [zoomInContent],
            encapsulation: ViewEncapsulation.None,
            exportAs: 'md2Dialog'
        }), 
        __metadata('design:paramtypes', [Overlay])
    ], Md2Dialog);
    return Md2Dialog;
}());
export var MD2_DIALOG_DIRECTIVES = [
    Md2Dialog,
    Md2DialogTitle,
    Md2DialogFooter,
    Md2DialogPortal
];
export var Md2DialogModule = (function () {
    function Md2DialogModule() {
    }
    Md2DialogModule.forRoot = function () {
        return {
            ngModule: Md2DialogModule,
            providers: []
        };
    };
    Md2DialogModule = __decorate([
        NgModule({
            imports: [CommonModule, OverlayModule],
            exports: MD2_DIALOG_DIRECTIVES,
            declarations: MD2_DIALOG_DIRECTIVES,
        }), 
        __metadata('design:paramtypes', [])
    ], Md2DialogModule);
    return Md2DialogModule;
}());
//# sourceMappingURL=dialog.js.map