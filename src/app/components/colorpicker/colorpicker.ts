import {Component, OnInit } from '@angular/core';
import {Md2Colorpicker, Md2ColorpickerService} from '../../../components/colorpicker/colorpicker';

@Component({
  selector: 'colorPicker',
  templateUrl: './app/components/colorpicker/colorpicker.html',
  directives: [Md2Colorpicker],
  providers: [Md2ColorpickerService]
})
export class Colorpicker {
  private color: string = '#123456';
  private color2: string = '#654321';
   private change(value: any) {
    console.log('Changed color: ', value);
  }
}
