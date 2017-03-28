import {
  Component,
  Directive,
  EventEmitter,
  Input,
  Output,
  OnInit,
  Optional,
  DoCheck,
  IterableDiffers,
  IterableDiffer,
  ViewEncapsulation,
  NgModule,
  ModuleWithProviders,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Md2SelectModule } from '../select/index';

export class Md2PaginationChange {
  source: Md2Pagination;
  activePage: number;
}

export interface SortEvent {
  sortBy: string | string[];
  sortOrder: string;
}

export interface PageEvent {
  activePage: number;
  rowsPerPage: number;
  dataLength: number;
}

export interface DataEvent {
  length: number;
}

@Directive({
  selector: 'table[md2Data]',
  exportAs: 'md2DataTable'
})
export class Md2DataTable implements DoCheck {

  private diff: IterableDiffer<any>;
  private isDataChanged = false;
  private _data: Array<any> = [];
  private _activePage: number = 1;
  private _rowsPerPage: number = 1000;
  private _sortBy: string | Array<string> = '';
  private _sortOrder: string = 'asc';

  data: Array<any>;

  @Input()
  get md2Data() { return this._data; }
  set md2Data(value: Array<any>) {
    if (this._data !== value) {
      this._data = value || [];
      this.recalculatePage();
      this.isDataChanged = true;
    }
  }

  @Input()
  get activePage() { return this._activePage; }
  set activePage(value: number) {
    if (this._activePage !== value) {
      this._activePage = value;
    }
  }

  @Input()
  get rowsPerPage() { return this._rowsPerPage; }
  set rowsPerPage(value: number) {
    if (this._rowsPerPage !== value) {
      this._rowsPerPage = value;
      this.setPage(this.activePage, value);
      this.isDataChanged = true;
    }
  }

  @Input()
  get sortBy() { return this._sortBy; }
  set sortBy(value: string | Array<string>) {
    if (this._sortBy !== value) {
      this._sortBy = value;
      if (value) {
        this.onSortChange.next({ sortBy: this.sortBy, sortOrder: this.sortOrder });
      }
      this.isDataChanged = true;
    }
  }

  @Input()
  get sortOrder() { return this._sortOrder; }
  set sortOrder(value: string) {
    if (!(value === 'asc' || value === 'desc')) {
      console.warn('sortOrder value must be one of ["asc", "desc"], but is:', value);
      value = 'asc';
    }
    if (this._sortOrder !== value) {
      this._sortOrder = value;
      this.isDataChanged = true;
    }
  }

  @Output() activePageChange = new EventEmitter<number>();
  @Output() sortByChange = new EventEmitter<string | string[]>();
  @Output() sortOrderChange = new EventEmitter<string>();

  onSortChange = new EventEmitter<SortEvent>();
  onPageChange = new EventEmitter<PageEvent>();

  constructor(private differs: IterableDiffers) {
    this.diff = differs.find([]).create(null);
  }

  ngDoCheck(): any {
    let changes = this.diff.diff(this.md2Data);
    if (changes) {
      this.recalculatePage();
      this.isDataChanged = true;
    }
    if (this.isDataChanged) {
      this.fillData();
      this.diff.diff(this.md2Data);
      this.isDataChanged = false;
    }
  }

  getSort(): SortEvent {
    return { sortBy: this.sortBy, sortOrder: this.sortOrder };
  }

  setSort(sortBy: string | string[], sortOrder: string) {
    if (this.sortBy !== sortBy || this.sortOrder !== sortOrder) {
      this.sortBy = sortBy;
      this.sortOrder = sortOrder;
      this.isDataChanged = true;
      this.onSortChange.next({ sortBy: sortBy, sortOrder: sortOrder });
      this.sortByChange.emit(this.sortBy);
      this.sortOrderChange.emit(this.sortOrder);
    }
  }

  getPage(): PageEvent {
    return {
      activePage: this.activePage,
      rowsPerPage: this.rowsPerPage,
      dataLength: this.md2Data.length
    };
  }

  setPage(activePage: number, rowsPerPage: number): void {
    if (this.rowsPerPage !== rowsPerPage || this.activePage !== activePage) {
      this.activePage = this.activePage !== activePage ?
        activePage : this.calculateNewActivePage(this.rowsPerPage, rowsPerPage);
      this.rowsPerPage = rowsPerPage;
      this.isDataChanged = true;
      this.onPageChange.emit({
        activePage: this.activePage,
        rowsPerPage: this.rowsPerPage,
        dataLength: this.md2Data ? this.md2Data.length : 0
      });
      this.activePageChange.emit(this.activePage);
    }
  }

