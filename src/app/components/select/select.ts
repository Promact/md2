import {Component} from '@angular/core';
import {SELECT_DIRECTIVES, Md2SelectDispatcher} from '../../../components/select/select';

@Component({
  selector: 'selectcomp',
  templateUrl: './app/components/select/select.html',
  directives: [SELECT_DIRECTIVES],
  providers: [Md2SelectDispatcher]
})
export class Select {

  private disabled: boolean = false;
  private items: Array<any> =
  [
    { name: 'Amsterdam', value: '1', disabled: true },
    { name: 'Birmingham', value: '2', disabled: false },
    { name: 'Dortmund', value: '3', disabled: false },
    { name: 'Gothenburg', value: '4', disabled: true },
    { name: 'London', value: '5', disabled: false },
    { name: 'Seville', value: '6', disabled: true }
  ];
  private item: string = '3';
  private change(value: any) {
    console.log('Changed data: ', value);
  }
}
