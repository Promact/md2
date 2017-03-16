import {Component} from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'colorpicker-demo',
  templateUrl: 'colorpicker-demo.html'
})
export class ColorpickerDemo {
  _color: string = null;
  isRequired = false;
  isDisabled = false;
  handleChange(value: any) {
    console.log('Changed color: ', value);
  }
}
