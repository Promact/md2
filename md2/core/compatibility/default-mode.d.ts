import { ModuleWithProviders, OpaqueToken } from '@angular/core';
export declare const MATERIAL_COMPATIBILITY_MODE: OpaqueToken;
/** Selector that matches all elements that may have style collisions with material1. */
export declare const MAT_ELEMENTS_SELECTOR: string;
/** Directive that enforces that the `mat-` prefix cannot be used. */
export declare class MatPrefixEnforcer {
    constructor(isCompatibilityMode: boolean);
}
/**
 * Module that enforces the default "compatibility mode" settings. When this module is loaded
 * without NoConflictStyleCompatibilityMode also being imported, it will throw an error if
 * there are any uses of the `mat-` prefix.
 *
 * Because the point of this directive is to *not* be used, it will be tree-shaken away by
 * optimizers when not in compatibility mode.
 */
export declare class DefaultStyleCompatibilityModeModule {
    static forRoot(): ModuleWithProviders;
}
