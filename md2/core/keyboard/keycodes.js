// Due to a bug in the ChromeDriver, Angular keyboard events are not triggered by `sendKeys`
// during E2E tests when using dot notation such as `(keydown.rightArrow)`. To get around this,
// we are temporarily using a single (keydown) handler.
// See: https://github.com/angular/angular/issues/9419
export var UP_ARROW = 38;
export var DOWN_ARROW = 40;
export var RIGHT_ARROW = 39;
export var LEFT_ARROW = 37;
export var PAGE_UP = 33;
export var PAGE_DOWN = 34;
export var HOME = 36;
export var END = 35;
export var ENTER = 13;
export var SPACE = 32;
export var TAB = 9;
export var ESCAPE = 27;
export var BACKSPACE = 8;
export var DELETE = 46;
export var KeyCodes;
(function (KeyCodes) {
    KeyCodes[KeyCodes["UP_ARROW"] = 38] = "UP_ARROW";
    KeyCodes[KeyCodes["DOWN_ARROW"] = 40] = "DOWN_ARROW";
    KeyCodes[KeyCodes["RIGHT_ARROW"] = 39] = "RIGHT_ARROW";
    KeyCodes[KeyCodes["LEFT_ARROW"] = 37] = "LEFT_ARROW";
    KeyCodes[KeyCodes["ENTER"] = 13] = "ENTER";
    KeyCodes[KeyCodes["SPACE"] = 32] = "SPACE";
    KeyCodes[KeyCodes["BACKSPACE"] = 8] = "BACKSPACE";
    KeyCodes[KeyCodes["DELETE"] = 46] = "DELETE";
    KeyCodes[KeyCodes["TAB"] = 9] = "TAB";
    KeyCodes[KeyCodes["ESCAPE"] = 27] = "ESCAPE";
    KeyCodes[KeyCodes["COMMA"] = 188] = "COMMA";
})(KeyCodes || (KeyCodes = {}));
//# sourceMappingURL=keycodes.js.map