import {
  Component,
  Directive,
  EventEmitter,
  Input,
  Output,
  OnInit,
  SimpleChange,
  OnChanges,
  Optional,
  DoCheck,
  IterableDiffers,
  IterableDiffer,
  ViewEncapsulation,
  NgModule,
  ModuleWithProviders,
} from '@angular/core';
import { ReplaySubject } from 'rxjs/Rx';
import { CommonModule } from '@angular/common';

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
export class Md2DataTable implements OnChanges, DoCheck {

  private diff: IterableDiffer;

  @Input('md2Data') inputData: any[] = [];
  @Input() rowsPerPage = 1000;
  @Input() activePage = 1;
  @Input() sortBy: string | string[] = '';
  @Input() sortOrder = 'asc';

  @Output() sortByChange = new EventEmitter<string | string[]>();
  @Output() sortOrderChange = new EventEmitter<string>();

  private mustRecalculateData = false;

  data: any[];

  onSortChange = new ReplaySubject<SortEvent>(1);
  onPageChange = new EventEmitter<PageEvent>();

  constructor(private differs: IterableDiffers) {
    this.diff = differs.find([]).create(null);
  }

  getSort(): SortEvent {
    return { sortBy: this.sortBy, sortOrder: this.sortOrder };
  }

  setSort(sortBy: string | string[], sortOrder: string) {
    if (this.sortBy !== sortBy || this.sortOrder !== sortOrder) {
      this.sortBy = sortBy;
      this.sortOrder = sortOrder;// _.includes(['asc', 'desc'], sortOrder) ? sortOrder : 'asc';
      this.mustRecalculateData = true;
      this.onSortChange.next({ sortBy: sortBy, sortOrder: sortOrder });
      this.sortByChange.emit(this.sortBy);
      this.sortOrderChange.emit(this.sortOrder);
    }
  }

  getPage(): PageEvent {
    return { activePage: this.activePage, rowsPerPage: this.rowsPerPage, dataLength: this.inputData.length };
  }

  setPage(activePage: number, rowsPerPage: number): void {
    if (this.rowsPerPage !== rowsPerPage || this.activePage !== activePage) {
      this.activePage = this.activePage !== activePage ? activePage : this.calculateNewActivePage(this.rowsPerPage, rowsPerPage);
      this.rowsPerPage = rowsPerPage;
      this.mustRecalculateData = true;
      this.onPageChange.emit({
        activePage: this.activePage,
        rowsPerPage: this.rowsPerPage,
        dataLength: this.inputData ? this.inputData.length : 0
      });
    }
  }

  private calculateNewActivePage(previousRowsPerPage: number, currentRowsPerPage: number): number {
    let firstRowOnPage = (this.activePage - 1) * previousRowsPerPage + 1;
    let newActivePage = Math.ceil(firstRowOnPage / currentRowsPerPage);
    return newActivePage;
  }

  private recalculatePage() {
    let lastPage = Math.ceil(this.inputData.length / this.rowsPerPage);
    this.activePage = lastPage < this.activePage ? lastPage : this.activePage;
    this.activePage = this.activePage || 1;

    this.onPageChange.emit({
      activePage: this.activePage,
      rowsPerPage: this.rowsPerPage,
      dataLength: this.inputData.length
    });
  }

  ngOnChanges(changes: { [key: string]: SimpleChange }): any {
    if (changes['rowsPerPage']) {
      this.rowsPerPage = changes['rowsPerPage'].previousValue;
      this.setPage(this.activePage, changes['rowsPerPage'].currentValue);
      this.mustRecalculateData = true;
    }
    if (changes['sortBy'] || changes['sortOrder']) {
      //if (!_.includes(['asc', 'desc'], this.sortOrder)) {
      //  console.warn('md2-data-table: value md2SortOrder must be one of ["asc", "desc"], but is:', this.sortOrder);
      //  this.sortOrder = 'asc';
      //}
      if (this.sortBy) {
        this.onSortChange.next({ sortBy: this.sortBy, sortOrder: this.sortOrder });
      }
      this.mustRecalculateData = true;
    }
    if (changes['inputData']) {
      this.inputData = changes['inputData'].currentValue || [];
      this.recalculatePage();
      this.mustRecalculateData = true;
    }
  }

