import {
  AfterContentInit,
  Component,
  ContentChildren,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  QueryList,
  TemplateRef,
  ViewContainerRef,
  ViewEncapsulation,
  NgModule,
  ModuleWithProviders
} from '@angular/core';
import { CommonModule } from '@angular/common';

export class Md2TabChangeEvent {
  index: number;
  tab: Md2Tab;
}

@Directive({ selector: '[md2Transclude]' })
export class Md2Transclude {

  private _md2Transclude: TemplateRef<any>;

  constructor(public viewRef: ViewContainerRef) { }

  @Input()
  get md2Transclude() { return this._md2Transclude; }
  set md2Transclude(templateRef: TemplateRef<any>) {
    this._md2Transclude = templateRef;
    if (templateRef) {
      this.viewRef.createEmbeddedView(templateRef);
    }
  }

}

@Component({
  moduleId: module.id,
  selector: 'md2-tab',
  template: `<ng-content></ng-content>`,
  host: {
    '[class]': 'class',
    '[class.active]': 'active'
  }
})
export class Md2Tab {

  @Input() label: string;

  @Input() active: boolean;

  @Input() disabled: boolean;

  @Input() class: string;

  labelRef: TemplateRef<any>;

}

@Directive({ selector: '[md2-tab-label]' })
export class Md2TabLabel {
  constructor(public templateRef: TemplateRef<any>, tab: Md2Tab) {
    tab.labelRef = templateRef;
  }
}

@Component({
  moduleId: module.id,
  selector: 'md2-tabs',
  template: `
    <div class="md2-tabs-header-wrapper">
      <div role="button" class="md2-prev-button" [class.disabled]="!canPageBack()" *ngIf="_shouldPaginate" (click)="previousPage()">
        <em class="prev-icon">Prev</em>
      </div>
      <div role="button" class="md2-next-button" [class.disabled]="!canPageForward()" *ngIf="_shouldPaginate" (click)="nextPage()">
        <em class="next-icon">Next</em>
      </div>
      <div class="md2-tabs-canvas" [class.md2-paginated]="_shouldPaginate" role="tablist" tabindex="0" (keydown.arrowRight)="focusNextTab()" (keydown.arrowLeft)="focusPreviousTab()" (keydown.enter)="selectedIndex = focusIndex" (mousewheel)="scroll($event)">
        <div class="md2-tabs-header" [style.marginLeft]="-offsetLeft + 'px'">
          <div class="md2-tab-label" role="tab" *ngFor="let tab of tabs; let i = index" [class.focus]="focusIndex === i" [class.active]="selectedIndex === i" [class.disabled]="tab.disabled" (click)="focusIndex = selectedIndex = i">
            <span [md2Transclude]="tab.labelRef">{{tab.label}}</span>
          </div>
          <div class="md2-tab-ink-bar" [style.left]="inkBarLeft" [style.width]="inkBarWidth"></div>
        </div>
      </div>
    </div>
    <div class="md2-tabs-body-wrapper">
      <ng-content></ng-content>
    </div>
  `,
  styleUrls: ['tabs.css'],
  host: {
    '[class]': 'class',
    '(window:resize)': 'onWindowResize($event)'
  },
  encapsulation: ViewEncapsulation.None
})
export class Md2Tabs implements AfterContentInit {

  @ContentChildren(Md2Tab) tabs: QueryList<Md2Tab>;

  private _isInitialized: boolean = false;
  private _focusIndex: number = 0;
  private _selectedIndex: number = 0;
  _shouldPaginate: boolean = false;
  private offsetLeft: number = 0;
  private inkBarLeft: string = '0';
  private inkBarWidth: string = '0';

  @Input() class: string;

  @Input()
  set selectedIndex(value: any) {
    if (typeof value === 'string') { value = parseInt(value); }
    if (value != this._selectedIndex) {
      this._selectedIndex = value;
      this.adjustOffset(value);
      this._updateInkBar();
      if (this.tabs) {
        const tabs = this.tabs.toArray();
        if (!tabs[value].disabled) {
          tabs.forEach(tab => tab.active = false);
          tabs[value].active = true;
        }
      }
      if (this._isInitialized) {
        this.change.emit(this._createChangeEvent(value));
      }
    }
  }
  get selectedIndex() { return this._selectedIndex; }

  get focusIndex(): number { return this._focusIndex; }
  set focusIndex(value: number) {
    this._focusIndex = value;
    this.adjustOffset(value);
  }

  get element() {
    const elements: any = { root: this.elementRef.nativeElement, wrapper: null, canvas: null, paging: null, tabs: null };
    elements.wrapper = elements.root.querySelector('.md2-tabs-header-wrapper');
    elements.canvas = elements.wrapper.querySelector('.md2-tabs-canvas');
    elements.paging = elements.canvas.querySelector('.md2-tabs-header');
    elements.tabs = elements.paging.querySelectorAll('.md2-tab-label');
    return elements;
  }

  @Output() change: EventEmitter<Md2TabChangeEvent> = new EventEmitter<Md2TabChangeEvent>();

  constructor(private elementRef: ElementRef) { }

