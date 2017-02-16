var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
import { ListKeyManager } from './list-key-manager';
export var FocusKeyManager = (function (_super) {
    __extends(FocusKeyManager, _super);
    function FocusKeyManager(items) {
        _super.call(this, items);
    }
    /**
     * This method sets the active item to the item at the specified index.
     * It also adds focuses the newly active item.
     */
    FocusKeyManager.prototype.setActiveItem = function (index) {
        _super.prototype.setActiveItem.call(this, index);
        this.activeItem.focus();
    };
    return FocusKeyManager;
}(ListKeyManager));
//# sourceMappingURL=focus-key-manager.js.map