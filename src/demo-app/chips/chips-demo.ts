<<<<<<< HEAD
import { Component } from '@angular/core';
=======
import { Component} from '@angular/core';
>>>>>>> eddb7c8dcce83425d148890938570c8cd5cefbf2

@Component({
  moduleId: module.id,
  selector: 'md-chips-demo',
  templateUrl: 'chips-demo.html'
})
<<<<<<< HEAD
export class ChipsDemo {

  private items: Array<any> =
  [
    'Data1', 'Data2', 'Data3', 'Data4', 'Data5', 'Data6', 'Data7', 'Data8'
  ];
  private itemsData: Array<any> =
  [
    'Data1', 'Data2', 'Data3'
  ];

  private validPattern = /^[0-9]*$/;

  private change(value: any) {
    console.log('Changed data: ', value);
  }
=======
export class ChipsDemo { 
  
    private items: Array<any> =
    [
      'Data1', 'Data2', 'Data3', 'Data4', 'Data5', 'Data6', 'Data7', 'Data8'
    ];
    private itemsData: Array<any> =
    [
      'Data1', 'Data2', 'Data3'
    ];
    
    private validPattern =/^[0-9]*$/;

    private change(value: any) {
      console.log('Changed data: ', value);
    }
>>>>>>> eddb7c8dcce83425d148890938570c8cd5cefbf2
}
