import {
  Component,
  Directive,
  Input,
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
  sortOrder: string
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

  public data: any[];
  public onDataChange = new EventEmitter<DataEvent>();
  public onSortChange = new EventEmitter<SortEvent>();
  public onPageChange = new EventEmitter<PageEvent>();

  private sortField: string | string[] = '';
  private sortOrder = 'asc';
  private isDataChanged = false;

  @Input('md2-data') inputData: any[] = [];
  @Input('md2-page-length') pageLength = 1000;
  @Input('md2-active-page') activePage = 1;

  public getSort(): SortEvent {
    return { sortField: this.sortField, sortOrder: this.sortOrder };
  }

  public setSort(sortField: string | string[], sortOrder: string): void {
    if (this.sortField !== sortField || this.sortOrder !== sortOrder) {
      this.sortField = sortField;
      this.sortOrder = sortOrder;
      this.isDataChanged = true;
      this.onSortChange.emit({ sortField: sortField, sortOrder: sortOrder });
    }
  }

  public getPage(): PageEvent {
    return { activePage: this.activePage, pageLength: this.pageLength, dataLength: this.inputData.length };
  }

  public setPage(activePage: number, pageLength: number): void {
    if (this.pageLength !== pageLength || this.activePage !== activePage) {
      this.activePage = this.activePage !== activePage ? activePage : this.calculateNewActivePage(this.pageLength, pageLength);
      this.pageLength = pageLength;
      this.isDataChanged = true;
      this.onPageChange.emit({
        activePage: this.activePage,
        pageLength: this.pageLength,
        dataLength: this.inputData.length
      });
    }
  }

  private calculateNewActivePage(previousPageLength: number, currentPageLength: number): number {
    let firstRowOnPage = (this.activePage - 1) * previousPageLength + 1;
    let newActivePage = Math.ceil(firstRowOnPage / currentPageLength);
    return newActivePage;
  }

  private recalculatePage() {
    let lastPage = Math.ceil(this.inputData.length / this.pageLength);
    this.activePage = lastPage < this.activePage ? lastPage : this.activePage;
    this.activePage = this.activePage || 1;
  }

  public ngOnChanges(changes: { [key: string]: SimpleChange }): any {
    if (changes['inputData']) {
      this.inputData = changes['inputData'].currentValue || [];
      this.recalculatePage();
      this.onPageChange.emit({
        activePage: this.activePage,
        pageLength: this.pageLength,
        dataLength: this.inputData.length
      });
      this.isDataChanged = true;
    }
  }

  public ngDoCheck(): any {
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
    //if (typeof sortField === 'string' || sortField instanceof String) {
    //  //data = _.orderBy(data, this.caseInsensitiveIteratee(<string>sortField), [this.sortOrder]);
    //} else {
    //  //data = _.orderBy(data, sortField, [this.sortOrder]);
    //}
    //if (sortField) {
    //  data = data.sort((a, b) => {
    //    return (a[sortField + ''].toLowerCase() > b[sortField + ''].toLowerCase()) ? 1 : ((b[sortField + ''].toLowerCase() > a[sortField + ''].toLowerCase()) ? -1 : 0) * (this.sortOrder == 'desc' ? -1 : 1);
    //  });
    //}
    this.data = data.slice(offset, offset + this.pageLength);
  }

  private caseInsensitiveIteratee(sortField: string) {
    return (row: any): any => {
      let value = row[sortField];
      if (value && typeof value === 'string' || value instanceof String) {
        return value.toLowerCase();
      }
      return value;
    };
  }
}

@Component({
  selector: "[md2-sort-field]",
  template: `
    <span (click)="_sort()">
      <ng-content></ng-content>
      <svg *ngIf="isAsc" width="24"height="24" viewBox="0 0 24 24">
        <path d="M7 14l5-5 5 5z"/>
      </svg>
      <svg *ngIf="!isAsc" width="24"height="24" viewBox="0 0 24 24">
        <path d="M7 10l5 5 5-5z"/>
      </svg>
    </span>
  `,
  styles: [`
    [md2-sort-field] span { position: relative; display: block; line-height: 24px; cursor: pointer; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; }
    [md2-sort-field] span svg { display: inline-block; vertical-align: middle; }
  `],
  encapsulation: ViewEncapsulation.None
})
export class Md2DataTableSortField {
  private isAsc: boolean = false;

  @Input('md2-sort-field') private sortField: string;

  public constructor(private _md2Table: Md2DataTable) {
    _md2Table.onSortChange.subscribe((event: SortEvent) => {
      this.isAsc = (event.sortField === this.sortField && event.sortOrder === "asc") ? true : false;
    })
  }

