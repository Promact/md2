import { ElementRef, ModuleWithProviders, EventEmitter, AfterContentInit } from '@angular/core';
import { ControlValueAccessor, NgForm } from '@angular/forms';
export declare const MD2_CHIPS_CONTROL_VALUE_ACCESSOR: any;
export declare class Md2Chips implements ControlValueAccessor, AfterContentInit {
    private elementRef;
    addOnBlur: boolean;
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
    readonly: boolean;
    minChips: number;
    maxChips: number;
    id: string;
    autocompleteItemText: string;
    textKey: string;
    valueKey: string;
    change: EventEmitter<any>;
    chipInputForm: NgForm;
    private onTouchedCallback;
    private onChangeCallback;
    private chipItemList;
    inputValue: string;
    private _value;
    selectedChip: number;
    private splitRegExp;
    private templateHtmlString;
    private item;
    private inputFocused;
    private isEmptyAutoComplete;
    private isObject;
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
    private onFocus();
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
    /**
    * select chip
    * @param index of select chip
    */
    private selectChip(index);
    private backspaceEvent();
    private _resetSelected();
    private _resetInput();
    /**
     * update value
     */
    private updateValue();
    writeValue(value: any): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
}
export declare const MD2_CHIPS_DIRECTIVES: any[];
export declare class Md2ChipsModule {
    static forRoot(): ModuleWithProviders;
}
