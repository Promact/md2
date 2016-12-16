import { UP_ARROW, DOWN_ARROW, TAB, HOME, END } from '../core';
import { Subject } from 'rxjs/Subject';
/**
 * This class manages keyboard events for selectable lists. If you pass it a query list
 * of focusable items, it will focus the correct item when arrow events occur.
 */
export var ListKeyManager = (function () {
    function ListKeyManager(_items) {
        this._items = _items;
        this._tabOut = new Subject();
        this._wrap = false;
    }
    /**
     * Turns on focus wrapping mode, which ensures that the focus will wrap to
     * the other end of list when there are no more items in the given direction.
     */
    ListKeyManager.prototype.withFocusWrap = function () {
        this._wrap = true;
        return this;
    };
    /**
     * Sets the focus of the list to the item at the index specified.
     *
     * @param index The index of the item to be focused.
     */
    ListKeyManager.prototype.setFocus = function (index) {
        this._focusedItemIndex = index;
        this._items.toArray()[index].focus();
    };
    /** Sets the focus properly depending on the key event passed in. */
    ListKeyManager.prototype.onKeydown = function (event) {
        switch (event.keyCode) {
            case DOWN_ARROW:
                this.focusNextItem();
                break;
            case UP_ARROW:
                this.focusPreviousItem();
                break;
            case HOME:
                this.focusFirstItem();
                break;
            case END:
                this.focusLastItem();
                break;
            case TAB:
                // Note that we shouldn't prevent the default action on tab.
                this._tabOut.next(null);
                return;
            default:
                return;
        }
        event.preventDefault();
    };
    /** Focuses the first enabled item in the list. */
    ListKeyManager.prototype.focusFirstItem = function () {
        this._setFocusByIndex(0, 1);
    };
    /** Focuses the last enabled item in the list. */
    ListKeyManager.prototype.focusLastItem = function () {
        this._setFocusByIndex(this._items.length - 1, -1);
    };
    /** Focuses the next enabled item in the list. */
    ListKeyManager.prototype.focusNextItem = function () {
        this._setFocusByDelta(1);
    };
    /** Focuses a previous enabled item in the list. */
    ListKeyManager.prototype.focusPreviousItem = function () {
        this._setFocusByDelta(-1);
    };
    Object.defineProperty(ListKeyManager.prototype, "focusedItemIndex", {
        /** Returns the index of the currently focused item. */
        get: function () {
            return this._focusedItemIndex;
        },
        enumerable: true,
        configurable: true
    });
    /** Allows setting of the focusedItemIndex without focusing the item. */
    ListKeyManager.prototype.updateFocusedItemIndex = function (index) {
        this._focusedItemIndex = index;
    };
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
    /**
     * This method sets focus to the correct item, given a list of items and the delta
     * between the currently focused item and the new item to be focused. It will calculate
     * the proper focus differently depending on whether wrap mode is turned on.
     */
    ListKeyManager.prototype._setFocusByDelta = function (delta, items) {
        if (items === void 0) { items = this._items.toArray(); }
        this._wrap ? this._setWrapModeFocus(delta, items)
            : this._setDefaultModeFocus(delta, items);
    };
    /**
     * Sets the focus properly given "wrap" mode. In other words, it will continue to move
     * down the list until it finds an item that is not disabled, and it will wrap if it
     * encounters either end of the list.
     */
    ListKeyManager.prototype._setWrapModeFocus = function (delta, items) {
        // when focus would leave menu, wrap to beginning or end
        this._focusedItemIndex =
            (this._focusedItemIndex + delta + items.length) % items.length;
        // skip all disabled menu items recursively until an active one is reached
        if (items[this._focusedItemIndex].disabled) {
            this._setWrapModeFocus(delta, items);
        }
        else {
            items[this._focusedItemIndex].focus();
        }
    };
    /**
     * Sets the focus properly given the default mode. In other words, it will
     * continue to move down the list until it finds an item that is not disabled. If
     * it encounters either end of the list, it will stop and not wrap.
     */
    ListKeyManager.prototype._setDefaultModeFocus = function (delta, items) {
        this._setFocusByIndex(this._focusedItemIndex + delta, delta, items);
    };
    /**
     * Sets the focus to the first enabled item starting at the index specified. If the
     * item is disabled, it will move in the fallbackDelta direction until it either
     * finds an enabled item or encounters the end of the list.
     */
    ListKeyManager.prototype._setFocusByIndex = function (index, fallbackDelta, items) {
        if (items === void 0) { items = this._items.toArray(); }
        if (!items[index]) {
            return;
        }
        while (items[index].disabled) {
            index += fallbackDelta;
            if (!items[index]) {
                return;
            }
        }
        this.setFocus(index);
    };
    return ListKeyManager;
}());

//# sourceMappingURL=list-key-manager.js.map
