import { EventEmitter } from '@angular/core';
export declare class Md2Collapse {
    _collapse: boolean;
    _collapsing: boolean;
    collapsed: EventEmitter<void>;
    expanded: EventEmitter<void>;
    collapse: boolean;
    /**
     * toggle collapse
     */
    toggle(): void;
    /**
    * show collapse
    */
    show(): void;
    /**
     * hide collapse
     */
    hide(): void;
}
