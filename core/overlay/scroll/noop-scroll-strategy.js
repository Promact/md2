/**
 * Scroll strategy that doesn't do anything.
 */
var NoopScrollStrategy = (function () {
    function NoopScrollStrategy() {
    }
    NoopScrollStrategy.prototype.enable = function () { };
    NoopScrollStrategy.prototype.disable = function () { };
    NoopScrollStrategy.prototype.attach = function () { };
    return NoopScrollStrategy;
}());
export { NoopScrollStrategy };
//# sourceMappingURL=noop-scroll-strategy.js.map