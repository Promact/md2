import { EventEmitter } from '@angular/core';
import { Md2AccordionTab } from './accordiontab';
export declare class Md2Accordion {
    private _multiple;
    multiple: boolean;
    close: EventEmitter<any>;
    open: EventEmitter<any>;
    tabs: Md2AccordionTab[];
    /**
     * Add or append tab in accordion
     * @param tab object of Md2AccordionTab
     */
    addTab(tab: Md2AccordionTab): void;
}
