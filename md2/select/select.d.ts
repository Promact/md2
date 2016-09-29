import { AfterContentChecked, EventEmitter, OnInit, QueryList, ElementRef, ModuleWithProviders } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
export declare const MD2_SELECT_CONTROL_VALUE_ACCESSOR: any;
export declare type Md2SelectDispatcherListener = (id: string, name: string) => void;
export declare class Md2SelectDispatcher {
    private _listeners;
    notify(id: string, name: string): void;
    listen(listener: Md2SelectDispatcherListener): void;
}
export declare class Md2OptionChange {
    source: Md2Option;
    value: any;
}
export declare class Md2Select implements AfterContentChecked, ControlValueAccessor {
    element: ElementRef;
    private _value;
    private _name;
    private _disabled;
    private _selected;
    private isOpenable;
    private isMenuVisible;
    private selectedValue;
    private focusIndex;
    private _controlValueAccessorChangeFn;
    onTouched: () => any;
    change: EventEmitter<Md2OptionChange>;
    _options: QueryList<Md2Option>;
    name: string;
    tabindex: number;
    placeholder: string;
    disabled: boolean;
    value: any;
    selected: Md2Option;
    constructor(element: ElementRef);
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
    private onKeyDown(e);
    onBlur(): void;
    touch(): void;
    private _updateOptions();
    private _updateSelectedOptionValue();
    private _emitChangeEvent();
    writeValue(value: any): void;
    registerOnChange(fn: (value: any) => void): void;
    registerOnTouched(fn: any): void;
}
export declare class Md2Option implements OnInit {
    private selectDispatcher;
    private element;
    focused: boolean;
    private _selected;
    id: string;
    name: string;
    private _disabled;
    private _value;
    content: any;
    select: Md2Select;
    constructor(select: Md2Select, selectDispatcher: Md2SelectDispatcher, element: ElementRef);
    selected: boolean;
    value: any;
    disabled: boolean;
    ngOnInit(): void;
    ngAfterViewInit(): void;
    /**
     * on click to select option
     * @param event
     */
    onClick(event: Event): void;
}
export declare const MD2_SELECT_DIRECTIVES: (typeof Md2Select | typeof Md2Option)[];
export declare class Md2SelectModule {
    static forRoot(): ModuleWithProviders;
}
