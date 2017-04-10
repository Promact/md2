import { Component } from '@angular/core';

@Component({
  selector: 'tags-demo',
  templateUrl: '../tags/tags-demo.html'
})
export class TagsDemo {
  isRequired = false;
  isDisabled = false;
  tag: any;
  tags: Array<any> = [
    { name: 'Vadodara', value: '1' },
    { name: 'Rajkot', value: '2' },
    { name: 'Delhi', value: '3' },
    { name: 'Chennai', value: '4' },
    { name: 'Mumbai', value: '5' },
    { name: 'Goa', value: '6' }
  ];
}
