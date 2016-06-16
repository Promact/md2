import {Component} from '@angular/core';

import {MULTISELECT_DIRECTIVES, Md2MultiselectDispatcher} from '../../../components/multiselect/multiselect1';

@Component({
  selector: 'multiselect',
  templateUrl: './app/components/multiselect/multiselect.html',
  directives: [MULTISELECT_DIRECTIVES],
  providers: [Md2MultiselectDispatcher]
})
export class Multiselect {
  private disabled: boolean = false;
  private items: Array<any> =
  [
    { name: 'Amsterdam', value: '1', disabled: false },
    { name: 'Birmingham', value: '2', disabled: false },
    { name: 'Dortmund', value: '3', disabled: false },
    { name: 'Gothenburg', value: '4', disabled: false },
    { name: 'London', value: '5', disabled: false },
    { name: 'Seville', value: '6', disabled: false }
  ];
  private item: Array<any> = ['2', '3'];
  private change(value: any) {
    console.log('Changed data: ', value);
  }
}
