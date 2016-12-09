import { AfterContentInit, ElementRef, EventEmitter, ModuleWithProviders } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { HighlightPipe } from './autocomplete-pipe';
export declare class Item {
    text: string;
    value: string;
    constructor(source: any, textKey: string, valueKey: string);
}
export declare const MD2_AUTOCOMPLETE_CONTROL_VALUE_ACCESSOR: any;
export declare class Md2Autocomplete implements AfterContentInit, ControlValueAccessor {
    private _element;
    constructor(_element: ElementRef);
    ngAfterContentInit(): void;
    change: EventEmitter<any>;
    textChange: EventEmitter<{}>;
    private _value;
    private _readonly;
    private _required;
    private _disabled;
    private _isInitialized;
    private _onTouchedCallback;
    private _onChangeCallback;
    private _items;
    _list: Array<Item>;
    private selectedItem;
    private noBlur;
    _focusedOption: number;
    _inputValue: string;
    _inputFocused: boolean;
    id: string;
    tabindex: number;
    placeholder: string;
    textKey: string;
    valueKey: string;
    minLength: number;
    readonly: boolean;
    required: boolean;
    disabled: boolean;
    items: Array<any>;
    value: any;
    /**
     * Compare two vars or objects
     * @param o1 compare first object
     * @param o2 compare second object
     * @return boolean comparation result
     */
    private equals(o1, o2);
    readonly isMenuVisible: boolean;
    /**
     * update scroll of suggestion menu
     */
    private updateScroll();
    /**
     * input event listner
     * @param event
     */
    _handleKeydown(event: KeyboardEvent): void;
    /**
     * select option
     * @param event
     * @param index of selected item
     */
    _selectOption(event: Event, index: number): void;
    /**
     * clear selected suggestion
     */
    _onClear(): void;
    /**
     * update value
     */
    private updateValue();
    /**
     * component focus listener
     */
    private onFocus();
    /**
     * input focus listener
     */
    _handleFocus(): void;
    /**
     * input blur listener
     */
    _handleBlur(): void;
    /**
     * suggestion menu mouse enter listener
     */
    _handleMouseEnter(): void;
    /**
     * suggestion menu mouse leave listener
     */
    _handleMouseLeave(): void;
    /**
     * Update suggestion to filter the query
     * @param query
     */
    private updateItems(query);
    writeValue(value: any): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
}
export declare const MD2_AUTOCOMPLETE_DIRECTIVES: (typeof HighlightPipe | typeof Md2Autocomplete)[];
export declare class Md2AutocompleteModule {
    static forRoot(): ModuleWithProviders;
}