  ngDoCheck(): any {
    let changes = this.diff.diff(this.inputData);
    if (changes) {
      this.recalculatePage();
      this.mustRecalculateData = true;
    }
    if (this.mustRecalculateData) {
      this.fillData();
      this.mustRecalculateData = false;
    }
  }

  private fillData(): void {
    this.activePage = this.activePage;
    this.rowsPerPage = this.rowsPerPage;

    let offset = (this.activePage - 1) * this.rowsPerPage;
    let data = this.inputData;
    let sortBy = this.sortBy;
    //if (typeof sortBy === 'string' || sortBy instanceof String) {
    //  data = _.orderBy(data, this.caseInsensitiveIteratee(<string>sortBy), [this.sortOrder]);
    //} else {
    //  data = _.orderBy(data, sortBy, [this.sortOrder]);
    //}
    if (sortBy) {
      data = data.sort((a: any, b: any) => {
        let x = isNaN(a[sortBy + '']) ? a[sortBy + ''].toLowerCase() : a[sortBy + ''];
        let y = isNaN(b[sortBy + '']) ? b[sortBy + ''].toLowerCase() : b[sortBy + ''];
        return (x > y) ? 1 : (y > x) ? -1 : 0;
      });
    }
    if (this.sortOrder === 'desc') { data.reverse(); }
    this.data = data.slice(offset, offset + this.rowsPerPage);
  }

  private caseInsensitiveIteratee(sortBy: string) {
    return (row: any): any => {
      let value = row;
      for (let sortByProperty of sortBy.split('.')) {
        value = value[sortByProperty];
      }
      if (value && typeof value === 'string' || value instanceof String) {
        return value.toLowerCase();
      }
      return value;
    };
  }
}

@Component({
  selector: '[md2SortBy]',
  templateUrl: 'sort.html',
  styleUrls: ['data-table.scss'],
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
  //exportAs: 'md2Pagination',
  encapsulation: ViewEncapsulation.None
})
export class Md2Pagination {

  private _activePage: number = 1;

  _onChange = (value: any) => { };
  _onTouched = () => { };

  //@Output() change: EventEmitter<Md2PaginationChange> = new EventEmitter<Md2PaginationChange>();

  @Input() rowsPerPageSet: any = [];
  @Input('md2Table') md2DataTable: Md2DataTable;

  //@Input()
  get activePage() { return this._activePage; }
  set activePage(value: number) {
    if (this._activePage !== value) {
      this._activePage = value;
    }
  }

  minRowsPerPage = 0;

  private mfTable: Md2DataTable;

  _rowsPerPage: number;
  _dataLength: number = 0;
  _lastPage: number;

  constructor( @Optional() private _dataTable: Md2DataTable) {
  }

  ngDoCheck() {//changes: any
    //if (changes.rowsPerPageSet) {
    //  this.minRowsPerPage = _.min(this.rowsPerPageSet)
    //}
    this.mfTable = this.md2DataTable || this._dataTable;
    this.onPageChangeSubscriber(this.mfTable.getPage());
    this.mfTable.onPageChange.subscribe(this.onPageChangeSubscriber);
  }

  _setPage(pageNumber: number): void {
    this.mfTable.setPage(pageNumber, this._rowsPerPage);
  }

  _setRows(event: any): void {
    event.stopPropagation();
    this.mfTable.setPage(this.activePage, event.target.value);
  }

  private onPageChangeSubscriber = (event: PageEvent) => {
    this.activePage = event.activePage;
    this._rowsPerPage = event.rowsPerPage;
    this._dataLength = event.dataLength;
    this._lastPage = Math.ceil(this._dataLength / this._rowsPerPage);
  };


  //_emitChangeEvent(): void {
  //  let event = new Md2PaginationChange();
  //  event.source = this;
  //  event.activePage = this._activePage;
  //  this._onChange(event.activePage);
  //  this.change.emit(event);
  //}

  //writeValue(value: number): void {
  //  if (this._activePage !== value) {
  //    this._activePage = value;
  //  }
  //}

  //registerOnChange(fn: (value: any) => void): void { this._onChange = fn; }

  //registerOnTouched(fn: () => {}): void { this._onTouched = fn; }

}

export const MD2_DATA_TABLE_DIRECTIVES: any[] = [
  Md2DataTable,
  Md2DataTableSortBy,
  Md2Pagination
];

@NgModule({
  imports: [CommonModule],
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
