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
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", '@angular/core', '@angular/common', '../core/core', './animate'], factory);
    }
})(function (require, exports) {
    "use strict";
    var core_1 = require('@angular/core');
    var common_1 = require('@angular/common');
    var core_2 = require('../core/core');
    var animate_1 = require('./animate');
    var Md2DialogPortal = (function (_super) {
        __extends(Md2DialogPortal, _super);
        function Md2DialogPortal(templateRef, viewContainerRef) {
            _super.call(this, templateRef, viewContainerRef);
        }
        Md2DialogPortal = __decorate([
            core_1.Directive({ selector: '[md2DialogPortal]' }), 
            __metadata('design:paramtypes', [core_1.TemplateRef, core_1.ViewContainerRef])
        ], Md2DialogPortal);
        return Md2DialogPortal;
    }(core_2.TemplatePortal));
    exports.Md2DialogPortal = Md2DialogPortal;
    var Md2DialogTitle = (function () {
        function Md2DialogTitle() {
        }
        Md2DialogTitle = __decorate([
            core_1.Directive({ selector: 'md2-dialog-title' }), 
            __metadata('design:paramtypes', [])
        ], Md2DialogTitle);
        return Md2DialogTitle;
    }());
    exports.Md2DialogTitle = Md2DialogTitle;
    var Md2DialogFooter = (function () {
        function Md2DialogFooter() {
        }
        Md2DialogFooter = __decorate([
            core_1.Directive({ selector: 'md2-dialog-footer' }), 
            __metadata('design:paramtypes', [])
        ], Md2DialogFooter);
        return Md2DialogFooter;
    }());
    exports.Md2DialogFooter = Md2DialogFooter;
    var Md2Dialog = (function () {
        function Md2Dialog(overlay) {
            this.overlay = overlay;
            this.onShow = new core_1.EventEmitter();
            this.onClose = new core_1.EventEmitter();
            this.onCancel = new core_1.EventEmitter();
            /** Is the dialog active? */
            this.isOpened = false;
            /** Overlay configuration for positioning the dialog */
            this.config = new core_2.OverlayState();
            /** @internal */
            this.overlayRef = null;
        }
        Md2Dialog.prototype.ngOnDestroy = function () {
            return this.close();
        };
        ///** Show the dialog */
        Md2Dialog.prototype.show = function () {
            return this.open();
        };
        /** Open the dialog */
        Md2Dialog.prototype.open = function () {
            var _this = this;
            return this.close()
                .then(function () { return _this.overlay.create(_this.config); })
                .then(function (ref) {
                _this.overlayRef = ref;
                return ref.attach(_this.portal);
            })
                .then(function () { return animate_1.Animate.wait(); })
                .then(function () {
                _this.isOpened = true;
                _this.onShow.emit(_this);
                return _this;
            });
        };
        /** Close the dialog */
        Md2Dialog.prototype.close = function (result, cancel) {
            var _this = this;
            if (result === void 0) { result = true; }
            if (cancel === void 0) { cancel = false; }
            if (!this.overlayRef) {
                return Promise.resolve(this);
            }
            this.isOpened = false;
            // TODO(jd): this is terrible, use animate states
            return animate_1.Animate.wait(100)
                .then(function () { return _this.overlayRef.detach(); })
                .then(function () {
                _this.overlayRef.dispose();
                _this.overlayRef = null;
                if (cancel) {
                    _this.onCancel.emit(result);
                }
                else {
                    _this.onClose.emit(result);
                }
                return _this;
            });
        };
        Md2Dialog.prototype.onDocumentKeypress = function (event) {
            if (event.keyCode == 27) {
                this.close();
            }
        };
        __decorate([
            core_1.Output(), 
            __metadata('design:type', core_1.EventEmitter)
        ], Md2Dialog.prototype, "onShow", void 0);
        __decorate([
            core_1.Output(), 
            __metadata('design:type', core_1.EventEmitter)
        ], Md2Dialog.prototype, "onClose", void 0);
        __decorate([
            core_1.Output(), 
            __metadata('design:type', core_1.EventEmitter)
        ], Md2Dialog.prototype, "onCancel", void 0);
        __decorate([
            core_1.ViewChild(Md2DialogPortal), 
            __metadata('design:type', Md2DialogPortal)
        ], Md2Dialog.prototype, "portal", void 0);
        __decorate([
            core_1.Input('title'), 
            __metadata('design:type', String)
        ], Md2Dialog.prototype, "dialogTitle", void 0);
        __decorate([
            core_1.Input(), 
            __metadata('design:type', Object)
        ], Md2Dialog.prototype, "config", void 0);
        Md2Dialog = __decorate([
            core_1.Component({selector: 'md2-dialog',
                template: "\n    <template md2DialogPortal>\n      <div class=\"md2-dialog\" [class.open]=\"isOpened\">\n        <div class=\"md2-dialog-container\">\n          <div class=\"md2-dialog-header\">\n            <button type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"close()\">&times;</button>\n            <h2 *ngIf=\"dialogTitle\" class=\"md2-dialog-title\" id=\"myDialogLabel\" [innerHtml]=\"dialogTitle\"></h2>\n            <ng-content select=\"md2-dialog-title\"></ng-content>\n          </div>\n          <div class=\"md2-dialog-body\">\n            <ng-content></ng-content>\n          </div>\n          <ng-content select=\"md2-dialog-footer\"></ng-content>\n        </div>\n      </div>\n    </template>\n  ",
                styles: ["\n    .md2-dialog-open { overflow-y: hidden; }\n    .md2-dialog { position: fixed; top: 0; right: 0; bottom: 0; left: 0; z-index: 1050; background-color: rgba(33, 33, 33, 0.48); display: none; overflow-x: hidden; overflow-y: scroll; -webkit-overflow-scrolling: touch; outline: 0; }\n    .md2-dialog.open { display: block; }\n    .md2-dialog .md2-dialog-container { position: relative; width: auto; margin: 15px; background-color: #fff; -webkit-background-clip: padding-box; -moz-background-clip: padding-box; background-clip: padding-box; border-radius: 0 0 4px 4px; outline: 0; -webkit-box-shadow: 0 7px 8px -4px rgba(0,0,0,.2),0 13px 19px 2px rgba(0,0,0,.14),0 5px 24px 4px rgba(0,0,0,.12); box-shadow: 0 7px 8px -4px rgba(0,0,0,.2),0 13px 19px 2px rgba(0,0,0,.14),0 5px 24px 4px rgba(0,0,0,.12); -webkit-transition: .3s; -o-transition: .3s; -moz-transition: .3s; transition: .3s; -webkit-transform: scale(0.1); -ms-transform: scale(0.1); -o-transform: scale(0.1); -moz-transform: scale(0.1); transform: scale(0.1); }\n    .md2-dialog.open .md2-dialog-container { -webkit-transform: scale(1); -ms-transform: scale(1); -o-transform: scale(1); -moz-transform: scale(1); transform: scale(1); }\n    @media (min-width: 768px) {\n      .md2-dialog .md2-dialog-container { width: 600px; margin: 30px auto; }\n    }\n    .md2-dialog-header { background: #2196f3; color: #fff; font-size: 25px; line-height: 1.1; font-weight: 500; padding: 0 16px; border-bottom: 1px solid #e5e5e5; }\n    .md2-dialog-header .close { position: absolute; top: 21px; right: 16px; display: inline-block; width: 18px; height: 18px; overflow: hidden; -webkit-appearance: none; padding: 0; cursor: pointer; background: 0 0; border: 0; outline: 0; opacity: 0.8; font-size: 0; z-index: 1; min-width: initial; box-shadow: none; margin: 0; }\n    .md2-dialog-header .close::before,\n    .md2-dialog-header .close::after { content: ''; position: absolute; top: 50%; left: 0; height: 2px; width: 100%; margin-top: -1px;background: #ccc;border-radius: 2px;height: 2px;}\n    .md2-dialog-header .close::before {-webkit-transform: rotate(45deg);-moz-transform: rotate(45deg);-ms-transform: rotate(45deg);-o-transform: rotate(45deg);transform: rotate(45deg);}\n    .md2-dialog-header .close::after {-webkit-transform: rotate(-45deg);-moz-transform: rotate(-45deg);-ms-transform: rotate(-45deg);-o-transform: rotate(-45deg);transform: rotate(-45deg);}\n    .md2-dialog-header .close:hover { opacity: 1; }\n    .md2-dialog-header md2-dialog-title, .md2-dialog-header .md2-dialog-title { margin: 0; font-size: 25px; line-height: 60px; font-weight: 500; }\n    .md2-dialog-header dialog-header { line-height: 33px; }\n    .md2-dialog-body { position: relative; padding: 16px; }\n    .md2-dialog-footer, md2-dialog-footer { display: block; padding: 16px; text-align: right; border-top: 1px solid rgba(0,0,0,0.12); }\n  "],
                host: {
                    'tabindex': '0',
                    '(body:keydown)': 'onDocumentKeypress($event)'
                },
                encapsulation: core_1.ViewEncapsulation.None,
            }), 
            __metadata('design:paramtypes', [core_2.Overlay])
        ], Md2Dialog);
        return Md2Dialog;
    }());
    exports.Md2Dialog = Md2Dialog;
    exports.MD2_DIALOG_DIRECTIVES = [Md2Dialog, Md2DialogTitle, Md2DialogFooter,
        Md2DialogPortal
    ];
    exports.MD2_DIALOG_PROVIDERS = [
        core_2.Overlay, core_2.OVERLAY_PROVIDERS
    ];
    var Md2DialogModule = (function () {
        function Md2DialogModule() {
        }
        Md2DialogModule.forRoot = function () {
            return {
                ngModule: Md2DialogModule,
                providers: exports.MD2_DIALOG_PROVIDERS
            };
        };
        Md2DialogModule = __decorate([
            core_1.NgModule({
                declarations: exports.MD2_DIALOG_DIRECTIVES,
                imports: [common_1.CommonModule],
                exports: exports.MD2_DIALOG_DIRECTIVES,
            }), 
            __metadata('design:paramtypes', [])
        ], Md2DialogModule);
        return Md2DialogModule;
    }());
    exports.Md2DialogModule = Md2DialogModule;
});

//# sourceMappingURL=dialog.js.map
