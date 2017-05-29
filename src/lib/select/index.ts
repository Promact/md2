import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Md2Select } from './select';
import { Md2SelectHeader } from './select-header';
import { Md2OptionModule } from './option';
import { MdCommonModule, OverlayModule } from '../core';


@NgModule({
  imports: [
    CommonModule,
    OverlayModule,
    Md2OptionModule,
    MdCommonModule,
  ],
  exports: [Md2Select, Md2SelectHeader, Md2OptionModule, MdCommonModule],
  declarations: [Md2Select, Md2SelectHeader],
})
export class Md2SelectModule { }


export * from './select';
export * from './select-header';
export * from './option';
export * from './optgroup';
export { fadeInContent, transformPanel, transformPlaceholder } from './select-animations';
