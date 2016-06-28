import { AfterContentInit, Component, ContentChild, ContentChildren, Directive, EventEmitter, Input, Output, QueryList, TemplateRef, ViewEncapsulation } from "@angular/core";
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
      <div class="md2-tabs-header" role="tablist" tabindex="0" (keydown.arrowRight)="focusNextTab()" (keydown.arrowLeft)="focusPreviousTab()" (keydown.enter)="selectedIndex = focusIndex">
        <div class="md2-tab-label" role="tab" *ngFor="let tab of tabs; let i = index" [class.focus]="focusIndex === i" [class.active]="selectedIndex === i" [class.disabled]="tab.disabled" (click)="focusIndex = selectedIndex = i">
          <span [md2Transclude]="tab.labelTemplate">{{tab.label}}</span>
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
    .md2-tabs-header { position: relative; overflow: hidden; display: block; outline: none; }
    .md2-tab-label { position: relative; color: rgba(0,0,0,0.54); font-size: 14px; text-align: center; line-height: 24px; padding: 12px 24px; -moz-transition: background-color .35s cubic-bezier(.35,0,.25,1); -o-transition: background-color .35s cubic-bezier(.35,0,.25,1); -webkit-transition: background-color .35s cubic-bezier(.35,0,.25,1); transition: background-color .35s cubic-bezier(.35,0,.25,1); cursor: pointer; white-space: nowrap; text-transform: uppercase; float: left; font-weight: 500; -moz-box-sizing: border-box; -webkit-box-sizing: border-box; box-sizing: border-box; overflow: hidden; -ms-text-overflow: ellipsis; -o-text-overflow: ellipsis; text-overflow: ellipsis; }
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
    '[class.md2-tabs]': 'true'
  },
  directives: [Md2Transclude],
  encapsulation: ViewEncapsulation.None
})
export class Tabset implements AfterContentInit {

  @ContentChildren(Md2Tab) tabs: QueryList<Md2Tab>;

  private _isInitialized: boolean = false;
  private _focusIndex: number = 0;
  private _selectedIndex: number = 0;

  @Input('class') md2Class: string;

  @Input()
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
}

export const TABS_DIRECTIVES = [Tabset, Md2Tab, Md2TabLabel];