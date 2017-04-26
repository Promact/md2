import { PipeTransform } from '@angular/core';
export declare class HighlightPipe implements PipeTransform {
    /**
     * Transform function
     * @param value string
     * @param query string filter value
     * @return filtered string with markup
     */
    transform(value: string, query: string): string;
    /**
     * filter pipe
     * @param queryToEscape
     * @return queryToEscape with replace string
     */
    private _escapeRegexp(queryToEscape);
}
