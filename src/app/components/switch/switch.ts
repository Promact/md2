import {Component} from '@angular/core';
import {Md2Switch} from '../../../components/switch/switch';

@Component({
  selector: 'switch',
  templateUrl: './app/components/switch/switch.html',
  directives: [Md2Switch]
})
export class Switch {
  disabled: boolean;
  switchState: boolean;
  switchState1: boolean;
  switchState2: boolean;
  switchState3: boolean;
  switchState4: boolean;
  constructor() {
    this.disabled = false;
    this.switchState = true;
    this.switchState1 = true;
    this.switchState2 = false;
    this.switchState3 = true;
    this.switchState4 = true;
  }
}
