var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
import { Component, Output, Input, EventEmitter, Optional, SkipSelf, ViewChild, ViewEncapsulation, Directive, ViewContainerRef, TemplateRef, } from '@angular/core';
import { style, trigger, state, transition, animate, } from '@angular/animations';
import { ESCAPE, Overlay, OverlayState, TemplatePortalDirective } from '../core/core';
import { extendObject } from '../core/util/object-extend';
import 'rxjs/add/operator/first';
var Md2DialogConfig = (function () {
    function Md2DialogConfig() {
        this.role = 'dialog';
        this.disableClose = false;
    }
    return Md2DialogConfig;
}());
export { Md2DialogConfig };
var Md2DialogPortal = (function (_super) {
    __extends(Md2DialogPortal, _super);
    function Md2DialogPortal(templateRef, viewContainerRef) {
        return _super.call(this, templateRef, viewContainerRef) || this;
    }
    return Md2DialogPortal;
}(TemplatePortalDirective));
Md2DialogPortal = __decorate([
    Directive({ selector: '[md2DialogPortal]' }),
    __metadata("design:paramtypes", [TemplateRef, ViewContainerRef])
], Md2DialogPortal);
export { Md2DialogPortal };
/**
 * Title of a dialog element. Stays fixed to the top of the dialog when scrolling.
 */
var Md2DialogTitle = (function () {
    function Md2DialogTitle() {
    }
    return Md2DialogTitle;
}());
Md2DialogTitle = __decorate([
    Directive({ selector: 'md2-dialog-title' })
], Md2DialogTitle);
export { Md2DialogTitle };
/**
 * Scrollable content container of a dialog.
 */
var Md2DialogContent = (function () {
    function Md2DialogContent() {
    }
    return Md2DialogContent;
}());
Md2DialogContent = __decorate([
    Directive({ selector: 'md2-dialog-content' })
], Md2DialogContent);
export { Md2DialogContent };
/**
 * Container for the bottom action buttons in a dialog.
 * Stays fixed to the bottom when scrolling.
 */
