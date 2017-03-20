import { createFakeEvent, createKeyboardEvent, createMouseEvent } from './event-objects';
/** Shorthand to dispatch a fake event on a specified node. */
export function dispatchFakeEvent(node, type) {
    node.dispatchEvent(createFakeEvent(type));
}
/** Shorthand to dispatch a keyboard event with a specified key code. */
export function dispatchKeyboardEvent(node, type, keyCode) {
    node.dispatchEvent(createKeyboardEvent(type, keyCode));
}
/** Shorthand to dispatch a mouse event on the specified coordinates. */
export function dispatchMouseEvent(node, type, x, y) {
    if (x === void 0) { x = 0; }
    if (y === void 0) { y = 0; }
    node.dispatchEvent(createMouseEvent(type, x, y));
}
//# sourceMappingURL=dispatch-events.js.map