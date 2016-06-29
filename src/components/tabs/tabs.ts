import { AfterContentInit, Component, ContentChild, ContentChildren, Directive, ElementRef, EventEmitter, Input, Output, QueryList, TemplateRef, ViewEncapsulation } from "@angular/core";
import { Md2Transclude } from "./transclude";

export class Md2TabChangeEvent {
  index: number;
  tab: Md2Tab;
}

@Directive({ selector: "[md2-tab-label]" })
export class Md2TabLabel {
  constructor(public templateRef: TemplateRef<any>) { }
}

@Component({
  selector: "md2-tab",
  template: `<ng-content></ng-content>`,
  host: {
    '[ngClass]': 'md2Class',
    '[class.md2-tab]': 'true',
    '[class.active]': 'active'
  }
})
export class Md2Tab {

  @ContentChild(Md2TabLabel) tabLabel: Md2TabLabel;

  @Input() label: string;

  @Input() active: boolean;

  @Input() disabled: boolean;

  @Input('class') md2Class: string;

  get labelTemplate(): TemplateRef<any> {
    return this.tabLabel ? this.tabLabel.templateRef : null;
  }

}

@Component({
  selector: "md2-tabs",
  template: `
    <div class="md2-tabs-header-wrapper">
      <div role="button" class="md2-prev-button" [class.disabled]="!canPageBack()" *ngIf="shouldPaginate" (click)="previousPage()">
        <em class="prev-icon">Prev</em>
      </div>
      <div role="button" class="md2-next-button" [class.disabled]="!canPageForward()" *ngIf="shouldPaginate" (click)="nextPage()">
        <em class="next-icon">Next</em>
      </div>
      <div class="md2-tabs-canvas" [class.md2-paginated]="shouldPaginate" role="tablist" tabindex="0" (keydown.arrowRight)="focusNextTab()" (keydown.arrowLeft)="focusPreviousTab()" (keydown.enter)="selectedIndex = focusIndex">
        <div class="md2-tabs-header" [style.marginLeft]="-offsetLeft"><!-- [style.width]="tabsWidth+'px'"-->
          <div class="md2-tab-label" role="tab" *ngFor="let tab of tabs; let i = index" [class.focus]="focusIndex === i" [class.active]="selectedIndex === i" [class.disabled]="tab.disabled" (click)="focusIndex = selectedIndex = i">
            <span [md2Transclude]="tab.labelTemplate">{{tab.label}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="md2-tabs-body-wrapper">
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    .md2-tabs { position: relative; overflow: hidden; display: block; margin: 0; border: 1px solid #e1e1e1; border-radius: 2px; }
    .md2-tabs-header-wrapper { position: relative; display: block; background: white; border-width: 0 0 1px; border-style: solid; border-color: rgba(0,0,0,0.12); display: block; margin: 0; padding: 0; list-style: none; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; }
    .md2-tabs-header-wrapper:after { content: ''; display: table; clear: both; }
    .md2-prev-button,
    .md2-next-button { position: absolute; top: 0; height: 100%; width: 32px; padding: 8px 0; z-index: 2; cursor: pointer; }
    .md2-prev-button { left: 0; }
    .md2-next-button { right: 0; }
    .md2-prev-button.disabled,
    .md2-next-button.disabled { opacity: .25; cursor: default; }
    .md2-prev-button .prev-icon,
    .md2-next-button .next-icon { display: block; width: 12px; height: 12px; font-size: 0; border-width: 0 0 2px 2px; border-style: solid; border-color: #757575; border-radius: 1px; transform: rotate(45deg); margin: 10px; }
    .md2-next-button .next-icon { border-width: 2px 2px 0 0; }
    .md2-tabs-canvas { position: relative; overflow: hidden; display: block; outline: none; }
    .md2-tabs-canvas.md2-paginated { margin: 0 32px; }
    .md2-tabs-header { position: relative; display: inline-block; white-space: nowrap; -moz-transition: 0.5s cubic-bezier(0.35,0,0.25,1); -o-transition: 0.5s cubic-bezier(0.35,0,0.25,1); -webkit-transition: 0.5s cubic-bezier(0.35,0,0.25,1); transition: 0.5s cubic-bezier(0.35,0,0.25,1); }
    .md2-tab-label { position: relative; color: rgba(0,0,0,0.54); font-size: 14px; text-align: center; line-height: 24px; padding: 12px 24px; -moz-transition: background-color .35s cubic-bezier(.35,0,.25,1); -o-transition: background-color .35s cubic-bezier(.35,0,.25,1); -webkit-transition: background-color .35s cubic-bezier(.35,0,.25,1); transition: background-color .35s cubic-bezier(.35,0,.25,1); cursor: pointer; white-space: nowrap; text-transform: uppercase; display: inline-block; font-weight: 500; -moz-box-sizing: border-box; -webkit-box-sizing: border-box; box-sizing: border-box; overflow: hidden; -ms-text-overflow: ellipsis; -o-text-overflow: ellipsis; text-overflow: ellipsis; }
    .md2-tab-label.active { color: rgb(16,108,200); }
    .md2-tab-label:after { background-color: rgb(255,82,82); bottom: 0; content: ''; height: 2px; left: 45%; position: absolute; transition: .2s cubic-bezier(.4,0,.2,1); visibility: hidden; width: 10px; }
    .md2-tab-label.active:after { left: 0; visibility: visible; width: 100%; }
    .md2-tab-label.disabled { color: rgba(0,0,0,0.26); pointer-events: none; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; -webkit-user-drag: none; opacity: 0.5; cursor: default; }
    .md2-tabs-body-wrapper { position: relative; min-height: 0; display: block; clear: both; }
    .md2-tab { padding: 16px; display: none; position: relative; }
    .md2-tab.active { display: block; position: relative; }
  `],
  host: {
    '[ngClass]': 'md2Class',
    '[class.md2-tabs]': 'true',
    '(window:resize)': 'onWindowResize($event)'
  },
  directives: [Md2Transclude],
  encapsulation: ViewEncapsulation.None
})
export class Md2Tabs implements AfterContentInit {

