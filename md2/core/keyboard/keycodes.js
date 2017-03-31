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
export var COMMA = 188;
//# sourceMappingURL=keycodes.js.map