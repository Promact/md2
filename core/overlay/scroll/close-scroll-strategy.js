import { getMdScrollStrategyAlreadyAttachedError } from './scroll-strategy';
/**
 * Strategy that will close the overlay as soon as the user starts scrolling.
 */
var CloseScrollStrategy = (function () {
    function CloseScrollStrategy(_scrollDispatcher) {
        this._scrollDispatcher = _scrollDispatcher;
        this._scrollSubscription = null;
    }
    CloseScrollStrategy.prototype.attach = function (overlayRef) {
        if (this._overlayRef) {
            throw getMdScrollStrategyAlreadyAttachedError();
        }
        this._overlayRef = overlayRef;
    };
    CloseScrollStrategy.prototype.enable = function () {
        var _this = this;
        if (!this._scrollSubscription) {
            this._scrollSubscription = this._scrollDispatcher.scrolled(null, function () {
                if (_this._overlayRef.hasAttached()) {
                    _this._overlayRef.detach();
                }
                _this.disable();
            });
        }
    };
    CloseScrollStrategy.prototype.disable = function () {
        if (this._scrollSubscription) {
            this._scrollSubscription.unsubscribe();
            this._scrollSubscription = null;
        }
    };
    return CloseScrollStrategy;
}());
export { CloseScrollStrategy };
//# sourceMappingURL=close-scroll-strategy.js.map