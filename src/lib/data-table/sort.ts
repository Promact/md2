import {
  Component,
  Input,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { Md2DataTable, SortEvent } from './data-table';

@Component({
  selector: '[md2SortField]',
  templateUrl: 'sort.html',
  styleUrls: ['data-table.scss'],
  encapsulation: ViewEncapsulation.None
})
export class Md2DataTableSortField implements OnInit {

  @Input('md2SortField') sortField: string;

  _isAsc: boolean = false;
  _isDesc: boolean = false;

  public constructor(private _md2Table: Md2DataTable) {
  }

  public ngOnInit(): void {
    this._md2Table.onSortChange.subscribe((event: SortEvent) => {
      this._isAsc = (event.sortBy === this.sortField && event.sortOrder === 'asc');
      this._isDesc = (event.sortBy === this.sortField && event.sortOrder === 'desc');
    });
  }

  _sort() {
    if (this._isAsc) {
      this._md2Table.setSort(this.sortField, 'desc');
    } else {
      this._md2Table.setSort(this.sortField, 'asc');
    }
  }

}