import {Component} from '@angular/core';

@Component({
  selector: 'switch',
  templateUrl: './app/components/switch/switch.html'
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
