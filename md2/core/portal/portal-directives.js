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
        define(["require", "exports", '@angular/core', './portal'], factory);
    }
})(function (require, exports) {
    "use strict";
    var core_1 = require('@angular/core');
    var portal_1 = require('./portal');
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
        TemplatePortalDirective = __decorate([
            core_1.Directive({
                selector: '[portal]',
                exportAs: 'portal',
            }), 
            __metadata('design:paramtypes', [core_1.TemplateRef, core_1.ViewContainerRef])
        ], TemplatePortalDirective);
        return TemplatePortalDirective;
    }(portal_1.TemplatePortal));
    exports.TemplatePortalDirective = TemplatePortalDirective;
    /**
     * Directive version of a PortalHost. Because the directive *is* a PortalHost, portals can be
     * directly attached to it, enabling declarative use.
     *
     * Usage:
     * <template [portalHost]="greeting"></template>
     */
    var PortalHostDirective = (function (_super) {
        __extends(PortalHostDirective, _super);
        function PortalHostDirective(_componentFactoryResolver, _viewContainerRef) {
            _super.call(this);
            this._componentFactoryResolver = _componentFactoryResolver;
            this._viewContainerRef = _viewContainerRef;
        }
        Object.defineProperty(PortalHostDirective.prototype, "portal", {
            get: function () {
                return this._portal;
            },
            set: function (p) {
                this._replaceAttachedPortal(p);
            },
            enumerable: true,
            configurable: true
        });
        /** Attach the given ComponentPortal to this PortlHost using the ComponentFactoryResolver. */
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
        /** Detatches the currently attached Portal (if there is one) and attaches the given Portal. */
        PortalHostDirective.prototype._replaceAttachedPortal = function (p) {
            if (this.hasAttached()) {
                this.detach();
            }
            if (p) {
                this.attach(p);
                this._portal = p;
            }
        };
        PortalHostDirective = __decorate([
            core_1.Directive({
                selector: '[portalHost]',
                inputs: ['portal: portalHost']
            }), 
            __metadata('design:paramtypes', [core_1.ComponentFactoryResolver, core_1.ViewContainerRef])
        ], PortalHostDirective);
        return PortalHostDirective;
    }(portal_1.BasePortalHost));
    exports.PortalHostDirective = PortalHostDirective;
    var PortalModule = (function () {
        function PortalModule() {
        }
        PortalModule.forRoot = function () {
            return {
                ngModule: PortalModule,
                providers: []
            };
        };
        PortalModule = __decorate([
            core_1.NgModule({
                exports: [TemplatePortalDirective, PortalHostDirective],
                declarations: [TemplatePortalDirective, PortalHostDirective],
            }), 
            __metadata('design:paramtypes', [])
        ], PortalModule);
        return PortalModule;
    }());
    exports.PortalModule = PortalModule;
});

//# sourceMappingURL=portal-directives.js.map
