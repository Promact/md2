import { QueryList } from '@angular/core';
import { Observable } from 'rxjs/Observable';
/**
 * This is the interface for focusable items (used by the ListKeyManager).
 * Each item must know how to focus itself and whether or not it is currently disabled.
 */
export interface MdFocusable {
    focus(): void;
    disabled?: boolean;
}
/**
 * This class manages keyboard events for selectable lists. If you pass it a query list
 * of focusable items, it will focus the correct item when arrow events occur.
 */
export declare class ListKeyManager {
    private _items;
    private _focusedItemIndex;
    private _tabOut;
    private _wrap;
    constructor(_items: QueryList<MdFocusable>);
    /**
     * Turns on focus wrapping mode, which ensures that the focus will wrap to
     * the other end of list when there are no more items in the given direction.
     */
    withFocusWrap(): this;
    /** Sets the focus of the list to the item at the index specified. */
    setFocus(index: number): void;
    /** Sets the focus properly depending on the key event passed in. */
    onKeydown(event: KeyboardEvent): void;
    /** Focuses the first enabled item in the list. */
    focusFirstItem(): void;
    /** Focuses the last enabled item in the list. */
    focusLastItem(): void;
    /** Focuses the next enabled item in the list. */
    focusNextItem(): void;
    /** Focuses a previous enabled item in the list. */
    focusPreviousItem(): void;
    /** Returns the index of the currently focused item. */
    readonly focusedItemIndex: number;
    /**
     * Observable that emits any time the TAB key is pressed, so components can react
     * when focus is shifted off of the list.
     */
    readonly tabOut: Observable<void>;
    /**
     * This method sets focus to the correct item, given a list of items and the delta
     * between the currently focused item and the new item to be focused. It will calculate
     * the proper focus differently depending on whether wrap mode is turned on.
     */
    private _setFocusByDelta(delta, items?);
    /**
     * Sets the focus properly given "wrap" mode. In other words, it will continue to move
     * down the list until it finds an item that is not disabled, and it will wrap if it
     * encounters either end of the list.
     */
    private _setWrapModeFocus(delta, items);
    /**
     * Sets the focus properly given the default mode. In other words, it will
     * continue to move down the list until it finds an item that is not disabled. If
     * it encounters either end of the list, it will stop and not wrap.
     */
    private _setDefaultModeFocus(delta, items);
    /**
     * Sets the focus to the first enabled item starting at the index specified. If the
     * item is disabled, it will move in the fallbackDelta direction until it either
     * finds an enabled item or encounters the end of the list.
     */
    private _setFocusByIndex(index, fallbackDelta, items?);
}
