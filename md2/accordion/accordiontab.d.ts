import { Md2Accordion } from './accordionpanel';
export declare class Md2AccordionTab {
    private accordion;
    class: string;
    header: string;
    active: boolean;
    disabled: boolean;
    constructor(accordion: Md2Accordion);
    /**
     * Toggle the accordion
     * @param event
     * @return if it is disabled
     */
    toggle(event: Event): void;
    /**
     * Find index of specific tab of accordion
     * @return index number of this tab
     */
    findTabIndex(): number;
}
