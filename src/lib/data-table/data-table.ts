import {
  Component,
  Directive,
  Input,
  Output,
  EventEmitter,
  SimpleChange,
  OnChanges,
  Optional,
  DoCheck,
  NgModule,
  ModuleWithProviders,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';

export interface SortEvent {
  sortField: string | string[];
  sortOrder: string;
}

export interface PageEvent {
  activePage: number;
  pageLength: number;
  dataLength: number;
}

export interface DataEvent {
  length: number;
}

@Directive({
  selector: 'table[md2-data]',
  exportAs: 'Md2DataTable'
})
export class Md2DataTable implements OnChanges, DoCheck {

  private _dataLength = 0;
  private _activePage: number = 1;

  data: any[];
  onDataChange = new EventEmitter<DataEvent>();
  onSortChange = new EventEmitter<SortEvent>();
  onPageChange = new EventEmitter<PageEvent>();

  private sortField: string | string[] = '';
  private sortOrder = 'asc';
  private isDataChanged = false;

  @Input('md2-data') inputData: any[] = [];
  @Input('md2-page-length') pageLength = 1000;
  @Input()
  get activePage(): number { return this._activePage; }
  set activePage(value: number) {
    if (this._activePage !== value) {
      this._activePage = value;
      this.activePageChange.emit(value);
    }
  }

  @Output() activePageChange: EventEmitter<any> = new EventEmitter<any>();

  getSort(): SortEvent {
    return { sortField: this.sortField, sortOrder: this.sortOrder };
  }

  setSort(sortField: string | string[], sortOrder: string): void {
    if (this.sortField !== sortField || this.sortOrder !== sortOrder) {
      this.sortField = sortField;
      this.sortOrder = sortOrder;
      this.isDataChanged = true;
      this.onSortChange.emit({ sortField: sortField, sortOrder: sortOrder });
    }
  }

  getPage(): PageEvent {
    return {
      activePage: this.activePage,
      pageLength: this.pageLength,
      dataLength: this.inputData.length
    };
  }

  setPage(activePage: number, pageLength: number): void {
    if (this.pageLength !== pageLength || this.activePage !== activePage) {
      this.activePage = this.activePage !== activePage ?
        activePage : this.calculateNewActivePage(this.pageLength, pageLength);
      this.pageLength = pageLength;
      this.isDataChanged = true;
      this._emitPageChangeEvent();
    }
  }

  _emitPageChangeEvent(): void {
    this.onPageChange.emit({
      activePage: this.activePage,
      pageLength: this.pageLength,
      dataLength: this.inputData.length
    });
  }

  private calculateNewActivePage(previousPageLength: number,
    currentPageLength: number): number {
    let firstRowOnPage = (this.activePage - 1) * previousPageLength + 1;
    let newActivePage = Math.ceil(firstRowOnPage / currentPageLength);
    return newActivePage;
  }

  private recalculatePage() {
    let _lastPage = Math.ceil(this.inputData.length / this.pageLength);
    this.activePage = _lastPage < this.activePage ? _lastPage : this.activePage;
    this.activePage = this.activePage || 1;
  }

  ngOnChanges(changes: { [key: string]: SimpleChange }): any {
    if (changes['inputData']) {
      this.inputData = changes['inputData'].currentValue || [];
      if (this.inputData.length > 0) {
        this.recalculatePage();
        this._emitPageChangeEvent();
        this.isDataChanged = true;
      }
    }
  }

  ngDoCheck(): any {
    if (this._dataLength !== this.inputData.length) {
      this._dataLength = this.inputData.length;
      this.fillData();
      this.recalculatePage();
      this._emitPageChangeEvent();
      this.isDataChanged = true;
    }
    if (this.isDataChanged) {
      this.fillData();
      this.isDataChanged = false;
    }
  }

  private fillData(): void {
    this.activePage = this.activePage;
    this.pageLength = this.pageLength;

    let offset = (this.activePage - 1) * this.pageLength;
    let data = this.inputData;
    let sortField = this.sortField;
    if (sortField) {
      data = data.sort((a: any, b: any) => {
        let x = isNaN(a[sortField + '']) ? a[sortField + ''].toLowerCase() : a[sortField + ''];
        let y = isNaN(b[sortField + '']) ? b[sortField + ''].toLowerCase() : b[sortField + ''];
        return (x > y) ? 1 : (y > x) ? -1 : 0;
      });
    }
    if (this.sortOrder === 'desc') { data.reverse(); }
    this.data = data.slice(offset, offset + this.pageLength);
  }

}

@Component({
  selector: '[md2-sort-field]',
  template: `
    <span (click)="_sort()">
      <ng-content></ng-content>
      <svg *ngIf="_isAsc" width="24"height="24" viewBox="0 0 24 24">
        <path d="M7 14l5-5 5 5z"/>
      </svg>
      <svg *ngIf="_isDesc" width="24"height="24" viewBox="0 0 24 24">
        <path d="M7 10l5 5 5-5z"/>
      </svg>
      <svg *ngIf="!_isAsc && !_isDesc" width="24"height="24" viewBox="0 0 24 24">
        <path d="M7,10.5l5-5l5,5H7z"/>
        <path d="M7,12.5l5,5l5-5H7z"/>
      </svg>
    </span>
  `,
  styles: [`
    [md2-sort-field] span {
      position: relative;
      display: block;
      line-height: 24px;
      white-space: nowrap;
      cursor: pointer;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
    }
    [md2-sort-field] span svg {
      display: inline-block;
      vertical-align: middle;
      fill: currentColor;
    }
  `],
  encapsulation: ViewEncapsulation.None
})
export class Md2DataTableSortField {
  _isAsc: boolean = false;
  _isDesc: boolean = false;

  @Input('md2-sort-field') sortField: string;

  constructor(private _md2Table: Md2DataTable) {
    _md2Table.onSortChange.subscribe((event: SortEvent) => {
      this._isAsc = (event.sortField === this.sortField && event.sortOrder === 'asc');
      this._isDesc = (event.sortField === this.sortField && event.sortOrder === 'desc');
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

@Component({
  selector: 'md2-pagination',
  templateUrl: 'pagination.html',
  styleUrls: ['pagination.css'],
  encapsulation: ViewEncapsulation.None
})
export class Md2Pagination implements OnChanges {

  private _md2Table: Md2DataTable;
  _activePage: number;
  _rows: number;
  _lastPage: number;
  _dataLength: number = 0;

  @Output() change: EventEmitter<any> = new EventEmitter<any>();

  @Input('md2-rows') rows: any = [];
  @Input('md2-table') md2InputTable: Md2DataTable;

  constructor( @Optional() private _injectMd2Table: Md2DataTable) { }

  ngAfterViewInit() {
    this._md2Table = this.md2InputTable || this._injectMd2Table;
    this._onPageChange(this._md2Table.getPage());
    this._md2Table.onPageChange.subscribe(this._onPageChange);
  }

  ngOnChanges(changes: any): any {
    this._md2Table = this.md2InputTable || this._injectMd2Table;
    this._onPageChange(this._md2Table.getPage());
    this._md2Table.onPageChange.subscribe(this._onPageChange);
  }

  _setPage(page: number): void {
    this._md2Table.setPage(page, this._rows);
    this.change.emit(page);
  }

  _setRows(event: any): void {
    event.stopPropagation();
    this._md2Table.setPage(this._activePage, event.target.value);
    this.change.emit(this._activePage);
  }

  private _onPageChange = (event: PageEvent) => {
    this._activePage = event.activePage;
    this._rows = event.pageLength;
    this._dataLength = event.dataLength;
    this._lastPage = Math.ceil(this._dataLength / this._rows);
  }
}

export const MD2_DATA_TABLE_DIRECTIVES: any[] = [
  Md2DataTable,
  Md2DataTableSortField,
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
