import {Component} from '@angular/core';
import {Md2Select} from '../../../components/select/select';

@Component({
  selector: 'selectcomp',
  templateUrl: './app/components/select/select.html',
  directives: [Md2Select]
})
export class Select {
  private disabled: boolean = false;
  private items: Array<any> =
  [
    { name: 'Amsterdam', value: '1' },
    { name: 'Birmingham', value: '2' },
    { name: 'Dortmund', value: '3' },
    { name: 'Gothenburg', value: '4' },
    { name: 'London', value: '5' },
    { name: 'Seville', value: '6' }
    //'Amsterdam', 'Birmingham', 'Dortmund', 'Gothenburg', 'London', 'Seville'
  ];
  private items1: Array<string> = ['Amsterdam', 'Birmingham', 'Dortmund', 'Gothenburg', 'London', 'Seville'];
  private item2: string = 'Gothenburg';
  private item: Array<any> = [{ name: 'Dortmund', value: '3' }];
  //private item: any = { name: 'Dortmund', value: '3' };
  //private item: string = 'Dortmund';
  private item1: any = { name: 'Dortmund', value: '3' };
  private change(value: any) {
    console.log('Changed data: ', value);
  }
}
