import {Component} from '@angular/core';

import {SELECT_DIRECTIVES, Md2SelectDispatcher} from '../../../components/multiselect/multiselect';

@Component({
  selector: 'multiselect',
  templateUrl: './app/components/multiselect/multiselect.html',
  directives: [SELECT_DIRECTIVES],
  providers: [Md2SelectDispatcher]
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
