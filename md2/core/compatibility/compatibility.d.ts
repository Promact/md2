import { ModuleWithProviders, OpaqueToken } from '@angular/core';
export declare const MATERIAL_COMPATIBILITY_MODE: OpaqueToken;
/** Selector that matches all elements that may have style collisions with AngularJS Material. */
export declare const MAT_ELEMENTS_SELECTOR: string;
/** Selector that matches all elements that may have style collisions with AngularJS Material. */
export declare const MD_ELEMENTS_SELECTOR: string;
/** Directive that enforces that the `mat-` prefix cannot be used. */
export declare class MatPrefixRejector {
    constructor(isCompatibilityMode: boolean);
}
/** Directive that enforces that the `md-` prefix cannot be used. */
export declare class MdPrefixRejector {
    constructor(isCompatibilityMode: boolean);
}
/**
 * Module that enforces the default compatibility mode settings. When this module is loaded
 * without NoConflictStyleCompatibilityMode also being imported, it will throw an error if
 * there are any uses of the `mat-` prefix.
 */
export declare class CompatibilityModule {
    static forRoot(): ModuleWithProviders;
}
/**
 * Module that enforces "no-conflict" compatibility mode settings. When this module is loaded,
 * it will throw an error if there are any uses of the `md-` prefix.
 */
export declare class NoConflictStyleCompatibilityMode {
}
