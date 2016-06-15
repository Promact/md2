import {Component} from '@angular/core';
import {SELECT_DIRECTIVES, Md2SelectDispatcher} from '../../../components/select/select';

@Component({
  selector: 'selectcomp',
  templateUrl: './app/components/select/select.html',
  directives: [SELECT_DIRECTIVES],
  providers: [Md2SelectDispatcher]
})
export class Select {

  constructor() {
    setTimeout(() => {
      this.items.push({ name: 'Abc', value: '7', disabled: false });
      this.items.push({ name: 'Def', value: '8', disabled: false });
      this.items.push({ name: 'Ghi', value: '9', disabled: false });
      this.items.push({ name: 'Jkl', value: '10', disabled: false });
      this.items.push({ name: 'Mno', value: '11', disabled: false });
      this.items.push({ name: 'Pqr', value: '12', disabled: false });
      this.items.push({ name: 'Stu', value: '13', disabled: false });
      this.items.push({ name: 'Vwx', value: '14', disabled: false });
      this.items.push({ name: 'Xyz', value: '15', disabled: false });
      //this.item = '10';
    }, 5000);
  }

  private disabled: boolean = false;
  private items: Array<any> =
  [
    { name: 'Amsterdam', value: '1', disabled: true },
    { name: 'Birmingham', value: '2', disabled: false },
    { name: 'Dortmund', value: '3', disabled: false },
    { name: 'Gothenburg', value: '4', disabled: true },
    { name: 'London', value: '5', disabled: false },
    { name: 'Seville', value: '6', disabled: true }
    //'Amsterdam', 'Birmingham', 'Dortmund', 'Gothenburg', 'London', 'Seville'
  ];
  private items1: Array<string> = ['Amsterdam', 'Birmingham', 'Dortmund', 'Gothenburg', 'London', 'Seville'];
  private item2: string = 'Gothenburg';
  private item: any = { name: 'Dortmund', value: '3', disabled: false };
  //private item: string = '3';
  private item1: any = { name: 'Dortmund', value: '3' };
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
