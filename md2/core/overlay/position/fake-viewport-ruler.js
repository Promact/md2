export var FakeViewportRuler = (function () {
    function FakeViewportRuler() {
    }
    FakeViewportRuler.prototype.getViewportRect = function () {
        return {
            left: 0, top: 0, width: 1014, height: 686, bottom: 686, right: 1014
        };
    };
    FakeViewportRuler.prototype.getViewportScrollPosition = function () {
        return { top: 0, left: 0 };
    };
    return FakeViewportRuler;
}());

//# sourceMappingURL=fake-viewport-ruler.js.map
