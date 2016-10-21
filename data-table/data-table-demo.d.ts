import { Http } from "@angular/http";
export declare class DataTableDemo {
    private http;
    private data;
    private filterQuery;
    constructor(http: Http);
    toInt(num: string): number;
    sortByWordLength: (a: any) => any;
}
