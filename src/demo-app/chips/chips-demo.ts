import {Component} from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'md-chips-demo',
  templateUrl: 'chips-demo.html'
})
export class ChipsDemo { 
    private items: Array<any> =
    [
        'Amsterdam' ,'Birmingham' , 'Dortmund' ,'Gothenburg'
    ];
	
  private item: any;
}
