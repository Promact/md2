import { ModuleWithProviders } from '@angular/core';
/** Selector that matches all elements that may have style collisions with material1. */
export declare const MD_ELEMENTS_SELECTOR: string;
/** Directive that enforces that the `md-` prefix cannot be used. */
export declare class MdPrefixEnforcer {
    constructor();
}
export declare class NoConflictStyleCompatibilityMode {
    static forRoot(): ModuleWithProviders;
}
