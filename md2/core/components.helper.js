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
        define(["require", "exports", '@angular/core', '@angular/platform-browser'], factory);
    }
})(function (require, exports) {
    "use strict";
    var core_1 = require('@angular/core');
    var platform_browser_1 = require('@angular/platform-browser');
    var ComponentsHelper = (function () {
        function ComponentsHelper(applicationRef, componentFactoryResolver, injector) {
            this.applicationRef = applicationRef;
            this.componentFactoryResolver = componentFactoryResolver;
            this.injector = injector;
        }
        ComponentsHelper.prototype.getDocument = function () {
            return this.injector.get(platform_browser_1.DOCUMENT);
        };
        /**
         * This is a name conventional class to get application root view component ref
         * to made this method working you need to add:
         * ```typescript
         *  @Component({
         *   selector: 'my-app',
         *   ...
         *   })
         *  export class MyApp {
         *    constructor(viewContainerRef: ViewContainerRef) {
         *        // A Default view container ref, usually the app root container ref.
         *        // Has to be set manually until we can find a way to get it automatically.
         *        this.viewContainerRef = viewContainerRef;
         *      }
         *  }
         * ```
         * @returns {ViewContainerRef} - application root view component ref
         */
        ComponentsHelper.prototype.getRootViewContainerRef = function () {
            var appInstance = this.applicationRef.components[0].instance;
            if (!appInstance.viewContainerRef) {
                var appName = this.applicationRef.componentTypes[0].name;
                throw new Error("Missing 'viewContainerRef' declaration in " + appName + " constructor");
            }
            return appInstance.viewContainerRef;
        };
        /**
         * Creates an instance of a Component and attaches it to the View Container found at the
         * `location` specified as {@link ViewContainerRef}.
         *
         * You can optionally provide `providers` to configure the {@link Injector} provisioned for this
         * Component Instance.
         *
         * Returns {@link ComponentRef} representing the newly created Component.
         * @param ComponentClass - @Component class
         * @param location - reference to the location
         * @param providers - optional array of providers
         * @returns {ComponentRef<T>} - returns ComponentRef<T>
         */
        ComponentsHelper.prototype.appendNextToLocation = function (ComponentClass, location, providers) {
            var componentFactory = this.componentFactoryResolver.resolveComponentFactory(ComponentClass);
            var parentInjector = location.parentInjector;
            var childInjector = parentInjector;
            if (providers && providers.length > 0) {
                childInjector = core_1.ReflectiveInjector.fromResolvedProviders(providers, parentInjector);
            }
            return location.createComponent(componentFactory, location.length, childInjector);
        };
        /**
         * Helper methods to add ComponentClass(like modal backdrop) with options
         * of type ComponentOptionsClass to element next to application root
         * or next to provided instance of view container
         * @param ComponentClass - @Component class
         * @param ComponentOptionsClass - options class
         * @param options - instance of options
         * @returns {ComponentRef<T>} - returns ComponentRef<T>
         */
        ComponentsHelper.prototype.appendNextToRoot = function (ComponentClass, ComponentOptionsClass, options) {
            var location = this.getRootViewContainerRef();
            var providers = core_1.ReflectiveInjector.resolve([
                { provide: ComponentOptionsClass, useValue: options }
            ]);
            return this.appendNextToLocation(ComponentClass, location, providers);
        };
        ComponentsHelper = __decorate([
            core_1.Injectable(), 
            __metadata('design:paramtypes', [core_1.ApplicationRef, core_1.ComponentFactoryResolver, core_1.Injector])
        ], ComponentsHelper);
        return ComponentsHelper;
    }());
    exports.ComponentsHelper = ComponentsHelper;
});

//# sourceMappingURL=components.helper.js.map
