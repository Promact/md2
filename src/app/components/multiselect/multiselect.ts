import {Component} from '@angular/core';

@Component({
  selector: 'multiselect',
  templateUrl: './app/components/multiselect/multiselect.html'
})
export class Multiselect {
  private disabled: boolean = false;
  private items: Array<any> =
  [
    { name: 'Amsterdam', value: '1' },
    { name: 'Birmingham', value: '2' },
    { name: 'Dortmund', value: '3' },
    { name: 'Gothenburg', value: '4' },
    { name: 'London', value: '5' },
    { name: 'Seville', value: '6' }
  ];
  private item: Array<any> = [{ name: 'Birmingham', value: '2' }, { name: 'Dortmund', value: '3' }];
  private change(value: any) {
    console.log('Changed data: ', value);
  }
}