  private _sort() {
    if (this.isAsc) {
      this._md2Table.setSort(this.sortField, "desc");
    } else {
      this._md2Table.setSort(this.sortField, "asc");
    }
  }
}

@Component({
  selector: 'md2-pagination',
  template: `
    <ul class="md2-pagination" *ngIf="dataLength > rowsOnPage">
      <li [class.disabled]="activePage <= 1" (click)="_setPage(1)">
        <svg width="24" height="24" viewBox="0 0 24 24">
          <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
        </svg>
      </li>
      <li *ngIf="activePage > 4 && activePage + 1 > lastPage" (click)="_setPage(activePage - 4)">{{activePage-4}}</li>
      <li *ngIf="activePage > 3 && activePage + 2 > lastPage" (click)="_setPage(activePage - 3)">{{activePage-3}}</li>
      <li *ngIf="activePage > 2" (click)="_setPage(activePage - 2)">{{activePage-2}}</li>
      <li *ngIf="activePage > 1" (click)="_setPage(activePage - 1)">{{activePage-1}}</li>
      <li class="active">{{activePage}}</li>
      <li *ngIf="activePage + 1 <= lastPage" (click)="_setPage(activePage + 1)">{{activePage+1}}</li>
      <li *ngIf="activePage + 2 <= lastPage" (click)="_setPage(activePage + 2)">{{activePage+2}}</li>
      <li *ngIf="activePage + 3 <= lastPage && activePage < 3" (click)="_setPage(activePage + 3)">{{activePage+3}}</li>
      <li *ngIf="activePage + 4 <= lastPage && activePage < 2" (click)="_setPage(activePage + 4)">{{activePage+4}}</li>
      <li [class.disabled]="activePage >= lastPage" (click)="_setPage(lastPage)">
        <svg width="24" height="24" viewBox="0 0 24 24">
          <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
        </svg>
      </li>
    </ul>
    <ul class="md2-pagination pull-right" *ngIf="dataLength > _minRows">
      <li *ngFor="let row of rows" [class.active]="rowsOnPage===row" (click)="_setRows(row)">{{row}}</li>
    </ul>
  `,
  styles: [`
    md2-pagination { display: block; color: #0e59a5; }
    md2-pagination .md2-pagination { display: inline-block; margin: .5rem 0; padding: 0; }
    md2-pagination .md2-pagination li { position: relative; display: inline-block; width: 36px; vertical-align: top; text-align: center; line-height: 36px; border-radius: 100px; cursor: pointer; box-sizing: border-box; }
    md2-pagination .md2-pagination li:hover { background: rgba(0,0,0,0.12); }
    md2-pagination .md2-pagination li.disabled,
    md2-pagination .md2-pagination li.disabled:hover { pointer-events: none; background: transparent; cursor: default; opacity: .5; }
    md2-pagination .md2-pagination li.active,
    md2-pagination .md2-pagination li.active:hover { background: #106CC8; color: #fff; cursor: default; }
    md2-pagination .md2-pagination li svg { fill: currentColor; margin-bottom: -7px; }
  `],
  encapsulation: ViewEncapsulation.None
})
export class Md2Pagination implements OnChanges {

  private md2Table: Md2DataTable;
  private _minRows = 0;
  private activePage: number;
  private rowsOnPage: number;
  private dataLength: number = 0;
  private lastPage: number;

  @Input('md2-rows') rows: any = [];
  @Input('md2-table') md2InputTable: Md2DataTable;

  constructor( @Optional() private injectMd2Table: Md2DataTable) { }

  ngOnChanges(changes: any): any {//{ [key: string]: SimpleChange }
    if (changes.rows) {
      //this._minRows = _.min(this.rows)
    }
    this.md2Table = this.md2InputTable || this.injectMd2Table;
    this._onPageChange(this.md2Table.getPage());
    this.md2Table.onPageChange.subscribe(this._onPageChange);
  }

  private _setPage(page: number): void {
    this.md2Table.setPage(page, this.rowsOnPage);
  }

  private _setRows(rows: number): void {
    this.md2Table.setPage(this.activePage, rows);
  }

  private _onPageChange(event: PageEvent) {
    this.activePage = event.activePage;
    this.rowsOnPage = event.pageLength;
    this.dataLength = event.dataLength;
    this.lastPage = Math.ceil(this.dataLength / this.rowsOnPage);
  }
}

export const MD2_DATA_TABLE_DIRECTIVES: any[] = [Md2DataTable, Md2DataTableSortField, Md2Pagination];

@NgModule({
  imports: [CommonModule],
  exports: MD2_DATA_TABLE_DIRECTIVES,
  declarations: MD2_DATA_TABLE_DIRECTIVES,
})
export class Md2DataTableModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: Md2DataTableModule,
      providers: []
    };
  }
}
