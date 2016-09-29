import { ModuleWithProviders } from '@angular/core';
export declare class Md2Collapse {
    private height;
    private isExpanded;
    private isCollapsing;
    collapse: boolean;
    /**
     * toggle collapse
     */
    toggle(): void;
    /**
     * hide collapse
     */
    hide(): void;
    /**
     * show collapse
     */
    show(): void;
}
export declare const MD2_COLLAPSE_DIRECTIVES: any[];
export declare class Md2CollapseModule {
    static forRoot(): ModuleWithProviders;
}
