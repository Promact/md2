import { ElementRef, ModuleWithProviders, EventEmitter, AfterContentInit } from '@angular/core';
import { ControlValueAccessor, NgForm } from '@angular/forms';
export declare class Chip {
    text: string;
    value: string;
    constructor(source: any, textKey: string, valueKey: string);
}
export declare const MD2_CHIPS_CONTROL_VALUE_ACCESSOR: any;
/** Change event object emitted by Md2Chips. */
export declare class Md2ChipsChange {
    source: Md2Chips;
    value: any;
}
export declare class Md2Chips implements ControlValueAccessor, AfterContentInit {
    private elementRef;
    tabindex: number;
    addOnComma: boolean;
    addOnEnter: boolean;
    addOnPaste: boolean;
    addOnSpace: boolean;
    allowedPattern: RegExp;
    ngModel: string[];
    pasteSplitPattern: string;
    placeholder: string;
    autocompleteDataList: string[];
    isAutoComplete: boolean;
    isRemovable: boolean;
    disabled: boolean;
    minChips: number;
    maxChips: number;
    id: string;
    autocompleteItemText: string;
    autocompleteItemValue: string;
    textKey: string;
    valueKey: string;
    change: EventEmitter<any>;
    chipInputForm: NgForm;
    _onChange: (value: any) => void;
    _onTouched: () => void;
    chipItemList: Array<Chip>;
    inputValue: string;
    selectedChip: number;
    inputFocused: boolean;
    private _value;
    private splitRegExp;
    private templateHtmlString;
    private item;
    private isEmptyAutoComplete;
    constructor(elementRef: ElementRef);
    readonly element: any;
    value: any;
    /**
     * set value
     * @param value
     */
    setValue: any;
    changeAutocomplete(value: any): void;
    ngAfterContentInit(): void;
    valueupdate(evt: Event): void;
    /**
     * input key listener
     * @param event
     */
    inputChanged(event: KeyboardEvent): void;
    _handleFocus(): void;
    inputBlurred(event: Event): void;
    inputFocus(event: Event): void;
    inputPaste(event: any): void;
    leftArrowKeyEvents(): void;
    rightArrowKeyEvents(): void;
    private addRegExpString(chipInputString);
    private _isValid(chipString);
    /**
    * add new chip
    * @param chips
    */
    private addNewChip(chips);
    /**
   * remove selected chip
   * @param chipIndexToRemove index of selected chip
   */
    private removeSelectedChip(chipIndexToRemove);
    private backspaceEvent();
    private _resetSelected();
    private _resetInput();
    /**
     * update value
     */
    private updateValue();
    /** Emits an event when the user selects a color. */
    _emitChangeEvent(): void;
    writeValue(value: any): void;
    registerOnChange(fn: (value: any) => void): void;
    registerOnTouched(fn: () => {}): void;
}
export declare const MD2_CHIPS_DIRECTIVES: any[];
export declare class Md2ChipsModule {
    static forRoot(): ModuleWithProviders;
}
