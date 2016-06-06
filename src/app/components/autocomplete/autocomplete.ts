import {Component} from '@angular/core';

import {Md2Autocomplete} from '../../../components/autocomplete/autocomplete';

@Component({
  selector: 'autocomplete',
  templateUrl: './app/components/autocomplete/autocomplete.html',
  directives: [Md2Autocomplete]
})
export class Autocomplete {
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
  private item: Array<any> = [];
  private change(value: any) {
    console.log('Changed data: ', value);
  }
}