  private calculateNewActivePage(previousRowsPerPage: number, currentRowsPerPage: number): number {
    let firstRowOnPage = (this.activePage - 1) * previousRowsPerPage + 1;
    let newActivePage = Math.ceil(firstRowOnPage / currentRowsPerPage);
    return newActivePage;
  }

  private recalculatePage() {
    let lastPage = Math.ceil(this.md2Data.length / this.rowsPerPage);
    if (lastPage < this.activePage) {
      this._activePage = lastPage || 1;
      setTimeout(() => {
        this.activePageChange.emit(this.activePage);
      }, 10);
    } else { }

    this.onPageChange.emit({
      activePage: this.activePage,
      rowsPerPage: this.rowsPerPage,
      dataLength: this.md2Data.length
    });
  }

  private fillData() {
    let offset = (this.activePage - 1) * this.rowsPerPage;
    let data = this.md2Data;
    let sortInt = this.sortOrder === 'desc' ? -1 : 1;
    if (this.sortBy) {
      data = data.sort((a: any, b: any) => {
        let x = this.caseInsensitiveIteratee(a);
        let y = this.caseInsensitiveIteratee(b);
        return ((x > y) ? 1 : (y > x) ? -1 : 0) * sortInt;
      });
    }
    this.data = data.slice(offset, offset + this.rowsPerPage);
  }

  private caseInsensitiveIteratee(value: any) {
    if (typeof this.sortBy === 'string' || this.sortBy instanceof String) {
      for (let sortByProperty of this.sortBy.split('.')) {
        value = value[sortByProperty];
      }
    } else {
      value = value[this.sortBy + ''];
    }
    if (value && typeof value === 'string' || value instanceof String) {
      return value.toLowerCase();
    }
    return value;
  }

}

@Component({
  selector: '[md2SortBy]',
  templateUrl: 'sort.html',
  styleUrls: ['data-table.scss'],
  host: {
    '[class.md2-sort-active]': '_isAsc || _isDesc',
    '(click)': '_sort()'
  },
  encapsulation: ViewEncapsulation.None
})
export class Md2DataTableSortBy implements OnInit {

  @Input() md2SortBy: string;

  _isAsc: boolean = false;
  _isDesc: boolean = false;

  constructor(private _md2Table: Md2DataTable) {
  }

  ngOnInit() {
    this._md2Table.onSortChange.subscribe((event: SortEvent) => {
      this._isAsc = (event.sortBy === this.md2SortBy && event.sortOrder === 'asc');
      this._isDesc = (event.sortBy === this.md2SortBy && event.sortOrder === 'desc');
    });
  }

  _sort() {
    if (this._isAsc) {
      this._md2Table.setSort(this.md2SortBy, 'desc');
    } else {
      this._md2Table.setSort(this.md2SortBy, 'asc');
    }
  }

}

@Component({
  selector: 'md2-pagination',
  templateUrl: 'pagination.html',
  styleUrls: ['data-table.css'],
  exportAs: 'md2Pagination',
  encapsulation: ViewEncapsulation.None
})
export class Md2Pagination {

  private _activePage: number = 1;

  @Input() rowsPerPageSet: any = [];
  @Input() md2Table: Md2DataTable;

  _rowsPerPage: number;
  _dataLength: number = 0;
  _lastPage: number;

  constructor( @Optional() private _dataTable: Md2DataTable) { }

  ngDoCheck() {
    this.md2Table = this.md2Table || this._dataTable;
    this.onPageChangeSubscriber(this.md2Table.getPage());
    this.md2Table.onPageChange.subscribe(this.onPageChangeSubscriber);
  }

  _setPage(pageNumber: number): void {
    this.md2Table.setPage(pageNumber, this._rowsPerPage);
  }

  _setRows(event: any): void {
    this.md2Table.setPage(this._activePage, parseInt(event.value));
  }

  private onPageChangeSubscriber = (event: PageEvent) => {
    this._activePage = event.activePage;
    this._rowsPerPage = event.rowsPerPage;
    this._dataLength = event.dataLength;
    this._lastPage = Math.ceil(this._dataLength / this._rowsPerPage);
  }

}

export const MD2_DATA_TABLE_DIRECTIVES: any[] = [
  Md2DataTable,
  Md2DataTableSortBy,
  Md2Pagination
];

@NgModule({
  imports: [CommonModule, FormsModule, Md2SelectModule.forRoot()],
  exports: MD2_DATA_TABLE_DIRECTIVES,
  declarations: MD2_DATA_TABLE_DIRECTIVES,
})
export class Md2DataTableModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: Md2DataTableModule
    };
  }
}