  @ContentChildren(Md2Tab) tabs: QueryList<Md2Tab>;

  private _isInitialized: boolean = false;
  private _focusIndex: number = 0;
  private _selectedIndex: number = 0;
  private shouldPaginate: boolean = false;
  private offsetLeft: number = 0;
  private tabsWidth: number = 0;

  @Input('class') md2Class: string;

  @Input('selected')
  set selectedIndex(value: number) {
    if (value != this._selectedIndex) {
      this._selectedIndex = value;
      const tabs = this.tabs.toArray();
      if (!tabs[value].disabled) {
        tabs.forEach(tab => tab.active = false);
        tabs[value].active = true;
      }
      if (this._isInitialized) {
        this.change.emit(this._createChangeEvent(value));
      }
    }
  }
  get selectedIndex(): number {
    return this._selectedIndex;
  }

  get focusIndex(): number { return this._focusIndex; }
  set focusIndex(value: number) {
    this._focusIndex = value;
  }

  @Output() change: EventEmitter<Md2TabChangeEvent> = new EventEmitter<Md2TabChangeEvent>();

  constructor(public element: ElementRef) { }

  ngAfterContentInit() {
    const tabs = this.tabs.toArray();
    const activeTab = tabs.find(tab => tab.active === true);
    if (!activeTab && tabs.length > 0) {
      tabs[0].active = true;
    } else if (tabs.length > 0) {

    }


    //let index = this.tabs.toArray().map(t => t.active).indexOf("true");
    //this.selectedIndex = index < 0 ? 0 : index;
    //this.tabs.toArray()[this.selectedIndex].active = true;
    setTimeout(() => {
      this.init();
    }, 1000);
    this._isInitialized = true;
  }

  private _createChangeEvent(index: number): Md2TabChangeEvent {
    const event = new Md2TabChangeEvent;
    event.index = index;
    if (this.tabs && this.tabs.length) {
      event.tab = this.tabs.toArray()[index];
    }
    return event;
  }

  focusNextTab() {
    if (this.tabs && this.focusIndex < this.tabs.length - 1) {
      this.focusIndex++;
      //if (this.tabs.toArray()[this.focusIndex].disabled && this.focusIndex < this.tabs.length - 1) { this.focusIndex++; }
      //else if (this.tabs.toArray()[this.focusIndex].disabled) { this.focusIndex--; }
    }
  }

  focusPreviousTab() {
    if (this.focusIndex > 0) {
      this.focusIndex--;
    }
  }
  //===============================================================================================================

  init() {
    this.adjustOffset(null);
    this.updatePagination();
  }

  //bindEvents() {
  //  angular.element($window).on('resize', handleWindowResize);
  //}

  //cleanup() {
  //  destroyed = true;
  //  angular.element($window).off('resize', handleWindowResize);
  //}


