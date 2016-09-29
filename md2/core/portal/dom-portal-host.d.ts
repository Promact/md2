import { ComponentFactoryResolver, ComponentRef } from '@angular/core';
import { BasePortalHost, ComponentPortal, TemplatePortal } from './portal';
/**
 * A PortalHost for attaching portals to an arbitrary DOM element outside of the Angular
 * application context.
 *
 * This is the only part of the portal core that directly touches the DOM.
 */
export declare class DomPortalHost extends BasePortalHost {
    private _hostDomElement;
    private _componentFactoryResolver;
    constructor(_hostDomElement: Element, _componentFactoryResolver: ComponentFactoryResolver);
    /** Attach the given ComponentPortal to DOM element using the ComponentFactoryResolver. */
    attachComponentPortal<T>(portal: ComponentPortal<T>): ComponentRef<T>;
    attachTemplatePortal(portal: TemplatePortal): Map<string, any>;
    dispose(): void;
}
