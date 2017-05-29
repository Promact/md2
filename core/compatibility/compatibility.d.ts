import { ElementRef, InjectionToken } from '@angular/core';
export declare const MATERIAL_COMPATIBILITY_MODE: InjectionToken<boolean>;
/** Injection token that configures whether the Material sanity checks are enabled. */
export declare const MATERIAL_SANITY_CHECKS: InjectionToken<boolean>;
/**
 * Returns an exception to be thrown if the consumer has used
 * an invalid Material prefix on a component.
 * @docs-private
 */
export declare function getMdCompatibilityInvalidPrefixError(prefix: string, nodeName: string): Error;
/** Selector that matches all elements that may have style collisions with AngularJS Material. */
export declare const MAT_ELEMENTS_SELECTOR: string;
/** Selector that matches all elements that may have style collisions with AngularJS Material. */
export declare const MD_ELEMENTS_SELECTOR: string;
/** Directive that enforces that the `mat-` prefix cannot be used. */
export declare class MatPrefixRejector {
    constructor(isCompatibilityMode: boolean, elementRef: ElementRef);
}
/** Directive that enforces that the `md-` prefix cannot be used. */
export declare class MdPrefixRejector {
    constructor(isCompatibilityMode: boolean, elementRef: ElementRef);
}
/**
 * Module that enforces the default compatibility mode settings. When this module is loaded
 * without NoConflictStyleCompatibilityMode also being imported, it will throw an error if
 * there are any uses of the `mat-` prefix.
 */
export declare class CompatibilityModule {
    private _document;
    /** Whether we've done the global sanity checks (e.g. a theme is loaded, there is a doctype). */
    private _hasDoneGlobalChecks;
    constructor(_document: any, _sanityChecksEnabled: boolean);
    private _checkDoctype();
    private _checkTheme();
}
/**
 * Module that enforces "no-conflict" compatibility mode settings. When this module is loaded,
 * it will throw an error if there are any uses of the `md-` prefix.
 */
export declare class NoConflictStyleCompatibilityMode {
}
