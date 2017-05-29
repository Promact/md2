import { createFakeEvent, createKeyboardEvent, createMouseEvent } from './event-objects';
/** Utility to dispatch any event on a Node. */
export function dispatchEvent(node, event) {
    node.dispatchEvent(event);
    return event;
}
/** Shorthand to dispatch a fake event on a specified node. */
export function dispatchFakeEvent(node, type) {
    return dispatchEvent(node, createFakeEvent(type));
}
/** Shorthand to dispatch a keyboard event with a specified key code. */
export function dispatchKeyboardEvent(node, type, keyCode) {
    return dispatchEvent(node, createKeyboardEvent(type, keyCode));
}
/** Shorthand to dispatch a mouse event on the specified coordinates. */
export function dispatchMouseEvent(node, type, x, y) {
    if (x === void 0) { x = 0; }
    if (y === void 0) { y = 0; }
    return dispatchEvent(node, createMouseEvent(type, x, y));
}
//# sourceMappingURL=dispatch-events.js.map