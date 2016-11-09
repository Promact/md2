import { UP_ARROW, DOWN_ARROW, TAB } from '../core';
import { Subject } from 'rxjs/Subject';
/**
 * This class manages keyboard events for selectable lists. If you pass it a query list
 * of focusable items, it will focus the correct item when arrow events occur.
 */
export var ListKeyManager = (function () {
    function ListKeyManager(_items) {
        this._items = _items;
        this._tabOut = new Subject();
    }
    Object.defineProperty(ListKeyManager.prototype, "tabOut", {
        /**
         * Observable that emits any time the TAB key is pressed, so components can react
         * when focus is shifted off of the list.
         */
        get: function () {
            return this._tabOut.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ListKeyManager.prototype, "focusedItemIndex", {
        get: function () {
            return this._focusedItemIndex;
        },
        set: function (value) {
            this._focusedItemIndex = value;
        },
        enumerable: true,
        configurable: true
    });
    ListKeyManager.prototype.onKeydown = function (event) {
        if (event.keyCode === DOWN_ARROW) {
            this._focusNextItem();
        }
        else if (event.keyCode === UP_ARROW) {
            this._focusPreviousItem();
        }
        else if (event.keyCode === TAB) {
            this._tabOut.next(null);
        }
    };
    ListKeyManager.prototype._focusNextItem = function () {
        var items = this._items.toArray();
        this._updateFocusedItemIndex(1, items);
        items[this._focusedItemIndex].focus();
    };
    ListKeyManager.prototype._focusPreviousItem = function () {
        var items = this._items.toArray();
        this._updateFocusedItemIndex(-1, items);
        items[this._focusedItemIndex].focus();
    };
    /**
     * This method sets focus to the correct item, given a list of items and the delta
     * between the currently focused item and the new item to be focused. It will
     * continue to move down the list until it finds an item that is not disabled, and it will wrap
     * if it encounters either end of the list.
     *
     * @param delta the desired change in focus index
     */
    ListKeyManager.prototype._updateFocusedItemIndex = function (delta, items) {
        // when focus would leave menu, wrap to beginning or end
        this._focusedItemIndex =
            (this._focusedItemIndex + delta + items.length) % items.length;
        // skip all disabled menu items recursively until an active one
        // is reached or the menu closes for overreaching bounds
        while (items[this._focusedItemIndex].disabled) {
            this._updateFocusedItemIndex(delta, items);
        }
    };
    return ListKeyManager;
}());

//# sourceMappingURL=list-key-manager.js.map
