/** Creates a browser MouseEvent with the specified options. */
export declare function createMouseEvent(type: string, x?: number, y?: number): MouseEvent;
/** Dispatches a keydown event from an element. */
export declare function createKeyboardEvent(type: string, keyCode: number): any;
/** Creates a fake event object with any desired event type. */
export declare function createFakeEvent(type: string): Event;
