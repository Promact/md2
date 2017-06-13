import { InjectionToken } from '@angular/core';
/** InjectionToken that can be used to specify the global placeholder options. */
export declare const MD_PLACEHOLDER_GLOBAL_OPTIONS: InjectionToken<PlaceholderOptions>;
/** Type for the available floatPlaceholder values. */
export declare type FloatPlaceholderType = 'always' | 'never' | 'auto';
export interface PlaceholderOptions {
    float?: FloatPlaceholderType;
}
