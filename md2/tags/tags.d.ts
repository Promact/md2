import { AfterContentInit, ElementRef, EventEmitter, ModuleWithProviders } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
export declare class Tag {
    text: string;
    value: string;
    constructor(source: any, textKey: string, valueKey: string);
}
export declare const MD2_TAGS_CONTROL_VALUE_ACCESSOR: any;
export declare class Md2Tags implements AfterContentInit, ControlValueAccessor {
    private _element;
    constructor(_element: ElementRef);
    ngAfterContentInit(): void;
    change: EventEmitter<any>;
    private _value;
    private _disabled;
    private _isInitialized;
    private _onTouchedCallback;
    private _onChangeCallback;
    private _tags;
    _list: Array<Tag>;
    _items: Array<Tag>;
    _focusedTag: number;
    _selectedTag: number;
    _inputValue: string;
    _inputFocused: boolean;
    private noBlur;
    id: string;
    tabindex: number;
    placeholder: string;
    textKey: string;
    valueKey: string;
    disabled: boolean;
    tags: Array<any>;
    value: any;
    /**
     * setup value
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
     * update scroll of tags suggestion menu
     */
    private updateScroll();
    /**
     * input key listener
     * @param event
     */
    _handleInputKeydown(event: KeyboardEvent): void;
    _handleKeydown(event: KeyboardEvent): void;
    private removeAndSelectAdjacentTag(index);
    private resetselectedTag();
    private getAdjacentTagIndex(index);
    /**
     * add tag
     * @param event
     * @param index index of the specific tag
     */
    _addTag(event: Event, index: number): void;
    _removeTagAndFocusInput(index: number): void;
    /**
     * remove tag
     * @param index
     */
    private removeTag(index);
    /**
     * update value
     */
    private updateValue();
    private selectAndFocusTagSafe;
    /**
     * select tag
     * @param index of select tag
     */
    _selectTag(index: number): void;
    _handleFocus(): void;
    _onInputFocus(): void;
    _onInputBlur(): void;
    _listEnter(): void;
    _listLeave(): void;
    /**
     * update suggestion menu with filter
     * @param query
     */
    private filterMatches(query);
    writeValue(value: any): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
}
export declare const MD2_TAGS_DIRECTIVES: typeof Md2Tags[];
export declare class Md2TagsModule {
    static forRoot(): ModuleWithProviders;
}
