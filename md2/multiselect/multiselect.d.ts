import { ElementRef, EventEmitter, ModuleWithProviders } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
export declare const MD2_MULTISELECT_CONTROL_VALUE_ACCESSOR: any;
export declare class Md2Multiselect implements ControlValueAccessor {
    private element;
    constructor(element: ElementRef);
    change: EventEmitter<any>;
    private _value;
    private _disabled;
    private _onTouchedCallback;
    private _onChangeCallback;
    private _options;
    private list;
    private items;
    private focusedOption;
    private isFocused;
    id: string;
    disabled: boolean;
    tabindex: number;
    placeholder: string;
    textKey: string;
    valueKey: string;
    options: Array<any>;
    value: any;
    /**
     * set value
     * @param value
     */
    private setValue(value);
    /**
     * Compare two vars or objects
     * @param o1 compare first object
     * @param o2 compare second object
     * @return boolean comparation result
     */
    private equals(o1, o2);
    readonly isMenuVisible: boolean;
    /**
     * to update scroll of options
     */
    private updateScroll();
    private onClick(event);
    private onKeyDown(event);
    /**
     * on focus current component
     */
    private onFocus();
    private onBlur();
    /**
     * to check current option is active or not
     * @param index
     * @return boolean the item is active or not
     */
    private isActive(index);
    /**
     * to toggle option to select/deselect option
     * @param event
     * @param index
     */
    private toggleOption(event, index);
    /**
     * update options
     */
    private updateOptions();
    /**
     * Implemented as part of ControlValueAccessor.
     * TODO: internal
     */
    writeValue(value: any): void;
    /**
     * Implemented as part of ControlValueAccessor.
     * TODO: internal
     */
    registerOnChange(fn: any): void;
    /**
     * Implemented as part of ControlValueAccessor.
     * TODO: internal
     */
    registerOnTouched(fn: any): void;
}
export declare const MD2_MULTISELECT_DIRECTIVES: typeof Md2Multiselect[];
export declare class Md2MultiselectModule {
    static forRoot(): ModuleWithProviders;
}
