import {
  Component,
  Pipe,
  PipeTransform
} from '@angular/core';
import { Http } from '@angular/http';

@Pipe({ name: 'dataPipe' })
export class DataTablePipe implements PipeTransform {
  transform(array: any[], query: string): any {
    if (query) {
      return array.filter((value: any, index: number, arr: any) => value.name.indexOf(query) > -1);
    }
    return array;
  }
}

@Component({
  moduleId: module.id,
  selector: 'data-table-demo',
  templateUrl: 'data-table-demo.html'
})
export class DataTableDemo {
  data: any = null;
  search: string = null;

  constructor(private http: Http) {
    this.http.get('./data-table/data.json')
      .subscribe((data) => {
        this.data = data.json();
      });
  }
}