  /**
   * Queues up a call to `handleWindowResize` when a resize occurs while the tabs component is
   * hidden.
   */
  //handleResizeWhenVisible() {
  //  // if there is already a watcher waiting for resize, do nothing
  //  if (handleResizeWhenVisible.watcher) return;
  //  // otherwise, we will abuse the $watch to check for visible
  //  handleResizeWhenVisible.watcher = $scope.$watch(() => {
  //    // since we are checking for DOM size, we use $mdUtil.nextTick() to wait for after the DOM updates
  //    $mdUtil.nextTick(() => {
  //      // if the watcher has already run (ie. multiple digests in one cycle), do nothing
  //      if (!handleResizeWhenVisible.watcher) return;

  //      if ($element.prop('offsetParent')) {
  //        handleResizeWhenVisible.watcher();
  //        handleResizeWhenVisible.watcher = null;

  //        handleWindowResize();
  //      }
  //    }, false);
  //  });
  //}

  //scroll(event) {
  //  if (!this.shouldPaginate) return;
  //  event.preventDefault();
  //  this.offsetLeft = this.fixOffset(this.offsetLeft - event.wheelDelta);
  //}

  nextPage() {
    var elements = this.getElements();
    var viewportWidth = elements.canvas.clientWidth,
      totalWidth = viewportWidth + this.offsetLeft,
      i, tab;
    for (i = 0; i < elements.tabs.length; i++) {
      tab = elements.tabs[i];
      if (tab.offsetLeft + tab.offsetWidth > totalWidth) break;
    }
    this.offsetLeft = this.fixOffset(tab.offsetLeft);
  }

  previousPage() {
    var i, tab, elements = this.getElements();

    for (i = 0; i < elements.tabs.length; i++) {
      tab = elements.tabs[i];
      if (tab.offsetLeft + tab.offsetWidth >= this.offsetLeft) break;
    }
    this.offsetLeft = this.fixOffset(tab.offsetLeft + tab.offsetWidth - elements.canvas.clientWidth);
  }

  onWindowResize(event: Event) {
    this.offsetLeft = this.fixOffset(this.offsetLeft);
    this.updatePagination();
  }

  getElements() {
    var elements = {};
    var node = this.element.nativeElement;

    // gather tab bar elements
    elements.wrapper = node.querySelector('.md2-tabs-header-wrapper');
    elements.canvas = elements.wrapper.querySelector('.md2-tabs-canvas');
    elements.paging = elements.canvas.querySelector('.md2-tabs-header');

    elements.contents = node.querySelectorAll('md2-tabs-body-wrapper');
    elements.tabs = elements.paging.querySelectorAll('.md2-tab-label');

    return elements;
  }

  canPageBack() {
    return this.offsetLeft > 0;
  }

  canPageForward() {
    var elements = this.getElements();
    var lastTab = elements.tabs[elements.tabs.length - 1];
    return lastTab && lastTab.offsetLeft + lastTab.offsetWidth > elements.canvas.clientWidth +
      this.offsetLeft;
  }

  //shouldStretchTabs() {
  //  return !this.shouldPaginate
  //    && $window.matchMedia('(max-width: 600px)').matches;
  //}

  isPaginate() {
    var canvasWidth = this.element.nativeElement.clientWidth;
    this.getElements().tabs.forEach((tab) => {
      canvasWidth -= tab.offsetWidth;
    });
    return canvasWidth < 0;
  }

  updatePagination() {
    //var elements = this.getElements();
    //if (this.shouldStretchTabs()) {
    //  this.tabsWidth = 0;
    //} else {
    //  this.tabsWidth = this.calcPagingWidth();
    //}
    this.shouldPaginate = this.isPaginate();
  }

  calcPagingWidth() {
    var width = 0;

    this.getElements().tabs.forEach((tab) => {
      width += Math.max(tab.offsetWidth, tab.getBoundingClientRect().width);
    });

    return Math.ceil(width);
  }

  adjustOffset(index) {
    var elements = this.getElements();
    if (index == null) index = this.focusIndex;
    if (!elements.tabs[index]) return;
    var tab = elements.tabs[index],
      left = tab.offsetLeft,
      right = tab.offsetWidth + left;
    this.offsetLeft = Math.max(this.offsetLeft, this.fixOffset(right - elements.canvas.clientWidth + 32 * 2));
    this.offsetLeft = Math.min(this.offsetLeft, this.fixOffset(left));
  }

  fixOffset(value) {
    var elements = this.getElements();
    if (!elements.tabs.length || !this.shouldPaginate) return 0;
    var lastTab = elements.tabs[elements.tabs.length - 1],
      totalWidth = lastTab.offsetLeft + lastTab.offsetWidth;
    value = Math.max(0, value);
    value = Math.min(totalWidth - elements.canvas.clientWidth, value);
    return value;
  }

}

export const TABS_DIRECTIVES = [Md2Tabs, Md2Tab, Md2TabLabel];