import { Component} from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'md-chips-demo',
  templateUrl: 'chips-demo.html'
})
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
}
