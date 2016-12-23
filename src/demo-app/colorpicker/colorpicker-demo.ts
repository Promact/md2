import {Component} from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'colorpicker-demo',
  templateUrl: 'colorpicker-demo.html'
})
export class ColorpickerDemo {
  private _color: string = '#123456';
  private _color2: string = '#654321';
  handleChange(value: any) {
    console.log('Changed color: ', value);
  }
}
