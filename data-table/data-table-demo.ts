import { Component } from '@angular/core';
import { Http } from "@angular/http";

@Component({
  moduleId: module.id,
  selector: 'data-table-demo',
  templateUrl: 'data-table-demo.html'
})
export class DataTableDemo {
  private data: any = null;
  private filterQuery: string = null;

  constructor(private http: Http) {
    http.get("./data-table/data.json")
      .subscribe((data) => {
        this.data = data.json();
      });
  }

  public toInt(num: string) {
    return +num;
  }

  public sortByWordLength = (a: any) => {
    return a.name.length;
  }
}
