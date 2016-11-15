import { AfterContentInit, AfterContentChecked, EventEmitter, OnInit, QueryList, ElementRef, ModuleWithProviders } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
export declare type Md2SelectDispatcherListener = (id: string, name: string) => void;
export declare class Md2SelectDispatcher {
    private _listeners;
    notify(id: string, name: string): void;
    listen(listener: Md2SelectDispatcherListener): void;
}
export declare class Md2SelectChange {
    source: Md2Select;
    value: any;
}
export declare class Md2Select implements AfterContentInit, AfterContentChecked, ControlValueAccessor {
    element: ElementRef;
    _control: NgControl;
    constructor(element: ElementRef, _control: NgControl);
    private _value;
    private _name;
    private _readonly;
    private _required;
    private _disabled;
    private _selected;
    private _isInitialized;
    private isOpenable;
    private isMenuVisible;
    private selectedValue;
    private focusIndex;
    _onChange: (value: any) => void;
    _onTouched: Function;
    change: EventEmitter<Md2SelectChange>;
    options: QueryList<Md2Option>;
    name: string;
    tabindex: number;
    placeholder: string;
    readonly: any;
    required: any;
    disabled: any;
    value: any;
    selected: Md2Option;
    ngAfterContentInit(): void;
    ngAfterContentChecked(): void;
    /**
     * Compare two vars or objects
     * @param o1 compare first object
     * @param o2 compare second object
     * @return boolean comparation result
     */
    private equals(o1, o2);
    /**
     * To update scroll to position of focused option
     */
    private updateScroll();
    /**
     * get index of focused option
     */
    private getFocusIndex();
    /**
     * update focused option
     * @param inc
     */
    private updateFocus(inc);
    private onClick(e);
    private onKeyDown(event);
    _onBlur(): void;
    touch(): void;
    private _updateOptions();
    private _updateSelectedOptionValue();
    private _emitChangeEvent();
    writeValue(value: any): void;
    registerOnChange(fn: (value: any) => void): void;
    registerOnTouched(fn: Function): void;
}
export declare class Md2Option implements OnInit {
    private selectDispatcher;
    private _elementRef;
    private _value;
    private _selected;
    private _disabled;
    text: string;
    name: string;
    select: Md2Select;
    focused: boolean;
    label: boolean;
    id: string;
    selected: boolean;
    value: any;
    disabled: boolean;
    constructor(select: Md2Select, selectDispatcher: Md2SelectDispatcher, _elementRef: ElementRef);
    ngOnInit(): void;
    ngAfterViewChecked(): void;
    /**
     * on click to select option
     * @param event
     */
    onOptionClick(event: Event): void;
}
export declare const MD2_SELECT_DIRECTIVES: (typeof Md2Select | typeof Md2Option)[];
export declare class Md2SelectModule {
    static forRoot(): ModuleWithProviders;
}
