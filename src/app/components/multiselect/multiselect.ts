import {Component} from '@angular/core';

import {Md2Multiselect} from '../../../components/multiselect/multiselect';

@Component({
  selector: 'multiselect',
  templateUrl: './app/components/multiselect/multiselect.html',
  directives: [Md2Multiselect]
})
export class Multiselect {
  //constructor() {
  //  setTimeout(() => {
  //    this.items.push({ name: 'Abc', value: '7' });
  //    this.items.push({ name: 'Def', value: '8' });
  //    this.items.push({ name: 'Ghi', value: '9' });
  //    this.items.push({ name: 'Jkl', value: '10' });
  //    this.items.push({ name: 'Mno', value: '11' });
  //    this.items.push({ name: 'Pqr', value: '12' });
  //    this.items.push({ name: 'Stu', value: '13' });
  //    this.items.push({ name: 'Vwx', value: '14' });
  //    this.items.push({ name: 'Xyz', value: '15' });
  //    this.item = [{ name: 'Birmingham', value: '2' }, { name: 'Dortmund', value: '3' }, { name: 'Ghi', value: '9' }];
  //  }, 5000);
  //}
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
  private item: Array<any> = [{ name: 'Birmingham', value: '2' }, { name: 'Dortmund', value: '3' }];
  //private item: Array<any> = ['2', '3'];
  //private item: Array<any> = ['Birmingham', 'Dortmund'];
  private change(value: any) {
    console.log('Changed data: ', value);
  }

  xyz = 1;
  obj1 = { id: 1, name: 'ssss' };
  obj2 = { id: 2, name: 'dff' };
  serverList = [this.obj1, this.obj2];
  copyList = [this.obj1, this.obj2];
  update(i, e) {
    console.log(i);
    console.log(e);
    let s = this.serverList.find(x=> x.id === parseInt(e));
    this.copyList[i] = s;
  }
}