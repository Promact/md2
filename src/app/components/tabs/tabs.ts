import {Component} from '@angular/core';
import {TABS_DIRECTIVES} from '../../../components/tabs/tabs';

@Component({
  selector: 'tabs',
  templateUrl: './app/components/tabs/tabs.html',
  directives: [TABS_DIRECTIVES]
})
export class Tabs {
  private tabs: Array<any> = [
    { title: 'Dynamic Title 1', content: 'Dynamic content 1' },
    { title: 'Dynamic Title 2', content: 'Dynamic content 2', disabled: true },
    { title: 'Dynamic Title 3', content: 'Dynamic content 3' }
  ];

  private change(tab: Event) {
    console.log('Tab Changed');
  };
}
