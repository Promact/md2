import { Component } from '@angular/core';

@Component({
  selector: 'tabs-demo',
  templateUrl: '../tabs/tabs-demo.html'
})
export class TabsDemo {
  tabs: Array<any> = [
    { title: 'Dynamic Title 1', content: 'Dynamic content 1' },
    { title: 'Dynamic Title 2', content: 'Dynamic content 2', disabled: true },
    { title: 'Dynamic Title 3', content: 'Dynamic content 3' }
  ];

  handleChange(tab: Event) {
    console.log('Tab Changed');
  };
}
