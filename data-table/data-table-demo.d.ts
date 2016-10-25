import { PipeTransform } from '@angular/core';
import { Http } from "@angular/http";
export declare class DataTablePipe implements PipeTransform {
    transform(array: any[], query: string): any;
}
export declare class DataTableDemo {
    private http;
    private data;
    private search;
    constructor(http: Http);
}
