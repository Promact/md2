/**
 * Strategy that will update the element position as the user is scrolling.
 */
var RepositionScrollStrategy = (function () {
    function RepositionScrollStrategy(_scrollDispatcher, _scrollThrottle) {
        if (_scrollThrottle === void 0) { _scrollThrottle = 0; }
        this._scrollDispatcher = _scrollDispatcher;
        this._scrollThrottle = _scrollThrottle;
        this._scrollSubscription = null;
    }
    RepositionScrollStrategy.prototype.attach = function (overlayRef) {
        this._overlayRef = overlayRef;
    };
    RepositionScrollStrategy.prototype.enable = function () {
        var _this = this;
        if (!this._scrollSubscription) {
            this._scrollSubscription = this._scrollDispatcher.scrolled(this._scrollThrottle, function () {
                _this._overlayRef.updatePosition();
            });
        }
    };
    RepositionScrollStrategy.prototype.disable = function () {
        if (this._scrollSubscription) {
            this._scrollSubscription.unsubscribe();
            this._scrollSubscription = null;
        }
    };
    return RepositionScrollStrategy;
}());
export { RepositionScrollStrategy };
//# sourceMappingURL=reposition-scroll-strategy.js.map