import { HammerGestureConfig } from '@angular/platform-browser';
import { HammerInstance } from './gesture-annotations';
export declare class GestureConfig extends HammerGestureConfig {
    private _hammer;
    events: string[];
    constructor();
    buildHammer(element: HTMLElement): HammerInstance;
    /** Creates a new recognizer, without affecting the default recognizers of HammerJS */
    private _createRecognizer(base, options, ...inheritances);
}