var Md2DialogActions = (function () {
    function Md2DialogActions() {
    }
    return Md2DialogActions;
}());
Md2DialogActions = __decorate([
    Directive({ selector: 'md2-dialog-footer, md2-dialog-actions' })
], Md2DialogActions);
export { Md2DialogActions };
var Md2Dialog = (function () {
    function Md2Dialog(_overlay, _parentDialog) {
        this._overlay = _overlay;
        this._parentDialog = _parentDialog;
        this._openDialogsAtThisLevel = [];
        this._boundKeydown = this._handleKeydown.bind(this);
        this._panelOpen = false;
        this._overlayRef = null;
        /** Property watched by the animation framework to show or hide the dialog */
        this._visibility = 'initial';
        this.onOpen = new EventEmitter();
        this.onClose = new EventEmitter();
    }
    Md2Dialog.prototype.ngOnDestroy = function () { this.destroyPanel(); };
    Object.defineProperty(Md2Dialog.prototype, "_openDialogs", {
        get: function () {
            return this._parentDialog ? this._parentDialog._openDialogs : this._openDialogsAtThisLevel;
        },
        enumerable: true,
        configurable: true
    });
    /** Open the dialog */
    Md2Dialog.prototype.open = function (config) {
        this.config = _applyConfigDefaults(config);
        if (this._panelOpen) {
            return Promise.resolve(this);
        }
        this._createOverlay();
        this._overlayRef.attach(this._portal);
        this._subscribeToBackdrop();
        if (!this._openDialogs.length && !this._parentDialog) {
            document.addEventListener('keydown', this._boundKeydown);
        }
        this._openDialogs.push(this);
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
            if (this._backdropSubscription) {
                this._backdropSubscription.unsubscribe();
            }
        }
        var index = this._openDialogs.indexOf(this);
        if (index > -1) {
            this._openDialogs.splice(index, 1);
            // no open dialogs are left, call next on afterAllClosed Subject
            if (!this._openDialogs.length) {
                document.removeEventListener('keydown', this._boundKeydown);
            }
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
            this.onClose.emit(this);
        }
    };
    Md2Dialog.prototype._handleKeydown = function (event) {
        var topDialog = this._openDialogs[this._openDialogs.length - 1];
        if (event.keyCode === ESCAPE && topDialog &&
            !topDialog.config.disableClose) {
            topDialog.close();
        }
    };
    Md2Dialog.prototype._subscribeToBackdrop = function () {
        var _this = this;
        if (!this.config.disableClose) {
            this._backdropSubscription = this._overlayRef.backdropClick().first().subscribe(function () {
                return _this.close();
            });
        }
    };
    Md2Dialog.prototype._createOverlay = function () {
        if (!this._overlayRef) {
            var config = new OverlayState();
            config.positionStrategy = this._overlay.position()
                .global()
                .centerHorizontally()
                .centerVertically();
            config.hasBackdrop = true;
            this._overlayRef = this._overlay.create(config);
        }
    };
    Md2Dialog.prototype._cleanUpSubscriptions = function () {
        if (this._backdropSubscription) {
            this._backdropSubscription.unsubscribe();
        }
    };
    return Md2Dialog;
}());
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], Md2Dialog.prototype, "onOpen", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], Md2Dialog.prototype, "onClose", void 0);
__decorate([
    ViewChild(Md2DialogPortal),
    __metadata("design:type", Md2DialogPortal)
], Md2Dialog.prototype, "_portal", void 0);
__decorate([
    Input('title'),
    __metadata("design:type", String)
], Md2Dialog.prototype, "dialogTitle", void 0);
Md2Dialog = __decorate([
    Component({selector: 'md2-dialog',
        template: "<ng-template md2DialogPortal><div class=\"md2-dialog-panel\" [attr.role]=\"dialogConfig?.role\"><div class=\"md2-dialog-content\"><div class=\"md2-dialog-header\"><button *ngIf=\"!config.disableClose\" type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"close()\">&times;</button><h2 *ngIf=\"dialogTitle\" class=\"md2-dialog-title\" id=\"myDialogLabel\" [innerHtml]=\"dialogTitle\"></h2><ng-content select=\"md2-dialog-title\"></ng-content></div><div class=\"md2-dialog-body\"><ng-content select=\"md2-dialog-content\"></ng-content><ng-content></ng-content></div><ng-content select=\"md2-dialog-footer\"></ng-content><ng-content select=\"md2-dialog-actions\"></ng-content></div></div></ng-template>",
        styles: [".md2-dialog-panel{position:relative;max-width:90vw;width:600px;border-radius:3px;background-color:#fff;overflow:hidden;box-shadow:0 11px 15px -7px rgba(0,0,0,.2),0 24px 38px 3px rgba(0,0,0,.14),0 9px 46px 8px rgba(0,0,0,.12)}.md2-dialog-header{background:#2196f3;color:#fff;font-size:25px;line-height:1.1;font-weight:500;padding:0 48px 0 16px;border-bottom:1px solid #e5e5e5;word-wrap:break-word}.md2-dialog-header .close{position:absolute;top:21px;right:16px;display:inline-block;width:18px;height:18px;overflow:hidden;-webkit-appearance:none;padding:0;cursor:pointer;background:0 0;border:0;outline:0;opacity:.8;font-size:0;z-index:1;min-width:initial;box-shadow:none;margin:0}.md2-dialog-header .close::after,.md2-dialog-header .close::before{content:'';position:absolute;top:50%;left:0;width:100%;height:2px;margin-top:-1px;background:#ccc;border-radius:2px}.md2-dialog-header .close::before{transform:rotate(45deg)}.md2-dialog-header .close::after{transform:rotate(-45deg)}.md2-dialog-header .close:hover{opacity:1}.md2-dialog-header .md2-dialog-title,.md2-dialog-header md2-dialog-title{display:block;margin:0;padding:16px 0;font-size:25px;font-weight:500}.md2-dialog-header dialog-header{line-height:33px}.md2-dialog-body{position:relative;max-height:65vh;padding:16px;overflow-y:auto}.md2-dialog-footer,md2-dialog-footer{display:block;padding:16px;text-align:right;border-top:1px solid rgba(0,0,0,.12)}.cdk-global-overlay-wrapper,.cdk-overlay-container{pointer-events:none;top:0;left:0;height:100%;width:100%}.cdk-overlay-container{position:fixed;z-index:1000}.cdk-global-overlay-wrapper{display:flex;position:absolute;z-index:1000}.cdk-overlay-pane{position:absolute;pointer-events:auto;box-sizing:border-box;z-index:1000}.cdk-overlay-backdrop{position:absolute;top:0;bottom:0;left:0;right:0;z-index:1000;pointer-events:auto;transition:opacity .4s cubic-bezier(.25,.8,.25,1);opacity:0}.cdk-overlay-backdrop.cdk-overlay-backdrop-showing{opacity:.48}.cdk-overlay-dark-backdrop{background:rgba(0,0,0,.6)} /*# sourceMappingURL=dialog.css.map */ "],
        host: {
            'tabindex': '0',
            '[attr.role]': 'config?.role',
        },
        animations: [
            trigger('state', [
                state('void', style({ transform: 'scale(0.3)' })),
                state('initial', style({ transform: 'scale(0.3)' })),
                state('visible', style({ transform: 'scale(1)' })),
                state('hidden', style({ transform: 'scale(0.3)' })),
                transition('* => visible', animate('150ms cubic-bezier(0.0, 0.0, 0.2, 1)')),
                transition('* => hidden', animate('150ms cubic-bezier(0.4, 0.0, 1, 1)')),
            ])
        ],
        encapsulation: ViewEncapsulation.None,
        exportAs: 'md2Dialog'
    }),
    __param(1, Optional()), __param(1, SkipSelf()),
    __metadata("design:paramtypes", [Overlay,
        Md2Dialog])
], Md2Dialog);
export { Md2Dialog };
/**
 * Applies default options to the dialog config.
 * @param dialogConfig Config to be modified.
 * @returns The new configuration object.
 */
function _applyConfigDefaults(dialogConfig) {
    return extendObject(new Md2DialogConfig(), dialogConfig);
}
//# sourceMappingURL=dialog.js.map