  /**
   * After Content Init
   */
  ngAfterContentInit() {
    setTimeout(() => {
      this.updatePagination();
    }, 0);
    setTimeout(() => {
      const tabs = this.tabs.toArray();
      if (this.selectedIndex) {
        tabs.forEach(tab => tab.active = false);
        tabs[this.selectedIndex].active = true;
        this.adjustOffset(this.selectedIndex);
      } else {
        let index = tabs.findIndex((t: any) => t.active);
        if (index < 0) {
          tabs[0].active = true;
        } else {
          this.selectedIndex = index;
        }
      }
      this._updateInkBar();
    }, 0);
    this._isInitialized = true;
  }

  /**
   * Calculates the styles from the selected tab for the ink-bar.
   */
  private _updateInkBar(): void {
    let elements = this.element;
    if (!elements.tabs[this.selectedIndex]) { return; }
    let tab = elements.tabs[this.selectedIndex];
    this.inkBarLeft = tab.offsetLeft + 'px';
    this.inkBarWidth = tab.offsetWidth + 'px';
  }

  /**
   * Create Change Event
   * @param index
   * @return event of Md2TabChangeEvent
   */
  private _createChangeEvent(index: number): Md2TabChangeEvent {
    const event = new Md2TabChangeEvent;
    event.index = index;
    if (this.tabs && this.tabs.length) {
      event.tab = this.tabs.toArray()[index];
    }
    return event;
  }

  /**
   * Focus next Tab
   */
  focusNextTab() { this.incrementIndex(1); }

  /**
   * Focus previous Tab
   */
  focusPreviousTab() { this.incrementIndex(-1); }

  /**
   * Mouse Wheel scroll
   * @param event
   */
  scroll(event: any) {
    if (!this._shouldPaginate) { return; }
    event.preventDefault();
    this.offsetLeft = this.fixOffset(this.offsetLeft - event.wheelDelta);
  }

  /**
   * Next Page
   */
  nextPage() {
    let elements = this.element;
    let viewportWidth = elements.canvas.clientWidth,
      totalWidth = viewportWidth + this.offsetLeft,
      i: number, tab: any;
    for (i = 0; i < elements.tabs.length; i++) {
      tab = elements.tabs[i];
      if (tab.offsetLeft + tab.offsetWidth > totalWidth) { break; }
    }
    this.offsetLeft = this.fixOffset(tab.offsetLeft);
  }

  /**
   * Previous Page
   */
  previousPage() {
    let i: number, tab: any, elements = this.element;

    for (i = 0; i < elements.tabs.length; i++) {
      tab = elements.tabs[i];
      if (tab.offsetLeft + tab.offsetWidth >= this.offsetLeft) { break; }
    }
    this.offsetLeft = this.fixOffset(tab.offsetLeft + tab.offsetWidth - elements.canvas.clientWidth);
  }

  /**
   * On Window Resize
   * @param event
   */
  onWindowResize(event: Event) {
    this.offsetLeft = this.fixOffset(this.offsetLeft);
    this.updatePagination();
  }

  /**
   * Can page Back
   */
  canPageBack() { return this.offsetLeft > 0; }

  /**
   * Can page Previous
   */
  canPageForward() {
    let elements = this.element;
    let lastTab = elements.tabs[elements.tabs.length - 1];
    return lastTab && lastTab.offsetLeft + lastTab.offsetWidth > elements.canvas.clientWidth +
      this.offsetLeft;
  }

  /**
   * Update Pagination
   */
  updatePagination() {
    let canvasWidth = this.element.root.clientWidth;
    this.element.tabs.forEach((tab: any) => {
      canvasWidth -= tab.offsetWidth;
    });
    this._shouldPaginate = canvasWidth < 0;
  }

  /**
   * Increment Focus Tab
   * @param inc
   */
  incrementIndex(inc: any) {
    let newIndex: number,
      index = this.focusIndex;
    for (newIndex = index + inc;
      this.tabs.toArray()[newIndex] && this.tabs.toArray()[newIndex].disabled;
      newIndex += inc) { }
    if (this.tabs.toArray()[newIndex]) {
      this.focusIndex = newIndex;
    }
  }

  /**
   * Adjust Offset of Tab
   * @param index
   */
  adjustOffset(index: number) {
    let elements = this.element;
    if (!elements.tabs[index]) { return; }
    let tab = elements.tabs[index],
      left = tab.offsetLeft,
      right = tab.offsetWidth + left;
    this.offsetLeft = Math.max(this.offsetLeft, this.fixOffset(right - elements.canvas.clientWidth + 32 * 2));
    this.offsetLeft = Math.min(this.offsetLeft, this.fixOffset(left));
  }

  /**
   * Fix Offset of Tab
   * @param value
   * @return value
   */
  fixOffset(value: any) {
    let elements = this.element;
    if (!elements.tabs.length || !this._shouldPaginate) { return 0; }
    let lastTab = elements.tabs[elements.tabs.length - 1],
      totalWidth = lastTab.offsetLeft + lastTab.offsetWidth;
    value = Math.max(0, value);
    value = Math.min(totalWidth - elements.canvas.clientWidth, value);
    return value;
  }

}

export const MD2_TABS_DIRECTIVES: any[] = [Md2TabLabel, Md2Tabs, Md2Tab];

@NgModule({
  imports: [CommonModule],
  exports: MD2_TABS_DIRECTIVES,
  declarations: [Md2Transclude, Md2TabLabel, Md2Tabs, Md2Tab],
})
export class Md2TabsModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: Md2TabsModule,
      providers: []
    };
  }
}
