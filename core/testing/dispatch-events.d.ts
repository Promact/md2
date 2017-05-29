/** Utility to dispatch any event on a Node. */
export declare function dispatchEvent(node: Node | Window, event: Event): Event;
/** Shorthand to dispatch a fake event on a specified node. */
export declare function dispatchFakeEvent(node: Node | Window, type: string): Event;
/** Shorthand to dispatch a keyboard event with a specified key code. */
export declare function dispatchKeyboardEvent(node: Node, type: string, keyCode: number): KeyboardEvent;
/** Shorthand to dispatch a mouse event on the specified coordinates. */
export declare function dispatchMouseEvent(node: Node, type: string, x?: number, y?: number): MouseEvent;
