import { InjectionToken, Optional } from '@angular/core';
import { Platform } from '../platform/platform';
export declare const LIVE_ANNOUNCER_ELEMENT_TOKEN: InjectionToken<HTMLElement>;
/** Possible politeness levels. */
export declare type AriaLivePoliteness = 'off' | 'polite' | 'assertive';
export declare class LiveAnnouncer {
    private _liveElement;
    constructor(elementToken: any, platform: Platform);
    /**
     * Announces a message to screenreaders.
     * @param message Message to be announced to the screenreader
     * @param politeness The politeness of the announcer element
     */
    announce(message: string, politeness?: AriaLivePoliteness): void;
    /** Removes the aria-live element from the DOM. */
    _removeLiveElement(): void;
    private _createLiveElement();
}
export declare function LIVE_ANNOUNCER_PROVIDER_FACTORY(parentDispatcher: LiveAnnouncer, liveElement: any, platform: Platform): LiveAnnouncer;
export declare const LIVE_ANNOUNCER_PROVIDER: {
    provide: typeof LiveAnnouncer;
    deps: (typeof Platform | Optional[])[];
    useFactory: (parentDispatcher: LiveAnnouncer, liveElement: any, platform: Platform) => LiveAnnouncer;
};
