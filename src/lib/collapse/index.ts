import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Md2Collapse } from './collapse';

export * from './collapse';

@NgModule({
  imports: [CommonModule],
  exports: [Md2Collapse],
  declarations: [Md2Collapse],
})
export class Md2CollapseModule { }
