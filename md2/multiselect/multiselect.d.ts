import { AfterContentInit, ElementRef, EventEmitter, ModuleWithProviders } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
export declare class Option {
    text: string;
    value: string;
    constructor(source: any, textKey: string, valueKey: string);
}
export declare const MD2_MULTISELECT_CONTROL_VALUE_ACCESSOR: any;
export declare class Md2Multiselect implements AfterContentInit, ControlValueAccessor {
    private element;
    constructor(element: ElementRef);
    ngAfterContentInit(): void;
    change: EventEmitter<any>;
    private _value;
    private _readonly;
    private _required;
    private _disabled;
    private _isInitialized;
    private _onTouchedCallback;
    private _onChangeCallback;
    private _options;
    _list: Array<Option>;
    _items: Array<Option>;
    _focusedOption: number;
    private isFocused;
    id: string;
    tabindex: number;
    placeholder: string;
    textKey: string;
    valueKey: string;
    readonly: boolean;
    required: boolean;
    disabled: boolean;
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
    _handleClick(event: MouseEvent): void;
    _handleKeydown(event: KeyboardEvent): void;
    /**
     * on focus current component
     */
    private onFocus();
    _onBlur(): void;
    /**
     * to check current option is active or not
     * @param index
     * @return boolean the item is active or not
     */
    _isActive(index: number): boolean;
    /**
     * to toggle option to select/deselect option
     * @param event
     * @param index
     */
    _handleOptionClick(event: Event, index: number): void;
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
