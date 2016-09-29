import { ApplicationRef, ComponentFactoryResolver, ComponentRef, Injector, ViewContainerRef, ResolvedReflectiveProvider, Type } from '@angular/core';
export declare class ComponentsHelper {
    private applicationRef;
    private componentFactoryResolver;
    private injector;
    constructor(applicationRef: ApplicationRef, componentFactoryResolver: ComponentFactoryResolver, injector: Injector);
    getDocument(): any;
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
    getRootViewContainerRef(): ViewContainerRef;
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
    appendNextToLocation<T>(ComponentClass: Type<T>, location: ViewContainerRef, providers?: ResolvedReflectiveProvider[]): ComponentRef<T>;
    /**
     * Helper methods to add ComponentClass(like modal backdrop) with options
     * of type ComponentOptionsClass to element next to application root
     * or next to provided instance of view container
     * @param ComponentClass - @Component class
     * @param ComponentOptionsClass - options class
     * @param options - instance of options
     * @returns {ComponentRef<T>} - returns ComponentRef<T>
     */
    appendNextToRoot<T>(ComponentClass: Type<T>, ComponentOptionsClass: any, options: any): ComponentRef<T>;
}
