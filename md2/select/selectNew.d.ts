import { EventEmitter, ModuleWithProviders } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
export declare const MD2_SELECT_CONTROL_VALUE_ACCESSOR: any;
export declare class Md2Select implements ControlValueAccessor {
    constructor();
    private _value;
    private _disabled;
    private _onTouchedCallback;
    private _onChangeCallback;
    private isMenuVisible;
    change: EventEmitter<any>;
    disabled: boolean;
    id: string;
    placeholder: string;
    tabindex: number;
    value: any;
    private onClick(event);
    private onKeyDown(event);
    private onBlur();
    writeValue(value: any): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
}
export declare class Md2Optgroup {
    private _disabled;
    label: string;
    disabled: boolean;
}
export declare class Md2Option {
    constructor();
    private _value;
    private _disabled;
    private _selected;
    label: string;
    disabled: boolean;
    selected: boolean;
    value: any;
}
export declare const MD2_SELECT_DIRECTIVES: (typeof Md2Select | typeof Md2Optgroup | typeof Md2Option)[];
export declare class Md2SelectModule {
    static forRoot(): ModuleWithProviders;
}
