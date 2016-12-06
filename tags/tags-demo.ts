import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'tags-demo',
  templateUrl: 'tags-demo.html'
})
export class TagsDemo {
  tags: Array<any> =
  [
    { name: 'Vadodara', value: '1' },
    { name: 'Rajkot', value: '2' },
    { name: 'Delhi', value: '3' },
    { name: 'Chennai', value: '4' },
    { name: 'Mumbai', value: '5' },
    { name: 'Goa', value: '6' }
  ];
  tag: Array<any> = [
    { name: 'Vadodara', value: '1' },
    { name: 'Delhi', value: '3' }
  ];
  handleChange(value: any) {
    console.log('Changed data: ', value);
  }
}
