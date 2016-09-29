import { ElementRef, EventEmitter, ModuleWithProviders } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
export declare const MD2_TAGS_CONTROL_VALUE_ACCESSOR: any;
export declare class Md2Tags implements ControlValueAccessor {
    private element;
    constructor(element: ElementRef);
    change: EventEmitter<any>;
    private _value;
    private _disabled;
    private _onTouchedCallback;
    private _onChangeCallback;
    private _tags;
    private list;
    private items;
    private focusedTag;
    private selectedTag;
    private tagBuffer;
    private inputFocused;
    private noBlur;
    id: string;
    disabled: boolean;
    tabindex: number;
    placeholder: string;
    textKey: string;
    valueKey: string;
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
    private inputKeydown(event);
    private onKeydown(event);
    private removeAndSelectAdjacentTag(index);
    private resetselectedTag();
    private getAdjacentTagIndex(index);
    /**
     * add tag
     * @param event
     * @param index index of the specific tag
     */
    private addTag(event, index);
    private removeTagAndFocusInput(index);
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
    private selectTag(index);
    private onFocus();
    private onInputFocus();
    private onInputBlur();
    private listEnter();
    private listLeave();
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
