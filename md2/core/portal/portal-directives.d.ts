import { ModuleWithProviders, ComponentRef, TemplateRef, ComponentFactoryResolver, ViewContainerRef, OnDestroy } from '@angular/core';
import { Portal, TemplatePortal, ComponentPortal, BasePortalHost } from './portal';
/**
 * Directive version of a `TemplatePortal`. Because the directive *is* a TemplatePortal,
 * the directive instance itself can be attached to a host, enabling declarative use of portals.
 *
 * Usage:
 * <template portal #greeting>
 *   <p> Hello {{name}} </p>
 * </template>
 */
export declare class TemplatePortalDirective extends TemplatePortal {
    constructor(templateRef: TemplateRef<any>, viewContainerRef: ViewContainerRef);
}
/**
 * Directive version of a PortalHost. Because the directive *is* a PortalHost, portals can be
 * directly attached to it, enabling declarative use.
 *
 * Usage:
 * <template [cdkPortalHost]="greeting"></template>
 */
export declare class PortalHostDirective extends BasePortalHost implements OnDestroy {
    private _componentFactoryResolver;
    private _viewContainerRef;
    /** The attached portal. */
    private _portal;
    constructor(_componentFactoryResolver: ComponentFactoryResolver, _viewContainerRef: ViewContainerRef);
    /** @deprecated */
    _deprecatedPortal: Portal<any>;
    /** Portal associated with the Portal host. */
    portal: Portal<any>;
    ngOnDestroy(): void;
    /**
     * Attach the given ComponentPortal to this PortalHost using the ComponentFactoryResolver.
     *
     * @param portal Portal to be attached to the portal host.
     */
    attachComponentPortal<T>(portal: ComponentPortal<T>): ComponentRef<T>;
    /**
     * Attach the given TemplatePortal to this PortlHost as an embedded View.
     * @param portal Portal to be attached.
     */
    attachTemplatePortal(portal: TemplatePortal): Map<string, any>;
    /** Detaches the currently attached Portal (if there is one) and attaches the given Portal. */
    private _replaceAttachedPortal(p);
}
export declare class PortalModule {
    static forRoot(): ModuleWithProviders;
}
