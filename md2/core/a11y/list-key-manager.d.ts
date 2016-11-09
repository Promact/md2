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
    constructor(_items: QueryList<MdFocusable>);
    /**
     * Observable that emits any time the TAB key is pressed, so components can react
     * when focus is shifted off of the list.
     */
    readonly tabOut: Observable<void>;
    focusedItemIndex: number;
    onKeydown(event: KeyboardEvent): void;
    private _focusNextItem();
    private _focusPreviousItem();
    /**
     * This method sets focus to the correct item, given a list of items and the delta
     * between the currently focused item and the new item to be focused. It will
     * continue to move down the list until it finds an item that is not disabled, and it will wrap
     * if it encounters either end of the list.
     *
     * @param delta the desired change in focus index
     */
    private _updateFocusedItemIndex(delta, items);
}
