import { InjectionToken } from '@angular/core';
export declare type MdDateFormats = {
    parse: {
        dateInput: any;
    };
    display: {
        dateInput: any;
        monthYearLabel: any;
        dateA11yLabel: any;
        monthYearA11yLabel: any;
    };
};
export declare const MD_DATE_FORMATS: InjectionToken<MdDateFormats>;
