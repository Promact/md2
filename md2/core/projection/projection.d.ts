import { ModuleWithProviders, ElementRef } from '@angular/core';
/** @docs-private */
export declare class DomProjectionHost {
    ref: ElementRef;
    constructor(ref: ElementRef);
}
/** @docs-private */
export declare class DomProjection {
    /**
     * Project an element into a host element.
     * Replace a host element by another element. This also replaces the children of the element
     * by the children of the host.
     *
     * It should be used like this:
     *
     * ```
     *   @Component({
     *     template: `<div>
     *       <cdk-dom-projection-host>
     *         <div>other</div>
     *         <ng-content></ng-content>
     *       </cdk-dom-projection-host>
     *     </div>`
     *   })
     *   class Cmpt {
     *     constructor(private _projector: DomProjection, private _el: ElementRef) {}
     *     ngOnInit() { this._projector.project(this._el, this._projector); }
     *   }
     * ```
     *
     * This component will move the content of the element it's applied to in the outer div. Because
     * `project()` also move the children of the host inside the projected element, the element will
     * contain the `<div>other</div>` HTML as well as its own children.
     *
     * Note: without `<ng-content></ng-content>` the projection will project an empty element.
     *
     * @param ref ElementRef to be projected.
     * @param host Projection host into which to project the `ElementRef`.
     */
    project(ref: ElementRef, host: DomProjectionHost): void;
}
/** @docs-private */
export declare class ProjectionModule {
    /** @deprecated */
    static forRoot(): ModuleWithProviders;
}
