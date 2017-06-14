import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StyleModule, OverlayModule, PortalModule, A11yModule } from '../core';
import { Md2Colorpicker, ColorpickerSliderDirective, TextDirective } from './colorpicker';
import { ColorUtil } from './color-util';


export * from './colorpicker';
export * from './color-util';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    OverlayModule,
    PortalModule,
    StyleModule,
    A11yModule,
  ],
  exports: [
    Md2Colorpicker,
    ColorpickerSliderDirective,
    TextDirective
  ],
  declarations: [
    Md2Colorpicker,
    ColorpickerSliderDirective,
    TextDirective
  ],
  providers: [ColorUtil],
  entryComponents: [
    Md2Colorpicker,
  ]
})
export class Md2ColorpickerModule { }
