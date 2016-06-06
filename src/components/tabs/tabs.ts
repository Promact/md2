import {Component, ElementRef, Input, Output, EventEmitter, Query, QueryList, ViewEncapsulation} from '@angular/core';
import {Md2Tab} from './tab';

@Component({
  selector: 'md2-tabs',
  template: `
    <ul class="md2-tabs-wrapper">
      <li *ngFor="let tab of tabs" [class]="tab.headerClass" [class]="'md2-tab-item'" [class.active]="tab.active" [class.disabled]="tab.disabled" (click)="open($event,tab)">
        <span>{{tab.header}}</span>
      </li>
    </ul>
    <div class="md2-tabs-content-wrapper">
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    .md2-tabs { border: 1px solid #e1e1e1; display: block; margin: 0; border-radius: 2px; overflow: hidden; position: relative; }
    .md2-tabs-wrapper { position: relative; background: white; border-width: 0 0 1px; border-style: solid; border-color: rgba(0,0,0,0.12); display: block; margin: 0; padding: 0; list-style: none; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; }
    .md2-tabs-wrapper:after { content: ''; display: table; clear: both; }
    .md2-tab-item { position: relative; color: rgba(0,0,0,0.54); font-size: 14px; text-align: center; line-height: 24px; padding: 12px 24px; -moz-transition: background-color .35s cubic-bezier(.35,0,.25,1); -o-transition: background-color .35s cubic-bezier(.35,0,.25,1); -webkit-transition: background-color .35s cubic-bezier(.35,0,.25,1); transition: background-color .35s cubic-bezier(.35,0,.25,1); cursor: pointer; white-space: nowrap; text-transform: uppercase; float: left; font-weight: 500; -moz-box-sizing: border-box; -webkit-box-sizing: border-box; box-sizing: border-box; overflow: hidden; -ms-text-overflow: ellipsis; -o-text-overflow: ellipsis; text-overflow: ellipsis; }
    .md2-tab-item.active { color: rgb(16,108,200); }
    .md2-tab-item:after { background-color: rgb(255,82,82); bottom: 0; content: ''; height: 2px; left: 45%; position: absolute; transition: .2s cubic-bezier(.4,0,.2,1); visibility: hidden; width: 10px; }
    .md2-tab-item.active:after { left: 0; visibility: visible; width: 100%; }
    .md2-tab-item.disabled { color: rgba(0,0,0,0.26); pointer-events: none; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; -webkit-user-drag: none; opacity: 0.5; cursor: default; }
    .md2-tabs-content-wrapper { position: relative; min-height: 0; display: block; clear: both; }
    .md2-tab-content { padding: 16px; display: block; position: relative; }
  `],
  host: {
    '[class]': 'mdClass',
    '[class.md2-tabs]': 'true'
  },
  encapsulation: ViewEncapsulation.None
})
export class Md2Tabs {

  @Input('md-class') mdClass: string;

  @Output() change: EventEmitter<any> = new EventEmitter<any>();

  initialized: boolean;

  tabs: Md2Tab[];

  constructor(private el: ElementRef, @Query(Md2Tab) tabs: QueryList<Md2Tab>) {
    tabs.changes.subscribe(_ => {
      this.tabs = tabs.toArray();
      let activeTab: Md2Tab = this.findActiveTab();
      if (!activeTab && this.tabs.length) {
        this.tabs[0].active = true;
      }
    });
  }

  open(event: Event, tab: Md2Tab) {
    if (tab.disabled) {
      event.preventDefault();
      return;
    }

    if (!tab.active) {
      let activeTab: Md2Tab = this.findActiveTab();
      if (activeTab) {
        activeTab.active = false
      }
      tab.active = true;
      this.change.emit({ originalEvent: event, index: this.findTabIndex(tab) });
    }
    event.preventDefault();
  }

  findActiveTab() {
    for (let i = 0; i < this.tabs.length; i++) {
      if (this.tabs[i].active) {
        return this.tabs[i];
      }
    }
    return null;
  }

  findTabIndex(tab: Md2Tab) {
    let index = -1;
    for (let i = 0; i < this.tabs.length; i++) {
      if (this.tabs[i] == tab) {
        index = i;
        break;
      }
    }
    return index;
  }
}

export const TABS_DIRECTIVES: Array<any> = [Md2Tabs, Md2Tab];